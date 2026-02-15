export default function handler(req, res) {
  const key = process.env.VAPI_PUBLIC_KEY;

  if (!key) {
    return res.status(500).json({
      error: "VAPI_PUBLIC_KEY is not set"
    });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    vapiPublicKey: key
  });
}
