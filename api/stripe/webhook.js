import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// (Optional but recommended) ensure Node runtime
export const config = {
  api: {
    bodyParser: false,
  },
};
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
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session?.customer_details?.email || null;

      if (email) {
        const { error } = await supabase.from("customers").insert([{ email }]);

        if (error) {
          console.error("Supabase insert error:", error);
        } else {
          console.log("Customer inserted:", email);
        }
      } else {
        console.log("checkout.session.completed: no customer email found");
      }
    }
  } catch (err) {
    console.error("Handler error:", err);
    // still return 200 so Stripe doesn't retry forever unless you want retries
  }

  return res.status(200).json({ received: true });
}
