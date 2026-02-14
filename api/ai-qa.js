export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

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
    `- Market: ${context.market || "—"}\n` +
    `- Industry: ${context.industry || "—"}\n` +
    `- Role: ${context.role || "—"}\n` +
    `- Deployed: ${context.deployed ? "YES" : "NO"}`;

  return res.status(200).json({ answer });
}
