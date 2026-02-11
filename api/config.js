export default function handler(req, res) {
  res.status(200).json({
    vapiPublicKey: process.env.VAPI_PUBLIC_KEY || ""
  });
}

