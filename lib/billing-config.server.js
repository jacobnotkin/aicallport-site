const PRICE_CENTS = {
  standardBase: 34900,
  luxuryBase: 49900,
  scheduling: 14900,
  advancedManagement: 29900,
  outbound: 19900,
  additionalLanguage: 9900,
  crmSync: 14900,
  additionalSeat: 1500,
  referralCredit: 1000
};

const INCLUDED_MINUTES = 1000;
const BILLING_PHASES = {
  betaMonthOne: "beta_month_one",
  standard: "standard"
};

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function parseSetupParams(source) {
  const additionalSetup = parseList(source.additionalSetup);
  const voiceTier = source.voiceTier === "Luxury" ? "Luxury" : "Standard";
  const staffCount = Math.max(Number(source.staffCount || 0) || 0, 0);
  const schedulingEnabled = Boolean(source.schedulingMode && source.schedulingMode !== "No scheduling needed");

  return {
    companyName: source.companyName || "",
    ownerName: source.ownerName || "",
    businessEmail: source.businessEmail || "",
    businessPhone: source.businessPhone || "",
    businessWebsite: source.businessWebsite || "",
    country: source.country || "",
    countryStatus: source.countryStatus || "Active",
    industry: source.industry || "",
    businessModel: source.businessModel || "",
    schedulingMode: source.schedulingMode || "No scheduling needed",
    staffCount,
    locationMode: source.locationMode || "",
    leadSources: parseList(source.leadSources),
    languages: parseList(source.languages),
    crmName: source.crmName || "",
    voiceTier,
    referralCode: source.ref || source.referralCode || "",
    additionalSetup,
    upgrades: {
      scheduling: schedulingEnabled,
      advancedManagement: source.advancedManagementEnabled === "Yes" || source.advancedManagementEnabled === true,
      outbound: source.outboundEnabled === "Yes",
      additionalLanguage: additionalSetup.includes("Additional language support"),
      crmSync: additionalSetup.includes("External CRM integration"),
      extraSeats: schedulingEnabled ? Math.max(staffCount - 3, 0) : 0
    },
    carryOver: {
      scheduling: schedulingEnabled,
      advancedManagement: source.advancedManagementEnabled === "Yes" || source.advancedManagementEnabled === true,
      outbound: source.outboundEnabled === "Yes",
      additionalLanguage: additionalSetup.includes("Additional language support"),
      crmSync: additionalSetup.includes("External CRM integration"),
      extraSeats: schedulingEnabled ? Math.max(staffCount - 3, 0) : 0
    }
  };
}

function getBasePlan(profile) {
  return {
    key: profile.voiceTier === "Luxury" ? "luxuryBase" : "standardBase",
    name: profile.voiceTier === "Luxury" ? "Luxury System" : "Standard System",
    amountCents: profile.voiceTier === "Luxury" ? PRICE_CENTS.luxuryBase : PRICE_CENTS.standardBase,
    includedMinutes: INCLUDED_MINUTES,
    overageRateCents: profile.voiceTier === "Luxury" ? 45 : 30
  };
}

function getRecurringUpgradeItems(profile, carryOnly) {
  const source = carryOnly ? profile.carryOver : profile.upgrades;
  const items = [];

  if (source.scheduling) items.push({ key: "scheduling", name: "Scheduling", amountCents: PRICE_CENTS.scheduling, description: "Service or sales scheduling, reminders, confirmations, and booking workflow setup." });
  if (source.advancedManagement) items.push({ key: "advancedManagement", name: "Advanced Management", amountCents: PRICE_CENTS.advancedManagement, description: "Task control, staff management, sales pipeline, and approvals." });
  if (source.outbound) items.push({ key: "outbound", name: "Outbound Follow-Up", amountCents: PRICE_CENTS.outbound, description: "Uses existing leads, uploaded databases, and follow-up workflows." });
  if (source.additionalLanguage) items.push({ key: "additionalLanguage", name: "Additional Language Pack", amountCents: PRICE_CENTS.additionalLanguage, description: "Adds multilingual customer-facing support beyond one language." });
  if (source.crmSync) items.push({ key: "crmSync", name: "External CRM Integration", amountCents: PRICE_CENTS.crmSync, description: "Connects AI Call Port to an existing CRM." });
  if (source.extraSeats > 0) {
    items.push({
      key: "additionalSeats",
      name: `Additional Staff Seats (${source.extraSeats})`,
      amountCents: source.extraSeats * PRICE_CENTS.additionalSeat,
      description: "Scheduling includes 3 staff seats. Extra seats are billed only when needed."
    });
  }

  return items;
}

