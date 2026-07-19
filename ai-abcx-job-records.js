window.AIABCXJobRecords = window.AIABCXJobRecords || (() => {
  const storageKey = "ai-abcx-job-records-v1";
  const JOB_RECORDS_SCHEMA_VERSION = 2;
  const ESTIMATOR_SCHEMA_VERSION = 3;
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

  const ESTIMATOR_LEVELS = ["A", "B", "C"];
  const ESTIMATOR_STATUSES = [
    "new_request",
    "estimate_preparing",
    "estimate_ready_to_preview",
    "estimate_previewed",
    "estimate_ready_to_send",
    "estimate_sent",
    "waiting_on_customer",
    "revision_requested",
    "accepted",
    "declined",
    "follow_up_needed",
    "scheduled_after_acceptance",
    "lost"
  ];
  const ESTIMATE_TYPES = ["standard", "options", "package", "quick"];
  const ESTIMATE_SOURCES = ["website", "call_agent", "advertising", "manual", "repeat_customer", "service", "unknown"];
  const ESTIMATOR_TRANSITIONS = {
    new_request: ["estimate_preparing", "follow_up_needed", "lost"],
    estimate_preparing: ["estimate_ready_to_preview", "follow_up_needed", "lost"],
    estimate_ready_to_preview: ["estimate_previewed", "estimate_preparing", "follow_up_needed", "lost"],
    estimate_previewed: ["estimate_ready_to_send", "estimate_preparing", "follow_up_needed", "lost"],
    estimate_ready_to_send: ["estimate_sent", "estimate_preparing", "lost"],
    estimate_sent: ["waiting_on_customer", "accepted", "declined", "revision_requested", "follow_up_needed"],
    waiting_on_customer: ["accepted", "declined", "revision_requested", "follow_up_needed", "lost"],
    revision_requested: ["estimate_preparing", "estimate_ready_to_send", "follow_up_needed", "lost"],
    accepted: ["scheduled_after_acceptance", "follow_up_needed"],
    declined: ["follow_up_needed", "lost"],
    follow_up_needed: ["estimate_preparing", "estimate_ready_to_send", "accepted", "declined", "lost"],
    scheduled_after_acceptance: ["follow_up_needed"],
    lost: ["follow_up_needed"]
  };

  function cloneRecord(record) {
    return JSON.parse(JSON.stringify(record));
  }

  function cloneEstimatorQuoteSnapshot(estimator) {
    return cloneRecord({
      estimateType: estimator.estimateType,
      quote: estimator.quote
    });
  }

  function normalizeEstimatorRevision(revision, index) {
    const existing = revision && typeof revision === "object" ? revision : {};
    return {
      id: existing.id || `revision-${index + 1}`,
      requestedAt: existing.requestedAt || "",
      requestedBy: existing.requestedBy || "Customer",
      reason: existing.reason || "Customer requested an estimate revision.",
      status: existing.status || "requested",
      requestedQuoteVersion: Math.max(1, Number(existing.requestedQuoteVersion || 1)),
      originalQuote: existing.originalQuote ? cloneRecord(existing.originalQuote) : null,
      reopenedAt: existing.reopenedAt || "",
      reopenedBy: existing.reopenedBy || "",
      revisedQuoteVersion: Math.max(0, Number(existing.revisedQuoteVersion || 0)),
      revisedQuote: existing.revisedQuote ? cloneRecord(existing.revisedQuote) : null,
      resentAt: existing.resentAt || "",
      acceptedAt: existing.acceptedAt || "",
      acceptedTotal: Math.max(0, Number(existing.acceptedTotal || 0)),
      selectedOptionId: existing.selectedOptionId || ""
    };
  }

  function normalizeEstimatorLevel(value) {
    const normalized = String(value || "A").toUpperCase();
    return ESTIMATOR_LEVELS.includes(normalized) ? normalized : "A";
  }

  function inferEstimatorSource(record) {
    const text = `${record && record.notes ? record.notes : ""} ${record && record.transcript ? record.transcript : ""}`.toLowerCase();
    if (/repeat|returning customer|existing customer/.test(text)) return "repeat_customer";
    if (/website|web form|online request/.test(text)) return "website";
    if (/advert|campaign|google|facebook|instagram/.test(text)) return "advertising";
    if (/call|phone|missed-call|ai agent/.test(text)) return "call_agent";
    if (record && record.appointmentType === "service") return "service";
    if (record) return "manual";
    return "unknown";
  }

  function inferEstimateType(record) {
    const text = `${record && record.notes ? record.notes : ""} ${record && record.transcript ? record.transcript : ""}`.toLowerCase();
    if (/package|tier|gold|silver|bronze/.test(text)) return "package";
    if (/option|choose|select|add-on|menu/.test(text)) return "options";
    if (/quick|fast|same call|rough number/.test(text)) return "quick";
    return "standard";
  }

  function deriveLegacyEstimatorStatus(record) {
    const stages = record && record.stages ? record.stages : {};
    const stageRecord = stages.C || stages.B || stages.A || {};
    const status = stageRecord.status || "";
    const outcome = stageRecord.outcome || "";
    if (["sold_and_completed", "sold_not_completed"].includes(outcome)) return "accepted";
    if (["not_sold", "canceled"].includes(outcome)) return "declined";
    if (status === "follow_up_needed" && stageRecord.followUpReason === "estimate_revision") return "revision_requested";
    if (status === "follow_up_needed") return "follow_up_needed";
    if (["completed", "confirmed", "in_progress"].includes(status)) return "estimate_preparing";
    if (["awaiting_customer_confirmation"].includes(status)) return "waiting_on_customer";
    if (["awaiting_worker_confirmation", "awaiting_manual_confirmation", "awaiting_worker_assignment", "rerouted", "rescheduled"].includes(status)) return "new_request";
    if (["canceled", "no_show"].includes(status)) return "lost";
    return "new_request";
  }

  function migrateEstimatorData(value) {
    const existing = value && typeof value === "object" ? cloneRecord(value) : {};
    const sourceVersion = Math.max(1, Number(existing.schemaVersion || 1));
    if (sourceVersion < 2) {
      const scheduling = existing.handoff && existing.handoff.scheduling;
      existing.followUp = existing.followUp && typeof existing.followUp === "object" ? existing.followUp : {};
      existing.followUp.attempts = Array.isArray(existing.followUp.attempts) ? existing.followUp.attempts : [];
      existing.followUp.completedAt = existing.followUp.completedAt || "";
      existing.followUp.resolution = existing.followUp.resolution || "";
      existing.handoff = existing.handoff && typeof existing.handoff === "object" ? existing.handoff : {};
      existing.handoff.scheduling = scheduling && typeof scheduling === "object"
        ? scheduling
        : { status: scheduling && scheduling !== "not_requested" ? scheduling : "not_requested", scheduledDate: "", scheduledTime: "", assignedTo: "", notes: "", requestedAt: "" };
    }
    existing.schemaVersion = ESTIMATOR_SCHEMA_VERSION;
    return existing;
  }

  function ensureEstimatorRecord(record) {
    if (!record) return null;
    const existing = migrateEstimatorData(record.estimator);
    const initialStatus = ESTIMATOR_STATUSES.includes(existing.status)
      ? existing.status
      : deriveLegacyEstimatorStatus(record);
    record.estimator = {
      schemaVersion: ESTIMATOR_SCHEMA_VERSION,
      level: normalizeEstimatorLevel(existing.level),
      status: initialStatus,
      source: ESTIMATE_SOURCES.includes(existing.source) ? existing.source : inferEstimatorSource(record),
      estimateType: ESTIMATE_TYPES.includes(existing.estimateType) ? existing.estimateType : inferEstimateType(record),
      owner: {
        userId: existing.owner && existing.owner.userId ? existing.owner.userId : "",
        label: existing.owner && existing.owner.label ? existing.owner.label : (record.assignedRep || "President"),
        assignedBy: existing.owner && existing.owner.assignedBy ? existing.owner.assignedBy : "President"
      },
      quote: {
        version: Math.max(1, Number(existing.quote && existing.quote.version || 1)),
        currency: existing.quote && existing.quote.currency ? existing.quote.currency : "USD",
        customerScope: existing.quote && existing.quote.customerScope ? existing.quote.customerScope : "",
        internalNotes: existing.quote && existing.quote.internalNotes ? existing.quote.internalNotes : "",
        lineItems: existing.quote && Array.isArray(existing.quote.lineItems) ? existing.quote.lineItems : [],
        subtotal: Number(existing.quote && existing.quote.subtotal || 0),
        discountAmount: Number(existing.quote && existing.quote.discountAmount || 0),
        taxRate: Number(existing.quote && existing.quote.taxRate || 0),
        taxAmount: Number(existing.quote && existing.quote.taxAmount || 0),
        total: Number(existing.quote && existing.quote.total || 0),
        attachments: existing.quote && Array.isArray(existing.quote.attachments) ? existing.quote.attachments : []
      },
      preview: {
        quoteVersion: Number(existing.preview && existing.preview.quoteVersion || 0),
        previewedAt: existing.preview && existing.preview.previewedAt ? existing.preview.previewedAt : "",
        previewedBy: existing.preview && existing.preview.previewedBy ? existing.preview.previewedBy : "",
        snapshot: existing.preview && existing.preview.snapshot ? existing.preview.snapshot : null
      },
      delivery: {
        method: existing.delivery && existing.delivery.method ? existing.delivery.method : "",
        sentAt: existing.delivery && existing.delivery.sentAt ? existing.delivery.sentAt : "",
        openedAt: existing.delivery && existing.delivery.openedAt ? existing.delivery.openedAt : ""
      },
      decision: {
        value: existing.decision && existing.decision.value ? existing.decision.value : "pending",
        decidedAt: existing.decision && existing.decision.decidedAt ? existing.decision.decidedAt : "",
        selectedOptionId: existing.decision && existing.decision.selectedOptionId ? existing.decision.selectedOptionId : ""
      },
      revisions: Array.isArray(existing.revisions) ? existing.revisions.map(normalizeEstimatorRevision) : [],
      followUp: {
        reason: existing.followUp && existing.followUp.reason ? existing.followUp.reason : "",
        owner: existing.followUp && existing.followUp.owner ? existing.followUp.owner : "",
        nextAction: existing.followUp && existing.followUp.nextAction ? existing.followUp.nextAction : "",
        dueAt: existing.followUp && existing.followUp.dueAt ? existing.followUp.dueAt : "",
        attempts: existing.followUp && Array.isArray(existing.followUp.attempts) ? existing.followUp.attempts : [],
        completedAt: existing.followUp && existing.followUp.completedAt ? existing.followUp.completedAt : "",
        resolution: existing.followUp && existing.followUp.resolution ? existing.followUp.resolution : ""
      },
      handoff: {
        sales: existing.handoff && existing.handoff.sales ? existing.handoff.sales : "not_requested",
        service: existing.handoff && existing.handoff.service ? existing.handoff.service : "not_requested",
        scheduling: existing.handoff && existing.handoff.scheduling && typeof existing.handoff.scheduling === "object"
          ? existing.handoff.scheduling
          : {
              status: existing.handoff && existing.handoff.scheduling && existing.handoff.scheduling !== "not_requested" ? existing.handoff.scheduling : "not_requested",
              scheduledDate: "",
              scheduledTime: "",
              assignedTo: "",
              notes: "",
              requestedAt: ""
            }
      },
      activity: Array.isArray(existing.activity) ? existing.activity : []
    };
    return record.estimator;
  }

  function canTransitionEstimator(record, nextStatus) {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || !ESTIMATOR_STATUSES.includes(nextStatus)) return false;
    if (estimator.status === nextStatus) return true;
    return (ESTIMATOR_TRANSITIONS[estimator.status] || []).includes(nextStatus);
  }

  function transitionEstimator(record, nextStatus, activity = {}) {
    if (!canTransitionEstimator(record, nextStatus)) return false;
    const estimator = ensureEstimatorRecord(record);
    if (!estimator) return false;
    const previousStatus = estimator.status;
    estimator.status = nextStatus;
    estimator.activity.push({
      time: activity.time || new Date().toISOString(),
      title: activity.title || `Estimate moved to ${titleWords(nextStatus)}`,
      text: activity.text || `${formatJobRef(record)} moved from ${titleWords(previousStatus)} to ${titleWords(nextStatus)}.`,
      actor: activity.actor || "President"
    });
    return true;
  }

  function getEstimatorCapabilities(level) {
    const normalizedLevel = normalizeEstimatorLevel(level);
    return {
      level: normalizedLevel,
      estimateTypes: normalizedLevel === "A"
        ? ["standard"]
        : normalizedLevel === "B"
          ? ["standard", "options"]
          : ESTIMATE_TYPES.slice(),
      automatedDelivery: normalizedLevel !== "A",
      revisionWorkflow: true,
      automatedFollowUp: normalizedLevel === "C",
      performanceIntelligence: normalizedLevel === "C"
    };
  }

  function assignEstimatorOwner(record, owner = {}, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || !owner.label) return false;
    estimator.owner = {
      userId: owner.userId || "",
      label: owner.label,
      assignedBy: actor
    };
    estimator.activity.push({
      time: new Date().toISOString(),
      title: `Estimate assigned to ${owner.label}`,
      text: `${formatJobRef(record)} estimator ownership was assigned by ${actor}.`,
      actor
    });
    return true;
  }

  function getEstimatorQuoteSubtotal(estimateType, lineItems) {
    const totals = lineItems.map((item) => item.quantity * item.unitPrice);
    if (estimateType === "options") {
      return totals.length ? Math.min(...totals) : 0;
    }
    return totals.reduce((sum, total) => sum + total, 0);
  }

  function applyEstimatorQuoteTotals(estimator, subtotal) {
    const safeSubtotal = Math.max(0, Number(subtotal || 0));
    const discountAmount = Math.min(safeSubtotal, Math.max(0, Number(estimator.quote.discountAmount || 0)));
    const taxRate = Math.min(100, Math.max(0, Number(estimator.quote.taxRate || 0)));
    const taxableAmount = Math.max(0, safeSubtotal - discountAmount);
    const taxAmount = taxableAmount * (taxRate / 100);
    estimator.quote.subtotal = safeSubtotal;
    estimator.quote.discountAmount = discountAmount;
    estimator.quote.taxRate = taxRate;
    estimator.quote.taxAmount = taxAmount;
    estimator.quote.total = taxableAmount + taxAmount;
  }

  function updateEstimatorQuote(record, quote = {}, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator) return false;
    if (!["new_request", "estimate_preparing", "follow_up_needed"].includes(estimator.status)) return false;
    const estimateType = ESTIMATE_TYPES.includes(quote.estimateType) ? quote.estimateType : estimator.estimateType;
    const capabilities = getEstimatorCapabilities(estimator.level);
    if (!capabilities.estimateTypes.includes(estimateType)) return false;
    const lineItems = Array.isArray(quote.lineItems)
      ? quote.lineItems.map((item, index) => ({
          id: item.id || `line-${index + 1}`,
          label: String(item.label || `Line item ${index + 1}`),
          description: String(item.description || ""),
          quantity: Math.max(0, Number(item.quantity === undefined ? 1 : item.quantity)),
          unitPrice: Math.max(0, Number(item.unitPrice === undefined ? item.amount || 0 : item.unitPrice)),
          optionId: String(item.optionId || "")
        }))
      : estimator.quote.lineItems;
    const subtotal = getEstimatorQuoteSubtotal(estimateType, lineItems);
    const discountAmount = Math.min(subtotal, Math.max(0, Number(quote.discountAmount === undefined ? estimator.quote.discountAmount : quote.discountAmount)));
    const taxRate = Math.min(100, Math.max(0, Number(quote.taxRate === undefined ? estimator.quote.taxRate : quote.taxRate)));
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = taxableAmount * (taxRate / 100);
    estimator.estimateType = estimateType;
    estimator.quote = {
      version: Math.max(1, Number(estimator.quote.version || 1) + 1),
      currency: quote.currency || estimator.quote.currency || "USD",
      customerScope: quote.customerScope === undefined ? estimator.quote.customerScope : String(quote.customerScope || ""),
      internalNotes: quote.internalNotes === undefined ? estimator.quote.internalNotes : String(quote.internalNotes || ""),
      lineItems,
      subtotal,
      discountAmount,
      taxRate,
      taxAmount,
      total: taxableAmount + taxAmount,
      attachments: Array.isArray(quote.attachments)
        ? quote.attachments.map((attachment, index) => ({
            id: attachment.id || `attachment-${index + 1}`,
            label: String(attachment.label || attachment.name || `Attachment ${index + 1}`),
            url: String(attachment.url || "")
          }))
        : estimator.quote.attachments
    };
    if (["new_request", "follow_up_needed"].includes(estimator.status)) {
      transitionEstimator(record, "estimate_preparing", {
        actor,
        title: "Estimate preparation started",
        text: `${actor} opened ${formatJobRef(record)} as a ${titleWords(estimateType)} estimate.`
      });
    }
    const current = ensureEstimatorRecord(record);
    const activeRevision = current.revisions[current.revisions.length - 1];
    if (activeRevision && activeRevision.status === "drafting") {
      activeRevision.revisedQuoteVersion = current.quote.version;
    }
    current.activity.push({
      time: new Date().toISOString(),
      title: `${titleWords(estimateType)} estimate updated`,
      text: `${actor} saved ${lineItems.length} line item${lineItems.length === 1 ? "" : "s"} totaling ${current.quote.currency} ${current.quote.total.toFixed(2)}.`,
      actor
    });
    return true;
  }

  function validateEstimatorQuote(record) {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator) return ["Estimate record is unavailable."];
    const errors = [];
    if (!estimator.quote.customerScope.trim()) errors.push("Customer scope is required.");
    if (!estimator.quote.lineItems.length) errors.push("Add at least one line item.");
    estimator.quote.lineItems.forEach((item, index) => {
      if (!String(item.label || "").trim()) errors.push(`Line item ${index + 1} needs a description.`);
      if (!(Number(item.quantity) > 0)) errors.push(`Line item ${index + 1} quantity must be greater than zero.`);
      if (Number(item.unitPrice) < 0 || !Number.isFinite(Number(item.unitPrice))) errors.push(`Line item ${index + 1} needs a valid unit price.`);
    });
    if (estimator.estimateType === "options") {
      if (estimator.quote.lineItems.length < 2) errors.push("Options estimates require at least two customer choices.");
      const optionIds = estimator.quote.lineItems.map((item) => String(item.optionId || "").trim());
      if (optionIds.some((optionId) => !optionId)) errors.push("Every options estimate choice needs an option ID.");
      if (new Set(optionIds.filter(Boolean)).size !== optionIds.filter(Boolean).length) errors.push("Options estimate choice IDs must be unique.");
    }
    if (estimator.quote.total <= 0) errors.push("Final total must be greater than zero.");
    estimator.quote.attachments.forEach((attachment, index) => {
      if (!String(attachment.label || "").trim()) errors.push(`Attachment ${index + 1} needs a name.`);
    });
    return errors;
  }

  function markEstimatorReadyToPreview(record, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || validateEstimatorQuote(record).length) return false;
    const activeRevision = estimator.revisions[estimator.revisions.length - 1];
    if (activeRevision && activeRevision.status === "drafting" && activeRevision.revisedQuoteVersion <= activeRevision.requestedQuoteVersion) return false;
    return transitionEstimator(record, "estimate_ready_to_preview", {
      actor,
      title: "Estimate ready to preview",
      text: `${formatJobRef(record)} passed validation and requires customer-view preview before sending.`
    });
  }

  function recordEstimatorPreview(record, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || estimator.status !== "estimate_ready_to_preview") return false;
    estimator.preview = {
      quoteVersion: estimator.quote.version,
      previewedAt: new Date().toISOString(),
      previewedBy: actor,
      snapshot: cloneRecord({
        customerName: record.customerName || "Customer",
        jobRef: formatJobRef(record),
        estimateType: estimator.estimateType,
        quote: estimator.quote
      })
    };
    return transitionEstimator(record, "estimate_previewed", {
      actor,
      title: "Customer quote preview confirmed",
      text: `${actor} previewed quote version ${estimator.quote.version} for ${formatJobRef(record)}.`
    });
  }

  function markEstimatorReadyToSend(record, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || estimator.status !== "estimate_previewed") return false;
    if (!estimator.preview.previewedAt || estimator.preview.quoteVersion !== estimator.quote.version) return false;
    return transitionEstimator(record, "estimate_ready_to_send", {
      actor,
      title: "Previewed estimate ready to send",
      text: `${formatJobRef(record)} quote version ${estimator.quote.version} is approved for customer delivery.`
    });
  }

  function returnEstimatorToDraft(record, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || !["estimate_ready_to_preview", "estimate_previewed", "estimate_ready_to_send", "revision_requested"].includes(estimator.status)) return false;
    const isRevision = estimator.status === "revision_requested";
    if (isRevision) {
      const activeRevision = estimator.revisions[estimator.revisions.length - 1];
      if (!activeRevision || activeRevision.status !== "requested") return false;
      activeRevision.status = "drafting";
      activeRevision.reopenedAt = new Date().toISOString();
      activeRevision.reopenedBy = actor;
      estimator.decision = { value: "pending", decidedAt: "", selectedOptionId: "" };
      estimator.delivery = { method: "", sentAt: "", openedAt: "" };
    }
    estimator.preview = { quoteVersion: 0, previewedAt: "", previewedBy: "", snapshot: null };
    return transitionEstimator(record, "estimate_preparing", {
      actor,
      title: isRevision ? "Revision returned to draft" : "Estimate returned to draft",
      text: `${actor} reopened ${formatJobRef(record)}${isRevision ? " after the customer revision request" : ""}. A new preview will be required before sending.`
    });
  }

  function sendEstimatorQuote(record, delivery = {}, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || estimator.status !== "estimate_ready_to_send") return false;
    if (!estimator.preview.previewedAt || estimator.preview.quoteVersion !== estimator.quote.version) return false;
    estimator.delivery = {
      method: delivery.method || "manual_link",
      sentAt: delivery.sentAt || new Date().toISOString(),
      openedAt: ""
    };
    const activeRevision = estimator.revisions[estimator.revisions.length - 1];
    if (activeRevision && activeRevision.status === "drafting") {
      activeRevision.status = "resent";
      activeRevision.resentAt = estimator.delivery.sentAt;
      activeRevision.revisedQuoteVersion = estimator.quote.version;
      activeRevision.revisedQuote = cloneEstimatorQuoteSnapshot(estimator);
    }
    if (!transitionEstimator(record, "estimate_sent", {
      actor,
      title: "Estimate sent",
      text: `${formatJobRef(record)} was sent by ${delivery.method || "manual link"}.`
    })) return false;
    return transitionEstimator(record, "waiting_on_customer", {
      actor,
      title: "Waiting on customer decision",
      text: `${formatJobRef(record)} is awaiting acceptance, decline, or a revision request.`
    });
  }

  function recordEstimatorDecision(record, decision, actor = "Customer") {
    const decisionMap = {
      accepted: "accepted",
      declined: "declined",
      revision_requested: "revision_requested"
    };
    const nextStatus = decisionMap[decision && decision.value];
    if (!nextStatus || !canTransitionEstimator(record, nextStatus)) return false;
    const estimator = ensureEstimatorRecord(record);
    if (!estimator) return false;
    if (decision.value === "revision_requested" && !String(decision.reason || "").trim()) return false;
    let selectedOption = null;
    if (decision.value === "accepted" && estimator.estimateType === "options") {
      selectedOption = estimator.quote.lineItems.find((item) => item.optionId === decision.selectedOptionId);
      if (!selectedOption) return false;
    }
    estimator.decision = {
      value: decision.value,
      decidedAt: decision.decidedAt || new Date().toISOString(),
      selectedOptionId: decision.selectedOptionId || ""
    };
    if (selectedOption) {
      applyEstimatorQuoteTotals(estimator, selectedOption.quantity * selectedOption.unitPrice);
    }
    if (nextStatus === "revision_requested") {
      estimator.revisions.push({
        id: `revision-${estimator.revisions.length + 1}`,
        requestedAt: estimator.decision.decidedAt,
        requestedBy: actor,
        reason: String(decision.reason).trim(),
        status: "requested",
        requestedQuoteVersion: estimator.quote.version,
        originalQuote: cloneEstimatorQuoteSnapshot(estimator),
        reopenedAt: "",
        reopenedBy: "",
        revisedQuoteVersion: 0,
        revisedQuote: null,
        resentAt: "",
        acceptedAt: "",
        acceptedTotal: 0,
        selectedOptionId: ""
      });
    } else {
      const activeRevision = estimator.revisions[estimator.revisions.length - 1];
      if (activeRevision && activeRevision.status === "resent") {
        activeRevision.status = nextStatus;
        if (nextStatus === "accepted") {
          activeRevision.acceptedAt = estimator.decision.decidedAt;
          activeRevision.acceptedTotal = estimator.quote.total;
          activeRevision.selectedOptionId = estimator.decision.selectedOptionId;
        }
      }
    }
    return transitionEstimator(record, nextStatus, {
      actor,
      title: nextStatus === "revision_requested" ? "Customer requested revision" : `Estimate ${nextStatus}`,
      text: decision.reason || `${actor} marked ${formatJobRef(record)} as ${titleWords(nextStatus)}.`
    });
  }

  function setEstimatorFollowUp(record, followUp = {}, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || !followUp.reason || !followUp.nextAction) return false;
    if (estimator.status !== "follow_up_needed" && !transitionEstimator(record, "follow_up_needed", {
      actor,
      title: "Estimator follow-up required",
      text: `${formatJobRef(record)} requires another action before the estimate can close.`
    })) return false;
    const current = ensureEstimatorRecord(record);
    current.followUp = {
      reason: followUp.reason,
      owner: followUp.owner || current.owner.label || "President",
      nextAction: followUp.nextAction,
      dueAt: followUp.dueAt || "",
      attempts: current.followUp.attempts || [],
      completedAt: "",
      resolution: ""
    };
    return true;
  }

  function addEstimatorFollowUpAttempt(record, attempt = {}, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || estimator.status !== "follow_up_needed" || !String(attempt.note || "").trim()) return false;
    const entry = {
      id: `follow-up-${estimator.followUp.attempts.length + 1}`,
      time: attempt.time || new Date().toISOString(),
      channel: attempt.channel || "phone",
      note: String(attempt.note).trim(),
      outcome: attempt.outcome || "pending",
      actor
    };
    estimator.followUp.attempts.push(entry);
    estimator.activity.push({
      time: entry.time,
      title: `Follow-up contact logged by ${actor}`,
      text: `${titleWords(entry.channel)} contact: ${entry.note}`,
      actor
    });
    return true;
  }

  function resolveEstimatorFollowUp(record, resolution, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    const resolutionMap = {
      return_to_draft: "estimate_preparing",
      accepted: "accepted",
      declined: "declined",
      lost: "lost"
    };
    const nextStatus = resolutionMap[resolution];
    if (!estimator || estimator.status !== "follow_up_needed" || !nextStatus) return false;
    if (!transitionEstimator(record, nextStatus, {
      actor,
      title: `Follow-up resolved: ${titleWords(resolution)}`,
      text: `${formatJobRef(record)} follow-up resolved as ${titleWords(resolution)}.`
    })) return false;
    const current = ensureEstimatorRecord(record);
    current.followUp.completedAt = new Date().toISOString();
    current.followUp.resolution = resolution;
    if (["accepted", "declined"].includes(resolution)) {
      current.decision = {
        value: resolution,
        decidedAt: current.followUp.completedAt,
        selectedOptionId: ""
      };
    }
    return true;
  }

  function scheduleAcceptedEstimate(record, schedule = {}, actor = "President") {
    const estimator = ensureEstimatorRecord(record);
    if (!estimator || estimator.status !== "accepted" || !schedule.scheduledDate || !schedule.scheduledTime || !schedule.assignedTo) return false;
    estimator.handoff.scheduling = {
      status: "scheduled",
      scheduledDate: schedule.scheduledDate,
      scheduledTime: schedule.scheduledTime,
      assignedTo: schedule.assignedTo,
      notes: String(schedule.notes || ""),
      requestedAt: new Date().toISOString()
    };
    return transitionEstimator(record, "scheduled_after_acceptance", {
      actor,
      title: "Accepted estimate scheduled",
      text: `${formatJobRef(record)} was handed to ${schedule.assignedTo} for ${schedule.scheduledDate} at ${schedule.scheduledTime}.`
    });
  }

  function normalizeRecord(record) {
    const next = cloneRecord(record);
    if (next && !next.routeDate && next.id && routeDateDefaults[next.id]) {
      next.routeDate = routeDateDefaults[next.id];
    }
    ensureEstimatorRecord(next);
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
          schemaVersion: JOB_RECORDS_SCHEMA_VERSION,
          records: fallbackRecords.map(normalizeRecord),
          selectedRecordId: fallbackRecords[0] ? fallbackRecords[0].id : null
        };
      }
      const needsMigration = Number(parsed.schemaVersion || 1) < JOB_RECORDS_SCHEMA_VERSION
        || parsed.records.some((record) => Number(record && record.estimator && record.estimator.schemaVersion || 1) < ESTIMATOR_SCHEMA_VERSION);
      const normalizedParsedRecords = parsed.records.map(normalizeRecord);
      const mergedRecords = normalizedParsedRecords.slice();
      let merged = false;
      fallbackRecords.map(normalizeRecord).forEach((fallbackRecord) => {
        if (!mergedRecords.some((record) => record.id === fallbackRecord.id)) {
          mergedRecords.push(fallbackRecord);
          merged = true;
        }
      });
      if (merged || needsMigration) {
        writeState(mergedRecords, parsed.selectedRecordId || (fallbackRecords[0] ? fallbackRecords[0].id : null));
      }
      return {
        schemaVersion: JOB_RECORDS_SCHEMA_VERSION,
        records: mergedRecords,
        selectedRecordId: parsed.selectedRecordId || (fallbackRecords[0] ? fallbackRecords[0].id : null)
      };
    } catch (error) {
      return {
        schemaVersion: JOB_RECORDS_SCHEMA_VERSION,
        records: fallbackRecords.map(normalizeRecord),
        selectedRecordId: fallbackRecords[0] ? fallbackRecords[0].id : null
      };
    }
  }

  function writeState(records, selectedRecordId) {
    localStorage.setItem(storageKey, JSON.stringify({
      schemaVersion: JOB_RECORDS_SCHEMA_VERSION,
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
    JOB_RECORDS_SCHEMA_VERSION,
    ESTIMATOR_SCHEMA_VERSION,
    ESTIMATOR_LEVELS,
    ESTIMATOR_STATUSES,
    ESTIMATE_TYPES,
    ESTIMATE_SOURCES,
    ESTIMATOR_TRANSITIONS,
    cloneRecord,
    getBaseRecords,
    readState,
    writeState,
    findRecordById,
    normalizeEstimatorLevel,
    inferEstimatorSource,
    inferEstimateType,
    migrateEstimatorData,
    ensureEstimatorRecord,
    canTransitionEstimator,
    transitionEstimator,
    getEstimatorCapabilities,
    assignEstimatorOwner,
    updateEstimatorQuote,
    validateEstimatorQuote,
    markEstimatorReadyToPreview,
    recordEstimatorPreview,
    markEstimatorReadyToSend,
    returnEstimatorToDraft,
    sendEstimatorQuote,
    recordEstimatorDecision,
    setEstimatorFollowUp,
    addEstimatorFollowUpAttempt,
    resolveEstimatorFollowUp,
    scheduleAcceptedEstimate,
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
