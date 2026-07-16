import {
  runtime,
  getProfileByIdOrEmail,
  getStripe,
  getSupabaseAdmin,
  json
} from "../../lib/stripe-api-shared.js";

export const config = {
  api: {
    bodyParser: false
  }
};
export { runtime };

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function upsertSubscriptionState({ supabaseAdmin, stripe, session }) {
  const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id || null;
  const stripeSubscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id || null;

  if (!stripeCustomerId || !stripeSubscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
  const customer = await stripe.customers.retrieve(stripeCustomerId);
  const email = session?.customer_details?.email || session?.customer_email || customer.email || null;
  const userId = session.client_reference_id || session?.metadata?.user_id || "";
  const profile = await getProfileByIdOrEmail(supabaseAdmin, { userId, email });

  if (!profile?.id) return;

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(
      [
        {
          user_id: profile.id,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          status: subscription.status
        }
      ],
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("subscriptions upsert error:", error);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const stripe = getStripe();
  const supabaseAdmin = getSupabaseAdmin();
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).send("Missing Stripe-Signature header");
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      await upsertSubscriptionState({
        supabaseAdmin,
        stripe,
        session: event.data.object
      });
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;

      if (customerId) {
        const { data: row } = await supabaseAdmin
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        if (row?.user_id) {
          await supabaseAdmin
            .from("subscriptions")
            .update({
              stripe_subscription_id: subscription.id,
              status: subscription.status
            })
            .eq("user_id", row.user_id);
        }
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
  }

  return json(res, 200, { received: true });
}
