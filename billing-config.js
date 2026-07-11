(function (globalScope, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (globalScope) {
    globalScope.AICallPortBillingConfig = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
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

  const UPGRADE_DEFS = {
    scheduling: {
      key: "scheduling",
      name: "Scheduling",
      amountCents: PRICE_CENTS.scheduling,
      description: "Service or sales scheduling, reminders, confirmations, and booking workflow setup."
    },
    advancedManagement: {
      key: "advancedManagement",
      name: "Advanced Management",
      amountCents: PRICE_CENTS.advancedManagement,
      description: "Task control, staff management, sales pipeline, and approvals."
    },
    outbound: {
      key: "outbound",
      name: "Outbound Follow-Up",
      amountCents: PRICE_CENTS.outbound,
      description: "Uses existing leads, uploaded databases, and follow-up workflows."
    },
    additionalLanguage: {
      key: "additionalLanguage",
      name: "Additional Language Pack",
      amountCents: PRICE_CENTS.additionalLanguage,
      description: "Adds multilingual customer-facing support beyond one language."
    },
    crmSync: {
      key: "crmSync",
      name: "External CRM Integration",
      amountCents: PRICE_CENTS.crmSync,
      description: "Connects AI Call Port to an existing CRM."
    }
  };

  function parseList(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (!value) return [];
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function toBooleanString(value) {
    return value ? "true" : "false";
  }

  function fromBooleanString(value) {
    return String(value).toLowerCase() === "true";
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
  }

  function formatCurrency(cents, options) {
    const currency = (options && options.currency) || "USD";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: cents % 100 === 0 ? 0 : 2
    }).format(cents / 100);
  }

  function formatMonthDay(unixSeconds) {
    if (!unixSeconds) return "Not scheduled";
    return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }

  function parseSetupParams(source) {
    const additionalSetup = parseList(source.additionalSetup);
    const languages = parseList(source.languages);
    const workflowNeeds = parseList(source.workflowNeeds);
    const voiceTier = source.voiceTier === "Luxury" ? "Luxury" : "Standard";
    const staffCount = Math.max(Number(source.staffCount || 0) || 0, 0);
    const schedulingEnabled = Boolean(source.schedulingMode && source.schedulingMode !== "No scheduling needed");
    const extraSeats = schedulingEnabled ? Math.max(staffCount - 3, 0) : 0;

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
      outboundEnabled: source.outboundEnabled === "Yes",
      leadSources: parseList(source.leadSources),
      languages,
      additionalSetup,
      workflowNeeds,
      crmName: source.crmName || "",
      voiceTier,
      referralCode: source.ref || source.referralCode || "",
      upgrades: {
        scheduling: schedulingEnabled,
        advancedManagement: source.advancedManagementEnabled === "Yes" || source.advancedManagementEnabled === true,
        outbound: source.outboundEnabled === "Yes",
        additionalLanguage: additionalSetup.includes("Additional language support"),
        crmSync: additionalSetup.includes("External CRM integration"),
        extraSeats
      },
      carryOver: {
        scheduling: schedulingEnabled,
        advancedManagement: source.advancedManagementEnabled === "Yes" || source.advancedManagementEnabled === true,
        outbound: source.outboundEnabled === "Yes",
        additionalLanguage: additionalSetup.includes("Additional language support"),
        crmSync: additionalSetup.includes("External CRM integration"),
        extraSeats
      }
    };
  }

  function getBasePlan(profile) {
    return {
      key: profile.voiceTier === "Luxury" ? "luxuryBase" : "standardBase",
      name: profile.voiceTier === "Luxury" ? "Luxury System" : "Standard System",
      amountCents: profile.voiceTier === "Luxury" ? PRICE_CENTS.luxuryBase : PRICE_CENTS.standardBase,
      includedMinutes: INCLUDED_MINUTES,
      overageRateCents: profile.voiceTier === "Luxury" ? 45 : 30,
      voiceLabel: profile.voiceTier === "Luxury" ? "Luxury voice" : "High-standard voice"
    };
  }

  function getRecurringUpgradeItems(profile, carryOverOnly) {
    const carry = carryOverOnly ? profile.carryOver : profile.upgrades;
    const items = [];

    Object.values(UPGRADE_DEFS).forEach((def) => {
      if (carry[def.key]) {
        items.push({
          key: def.key,
          name: def.name,
          amountCents: def.amountCents,
          description: def.description
        });
      }
    });

    if (carry.extraSeats > 0) {
      items.push({
        key: "additionalSeats",
        name: `Additional Staff Seats (${carry.extraSeats})`,
        amountCents: carry.extraSeats * PRICE_CENTS.additionalSeat,
        description: "Scheduling includes 3 staff seats. Extra seats are billed only when needed."
      });
    }

    return items;
  }

  function buildLineItems(profile, phase) {
    const basePlan = getBasePlan(profile);
    const currentItems = [
      {
        key: "base",
        name: basePlan.name,
        amountCents: basePlan.amountCents,
        description: `${basePlan.voiceLabel} tier with ${basePlan.includedMinutes} included minutes.`
      }
    ];

    const recurringItems = getRecurringUpgradeItems(profile, false);

    recurringItems.forEach((item) => {
      currentItems.push({
        key: item.key,
        name: item.name,
        amountCents: phase === BILLING_PHASES.betaMonthOne ? 0 : item.amountCents,
        listAmountCents: item.amountCents,
        description: phase === BILLING_PHASES.betaMonthOne
          ? `${item.description} Included free during the Beta Partner Offer.`
          : item.description
      });
    });

    return currentItems;
  }

  function buildProjection(profile) {
    const basePlan = getBasePlan(profile);
    return [
      {
        key: "base",
        name: basePlan.name,
        amountCents: basePlan.amountCents,
        description: `${basePlan.voiceLabel} tier continues.`
      },
      ...getRecurringUpgradeItems(profile, true)
    ];
  }

  function buildBillingSnapshot(options) {
    const profile = options.profile;
    const phase = options.phase || BILLING_PHASES.betaMonthOne;
    const activeReferralCount = Math.max(Number(options.activeReferralCount || 0) || 0, 0);
    const usageMinutes = Math.max(Number(options.usageMinutes || 0) || 0, 0);
    const basePlan = getBasePlan(profile);
    const currentItems = buildLineItems(profile, phase);
    const nextItems = buildProjection(profile);
    const overageMinutes = Math.max(usageMinutes - basePlan.includedMinutes, 0);
    const overageCents = overageMinutes * basePlan.overageRateCents;
    const referralCreditCents = activeReferralCount * PRICE_CENTS.referralCredit;
    const currentSubtotal = currentItems.reduce((sum, item) => sum + item.amountCents, 0) + overageCents;
    const nextSubtotal = nextItems.reduce((sum, item) => sum + item.amountCents, 0) + overageCents;

    return {
      phase,
      basePlan,
      usageMinutes,
      includedMinutes: basePlan.includedMinutes,
      overageMinutes,
      overageCents,
      activeReferralCount,
      referralCreditCents,
      currentItems,
      nextItems,
      currentSubtotalCents: currentSubtotal,
      nextSubtotalCents: nextSubtotal,
      currentTotalCents: Math.max(currentSubtotal - referralCreditCents, 0),
      nextTotalCents: Math.max(nextSubtotal - referralCreditCents, 0)
    };
  }

  function metadataFromProfile(input) {
    const profile = input.profile;
    return {
      account_id: input.accountId,
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
      outbound_enabled: toBooleanString(profile.upgrades.outbound),
      lead_sources: profile.leadSources.join(", "),
      languages: profile.languages.join(", "),
      crm_name: profile.crmName || "",
      voice_tier: profile.voiceTier || "Standard",
      billing_phase: input.phase || BILLING_PHASES.betaMonthOne,
      referral_code: input.generatedReferralCode || "",
      referred_by_code: input.referredByCode || "",
      active_referral_count: String(Math.max(Number(input.activeReferralCount || 0) || 0, 0)),
      usage_minutes: String(Math.max(Number(input.usageMinutes || 0) || 0, 0)),
      upgrade_scheduling: toBooleanString(profile.upgrades.scheduling),
      upgrade_advanced_management: toBooleanString(profile.upgrades.advancedManagement),
      upgrade_outbound: toBooleanString(profile.upgrades.outbound),
      upgrade_additional_language: toBooleanString(profile.upgrades.additionalLanguage),
      upgrade_crm_sync: toBooleanString(profile.upgrades.crmSync),
      upgrade_extra_seats: String(profile.upgrades.extraSeats || 0),
      carry_scheduling: toBooleanString(profile.carryOver.scheduling),
      carry_advanced_management: toBooleanString(profile.carryOver.advancedManagement),
      carry_outbound: toBooleanString(profile.carryOver.outbound),
      carry_additional_language: toBooleanString(profile.carryOver.additionalLanguage),
      carry_crm_sync: toBooleanString(profile.carryOver.crmSync),
      carry_extra_seats: String(profile.carryOver.extraSeats || 0)
    };
  }

  function profileFromMetadata(metadata) {
    const profile = {
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
        scheduling: fromBooleanString(metadata.upgrade_scheduling),
        advancedManagement: fromBooleanString(metadata.upgrade_advanced_management),
        outbound: fromBooleanString(metadata.upgrade_outbound),
        additionalLanguage: fromBooleanString(metadata.upgrade_additional_language),
        crmSync: fromBooleanString(metadata.upgrade_crm_sync),
        extraSeats: Number(metadata.upgrade_extra_seats || 0) || 0
      },
      carryOver: {
        scheduling: fromBooleanString(metadata.carry_scheduling),
        advancedManagement: fromBooleanString(metadata.carry_advanced_management),
        outbound: fromBooleanString(metadata.carry_outbound),
        additionalLanguage: fromBooleanString(metadata.carry_additional_language),
        crmSync: fromBooleanString(metadata.carry_crm_sync),
        extraSeats: Number(metadata.carry_extra_seats || 0) || 0
      }
    };

    profile.outboundEnabled = profile.upgrades.outbound;
    profile.additionalSetup = [
      profile.upgrades.additionalLanguage ? "Additional language support" : "",
      profile.upgrades.crmSync ? "External CRM integration" : ""
    ].filter(Boolean);

    return profile;
  }

  function generateAccountId() {
    return `acp_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`;
  }

  function generateReferralCode(companyName) {
    const slug = slugify(companyName) || "aicallport";
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `${slug}-${suffix}`;
  }

  return {
    BILLING_PHASES,
    INCLUDED_MINUTES,
    PRICE_CENTS,
    UPGRADE_DEFS,
    buildBillingSnapshot,
    formatCurrency,
    formatMonthDay,
    generateAccountId,
    generateReferralCode,
    getBasePlan,
    metadataFromProfile,
    parseList,
    parseSetupParams,
    profileFromMetadata
  };
});
