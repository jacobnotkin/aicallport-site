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
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
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
