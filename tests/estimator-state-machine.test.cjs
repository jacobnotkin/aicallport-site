const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
}

function loadBrowserModule(filename, globalName) {
  const localStorage = createStorage();
  const window = { localStorage };
  const context = vm.createContext({ window, localStorage, console, URLSearchParams, Date, JSON, Math, String, Number, Array, Object, Boolean, RegExp });
  const source = fs.readFileSync(path.join(__dirname, "..", filename), "utf8");
  vm.runInContext(source, context, { filename });
  return { api: window[globalName], localStorage };
}

const { api: records } = loadBrowserModule("ai-abcx-job-records.js", "AIABCXJobRecords");

function recordAt(status) {
  return {
    id: `test-${status}`,
    jobNumber: `TEST-${status}`,
    customerName: "Transition Test",
    appointmentType: "sales",
    assignedRep: "Account Estimator",
    estimator: {
      schemaVersion: records.ESTIMATOR_SCHEMA_VERSION,
      status,
      level: "A",
      owner: { userId: "user-estimator", label: "Account Estimator", assignedBy: "President" }
    }
  };
}

test("every allowed and rejected estimator status transition matches the canonical matrix", async (t) => {
  for (const from of records.ESTIMATOR_STATUSES) {
    for (const to of records.ESTIMATOR_STATUSES) {
      await t.test(`${from} -> ${to}`, () => {
        const record = recordAt(from);
        const expected = from === to || records.ESTIMATOR_TRANSITIONS[from].includes(to);
        assert.equal(records.canTransitionEstimator(record, to), expected);
        assert.equal(records.transitionEstimator(record, to, { actor: "Automated Test" }), expected);
        assert.equal(records.ensureEstimatorRecord(record).status, expected ? to : from);
      });
    }
  }
});

test("unknown statuses are always rejected", () => {
  const record = recordAt("new_request");
  assert.equal(records.canTransitionEstimator(record, "unknown_status"), false);
  assert.equal(records.transitionEstimator(record, "unknown_status"), false);
  assert.equal(records.ensureEstimatorRecord(record).status, "new_request");
});

test("non-draft estimates cannot be edited or reopened through quote preparation", () => {
  for (const status of [
    "estimate_ready_to_preview", "estimate_previewed", "estimate_ready_to_send", "estimate_sent",
    "waiting_on_customer", "accepted", "declined", "scheduled_after_acceptance", "lost"
  ]) {
    const record = recordAt(status);
    const originalQuote = JSON.stringify(records.ensureEstimatorRecord(record).quote);
    assert.equal(records.updateEstimatorQuote(record, {
      estimateType: "standard",
      lineItems: [{ id: "line-1", label: "Should not save", quantity: 1, unitPrice: 100 }]
    }), false);
    assert.equal(records.ensureEstimatorRecord(record).status, status);
    assert.equal(JSON.stringify(records.ensureEstimatorRecord(record).quote), originalQuote);
  }
});

test("version 1 estimator data migrates to the current estimator schema", () => {
  const migrated = records.migrateEstimatorData({
    status: "follow_up_needed",
    followUp: { reason: "Call customer", nextAction: "Call" },
    handoff: { scheduling: "not_requested" }
  });
  assert.equal(migrated.schemaVersion, records.ESTIMATOR_SCHEMA_VERSION);
  assert.deepEqual(Array.from(migrated.followUp.attempts), []);
  assert.equal(migrated.followUp.completedAt, "");
  assert.equal(migrated.handoff.scheduling.status, "not_requested");
  assert.equal(migrated.handoff.scheduling.scheduledDate, "");
});

test("stored record state is rewritten with current schema versions", () => {
  const local = createStorage();
  const window = { localStorage: local };
  const context = vm.createContext({ window, localStorage: local, console, URLSearchParams, Date, JSON, Math, String, Number, Array, Object, Boolean, RegExp });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "ai-abcx-job-records.js"), "utf8"), context);
  const api = window.AIABCXJobRecords;
  local.setItem(api.storageKey, JSON.stringify({ schemaVersion: 1, records: [recordAt("new_request")], selectedRecordId: "test-new_request" }));
  const state = api.readState([]);
  const stored = JSON.parse(local.getItem(api.storageKey));
  assert.equal(state.schemaVersion, api.JOB_RECORDS_SCHEMA_VERSION);
  assert.equal(stored.schemaVersion, api.JOB_RECORDS_SCHEMA_VERSION);
  assert.equal(stored.records[0].estimator.schemaVersion, api.ESTIMATOR_SCHEMA_VERSION);
});

test("Estimator Director identity and level come from Account assignment", () => {
  const { api: accounts } = loadBrowserModule("ai-abcx-account-assignments.js", "AIABCXAccountAssignments");
  const assignment = accounts.getDashboardAssignment("estimator");
  assert.equal(assignment.userId, "user-alex-carter");
  assert.equal(assignment.name, "Alex Carter");
  assert.equal(assignment.level, "A");
});
