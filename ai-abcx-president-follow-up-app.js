(function () {
  const stageConfig = window.AIABCStageConfig;
  const jobRecords = window.AIABCXJobRecords;
  const workflowHelpers = window.AIABCXWorkflowHelpers;
  const params = new URLSearchParams(window.location.search);
  const requestedStage = stageConfig.normalizeStage(params.get("stage") || stageConfig.getCurrentStage(), "A");
  const requestedJob = params.get("job");
  const requestedSource = params.get("source") || "";
  const requestedFollowUpReason = params.get("followup") || "";
  stageConfig.setCurrentStage(requestedStage);

  const {
    STATUS_OPTIONS,
    OUTCOMES,
    getStatusLabel,
    getOutcomeLabel,
    statusClass
  } = workflowHelpers;

  const elements = {
    pageIntro: document.getElementById("pageIntro"),
    stageChip: document.getElementById("stageChip"),
    statusChip: document.getElementById("statusChip"),
    stageNote: document.getElementById("stageNote"),
    queueGroups: document.getElementById("queueGroups"),
    summaryGrid: document.getElementById("summaryGrid"),
    recordHeading: document.getElementById("recordHeading"),
    recordSub: document.getElementById("recordSub"),
    recordTags: document.getElementById("recordTags"),
    jobNumber: document.getElementById("jobNumber"),
    assignedRep: document.getElementById("assignedRep"),
    customerName: document.getElementById("customerName"),
    customerPhone: document.getElementById("customerPhone"),
    requestedTime: document.getElementById("requestedTime"),
    confirmedTime: document.getElementById("confirmedTime"),
    statusSelect: document.getElementById("statusSelect"),
    outcomeSelect: document.getElementById("outcomeSelect"),
    followUpReasonField: document.getElementById("followUpReasonField"),
    followUpReasonSelect: document.getElementById("followUpReasonSelect"),
    amountPaid: document.getElementById("amountPaid"),
    appointmentType: document.getElementById("appointmentType"),
    notesField: document.getElementById("notesField"),
    actionIntro: document.getElementById("actionIntro"),
    actionRow: document.getElementById("actionRow"),
    recommendationIntro: document.getElementById("recommendationIntro"),
    recommendationLabel: document.getElementById("recommendationLabel"),
    recommendationTitle: document.getElementById("recommendationTitle"),
    recommendationText: document.getElementById("recommendationText"),
    recommendationGrid: document.getElementById("recommendationGrid"),
    timelineIntro: document.getElementById("timelineIntro"),
    timeline: document.getElementById("timeline"),
    saveStatus: document.getElementById("saveStatus"),
    saveBtn: document.getElementById("saveBtn"),
    openDashboardBtn: document.getElementById("openDashboardBtn"),
    openRecordBtn: document.getElementById("openRecordBtn"),
    presidentNavLink: document.getElementById("presidentNavLink"),
    jobRecordsNavLink: document.getElementById("jobRecordsNavLink"),
    dispatcherNavLink: document.getElementById("dispatcherNavLink"),
    crmNavLink: document.getElementById("crmNavLink"),
    followUpNavLink: document.getElementById("followUpNavLink"),
    settingsNavLink: document.getElementById("settingsNavLink")
  };

  const state = loadState();
  let currentStage = requestedStage;
  let selectedRecordId = resolveInitialRecordId();

  const editableFields = {
    assignedRep: "assignedRep",
    customerName: "customerName",
    customerPhone: "customerPhone",
    requestedTime: "requestedTime",
    confirmedTime: "confirmedTime",
    amountPaid: "amountPaid",
    notesField: "notes"
  };

  Object.entries(editableFields).forEach(([id, key]) => {
    const node = elements[id];
    node.addEventListener("input", () => {
      const record = getSelectedRecord();
      if (!record) return;
      record[key] = key === "amountPaid" ? Number(node.value || 0) : node.value;
      setSaveStatus("Unsaved President follow-up changes in progress.", "");
      renderTopline();
      renderQueue();
    });
  });

  elements.statusSelect.addEventListener("input", () => {
    const record = getSelectedRecord();
    if (!record) return;
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    stageRecord.status = elements.statusSelect.value;
    if (stageRecord.status === "follow_up_needed") {
      stageRecord.outcome = "follow_up_needed";
      stageRecord.followUpReason = stageRecord.followUpReason || getDefaultFollowUpReason(record);
    }
    setSaveStatus("Stage status changed. Save to lock the new President follow-up truth.", "");
    render();
  });

  elements.outcomeSelect.addEventListener("input", () => {
    const record = getSelectedRecord();
    if (!record) return;
    jobRecords.ensureStageRecord(record, currentStage).outcome = elements.outcomeSelect.value;
    setSaveStatus("Business outcome changed. Save when the President truth is correct.", "");
    render();
  });

  elements.followUpReasonSelect.addEventListener("input", () => {
    const record = getSelectedRecord();
    if (!record) return;
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    stageRecord.followUpReason = elements.followUpReasonSelect.value;
    setSaveStatus("Follow-up next step changed. Save when the President guidance is correct.", "");
    render();
  });

  document.querySelectorAll(".stage-btn").forEach((button) => {
    button.addEventListener("click", () => {
      currentStage = button.dataset.stage;
      stageConfig.setCurrentStage(currentStage);
      syncUrl();
      render();
    });
  });

  elements.saveBtn.addEventListener("click", () => {
    const record = getSelectedRecord();
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    const validation = validateForSave(record, stageRecord);
    if (validation) {
      setSaveStatus(validation, "error");
      return;
    }
    jobRecords.writeState(state.records, selectedRecordId);
    setSaveStatus(
      currentStage === "A"
        ? "Stage A President follow-up saved on the shared record."
        : "Stage B President follow-up saved on the shared record.",
      "success"
    );
    render();
  });

  elements.openDashboardBtn.addEventListener("click", () => {
    window.location.href = buildHref("new-president-dashboard.html", { source: "president-follow-up" });
  });

  elements.openRecordBtn.addEventListener("click", () => {
    window.location.href = buildHref("job-records.html", { source: "president-follow-up" });
  });

  function loadState() {
    return jobRecords.readState(jobRecords.getBaseRecords());
  }

  function resolveInitialRecordId() {
    const preferredId = requestedJob || state.selectedRecordId || (state.records[0] && state.records[0].id);
    return state.records.some((record) => record.id === preferredId) ? preferredId : (state.records[0] ? state.records[0].id : "");
  }

  function getSelectedRecord() {
    return state.records.find((record) => record.id === selectedRecordId) || state.records[0] || null;
  }

  function getSelectedFollowUpReason() {
    const record = getSelectedRecord();
    if (!record) return "";
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    return stageRecord.status === "follow_up_needed" && stageRecord.followUpReason
      ? stageRecord.followUpReason
      : "";
  }

  function syncUrl() {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("stage", currentStage);
    if (selectedRecordId) nextUrl.searchParams.set("job", selectedRecordId);
    if (requestedSource) nextUrl.searchParams.set("source", requestedSource);
    const followUpReason = getSelectedFollowUpReason();
    if (followUpReason) nextUrl.searchParams.set("followup", followUpReason);
    else nextUrl.searchParams.delete("followup");
    window.history.replaceState({}, "", nextUrl.toString());
  }

  function buildHref(path, overrides = {}) {
    const next = new URLSearchParams(params.toString());
    next.set("stage", currentStage);
    if (selectedRecordId) {
      next.set("job", selectedRecordId);
    } else {
      next.delete("job");
    }
    const followUpReason = getSelectedFollowUpReason();
    if (followUpReason) {
      next.set("followup", followUpReason);
    } else {
      next.delete("followup");
    }
    Object.entries(overrides).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    return `${path}?${next.toString()}`;
  }

  function syncNavLinks() {
    if (elements.presidentNavLink) {
      elements.presidentNavLink.href = buildHref("new-president-dashboard.html", { source: "president-follow-up" });
    }
    if (elements.jobRecordsNavLink) {
      elements.jobRecordsNavLink.href = buildHref("job-records.html", { source: "president-follow-up" });
    }
    if (elements.dispatcherNavLink) {
      elements.dispatcherNavLink.href = buildHref("dispatcher-dashboard.html", { source: "president-follow-up" });
    }
    if (elements.crmNavLink) {
      elements.crmNavLink.href = buildHref("crm.html", { source: "president-follow-up" });
    }
    if (elements.followUpNavLink) {
      elements.followUpNavLink.href = buildHref("president-follow-up.html", { source: "president-follow-up" });
    }
    if (elements.settingsNavLink) {
      elements.settingsNavLink.href = buildHref("settings.html", { source: "president-follow-up" });
    }
  }

  function buildSelect(selectNode, options) {
    selectNode.innerHTML = "";
    options.forEach((option) => {
      const node = document.createElement("option");
      node.value = option.value;
      node.textContent = option.label;
      selectNode.appendChild(node);
    });
  }

  function appendActivity(record, title, text) {
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];
    stageRecord.activity.push({
      time: jobRecords.buildWorkerTimeLabel(),
      title,
      text
    });
  }

  function isClosedStatus(status) {
    return ["completed", "canceled", "no_show"].includes(status);
  }

  function recordNeedsRevenueTruth(record, stageRecord) {
    if (stageRecord.outcome === "sold_and_completed" || stageRecord.outcome === "service_completed" || stageRecord.outcome === "sold_not_completed") {
      return Number(record.amountPaid || 0) <= 0;
    }
    return false;
  }

  function recordNeedsOutcomeBeforeClose(stageRecord) {
    return isClosedStatus(stageRecord.status) && stageRecord.outcome === "pending";
  }

  function canMarkCompleted(record, stageRecord) {
    if (currentStage === "A" && ["confirmed", "follow_up_needed", "no_show"].includes(stageRecord.status)) return true;
    if (currentStage === "B" && ["confirmed", "in_progress", "follow_up_needed"].includes(stageRecord.status)) return true;
    if (isClosedStatus(stageRecord.status)) return stageRecord.outcome !== "pending" || Number(record.amountPaid || 0) > 0;
    return false;
  }

  function validateForSave(record, stageRecord) {
    if (!record) return "No record selected.";
    if (currentStage === "A" && ["awaiting_manual_confirmation", "confirmed", "rescheduled"].includes(stageRecord.status) && !String(record.confirmedTime || "").trim()) {
      return "Stage A requires a final confirmed time before this status should be saved.";
    }
    if (recordNeedsOutcomeBeforeClose(stageRecord)) {
      return "Closed follow-up states need a real business outcome before saving.";
    }
    if (recordNeedsRevenueTruth(record, stageRecord)) {
      return "This closed revenue outcome needs amount paid entered before saving.";
    }
    if (stageRecord.status === "follow_up_needed" && !String(stageRecord.followUpReason || "").trim()) {
      return "Follow-up records need a concrete next-step reason before saving.";
    }
    return "";
  }

  function getFollowUpProfile(record) {
    const type = record && record.appointmentType ? record.appointmentType : "service";
    if (type === "sales") {
      return {
        label: "Sales Follow-Up",
        stageALabel: "Keep Sales Follow-Up Open",
        stageBLabel: "Keep Sales Follow-Up Active",
        title: "Keep estimate follow-up explicit and conversion-focused.",
        text: "Sales follow-up should preserve estimate revision, decision timing, and clear ownership for the next conversion step.",
        standard: "No loose estimate follow-up without owner and decision timing"
      };
    }
    if (type === "sales_and_service") {
      return {
        label: "Conversion Follow-Up",
        stageALabel: "Keep Conversion Follow-Up Open",
        stageBLabel: "Keep Conversion Follow-Up Active",
        title: "Keep the estimate-to-work path visible until the business result is complete.",
        text: "Mixed follow-up should preserve both conversion pressure and service execution readiness so the record does not split into separate truths.",
        standard: "One shared record from quote through work and payment"
      };
    }
    return {
      label: "Service Follow-Up",
      stageALabel: "Keep Service Follow-Up Open",
      stageBLabel: "Keep Service Follow-Up Active",
      title: "Keep service completion follow-up explicit and operationally grounded.",
      text: "Service follow-up should preserve the remaining operational step, expected completion timing, and any pending payment truth.",
      standard: "No vague service return or unresolved completion state"
    };
  }

  function getFollowUpReasonOptions(record) {
    const type = record && record.appointmentType ? record.appointmentType : "service";
    const base = [{ value: "", label: "Select Next Step" }];
    if (type === "sales") {
      return base.concat([
        { value: "estimate_revision", label: "Estimate Revision" },
        { value: "customer_decision_pending", label: "Customer Decision Pending" },
        { value: "outbound_recovery", label: "Outbound Recovery Needed" }
      ]);
    }
    if (type === "sales_and_service") {
      return base.concat([
        { value: "same_day_conversion_pending", label: "Same-Day Conversion Pending" },
        { value: "approved_schedule_hold", label: "Approved But Schedule Hold" },
        { value: "estimate_revision_then_return_visit", label: "Estimate Revision Then Return Visit" }
      ]);
    }
    return base.concat([
      { value: "return_visit_required", label: "Return Visit Required" },
      { value: "parts_hold", label: "Parts Hold" },
      { value: "service_completion_pending", label: "Service Completion Pending" }
    ]);
  }

  function getDefaultFollowUpReason(record) {
    const options = getFollowUpReasonOptions(record);
    return options[1] ? options[1].value : "";
  }

  function getFollowUpReasonLabel(record, value) {
    const match = getFollowUpReasonOptions(record).find((option) => option.value === value);
    return match ? match.label : "Next Step Not Set";
  }

  function ensureFollowUpReason(stageRecord, record) {
    if (!stageRecord.followUpReason && stageRecord.status === "follow_up_needed") {
      stageRecord.followUpReason = getDefaultFollowUpReason(record);
    }
  }

  function applyStageAAction(actionId) {
    const record = getSelectedRecord();
    if (!record) return;
    const stageRecord = jobRecords.ensureStageRecord(record, "A");
    if (actionId === "move_to_manual_confirmation") {
      stageRecord.status = "awaiting_manual_confirmation";
      appendActivity(record, "President moved record to manual confirmation", `The President moved ${jobRecords.formatJobRef(record)} into the manual confirmation lane.`);
    }
    if (actionId === "confirm_appointment") {
      if (!record.confirmedTime || !record.confirmedTime.trim()) {
        setSaveStatus("Final confirmed time is required before manual confirmation can be locked.", "error");
        return;
      }
      stageRecord.status = "confirmed";
      appendActivity(record, "President confirmed appointment", `The President locked ${jobRecords.formatJobRef(record)} at ${record.confirmedTime}.`);
    }
    if (actionId === "mark_completed") {
      stageRecord.status = "completed";
      if (stageRecord.outcome === "pending") {
        stageRecord.outcome = record.appointmentType === "service" ? "service_completed" : "estimate_given";
      }
      appendActivity(record, "President recorded completed result", `The President closed ${jobRecords.formatJobRef(record)} with completed follow-up truth.`);
    }
    if (actionId === "mark_follow_up") {
      stageRecord.status = "follow_up_needed";
      stageRecord.outcome = "follow_up_needed";
      stageRecord.followUpReason = stageRecord.followUpReason || getDefaultFollowUpReason(record);
      appendActivity(record, "President kept follow-up open", `The President kept ${jobRecords.formatJobRef(record)} alive for ${getFollowUpReasonLabel(record, stageRecord.followUpReason)}.`);
    }
    if (actionId === "mark_rescheduled") {
      stageRecord.status = "rescheduled";
      appendActivity(record, "President marked rescheduled", `The President moved ${jobRecords.formatJobRef(record)} into a replacement-time path.`);
    }
    if (actionId === "mark_no_show") {
      stageRecord.status = "no_show";
      stageRecord.outcome = "no_show";
      appendActivity(record, "President marked no-show", `The President recorded ${jobRecords.formatJobRef(record)} as a no-show.`);
    }
    if (actionId === "mark_canceled") {
      stageRecord.status = "canceled";
      stageRecord.outcome = "canceled";
      appendActivity(record, "President marked canceled", `The President closed ${jobRecords.formatJobRef(record)} as canceled.`);
    }
    setSaveStatus("Stage A President follow-up action applied. Save to preserve it.", "");
    render();
  }

  function applyStageBAction(actionId) {
    const record = getSelectedRecord();
    if (!record) return;
    const stageRecord = jobRecords.ensureStageRecord(record, "B");
    if (actionId === "customer_confirm") {
      const changed = jobRecords.writeCustomerConfirmation({
        records: state.records,
        jobId: record.id,
        stage: "B"
      });
      if (!changed) {
        setSaveStatus("Customer confirmation override is not available from the current Stage B state.", "error");
        return;
      }
    }
    if (actionId === "mark_completed") {
      stageRecord.status = "completed";
      if (stageRecord.outcome === "pending") {
        stageRecord.outcome = record.appointmentType === "service" ? "service_completed" : "sold_and_completed";
      }
      appendActivity(record, "President accepted completed closeout", `The President accepted the completed closeout on ${jobRecords.formatJobRef(record)}.`);
    }
    if (actionId === "mark_follow_up") {
      stageRecord.status = "follow_up_needed";
      stageRecord.outcome = "follow_up_needed";
      stageRecord.followUpReason = stageRecord.followUpReason || getDefaultFollowUpReason(record);
      appendActivity(record, "President kept Stage B follow-up active", `The President kept ${jobRecords.formatJobRef(record)} open for ${getFollowUpReasonLabel(record, stageRecord.followUpReason)} after automation.`);
    }
    if (actionId === "mark_canceled") {
      stageRecord.status = "canceled";
      stageRecord.outcome = "canceled";
      appendActivity(record, "President marked canceled after review", `The President closed ${jobRecords.formatJobRef(record)} as canceled after follow-up review.`);
    }
    setSaveStatus("Stage B President follow-up action applied. Save to preserve it.", "");
    render();
  }

  function getQueueGroups() {
    const records = state.records.map((record) => ({
      record,
      stageRecord: jobRecords.ensureStageRecord(record, currentStage)
    }));
    if (currentStage === "A") {
      return [
        {
          label: "Manual Confirmation",
          items: records.filter((entry) => ["provisional", "awaiting_manual_confirmation", "rescheduled"].includes(entry.stageRecord.status))
        },
        {
          label: "Post-Appointment Follow-Up",
          items: records.filter((entry) => ["confirmed", "follow_up_needed"].includes(entry.stageRecord.status))
        },
        {
          label: "Revenue / Outcome Review",
          items: records.filter((entry) => ["completed", "canceled", "no_show"].includes(entry.stageRecord.status))
        }
      ];
    }
    return [
      {
        label: "Automation Gates",
        items: records.filter((entry) => ["awaiting_worker_assignment", "awaiting_worker_confirmation", "awaiting_customer_confirmation", "rerouted"].includes(entry.stageRecord.status))
      },
      {
        label: "Live Appointment Follow-Up",
        items: records.filter((entry) => ["confirmed", "in_progress", "follow_up_needed"].includes(entry.stageRecord.status))
      },
      {
        label: "Revenue / CEO Review",
        items: records.filter((entry) => ["completed", "canceled", "no_show"].includes(entry.stageRecord.status))
      }
    ];
  }

  function renderQueue() {
    const groups = getQueueGroups();
    elements.queueGroups.innerHTML = groups.map((group) => {
      if (!group.items.length) return "";
      return `
        <div class="group">
          <div class="group-head"><strong>${group.label}</strong><span>${group.items.length} record${group.items.length === 1 ? "" : "s"}</span></div>
          <div class="queue-list">
            ${group.items.map((entry) => {
              const record = entry.record;
              const stageRecord = entry.stageRecord;
              return `
                <button class="queue-item${record.id === selectedRecordId ? " active" : ""}" type="button" data-record-id="${record.id}">
                  <strong>${record.customerName}</strong>
                  <p>${jobRecords.formatJobRef(record)} • ${record.confirmedTime || record.requestedTime || "Time pending"}</p>
                  <span>${getStatusLabel(currentStage, stageRecord.status)} • ${getOutcomeLabel(stageRecord.outcome)}</span>
                </button>`;
            }).join("")}
          </div>
        </div>`;
    }).join("");
    elements.queueGroups.querySelectorAll("[data-record-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedRecordId = button.dataset.recordId;
        syncUrl();
        render();
      });
    });
  }

  function summarizeRecords() {
    const entries = state.records.map((record) => jobRecords.ensureStageRecord(record, currentStage));
    return {
      total: entries.length,
      active: entries.filter((entry) => ["provisional", "awaiting_manual_confirmation", "rescheduled", "awaiting_worker_assignment", "awaiting_worker_confirmation", "awaiting_customer_confirmation", "rerouted", "confirmed", "in_progress", "follow_up_needed"].includes(entry.status)).length,
      revenue: state.records.filter((record) => Number(record.amountPaid || 0) > 0).reduce((sum, record) => sum + Number(record.amountPaid || 0), 0),
      closed: entries.filter((entry) => ["completed", "canceled", "no_show"].includes(entry.status)).length
    };
  }

  function renderSummary() {
    const summary = summarizeRecords();
    const selectedRecord = getSelectedRecord();
    const stageRecord = jobRecords.ensureStageRecord(selectedRecord, currentStage);
    const items = [
      ["Queue Size", String(summary.total), `${summary.active} still need President attention or visibility`],
      ["Selected Gate", getStatusLabel(currentStage, stageRecord.status), currentStage === "A" ? "Manual follow-up stage" : "Post-automation follow-up stage"],
      ["Revenue Truth", summary.revenue ? `$${summary.revenue.toLocaleString()}` : "$0", "Total amount paid visible on shared records"],
      ["Closed Outcomes", String(summary.closed), `${getOutcomeLabel(stageRecord.outcome)} on the selected record`]
    ];
    elements.summaryGrid.innerHTML = items.map((item) => `
      <div class="stat">
        <label>${item[0]}</label>
        <strong>${item[1]}</strong>
        <span>${item[2]}</span>
      </div>
    `).join("");
  }

  function renderForm() {
    const record = getSelectedRecord();
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    ensureFollowUpReason(stageRecord, record);
    buildSelect(elements.statusSelect, STATUS_OPTIONS[currentStage]);
    buildSelect(elements.outcomeSelect, OUTCOMES);
    buildSelect(elements.followUpReasonSelect, getFollowUpReasonOptions(record));
    elements.jobNumber.value = record.jobNumber;
    elements.assignedRep.value = record.assignedRep;
    elements.customerName.value = record.customerName;
    elements.customerPhone.value = record.customerPhone;
    elements.requestedTime.value = record.requestedTime;
    elements.confirmedTime.value = record.confirmedTime;
    elements.statusSelect.value = stageRecord.status;
    elements.outcomeSelect.value = stageRecord.outcome;
    elements.followUpReasonSelect.value = stageRecord.followUpReason || "";
    elements.amountPaid.value = String(record.amountPaid || 0);
    elements.appointmentType.value = jobRecords.getAppointmentTypeLabel(record.appointmentType);
    elements.notesField.value = record.notes;
    elements.recordHeading.textContent = `${record.customerName} • ${jobRecords.formatJobRef(record)}`;
    elements.recordSub.textContent = currentStage === "A"
      ? "Stage A keeps this record under President scheduling and outcome truth."
      : "Stage B keeps the front-end automation active, but this follow-up lane still protects revenue and next-step truth.";
    elements.followUpReasonField.style.display = stageRecord.status === "follow_up_needed" ? "" : "none";
    elements.recordTags.innerHTML = [
      `<span class="tag ${statusClass(stageRecord.status)}">${getStatusLabel(currentStage, stageRecord.status)}</span>`,
      `<span class="tag blue">${getOutcomeLabel(stageRecord.outcome)}</span>`,
      `${stageRecord.status === "follow_up_needed" ? `<span class="tag orange">${getFollowUpReasonLabel(record, stageRecord.followUpReason)}</span>` : ""}`,
      `<span class="tag ${Number(record.amountPaid || 0) > 0 ? "green" : "orange"}">${Number(record.amountPaid || 0) > 0 ? `$${Number(record.amountPaid).toLocaleString()}` : "No payment yet"}</span>`
    ].join("");
  }

  function renderActions() {
    const record = getSelectedRecord();
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    const followUpProfile = getFollowUpProfile(record);
    let actions = [];
    if (currentStage === "A") {
      if (stageRecord.status === "provisional") actions = [{ id: "move_to_manual_confirmation", label: "Move To Manual Confirmation", primary: true }];
      if (["awaiting_manual_confirmation", "rescheduled"].includes(stageRecord.status)) actions = [{ id: "confirm_appointment", label: "Confirm Appointment", primary: true }, { id: "mark_canceled", label: "Mark Canceled" }];
      if (stageRecord.status === "confirmed") actions = [{ id: "mark_completed", label: "Record Completed", primary: true, disabled: !canMarkCompleted(record, stageRecord) }, { id: "mark_follow_up", label: followUpProfile.stageALabel }, { id: "mark_no_show", label: "Mark No Show" }, { id: "mark_rescheduled", label: "Mark Rescheduled" }];
      if (["follow_up_needed", "completed", "no_show", "canceled"].includes(stageRecord.status)) actions = [{ id: "mark_follow_up", label: followUpProfile.stageALabel, primary: stageRecord.status !== "follow_up_needed" }, { id: "mark_completed", label: "Mark Completed", disabled: !canMarkCompleted(record, stageRecord) }, { id: "mark_canceled", label: "Mark Canceled", disabled: stageRecord.status === "completed" && Number(record.amountPaid || 0) > 0 }];
      elements.actionIntro.textContent = stageRecord.status === "follow_up_needed"
        ? `${followUpProfile.label} in Stage A stays under direct President control.`
        : "Stage A actions keep manual appointment truth, business result, and amount paid under direct President control.";
    } else {
      if (stageRecord.status === "awaiting_customer_confirmation") actions = [{ id: "customer_confirm", label: "Customer Confirm Override", primary: true }];
      if (["confirmed", "in_progress"].includes(stageRecord.status)) actions = [{ id: "mark_completed", label: "Accept Completed Closeout", primary: true, disabled: !canMarkCompleted(record, stageRecord) }, { id: "mark_follow_up", label: followUpProfile.stageBLabel }];
      if (["follow_up_needed", "completed", "canceled", "no_show", "rerouted", "awaiting_worker_assignment", "awaiting_worker_confirmation"].includes(stageRecord.status)) actions = [{ id: "mark_follow_up", label: followUpProfile.stageBLabel, primary: stageRecord.status !== "follow_up_needed" }, { id: "mark_completed", label: "Mark Completed", disabled: !canMarkCompleted(record, stageRecord) }, { id: "mark_canceled", label: "Mark Canceled", disabled: stageRecord.status === "completed" && Number(record.amountPaid || 0) > 0 }];
      elements.actionIntro.textContent = stageRecord.status === "follow_up_needed"
        ? `${followUpProfile.label} in Stage B stays visible after automation so the President can govern the remaining business step.`
        : "Stage B actions are narrower. Automation still owns routing and gate timing, but the President still owns follow-up pressure and revenue truth.";
    }
    if (!actions.length) {
      elements.actionRow.innerHTML = `<span class="muted">No direct President action is required from the current state. Review notes, amount paid, and timeline instead.</span>`;
      return;
    }
    elements.actionRow.innerHTML = actions.map((action) => `<button class="action-btn${action.primary ? " primary" : ""}" type="button" data-action-id="${action.id}"${action.disabled ? " disabled" : ""}>${action.label}</button>`).join("");
    elements.actionRow.querySelectorAll("[data-action-id]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.hasAttribute("disabled")) return;
        if (currentStage === "A") applyStageAAction(button.dataset.actionId);
        else applyStageBAction(button.dataset.actionId);
      });
    });
  }

  function buildRecommendation() {
    const record = getSelectedRecord();
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    const amountPaid = Number(record.amountPaid || 0);
    const jobRef = jobRecords.formatJobRef(record);
    const followUpProfile = getFollowUpProfile(record);
    if (currentStage === "A") {
      if (stageRecord.status === "provisional") {
        return {
          label: "Manual Lane",
          title: "Move this record into manual confirmation.",
          text: `The AI agent opened ${jobRef}, but Stage A still depends on the President creating a real confirmation lane with the representative.`,
          metrics: [["Current Gate", "Manual confirmation not opened yet"], ["Revenue Posture", "Too early for revenue truth"], ["President Standard", "Protect the promised appointment time first"]]
        };
      }
      if (["awaiting_manual_confirmation", "rescheduled"].includes(stageRecord.status)) {
        return {
          label: "Time Lock",
          title: "Set and lock the final appointment time.",
          text: `This record should not move forward until the final confirmed time is visible and the President records the real scheduling truth.`,
          metrics: [["Current Gate", String(record.confirmedTime || "Confirmed time missing")], ["Revenue Posture", "Outcome still pending"], ["President Standard", "No appointment truth gap before the visit"]]
        };
      }
      if (stageRecord.status === "confirmed") {
        return {
          label: "Post-Visit Truth",
          title: "Wait for the visit result, then record the business outcome cleanly.",
          text: `The appointment is locked. The next President move is not more scheduling; it is outcome truth, follow-up truth, or completion truth for ${jobRef}.`,
          metrics: [["Current Gate", "Visit is scheduled"], ["Revenue Posture", amountPaid > 0 ? `$${amountPaid.toLocaleString()} already entered` : "Amount paid not entered"], ["President Standard", "Do not close without the real result"]]
        };
      }
    } else {
      if (["awaiting_worker_assignment", "awaiting_worker_confirmation", "awaiting_customer_confirmation", "rerouted"].includes(stageRecord.status)) {
        return {
          label: "Automation Pressure",
          title: "Protect the commitment gate before treating this as a completed business event.",
          text: `Stage B automation is still clearing the front-end commitment path on ${jobRef}. President follow-up should stay focused on gate pressure, not premature closeout.`,
          metrics: [["Current Gate", getStatusLabel("B", stageRecord.status)], ["Revenue Posture", amountPaid > 0 ? `$${amountPaid.toLocaleString()} entered early` : "No revenue truth yet"], ["President Standard", "Gate first, closeout second"]]
        };
      }
      if (["confirmed", "in_progress"].includes(stageRecord.status)) {
        return {
          label: "Execution Watch",
          title: "Keep execution and closeout discipline visible before closing the record.",
          text: `The appointment is live. The President should watch for clean worker outcome, correct next-step ownership, and revenue truth if work converted or finished.`,
          metrics: [["Current Gate", getStatusLabel("B", stageRecord.status)], ["Revenue Posture", amountPaid > 0 ? `$${amountPaid.toLocaleString()} captured` : "Revenue truth still pending"], ["President Standard", "Completion must match the real field outcome"]]
        };
      }
    }
    if (stageRecord.status === "follow_up_needed") {
      const reasonLabel = getFollowUpReasonLabel(record, stageRecord.followUpReason);
      return {
        label: followUpProfile.label,
        title: followUpProfile.title,
        text: `${followUpProfile.text} ${jobRef} is currently sitting on ${reasonLabel}, so the President should govern that next step explicitly.`,
        metrics: [["Current Gate", "Follow-up remains open"], ["Next Step", reasonLabel], ["President Standard", followUpProfile.standard]]
      };
    }
    if (recordNeedsRevenueTruth(record, stageRecord)) {
      return {
        label: "Revenue Review",
        title: "Enter amount paid before treating this as a clean closed result.",
        text: `The selected outcome implies completed business, but the revenue truth is still missing on ${jobRef}.`,
        metrics: [["Current Gate", getOutcomeLabel(stageRecord.outcome)], ["Revenue Posture", "Amount paid missing"], ["President Standard", "Closed revenue outcomes need payment truth"]]
      };
    }
    if (isClosedStatus(stageRecord.status)) {
      return {
        label: "Closure Review",
        title: "Verify the closed result matches the real business outcome.",
        text: `This record is already closed. The President role here is to confirm that the final status, business outcome, and any payment truth are coherent.`,
        metrics: [["Current Gate", getStatusLabel(currentStage, stageRecord.status)], ["Revenue Posture", amountPaid > 0 ? `$${amountPaid.toLocaleString()} recorded` : "No payment recorded"], ["President Standard", "Closed records still need clean truth"]]
      };
    }
    return {
      label: "President Priority",
      title: "Clear the current gate before shifting attention elsewhere.",
      text: "The current record state determines what the President should protect next.",
      metrics: [["Current Gate", getStatusLabel(currentStage, stageRecord.status)], ["Revenue Posture", amountPaid > 0 ? `$${amountPaid.toLocaleString()} recorded` : "Revenue not entered"], ["President Standard", "Protect the next real business truth"]]
    };
  }

  function renderRecommendation() {
    const recommendation = buildRecommendation();
    elements.recommendationIntro.textContent = currentStage === "A"
      ? "Stage A recommendations stay centered on manual appointment truth and President-entered business outcome."
      : "Stage B recommendations stay centered on automation pressure, clean closeout, and revenue truth.";
    elements.recommendationLabel.textContent = recommendation.label;
    elements.recommendationTitle.textContent = recommendation.title;
    elements.recommendationText.textContent = recommendation.text;
    elements.recommendationGrid.innerHTML = recommendation.metrics.map((item) => `
      <div class="recommendation-metric">
        <label>${item[0]}</label>
        <strong>${item[1]}</strong>
        <span>${item[2]}</span>
      </div>
    `).join("");
  }

  function renderTimeline() {
    const record = getSelectedRecord();
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    const items = Array.isArray(stageRecord.activity) ? stageRecord.activity.slice().reverse() : [];
    elements.timelineIntro.textContent = currentStage === "A"
      ? "Manual scheduling updates, appointment outcome truth, and amount-paid follow-up all remain visible here."
      : "Automation events stay visible, but the President follow-up layer still decides the business truth that matters next.";
    elements.timeline.innerHTML = items.map((item) => `
      <div class="timeline-item">
        <label>${item.time || "Update"}</label>
        <strong>${item.title || "Record Update"}</strong>
        <span>${item.text || "Shared record activity remains visible."}</span>
      </div>
    `).join("");
  }

  function renderTopline() {
    const record = getSelectedRecord();
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    syncUrl();
    document.querySelectorAll(".stage-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.stage === currentStage);
    });
    elements.stageChip.textContent = `Stage ${currentStage}`;
    elements.statusChip.textContent = getStatusLabel(currentStage, stageRecord.status);
    elements.stageNote.textContent = currentStage === "A"
      ? "Stage A follow-up stays centered on manual scheduling and President-entered outcome truth."
      : "Stage B follow-up stays centered on post-automation gates, business outcome truth, and revenue review.";
    elements.pageIntro.textContent = currentStage === "A"
      ? "Use this screen after the chamber view to keep manual confirmation, post-appointment follow-up, and revenue truth visible on the shared record."
      : "Use this screen after automation to keep confirmed appointments, closeout truth, follow-up pressure, and revenue truth visible on the shared record.";
  }

  function setSaveStatus(message, type) {
    elements.saveStatus.textContent = message;
    elements.saveStatus.className = `save-status${type ? ` ${type}` : ""}`;
  }

  function render() {
    syncNavLinks();
    renderTopline();
    renderQueue();
    renderSummary();
    renderForm();
    renderActions();
    renderRecommendation();
    renderTimeline();
  }

  render();
}());
