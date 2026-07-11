function buildMetrics(items) {
  return items.map((item) => ({
    label: item[0],
    value: item[1],
    delta: item[2]
  }));
}

function createTabContent(title, subtitle, metrics, recommendation, pie, trend, note) {
  return {
    title,
    subtitle,
    metrics,
    recommendation,
    pie,
    trend,
    note
  };
}

function mergeTabContent(base, override = {}) {
  return {
    ...base,
    ...override,
    metrics: override.metrics || base.metrics,
    trend: override.trend || base.trend
  };
}

const workflowHelpers = window.AIABCXWorkflowHelpers;
const {
  getJobFocusWorkflowConfig,
  getQueuePriority,
  getClosedReviewDescriptor,
  getClosedQueuePriority,
  getFocusNavigationTarget,
  getFollowUpReasonLabel
} = workflowHelpers;

const stageConfig = window.AIABCStageConfig;
const jobRecords = window.AIABCXJobRecords;
const queryParams = new URLSearchParams(window.location.search);
const companyConfig = window.AIABCConfig && typeof window.AIABCConfig.companyConfigFromSearchParams === "function"
  ? window.AIABCConfig.companyConfigFromSearchParams(queryParams)
  : null;
const {
  dashboard,
  stageTabVariants,
  activationReference
} = window.AIABCXPresidentDashboardConfig.buildDashboardConfig({
  createTabContent,
  buildMetrics,
  companyConfig
});
const requestedStage = stageConfig.normalizeStage(queryParams.get("stage") || stageConfig.getLiveStage(), stageConfig.getLiveStage());
const requestedJob = queryParams.get("job");
const requestedSource = queryParams.get("source") || "";
const requestedFollowUpReason = queryParams.get("followup") || "";
const requestedView = queryParams.get("view") || "";
stageConfig.setLiveStage(requestedStage);
const LIVE_STAGE = stageConfig.getLiveStage();

const {
  stageCopy,
  stageOverview,
  activationMap
} = window.AIABCXPresidentDashboardConfig;

function readJobRecordsState() {
  const state = jobRecords.readState();
  return state && Array.isArray(state.records) ? state : null;
}

function resolveRequestedJobFocus(jobId, stage) {
  if (!jobId) return null;
  const storedState = readJobRecordsState();
  if (!storedState || !Array.isArray(storedState.records)) return null;
  const record = jobRecords.findRecordById(storedState.records, jobId);
  return jobRecords.buildJobFocus(record, stage);
}

function getPresidentQueueRecords(stage, followUpReason = "") {
  return getPresidentQueueRecordsByReason(stage, followUpReason);
}

function getPresidentQueueRecordsByReason(stage, followUpReason = "") {
  const storedState = readJobRecordsState();
  if (!storedState || !Array.isArray(storedState.records)) return [];
  const activeStatuses = stage === "A"
    ? ["provisional", "awaiting_manual_confirmation", "confirmed", "rescheduled", "follow_up_needed"]
    : ["awaiting_worker_assignment", "awaiting_worker_confirmation", "awaiting_customer_confirmation", "confirmed", "in_progress", "rerouted", "follow_up_needed"];
  return storedState.records
    .map((record) => ({ record, stageRecord: jobRecords.ensureStageRecord(record, stage) }))
    .filter((entry) => activeStatuses.includes(entry.stageRecord.status))
    .filter((entry) => !followUpReason || (entry.stageRecord.status === "follow_up_needed" && entry.stageRecord.followUpReason === followUpReason))
    .sort((left, right) => {
      const leftDate = `${left.record.routeDate || "9999-99-99"} ${left.record.confirmedTime || left.record.requestedTime || ""}`;
      const rightDate = `${right.record.routeDate || "9999-99-99"} ${right.record.confirmedTime || right.record.requestedTime || ""}`;
      return leftDate.localeCompare(rightDate);
    })
    .slice(0, 4)
    .map((entry) => jobRecords.buildJobFocus(entry.record, stage))
    .filter(Boolean);
}

function getPresidentClosedQueueRecords(stage) {
  const storedState = readJobRecordsState();
  if (!storedState || !Array.isArray(storedState.records)) return [];
  const closedStatuses = ["completed", "canceled", "no_show"];
  return storedState.records
    .map((record) => ({ record, stageRecord: jobRecords.ensureStageRecord(record, stage) }))
    .filter((entry) => closedStatuses.includes(entry.stageRecord.status))
    .sort((left, right) => {
      const leftTime = left.stageRecord.activity && left.stageRecord.activity.length
        ? left.stageRecord.activity[left.stageRecord.activity.length - 1].time || ""
        : "";
      const rightTime = right.stageRecord.activity && right.stageRecord.activity.length
        ? right.stageRecord.activity[right.stageRecord.activity.length - 1].time || ""
        : "";
      return rightTime.localeCompare(leftTime);
    })
    .slice(0, 4)
    .map((entry) => jobRecords.buildJobFocus(entry.record, stage))
    .filter(Boolean);
}

function syncJobFocusFromSharedState(options = {}) {
  const currentJobId = state.jobFocus && state.jobFocus.id ? state.jobFocus.id : requestedJob;
  const filteredQueue = getPresidentQueueRecords(state.stage);
  if (currentJobId) {
    state.jobFocus = resolveRequestedJobFocus(currentJobId, state.stage);
    if (state.followUpReasonFilter && state.jobFocus && !(state.jobFocus.statusValue === "follow_up_needed" && state.jobFocus.followUpReason === state.followUpReasonFilter)) {
      state.jobFocus = filteredQueue[0] || state.jobFocus;
    }
  } else {
    state.jobFocus = filteredQueue[0] || null;
  }
  syncDashboardUrl();
  if (!options.skipRender) {
    renderSurface();
  }
}

function syncContextToFocusedJob(options = {}) {
  if (!state.jobFocus) return;
  const target = getFocusNavigationTarget(state.jobFocus);
  state.executiveId = target.executiveId;
  state.directorId = target.directorId;
  state.tab = target.tab;
  if (!options.skipRender) {
    renderSurface();
  }
}

const closedQueuePrefsKey = "ai-abcx-president-closed-queue-prefs-v1";

function readClosedQueuePrefs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(closedQueuePrefsKey) || "{}");
    return {
      closedExecutiveCollapsed: Boolean(parsed.closedExecutiveCollapsed),
      closedRiskCollapsed: Boolean(parsed.closedRiskCollapsed),
      jobFocusCollapsed: Boolean(parsed.jobFocusCollapsed),
      closedBandCollapsed: Boolean(parsed.closedBandCollapsed)
    };
  } catch (error) {
    return {
      closedExecutiveCollapsed: false,
      closedRiskCollapsed: false,
      jobFocusCollapsed: false,
      closedBandCollapsed: false
    };
  }
}

function writeClosedQueuePrefs() {
  try {
    localStorage.setItem(closedQueuePrefsKey, JSON.stringify({
      closedExecutiveCollapsed: Boolean(state.closedExecutiveCollapsed),
      closedRiskCollapsed: Boolean(state.closedRiskCollapsed),
      jobFocusCollapsed: Boolean(state.jobFocusCollapsed),
      closedBandCollapsed: Boolean(state.closedBandCollapsed)
    }));
  } catch (error) {
    return;
  }
}

const closedQueuePrefs = readClosedQueuePrefs();

const state = {
  stage: LIVE_STAGE,
  followUpReasonFilter: requestedFollowUpReason,
  executiveId: "coo",
  directorId: "",
  systemView: null,
  tab: "Executive Summary",
  responseMode: false,
  presentationMode: false,
  compareMode: false,
  periodMode: "MTD",
  responsePayload: null,
  closedExecutiveCollapsed: closedQueuePrefs.closedExecutiveCollapsed,
  closedRiskCollapsed: closedQueuePrefs.closedRiskCollapsed,
  jobFocusCollapsed: closedQueuePrefs.jobFocusCollapsed,
  closedBandCollapsed: closedQueuePrefs.closedBandCollapsed,
  jobFocus: resolveRequestedJobFocus(requestedJob, LIVE_STAGE) || getPresidentQueueRecords(LIVE_STAGE, requestedFollowUpReason)[0] || null
};

if (requestedJob || requestedSource === "job-records") {
  syncContextToFocusedJob({ skipRender: true });
}

const sidebarNav = document.getElementById("sidebarNav");
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const executiveRail = document.getElementById("executiveRail");
const execNodes = Array.from(document.querySelectorAll(".exec"));
const surface = document.getElementById("surface");
const subtitle = document.getElementById("subtitle");
const briefTitle = document.getElementById("briefTitle");
const briefBullets = document.getElementById("briefBullets");
const decisionCount = document.getElementById("decisionCount");
const decisionList = document.getElementById("decisionList");
const boardRing = document.getElementById("boardRing");
const boardScoreValue = document.getElementById("boardScoreValue");
const boardScoreWord = document.getElementById("boardScoreWord");
const boardScoreDetails = document.getElementById("boardScoreDetails");
const chamber = document.getElementById("chamber");
const directorsNode = document.getElementById("directors");
const surfaceTitle = document.getElementById("surfaceTitle");
const surfaceSub = document.getElementById("surfaceSub");
const jobFocusCard = document.getElementById("jobFocusCard");
const jobFocusTitle = document.getElementById("jobFocusTitle");
const jobFocusNote = document.getElementById("jobFocusNote");
const jobFocusOpenBtn = document.getElementById("jobFocusOpenBtn");
const jobFocusStagePill = document.getElementById("jobFocusStagePill");
const jobFocusTypePill = document.getElementById("jobFocusTypePill");
const jobFocusStatusPill = document.getElementById("jobFocusStatusPill");
const jobFocusToggle = document.getElementById("jobFocusToggle");
const jobFocusNextAction = document.getElementById("jobFocusNextAction");
const jobFocusNextDetail = document.getElementById("jobFocusNextDetail");
const jobFocusWorkflow = document.getElementById("jobFocusWorkflow");
const jobFocusTimeline = document.getElementById("jobFocusTimeline");
const jobFocusGrid = document.getElementById("jobFocusGrid");
const queueFilterBanner = document.getElementById("queueFilterBanner");
const queueFilterValue = document.getElementById("queueFilterValue");
const queueFilterClear = document.getElementById("queueFilterClear");
const jobQueue = document.getElementById("jobQueue");
const closedJobQueueBand = document.getElementById("closedJobQueueBand");
const closedBandToggle = document.getElementById("closedBandToggle");
const closedJobQueue = document.getElementById("closedJobQueue");
const closedExecutiveGroup = document.getElementById("closedExecutiveGroup");
const closedExecutiveCount = document.getElementById("closedExecutiveCount");
const closedExecutiveToggle = document.getElementById("closedExecutiveToggle");
const closedRiskGroup = document.getElementById("closedRiskGroup");
const closedRiskCount = document.getElementById("closedRiskCount");
const closedRiskToggle = document.getElementById("closedRiskToggle");
const closedRiskQueue = document.getElementById("closedRiskQueue");
const tabsNode = document.getElementById("tabs");
const metricsNode = document.getElementById("metrics");
const schedulePipeline = document.getElementById("schedulePipeline");
const followUpBreakdown = document.getElementById("followUpBreakdown");
const followUpBreakdownTitle = document.getElementById("followUpBreakdownTitle");
const followUpBreakdownGrid = document.getElementById("followUpBreakdownGrid");
const healthTitle = document.getElementById("healthTitle");
const pieChart = document.getElementById("pieChart");
const trendTitle = document.getElementById("trendTitle");
const trendBars = document.getElementById("trendBars");
const recommendationTitle = document.getElementById("recommendationTitle");
const recNode = document.getElementById("rec");
const askTitle = document.getElementById("askTitle");
const askName = document.getElementById("askName");
const askRole = document.getElementById("askRole");
const askIcon = document.getElementById("askIcon");
const questionNode = document.getElementById("question");
const stageNote = document.getElementById("stageNote");
const stageLivePill = document.getElementById("stageLivePill");
const stageBadge = document.getElementById("stageBadge");
const stageBannerText = document.getElementById("stageBannerText");
const stageBannerMeta = document.getElementById("stageBannerMeta");
const respTitle = document.getElementById("respTitle");
const respText = document.getElementById("respText");
const respActionTitle = document.getElementById("respActionTitle");
const respAction = document.getElementById("respAction");
const statusBar = document.getElementById("statusBar");
const focusViewBtn = document.getElementById("focusViewBtn");
const focusOverlay = document.getElementById("focusOverlay");
const focusJobRecordBtn = document.getElementById("focusJobRecordBtn");
const closeFocusView = document.getElementById("closeFocusView");
const focusBody = document.getElementById("focusBody");
const periodBtn = document.getElementById("periodBtn");
const compareBtn = document.getElementById("compareBtn");
const jobRecordsBtn = document.getElementById("jobRecordsBtn");
const followUpHubBtn = document.getElementById("followUpHubBtn");
const presentationBtn = document.getElementById("presentationBtn");
const askButton = document.getElementById("askButton");
const followUpButton = document.getElementById("followUpButton");
let chamberPlaceholder = null;

function getExecutive() {
  return dashboard[state.executiveId];
}

