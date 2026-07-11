(function (globalScope) {
  function buildHierarchyNodes(roleRegistry) {
    return roleRegistry.roles.map(role => ({
      ...role,
      directReports: roleRegistry.roles.filter(candidate => candidate.reportsTo === role.id).map(candidate => candidate.id)
    }));
  }

  function buildReportingChains(roleRegistry) {
    const president = roleRegistry.roles.find(role => role.roleType === "president");
    const ceo = roleRegistry.roles.find(role => role.roleName === "CEO");
    const cro = roleRegistry.roles.find(role => role.roleName === "CRO");
    const coo = roleRegistry.roles.find(role => role.roleName === "COO");
    const cfo = roleRegistry.roles.find(role => role.roleName === "CFO");
    const cpio = roleRegistry.roles.find(role => role.roleName === "CPIO");
    const cao = roleRegistry.roles.find(role => role.roleName === "CAO");
    const feedbackDirector = roleRegistry.roles.find(role => role.roleName === "Director of Feedback");
    const salesDirector = roleRegistry.roles.find(role => role.roleName === "Sales Director");
    const schedulingDirector = roleRegistry.roles.find(role => role.roleName === "Scheduling Director");
    const serviceDirector = roleRegistry.roles.find(role => role.roleName === "Service Director");
    const salesStaff = roleRegistry.roles.find(role => role.roleName === "Sales Staff");
    const serviceStaff = roleRegistry.roles.find(role => role.roleName === "Service Staff");
    const aiCallHandlingOfficer = roleRegistry.roles.find(role => role.roleName === "AI Call Handling Officer");

    return {
      sales: [salesStaff, salesDirector, cro, ceo, president].filter(Boolean).map(role => role.roleName),
      scheduling: [schedulingDirector, coo, ceo, president].filter(Boolean).map(role => role.roleName),
      service: [serviceStaff, serviceDirector, coo, ceo, president].filter(Boolean).map(role => role.roleName),
      communication: [aiCallHandlingOfficer, cro, ceo, president].filter(Boolean).map(role => role.roleName),
      financial: [cfo, ceo, president].filter(Boolean).map(role => role.roleName),
      performance: [feedbackDirector, cpio, ceo, president].filter(Boolean).map(role => role.roleName),
      governance: [cao, ceo, president].filter(Boolean).map(role => role.roleName)
    };
  }

  function buildVisibilitySummary(roleRegistry) {
    const president = roleRegistry.roles.find(role => role.roleType === "president");
    const ceo = roleRegistry.roles.find(role => role.roleName === "CEO");
    return {
      president: {
        roleId: president ? president.id : null,
        scope: "full-company",
        canDrillInto: ["executive reports", "director reports", "operational records", "financial truth", "complaints", "escalations"]
      },
      ceo: {
        roleId: ceo ? ceo.id : null,
        scope: "company-summary",
        canDrillInto: ["executive reports", "director reports", "domain summaries"]
      }
    };
  }

  function buildReportingHierarchy(roleRegistry) {
    const nodes = buildHierarchyNodes(roleRegistry);
    const chains = buildReportingChains(roleRegistry);
    const summary = {
      topLevelRole: "President",
      synthesisRole: "CEO",
      executiveCount: roleRegistry.roles.filter(role => role.level <= 3).length,
      directorCount: roleRegistry.roles.filter(role => role.level === 4).length,
      operationalCount: roleRegistry.roles.filter(role => role.level >= 5).length
    };

    return {
      nodes,
      chains,
      summary,
      visibility: buildVisibilitySummary(roleRegistry)
    };
  }

  function describeChain(chain) {
    return Array.isArray(chain) ? chain.join(" -> ") : "";
  }

  globalScope.AIABCReporting = {
    buildReportingHierarchy,
    describeChain
  };
})(window);
