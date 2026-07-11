(function (globalScope) {
  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function titleCaseWords(value) {
    return String(value || "")
      .split(/[\s-]+/)
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function createRole(definition) {
    return {
      id: definition.id,
      roleName: definition.roleName,
      roleType: definition.roleType,
      level: definition.level,
      reportsTo: definition.reportsTo || null,
      managedDomain: definition.managedDomain,
      dashboardType: definition.dashboardType || "owner",
      accountabilityMode: definition.accountabilityMode || "scored",
      scoringEligible: definition.accountabilityMode !== "summarized",
      visibilityScope: definition.visibilityScope || "domain",
      stageDependencies: definition.stageDependencies || ["A"],
      moduleDependency: definition.moduleDependency || "callHandling",
      active: definition.active !== false,
      future: !!definition.future
    };
  }

  function buildRoleRegistry(companyConfig, moduleContext) {
    const cfg = companyConfig.viewModel ? companyConfig : globalScope.AIABCConfig.normalizeCompanyConfig(companyConfig);
    const vm = cfg.viewModel;
    const hasScheduling = !!moduleContext.coreModules.schedulingAndCoordination.enabled;
    const hasAdvanced = !!moduleContext.coreModules.advancedManagement.enabled;
    const hasSales = !!vm.serviceAndSalesEnabled;
    const hasService = !!cfg.roleConfiguration.serviceRoles.enabled;
    const companySlug = slugify(vm.companyName || "service-business");

    const roles = [
      createRole({
        id: `${companySlug}-president`,
        roleName: "President",
        roleType: "president",
        level: 1,
        managedDomain: "company",
        dashboardType: "owner",
        accountabilityMode: "summarized",
        visibilityScope: "full-company",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      }),
      createRole({
        id: `${companySlug}-ceo`,
        roleName: "CEO",
        roleType: "executive",
        level: 2,
        reportsTo: `${companySlug}-president`,
        managedDomain: "company-health",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "full-company",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      }),
      createRole({
        id: `${companySlug}-cro`,
        roleName: "CRO",
        roleType: "executive",
        level: 3,
        reportsTo: `${companySlug}-ceo`,
        managedDomain: "revenue",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "revenue-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      }),
      createRole({
        id: `${companySlug}-coo`,
        roleName: "COO",
        roleType: "executive",
        level: 3,
        reportsTo: `${companySlug}-ceo`,
        managedDomain: "operations",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "operations-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: hasScheduling ? "schedulingAndCoordination" : "callHandling",
        active: hasService || hasSales
      }),
      createRole({
        id: `${companySlug}-cfo`,
        roleName: "CFO",
        roleType: "executive",
        level: 3,
        reportsTo: `${companySlug}-ceo`,
        managedDomain: "financial-truth",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "financial-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: hasScheduling ? "schedulingAndCoordination" : "callHandling"
      }),
      createRole({
        id: `${companySlug}-cpio`,
        roleName: "CPIO",
        roleType: "executive",
        level: 3,
        reportsTo: `${companySlug}-ceo`,
        managedDomain: "performance-intelligence",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "intelligence-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      }),
      createRole({
        id: `${companySlug}-ai-call-handling-officer`,
        roleName: "AI Call Handling Officer",
        roleType: "ai-officer",
        level: 5,
        reportsTo: `${companySlug}-cro`,
        managedDomain: "communication-intake",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "communication-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      })
    ];

    roles.push(
      createRole({
        id: `${companySlug}-feedback-director`,
        roleName: "Director of Feedback",
        roleType: "director",
        level: 4,
        reportsTo: `${companySlug}-cpio`,
        managedDomain: "performance-feedback",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "intelligence-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      }),
      createRole({
        id: `${companySlug}-analysis-director`,
        roleName: "Director of Analysis",
        roleType: "director",
        level: 4,
        reportsTo: `${companySlug}-cpio`,
        managedDomain: "performance-analysis",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "intelligence-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      }),
      createRole({
        id: `${companySlug}-optimization-director`,
        roleName: "Director of Optimization",
        roleType: "director",
        level: 4,
        reportsTo: `${companySlug}-cpio`,
        managedDomain: "performance-optimization",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "intelligence-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      }),
      createRole({
        id: `${companySlug}-system-improvement-director`,
        roleName: "Director of System Improvement",
        roleType: "director",
        level: 4,
        reportsTo: `${companySlug}-cpio`,
        managedDomain: "system-improvement",
        dashboardType: "owner",
        accountabilityMode: "scored",
        visibilityScope: "intelligence-domain",
        stageDependencies: ["A", "B", "C"],
        moduleDependency: "callHandling"
      })
    );

    if (hasService) {
      roles.push(
        createRole({
          id: `${companySlug}-service-director`,
          roleName: "Service Director",
          roleType: "director",
          level: 4,
          reportsTo: `${companySlug}-coo`,
          managedDomain: "field-service",
          dashboardType: "owner",
          accountabilityMode: "scored",
          visibilityScope: "service-team",
          stageDependencies: ["A", "B", "C"],
          moduleDependency: hasScheduling ? "schedulingAndCoordination" : "callHandling"
        }),
        createRole({
          id: `${companySlug}-service-staff`,
          roleName: "Service Staff",
          roleType: "staff",
          level: 5,
          reportsTo: `${companySlug}-service-director`,
          managedDomain: "field-service",
          dashboardType: "service",
          accountabilityMode: "scored",
          visibilityScope: "self",
          stageDependencies: ["A", "B", "C"],
          moduleDependency: hasScheduling ? "schedulingAndCoordination" : "callHandling"
        })
      );
    }

    if (hasSales) {
      roles.push(
        createRole({
          id: `${companySlug}-estimator-director`,
          roleName: "Estimator Director",
          roleType: "director",
          level: 4,
          reportsTo: `${companySlug}-cro`,
          managedDomain: "estimating",
          dashboardType: "owner",
          accountabilityMode: "scored",
          visibilityScope: "estimate-lane",
          stageDependencies: ["A", "B", "C"],
          moduleDependency: "callHandling"
        }),
        createRole({
          id: `${companySlug}-sales-director`,
          roleName: "Sales Director",
          roleType: "director",
          level: 4,
          reportsTo: `${companySlug}-cro`,
          managedDomain: "sales",
          dashboardType: "owner",
          accountabilityMode: "scored",
          visibilityScope: "sales-team",
          stageDependencies: ["A", "B", "C"],
          moduleDependency: hasScheduling ? "schedulingAndCoordination" : "callHandling"
        }),
        createRole({
          id: `${companySlug}-sales-staff`,
          roleName: "Sales Staff",
          roleType: "staff",
          level: 5,
          reportsTo: `${companySlug}-sales-director`,
          managedDomain: "sales",
          dashboardType: "sales",
          accountabilityMode: "scored",
          visibilityScope: "self",
          stageDependencies: ["A", "B", "C"],
          moduleDependency: hasScheduling ? "schedulingAndCoordination" : "callHandling"
        })
      );
    }

    if (hasScheduling) {
      roles.push(
        createRole({
          id: `${companySlug}-scheduling-director`,
          roleName: "Scheduling Director",
          roleType: "director",
          level: 4,
          reportsTo: `${companySlug}-coo`,
          managedDomain: "scheduling",
          dashboardType: "owner",
          accountabilityMode: "scored",
          visibilityScope: "scheduling-team",
          stageDependencies: ["B", "C"],
          moduleDependency: "schedulingAndCoordination"
        }),
        createRole({
          id: `${companySlug}-ai-scheduling-director`,
          roleName: "AI Scheduling Director",
          roleType: "ai-director",
          level: 5,
          reportsTo: `${companySlug}-scheduling-director`,
          managedDomain: "booking-protection",
          dashboardType: "owner",
          accountabilityMode: "scored",
          visibilityScope: "scheduling-team",
          stageDependencies: ["B", "C"],
          moduleDependency: "schedulingAndCoordination"
        })
      );
    }

    if (hasAdvanced) {
      roles.push(
        createRole({
          id: `${companySlug}-cao`,
          roleName: "CAO",
          roleType: "executive",
          level: 3,
          reportsTo: `${companySlug}-ceo`,
          managedDomain: "governance",
          dashboardType: "owner",
          accountabilityMode: "scored",
          visibilityScope: "governance-domain",
          stageDependencies: ["C"],
          moduleDependency: "advancedManagement"
        }),
        createRole({
          id: `${companySlug}-ai-governance-director`,
          roleName: "AI Governance Director",
          roleType: "ai-director",
          level: 4,
          reportsTo: `${companySlug}-cao`,
          managedDomain: "exceptions-and-escalations",
          dashboardType: "owner",
          accountabilityMode: "scored",
          visibilityScope: "governance-domain",
          stageDependencies: ["C"],
          moduleDependency: "advancedManagement"
        })
      );
    }

    const activeRoles = roles.filter(role => role.active);
    const roleMap = Object.fromEntries(activeRoles.map(role => [role.id, role]));
    const rolesByLevel = activeRoles.reduce((accumulator, role) => {
      const key = String(role.level);
      if (!accumulator[key]) accumulator[key] = [];
      accumulator[key].push(role);
      return accumulator;
    }, {});

    const rolesByDomain = activeRoles.reduce((accumulator, role) => {
      if (!accumulator[role.managedDomain]) accumulator[role.managedDomain] = [];
      accumulator[role.managedDomain].push(role);
      return accumulator;
    }, {});

    return {
      companyId: cfg.companyProfile.companyId,
      companyName: vm.companyName,
      roles: activeRoles,
      roleMap,
      rolesByLevel,
      rolesByDomain,
      summary: {
        totalRoles: activeRoles.length,
        scoredRoles: activeRoles.filter(role => role.scoringEligible).length,
        nonScoredRoles: activeRoles.filter(role => !role.scoringEligible).length,
        executiveRoles: activeRoles.filter(role => role.level <= 3).length,
        directorRoles: activeRoles.filter(role => role.level === 4).length,
        operationalRoles: activeRoles.filter(role => role.level >= 5).length
      }
    };
  }

  function formatRoleType(roleType) {
    return titleCaseWords(String(roleType || "").replace(/_/g, " "));
  }

  globalScope.AIABCRoles = {
    buildRoleRegistry,
    formatRoleType
  };
})(window);
