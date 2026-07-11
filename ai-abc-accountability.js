(function (globalScope) {
  const EVENT_SCHEMA = {
    call_handled: {
      category: "communication",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "customerId", "status"]
    },
    lead_created: {
      category: "lead",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "customerId", "status"]
    },
    estimate_entered: {
      category: "revenue",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "customerId", "jobId", "amountExpected", "status"]
    },
    appointment_requested: {
      category: "scheduling",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "customerId", "jobId", "status"]
    },
    appointment_confirmed: {
      category: "scheduling",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "jobId", "status"]
    },
    recommendation_submitted: {
      category: "governance",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "recommendationStatus", "status"]
    },
    approval_submitted: {
      category: "governance",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "approvalStatus", "status"]
    },
    escalation_opened: {
      category: "governance",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "severity", "status"]
    },
    financial_reconciliation_required: {
      category: "financial",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "jobId", "status"]
    },
    financial_reconciliation_completed: {
      category: "financial",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "jobId", "status"]
    },
    goal_review_completed: {
      category: "governance",
      requiredFields: ["eventType", "companyId", "timestamp", "roleId", "goalStatus", "status"]
    }
  };

  function createEvent(input) {
    return {
      eventId: input.eventId || `${input.eventType}-${String(input.timestamp || Date.now()).replace(/[^0-9]/g, "")}`,
      eventType: input.eventType,
      category: EVENT_SCHEMA[input.eventType] ? EVENT_SCHEMA[input.eventType].category : "general",
      companyId: input.companyId,
      timestamp: input.timestamp,
      roleId: input.roleId,
      customerId: input.customerId || null,
      jobId: input.jobId || null,
      status: input.status || "open",
      recommendationStatus: input.recommendationStatus || null,
      approvalStatus: input.approvalStatus || null,
      goalStatus: input.goalStatus || null,
      severity: input.severity || null,
      amountExpected: input.amountExpected || null,
      metadata: input.metadata || {}
    };
  }

  function validateEvent(event) {
    const schema = EVENT_SCHEMA[event.eventType];
    if (!schema) {
      return { valid: false, missingFields: ["eventType(schema)"] };
    }
    const missingFields = schema.requiredFields.filter(field => event[field] === undefined || event[field] === null || event[field] === "");
    return {
      valid: missingFields.length === 0,
      missingFields
    };
  }

  function buildSeedEvents(companyConfig, roleRegistry, hierarchy) {
    const cfg = companyConfig.viewModel ? companyConfig : globalScope.AIABCConfig.normalizeCompanyConfig(companyConfig);
    const vm = cfg.viewModel;
    const president = roleRegistry.roles.find(role => role.roleType === "president");
    const ceo = roleRegistry.roles.find(role => role.roleName === "CEO");
    const cro = roleRegistry.roles.find(role => role.roleName === "CRO");
    const coo = roleRegistry.roles.find(role => role.roleName === "COO");
    const cfo = roleRegistry.roles.find(role => role.roleName === "CFO") || ceo;
    const cpio = roleRegistry.roles.find(role => role.roleName === "CPIO") || ceo;
    const feedbackDirector = roleRegistry.roles.find(role => role.roleName === "Director of Feedback") || cpio;
    const cao = roleRegistry.roles.find(role => role.roleName === "CAO") || ceo;
    const aiCallHandlingOfficer = roleRegistry.roles.find(role => role.roleName === "AI Call Handling Officer") || cro;
    const salesStaff = roleRegistry.roles.find(role => role.roleName === "Sales Staff") || cro;
    const schedulingDirector = roleRegistry.roles.find(role => role.roleName === "Scheduling Director") || coo || ceo;

    const events = [
      createEvent({
        eventType: "call_handled",
        companyId: cfg.companyProfile.companyId,
        timestamp: "2026-06-09T09:02:00-07:00",
        roleId: aiCallHandlingOfficer.id,
        customerId: `${cfg.companyProfile.companyId}-customer-priority-intake`,
        status: "completed",
        metadata: { companyName: vm.companyName, chain: hierarchy.chains.communication }
      }),
      createEvent({
        eventType: "lead_created",
        companyId: cfg.companyProfile.companyId,
        timestamp: "2026-06-09T09:05:00-07:00",
        roleId: cro.id,
        customerId: `${cfg.companyProfile.companyId}-customer-priority-intake`,
        status: "active",
        metadata: { source: "AI call handling" }
      }),
      createEvent({
        eventType: "recommendation_submitted",
        companyId: cfg.companyProfile.companyId,
        timestamp: "2026-06-09T09:12:00-07:00",
        roleId: cpio.id,
        recommendationStatus: "pending_review",
        status: "open",
        metadata: { submittedTo: president.id, topic: "Activation follow-through" }
      }),
      createEvent({
        eventType: "recommendation_submitted",
        companyId: cfg.companyProfile.companyId,
        timestamp: "2026-06-09T09:16:00-07:00",
        roleId: feedbackDirector.id,
        recommendationStatus: "signal_review_ready",
        status: "open",
        metadata: { submittedTo: cpio.id, topic: "Feedback patterns prepared" }
      }),
      createEvent({
        eventType: "approval_submitted",
        companyId: cfg.companyProfile.companyId,
        timestamp: "2026-06-09T09:20:00-07:00",
        roleId: ceo.id,
        approvalStatus: "approved",
        status: "closed",
        metadata: { submittedTo: president.id, topic: "Stage A access confirmation" }
      }),
      createEvent({
        eventType: "financial_reconciliation_required",
        companyId: cfg.companyProfile.companyId,
        timestamp: "2026-06-09T10:00:00-07:00",
        roleId: cfo.id,
        jobId: `${cfg.companyProfile.companyId}-job-001`,
        status: "open",
        metadata: { submittedTo: president.id }
      }),
      createEvent({
        eventType: "goal_review_completed",
        companyId: cfg.companyProfile.companyId,
        timestamp: "2026-06-09T10:20:00-07:00",
        roleId: ceo.id,
        goalStatus: "monthly_goal_approved",
        status: "closed",
        metadata: { submittedTo: president.id }
      })
    ];

    if (salesStaff) {
      events.push(
        createEvent({
          eventType: "estimate_entered",
          companyId: cfg.companyProfile.companyId,
          timestamp: "2026-06-09T10:42:00-07:00",
          roleId: salesStaff.id,
          customerId: `${cfg.companyProfile.companyId}-customer-quote-request`,
          jobId: `${cfg.companyProfile.companyId}-job-quote-001`,
          amountExpected: 2450,
          status: "active",
          metadata: { enteredFor: vm.serviceDescriptor }
        })
      );
    }

    if (schedulingDirector && coo) {
      events.push(
        createEvent({
          eventType: "appointment_requested",
          companyId: cfg.companyProfile.companyId,
          timestamp: "2026-06-09T11:00:00-07:00",
          roleId: schedulingDirector.id,
          customerId: `${cfg.companyProfile.companyId}-customer-urgent-service`,
          jobId: `${cfg.companyProfile.companyId}-job-urgent-001`,
          status: "awaiting_confirmation",
          metadata: { submittedTo: coo.id }
        }),
        createEvent({
          eventType: "appointment_confirmed",
          companyId: cfg.companyProfile.companyId,
          timestamp: "2026-06-09T11:18:00-07:00",
          roleId: schedulingDirector.id,
          jobId: `${cfg.companyProfile.companyId}-job-urgent-001`,
          status: "completed",
          metadata: { channel: "staff-dashboard" }
        }),
        createEvent({
          eventType: "financial_reconciliation_completed",
          companyId: cfg.companyProfile.companyId,
          timestamp: "2026-06-09T11:35:00-07:00",
          roleId: president.id,
          jobId: `${cfg.companyProfile.companyId}-job-001`,
          status: "closed",
          metadata: { confirmedAmount: 2450 }
        })
      );
    }

    if (cao) {
      events.push(
        createEvent({
          eventType: "escalation_opened",
          companyId: cfg.companyProfile.companyId,
          timestamp: "2026-06-09T12:05:00-07:00",
          roleId: cao.id,
          severity: "high",
          status: "open",
          metadata: { topic: "Owner review still required" }
        })
      );
    }

    return events;
  }

  function countEvents(events, eventType, predicate) {
    return events.filter(event => event.eventType === eventType && (!predicate || predicate(event))).length;
  }

  function buildPresidentActivitySummary(events) {
    return {
      executiveRecommendations: {
        accepted: countEvents(events, "recommendation_submitted", event => event.recommendationStatus === "accepted"),
        rejected: countEvents(events, "recommendation_submitted", event => event.recommendationStatus === "rejected"),
        notReviewed: countEvents(events, "recommendation_submitted", event => event.recommendationStatus === "pending_review")
      },
      financialReconciliation: {
        requiredUpdates: countEvents(events, "financial_reconciliation_required"),
        completed: countEvents(events, "financial_reconciliation_completed"),
        outstanding: Math.max(
          countEvents(events, "financial_reconciliation_required") - countEvents(events, "financial_reconciliation_completed"),
          0
        )
      },
      approvals: {
        submitted: countEvents(events, "approval_submitted"),
        approved: countEvents(events, "approval_submitted", event => event.approvalStatus === "approved"),
        rejected: countEvents(events, "approval_submitted", event => event.approvalStatus === "rejected"),
        pending: countEvents(events, "approval_submitted", event => event.approvalStatus === "pending_review")
      },
      criticalIssues: {
        escalated: countEvents(events, "escalation_opened"),
        reviewed: countEvents(events, "escalation_opened", event => event.status === "reviewed" || event.status === "closed"),
        outstanding: countEvents(events, "escalation_opened", event => event.status !== "reviewed" && event.status !== "closed")
      },
      goalReviews: {
        monthlyGoalApproved: countEvents(events, "goal_review_completed", event => event.goalStatus === "monthly_goal_approved") > 0,
        weeklyReviewsCompleted: countEvents(events, "goal_review_completed"),
        weeklyReviewsTarget: 4
      }
    };
  }

  function summarizeRoleEvents(role, events) {
    const roleEvents = events.filter(event => event.roleId === role.id);
    const completedEvents = roleEvents.filter(event => event.status === "completed" || event.status === "closed").length;
    const openEvents = roleEvents.filter(event => event.status !== "completed" && event.status !== "closed").length;
    const approvalsTouched = roleEvents.filter(event => event.eventType === "approval_submitted").length;
    const escalationsTouched = roleEvents.filter(event => event.eventType === "escalation_opened").length;
    const revenueLinked = roleEvents
      .filter(event => typeof event.amountExpected === "number")
      .reduce((total, event) => total + event.amountExpected, 0);

    return {
      roleId: role.id,
      roleName: role.roleName,
      accountabilityMode: role.accountabilityMode,
      roleType: role.roleType,
      managedDomain: role.managedDomain,
      totalEvents: roleEvents.length,
      completedEvents,
      openEvents,
      approvalsTouched,
      escalationsTouched,
      revenueLinked
    };
  }

  function computeRoleScore(summary) {
    const base = 6;
    const completionBonus = Math.min(summary.completedEvents * 0.8, 2);
    const eventBonus = Math.min(summary.totalEvents * 0.25, 1.5);
    const openPenalty = Math.min(summary.openEvents * 0.45, 2.5);
    const escalationPenalty = Math.min(summary.escalationsTouched * 0.35, 1);
    const score = Math.max(1, Math.min(10, base + completionBonus + eventBonus - openPenalty - escalationPenalty));
    return Math.round(score * 10) / 10;
  }

  function buildRoleScorecards(roleRegistry, events) {
    return roleRegistry.roles
      .filter(role => role.scoringEligible)
      .map(role => {
        const summary = summarizeRoleEvents(role, events);
        const score = computeRoleScore(summary);
        let trend = "Stable";
        if (score >= 8.5) trend = "Improving";
        if (score <= 5.5) trend = "At Risk";

        const strongestArea = summary.revenueLinked > 0
          ? "Revenue visibility"
          : summary.completedEvents > 0
            ? "Workflow follow-through"
            : "Signal collection";
        const weakestArea = summary.openEvents > 1
          ? "Open action cleanup"
          : summary.escalationsTouched > 0
            ? "Escalation containment"
            : "More live operating volume needed";

        return {
          roleId: role.id,
          roleName: role.roleName,
          roleType: role.roleType,
          managedDomain: role.managedDomain,
          score,
          trend,
          strongestArea,
          weakestArea,
          summary
        };
      })
      .sort((left, right) => right.score - left.score);
  }

  globalScope.AIABCAccountability = {
    EVENT_SCHEMA,
    createEvent,
    validateEvent,
    buildSeedEvents,
    buildPresidentActivitySummary,
    buildRoleScorecards
  };
})(window);
