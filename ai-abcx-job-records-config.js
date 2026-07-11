window.AIABCXJobRecordsConfig = (() => {
  const STAGE_META = {
    A: {
      chip: "Stage A",
      note: "Stage A keeps the President as the manual source of scheduling truth.",
      intro: "The AI-ABCX scheduling record survives across stages. Stage A updates it manually. Stage B advances it through the engine plus worker and customer actions.",
      detailIntro: "Stage A is President-facing. The representative communicates outside the system, and the President records the final scheduling truth.",
      flowIntro: "In Stage A, the President manually moves the record after provisional intake, confirmation, outcome, and payment updates.",
      flowFooter: "Stage A gives appointment visibility, outcome tracking, representative accountability, and revenue tracking before worker dashboards exist.",
      modeTokens: ["President-driven updates", "Manual confirmation", "No in-system worker dashboard", "Revenue tracking active"],
      summary: [
        { label: "Movement Owner", value: "President", meta: "Manual source of truth" },
        { label: "Assignment Model", value: "Outside System", meta: "Rep and President coordinate directly" },
        { label: "Customer Promise", value: "Will Be Confirmed", meta: "AI agent creates provisional time" },
        { label: "Reporting Value", value: "Revenue Ready", meta: "Outcome and amount paid captured" }
      ]
    },
    B: {
      chip: "Stage B",
      note: "Stage B activates the scheduling engine and keeps the same record while automation drives the movement.",
      intro: "The same AI-ABCX job record now moves through assignment, timed worker confirmation, customer confirmation, and structured closeout.",
      detailIntro: "Stage B keeps the same business record but adds engine movement, worker availability, worker confirmation timing, and rerouting.",
      flowIntro: "In Stage B, the engine advances the record through assignment, timed worker confirmation, customer confirmation, execution, and closeout.",
      flowFooter: "Stage B deepens the same record into assignment reporting, confirmation-speed visibility, reroute reporting, and better President recommendations.",
      modeTokens: ["Engine-driven movement", "Worker confirmation timer", "Customer confirmation SMS", "Worker dashboards active"],
      summary: [
        { label: "Movement Owner", value: "Engine", meta: "System plus worker and customer actions" },
        { label: "Assignment Model", value: "Capability Based", meta: "Sales, service, or combined" },
        { label: "Customer Promise", value: "SMS Confirmed", meta: "After worker acceptance" },
        { label: "Reporting Value", value: "Workflow Deep", meta: "Reroute, throughput, and timing data" }
      ]
    }
  };

  return {
    STAGE_META
  };
})();
