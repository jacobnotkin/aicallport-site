import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: { bodyParser: true },
};
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { plan } = req.body || {};
    // Choose price by plan
    // Put your real Stripe TEST price IDs into Vercel env vars:
    // STRIPE_PRICE_299 and STRIPE_PRICE_599
    let priceId = null;
    if (plan === "299") priceId = process.env.STRIPE_PRICE_299;
    if (plan === "599") priceId = process.env.STRIPE_PRICE_599;

    if (!priceId) return res.status(400).json({ error: "Invalid plan" });
    // Get Supabase auth token
const authHeader = req.headers.authorization || "";
const token = authHeader.startsWith("Bearer ")
  ? authHeader.slice("Bearer ".length)
  : null;

if (!token) return res.status(401).json({ error: "Missing auth token" });

const { data: userData, error: userErr } =
  await supabaseAdmin.auth.getUser(token);

if (userErr || !userData?.user) {
  return res.status(401).json({ error: "Invalid auth token" });
}

const user = userData.user;

    // Your public site URL (must be exactly your domain)
    const siteUrl = (process.env.SITE_URL || "https://www.aicallport.com").replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // recurring monthly
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
metadata: {
  user_id: user.id,
  plan: plan,
},,

      success_url: `${siteUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancel`,
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return res.status(500).json({ error: err.message });
  }
}
