(function (globalScope) {
  function cleanValue(value, fallback = "") {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
  }

  function toList(value) {
    if (Array.isArray(value)) {
      return value.map(item => cleanValue(String(item))).filter(Boolean);
    }
    return cleanValue(value)
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }

  function toSlug(value) {
    return cleanValue(value, "service-business")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function buildServiceCategories(industry, businessModel) {
    const normalizedIndustry = cleanValue(industry, "Service Requests");
    const base = [normalizedIndustry];
    if (businessModel === "Service and sales") {
      base.push("Quotes", "Follow-up");
    } else if (businessModel === "Sales focused") {
      base.push("Estimates", "Sales Consultations");
    } else {
      base.push("Appointments");
    }
    return [...new Set(base)];
  }

  function buildWorkflowNeedsFromState(state) {
    const workflowNeeds = [];
    if (cleanValue(state.schedulingMode) !== "No scheduling needed") {
      workflowNeeds.push("Appointment confirmations");
    }
    if (cleanValue(state.locationMode) === "Multiple locations") {
      workflowNeeds.push("Multi-location support");
    }
    if (cleanValue(state.outboundEnabled) === "Yes") {
      workflowNeeds.push("Lead follow-up");
    }
    if (!workflowNeeds.length) {
      workflowNeeds.push("Stage A call handling");
    }
    return workflowNeeds;
  }

  function countLabel(count, singular, plural) {
    const numeric = Number(count) || 0;
    return `${numeric} ${numeric === 1 ? singular : plural}`;
  }

  function parseNumericValue(value, fallback = 0) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    const normalized = cleanValue(String(value || ""))
      .replace(/[$,%\s,]/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function moneyLabel(amount) {
    return `$${Math.round(amount).toLocaleString("en-US")}/mo`;
  }

  function moneyRangeLabel(min, max) {
    return `$${Math.round(min).toLocaleString("en-US")}-$${Math.round(max).toLocaleString("en-US")}/mo`;
  }

  function buildOperationalDashboardLines(config, poolAmount = 73) {
    const lines = [];
    const roleConfigs = config.roleConfiguration || {};
    const additionalSetup = config.workflowConfiguration?.additionalSetup || config.viewModel?.additionalSetup || [];

    if (roleConfigs.dispatcherRoles?.enabled) {
      lines.push({
        name: "Dispatcher dashboard seat plan",
        meta: `${roleConfigs.dispatcherRoles.count || 1} dispatcher/scheduler seat prepared for scheduling control.`,
        key: "dispatcher"
      });
    }

    if ((roleConfigs.salesRoles?.count || 0) > 0) {
      lines.push({
        name: "Sales dashboard seats",
        meta: `${roleConfigs.salesRoles.count} sales seat${roleConfigs.salesRoles.count === 1 ? "" : "s"} prepared for estimate and follow-up work.`,
        key: "sales"
      });
    }

    if ((roleConfigs.serviceRoles?.count || 0) > 0) {
      lines.push({
        name: "Field dashboard seats",
        meta: `${roleConfigs.serviceRoles.count} field seat${roleConfigs.serviceRoles.count === 1 ? "" : "s"} prepared for service execution.`,
        key: "field"
      });
    }

    if (additionalSetup.includes("Marketing module")) {
      lines.push({
        name: "Marketing A preparation",
        meta: "Marketing visibility is prepared in the Stage A system profile for this company.",
        key: "marketing"
      });
    }

    if (!lines.length) {
      return [{
        name: "President workflow mapping",
        meta: "President-only workflow routing is prepared because no extra customer dashboards are required yet.",
        amount: poolAmount
      }];
    }

    const baseShare = Math.floor(poolAmount / lines.length);
    let remainder = poolAmount - (baseShare * lines.length);
    return lines.map((line) => {
      const amount = baseShare + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder -= 1;
      return { ...line, amount };
    });
  }

  function buildStageAPricing(config) {
    const selectedPath = cleanValue(config.accessProfile?.selectedPath, "regular");
    const discount = selectedPath === "prelaunch" ? 150 : 0;
    const lineItems = [
      {
        name: "President Core",
        meta: "Executive structure, President command layer, and top-level company oversight.",
        amount: 149
      },
      {
        name: "CRM Core",
        meta: "Shared customer truth, lead and record backbone, and operating memory.",
        amount: 89
      },
      {
        name: "Call Agent A",
        meta: "Stage A call handling, qualification baseline, and structured intake logic.",
        amount: 149
      },
      {
        name: "Voice and intake profile",
        meta: "Prepared company voice, business identity setup, and intake behavior profile.",
        amount: 39
      },
      ...buildOperationalDashboardLines(config, 73)
    ];

    if (discount > 0) {
      lineItems.push({
        name: "Partner Promo Access discount",
        meta: "Applied because this company entered through the partner promo path before Stage A launch.",
        amount: -discount
      });
    }

    const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
    return {
      lineItems,
      total,
      totalLabel: moneyLabel(total)
    };
  }

  function buildPerformanceIntelligenceStudy(config) {
    const study = config.performanceIntelligence || {};
    const inputs = study.inputs || {};
    const weeklyInboundLeads = parseNumericValue(inputs.weeklyInboundLeads);
    const averageJobValue = parseNumericValue(inputs.averageJobValue);
    const monthlyMarketingSpend = parseNumericValue(inputs.monthlyMarketingSpend);

    if (!weeklyInboundLeads || !averageJobValue) {
      return {
        available: false,
        inputs,
        headline: "Business Opportunity Estimate pending",
        summary: "Complete the activation study inputs to prepare the first Corporate Growth Investment Study."
      };
    }

    const shareMap = {
      "Very low (0-5%)": 0.04,
      "Low (6-10%)": 0.08,
      "Moderate (11-20%)": 0.15,
      "High (21-35%)": 0.28,
      "Very high (36%+)": 0.4
    };

    const afterHoursMap = {
      "No or almost none": 0,
      "Some": 0.04,
      "A lot": 0.08
    };

    const followUpMap = {
      "Within 15 minutes": 0.01,
      "Same hour": 0.02,
      "Same day": 0.04,
      "Next day or later": 0.07,
      "Inconsistent": 0.09
    };

    const backlogMap = {
      "No meaningful backlog": 0,
      "Small backlog": 0.08,
      "Moderate backlog": 0.14,
      "Large backlog": 0.2
    };

    const conversionMap = {
      "Low (10-20%)": 0.15,
      "Moderate (21-35%)": 0.28,
      "Strong (36-50%)": 0.43,
      "Very strong (51%+)": 0.52
    };

    const capacityMap = {
      "Usually fully booked": 0,
      "Sometimes underbooked": 0.03,
      "Often underbooked": 0.06,
      "Inconsistent / hard to predict": 0.05
    };

    const sourceVisibilityMap = {
      "Yes, clearly": 0,
      "Partially": 0.02,
      "No, not really": 0.04
    };

    const monthlyBaselineDemand = weeklyInboundLeads * 4.33;
    const missedShare = shareMap[inputs.missedOpportunityShare] || 0.1;
    const baseMissedOpportunity = monthlyBaselineDemand * missedShare;
    const afterHoursLift = monthlyBaselineDemand * (afterHoursMap[inputs.afterHoursLoss] || 0);
    const followUpLift = monthlyBaselineDemand * (followUpMap[inputs.followUpSpeed] || 0);
    const backlogLift = baseMissedOpportunity * (backlogMap[inputs.backlogStatus] || 0);
    const capacityLift = monthlyBaselineDemand * (capacityMap[inputs.capacityConsistency] || 0);
    const sourceVisibilityLift = monthlyBaselineDemand * (sourceVisibilityMap[inputs.sourceVisibility] || 0);
    const capacityRecoveryCap = inputs.capacityConsistency === "Usually fully booked" ? 0.38 : 0.55;

    const adjustedRecoverableCount = Math.min(
      monthlyBaselineDemand * capacityRecoveryCap,
      baseMissedOpportunity + afterHoursLift + followUpLift + backlogLift + capacityLift + sourceVisibilityLift
    );

    const conversionRate = conversionMap[inputs.conversionConfidence] || 0.25;
    const opportunityLossLow = baseMissedOpportunity * averageJobValue * conversionRate * 0.45;
    const opportunityLossHigh = adjustedRecoverableCount * averageJobValue * conversionRate * 0.75;
    const recoverableRevenueLow = adjustedRecoverableCount * averageJobValue * conversionRate * 0.3;
    const recoverableRevenueHigh = adjustedRecoverableCount * averageJobValue * conversionRate * 0.55;

    const stagePricing = buildStageAPricing(config);
    const systemInvestment = stagePricing.total;
    const profitImpactLow = recoverableRevenueLow - systemInvestment;
    const profitImpactHigh = recoverableRevenueHigh - systemInvestment;

    const leakWeights = [
      { key: "missed-call loss", score: baseMissedOpportunity, detail: inputs.missedOpportunityShare || "Unrated" },
      { key: "after-hours loss", score: afterHoursLift, detail: inputs.afterHoursLoss || "Unrated" },
      { key: "slow follow-up loss", score: followUpLift, detail: inputs.followUpSpeed || "Unrated" },
      { key: "unused backlog loss", score: backlogLift, detail: inputs.backlogStatus || "Unrated" },
      { key: "underused capacity", score: capacityLift, detail: inputs.capacityConsistency || "Unrated" },
      { key: "weak source visibility", score: sourceVisibilityLift, detail: inputs.sourceVisibility || "Unrated" }
    ]
      .sort((a, b) => b.score - a.score)
      .filter(item => item.score > 0)
      .slice(0, 3);

    const recommendedModules = ["President Core", "CRM Core", "Call Agent A", "Performance Intelligence A"];
    const followUpOwner = cleanValue(config.roleConfiguration?.followUpRoles?.ownerLabel, "President handles personally");
    const marketingOwner = cleanValue(config.roleConfiguration?.marketingRoles?.ownerLabel, "No marketing role now");
    const schedulingMode = cleanValue(config.workflowConfiguration?.schedulingMode, "No scheduling needed");
    const hasBacklogPressure = inputs.backlogStatus && inputs.backlogStatus !== "No meaningful backlog";
    const hasMarketingSignal = monthlyMarketingSpend > 0
      || inputs.sourceVisibility === "Partially"
      || inputs.sourceVisibility === "No, not really"
      || marketingOwner !== "No marketing role now";

    if (
      config.workflowConfiguration?.outboundEnabled
      || (followUpOwner !== "No follow-up role now" && followUpOwner !== "President handles personally")
      || hasBacklogPressure
    ) {
      recommendedModules.push("Follow-Up A");
    }
    if (schedulingMode !== "No scheduling needed") {
      recommendedModules.push("Dispatcher A");
    }
    if (hasMarketingSignal || config.workflowConfiguration?.additionalSetup?.includes("Marketing module")) {
      recommendedModules.push("Marketing A");
    }

    return {
      available: true,
      inputs,
      headline: "Corporate Growth Investment Study",
      summary: "A conservative estimate of where the business may be losing opportunity before deeper automation is activated.",
      monthlyBaselineDemand: Math.round(monthlyBaselineDemand),
      opportunityLossRange: {
        min: Math.round(opportunityLossLow),
        max: Math.round(opportunityLossHigh),
        label: moneyRangeLabel(opportunityLossLow, opportunityLossHigh)
      },
      recoverableRevenueRange: {
        min: Math.round(recoverableRevenueLow),
        max: Math.round(recoverableRevenueHigh),
        label: moneyRangeLabel(recoverableRevenueLow, recoverableRevenueHigh)
      },
      estimatedSystemInvestment: {
        monthlySystem: systemInvestment,
        monthlyMarketingSpend,
        total: systemInvestment,
        label: moneyLabel(systemInvestment)
      },
      profitImpactRange: {
        min: Math.round(profitImpactLow),
        max: Math.round(profitImpactHigh),
        label: moneyRangeLabel(profitImpactLow, profitImpactHigh)
      },
      topLeakageAreas: leakWeights,
      recommendedModules: [...new Set(recommendedModules)],
      assumptions: {
        weeklyInboundLeads,
        averageJobValue,
        conversionRate,
        missedShare,
        afterHoursAdjustment: afterHoursMap[inputs.afterHoursLoss] || 0,
        followUpAdjustment: followUpMap[inputs.followUpSpeed] || 0,
        backlogAdjustment: backlogMap[inputs.backlogStatus] || 0,
        capacityAdjustment: capacityMap[inputs.capacityConsistency] || 0,
        sourceVisibilityAdjustment: sourceVisibilityMap[inputs.sourceVisibility] || 0
      }
    };
  }

  function buildCustomerOriginModel(businessProfile) {
    const hasSales = !!businessProfile.hasSalesFunction;
    const hasService = !!businessProfile.hasFieldServiceFunction;

    return {
      new_call: {
        enabled: true,
        prefix: "C",
        pipelineKey: hasSales ? "sales_followup" : "service_followup",
        routingOwnerRole: hasSales ? "sales_director" : "service_director",
        sourceDetail: "inbound_call"
      },
      legacy_import: {
        enabled: true,
        prefix: "L",
        pipelineKey: "reactivation",
        routingOwnerRole: hasSales ? "sales_staff" : "owner",
        sourceDetail: "spreadsheet_import"
      },
      referral: {
        enabled: true,
        prefix: "R",
        pipelineKey: "referral_priority",
        routingOwnerRole: hasSales ? "sales_director" : "owner",
        sourceDetail: "owner_referral_portal"
      },
      reactivation: {
        enabled: true,
        prefix: "X",
        pipelineKey: "reactivation",
        routingOwnerRole: hasSales ? "sales_staff" : "owner",
        sourceDetail: "reactivation_campaign"
      },
      owner_sales_entry: {
        enabled: hasSales,
        prefix: "S",
        pipelineKey: "sales_followup",
        routingOwnerRole: hasSales ? "sales_staff" : "owner",
        sourceDetail: "manual_sales_entry"
      },
      owner_service_entry: {
        enabled: hasService,
        prefix: "V",
        pipelineKey: "service_followup",
        routingOwnerRole: hasService ? "service_staff" : "owner",
        sourceDetail: "manual_service_entry"
      }
    };
  }

  function buildModuleConfiguration(stateLike) {
    const liveStage = cleanValue(stateLike.liveStage, "A");
    const callHandlingEnabled = true;
    const schedulingEnabled = cleanValue(stateLike.schedulingEnabled) === "true" || stateLike.schedulingEnabled === true;
    const advancedEnabled = cleanValue(stateLike.advancedEnabled) === "true" || stateLike.advancedEnabled === true;

    return {
      liveStage,
      callHandling: {
        enabled: callHandlingEnabled,
        released: true
      },
      schedulingAndCoordination: {
        enabled: schedulingEnabled,
        released: liveStage !== "A" || schedulingEnabled
      },
      advancedManagement: {
        enabled: advancedEnabled,
        released: liveStage === "C" || advancedEnabled
      }
    };
  }

  function enrichCompanyConfig(config) {
    const companyName = cleanValue(config.companyProfile.companyName, "Activated Service Company");
    const ownerName = cleanValue(config.companyProfile.ownerName, "Owner");
    const industry = cleanValue(config.businessProfile.industry, "Service Operations");
    const industryCategory = cleanValue(config.businessProfile.industryCategory, "General");
    const businessEmail = cleanValue(config.companyProfile.businessEmail, `owner@${toSlug(companyName)}.com`);
    const businessPhone = cleanValue(config.companyProfile.businessPhone, "Business phone not provided");
    const businessWebsite = cleanValue(config.companyProfile.businessWebsite, `${toSlug(companyName)}.com`);
    const country = cleanValue(config.companyProfile.country, "United States");
    const staffCount = Number(config.businessProfile.staffCount) || 1;
    const salesPeople = Number(config.roleConfiguration.salesRoles.count) || 0;
    const servicePeople = Number(config.roleConfiguration.serviceRoles.count) || 0;
    const locationMode = cleanValue(config.businessProfile.locationMode, "Single location");
    const schedulingMode = cleanValue(config.workflowConfiguration.schedulingMode, "No scheduling needed");
    const businessModel = cleanValue(config.businessProfile.businessModel, "Local service business");
    const selectedPath = cleanValue(config.accessProfile.selectedPath, "regular");
    const pathLabel = selectedPath === "prelaunch" ? "Partner Promo Access" : "Regular Access";
    const stageAPrice = selectedPath === "prelaunch" ? "$349/mo" : "$499/mo";
    const launchDateLabel = cleanValue(config.accessProfile.launchDateLabel, "June 1, 2026");
    const languages = config.businessProfile.languages.length ? config.businessProfile.languages : ["English"];
    const workflowNeeds = config.workflowConfiguration.workflowNeeds.length
      ? config.workflowConfiguration.workflowNeeds
      : ["Stage A call handling"];
    const additionalSetup = config.workflowConfiguration.additionalSetup.length
      ? config.workflowConfiguration.additionalSetup
      : ["Built-in CRM only"];
    const crmName = cleanValue(config.workflowConfiguration.crmName, "");
    const leadSources = config.workflowConfiguration.leadSources;
    const outboundEnabled = config.workflowConfiguration.outboundEnabled ? "Yes" : "No";
    const serviceDescriptor = cleanValue(industry, industryCategory);
    const serviceDescriptorLower = serviceDescriptor.toLowerCase();
    const websiteUrl = businessWebsite.startsWith("http") ? businessWebsite : `https://${businessWebsite}`;
    const staffLabel = `${staffCount} ${staffCount === 1 ? "staff member" : "staff members"}`;
    const locationLabel = locationMode === "Multiple locations" ? "Multi-location setup" : "Single-location setup";
    const languageLabel = languages.join(", ");
    const crmLabel = crmName || "Built-in CRM";
    const referralPath = `aicallport.com/start?ref=${toSlug(companyName)}`;
    const schedulingOwner = cleanValue(config.roleConfiguration.dispatcherRoles.ownerLabel, "President handles personally");
    const marketingOwner = cleanValue(config.roleConfiguration.marketingRoles.ownerLabel, "No marketing role now");
    const followUpOwner = cleanValue(config.roleConfiguration.followUpRoles.ownerLabel, "President handles personally");
    const salesDashboardMode = config.roleConfiguration.salesRoles.enabled
      ? (config.moduleConfiguration.schedulingAndCoordination.enabled ? "Stage B scheduling" : "Stage A manual follow-up")
      : "Not active";
    const serviceDashboardMode = config.roleConfiguration.serviceRoles.enabled
      ? (config.moduleConfiguration.schedulingAndCoordination.enabled ? "Stage B scheduling" : "Stage A manual execution")
      : "Not active";
    const stageAPricing = buildStageAPricing(config);
    config.performanceIntelligence = buildPerformanceIntelligenceStudy(config);

    config.viewModel = {
      companyName,
      ownerName,
      industry,
      industryCategory,
      country,
      businessEmail,
      businessPhone,
      businessWebsite,
      websiteUrl,
      staffCount,
      staffLabel,
      salesPeople,
      salesPeopleLabel: countLabel(salesPeople, "salesperson", "salespeople"),
      servicePeople,
      servicePeopleLabel: countLabel(servicePeople, "service person", "service people"),
      locationMode,
      locationLabel,
      schedulingMode,
      businessModel,
      path: selectedPath,
      pathLabel,
      stageAPrice,
      launchDateLabel,
      languages,
      languageLabel,
      workflowNeeds,
      workflowNeedsLabel: workflowNeeds.join(", "),
      additionalSetup,
      crmName,
      crmLabel,
      schedulingOwner,
      marketingOwner,
      followUpOwner,
      leadSources,
      outboundEnabled,
      serviceDescriptor,
      serviceDescriptorLower,
      referralPath,
      salesDashboardMode,
      serviceDashboardMode,
      dashboardSeatSummary: `${staffLabel} considered for access`,
      serviceAndSalesEnabled: cleanValue(businessModel).toLowerCase().includes("sales"),
      schedulingEnabled: !!config.moduleConfiguration.schedulingAndCoordination.enabled,
      advancedManagementEnabled: !!config.moduleConfiguration.advancedManagement.enabled,
      stageAPricing,
      performanceIntelligence: config.performanceIntelligence
    };

    return config;
  }

  function normalizeCompanyConfig(input) {
    const source = input || {};
    const studySource = source.performanceIntelligence?.inputs || {};
    const companyProfile = {
      companyId: cleanValue(source.companyId, `cmp_${toSlug(source.companyName || "service-company")}`),
      companyName: cleanValue(source.companyName, "Activated Service Company"),
      ownerName: cleanValue(source.ownerName, "Owner"),
      businessEmail: cleanValue(source.businessEmail),
      businessPhone: cleanValue(source.businessPhone),
      businessWebsite: cleanValue(source.businessWebsite),
      country: cleanValue(source.country, "United States"),
      stateOrRegion: cleanValue(source.stateOrRegion),
      city: cleanValue(source.city),
      timeZone: cleanValue(source.timeZone, "America/Los_Angeles")
    };

    const businessModel = cleanValue(source.businessModel, "Local service business");
    const industry = cleanValue(source.industry, "Service Operations");
    const industryCategory = cleanValue(source.industryCategory, "General");
    const languages = toList(source.languages || ["English"]);
    const schedulingMode = cleanValue(source.schedulingMode, "No scheduling needed");
    const locationMode = cleanValue(source.locationMode, "Single location");
    const staffCount = Number(source.staffCount) || 1;
    const salesPeople = Math.max(0, Number(source.salesPeople) || 0);
    const servicePeople = Math.max(0, Number(source.servicePeople) || 0);
    const schedulingOwner = cleanValue(source.schedulingOwner, "President handles personally");
    const marketingOwner = cleanValue(source.marketingOwner, "No marketing role now");
    const followUpOwner = cleanValue(source.followUpOwner, "President handles personally");
    const explicitSalesSeatsProvided = cleanValue(source.salesPeople) !== "";
    const explicitServiceSeatsProvided = cleanValue(source.servicePeople) !== "";
    const hasSalesFunction = businessModel === "Service and sales" || businessModel === "Sales focused";
    const hasFieldServiceFunction = businessModel !== "Sales focused";
    const resolvedSalesPeople = explicitSalesSeatsProvided
      ? salesPeople
      : (hasSalesFunction ? Math.max(0, Math.min(staffCount, Math.max(1, Math.round(staffCount / 3)))) : 0);
    const resolvedServicePeople = explicitServiceSeatsProvided
      ? servicePeople
      : (hasFieldServiceFunction ? Math.max(0, staffCount) : 0);

    const businessProfile = {
      industry,
      industryCategory,
      serviceCategories: source.serviceCategories || buildServiceCategories(industry, businessModel),
      businessModel,
      serviceAreaType: cleanValue(source.serviceAreaType, locationMode === "Multiple locations" ? "multi-city" : "local-area"),
      languages,
      staffCount,
      hasSalesFunction,
      hasFieldServiceFunction,
      locationMode
    };

    const selectedPath = cleanValue(source.selectedPath || source.path, "regular") === "prelaunch" ? "prelaunch" : "regular";
    const accessProfile = {
      selectedPath,
      selectedPathLabel: selectedPath === "prelaunch" ? "Partner Promo Access" : "Regular Access",
      stageALaunchPrice: selectedPath === "prelaunch" ? "$349/mo" : "$499/mo",
      reservationDate: cleanValue(source.reservationDate),
      launchDate: cleanValue(source.launchDate, "2026-06-01"),
      launchDateLabel: cleanValue(source.launchDateLabel, "June 1, 2026"),
      promoEligible: selectedPath === "prelaunch",
      promoDeadline: selectedPath === "prelaunch" ? cleanValue(source.promoDeadline, "June 1, 2026 3:00 PM ET") : ""
    };

    const leadSources = toList(source.leadSources);
    const additionalSetup = toList(source.additionalSetup || ["Built-in CRM only"]);
    const workflowNeeds = toList(source.workflowNeeds || buildWorkflowNeedsFromState(source));
    const crmName = cleanValue(source.crmName);
    const outboundEnabled = cleanValue(source.outboundEnabled, "No") === "Yes";

    const moduleConfiguration = buildModuleConfiguration({
      liveStage: cleanValue(source.liveStage, "A"),
      schedulingEnabled: source.schedulingEnabled || false,
      advancedEnabled: source.advancedEnabled || false
    });
    const customerOriginModel = buildCustomerOriginModel(businessProfile);

    const roleConfiguration = {
      ownerRole: {
        enabled: true,
        dashboardType: "president"
      },
      serviceRoles: {
        enabled: businessProfile.hasFieldServiceFunction && resolvedServicePeople > 0,
        count: businessProfile.hasFieldServiceFunction ? resolvedServicePeople : 0,
        dashboardType: "service",
        manualStageAEnabled: businessProfile.hasFieldServiceFunction && !moduleConfiguration.schedulingAndCoordination.enabled
      },
      salesRoles: {
        enabled: businessProfile.hasSalesFunction && resolvedSalesPeople > 0,
        count: businessProfile.hasSalesFunction ? resolvedSalesPeople : 0,
        dashboardType: "sales",
        manualStageAEnabled: businessProfile.hasSalesFunction && !moduleConfiguration.schedulingAndCoordination.enabled
      },
      dispatcherRoles: {
        enabled: schedulingMode !== "No scheduling needed" && schedulingOwner !== "President handles personally" && schedulingOwner !== "No scheduling role now",
        count: schedulingMode !== "No scheduling needed" && schedulingOwner !== "President handles personally" && schedulingOwner !== "No scheduling role now" ? 1 : 0,
        dashboardType: "dispatcher",
        ownerLabel: schedulingOwner
      },
      marketingRoles: {
        enabled: additionalSetup.includes("Marketing module") || (marketingOwner !== "No marketing role now" && marketingOwner !== "President handles personally"),
        count: marketingOwner !== "No marketing role now" && marketingOwner !== "President handles personally" ? 1 : 0,
        dashboardType: "marketing",
        ownerLabel: marketingOwner
      },
      followUpRoles: {
        enabled: outboundEnabled || (followUpOwner !== "No follow-up role now" && followUpOwner !== "President handles personally"),
        count: followUpOwner !== "No follow-up role now" && followUpOwner !== "President handles personally" ? 1 : 0,
        dashboardType: "followup",
        ownerLabel: followUpOwner
      },
      adminRoles: {
        enabled: false,
        count: 0
      }
    };

    const workflowConfiguration = {
      callCategories: source.callCategories || ["Emergency", "Repair", "Quote Request"],
      urgencyRules: source.urgencyRules !== false,
      afterHoursRules: source.afterHoursRules !== false,
      customerOriginModel,
      leadQualificationEnabled: true,
      crmImportEnabled: true,
      legacyImportEnabled: true,
      referralPortEnabled: true,
      outboundCallingEnabled: outboundEnabled,
      outboundSmsEnabled: outboundEnabled,
      manualSalesRoutingEnabled: businessProfile.hasSalesFunction,
      manualServiceRoutingEnabled: businessProfile.hasFieldServiceFunction,
      appointmentPreparationEnabled: true,
      humanAppointmentConfirmationRequired: true,
      schedulingNeeded: schedulingMode !== "No scheduling needed",
      appointmentConfirmationRequired: moduleConfiguration.schedulingAndCoordination.enabled,
      staffConfirmationRequired: moduleConfiguration.schedulingAndCoordination.enabled,
      automaticReroutingEnabled: moduleConfiguration.schedulingAndCoordination.enabled,
      completionReportingRequired: moduleConfiguration.schedulingAndCoordination.enabled,
      schedulingMode,
      leadSources,
      outboundEnabled,
      workflowNeeds,
      additionalSetup,
      crmName
    };

    const reportingConfiguration = {
      ceoSignalsEnabled: true,
      croSignalsEnabled: true,
      cooSignalsEnabled: businessProfile.hasFieldServiceFunction || businessProfile.hasSalesFunction,
      cfoSignalsEnabled: true,
      caoSignalsEnabled: !!moduleConfiguration.advancedManagement.enabled,
      companyMemoryEnabled: true,
      revenueIntelligenceEnabled: true
    };

    const performanceIntelligence = {
      reportName: "Corporate Growth Investment Study",
      level: "A",
      inputs: {
        weeklyInboundLeads: parseNumericValue(source.weeklyInboundLeads || studySource.weeklyInboundLeads),
        missedOpportunityShare: cleanValue(source.missedOpportunityShare || studySource.missedOpportunityShare),
        afterHoursLoss: cleanValue(source.afterHoursLoss || studySource.afterHoursLoss),
        followUpSpeed: cleanValue(source.followUpSpeed || studySource.followUpSpeed),
        backlogStatus: cleanValue(source.backlogStatus || studySource.backlogStatus),
        averageJobValue: parseNumericValue(source.averageJobValue || studySource.averageJobValue),
        conversionConfidence: cleanValue(source.conversionConfidence || studySource.conversionConfidence),
        capacityConsistency: cleanValue(source.capacityConsistency || studySource.capacityConsistency),
        sourceVisibility: cleanValue(source.sourceVisibility || studySource.sourceVisibility),
        monthlyMarketingSpend: parseNumericValue(source.monthlyMarketingSpend || studySource.monthlyMarketingSpend)
      }
    };

    const systemState = {
      activationStep: Number(source.activationStep) || 1,
      activationCompleted: cleanValue(source.activationCompleted) === "true" || source.activationCompleted === true,
      dashboardPreviewCompleted: cleanValue(source.dashboardPreviewCompleted) === "true" || source.dashboardPreviewCompleted === true,
      demoCallCompleted: cleanValue(source.demoCallCompleted) === "true" || source.demoCallCompleted === true,
      stripeReservationCompleted: cleanValue(source.stripeReservationCompleted) === "true" || source.stripeReservationCompleted === true,
      firstChargeScheduled: cleanValue(source.firstChargeScheduled) === "true" || source.firstChargeScheduled === true
    };

    return enrichCompanyConfig({
      companyProfile,
      businessProfile,
      accessProfile,
      moduleConfiguration,
      roleConfiguration,
      workflowConfiguration,
      reportingConfiguration,
      performanceIntelligence,
      systemState
    });
  }

  function buildCompanyConfigFromStep1State(state, options = {}) {
    return normalizeCompanyConfig({
      companyName: state.companyName,
      ownerName: state.ownerName,
      businessEmail: state.businessEmail,
      businessPhone: state.businessPhone,
      businessWebsite: state.businessWebsite,
      country: state.country ? state.country.name : "",
      industry: state.industry ? state.industry.name : "",
      industryCategory: state.industry ? state.industry.category : "",
      businessModel: state.businessModel,
      schedulingMode: state.schedulingMode,
      staffCount: state.staffCount,
      salesPeople: state.salesPeople,
      servicePeople: state.servicePeople,
      locationMode: state.locationMode,
      schedulingOwner: state.schedulingOwner,
      marketingOwner: state.marketingOwner,
      followUpOwner: state.followUpOwner,
      languages: state.languages,
      outboundEnabled: state.outboundEnabled,
      leadSources: state.leadSources,
      workflowNeeds: buildWorkflowNeedsFromState(state),
      additionalSetup: state.additionalSetup,
      crmName: state.crmName,
      weeklyInboundLeads: state.weeklyInboundLeads,
      missedOpportunityShare: state.missedOpportunityShare,
      afterHoursLoss: state.afterHoursLoss,
      followUpSpeed: state.followUpSpeed,
      backlogStatus: state.backlogStatus,
      averageJobValue: state.averageJobValue,
      conversionConfidence: state.conversionConfidence,
      capacityConsistency: state.capacityConsistency,
      sourceVisibility: state.sourceVisibility,
      monthlyMarketingSpend: state.monthlyMarketingSpend,
      selectedPath: options.selectedPath || "regular",
      activationStep: 2,
      schedulingEnabled: false,
      advancedEnabled: false
    });
  }

  function companyConfigToSearchParams(config) {
    const normalized = config.viewModel ? config : normalizeCompanyConfig(config);
    const params = new URLSearchParams();

    params.set("companyConfig", JSON.stringify(normalized));

    params.set("path", normalized.accessProfile.selectedPath);
    params.set("companyName", normalized.companyProfile.companyName);
    params.set("ownerName", normalized.companyProfile.ownerName);
    params.set("businessEmail", normalized.companyProfile.businessEmail);
    params.set("businessPhone", normalized.companyProfile.businessPhone);
    params.set("businessWebsite", normalized.companyProfile.businessWebsite);
    params.set("country", normalized.companyProfile.country);
    params.set("countryStatus", "Active");
    params.set("industry", normalized.businessProfile.industry);
    params.set("industryCategory", normalized.businessProfile.industryCategory);
    params.set("businessModel", normalized.businessProfile.businessModel);
    params.set("staffCount", String(normalized.businessProfile.staffCount));
    params.set("salesPeople", String(normalized.roleConfiguration.salesRoles.count || 0));
    params.set("servicePeople", String(normalized.roleConfiguration.serviceRoles.count || 0));
    params.set("teamSize", normalized.viewModel.staffLabel);
    params.set("locationMode", normalized.businessProfile.locationMode);
    params.set("schedulingOwner", normalized.viewModel.schedulingOwner);
    params.set("marketingOwner", normalized.viewModel.marketingOwner);
    params.set("followUpOwner", normalized.viewModel.followUpOwner);
    params.set("schedulingMode", normalized.workflowConfiguration.schedulingMode);
    params.set("outboundEnabled", normalized.workflowConfiguration.outboundEnabled ? "Yes" : "No");
    params.set("leadSources", normalized.workflowConfiguration.leadSources.join(", "));
    params.set("channels", "Phone, SMS");
    params.set("languages", normalized.businessProfile.languages.join(", "));
    params.set("workflowNeeds", normalized.workflowConfiguration.workflowNeeds.join(", "));
    params.set("additionalSetup", normalized.workflowConfiguration.additionalSetup.join(", "));
    params.set("crmName", normalized.workflowConfiguration.crmName);
    params.set("liveStage", normalized.moduleConfiguration.liveStage);
    params.set("schedulingEnabled", String(normalized.moduleConfiguration.schedulingAndCoordination.enabled));
    params.set("advancedEnabled", String(normalized.moduleConfiguration.advancedManagement.enabled));
    params.set("activationStep", String(normalized.systemState.activationStep));
    params.set("launchDate", normalized.accessProfile.launchDate);
    params.set("launchDateLabel", normalized.accessProfile.launchDateLabel);
    params.set("stageAPrice", normalized.accessProfile.stageALaunchPrice);
    params.set("weeklyInboundLeads", String(normalized.performanceIntelligence?.inputs?.weeklyInboundLeads || 0));
    params.set("missedOpportunityShare", normalized.performanceIntelligence?.inputs?.missedOpportunityShare || "");
    params.set("afterHoursLoss", normalized.performanceIntelligence?.inputs?.afterHoursLoss || "");
    params.set("followUpSpeed", normalized.performanceIntelligence?.inputs?.followUpSpeed || "");
    params.set("backlogStatus", normalized.performanceIntelligence?.inputs?.backlogStatus || "");
    params.set("averageJobValue", String(normalized.performanceIntelligence?.inputs?.averageJobValue || 0));
    params.set("conversionConfidence", normalized.performanceIntelligence?.inputs?.conversionConfidence || "");
    params.set("capacityConsistency", normalized.performanceIntelligence?.inputs?.capacityConsistency || "");
    params.set("sourceVisibility", normalized.performanceIntelligence?.inputs?.sourceVisibility || "");
    params.set("monthlyMarketingSpend", String(normalized.performanceIntelligence?.inputs?.monthlyMarketingSpend || 0));

    return params;
  }

  function companyConfigFromSearchParams(searchParamsLike) {
    const params = searchParamsLike instanceof URLSearchParams
      ? searchParamsLike
      : new URLSearchParams(searchParamsLike || "");

    const rawConfig = cleanValue(params.get("companyConfig"));
    if (rawConfig) {
      try {
        return normalizeCompanyConfig(JSON.parse(rawConfig));
      } catch (error) {
        // Fall back to legacy fields below.
      }
    }

    return normalizeCompanyConfig({
      path: params.get("path"),
      companyName: params.get("companyName"),
      ownerName: params.get("ownerName"),
      businessEmail: params.get("businessEmail"),
      businessPhone: params.get("businessPhone"),
      businessWebsite: params.get("businessWebsite"),
      country: params.get("country"),
      industry: params.get("industry"),
      industryCategory: params.get("industryCategory"),
      businessModel: params.get("businessModel"),
      staffCount: params.get("staffCount"),
      salesPeople: params.get("salesPeople"),
      servicePeople: params.get("servicePeople"),
      locationMode: params.get("locationMode"),
      schedulingOwner: params.get("schedulingOwner"),
      marketingOwner: params.get("marketingOwner"),
      followUpOwner: params.get("followUpOwner"),
      schedulingMode: params.get("schedulingMode"),
      outboundEnabled: params.get("outboundEnabled"),
      leadSources: params.get("leadSources"),
      languages: params.get("languages"),
      workflowNeeds: params.get("workflowNeeds"),
      additionalSetup: params.get("additionalSetup"),
      crmName: params.get("crmName"),
      liveStage: params.get("liveStage"),
      schedulingEnabled: params.get("schedulingEnabled"),
      advancedEnabled: params.get("advancedEnabled"),
      activationStep: params.get("activationStep"),
      launchDate: params.get("launchDate"),
      launchDateLabel: params.get("launchDateLabel"),
      weeklyInboundLeads: params.get("weeklyInboundLeads"),
      missedOpportunityShare: params.get("missedOpportunityShare"),
      afterHoursLoss: params.get("afterHoursLoss"),
      followUpSpeed: params.get("followUpSpeed"),
      backlogStatus: params.get("backlogStatus"),
      averageJobValue: params.get("averageJobValue"),
      conversionConfidence: params.get("conversionConfidence"),
      capacityConsistency: params.get("capacityConsistency"),
      sourceVisibility: params.get("sourceVisibility"),
      monthlyMarketingSpend: params.get("monthlyMarketingSpend")
    });
  }

  globalScope.AIABCConfig = {
    cleanValue,
    toList,
    toSlug,
    normalizeCompanyConfig,
    buildCompanyConfigFromStep1State,
    companyConfigFromSearchParams,
    companyConfigToSearchParams,
    buildStageAPricing
  };
})(window);
