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
    revisions: [{ reason: "Keep this legacy reason.", status: "requested" }],
    followUp: { reason: "Call customer", nextAction: "Call" },
    handoff: { scheduling: "not_requested" }
  });
  assert.equal(migrated.schemaVersion, records.ESTIMATOR_SCHEMA_VERSION);
  assert.deepEqual(Array.from(migrated.followUp.attempts), []);
  assert.equal(migrated.followUp.completedAt, "");
  assert.equal(migrated.handoff.scheduling.status, "not_requested");
  assert.equal(migrated.handoff.scheduling.scheduledDate, "");

  const record = recordAt("revision_requested");
  record.estimator.schemaVersion = 2;
  record.estimator.revisions = migrated.revisions;
  const estimator = records.ensureEstimatorRecord(record);
  assert.equal(estimator.revisions[0].reason, "Keep this legacy reason.");
  assert.equal(estimator.revisions[0].requestedQuoteVersion, 1);
  assert.equal(estimator.revisions[0].originalQuote, null);
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

test("Estimator Director Level C identity comes from its Account assignment", () => {
  const { api: accounts } = loadBrowserModule("ai-abcx-account-assignments.js", "AIABCXAccountAssignments");
  accounts.writeAccount({
    accountId: "account-level-c",
    companyName: "Level C Company",
    users: [{
      userId: "user-estimator-c",
      name: "Casey Morgan",
      active: true,
      dashboards: [{ director: "estimator", level: "C", enabled: true }]
    }]
  });
  const assignment = accounts.getDashboardAssignment("estimator", "user-estimator-c");
  assert.equal(assignment.name, "Casey Morgan");
  assert.equal(assignment.level, "C");
  assert.equal(records.getEstimatorCapabilities(assignment.level).level, "C");
});

test("Estimator dashboard renders its sign-in identity from the assigned level", () => {
  const dashboard = fs.readFileSync(path.join(__dirname, "..", "estimator-dashboard.html"), "utf8");
  assert.match(dashboard, /id="estimatorAuthTitle"/);
  assert.match(dashboard, /estimatorAuthTitle\.textContent = estimatorTerms\.stageLabel/);
});

test("package estimates are available only to Estimator Director Level C", () => {
  assert.deepEqual(Array.from(records.getEstimatorCapabilities("A").estimateTypes), ["standard"]);
  assert.deepEqual(Array.from(records.getEstimatorCapabilities("B").estimateTypes), ["standard", "options"]);
  assert.deepEqual(Array.from(records.getEstimatorCapabilities("C").estimateTypes), ["standard", "options", "package", "quick"]);

  for (const level of ["A", "B"]) {
    const record = recordAt("new_request");
    record.estimator.level = level;
    assert.equal(records.updateEstimatorQuote(record, {
      estimateType: "package",
      customerScope: "Choose a service package.",
      lineItems: [{ label: "Essential package", quantity: 1, unitPrice: 200 }]
    }), false);
    assert.equal(records.ensureEstimatorRecord(record).status, "new_request");
  }

  const levelCRecord = recordAt("new_request");
  levelCRecord.estimator.level = "C";
  assert.equal(records.updateEstimatorQuote(levelCRecord, {
    estimateType: "package",
    customerScope: "Choose a service package.",
    lineItems: [{ label: "Essential package", quantity: 1, unitPrice: 200 }]
  }), true);
  assert.equal(records.ensureEstimatorRecord(levelCRecord).estimateType, "package");
  assert.equal(records.ensureEstimatorRecord(levelCRecord).status, "estimate_preparing");
});

test("legacy package line items migrate into structured Level C packages", () => {
  const record = recordAt("estimate_preparing");
  record.estimator.schemaVersion = 3;
  record.estimator.level = "C";
  record.estimator.estimateType = "package";
  record.estimator.quote = {
    version: 2,
    customerScope: "Legacy package scope.",
    lineItems: [
      { label: "Good", description: "Core service", quantity: 1, unitPrice: 200, optionId: "good" }
    ]
  };
  const estimator = records.ensureEstimatorRecord(record);
  assert.equal(estimator.schemaVersion, records.ESTIMATOR_SCHEMA_VERSION);
  assert.equal(estimator.quote.packages.length, 1);
  assert.equal(estimator.quote.packages[0].id, "good");
  assert.equal(estimator.quote.packages[0].name, "Good");
  assert.equal(estimator.quote.packages[0].includedServices[0].label, "Core service");
});

