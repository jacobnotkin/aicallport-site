window.AIABCXAuthClient = window.AIABCXAuthClient || (() => {
  let supabaseClientPromise = null;

  async function getSupabaseClient() {
    if (!supabaseClientPromise) {
      supabaseClientPromise = (async () => {
        if (!window.supabase || typeof window.supabase.createClient !== "function") throw new Error("Supabase browser client is unavailable.");
        const response = await fetch("/api/public-config", { headers: { Accept: "application/json" } });
        const config = await response.json().catch(() => ({}));
        if (!response.ok || !config.supabaseUrl || !config.supabaseAnonKey) throw new Error(config.error || "Supabase public configuration is unavailable.");
        return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
      })();
    }
    return supabaseClientPromise;
  }

  async function getSession() {
    if (window.AIABCXAuth && typeof window.AIABCXAuth.getSession === "function") return (await window.AIABCXAuth.getSession()) || null;
    const client = await getSupabaseClient();
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data?.session || null;
  }

  async function getAccessToken() {
    if (window.AIABCXAuth && typeof window.AIABCXAuth.getAccessToken === "function") return (await window.AIABCXAuth.getAccessToken()) || "";
    try {
      const session = await getSession();
      if (session?.access_token) return session.access_token;
    } catch (error) {
      const legacyToken = localStorage.getItem("ai-abcx-access-token") || "";
      if (legacyToken) return legacyToken;
      return "";
    }
    return localStorage.getItem("ai-abcx-access-token") || "";
  }

  async function signInWithPassword(email, password) {
    const client = await getSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data?.session || null;
  }

  async function sendPasswordRecovery(email, redirectTo) {
    const client = await getSupabaseClient();
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
  }

  async function updatePassword(password) {
    const client = await getSupabaseClient();
    const { data, error } = await client.auth.updateUser({ password });
    if (error) throw error;
    return data?.user || null;
  }

  async function signOut() {
    const client = await getSupabaseClient();
    const { error } = await client.auth.signOut();
    if (error) throw error;
    localStorage.removeItem("ai-abcx-access-token");
  }
  async function request(path, options = {}) {
    const token = await getAccessToken();
    if (!token) { const error = new Error("No authenticated session."); error.code = "AUTH_REQUIRED"; throw error; }
    const response = await fetch(path, { ...options, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(options.headers || {}) } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) { const error = new Error(payload.error || `Request failed (${response.status}).`); error.status = response.status; error.code = payload.code; error.currentRevision = payload.currentRevision; throw error; }
    return payload;
  }
  return { getSupabaseClient, getSession, getAccessToken, signInWithPassword, sendPasswordRecovery, updatePassword, signOut, request };
})();
