window.AIABCXAccountAssignments = window.AIABCXAccountAssignments || (() => {
  const storageKey = "ai-abcx-account-assignments-v1";
  const schemaVersion = 1;
  const defaultAccount = {
    schemaVersion,
    accountId: "account-demo",
    companyName: "AI-ABCX Demo Company",
    users: [
      {
        userId: "user-alex-carter",
        name: "Alex Carter",
        active: true,
        dashboards: [
          { director: "estimator", level: "A", enabled: true }
        ]
      }
    ]
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeAccount(value) {
    const source = value && typeof value === "object" ? value : {};
    const users = Array.isArray(source.users) ? source.users : [];
    return {
      schemaVersion,
      accountId: source.accountId || defaultAccount.accountId,
      companyName: source.companyName || defaultAccount.companyName,
      users: (users.length ? users : defaultAccount.users).map((user, index) => ({
        userId: user.userId || `account-user-${index + 1}`,
        name: user.name || `Account User ${index + 1}`,
        active: user.active !== false,
        dashboards: Array.isArray(user.dashboards) ? user.dashboards.map((dashboard) => ({
          director: String(dashboard.director || ""),
          level: ["A", "B", "C"].includes(String(dashboard.level || "").toUpperCase()) ? String(dashboard.level).toUpperCase() : "A",
          enabled: dashboard.enabled !== false
        })) : []
      }))
    };
  }

  function readAccount() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "null");
      const normalized = normalizeAccount(parsed || defaultAccount);
      localStorage.setItem(storageKey, JSON.stringify(normalized));
      return normalized;
    } catch (error) {
      return clone(defaultAccount);
    }
  }

  function writeAccount(account) {
    const normalized = normalizeAccount(account);
    localStorage.setItem(storageKey, JSON.stringify(normalized));
    return normalized;
  }

  function getDashboardAssignment(director, requestedUserId = "") {
    const account = readAccount();
    const candidates = account.users.filter((user) => user.active && user.dashboards.some((dashboard) => dashboard.enabled && dashboard.director === director));
    const user = candidates.find((candidate) => candidate.userId === requestedUserId) || candidates[0] || null;
    if (!user) return null;
    const dashboard = user.dashboards.find((item) => item.enabled && item.director === director);
    return {
      accountId: account.accountId,
      companyName: account.companyName,
      userId: user.userId,
      name: user.name,
      director,
      level: dashboard.level
    };
  }

  return {
    storageKey,
    schemaVersion,
    defaultAccount: clone(defaultAccount),
    normalizeAccount,
    readAccount,
    writeAccount,
    getDashboardAssignment
  };
})();
