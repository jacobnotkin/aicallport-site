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

  const deliveryStateKey = "ai-abcx-notification-state-v1";
  const elements = {
    notificationsStageBadge: document.getElementById("notificationsStageBadge"),
    notificationsProfileText: document.getElementById("notificationsProfileText"),
    notificationsSidebarFoot: document.getElementById("notificationsSidebarFoot"),
    notificationsTitle: document.getElementById("notificationsTitle"),
    notificationsSub: document.getElementById("notificationsSub"),
    notificationsBoardCount: document.getElementById("notificationsBoardCount"),
    notificationsOpenChip: document.getElementById("notificationsOpenChip"),
    notificationsPressureChip: document.getElementById("notificationsPressureChip"),
    notificationsSummaryGrid: document.getElementById("notificationsSummaryGrid"),
    notificationsFeed: document.getElementById("notificationsFeed"),
    notificationsFeedLabel: document.getElementById("notificationsFeedLabel"),
    notificationsFocusLabel: document.getElementById("notificationsFocusLabel"),
    notificationsFocusTitle: document.getElementById("notificationsFocusTitle"),
    notificationsFocusText: document.getElementById("notificationsFocusText"),
    notificationsActionTitle: document.getElementById("notificationsActionTitle"),
    notificationsActionText: document.getElementById("notificationsActionText"),
    notificationsActionList: document.getElementById("notificationsActionList"),
    sendReminderBtn: document.getElementById("sendReminderBtn"),
    markDeliveredBtn: document.getElementById("markDeliveredBtn"),
    markFailedBtn: document.getElementById("markFailedBtn"),
    markConfirmedBtn: document.getElementById("markConfirmedBtn"),
    notificationsStatus: document.getElementById("notificationsStatus"),
    notificationsLaneList: document.getElementById("notificationsLaneList"),
    notificationsSnapshotList: document.getElementById("notificationsSnapshotList"),
    notificationsOpenRecordBtn: document.getElementById("notificationsOpenRecordBtn"),
    notificationsDispatchBtn: document.getElementById("notificationsDispatchBtn"),
    notificationsPresidentBtn: document.getElementById("notificationsPresidentBtn"),
    notificationsDispatchLink: document.getElementById("notificationsDispatchLink"),
    notificationsJobRecordsLink: document.getElementById("notificationsJobRecordsLink"),
    notificationsPresidentLink: document.getElementById("notificationsPresidentLink")
  };

  let selectedRecordId = "";
  let statusTone = "";
  let deliveryState = loadDeliveryState();

  document.querySelectorAll(".stage-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      currentStage = button.dataset.stage;
      if (stageConfig && typeof stageConfig.setCurrentStage === "function") stageConfig.setCurrentStage(currentStage);
      statusTone = "";
      render();
    });
  });

  elements.sendReminderBtn.addEventListener("click", () => applyAction("reminder"));
  elements.markDeliveredBtn.addEventListener("click", () => applyAction("delivered"));
  elements.markFailedBtn.addEventListener("click", () => applyAction("failed"));
  elements.markConfirmedBtn.addEventListener("click", () => applyAction("confirmed"));

  function loadDeliveryState() {
    try {
      return JSON.parse(localStorage.getItem(deliveryStateKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveDeliveryState() {
    localStorage.setItem(deliveryStateKey, JSON.stringify(deliveryState));
  }

  function readRecords() {
    return (jobRecords.readState().records || []).slice();
  }

  function ensureDeliveryRecord(recordId) {
    if (!deliveryState[recordId]) {
      deliveryState[recordId] = { channel: currentStage === "A" ? "manual" : "sms", delivery: "pending", reminders: 0, lastMessage: "No message sent yet." };
    }
    return deliveryState[recordId];
  }

  function getFeedItems() {
    return readRecords().map((record) => {
      const focus = jobRecords.buildJobFocus(record, currentStage);
      const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
      const notify = ensureDeliveryRecord(record.id);
      const awaitingCustomer = currentStage === "B" && stageRecord.status === "awaiting_customer_confirmation";
      const awaitingManual = currentStage === "A" && stageRecord.status === "awaiting_manual_confirmation";
      const requiresAction = awaitingCustomer || awaitingManual || notify.delivery === "failed";
      return {
        record,
        focus,
        stageRecord,
        notify,
        requiresAction,
        priority: notify.delivery === "failed" ? 0 : requiresAction ? 1 : 2
      };
    }).sort((a, b) => a.priority - b.priority || String(a.record.jobNumber).localeCompare(String(b.record.jobNumber)));
  }

  function getSelectedItem(feed) {
    if (!feed.length) return null;
    return feed.find((item) => item.record.id === selectedRecordId)
      || feed.find((item) => item.record.id === requestedJob)
      || feed[0];
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
    elements.notificationsStatus.textContent = message;
    elements.notificationsStatus.className = `panel-status${tone ? ` ${tone}` : ""}`;
  }

  function renderTopline(feed, selected) {
    const openCount = feed.filter((item) => item.requiresAction).length;
    const failedCount = feed.filter((item) => item.notify.delivery === "failed").length;
    elements.notificationsStageBadge.textContent = `Stage ${currentStage} Notifications`;
    document.querySelectorAll(".stage-toggle").forEach((button) => {
      button.classList.toggle("active", button.dataset.stage === currentStage);
    });
    elements.notificationsProfileText.textContent = currentStage === "A"
      ? "Track President-led manual confirmation reminders and whether the real customer promise has been locked outside the system."
      : "Track Stage B SMS confirmation sends, delivery state, reminder attempts, and the final customer lock step.";
    elements.notificationsSidebarFoot.textContent = currentStage === "A"
      ? "Stage A uses reminders only for manual coordination. The customer commitment is still settled outside AI-ABCX."
      : "Stage B should keep every customer confirmation gate visible until the shared record becomes confirmed or fails back into follow-up.";
    elements.notificationsTitle.textContent = currentStage === "A" ? "Stage A Confirmation Board" : "Stage B Confirmation Board";
    elements.notificationsSub.textContent = currentStage === "A"
      ? "Watch which records still need manual promise follow-up and keep the President aware of unresolved appointment truth."
      : "Watch which records already cleared worker confirmation, which customer messages were delivered, and which appointments are still waiting to lock.";
    elements.notificationsBoardCount.textContent = String(feed.length);
    elements.notificationsOpenChip.textContent = `${openCount} Open`;
    elements.notificationsPressureChip.textContent = `${failedCount} Failed`;
    elements.notificationsFeedLabel.textContent = selected ? `${selected.focus.label} selected` : "Priority first";
    elements.notificationsFocusLabel.textContent = currentStage === "A" ? "Manual truth" : "Customer lock gate";
  }

  function renderSummary(feed) {
    const awaiting = feed.filter((item) => item.requiresAction).length;
    const delivered = feed.filter((item) => item.notify.delivery === "delivered").length;
    const failed = feed.filter((item) => item.notify.delivery === "failed").length;
    const confirmed = feed.filter((item) => item.stageRecord.status === "confirmed").length;
    const cards = currentStage === "A"
      ? [
          { label: "Manual Promises Open", value: String(awaiting), meta: "These still need President-led confirmation follow-up" },
          { label: "Reminder Attempts", value: String(feed.reduce((sum, item) => sum + item.notify.reminders, 0)), meta: "Manual reminder activity stays visible here" },
          { label: "Resolved Promises", value: String(confirmed), meta: "Records with confirmed manual truth already locked" },
          { label: "Message Failures", value: String(failed), meta: "Failures usually mean the President must intervene directly" }
        ]
      : [
          { label: "Customer Gates Open", value: String(awaiting), meta: "Worker confirmed records still waiting on customer response" },
          { label: "Delivered Messages", value: String(delivered), meta: "Customer confirmation messages that reached the client" },
          { label: "Confirmed Records", value: String(confirmed), meta: "Appointments fully locked after customer confirmation" },
          { label: "Delivery Failures", value: String(failed), meta: "These need retry or manual intervention before the appointment drifts" }
        ];
    elements.notificationsSummaryGrid.innerHTML = cards.map((card) => `
      <div class="card">
        <div class="label">${card.label}</div>
        <div class="value">${card.value}</div>
        <div class="meta">${card.meta}</div>
      </div>`).join("");
  }

  function renderFeed(feed) {
    elements.notificationsFeed.innerHTML = feed.map((item) => {
      const urgencyClass = item.notify.delivery === "failed" ? "red" : item.requiresAction ? "orange" : "green";
      const urgencyLabel = item.notify.delivery === "failed"
        ? "Delivery Failed"
        : item.requiresAction
          ? (currentStage === "A" ? "Manual Follow-Up" : "Customer Waiting")
          : "Resolved";
      return `
        <button type="button" class="note${item.record.id === selectedRecordId ? " active" : ""}" data-record-id="${item.record.id}">
          <div class="note-top"><strong>${item.focus.customer}</strong><span class="tag ${urgencyClass}">${urgencyLabel}</span></div>
          <p>${item.focus.label}. ${item.notify.lastMessage}</p>
          <div class="tag-row">
            <span class="tag blue">${item.notify.channel.toUpperCase()}</span>
            <span class="tag ${workflowHelpers.statusClass(item.stageRecord.status)}">${item.focus.statusLabel}</span>
            <span class="tag">${item.record.confirmedTime || item.record.requestedTime}</span>
          </div>
        </button>`;
    }).join("");
    elements.notificationsFeed.querySelectorAll("[data-record-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedRecordId = button.dataset.recordId;
        statusTone = "";
        render();
      });
    });
  }

  function renderSelected(item) {
    const { record, focus, stageRecord, notify } = item;
    const workflow = workflowHelpers.getJobFocusWorkflowConfig(focus, currentStage);
    elements.notificationsFocusTitle.textContent = `${focus.customer} confirmation focus`;
    elements.notificationsFocusText.textContent = currentStage === "A"
      ? `${focus.label} is still tied to manual scheduling truth. The system can remind, but the President still owns the real appointment promise.`
      : `${focus.label} is moving through the customer confirmation gate. The record should not become fully locked until the customer responds.`;
    elements.notificationsActionTitle.textContent = workflow.nextAction.label;
    elements.notificationsActionText.textContent = workflow.nextAction.detail;

    const deliveryLines = [
      { title: "Channel", detail: notify.channel.toUpperCase() },
      { title: "Delivery state", detail: notify.delivery },
      { title: "Reminder count", detail: String(notify.reminders) },
      { title: "Shared status", detail: focus.statusLabel }
    ];
    elements.notificationsActionList.innerHTML = deliveryLines.map((line) => `
      <div class="action-item">
        <strong>${line.title}</strong>
        <p>${line.detail}</p>
      </div>`).join("");

    const followUpReason = getFollowUpReasonFromFocus(focus);
    const followUpParam = followUpReason
      ? `&followup=${encodeURIComponent(followUpReason)}`
      : "";
    const jobHref = `job-records.html?job=${encodeURIComponent(record.id)}&stage=${encodeURIComponent(currentStage)}${followUpParam}`;
    const dispatchHref = `dispatcher-dashboard.html?job=${encodeURIComponent(record.id)}&stage=${encodeURIComponent(currentStage)}`;
    const presidentHref = `new-president-dashboard.html?job=${encodeURIComponent(record.id)}&stage=${encodeURIComponent(currentStage)}&source=notifications${followUpParam}`;
    [elements.notificationsOpenRecordBtn, elements.notificationsJobRecordsLink].forEach((link) => { link.href = jobHref; });
    [elements.notificationsDispatchBtn, elements.notificationsDispatchLink].forEach((link) => { link.href = dispatchHref; });
    [elements.notificationsPresidentBtn, elements.notificationsPresidentLink].forEach((link) => { link.href = presidentHref; });

    const canConfirm = currentStage === "A"
      ? ["awaiting_manual_confirmation", "rescheduled"].includes(stageRecord.status)
      : stageRecord.status === "awaiting_customer_confirmation";
    elements.markConfirmedBtn.disabled = !canConfirm;
    elements.markConfirmedBtn.classList.toggle("disabled", !canConfirm);
    if (!statusTone) {
      setStatus(`Current message state: ${notify.delivery}. Reminders sent: ${notify.reminders}.`);
    }
  }

  function renderLanes(feed) {
    const pending = feed.filter((item) => item.requiresAction).length;
    const failed = feed.filter((item) => item.notify.delivery === "failed").length;
    const confirmed = feed.filter((item) => item.stageRecord.status === "confirmed").length;
    const lanes = currentStage === "A"
      ? [
          { title: "Manual confirmation waiting", body: `${pending} records still need the President or representative to settle the real promise outside the system.`, count: pending, tag: "Manual" },
          { title: "Reminder failures", body: `${failed} records have message delivery issues and likely need direct owner contact.`, count: failed, tag: "Intervene" },
          { title: "Locked manual truth", body: `${confirmed} records already have their customer promise locked and can move to outcome reporting.`, count: confirmed, tag: "Ready" }
        ]
      : [
          { title: "Customer confirmation waiting", body: `${pending} records already cleared worker confirmation and now need the customer lock step.`, count: pending, tag: "Customer" },
          { title: "Delivery failures", body: `${failed} records failed on delivery and should be retried or manually contacted.`, count: failed, tag: "Retry" },
          { title: "Confirmed from message path", body: `${confirmed} records are already fully locked and no longer need message pressure.`, count: confirmed, tag: "Locked" }
        ];
    elements.notificationsLaneList.innerHTML = lanes.map((lane) => `
      <div class="mini-item">
        <strong>${lane.title}</strong>
        <p>${lane.body}</p>
        <div class="tag-row"><span class="tag blue">${lane.count} Items</span><span class="tag orange">${lane.tag}</span></div>
      </div>`).join("");
  }

  function renderSnapshot(feed) {
    const delivered = feed.filter((item) => item.notify.delivery === "delivered").length;
    const pending = feed.filter((item) => item.notify.delivery === "pending").length;
    const failed = feed.filter((item) => item.notify.delivery === "failed").length;
    const reminders = feed.reduce((sum, item) => sum + item.notify.reminders, 0);
    const rows = currentStage === "A"
      ? [
          { title: "Manual reminder sends", body: `${reminders} reminder attempts have been logged against manual promise records.` },
          { title: "Pending manual contacts", body: `${pending} records still show pending delivery state because the promise is unresolved.` },
          { title: "Failed contact path", body: `${failed} records need direct President intervention because the message path did not hold.` }
        ]
      : [
          { title: "Delivered confirmation messages", body: `${delivered} customer messages reached the client and are ready for click-through or reply.` },
          { title: "Pending delivery / response", body: `${pending} records have not yet locked the final customer promise.` },
          { title: "Failed confirmation sends", body: `${failed} records need a retry or manual contact before they drift operationally.` }
        ];
    elements.notificationsSnapshotList.innerHTML = rows.map((row) => `
      <div class="mini-item">
        <strong>${row.title}</strong>
        <p>${row.body}</p>
      </div>`).join("");
  }

  function applyAction(type) {
    const state = jobRecords.readState();
    const records = state.records || [];
    const record = records.find((entry) => entry.id === selectedRecordId);
    if (!record) {
      setStatus("Selected record was not found in shared state.", "error");
      return;
    }
    const stageRecord = jobRecords.ensureStageRecord(record, currentStage);
    const notify = ensureDeliveryRecord(record.id);
    const timestamp = jobRecords.buildWorkerTimeLabel();
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];

    if (type === "reminder") {
      notify.reminders += 1;
      notify.delivery = "pending";
      notify.lastMessage = currentStage === "A"
        ? `Manual follow-up reminder sent at ${timestamp} so the President can settle the final promise outside the system.`
        : `Customer confirmation reminder sent at ${timestamp} so the appointment can clear the final lock step.`;
      stageRecord.activity.push({
        time: timestamp,
        title: currentStage === "A" ? "Manual reminder logged" : "Customer confirmation reminder sent",
        text: notify.lastMessage
      });
      saveDeliveryState();
      jobRecords.writeState(records, record.id);
      setStatus("Reminder logged on the shared record.", "success");
      render();
      return;
    }

    if (type === "delivered") {
      notify.delivery = "delivered";
      notify.lastMessage = `Message marked delivered at ${timestamp}.`;
      stageRecord.activity.push({
        time: timestamp,
        title: "Message marked delivered",
        text: `Delivery status was updated to delivered for ${focusLabel(record)}.`
      });
      saveDeliveryState();
      jobRecords.writeState(records, record.id);
      setStatus("Delivery marked as successful.", "success");
      render();
      return;
    }

    if (type === "failed") {
      notify.delivery = "failed";
      notify.lastMessage = `Message failed at ${timestamp} and now needs retry or direct intervention.`;
      stageRecord.activity.push({
        time: timestamp,
        title: "Message delivery failed",
        text: `Delivery failed for ${focusLabel(record)} and should be escalated.`
      });
      saveDeliveryState();
      jobRecords.writeState(records, record.id);
      setStatus("Delivery failure recorded.", "error");
      render();
      return;
    }

    if (type === "confirmed") {
      if (currentStage === "B") {
        const updated = jobRecords.writeCustomerConfirmation({ records, jobId: record.id, stage: currentStage });
        if (!updated) {
          setStatus("Customer confirmation is not available for this record right now.", "error");
          return;
        }
        notify.delivery = "confirmed";
        notify.lastMessage = `Customer confirmed through the message path at ${timestamp}.`;
        saveDeliveryState();
        jobRecords.writeState(records, record.id);
        setStatus("Customer confirmation cleared the final Stage B gate.", "success");
        render();
        return;
      }
      if (currentStage === "A") {
        stageRecord.status = "confirmed";
        notify.delivery = "confirmed";
        notify.lastMessage = `Manual confirmation was recorded at ${timestamp}.`;
        stageRecord.activity.push({
          time: timestamp,
          title: "President recorded manual confirmation",
          text: `The real appointment promise was manually confirmed and stored on the shared Stage ${currentStage} record.`
        });
        saveDeliveryState();
        jobRecords.writeState(records, record.id);
        setStatus("Manual confirmation was recorded on the shared record.", "success");
        render();
        return;
      }
    }
  }

  function focusLabel(record) {
    return jobRecords.formatJobRef(record);
  }

  function render() {
    const feed = getFeedItems();
    const selected = getSelectedItem(feed);
    if (!selected) return;
    selectedRecordId = selected.record.id;
    syncSelectionUrl(selected);
    renderTopline(feed, selected);
    renderSummary(feed);
    renderFeed(feed);
    renderSelected(selected);
    renderLanes(feed);
    renderSnapshot(feed);
  }

  render();
})();