function getExecutiveActivation(id) {
  return activationMap.executives[id] || { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" };
}

function getDirectorActivation(executiveId, directorId) {
  const group = activationMap.directors[executiveId] || {};
  return group[directorId] || { A: "Active", B: "Active", C: "Advanced", activatesAt: "A" };
}

function getStageStatus(activation) {
  return activation[state.stage] || activation.A || "Active";
}

function statusToClass(status) {
  if (status.includes("Future")) return "stage-future";
  if (status.includes("Limited")) return "stage-limited";
  return "stage-active";
}

function statusShortLabel(status, activation) {
  if (status === "Advanced") return `Stage ${state.stage} advanced`;
  if (status === "Lean Active") return `Stage ${state.stage} lean-active`;
  if (status === "Limited Active") return `Stage ${state.stage} limited`;
  if (status === "Visible / Limited") return `Broader in Stage ${activation.activatesAt}`;
  if (status === "Visible / Future") return `Activates in Stage ${activation.activatesAt}`;
  return `Stage ${state.stage} active`;
}

function pillClass(status) {
  if (status === "Advanced") return "advanced";
  if (status === "Active") return "active";
  if (status === "Lean Active" || status === "Limited Active") return "limited";
  if (status === "Visible / Future") return "future";
  return "visible";
}

function pill(status) {
  return `<span class="map-pill ${pillClass(status)}">${status}</span>`;
}

function buildMapTable(headers, rows) {
  return `<table class="map-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function renderActivationMap() {
  executiveMap.innerHTML = buildMapTable(
    ["ROLE", "STAGE A", "STAGE B", "STAGE C"],
    activationReference.executives.map((row) => [row[0], pill(row[1]), pill(row[2]), pill(row[3])])
  );
  directorMap.innerHTML = buildMapTable(
    ["EXECUTIVE", "DIRECTOR", "STAGE A", "STAGE B", "STAGE C"],
    activationReference.directors.map((row) => [row[0], row[1], pill(row[2]), pill(row[3]), pill(row[4])])
  );
}

function buildActivationMessage(label, activation) {
  const status = getStageStatus(activation);
  const normalizedLabel = String(label).toLowerCase();
  if (status === "Active") {
    return `${label} is fully active in Stage ${state.stage}.`;
  }
  if (status === "Advanced") {
    return `${label} is fully active in Stage ${state.stage} with deeper intelligence, control, and automation.`;
  }
  if (status === "Lean Active") {
    if (normalizedLabel === "cfo") {
      return `${label} is active in Stage ${state.stage} with a deliberately lean finance-management scope.`;
    }
    return `${label} is active in Stage ${state.stage} with a leaner management scope.`;
  }
  if (status === "Limited Active") {
    if (normalizedLabel === "cso" || normalizedLabel === "support" || normalizedLabel === "retention" || normalizedLabel === "reviews") {
      return `${label} is active in Stage ${state.stage} with intentionally reduced customer-success depth. Broader management depth expands in Stage B.`;
    }
    const nextStage = state.stage === "A" ? "B" : "C";
    return `${label} is limited-active in Stage ${state.stage}. Broader management depth expands in Stage ${nextStage}.`;
  }
  if (status === "Visible / Limited") {
    if (normalizedLabel === "cmo" || normalizedLabel === "advertising" || normalizedLabel === "seo" || normalizedLabel === "website") {
      return `${label} stays structurally visible in Stage ${state.stage} so marketing responsibility remains mapped. Full marketing-system control begins in Stage ${activation.activatesAt}.`;
    }
    if (normalizedLabel === "hr" || normalizedLabel === "people" || normalizedLabel === "training" || normalizedLabel === "hiring") {
      return `${label} stays structurally visible in Stage ${state.stage} so people-management responsibility remains mapped. Full people-management control begins in Stage ${activation.activatesAt}.`;
    }
    if (normalizedLabel === "cao" || normalizedLabel === "compliance" || normalizedLabel === "approval" || normalizedLabel === "risk") {
      return `${label} stays structurally visible in Stage ${state.stage} so governance responsibility remains mapped. Full governance control begins in Stage ${activation.activatesAt}.`;
    }
    return `${label} is structurally visible in Stage ${state.stage}. Broader activation begins in Stage ${activation.activatesAt}.`;
  }
  if (status === "Visible / Future") {
    if (normalizedLabel === "cmo" || normalizedLabel === "advertising" || normalizedLabel === "seo" || normalizedLabel === "website") {
      return `${label} stays structurally visible in Stage ${state.stage} so marketing responsibility remains mapped. Full marketing-system control begins in Stage ${activation.activatesAt}.`;
    }
    if (normalizedLabel === "hr" || normalizedLabel === "people" || normalizedLabel === "training" || normalizedLabel === "hiring") {
      return `${label} stays structurally visible in Stage ${state.stage} so people-management responsibility remains mapped. Full people-management control begins in Stage ${activation.activatesAt}.`;
    }
    if (normalizedLabel === "cao" || normalizedLabel === "compliance" || normalizedLabel === "approval" || normalizedLabel === "risk") {
      return `${label} stays structurally visible in Stage ${state.stage} so governance responsibility remains mapped. Full governance control begins in Stage ${activation.activatesAt}.`;
    }
    return `${label} is structurally visible in Stage ${state.stage}. Activation begins in Stage ${activation.activatesAt}.`;
  }
  return `${label} is part of the company structure.`;
}

function getBehaviorForStatus(status) {
  if (status === "Visible / Future") return { tabLimit: 1, gated: true };
  if (status === "Visible / Limited") return { tabLimit: state.stage === "A" ? 1 : 2, gated: true };
  if (status === "Limited Active") return { tabLimit: state.stage === "A" ? 2 : 3, gated: false };
  if (status === "Lean Active") return { tabLimit: state.stage === "A" ? 4 : 5, gated: false };
  return { tabLimit: null, gated: false };
}

function shouldUseGuidanceMessaging(context) {
  const status = getStageStatus(context.activation);
  const executiveId = state.executiveId;
  const entityName = getEntityName(context);
  if (status === "Visible / Future" || status === "Visible / Limited") return true;
  if (status === "Lean Active" && (executiveId === "cfo" || entityName === "CFO")) return true;
  if (status === "Limited Active" && (executiveId === "cso" || entityName === "CSO")) return true;
  return false;
}

function getOperationalGuidance(context) {
  const status = getStageStatus(context.activation);
  const entityName = getEntityName(context);
  const executiveId = state.executiveId
    || (context.executive && context.executive.name ? context.executive.name.toLowerCase() : "")
    || (context.executive && context.executive.dept ? context.executive.dept.toLowerCase() : "");
  const entityId = context.type === "director" ? context.entity.id : executiveId;

  if ((status === "Visible / Limited" || status === "Visible / Future") && (executiveId === "cmo" || entityName === "CMO")) {
    const marketingGuidance = {
      cmo: {
        summary: "CMO stays structurally visible before Stage C so the President can keep growth responsibility mapped to the company model. In Stages A and B, this lane is for awareness, external-system coordination, and readiness, not for implying that AI-ABCX already includes a full marketing operating system.",
        action: "Use the CMO lane now to review demand visibility, message readiness, website friction, and any outside marketing ownership. Do not treat it as a live internal campaign-control engine before Stage C.",
        recommendation: "Keep marketing mapped and visible, but reserve full marketing-system control for the Stage C optional layer."
      },
      advertising: {
        summary: "Advertising remains mapped before Stage C so paid-growth responsibility has a clear place in the structure. In earlier stages, it supports awareness and vendor or partner review, not full ad-operations control inside AI-ABCX.",
        action: "Use Advertising now to note outside spend, weak ROI signals, and accountability gaps. Leave full channel-management depth to the later optional marketing system.",
        recommendation: "Treat Advertising as a mapped ownership lane first, not a live optimization console yet."
      },
      seo: {
        summary: "SEO remains visible before Stage C so organic-growth ownership is explicit. In earlier stages, it is a readiness and accountability lane rather than a live SEO execution system inside AI-ABCX.",
        action: "Use SEO now to identify blocked growth, missing briefs, and outside execution responsibility. Leave deeper publishing and scaling controls to the later optional marketing system.",
        recommendation: "Treat SEO as structural visibility and readiness before it becomes a fully active system lane."
      },
      website: {
        summary: "Website remains visible before Stage C because the President still needs to see message and conversion truth. That does not mean AI-ABCX is already providing a full website-management system in Stages A or B.",
        action: "Use Website now to review friction, CTA clarity, and trust-path issues, especially when outside teams or vendors own execution. Leave broader optimization controls to the later optional marketing system.",
        recommendation: "Treat Website as a visibility and accountability lane first, then a fuller system lane later."
      }
    };

    return marketingGuidance[entityId] || marketingGuidance.cmo;
  }

  if ((status === "Visible / Limited" || status === "Visible / Future") && (executiveId === "hr" || entityName === "HR" || entityName === "CHRO")) {
    const peopleGuidance = {
      hr: {
        summary: "CHRO stays structurally visible before Stage C so the President can keep people responsibility mapped to the company model. In Stages A and B, this lane is for readiness, accountability visibility, and planning, not for implying that AI-ABCX already includes a full people-management system.",
        action: "Use the CHRO lane now to review staffing readiness, training closure, and accountability visibility. Do not treat it as a live people-management control engine before Stage C.",
        recommendation: "Keep people structure mapped and visible, but reserve full people-management control for Stage C."
      },
      people_ops: {
        summary: "People Ops remains mapped before Stage C so reporting ownership has a clear place in the structure. In earlier stages, it supports visibility and readiness rather than a fully active HR operating lane.",
        action: "Use People Ops now to review reporting quality, manager follow-through, and readiness gaps. Leave deeper people-process control to Stage C.",
        recommendation: "Treat People Ops as a mapped readiness lane first, then a fully active people-control lane later."
      },
      training: {
        summary: "Training remains visible before Stage C so readiness gaps are explicit. In earlier stages, it is a preparation lane rather than a full training-management engine inside AI-ABCX.",
        action: "Use Training now to track blocked readiness, pending updates, and operational dependencies. Leave fuller people-system depth to Stage C.",
        recommendation: "Treat Training as readiness visibility before it becomes a deeper system lane."
      },
      hiring: {
        summary: "Hiring remains visible before Stage C so expansion responsibility is mapped to the company structure. In earlier stages, it is a planning and timing lane, not a fully active people-control system.",
        action: "Use Hiring now to review workload timing, onboarding fit, and readiness gaps. Leave fuller people-management logic to Stage C.",
        recommendation: "Treat Hiring as a planning lane first, and a fuller people-control lane later."
      }
    };

    return peopleGuidance[entityId] || peopleGuidance.hr;
  }

  if ((status === "Visible / Limited" || status === "Visible / Future") && (executiveId === "cao" || entityName === "CAO")) {
    const governanceGuidance = {
      cao: {
        summary: "CAO stays structurally visible before Stage C so governance responsibility remains mapped to the company model. In Stages A and B, this lane is for traceability, explicit routing, and structural clarity, not for implying that AI-ABCX already includes a full governance-control engine.",
        action: "Use the CAO lane now to review approvals, compliance visibility, and risk traceability. Do not treat it as a live governance automation layer before Stage C.",
        recommendation: "Keep governance mapped and visible, but reserve deeper governance control for Stage C."
      },
      compliance: {
        summary: "Compliance remains mapped before Stage C so policy responsibility stays visible. In earlier stages, it supports traceability and record quality rather than a fully active compliance system.",
        action: "Use Compliance now to track visible decisions, policy gaps, and record quality. Leave deeper governance control to Stage C.",
        recommendation: "Treat Compliance as a mapped traceability lane first, then a fuller governance lane later."
      },
      approval: {
        summary: "Approval remains visible before Stage C so decision routing stays explicit. In earlier stages, it is a structural routing lane rather than a full approval-control engine.",
        action: "Use Approval now to keep routing clear, ownership explicit, and decision flow traceable. Leave deeper governance automation to Stage C.",
        recommendation: "Treat Approval as a mapped routing lane first, then a fuller governance-control lane later."
      },
      risk: {
        summary: "Risk remains visible before Stage C so caution and traceability are preserved in the company model. In earlier stages, it is a visibility lane rather than a fully active governance engine.",
        action: "Use Risk now to keep explicit notes, visible ownership, and concrete escalation signals. Leave deeper governance pressure to Stage C.",
        recommendation: "Treat Risk as a visibility and traceability lane first, then a fuller governance lane later."
      }
    };

    return governanceGuidance[entityId] || governanceGuidance.cao;
  }

  if (status === "Lean Active" && (executiveId === "cfo" || entityName === "CFO")) {
    const financeGuidance = {
      cfo: {
        summary: "CFO is active now in Stage A, but on a deliberately lean financial-management scope. The President can use real financial truth today without treating finance as fully expanded multi-layer control yet.",
        action: "Use finance now for revenue truth, reconciliation discipline, cash visibility, and margin review, while keeping expectations narrower than later-stage depth.",
        recommendation: "Treat Finance as real executive control now, but intentionally lean rather than fully expanded."
      },
      revenue_control: {
        summary: "Revenue Control is fully useful in Stage A because payment truth and estimate truth already matter. It remains part of the lean finance layer rather than a fully widened finance engine.",
        action: "Use Revenue Control now to keep collected truth, estimate truth, and confirmation discipline explicit.",
        recommendation: "Treat Revenue Control as one of the strongest early finance lanes."
      },
      accounting: {
        summary: "Accounting is active in Stage A because month-close discipline and reconciliations already exist. It still sits inside a leaner finance-management surface than later stages.",
        action: "Use Accounting now for close discipline, categorization quality, and confirmation timing without overextending the layer.",
        recommendation: "Treat Accounting as active and useful now, while keeping the broader finance surface intentionally lean."
      },
      payroll: {
        summary: "Payroll is visible and useful in Stage A because labor timing affects margin truth early. It remains narrower than a later full finance-management layer.",
        action: "Use Payroll now to review overtime timing, staffing pressure, and forecast fit without broadening the lane beyond current truth.",
        recommendation: "Treat Payroll as a lean-active finance lane that sharpens margin control."
      }
    };

    return financeGuidance[entityId] || financeGuidance.cfo;
  }

  if (status === "Limited Active" && (executiveId === "cso" || entityName === "CSO")) {
    const successGuidance = {
      cso: {
        summary: "CSO is active now in Stage A, but on a narrower customer-success scope. The President can use real continuity signals today while broader customer-success depth expands later.",
        action: "Use customer success now for support follow-through, retention visibility, review discipline, and complaint ownership, while keeping the lane intentionally tighter than later stages.",
        recommendation: "Treat Customer Success as a real operating lane now, but with intentionally reduced depth."
      },
      support: {
        summary: "Support is already useful in Stage A because customer follow-through and response quality are operationally real now. It remains inside a narrower customer-success layer than later stages.",
        action: "Use Support now to protect response speed, context quality, and visible ownership on open customer issues.",
        recommendation: "Treat Support as a strong current lane inside a still-limited customer-success surface."
      },
      retention: {
        summary: "Retention is already useful in Stage A because continuity and next-step clarity are real business truths now. It remains narrower than the later full customer-success layer.",
        action: "Use Retention now to protect watch accounts, next-step visibility, and continuity discipline.",
        recommendation: "Treat Retention as active now, while preserving the narrower Stage A scope."
      },
      reviews: {
        summary: "Reviews are already useful in Stage A because response speed and reputation discipline affect customer continuity now. They remain part of a limited-active customer-success layer.",
        action: "Use Reviews now to clear older responses, protect tone, and keep public follow-through visible.",
        recommendation: "Treat Reviews as active and useful now, while keeping the overall lane intentionally limited."
      }
    };

    return successGuidance[entityId] || successGuidance.cso;
  }

  if (status === "Visible / Future") {
    return {
      summary: `${entityName} is reserved for Stage ${context.activation.activatesAt}. In Stage ${state.stage}, this lane stays visible so the President can govern the full company model without forcing premature governance depth.`,
      action: `Keep ${entityName.toLowerCase()} visible for planning and record-keeping only until Stage ${context.activation.activatesAt} activates.`,
      recommendation: `${entityName} should remain mapped and visible, but not treated as a daily operating lane yet.`
    };
  }

  if (status === "Visible / Limited") {
    return {
      summary: `${entityName} is visible in Stage ${state.stage} for structure, readiness, and President awareness. Daily management depth begins in Stage ${context.activation.activatesAt}.`,
      action: `Use ${entityName.toLowerCase()} for visibility and planning now, and wait for fuller control depth in Stage ${context.activation.activatesAt}.`,
      recommendation: `Keep ${entityName} structurally visible and operationally light until broader activation begins.`
    };
  }

  if (status === "Limited Active") {
    const nextStage = state.stage === "A" ? "B" : "C";
    return {
      summary: `${entityName} is active now, but on a narrower management scope. The President can use this lane operationally today while broader depth unlocks in Stage ${nextStage}.`,
      action: `Use the current ${entityName.toLowerCase()} signals for control decisions now, and expand depth when Stage ${nextStage} unlocks.`,
      recommendation: `${entityName} should be used as a real operating lane now, but with a deliberately constrained scope.`
    };
  }

  if (status === "Lean Active") {
    return {
      summary: `${entityName} is active in Stage ${state.stage} with a lean executive scope. It should be used for real decisions, while deeper reporting and management layers come later.`,
      action: `Use ${entityName.toLowerCase()} now for executive control, and let later stages widen the management surface.`,
      recommendation: `${entityName} is intentionally lean, not incomplete.`
    };
  }

  return {
    summary: context.entity.response,
    action: context.entity.action,
    recommendation: getCurrentTabContent().recommendation
  };
}

function getActiveEntity() {
  const executive = getExecutive();
  if (!state.directorId) {
    return {
      type: "executive",
      executive,
      entity: executive,
      activation: getExecutiveActivation(state.executiveId)
    };
  }
  const director = executive.directors.find((item) => item.id === state.directorId) || executive.directors[0];
  return {
    type: "director",
    executive,
    entity: director,
    activation: getDirectorActivation(state.executiveId, director.id)
  };
}

function getEntityName(context) {
  return context.type === "director" ? context.entity.label : context.entity.name;
}

function getTabKeys(context) {
  const keys = Object.keys(context.entity.tabs);
  const behavior = getBehaviorForStatus(getStageStatus(context.activation));
  return behavior.tabLimit ? keys.slice(0, behavior.tabLimit) : keys;
}

function ensureActiveTab() {
  const context = getActiveEntity();
  const keys = getTabKeys(context);
  if (!keys.includes(state.tab)) {
    state.tab = keys[0];
  }
}

function isPhoneSystemContext() {
  return state.executiveId === "coo" && state.directorId === "communications";
}

function syncSystemViewState() {
  state.systemView = isPhoneSystemContext() ? "phone" : null;
}

function getSharedRecords() {
  const shared = readJobRecordsState();
  return shared && Array.isArray(shared.records) ? shared.records : [];
}

function summarizeSchedulingStage(stage) {
  const summary = {
    total: 0,
    provisional: 0,
    awaiting_manual_confirmation: 0,
    awaiting_worker_assignment: 0,
    awaiting_worker_confirmation: 0,
    awaiting_customer_confirmation: 0,
    confirmed: 0,
    in_progress: 0,
    completed: 0,
    follow_up_needed: 0,
    followUpReasons: {
      estimate_revision: 0,
      customer_decision_pending: 0,
      outbound_recovery: 0,
      return_visit_required: 0,
      parts_hold: 0,
      service_completion_pending: 0,
      same_day_conversion_pending: 0,
      approved_schedule_hold: 0,
      estimate_revision_then_return_visit: 0
    },
    rescheduled: 0,
    rerouted: 0,
    canceled: 0,
    no_show: 0
  };
  getSharedRecords().forEach((record) => {
    const stageRecord = jobRecords.ensureStageRecord(record, stage);
    const status = stageRecord.status || "provisional";
    summary.total += 1;
    if (Object.prototype.hasOwnProperty.call(summary, status)) {
      summary[status] += 1;
    }
    if (status === "follow_up_needed" && stageRecord.followUpReason && Object.prototype.hasOwnProperty.call(summary.followUpReasons, stageRecord.followUpReason)) {
      summary.followUpReasons[stageRecord.followUpReason] += 1;
    }
  });
  return summary;
}

function getTopFollowUpReasons(summary, limit = 2) {
  return Object.entries(summary.followUpReasons || {})
    .filter((entry) => entry[1] > 0)
    .sort((left, right) => right[1] - left[1])
    .slice(0, limit)
    .map(([reason, count]) => ({ reason, count, label: getFollowUpReasonLabel(reason) }));
}

function isLiveSchedulingView() {
  return state.executiveId === "coo" && (state.tab === "Scheduling" || state.directorId === "scheduling");
}

function buildLiveSchedulingMetrics() {
  if (!isLiveSchedulingView()) return null;
  const summary = summarizeSchedulingStage(state.stage);
  const topReasons = getTopFollowUpReasons(summary, 2);
  const primaryReason = topReasons[0];
  const secondaryReason = topReasons[1];
  if (state.stage === "A") {
    const metricsByTab = {
      "Scheduling": buildMetrics([
        ["Provisional", String(summary.provisional), "Live"],
        ["Awaiting Manual Confirm", String(summary.awaiting_manual_confirmation), "Live"],
        ["Confirmed", String(summary.confirmed), "Locked"],
        [primaryReason ? primaryReason.label : "Follow-up Needed", String(primaryReason ? primaryReason.count : summary.follow_up_needed), "Tracked"]
      ]),
      "Executive Summary": buildMetrics([
        ["Provisional", String(summary.provisional), "Live"],
        ["Awaiting Manual Confirm", String(summary.awaiting_manual_confirmation), "Live"],
        ["Confirmed", String(summary.confirmed), "Locked"],
        [primaryReason ? primaryReason.label : "Follow-up Needed", String(primaryReason ? primaryReason.count : summary.follow_up_needed), "Tracked"]
      ]),
      "Priorities": buildMetrics([
        ["Manual Confirms Due", String(summary.awaiting_manual_confirmation), "Priority"],
        ["Rescheduled", String(summary.rescheduled), "Visible"],
        ["Confirmed", String(summary.confirmed), "Locked"],
        ["Open Jobs", String(summary.total), "Live"]
      ]),
      "Risks": buildMetrics([
        ["Rescheduled", String(summary.rescheduled), "Visible"],
        ["No Show", String(summary.no_show), "Watch"],
        ["Canceled", String(summary.canceled), "Closed"],
        ["Manual Drift", String(summary.awaiting_manual_confirmation), "Review"]
      ]),
      "Dependencies": buildMetrics([
        ["Awaiting Manual Confirm", String(summary.awaiting_manual_confirmation), "Active"],
        ["Confirmed", String(summary.confirmed), "Locked"],
        ["Completed", String(summary.completed), "Tracked"],
        [secondaryReason ? secondaryReason.label : "Open Jobs", String(secondaryReason ? secondaryReason.count : summary.total), secondaryReason ? "Tracked" : "Live"]
      ])
    };
    return metricsByTab[state.tab] || metricsByTab["Scheduling"];
  }

  const metricsByTab = {
    "Scheduling": buildMetrics([
      ["Awaiting Worker Confirm", String(summary.awaiting_worker_confirmation), "Live"],
      ["Awaiting Customer Confirm", String(summary.awaiting_customer_confirmation), "Tracked"],
      ["Confirmed", String(summary.confirmed), "Locked"],
      ["Rerouted", String(summary.rerouted), "Visible"]
    ]),
    "Executive Summary": buildMetrics([
      ["Awaiting Worker Confirm", String(summary.awaiting_worker_confirmation), "Live"],
      ["Awaiting Customer Confirm", String(summary.awaiting_customer_confirmation), "Tracked"],
      ["Confirmed", String(summary.confirmed), "Locked"],
      ["Rerouted", String(summary.rerouted), "Visible"]
    ]),
    "Priorities": buildMetrics([
      ["Worker Confirms Due", String(summary.awaiting_worker_confirmation), "Priority"],
      ["Customer Confirms Due", String(summary.awaiting_customer_confirmation), "Priority"],
      ["Ready For Outcome", String(summary.confirmed + summary.in_progress), "Live"],
      ["Rerouted", String(summary.rerouted), "Visible"]
    ]),
    "Risks": buildMetrics([
      ["Rerouted", String(summary.rerouted), "Visible"],
      ["No Show", String(summary.no_show), "Watch"],
      [primaryReason ? primaryReason.label : "Follow-up Needed", String(primaryReason ? primaryReason.count : summary.follow_up_needed), "Tracked"],
      ["Canceled", String(summary.canceled), "Closed"]
    ]),
    "Dependencies": buildMetrics([
      ["Awaiting Worker Confirm", String(summary.awaiting_worker_confirmation), "Active"],
      ["Awaiting Customer Confirm", String(summary.awaiting_customer_confirmation), "Active"],
      ["Completed", String(summary.completed), "Tracked"],
      [secondaryReason ? secondaryReason.label : "Open Jobs", String(secondaryReason ? secondaryReason.count : summary.total), secondaryReason ? "Tracked" : "Live"]
    ])
  };
  return metricsByTab[state.tab] || metricsByTab["Scheduling"];
}

function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : (plural || `${singular}s`)}`;
}

function buildLiveCooOverview() {
  if (state.executiveId !== "coo") return null;
  const summary = summarizeSchedulingStage(state.stage);
  const topReasons = getTopFollowUpReasons(summary, 2);
  const reasonSummary = topReasons.length
    ? topReasons.map((item) => `${pluralize(item.count, item.label, item.label)}`).join(" and ")
    : "";
  if (state.stage === "A") {
    const briefTitle = summary.awaiting_manual_confirmation > 0
      ? `Stage A is holding ${summary.awaiting_manual_confirmation} manual scheduling confirmation${summary.awaiting_manual_confirmation === 1 ? "" : "s"}.`
      : `Stage A manual scheduling is currently under control.`;
    const briefBullets = [
      `${pluralize(summary.confirmed, "confirmed appointment")} ${summary.confirmed === 1 ? "is" : "are"} already locked into the President record.`,
      `${pluralize(summary.follow_up_needed, "job")} ${summary.follow_up_needed === 1 ? "still requires" : "still require"} follow-up visibility after the appointment result${reasonSummary ? `, led by ${reasonSummary}` : ""}.`,
      `${pluralize(summary.rescheduled, "rescheduled record")} and ${pluralize(summary.no_show, "no-show record")} are currently visible in manual scheduling truth.`
    ];
    const decisions = [
      {
        label: summary.awaiting_manual_confirmation > 0
          ? `Clear ${summary.awaiting_manual_confirmation} manual confirmation${summary.awaiting_manual_confirmation === 1 ? "" : "s"} before adding more appointment pressure`
          : "Keep manual confirmation discipline stable before adding more appointment pressure",
        priority: "High"
      },
      {
        label: reasonSummary
          ? `Review ${reasonSummary} for President follow-up tracking`
          : `Review ${summary.follow_up_needed} open follow-up outcome${summary.follow_up_needed === 1 ? "" : "s"} for President tracking`,
        priority: "Medium"
      },
      {
        label: "Keep Stage B scheduling activation mapped while Stage A manual truth stays clean",
        priority: "Medium"
      }
    ];
    return { briefTitle, briefBullets, decisions };
  }

  const briefTitle = summary.awaiting_worker_confirmation > 0 || summary.awaiting_customer_confirmation > 0
    ? `Stage B has ${summary.awaiting_worker_confirmation} worker and ${summary.awaiting_customer_confirmation} customer confirmation gate${summary.awaiting_worker_confirmation + summary.awaiting_customer_confirmation === 1 ? "" : "s"} open.`
    : "Stage B scheduling confirmations are currently under control.";
  const briefBullets = [
    `${pluralize(summary.rerouted, "rerouted job")} ${summary.rerouted === 1 ? "is" : "are"} visible to the President for scheduling accountability.`,
    `${pluralize(summary.confirmed + summary.in_progress, "appointment")} ${summary.confirmed + summary.in_progress === 1 ? "is" : "are"} ready for execution or structured closeout.`,
    `${pluralize(summary.completed + summary.follow_up_needed, "job")} ${summary.completed + summary.follow_up_needed === 1 ? "has" : "have"} already reached closeout or follow-up handling${reasonSummary ? `, with ${reasonSummary} leading open follow-up pressure` : ""}.`
  ];
  const decisions = [
    {
      label: `Resolve ${summary.awaiting_worker_confirmation} worker confirmation and ${summary.awaiting_customer_confirmation} customer confirmation gate${summary.awaiting_worker_confirmation + summary.awaiting_customer_confirmation === 1 ? "" : "s"}`,
      priority: "High"
    },
    {
      label: reasonSummary
        ? `Review ${reasonSummary} alongside ${summary.rerouted} rerouted scheduling record${summary.rerouted === 1 ? "" : "s"}`
        : `Review ${summary.rerouted} rerouted scheduling record${summary.rerouted === 1 ? "" : "s"} before flow pressure spreads`,
      priority: "Medium"
    },
    {
      label: "Keep service and scheduling accountability aligned while Stage B automation is live",
      priority: "Medium"
    }
  ];
  return { briefTitle, briefBullets, decisions };
}

function getCurrentTabContent() {
  const context = getActiveEntity();
  ensureActiveTab();
  const baseTab = context.entity.tabs[state.tab];
  const stageVariantGroup = stageTabVariants[state.executiveId];
  const liveMetrics = buildLiveSchedulingMetrics();
  if (!stageVariantGroup) return liveMetrics ? { ...baseTab, metrics: liveMetrics } : baseTab;
  const variantScope = context.type === "director" ? stageVariantGroup.directors : stageVariantGroup.executive;
  if (!variantScope) return liveMetrics ? { ...baseTab, metrics: liveMetrics } : baseTab;
  const variantEntityKey = context.type === "director" ? context.entity.id : "executive";
  const variantEntity = variantScope[variantEntityKey];
  if (!variantEntity) return liveMetrics ? { ...baseTab, metrics: liveMetrics } : baseTab;
  const stageVariant = variantEntity[state.tab] && variantEntity[state.tab][state.stage];
  const mergedTab = stageVariant ? mergeTabContent(baseTab, stageVariant) : baseTab;
  return liveMetrics ? { ...mergedTab, metrics: liveMetrics } : mergedTab;
}

function badgeClass(priority) {
  return priority.toLowerCase() === "high" ? "high" : "med";
}

function deltaClass(value) {
  return value.includes("↓") ? "down" : "up";
}

function buildBoardDetails(details) {
  return details.map((item) => `<div>${item.label} <b class="detail-value" style="--detail-color:${item.color}">${item.value}</b></div>`).join("");
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getBoardWordFromScore(score) {
  if (score >= 90) return "Healthy";
  if (score >= 82) return "Stable";
  if (score >= 74) return "Watch";
  return "Pressure";
}

function buildLiveCooBoard() {
  if (state.executiveId !== "coo") return null;
  const summary = summarizeSchedulingStage(state.stage);
  const topReasons = getTopFollowUpReasons(summary, 1);
  const leadReason = topReasons[0];
  if (state.stage === "A") {
    const score = clampScore(
      92
      - (summary.awaiting_manual_confirmation * 5)
      - (summary.rescheduled * 4)
      - (summary.no_show * 5)
      - (summary.follow_up_needed * 2)
      + (summary.confirmed * 2)
      + (summary.completed * 2)
    );
    return {
      score,
      word: getBoardWordFromScore(score),
      details: [
        {
          label: "Scheduling",
          value: summary.awaiting_manual_confirmation > 0 ? `${summary.awaiting_manual_confirmation} pending` : "Clear",
          color: summary.awaiting_manual_confirmation > 0 ? "var(--gold)" : "var(--green)"
        },
        {
          label: "Confirmed",
          value: String(summary.confirmed),
          color: summary.confirmed > 0 ? "var(--green)" : "var(--gold)"
        },
        {
          label: leadReason ? leadReason.label : "Follow-up",
          value: String(leadReason ? leadReason.count : summary.follow_up_needed),
          color: summary.follow_up_needed > 0 ? "var(--gold)" : "var(--green)"
        }
      ]
    };
  }

  const score = clampScore(
    92
    - (summary.awaiting_worker_confirmation * 4)
    - (summary.awaiting_customer_confirmation * 3)
    - (summary.rerouted * 6)
    - (summary.no_show * 5)
    - (summary.follow_up_needed * 2)
    + (summary.confirmed * 2)
    + (summary.completed * 3)
  );
  return {
    score,
    word: getBoardWordFromScore(score),
    details: [
      {
        label: "Worker Gate",
        value: summary.awaiting_worker_confirmation > 0 ? String(summary.awaiting_worker_confirmation) : "Clear",
        color: summary.awaiting_worker_confirmation > 0 ? "var(--gold)" : "var(--green)"
      },
      {
        label: "Customer Gate",
        value: summary.awaiting_customer_confirmation > 0 ? String(summary.awaiting_customer_confirmation) : "Clear",
        color: summary.awaiting_customer_confirmation > 0 ? "var(--gold)" : "var(--green)"
      },
      {
        label: "Rerouted",
        value: String(summary.rerouted),
        color: summary.rerouted > 0 ? "var(--red)" : "var(--green)"
      }
    ]
  };
}

function buildLiveCooRecommendation() {
  if (state.executiveId !== "coo") return null;
  const summary = summarizeSchedulingStage(state.stage);
  const topReasons = getTopFollowUpReasons(summary, 1);
  const leadReason = topReasons[0];

  if (state.stage === "A") {
    if (summary.awaiting_manual_confirmation > 0) {
      return `Clear ${pluralize(summary.awaiting_manual_confirmation, "manual scheduling confirmation")} first. Stage A still depends on the President locking the real appointment truth before more volume is added.`;
    }
    if (summary.follow_up_needed > 0) {
      return leadReason
        ? `Review ${pluralize(leadReason.count, leadReason.label, leadReason.label)} next so open business outcomes do not disappear behind completed appointments.`
        : `Review ${pluralize(summary.follow_up_needed, "follow-up record")} next so open business outcomes do not disappear behind completed appointments.`;
    }
    if (summary.confirmed > 0) {
      return `Watch ${pluralize(summary.confirmed, "confirmed appointment")} for result entry and revenue truth after the visit completes.`;
    }
    return "Keep Stage A scheduling disciplined and visible. The President should preserve clean appointment truth before broader automation activates.";
  }

  if (summary.awaiting_worker_confirmation > 0) {
    return `Push ${pluralize(summary.awaiting_worker_confirmation, "worker confirmation")} through first. Stage B loses momentum fastest when assigned workers do not lock their appointment windows quickly.`;
  }
  if (summary.awaiting_customer_confirmation > 0) {
    return `Clear ${pluralize(summary.awaiting_customer_confirmation, "customer confirmation gate")} next so accepted jobs turn into fully locked appointments.`;
  }
  if (summary.rerouted > 0) {
    return `Review ${pluralize(summary.rerouted, "rerouted record")} before additional routing pressure spreads. The President should confirm the lane is not stalling under reassignment.`;
  }
  if (summary.follow_up_needed > 0 && leadReason) {
    return `Track ${pluralize(leadReason.count, leadReason.label, leadReason.label)} into clean closure so Stage B follow-up pressure stays explicit and measurable.`;
  }
  if (summary.confirmed + summary.in_progress > 0) {
    return `Track ${pluralize(summary.confirmed + summary.in_progress, "confirmed job")} into structured closeout so Stage B keeps producing clean outcome and revenue truth.`;
  }
  return "Stage B scheduling is currently controlled. Keep confirmation speed, reroute discipline, and structured closeout aligned while automation is live.";
}

function buildLiveCooVisuals() {
  if (state.executiveId !== "coo") return null;
  const summary = summarizeSchedulingStage(state.stage);
  const board = buildLiveCooBoard();
  if (!board) return null;

  if (state.stage === "A") {
    const trend = [
      18 + (summary.provisional * 6),
      28 + (summary.awaiting_manual_confirmation * 12),
      40 + (summary.confirmed * 10),
      26 + (summary.follow_up_needed * 10),
      18 + (summary.rescheduled * 12),
      16 + (summary.completed * 10)
    ];
    return {
      healthTitle: "SCHEDULING HEALTH",
      healthValue: board.score,
      trendTitle: "SCHEDULING PRESSURE",
      trend
    };
  }

  const trend = [
    20 + (summary.awaiting_worker_assignment * 10),
    28 + (summary.awaiting_worker_confirmation * 12),
    32 + (summary.awaiting_customer_confirmation * 12),
    24 + ((summary.confirmed + summary.in_progress) * 10),
    18 + (summary.rerouted * 14),
    20 + ((summary.completed + summary.follow_up_needed) * 10)
  ];
  return {
    healthTitle: "SCHEDULING HEALTH",
    healthValue: board.score,
    trendTitle: "AUTOMATION FLOW",
    trend
  };
}

function buildLiveCooAskResponse(prompt = "", mode = "ask") {
  if (state.executiveId !== "coo") return null;
  const summary = summarizeSchedulingStage(state.stage);
  const trimmedPrompt = prompt.trim();
  const quotedPrompt = trimmedPrompt ? ` Question received: "${trimmedPrompt}"` : "";
  const focusedRecommendation = buildFocusedJobRecommendation() || buildLiveCooRecommendation();

  if (state.stage === "A") {
    if (mode === "followup") {
      return {
        title: "COO FOLLOW-UP",
        text: `Stage A still depends on President-controlled scheduling truth. ${pluralize(summary.awaiting_manual_confirmation, "manual confirmation")} ${summary.awaiting_manual_confirmation === 1 ? "remains" : "remain"} open, while ${pluralize(summary.confirmed, "appointment")} ${summary.confirmed === 1 ? "is" : "are"} already locked and ${pluralize(summary.follow_up_needed, "record")} ${summary.follow_up_needed === 1 ? "is" : "are"} waiting on business follow-through.`,
        action: `Follow-up next step: ${focusedRecommendation}`
      };
    }
    return {
      title: "COO RESPONSE",
      text: `Stage A scheduling pressure is centered on ${pluralize(summary.awaiting_manual_confirmation, "manual confirmation")} and President-controlled appointment truth.${quotedPrompt}`,
      action: focusedRecommendation
    };
  }

  if (mode === "followup") {
    return {
      title: "COO FOLLOW-UP",
      text: `Stage B automation is currently carrying ${pluralize(summary.awaiting_worker_confirmation, "worker confirmation gate")}, ${pluralize(summary.awaiting_customer_confirmation, "customer confirmation gate")}, and ${pluralize(summary.rerouted, "rerouted record")}. That means the main operating pressure is still in confirmation speed, not downstream closeout volume.`,
      action: `Follow-up next step: ${focusedRecommendation}`
    };
  }
  return {
    title: "COO RESPONSE",
    text: `Stage B scheduling pressure is currently concentrated in ${pluralize(summary.awaiting_worker_confirmation, "worker confirmation gate")}, ${pluralize(summary.awaiting_customer_confirmation, "customer confirmation gate")}, and ${pluralize(summary.rerouted, "rerouted record")}.${quotedPrompt}`,
    action: focusedRecommendation
  };
}

function renderBoard(executive) {
  const overview = stageOverview[state.stage];
  const liveBoard = buildLiveCooBoard();
  const score = liveBoard ? liveBoard.score : executive.board.score;
  const word = liveBoard ? liveBoard.word : overview.boardWord;
  const details = liveBoard ? liveBoard.details : overview.boardDetails;
  boardScoreValue.textContent = String(score);
  boardScoreWord.textContent = word;
  boardScoreWord.style.color = score >= 90 ? "var(--green)" : score >= 82 ? "#dce4ef" : score >= 74 ? "var(--gold)" : "var(--red)";
  boardScoreDetails.innerHTML = buildBoardDetails(details);
  boardRing.style.background = `conic-gradient(var(--green) 0 ${score}%, rgba(255,255,255,.08) ${score}% 100%)`;
}

function renderBrief(executive, context) {
  const overview = stageOverview[state.stage];
  const liveOverview = buildLiveCooOverview();
  briefTitle.textContent = liveOverview ? liveOverview.briefTitle : overview.briefTitle;
  const items = liveOverview ? liveOverview.briefBullets.slice() : overview.briefBullets.slice();
  items.push(`${getEntityName(context)} is presenting ${context.type === "director" ? context.entity.role.toLowerCase() : executive.dept.toLowerCase()}${context.type === "director" ? "." : " department."}`);
  briefBullets.innerHTML = items.map((item) => `<div>• ${item}</div>`).join("");
}

function renderDecisions(executive) {
  const overview = stageOverview[state.stage];
  const liveOverview = buildLiveCooOverview();
  const decisions = liveOverview ? liveOverview.decisions : overview.decisions;
  decisionCount.textContent = String(decisions.length);
  decisionList.innerHTML = decisions
    .map((item) => `<div class="decision"><span>${item.label}</span><span class="badge ${badgeClass(item.priority)}">${item.priority}</span></div>`)
    .join("");
}

function renderExecNodes() {
  execNodes.forEach((node) => {
    node.classList.toggle("presenter", node.dataset.id === state.executiveId);
    node.setAttribute("role", "tab");
    node.setAttribute("aria-selected", node.dataset.id === state.executiveId ? "true" : "false");
    node.setAttribute("tabindex", node.dataset.id === state.executiveId ? "0" : "-1");
    const activation = getExecutiveActivation(node.dataset.id);
    const status = getStageStatus(activation);
    node.classList.toggle("stage-active", status === "Active" || status === "Lean Active");
    node.classList.toggle("stage-advanced", status === "Advanced");
    node.classList.toggle("stage-limited", statusToClass(status) === "stage-limited");
    node.classList.toggle("stage-future", statusToClass(status) === "stage-future");
    node.title = buildActivationMessage(node.dataset.id.toUpperCase(), activation);
  });
}

function renderDirectors(context) {
  const executive = context.executive;
  directorsNode.setAttribute("role", "tablist");
  directorsNode.setAttribute("aria-label", `${executive.name} directors`);
  directorsNode.innerHTML = executive.directors
    .map((item) => {
      const active = item.id === state.directorId ? " active" : "";
      const activation = getDirectorActivation(state.executiveId, item.id);
      const status = getStageStatus(activation);
      const stageClass = statusToClass(status);
      const advancedClass = status === "Advanced" ? " stage-advanced" : "";
      const liveClass = (status === "Active" || status === "Lean Active") && stageClass !== "stage-active" ? " stage-active" : "";
      return `<div class="director ${stageClass}${advancedClass}${liveClass}${active}" data-director-id="${item.id}" title="${buildActivationMessage(item.label, activation)}" role="tab" tabindex="${item.id === state.directorId ? "0" : "-1"}" aria-selected="${item.id === state.directorId ? "true" : "false"}"><strong>${item.label}</strong><span>${item.role} • ${statusShortLabel(status, activation)}</span></div>`;
    })
    .join("");

  directorsNode.querySelectorAll("[data-director-id]").forEach((node) => {
    const handleActivate = () => selectDirector(node.dataset.directorId);
    node.addEventListener("click", handleActivate);
    activateOnEnterSpace(node, handleActivate);
    attachSingleSelectArrowNavigation(node, () => Array.from(directorsNode.querySelectorAll("[data-director-id]")));
  });
}

function renderTabs(context) {
  tabsNode.setAttribute("role", "tablist");
  tabsNode.setAttribute("aria-label", `${getEntityName(context)} views`);
  tabsNode.innerHTML = getTabKeys(context)
    .map((tabName) => `<div class="tab${tabName === state.tab ? " active" : ""}" data-tab-name="${tabName}" role="tab" tabindex="${tabName === state.tab ? "0" : "-1"}" aria-selected="${tabName === state.tab ? "true" : "false"}">${tabName}</div>`)
    .join("");

  tabsNode.querySelectorAll("[data-tab-name]").forEach((node) => {
    const handleActivate = () => selectTab(node.dataset.tabName);
    node.addEventListener("click", handleActivate);
    activateOnEnterSpace(node, handleActivate);
    attachSingleSelectArrowNavigation(node, () => Array.from(tabsNode.querySelectorAll("[data-tab-name]")));
  });
}

function renderMetrics(tabContent) {
  metricsNode.innerHTML = tabContent.metrics
    .map((metric) => `<div class="metric"><label>${metric.label}</label><strong>${metric.value}</strong><div class="${deltaClass(metric.delta)}">${metric.delta}</div></div>`)
    .join("");
}

function renderFollowUpBreakdown() {
  const summary = summarizeSchedulingStage(state.stage);
  const reasons = getTopFollowUpReasons(summary, 6);
  if (!reasons.length) {
    followUpBreakdown.classList.add("hidden");
    followUpBreakdownGrid.innerHTML = "";
    return;
  }
  followUpBreakdown.classList.remove("hidden");
  followUpBreakdownTitle.textContent = state.stage === "A"
    ? "FOLLOW-UP BREAKDOWN"
    : state.executiveId === "coo"
      ? "OPEN FOLLOW-UP PRESSURE"
      : "FOLLOW-UP PRESSURE";
  followUpBreakdownGrid.innerHTML = reasons.map((item) => `
    <button class="followup-breakdown-item${state.followUpReasonFilter === item.reason ? " active" : ""}" type="button" data-followup-reason="${item.reason}">
      <label>${item.label}</label>
      <strong>${item.count}</strong>
      <span>${state.stage === "A" ? "President-tracked manual follow-up pressure." : "Live follow-up pressure after automation gates."}</span>
    </button>
  `).join("");
  followUpBreakdownGrid.querySelectorAll("[data-followup-reason]").forEach((button) => {
    button.addEventListener("click", () => toggleFollowUpReasonFilter(button.dataset.followupReason));
  });
}

function renderQueueFilterBanner() {
  if (!state.followUpReasonFilter) {
    queueFilterBanner.classList.add("hidden");
    return;
  }
  queueFilterBanner.classList.remove("hidden");
  queueFilterValue.textContent = getFollowUpReasonLabel(state.followUpReasonFilter);
}

function getSchedulingPipelineConfig(context) {
  if (state.executiveId !== "coo") return null;
  const isSchedulingView = state.tab === "Scheduling" || state.directorId === "scheduling";
  if (!isSchedulingView) return null;

  const summary = summarizeSchedulingStage(state.stage);

  const configs = {
    A: {
      title: "SCHEDULING FLOW",
      subtitle: "Stage A manual scheduling flow recorded by the President.",
      steps: ["Provisional", "Awaiting Manual Confirm", "Confirmed", "Rescheduled", "Completed"],
      active: summary.awaiting_manual_confirmation > 0
        ? "Awaiting Manual Confirm"
        : summary.rescheduled > 0
          ? "Rescheduled"
          : summary.confirmed > 0
            ? "Confirmed"
            : "Provisional",
      complete: [
        summary.awaiting_manual_confirmation > 0 || summary.confirmed > 0 || summary.rescheduled > 0 || summary.completed > 0 || summary.follow_up_needed > 0 || summary.canceled > 0 || summary.no_show > 0
          ? "Provisional"
          : null,
        summary.confirmed > 0 || summary.rescheduled > 0 || summary.completed > 0 || summary.follow_up_needed > 0 || summary.canceled > 0 || summary.no_show > 0
          ? "Awaiting Manual Confirm"
          : null,
        summary.rescheduled > 0 || summary.completed > 0 || summary.follow_up_needed > 0 || summary.canceled > 0 || summary.no_show > 0
          ? "Confirmed"
          : null
      ].filter(Boolean)
    },
    B: {
      title: "SCHEDULING FLOW",
      subtitle: "Stage B automated scheduling flow with worker and customer confirmation.",
      steps: ["Provisional", "Awaiting Worker Confirm", "Awaiting Customer Confirm", "Confirmed", "Rerouted", "Completed"],
      active: summary.awaiting_worker_confirmation > 0
        ? "Awaiting Worker Confirm"
        : summary.awaiting_customer_confirmation > 0
          ? "Awaiting Customer Confirm"
          : summary.rerouted > 0
            ? "Rerouted"
            : summary.confirmed > 0 || summary.in_progress > 0
              ? "Confirmed"
              : "Completed",
      complete: [
        summary.awaiting_worker_confirmation > 0 || summary.awaiting_customer_confirmation > 0 || summary.confirmed > 0 || summary.in_progress > 0 || summary.rerouted > 0 || summary.completed > 0 || summary.follow_up_needed > 0 || summary.canceled > 0 || summary.no_show > 0
          ? "Provisional"
          : null,
        summary.awaiting_customer_confirmation > 0 || summary.confirmed > 0 || summary.in_progress > 0 || summary.rerouted > 0 || summary.completed > 0 || summary.follow_up_needed > 0 || summary.canceled > 0 || summary.no_show > 0
          ? "Awaiting Worker Confirm"
          : null,
        summary.confirmed > 0 || summary.in_progress > 0 || summary.completed > 0 || summary.follow_up_needed > 0 || summary.canceled > 0 || summary.no_show > 0
          ? "Awaiting Customer Confirm"
          : null,
        summary.completed > 0 || summary.follow_up_needed > 0 || summary.canceled > 0 || summary.no_show > 0
          ? "Confirmed"
          : null
      ].filter(Boolean)
    },
    C: {
      title: "SCHEDULING FLOW",
      subtitle: "Stage C scheduling flow with optimization, accountability, and completion pressure.",
      steps: ["Provisional", "Confirmed", "Rerouted", "Completed", "Follow-up Needed"],
      active: state.directorId === "scheduling" && state.tab === "Risks" ? "Rerouted" : state.directorId === "scheduling" && state.tab === "Dependencies" ? "Completed" : "Confirmed",
      complete: ["Provisional"]
    }
  };

  return configs[state.stage];
}

function renderSchedulingPipeline(context) {
  const config = getSchedulingPipelineConfig(context);
  if (!config) {
    schedulePipeline.classList.add("hidden");
    schedulePipeline.innerHTML = "";
    return;
  }

  schedulePipeline.classList.remove("hidden");
  schedulePipeline.innerHTML = `
    <div class="flow-head">
      <div>
        <h4>${config.title}</h4>
        <div class="flow-sub">${config.subtitle}</div>
      </div>
    </div>
    <div class="flow-steps">
      ${config.steps.map((step) => {
        const active = step === config.active ? " active" : "";
        const complete = config.complete.includes(step) ? " complete" : "";
        return `<div class="flow-step${active}${complete}"><label>STATE</label><strong>${step}</strong></div>`;
      }).join("")}
    </div>
  `;
}

function shouldShowJobRecordsButton() {
  if (state.executiveId !== "coo") return false;
  return state.tab === "Scheduling" || state.directorId === "scheduling";
}

function buildDashboardRoute(path, extra = {}) {
  const nextParams = new URLSearchParams(queryParams.toString());
  nextParams.set("stage", state.stage);
  if (state.jobFocus && state.jobFocus.id) {
    nextParams.set("job", state.jobFocus.id);
  } else {
    nextParams.delete("job");
  }
  if (state.followUpReasonFilter) {
    nextParams.set("followup", state.followUpReasonFilter);
  } else {
    nextParams.delete("followup");
  }
  Object.entries(extra).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
  });
  return `${path}?${nextParams.toString()}`;
}

