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

  const lang = String(body.lang || "EN").toUpperCase();
  const namespace = String(body.namespace || "default");
  const items = Array.isArray(body.items) ? body.items : [];

  const map = {};
  for (const item of items) map[item] = item;

  return res.status(200).json({ lang, namespace, map });
}
