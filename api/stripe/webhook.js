import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Supabase admin client (server-side only)
const supabase = createClient(
  process.env.SUPABASE_URL,
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
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // ✅ Handle checkout completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // session.customer_details.email is usually present
      const email =
        session?.customer_details?.email ||
        session?.customer_email ||
        null;

      if (email) {
        // Insert customer if not already exists (by email)
        const { data: existing, error: findError } = await supabase
          .from("customers")
          .select("id")
          .eq("email", email)
          .maybeSingle();

        if (findError) {
          console.error("Supabase find error:", findError);
        } else if (!existing) {
          const { error: insertError } = await supabase
            .from("customers")
            .insert([{ email }]);

          if (insertError) {
            console.error("Supabase insert error:", insertError);
          } else {
            console.log("Inserted customer:", email);
          }
        } else {
          console.log("Customer already exists:", email);
        }
      } else {
        console.warn("No email found on checkout session");
      }
    }

    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("Webhook handler error:", e);
    return res.status(500).send("Webhook handler failed");
  }
}
