import {
  runtime,
  fetchBillingStateFromStripe,
  findSubscriptionRow,
  getStripe,
  getSupabaseAdmin,
  getUserFromBearer,
  json,
  readJsonBody
} from "./_shared.js";

export const config = { api: { bodyParser: true } };
export { runtime };

export default async function handler(req, res) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const action = body.action || "";

      if (action === "update-beta-status") {
        const id = body.id || "";
        const status = body.status || "";
        const allowedStatuses = ["new", "reviewing", "shortlisted", "approved", "rejected", "contacted"];

        if (!id || !status) {
          return json(res, 400, { error: "Application id and status are required." });
        }

        if (!allowedStatuses.includes(status)) {
          return json(res, 400, { error: "Invalid status value." });
        }

        const { data, error } = await supabaseAdmin
          .from("beta_applications")
          .update({ status })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update request status." });
        }

        return json(res, 200, { request: data });
      }

      if (action === "update-beta-notes") {
        const id = body.id || "";
        const reviewNotes = typeof body.reviewNotes === "string" ? body.reviewNotes : "";

        if (!id) {
          return json(res, 400, { error: "Application id is required." });
        }

        const { data, error } = await supabaseAdmin
          .from("beta_applications")
          .update({ review_notes: reviewNotes })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update request notes." });
        }

        return json(res, 200, { request: data });
      }

      if (action === "update-beta-activation-stage") {
        const id = body.id || "";
        const activationStage = body.activationStage || "";
        const allowedStages = ["not_started", "contacted", "onboarding", "activated"];

        if (!id || !activationStage) {
          return json(res, 400, { error: "Application id and activation stage are required." });
        }

        if (!allowedStages.includes(activationStage)) {
          return json(res, 400, { error: "Invalid activation stage value." });
        }

        const { data, error } = await supabaseAdmin
          .from("beta_applications")
          .update({ activation_stage: activationStage })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update activation stage." });
        }

        return json(res, 200, { request: data });
      }

      return json(res, 400, { error: "Unsupported action." });
    }

    if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

    const view = req.query.view || "";

    if (view === "beta-applications") {
      const { data, error } = await supabaseAdmin
        .from("beta_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return json(res, 500, { error: error.message || "Unable to load requests." });
      }

      return json(res, 200, { requests: data || [] });
    }

    if (view === "leads") {
      const { data, error } = await supabaseAdmin
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return json(res, 500, { error: error.message || "Unable to load leads." });
      }

      return json(res, 200, { leads: data || [] });
    }

    const stripe = getStripe();
    const authUser = await getUserFromBearer(req, supabaseAdmin);
    const sessionId = req.query.session_id || "";
    const accountId = req.query.account_id || "";
    const email = req.query.email || "";

    const subscriptionRow = await findSubscriptionRow(supabaseAdmin, {
      userId: authUser?.id || "",
      email
    });

    const state = await fetchBillingStateFromStripe(stripe, {
      sessionId,
      customerId: subscriptionRow?.stripe_customer_id || "",
      subscriptionId: subscriptionRow?.stripe_subscription_id || "",
      accountId
    });

    if (!state) {
      return json(res, 404, { error: "No billing account found yet for this business." });
    }

    return json(res, 200, state);
  } catch (error) {
    return json(res, 500, {
      error: error.message || "Unable to load billing state."
    });
  }
}