test("Level C structured package draft saves and persists nested included services", () => {
  const { api, localStorage } = loadBrowserModule("ai-abcx-job-records.js", "AIABCXJobRecords");
  const record = recordAt("new_request");
  record.id = "persisted-level-c-packages";
  record.estimator.level = "C";
  const packages = [
    { id: "good", name: "Good", description: "Essential coverage", price: 200, includedServices: [{ id: "good-1", label: "Core service" }, { id: "good-2", label: "Completion summary" }] },
    { id: "better", name: "Better", description: "Recommended coverage", price: 320, includedServices: [{ id: "better-1", label: "Core service" }, { id: "better-2", label: "Recommended enhancement" }] },
    { id: "best", name: "Best", description: "Premium coverage", price: 450, includedServices: [{ id: "best-1", label: "Core service" }, { id: "best-2", label: "Premium enhancement" }, { id: "best-3", label: "Priority support" }] }
  ];
  assert.equal(api.updateEstimatorQuote(record, {
    estimateType: "package",
    customerScope: "Choose the package that best fits the property.",
    packages
  }, "Estimator Director C"), true);
  let estimator = api.ensureEstimatorRecord(record);
  assert.equal(estimator.estimateType, "package");
  assert.equal(estimator.quote.packages.length, 3);
  assert.equal(estimator.quote.packages[2].includedServices[2].label, "Priority support");
  assert.equal(estimator.quote.lineItems.length, 3, "package choices remain compatible with shared quote summaries");
  assert.equal(estimator.quote.lineItems[2].optionId, "best");
  assert.equal(estimator.quote.subtotal, 200, "package quote starts at the lowest tier instead of adding all tiers");
  assert.deepEqual(Array.from(api.validateEstimatorQuote(record)), []);
  assert.equal(api.markEstimatorReadyToPreview(record, "Estimator Director C"), true);
  assert.equal(api.recordEstimatorPreview(record, "Estimator Director C"), true);
  assert.equal(api.markEstimatorReadyToSend(record, "Estimator Director C"), true);
  assert.equal(api.sendEstimatorQuote(record, { method: "manual_link" }, "Estimator Director C"), true);
  assert.equal(api.recordEstimatorDecision(record, { value: "accepted" }, "Customer"), false, "package acceptance requires a selected package");

  api.writeState([record], record.id);
  assert.ok(localStorage.getItem(api.storageKey));
  const reloaded = api.readState([]);
  estimator = api.ensureEstimatorRecord(api.findRecordById(reloaded.records, record.id));
  assert.equal(estimator.quote.packages[1].name, "Better");
  assert.equal(estimator.quote.packages[1].includedServices[1].label, "Recommended enhancement");
  assert.equal(estimator.quote.total, 200);
});

