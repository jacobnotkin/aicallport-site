window.AIABCXJobRecords = window.AIABCXJobRecords || (() => {
  const storageKey = "ai-abcx-job-records-v1";
  const baseRecords = [
        {
          id: "job-240614-001",
          jobNumber: "240614-001",
          routeDate: "2026-04-20",
          customerName: "Maria Lopez",
          customerPhone: "(555) 214-9088",
          appointmentType: "service",
          requestedTime: "June 14, 2026 • 1:30 PM requested",
          confirmedTime: "June 14, 2026 • 2:00 PM confirmed",
          assignedRep: "Sarah Kim",
          amountPaid: 0,
          notes: "Customer called about urgent drain blockage. Wants same-day help if possible. President wants close tracking because this is a repeat household.",
          transcript: "Customer says kitchen drain is backing up again and wants the first available visit. AI agent offered a provisional afternoon window and explained a representative would confirm.",
          recordingField: "REC-240614-001",
          stages: {
            A: {
              status: "awaiting_manual_confirmation",
              outcome: "pending",
              activity: [
                { time: "8:12 AM", title: "AI agent created provisional appointment", text: "Customer accepted a provisional afternoon window and was told a representative would confirm." },
                { time: "8:29 AM", title: "President contacted service representative", text: "Scheduling is still outside the system in Stage A, so the President is collecting availability manually." },
                { time: "9:04 AM", title: "Manual confirmation still pending", text: "The record remains visible to the President while final time is being settled." }
              ]
            },
            B: {
              status: "awaiting_worker_confirmation",
              outcome: "pending",
              activity: [
                { time: "8:12 AM", title: "Provisional appointment created", text: "The AI agent captured the preferred time and opened the job record." },
                { time: "8:13 AM", title: "Engine routed job to service capability", text: "Sarah Kim matched availability and service capability requirements." },
                { time: "8:14 AM", title: "Worker confirmation timer started", text: "Sarah must confirm within the allowed timing window or the job will reroute." }
              ]
            }
          }
        },
        {
          id: "job-240614-002",
          jobNumber: "240614-002",
          routeDate: "2026-04-22",
          customerName: "John Smith",
          customerPhone: "(555) 340-1172",
          appointmentType: "sales_and_service",
          requestedTime: "June 14, 2026 • Morning window requested",
          confirmedTime: "June 14, 2026 • 10:30 AM confirmed",
          assignedRep: "Alex Carter",
          amountPaid: 0,
          notes: "Same-day estimate may convert into on-the-spot work. Keep the record ready for both sales and service outcome logic.",
          transcript: "Customer wants a quote review and says if the price is reasonable, he wants the work handled immediately without a second trip.",
          recordingField: "REC-240614-002",
          stages: {
            A: {
              status: "confirmed",
              outcome: "pending",
              activity: [
                { time: "7:46 AM", title: "Provisional time offered", text: "AI agent captured a morning preference and told the customer that a representative would confirm." },
                { time: "8:21 AM", title: "President updated final confirmed time", text: "Alex agreed to the visit outside the system, and the President locked the record at 10:30 AM." },
                { time: "8:24 AM", title: "President waiting for appointment outcome", text: "The record is ready for estimate, sale, completion, or follow-up entry after the visit." }
              ]
            },
            B: {
              status: "awaiting_customer_confirmation",
              outcome: "pending",
              activity: [
                { time: "7:46 AM", title: "Provisional appointment created", text: "The record opened under combined sales and service capability." },
                { time: "7:47 AM", title: "Alex confirmed availability", text: "The assigned worker accepted within the timing window." },
                { time: "7:48 AM", title: "Customer confirmation SMS sent", text: "The system is waiting for the customer to confirm before the record becomes fully locked." }
              ]
            }
          }
        },
        {
          id: "job-240614-003",
          jobNumber: "240614-003",
          routeDate: "2026-04-22",
          customerName: "Sarah Jones",
          customerPhone: "(555) 887-6401",
          appointmentType: "sales",
          requestedTime: "June 14, 2026 • 4:00 PM requested",
          confirmedTime: "June 14, 2026 • 4:15 PM confirmed",
          assignedRep: "Alex Carter",
          amountPaid: 0,
          notes: "Recovered missed-call lead. President wants visibility because this is useful for outbound recovery reporting.",
          transcript: "Customer missed the first callback, answered on the second attempt, and agreed to a late-afternoon quote walkthrough.",
          recordingField: "REC-240614-003",
          stages: {
            A: {
              status: "follow_up_needed",
              outcome: "follow_up_needed",
              activity: [
                { time: "9:36 AM", title: "Recovered lead entered scheduling record", text: "The missed-call recovery flow created a provisional appointment for President review." },
                { time: "10:02 AM", title: "Visit happened", text: "Representative completed the walkthrough and reported back outside the system." },
                { time: "10:18 AM", title: "President marked follow-up needed", text: "Customer wants one more estimate revision before deciding." }
              ]
            },
            B: {
              status: "rerouted",
              outcome: "follow_up_needed",
              activity: [
                { time: "9:36 AM", title: "Recovered lead opened record", text: "The engine classified the job as sales and created the scheduling record." },
                { time: "9:37 AM", title: "First worker timed out", text: "The original assignee did not confirm in time, so the engine moved the record to rerouted." },
                { time: "9:39 AM", title: "Second worker selected", text: "The next available sales worker is being notified from the same record." }
              ]
            }
          }
        },
        {
          id: "job-240614-004",
          jobNumber: "240614-004",
          routeDate: "2026-04-23",
          customerName: "Michael Turner",
          customerPhone: "(555) 661-2408",
          appointmentType: "sales_and_service",
          requestedTime: "June 14, 2026 • 11:00 AM requested",
          confirmedTime: "June 14, 2026 • 11:30 AM confirmed",
          assignedRep: "Sarah Kim",
          amountPaid: 0,
          notes: "Customer approved work during the estimate visit and asked for immediate same-day completion if possible. Use this record to verify the mixed sales-to-service transition.",
          transcript: "Customer wanted a quote for a failing disposal line, agreed to the estimate, and said the work could be completed immediately if the technician had time and parts available.",
          recordingField: "REC-240614-004",
          stages: {
            A: {
              status: "confirmed",
              outcome: "pending",
              activity: [
                { time: "10:06 AM", title: "Provisional estimate window offered", text: "AI agent collected a late-morning preference and explained that a representative would confirm the final slot." },
                { time: "10:31 AM", title: "President locked the confirmed visit time", text: "The President aligned the mixed visit for 11:30 AM and kept the record ready for both estimate and same-day work logic." },
                { time: "10:37 AM", title: "President waiting for conversion outcome", text: "The record is ready to show whether the estimate converts into immediate work or needs follow-up." }
              ]
            },
            B: {
              status: "in_progress",
              outcome: "pending",
              activity: [
                { time: "10:06 AM", title: "Provisional mixed appointment created", text: "The AI agent opened the record under combined sales and service capability." },
                { time: "10:08 AM", title: "Worker and customer confirmation completed", text: "The record cleared both confirmation gates and locked the appointment." },
                { time: "11:34 AM", title: "Estimate converted into live service work", text: "The representative began same-day execution from the same shared record after the customer approved the work." }
              ]
            }
          }
        },
        {
          id: "job-240614-005",
          jobNumber: "240614-005",
          routeDate: "2026-04-24",
          customerName: "Daniel Reed",
          customerPhone: "(555) 472-1180",
          appointmentType: "sales_and_service",
          requestedTime: "June 14, 2026 • 2:30 PM requested",
          confirmedTime: "June 14, 2026 • 3:00 PM confirmed",
          assignedRep: "Sarah Kim",
          amountPaid: 1840,
          notes: "Customer approved same-day repair during the estimate visit and paid immediately after completion. Use this record to verify the mixed flow closing into CEO review.",
          transcript: "Customer asked for an estimate on a leaking branch line, approved the work after the quote, and authorized immediate completion if the technician could finish the repair that afternoon.",
          recordingField: "REC-240614-005",
          stages: {
            A: {
              status: "completed",
              outcome: "sold_and_completed",
              activity: [
                { time: "1:52 PM", title: "Provisional mixed appointment captured", text: "AI agent collected the afternoon preference and explained that a representative would confirm the final time." },
                { time: "2:21 PM", title: "President locked the confirmed visit", text: "The President confirmed the 3:00 PM arrival window and kept the record ready for estimate-to-work conversion." },
                { time: "5:08 PM", title: "President recorded same-day completion", text: "The estimate converted into completed work, and the final payment was entered into the shared record." }
              ]
            },
            B: {
              status: "completed",
              outcome: "sold_and_completed",
              activity: [
                { time: "1:52 PM", title: "Provisional mixed appointment created", text: "The AI agent opened the record under combined sales and service capability." },
                { time: "2:03 PM", title: "Sales conversion completed", text: "The customer approved the estimate and the same shared record moved directly into execution." },
                { time: "4:46 PM", title: "Service work completed and paid", text: "The technician closed the job, and payment truth was captured on the same record for executive review." }
              ]
            }
          }
        },
        {
          id: "job-240614-006",
          jobNumber: "240614-006",
          routeDate: "2026-04-25",
          customerName: "Olivia Bennett",
          customerPhone: "(555) 318-7740",
          appointmentType: "sales_and_service",
          requestedTime: "June 15, 2026 • 9:00 AM requested",
          confirmedTime: "June 15, 2026 • 9:30 AM confirmed",
          assignedRep: "Alex Carter",
          amountPaid: 0,
          notes: "Customer paused the repair after the estimate and canceled the path later that day. Use this record to test canceled closeout language and executive review.",
          transcript: "Customer asked for an urgent quote, wanted same-day repair if the number worked, but later said the budget was not available and asked to stop the job.",
          recordingField: "REC-240615-006",
          stages: {
            A: {
              status: "canceled",
              outcome: "canceled",
              activity: [
                { time: "8:04 AM", title: "AI agent captured a mixed appointment request", text: "Customer accepted a provisional morning window and was told a representative would confirm the visit." },
                { time: "8:41 AM", title: "President locked the final confirmed time", text: "The mixed sales-and-service visit was confirmed for 9:30 AM and kept visible for same-day conversion if approved." },
                { time: "11:26 AM", title: "President marked the record canceled", text: "Customer declined to proceed after the quote review, so the business path was closed without collected revenue." }
              ]
            },
            B: {
              status: "canceled",
              outcome: "canceled",
              activity: [
                { time: "8:04 AM", title: "Provisional mixed appointment created", text: "The AI agent opened the record under combined sales and service capability." },
                { time: "8:12 AM", title: "Worker and customer confirmation completed", text: "The record cleared both automated commitment gates and locked the appointment." },
                { time: "11:09 AM", title: "Canceled after estimate review", text: "The customer declined the work, and the shared record was closed as canceled for executive visibility." }
              ]
            }
          }
        },
        {
          id: "job-240614-007",
          jobNumber: "240614-007",
          routeDate: "2026-04-25",
          customerName: "Kevin Patel",
          customerPhone: "(555) 742-6613",
          appointmentType: "service",
          requestedTime: "June 15, 2026 • 12:30 PM requested",
          confirmedTime: "June 15, 2026 • 1:00 PM confirmed",
          assignedRep: "Sarah Kim",
          amountPaid: 0,
          notes: "Customer stopped responding and did not show for the scheduled service window. Use this record to test no-show handling and scheduling-risk review.",
          transcript: "Customer reported a leaking disposal connection, accepted an early-afternoon appointment, and was told the final time would be confirmed.",
          recordingField: "REC-240615-007",
          stages: {
            A: {
              status: "no_show",
              outcome: "no_show",
              activity: [
                { time: "10:12 AM", title: "AI agent created the service appointment request", text: "Customer accepted a provisional afternoon window and expected final confirmation from a representative." },
                { time: "10:48 AM", title: "President confirmed the service visit", text: "The final 1:00 PM arrival time was recorded outside the system and held for the technician." },
                { time: "1:42 PM", title: "President marked customer no-show", text: "The representative arrived and waited, but the customer did not answer or grant access to complete the visit." }
              ]
            },
            B: {
              status: "no_show",
              outcome: "no_show",
              activity: [
                { time: "10:12 AM", title: "Provisional service appointment created", text: "The AI agent opened the service record and routed it through the scheduling engine." },
                { time: "10:18 AM", title: "Worker and customer confirmation completed", text: "The appointment was locked after both automated confirmation gates cleared." },
                { time: "1:38 PM", title: "Customer did not hold the appointment", text: "The technician reported a no-show, so the shared record moved into scheduling-risk review." }
              ]
            }
          }
        }
      ];

  const routeDateDefaults = {
    "job-240614-001": "2026-04-20",
    "job-240614-002": "2026-04-22",
    "job-240614-003": "2026-04-22",
    "job-240614-004": "2026-04-23",
    "job-240614-005": "2026-04-24",
    "job-240614-006": "2026-04-25",
    "job-240614-007": "2026-04-25"
  };

  function cloneRecord(record) {
    return JSON.parse(JSON.stringify(record));
  }

  function normalizeRecord(record) {
    const next = cloneRecord(record);
    if (next && !next.routeDate && next.id && routeDateDefaults[next.id]) {
      next.routeDate = routeDateDefaults[next.id];
    }
    return next;
  }

  function getBaseRecords() {
    return baseRecords.map(normalizeRecord);
  }

  function readState(fallbackRecords = []) {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (!parsed || !Array.isArray(parsed.records)) {
        return {
          records: fallbackRecords.map(normalizeRecord),
          selectedRecordId: fallbackRecords[0] ? fallbackRecords[0].id : null
        };
      }
      const normalizedParsedRecords = parsed.records.map(normalizeRecord);
      const mergedRecords = normalizedParsedRecords.slice();
      let merged = false;
      fallbackRecords.map(normalizeRecord).forEach((fallbackRecord) => {
        if (!mergedRecords.some((record) => record.id === fallbackRecord.id)) {
          mergedRecords.push(fallbackRecord);
          merged = true;
        }
      });
      if (merged) {
        writeState(mergedRecords, parsed.selectedRecordId || (fallbackRecords[0] ? fallbackRecords[0].id : null));
      }
      return {
        records: mergedRecords,
        selectedRecordId: parsed.selectedRecordId || (fallbackRecords[0] ? fallbackRecords[0].id : null)
      };
    } catch (error) {
      return {
        records: fallbackRecords.map(normalizeRecord),
        selectedRecordId: fallbackRecords[0] ? fallbackRecords[0].id : null
      };
    }
  }

  function writeState(records, selectedRecordId) {
    localStorage.setItem(storageKey, JSON.stringify({
      records,
      selectedRecordId: selectedRecordId || (records[0] ? records[0].id : null)
    }));
  }

  function findRecordById(records, recordId) {
    return Array.isArray(records) ? records.find((record) => record.id === recordId) || null : null;
  }

  function deriveDefaultFollowUpReason(record) {
    const type = record && record.appointmentType ? record.appointmentType : "service";
    if (type === "sales") return "estimate_revision";
    if (type === "sales_and_service") return "same_day_conversion_pending";
    return "return_visit_required";
  }

  function ensureStageRecord(record, stage) {
    if (!record.stages) record.stages = {};
    if (!record.stages[stage]) {
      record.stages[stage] = {
        status: stage === "A" ? "provisional" : "awaiting_worker_assignment",
        outcome: "pending",
        activity: []
      };
    }
    if (record.stages[stage].status === "follow_up_needed" && !record.stages[stage].followUpReason) {
      record.stages[stage].followUpReason = deriveDefaultFollowUpReason(record);
    }
    return record.stages[stage];
  }

  function titleWords(value) {
    return String(value || "")
      .split("_")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function getOutcomeLabel(value) {
    const labels = {
      pending: "Outcome Pending",
      estimate_given: "Estimate Given",
      sold_not_completed: "Sold Not Completed",
      sold_and_completed: "Sold And Completed",
      service_completed: "Service Completed",
      follow_up_needed: "Follow-Up Needed",
      not_sold: "Not Sold",
      rescheduled: "Rescheduled",
      canceled: "Canceled",
      no_show: "No Show"
    };
    return labels[value] || titleWords(value);
  }

  function getAppointmentTypeLabel(value) {
    const labels = {
      sales: "Sales",
      service: "Service",
      sales_and_service: "Sales And Service"
    };
    return labels[value] || "General";
  }

  function getFollowUpReasonLabel(value) {
    const labels = {
      estimate_revision: "Estimate Revision",
      customer_decision_pending: "Customer Decision Pending",
      outbound_recovery: "Outbound Recovery Needed",
      return_visit_required: "Return Visit Required",
      parts_hold: "Parts Hold",
      service_completion_pending: "Service Completion Pending",
      same_day_conversion_pending: "Same-Day Conversion Pending",
      approved_schedule_hold: "Approved But Schedule Hold",
      estimate_revision_then_return_visit: "Estimate Revision Then Return Visit"
    };
    return labels[value] || "";
  }

  function canWorkerEnterOutcome(stageRecord) {
    const status = stageRecord && stageRecord.status;
    return [
      "confirmed",
      "in_progress",
      "completed",
      "follow_up_needed",
      "rescheduled",
      "canceled",
      "no_show"
    ].includes(status);
  }

  function canWorkerConfirm(stageRecord) {
    return Boolean(stageRecord && stageRecord.status === "awaiting_worker_confirmation");
  }

  function canCustomerConfirm(stageRecord) {
    return Boolean(stageRecord && stageRecord.status === "awaiting_customer_confirmation");
  }

  function canWorkerReroute(stageRecord) {
    return Boolean(stageRecord && stageRecord.status === "awaiting_worker_confirmation");
  }

  function getWorkerOutcomeGateMessage(stageRecord) {
    const status = stageRecord && stageRecord.status;
    const labels = {
      provisional: "Outcome entry stays locked until the job moves past provisional intake.",
      awaiting_worker_assignment: "Outcome entry stays locked until the scheduling engine assigns the job.",
      awaiting_worker_confirmation: "Outcome entry stays locked until the assigned worker confirms the job.",
      awaiting_customer_confirmation: "Outcome entry stays locked until the customer confirms the appointment.",
      rerouted: "Outcome entry stays locked while the job is being rerouted to another worker."
    };
    return labels[status] || "";
  }

  function formatJobRef(record) {
    return `Job #${record.jobNumber || String(record.id || "").replace("job-", "")}`;
  }

  function buildJobFocus(record, stage) {
    if (!record) return null;
    const stageRecord = ensureStageRecord(record, stage);
    const activityTimeline = Array.isArray(stageRecord.activity)
      ? stageRecord.activity.slice(-3)
      : [];
    const latestActivity = Array.isArray(stageRecord.activity) && stageRecord.activity.length
      ? stageRecord.activity[stageRecord.activity.length - 1]
      : null;
    const appointmentLabel = getAppointmentTypeLabel(record.appointmentType);
    const assignedRep = record.assignedRep || "Unassigned";
    const confirmedTime = record.confirmedTime || record.requestedTime || "Time pending";
    const activityText = latestActivity
      ? `${latestActivity.title}. ${latestActivity.text}`
      : `${appointmentLabel} record is open with ${assignedRep}.`;

    return {
      id: record.id,
      label: formatJobRef(record),
      customer: record.customerName || "Customer",
      appointmentType: appointmentLabel,
      assignedRep,
      statusValue: stageRecord.status || "provisional",
      statusLabel: titleWords(stageRecord.status),
      outcomeLabel: getOutcomeLabel(stageRecord.outcome),
      followUpReason: stageRecord.followUpReason || "",
      followUpReasonLabel: getFollowUpReasonLabel(stageRecord.followUpReason || ""),
      confirmedTime,
      routeDate: record.routeDate || "",
      requestedTime: record.requestedTime || "",
      amountPaid: Number(record.amountPaid || 0),
      latestActivity,
      activityTimeline,
      summary: `${appointmentLabel} workflow. ${titleWords(stageRecord.status)}. ${activityText}`
    };
  }

  function buildWorkerTimeLabel() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function deriveWorkerStageStatus(role, outcomeValue) {
    const salesMap = {
      estimate_given: "completed",
      sold_not_completed: "completed",
      sold_and_completed: "completed",
      follow_up_needed: "follow_up_needed",
      not_sold: "completed",
      rescheduled: "follow_up_needed",
      no_show: "no_show"
    };
    const serviceMap = {
      service_completed: "completed",
      sold_and_completed: "completed",
      follow_up_needed: "follow_up_needed",
      rescheduled: "follow_up_needed",
      canceled: "canceled",
      no_show: "no_show"
    };
    const map = role === "service" ? serviceMap : salesMap;
    return map[outcomeValue] || "completed";
  }

  function writeWorkerOutcome(options) {
    const {
      records,
      jobId,
      stage,
      outcomeValue,
      workerLabel,
      workerRole
    } = options || {};
    if (!Array.isArray(records) || !jobId || !stage || !outcomeValue || !workerLabel || !workerRole) {
      return false;
    }
    const record = findRecordById(records, jobId);
    if (!record) return false;
    const stageRecord = ensureStageRecord(record, stage);
    if (!canWorkerEnterOutcome(stageRecord)) return false;
    stageRecord.outcome = outcomeValue;
    stageRecord.status = deriveWorkerStageStatus(workerRole, outcomeValue);
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];
    stageRecord.activity.push({
      time: buildWorkerTimeLabel(),
      title: `${titleWords(workerRole)} result updated to ${titleWords(outcomeValue)}`,
      text: `${workerLabel} selected ${titleWords(outcomeValue)} for ${formatJobRef(record)} on the shared Stage ${stage} record.`
    });
    return true;
  }

  function writeWorkerConfirmation(options) {
    const {
      records,
      jobId,
      stage,
      workerLabel,
      workerRole
    } = options || {};
    if (!Array.isArray(records) || !jobId || !stage || !workerLabel || !workerRole) {
      return false;
    }
    const record = findRecordById(records, jobId);
    if (!record) return false;
    const stageRecord = ensureStageRecord(record, stage);
    if (!canWorkerConfirm(stageRecord)) return false;
    stageRecord.status = "awaiting_customer_confirmation";
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];
    stageRecord.activity.push({
      time: buildWorkerTimeLabel(),
      title: `${titleWords(workerRole)} worker confirmed availability`,
      text: `${workerLabel} confirmed ${formatJobRef(record)}. The system can now request customer confirmation on the shared Stage ${stage} record.`
    });
    return true;
  }

  function writeCustomerConfirmation(options) {
    const {
      records,
      jobId,
      stage
    } = options || {};
    if (!Array.isArray(records) || !jobId || !stage) {
      return false;
    }
    const record = findRecordById(records, jobId);
    if (!record) return false;
    const stageRecord = ensureStageRecord(record, stage);
    if (!canCustomerConfirm(stageRecord)) return false;
    stageRecord.status = "confirmed";
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];
    stageRecord.activity.push({
      time: buildWorkerTimeLabel(),
      title: "Customer confirmed appointment",
      text: `The customer confirmed ${formatJobRef(record)} through the AI-ABCX confirmation step. The appointment is now fully locked on the shared Stage ${stage} record.`
    });
    return true;
  }

  function writeWorkerReroute(options) {
    const {
      records,
      jobId,
      stage,
      workerLabel,
      workerRole
    } = options || {};
    if (!Array.isArray(records) || !jobId || !stage || !workerLabel || !workerRole) {
      return false;
    }
    const record = findRecordById(records, jobId);
    if (!record) return false;
    const stageRecord = ensureStageRecord(record, stage);
    if (!canWorkerReroute(stageRecord)) return false;
    stageRecord.status = "rerouted";
    if (!Array.isArray(stageRecord.activity)) stageRecord.activity = [];
    stageRecord.activity.push({
      time: buildWorkerTimeLabel(),
      title: `${titleWords(workerRole)} worker missed confirmation window`,
      text: `${workerLabel} did not confirm ${formatJobRef(record)} in time. AI-ABCX moved the shared Stage ${stage} record into reroute handling for the next available worker.`
    });
    return true;
  }

  function buildWorkerJobContext(options) {
    const {
      record,
      stage,
      role,
      dashboardTitle,
      ownerLabel,
      defaultOutcome
    } = options || {};
    if (!record || !stage || !role) return null;
    const stageRecord = ensureStageRecord(record, stage);
    const latestActivity = Array.isArray(stageRecord.activity) && stageRecord.activity.length
      ? stageRecord.activity[stageRecord.activity.length - 1]
      : null;
    const jobRef = formatJobRef(record);
    const statusLabel = titleWords(stageRecord.status || "confirmed");
    const outcomeValue = stageRecord.outcome || defaultOutcome || "pending";
    const outcomeLabel = getOutcomeLabel(outcomeValue);
    const canEnterOutcome = canWorkerEnterOutcome(stageRecord);
    const outcomeGateMessage = getWorkerOutcomeGateMessage(stageRecord);
    const customer = record.customerName || "Customer";
    const timeLabel = record.confirmedTime || record.requestedTime || "Time pending";
    const repLabel = record.assignedRep || (role === "service" ? "Assigned worker pending" : "Assigned rep pending");
    const primaryBadge = stageRecord.status === "rerouted"
      ? (role === "service" ? "Rerouted" : "Rerouted Lead")
      : stageRecord.status === "awaiting_worker_confirmation"
        ? "Awaiting Confirm"
        : statusLabel;

    return {
      jobRef,
      statusValue: stageRecord.status,
      statusLabel,
      outcomeValue,
      outcomeLabel,
      customer,
      timeLabel,
      repLabel,
      primaryBadge,
      latestActivity,
      canEnterOutcome,
      outcomeGateMessage,
      appointmentLabel: getAppointmentTypeLabel(record.appointmentType),
      appointmentDisplay: titleWords(record.appointmentType).replace("And", "&"),
      title: dashboardTitle || "",
      sub: `AI-ABCX Stage ${stage} is showing the live shared record for ${customer}. ${statusLabel} status remains attached to ${jobRef}, with ${repLabel} as the current ${ownerLabel || role} owner.`
    };
  }

  return {
    storageKey,
    cloneRecord,
    getBaseRecords,
    readState,
    writeState,
    findRecordById,
    ensureStageRecord,
    titleWords,
    getOutcomeLabel,
    getAppointmentTypeLabel,
    canWorkerEnterOutcome,
    canWorkerConfirm,
    canCustomerConfirm,
    canWorkerReroute,
    getWorkerOutcomeGateMessage,
    formatJobRef,
    buildJobFocus,
    buildWorkerTimeLabel,
    deriveWorkerStageStatus,
    writeWorkerConfirmation,
    writeCustomerConfirmation,
    writeWorkerReroute,
    writeWorkerOutcome,
    buildWorkerJobContext
  };
})();