function buildBillingSnapshot({ profile, phase, activeReferralCount, usageMinutes }) {
  const basePlan = getBasePlan(profile);
  const currentItems = [
    {
      key: "base",
      name: basePlan.name,
      amountCents: basePlan.amountCents,
      description: `Base system with ${basePlan.includedMinutes} included minutes.`
    },
    ...getRecurringUpgradeItems(profile, false).map((item) => ({
      ...item,
      amountCents: phase === BILLING_PHASES.betaMonthOne ? 0 : item.amountCents,
      description: phase === BILLING_PHASES.betaMonthOne
        ? `${item.description} Included free during the Beta Partner Offer.`
        : item.description
    }))
  ];

  const nextItems = [
    {
      key: "base",
      name: basePlan.name,
      amountCents: basePlan.amountCents,
      description: "Base plan continues."
    },
    ...getRecurringUpgradeItems(profile, true)
  ];

  const overageMinutes = Math.max((usageMinutes || 0) - basePlan.includedMinutes, 0);
  const overageCents = overageMinutes * basePlan.overageRateCents;
  const referralCreditCents = (activeReferralCount || 0) * PRICE_CENTS.referralCredit;
  const currentSubtotalCents = currentItems.reduce((sum, item) => sum + item.amountCents, 0) + overageCents;
  const nextSubtotalCents = nextItems.reduce((sum, item) => sum + item.amountCents, 0) + overageCents;

  return {
    phase,
    basePlan,
    usageMinutes: usageMinutes || 0,
    includedMinutes: basePlan.includedMinutes,
    overageMinutes,
    overageCents,
    activeReferralCount: activeReferralCount || 0,
    referralCreditCents,
    currentItems,
    nextItems,
    currentSubtotalCents,
    nextSubtotalCents,
    currentTotalCents: Math.max(currentSubtotalCents - referralCreditCents, 0),
    nextTotalCents: Math.max(nextSubtotalCents - referralCreditCents, 0)
  };
}

function metadataFromProfile({ accountId, profile, phase, generatedReferralCode, referredByCode, activeReferralCount, usageMinutes }) {
  return {
    account_id: accountId,
    company_name: profile.companyName || "",
    owner_name: profile.ownerName || "",
    business_email: profile.businessEmail || "",
    business_phone: profile.businessPhone || "",
    business_website: profile.businessWebsite || "",
    country: profile.country || "",
    country_status: profile.countryStatus || "",
    industry: profile.industry || "",
    business_model: profile.businessModel || "",
    scheduling_mode: profile.schedulingMode || "",
    staff_count: String(profile.staffCount || 0),
    location_mode: profile.locationMode || "",
    lead_sources: profile.leadSources.join(", "),
    languages: profile.languages.join(", "),
    crm_name: profile.crmName || "",
    voice_tier: profile.voiceTier || "Standard",
    billing_phase: phase || BILLING_PHASES.betaMonthOne,
    referral_code: generatedReferralCode || "",
    referred_by_code: referredByCode || "",
    active_referral_count: String(activeReferralCount || 0),
    usage_minutes: String(usageMinutes || 0),
    upgrade_scheduling: String(Boolean(profile.upgrades.scheduling)),
    upgrade_advanced_management: String(Boolean(profile.upgrades.advancedManagement)),
    upgrade_outbound: String(Boolean(profile.upgrades.outbound)),
    upgrade_additional_language: String(Boolean(profile.upgrades.additionalLanguage)),
    upgrade_crm_sync: String(Boolean(profile.upgrades.crmSync)),
    upgrade_extra_seats: String(profile.upgrades.extraSeats || 0),
    carry_scheduling: String(Boolean(profile.carryOver.scheduling)),
    carry_advanced_management: String(Boolean(profile.carryOver.advancedManagement)),
    carry_outbound: String(Boolean(profile.carryOver.outbound)),
    carry_additional_language: String(Boolean(profile.carryOver.additionalLanguage)),
    carry_crm_sync: String(Boolean(profile.carryOver.crmSync)),
    carry_extra_seats: String(profile.carryOver.extraSeats || 0)
  };
}

function profileFromMetadata(metadata) {
  const bool = (value) => String(value).toLowerCase() === "true";

  return {
    companyName: metadata.company_name || "",
    ownerName: metadata.owner_name || "",
    businessEmail: metadata.business_email || "",
    businessPhone: metadata.business_phone || "",
    businessWebsite: metadata.business_website || "",
    country: metadata.country || "",
    countryStatus: metadata.country_status || "Active",
    industry: metadata.industry || "",
    businessModel: metadata.business_model || "",
    schedulingMode: metadata.scheduling_mode || "No scheduling needed",
    staffCount: Number(metadata.staff_count || 0) || 0,
    locationMode: metadata.location_mode || "",
    leadSources: parseList(metadata.lead_sources),
    languages: parseList(metadata.languages),
    crmName: metadata.crm_name || "",
    voiceTier: metadata.voice_tier === "Luxury" ? "Luxury" : "Standard",
    upgrades: {
      scheduling: bool(metadata.upgrade_scheduling),
      advancedManagement: bool(metadata.upgrade_advanced_management),
      outbound: bool(metadata.upgrade_outbound),
      additionalLanguage: bool(metadata.upgrade_additional_language),
      crmSync: bool(metadata.upgrade_crm_sync),
      extraSeats: Number(metadata.upgrade_extra_seats || 0) || 0
    },
    carryOver: {
      scheduling: bool(metadata.carry_scheduling),
      advancedManagement: bool(metadata.carry_advanced_management),
      outbound: bool(metadata.carry_outbound),
      additionalLanguage: bool(metadata.carry_additional_language),
      crmSync: bool(metadata.carry_crm_sync),
      extraSeats: Number(metadata.carry_extra_seats || 0) || 0
    }
  };
}

function generateAccountId() {
  return `acp_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`;
}

function generateReferralCode(companyName) {
  const slug = slugify(companyName) || "aicallport";
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${slug}-${suffix}`;
}

export default {
  BILLING_PHASES,
  PRICE_CENTS,
  buildBillingSnapshot,
  generateAccountId,
  generateReferralCode,
  getBasePlan,
  metadataFromProfile,
  parseSetupParams,
  profileFromMetadata
};
