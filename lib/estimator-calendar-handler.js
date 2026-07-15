import { getSupabaseAdmin, handleError, json, nextRevision, readJsonBody, requireAccountContext, requireEstimatorAssignment } from "./estimator-api-shared.js";

export const config = { api: { bodyParser: true } };

function clientEntry(row) {
  return { ...row.entry_data, externalKey: row.external_key, entryType: row.entry_type, startsAt: row.starts_at, endsAt: row.ends_at, dueDate: row.due_date, serverRevision: row.revision };
}

export default async function handler(req, res) {
  const supabase = getSupabaseAdmin();
  const context = await requireAccountContext(req, supabase);
  if (context.error) return json(res, context.status, { error: context.error });
  if (!(await requireEstimatorAssignment(context, supabase))) return json(res, 403, { error: "Estimator Director assignment is required." });
  try {
    if (req.method === "GET") {
      const { data, error } = await supabase.from("estimator_calendar_entries").select("*").eq("company_id", context.companyId).eq("owner_user_id", context.user.id).order("external_key");
      if (error) throw error;
      return json(res, 200, { entries: (data || []).map(clientEntry) });
    }
    if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
    const body = await readJsonBody(req);
    const entries = Array.isArray(body.entries) ? body.entries : [];
    if (!entries.length || entries.some((entry) => !entry.externalKey || !entry.entryType)) return json(res, 400, { error: "Calendar entries require externalKey and entryType." });
    if (body.action === "import") {
      const { count, error } = await supabase.from("estimator_calendar_entries").select("id", { count: "exact", head: true }).eq("company_id", context.companyId).eq("owner_user_id", context.user.id);
      if (error) throw error;
      if (count) return json(res, 409, { error: "Calendar import was already completed.", code: "IMPORT_ALREADY_COMPLETED" });
    }
    const saved = [];
    for (const entry of entries) {
      const { data: existing, error: readError } = await supabase.from("estimator_calendar_entries").select("*").eq("company_id", context.companyId).eq("external_key", entry.externalKey).maybeSingle();
      if (readError) throw readError;
      const revision = nextRevision(existing?.revision || 0, body.action === "import" ? 0 : Number(entry.serverRevision || 0));
      const values = { company_id: context.companyId, owner_user_id: context.user.id, external_key: entry.externalKey, entry_type: entry.entryType, starts_at: entry.startsAt || null, ends_at: entry.endsAt || null, due_date: entry.dueDate || null, entry_data: entry, revision, updated_at: new Date().toISOString() };
      const write = existing
        ? await supabase.from("estimator_calendar_entries").update(values).eq("id", existing.id).eq("revision", existing.revision).select("*").maybeSingle()
        : await supabase.from("estimator_calendar_entries").insert(values).select("*").single();
      if (write.error) throw write.error;
      if (!write.data) {
        const conflict = new Error("The calendar changed before this update completed."); conflict.code = "REVISION_CONFLICT"; conflict.currentRevision = existing?.revision || 0; throw conflict;
      }
      saved.push(clientEntry(write.data));
    }
    return json(res, 200, { entries: saved });
  } catch (error) {
    return handleError(res, error);
  }
}
