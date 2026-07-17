window.AIABCXServerRepositories = window.AIABCXServerRepositories || (() => {
  const auth = window.AIABCXAuthClient;
  function calendarToEntries(state) {
    return Object.entries(state || {}).map(([date, day]) => ({ externalKey: `availability:${date}`, entryType: "availability", dueDate: date, day }));
  }
  function entriesToCalendar(entries) {
    return (entries || []).reduce((result, entry) => { if (entry.entryType === "availability" && entry.dueDate) result[entry.dueDate] = entry.day || entry.entry_data?.day || {}; return result; }, {});
  }
  async function bootstrap(localRecords, localCalendar) {
    if (!(await auth.getAccessToken())) return { mode: "local", records: localRecords, calendarState: localCalendar, assignment: null };
    const [account, recordPayload, calendarPayload] = await Promise.all([auth.request("/api/estimator/account"), auth.request("/api/estimator/records"), auth.request("/api/estimator/calendar")]);
    let records = recordPayload.records || [];
    let entries = calendarPayload.entries || [];
    if (!records.length && localRecords.length) records = (await auth.request("/api/estimator/records", { method: "POST", body: JSON.stringify({ action: "import", records: localRecords }) })).records;
    if (!entries.length && Object.keys(localCalendar || {}).length) entries = (await auth.request("/api/estimator/calendar", { method: "POST", body: JSON.stringify({ action: "import", entries: calendarToEntries(localCalendar) }) })).entries;
    const assignment = (account.assignments || []).find((item) => item.director === "estimator" && item.enabled) || null;
    return { mode: "server", records, calendarState: entriesToCalendar(entries), calendarEntries: entries, assignment, account };
  }
  async function loadAccount() {
    return auth.request("/api/estimator/account");
  }
  async function saveAssignment(assignment) {
    const payload = await auth.request("/api/estimator/account", { method: "POST", body: JSON.stringify({
      userId: assignment.userId,
      director: assignment.director,
      level: assignment.level,
      enabled: assignment.enabled !== false,
      expectedRevision: Number(assignment.serverRevision || assignment.revision || 0)
    }) });
    return payload.assignment;
  }
  async function saveRecord(record) {
    const payload = await auth.request("/api/estimator/records", { method: "POST", body: JSON.stringify({ action: "upsert", expectedRevision: Number(record.serverRevision || 0), record }) });
    return payload.records[0];
  }

  async function loadRecords() {
    const payload = await auth.request("/api/estimator/records");
    return payload.records || [];
  }
  async function saveCalendar(state, revisions = {}) {
    const entries = calendarToEntries(state).map((entry) => ({ ...entry, serverRevision: Number(revisions[entry.externalKey] || 0) }));
    const payload = await auth.request("/api/estimator/calendar", { method: "POST", body: JSON.stringify({ action: "upsert", entries }) });
    return payload.entries;
  }
  return { bootstrap, loadAccount, saveAssignment, saveRecord, loadRecords, saveCalendar, calendarToEntries, entriesToCalendar };
})();
