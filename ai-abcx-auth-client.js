window.AIABCXAuthClient = window.AIABCXAuthClient || (() => {
  async function getAccessToken() {
    if (window.AIABCXAuth && typeof window.AIABCXAuth.getAccessToken === "function") return (await window.AIABCXAuth.getAccessToken()) || "";
    return localStorage.getItem("ai-abcx-access-token") || "";
  }
  async function request(path, options = {}) {
    const token = await getAccessToken();
    if (!token) { const error = new Error("No authenticated session."); error.code = "AUTH_REQUIRED"; throw error; }
    const response = await fetch(path, { ...options, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(options.headers || {}) } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) { const error = new Error(payload.error || `Request failed (${response.status}).`); error.status = response.status; error.code = payload.code; error.currentRevision = payload.currentRevision; throw error; }
    return payload;
  }
  return { getAccessToken, request };
})();
