(() => {
  const stageConfig = window.AIABCStageConfig || null;
  const jobRecords = window.AIABCXJobRecords;
  const workflowHelpers = window.AIABCXWorkflowHelpers;
  if (!jobRecords || !workflowHelpers) return;

  const params = new URLSearchParams(window.location.search);
  const requestedStage = params.get("stage");
  const requestedJob = params.get("job");
  let currentStage = stageConfig && typeof stageConfig.normalizeStage === "function"
    ? stageConfig.normalizeStage(requestedStage, stageConfig.getCurrentStage ? stageConfig.getCurrentStage() : "A")
    : (["A", "B", "C"].includes(requestedStage) ? requestedStage : "A");
  if (currentStage === "C") currentStage = "B";
  if (stageConfig && typeof stageConfig.setCurrentStage === "function") stageConfig.setCurrentStage(currentStage);

  const resultOptions = {
    A: ["estimate_given", "sold_not_completed", "sold_and_completed", "service_completed", "follow_up_needed", "not_sold", "canceled", "no_show"],
    B: ["estimate_given", "sold_not_completed", "sold_and_completed", "service_completed", "follow_up_needed", "rescheduled", "canceled", "no_show"]
  };

  const elements = {
    closeoutStageBadge: document.getElementById("closeoutStageBadge"),
    closeoutProfileText: document.getElementById("closeoutProfileText"),
    closeoutSidebarFoot: document.getElementById("closeoutSidebarFoot"),
    closeoutTitle: document.getElementById("closeoutTitle"),
    closeoutSub: document.getElementById("closeoutSub"),
    closeoutBoardCount: document.getElementById("closeoutBoardCount"),
    closeoutOpenChip: document.getElementById("closeoutOpenChip"),
    closeoutPressureChip: document.getElementById("closeoutPressureChip"),
    closeoutSummaryGrid: document.getElementById("closeoutSummaryGrid"),
    closeoutQueueLabel: document.getElementById("closeoutQueueLabel"),
    closeoutQueueList: document.getElementById("closeoutQueueList"),
    closeoutFocusLabel: document.getElementById("closeoutFocusLabel"),
    closeoutFocusTitle: document.getElementById("closeoutFocusTitle"),
    closeoutFocusText: document.getElementById("closeoutFocusText"),
    closeoutActionTitle: document.getElementById("closeoutActionTitle"),
    closeoutActionText: document.getElementById("closeoutActionText"),
    closeoutResultButtons: document.getElementById("closeoutResultButtons"),
    closeoutAmountPaid: document.getElementById("closeoutAmountPaid"),
    closeoutSavePaymentBtn: document.getElementById("closeoutSavePaymentBtn"),
    closeoutMarkFollowUpBtn: document.getElementById("closeoutMarkFollowUpBtn"),
    closeoutMarkCanceledBtn: document.getElementById("closeoutMarkCanceledBtn"),
    closeoutCompleteBtn: document.getElementById("closeoutCompleteBtn"),
    closeoutStatus: document.getElementById("closeoutStatus"),
    closeoutLaneList: document.getElementById("closeoutLaneList"),
    closeoutSnapshotList: document.getElementById("closeoutSnapshotList"),
    closeoutOpenRecordBtn: document.getElementById("closeoutOpenRecordBtn"),
    closeoutWorkerBtn: document.getElementById("closeoutWorkerBtn"),
    closeoutPresidentBtn: document.getElementById("closeoutPresidentBtn"),
    closeoutCrmLink: document.getElementById("closeoutCrmLink"),
    closeoutDispatchLink: document.getElementById("closeoutDispatchLink"),
    closeoutJobRecordsLink: document.getElementById("closeoutJobRecordsLink"),
    closeoutBoardLink: document.getElementById("closeoutBoardLink"),
    closeoutFollowUpLink: document.getElementById("closeoutFollowUpLink"),
    closeoutSettingsLink: document.getElementById("closeoutSettingsLink"),
    closeoutPresidentLink: document.getElementById("closeoutPresidentLink")
  };

  let selectedRecordId = "";
  let selectedOutcomeValue = "";
  let statusTone = "";

  document.querySelectorAll(".stage-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      currentStage = button.dataset.stage;
      if (stageConfig && typeof stageConfig.setCurrentStage === "function") stageConfig.setCurrentStage(currentStage);
      statusTone = "";
      render();
    });
  });

  elements.closeoutSavePaymentBtn.addEventListener("click", () => applyCloseoutAction("payment"));
  elements.closeoutMarkFollowUpBtn.addEventListener("click", () => applyCloseoutAction("follow_up"));
  elements.closeoutMarkCanceledBtn.addEventListener("click", () => applyCloseoutAction("canceled"));
  elements.closeoutCompleteBtn.addEventListener("click", () => applyCloseoutAction("complete"));

  function readRecords() {
    return (jobRecords.readState().records || []).slice();
  }

  function getQueue() {
    return readRecords()
      .map((record) => {
        const focus = jobRecords.buildJobFocus(record, currentStage);
        return { record, focus, stageRecord: jobRecords.ensureStageRecord(record, currentStage) };
      })
      .sort((a, b) => {
        const aOpen = ["confirmed", "in_progress", "follow_up_needed", "rescheduled"].includes(a.stageRecord.status) ? 0 : 1;
        const bOpen = ["confirmed", "in_progress", "follow_up_needed", "rescheduled"].includes(b.stageRecord.status) ? 0 : 1;
        if (aOpen !== bOpen) return aOpen - bOpen;
        return String(a.record.jobNumber).localeCompare(String(b.record.jobNumber));
      });
  }

  function getSelectedItem(queue) {
    if (!queue.length) return null;
    return queue.find((item) => item.record.id === selectedRecordId)
      || queue.find((item) => item.record.id === requestedJob)
      || queue[0];
  }

  function getFollowUpReasonFromFocus(focus) {
    return focus && focus.statusValue === "follow_up_needed" && focus.followUpReason
      ? focus.followUpReason
      : "";
  }

  function syncSelectionUrl(selected) {
    if (!window.history || !window.history.replaceState) return;
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("stage", currentStage);
    if (selected && selected.record && selected.record.id) {
      nextUrl.searchParams.set("job", selected.record.id);
    } else {
      nextUrl.searchParams.delete("job");
    }
    const followUpReason = selected ? getFollowUpReasonFromFocus(selected.focus) : "";
    if (followUpReason) {
      nextUrl.searchParams.set("followup", followUpReason);
    } else {
      nextUrl.searchParams.delete("followup");
    }
    window.history.replaceState({}, "", nextUrl.toString());
  }

  function setStatus(message, tone = "") {
    statusTone = tone;
    elements.closeoutStatus.textContent = message;
    elements.closeoutStatus.className = `panel-status${tone ? ` ${tone}` : ""}`;
  }

  function buildSharedHref(path, item, source, overrides = {}) {
    const href = new URL(path, window.location.href);
    href.searchParams.set("stage", currentStage);
    if (item && item.record && item.record.id) {
      href.searchParams.set("job", item.record.id);
    } else {
      href.searchParams.delete("job");
    }
    if (source) {
      href.searchParams.set("source", source);
    }
    const followUpReason = item ? getFollowUpReasonFromFocus(item.focus) : "";
    if (followUpReason) {
      href.searchParams.set("followup", followUpReason);
    } else {
      href.searchParams.delete("followup");
    }
    const companyName = params.get("companyName");
    const ownerName = params.get("ownerName");
    if (companyName) href.searchParams.set("companyName", companyName);
    if (ownerName) href.searchParams.set("ownerName", ownerName);
    Object.entries(overrides).forEach(([key, value]) => {
      if (value === "" || value == null) {
        href.searchParams.delete(key);
      } else {
        href.searchParams.set(key, value);
      }
    });
    return `${href.pathname.split("/").pop()}${href.search}`;
  }

  function renderTopline(queue, selected) {
    const openCount = queue.filter((item) => ["confirmed", "in_progress", "follow_up_needed", "rescheduled"].includes(item.stageRecord.status)).length;
    const followUpCount = queue.filter((item) => item.stageRecord.status === "follow_up_needed").length;
    elements.closeoutStageBadge.textContent = `Stage ${currentStage} Closeout`;
    document.querySelectorAll(".stage-toggle").forEach((button) => {
      button.classList.toggle("active", button.dataset.stage === currentStage);
    });
    elements.closeoutProfileText.textContent = currentStage === "A"
      ? "Track President-reported appointment result, revenue truth, and manual follow-up visibility."
      : "Track worker or combined operational closeout, payment truth, and open follow-up after the appointment is fully locked.";
    elements.closeoutSidebarFoot.textContent = currentStage === "A"
      ? "Stage A keeps the President as the owner of final business truth after the appointment happens."
      : "Stage B should capture structured worker outcome and payment truth without losing follow-up visibility.";
    elements.closeoutTitle.textContent = currentStage === "A" ? "Stage A Closeout Board" : "Stage B Closeout Board";
    elements.closeoutSub.textContent = currentStage === "A"
      ? "The President records the real appointment result, amount paid, and whether the record is complete, canceled, or still needs follow-up."
      : "The system should capture structured result truth after the confirmed appointment, then keep payment and follow-up visible on the same shared record.";
    elements.closeoutBoardCount.textContent = String(queue.length);
    elements.closeoutOpenChip.textContent = `${openCount} Open`;
    elements.closeoutPressureChip.textContent = `${followUpCount} Follow-Up`;
    elements.closeoutQueueLabel.textContent = selected ? `${selected.focus.label} selected` : "Priority first";
    elements.closeoutFocusLabel.textContent = currentStage === "A" ? "President truth" : "Structured result truth";
  }

  function renderSummary(queue) {
    const confirmed = queue.filter((item) => item.stageRecord.status === "confirmed").length;
    const inProgress = queue.filter((item) => item.stageRecord.status === "in_progress").length;
    const completed = queue.filter((item) => item.stageRecord.status === "completed").length;
    const followUp = queue.filter((item) => item.stageRecord.status === "follow_up_needed").length;
    const paid = queue.filter((item) => Number(item.record.amountPaid || 0) > 0).length;
    const cards = currentStage === "A"
      ? [
          { label: "Ready For Result", value: String(confirmed), meta: "Appointments already locked and waiting on President-reported truth" },
          { label: "Follow-Up Open", value: String(followUp), meta: "Business outcome still needs another step after the visit" },
          { label: "Revenue Recorded", value: String(paid), meta: "Records where the amount paid is already stored" },
          { label: "Completed Truth", value: String(completed), meta: "Appointments closed with final outcome on the shared record" }
        ]
      : [
          { label: "Ready For Closeout", value: String(confirmed + inProgress), meta: "Confirmed or active records that still need structured completion truth" },
          { label: "Follow-Up Open", value: String(followUp), meta: "These records should stay alive after the main visit" },
          { label: "Revenue Recorded", value: String(paid), meta: "Records where payment truth has already been entered" },
          { label: "Completed Truth", value: String(completed), meta: "Records fully closed after worker or President closeout" }
        ];
    elements.closeoutSummaryGrid.innerHTML = cards.map((card) => `
      <div class="card">
        <div class="label">${card.label}</div>
        <div class="value">${card.value}</div>
        <div class="meta">${card.meta}</div>
      </div>`).join("");
  }

  function renderQueue(queue) {
    elements.closeoutQueueList.innerHTML = queue.map((item) => `
      <button type="button" class="task-item${item.record.id === selectedRecordId ? " active" : ""}" data-record-id="${item.record.id}">
        <div class="task-top">
          <div><strong>${item.focus.customer}</strong><span>${item.focus.summary}</span></div>
          <div><strong>${item.record.assignedRep || "Unassigned"}</strong><span>${item.focus.appointmentType}</span></div>
          <div><strong>${item.record.amountPaid ? `$${Number(item.record.amountPaid).toLocaleString()}` : "No Payment"}</strong><span>Revenue truth</span></div>
          <div><span class="tag ${workflowHelpers.statusClass(item.stageRecord.status)}">${item.focus.statusLabel}</span></div>
        </div>
        <div class="tag-row"><span class="tag blue">${item.focus.label}</span><span class="tag ${item.record.amountPaid ? "green" : "orange"}">${item.record.amountPaid ? "Paid Recorded" : "Payment Open"}</span></div>
      </button>`).join("");
    elements.closeoutQueueList.querySelectorAll("[data-record-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedRecordId = button.dataset.recordId;
        statusTone = "";
        render();
      });
    });
  }

  function renderSelected(item) {
    const { record, focus, stageRecord } = item;
    const workflow = workflowHelpers.getJobFocusWorkflowConfig(focus, currentStage);
    elements.closeoutFocusTitle.textContent = `${focus.customer} closeout focus`;
    elements.closeoutFocusText.textContent = currentStage === "A"
      ? `${focus.label} is waiting on President-controlled business truth: outcome, payment, and whether this should stay alive as follow-up.`
      : `${focus.label} is waiting on structured closeout truth after the appointment lock step. The same record should hold the outcome and payment without losing follow-up visibility.`;
    elements.closeoutActionTitle.textContent = workflow.nextAction.label;
    elements.closeoutActionText.textContent = workflow.nextAction.detail;
    elements.closeoutAmountPaid.value = String(Number(record.amountPaid || 0));

    const availableOutcomes = resultOptions[currentStage].map((value) => ({
      value,
      label: jobRecords.getOutcomeLabel(value)
    }));
    if (!selectedOutcomeValue || !availableOutcomes.some((option) => option.value === selectedOutcomeValue)) {
      selectedOutcomeValue = stageRecord.outcome && stageRecord.outcome !== "pending"
        ? stageRecord.outcome
        : availableOutcomes[0].value;
    }
    elements.closeoutResultButtons.innerHTML = availableOutcomes.map((option) => `
      <button type="button" class="result-btn${option.value === selectedOutcomeValue ? " selected" : ""}" data-outcome-value="${option.value}">${option.label}</button>`).join("");
    elements.closeoutResultButtons.querySelectorAll("[data-outcome-value]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedOutcomeValue = button.dataset.outcomeValue;
        renderSelected(item);
      });
    });

    const jobHref = buildSharedHref("job-records.html", item, "closeout");
    const crmHref = buildSharedHref("crm.html", item, "closeout");
    const dispatchHref = buildSharedHref("dispatcher-dashboard.html", item, "closeout");
    const closeoutHref = buildSharedHref("closeout.html", item, "closeout");
    const followUpHref = buildSharedHref("president-follow-up.html", item, "closeout");
    const settingsHref = buildSharedHref("settings.html", item, "closeout");
    const presidentHref = buildSharedHref("new-president-dashboard.html", item, "closeout");
    [elements.closeoutOpenRecordBtn, elements.closeoutJobRecordsLink].forEach((link) => { link.href = jobHref; });
    if (elements.closeoutCrmLink) elements.closeoutCrmLink.href = crmHref;
    elements.closeoutDispatchLink.href = dispatchHref;
    if (elements.closeoutBoardLink) elements.closeoutBoardLink.href = closeoutHref;
    if (elements.closeoutFollowUpLink) elements.closeoutFollowUpLink.href = followUpHref;
    if (elements.closeoutSettingsLink) elements.closeoutSettingsLink.href = settingsHref;
    [elements.closeoutPresidentBtn, elements.closeoutPresidentLink].forEach((link) => { link.href = presidentHref; });
    const workerHref = currentStage === "A"
      ? ""
      : (record.appointmentType === "sales" || record.assignedRep === "Alex Carter"
          ? buildSharedHref("sales-dashboard.html", item, "closeout", { followup: "" })
          : buildSharedHref("field-dashboard.html", item, "closeout", { followup: "" }));
    if (workerHref) {
      elements.closeoutWorkerBtn.href = workerHref;
      elements.closeoutWorkerBtn.classList.remove("disabled");
    } else {
      elements.closeoutWorkerBtn.href = "#";
      elements.closeoutWorkerBtn.classList.add("disabled");
    }

    if (!statusTone) {
      setStatus(`Current outcome: ${jobRecords.getOutcomeLabel(stageRecord.outcome || "pending")}. Amount paid: ${record.amountPaid ? `$${Number(record.amountPaid).toLocaleString()}` : "not recorded"}.`);
    }
  }

  function renderLanes(queue) {
    const confirmed = queue.filter((item) => item.stageRecord.status === "confirmed").length;
    const inProgress = queue.filter((item) => item.stageRecord.status === "in_progress").length;
    const followUp = queue.filter((item) => item.stageRecord.status === "follow_up_needed").length;
    const completed = queue.filter((item) => item.stageRecord.status === "completed").length;
    const lanes = currentStage === "A"
      ? [
          { title: "Waiting on President result entry", body: `${confirmed} records already have the appointment promise locked and now need the President to enter the real business result.`, count: confirmed, tag: "Result" },
          { title: "Open follow-up outcomes", body: `${followUp} records remain alive because the business path is not actually closed yet.`, count: followUp, tag: "Follow-Up" },
          { title: "Completed business truth", body: `${completed} records already hold final outcome and can feed executive reporting.`, count: completed, tag: "Closed" }
        ]
      : [
          { title: "Ready for structured closeout", body: `${confirmed + inProgress} records are confirmed or active and still need final structured outcome truth.`, count: confirmed + inProgress, tag: "Closeout" },
          { title: "Follow-up remains active", body: `${followUp} records cannot disappear after the visit because the business next step is still open.`, count: followUp, tag: "Track" },
          { title: "Completed records", body: `${completed} records are already closed and should mainly be reviewed for revenue truth and quality.`, count: completed, tag: "Review" }
        ];
    elements.closeoutLaneList.innerHTML = lanes.map((lane) => `
      <div class="detail-item">
        <strong>${lane.title}</strong>
        <p>${lane.body}</p>
        <div class="tag-row"><span class="tag blue">${lane.count} Items</span><span class="tag orange">${lane.tag}</span></div>
      </div>`).join("");
  }

  function renderSnapshot(queue) {
    const totalPaid = queue.reduce((sum, item) => sum + Number(item.record.amountPaid || 0), 0);
    const paidCount = queue.filter((item) => Number(item.record.amountPaid || 0) > 0).length;
    const unpaidOpen = queue.filter((item) => ["confirmed", "in_progress", "follow_up_needed"].includes(item.stageRecord.status) && Number(item.record.amountPaid || 0) === 0).length;
    const rows = currentStage === "A"
      ? [
          { title: "Revenue truth recorded", body: `${paidCount} records already hold payment truth, totaling $${totalPaid.toLocaleString()}.` },
          { title: "Open result without payment", body: `${unpaidOpen} still-open records have no payment truth yet and should stay visible.` },
          { title: "Manual outcome discipline", body: "Stage A should keep result truth tight even though the operational workflow is still manually controlled." }
        ]
      : [
          { title: "Revenue truth recorded", body: `${paidCount} records already hold payment truth, totaling $${totalPaid.toLocaleString()}.` },
          { title: "Execution without payment", body: `${unpaidOpen} active records still need payment truth or explicit no-revenue closeout language.` },
          { title: "Structured closeout discipline", body: "Stage B should keep worker result truth, payment truth, and follow-up truth on the same shared record." }
        ];
    elements.closeoutSnapshotList.innerHTML = rows.map((row) => `
      <div class="detail-item">
        <strong>${row.title}</strong>
        <p>${row.body}</p>
      </div>`).join("");
  }

  function applyCloseoutAction(action) {
    const state = jobRecords.readState();
    const records = state.records || [];
    const record = records.find((entry) => entry.id === selectedRecordId);
    if (!record) {
      setStatus("Selected record was not found in shared state.", "error");
      return;
    }
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];
    const timestamp = jobRecords.buildWorkerTimeLabel();

    if (action === "payment") {
      record.amountPaid = Number(elements.closeoutAmountPaid.value || 0);
      stageRecord.activity.push({
        time: timestamp,
        title: "Payment truth updated",
        text: `Amount paid was updated to $${Number(record.amountPaid || 0).toLocaleString()} on the shared Stage ${currentStage} record.`
      });
      jobRecords.writeState(records, record.id);
      setStatus("Payment truth saved.", "success");
      render();
      return;
    }

    if (action === "follow_up") {
      stageRecord.outcome = "follow_up_needed";
      stageRecord.status = "follow_up_needed";
      stageRecord.activity.push({
        time: timestamp,
        title: "Record moved to follow-up needed",
        text: `The shared Stage ${currentStage} record remains alive because another business step is still required.`
      });
      jobRecords.writeState(records, record.id);
      selectedOutcomeValue = "follow_up_needed";
      setStatus("Record marked as follow-up needed.", "success");
      render();
      return;
    }

    if (action === "canceled") {
      stageRecord.outcome = "canceled";
      stageRecord.status = "canceled";
      stageRecord.activity.push({
        time: timestamp,
        title: "Record closed as canceled",
        text: `The shared Stage ${currentStage} record was explicitly closed as canceled during closeout review.`
      });
      jobRecords.writeState(records, record.id);
      selectedOutcomeValue = "canceled";
      setStatus("Record closed as canceled.", "success");
      render();
      return;
    }

    if (action === "complete") {
      stageRecord.outcome = selectedOutcomeValue || stageRecord.outcome || "service_completed";
      stageRecord.status = currentStage === "B"
        ? jobRecords.deriveWorkerStageStatus(record.appointmentType === "service" ? "service" : "sales", stageRecord.outcome)
        : (workflowHelpers.deriveStageAStatusFromOutcome(stageRecord.outcome) || "completed");
      stageRecord.activity.push({
        time: timestamp,
        title: "Structured closeout completed",
        text: `Closeout was completed with ${jobRecords.getOutcomeLabel(stageRecord.outcome)} on the shared Stage ${currentStage} record.`
      });
      if (!["follow_up_needed", "no_show", "canceled"].includes(stageRecord.status)) {
        stageRecord.status = "completed";
      }
      jobRecords.writeState(records, record.id);
      setStatus("Closeout truth saved on the shared record.", "success");
      render();
    }
  }

  function render() {
    const queue = getQueue();
    const selected = getSelectedItem(queue);
    if (!selected) return;
    selectedRecordId = selected.record.id;
    syncSelectionUrl(selected);
    renderTopline(queue, selected);
    renderSummary(queue);
    renderQueue(queue);
    renderSelected(selected);
    renderLanes(queue);
    renderSnapshot(queue);
  }

  render();
})();
