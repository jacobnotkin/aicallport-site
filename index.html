import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Required for Stripe webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// (Optional but ok) ensures Node runtime
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Safe debug: shows the URL exactly as Vercel sees it (including hidden whitespace)
console.log("SUPABASE_URL (raw):", JSON.stringify(process.env.SUPABASE_URL));

const supabase = createClient(
  (process.env.SUPABASE_URL || "").trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  // Stripe sends POST
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

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
  } catch (err) {
    console.error("Stripe webhook verification failed:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // ✅ MAIN EVENT: subscription checkout completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Email can appear in different fields depending on checkout config
      const email =
        session?.customer_details?.email ||
        session?.customer_email ||
        null;

      // These will be strings for a subscription checkout
      const stripeCustomerId =
        typeof session.customer === "string" ? session.customer : null;

      const stripeSubscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;

      if (!email) {
        console.log("checkout.session.completed: no email found on session");
        return res.status(200).json({ received: true });
      }

      if (!stripeCustomerId) {
        console.log("checkout.session.completed: no stripe customer id");
        return res.status(200).json({ received: true });
      }

      if (!stripeSubscriptionId) {
        console.log(
          "checkout.session.completed: no subscription id (is this really recurring monthly?)"
        );
        return res.status(200).json({ received: true });
      }

      // 1) Find the user in profiles by email
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("email", email)
        .maybeSingle();

      if (profileError) {
        console.error("profiles lookup error:", profileError);
        return res.status(200).json({ received: true });
      }

      if (!profile?.id) {
        console.log("No matching profile for email:", email);
        return res.status(200).json({ received: true });
      }

      // 2) Upsert into subscriptions (one row per user)
      const { error: subError } = await supabase
        .from("subscriptions")
        .upsert(
          [
            {
              user_id: profile.id,
              stripe_customer_id: stripeCustomerId,
              stripe_subscription_id: stripeSubscriptionId,
              status: "active",
              // plan_code will be mapped later (price_id -> starter/pro/elite)
            },
          ],
          { onConflict: "user_id" }
        );

      if (subError) {
        console.error("subscriptions upsert error:", subError);
      } else {
        console.log(
          "Subscription saved:",
          JSON.stringify({
            email,
            user_id: profile.id,
            stripeCustomerId,
            stripeSubscriptionId,
          })
        );
      }
    }

    // (Optional) Later we will add:
    // - invoice.paid -> update status/period dates
    // - invoice.payment_failed -> set past_due
    // - customer.subscription.updated/deleted -> status changes

  } catch (err) {
    console.error("Webhook handler error:", err);
    // IMPORTANT: still return 200 so Stripe does not retry forever
  }

  return res.status(200).json({ received: true });
}
