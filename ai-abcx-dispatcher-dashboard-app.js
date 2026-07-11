(() => {
  const stageConfig = window.AIABCStageConfig || null;
  const appConfig = window.AIABCConfig || null;
  const jobRecords = window.AIABCXJobRecords;
  const workflowHelpers = window.AIABCXWorkflowHelpers;
  if (!jobRecords || !workflowHelpers) return;

  const params = new URLSearchParams(window.location.search);
  const companyConfig = appConfig && typeof appConfig.companyConfigFromSearchParams === "function"
    ? appConfig.companyConfigFromSearchParams(params)
    : null;
  const requestedStage = params.get("stage");
  const requestedJob = params.get("job");
  let currentStage = stageConfig && typeof stageConfig.normalizeStage === "function"
    ? stageConfig.normalizeStage(requestedStage, stageConfig.getCurrentStage ? stageConfig.getCurrentStage() : "A")
    : (["A", "B", "C"].includes(requestedStage) ? requestedStage : "A");
  if (currentStage === "C") currentStage = "B";
  if (stageConfig && typeof stageConfig.setCurrentStage === "function") {
    stageConfig.setCurrentStage(currentStage);
  }

  const priorityRank = { high: 0, medium: 1, low: 2 };
  const businessDescriptor = companyConfig && companyConfig.viewModel
    ? (companyConfig.viewModel.serviceDescriptor || companyConfig.viewModel.industry || "Service")
    : "Service";
  const businessDescriptorLower = String(businessDescriptor).toLowerCase();
  const dispatchTerms = (() => {
    const normalized = businessDescriptorLower;
    const terms = {
      dispatchTitle: `${businessDescriptor} Dispatch`,
      workItems: `${businessDescriptorLower} records`,
      outcomeLabel: `${businessDescriptorLower} truth`,
      visitLabel: `${businessDescriptorLower} work`
    };
    if (normalized.includes("plumb")) {
      terms.workItems = "plumbing records";
      terms.outcomeLabel = "work-order truth";
      terms.visitLabel = "plumbing work";
    } else if (normalized.includes("hvac") || normalized.includes("heating") || normalized.includes("cooling")) {
      terms.workItems = "service-call records";
      terms.outcomeLabel = "service-call truth";
      terms.visitLabel = "service-call work";
    } else if (normalized.includes("electric")) {
      terms.workItems = "electrical job records";
      terms.outcomeLabel = "electrical-job truth";
      terms.visitLabel = "electrical work";
    }
    return terms;
  })();
  const workerCandidates = {
    sales: [
      { name: "Alex Carter", role: "Sales Lead", availability: "Open 10:30 AM and 4:15 PM windows", note: "Best fit for consult-first work and estimate conversion." },
      { name: "Jordan Lee", role: "Sales Backup", availability: "Open after 2:00 PM", note: "Useful fallback when the primary worker misses confirmation." }
    ],
    service: [
      { name: "Sarah Kim", role: "Service Lead", availability: "Open 2:00 PM route and next-day morning", note: "Primary service route owner with stable closeout history." },
      { name: "Mike Daniels", role: "Urgent Service Backup", availability: "Open same-day emergency window", note: "Best fallback for urgent or same-day field pressure." }
    ],
    sales_and_service: [
      { name: "Alex Carter", role: "Sales Frontline", availability: "Open consult window before noon", note: "Best when the mixed job should begin in sales mode." },
      { name: "Sarah Kim", role: "Service Lead", availability: "Open afternoon service window", note: "Best when the mixed job is already leaning toward field execution." },
      { name: "Mike Daniels", role: "Service Backup", availability: "Open urgent overflow capacity", note: "Useful backup when same-day service pressure rises." }
    ]
  };
  const elements = {
    dispatchStageBadge: document.getElementById("dispatchStageBadge"),
    dispatchProfileText: document.getElementById("dispatchProfileText"),
    dispatchSidebarFoot: document.getElementById("dispatchSidebarFoot"),
    dispatchTitle: document.getElementById("dispatchTitle"),
    dispatchSub: document.getElementById("dispatchSub"),
    dispatchBoardCount: document.getElementById("dispatchBoardCount"),
    dispatchOpenChip: document.getElementById("dispatchOpenChip"),
    dispatchPressureChip: document.getElementById("dispatchPressureChip"),
    dispatchSummaryGrid: document.getElementById("dispatchSummaryGrid"),
    dispatchQueueList: document.getElementById("dispatchQueueList"),
    dispatchQueueLabel: document.getElementById("dispatchQueueLabel"),
    dispatchLaneList: document.getElementById("dispatchLaneList"),
    focusTitle: document.getElementById("focusTitle"),
    focusSub: document.getElementById("focusSub"),
    focusJob: document.getElementById("focusJob"),
    focusPriority: document.getElementById("focusPriority"),
    focusStatus: document.getElementById("focusStatus"),
    focusOwner: document.getElementById("focusOwner"),
    focusActionLabel: document.getElementById("focusActionLabel"),
    focusActionText: document.getElementById("focusActionText"),
    assignmentPanelTitle: document.getElementById("assignmentPanelTitle"),
    assignmentPanelIntro: document.getElementById("assignmentPanelIntro"),
    assignmentCandidateList: document.getElementById("assignmentCandidateList"),
    assignSelectedBtn: document.getElementById("assignSelectedBtn"),
    returnToQueueBtn: document.getElementById("returnToQueueBtn"),
    rerouteSelectedBtn: document.getElementById("rerouteSelectedBtn"),
    markInProgressBtn: document.getElementById("markInProgressBtn"),
    assignmentPanelStatus: document.getElementById("assignmentPanelStatus"),
    dispatchFlowSteps: document.getElementById("dispatchFlowSteps"),
    dispatchActivityList: document.getElementById("dispatchActivityList"),
    dispatchOpenRecordBtn: document.getElementById("dispatchOpenRecordBtn"),
    dispatchWorkerBtn: document.getElementById("dispatchWorkerBtn"),
    dispatchPresidentBtn: document.getElementById("dispatchPresidentBtn"),
    focusJobRecordLink: document.getElementById("focusJobRecordLink"),
    focusWorkerLink: document.getElementById("focusWorkerLink"),
    focusPresidentLink: document.getElementById("focusPresidentLink"),
    dispatchBoardLink: document.getElementById("dispatchBoardLink"),
    dispatchJobRecordsLink: document.getElementById("dispatchJobRecordsLink"),
    dispatchPresidentLink: document.getElementById("dispatchPresidentLink"),
    dispatchCrmLink: document.getElementById("dispatchCrmLink"),
    dispatchFollowUpLink: document.getElementById("dispatchFollowUpLink"),
    dispatchSettingsLink: document.getElementById("dispatchSettingsLink")
  };

  let selectedRecordId = "";
  let selectedCandidateName = "";
  let assignmentStatusTone = "";

  document.querySelectorAll(".stage-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      currentStage = button.dataset.stage;
      assignmentStatusTone = "";
      if (stageConfig && typeof stageConfig.setCurrentStage === "function") {
        stageConfig.setCurrentStage(currentStage);
      }
      render();
    });
  });

  elements.assignSelectedBtn.addEventListener("click", () => {
    applyDispatcherAction("assign");
  });
  elements.returnToQueueBtn.addEventListener("click", () => {
    applyDispatcherAction("queue");
  });
  elements.rerouteSelectedBtn.addEventListener("click", () => {
    applyDispatcherAction("reroute");
  });
  elements.markInProgressBtn.addEventListener("click", () => {
    applyDispatcherAction("in_progress");
  });

  function readRecords() {
    return (jobRecords.readState().records || []).slice();
  }

  function buildFocus(record) {
    return jobRecords.buildJobFocus(record, currentStage);
  }

  function getPriority(focus) {
    const closedStatuses = ["completed", "canceled", "no_show"];
    return closedStatuses.includes(focus.statusValue)
      ? workflowHelpers.getClosedQueuePriority(focus)
      : workflowHelpers.getQueuePriority(focus);
  }

  function getQueue() {
    return readRecords()
      .map((record) => {
        const focus = buildFocus(record);
        const priority = getPriority(focus);
        return { record, focus, priority };
      })
      .sort((a, b) => {
        const toneDelta = (priorityRank[a.priority.tone] || 9) - (priorityRank[b.priority.tone] || 9);
        if (toneDelta !== 0) return toneDelta;
        return String(a.record.jobNumber).localeCompare(String(b.record.jobNumber));
      });
  }

  function getSelectedQueueItem(queue) {
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

  function summarize(queue) {
    const summary = {
      total: queue.length,
      open: 0,
      high: 0,
      manual: 0,
      awaitingAssignment: 0,
      awaitingWorkerConfirm: 0,
      awaitingCustomerConfirm: 0,
      inProgress: 0,
      closed: 0,
      rerouted: 0,
      followUp: 0
    };
    queue.forEach(({ focus, priority }) => {
      if (priority.tone === "high") summary.high += 1;
      if (["completed", "canceled", "no_show"].includes(focus.statusValue)) {
        summary.closed += 1;
      } else {
        summary.open += 1;
      }
      if (focus.statusValue === "awaiting_manual_confirmation") summary.manual += 1;
      if (focus.statusValue === "awaiting_worker_assignment") summary.awaitingAssignment += 1;
      if (focus.statusValue === "awaiting_worker_confirmation") summary.awaitingWorkerConfirm += 1;
      if (focus.statusValue === "awaiting_customer_confirmation") summary.awaitingCustomerConfirm += 1;
      if (focus.statusValue === "in_progress" || focus.statusValue === "confirmed") summary.inProgress += 1;
      if (focus.statusValue === "rerouted") summary.rerouted += 1;
      if (focus.statusValue === "follow_up_needed" || focus.statusValue === "rescheduled") summary.followUp += 1;
    });
    return summary;
  }

  function getWorkerLink(record) {
    if (currentStage === "A") return "";
    const type = record.appointmentType;
    if (type === "sales") {
      return buildSharedHref("sales-dashboard.html", { record }, "dispatcher", { followup: "" });
    }
    if (type === "service") {
      return buildSharedHref("field-dashboard.html", { record }, "dispatcher", { followup: "" });
    }
    if (record.assignedRep === "Alex Carter") {
      return buildSharedHref("sales-dashboard.html", { record }, "dispatcher", { followup: "" });
    }
    return buildSharedHref("field-dashboard.html", { record }, "dispatcher", { followup: "" });
  }

  function buildSharedHref(path, selected, source, overrides = {}) {
    const href = new URL(path, window.location.href);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.forEach((value, key) => {
      href.searchParams.set(key, value);
    });

    href.searchParams.set("stage", currentStage);
    if (selected && selected.record && selected.record.id) {
      href.searchParams.set("job", selected.record.id);
    } else {
      href.searchParams.delete("job");
    }
    if (source) {
      href.searchParams.set("source", source);
    }
    const followUpReason = selected ? getFollowUpReasonFromFocus(selected.focus) : "";
    if (followUpReason) {
      href.searchParams.set("followup", followUpReason);
    } else {
      href.searchParams.delete("followup");
    }

    if (companyConfig && companyConfig.viewModel && !currentUrl.searchParams.get("schedulingMode") && companyConfig.viewModel.schedulingMode) {
      href.searchParams.set("schedulingMode", companyConfig.viewModel.schedulingMode);
    }

    Object.entries(overrides).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        href.searchParams.delete(key);
      } else {
        href.searchParams.set(key, String(value));
      }
    });

    return `${href.pathname.split("/").pop()}${href.search}`;
  }

  function tagClass(value) {
    return workflowHelpers.statusClass(value || "");
  }

  function renderSummary(summary) {
    const cards = currentStage === "A"
      ? [
          { label: "Manual Queue", value: String(summary.open), meta: `${summary.manual} records still need President-led manual confirmation` },
          { label: "Follow-Up Pressure", value: String(summary.followUp), meta: "Reschedules and follow-up records stay visible before closure" },
          { label: "Closed Truth", value: String(summary.closed), meta: "Completed, canceled, and no-show records remain part of reporting" },
          { label: "Priority Watch", value: String(summary.high), meta: "Highest-pressure manual records should move first" }
        ]
      : [
          { label: "Open Queue", value: String(summary.open), meta: `${summary.awaitingAssignment} still need assignment and ${summary.awaitingWorkerConfirm} need worker confirmation` },
          { label: "Customer Gates", value: String(summary.awaitingCustomerConfirm), meta: "Customer confirmation is the lock step after worker acceptance" },
          { label: "Reroutes", value: String(summary.rerouted), meta: "Missed worker confirmations remain visible until reassigned" },
          { label: "Closeout Pressure", value: String(summary.inProgress + summary.followUp), meta: "Confirmed, in-progress, and follow-up records are still operationally alive" }
        ];
    elements.dispatchSummaryGrid.innerHTML = cards.map((card) => `
      <div class="card">
        <div class="label">${card.label}</div>
        <div class="value">${card.value}</div>
        <div class="meta">${card.meta}</div>
      </div>`).join("");
  }

  function setAssignmentStatus(message, tone = "") {
    assignmentStatusTone = tone;
    elements.assignmentPanelStatus.textContent = message;
    elements.assignmentPanelStatus.className = `panel-status${tone ? ` ${tone}` : ""}`;
  }

  function renderQueue(queue) {
    elements.dispatchQueueList.innerHTML = queue.map(({ record, focus, priority }) => `
      <button type="button" class="dispatch-item${record.id === selectedRecordId ? " active" : ""}" data-record-id="${record.id}">
        <div class="dispatch-top">
          <div>
            <strong>${focus.customer}</strong>
            <p>${focus.appointmentType} workflow. ${focus.summary}</p>
            <div class="tag-row">
              <span class="tag ${tagClass(focus.statusValue)}">${focus.statusLabel}</span>
              <span class="tag blue">${focus.label}</span>
              <span class="tag ${priority.tone === "high" ? "red" : priority.tone === "medium" ? "orange" : "green"}">${priority.label}</span>
            </div>
          </div>
          <div>
            <strong>${record.assignedRep || "Unassigned"}</strong>
            <p>${currentStage === "A" ? "President-led movement" : "Worker-linked movement"}</p>
          </div>
          <div><span class="tag ${Number(record.amountPaid || 0) > 0 ? "green" : "orange"}">${Number(record.amountPaid || 0) > 0 ? `$${Number(record.amountPaid).toLocaleString()}` : "Open"}</span></div>
        </div>
      </button>`).join("");
    elements.dispatchQueueList.querySelectorAll("[data-record-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedRecordId = button.dataset.recordId;
        assignmentStatusTone = "";
        render();
      });
    });
  }

  function renderFocus(item) {
    if (!item) return;
    const { record, focus, priority } = item;
    const workflow = workflowHelpers.getJobFocusWorkflowConfig(focus, currentStage);
    elements.focusTitle.textContent = `${focus.customer} Dispatch Focus`;
    elements.focusSub.textContent = currentStage === "A"
      ? `${focus.label} is currently moving through Stage A manual scheduling truth. Worker dashboards stay visible only as future structure while the President controls the real commitment.`
      : `${focus.label} is currently moving through the Stage B engine lane. This board should show the pressure point before the worker or President view is opened.`;
    elements.focusJob.textContent = focus.label;
    elements.focusPriority.textContent = priority.label;
    elements.focusStatus.textContent = focus.statusLabel;
    elements.focusOwner.textContent = focus.assignedRep || "Unassigned";
    elements.focusActionLabel.textContent = workflow.nextAction.label;
    elements.focusActionText.textContent = workflow.nextAction.detail;
    renderAssignmentPanel(record, focus);
    elements.dispatchFlowSteps.innerHTML = workflow.steps.map((step) => `
      <div class="flow-step ${step.status === "upcoming" ? "" : step.status}">
        <strong>${step.label}</strong>
        <span>${step.note}</span>
      </div>`).join("");
    const activity = focus.activityTimeline && focus.activityTimeline.length ? focus.activityTimeline : [{ title: "No activity yet", text: "This shared record does not yet have a visible activity trail." }];
    elements.dispatchActivityList.innerHTML = activity.map((entry) => `
      <div class="mini-item">
        <strong>${entry.time ? `${entry.time} • ` : ""}${entry.title}</strong>
        <p>${entry.text}</p>
      </div>`).join("");

    const jobRecordHref = buildSharedHref("job-records.html", item);
    const presidentHref = buildSharedHref("new-president-dashboard.html", item, "dispatcher");
    const workerHref = getWorkerLink(record);
    const dispatcherHref = buildSharedHref("dispatcher-dashboard.html", item, "dispatcher");
    const crmHref = buildSharedHref("crm.html", item, "dispatcher-dashboard");
    const followUpHref = buildSharedHref("president-follow-up.html", item, "dispatcher-dashboard");
    const settingsHref = buildSharedHref("settings.html", item, "dispatcher-dashboard");

    [elements.dispatchOpenRecordBtn, elements.focusJobRecordLink, elements.dispatchJobRecordsLink].forEach((link) => { link.href = jobRecordHref; });
    [elements.dispatchPresidentBtn, elements.focusPresidentLink, elements.dispatchPresidentLink].forEach((link) => { link.href = presidentHref; });
    if (elements.dispatchBoardLink) elements.dispatchBoardLink.href = dispatcherHref;
    if (elements.dispatchCrmLink) elements.dispatchCrmLink.href = crmHref;
    if (elements.dispatchFollowUpLink) elements.dispatchFollowUpLink.href = followUpHref;
    if (elements.dispatchSettingsLink) elements.dispatchSettingsLink.href = settingsHref;
    [elements.dispatchWorkerBtn, elements.focusWorkerLink].forEach((link) => {
      if (workerHref) {
        link.href = workerHref;
        link.classList.remove("disabled");
      } else {
        link.href = "#";
        link.classList.add("disabled");
      }
    });
  }

  function renderAssignmentPanel(record, focus) {
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    if (currentStage === "A") {
      elements.assignmentPanelTitle.textContent = "Stage A Manual Control";
      elements.assignmentPanelIntro.textContent = "Worker assignment does not activate inside AI-ABCX yet. This board should keep the manual scheduling truth visible for the President.";
      elements.assignmentCandidateList.innerHTML = `
        <div class="candidate-item active">
          <strong>President-owned manual movement</strong>
          <p>The representative can still be chosen outside the system, but the real next step is to lock the confirmed time and later report the appointment outcome under the same job number.</p>
          <div class="tag-row"><span class="tag orange">${focus.statusLabel}</span><span class="tag blue">${record.assignedRep || "Representative pending"}</span></div>
        </div>`;
      [elements.assignSelectedBtn, elements.returnToQueueBtn, elements.rerouteSelectedBtn, elements.markInProgressBtn].forEach((button) => {
        button.disabled = true;
        button.classList.add("disabled");
      });
      setAssignmentStatus("Stage A keeps dispatcher movement visible, but assignment decisions stay manual and President-led.");
      return;
    }

    const candidates = workerCandidates[record.appointmentType] || workerCandidates.service;
    if (!selectedCandidateName || !candidates.some((candidate) => candidate.name === selectedCandidateName)) {
      selectedCandidateName = record.assignedRep && candidates.some((candidate) => candidate.name === record.assignedRep)
        ? record.assignedRep
        : candidates[0].name;
    }
    elements.assignmentPanelTitle.textContent = "Stage B Routing Decision Surface";
    elements.assignmentPanelIntro.textContent = "Pick the next candidate for assignment or reroute control. This writes back to the shared record and should become the operating bridge before opening the worker screen.";
    elements.assignmentCandidateList.innerHTML = candidates.map((candidate) => `
      <button type="button" class="candidate-item${candidate.name === selectedCandidateName ? " active" : ""}" data-candidate-name="${candidate.name}">
        <strong>${candidate.name}</strong>
        <p>${candidate.role}. ${candidate.availability}. ${candidate.note}</p>
        <div class="tag-row"><span class="tag blue">${candidate.role}</span><span class="tag ${candidate.name === record.assignedRep ? "green" : "orange"}">${candidate.name === record.assignedRep ? "Current Owner" : "Available Candidate"}</span></div>
      </button>`).join("");
    elements.assignmentCandidateList.querySelectorAll("[data-candidate-name]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedCandidateName = button.dataset.candidateName;
        render();
      });
    });

    const canAssign = ["awaiting_worker_assignment", "awaiting_worker_confirmation", "rerouted", "provisional"].includes(stageRecord.status);
    const canQueue = !["awaiting_worker_assignment", "completed", "canceled", "no_show"].includes(stageRecord.status);
    const canReroute = ["awaiting_worker_confirmation", "awaiting_customer_confirmation"].includes(stageRecord.status);
    const canInProgress = ["confirmed"].includes(stageRecord.status);
    const actionState = [
      [elements.assignSelectedBtn, canAssign],
      [elements.returnToQueueBtn, canQueue],
      [elements.rerouteSelectedBtn, canReroute],
      [elements.markInProgressBtn, canInProgress]
    ];
    actionState.forEach(([button, enabled]) => {
      button.disabled = !enabled;
      button.classList.toggle("disabled", !enabled);
    });
    if (!assignmentStatusTone) {
      setAssignmentStatus(`Selected candidate: ${selectedCandidateName}. Current shared status: ${focus.statusLabel}.`);
    } else {
      elements.assignmentPanelStatus.className = `panel-status${assignmentStatusTone ? ` ${assignmentStatusTone}` : ""}`;
    }
  }

  function applyDispatcherAction(action) {
    const state = jobRecords.readState();
    const records = state.records || [];
    const record = records.find((entry) => entry.id === selectedRecordId);
    if (!record) {
      setAssignmentStatus("Selected record was not found in shared state.", "error");
      return;
    }
    if (currentStage === "A") {
      setAssignmentStatus("Stage A does not use dispatcher assignment writes. Keep movement manual and President-led.", "error");
      return;
    }
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];
    const timestamp = jobRecords.buildWorkerTimeLabel();
    if (action === "assign") {
      record.assignedRep = selectedCandidateName;
      stageRecord.status = "awaiting_worker_confirmation";
      stageRecord.activity.push({
        time: timestamp,
        title: "Dispatcher assigned worker candidate",
        text: `${selectedCandidateName} was selected from the dispatcher routing panel. The shared Stage ${currentStage} record is now waiting on worker confirmation.`
      });
      jobRecords.writeState(records, record.id);
      setAssignmentStatus(`${selectedCandidateName} is now the active assigned worker. Shared record moved to worker confirmation.`, "success");
      render();
      return;
    }
    if (action === "queue") {
      record.assignedRep = "";
      stageRecord.status = "awaiting_worker_assignment";
      stageRecord.activity.push({
        time: timestamp,
        title: "Dispatcher returned record to assignment queue",
        text: `The shared Stage ${currentStage} record was moved back to assignment queue so the next qualified candidate can be selected.`
      });
      jobRecords.writeState(records, record.id);
      selectedCandidateName = "";
      setAssignmentStatus("Record returned to assignment queue.", "success");
      render();
      return;
    }
    if (action === "reroute") {
      stageRecord.status = "rerouted";
      stageRecord.activity.push({
        time: timestamp,
        title: "Dispatcher pushed record into reroute",
        text: `The shared Stage ${currentStage} record was placed into reroute handling from the dispatcher panel so another candidate can be selected.`
      });
      jobRecords.writeState(records, record.id);
      setAssignmentStatus("Record moved into reroute handling.", "success");
      render();
      return;
    }
    if (action === "in_progress") {
      stageRecord.status = "in_progress";
      stageRecord.activity.push({
        time: timestamp,
        title: "Dispatcher marked visit in progress",
        text: `The shared Stage ${currentStage} record was marked in progress from the dispatcher panel, indicating field execution has started.`
      });
      jobRecords.writeState(records, record.id);
      setAssignmentStatus("Record marked in progress.", "success");
      render();
      return;
    }
  }

  function renderLanes(summary) {
    const lanes = currentStage === "A"
      ? [
          { title: "Awaiting manual confirmation", body: `${summary.manual} ${dispatchTerms.workItems} still need the President to settle the real appointment time outside the system and record it back into AI-ABCX.`, count: summary.manual, tag: "Manual" },
          { title: "Confirmed and waiting on outcome", body: `${summary.open - summary.manual - summary.followUp > 0 ? summary.open - summary.manual - summary.followUp : 0} ${dispatchTerms.workItems} already have a customer promise and are waiting on post-appointment ${dispatchTerms.outcomeLabel} entry.`, count: Math.max(summary.open - summary.manual - summary.followUp, 0), tag: "Track" },
          { title: "Follow-up and reschedule pressure", body: `${summary.followUp} ${dispatchTerms.workItems} are still alive because the business result is not closed yet.`, count: summary.followUp, tag: "Review" }
        ]
      : [
          { title: "Awaiting worker assignment", body: `${summary.awaitingAssignment} ${dispatchTerms.workItems} are waiting for capability and availability matching.`, count: summary.awaitingAssignment, tag: "Assign" },
          { title: "Awaiting worker confirmation", body: `${summary.awaitingWorkerConfirm} ${dispatchTerms.workItems} are sitting at the worker acceptance gate and can reroute if the timer expires.`, count: summary.awaitingWorkerConfirm, tag: "Confirm" },
          { title: "Awaiting customer confirmation", body: `${summary.awaitingCustomerConfirm} ${dispatchTerms.workItems} already have worker acceptance and now need the customer lock step.`, count: summary.awaitingCustomerConfirm, tag: "Customer" },
          { title: "Execution and closeout", body: `${summary.inProgress + summary.followUp} ${dispatchTerms.workItems} are either in execution, follow-up, or still need structured closeout ${dispatchTerms.outcomeLabel}.`, count: summary.inProgress + summary.followUp, tag: "Closeout" }
        ];
    elements.dispatchLaneList.innerHTML = lanes.map((lane) => `
      <div class="mini-item">
        <strong>${lane.title}</strong>
        <p>${lane.body}</p>
        <div class="tag-row"><span class="tag blue">${lane.count} Items</span><span class="tag orange">${lane.tag}</span></div>
      </div>`).join("");
  }

  function renderTopline(summary, selected) {
    elements.dispatchStageBadge.textContent = `Stage ${currentStage} Dispatch`;
    document.querySelectorAll(".stage-toggle").forEach((button) => {
      button.classList.toggle("active", button.dataset.stage === currentStage);
    });
    elements.dispatchProfileText.textContent = currentStage === "A"
      ? `Manage President-led manual scheduling truth, ${businessDescriptorLower} confirmation pressure, and post-${dispatchTerms.visitLabel} reporting readiness.`
      : `Manage engine assignment pressure, worker confirmation gates, customer lock steps, reroutes, and ${businessDescriptorLower} closeout pressure.`;
    elements.dispatchSidebarFoot.textContent = currentStage === "A"
      ? `Stage A keeps the ${businessDescriptorLower} operating structure visible, but real scheduling movement still belongs to the President.`
      : `Stage B uses this board as the shared ${businessDescriptorLower} bridge before opening worker or President screens.`;
    elements.dispatchTitle.textContent = currentStage === "A" ? `Stage A ${dispatchTerms.dispatchTitle} Board` : `Stage B ${dispatchTerms.dispatchTitle} Board`;
    elements.dispatchSub.textContent = currentStage === "A"
      ? `This board tracks manual scheduling truth: which ${dispatchTerms.workItems} still need confirmation, which appointment is already locked, and what still needs President outcome reporting.`
      : `This board tracks automated scheduling truth: which ${dispatchTerms.workItems} are still unassigned, waiting on worker confirmation, waiting on customer confirmation, rerouted, or still alive in closeout.`;
    elements.dispatchBoardCount.textContent = String(summary.total);
    elements.dispatchOpenChip.textContent = `${summary.open} Open`;
    elements.dispatchPressureChip.textContent = currentStage === "A"
      ? `${summary.manual} Manual Waiting`
      : `${summary.awaitingWorkerConfirm + summary.awaitingCustomerConfirm} Confirmation Gates`;
    elements.dispatchQueueLabel.textContent = selected
      ? `${selected.focus.label} selected`
      : "Priority first";
  }

  function render() {
    const queue = getQueue();
    const selected = getSelectedQueueItem(queue);
    if (!selected) return;
    selectedRecordId = selected.record.id;
    syncSelectionUrl(selected);
    const summary = summarize(queue);
    renderTopline(summary, selected);
    renderSummary(summary);
    renderQueue(queue);
    renderFocus(selected);
    renderLanes(summary);
  }

  render();
})();
