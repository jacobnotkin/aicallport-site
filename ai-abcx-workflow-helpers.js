window.AIABCXWorkflowHelpers = (() => {
  const APPOINTMENT_TYPES = [
    { value: "sales", label: "Sales" },
    { value: "service", label: "Service" },
    { value: "sales_and_service", label: "Sales And Service" }
  ];

  const OUTCOMES = [
    { value: "pending", label: "Outcome Pending" },
    { value: "estimate_given", label: "Estimate Given" },
    { value: "sold_not_completed", label: "Sold Not Completed" },
    { value: "sold_and_completed", label: "Sold And Completed" },
    { value: "service_completed", label: "Service Completed" },
    { value: "follow_up_needed", label: "Follow-Up Needed" },
    { value: "not_sold", label: "Not Sold" },
    { value: "canceled", label: "Canceled" },
    { value: "no_show", label: "No Show" }
  ];

  const STATUS_OPTIONS = {
    A: [
      { value: "provisional", label: "Provisional" },
      { value: "awaiting_manual_confirmation", label: "Awaiting Manual Confirmation" },
      { value: "confirmed", label: "Confirmed" },
      { value: "rescheduled", label: "Rescheduled" },
      { value: "completed", label: "Completed" },
      { value: "canceled", label: "Canceled" },
      { value: "no_show", label: "No Show" },
      { value: "follow_up_needed", label: "Follow-Up Needed" }
    ],
    B: [
      { value: "provisional", label: "Provisional" },
      { value: "awaiting_worker_assignment", label: "Awaiting Worker Assignment" },
      { value: "awaiting_worker_confirmation", label: "Awaiting Worker Confirmation" },
      { value: "rerouted", label: "Rerouted" },
      { value: "awaiting_customer_confirmation", label: "Awaiting Customer Confirmation" },
      { value: "confirmed", label: "Confirmed" },
      { value: "in_progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
      { value: "follow_up_needed", label: "Follow-Up Needed" },
      { value: "canceled", label: "Canceled" },
      { value: "no_show", label: "No Show" }
    ]
  };

  const stageAActionMap = {
    move_to_manual_confirmation: {
      label: "Move To Manual Confirmation",
      status: "awaiting_manual_confirmation",
      note: "President is waiting on representative confirmation outside the system.",
      activityTitle: "President moved record to manual confirmation"
    },
    confirm_appointment: {
      label: "Confirm Appointment",
      status: "confirmed",
      note: "Final appointment time is now recorded by the President.",
      activityTitle: "President confirmed appointment"
    },
    record_completed: {
      label: "Record Completed",
      status: "completed",
      note: "After the visit, President records the business result and amount paid.",
      activityTitle: "President marked appointment completed"
    },
    record_follow_up: {
      label: "Record Follow-Up Needed",
      status: "follow_up_needed",
      outcome: "follow_up_needed",
      note: "The visit happened, but another step is still required before the business result is closed.",
      activityTitle: "President marked follow-up needed"
    },
    mark_rescheduled: {
      label: "Mark Rescheduled",
      status: "rescheduled",
      note: "The appointment did not hold and now needs a new confirmed time.",
      activityTitle: "President marked appointment rescheduled"
    },
    mark_no_show: {
      label: "Mark No Show",
      status: "no_show",
      outcome: "no_show",
      note: "The customer did not show or did not make the appointment hold.",
      activityTitle: "President marked no-show"
    },
    mark_canceled: {
      label: "Mark Canceled",
      status: "canceled",
      outcome: "canceled",
      note: "The appointment or follow-up path is now canceled.",
      activityTitle: "President marked record canceled"
    }
  };

  function isStageAPostAppointmentStatus(status) {
    return ["completed", "follow_up_needed", "canceled", "no_show"].includes(status);
  }

  function deriveStageAStatusFromOutcome(outcomeValue) {
    const map = {
      estimate_given: "completed",
      sold_not_completed: "completed",
      sold_and_completed: "completed",
      service_completed: "completed",
      follow_up_needed: "follow_up_needed",
      not_sold: "completed",
      canceled: "canceled",
      no_show: "no_show"
    };
    return map[outcomeValue] || "";
  }

  function isStageAReadyToConfirm(record, stageRecord) {
    return Boolean(
      record &&
      stageRecord &&
      ["awaiting_manual_confirmation", "rescheduled"].includes(stageRecord.status) &&
      record.confirmedTime &&
      record.confirmedTime.trim()
    );
  }

  function buildStageATimeLabel() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function getStageAWorkflowConfig(record, stageRecordFor) {
    const stageRecord = stageRecordFor(record, "A");
    const base = {
      title: "Manual scheduling control",
      text: "Stage A is President-driven. Confirm the appointment manually, then record final outcome truth after the visit.",
      requirements: [],
      actions: []
    };
    const configs = {
      provisional: {
        title: "Create the manual confirmation lane",
        text: "The AI call agent already created the provisional time. The next President step is to move this record into manual confirmation with the representative outside the system.",
        requirements: ["Requested Time Visible", "Representative Name Useful"],
        actions: ["move_to_manual_confirmation", "mark_canceled"]
      },
      awaiting_manual_confirmation: {
        title: "Collect final time from the representative",
        text: "Stage A confirmation happens outside the system. Once the representative settles the final time, record it here and confirm the appointment.",
        requirements: ["Final Confirmed Time", "Representative Name"],
        actions: ["confirm_appointment", "mark_rescheduled", "mark_canceled"]
      },
      confirmed: {
        title: "Appointment is scheduled and waiting on business truth",
        text: "The appointment is now locked manually. After the visit, the President should record the outcome and amount paid.",
        requirements: ["Outcome After Visit", "Amount Paid After Visit"],
        actions: ["record_completed", "record_follow_up", "mark_no_show", "mark_rescheduled"]
      },
      rescheduled: {
        title: "Record needs a new confirmed time",
        text: "Use the updated confirmed time field once the replacement appointment is settled manually. Then reconfirm the appointment.",
        requirements: ["New Confirmed Time", "Representative Follow-Up"],
        actions: ["confirm_appointment", "mark_canceled"]
      },
      follow_up_needed: {
        title: "Business result is not finished yet",
        text: "The visit happened, but another business step is still required. Keep the record live until the President can close the final truth.",
        requirements: ["Follow-Up Outcome", "Amount Paid If Any"],
        actions: ["record_completed", "confirm_appointment", "mark_canceled"]
      },
      no_show: {
        title: "No-show recorded",
        text: "The President can either reschedule the appointment, move it into follow-up, or cancel it completely.",
        requirements: ["Outcome Locked", "Next Manual Decision"],
        actions: ["mark_rescheduled", "record_follow_up", "mark_canceled"]
      },
      completed: {
        title: "Stage A business truth recorded",
        text: "The appointment is complete. Outcome and payment truth are now stored on the shared record for reporting.",
        requirements: ["Outcome Recorded", "Amount Paid Recorded"],
        actions: ["record_follow_up", "mark_canceled"]
      },
      canceled: {
        title: "Record is closed as canceled",
        text: "The President can leave the record closed or reopen it only if a new manual appointment path is created.",
        requirements: ["Canceled Outcome Recorded"],
        actions: ["move_to_manual_confirmation"]
      }
    };
    return configs[stageRecord.status] || base;
  }

  function getStatusLabel(stage, value) {
    const match = STATUS_OPTIONS[stage].find((option) => option.value === value);
    return match ? match.label : value;
  }

  function getOutcomeLabel(value) {
    const match = OUTCOMES.find((option) => option.value === value);
    return match ? match.label : value;
  }

  function statusClass(value) {
    if (["completed"].includes(value)) return "green";
    if (["follow_up_needed", "rerouted", "awaiting_worker_confirmation", "awaiting_manual_confirmation", "awaiting_customer_confirmation", "awaiting_worker_assignment", "rescheduled", "in_progress"].includes(value)) return "orange";
    if (["canceled", "no_show"].includes(value)) return "red";
    if (["confirmed"].includes(value)) return "blue";
    return "purple";
  }

  function getJobFocusWorkflowConfig(focus, stage) {
    if (!focus) return null;
    const status = focus.statusValue || "";
    if (stage === "A") {
      const nextActionMap = {
        provisional: {
          label: "Move the record into manual confirmation.",
          detail: "The AI call agent captured the appointment window. The President still needs to settle the real time outside the system."
        },
        awaiting_manual_confirmation: {
          label: "Lock the final confirmed time and confirm the appointment.",
          detail: "Stage A stays manual. The representative confirms outside AI-ABCX, then the President records the scheduling truth."
        },
        confirmed: {
          label: "Wait for the appointment result and record the business outcome.",
          detail: "Once the visit or consultation happens, the President enters the outcome and amount paid."
        },
        rescheduled: {
          label: "Set the replacement time and reconfirm the appointment.",
          detail: "The original appointment slipped. Stage A needs a new confirmed time before the record can move forward."
        },
        follow_up_needed: {
          label: "Track the follow-up commitment and update the record when it resolves.",
          detail: "This job stays open because the business result still needs another touchpoint."
        },
        completed: {
          label: "Record is operationally closed.",
          detail: "Outcome and revenue have been captured for President reporting."
        },
        canceled: {
          label: "Record closed as canceled.",
          detail: "The cancellation still remains part of stage reporting and operational history."
        },
        no_show: {
          label: "Review whether to reschedule or close.",
          detail: "No-show truth should remain visible to the President for follow-up and accountability."
        }
      };
      const steps = [
        {
          label: "Intake",
          status: status === "provisional" ? "active" : "complete",
          note: "AI agent captured demand and opened the job."
        },
        {
          label: "Manual Confirm",
          status: ["awaiting_manual_confirmation", "rescheduled"].includes(status)
            ? "active"
            : ["confirmed", "completed", "follow_up_needed", "canceled", "no_show"].includes(status)
              ? "complete"
              : "upcoming",
          note: "President settles time and confirms outside the system."
        },
        {
          label: "Appointment Result",
          status: status === "confirmed"
            ? "active"
            : ["completed", "follow_up_needed", "canceled", "no_show"].includes(status)
              ? "complete"
              : "upcoming",
          note: "Outcome is entered after the appointment happens."
        },
        {
          label: "Revenue Truth",
          status: ["completed", "follow_up_needed", "canceled", "no_show"].includes(status) ? "complete" : "upcoming",
          note: "President records amount paid and final business reality."
        }
      ];
      return {
        nextAction: nextActionMap[status] || nextActionMap.provisional,
        steps
      };
    }

    const nextActionMap = {
      provisional: {
        label: "Wait for the scheduling engine to assign the job.",
        detail: "The record exists, but no worker has been attached yet."
      },
      awaiting_worker_assignment: {
        label: "Scheduling engine must assign the first available qualified worker.",
        detail: "Stage B automation is still matching capability and availability."
      },
      awaiting_worker_confirmation: {
        label: "Assigned worker must confirm or the job routes forward.",
        detail: "This is the first automated commitment gate. If the timer expires, AI-ABCX reroutes the job."
      },
      awaiting_customer_confirmation: {
        label: "Customer confirmation is now the required next step.",
        detail: "The worker already accepted. AI-ABCX can now lock the appointment only after customer confirmation."
      },
      confirmed: {
        label: "Appointment is locked and ready for execution.",
        detail: "The system now waits for the structured sales or service result."
      },
      in_progress: {
        label: "Visit is in progress.",
        detail: "The operational visit is underway and should return a structured result to the shared record."
      },
      rerouted: {
        label: "Job needs the next available worker assignment.",
        detail: "The original worker missed the confirmation window, so the record is sitting in reroute handling."
      },
      completed: {
        label: "Record is operationally closed.",
        detail: "Worker outcome is recorded and the job has reached a completed state."
      },
      follow_up_needed: {
        label: "Follow-up remains active on this job.",
        detail: "The shared record stays alive because the business outcome still requires another step."
      },
      canceled: {
        label: "Record closed as canceled.",
        detail: "This job is no longer active, but the cancellation still feeds reporting."
      },
      no_show: {
        label: "Customer did not hold the appointment.",
        detail: "President can review whether the next move is reschedule, follow-up, or closure."
      }
    };
    const steps = [
      {
        label: "Assignment",
        status: ["provisional", "awaiting_worker_assignment"].includes(status)
          ? "active"
          : ["awaiting_worker_confirmation", "awaiting_customer_confirmation", "confirmed", "in_progress", "completed", "follow_up_needed", "canceled", "no_show", "rerouted"].includes(status)
            ? "complete"
            : "upcoming",
        note: "Engine selects the next available worker."
      },
      {
        label: "Worker Confirm",
        status: status === "awaiting_worker_confirmation"
          ? "active"
          : status === "rerouted"
            ? "blocked"
            : ["awaiting_customer_confirmation", "confirmed", "in_progress", "completed", "follow_up_needed", "canceled", "no_show"].includes(status)
              ? "complete"
              : "upcoming",
        note: status === "rerouted"
          ? "Worker did not confirm inside the timing window."
          : "Assigned worker must accept the job."
      },
      {
        label: "Customer Confirm",
        status: status === "awaiting_customer_confirmation"
          ? "active"
          : ["confirmed", "in_progress", "completed", "follow_up_needed", "canceled", "no_show"].includes(status)
            ? "complete"
            : status === "rerouted"
              ? "blocked"
              : "upcoming",
        note: "SMS confirmation locks the appointment to the customer."
      },
      {
        label: "Outcome / Closeout",
        status: ["confirmed", "in_progress"].includes(status)
          ? "active"
          : ["completed", "follow_up_needed", "canceled", "no_show"].includes(status)
            ? "complete"
            : status === "rerouted"
              ? "blocked"
              : "upcoming",
        note: "Structured result and revenue truth close or extend the job."
      }
    ];
    return {
      nextAction: nextActionMap[status] || nextActionMap.awaiting_worker_assignment,
      steps
    };
  }

  function getQueuePriority(focus) {
    if (!focus) return { label: "Watch", tone: "low" };
    const status = focus.statusValue || "";
    if (status === "awaiting_manual_confirmation") return { label: "Manual Confirm", tone: "high" };
    if (status === "awaiting_worker_confirmation") return { label: "Worker Confirm", tone: "high" };
    if (status === "rerouted") return { label: "Rerouted", tone: "high" };
    if (status === "awaiting_customer_confirmation") return { label: "Customer Confirm", tone: "medium" };
    if (status === "follow_up_needed") {
      const reason = focus.followUpReason || "";
      if (reason === "estimate_revision") return { label: "Estimate Rev", tone: "medium" };
      if (reason === "customer_decision_pending") return { label: "Decision Pending", tone: "medium" };
      if (reason === "outbound_recovery") return { label: "Recovery", tone: "medium" };
      if (reason === "return_visit_required") return { label: "Return Visit", tone: "medium" };
      if (reason === "parts_hold") return { label: "Parts Hold", tone: "medium" };
      if (reason === "service_completion_pending") return { label: "Completion Pending", tone: "medium" };
      if (reason === "same_day_conversion_pending") return { label: "Conversion Pending", tone: "medium" };
      if (reason === "approved_schedule_hold") return { label: "Schedule Hold", tone: "medium" };
      if (reason === "estimate_revision_then_return_visit") return { label: "Rev + Return", tone: "medium" };
      return { label: "Follow-up", tone: "medium" };
    }
    if (status === "rescheduled") return { label: "Rescheduled", tone: "medium" };
    if (status === "provisional") return { label: "Provisional", tone: "medium" };
    if (status === "confirmed") return { label: "Confirmed", tone: "low" };
    if (status === "in_progress") return { label: "In Progress", tone: "low" };
    if (status === "completed") return { label: "Completed", tone: "low" };
    if (status === "no_show") return { label: "No Show", tone: "medium" };
    if (status === "canceled") return { label: "Canceled", tone: "low" };
    return { label: "Watch", tone: "low" };
  }

  function getClosedReviewDescriptor(focus) {
    if (!focus) {
      return {
        label: "Review Outcome",
        detail: "Closed records remain visible for CEO follow-through."
      };
    }
    const status = focus.statusValue || "";
    if (status === "completed") {
      if (Number(focus.amountPaid || 0) > 0) {
        return {
          label: "Review Revenue",
          detail: "Revenue truth has been captured and is ready for CEO review."
        };
      }
      return {
        label: "Review Closeout",
        detail: "The job is closed, but the final closeout truth still needs CEO review."
      };
    }
    if (status === "canceled") {
      return {
        label: "Review Outcome",
        detail: "The cancellation outcome stays visible for CEO review and pattern tracking."
      };
    }
    if (status === "no_show") {
      return {
        label: "Review Outcome",
        detail: "No-show outcome stays visible so the CEO can decide on follow-through."
      };
    }
    return {
      label: "Review Outcome",
      detail: "Closed records remain visible for CEO follow-through."
    };
  }

  function getClosedQueuePriority(focus) {
    const review = getClosedReviewDescriptor(focus);
    if (!focus) return { label: review.label, tone: "low" };
    const status = focus.statusValue || "";
    if (status === "completed") return { label: review.label, tone: "low" };
    if (status === "canceled" || status === "no_show") {
      return { label: review.label, tone: "medium" };
    }
    return { label: review.label, tone: "low" };
  }

  function getFocusNavigationTarget(focus) {
    const status = focus && focus.statusValue ? focus.statusValue : "";
    const followUpReason = focus && focus.followUpReason ? focus.followUpReason : "";
    const appointmentType = String((focus && focus.appointmentType) || "")
      .toLowerCase()
      .replaceAll("&", "and")
      .replaceAll(/[^a-z]+/g, "_")
      .replace(/^_+|_+$/g, "");
    const isSales = appointmentType === "sales";
    const isService = appointmentType === "service";
    const isSalesAndService = appointmentType === "sales_and_service";
    if (["awaiting_manual_confirmation", "awaiting_worker_assignment", "awaiting_worker_confirmation", "awaiting_customer_confirmation", "provisional", "rescheduled"].includes(status)) {
      return {
        executiveId: "coo",
        directorId: "scheduling",
        tab: "Executive Summary"
      };
    }
    if (["confirmed", "in_progress"].includes(status)) {
      if (isSales) {
        return {
          executiveId: "cro",
          directorId: "sales",
          tab: "Executive Summary"
        };
      }
      if (isSalesAndService && status === "confirmed") {
        return {
          executiveId: "cro",
          directorId: "sales",
          tab: "Executive Summary"
        };
      }
      if (isSalesAndService && status === "in_progress") {
        return {
          executiveId: "coo",
          directorId: "service",
          tab: "Executive Summary"
        };
      }
      if (isService) {
        return {
          executiveId: "coo",
          directorId: "service",
          tab: "Executive Summary"
        };
      }
    }
    if (["rerouted", "no_show"].includes(status)) {
      return {
        executiveId: "coo",
        directorId: "scheduling",
        tab: "Risks"
      };
    }
    if (status === "follow_up_needed") {
      if (["estimate_revision", "customer_decision_pending", "outbound_recovery", "same_day_conversion_pending", "estimate_revision_then_return_visit"].includes(followUpReason)) {
        return {
          executiveId: "cro",
          directorId: "sales",
          tab: "Executive Summary"
        };
      }
      if (["return_visit_required", "parts_hold", "service_completion_pending"].includes(followUpReason)) {
        return {
          executiveId: "coo",
          directorId: "service",
          tab: "Executive Summary"
        };
      }
      if (followUpReason === "approved_schedule_hold") {
        return {
          executiveId: "coo",
          directorId: "scheduling",
          tab: "Executive Summary"
        };
      }
      return {
        executiveId: "ceo",
        directorId: "",
        tab: "Executive Summary"
      };
    }
    if (isSalesAndService && ["completed", "canceled", "no_show"].includes(status)) {
      return {
        executiveId: "ceo",
        directorId: "",
        tab: "Executive Summary"
      };
    }
    return {
      executiveId: isSales ? "cro" : "coo",
      directorId: isSales ? "sales" : "service",
      tab: "Executive Summary"
    };
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
    return labels[value] || "Follow-Up Next Step";
  }

  return {
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
    statusClass,
    getJobFocusWorkflowConfig,
    getQueuePriority,
    getClosedReviewDescriptor,
    getClosedQueuePriority,
    getFocusNavigationTarget,
    getFollowUpReasonLabel
  };
})();
