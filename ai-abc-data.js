(function (globalScope) {
  function esc(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function currency(value) {
    return `$${Number(value || 0).toLocaleString()}`;
  }

  function buildStaffName(prefix, index) {
    const names = ["Jordan", "Taylor", "Morgan", "Casey", "Avery", "Riley", "Cameron", "Drew"];
    return `${names[index % names.length]} ${prefix}`;
  }

  function buildCustomerId(prefix, index) {
    return `${prefix}-${String(10480 + index)}`;
  }

  function generateCRMClients(config, moduleContext) {
    const vm = config.viewModel;
    const hasScheduling = moduleContext.coreModules.schedulingAndCoordination.enabled;
    const serviceSource = vm.serviceDescriptor;
    const serviceOwner = config.roleConfiguration.serviceRoles.enabled ? buildStaffName("Service", 1) : vm.ownerName;
    const salesOwner = config.roleConfiguration.salesRoles.enabled ? buildStaffName("Sales", 2) : vm.ownerName;
    const originModel = config.workflowConfiguration.customerOriginModel;

    const clientTemplates = [
      {
        name: "Priority Intake",
        originKey: "new_call",
        source: `${serviceSource} intake`,
        status: "Active",
        lastActivity: "Configuration prepared",
        nextBooking: hasScheduling ? "Scheduling-ready workflow" : "Preferred timing captured",
        nextStepBy: "Owner",
        nextStepAction: `Review the ${vm.serviceDescriptorLower} workflow, live dashboard, and guided demo call before activation continues.`,
        transcript: `${vm.companyName} is prepared for ${vm.serviceDescriptorLower} demand with ${vm.staffLabel.toLowerCase()} and ${vm.locationLabel.toLowerCase()}.`
      },
      {
        name: "Alicia Grant",
        originKey: "new_call",
        source: "Emergency request",
        status: "Open",
        lastActivity: "Urgent service",
        nextBooking: hasScheduling ? "Same-day dispatch" : "Preferred emergency window captured",
        nextStepBy: config.roleConfiguration.serviceRoles.enabled ? "Service Staff" : "Owner",
        nextStepAction: hasScheduling ? `Accept same-day ${vm.serviceDescriptorLower} dispatch and confirm arrival window.` : `Owner should assign the job number to service staff, who then confirm availability manually and report completion after the visit.`,
        transcript: `Urgent ${vm.serviceDescriptorLower} request came in after the AI agent detected emergency intent and created a live priority record.`
      },
      {
        name: "Michael Chen",
        originKey: "new_call",
        source: "Quote request",
        status: "Pending",
        lastActivity: "Qualified lead",
        nextBooking: vm.serviceAndSalesEnabled ? (hasScheduling ? "Sales follow-up today" : "Preferred appointment window captured") : "Owner callback today",
        nextStepBy: vm.serviceAndSalesEnabled ? "Sales Staff" : "Owner",
        nextStepAction: vm.serviceAndSalesEnabled ? `Sales staff should open the client by number, confirm the appointment window by phone, and enter the estimate amount after the visit.` : `Return the quote request and confirm the next revenue step.`,
        transcript: `AI qualified the caller, captured the address and request summary, and routed the opportunity into the quote lane.`
      },
      {
        name: "Natalie Brooks",
        originKey: "legacy_import",
        source: "Imported CRM",
        status: "Active",
        lastActivity: "Outbound follow-up",
        nextBooking: hasScheduling ? "Awaiting booking reply" : "Awaiting reactivation callback",
        nextStepBy: vm.serviceAndSalesEnabled ? "Sales Staff" : "AI Agent",
        nextStepAction: vm.outboundEnabled === "Yes" ? `Continue the ${vm.serviceDescriptorLower} follow-up sequence on imported customer data and keep the legacy customer inside the reactivation pipeline.` : `Keep the record warm for future follow-up.`,
        transcript: `This record came from the uploaded customer database and now sits inside the live CRM for ${vm.companyName}.`
      },
      {
        name: "Harbor Referral Group",
        originKey: "referral",
        source: "Owner referral",
        status: "Open",
        lastActivity: "Referral intake created",
        nextBooking: hasScheduling ? "Priority outreach required" : "Priority manual confirmation required",
        nextStepBy: vm.serviceAndSalesEnabled ? "Sales Director" : "Owner",
        nextStepAction: "This customer entered through the owner referral port and should be handled ahead of standard inbound opportunities.",
        transcript: "Owner entered a referral client through the referral port, which created a dedicated routed customer record with priority handling."
      },
      originModel.owner_sales_entry.enabled && {
        name: "Carter Property Group",
        originKey: "owner_sales_entry",
        source: "Owner-entered sales lead",
        status: "Pending",
        lastActivity: "Manual sales entry",
        nextBooking: hasScheduling ? "Waiting for sales slot" : "Waiting for sales confirmation call",
        nextStepBy: "Sales Staff",
        nextStepAction: "Owner created this sales lead directly. Sales staff should use the customer number to open the record, contact the lead, and enter estimate value after the meeting.",
        transcript: "Owner entered a sales opportunity directly into AI-ABC so it could join the same lead, estimate, and revenue logic as live inbound demand."
      },
      originModel.owner_service_entry.enabled && {
        name: "Omar Hassan",
        originKey: "owner_service_entry",
        source: "Owner-entered service job",
        status: "Open",
        lastActivity: "Manual service handoff",
        nextBooking: hasScheduling ? "Waiting for service slot" : "Waiting for service confirmation call",
        nextStepBy: "Service Staff",
        nextStepAction: "Owner created a direct service job. Service staff should enter the customer number, review job context, complete the visit, and report comments back into the system.",
        transcript: "Owner entered a service record directly so the job could still use the shared customer ID, reporting chain, and completion logic before automatic scheduling goes live."
      },
      {
        name: "Rafael Ortiz",
        originKey: "new_call",
        source: "Missed-call recovery",
        status: "Open",
        lastActivity: "Recovery active",
        nextBooking: hasScheduling ? "Booking not yet secured" : "No connected conversation yet",
        nextStepBy: "AI Agent",
        nextStepAction: `Send the next missed-call recovery message and escalate if the customer replies.`,
        transcript: `The system captured a missed call, opened recovery logic, and preserved the opportunity instead of losing it.`
      },
      {
        name: "Emma Patel",
        originKey: "reactivation",
        source: "Repeat client",
        status: "Completed",
        lastActivity: "Recent service complete",
        nextBooking: "No booking",
        nextStepBy: "AI Agent",
        nextStepAction: `Send the satisfaction follow-up and check for repeat ${vm.serviceDescriptorLower} opportunity.`,
        transcript: `A recent client record remains connected to call history, outcomes, and future follow-up logic.`
      }
    ].filter(Boolean);

    return clientTemplates.map((template, index) => {
      const origin = originModel[template.originKey] || originModel.new_call;
      const owner = index === 0
        ? vm.ownerName
        : template.nextStepBy === "Sales Staff" || template.nextStepBy === "Sales Director"
          ? salesOwner
          : template.nextStepBy === "Service Staff"
            ? serviceOwner
            : serviceOwner;
      const createdMonth = String(10 + index).padStart(2, "0");
      const createdDay = String(12 + index).padStart(2, "0");
      return {
        customerId: buildCustomerId(origin.prefix || "C", index),
        customerOrigin: template.originKey,
        originPrefix: origin.prefix || "C",
        pipelineKey: origin.pipelineKey || "call_handling",
        routingOwnerRole: origin.routingOwnerRole || "owner",
        priorityLevel: template.source === "Emergency request" ? "urgent" : template.originKey === "referral" ? "high" : "normal",
        currentStatus: template.status.toLowerCase().replace(/\s+/g, "_"),
        sourceDetail: origin.sourceDetail || template.source.toLowerCase().replace(/\s+/g, "_"),
        name: index === 0 ? `${vm.companyName} Intake` : template.name,
        phone: `(555) 01${80 + index}-${1200 + index}`,
        address: `${vm.country} • ${vm.locationLabel}`,
        lastActivity: template.lastActivity,
        created: `2026-${createdMonth}-${createdDay}`,
        nextBooking: template.nextBooking,
        status: template.status,
        source: template.source,
        owner,
        nextStepAt: index === 1 ? "Immediately" : `Today ${9 + index}:00 AM`,
        nextStepBy: template.nextStepBy,
        nextStepAction: template.nextStepAction,
        transcript: template.transcript,
        recordings: Math.max(1, 3 - (index % 3)),
        timeline: [
          {
            type: "Inbound AI event",
            channel: "Call",
            when: `Jun ${10 + index}, ${8 + index}:12 AM`,
            summary: `${vm.companyName} captured a ${template.source.toLowerCase()} event and stored it in the live operating system.`,
            transcript: template.transcript,
            recording: "Recording available",
            direction: `AI Agent created the live client record, assigned ${origin.pipelineKey || "call_handling"}, and routed the next workflow step.`,
            next: template.nextStepAction
          },
          {
            type: "Owner-facing update",
            channel: "Internal",
            when: `Jun ${10 + index}, ${9 + index}:04 AM`,
            summary: `The ${template.source.toLowerCase()} record is visible in the ${vm.pathLabel} activation dashboard.`,
            transcript: `Workflow needs: ${vm.workflowNeedsLabel}. Active modules: ${moduleContext.coreModules.schedulingAndCoordination.enabled ? "Call Handling + Scheduling" : "Call Handling only"}. Origin: ${template.originKey}. Routed to ${origin.routingOwnerRole || "owner"}.`,
            recording: "Internal setup record",
            direction: "The live dashboard is showing company-tailored workflow state instead of a generic preview.",
            next: "Owner should review the record and continue activation."
          }
        ]
      };
    });
  }

  function generateRecommendedActionStore(config, moduleContext, crmClients) {
    const vm = config.viewModel;
    const urgentClient = crmClients[1];
    const quoteClient = crmClients[2];
    const legacyClient = crmClients.find(client => client.customerOrigin === "legacy_import");
    const referralClient = crmClients.find(client => client.customerOrigin === "referral");
    const todayActions = [
      {
        id: "owner-review-intake",
        title: `Review ${vm.companyName} live activation state`,
        stamp: "Top Priority",
        stampClass: "urgent-stamp",
        body: `The active dashboard is configured for ${vm.companyName} and is waiting on owner review before the Stripe reservation step.`,
        tags: [{ label: "Owner Action", className: "orange" }, { label: "Activation", className: "blue" }],
        lane: "Today",
        bucket: "Today",
        urgent: true,
        revenueCritical: false,
        module: "Call Handling",
        resolutionLabel: "Activation state reviewed",
        resolutionBody: "The owner reviewed the live operating surface and confirmed the activation path.",
        resolvedStamp: "Resolved just now"
      },
      {
        id: "urgent-demand",
        title: `Respond to ${urgentClient.name} urgent ${vm.serviceDescriptorLower} demand`,
        stamp: "Urgent",
        stampClass: "urgent-stamp",
        body: `Emergency intent was detected and routed into the active ${vm.serviceDescriptorLower} workflow. The next live decision is still open.`,
        tags: [{ label: "Urgent", className: "red urgent-tag" }, { label: "Call Handling", className: "blue" }],
        lane: "Today",
        bucket: "Approvals",
        urgent: true,
        revenueCritical: false,
        module: "Call Handling",
        resolutionLabel: "Urgent workflow approved",
        resolutionBody: `The urgent ${vm.serviceDescriptorLower} path was approved and routed into the correct next action.`,
        resolvedStamp: "Resolved just now"
      },
      {
        id: "quote-follow-up",
        title: `Protect ${quoteClient.name} revenue opportunity`,
        stamp: vm.stageAPrice,
        stampClass: "",
        body: `The qualified quote opportunity is live in the system and needs the next conversion action before it drifts.`,
        tags: [{ label: "Revenue Risk", className: "red urgent-tag" }, { label: "CRO", className: "blue" }],
        lane: "Revenue",
        bucket: "Today",
        urgent: false,
        revenueCritical: true,
        module: "Sales",
        resolutionLabel: "Quote follow-up completed",
        resolutionBody: "The revenue opportunity was advanced and the next step is now tracked in the system.",
        resolvedStamp: "Resolved just now"
      },
      {
        id: "referral-priority",
        title: `Review ${referralClient ? referralClient.name : "referral"} before standard queue`,
        stamp: "Referral",
        stampClass: "",
        body: "A referral customer was entered through the owner port and should be handled ahead of standard inbound traffic.",
        tags: [{ label: "Referral", className: "orange" }, { label: "Priority Lane", className: "blue" }],
        lane: "Today",
        bucket: "Today",
        urgent: false,
        revenueCritical: true,
        module: "Referrals",
        resolutionLabel: "Referral lane reviewed",
        resolutionBody: "The referral customer remained in the priority intake lane and the next owner was confirmed.",
        resolvedStamp: "Resolved just now"
      },
      {
        id: "legacy-reactivation",
        title: `Continue ${legacyClient ? legacyClient.name : "legacy customer"} reactivation path`,
        stamp: "Legacy",
        stampClass: "",
        body: "Imported customers are now numbered and routed inside the same operating structure instead of sitting outside the live workflow.",
        tags: [{ label: "Legacy Import", className: "orange" }, { label: "Reactivation", className: "blue" }],
        lane: "Revenue",
        bucket: "Today",
        urgent: false,
        revenueCritical: true,
        module: "CRM",
        resolutionLabel: "Legacy reactivation lane reviewed",
        resolutionBody: "The imported customer queue remained active and the reactivation path stayed connected to the live CRM.",
        resolvedStamp: "Resolved just now"
      }
    ];

    if (moduleContext.coreModules.schedulingAndCoordination.enabled) {
      todayActions.push({
        id: "confirm-bookings",
        title: "Protect live appointment confirmations",
        stamp: "Scheduling",
        stampClass: "",
        body: "The scheduling layer is active, so confirmations, reminders, and rerouting are now part of live execution control.",
        tags: [{ label: "Scheduling", className: "blue" }, { label: "Execution", className: "orange" }],
        lane: "Approvals",
        bucket: "Approvals",
        urgent: false,
        revenueCritical: true,
        module: "Scheduling",
        resolutionLabel: "Confirmation queue reviewed",
        resolutionBody: "The owner reviewed the booking-protection flow and kept the execution path moving.",
        resolvedStamp: "Resolved just now"
      });
    }

    if (moduleContext.coreModules.advancedManagement.enabled) {
      todayActions.push({
        id: "workflow-exception",
        title: "Review workflow exception and escalation state",
        stamp: "Governance",
        stampClass: "",
        body: "The advanced management layer is active and one outcome-checking rule is waiting on owner review.",
        tags: [{ label: "Advanced", className: "blue" }, { label: "Escalation", className: "orange" }],
        lane: "Escalations",
        bucket: "Escalations",
        urgent: false,
        revenueCritical: false,
        module: "Advanced Management",
        resolutionLabel: "Exception reviewed",
        resolutionBody: "The exception was reviewed and moved into the correct governance path.",
        resolvedStamp: "Resolved just now"
      });
    }

    return {
      pending: todayActions,
      resolved: [
        {
          id: "resolved-config",
          title: `${vm.companyName} activation profile prepared`,
          stamp: "Resolved Today",
          body: `The company profile, module set, and dashboard identity were prepared for the ${vm.pathLabel} flow.`,
          tags: [{ label: "Resolved", className: "green" }, { label: "Activation", className: "blue" }]
        },
        {
          id: "resolved-crm",
          title: "Imported CRM lane connected",
          stamp: "Resolved",
          body: "The customer-history and follow-up lane is connected to the live dashboard configuration.",
          tags: [{ label: "Resolved", className: "green" }, { label: "CRM", className: "blue" }]
        }
      ]
    };
  }

  function generateOverviewBundle(config, moduleContext, crmClients, actions, systemModel) {
    const vm = config.viewModel;
    const urgentCount = actions.pending.filter(item => item.urgent).length;
    const revenueCount = actions.pending.filter(item => item.revenueCritical).length;
    const activeModules = ["Call Handling"];
    const hierarchySummary = systemModel.reportingHierarchy.summary;
    const presidentActivitySummary = systemModel.presidentActivitySummary;
    const roleScorecards = systemModel.roleScorecards;
    const topRoleScorecards = roleScorecards.slice(0, 4);
    if (moduleContext.coreModules.schedulingAndCoordination.enabled) activeModules.push("Scheduling & Coordination");
    if (moduleContext.coreModules.advancedManagement.enabled) activeModules.push("Advanced Management");

    return {
      summaryMarkup: `
        <div class="panel-grid cols-2" style="margin-bottom:16px">
          <div class="card teal">
            <h2>Active Company Configuration</h2>
            <div class="metric-list">
              <div class="metric-row"><span>Company</span><strong>${esc(vm.companyName)}</strong></div>
              <div class="metric-row"><span>Owner</span><strong>${esc(vm.ownerName)}</strong></div>
              <div class="metric-row"><span>Industry</span><strong>${esc(vm.industry)} • ${esc(vm.industryCategory)}</strong></div>
              <div class="metric-row"><span>Market</span><strong>${esc(vm.country)}</strong></div>
              <div class="metric-row"><span>Active modules</span><strong>${esc(activeModules.join(" • "))}</strong></div>
              <div class="metric-row"><span>Team setup</span><strong>${esc(vm.staffLabel)} • ${esc(vm.locationLabel)}</strong></div>
              <div class="metric-row"><span>Languages</span><strong>${esc(vm.languageLabel)}</strong></div>
              <div class="metric-row"><span>CRM</span><strong>${esc(vm.crmLabel)}</strong></div>
            </div>
            <div class="list" style="margin-top:14px">
              <div class="item"><strong>Prepared workflow</strong><p>${esc(vm.workflowNeedsLabel)}</p></div>
              <div class="item"><strong>Outbound status</strong><p>${vm.outboundEnabled === "Yes" ? esc(`Enabled • ${vm.leadSources.join(", ") || "Lead follow-up ready"}`) : "Outbound follow-up not enabled"}</p></div>
              <div class="item"><strong>Selected access path</strong><p>${esc(vm.pathLabel)} is the active Stage A access track for this company.</p></div>
            </div>
          </div>
          <div class="card">
            <h2>President Activity Summary</h2>
            <div class="metric-list">
              <div class="metric-row"><span>Executive recommendations accepted</span><strong>${presidentActivitySummary.executiveRecommendations.accepted}</strong></div>
              <div class="metric-row"><span>Executive recommendations not reviewed</span><strong>${presidentActivitySummary.executiveRecommendations.notReviewed}</strong></div>
              <div class="metric-row"><span>Financial updates completed</span><strong>${presidentActivitySummary.financialReconciliation.completed} of ${presidentActivitySummary.financialReconciliation.requiredUpdates}</strong></div>
              <div class="metric-row"><span>Approvals approved</span><strong>${presidentActivitySummary.approvals.approved} of ${presidentActivitySummary.approvals.submitted}</strong></div>
              <div class="metric-row"><span>Critical issues outstanding</span><strong>${presidentActivitySummary.criticalIssues.outstanding}</strong></div>
              <div class="metric-row"><span>Weekly reviews completed</span><strong>${presidentActivitySummary.goalReviews.weeklyReviewsCompleted} of ${presidentActivitySummary.goalReviews.weeklyReviewsTarget}</strong></div>
            </div>
            <div class="list" style="margin-top:14px">
              <div class="item"><strong>Governance view, not a score</strong><p>The President is not rated. AI-ABC shows activity, review discipline, outstanding items, and leadership impact instead.</p></div>
              <div class="item"><strong>Next focus</strong><p>Complete open executive reviews, protect reconciliation truth, and clear unresolved escalations before they create downstream drift.</p></div>
            </div>
          </div>
        </div>
      `,
      alertsMarkup: `
        <div class="card">
          <h2>Why this live view matters</h2>
          <div class="metric-list">
            <div class="metric-row"><span>Urgent owner actions</span><strong>${urgentCount}</strong></div>
            <div class="metric-row"><span>Revenue-sensitive actions</span><strong>${revenueCount}</strong></div>
            <div class="metric-row"><span>Live client records</span><strong>${crmClients.length}</strong></div>
            <div class="metric-row"><span>Module state</span><strong>${esc(vm.pathLabel)}</strong></div>
          </div>
          <div class="list">
            <div class="item"><strong>Company-tailored operating surface</strong><p>${esc(vm.companyName)} is no longer shown as a generic demo business. This dashboard now reflects the company identity, workflow profile, and active module state from the activation flow.</p></div>
            <div class="item"><strong>Ready for real system testing</strong><p>The live dashboard can now use one shared company configuration object instead of relying on page-specific assumptions.</p></div>
            <div class="item"><strong>Corporate reporting spine</strong><p>${hierarchySummary.executiveCount} executive roles, ${hierarchySummary.directorCount} director roles, and ${hierarchySummary.operationalCount} operational roles are now generated from one shared role registry and reporting hierarchy object.</p></div>
          </div>
        </div>
      `,
      todayMarkup: `
        <div class="panel-grid cols-2">
          <div class="card">
            <h2>Today’s operating focus</h2>
            <div class="list">
              <div class="item"><strong>Capture and protect opportunity</strong><p>Keep ${esc(vm.serviceDescriptorLower)} demand, missed-call recovery, and qualified lead follow-up inside one clear workflow.</p></div>
              <div class="item"><strong>Maintain owner clarity</strong><p>The President should be able to see what is urgent, what affects revenue, and what needs a decision without digging through unrelated panels.</p></div>
              <div class="item"><strong>Prepare the next layer only when needed</strong><p>${moduleContext.coreModules.schedulingAndCoordination.enabled ? "Scheduling is already part of the live operating stack for this company." : "Scheduling and advanced management remain separate optional layers and do not have to turn on until they fit the company."}</p></div>
            </div>
          </div>
          <div class="card">
            <h2>Reporting Hierarchy</h2>
            <div class="list">
              <div class="item"><strong>Communication</strong><p>${esc(globalScope.AIABCReporting.describeChain(systemModel.reportingHierarchy.chains.communication))}</p></div>
              <div class="item"><strong>Sales</strong><p>${esc(globalScope.AIABCReporting.describeChain(systemModel.reportingHierarchy.chains.sales)) || "Not active for this company yet."}</p></div>
              <div class="item"><strong>Scheduling</strong><p>${esc(globalScope.AIABCReporting.describeChain(systemModel.reportingHierarchy.chains.scheduling)) || "Not active until Stage B scheduling is enabled."}</p></div>
              <div class="item"><strong>Service</strong><p>${esc(globalScope.AIABCReporting.describeChain(systemModel.reportingHierarchy.chains.service)) || "Not active until service execution roles are enabled."}</p></div>
              <div class="item"><strong>Financial</strong><p>${esc(globalScope.AIABCReporting.describeChain(systemModel.reportingHierarchy.chains.financial))}</p></div>
            </div>
          </div>
        </div>
      `,
      performanceMarkup: `
        <div class="panel-grid cols-3">
          <div class="card"><h3>Company Profile</h3><div class="metric-list"><div class="metric-row"><span>Industry</span><strong>${esc(vm.industry)}</strong></div><div class="metric-row"><span>Business model</span><strong>${esc(vm.businessModel)}</strong></div><div class="metric-row"><span>Staff</span><strong>${esc(vm.staffLabel)}</strong></div></div></div>
          <div class="card"><h3>Module State</h3><div class="metric-list"><div class="metric-row"><span>Call Handling</span><strong>Active</strong></div><div class="metric-row"><span>Scheduling</span><strong>${moduleContext.coreModules.schedulingAndCoordination.enabled ? "Active" : "Off"}</strong></div><div class="metric-row"><span>Advanced Mgmt</span><strong>${moduleContext.coreModules.advancedManagement.enabled ? "Active" : "Off"}</strong></div></div></div>
          <div class="card"><h3>Communication Readiness</h3><div class="metric-list"><div class="metric-row"><span>Languages</span><strong>${esc(vm.languageLabel)}</strong></div><div class="metric-row"><span>Outbound</span><strong>${esc(vm.outboundEnabled)}</strong></div><div class="metric-row"><span>Workflow</span><strong>${esc(vm.workflowNeeds[0] || "Stage A")}</strong></div></div></div>
        </div>
        <div class="card" style="margin-top:16px">
          <h2>Role Scorecards</h2>
          <div class="panel-grid cols-2">
            ${topRoleScorecards.map(card => `
              <div class="card">
                <div class="metric-row"><span>${esc(card.roleName)}</span><strong>${esc(String(card.score))}/10</strong></div>
                <div class="metric-list" style="margin-top:10px">
                  <div class="metric-row"><span>Trend</span><strong>${esc(card.trend)}</strong></div>
                  <div class="metric-row"><span>Managed domain</span><strong>${esc(card.managedDomain)}</strong></div>
                  <div class="metric-row"><span>Events</span><strong>${card.summary.totalEvents}</strong></div>
                  <div class="metric-row"><span>Completed</span><strong>${card.summary.completedEvents}</strong></div>
                  <div class="metric-row"><span>Open</span><strong>${card.summary.openEvents}</strong></div>
                </div>
                <div class="list" style="margin-top:10px">
                  <div class="item"><strong>Strongest area</strong><p>${esc(card.strongestArea)}</p></div>
                  <div class="item"><strong>Weakest area</strong><p>${esc(card.weakestArea)}</p></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `,
      revenueMarkup: `
        <div class="panel-grid cols-3">
          <div class="card"><h3>Stage A Revenue View</h3><div class="metric-list"><div class="metric-row"><span>Stage A path</span><strong>${esc(vm.pathLabel)}</strong></div><div class="metric-row"><span>Monthly total</span><strong>${esc(vm.stageAPrice)}</strong></div><div class="metric-row"><span>Revenue-sensitive actions</span><strong>${revenueCount}</strong></div></div></div>
          <div class="card"><h3>Opportunity Protection</h3><div class="metric-list"><div class="metric-row"><span>Qualified opportunities</span><strong>${Math.max(2, crmClients.length - 2)}</strong></div><div class="metric-row"><span>Follow-up records</span><strong>${vm.outboundEnabled === "Yes" ? "Active" : "Manual only"}</strong></div><div class="metric-row"><span>Lost-opportunity protection</span><strong>On</strong></div></div></div>
          <div class="card"><h3>Stage A Management Layer</h3><div class="metric-list"><div class="metric-row"><span>Sales dashboard mode</span><strong>${esc(vm.salesDashboardMode)}</strong></div><div class="metric-row"><span>Service dashboard mode</span><strong>${esc(vm.serviceDashboardMode)}</strong></div><div class="metric-row"><span>Financial truth</span><strong>${moduleContext.coreModules.schedulingAndCoordination.enabled ? "Expanded in Stage B" : "Manual owner confirmation"}</strong></div></div></div>
        </div>
      `,
      conversionsMarkup: `
        <div class="card">
          <h2>Conversion Reporting</h2>
          <div class="metric-list">
            <div class="metric-row"><span>Calls to qualified opportunity</span><strong>${vm.outboundEnabled === "Yes" ? "38%" : "31%"}</strong></div>
            <div class="metric-row"><span>Qualified opportunity to next action</span><strong>${moduleContext.coreModules.schedulingAndCoordination.enabled ? "72%" : "64%"}</strong></div>
            <div class="metric-row"><span>System focus</span><strong>${esc(moduleContext.coreModules.schedulingAndCoordination.enabled ? "Execution + revenue" : "Opportunity capture")}</strong></div>
          </div>
        </div>
      `,
      activityMarkup: `
        <div class="panel-grid cols-2">
          <div class="card">
            <h2>Business Activity Reporting</h2>
            <div class="metric-list">
              <div class="metric-row"><span>Reporting chain</span><strong>${esc(globalScope.AIABCReporting.describeChain(systemModel.reportingHierarchy.chains.communication))}</strong></div>
              <div class="metric-row"><span>Active scored roles</span><strong>${systemModel.roleRegistry.summary.scoredRoles}</strong></div>
              <div class="metric-row"><span>President review items</span><strong>${presidentActivitySummary.executiveRecommendations.notReviewed + presidentActivitySummary.criticalIssues.outstanding}</strong></div>
            </div>
            <div class="list">
              <div class="item"><strong>Shared role registry is live</strong><p>${esc(vm.companyName)} now has a generated corporate structure with President, CEO, executive officers, directors, and operational roles.</p></div>
              <div class="item"><strong>Reporting hierarchy is active</strong><p>Each domain now knows who reports upward and where summary responsibility sits before it reaches the President.</p></div>
              <div class="item"><strong>Accountability event schema is seeded</strong><p>${systemModel.accountabilityEvents.length} live accountability events were generated to begin powering President reporting, executive summaries, and future scorecards.</p></div>
            </div>
          </div>
          <div class="card">
            <h2>Accountability Event Feed</h2>
            <div class="list">
              ${systemModel.accountabilityEvents.slice(0, 6).map(event => `
                <div class="item">
                  <strong>${esc(event.eventType.replaceAll("_", " "))}</strong>
                  <p>${esc(event.timestamp)} • ${esc(event.status)} • ${esc(event.category)}</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="card" style="margin-top:16px">
          <h2>All Scored Roles</h2>
          <div class="panel-grid cols-3">
            ${roleScorecards.map(card => `
              <div class="card">
                <div class="metric-row"><span>${esc(card.roleName)}</span><strong>${esc(String(card.score))}/10</strong></div>
                <div class="metric-list" style="margin-top:10px">
                  <div class="metric-row"><span>Trend</span><strong>${esc(card.trend)}</strong></div>
                  <div class="metric-row"><span>Completed</span><strong>${card.summary.completedEvents}</strong></div>
                  <div class="metric-row"><span>Open</span><strong>${card.summary.openEvents}</strong></div>
                  <div class="metric-row"><span>Revenue linked</span><strong>${currency(card.summary.revenueLinked)}</strong></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `
    };
  }

  function generateLiveDashboardData(config, moduleContext) {
    const roleRegistry = globalScope.AIABCRoles.buildRoleRegistry(config, moduleContext);
    const reportingHierarchy = globalScope.AIABCReporting.buildReportingHierarchy(roleRegistry);
    const accountabilityEvents = globalScope.AIABCAccountability.buildSeedEvents(config, roleRegistry, reportingHierarchy);
    const presidentActivitySummary = globalScope.AIABCAccountability.buildPresidentActivitySummary(accountabilityEvents);
    const roleScorecards = globalScope.AIABCAccountability.buildRoleScorecards(roleRegistry, accountabilityEvents);
    const crmClients = generateCRMClients(config, moduleContext);
    const recommendedActionStore = generateRecommendedActionStore(config, moduleContext, crmClients);
    const systemModel = {
      roleRegistry,
      reportingHierarchy,
      accountabilityEvents,
      presidentActivitySummary,
      roleScorecards
    };
    const overview = generateOverviewBundle(config, moduleContext, crmClients, recommendedActionStore, systemModel);
    return {
      roleRegistry,
      reportingHierarchy,
      accountabilityEvents,
      presidentActivitySummary,
      roleScorecards,
      crmClients,
      recommendedActionStore,
      overview
    };
  }

  globalScope.AIABCData = {
    generateLiveDashboardData
  };
})(window);