test("Level C package validation requires exactly Good, Better, and Best with included services", () => {
  const record = recordAt("new_request");
  record.estimator.level = "C";
  assert.equal(records.updateEstimatorQuote(record, {
    estimateType: "package",
    customerScope: "Choose a package.",
    packages: [
      { id: "good", name: "Good", price: 200, includedServices: [{ id: "one", label: "Only one service" }] },
      { id: "better", name: "Better", price: 300, includedServices: [{ id: "two", label: "Core" }, { id: "three", label: "Upgrade" }] }
    ]
  }), true);
  const errors = Array.from(records.validateEstimatorQuote(record));
  assert.ok(errors.includes("Package estimates require exactly three packages."));
  assert.ok(errors.includes("Package 1 needs at least two included services."));

  const wrongNames = recordAt("new_request");
  wrongNames.estimator.level = "C";
  assert.equal(records.updateEstimatorQuote(wrongNames, {
    estimateType: "package",
    customerScope: "Choose a package.",
    packages: [
      { id: "starter", name: "Starter", price: 200, includedServices: [{ id: "s1", label: "Core" }, { id: "s2", label: "Summary" }] },
      { id: "growth", name: "Growth", price: 300, includedServices: [{ id: "g1", label: "Core" }, { id: "g2", label: "Upgrade" }] },
      { id: "premium", name: "Premium", price: 400, includedServices: [{ id: "p1", label: "Core" }, { id: "p2", label: "Priority" }] }
    ]
  }), true);
  assert.ok(Array.from(records.validateEstimatorQuote(wrongNames)).includes("Package estimates must use Good, Better, and Best in order."));

  const extraTier = recordAt("new_request");
  extraTier.estimator.level = "C";
  assert.equal(records.updateEstimatorQuote(extraTier, {
    estimateType: "package",
    customerScope: "Choose a package.",
    packages: [
      { id: "good", name: "Good", price: 200, includedServices: [{ id: "a1", label: "Core" }, { id: "a2", label: "Summary" }] },
      { id: "better", name: "Better", price: 300, includedServices: [{ id: "b1", label: "Core" }, { id: "b2", label: "Upgrade" }] },
      { id: "best", name: "Best", price: 400, includedServices: [{ id: "c1", label: "Core" }, { id: "c2", label: "Priority" }] },
      { id: "elite", name: "Elite", price: 500, includedServices: [{ id: "d1", label: "Core" }, { id: "d2", label: "Concierge" }] }
    ]
  }), true);
  assert.ok(Array.from(records.validateEstimatorQuote(extraTier)).includes("Package estimates require exactly three packages."));
});

