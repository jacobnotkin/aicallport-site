window.AIABCXPresidentDashboardConfig = (() => {
  const stageCopy = {
    A: {
      note: "Foundation release with the full corporate structure visible.",
      chamber: "Stage A is live. The full company model is visible, with the strongest operating lanes active now.",
      banner: "establishes the full AI-ABCX company model with the strongest operating lanes active first.",
      meta: "Foundation Release"
    },
    B: {
      note: "Scheduling and operational-depth release.",
      chamber: "Stage B is live. Scheduling and operational management depth expand while future company lanes remain mapped for Stage C.",
      banner: "expands scheduling and operational management depth without redefining the future company lanes reserved for Stage C.",
      meta: "Expansion Release"
    },
    C: {
      note: "Full intelligence release with complete executive depth.",
      chamber: "Stage C is live. The full executive model is active with deeper control, intelligence, and governance.",
      banner: "brings the full executive model online with deeper control, intelligence, governance, and forecasting.",
      meta: "Full Intelligence Release"
    }
  };

  const stageOverview = {
    A: {
      briefTitle: "Foundation is in place. Core operating lanes are active.",
      briefBullets: [
        "Stage A establishes the visible corporate structure.",
        "Operations, revenue, and executive control lanes lead first.",
        "Scheduling and operational depth unlock in the next release."
      ],
      boardWord: "Foundation",
      boardDetails: [
        { label: "Core Lanes", value: "Active", color: "var(--green)" },
        { label: "Depth", value: "Lean", color: "var(--gold)" },
        { label: "Visibility", value: "Full", color: "var(--blue)" }
      ],
      decisions: [
        { label: "Protect operating discipline before broader activation", priority: "High" },
        { label: "Confirm Stage B management unlock priorities", priority: "Medium" },
        { label: "Keep visible future lanes mapped to company structure", priority: "Medium" }
      ]
    },
    B: {
      briefTitle: "Scheduling depth expands. The operating core gets broader.",
      briefBullets: [
        "Stage B expands scheduling and operational control.",
        "The strongest existing lanes gain broader daily management depth.",
        "Marketing, people, and governance remain structurally mapped until Stage C."
      ],
      boardWord: "Expansion",
      boardDetails: [
        { label: "Operational Depth", value: "Broader", color: "var(--green)" },
        { label: "Director Lanes", value: "Live", color: "var(--blue)" },
        { label: "Scheduling", value: "Active", color: "var(--gold)" }
      ],
      decisions: [
        { label: "Confirm scheduling and service-flow accountability across the operating core", priority: "High" },
        { label: "Review cross-department coordination before deeper scale-up", priority: "Medium" },
        { label: "Keep future company lanes mapped while preparing Stage C intelligence", priority: "Medium" }
      ]
    },
    C: {
      briefTitle: "Full intelligence model is active across the company.",
      briefBullets: [
        "Stage C brings the full executive model online.",
        "Governance, forecasting, and intelligence operate with full depth.",
        "The company now runs with complete AI-ABCX executive structure."
      ],
      boardWord: "Full System",
      boardDetails: [
        { label: "Executive Depth", value: "Full", color: "var(--green)" },
        { label: "Governance", value: "Active", color: "var(--blue)" },
        { label: "Forecasting", value: "Live", color: "var(--teal)" }
      ],
      decisions: [
        { label: "Use full intelligence controls to govern scaling decisions", priority: "High" },
        { label: "Review predictive signals across every executive lane", priority: "Medium" },
        { label: "Maintain strategic alignment across the full corporate model", priority: "Medium" }
      ]
    }
  };

  const activationMap = {
    executives: {
      ceo: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
      coo: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
      cro: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
      cfo: { A: "Lean Active", B: "Active", C: "Advanced", activatesAt: "A" },
      cso: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" },
      cpio: { A: "Lean Active", B: "Active", C: "Advanced", activatesAt: "A" },
      cmo: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
      hr: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
      cao: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" }
    },
    directors: {
      coo: {
        communications: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        service: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        scheduling: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" }
      },
      cro: {
        sales: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        reactivation: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        lead: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" }
      },
      cfo: {
        revenue_control: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        accounting: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        payroll: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" }
      },
      ceo: {
        strategy: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        executive_reporting: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        accountability: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" }
      },
      cso: {
        support: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" },
        retention: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" },
        reviews: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" }
      },
      cpio: {
        feedback: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        analysis: { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" },
        optimization: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" },
        system_improvement: { A: "Visible / Future", B: "Limited Active", C: "Active", activatesAt: "C" }
      },
      cmo: {
        advertising: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
        seo: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
        website: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" }
      },
      hr: {
        people_ops: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
        training: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
        hiring: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" }
      },
      cao: {
        compliance: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
        approval: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" },
        risk: { A: "Visible / Future", B: "Visible / Future", C: "Active", activatesAt: "C" }
      }
    }
  };

  function capitalizeWords(value) {
    return String(value || "").replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function buildBusinessProfile(companyConfig) {
    const viewModel = companyConfig && companyConfig.viewModel ? companyConfig.viewModel : {};
    const descriptor = String(viewModel.serviceDescriptor || viewModel.industry || "Service Operations").trim() || "Service Operations";
    const descriptorLower = String(viewModel.serviceDescriptorLower || descriptor.toLowerCase()).trim() || "service operations";
    const category = String(viewModel.industryCategory || "").toLowerCase();
    const normalized = descriptorLower.toLowerCase();

    const profile = {
      descriptor,
      descriptorLower,
      operationsTitle: `${descriptor} Operations`,
      capacityTitle: `${descriptor} Capacity`,
      demandLabel: `${descriptorLower} demand`,
      completedLabel: "Jobs Completed",
      activeWorkerLabel: "Field Team Active",
      backlogLabel: "Open Jobs",
      appointmentsLabel: "Appointments",
      hireLabel: "field specialist",
      visitLabel: "appointments",
      capacityRecommendation: `Protect ${descriptorLower} capacity before accepting additional overflow work.`,
      serviceSubtitle: `${capitalizeWords(descriptorLower)} execution is stable and owner visibility is strong across active jobs.`,
      serviceNote: `${capitalizeWords(descriptorLower)} capacity is not under stress yet, but the margin is narrowing.`,
      revenueFocusLabel: `${descriptor} Pipeline & Conversion`
    };

    if (normalized.includes("plumb")) {
      profile.completedLabel = "Work Orders Completed";
      profile.activeWorkerLabel = "Plumbers Active";
      profile.backlogLabel = "Open Work Orders";
      profile.appointmentsLabel = "Booked Visits";
      profile.hireLabel = "plumber";
      profile.visitLabel = "service visits";
    } else if (normalized.includes("hvac") || normalized.includes("heating") || normalized.includes("cooling")) {
      profile.activeWorkerLabel = "HVAC Techs Active";
      profile.backlogLabel = "Open Calls";
      profile.appointmentsLabel = "Booked Calls";
      profile.hireLabel = "HVAC technician";
      profile.visitLabel = "service calls";
    } else if (normalized.includes("electric")) {
      profile.activeWorkerLabel = "Electricians Active";
      profile.backlogLabel = "Open Work Orders";
      profile.appointmentsLabel = "Booked Visits";
      profile.hireLabel = "electrician";
      profile.visitLabel = "service visits";
    } else if (normalized.includes("landscap") || normalized.includes("lawn")) {
      profile.activeWorkerLabel = "Crews Active";
      profile.backlogLabel = "Open Route Stops";
      profile.appointmentsLabel = "Route Stops";
      profile.hireLabel = "crew member";
      profile.visitLabel = "route stops";
    } else if (normalized.includes("clean")) {
      profile.activeWorkerLabel = "Cleaning Crews Active";
      profile.backlogLabel = "Open Cleanings";
      profile.appointmentsLabel = "Booked Cleanings";
      profile.hireLabel = "cleaning crew member";
      profile.visitLabel = "cleaning appointments";
    } else if (normalized.includes("pest")) {
      profile.activeWorkerLabel = "Pest Techs Active";
      profile.backlogLabel = "Open Service Stops";
      profile.appointmentsLabel = "Service Stops";
      profile.hireLabel = "pest technician";
      profile.visitLabel = "service stops";
    } else if (category.includes("home")) {
      profile.activeWorkerLabel = "Field Techs Active";
      profile.backlogLabel = "Open Jobs";
      profile.appointmentsLabel = "Booked Visits";
      profile.hireLabel = "field technician";
      profile.visitLabel = "service visits";
    }

    return profile;
  }

  function applyBusinessProfile(dashboard, profile, { createTabContent, buildMetrics }) {
    const coo = dashboard.coo;
    if (!coo) return;

    coo.briefBullets[2] = `COO is presenting ${profile.descriptorLower} operations.`;
    coo.decisions[1].label = `Approve New ${capitalizeWords(profile.hireLabel)} Hire`;
    coo.response = `Operations are healthy. ${profile.capacityTitle} is stable, and scheduling remains manually coordinated in Stage A.`;
    coo.action = `Review manual appointment timing and ${profile.descriptorLower} capacity before approving additional ${profile.visitLabel}.`;
    coo.tabs["Executive Summary"] = createTabContent(
      `${profile.operationsTitle} Presentation`,
      `COO is presenting. Selected report: ${profile.capacityTitle}.`,
      buildMetrics([
        [profile.completedLabel, "1,125", "↑ 12%"],
        ["Open Issues", "2", "Review"],
        ["Capacity", "78%", "Stable"],
        [profile.appointmentsLabel, "18", "Today"]
      ]),
      `Review ${profile.capacityTitle.toLowerCase()} before approving additional ${profile.visitLabel} this week.`,
      92,
      [36, 52, 68, 48, 76, 86],
      `${profile.operationsTitle} is healthy overall, but the next unlock depends on preserving manual discipline.`
    );
    coo.tabs["Service Capacity"] = createTabContent(
      profile.capacityTitle,
      profile.serviceSubtitle,
      buildMetrics([
        [profile.activeWorkerLabel, "14", "On route"],
        ["Capacity Used", "78%", "Stable"],
        ["Average Job Time", "1.9h", "On target"],
        [profile.backlogLabel, "6", "Manageable"]
      ]),
      profile.capacityRecommendation,
      88,
      [30, 46, 63, 58, 70, 84],
      profile.serviceNote
    );

    const serviceDirector = coo.directors.find((item) => item.id === "service");
    if (serviceDirector) {
      serviceDirector.response = `${capitalizeWords(profile.descriptorLower)} completion is strong. The main bottleneck is protecting ${profile.descriptorLower} capacity while backlog stays visible.`;
      serviceDirector.action = `Review ${profile.descriptorLower} coverage before accepting new overflow work.`;
      serviceDirector.tabs["Executive Summary"] = createTabContent(
        "Service Director Briefing",
        `${capitalizeWords(profile.descriptorLower)} execution reporting and customer completion visibility remain stable.`,
        buildMetrics([
          [profile.completedLabel, "42", "This week"],
          ["Service Issues", "2", "Visible"],
          ["Completion Rate", "94%", "Strong"],
          [profile.backlogLabel, "6", "Manageable"]
        ]),
        `Protect ${profile.descriptorLower} completion and keep service notes consistent.`,
        90,
        [35, 46, 58, 63, 76, 83],
        `${capitalizeWords(profile.descriptorLower)} is healthy because field reporting remains visible.`
      );
    }

    const cro = dashboard.cro;
    if (cro) {
      cro.briefBullets[2] = `CRO is presenting revenue for ${profile.demandLabel}.`;
      cro.tabs["Executive Summary"] = createTabContent(
        "Revenue Department Presentation",
        `CRO is presenting. Selected report: ${profile.revenueFocusLabel}.`,
        buildMetrics([["Revenue", "$1,428,230", "↑ 18%"], ["Pipeline", "$384K", "Active"], ["Conversion", "42%", "Needs lift"], ["Leads", "256", "Active"]]),
        `Keep reactivation active and review low-converting channels inside ${profile.demandLabel}.`,
        90,
        [32, 44, 58, 61, 72, 82],
        `Revenue is healthy because multiple lanes are active across ${profile.demandLabel}, but conversion still needs discipline.`
      );
    }
  }

  function buildDashboardConfig({ createTabContent, buildMetrics, companyConfig }) {
    const businessProfile = buildBusinessProfile(companyConfig);
    const dashboard = {
  coo: {
    color: "#2aa8ff",
    name: "COO",
    role: "Chief Operating Officer",
    dept: "Operations",
    briefTitle: "Revenue is stable. Finance requires review.",
    briefBullets: [
      "Board Score remains strong at 92.",
      "One finance decision needs approval today.",
      "COO is presenting operations department."
    ],
    board: {
      score: 92,
      word: "Healthy",
      details: [
        { label: "Revenue", value: "94", color: "var(--green)" },
        { label: "Operations", value: "91", color: "var(--green)" },
        { label: "Finance", value: "89", color: "var(--gold)" }
      ]
    },
    decisions: [
      { label: "Confirm Q2 Marketing Budget", priority: "High" },
      { label: "Approve New Technician Hire", priority: "Medium" },
      { label: "Review Unpaid Invoices Over 60 Days", priority: "Medium" }
    ],
    askPrompt: "COO, what needs my attention today?",
    response: "Operations are healthy. Service capacity is stable, and scheduling remains manually coordinated in Stage A.",
    action: "Review manual appointment timing and technician capacity before approving additional jobs.",
    tabs: {
      "Executive Summary": createTabContent(
        "Operations Department Presentation",
        "COO is presenting. Selected report: Service Capacity.",
        buildMetrics([["Jobs Completed","1,125","↑ 12%"],["Open Issues","2","Review"],["Capacity","78%","Stable"],["Appointments","18","Today"]]),
        "Review service capacity before approving additional jobs this week.",
        92,
        [36,52,68,48,76,86],
        "Operations is healthy overall, but the next unlock depends on preserving manual discipline."
      ),
      "Scheduling": createTabContent(
        "Scheduling Readiness",
        "Stage A scheduling remains manual and President-managed until Stage B automation activates.",
        buildMetrics([["Provisional","18","Today"],["Awaiting Manual Confirm","12","Sent"],["Rescheduled","3","Review"],["Coverage","81%","Healthy"]]),
        "Keep manual scheduling disciplined and visible before the automated engine activates.",
        81,
        [28,42,57,49,61,73],
        "Stage A scheduling is operationally useful, but it still depends on manual coordination outside the worker workflow."
      ),
      "Service Capacity": createTabContent(
        "Service Capacity",
        "Field execution is stable and owner visibility is strong across active jobs.",
        buildMetrics([["Technicians Active","14","On route"],["Capacity Used","78%","Stable"],["Average Job Time","1.9h","On target"],["Backlog","6","Manageable"]]),
        "Protect technician capacity before accepting additional overflow work.",
        88,
        [30,46,63,58,70,84],
        "Service capacity is not under stress yet, but the margin is narrowing."
      ),
      "Open Issues": createTabContent(
        "Open Operational Issues",
        "Operational issues are contained and visible, but still require clean routing.",
        buildMetrics([["Critical Issues","0","Clear"],["Review Items","2","Visible"],["Blocked Jobs","1","Watch"],["Escalations","1","Pending"]]),
        "Close the two visible issues before expanding this week's workload.",
        76,
        [22,35,41,39,56,61],
        "Issue volume is not severe, but unresolved items can distort the operating picture."
      ),
      "Technicians": createTabContent(
        "Technician Readiness",
        "Technician reporting is arriving on time and the owner layer has usable visibility.",
        buildMetrics([["Check-ins","14","On time"],["Field Notes","9","Recorded"],["Late Starts","1","Watch"],["Training Gaps","2","Review"]]),
        "Keep field reporting consistent and close the two training gaps this week.",
        84,
        [24,37,49,52,64,72],
        "Technician performance is solid, but long-term reliability depends on reporting discipline."
      ),
      "Reports": createTabContent(
        "Operations Reporting",
        "Reports are stable enough to guide daily decisions and surface accountability gaps.",
        buildMetrics([["Daily Reports","27","Submitted"],["Exceptions","2","Visible"],["Owner Reviews","5","Complete"],["Signal Quality","91%","Strong"]]),
        "Use reporting to govern execution, not just record what happened.",
        91,
        [26,38,44,55,68,79],
        "Reporting quality is one of the strongest parts of the current operating system."
      )
    },
    directors: [
      {
        id: "communications",
        label: "Communications",
        role: "Communications Director",
        askPrompt: "Communications Director, where is call quality drifting?",
        response: "Inbound call quality is stable. Missed-call recovery is the most important communication control lane right now.",
        action: "Review callback timing and keep missed-call recovery within the same-day window.",
        tabs: {
          "Executive Summary": createTabContent("Communications Director Briefing", "Call handling, outbound quality, and missed-call recovery are visible here.", buildMetrics([["Inbound Today","31","Handled"],["Recovered Calls","6","Active"],["SMS Threads","14","Open"],["Response Quality","94%","Strong"]]), "Preserve call quality and keep callback timing tight.", 94, [42,55,61,70,78,88], "Communications is currently the strongest operational layer."),
          "Priorities": createTabContent("Communications Priorities", "The highest-value communication priorities are speed, clarity, and follow-through.", buildMetrics([["Priority Queue","5","Visible"],["Urgent Replies","2","Due"],["Escalations","1","Watch"],["Script Drift","0","Clear"]]), "Keep communication response windows short and visible.", 87, [33,45,49,58,66,77], "Quality holds when callback timing stays fast."),
          "Risks": createTabContent("Communications Risks", "Risks are centered on slow callbacks and fragmented message history.", buildMetrics([["Slow Replies","2","Review"],["Duplicate Threads","1","Watch"],["Missed Escalations","0","Clear"],["After-hours Drift","1","Review"]]), "Tighten missed-call recovery before it becomes an owner-trust issue.", 79, [26,39,43,48,57,63], "The risk is manageable because the signal is already visible."),
          "Dependencies": createTabContent("Communications Dependencies", "Communications depends on clean routing, reliable notes, and current business memory.", buildMetrics([["Routing Rules","12","Active"],["Template Health","91%","Strong"],["Knowledge Gaps","2","Review"],["Owner Overrides","1","Recent"]]), "Keep routing and knowledge inputs synchronized.", 82, [29,34,47,54,62,70], "Knowledge drift is the main dependency risk.")
        }
      },
      {
        id: "service",
        label: "Service",
        role: "Service Director",
        askPrompt: "Service Director, what is the operational bottleneck today?",
        response: "Field completion is strong. The main bottleneck is protecting technician availability while backlog stays visible.",
        action: "Review technician coverage before accepting new overflow work.",
        tabs: {
          "Executive Summary": createTabContent("Service Director Briefing", "Field execution reporting and customer completion visibility remain stable.", buildMetrics([["Completed Jobs","42","This week"],["Service Issues","2","Visible"],["Completion Rate","94%","Strong"],["Backlog","6","Manageable"]]), "Protect field completion and keep service notes consistent.", 90, [35,46,58,63,76,83], "Service is healthy because field reporting remains visible."),
          "Priorities": createTabContent("Service Priorities", "The highest priorities are backlog control, technician routing, and customer follow-through.", buildMetrics([["Priority Jobs","8","Today"],["Revisits","3","Review"],["Blocked Parts","1","Watch"],["Customer Updates","12","Sent"]]), "Keep backlog visible before it spreads across the week.", 83, [24,37,44,53,61,69], "Backlog is still controllable with current capacity."),
          "Risks": createTabContent("Service Risks", "Service risk comes from overflow, incomplete closeout, and deferred issue notes.", buildMetrics([["Overflow Risk","Low","Stable"],["Incomplete Closeout","2","Review"],["Escalated Jobs","1","Watch"],["Hidden Rework","1","Possible"]]), "Prevent incomplete closeout from distorting service quality signals.", 77, [20,31,39,44,52,60], "The current risk is moderate and already visible."),
          "Dependencies": createTabContent("Service Dependencies", "Service depends on technician reporting, parts availability, and customer callback timing.", buildMetrics([["Tech Updates","14","On time"],["Parts Delays","1","Visible"],["Callback Queue","4","Open"],["Route Changes","2","Today"]]), "Keep the field and callback systems synchronized.", 81, [25,34,46,50,57,68], "The strongest dependency is disciplined technician updates.")
        }
      },
      {
        id: "scheduling",
        label: "Scheduling",
        role: "Scheduling Director",
        askPrompt: "Scheduling Director, is the calendar under control?",
        response: "The calendar is under control, but Stage A scheduling still depends on manual confirmation and President-managed updates.",
        action: "Audit the next two days of manual capacity and confirmation pressure before increasing appointment volume.",
        tabs: {
          "Executive Summary": createTabContent("Scheduling Director Briefing", "Stage A scheduling is visible and useful, but still manual and President-managed.", buildMetrics([["Provisional","18","Today"],["Awaiting Manual Confirm","12","Sent"],["Manual Updates","3","Visible"],["Coverage","81%","Healthy"]]), "Protect manual confirmation quality before pushing more volume into the calendar.", 81, [21,32,44,53,60,72], "Scheduling is usable now, but not yet an automated assignment engine."),
          "Priorities": createTabContent("Scheduling Priorities", "Priority is clean manual confirmation, time updates, and gap prevention before automation exists.", buildMetrics([["Open Gaps","2","Review"],["Confirmed Next Day","4","Booked"],["Manual Holds","3","Visible"],["Late Confirmations","1","Watch"]]), "Keep the next-day calendar clean and predictable while scheduling is still manual.", 76, [18,30,37,45,55,63], "Late confirmations are the main manual-scheduling weakness."),
          "Risks": createTabContent("Scheduling Risks", "The calendar is most vulnerable where manual changes outrun clear communication and President updates.", buildMetrics([["Rescheduled Same Day","3","Visible"],["Double-book Risk","0","Clear"],["No-show Risk","2","Watch"],["Manual Drift","1","Review"]]), "Use service and communications together to keep manual schedule risk low.", 74, [19,28,34,39,47,58], "The current risk stays manageable because manual changes are still visible."),
          "Dependencies": createTabContent("Scheduling Dependencies", "Stage A scheduling depends on technician coverage, outside communication, and President review rules.", buildMetrics([["Technician Coverage","81%","Healthy"],["Awaiting Manual Confirm","12","Active"],["Owner Overrides","1","Recent"],["Queue Sync","93%","Strong"]]), "Keep manual confirmations and President overrides synchronized.", 84, [29,36,42,51,64,73], "Coverage is the main Stage A scheduling dependency.")
        }
      }
    ]
  },
  cro: {
    color: "#25d77e",
    name: "CRO",
    role: "Chief Revenue Officer",
    dept: "Revenue",
    briefTitle: "Pipeline is active. Conversion requires attention.",
    briefBullets: [
      "Qualified demand remains healthy across three lead lanes.",
      "Reactivation is still one of the strongest revenue levers.",
      "CRO is presenting revenue department."
    ],
    board: { score: 90, word: "Active", details: [{ label: "Pipeline", value: "93", color: "var(--green)" }, { label: "Conversion", value: "84", color: "var(--gold)" }, { label: "Forecast", value: "89", color: "var(--green)" }] },
    decisions: [
      { label: "Approve reactivation push for warm legacy records", priority: "High" },
      { label: "Review low-converting paid lead source", priority: "Medium" },
      { label: "Confirm follow-up ownership for open estimates", priority: "Medium" }
    ],
    askPrompt: "CRO, what is the most important revenue focus right now?",
    response: "Revenue is improving. Conversion is recoverable, and reactivation should remain a priority this week.",
    action: "Review lead quality and assign follow-up to open reactivation opportunities.",
    tabs: {
      "Executive Summary": createTabContent("Revenue Department Presentation", "CRO is presenting. Selected report: Pipeline & Conversion.", buildMetrics([["Revenue","$1,428,230","↑ 18%"],["Pipeline","$384K","Active"],["Conversion","42%","Needs lift"],["Leads","256","Active"]]), "Keep reactivation active and review low-converting lead sources.", 90, [32,44,58,61,72,82], "Revenue is healthy because multiple lanes are active, but conversion still needs discipline."),
      "Pipeline": createTabContent("Pipeline Overview", "Pipeline health is strongest where routing quality and follow-up timing stay aligned.", buildMetrics([["Open Opportunities","74","Visible"],["Hot Leads","18","Priority"],["Quote Queue","26","Active"],["Average Age","4.2d","Watch"]]), "Protect fast follow-up on hot leads before expanding top-of-funnel volume.", 87, [28,39,49,55,67,74], "Aging opportunities are the clearest pipeline drag."),
      "Conversion": createTabContent("Conversion Control", "Conversion depends on lead quality, speed, and estimate discipline.", buildMetrics([["Close Rate","42%","Needs lift"],["Fast Follow-up","68%","Review"],["Estimate Entry","84%","Strong"],["Lost Reasons","7","Visible"]]), "Tighten follow-up timing before investing more into top-of-funnel growth.", 79, [24,33,40,48,57,66], "Conversion weakness is visible enough to correct without redesigning the lane."),
      "Reactivation": createTabContent("Legacy Reactivation", "Historical customer records remain one of the strongest controlled revenue lanes.", buildMetrics([["Legacy Records","18","Structured"],["Warm Leads","6","Ready"],["Callbacks","9","Queued"],["Recovered Revenue","$28K","Potential"]]), "Use legacy reactivation as a controlled growth lever this week.", 88, [26,35,44,57,66,77], "Reactivation is strong because it starts from warmer trust signals."),
      "Open Leads": createTabContent("Open Lead Queue", "The open lead queue is healthy but needs visible ownership across stages.", buildMetrics([["Qualified","31","This week"],["Waiting Review","9","Visible"],["No Owner","2","Fix"],["High Fit","7","Priority"]]), "Assign clean ownership to the unowned leads before the queue ages further.", 83, [22,31,43,51,62,70], "Ownership gaps are the clearest lead-queue risk."),
      "Forecast": createTabContent("Revenue Forecast", "Forecast remains directionally strong, but it still depends on conversion discipline.", buildMetrics([["Forecast","$384K","Active"],["Confidence","71%","Moderate"],["Backlog","$92K","Visible"],["Forecast Risk","2","Review"]]), "Treat forecast as useful guidance, not collected truth.", 81, [23,37,45,52,61,68], "Forecast quality improves when estimate entry stays disciplined.")
    },
    directors: [
      {
        id: "sales",
        label: "Sales",
        role: "Sales Director",
        askPrompt: "Sales Director, where is the highest-value opportunity today?",
        response: "The highest-value opportunity is in active estimates that still lack a same-day follow-up.",
        action: "Push same-day follow-up on top-value estimates and close ownership gaps.",
        tabs: {
          "Executive Summary": createTabContent("Sales Director Briefing", "Sales handoff and estimate-entry discipline are visible here.", buildMetrics([["Open Sales Leads","12","Priority"],["Estimates Entered","8","Visible"],["Fast Follow-up","68%","Review"],["Close Pressure","Moderate","Manage"]]), "Prioritize the highest-value estimates before lower-quality leads.", 84, [30,38,47,56,65,74], "Estimate entry is strong, but follow-up timing still leaks value."),
          "Priorities": createTabContent("Sales Priorities", "Priorities center on estimate follow-through and clean stage ownership.", buildMetrics([["Priority Estimates","5","Today"],["Owner Gaps","2","Fix"],["Unanswered Quotes","3","Review"],["Call-backs Due","4","Open"]]), "Close ownership gaps before volume rises further.", 79, [21,29,37,45,52,61], "Ownership discipline is the main constraint."),
          "Risks": createTabContent("Sales Risks", "The main sales risk is not pipeline size, but slow follow-up on high-intent leads.", buildMetrics([["Aging Quotes","3","Watch"],["Silent Leads","4","Review"],["Pricing Friction","2","Visible"],["Forecast Drift","1","Possible"]]), "Keep quote follow-up within one day where intent is highest.", 75, [18,24,31,40,49,58], "Risk is moderate because the lost value is visible."),
          "Dependencies": createTabContent("Sales Dependencies", "Sales depends on routing, estimate entry, and finance-ready visibility.", buildMetrics([["Routing Quality","91%","Strong"],["Estimate Accuracy","84%","Good"],["Finance Sync","78%","Stable"],["CRM Notes","87%","Strong"]]), "Keep estimate data finance-ready as soon as it is entered.", 82, [26,36,44,54,63,70], "Finance-ready estimate quality is the strongest dependency.")
        }
      },
      {
        id: "reactivation",
        label: "Reactivation",
        role: "Reactivation Director",
        askPrompt: "Reactivation Director, where should we focus first?",
        response: "Start with the warmest legacy customers where previous trust already exists.",
        action: "Pull the warmest historical segment forward and keep callbacks visible.",
        tabs: {
          "Executive Summary": createTabContent("Reactivation Director Briefing", "Legacy customer records are sorted and ready for controlled outreach.", buildMetrics([["Legacy Records","18","Structured"],["Warm Leads","6","Ready"],["Queued Outreach","9","Visible"],["Recovered Revenue","$28K","Potential"]]), "Start with the warmest historical customers before broadening the lane.", 88, [28,39,45,53,65,76], "Reactivation stays strong when it remains tightly segmented."),
          "Priorities": createTabContent("Reactivation Priorities", "Priority is driven by warmth, time since last contact, and service history.", buildMetrics([["Warm Segment","6","Priority"],["Dormant Segment","12","Later"],["Callbacks Due","4","Today"],["Reply Rate","53%","Healthy"]]), "Keep the warm segment moving before expanding into colder records.", 81, [20,31,40,48,59,68], "Warmth is the clearest reactivation priority rule."),
          "Risks": createTabContent("Reactivation Risks", "Reactivation risk comes from mixing low-fit and high-fit records in one queue.", buildMetrics([["Mixed Segments","1","Watch"],["Wrong Timing","2","Review"],["Record Gaps","2","Visible"],["Owner Delay","1","Recent"]]), "Preserve clean segments so the reactivation lane stays trustworthy.", 74, [17,26,34,41,50,57], "Segment drift is the main risk."),
          "Dependencies": createTabContent("Reactivation Dependencies", "Reactivation depends on clean legacy records, communication quality, and routing.", buildMetrics([["Record Quality","89%","Strong"],["Message Quality","91%","Strong"],["Routing Logic","86%","Healthy"],["Owner Visibility","100%","Clear"]]), "Keep historical data and follow-up notes synchronized.", 86, [29,41,48,57,67,73], "Data quality is the key dependency.")
        }
      },
      {
        id: "lead",
        label: "Lead",
        role: "Lead Director",
        askPrompt: "Lead Director, what is the current quality of incoming demand?",
        response: "Incoming demand is healthy, but channel quality still varies enough to require discipline.",
        action: "Reduce attention on weaker channels and protect the highest-fit lead sources.",
        tabs: {
          "Executive Summary": createTabContent("Lead Director Briefing", "Lead quality, source routing, and stage assignment are visible here.", buildMetrics([["Lead Sources","3","Core"],["Lead Volume","256","Active"],["Qualified This Week","31","Strong"],["Routing Quality","91%","Strong"]]), "Protect source quality over raw lead volume.", 85, [24,35,46,55,63,71], "Source quality is the clearest signal for revenue efficiency."),
          "Priorities": createTabContent("Lead Priorities", "Priority depends on fit score, response time, and routing cleanliness.", buildMetrics([["High-fit Leads","7","Priority"],["Source Reviews","2","Open"],["Unrouted","1","Fix"],["Fast Responses","74%","Good"]]), "Keep the highest-fit leads fast and visible.", 82, [21,33,42,51,60,67], "Fast response on high-fit leads is the main priority."),
          "Risks": createTabContent("Lead Risks", "Risk comes from weak-fit volume and inconsistent routing.", buildMetrics([["Low-fit Volume","12","Watch"],["Source Drift","2","Review"],["Duplicate Leads","1","Visible"],["Queue Age","4.1d","Moderate"]]), "Prevent weak-fit sources from distorting the queue.", 76, [19,28,34,43,51,59], "The queue ages fastest where quality is weakest."),
          "Dependencies": createTabContent("Lead Dependencies", "Lead performance depends on source definitions, routing, and sales handoff.", buildMetrics([["Source Map","9","Defined"],["Sales Handoff","84%","Healthy"],["Routing Rules","12","Active"],["Owner Reviews","5","Complete"]]), "Keep source labels aligned with the sales handoff system.", 81, [25,34,46,53,62,69], "Source taxonomy is the strongest lead dependency.")
        }
      }
    ]
  },
  cfo: {
    color: "#e7b64b",
    name: "CFO",
    role: "Chief Financial Officer",
    dept: "Finance",
    briefTitle: "Financial truth is active. Finance depth remains intentionally lean.",
    briefBullets: [
      "Core financial truth is visible from Stage A.",
      "Finance is active now, but with a narrower management surface than later stages.",
      "CFO is presenting finance department."
    ],
    board: { score: 89, word: "Stable", details: [{ label: "Revenue", value: "88", color: "var(--green)" }, { label: "Expenses", value: "76", color: "var(--gold)" }, { label: "Cash", value: "91", color: "var(--green)" }] },
    decisions: [
      { label: "Confirm expense controls on current marketing spend", priority: "High" },
      { label: "Review collected cash against open estimates", priority: "Medium" },
      { label: "Approve updated month-close reconciliation rule", priority: "Medium" }
    ],
    askPrompt: "CFO, why did profit margin drop this month?",
    response: "Finance is active in Stage A with real revenue and reconciliation truth, but profit review still runs on a leaner management surface than later stages.",
    action: "Use the current finance lane for real control decisions now, while keeping expectations lean until later stages broaden depth.",
    tabs: {
      "Executive Summary": createTabContent("Finance Department Presentation", "CFO is presenting. Selected report: Revenue Control.", buildMetrics([["Revenue","$248K","↑ 12%"],["Expenses","$161K","↑ 18%"],["Profit","$87K","↓ 6%"],["Cash Position","$142K","Stable"]]), "Treat Finance as real executive control now, but intentionally lean rather than fully expanded.", 89, [31,43,54,60,69,76], "Finance is stable, but expense growth is the clearest pressure signal."),
      "Profit & Loss": createTabContent("Profit & Loss", "Margin performance is still healthy enough to act from, but cost pressure is visible.", buildMetrics([["Gross Margin","42%","Stable"],["Net Margin","18%","↓"],["Marketing Spend","$48K","Review"],["Payroll Load","$59K","Visible"]]), "Control fast-growing expenses before they become a structural margin drag.", 78, [20,29,37,46,54,63], "Expense velocity matters more than raw cost totals."),
      "Cash Flow": createTabContent("Cash Flow", "Cash remains controlled because collection visibility is still clean.", buildMetrics([["Cash In","$248K","Collected"],["Cash Out","$161K","Visible"],["Timing Gaps","2","Review"],["Reserve Buffer","$142K","Healthy"]]), "Protect collection discipline and close timing gaps before month end.", 86, [27,39,46,56,64,73], "Cash flow is strong where collection stays current."),
      "Balance Sheet": createTabContent("Balance Sheet", "Balance-sheet visibility is usable and stable enough for executive review.", buildMetrics([["Current Assets","$198K","Stable"],["Current Liabilities","$51K","Visible"],["Receivables","$34K","Review"],["Payables","$19K","On time"]]), "Keep receivables from aging while liabilities remain controlled.", 84, [24,35,43,49,57,66], "Receivables aging is the biggest balance-sheet watchpoint."),
      "Budget vs Actual": createTabContent("Budget vs Actual", "Budget discipline is intact, but marketing and payroll need closer review.", buildMetrics([["Variance","6%","Watch"],["Budget Hit Rate","91%","Strong"],["Overruns","2","Visible"],["Savings","1","Captured"]]), "Review the two overruns before approving new discretionary spend.", 80, [21,30,39,47,55,61], "Variance is still manageable because it is localized."),
      "Risks": createTabContent("Finance Risks", "Finance risk is centered on expense growth and delayed outcome confirmation.", buildMetrics([["Open Confirmations","1","Pending"],["Expense Risks","2","Visible"],["Cash Timing Risks","1","Watch"],["Policy Drift","0","Clear"]]), "Use month-close review to remove the remaining ambiguity.", 74, [16,25,33,40,48,56], "The remaining risk is visible enough to correct quickly.")
    },
    directors: [
      {
        id: "revenue_control",
        label: "Revenue Control",
        role: "Revenue Control Director",
        askPrompt: "Revenue Control Director, what truth is still missing?",
        response: "Collected cash remains healthy, but one outcome still needs confirmation before the month closes cleanly.",
        action: "Close the remaining revenue confirmation before month-end.",
        tabs: {
          "Executive Summary": createTabContent("Revenue Control Director Briefing", "Estimate expectation and collected truth are aligned here.", buildMetrics([["Expected Revenue","$24.8K","Forecast"],["Collected Revenue","$18.4K","Confirmed"],["Revenue Gap","$6.4K","Visible"],["Control Status","Visible","Strong"]]), "Keep estimate truth and payment truth clearly separated.", 88, [31,42,49,57,66,74], "Visibility is strong because the gap is explicit."),
          "Priorities": createTabContent("Revenue Control Priorities", "Priority is to close the remaining collection gap without distorting forecast quality.", buildMetrics([["Open Gap","$6.4K","Review"],["Confirmed Outcomes","8","Strong"],["Pending Truth","1","Close"],["Forecast Confidence","71%","Moderate"]]), "Close the final pending truth item before month close.", 81, [20,31,39,48,55,63], "The final pending truth item matters more than adding new reporting layers."),
          "Risks": createTabContent("Revenue Control Risks", "Risk is not hidden failure, but treating forecast as collected truth.", buildMetrics([["Forecast Confusion","1","Watch"],["Open Truth Gaps","1","Review"],["Aging Estimates","2","Visible"],["Owner Delay","1","Recent"]]), "Keep forecast and collected truth explicitly separated in reviews.", 75, [18,26,34,41,47,55], "Risk stays controlled when definitions remain strict."),
          "Dependencies": createTabContent("Revenue Control Dependencies", "Revenue control depends on estimate entry, owner confirmations, and finance routing.", buildMetrics([["Estimate Accuracy","84%","Strong"],["Owner Confirmations","89%","Strong"],["Finance Routing","91%","Healthy"],["Service Sync","78%","Stable"]]), "Preserve clean estimate and service-to-finance handoff.", 83, [26,34,43,51,59,68], "Service-to-finance sync is the weakest dependency.")
        }
      },
      {
        id: "accounting",
        label: "Accounting",
        role: "Accounting Director",
        askPrompt: "Accounting Director, where is month-close at risk?",
        response: "Month-close risk is low, but it depends on clearing the remaining confirmation and keeping expenses categorized cleanly.",
        action: "Close the pending confirmation and lock expense categorization before close.",
        tabs: {
          "Executive Summary": createTabContent("Accounting Director Briefing", "Month-close, reconciliations, and categorization are visible here.", buildMetrics([["Close Checklist","91%","Complete"],["Pending Items","2","Visible"],["Categorization","96%","Strong"],["Reconciliations","8","Done"]]), "Finish the two pending items before close.", 87, [29,38,45,53,61,72], "Accounting is stable because the remaining work is explicit."),
          "Priorities": createTabContent("Accounting Priorities", "The accounting priorities are close discipline, categorization quality, and confirmation timing.", buildMetrics([["Priority Items","2","Today"],["Misclassified","1","Fix"],["Close Tasks","4","Open"],["Checks","12","Done"]]), "Keep close tasks narrow and explicit.", 82, [23,33,41,48,57,64], "Misclassification is the clearest avoidable risk."),
          "Risks": createTabContent("Accounting Risks", "The main accounting risk is ambiguity during close, not volume.", buildMetrics([["Ambiguous Entries","1","Watch"],["Late Inputs","2","Visible"],["Close Delay","Low","Stable"],["Audit Flags","0","Clear"]]), "Reduce ambiguity before adding more reporting work.", 78, [19,27,35,42,50,59], "Close risk is low because the ambiguities are visible."),
          "Dependencies": createTabContent("Accounting Dependencies", "Accounting depends on clean executive approvals and current source records.", buildMetrics([["Source Records","94%","Strong"],["Approvals Logged","5","Complete"],["Missing Notes","1","Review"],["Policy Sync","90%","Healthy"]]), "Keep source records and approval logs aligned.", 84, [27,35,44,51,60,69], "Record completeness is the accounting dependency that matters most.")
        }
      },
      {
        id: "payroll",
        label: "Payroll",
        role: "Payroll Director",
        askPrompt: "Payroll Director, is payroll contributing to margin pressure?",
        response: "Payroll is contributing to margin pressure, but it is still within controlled expectations.",
        action: "Review overtime and new-hire timing before the next budget checkpoint.",
        tabs: {
          "Executive Summary": createTabContent("Payroll Director Briefing", "Payroll remains controlled, but it still affects margin sensitivity.", buildMetrics([["Payroll Load","$59K","Visible"],["Overtime","$4.6K","Review"],["New-hire Timing","1","Pending"],["Staffing Load","Stable","Controlled"]]), "Review overtime before it becomes a recurring margin drag.", 79, [18,28,36,43,52,60], "Payroll is stable but deserves closer timing review."),
          "Priorities": createTabContent("Payroll Priorities", "Priorities center on overtime control and hiring timing.", buildMetrics([["Priority Review","Overtime","Today"],["Hiring Holds","1","Pending"],["Variance","3%","Low"],["Forecast Fit","82%","Healthy"]]), "Keep payroll timing disciplined before approving growth.", 77, [16,24,31,38,47,55], "Timing is the key payroll priority."),
          "Risks": createTabContent("Payroll Risks", "Payroll risk is still moderate and tied to timing, not payroll integrity.", buildMetrics([["Overtime Risk","2","Visible"],["Approval Gaps","0","Clear"],["Hiring Drift","1","Watch"],["Compliance Flags","0","Clear"]]), "Control overtime before it hardens into recurring spend.", 73, [15,21,29,36,44,51], "The risk is visible early enough to manage."),
          "Dependencies": createTabContent("Payroll Dependencies", "Payroll depends on HR timing, approvals, and finance forecasting discipline.", buildMetrics([["HR Timing","81%","Healthy"],["Approval Logs","100%","Clear"],["Forecast Sync","82%","Healthy"],["Expense Mapping","93%","Strong"]]), "Keep hiring timing tied tightly to forecast review.", 81, [22,31,39,46,54,62], "HR timing is the main payroll dependency.")
        }
      }
    ]
  },
  ceo: {
    color: "#e7b64b",
    name: "CEO",
    role: "Executive Leader",
    dept: "Executive",
    briefTitle: "The board is strong. Priority decisions are visible.",
    briefBullets: [
      "Board Score remains strong and the company is stable overall.",
      "Three current decisions remain visible at the President layer.",
      "CEO is presenting the executive summary."
    ],
    board: { score: 92, word: "Healthy", details: [{ label: "Board", value: "92", color: "var(--green)" }, { label: "Execution", value: "90", color: "var(--green)" }, { label: "Risk", value: "81", color: "var(--gold)" }] },
    decisions: [
      { label: "Confirm finance follow-through before month close", priority: "High" },
      { label: "Approve next operations staffing threshold", priority: "Medium" },
      { label: "Review executive expansion timing for scheduling", priority: "Medium" }
    ],
    askPrompt: "CEO, what needs my attention across the company today?",
    response: "Board Score is strong, but Finance requires review. One decision should be handled today.",
    action: "Review the finance decision and assign one accountability follow-up.",
    tabs: {
      "Executive Summary": createTabContent("Executive Summary Presentation", "CEO is presenting the executive summary.", buildMetrics([["Board Score","92","Active"],["Open Items","3","Review"],["Departments","7","Mapped"],["Status","Healthy","Council"]]), "Approve the finance decision and review expense growth before month close.", 92, [34,45,54,62,74,83], "The executive layer is stable because the main decisions are surfaced clearly."),
      "Company Health": createTabContent("Company Health", "The company is stable, and its strongest signals remain visible across core departments.", buildMetrics([["Operations","91","Strong"],["Revenue","90","Active"],["Finance","89","Stable"],["Customer Health","88","Healthy"]]), "Keep the strongest departments aligned before opening new expansion lanes.", 90, [31,43,51,61,72,80], "The company is healthiest where visibility and ownership stay tight."),
      "Decisions": createTabContent("President Decisions", "The highest-value decisions are concentrated and visible rather than scattered.", buildMetrics([["Critical","1","Today"],["Medium","2","Review"],["Escalated","0","Clear"],["Decision Load","3","Healthy"]]), "Keep decision load small and action-ready.", 85, [26,34,43,50,58,67], "Low-noise decision routing keeps the executive surface useful."),
      "Executive Reports": createTabContent("Executive Reporting", "Executive reporting remains short, useful, and tied to action.", buildMetrics([["Reports Ready","7","Available"],["Board Narrative","Stable","Clear"],["Missing Inputs","1","Finance"],["Owner Review","On","Active"]]), "Preserve short, action-oriented reporting language.", 87, [24,35,46,55,63,71], "Reporting quality matters more than reporting volume."),
      "Risks": createTabContent("Executive Risks", "Risks are mostly visible and moderate, not hidden or systemic.", buildMetrics([["Open Risks","3","Visible"],["Critical Risks","1","Finance"],["Muted Risks","2","Watch"],["Governance Drift","Low","Stable"]]), "Use the visible risk list rather than guessing where instability might be.", 78, [19,28,36,44,53,61], "Finance remains the clearest risk focus."),
      "Action Plan": createTabContent("Executive Action Plan", "The action plan translates board visibility into concrete next steps.", buildMetrics([["Next Actions","5","Defined"],["Blocked","1","Finance"],["Owned","4","Clear"],["Due Today","2","Priority"]]), "Push today’s two priority actions through before adding new work.", 83, [22,33,41,48,57,68], "The executive layer stays useful when action ownership is explicit.")
    },
    directors: [
      {
        id: "strategy",
        label: "Strategy",
        role: "Strategy Director",
        askPrompt: "Strategy Director, what should I keep fixed this month?",
        response: "Keep the company focused on strong Stage A execution and do not unlock new layers before the signals support them.",
        action: "Preserve focus on Stage A discipline before any expansion decision.",
        tabs: {
          "Executive Summary": createTabContent("Strategy Director Briefing", "Strategic focus is tied to disciplined Stage A execution.", buildMetrics([["Primary Focus","Stage A","Locked"],["Expansion Gate","Scheduling","Next"],["Board Alignment","Strong","Clear"],["Risk Mode","Controlled","Stable"]]), "Do not unlock new layers before the signals support them.", 91, [32,41,51,61,72,81], "Focus is strongest when it stays narrow."),
          "Priorities": createTabContent("Strategy Priorities", "Strategic priorities center on execution discipline, not added breadth.", buildMetrics([["Priority Tracks","3","Visible"],["Expansion Requests","1","Pending"],["Focus Drift","Low","Stable"],["Decision Horizon","30d","Clear"]]), "Keep focus narrow until the next gate is genuinely ready.", 85, [24,31,40,48,57,65], "Premature expansion is the central strategy risk."),
          "Risks": createTabContent("Strategy Risks", "Strategy risk comes from broadening too early rather than missing ideas.", buildMetrics([["Expansion Drift","1","Watch"],["Priority Conflict","0","Clear"],["Signal Gaps","2","Visible"],["Timing Risk","Moderate","Manage"]]), "Use the existing signal system before adding strategy complexity.", 78, [18,25,34,41,49,57], "Timing matters more than breadth."),
          "Dependencies": createTabContent("Strategy Dependencies", "Strategy depends on stable reporting, operations, revenue, and finance truth.", buildMetrics([["Ops Visibility","91%","Strong"],["Revenue Clarity","90%","Strong"],["Finance Truth","89%","Stable"],["Reporting Quality","87%","Healthy"]]), "Keep cross-department truth clean before making timing decisions.", 88, [27,38,47,55,63,71], "Truth quality is the core strategy dependency.")
        }
      },
      {
        id: "executive_reporting",
        label: "Executive",
        role: "Executive Reporting Director",
        askPrompt: "Executive Reporting Director, what is the sharpest signal right now?",
        response: "Finance is the sharpest current signal because one remaining confirmation still affects the board narrative.",
        action: "Keep the executive brief short and oriented around the finance signal.",
        tabs: {
          "Executive Summary": createTabContent("Executive Reporting Director Briefing", "Executive reporting consolidates the strongest signals into one board-facing narrative.", buildMetrics([["Reporting Status","Live","Strong"],["Primary Signal","Finance","Review"],["Brief Length","Short","Good"],["Decision Load","3","Visible"]]), "Keep the brief short, clear, and tied to action.", 89, [28,39,47,56,64,72], "The brief is strongest when it protects signal clarity."),
          "Priorities": createTabContent("Reporting Priorities", "Priorities center on brevity, relevance, and signal integrity.", buildMetrics([["Top Signals","3","Visible"],["Muted Noise","High","Good"],["Missing Inputs","1","Finance"],["Board Readiness","92%","Strong"]]), "Report fewer things more clearly.", 86, [23,34,43,51,60,69], "Noise control is a core reporting priority."),
          "Risks": createTabContent("Reporting Risks", "Reporting risk comes from dilution, not lack of available detail.", buildMetrics([["Noise Risk","2","Watch"],["Signal Drift","1","Visible"],["Overload","Low","Stable"],["Narrative Gaps","1","Finance"]]), "Do not overload the President surface with low-value details.", 79, [19,28,35,43,51,58], "Narrative drift is the main reporting risk."),
          "Dependencies": createTabContent("Reporting Dependencies", "Reporting depends on high-quality departmental inputs and disciplined summaries.", buildMetrics([["Input Quality","89%","Strong"],["Summary Accuracy","93%","Strong"],["Department Sync","87%","Healthy"],["Escalation Notes","82%","Good"]]), "Keep departmental inputs concise and current.", 84, [25,35,44,52,60,68], "Input quality is the main reporting dependency.")
        }
      },
      {
        id: "accountability",
        label: "Accountability",
        role: "Accountability Director",
        askPrompt: "Accountability Director, where is follow-through slipping?",
        response: "The biggest accountability gap remains financial confirmation discipline.",
        action: "Close the remaining confirmation and keep open follow-through visible until resolved.",
        tabs: {
          "Executive Summary": createTabContent("Accountability Director Briefing", "Accountability is strongest where commitment status stays visible.", buildMetrics([["Main Gap","Finance","Visible"],["Follow-through","89%","Strong"],["Missing Updates","2","Review"],["Escalation Ready","Yes","Prepared"]]), "Keep owner confirmation discipline tight.", 87, [27,36,45,54,63,71], "Follow-through is usable because the gap is named."),
          "Priorities": createTabContent("Accountability Priorities", "Priority is explicit ownership and visible next actions.", buildMetrics([["Open Commitments","5","Tracked"],["Ownerless","1","Fix"],["Due Today","2","Priority"],["Escalated","1","Visible"]]), "Assign ownership before adding another layer of process.", 82, [22,31,39,47,55,64], "Ownership gaps create the biggest follow-through risk."),
          "Risks": createTabContent("Accountability Risks", "Risk comes from ambiguity and quiet slippage, not volume.", buildMetrics([["Quiet Drift","2","Watch"],["Hidden Tasks","0","Clear"],["Ambiguous Owners","1","Review"],["Late Signals","1","Visible"]]), "Eliminate quiet drift before it becomes a trust problem.", 76, [18,26,34,42,49,57], "Ambiguity is the root accountability risk."),
          "Dependencies": createTabContent("Accountability Dependencies", "Accountability depends on reporting quality, explicit ownership, and escalation logic.", buildMetrics([["Reporting Quality","87%","Healthy"],["Ownership Clarity","91%","Strong"],["Escalation Logic","82%","Good"],["Action Tracking","88%","Strong"]]), "Keep action tracking and escalation logic aligned.", 84, [24,35,43,52,61,69], "Ownership clarity is the key accountability dependency.")
        }
      }
    ]
  },
  cso: {
    color: "#a569ff",
    name: "CSO",
    role: "Chief Success Officer",
    dept: "Customer Success",
    briefTitle: "Customer continuity is active. Stage A depth remains intentionally narrower.",
    briefBullets: [
      "Customer continuity is already real and usable in Stage A.",
      "Support, retention, and reviews stay active with intentionally reduced depth.",
      "CSO is presenting customer success."
    ],
    board: { score: 88, word: "Stable", details: [{ label: "Retention", value: "88", color: "var(--green)" }, { label: "Support", value: "84", color: "var(--green)" }, { label: "Reviews", value: "76", color: "var(--gold)" }] },
    decisions: [
      { label: "Approve faster response standard for reviews", priority: "High" },
      { label: "Review complaint follow-through ownership", priority: "Medium" },
      { label: "Confirm referral support process for active customers", priority: "Medium" }
    ],
    askPrompt: "CSO, where is the biggest customer continuity risk right now?",
    response: "Customer success is active now, but on a narrower management scope. Continuity signals are real and usable even before later-stage depth expands.",
    action: "Use the current customer-success lane for real follow-through decisions now, while keeping the scope intentionally tighter in Stage A.",
    tabs: {
      "Executive Summary": createTabContent("Customer Success Presentation", "CSO is presenting. Selected report: Retention.", buildMetrics([["Retention","88%","Stable"],["Reviews","7","Need reply"],["Complaints","2","Open"],["Referrals","14","Active"]]), "Treat Customer Success as a real operating lane now, but with intentionally reduced depth.", 88, [29,40,47,56,64,72], "Customer success is healthy, but it still depends on timely follow-through."),
      "Retention": createTabContent("Retention Control", "Retention is healthy because continuity signals are already visible.", buildMetrics([["Retention","88%","Stable"],["Watch Accounts","2","Visible"],["Renewal Pressure","Low","Controlled"],["Next-step Clarity","Good","Visible"]]), "Preserve next-step visibility after every customer interaction.", 86, [27,36,45,53,60,68], "Visibility is what protects retention."),
      "Reviews": createTabContent("Review Response", "Review response discipline needs more attention than overall review volume.", buildMetrics([["Open Reviews","7","Need reply"],["Response Speed","Moderate","Review"],["Escalated Reviews","1","Visible"],["Reputation Health","Stable","Good"]]), "Respond faster before small delays turn into reputation drift.", 77, [18,28,35,41,50,58], "Slow review handling is the clearest success-layer weakness."),
      "Referrals": createTabContent("Referral Success", "Referrals are active and should be treated as part of customer health.", buildMetrics([["Referral Sources","14","Active"],["New Referral Leads","5","This week"],["Partner Follow-up","3","Open"],["Customer Advocates","8","Strong"]]), "Treat referral follow-through as both growth and customer-success work.", 82, [22,34,41,49,57,66], "Referral energy is highest where customer trust is strongest."),
      "Complaints": createTabContent("Complaint Resolution", "Complaints are contained, but still need visible action ownership.", buildMetrics([["Open Complaints","2","Visible"],["Critical","0","Clear"],["Next Actions","2","Defined"],["Avg Resolution","1.8d","Healthy"]]), "Close the two visible complaint items before they age.", 80, [21,31,39,46,55,63], "Complaint risk remains low because it is visible."),
      "Customer Health": createTabContent("Customer Health", "Customer health combines retention, support, reviews, and continuity into one view.", buildMetrics([["Health Score","88","Stable"],["At-risk Customers","2","Watch"],["Support Load","2","Open"],["Referral Health","Good","Strong"]]), "Use continuity signals early instead of waiting for churn pressure.", 85, [25,35,43,52,61,70], "Continuity signals are the strongest health indicator.")
    },
    directors: [
      {
        id: "support",
        label: "Support",
        role: "Support Director",
        askPrompt: "Support Director, what needs response today?",
        response: "The highest priority is the two visible support items that are still waiting for clean follow-through.",
        action: "Close the two waiting support items and keep the history visible.",
        tabs: {
          "Executive Summary": createTabContent("Support Director Briefing", "Support requests and customer follow-through are visible here.", buildMetrics([["Open Support","2","Visible"],["Avg Response","2.1h","Healthy"],["Escalations","1","Watch"],["History Quality","91%","Strong"]]), "Keep support tied to customer history and fast response.", 84, [26,35,42,50,57,66], "Support stays healthy when history and response stay connected."),
          "Priorities": createTabContent("Support Priorities", "Priority is speed, context, and visible ownership.", buildMetrics([["Priority Items","2","Today"],["Owner Gaps","0","Clear"],["Context Gaps","1","Review"],["Open Threads","4","Visible"]]), "Keep the two priority support items moving today.", 80, [20,28,36,44,53,60], "Context gaps are the main support friction."),
          "Risks": createTabContent("Support Risks", "Risk is low, but it rises when support loses customer history context.", buildMetrics([["History Risk","1","Watch"],["Delayed Replies","1","Review"],["Escalation Risk","1","Visible"],["Churn Pressure","Low","Stable"]]), "Preserve history context in every support exchange.", 76, [17,26,33,40,49,56], "History quality is the main support risk."),
          "Dependencies": createTabContent("Support Dependencies", "Support depends on service visibility, communications, and customer record quality.", buildMetrics([["Service Sync","86%","Healthy"],["Comms Quality","94%","Strong"],["Record Quality","91%","Strong"],["Owner Notes","84%","Good"]]), "Keep support connected to the same customer record surface.", 83, [24,34,42,50,59,67], "Customer record quality is the strongest support dependency.")
        }
      },
      {
        id: "retention",
        label: "Retention",
        role: "Retention Director",
        askPrompt: "Retention Director, what signal is most important right now?",
        response: "The most important signal is whether next steps remain visible after each completed interaction.",
        action: "Audit next-step visibility on the current watch accounts.",
        tabs: {
          "Executive Summary": createTabContent("Retention Director Briefing", "Retention monitors continuity and next-step clarity.", buildMetrics([["Retention Signal","Stable","Healthy"],["Watch Accounts","2","Visible"],["Reopen Risk","Low","Controlled"],["Next-step Visibility","Good","Strong"]]), "Preserve next-step clarity after every meaningful interaction.", 86, [26,37,44,52,60,67], "Retention strength comes from visible continuity."),
          "Priorities": createTabContent("Retention Priorities", "Priority is continuity, customer memory, and next-step ownership.", buildMetrics([["Priority Accounts","2","Watch"],["Hidden Gaps","0","Clear"],["Follow-up Due","3","Open"],["Continuity Quality","89%","Strong"]]), "Keep next-step ownership explicit.", 81, [22,31,40,48,55,63], "Follow-up ownership matters more than volume."),
          "Risks": createTabContent("Retention Risks", "Risk is still low, but it appears first as silent continuity drift.", buildMetrics([["Silent Drift","1","Watch"],["Complaint Spillover","1","Visible"],["Reopen Risk","2","Review"],["Churn Signals","0","Clear"]]), "Use watch accounts to catch drift before it becomes churn.", 75, [18,24,31,39,48,56], "Silent drift is the core retention risk."),
          "Dependencies": createTabContent("Retention Dependencies", "Retention depends on service outcomes, support follow-through, and customer memory.", buildMetrics([["Service Outcomes","90%","Strong"],["Support Follow-through","84%","Healthy"],["Record Depth","88%","Strong"],["Owner Visibility","100%","Clear"]]), "Keep continuity tied to the main customer record.", 84, [24,35,43,52,59,68], "Support follow-through is the retention dependency to watch.")
        }
      },
      {
        id: "reviews",
        label: "Reviews",
        role: "Reviews Director",
        askPrompt: "Reviews Director, what should be handled first?",
        response: "The oldest open reviews should be handled first because response speed is the current weakness.",
        action: "Clear the oldest review responses before opening new requests.",
        tabs: {
          "Executive Summary": createTabContent("Reviews Director Briefing", "Reviews are part of customer continuity, not just public image.", buildMetrics([["Open Reviews","7","Need reply"],["Response Speed","Moderate","Review"],["Escalated","1","Visible"],["Reputation Health","Stable","Good"]]), "Respond faster to the oldest open reviews.", 77, [19,27,36,42,49,57], "Review speed is the main weakness in the customer-success layer."),
          "Priorities": createTabContent("Review Priorities", "Priority is driven by age, tone, and customer value.", buildMetrics([["Oldest Open","3d","Review"],["Priority Reviews","2","Today"],["Positive Follow-up","4","Queued"],["Escalations","1","Visible"]]), "Handle the oldest open reviews first.", 79, [20,28,35,43,52,60], "Age is the clearest review priority signal."),
          "Risks": createTabContent("Review Risks", "Risk is moderate where public silence lasts too long.", buildMetrics([["Silence Risk","2","Watch"],["Tone Risk","1","Review"],["Escalation Risk","1","Visible"],["Advocacy Loss","Low","Manage"]]), "Avoid response delays that look like indifference.", 73, [16,25,33,40,48,55], "Silence is the main review risk."),
          "Dependencies": createTabContent("Review Dependencies", "Reviews depend on support context, service outcomes, and customer memory.", buildMetrics([["Support Context","84%","Healthy"],["Service Outcomes","90%","Strong"],["Customer Memory","88%","Strong"],["Owner Review","Yes","On"]]), "Keep review work inside the same customer context lane.", 82, [23,34,42,50,57,66], "Support context is the key review dependency.")
        }
      }
    ]
  },
  cmo: {
    color: "#e15ab2",
    name: "CMO",
    role: "Chief Marketing Officer",
    dept: "Marketing",
    briefTitle: "Demand is growing. ROI needs discipline.",
    briefBullets: [
      "Lead generation is active and the website is supporting conversion.",
      "Paid spend needs cleaner ROI scrutiny before scaling.",
      "CMO is presenting marketing department."
    ],
    board: { score: 83, word: "Mapped", details: [{ label: "Demand", value: "86", color: "var(--green)" }, { label: "ROI", value: "72", color: "var(--gold)" }, { label: "SEO", value: "81", color: "var(--green)" }] },
    decisions: [
      { label: "Pause low-ROI campaigns before next spend increase", priority: "High" },
      { label: "Review website conversion friction points", priority: "Medium" },
      { label: "Confirm SEO brief priority for next content sprint", priority: "Medium" }
    ],
    askPrompt: "CMO, what marketing layer is available right now?",
    response: "Marketing generated lead growth, but spend is increasing. Campaign ROI should be reviewed before scaling.",
    action: "Review campaign ROI and pause weak campaigns before increasing budget.",
    tabs: {
      "Executive Summary": createTabContent("Marketing Department Presentation", "CMO is presenting. Selected report: Campaign Growth.", buildMetrics([["Leads","256","Active"],["Ad Spend","$48K","Review"],["SEO Lift","12%","Up"],["Website Conv.","3.8%","Stable"]]), "Pause low-ROI campaigns before the next budget cycle.", 83, [18,29,37,46,57,66], "Marketing is useful where it stays connected to real demand and ROI."),
      "Campaigns": createTabContent("Campaign Performance", "Campaign growth is visible, but ROI quality still needs attention.", buildMetrics([["Campaigns Live","4","Tracked"],["Best ROI","Referral","Strong"],["Weak Channels","2","Review"],["Attribution Quality","84%","Healthy"]]), "Scale only the channels that preserve quality and attribution.", 79, [19,27,35,44,52,61], "Attribution quality matters as much as lead volume."),
      "SEO": createTabContent("SEO Visibility", "SEO is growing, but it still follows the same demand and revenue discipline rules.", buildMetrics([["Organic Lift","12%","Up"],["Priority Pages","5","Active"],["Brief Gaps","2","Review"],["Intent Fit","Strong","Healthy"]]), "Close brief gaps before expanding page volume further.", 81, [21,31,38,47,56,64], "SEO growth is healthiest when it aligns with actual lead intent."),
      "Website": createTabContent("Website Conversion", "The website is converting, but it still needs tighter fit between message and next action.", buildMetrics([["Conversion","3.8%","Stable"],["Bounce Risk","Moderate","Watch"],["CTA Fit","Good","Healthy"],["Friction Points","2","Visible"]]), "Resolve the two visible friction points before new campaigns scale traffic.", 78, [17,26,34,42,50,58], "Conversion friction is visible enough to correct."),
      "Social": createTabContent("Social Distribution", "Social supports the launch narrative, but it should stay grounded in operational proof.", buildMetrics([["Channels","5","Core"],["Top Post","Founder Launch","Strong"],["Drafts Ready","3","Visible"],["Reply Load","4","Open"]]), "Keep the social layer operational and proof-driven.", 77, [16,24,31,40,48,55], "Proof-first messaging is the strongest social fit."),
      "ROI": createTabContent("ROI Control", "ROI is visible enough to guide decisions, but weak campaigns still need pruning.", buildMetrics([["ROI Review","2","Weak"],["Best Channel","Referral","Strong"],["Paid Fit","Moderate","Review"],["Budget Risk","1","Visible"]]), "Pause weak campaigns before adding fresh spend.", 74, [15,23,31,39,47,54], "Weak paid fit is the main ROI issue.")
    },
    directors: [
      {
        id: "advertising",
        label: "Advertising",
        role: "Advertising Director",
        askPrompt: "Advertising Director, what should we stop funding first?",
        response: "The weakest paid channel should be paused before any new campaign money is added.",
        action: "Pause the weakest paid channel and reallocate only after review.",
        tabs: {
          "Executive Summary": createTabContent("Advertising Director Briefing", "Advertising remains useful only where quality and ROI stay connected.", buildMetrics([["Paid Channels","3","Active"],["Weak ROI","1","Visible"],["Attribution","84%","Healthy"],["Spend","$48K","Review"]]), "Pause the weakest paid channel before increasing spend.", 76, [15,23,32,40,48,56], "Paid growth without ROI discipline creates avoidable drag."),
          "Priorities": createTabContent("Advertising Priorities", "Priority is pruning weak spend and protecting attribution clarity.", buildMetrics([["Priority Reviews","2","Today"],["Weak Ads","4","Review"],["Best Segment","Referral","Strong"],["Budget Flex","Low","Tight"]]), "Use review time to protect attribution, not just cut cost.", 74, [14,22,30,39,46,53], "Attribution clarity should drive ad decisions."),
          "Risks": createTabContent("Advertising Risks", "Risk is mainly weak-fit spend, not lack of channel options.", buildMetrics([["Weak-fit Spend","$9K","Watch"],["Attribution Drift","1","Review"],["Noise Traffic","Moderate","Visible"],["Brand Risk","Low","Stable"]]), "Keep paid traffic from outrunning message fit.", 71, [12,20,27,34,42,49], "Message-fit drift is the main ad risk."),
          "Dependencies": createTabContent("Advertising Dependencies", "Advertising depends on landing-page fit, attribution, and demand clarity.", buildMetrics([["Landing Fit","78%","Healthy"],["Attribution","84%","Good"],["Demand Clarity","86%","Strong"],["Budget Rules","91%","Strong"]]), "Keep ad performance tied directly to landing-page reality.", 79, [18,26,35,43,51,59], "Landing fit is the advertising dependency that matters most.")
        }
      },
      {
        id: "seo",
        label: "SEO",
        role: "SEO Director",
        askPrompt: "SEO Director, where is growth being blocked?",
        response: "Growth is being blocked by missing briefs and incomplete publishing follow-through.",
        action: "Close the brief gaps before expanding the content queue.",
        tabs: {
          "Executive Summary": createTabContent("SEO Director Briefing", "SEO is growing, but the queue is still constrained by execution gaps.", buildMetrics([["Organic Lift","12%","Up"],["Priority Pages","5","Active"],["Brief Gaps","2","Review"],["Publishing Ready","3","Queued"]]), "Close brief gaps before publishing volume increases.", 80, [18,27,35,44,53,61], "Execution gaps matter more than demand mapping."),
          "Priorities": createTabContent("SEO Priorities", "Priority is briefs, page completion, and intent fit.", buildMetrics([["Priority Briefs","2","Today"],["Pages Ready","3","Queued"],["Intent Fit","Strong","Healthy"],["Blocked Pages","2","Review"]]), "Resolve blocked pages before broadening the roadmap.", 77, [16,24,33,41,50,58], "Brief readiness is the clearest SEO priority."),
          "Risks": createTabContent("SEO Risks", "Risk comes from incomplete execution rather than poor opportunity.", buildMetrics([["Execution Risk","2","Visible"],["Intent Drift","1","Watch"],["Publishing Delay","2","Review"],["Quality Drop","Low","Stable"]]), "Do not publish rushed pages just to increase surface area.", 73, [15,22,29,36,44,52], "Rushed execution is the core SEO risk."),
          "Dependencies": createTabContent("SEO Dependencies", "SEO depends on briefs, website fit, and distribution support.", buildMetrics([["Brief Health","78%","Good"],["Website Fit","81%","Strong"],["Distribution Sync","74%","Review"],["Owner Review","Yes","On"]]), "Keep briefs and website messaging tightly aligned.", 79, [17,26,34,42,50,57], "Distribution sync is the weakest SEO dependency.")
        }
      },
      {
        id: "website",
        label: "Website",
        role: "Website Director",
        askPrompt: "Website Director, what feels weakest in the conversion path?",
        response: "The conversion path is functional, but two friction points still interrupt momentum.",
        action: "Resolve the visible CTA and trust friction before new demand campaigns scale.",
        tabs: {
          "Executive Summary": createTabContent("Website Director Briefing", "The website supports conversion, but still needs tighter friction control.", buildMetrics([["Conversion","3.8%","Stable"],["Friction Points","2","Visible"],["CTA Fit","Good","Healthy"],["Page Depth","Strong","Stable"]]), "Resolve the two visible friction points before scaling traffic.", 78, [16,25,34,42,50,59], "Conversion quality is good enough to improve from, not rebuild."),
          "Priorities": createTabContent("Website Priorities", "Priority is CTA clarity, trust, and path continuity.", buildMetrics([["Priority Fixes","2","Today"],["Trust Gaps","1","Review"],["CTA Tests","3","Queued"],["Owner Reviews","4","Complete"]]), "Fix path continuity before adding more experiments.", 76, [15,23,31,40,48,56], "CTA clarity matters more than adding more sections."),
          "Risks": createTabContent("Website Risks", "Risk is moderate and concentrated in conversion friction, not structural failure.", buildMetrics([["Bounce Risk","Moderate","Watch"],["Trust Risk","1","Visible"],["Flow Breaks","2","Review"],["Load Risk","Low","Stable"]]), "Remove visible friction before it compounds under higher traffic.", 72, [14,21,29,37,45,52], "Friction, not volume, is the main website risk."),
          "Dependencies": createTabContent("Website Dependencies", "The website depends on message fit, campaign fit, and trust continuity.", buildMetrics([["Message Fit","84%","Strong"],["Campaign Fit","78%","Good"],["Trust Continuity","82%","Healthy"],["Conversion Tracking","91%","Strong"]]), "Keep the website inside the same operating narrative as the rest of the system.", 81, [18,27,35,43,51,60], "Message fit is the strongest website dependency.")
        }
      }
    ]
  },
  hr: {
    color: "#35d8f4",
    name: "CHRO",
    role: "Chief Human Resources Officer",
    dept: "People",
    briefTitle: "People structure is mapped. Stage C controls remain reserved.",
    briefBullets: [
      "People-management structure is visible before activation.",
      "Readiness can be reviewed without implying live HR-system depth.",
      "CHRO is presenting people department."
    ],
    board: { score: 82, word: "Prepared", details: [{ label: "Performance", value: "91", color: "var(--green)" }, { label: "Training", value: "78", color: "var(--gold)" }, { label: "Accountability", value: "95", color: "var(--green)" }] },
    decisions: [
      { label: "Keep people structure mapped while Stage C controls remain reserved", priority: "High" },
      { label: "Review staffing readiness without implying live HR-system depth", priority: "Medium" },
      { label: "Preserve accountability visibility for future people automation", priority: "Medium" }
    ],
    askPrompt: "CHRO, what is the current people-layer status?",
    response: "The people layer is mapped and reviewable, but full people-management control is reserved for Stage C.",
    action: "Keep people structure visible and preserve clean readiness signals until Stage C activates.",
    tabs: {
      "Executive Summary": createTabContent("People Department Presentation", "CHRO is presenting. Selected report: People Readiness.", buildMetrics([["Training","2","Pending"],["Hiring","1","Open"],["Performance","91%","Good"],["Accountability","95%","Strong"]]), "Keep people readiness visible without treating CHRO as fully active yet.", 82, [18,29,36,45,55,64], "The people layer is mapped early so Stage C has a clean base later."),
      "Training": createTabContent("Training Readiness", "Training is visible as a readiness input, not yet as a full CHRO-system control lane.", buildMetrics([["Pending Updates","2","Review"],["Training Completion","86%","Good"],["New Modules","1","Queued"],["Readiness","Prepared","Stable"]]), "Track the two pending updates so Stage C starts from cleaner readiness.", 79, [16,24,33,42,50,58], "Training quality is a future people-management dependency."),
      "Hiring": createTabContent("Hiring Readiness", "Hiring stays mapped to the company structure, but deeper people-control logic is reserved for Stage C.", buildMetrics([["Open Req","1","Visible"],["Ready Candidates","3","Strong"],["Urgency","Moderate","Review"],["Onboarding Capacity","Good","Healthy"]]), "Review hiring timing without treating this as a live CHRO operating system.", 77, [15,23,31,39,48,56], "Timing still matters, but the lane is structurally visible first."),
      "Performance": createTabContent("Performance Signals", "Performance signals are visible so future people automation starts from known accountability patterns.", buildMetrics([["Performance","91%","Strong"],["Low Signals","2","Watch"],["Reviews Due","3","Visible"],["Recognition Wins","5","Strong"]]), "Preserve performance visibility without expanding process depth too early.", 84, [21,30,39,47,56,65], "Performance visibility is groundwork for Stage C people management."),
      "Staffing": createTabContent("Staffing Readiness", "Staffing is visible as a planning lane, but should not imply full people-management activation yet.", buildMetrics([["Current Team","14","Active"],["Slack Capacity","Low","Watch"],["Coverage Fit","Good","Healthy"],["Expansion Need","1","Pending"]]), "Keep staffing decisions tied to operational truth while Stage C remains reserved.", 76, [15,24,31,39,48,55], "Staffing belongs inside the future people-control layer."),
      "Accountability": createTabContent("People Accountability", "Accountability visibility exists early so the President can later govern people performance with stronger automation.", buildMetrics([["Accountability","95%","Strong"],["Missing Updates","1","Review"],["Late Notes","1","Visible"],["Escalation Fit","Good","Prepared"]]), "Use accountability visibility as preparation for Stage C, not as proof of full HR depth now.", 88, [23,33,41,49,58,67], "Accountability is the clearest bridge into later people automation.")
    },
    directors: [
      {
        id: "people_ops",
        label: "People",
        role: "People Ops Director",
        askPrompt: "People Ops Director, what should we keep stable first?",
        response: "Keep reporting discipline stable first, because it becomes the base of the Stage C people-management layer.",
        action: "Protect staff activity reporting and readiness signals before Stage C people controls activate.",
        tabs: {
          "Executive Summary": createTabContent("People Ops Director Briefing", "People operations are structurally mapped so Stage C can activate from clean inputs later.", buildMetrics([["Ops State","Prepared","Stable"],["Signal Quality","Good","Healthy"],["Reporting Drift","Low","Controlled"],["Expansion Fit","Strong","Ready"]]), "Protect people reporting before adding deeper process layers.", 80, [18,26,34,42,51,60], "People ops is strongest where signals remain clean."),
          "Priorities": createTabContent("People Ops Priorities", "Priority is signal quality, clean updates, and readiness timing.", buildMetrics([["Priority Reviews","2","Today"],["Missing Notes","1","Fix"],["Readiness Checks","3","Visible"],["Process Load","Light","Healthy"]]), "Use signal quality as the first people-ops filter.", 77, [16,23,31,39,47,55], "Readiness checks are the central people-ops priority."),
          "Risks": createTabContent("People Ops Risks", "Risk is low, but it grows when reporting discipline loosens.", buildMetrics([["Reporting Risk","1","Watch"],["Signal Gaps","2","Review"],["Process Drift","Low","Stable"],["Coordination Risk","1","Visible"]]), "Do not let reporting quality decay as new work arrives.", 72, [14,21,29,36,44,52], "Signal gaps are the main people-ops risk."),
          "Dependencies": createTabContent("People Ops Dependencies", "People ops depends on operational reporting, manager follow-through, and training updates.", buildMetrics([["Ops Reporting","91%","Strong"],["Manager Follow-through","88%","Healthy"],["Training Sync","79%","Review"],["Owner Visibility","100%","Clear"]]), "Keep training and reporting synchronized.", 81, [18,28,36,44,53,61], "Training sync is the weakest dependency.")
        }
      },
      {
        id: "training",
        label: "Training",
        role: "Training Director",
        askPrompt: "Training Director, what should close before expansion?",
        response: "The two pending training updates should close so the future people-management layer starts from cleaner readiness.",
        action: "Close the two pending training items and preserve readiness visibility until Stage C.",
        tabs: {
          "Executive Summary": createTabContent("Training Director Briefing", "Training readiness is visible as an input lane before the full people-management layer activates.", buildMetrics([["Pending Updates","2","Review"],["Completion","86%","Good"],["Urgent Gaps","1","Visible"],["Expansion Blockers","2","Known"]]), "Close the pending updates before Stage C adds deeper people controls.", 79, [17,24,32,41,49,57], "Training is visible early so later people automation starts cleaner."),
          "Priorities": createTabContent("Training Priorities", "Priority is closure of known gaps, not adding more content.", buildMetrics([["Priority Modules","2","Today"],["Refresh Needed","1","Visible"],["Urgent Audience","3","Defined"],["Completion Pressure","Moderate","Review"]]), "Use training work to reduce risk, not add surface area.", 76, [15,22,30,38,46,54], "Closure is the core training priority."),
          "Risks": createTabContent("Training Risks", "Risk rises when pending training blocks staffing readiness.", buildMetrics([["Blocker Risk","2","Visible"],["Missed Refresh","1","Watch"],["Knowledge Drift","1","Review"],["Owner Delay","Low","Stable"]]), "Do not approve new staffing until the blockers close.", 72, [14,20,28,35,43,50], "Staffing readiness is the main training risk multiplier."),
          "Dependencies": createTabContent("Training Dependencies", "Training depends on current workflows, manager input, and signal visibility.", buildMetrics([["Workflow Fit","84%","Healthy"],["Manager Input","82%","Good"],["Signal Visibility","91%","Strong"],["Owner Review","Yes","On"]]), "Keep training tied to current workflow reality.", 80, [17,25,33,41,50,58], "Workflow fit is the strongest training dependency.")
        }
      },
      {
        id: "hiring",
        label: "Hiring",
        role: "Hiring Director",
        askPrompt: "Hiring Director, is new hiring actually justified now?",
        response: "New hiring may be justified soon, but this lane should remain a readiness view until Stage C brings fuller people-management control.",
        action: "Keep hiring in review until workload and training both support expansion and Stage C activates.",
        tabs: {
          "Executive Summary": createTabContent("Hiring Director Briefing", "Hiring remains visible as a planning lane, but should stay subordinate to readiness rules until Stage C.", buildMetrics([["Open Req","1","Visible"],["Candidate Pool","3","Strong"],["Urgency","Moderate","Review"],["Readiness Fit","Pending","Check"]]), "Do not hire ahead of readiness or imply full HR-system depth too early.", 75, [14,22,30,37,46,53], "Readiness, not candidate supply, should drive hiring timing."),
          "Priorities": createTabContent("Hiring Priorities", "Priority is timing, fit, and onboarding readiness.", buildMetrics([["Priority Req","1","Review"],["Best-fit Candidates","2","Strong"],["Onboarding Slots","1","Ready"],["Timing Fit","Moderate","Check"]]), "Protect onboarding quality before hiring speed.", 74, [13,20,28,35,44,51], "Timing fit is the main hiring priority."),
          "Risks": createTabContent("Hiring Risks", "Risk is moderate where hiring outruns training and workload reality.", buildMetrics([["Premature Hire Risk","1","Watch"],["Readiness Gap","2","Visible"],["Backfill Pressure","Low","Stable"],["Quality Risk","1","Review"]]), "Avoid hiring that lands before readiness exists.", 71, [12,18,26,33,41,48], "Readiness gaps are the core hiring risk."),
          "Dependencies": createTabContent("Hiring Dependencies", "Hiring depends on workload truth, training closure, and manager readiness.", buildMetrics([["Workload Truth","78%","Good"],["Training Closure","79%","Review"],["Manager Readiness","84%","Healthy"],["Onboarding Fit","81%","Healthy"]]), "Keep hiring subordinate to workload and training truth.", 79, [16,23,31,39,47,55], "Training closure is the weakest hiring dependency.")
        }
      }
    ]
  },
  cpio: {
    color: "#7fd4ff",
    name: "CPIO",
    role: "Chief Performance Intelligence Officer",
    dept: "Performance Intelligence",
    briefTitle: "Signal review is active. Optimization depth expands by stage.",
    briefBullets: [
      "Performance intelligence begins in Stage A through signal review and activation-study logic.",
      "Feedback and analysis are active first, while deeper optimization grows with later stages.",
      "CPIO is presenting performance intelligence."
    ],
    board: { score: 86, word: "Insightful", details: [{ label: "Feedback", value: "89", color: "var(--green)" }, { label: "Analysis", value: "87", color: "var(--blue)" }, { label: "Optimization", value: "81", color: "var(--gold)" }] },
    decisions: [
      { label: "Review top leakage signals before adding new spend", priority: "High" },
      { label: "Confirm which optimization lane becomes active next", priority: "Medium" },
      { label: "Keep system-improvement pressure mapped to future automation depth", priority: "Medium" }
    ],
    askPrompt: "CPIO, what is the strongest performance signal right now?",
    response: "The strongest signal is where opportunity is being lost before it becomes booked revenue. Feedback and analysis are active enough now to guide the next decision.",
    action: "Use Performance Intelligence to correct missed opportunity before broadening process depth.",
    tabs: {
      "Executive Summary": createTabContent("Performance Intelligence Presentation", "CPIO is presenting. Selected report: Signal Review.", buildMetrics([["Signal Quality","91%","Strong"],["Leakage Areas","3","Visible"],["Optimization Pressure","Moderate","Review"],["System Drift","Low","Controlled"]]), "Review signal loss before approving broader automation or additional spend.", 86, [24,36,44,55,66,76], "Performance intelligence is useful now because the same shared records already produce actionable signals."),
      "Signal Review": createTabContent("Signal Review", "Signal review should stay attached to real business activity instead of abstract dashboards.", buildMetrics([["Recorded Signals","28","This month"],["Critical Patterns","3","Visible"],["Confidence","84%","Healthy"],["Blind Spots","2","Review"]]), "Keep signal review tied to the shared operating record and activation-study logic.", 88, [26,35,45,54,64,73], "Signal quality is strong enough to guide disciplined next moves."),
      "Investment Study": createTabContent("Investment Study", "The activation study gives the President a conservative first view of where investment may recover profit.", buildMetrics([["Recoverable Range","$4.2K-$7.6K","/mo"],["System Cost","Visible","Known"],["Payback Logic","Prepared","Stage A"],["Confidence","Moderate","Useful"]]), "Use the investment study to decide where automation and spend should go first.", 82, [20,29,38,47,56,64], "The study is a live management input, not just a sales artifact."),
      "Optimization": createTabContent("Optimization Pressure", "Optimization begins as a lighter recommendation lane and deepens later.", buildMetrics([["Priority Improvements","4","Visible"],["Workflow Friction","2","Review"],["Profit Levers","3","Mapped"],["Owner Actions","2","Today"]]), "Apply the next two operating improvements before broadening optimization scope.", 79, [18,27,35,43,52,61], "Optimization is useful now, but still intentionally narrower than later stages."),
      "System Improvement": createTabContent("System Improvement Visibility", "System-improvement pressure should stay mapped even before it becomes a stronger management engine.", buildMetrics([["Improvement Themes","3","Mapped"],["Missing Capabilities","2","Visible"],["Upgrade Fit","Prepared","Future"],["Cross-system Signals","Active","Review"]]), "Keep future system-improvement logic visible so the product path stays disciplined.", 76, [16,23,31,38,46,55], "System-improvement visibility helps guide later upgrade decisions without overactivating the lane.")
    },
    directors: [
      {
        id: "feedback",
        label: "Feedback",
        role: "Director of Feedback",
        askPrompt: "Director of Feedback, what is surfacing most clearly?",
        response: "The clearest signals are missed-opportunity patterns, operating friction, and the places where customers are not moving cleanly into booked or completed work.",
        action: "Keep feedback signals explicit so the President can act before friction turns into lost revenue.",
        tabs: {
          "Executive Summary": createTabContent("Director of Feedback Briefing", "Feedback collects business-friction and missed-opportunity signals from real operating records.", buildMetrics([["Signal Queue","12","Visible"],["Missed Opportunity","3","Priority"],["Operating Friction","2","Review"],["Signal Freshness","92%","Strong"]]), "Use the freshest friction signals to protect opportunity first.", 87, [22,31,41,50,59,69], "Feedback is strongest when it stays grounded in recent operating truth."),
          "Priorities": createTabContent("Feedback Priorities", "Priority goes to signals that can still change the business outcome, not just describe it.", buildMetrics([["Actionable Signals","5","Today"],["Owner-visible","100%","Clear"],["Aging Notes","1","Review"],["Repeat Themes","2","Watch"]]), "Act on live missed-opportunity signals before they become historical only.", 84, [19,28,37,46,55,64], "Actionability is the core feedback rule."),
          "Risks": createTabContent("Feedback Risks", "The main risk is letting good signals stay visible without turning them into a next action.", buildMetrics([["Unresolved Signals","2","Watch"],["Stale Notes","1","Review"],["Signal Noise","Low","Stable"],["Escalation Fit","Good","Healthy"]]), "Protect against stale signals by assigning clear owners early.", 78, [17,24,32,40,48,56], "Stale visibility is the main feedback risk."),
          "Dependencies": createTabContent("Feedback Dependencies", "Feedback depends on reporting quality, closeout truth, and connected CRM history.", buildMetrics([["Reporting Quality","91%","Strong"],["Closeout Truth","86%","Healthy"],["CRM History","94%","Strong"],["Owner Review","Current","Visible"]]), "Keep feedback attached to reporting and closeout truth.", 85, [21,30,39,48,57,66], "Closeout truth is the key feedback dependency.")
        }
      },
      {
        id: "analysis",
        label: "Analysis",
        role: "Director of Analysis",
        askPrompt: "Director of Analysis, what explains the performance shift?",
        response: "The main explanation is usually a combination of source quality, follow-up speed, and operating discipline, not one isolated metric.",
        action: "Use analysis to separate symptom from cause before making structural changes.",
        tabs: {
          "Executive Summary": createTabContent("Director of Analysis Briefing", "Analysis translates raw feedback into cause-and-effect understanding and usable management logic.", buildMetrics([["Cause Maps","4","Visible"],["Pattern Confidence","83%","Healthy"],["Root Issues","3","Review"],["Revenue Linkage","Strong","Connected"]]), "Confirm the strongest cause pattern before changing allocation or spend.", 85, [21,30,40,49,58,68], "Analysis adds value when it reduces false conclusions."),
          "Priorities": createTabContent("Analysis Priorities", "Priority is to understand where opportunity is leaking before prescribing a fix.", buildMetrics([["Top Patterns","3","Priority"],["Cross-lane Checks","2","Open"],["Study Updates","1","Due"],["Decision Support","Ready","Live"]]), "Resolve the top three cause patterns before broadening the study.", 82, [18,27,36,45,54,63], "Cause clarity is the core analysis priority."),
          "Risks": createTabContent("Analysis Risks", "Risk appears when the system overreacts to visible symptoms without checking deeper causes.", buildMetrics([["False Signal Risk","1","Watch"],["Unverified Assumptions","2","Review"],["Data Gaps","1","Visible"],["Pattern Drift","Low","Stable"]]), "Do not optimize on symptoms alone.", 77, [16,24,31,39,47,55], "Unverified assumptions are the main analysis risk."),
          "Dependencies": createTabContent("Analysis Dependencies", "Analysis depends on good CRM memory, source visibility, and clean outcome records.", buildMetrics([["CRM Memory","94%","Strong"],["Source Visibility","82%","Healthy"],["Outcome Truth","86%","Healthy"],["Study Inputs","Current","Good"]]), "Keep the study inputs current so analysis stays trustworthy.", 84, [20,29,38,46,55,64], "Source visibility is the weakest analysis dependency.")
        }
      },
      {
        id: "optimization",
        label: "Optimization",
        role: "Director of Optimization",
        askPrompt: "Director of Optimization, what should improve first?",
        response: "The first improvements should be the ones that recover real opportunity without adding unnecessary process weight.",
        action: "Apply the highest-leverage improvements first and keep optimization disciplined by stage.",
        tabs: {
          "Executive Summary": createTabContent("Director of Optimization Briefing", "Optimization begins early as a recommendation lane and becomes stronger later.", buildMetrics([["Priority Improvements","4","Visible"],["High-leverage Fixes","2","Today"],["Efficiency Pressure","Moderate","Review"],["Owner Fit","Strong","Useful"]]), "Apply high-leverage fixes before expanding the optimization layer.", 80, [17,25,33,41,50,58], "Optimization works best when it stays practical."),
          "Priorities": createTabContent("Optimization Priorities", "Priority belongs to changes that improve conversion, execution, or reporting without adding confusion.", buildMetrics([["Priority Fixes","2","Today"],["Sequence Ready","3","Mapped"],["Resource Fit","Healthy","Good"],["Complexity Risk","Low","Controlled"]]), "Prefer simpler high-return fixes first.", 78, [15,23,30,38,46,54], "Sequence discipline is the core optimization priority."),
          "Risks": createTabContent("Optimization Risks", "Risk rises if optimization asks the business to absorb more change than the current stage can support.", buildMetrics([["Overreach Risk","1","Watch"],["Change Load","Low","Stable"],["Signal Mismatch","1","Review"],["Timing Drift","Low","Controlled"]]), "Keep optimization inside the current stage discipline.", 74, [14,20,27,34,41,48], "Overreach is the main optimization risk."),
          "Dependencies": createTabContent("Optimization Dependencies", "Optimization depends on trustworthy analysis, visible outcomes, and stable executive ownership.", buildMetrics([["Analysis Quality","83%","Healthy"],["Outcome Visibility","86%","Strong"],["Executive Ownership","90%","Strong"],["CRM Consistency","94%","Strong"]]), "Do not optimize faster than analysis quality allows.", 81, [18,26,34,42,50,58], "Analysis quality is the key optimization dependency.")
        }
      },
      {
        id: "system_improvement",
        label: "System",
        role: "Director of System Improvement",
        askPrompt: "Director of System Improvement, what should the system learn next?",
        response: "The next system improvements should come from repeated friction, missing capability signals, and the modules that would remove the most wasted motion.",
        action: "Keep upgrade and reconfiguration pressure tied to real operating friction, not abstract future ideas.",
        tabs: {
          "Executive Summary": createTabContent("Director of System Improvement Briefing", "System-improvement logic stays mapped early and becomes more active as automation depth expands.", buildMetrics([["Improvement Themes","3","Mapped"],["Upgrade Candidates","2","Visible"],["Cross-system Friction","2","Review"],["Future Pressure","Structured","Visible"]]), "Track which improvements belong to the next stage instead of forcing them early.", 75, [14,21,29,36,44,52], "System improvement is most useful when it stays disciplined by stage."),
          "Priorities": createTabContent("System Improvement Priorities", "Priority is to identify which improvement removes the most friction across multiple modules.", buildMetrics([["Top Opportunities","2","Priority"],["Cross-module Fit","Strong","Good"],["Missing Capability","2","Visible"],["Upgrade Timing","Review","Needed"]]), "Rank system improvements by friction removed, not novelty.", 74, [13,20,27,34,42,49], "Cross-module leverage is the main system-improvement priority."),
          "Risks": createTabContent("System Improvement Risks", "Risk rises when system-improvement pressure outruns the current release stage or confuses the operating story.", buildMetrics([["Premature Upgrade Risk","1","Watch"],["Story Drift","1","Review"],["Capability Noise","Low","Stable"],["Stage Fit","Moderate","Check"]]), "Keep the improvement lane subordinate to stage logic.", 71, [12,18,25,31,38,45], "Premature expansion is the core system-improvement risk."),
          "Dependencies": createTabContent("System Improvement Dependencies", "System improvement depends on good feedback, sound analysis, and a stable module architecture.", buildMetrics([["Feedback","89%","Strong"],["Analysis","83%","Healthy"],["Architecture Fit","Prepared","Good"],["Stage Logic","Locked","Clear"]]), "Use stage logic to keep system improvement coherent.", 78, [15,22,30,37,45,53], "Architecture fit is the strongest system-improvement dependency.")
        }
      }
    ]
  },
  cao: {
    color: "#ff5d5d",
    name: "CAO",
    role: "Chief Admin Officer",
    dept: "Governance",
    briefTitle: "Governance is mapped. Stage C controls remain reserved.",
    briefBullets: [
      "Governance structure remains visible before activation.",
      "Approvals, compliance, and risk stay mapped without implying a live governance engine.",
      "CAO is presenting governance."
    ],
    board: { score: 74, word: "Locked", details: [{ label: "Approvals", value: "78", color: "var(--gold)" }, { label: "Compliance", value: "72", color: "var(--gold)" }, { label: "Risk", value: "71", color: "var(--gold)" }] },
    decisions: [
      { label: "Keep compliance decisions visible until Stage C unlock", priority: "High" },
      { label: "Review current approval routing discipline", priority: "Medium" },
      { label: "Confirm current risk notes are complete", priority: "Medium" }
    ],
    askPrompt: "CAO, what governance layer is available right now?",
    response: "The governance layer is structurally visible before Stage C, but deeper governance control is intentionally reserved.",
    action: "Keep governance lanes mapped, explicit, and traceable until Stage C activates.",
    tabs: {
      "Executive Summary": createTabContent("Governance Presentation", "CAO is presenting. Selected report: Governance Readiness.", buildMetrics([["Approvals","3","Waiting"],["Risk","2","Open"],["Policies","Locked","Stage C"],["Audit","Future","Stage C"]]), "Governance controls unlock in Stage C. Keep governance visibility clean until then.", 74, [12,18,26,34,42,50], "Governance is intentionally reserved, not missing."),
      "Compliance": createTabContent("Compliance Readiness", "Compliance is structurally present so governance can activate later from cleaner inputs.", buildMetrics([["Compliance State","Locked","Stage C"],["Visible Decisions","3","Tracked"],["Policy Gaps","1","Review"],["Readiness","Mapped","Stable"]]), "Keep compliance inputs clean until full governance unlocks.", 72, [11,17,24,31,39,47], "Compliance should not activate before its inputs are mature."),
      "Approvals": createTabContent("Approval Routing", "Approvals are visible at the President layer, but still belong to the later governance engine.", buildMetrics([["Pending","3","Visible"],["Escalated","1","Review"],["Routing Clarity","84%","Healthy"],["Automation","Locked","Intentional"]]), "Preserve clear approval routing before adding governance automation.", 76, [14,21,29,36,44,53], "Routing clarity matters more than premature automation depth."),
      "Policies": createTabContent("Policy Visibility", "Policies are visible as structural rules, not yet as active governance-control software.", buildMetrics([["Policies Visible","6","Mapped"],["Active Controls","0","Locked"],["Exceptions","1","Review"],["Future Gates","3","Reserved"]]), "Use visible policy structure to prevent drift now.", 70, [10,15,22,29,36,44], "Policy visibility matters even before policy automation."),
      "Risk": createTabContent("Risk Visibility", "Risk is visible enough to guide caution while the deeper governance engine remains reserved for Stage C.", buildMetrics([["Open Risks","2","Visible"],["Critical","0","Clear"],["Muted Signals","2","Watch"],["Owner Notes","Current","Strong"]]), "Keep risk notes explicit and current.", 73, [12,18,26,32,40,48], "Risk visibility is the current governance value."),
      "Audit": createTabContent("Audit Readiness", "Audit remains future-facing, but traceability is already being protected for later governance depth.", buildMetrics([["Audit State","Future","Stage C"],["Traceability","82%","Good"],["Control Evidence","Mapped","Visible"],["Missing Logs","1","Review"]]), "Protect traceability now so future audit work starts from clean records.", 71, [11,16,23,30,38,45], "Traceability is the key audit dependency.")
    },
    directors: [
      {
        id: "compliance",
        label: "Compliance",
        role: "Compliance Director",
        askPrompt: "Compliance Director, what should stay visible right now?",
        response: "Compliance decisions should stay visible even before the full governance layer activates in Stage C.",
        action: "Keep current compliance decisions attached to explicit records until Stage C governance goes live.",
        tabs: {
          "Executive Summary": createTabContent("Compliance Director Briefing", "Compliance is structurally present and should stay visible.", buildMetrics([["State","Locked","Stage C"],["Visible Decisions","3","Tracked"],["Input Quality","84%","Healthy"],["Policy Drift","Low","Stable"]]), "Keep compliance visible without forcing early automation.", 72, [10,16,23,29,37,45], "Visibility is the current value of compliance."),
          "Priorities": createTabContent("Compliance Priorities", "Priority is traceable visibility, not process expansion.", buildMetrics([["Priority Items","3","Tracked"],["Missing Logs","1","Review"],["Owner Notes","Current","Strong"],["Exception Count","1","Visible"]]), "Attach compliance decisions to explicit records.", 70, [10,15,21,28,35,42], "Traceability is the main compliance priority."),
          "Risks": createTabContent("Compliance Risks", "Risk appears when decisions become informal or detached from records.", buildMetrics([["Informal Decisions","1","Watch"],["Missing Record Risk","1","Review"],["Policy Drift","Low","Stable"],["Audit Risk","Low","Managed"]]), "Preserve explicit records on all visible compliance decisions.", 68, [9,14,20,26,33,40], "Informality is the main compliance risk."),
          "Dependencies": createTabContent("Compliance Dependencies", "Compliance depends on visible approvals, risk notes, and policy references.", buildMetrics([["Approval Visibility","84%","Healthy"],["Risk Notes","79%","Good"],["Policy Map","86%","Strong"],["Traceability","82%","Good"]]), "Keep compliance tied to approvals and risk notes.", 75, [12,18,25,33,40,48], "Risk notes are the weakest dependency.")
        }
      },
      {
        id: "approval",
        label: "Approval",
        role: "Approval Director",
        askPrompt: "Approval Director, what is the state of decision routing?",
        response: "Decision routing is visible and usable, but it remains a mapped governance lane until Stage C.",
        action: "Keep approval routing explicit until deeper governance control unlocks in Stage C.",
        tabs: {
          "Executive Summary": createTabContent("Approval Director Briefing", "Approvals are visible, current, and not yet heavily automated.", buildMetrics([["Pending","3","Visible"],["Escalated","1","Review"],["Routing Clarity","84%","Healthy"],["Automation","Locked","Intentional"]]), "Preserve approval clarity before adding heavier control.", 76, [14,20,27,34,42,50], "Approval routing is already useful because it stays visible."),
          "Priorities": createTabContent("Approval Priorities", "Priority is routing clarity and current ownership.", buildMetrics([["Priority Decisions","2","Today"],["Owner Gaps","0","Clear"],["Escalations","1","Visible"],["Routing Drift","Low","Stable"]]), "Keep decision routing simple and explicit.", 74, [12,18,25,32,39,47], "Routing clarity is the approval priority."),
          "Risks": createTabContent("Approval Risks", "Risk comes from scattered decisions more than from lack of automation.", buildMetrics([["Scattered Decisions","1","Watch"],["Silent Delay","1","Review"],["Routing Noise","Low","Stable"],["Policy Drift","1","Visible"]]), "Keep approvals out of scattered communication paths.", 70, [11,16,23,29,36,43], "Scattered communication is the key approval risk."),
          "Dependencies": createTabContent("Approval Dependencies", "Approvals depend on executive reporting, accountability, and policy visibility.", buildMetrics([["Reporting","89%","Strong"],["Accountability","87%","Healthy"],["Policy Visibility","86%","Strong"],["Risk Notes","79%","Good"]]), "Keep approvals tied directly to reporting and policy.", 77, [15,22,29,37,44,52], "Risk-note quality is the weakest approval dependency.")
        }
      },
      {
        id: "risk",
        label: "Risk",
        role: "Risk Director",
        askPrompt: "Risk Director, what should I watch most closely now?",
        response: "Watch the visible governance notes and the places where executive truth could become informal before Stage C governance activates.",
        action: "Keep risk notes current and attached to explicit executive decisions until Stage C.",
        tabs: {
          "Executive Summary": createTabContent("Risk Director Briefing", "Risk remains visible enough to guide caution without overreaction.", buildMetrics([["Open Risks","2","Visible"],["Critical","0","Clear"],["Muted Signals","2","Watch"],["Trace Notes","Current","Strong"]]), "Keep visible risk notes current and explicit.", 73, [12,17,24,30,37,45], "Current risk value comes from visibility, not automation."),
          "Priorities": createTabContent("Risk Priorities", "Priority is current notes, explicit owners, and controlled escalation.", buildMetrics([["Priority Risks","2","Watch"],["Owner Gaps","0","Clear"],["Escalation Notes","1","Visible"],["Review Timing","Good","Healthy"]]), "Use the visible notes to keep risk practical and current.", 71, [11,16,22,29,36,43], "Practicality is the strongest risk priority."),
          "Risks": createTabContent("Risk Risks", "Risk management itself can drift if it becomes too abstract.", buildMetrics([["Abstract Notes","1","Watch"],["Unowned Risks","0","Clear"],["Visibility Gaps","1","Review"],["Escalation Drift","Low","Stable"]]), "Keep risk language concrete and attached to known signals.", 69, [10,15,21,27,34,41], "Abstraction is the current risk-management risk."),
          "Dependencies": createTabContent("Risk Dependencies", "Risk depends on reporting clarity, finance truth, and explicit decision logs.", buildMetrics([["Reporting Clarity","89%","Strong"],["Finance Truth","89%","Stable"],["Decision Logs","84%","Healthy"],["Policy Visibility","86%","Strong"]]), "Keep risk anchored to the same truth system as the rest of the executive layer.", 76, [14,20,27,35,42,50], "Decision-log quality is the key risk dependency.")
        }
      }
    ]
  }
};

    applyBusinessProfile(dashboard, businessProfile, { createTabContent, buildMetrics });

    const stageTabVariants = {
  coo: {
    executive: {
      "Scheduling": {
        B: {
          subtitle: "Stage B scheduling is automated and no longer depends on President-managed confirmation alone.",
          metrics: buildMetrics([["Awaiting Worker Confirm","14","Live"],["Awaiting Customer Confirm","11","Tracked"],["Confirmed","11","Sent"],["Coverage","88%","Healthy"]]),
          recommendation: "Use the automated scheduling engine to tighten assignment speed and confirmation quality across the operating core.",
          pie: 88,
          trend: [26,38,49,58,68,78],
          note: "Stage B converts scheduling from manual coordination into automated routing and confirmation."
        },
        C: {
          subtitle: "Scheduling is now part of a broader operating intelligence and optimization layer.",
          metrics: buildMetrics([["Confirmed","16","Live"],["Rerouted","1","Controlled"],["Completed","15","Tracked"],["Capacity Fit","93%","Strong"]]),
          recommendation: "Use Stage C scheduling intelligence to optimize assignment pressure before service bottlenecks appear.",
          pie: 93,
          trend: [31,43,54,64,75,86],
          note: "Stage C adds stronger optimization and predictive operating pressure to scheduling."
        }
      }
    },
    directors: {
      scheduling: {
        "Executive Summary": {
          B: {
            subtitle: "Stage B scheduling is now an automated assignment and confirmation engine.",
            metrics: buildMetrics([["Awaiting Worker Confirm","14","Live"],["Awaiting Customer Confirm","11","Tracked"],["Confirmed","11","Sent"],["Coverage","88%","Healthy"]]),
            recommendation: "Protect automated confirmation speed before increasing appointment volume.",
            pie: 87,
            trend: [24,35,47,56,66,77],
            note: "Stage B scheduling activates worker availability, routing, and automated confirmation flow."
          },
          C: {
            subtitle: "Scheduling now runs as a stronger optimization and accountability lane.",
            metrics: buildMetrics([["Confirmed","16","Live"],["Rerouted","1","Controlled"],["Completed","13","Tracked"],["Capacity Fit","93%","Strong"]]),
            recommendation: "Use Stage C scheduling intelligence to optimize assignment quality and operating throughput.",
            pie: 92,
            trend: [29,40,52,61,73,84],
            note: "Stage C scheduling adds broader optimization and stronger workflow accountability."
          }
        }
      }
    }
  },
  cfo: {
    executive: {
      "Executive Summary": {
        B: {
          subtitle: "CFO is presenting. Selected report: Reconciliation Depth.",
          metrics: buildMetrics([["Revenue","$248K","↑ 12%"],["Expenses","$161K","↑ 18%"],["Reconciliations","12","Live"],["Cash Position","$142K","Stable"]]),
          recommendation: "Use the broader finance lane to tighten reconciliations and expense controls before month close.",
          pie: 91,
          trend: [34,46,55,63,74,82],
          note: "Stage B broadens finance from lean truth into deeper operating control."
        },
        C: {
          subtitle: "CFO is presenting. Selected report: Financial Control Intelligence.",
          metrics: buildMetrics([["Revenue","$248K","↑ 12%"],["Margin Forecast","19%","Modeled"],["Variance Alerts","2","Live"],["Cash Position","$142K","Stable"]]),
          recommendation: "Use full finance intelligence to forecast margin pressure before it appears in month-close review.",
          pie: 94,
          trend: [38,49,58,67,79,89],
          note: "Stage C adds forecasting, alerts, and stronger financial-governance depth."
        }
      },
      "Budget vs Actual": {
        B: {
          subtitle: "Budget discipline is broader in Stage B because more operating controls feed finance.",
          metrics: buildMetrics([["Variance","4%","Tighter"],["Budget Hit Rate","93%","Strong"],["Overruns","1","Visible"],["Savings","2","Captured"]]),
          recommendation: "Use Stage B finance depth to close overruns faster and tighten budget discipline.",
          pie: 84,
          trend: [24,33,41,50,58,66],
          note: "Budget control improves when scheduling and operations feed finance more directly."
        },
        C: {
          subtitle: "Budget control is now predictive, not just visible after the fact.",
          metrics: buildMetrics([["Variance","2%","Modeled"],["Budget Hit Rate","96%","Strong"],["Overruns","0","Clear"],["Forecast Drift","1","Alert"]]),
          recommendation: "Use Stage C finance intelligence to intervene before budget drift turns into real margin pressure.",
          pie: 91,
          trend: [29,38,47,56,66,76],
          note: "Stage C makes budget variance a forward-looking control lane."
        }
      }
    },
    directors: {
      payroll: {
        "Executive Summary": {
          B: {
            subtitle: "Payroll is broader in Stage B because staffing timing and scheduling depth are more connected.",
            metrics: buildMetrics([["Payroll Load","$59K","Visible"],["Overtime","$3.2K","Improving"],["Coverage Fit","88%","Healthy"],["Forecast Sync","86%","Strong"]]),
            recommendation: "Use Stage B payroll depth to tighten overtime timing and staffing-fit control.",
            pie: 83,
            trend: [20,30,38,46,54,63],
            note: "Payroll becomes more operationally useful when scheduling depth expands."
          },
          C: {
            subtitle: "Payroll is now part of a broader financial and people-performance control surface.",
            metrics: buildMetrics([["Payroll Load","$59K","Visible"],["Overtime Alerts","1","Live"],["Labor Efficiency","92%","Strong"],["Forecast Sync","91%","Predictive"]]),
            recommendation: "Use Stage C payroll intelligence to pressure-test labor efficiency before cost drift appears.",
            pie: 89,
            trend: [24,34,43,52,62,72],
            note: "Stage C turns payroll into a monitored performance-control lane."
          }
        }
      }
    }
  },
  cso: {
    executive: {
      "Executive Summary": {
        B: {
          subtitle: "CSO is presenting. Selected report: Customer Continuity.",
          metrics: buildMetrics([["Retention","90%","Up"],["Reviews","5","Open"],["Complaints","1","Open"],["Referrals","18","Active"]]),
          recommendation: "Use the broader customer-success lane to tighten review speed and referral follow-through.",
          pie: 90,
          trend: [31,42,50,59,68,77],
          note: "Stage B expands customer-success depth beyond the narrower Stage A continuity layer."
        },
        C: {
          subtitle: "CSO is presenting. Selected report: Customer Health Intelligence.",
          metrics: buildMetrics([["Health Score","93","Strong"],["At-risk Customers","1","Flagged"],["Recovery Plays","3","Live"],["Referral Health","High","Predictive"]]),
          recommendation: "Use full customer-success intelligence to intervene on risk before churn or reputation drag appears.",
          pie: 93,
          trend: [35,46,55,65,76,86],
          note: "Stage C adds stronger health intelligence, intervention pressure, and predictive continuity signals."
        }
      },
      "Retention": {
        B: {
          subtitle: "Retention is broader in Stage B because continuity management carries more daily weight.",
          metrics: buildMetrics([["Retention","90%","Up"],["Watch Accounts","1","Visible"],["Renewal Pressure","Low","Controlled"],["Next-step Clarity","Strong","Live"]]),
          recommendation: "Use Stage B depth to close continuity gaps before they age into customer-risk signals.",
          pie: 89,
          trend: [29,39,48,57,65,74],
          note: "Retention becomes a more active lane once broader follow-through depth is available."
        },
        C: {
          subtitle: "Retention is now part of a full customer-health intelligence layer.",
          metrics: buildMetrics([["Retention","93%","Strong"],["Recovery Plays","3","Live"],["Renewal Forecast","High","Modeled"],["Risk Flags","1","Visible"]]),
          recommendation: "Use Stage C retention intelligence to govern continuity before pressure becomes visible churn.",
          pie: 92,
          trend: [33,44,54,64,75,84],
          note: "Stage C turns retention into a predictive management lane."
        }
      }
    },
    directors: {
      support: {
        "Executive Summary": {
          B: {
            subtitle: "Support carries broader daily weight in Stage B because continuity and scheduling are more connected.",
            metrics: buildMetrics([["Open Support","1","Visible"],["Avg Response","1.6h","Faster"],["Escalations","1","Watch"],["History Quality","93%","Strong"]]),
            recommendation: "Use Stage B support depth to tighten response timing and cross-lane follow-through.",
            pie: 87,
            trend: [28,37,45,54,62,71],
            note: "Support gets broader operating weight in Stage B."
          },
          C: {
            subtitle: "Support is now part of a stronger intervention and customer-health control layer.",
            metrics: buildMetrics([["Open Support","1","Visible"],["Recovery Triggers","2","Live"],["Escalation Risk","Low","Controlled"],["History Quality","95%","Strong"]]),
            recommendation: "Use Stage C support intelligence to prevent escalation before it becomes a customer-health event.",
            pie: 91,
            trend: [31,41,50,60,71,81],
            note: "Stage C turns support into a more predictive intervention lane."
          }
        }
      }
    }
  }
};

    const activationReference = {
  executives: [
    ["President", "Active", "Active", "Active"],
    ["CEO", "Active", "Active", "Advanced"],
    ["COO", "Active", "Active", "Advanced"],
    ["CRO", "Active", "Active", "Advanced"],
    ["CFO", "Lean Active", "Active", "Advanced"],
    ["CSO", "Limited Active", "Active", "Advanced"],
    ["CPIO", "Lean Active", "Active", "Advanced"],
    ["CMO", "Visible / Future", "Visible / Future", "Active"],
    ["HR", "Visible / Future", "Visible / Future", "Active"],
    ["CAO", "Visible / Future", "Visible / Future", "Active"]
  ],
  directors: [
    ["CEO", "Strategy Director", "Active", "Active", "Advanced"],
    ["CEO", "Executive Reporting Director", "Active", "Active", "Advanced"],
    ["CEO", "Accountability Director", "Active", "Active", "Advanced"],
    ["COO", "Communications Director", "Active", "Active", "Advanced"],
    ["COO", "Service Director", "Active", "Active", "Advanced"],
    ["COO", "Scheduling Director", "Limited Active", "Active", "Advanced"],
    ["CRO", "Sales Director", "Active", "Active", "Advanced"],
    ["CRO", "Reactivation Director", "Active", "Active", "Advanced"],
    ["CRO", "Lead Generation Director", "Active", "Active", "Advanced"],
    ["CFO", "Revenue Control Director", "Active", "Active", "Advanced"],
    ["CFO", "Reconciliation Director", "Active", "Active", "Advanced"],
    ["CFO", "Accounting / Payroll Director", "Limited Active", "Active", "Advanced"],
    ["CSO", "Support Director", "Limited Active", "Active", "Advanced"],
    ["CSO", "Retention Director", "Limited Active", "Active", "Advanced"],
    ["CSO", "Reviews / Referrals Director", "Limited Active", "Active", "Advanced"],
    ["CPIO", "Director of Feedback", "Active", "Active", "Advanced"],
    ["CPIO", "Director of Analysis", "Active", "Active", "Advanced"],
    ["CPIO", "Director of Optimization", "Limited Active", "Active", "Advanced"],
    ["CPIO", "Director of System Improvement", "Visible / Future", "Limited Active", "Active"],
    ["CMO", "Advertising Director", "Visible / Future", "Visible / Future", "Active"],
    ["CMO", "SEO Director", "Visible / Future", "Visible / Future", "Active"],
    ["CMO", "Website Director", "Visible / Future", "Visible / Future", "Active"],
    ["HR", "People Ops Director", "Visible / Future", "Visible / Future", "Active"],
    ["HR", "Training Director", "Visible / Future", "Visible / Future", "Active"],
    ["HR", "Hiring / Workforce Director", "Visible / Future", "Visible / Future", "Active"],
    ["CAO", "Compliance Director", "Visible / Future", "Visible / Future", "Active"],
    ["CAO", "Approval Director", "Visible / Future", "Visible / Future", "Active"],
    ["CAO", "Risk Director", "Visible / Future", "Visible / Future", "Active"]
  ]
};

    return {
      dashboard,
      stageTabVariants,
      activationReference
    };
  }

  return {
    stageCopy,
    stageOverview,
    activationMap,
    buildDashboardConfig
  };
})();
