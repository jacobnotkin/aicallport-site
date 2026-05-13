import {
  runtime,
  fetchBillingStateFromStripe,
  findSubscriptionRow,
  getStripe,
  getSupabaseAdmin,
  getUserFromBearer,
  json
} from "./_shared.js";

export const config = { api: { bodyParser: true } };
export { runtime };

export default async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

  try {
    const supabaseAdmin = getSupabaseAdmin();
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