test("Estimator dashboard includes the nested Level C package editor controls", () => {
  const dashboard = fs.readFileSync(path.join(__dirname, "..", "estimator-dashboard.html"), "utf8");
  assert.match(dashboard, /data-quote-package/);
  assert.match(dashboard, /data-package-services/);
  assert.match(dashboard, /data-estimator-action="add-package-service"/);
  assert.match(dashboard, /data-estimator-action="remove-package-service"/);
  assert.match(dashboard, /\$\{isChoiceEstimate \? "" : `<button class="action-btn primary" type="button" data-estimator-decision="accepted">Accept<\/button>`\}/);
  assert.doesNotMatch(dashboard, /\$\{isOptions \? "" : `<button class="action-btn primary" type="button" data-estimator-decision="accepted">Accept<\/button>`\}/);
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

test("Level B options revision preserves both quote versions through persisted acceptance", () => {
  const { api, localStorage } = loadBrowserModule("ai-abcx-job-records.js", "AIABCXJobRecords");
  const record = recordAt("new_request");
  record.id = "persisted-options-revision";
  record.jobNumber = "PERSISTED-REVISION";
  record.customerName = "Revision Customer";
  record.estimator.level = "B";

  assert.equal(api.updateEstimatorQuote(record, {
    estimateType: "options",
    customerScope: "Original exterior service scope.",
    lineItems: [
      { id: "essential", label: "Essential", quantity: 1, unitPrice: 200, optionId: "essential" },
      { id: "complete", label: "Complete", quantity: 1, unitPrice: 300, optionId: "complete" }
    ]
  }, "Estimator Director"), true);
  const originalVersion = api.ensureEstimatorRecord(record).quote.version;
  assert.equal(api.markEstimatorReadyToPreview(record, "Estimator Director"), true);
  assert.equal(api.recordEstimatorPreview(record, "Estimator Director"), true);
  assert.equal(api.markEstimatorReadyToSend(record, "Estimator Director"), true);
  assert.equal(api.sendEstimatorQuote(record, { method: "email" }, "Estimator Director"), true);

  const revisionReason = "Please expand the scope and revise the Complete option price.";
  assert.equal(api.recordEstimatorDecision(record, {
    value: "revision_requested",
    reason: revisionReason
  }, "Customer"), true);
  let estimator = api.ensureEstimatorRecord(record);
  assert.equal(estimator.status, "revision_requested");
  assert.equal(estimator.revisions.length, 1);
  assert.equal(estimator.revisions[0].reason, revisionReason);
  assert.equal(estimator.revisions[0].requestedQuoteVersion, originalVersion);
  assert.equal(estimator.revisions[0].originalQuote.quote.customerScope, "Original exterior service scope.");
  assert.equal(estimator.revisions[0].originalQuote.quote.lineItems[1].unitPrice, 300);

  assert.equal(api.updateEstimatorQuote(record, { customerScope: "Must not bypass return-to-draft." }), false);
  assert.equal(api.returnEstimatorToDraft(record, "Estimator Director"), true);
  estimator = api.ensureEstimatorRecord(record);
  assert.equal(estimator.status, "estimate_preparing");
  assert.equal(estimator.decision.value, "pending");
  assert.equal(estimator.preview.quoteVersion, 0);
  assert.equal(api.markEstimatorReadyToPreview(record, "Estimator Director"), false, "revision must create a new quote version before preview");

  assert.equal(api.updateEstimatorQuote(record, {
    estimateType: "options",
    customerScope: "Revised exterior and drainage service scope.",
    lineItems: [
      { id: "essential", label: "Essential", quantity: 1, unitPrice: 225, optionId: "essential" },
      { id: "complete", label: "Complete", quantity: 1, unitPrice: 360, optionId: "complete" }
    ]
  }, "Estimator Director"), true);
  const revisedVersion = api.ensureEstimatorRecord(record).quote.version;
  assert.ok(revisedVersion > originalVersion);
  assert.equal(api.markEstimatorReadyToSend(record, "Estimator Director"), false, "revised quote cannot skip preview");
  assert.equal(api.markEstimatorReadyToPreview(record, "Estimator Director"), true);
  assert.equal(api.recordEstimatorPreview(record, "Estimator Director"), true);
  assert.equal(api.markEstimatorReadyToSend(record, "Estimator Director"), true);
  assert.equal(api.sendEstimatorQuote(record, { method: "email" }, "Estimator Director"), true);

  estimator = api.ensureEstimatorRecord(record);
  assert.equal(estimator.revisions[0].status, "resent");
  assert.equal(estimator.revisions[0].revisedQuoteVersion, revisedVersion);
  assert.equal(estimator.revisions[0].revisedQuote.quote.customerScope, "Revised exterior and drainage service scope.");
  assert.equal(estimator.revisions[0].originalQuote.quote.lineItems[1].unitPrice, 300, "original sent quote remains immutable");

  assert.equal(api.recordEstimatorDecision(record, {
    value: "accepted",
    selectedOptionId: "complete",
    reason: "Customer selected the revised Complete option."
  }, "Customer"), true);
  estimator = api.ensureEstimatorRecord(record);
  assert.equal(estimator.status, "accepted");
  assert.equal(estimator.quote.total, 360);
  assert.equal(estimator.revisions[0].status, "accepted");
  assert.equal(estimator.revisions[0].acceptedTotal, 360);
  assert.equal(estimator.revisions[0].selectedOptionId, "complete");

  api.writeState([record], record.id);
  assert.ok(localStorage.getItem(api.storageKey));
  const reloaded = api.readState([]);
  const persisted = api.findRecordById(reloaded.records, record.id);
  const persistedEstimator = api.ensureEstimatorRecord(persisted);
  assert.equal(persistedEstimator.status, "accepted");
  assert.equal(persistedEstimator.quote.total, 360);
  assert.equal(persistedEstimator.revisions.length, 1);
  assert.equal(persistedEstimator.revisions[0].reason, revisionReason);
  assert.equal(persistedEstimator.revisions[0].originalQuote.quote.lineItems[1].unitPrice, 300);
  assert.equal(persistedEstimator.revisions[0].revisedQuote.quote.lineItems[1].unitPrice, 360);
  assert.equal(persistedEstimator.revisions[0].acceptedTotal, 360);
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