function openJobRecords() {
  if (window.AIABCStageConfig && typeof window.AIABCStageConfig.setCurrentStage === "function") {
    window.AIABCStageConfig.setCurrentStage(state.stage);
  }
  const nextUrl = buildDashboardRoute("job-records.html", { source: "president-dashboard" });
  window.location.href = nextUrl;
}

function openFollowUpHub() {
  const nextUrl = buildDashboardRoute("president-follow-up.html", { source: "president-dashboard" });
  window.location.href = nextUrl;
}

function openFocusedJobRecord() {
  if (!state.jobFocus || !state.jobFocus.id) return;
  if (window.AIABCStageConfig && typeof window.AIABCStageConfig.setCurrentStage === "function") {
    window.AIABCStageConfig.setCurrentStage(state.stage);
  }
  window.location.href = buildDashboardRoute("job-records.html", { source: "president-dashboard" });
}

function selectFocusedJob(jobId) {
  const nextFocus = resolveRequestedJobFocus(jobId, state.stage);
  if (!nextFocus) return;
  const target = getFocusNavigationTarget(nextFocus);
  state.jobFocus = nextFocus;
  state.executiveId = target.executiveId;
  state.directorId = target.directorId;
  state.tab = target.tab;
  state.responseMode = false;
  state.presentationMode = false;
  state.responsePayload = null;
  syncDashboardUrl();
  renderSurface();
}

