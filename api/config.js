export default function handler(req, res) {
  if (req.query?.public === "1") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
  }

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
 
