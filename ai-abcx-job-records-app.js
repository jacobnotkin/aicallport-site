(function () {
  const stageConfig = window.AIABCStageConfig;
  const jobRecords = window.AIABCXJobRecords;
  const workflowHelpers = window.AIABCXWorkflowHelpers;
  const params = new URLSearchParams(window.location.search);
  const queryStage = params.get("stage");
  const queryJob = params.get("job");
  const requestedFollowUpReason = params.get("followup") || "";
  const {
    APPOINTMENT_TYPES,
    OUTCOMES,
    STATUS_OPTIONS,
    stageAActionMap,
    isStageAPostAppointmentStatus,
    deriveStageAStatusFromOutcome,
    isStageAReadyToConfirm,
    buildStageATimeLabel,
    getStageAWorkflowConfig,
    getStatusLabel,
    getOutcomeLabel,
    statusClass
  } = workflowHelpers;
  const { STAGE_META } = window.AIABCXJobRecordsConfig;
  const BASE_RECORDS = jobRecords.getBaseRecords();

      const state = loadState();
      let currentStage = stageConfig
        ? stageConfig.normalizeStage(queryStage || stageConfig.getCurrentStage(), "A")
        : (queryStage === "B" ? "B" : "A");
      if (stageConfig) stageConfig.setCurrentStage(currentStage);
      let selectedRecordId = resolveInitialRecordId();
      let saveStatusCategory = "";
      if (queryJob && selectedRecordId === queryJob) saveState();

      const elements = {
        recordList: document.getElementById("recordList"),
        stageNote: document.getElementById("stageNote"),
        recordTitle: document.getElementById("recordTitle"),
        recordSubtitle: document.getElementById("recordSubtitle"),
        detailIntro: document.getElementById("detailIntro"),
        stageAWorkflow: document.getElementById("stageAWorkflow"),
        stageAWorkflowTitle: document.getElementById("stageAWorkflowTitle"),
        stageAWorkflowText: document.getElementById("stageAWorkflowText"),
        stageARequirements: document.getElementById("stageARequirements"),
        stageAActionButtons: document.getElementById("stageAActionButtons"),
        flowIntro: document.getElementById("flowIntro"),
        flowFooter: document.getElementById("flowFooter"),
        activityIntro: document.getElementById("activityIntro"),
        stageChip: document.getElementById("stageChip"),
        statusChip: document.getElementById("statusChip"),
        summaryGrid: document.getElementById("summaryGrid"),
        jobRecordsNavCount: document.getElementById("jobRecordsNavCount"),
        presidentNavLink: document.getElementById("presidentNavLink"),
        jobRecordsNavLink: document.getElementById("jobRecordsNavLink"),
        dispatcherNavLink: document.getElementById("dispatcherNavLink"),
        salesWorkerNavLink: document.getElementById("salesWorkerNavLink"),
        serviceWorkerNavLink: document.getElementById("serviceWorkerNavLink"),
        jobPill: document.getElementById("jobPill"),
        modeTokens: document.getElementById("modeTokens"),
        modeBar: document.getElementById("modeBar"),
        timeline: document.getElementById("timeline"),
        activityList: document.getElementById("activityList"),
        saveStatus: document.getElementById("saveStatus"),
        presidentLink: document.getElementById("presidentLink"),
        followUpHubLink: document.getElementById("followUpHubLink"),
        salesWorkerLink: document.getElementById("salesWorkerLink"),
        serviceWorkerLink: document.getElementById("serviceWorkerLink"),
        jobNumber: document.getElementById("jobNumber"),
        customerName: document.getElementById("customerName"),
        customerPhone: document.getElementById("customerPhone"),
        appointmentType: document.getElementById("appointmentType"),
        requestedTime: document.getElementById("requestedTime"),
        confirmedTime: document.getElementById("confirmedTime"),
        assignedRep: document.getElementById("assignedRep"),
        statusSelect: document.getElementById("statusSelect"),
        outcomeSelect: document.getElementById("outcomeSelect"),
        amountPaid: document.getElementById("amountPaid"),
        notesField: document.getElementById("notesField"),
        transcriptField: document.getElementById("transcriptField"),
        recordingField: document.getElementById("recordingField"),
        saveRecord: document.getElementById("saveRecord"),
        resetRecord: document.getElementById("resetRecord")
      };

      const fieldMap = {
        customerName: "customerName",
        customerPhone: "customerPhone",
        appointmentType: "appointmentType",
        requestedTime: "requestedTime",
        confirmedTime: "confirmedTime",
        assignedRep: "assignedRep",
        statusSelect: "status",
        outcomeSelect: "outcome",
        amountPaid: "amountPaid",
        notesField: "notes",
        transcriptField: "transcript",
        recordingField: "recordingField"
      };

      function buildSelect(select, options) {
        select.innerHTML = "";
        options.forEach((option) => {
          const node = document.createElement("option");
          node.value = option.value;
          node.textContent = option.label;
          select.appendChild(node);
        });
      }

      buildSelect(elements.appointmentType, APPOINTMENT_TYPES);
      buildSelect(elements.outcomeSelect, OUTCOMES);

      document.querySelectorAll(".stage-btn").forEach((button) => {
        button.addEventListener("click", () => {
          currentStage = button.dataset.stage;
          if (stageConfig) stageConfig.setCurrentStage(currentStage);
          syncSelectionUrl();
          setSaveStatus(stageConfig ? `Switched to ${currentStage === "A" ? "Stage A" : "Stage B"} record behavior.` : `Switched to ${currentStage}.`, "", "default");
          render();
        });
      });

      Object.entries(fieldMap).forEach(([elementKey, recordKey]) => {
        const target = elements[elementKey];
        target.addEventListener("input", () => {
          const record = getSelectedRecord();
          if (!record) return;
          const stageRecord = ensureStageRecord(record, currentStage);
          if (recordKey === "amountPaid") {
            record[recordKey] = Number(target.value || 0);
          } else if (recordKey === "status" || recordKey === "outcome") {
            stageRecord[recordKey] = target.value;
            if (currentStage === "A" && recordKey === "outcome") {
              const derivedStatus = deriveStageAStatusFromOutcome(target.value);
              if (derivedStatus) {
                stageRecord.status = derivedStatus;
                elements.statusSelect.value = derivedStatus;
                setSaveStatus("Stage A aligned manual status to the selected business outcome.", "", "workflow");
              }
            }
          } else {
            record[recordKey] = target.value;
          }
          if (currentStage === "A" && recordKey === "confirmedTime" && isStageAReadyToConfirm(record, stageRecord)) {
            setSaveStatus(
              "Final confirmed time is in place. Confirm Appointment is now the correct next Stage A step.",
              "",
              "workflow"
            );
          } else if (!(currentStage === "A" && recordKey === "outcome")) {
            setSaveStatus("Unsaved changes in progress.", "", "unsaved");
          }
          renderToplineOnly();
          renderRecordList();
          if (["statusSelect", "outcomeSelect", "confirmedTime", "amountPaid"].includes(elementKey)) {
            renderStageAWorkflow(record);
            renderTimeline(record);
          }
        });
      });

      elements.saveRecord.addEventListener("click", () => {
        const validation = validateBeforeSave(getSelectedRecord());
        if (validation) {
          setSaveStatus(validation, "error", "error");
          return;
        }
        saveState();
        setSaveStatus(
          currentStage === "A"
            ? "Stage A record saved. President truth entry is now stored for this manual scheduling step."
            : "Record saved locally for the selected stage view.",
          "success",
          "success"
        );
        render();
      });

      elements.resetRecord.addEventListener("click", () => {
        const baseRecord = cloneRecord(BASE_RECORDS.find((record) => record.id === selectedRecordId));
        if (!baseRecord) return;
        replaceRecord(baseRecord);
        saveState();
        setSaveStatus("Selected record reset to the base example data.", "success", "success");
        render();
      });

      elements.presidentLink.addEventListener("click", () => {
        window.location.href = buildRoute("new-president-dashboard.html", { source: "job-records" });
      });

      elements.followUpHubLink.addEventListener("click", () => {
        window.location.href = buildRoute("president-follow-up.html", { source: "job-records" });
      });

      elements.salesWorkerLink.addEventListener("click", () => {
        window.location.href = buildRoute("sales-dashboard.html", { source: "job-records", followup: "" });
      });

      elements.serviceWorkerLink.addEventListener("click", () => {
        window.location.href = buildRoute("field-dashboard.html", { source: "job-records", followup: "" });
      });

      function loadState() {
        return jobRecords.readState(BASE_RECORDS);
      }

      function saveState() {
        jobRecords.writeState(state.records, selectedRecordId);
      }

      function syncFromSharedState(options = {}) {
        const nextState = loadState();
        state.records = nextState.records.map(cloneRecord);
        const preferredId = queryJob || selectedRecordId || nextState.selectedRecordId || BASE_RECORDS[0].id;
        const hasPreferredRecord = state.records.some((record) => record.id === preferredId);
        selectedRecordId = hasPreferredRecord ? preferredId : (state.records[0] ? state.records[0].id : BASE_RECORDS[0].id);
        saveState();
        if (!options.skipRender) render();
      }

      function resolveInitialRecordId() {
        const preferredId = queryJob || state.selectedRecordId || BASE_RECORDS[0].id;
        const hasPreferredRecord = state.records.some((record) => record.id === preferredId);
        return hasPreferredRecord ? preferredId : BASE_RECORDS[0].id;
      }

      function cloneRecord(record) {
        return jobRecords.cloneRecord(record);
      }

      function replaceRecord(nextRecord) {
        const index = state.records.findIndex((record) => record.id === nextRecord.id);
        if (index >= 0) state.records[index] = nextRecord;
      }

      function getSelectedRecord() {
        return state.records.find((record) => record.id === selectedRecordId) || state.records[0];
      }

      function ensureStageRecord(record, stage) {
        return jobRecords.ensureStageRecord(record, stage);
      }

      function getSelectedFollowUpReason() {
        const record = getSelectedRecord();
        if (!record) return "";
        const stageRecord = ensureStageRecord(record, currentStage);
        return stageRecord.status === "follow_up_needed" && stageRecord.followUpReason
          ? stageRecord.followUpReason
          : "";
      }

      function syncSelectionUrl() {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("stage", currentStage);
        if (selectedRecordId) {
          nextUrl.searchParams.set("job", selectedRecordId);
        } else {
          nextUrl.searchParams.delete("job");
        }
        const followUpReason = getSelectedFollowUpReason();
        if (followUpReason) {
          nextUrl.searchParams.set("followup", followUpReason);
        } else {
          nextUrl.searchParams.delete("followup");
        }
        window.history.replaceState({}, "", nextUrl.toString());
      }

      function buildRoute(path, overrides = {}) {
        const nextUrl = new URL(path, window.location.href);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.forEach((value, key) => {
          nextUrl.searchParams.set(key, value);
        });

        if (selectedRecordId) {
          nextUrl.searchParams.set("job", selectedRecordId);
        } else {
          nextUrl.searchParams.delete("job");
        }

        nextUrl.searchParams.set("stage", currentStage);

        const followUpReason = getSelectedFollowUpReason();
        if (followUpReason) {
          nextUrl.searchParams.set("followup", followUpReason);
        } else {
          nextUrl.searchParams.delete("followup");
        }

        Object.entries(overrides).forEach(([key, value]) => {
          if (value === null || value === undefined || value === "") {
            nextUrl.searchParams.delete(key);
            return;
          }
          nextUrl.searchParams.set(key, String(value));
        });

        return nextUrl.toString();
      }

      function syncNavLinks() {
        if (elements.presidentNavLink) {
          elements.presidentNavLink.href = buildRoute("new-president-dashboard.html", { source: "job-records" });
        }
        if (elements.jobRecordsNavLink) {
          elements.jobRecordsNavLink.href = buildRoute("job-records.html");
        }
        if (elements.dispatcherNavLink) {
          elements.dispatcherNavLink.href = buildRoute("dispatcher-dashboard.html", { source: "job-records" });
        }
        if (elements.salesWorkerNavLink) {
          elements.salesWorkerNavLink.href = buildRoute("sales-dashboard.html", { source: "job-records", followup: "" });
        }
        if (elements.serviceWorkerNavLink) {
          elements.serviceWorkerNavLink.href = buildRoute("field-dashboard.html", { source: "job-records", followup: "" });
        }
      }

      function stageRecordFor(record, stage) {
        return ensureStageRecord(record, stage);
      }

      function summarizeStageRecords(stage) {
        const summary = {
          total: state.records.length,
          active: 0,
          pending: 0,
          closed: 0,
          payments: 0
        };
        state.records.forEach((record) => {
          const stageRecord = stageRecordFor(record, stage);
          if (["completed", "canceled", "no_show"].includes(stageRecord.status)) {
            summary.closed += 1;
          } else {
            summary.active += 1;
          }
          if ([
            "awaiting_manual_confirmation",
            "awaiting_worker_assignment",
            "awaiting_worker_confirmation",
            "awaiting_customer_confirmation",
            "rescheduled",
            "follow_up_needed",
            "rerouted",
            "in_progress"
          ].includes(stageRecord.status)) {
            summary.pending += 1;
          }
          if (Number(record.amountPaid || 0) > 0) {
            summary.payments += 1;
          }
        });
        return summary;
      }

      function renderRecordList() {
        elements.recordList.innerHTML = "";
        state.records.forEach((record) => {
          const stageRecord = stageRecordFor(record, currentStage);
          const item = document.createElement("button");
          item.type = "button";
          item.className = `record-item${record.id === selectedRecordId ? " active" : ""}`;
          item.innerHTML = `
            <div class="record-top">
              <span class="record-id">Job #${record.jobNumber}</span>
              <span class="tag ${statusClass(stageRecord.status)}">${getStatusLabel(currentStage, stageRecord.status)}</span>
            </div>
            <strong>${record.customerName}</strong>
            <p>${record.appointmentType.replaceAll("_", " ")} • ${record.assignedRep || "Unassigned"} • ${currentStage === "A" ? "President-managed movement" : "Engine-managed movement"}</p>
            <div class="tag-row">
              <span class="tag blue">${getOutcomeLabel(stageRecord.outcome)}</span>
              <span class="tag">${record.amountPaid ? `$${Number(record.amountPaid).toLocaleString()}` : "No payment yet"}</span>
            </div>
          `;
          item.addEventListener("click", () => {
            selectedRecordId = record.id;
            saveState();
            syncSelectionUrl();
            render();
          });
          elements.recordList.appendChild(item);
        });
      }

      function renderSummary() {
        const meta = STAGE_META[currentStage];
        const record = getSelectedRecord();
        const stageRecord = stageRecordFor(record, currentStage);
        const summary = summarizeStageRecords(currentStage);
        const dynamicSummary = currentStage === "A"
          ? [
              { label: "Movement Owner", value: "President", meta: `${summary.pending} manual queue item${summary.pending === 1 ? "" : "s"} still need attention` },
              { label: "Assignment Model", value: "Outside System", meta: `${record.assignedRep || "Unassigned"} is the current representative` },
              { label: "Customer Promise", value: record.confirmedTime && record.confirmedTime.trim() ? "Time Locked" : "Will Be Confirmed", meta: record.confirmedTime && record.confirmedTime.trim() ? record.confirmedTime : "AI agent captured a provisional time" },
              { label: "Reporting Value", value: record.amountPaid ? `$${Number(record.amountPaid).toLocaleString()}` : getOutcomeLabel(stageRecord.outcome), meta: `${summary.payments} record${summary.payments === 1 ? "" : "s"} already include payment truth` }
            ]
          : [
              { label: "Movement Owner", value: "Engine", meta: `${summary.pending} engine-tracked queue item${summary.pending === 1 ? "" : "s"} are still in motion` },
              { label: "Assignment Model", value: "Capability Based", meta: `${record.assignedRep || "Unassigned"} is the current routed owner` },
              { label: "Customer Promise", value: stageRecord.status === "confirmed" ? "SMS Locked" : getStatusLabel("B", stageRecord.status), meta: record.confirmedTime && record.confirmedTime.trim() ? record.confirmedTime : "Waiting for lock" },
              { label: "Reporting Value", value: getOutcomeLabel(stageRecord.outcome), meta: `${summary.closed} record${summary.closed === 1 ? "" : "s"} are already operationally closed` }
            ];
        elements.summaryGrid.innerHTML = "";
        dynamicSummary.forEach((item) => {
          const stat = document.createElement("div");
          stat.className = "stat";
          stat.innerHTML = `
            <label>${item.label}</label>
            <strong>${item.value}</strong>
            <span>${item.meta}</span>
          `;
          elements.summaryGrid.appendChild(stat);
        });
        elements.jobRecordsNavCount.textContent = String(summary.total);
      }

      function renderTimeline(record) {
        const stageRecord = stageRecordFor(record, currentStage);
        const steps = currentStage === "A"
          ? [
              ["provisional", "Provisional intake", "AI agent captured a convenient time and opened the record."],
              ["awaiting_manual_confirmation", "Manual confirmation", "President and representative settle the final time outside the system."],
              ["confirmed", "Confirmed", "President locks the final scheduling truth into AI-ABCX."],
              ["completed", "Completed", "Outcome and amount paid are recorded after the appointment."],
              ["follow_up_needed", "Follow-up needed", "The record stays alive for revised estimate, reschedule, or next step."],
              ["canceled", "Canceled / no show", "Manual truth entry still preserves the record for reporting."]
            ]
          : [
              ["provisional", "Provisional intake", "AI agent captured a valid appointment window."],
              ["awaiting_worker_assignment", "Worker assignment", "The engine matches capability and availability."],
              ["awaiting_worker_confirmation", "Worker confirmation", "The assigned worker must confirm inside the timed window."],
              ["awaiting_customer_confirmation", "Customer confirmation", "The system sends SMS after worker acceptance."],
              ["confirmed", "Confirmed / in progress", "The appointment is locked and then executed."],
              ["completed", "Completed / follow-up", "Structured outcome closes the job or keeps it moving."]
            ];

        const activeIndex = steps.findIndex(([value]) => value === stageRecord.status);
        elements.timeline.innerHTML = "";

        steps.forEach(([value, title, text], index) => {
          let stateClass = "pending";
          if (activeIndex === -1 && ["follow_up_needed", "canceled", "no_show", "rerouted", "in_progress", "rescheduled"].includes(stageRecord.status)) {
            if (index < steps.length - 1) stateClass = "complete";
            if (title.includes("Completed") || title.includes("Follow-up") || title.includes("Canceled")) stateClass = "active";
          } else if (index < activeIndex) {
            stateClass = "complete";
          } else if (index === activeIndex) {
            stateClass = "active";
          }

          const row = document.createElement("div");
          row.className = `step ${stateClass}`;
          row.innerHTML = `
            <div class="step-dot"></div>
            <div>
              <strong>${title}</strong>
              <p>${text}</p>
            </div>
          `;
          elements.timeline.appendChild(row);
        });
      }

      function renderActivity(record) {
        const stageRecord = stageRecordFor(record, currentStage);
        elements.activityList.innerHTML = "";
        stageRecord.activity.forEach((entry) => {
          const node = document.createElement("div");
          node.className = "activity";
          node.innerHTML = `
            <div class="activity-top">
              <strong>${entry.title}</strong>
              <time>${entry.time}</time>
            </div>
            <p>${entry.text}</p>
          `;
          elements.activityList.appendChild(node);
        });
      }

      function renderModeTokens() {
        const meta = STAGE_META[currentStage];
        elements.modeTokens.innerHTML = "";
        meta.modeTokens.forEach((token) => {
          const item = document.createElement("span");
          item.textContent = token;
          elements.modeTokens.appendChild(item);
        });
        elements.modeBar.innerHTML = "";
        meta.modeTokens.slice(0, 2).forEach((token) => {
          const item = document.createElement("button");
          item.type = "button";
          item.className = "select-btn active";
          item.textContent = token;
          elements.modeBar.appendChild(item);
        });
      }

      function renderToplineOnly() {
        const record = getSelectedRecord();
        const stageRecord = stageRecordFor(record, currentStage);
        elements.recordTitle.textContent = `${record.customerName} • Job #${record.jobNumber}`;
        elements.stageChip.textContent = STAGE_META[currentStage].chip;
        elements.statusChip.textContent = getStatusLabel(currentStage, stageRecord.status);
        elements.jobPill.textContent = `Job #${record.jobNumber}`;
        updateNavigationLinks(record);
      }

      function updateNavigationLinks(record) {
        const workerLinksAllowed = currentStage === "B";
        const type = record.appointmentType;
        const showSales = workerLinksAllowed && (type === "sales" || type === "sales_and_service");
        const showService = workerLinksAllowed && (type === "service" || type === "sales_and_service");
        elements.salesWorkerLink.classList.toggle("hidden", !showSales);
        elements.serviceWorkerLink.classList.toggle("hidden", !showService);
      }

      function renderForm(record) {
        const stageRecord = stageRecordFor(record, currentStage);
        buildSelect(elements.statusSelect, STATUS_OPTIONS[currentStage]);
        elements.jobNumber.value = record.jobNumber;
        elements.customerName.value = record.customerName;
        elements.customerPhone.value = record.customerPhone;
        elements.appointmentType.value = record.appointmentType;
        elements.requestedTime.value = record.requestedTime;
        elements.confirmedTime.value = record.confirmedTime;
        elements.assignedRep.value = record.assignedRep;
        elements.statusSelect.value = stageRecord.status;
        elements.outcomeSelect.value = stageRecord.outcome;
        elements.amountPaid.value = String(record.amountPaid || 0);
        elements.notesField.value = record.notes;
        elements.transcriptField.value = record.transcript;
        elements.recordingField.value = record.recordingField;
      }

      function renderStageAWorkflow(record) {
        if (currentStage !== "A") {
          elements.stageAWorkflow.classList.add("hidden");
          elements.outcomeSelect.disabled = false;
          elements.amountPaid.disabled = false;
          elements.outcomeSelect.closest(".field").classList.remove("disabled");
          elements.amountPaid.closest(".field").classList.remove("disabled");
          return;
        }
        const stageRecord = stageRecordFor(record, "A");
        const config = getStageAWorkflowConfig(record, stageRecordFor);
        const postAppointment = isStageAPostAppointmentStatus(stageRecord.status);
        const needsConfirmedTime = ["awaiting_manual_confirmation", "confirmed", "rescheduled"].includes(stageRecord.status);
        const readyToConfirm = isStageAReadyToConfirm(record, stageRecord);
        elements.stageAWorkflow.classList.remove("hidden");
        elements.stageAWorkflowTitle.textContent = config.title;
        elements.stageAWorkflowText.textContent = readyToConfirm
          ? `${config.text} Final confirmed time is now present, so Confirm Appointment is the next correct President action.`
          : config.text;
        elements.stageARequirements.innerHTML = "";
        const requirementItems = config.requirements.map((item) => ({
          label: item,
          highlight:
            (item.includes("Confirmed Time") && (!record.confirmedTime || !record.confirmedTime.trim())) ||
            (item.includes("Outcome") && postAppointment) ||
            (item.includes("Amount Paid") && postAppointment)
        }));
        if (readyToConfirm) {
          requirementItems.push({ label: "Ready To Confirm", highlight: true });
        }
        requirementItems.forEach((item) => {
          const node = document.createElement("span");
          node.textContent = item.label;
          if (item.highlight) node.classList.add("highlight");
          elements.stageARequirements.appendChild(node);
        });
        elements.stageAActionButtons.innerHTML = "";
        config.actions.forEach((actionId, index) => {
          const action = stageAActionMap[actionId];
          if (!action) return;
          const button = document.createElement("button");
          button.type = "button";
          button.className = `workflow-btn${index === 0 ? " primary" : ""}`;
          button.textContent = action.label;
          if (actionId === "confirm_appointment" && !record.confirmedTime.trim()) {
            button.disabled = true;
            button.title = "Final confirmed time is required before this action is available.";
          }
          button.addEventListener("click", () => applyStageAWorkflowAction(actionId));
          elements.stageAActionButtons.appendChild(button);
        });
        elements.outcomeSelect.disabled = !postAppointment;
        elements.amountPaid.disabled = !postAppointment;
        const outcomeField = elements.outcomeSelect.closest(".field");
        const amountField = elements.amountPaid.closest(".field");
        outcomeField.classList.toggle("disabled", !postAppointment);
        amountField.classList.toggle("disabled", !postAppointment);
        elements.confirmedTime.closest(".field").classList.toggle("disabled", false);
        if (needsConfirmedTime && (!record.confirmedTime || !record.confirmedTime.trim())) {
          elements.stageARequirements.innerHTML += `<span class="highlight">Confirmed Time Missing</span>`;
        }
      }

      function validateBeforeSave(record) {
        if (!record) return "No record selected.";
        if (currentStage !== "A") return "";
        const stageRecord = stageRecordFor(record, "A");
        if (["awaiting_manual_confirmation", "confirmed", "rescheduled"].includes(stageRecord.status) && (!record.confirmedTime || !record.confirmedTime.trim())) {
          return "Stage A requires a final confirmed time before this status can be saved.";
        }
        if (stageRecord.status === "follow_up_needed" && stageRecord.outcome !== "follow_up_needed") {
          return "Stage A follow-up status should use the Follow-Up Needed outcome.";
        }
        if (stageRecord.status === "canceled" && stageRecord.outcome !== "canceled") {
          return "Stage A canceled status should use the Canceled outcome.";
        }
        if (stageRecord.status === "no_show" && stageRecord.outcome !== "no_show") {
          return "Stage A no-show status should use the No Show outcome.";
        }
        if (isStageAPostAppointmentStatus(stageRecord.status) && stageRecord.outcome === "pending") {
          return "Post-appointment Stage A records need a real business outcome before saving.";
        }
        if (stageRecord.status === "completed" && ["follow_up_needed", "canceled", "no_show"].includes(stageRecord.outcome)) {
          return "Completed Stage A records need a business result outcome, not follow-up, canceled, or no-show.";
        }
        return "";
      }

      function setSaveStatus(message, type, category = "") {
        elements.saveStatus.textContent = message;
        elements.saveStatus.className = `save-status${type ? ` ${type}` : ""}`;
        elements.saveStatus.dataset.category = category;
        saveStatusCategory = category;
      }

      function getDefaultStageStatusMessage() {
        return currentStage === "A"
          ? "Stage A has no worker dashboards. Use President Dashboard for manual scheduling control."
          : "Stage B can open the relevant worker dashboard from this record.";
      }

      function applyDefaultStageStatusMessage() {
        const category = saveStatusCategory || elements.saveStatus.dataset.category || "";
        if (["success", "error", "workflow", "unsaved"].includes(category)) return;
        setSaveStatus(getDefaultStageStatusMessage(), "", "default");
      }

      function render() {
        const record = getSelectedRecord();
        const meta = STAGE_META[currentStage];
        syncSelectionUrl();
        syncNavLinks();
        document.querySelectorAll(".stage-btn").forEach((button) => {
          button.classList.toggle("active", button.dataset.stage === currentStage);
        });
        elements.stageNote.textContent = meta.note;
        elements.recordSubtitle.textContent = meta.intro;
        elements.detailIntro.textContent = meta.detailIntro;
        elements.flowIntro.textContent = meta.flowIntro;
        elements.flowFooter.textContent = meta.flowFooter;
        elements.activityIntro.textContent = currentStage === "A"
          ? "The log reads like President truth-entry because worker communication is still outside the system."
          : "The log reads like engine movement because routing, worker timing, and customer confirmation are now active.";

        renderToplineOnly();
        renderSummary();
        renderModeTokens();
        renderForm(record);
        renderStageAWorkflow(record);
        renderTimeline(record);
        renderActivity(record);
        renderRecordList();
        applyDefaultStageStatusMessage();
      }

      window.addEventListener("pageshow", () => {
        syncFromSharedState();
      });

      window.addEventListener("focus", () => {
        syncFromSharedState();
      });

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          syncFromSharedState();
        }
      });

      render();
    }());