function toggleFollowUpReasonFilter(reason) {
  state.followUpReasonFilter = state.followUpReasonFilter === reason ? "" : reason;
  const filteredQueue = getPresidentQueueRecords(state.stage);
  if (!state.jobFocus || (state.followUpReasonFilter && !(state.jobFocus.statusValue === "follow_up_needed" && state.jobFocus.followUpReason === state.followUpReasonFilter))) {
    state.jobFocus = filteredQueue[0] || state.jobFocus;
    if (state.jobFocus) {
      syncContextToFocusedJob({ skipRender: true });
    }
  }
  renderSurface();
}

function syncDashboardUrl() {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("stage", state.stage);
  if (state.jobFocus && state.jobFocus.id) {
    nextUrl.searchParams.set("job", state.jobFocus.id);
  } else {
    nextUrl.searchParams.delete("job");
  }
  if (requestedSource) {
    nextUrl.searchParams.set("source", requestedSource);
  }
  if (state.followUpReasonFilter) {
    nextUrl.searchParams.set("followup", state.followUpReasonFilter);
  } else {
    nextUrl.searchParams.delete("followup");
  }
  window.history.replaceState({}, "", nextUrl.toString());
}

function toggleClosedGroup(groupKey) {
  if (groupKey === "executive") {
    state.closedExecutiveCollapsed = !state.closedExecutiveCollapsed;
  }
  if (groupKey === "risk") {
    state.closedRiskCollapsed = !state.closedRiskCollapsed;
  }
  writeClosedQueuePrefs();
  renderJobQueue();
}

