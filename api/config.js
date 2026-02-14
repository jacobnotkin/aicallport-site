export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  const vapiPublicKey = process.env.VAPI_PUBLIC_KEY || "";
  const assistantId = process.env.VAPI_ASSISTANT_ID || "";

  res.status(200).json({
    vapiPublicKey,
    assistantId
  });
}
