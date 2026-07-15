import { getSupabaseAdmin, handleError, json, nextRevision, readJsonBody, requireAccountContext, requireEstimatorAssignment } from "./estimator-api-shared.js";

export const config = { api: { bodyParser: true } };

function clientRecord(row) {
  return { ...row.record_data, serverRecordId: row.id, serverRevision: row.revision };
}

function assignedRecord(record, user) {
  const copy = JSON.parse(JSON.stringify(record));
  const metadata = user?.user_metadata || {};
  const email = user?.email || "";
  const name = metadata.full_name || metadata.name || metadata.display_name || email.split("@")[0] || "Account User";
  copy.estimator = copy.estimator || {};
  copy.estimator.owner = { ...(copy.estimator.owner || {}), userId: user.id, label: name };
  return copy;
}

export default async function handler(req, res) {
  const supabase = getSupabaseAdmin();
  const context = await requireAccountContext(req, supabase);
  if (context.error) return json(res, context.status, { error: context.error });
  const assignment = await requireEstimatorAssignment(context, supabase);
  if (!assignment) return json(res, 403, { error: "Estimator Director assignment is required." });
  try {
    if (req.method === "GET") {
      let query = supabase.from("estimator_records").select("*").eq("company_id", context.companyId);
      const requestedOwner = req.query?.owner_user_id;
      if (["president", "admin"].includes(context.role) && requestedOwner) query = query.eq("owner_user_id", requestedOwner);
      else query = query.eq("owner_user_id", context.user.id);
      const { data, error } = await query.order("updated_at", { ascending: false });
      if (error) throw error;
      return json(res, 200, { records: (data || []).map(clientRecord) });
    }
    if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
    const body = await readJsonBody(req);
    const incoming = body.action === "import" ? body.records : [body.record];
    if (!Array.isArray(incoming) || !incoming.length || incoming.some((record) => !record?.id)) return json(res, 400, { error: "A record id is required." });
    if (body.action === "import") {
      const { count, error } = await supabase.from("estimator_records").select("id", { count: "exact", head: true }).eq("company_id", context.companyId).eq("owner_user_id", context.user.id);
      if (error) throw error;
      if (count) return json(res, 409, { error: "Server records already exist; import is allowed only once.", code: "IMPORT_ALREADY_COMPLETED" });
    }
    const saved = [];
    for (const record of incoming) {
      const normalizedRecord = assignedRecord(record, context.user);
      const { data: existing, error: readError } = await supabase.from("estimator_records").select("*").eq("company_id", context.companyId).eq("external_job_id", record.id).maybeSingle();
      if (readError) throw readError;
      const expected = body.action === "import" ? 0 : Number(body.expectedRevision ?? record.serverRevision ?? 0);
      const revision = nextRevision(existing?.revision || 0, expected);
      const status = normalizedRecord.estimator?.status || "assigned";
      const values = { company_id: context.companyId, external_job_id: normalizedRecord.id, owner_user_id: context.user.id, schema_version: Number(normalizedRecord.estimator?.schemaVersion || 2), status, record_data: normalizedRecord, revision, updated_at: new Date().toISOString() };
      let write;
      if (existing) write = await supabase.from("estimator_records").update(values).eq("id", existing.id).eq("revision", existing.revision).select("*").maybeSingle();
      else write = await supabase.from("estimator_records").insert(values).select("*").single();
      if (write.error) throw write.error;
      if (!write.data) {
        const conflict = new Error("The estimate changed before this update completed.");
        conflict.code = "REVISION_CONFLICT";
        conflict.currentRevision = existing?.revision || 0;
        throw conflict;
      }
      const audit = { company_id: context.companyId, estimator_record_id: write.data.id, actor_user_id: context.user.id, action: existing ? "record_updated" : (body.action === "import" ? "record_imported" : "record_created"), previous_status: existing?.status || null, next_status: status, record_revision: revision, event_data: { externalJobId: record.id } };
      const { error: auditError } = await supabase.from("estimator_audit_events").insert(audit);
      if (auditError) throw auditError;
      saved.push(clientRecord(write.data));
    }
    return json(res, 200, { records: saved });
  } catch (error) {
    return handleError(res, error);
  }
}
