import { createClient } from "@supabase/supabase-js";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const supabaseAdmin = createClient(
      (process.env.SUPABASE_URL || "").trim(),
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabaseAdmin
      .from("beta_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message || "Unable to load requests." });
      return;
    }

    res.status(200).json({ requests: data || [] });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unexpected server error." });
  }
}
