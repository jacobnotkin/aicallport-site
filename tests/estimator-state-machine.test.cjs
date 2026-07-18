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

test("Level A rejects options estimates", () => {
  const record = recordAt("new_request");
  assert.equal(records.updateEstimatorQuote(record, {
    estimateType: "options",
    customerScope: "Choose a service path.",
    lineItems: [
      { label: "Essential", quantity: 1, unitPrice: 100, optionId: "essential" },
      { label: "Complete", quantity: 1, unitPrice: 200, optionId: "complete" }
    ]
  }), false);
  assert.equal(records.ensureEstimatorRecord(record).status, "new_request");
});

test("Level B options estimate works through customer selection and acceptance", () => {
  const record = recordAt("new_request");
  record.estimator.level = "B";

  assert.equal(records.updateEstimatorQuote(record, {
    estimateType: "options",
    customerScope: "Choose the service level that best fits the property.",
    discountAmount: 10,
    taxRate: 20,
    lineItems: [
      { id: "line-essential", label: "Essential", description: "Core service", quantity: 1, unitPrice: 100, optionId: "essential" },
      { id: "line-complete", label: "Complete", description: "Core service and enhancement", quantity: 1, unitPrice: 200, optionId: "complete" }
    ]
  }, "Estimator Director"), true);

  let estimator = records.ensureEstimatorRecord(record);
  assert.equal(estimator.status, "estimate_preparing");
  assert.equal(estimator.estimateType, "options");
  assert.equal(estimator.quote.subtotal, 100, "unselected alternatives use the lowest starting price, not an additive total");
  assert.equal(estimator.quote.total, 108);
  assert.deepEqual(Array.from(records.validateEstimatorQuote(record)), []);

  assert.equal(records.markEstimatorReadyToPreview(record, "Estimator Director"), true);
  assert.equal(records.recordEstimatorPreview(record, "Estimator Director"), true);
  assert.equal(records.markEstimatorReadyToSend(record, "Estimator Director"), true);
  assert.equal(records.sendEstimatorQuote(record, { method: "manual_link" }, "Estimator Director"), true);
  assert.equal(records.ensureEstimatorRecord(record).status, "waiting_on_customer");

  assert.equal(records.recordEstimatorDecision(record, { value: "accepted" }, "Customer"), false, "acceptance requires a selected option");
  assert.equal(records.recordEstimatorDecision(record, { value: "accepted", selectedOptionId: "unknown" }, "Customer"), false, "acceptance rejects an unknown option");
  assert.equal(records.recordEstimatorDecision(record, {
    value: "accepted",
    selectedOptionId: "complete",
    reason: "Customer selected Complete."
  }, "Customer"), true);

  estimator = records.ensureEstimatorRecord(record);
  assert.equal(estimator.status, "accepted");
  assert.equal(estimator.decision.selectedOptionId, "complete");
  assert.equal(estimator.quote.subtotal, 200);
  assert.equal(estimator.quote.taxAmount, 38);
  assert.equal(estimator.quote.total, 228);
});

test("options estimate validation requires two distinct option IDs", () => {
  const record = recordAt("new_request");
  record.estimator.level = "B";
  assert.equal(records.updateEstimatorQuote(record, {
    estimateType: "options",
    customerScope: "Choose one.",
    lineItems: [{ label: "Only choice", quantity: 1, unitPrice: 100, optionId: "same" }]
  }), true);
  assert.ok(Array.from(records.validateEstimatorQuote(record)).includes("Options estimates require at least two customer choices."));

  assert.equal(records.updateEstimatorQuote(record, {
    estimateType: "options",
    lineItems: [
      { label: "Choice one", quantity: 1, unitPrice: 100, optionId: "same" },
      { label: "Choice two", quantity: 1, unitPrice: 150, optionId: "same" }
    ]
  }), true);
  assert.ok(Array.from(records.validateEstimatorQuote(record)).includes("Options estimate choice IDs must be unique."));
});