function toggleJobFocusCard() {
  state.jobFocusCollapsed = !state.jobFocusCollapsed;
  writeClosedQueuePrefs();
  renderJobFocusCard();
}

function toggleClosedBand() {
  state.closedBandCollapsed = !state.closedBandCollapsed;
  writeClosedQueuePrefs();
  renderJobQueue();
}

function renderTrend(values, color) {
  trendBars.innerHTML = values
    .map((value) => `<i class="trend-bar" style="--bar-height:${value}px;--bar-color:${color}"></i>`)
    .join("");
}

function renderAsk(context) {
  const entityName = getEntityName(context);
  askTitle.textContent = `${entityName} COMMAND LINE`;
  askName.textContent = entityName;
  askRole.textContent = context.entity.role;
  askIcon.style.borderColor = context.executive.color;
  askIcon.style.color = context.executive.color;
  questionNode.value = context.entity.askPrompt;
}

function renderNav() {
  navItems.forEach((item) => {
    item.classList.remove("active");
    item.setAttribute("tabindex", "-1");
    item.removeAttribute("aria-current");
  });
  const selector = state.presentationMode
    ? '[data-nav-type="view"][data-view="presentation"]'
    : state.systemView === "phone"
      ? '[data-nav-type="system"][data-system="phone"]'
    : state.directorId
      ? `[data-nav-type="executive"][data-target="${state.executiveId}"]`
      : state.executiveId === "ceo"
        ? '[data-nav-type="executive"][data-target="ceo"]'
        : `[data-nav-type="executive"][data-target="${state.executiveId}"]`;
  const activeNav = document.querySelector(selector) || document.querySelector('[data-nav-type="view"][data-view="chamber"]');
  if (activeNav) {
    activeNav.classList.add("active");
    activeNav.setAttribute("tabindex", "0");
    activeNav.setAttribute("aria-current", "page");
  }
}

