  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
    const view = req.query.view || "";

    if (view === "beta-applications") {
      const { data, error } = await supabaseAdmin
        .from("beta_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return json(res, 500, { error: error.message || "Unable to load requests." });
      }

      return json(res, 200, { requests: data || [] });
    }

    const stripe = getStripe();
    const authUser = await getUserFromBearer(req, supabaseAdmin);
    const sessionId = req.query.session_id || "";
    const accountId = req.query.account_id || "";
