
  async function createCheckoutFromCurrentSetup() {
    const params = readSearchParams();
    const setup = searchParamsToObject(params);
    const result = await fetchJson("/api/create-checkout-session", {
    const result = await fetchJson("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      throw new Error("No billing account has been activated yet.");
    }

    const state = await fetchJson(`/api/billing-state?${search.toString()}`);
    const state = await fetchJson(`/api/stripe/billing-state?${search.toString()}`);
    if (state.accountId) {
      setStoredAccountId(state.accountId);
    }
