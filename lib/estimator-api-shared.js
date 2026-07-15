import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export function getSupabaseAdmin() {
  return createClient((process.env.SUPABASE_URL || "").trim(), process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
}

export async function getAuthenticatedUser(req, supabaseAdmin) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  return error ? null : data?.user || null;
}

export async function requireAccountContext(req, supabaseAdmin) {
  const user = await getAuthenticatedUser(req, supabaseAdmin);
  if (!user) return { error: "Authentication required.", status: 401 };
  const requestedCompanyId = req.query?.company_id || "";
  let membershipQuery = supabaseAdmin.from("account_memberships").select("company_id,role,active").eq("user_id", user.id).eq("active", true);
  if (requestedCompanyId) membershipQuery = membershipQuery.eq("company_id", requestedCompanyId);
  const { data: memberships, error: membershipError } = await membershipQuery.limit(1);
  if (membershipError) return { error: membershipError.message, status: 500 };
  let membership = memberships?.[0] || null;
  if (!membership) {
    let companyQuery = supabaseAdmin.from("companies").select("id").eq("owner_user_id", user.id);
    if (requestedCompanyId) companyQuery = companyQuery.eq("id", requestedCompanyId);
    const { data: company } = await companyQuery.limit(1).maybeSingle();
    if (company?.id) {
      membership = { company_id: company.id, role: "president", active: true };
      await supabaseAdmin.from("account_memberships").upsert({ company_id: company.id, user_id: user.id, role: "president", active: true }, { onConflict: "company_id,user_id" });
    }
  }
  if (!membership) return { error: "No active company membership was found.", status: 403 };
  return { user, companyId: membership.company_id, role: membership.role };
}

export async function requireEstimatorAssignment(context, supabaseAdmin) {
  if (["president", "admin"].includes(context.role)) return { level: "A", enabled: true };
  const { data, error } = await supabaseAdmin
    .from("account_dashboard_assignments")
    .select("level,enabled")
    .eq("company_id", context.companyId)
    .eq("user_id", context.user.id)
    .eq("director", "estimator")
    .eq("enabled", true)
    .maybeSingle();
  if (error) return null;
  return data || null;
}

export function nextRevision(currentRevision, expectedRevision) {
  const current = Number(currentRevision || 0);
  const expected = Number(expectedRevision || 0);
  if (current !== expected) {
    const error = new Error(`Revision conflict: expected ${expected}, current ${current}.`);
    error.code = "REVISION_CONFLICT";
    error.currentRevision = current;
    throw error;
  }
  return current + 1;
}

export function handleError(res, error) {
  if (error?.code === "REVISION_CONFLICT") return json(res, 409, { error: error.message, code: error.code, currentRevision: error.currentRevision });
  if (error?.code === "23505") return json(res, 409, { error: "This record was created or changed in another session.", code: "REVISION_CONFLICT" });
  return json(res, 500, { error: error?.message || "Estimator persistence failed." });
}