function renderStatus(context, tabContent) {
  const modeLabel = state.presentationMode ? "Presentation Mode" : state.responseMode ? "Response Mode" : "Live Chamber";
  const jobLabel = state.jobFocus ? ` • ${state.jobFocus.label}` : "";
  const followUpLabel = state.jobFocus && state.jobFocus.statusValue === "follow_up_needed" && state.jobFocus.followUpReasonLabel
    ? ` • ${state.jobFocus.followUpReasonLabel}`
    : "";
  statusBar.textContent = `Stage ${state.stage} • ${getEntityName(context)} • ${state.tab}${jobLabel}${followUpLabel} • ${modeLabel} • ${tabContent.note}`;
}

function renderJobFocusCard() {

  if (!state.jobFocus) {
    jobFocusCard.classList.add("hidden");
    jobFocusCard.classList.remove("is-collapsed");
    jobFocusToggle.textContent = "Collapse";
    jobFocusToggle.setAttribute("aria-expanded", "true");
    jobFocusToggle.dataset.collapsed = "false";
    jobFocusOpenBtn.setAttribute("disabled", "disabled");
    jobFocusOpenBtn.removeAttribute("title");
    jobFocusWorkflow.innerHTML = "";
    jobFocusTimeline.innerHTML = "";
    jobFocusGrid.innerHTML = "";
    return;
  }

  const focus = state.jobFocus;
  const workflow = getJobFocusWorkflowConfig(focus, state.stage);
  const closedReview = ["completed", "canceled", "no_show"].includes(focus.statusValue || "") ? getClosedReviewDescriptor(focus) : null;
  const amountPaidLabel = focus.amountPaid > 0 ? `$${focus.amountPaid.toLocaleString()}` : "Not Recorded";
  const routeDateLabel = focus.routeDate || "Not Routed";
  const timelineItems = (focus.activityTimeline && focus.activityTimeline.length
    ? focus.activityTimeline
    : [{ time: "Now", title: "Record Open", text: `Returned from ${requestedSource || "job record flow"}` }]).slice().reverse();
  jobFocusCard.classList.remove("hidden");
  jobFocusCard.classList.toggle("is-collapsed", state.jobFocusCollapsed);
  jobFocusToggle.textContent = state.jobFocusCollapsed ? "Expand" : "Collapse";
  jobFocusToggle.setAttribute("aria-expanded", state.jobFocusCollapsed ? "false" : "true");
  jobFocusToggle.dataset.collapsed = state.jobFocusCollapsed ? "true" : "false";
  jobFocusOpenBtn.removeAttribute("disabled");
  jobFocusOpenBtn.title = `Open ${focus.label} in Job Records`;
  jobFocusTitle.textContent = `${focus.label} • ${focus.customer}`;
  jobFocusNote.textContent = focus.summary;
  jobFocusStagePill.textContent = `STAGE ${state.stage}`;
  jobFocusTypePill.textContent = focus.appointmentType;
  jobFocusStatusPill.textContent = closedReview ? closedReview.label : focus.statusLabel;
  jobFocusNextAction.textContent = closedReview ? closedReview.label : workflow.nextAction.label;
  jobFocusNextDetail.textContent = closedReview ? closedReview.detail : workflow.nextAction.detail;
  jobFocusWorkflow.innerHTML = workflow.steps.map((step) => `
    <div class="job-focus-step is-${step.status}">
      <label>${step.label}</label>
      <small>${step.status === "complete" ? "Complete" : step.status === "active" ? "Active" : step.status === "blocked" ? "Blocked" : "Upcoming"}</small>
      <span>${step.note}</span>
    </div>
  `).join("");
  jobFocusTimeline.innerHTML = timelineItems.map((item) => `
    <div class="job-focus-timeline-item">
      <label>${item.time || "Update"}</label>
      <strong>${item.title || "Record Update"}</strong>
      <span>${item.text || "Shared record activity remains visible to the President."}</span>
    </div>
  `).join("");
  jobFocusGrid.innerHTML = [
    ["Assigned Rep", focus.assignedRep, closedReview ? `${closedReview.label}: ${focus.outcomeLabel}` : `Outcome: ${focus.outcomeLabel}`],
    ["Time", focus.confirmedTime, "Current scheduling time in record"],
    ["Route Date", routeDateLabel, "Shared routed visit date"],
    ["Amount Paid", amountPaidLabel, "President-entered revenue truth"],
    ["Outcome", focus.outcomeLabel, closedReview ? closedReview.detail : "Current stage outcome state"],
    ["Follow-Up Next Step", focus.followUpReasonLabel || "Not Set", focus.statusValue === "follow_up_needed" ? "Reason currently driving President follow-through." : "Follow-up reason appears only when the record stays open."],
    ["Customer", focus.customer, `${focus.appointmentType}${focus.requestedTime ? ` • Requested ${focus.requestedTime}` : ""}`],
    ["Latest Activity", focus.latestActivity ? focus.latestActivity.title : "Record Open", focus.latestActivity ? focus.latestActivity.text : `Returned from ${requestedSource || "job record flow"}`]
  ].map((item) => `
    <div class="job-focus-metric">
      <label>${item[0]}</label>
      <strong>${item[1]}</strong>
      <span>${item[2]}</span>
    </div>
  `).join("");
}

function getFocusDestinationLabel(focus) {
  const target = getFocusNavigationTarget(focus);
  const executive = dashboard[target.executiveId];
  const director = target.directorId && executive && Array.isArray(executive.directors)
    ? executive.directors.find((item) => item.id === target.directorId)
    : null;
  if (director && target.tab === "Executive Summary") {
    return `${director.label} Briefing`;
  }
  if (director && target.tab === "Risks") {
    return `${director.label} Risks`;
  }
  if (executive && target.tab === "Executive Summary") {
    return `${executive.name} Summary`;
  }
  if (director) {
    return `${director.label} • ${target.tab}`;
  }
  if (executive) {
    return `${executive.name} • ${target.tab}`;
  }
  return target.tab;
}

