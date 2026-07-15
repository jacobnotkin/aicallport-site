import { getSupabaseAdmin, handleError, json, nextRevision, readJsonBody, requireAccountContext } from "./estimator-api-shared.js";

export const config = { api: { bodyParser: true } };

function accountUser(user) {
  const metadata = user?.user_metadata || {};
  const email = user?.email || "";
  return {
    id: user?.id || "",
    email,
    name: metadata.full_name || metadata.name || metadata.display_name || email.split("@")[0] || "Account User"
  };
}

export default async function handler(req, res) {
  const supabase = getSupabaseAdmin();
  const context = await requireAccountContext(req, supabase);
  if (context.error) return json(res, context.status, { error: context.error });
  try {
    if (req.method === "GET") {
      let query = supabase.from("account_dashboard_assignments").select("id,user_id,director,level,enabled,revision,updated_at").eq("company_id", context.companyId);
      if (!["president", "admin"].includes(context.role)) query = query.eq("user_id", context.user.id);
      const { data, error } = await query.order("updated_at", { ascending: false });
      if (error) throw error;
      return json(res, 200, { companyId: context.companyId, userId: context.user.id, role: context.role, user: accountUser(context.user), assignments: data || [] });
    }
    if (req.method === "POST") {
      if (!["president", "admin"].includes(context.role)) return json(res, 403, { error: "President or Account admin permission is required." });
      const body = await readJsonBody(req);
      if (!body.userId || !body.director || !["A", "B", "C"].includes(body.level)) return json(res, 400, { error: "userId, director, and valid level are required." });
      const { data: existing, error: readError } = await supabase.from("account_dashboard_assignments").select("*").eq("company_id", context.companyId).eq("user_id", body.userId).eq("director", body.director).maybeSingle();
      if (readError) throw readError;
      const revision = nextRevision(existing?.revision || 0, Number(body.expectedRevision || 0));
      const values = { company_id: context.companyId, user_id: body.userId, director: body.director, level: body.level, enabled: body.enabled !== false, assigned_by: context.user.id, revision, updated_at: new Date().toISOString() };
      const write = existing
        ? await supabase.from("account_dashboard_assignments").update(values).eq("id", existing.id).eq("revision", existing.revision).select("*").maybeSingle()
        : await supabase.from("account_dashboard_assignments").insert(values).select("*").single();
      if (write.error) throw write.error;
      if (!write.data) { const conflict = new Error("The Account assignment changed before this update completed."); conflict.code = "REVISION_CONFLICT"; conflict.currentRevision = existing?.revision || 0; throw conflict; }
      const data = write.data;
      return json(res, 200, { assignment: data });
    }
    return json(res, 405, { error: "Method not allowed." });
  } catch (error) {
    return handleError(res, error);
  }
}
