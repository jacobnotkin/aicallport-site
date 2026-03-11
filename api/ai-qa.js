import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  (process.env.SUPABASE_URL || "").trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  // 1) Require Supabase JWT
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);

  if (userErr || !userData?.user) {
    return res.status(401).json({ error: "Invalid auth token" });
  }

  const user = userData.user;

  // 2) Require active subscription
  const { data: sub, error: subErr } = await supabaseAdmin
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (subErr) {
    console.error("subscription lookup error:", subErr);
    return res.status(500).json({ error: "Subscription lookup failed" });
  }

  if (!sub || sub.status !== "active") {
    return res.status(403).json({ error: "Subscription required" });
  }

  // 3) Original logic
  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const question = String(body.question || "").trim();
  const context = body.context || {};

  if (question.length < 5) {
    return res.status(400).json({ error: "Question too short" });
  }

  const answer =
    `Question received successfully.\n\n` +
    `Question: ${question}\n\n` +
    `Context:\n` +
    `- Market: ${context.market || "-"}\n` +
    `- Industry: ${context.industry || "-"}\n` +
    `- Role: ${context.role || "-"}\n` +
    `- Deployed: ${context.deployed ? "YES" : "NO"}`;

  return res.status(200).json({ answer });
}
