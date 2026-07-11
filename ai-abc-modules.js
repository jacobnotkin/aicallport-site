(function (globalScope) {
  const moduleRegistry = {
    "call-handling": { coreModule: "callHandling", released: true, ownerVisible: true },
    overview: { coreModule: "callHandling", released: true, ownerVisible: true },
    "recommended-actions": { coreModule: "callHandling", released: true, ownerVisible: true },
    "communication-board": { coreModule: "callHandling", released: true, ownerVisible: true },
    crm: { coreModule: "callHandling", released: true, ownerVisible: true },
    reports: { coreModule: "callHandling", released: true, ownerVisible: true },
    billing: { coreModule: "callHandling", released: true, ownerVisible: true },
    requests: { coreModule: "callHandling", released: true, ownerVisible: true },
    outbound: { coreModule: "callHandling", released: true, ownerVisible: true, conditional: "outbound" },
    referrals: { coreModule: "callHandling", released: true, ownerVisible: true },
    feedback: { coreModule: "callHandling", released: true, ownerVisible: true },
    languages: { coreModule: "callHandling", released: true, ownerVisible: true, conditional: "languages" },
    "crm-sync": { coreModule: "callHandling", released: true, ownerVisible: true, conditional: "crmSync" },
    scheduling: { coreModule: "schedulingAndCoordination", released: true, ownerVisible: true },
    "advanced-management": { coreModule: "advancedManagement", released: true, ownerVisible: true },
    publishing: { coreModule: "future", released: false, ownerVisible: true },
    campaigns: { coreModule: "future", released: false, ownerVisible: true },
    "media-partners": { coreModule: "future", released: false, ownerVisible: true },
    upcoming: { coreModule: "future", released: false, ownerVisible: true },
    news: { coreModule: "future", released: false, ownerVisible: true }
  };

  function buildModuleContext(companyConfig) {
    const cfg = companyConfig.viewModel ? companyConfig : globalScope.AIABCConfig.normalizeCompanyConfig(companyConfig);
    const hasLanguages = cfg.businessProfile.languages.length > 1 || cfg.workflowConfiguration.additionalSetup.includes("Additional language support");
    const hasCrmSync = cfg.workflowConfiguration.additionalSetup.includes("External CRM integration");
    const hasOutbound = !!cfg.workflowConfiguration.outboundEnabled;

    return {
      companyConfig: cfg,
      activeStage: cfg.moduleConfiguration.liveStage,
      coreModules: {
        callHandling: {
          enabled: true,
          released: true
        },
        schedulingAndCoordination: {
          enabled: !!cfg.moduleConfiguration.schedulingAndCoordination.enabled,
          released: !!cfg.moduleConfiguration.schedulingAndCoordination.released,
          upgradeAvailable: !!cfg.workflowConfiguration.schedulingNeeded && !cfg.moduleConfiguration.schedulingAndCoordination.enabled
        },
        advancedManagement: {
          enabled: !!cfg.moduleConfiguration.advancedManagement.enabled,
          released: !!cfg.moduleConfiguration.advancedManagement.released,
          upgradeAvailable: !cfg.moduleConfiguration.advancedManagement.enabled
        }
      },
      conditionalModules: {
        outbound: hasOutbound,
        languages: hasLanguages,
        crmSync: hasCrmSync
      }
    };
  }

  function isDashboardModuleVisible(moduleId, context) {
    const registryEntry = moduleRegistry[moduleId];
    if (!registryEntry) return true;
    if (registryEntry.conditional === "outbound" && !context.conditionalModules.outbound) return false;
    if (registryEntry.conditional === "languages" && !context.conditionalModules.languages) return false;
    if (registryEntry.conditional === "crmSync" && !context.conditionalModules.crmSync) return false;

    if (registryEntry.coreModule === "callHandling") return true;
    if (registryEntry.coreModule === "schedulingAndCoordination") return context.coreModules.schedulingAndCoordination.enabled;
    if (registryEntry.coreModule === "advancedManagement") return context.coreModules.advancedManagement.enabled;
    return true;
  }

  function decorateOwnerModules(modules, context) {
    return modules
      .filter(module => isDashboardModuleVisible(module.id, context))
      .map(module => {
        const registryEntry = moduleRegistry[module.id];
        if (!registryEntry) return module;

        if (registryEntry.coreModule === "callHandling") {
          return { ...module, state: "active" };
        }
        if (registryEntry.coreModule === "schedulingAndCoordination") {
          return { ...module, state: context.coreModules.schedulingAndCoordination.enabled ? "active" : "upgrade" };
        }
        if (registryEntry.coreModule === "advancedManagement") {
          return { ...module, state: context.coreModules.advancedManagement.enabled ? "active" : "upgrade" };
        }
        if (registryEntry.coreModule === "future") {
          return { ...module, state: "soon" };
        }
        return module;
      });
  }

  globalScope.AIABCModules = {
    moduleRegistry,
    buildModuleContext,
    decorateOwnerModules
  };
})(window);