function buildFocusedJobRecommendation() {
  const focus = state.jobFocus;
  if (!focus) return null;
  const status = focus.statusValue || "";
  const customer = focus.customer || "this customer";
  const jobRef = focus.label || "this record";
  const followUpReasonLabel = focus.followUpReasonLabel || getFollowUpReasonLabel(focus.followUpReason || "");
  const appointmentType = String((focus.appointmentType) || "")
    .toLowerCase()
    .replaceAll("&", "and")
    .replaceAll(/[^a-z]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (status === "awaiting_manual_confirmation") {
    return `Lock manual confirmation for ${jobRef} before shifting attention elsewhere. Stage A still depends on the President settling the real appointment time for ${customer}.`;
  }
  if (status === "provisional") {
    return `Move ${jobRef} out of provisional intake and into a real scheduled commitment before it disappears behind stronger signals.`;
  }
  if (status === "awaiting_worker_assignment") {
    return `Push ${jobRef} into a real assignment quickly so the scheduling engine does not leave ${customer} waiting in queue.`;
  }
  if (status === "awaiting_worker_confirmation") {
    return `Clear the worker confirmation gate on ${jobRef} first. Assignment speed only matters if the worker actually locks the appointment.`;
  }
  if (status === "awaiting_customer_confirmation") {
    return `Push customer confirmation on ${jobRef} next so the appointment turns into locked operating truth.`;
  }
  if (status === "rescheduled") {
    return `Reconfirm the replacement time on ${jobRef} before additional calendar drift spreads into the next day.`;
  }
  if (status === "rerouted") {
    return `Review reroute pressure on ${jobRef} before more scheduling friction spreads through the same lane.`;
  }
  if (status === "no_show") {
    return `Use Scheduling Risks on ${jobRef} to decide whether the no-show becomes a reschedule, a follow-up commitment, or a clean closure before ambiguity spreads into the calendar.`;
  }
  if (status === "follow_up_needed") {
    if (followUpReasonLabel) {
      return `Use ${getFocusDestinationLabel(focus)} on ${jobRef} to govern ${followUpReasonLabel.toLowerCase()}, next-step timing, and visible business truth for ${customer}.`;
    }
    return `Use CEO follow-through on ${jobRef} to keep owner accountability, next-step timing, and business outcome truth visible.`;
  }
  if (status === "confirmed" || status === "in_progress") {
    if (appointmentType === "sales") {
      return `Use Sales Briefing to govern estimate conversion, next-step ownership, and clean outcome truth on ${jobRef}.`;
    }
    if (appointmentType === "service") {
      return `Use Service Briefing to track execution quality, closeout discipline, and revenue truth on ${jobRef}.`;
    }
    if (appointmentType === "sales_and_service") {
      return status === "confirmed"
        ? `Use Sales Briefing first on ${jobRef} so estimate-to-work conversion stays visible before the visit turns into execution.`
        : `Use Service Briefing on ${jobRef} so execution, completion truth, and closeout discipline stay tight after conversion.`;
    }
  }
  if (status === "completed") {
    return `Use CEO summary on ${jobRef} to confirm revenue truth, final closeout quality, and whether the completed result should shape the next operating decision.`;
  }
  if (status === "canceled") {
    return `Use CEO summary on ${jobRef} to confirm why the business was lost, whether recovery is still justified, and what cancellation pattern should stay visible.`;
  }
  return null;
}

function getFocusedRecommendationTitle() {
  const focus = state.jobFocus;
  if (!focus) return "PRESIDENT ACTION";
  const target = getFocusNavigationTarget(focus);
  if (target.executiveId === "coo" && target.directorId === "scheduling") {
    return target.tab === "Risks" ? "SCHEDULING RISK" : "SCHEDULING ACTION";
  }
  if (target.executiveId === "cro" && target.directorId === "sales") {
    return "SALES ACTION";
  }
  if (target.executiveId === "coo" && target.directorId === "service") {
    return "SERVICE ACTION";
  }
  if (target.executiveId === "ceo") {
    return "CEO FOLLOW-THROUGH";
  }
  return "PRESIDENT ACTION";
}

function formatSurfaceTitle(title) {
  const value = String(title || "");
  if (!value) return "Operating Review";
  return value
    .replace(/Operations Operations Presentation/g, "Operations Review")
    .replace(/Department Presentation/g, "Department Review")
    .replace(/Executive Summary Presentation/g, "Executive Summary Review")
    .replace(/Presentation/g, "Review");
}

function buildFocusedFollowUpPrompt() {
  const focus = state.jobFocus;
  if (!focus) return questionNode.value || "What should I review next?";
  const status = focus.statusValue || "";
  const jobRef = focus.label || "this record";
  const customer = focus.customer || "this customer";
  const target = getFocusNavigationTarget(focus);
  const followUpReasonLabel = focus.followUpReasonLabel || getFollowUpReasonLabel(focus.followUpReason || "");

  if (target.executiveId === "cro" && target.directorId === "sales") {
    return followUpReasonLabel
      ? `Sales Director, what is the next highest-value move on ${jobRef} for ${customer} given ${followUpReasonLabel.toLowerCase()}?`
      : `Sales Director, what is the next highest-value move on ${jobRef} for ${customer}?`;
  }
  if (target.executiveId === "coo" && target.directorId === "service") {
    return followUpReasonLabel
      ? `Service Director, what execution step matters most on ${jobRef} given ${followUpReasonLabel.toLowerCase()}?`
      : `Service Director, what execution risk or closeout step matters most on ${jobRef}?`;
  }
  if (target.executiveId === "coo" && target.directorId === "scheduling" && target.tab === "Risks") {
    return `Scheduling Director, what risk needs President attention first on ${jobRef}?`;
  }
  if (target.executiveId === "coo" && target.directorId === "scheduling") {
    return status === "awaiting_manual_confirmation"
      ? `Scheduling Director, what is still blocking manual confirmation on ${jobRef}?`
      : followUpReasonLabel
        ? `Scheduling Director, what should I clear next on ${jobRef} given ${followUpReasonLabel.toLowerCase()}?`
        : `Scheduling Director, what should I clear next on ${jobRef}?`;
  }
  if (target.executiveId === "ceo") {
    return followUpReasonLabel
      ? `CEO, what follow-through should stay visible next on ${jobRef} for ${followUpReasonLabel.toLowerCase()}?`
      : `CEO, what follow-through should stay visible next on ${jobRef}?`;
  }
  return `${getEntityName(getActiveEntity())}, what should I review next on ${jobRef}?`;
}

function buildFocusedFollowUpResponse(prompt) {
  const focus = state.jobFocus;
  if (!focus) return null;
  const jobRef = focus.label || "this record";
  const customer = focus.customer || "this customer";
  const target = getFocusNavigationTarget(focus);
  const cleanPrompt = prompt || buildFocusedFollowUpPrompt();
  const followUpReasonLabel = focus.followUpReasonLabel || getFollowUpReasonLabel(focus.followUpReason || "");

  if (target.executiveId === "cro" && target.directorId === "sales") {
    return {
      title: "Sales FOLLOW-UP",
      text: `Sales follow-through on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "estimate conversion"}, next-step ownership, and visible commitment timing for ${customer}. Question received: "${cleanPrompt}"`,
      action: `Follow-up next step: Use Sales Briefing to keep conversion pressure, ownership, and outcome truth aligned on ${jobRef}.`
    };
  }
  if (target.executiveId === "coo" && target.directorId === "service") {
    return {
      title: "Service FOLLOW-UP",
      text: `Service follow-through on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "execution quality"}, closeout discipline, and revenue truth for ${customer}. Question received: "${cleanPrompt}"`,
      action: `Follow-up next step: Use Service Briefing to keep execution, completion truth, and closeout quality visible on ${jobRef}.`
    };
  }
  if (target.executiveId === "coo" && target.directorId === "scheduling" && target.tab === "Risks") {
    return {
      title: "Scheduling FOLLOW-UP",
      text: `Scheduling risk follow-through on ${jobRef} should stay centered on reroute pressure, no-show ambiguity, and calendar stability before more friction spreads. Question received: "${cleanPrompt}"`,
      action: `Follow-up next step: Use Scheduling Risks to contain pressure before it spreads into adjacent appointments.`
    };
  }
  if (target.executiveId === "coo" && target.directorId === "scheduling") {
    return {
      title: "Scheduling FOLLOW-UP",
      text: `Scheduling follow-through on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "the next commitment gate"}, calendar clarity, and preserving clean appointment truth for ${customer}. Question received: "${cleanPrompt}"`,
      action: `Follow-up next step: Use Scheduling Briefing to clear the current gate before opening more operating pressure.`
    };
  }
  if (target.executiveId === "ceo") {
    return {
      title: "CEO FOLLOW-UP",
      text: `Executive follow-through on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "owner accountability"}, next-step timing, and preserving final business truth for ${customer}. Question received: "${cleanPrompt}"`,
      action: `Follow-up next step: Use CEO Summary to keep accountability and business truth explicit on ${jobRef}.`
    };
  }
  return null;
}

function buildFocusedAskResponse(prompt) {
  const focus = state.jobFocus;
  if (!focus) return null;
  const jobRef = focus.label || "this record";
  const customer = focus.customer || "this customer";
  const target = getFocusNavigationTarget(focus);
  const cleanPrompt = prompt || questionNode.value || "What needs attention?";
  const followUpReasonLabel = focus.followUpReasonLabel || getFollowUpReasonLabel(focus.followUpReason || "");

  if (target.executiveId === "cro" && target.directorId === "sales") {
    return {
      title: "Sales RESPONSE",
      text: `Sales attention on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "estimate conversion"}, ownership of the next move, and protecting revenue truth for ${customer}. Question received: "${cleanPrompt}"`,
      action: `Next step: Use Sales Briefing to keep conversion pressure and outcome truth aligned on ${jobRef}.`
    };
  }
  if (target.executiveId === "coo" && target.directorId === "service") {
    return {
      title: "Service RESPONSE",
      text: `Service attention on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "execution quality"}, closeout discipline, and collected-truth visibility for ${customer}. Question received: "${cleanPrompt}"`,
      action: `Next step: Use Service Briefing to keep execution, closeout quality, and revenue truth visible on ${jobRef}.`
    };
  }
  if (target.executiveId === "coo" && target.directorId === "scheduling" && target.tab === "Risks") {
    return {
      title: "Scheduling RESPONSE",
      text: `Scheduling risk attention on ${jobRef} should stay centered on reroute pressure, no-show ambiguity, and containing friction before it spreads into adjacent appointments. Question received: "${cleanPrompt}"`,
      action: "Next step: Use Scheduling Risks to contain routing pressure before it compounds."
    };
  }
  if (target.executiveId === "coo" && target.directorId === "scheduling") {
    return {
      title: "Scheduling RESPONSE",
      text: `Scheduling attention on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "the current commitment gate"}, calendar clarity, and preserving clean appointment truth for ${customer}. Question received: "${cleanPrompt}"`,
      action: "Next step: Use Scheduling Briefing to clear the current gate before adding more operating pressure."
    };
  }
  if (target.executiveId === "ceo") {
    return {
      title: "CEO RESPONSE",
      text: `Executive attention on ${jobRef} should stay centered on ${followUpReasonLabel ? followUpReasonLabel.toLowerCase() : "owner accountability"}, visible next-step timing, and preserving final business truth for ${customer}. Question received: "${cleanPrompt}"`,
      action: `Next step: Use CEO Summary to keep accountability and business truth explicit on ${jobRef}.`
    };
  }
  return null;
}

function renderJobQueueItems(items) {
  return items.map((item) => `
    <button class="job-queue-item${state.jobFocus && state.jobFocus.id === item.id ? " active" : ""}" type="button" data-job-id="${item.id}">
      <div class="job-queue-top">
        <div>
          <label>${item.label}</label>
          <strong>${item.customer}</strong>
        </div>
        <span class="job-queue-badge ${getClosedQueuePriority(item).tone}">${getClosedQueuePriority(item).label}</span>
        </div>
        <span class="job-queue-destination">${getFocusDestinationLabel(item)}</span>
        <span>${item.statusLabel} • ${item.routeDate || "Route pending"}</span>
        ${item.statusValue === "follow_up_needed" && item.followUpReasonLabel ? `<span>${item.followUpReasonLabel}</span>` : ""}
        <span>${item.confirmedTime}</span>
      </button>
    `).join("");
}

function renderClosedQueueGroup(groupNode, queueNode, countNode, toggleNode, items, collapsed) {
  if (!items.length) {
    groupNode.classList.add("hidden");
    groupNode.classList.remove("is-collapsed");
    queueNode.innerHTML = "";
    countNode.textContent = "0";
    toggleNode.textContent = "Collapse";
    toggleNode.setAttribute("aria-expanded", "true");
    toggleNode.dataset.collapsed = "false";
    return;
  }
  groupNode.classList.remove("hidden");
  groupNode.classList.toggle("is-collapsed", collapsed);
  queueNode.innerHTML = renderJobQueueItems(items);
  countNode.textContent = String(items.length);
  toggleNode.textContent = collapsed ? "Expand" : "Collapse";
  toggleNode.setAttribute("aria-expanded", collapsed ? "false" : "true");
  toggleNode.dataset.collapsed = collapsed ? "true" : "false";
}

function renderJobQueue() {
  const items = getPresidentQueueRecords(state.stage);
  renderQueueFilterBanner();
  if (!items.length) {
    jobQueue.classList.add("hidden");
    jobQueue.innerHTML = "";
  } else {
    jobQueue.classList.remove("hidden");
    jobQueue.innerHTML = items.map((item) => `
      <button class="job-queue-item${state.jobFocus && state.jobFocus.id === item.id ? " active" : ""}" type="button" data-job-id="${item.id}">
        <div class="job-queue-top">
          <div>
            <label>${item.label}</label>
            <strong>${item.customer}</strong>
          </div>
          <span class="job-queue-badge ${getQueuePriority(item).tone}">${getQueuePriority(item).label}</span>
        </div>
        <span class="job-queue-destination">${getFocusDestinationLabel(item)}</span>
        <span>${item.statusLabel} • ${item.routeDate || "Route pending"}</span>
        ${item.statusValue === "follow_up_needed" && item.followUpReasonLabel ? `<span>${item.followUpReasonLabel}</span>` : ""}
        <span>${item.confirmedTime}</span>
      </button>
    `).join("");
  }

  const closedItems = getPresidentClosedQueueRecords(state.stage);
  if (!closedItems.length) {
    closedJobQueueBand.classList.add("hidden");
    closedJobQueueBand.classList.remove("is-collapsed");
    closedBandToggle.textContent = "Collapse";
    closedBandToggle.setAttribute("aria-expanded", "true");
    closedBandToggle.dataset.collapsed = "false";
    renderClosedQueueGroup(closedExecutiveGroup, closedJobQueue, closedExecutiveCount, closedExecutiveToggle, [], false);
    renderClosedQueueGroup(closedRiskGroup, closedRiskQueue, closedRiskCount, closedRiskToggle, [], false);
    return;
  }
  const closedExecutiveItems = closedItems.filter((item) => getFocusNavigationTarget(item).executiveId === "ceo");
  const closedRiskItems = closedItems.filter((item) => {
    const target = getFocusNavigationTarget(item);
    return target.executiveId === "coo" && target.directorId === "scheduling" && target.tab === "Risks";
  });
  closedJobQueueBand.classList.remove("hidden");
  closedJobQueueBand.classList.toggle("is-collapsed", state.closedBandCollapsed);
  closedBandToggle.textContent = state.closedBandCollapsed ? "Expand" : "Collapse";
  closedBandToggle.setAttribute("aria-expanded", state.closedBandCollapsed ? "false" : "true");
  closedBandToggle.dataset.collapsed = state.closedBandCollapsed ? "true" : "false";
  renderClosedQueueGroup(closedExecutiveGroup, closedJobQueue, closedExecutiveCount, closedExecutiveToggle, closedExecutiveItems, state.closedExecutiveCollapsed);
  renderClosedQueueGroup(closedRiskGroup, closedRiskQueue, closedRiskCount, closedRiskToggle, closedRiskItems, state.closedRiskCollapsed);
}

queueFilterClear.addEventListener("click", () => {
  if (!state.followUpReasonFilter) return;
  toggleFollowUpReasonFilter(state.followUpReasonFilter);
});

function renderMode(context) {
  const modeOn = state.presentationMode || state.responseMode;
  const behavior = getBehaviorForStatus(getStageStatus(context.activation));
  const guidance = getOperationalGuidance(context);
  const useGuidance = shouldUseGuidanceMessaging(context);
  const focusedRecommendationTitle = getFocusedRecommendationTitle();
  surface.classList.toggle("response-mode", modeOn);
  presentationBtn.textContent = state.presentationMode ? "Return to Dashboard" : "Rotate to Presentation";
  const entityName = getEntityName(context);
  respTitle.textContent = state.presentationMode ? `${entityName} PRESENTATION MODE` : `${entityName} RESPONSE`;
  respActionTitle.textContent = focusedRecommendationTitle;
  if (state.responseMode && state.responsePayload && !state.presentationMode) {
    respTitle.textContent = state.responsePayload.title || `${entityName} RESPONSE`;
    respText.textContent = state.responsePayload.text || "";
    respAction.textContent = state.responsePayload.action || "";
    return;
  }
  respText.textContent = state.presentationMode
    ? `${entityName} is now in presentation mode. ${getCurrentTabContent().note}`
    : useGuidance
      ? guidance.summary
      : context.entity.response;
  respAction.textContent = state.presentationMode
    ? getCurrentTabContent().recommendation
    : useGuidance
      ? guidance.action
      : context.entity.action;
}

function renderSurface() {
  syncSystemViewState();
  const context = getActiveEntity();
  const tabContent = getCurrentTabContent();
  const behavior = getBehaviorForStatus(getStageStatus(context.activation));
  const useGuidance = shouldUseGuidanceMessaging(context);
  const liveRecommendation = buildLiveCooRecommendation();
  const focusedRecommendation = buildFocusedJobRecommendation();
  const focusedRecommendationTitle = getFocusedRecommendationTitle();
  const liveVisuals = buildLiveCooVisuals();
  const jobFocusText = state.jobFocus ? ` Focused from Job Records: ${state.jobFocus.label} for ${state.jobFocus.customer}. ${state.jobFocus.summary}` : "";

  document.documentElement.style.setProperty("--active", context.executive.color);
  stageNote.textContent = stageCopy[state.stage].note;
  stageLivePill.textContent = `STAGE ${state.stage}`;
  stageBadge.textContent = `STAGE ${state.stage}`;
  stageBannerText.innerHTML = `<strong>Stage ${state.stage}</strong> ${stageCopy[state.stage].banner}`;
  stageBannerMeta.textContent = state.jobFocus ? `${stageCopy[state.stage].meta} • ${state.jobFocus.label}` : stageCopy[state.stage].meta;
  subtitle.textContent = state.directorId
    ? `${stageCopy[state.stage].chamber} ${context.executive.name} has delegated the floor to ${context.entity.label}.${jobFocusText}`
    : `${stageCopy[state.stage].chamber} ${getEntityName(context)} currently has the floor.${jobFocusText}`;
  surfaceTitle.textContent = formatSurfaceTitle(tabContent.title);
  surfaceSub.textContent = `${tabContent.subtitle} ${buildActivationMessage(getEntityName(context), context.activation)}${jobFocusText}`;
  healthTitle.textContent = liveVisuals ? liveVisuals.healthTitle : "COMPANY HEALTH";
  trendTitle.textContent = liveVisuals ? liveVisuals.trendTitle : "TREND";
  recommendationTitle.textContent = focusedRecommendation ? focusedRecommendationTitle : "PRESIDENT ACTION";
  pieChart.textContent = String(liveVisuals ? liveVisuals.healthValue : tabContent.pie);
  recNode.textContent = focusedRecommendation || liveRecommendation || (useGuidance ? getOperationalGuidance(context).recommendation : tabContent.recommendation);
  renderJobFocusCard();
  renderJobQueue();

  renderBoard(context.executive);
  renderBrief(context.executive, context);
  renderDecisions(context.executive);
  renderExecNodes();
  renderDirectors(context);
  renderTabs(context);
  renderMetrics(tabContent);
  renderFollowUpBreakdown();
  renderSchedulingPipeline(context);
  jobRecordsBtn.classList.toggle("hidden", !shouldShowJobRecordsButton());
  followUpHubBtn.classList.toggle("hidden", !state.jobFocus);
  renderTrend(liveVisuals ? liveVisuals.trend : tabContent.trend, context.executive.color);
  renderAsk(context);
  renderMode(context);
  renderNav();
  renderStatus(context, tabContent);
  if (focusOverlay.classList.contains("open")) {
    syncFocusView(context, tabContent);
  }
}

function selectExec(id) {
  state.executiveId = id;
  state.directorId = "";
  state.systemView = null;
  state.tab = "Executive Summary";
  state.responseMode = false;
  state.presentationMode = false;
  state.responsePayload = null;
  renderSurface();
}

function selectDirector(id) {
  state.directorId = id;
  state.systemView = isPhoneSystemContext() ? "phone" : null;
  state.tab = "Executive Summary";
  state.responseMode = false;
  state.presentationMode = false;
  state.responsePayload = null;
  renderSurface();
}

function selectTab(tabName) {
  state.tab = tabName;
  state.responseMode = false;
  state.responsePayload = null;
  renderSurface();
}

function openPhoneSystemView() {
  state.executiveId = "coo";
  state.directorId = "communications";
  state.systemView = "phone";
  state.tab = "Executive Summary";
  state.responseMode = false;
  state.presentationMode = false;
  state.responsePayload = null;
  renderSurface();
}

function askExecutive() {
  const context = getActiveEntity();
  const behavior = getBehaviorForStatus(getStageStatus(context.activation));
  const guidance = getOperationalGuidance(context);
  const useGuidance = shouldUseGuidanceMessaging(context);
  const liveAskResponse = buildLiveCooAskResponse(questionNode.value, "ask");
  const focusedAskResponse = buildFocusedAskResponse(questionNode.value.trim());
  state.responseMode = true;
  state.presentationMode = false;
  const prompt = questionNode.value.trim();
  if (prompt) {
    if (liveAskResponse) {
      state.responsePayload = liveAskResponse;
    } else if (focusedAskResponse) {
      state.responsePayload = focusedAskResponse;
    } else if (useGuidance) {
      state.responsePayload = {
        title: `${getEntityName(context)} RESPONSE`,
        text: `${guidance.summary} Question received: "${prompt}"`,
        action: guidance.action
      };
    } else {
      state.responsePayload = {
        title: `${getEntityName(context)} RESPONSE`,
        text: `${context.entity.response} Question received: "${prompt}"`,
        action: context.entity.action
      };
    }
  }
  renderMode(context);
  renderStatus(context, getCurrentTabContent());
}

function togglePresentation() {
  state.presentationMode = !state.presentationMode;
  state.responseMode = false;
  state.responsePayload = null;
  renderSurface();
}

function activateOnEnterSpace(node, handler) {
  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler();
    }
  });
}

function attachSingleSelectArrowNavigation(node, getNodes) {
  node.addEventListener("keydown", (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const nodes = getNodes().filter((item) => !item.classList.contains("hidden"));
    const currentIndex = nodes.indexOf(node);
    if (currentIndex === -1 || !nodes.length) return;
    event.preventDefault();
    let nextIndex = currentIndex;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = currentIndex === 0 ? nodes.length - 1 : currentIndex - 1;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = currentIndex === nodes.length - 1 ? 0 : currentIndex + 1;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = nodes.length - 1;
    const nextNode = nodes[nextIndex];
    if (nextNode) nextNode.focus();
  });
}

function attachLinearArrowNavigation(node, getNodes) {
  node.addEventListener("keydown", (event) => {
    const keys = ["ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const nodes = getNodes().filter((item) => !item.hasAttribute("disabled"));
    const currentIndex = nodes.indexOf(node);
    if (currentIndex === -1 || !nodes.length) return;
    event.preventDefault();
    let nextIndex = currentIndex;
    if (event.key === "ArrowUp") {
      nextIndex = currentIndex === 0 ? nodes.length - 1 : currentIndex - 1;
    }
    if (event.key === "ArrowDown") {
      nextIndex = currentIndex === nodes.length - 1 ? 0 : currentIndex + 1;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = nodes.length - 1;
    const nextNode = nodes[nextIndex];
    if (nextNode) nextNode.focus();
  });
}

function attachNavHandlers() {
  sidebarNav.setAttribute("aria-label", "Primary dashboard navigation");
  navItems.forEach((item) => {
    item.setAttribute("role", "link");
    item.setAttribute("tabindex", item.classList.contains("active") ? "0" : "-1");
    if (item.classList.contains("active")) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
    const handleActivate = () => {
      const type = item.dataset.navType;
      if (type === "executive") {
        selectExec(item.dataset.target);
        return;
      }
      if (type === "system") {
        if (item.dataset.system === "phone") {
          openPhoneSystemView();
        }
        return;
      }
      if (type === "route") {
        const nextParams = new URLSearchParams(queryParams.toString());
        nextParams.set("stage", state.stage);
        nextParams.set("source", "president-dashboard");
        if (state.jobFocus && state.jobFocus.id) {
          nextParams.set("job", state.jobFocus.id);
        } else {
          nextParams.delete("job");
        }
        if (state.followUpReasonFilter) {
          nextParams.set("followup", state.followUpReasonFilter);
        } else {
          nextParams.delete("followup");
        }
        if (item.dataset.route === "crm") {
          window.location.href = `crm.html?${nextParams.toString()}`;
          return;
        }
        if (item.dataset.route === "dispatcher") {
          window.location.href = `dispatcher-dashboard.html?${nextParams.toString()}`;
          return;
        }
        if (item.dataset.route === "settings") {
          window.location.href = `settings.html?${nextParams.toString()}`;
        }
        return;
      }
      if (type === "tab") {
        state.directorId = "";
        state.systemView = null;
        state.presentationMode = false;
        state.responseMode = false;
        state.responsePayload = null;
        if (item.dataset.target && getExecutive().tabs[item.dataset.target]) {
          state.tab = item.dataset.target;
        } else {
          state.tab = "Executive Summary";
        }
        renderSurface();
        return;
      }
      if (type === "view") {
        if (item.dataset.view === "presentation") {
          state.systemView = null;
          state.presentationMode = true;
          state.responseMode = false;
          state.responsePayload = null;
        } else {
          state.systemView = null;
          state.presentationMode = false;
          state.responseMode = false;
          state.responsePayload = null;
          if (!state.executiveId) state.executiveId = "coo";
        }
        renderSurface();
      }
    };
    item.addEventListener("click", handleActivate);
    activateOnEnterSpace(item, handleActivate);
    attachLinearArrowNavigation(item, () => navItems);
  });
}

function attachExecutiveHandlers() {
  executiveRail.setAttribute("role", "tablist");
  execNodes.forEach((node) => {
    const handleActivate = () => selectExec(node.dataset.id);
    node.addEventListener("click", handleActivate);
    activateOnEnterSpace(node, handleActivate);
    attachSingleSelectArrowNavigation(node, () => execNodes);
  });
}

function selectStage(stage) {
  if (!stageCopy[stage] || state.stage === stage) return;
  state.stage = stageConfig.setLiveStage(stage);
  state.responseMode = false;
  state.presentationMode = false;
  state.responsePayload = null;
  syncJobFocusFromSharedState({ skipRender: true });
  ensureActiveTab();
  syncDashboardUrl();
  renderSurface();
}

function syncFocusView(context = getActiveEntity(), tabContent = getCurrentTabContent()) {
  void context;
  void tabContent;
  if (!state.jobFocus) {
    focusJobRecordBtn.classList.add("hidden");
    focusJobRecordBtn.removeAttribute("title");
    return;
  }
  focusJobRecordBtn.classList.remove("hidden");
  focusJobRecordBtn.title = `Open ${state.jobFocus.label} in Job Records`;
}

function openFocusView() {
  syncFocusView();
  if (!chamberPlaceholder) {
    chamberPlaceholder = document.createElement("div");
    chamberPlaceholder.style.height = `${chamber.getBoundingClientRect().height}px`;
    chamberPlaceholder.dataset.focusPlaceholder = "true";
    chamber.parentNode.insertBefore(chamberPlaceholder, chamber);
  }
  focusBody.appendChild(chamber);
  focusOverlay.classList.add("open");
  focusOverlay.setAttribute("aria-hidden", "false");
}

function closeFocusOverlay() {
  if (chamberPlaceholder && chamberPlaceholder.parentNode) {
    chamberPlaceholder.parentNode.insertBefore(chamber, chamberPlaceholder);
    chamberPlaceholder.remove();
    chamberPlaceholder = null;
  }
  focusOverlay.classList.remove("open");
  focusOverlay.setAttribute("aria-hidden", "true");
}

periodBtn.addEventListener("click", () => {
  state.periodMode = state.periodMode === "MTD" ? "QTD" : "MTD";
  periodBtn.textContent = state.periodMode;
  statusBar.textContent = `${statusBar.textContent.split(" • ")[0]} • ${state.tab} • ${state.periodMode} view active`;
});

compareBtn.addEventListener("click", () => {
  state.compareMode = !state.compareMode;
  compareBtn.textContent = state.compareMode ? "vs Plan" : "vs Last Month";
  renderStatus(getActiveEntity(), getCurrentTabContent());
});

jobRecordsBtn.addEventListener("click", openJobRecords);
followUpHubBtn.addEventListener("click", openFollowUpHub);
presentationBtn.addEventListener("click", togglePresentation);
askButton.addEventListener("click", askExecutive);
jobQueue.addEventListener("click", (event) => {
  const button = event.target.closest("[data-job-id]");
  if (!button) return;
  selectFocusedJob(button.dataset.jobId);
});
closedJobQueue.addEventListener("click", (event) => {
  const button = event.target.closest("[data-job-id]");
  if (!button) return;
  selectFocusedJob(button.dataset.jobId);
});
closedRiskQueue.addEventListener("click", (event) => {
  const button = event.target.closest("[data-job-id]");
  if (!button) return;
  selectFocusedJob(button.dataset.jobId);
});
jobFocusToggle.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (typeof event.stopImmediatePropagation === "function") {
    event.stopImmediatePropagation();
  }
  toggleJobFocusCard();
});
jobFocusToggle.addEventListener("mousedown", (event) => {
  event.preventDefault();
  event.stopPropagation();
});
jobFocusOpenBtn.addEventListener("click", openFocusedJobRecord);
closedBandToggle.addEventListener("click", () => toggleClosedBand());
closedExecutiveToggle.addEventListener("click", () => toggleClosedGroup("executive"));
closedRiskToggle.addEventListener("click", () => toggleClosedGroup("risk"));
focusJobRecordBtn.addEventListener("click", openFocusedJobRecord);

followUpButton.addEventListener("click", () => {
  state.responseMode = true;
  state.presentationMode = false;
  const context = getActiveEntity();
  const followUpPrompt = buildFocusedFollowUpPrompt();
  questionNode.value = followUpPrompt;
  const liveAskResponse = buildLiveCooAskResponse(followUpPrompt, "followup");
  const focusedFollowUpResponse = buildFocusedFollowUpResponse(followUpPrompt);
  if (liveAskResponse) {
    state.responsePayload = liveAskResponse;
  } else if (focusedFollowUpResponse) {
    state.responsePayload = focusedFollowUpResponse;
  } else {
    state.responsePayload = {
      title: `${getEntityName(context)} FOLLOW-UP`,
      text: `${context.entity.response} Follow-up emphasis: ${getCurrentTabContent().note} Question received: "${followUpPrompt}"`,
      action: `Follow-up next step: ${getCurrentTabContent().recommendation}`
    };
  }
  surface.classList.add("response-mode");
  renderMode(context);
  renderStatus(context, getCurrentTabContent());
});

focusViewBtn.addEventListener("click", openFocusView);
closeFocusView.addEventListener("click", closeFocusOverlay);
focusOverlay.addEventListener("click", (event) => {
  if (event.target === focusOverlay) closeFocusOverlay();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && focusOverlay.classList.contains("open")) {
    closeFocusOverlay();
  }
});
window.addEventListener("pageshow", () => {
  syncJobFocusFromSharedState();
});
window.addEventListener("focus", () => {
  syncJobFocusFromSharedState();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    syncJobFocusFromSharedState();
  }
});

window.setDashboardStage = selectStage;
window.selectExec = selectExec;
window.togglePresentation = togglePresentation;
window.askExecutive = askExecutive;

attachNavHandlers();
attachExecutiveHandlers();
renderSurface();

if (requestedView === "focus") {
  syncJobFocusFromSharedState({ skipRender: true });
  syncContextToFocusedJob({ skipRender: true });
  renderSurface();
  window.setTimeout(() => {
    openFocusView();
  }, 0);
}
