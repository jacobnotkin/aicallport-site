(() => {
  if (document.querySelector(".ai-bubble")) return;

  const fileName = window.location.pathname.split("/").pop() || "index.html";

  const pageMeta = {
    "index.html": {
      label: "Ask about the system",
      intro: "I can explain pricing, activation, inbound and outbound workflows, and what happens after setup.",
      prompts: [
        "What is included in the base system?",
        "How does outbound follow-up work?",
        "What happens before activation?"
      ]
    },
    "step1.html": {
      label: "Ask about business intake",
      intro: "I can explain why each intake question matters, which answers affect pricing, and what carries into the next step.",
      prompts: [
        "Why are you asking about scheduling?",
        "Why do lead sources matter?",
        "What carries into Step 2?"
      ]
    },
    "config-progress.html": {
      label: "Ask what the system is preparing",
      intro: "I can explain what each preparation stage means before review and verification begins.",
      prompts: [
        "What are AI agent scripts here?",
        "What is dashboard and CRM structure?",
        "What happens after this finishes?"
      ]
    },
    "step2.html": {
      label: "Ask about review and verification",
      intro: "I can explain the configured system, pricing logic, verification, and what must be approved before live testing.",
      prompts: [
        "Why is pricing shown here?",
        "What is included in review?",
        "Why do I need verification?"
      ]
    },
    "step3.html": {
      label: "Ask about live testing",
      intro: "I can explain the 3-minute demo pool, dashboard preview, activation rules, and what happens after activation.",
      prompts: [
        "How does the demo time work?",
        "What can I do in dashboard preview?",
        "When can activation happen?"
      ]
    },
    "owner-dashboard.html": {
      label: "Ask about the owner dashboard",
      intro: "I can explain what the owner controls, where key metrics live, and how staffing, alerts, billing, and requests connect together.",
      prompts: [
        "What should the owner check first?",
        "How do staffing and assignments connect?",
        "What does this dashboard control?"
      ]
    },
    "calls.html": {
      label: "Ask about calls",
      intro: "I can explain how calls move through urgency, lead capture, booking, summaries, and follow-up.",
      prompts: [
        "How are urgent calls handled?",
        "What happens after a new lead call?",
        "What gets saved from each call?"
      ]
    },
    "appointments.html": {
      label: "Ask about appointments",
      intro: "I can explain booking status, confirmations, staff assignment timing, and completion flow.",
      prompts: [
        "How are appointments confirmed?",
        "How do staff assignments work?",
        "What happens after completion?"
      ]
    },
    "closeout.html": {
      label: "Ask about closeout",
      intro: "I can explain how the Closeout Board handles outcome truth, payment entry, and whether a job closes or stays alive as follow-up.",
      prompts: [
        "What belongs on the closeout board?",
        "How does payment truth get recorded?",
        "When should a job stay alive as follow-up?"
      ]
    },
    "tasks.html": {
      label: "Ask about closeout",
      intro: "I can explain how the Closeout Board handles outcome truth, payment entry, and whether a job closes or stays alive as follow-up.",
      prompts: [
        "What belongs on the closeout board?",
        "How does payment truth get recorded?",
        "When should a job stay alive as follow-up?"
      ]
    },
    "clients.html": {
      label: "Ask about clients and CRM",
      intro: "I can explain what lives in the built-in CRM, how records are updated, and when external CRM sync matters.",
      prompts: [
        "What is stored in the built-in CRM?",
        "When does external CRM integration matter?",
        "How are client records updated?"
      ]
    },
    "staff.html": {
      label: "Ask about staff roles",
      intro: "I can explain owner, manager, service, provider, and sales access, including personal calendars and assignment confirmation logic.",
      prompts: [
        "What can service workers see?",
        "What can sales users update?",
        "Does the manager use the owner dashboard?"
      ]
    },
    "reports.html": {
      label: "Ask about reports",
      intro: "I can explain which reports show booked value, conversion, staff follow-through, and operational performance.",
      prompts: [
        "What is booked value?",
        "How is conversion tracked?",
        "What does the owner learn from reports?"
      ]
    },
    "notifications.html": {
      label: "Ask about notifications",
      intro: "I can explain alert priorities, sound logic, escalation rules, and owner visibility.",
      prompts: [
        "Which events trigger alerts?",
        "Who receives notifications?",
        "How do sound alerts work?"
      ]
    },
    "billing.html": {
      label: "Ask about billing",
      intro: "I can explain base pricing, upgrades, usage overages, and how billing review fits the system.",
      prompts: [
        "What does the base plan include?",
        "How are overage minutes billed?",
        "Which upgrades affect billing?"
      ]
    },
    "referrals.html": {
      label: "Ask about referrals",
      intro: "I can explain referral source tracking, booked outcomes, and which channels are producing better leads.",
      prompts: [
        "How is referral quality measured?",
        "What is booked referral value?",
        "How do referrals connect to appointments?"
      ]
    },
    "requests.html": {
      label: "Ask about requests",
      intro: "I can explain how support requests, owner approvals, setup edits, and staff access changes stay organized.",
      prompts: [
        "What belongs in requests?",
        "How do owner approvals work?",
        "Why are setup and support requests together?"
      ]
    },
    "settings.html": {
      label: "Ask about settings",
      intro: "I can explain business profile, call logic, scheduling rules, outbound setup, CRM integrations, languages, and permissions.",
      prompts: [
        "What can be changed in settings?",
        "Where is outbound configured?",
        "How do languages and CRM sync work?"
      ]
    },
    "field-dashboard.html": {
      label: "Ask about service worker tools",
      intro: "I can explain personal calendar logic, assignment confirmation timing, availability editing, and structured result entry.",
      prompts: [
        "How does assignment confirmation work?",
        "How should availability be updated?",
        "How are visit results entered?"
      ]
    },
    "sales-dashboard.html": {
      label: "Ask about sales calendar logic",
      intro: "I can explain personal consultation assignment, time-limited confirmation, availability editing, and consultation outcome tracking.",
      prompts: [
        "How does reassignment work?",
        "How do I change availability?",
        "What consultation results can be entered?"
      ]
    },
    "mike-availability.html": {
      label: "Ask about personal availability",
      intro: "I can explain how a provider calendar should show booked work, open windows, and blocked time.",
      prompts: [
        "How should booked work appear?",
        "How are open windows shown?",
        "How should blocked time be used?"
      ]
    },
    "service-availability.html": {
      label: "Ask about service availability",
      intro: "I can explain availability by day, week, month, or year and how workers should keep only their own calendars updated.",
      prompts: [
        "Can workers edit specific dates?",
        "How should split availability work?",
        "How does this connect to assignments?"
      ]
    },
    "sales-availability.html": {
      label: "Ask about sales availability",
      intro: "I can explain how sales calendars handle consultations, blocked time, and next available windows after booked work.",
      prompts: [
        "How do consult windows work?",
        "How is blocked time used?",
        "What is next available time?"
      ]
    }
  };

  const globalKnowledge = {
    pricing: "The base system is $349 per month and includes AI call handling, the built-in dashboard, the built-in CRM, summaries, notifications, reports, and 1000 included minutes shared across inbound and outbound. Scheduling is +$149 per month, Outbound Follow-Up is +$199 per month, Additional Language Pack is +$99 per month, External CRM Integration is +$149 per month, and Luxury Voice is billed separately at +$0.15 per minute when selected.",
    outbound: "Outbound Follow-Up uses the business's own leads. Existing lead or client data can be uploaded in spreadsheet format, sorted into usable groups, and turned into text, call, or text-then-call workflows inside the CRM and dashboard.",
    activation: "Activation only happens after intake, pricing review, verification, required signing, and the live demo step. The business should understand the configured system before activation begins.",
    verification: "Verification confirms the business email and business phone before live testing and activation. It is there to protect account setup, routing, and ownership of the business profile.",
    dashboard: "The owner dashboard is the control view for calls, appointments, staff, notifications, requests, billing, reports, referrals, and system settings. Worker and sales users do not see the owner view; they see only their own calendars and assignments.",
    staff: "Service workers, providers, and sales users should each see only their own calendars and assigned work. They confirm assignments within a limited time, update availability on their personal calendars, review past work, and enter structured outcomes.",
    calendar: "Availability should be editable by day, week, month, or year. Users can mark full-day unavailable, full-day available, split availability, blocked windows, and open windows around booked appointments."
  };

  function buildResponse(prompt) {
    const lower = prompt.toLowerCase();
    if (lower.includes("price") || lower.includes("billing") || lower.includes("base plan") || lower.includes("upgrade")) {
      return globalKnowledge.pricing;
    }
    if (lower.includes("outbound") || lower.includes("lead")) {
      return globalKnowledge.outbound;
    }
    if (lower.includes("activation") || lower.includes("live test") || lower.includes("demo")) {
      return globalKnowledge.activation;
    }
    if (lower.includes("verify") || lower.includes("verification") || lower.includes("email") || lower.includes("phone")) {
      return globalKnowledge.verification;
    }
    if (lower.includes("dashboard") || lower.includes("owner")) {
      return globalKnowledge.dashboard;
    }
    if (lower.includes("staff") || lower.includes("service") || lower.includes("provider") || lower.includes("sales") || lower.includes("assignment")) {
      return globalKnowledge.staff;
    }
    if (lower.includes("calendar") || lower.includes("availability") || lower.includes("window")) {
      return globalKnowledge.calendar;
    }
    const meta = pageMeta[fileName] || pageMeta["index.html"];
    return meta.intro;
  }

  const meta = pageMeta[fileName] || {
    label: "Ask AI Assistant",
    intro: "I can explain what this page means, what the user should do here, and how it connects to the rest of the system.",
    prompts: ["Explain this page", "What should happen next?", "How does this connect to the system?"]
  };

  const style = document.createElement("style");
  style.textContent = `
    .shared-ai-launcher{
      position:fixed;right:22px;bottom:22px;z-index:60;
      min-height:56px;padding:0 18px;border-radius:18px;border:1px solid rgba(127,212,255,.24);
      background:linear-gradient(180deg, rgba(11,19,31,.96), rgba(9,15,24,.96));
      box-shadow:0 24px 60px rgba(0,0,0,.42), 0 0 0 1px rgba(127,212,255,.08);
      color:#eef6ff;display:flex;align-items:center;gap:12px;cursor:pointer;
      font:800 13px/1 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;
      letter-spacing:.04em
    }
    .shared-ai-launcher:hover{transform:translateY(-1px)}
    .shared-ai-orb{
      width:28px;height:28px;border-radius:999px;display:grid;place-items:center;
      background:linear-gradient(135deg, rgba(78,165,255,.22), rgba(255,138,61,.18));
      border:1px solid rgba(127,212,255,.28);color:#9bdcff;font-weight:900
    }
    .shared-ai-panel{
      position:fixed;right:22px;bottom:90px;z-index:61;width:min(420px, calc(100vw - 24px));
      border-radius:24px;border:1px solid rgba(255,255,255,.10);
      background:linear-gradient(180deg, rgba(11,17,27,.98), rgba(7,12,20,.98));
      box-shadow:0 30px 80px rgba(0,0,0,.52), inset 0 1px 0 rgba(255,255,255,.04);
      overflow:hidden;display:none
    }
    .shared-ai-panel.open{display:block}
    .shared-ai-head{
      padding:18px 18px 14px;display:flex;justify-content:space-between;gap:12px;align-items:flex-start;
      border-bottom:1px solid rgba(255,255,255,.06);
      background:radial-gradient(circle at top left, rgba(78,165,255,.10), transparent 42%), radial-gradient(circle at top right, rgba(255,138,61,.08), transparent 30%)
    }
    .shared-ai-head strong{display:block;font:900 16px/1.15 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;color:#f7fbff}
    .shared-ai-head span{display:block;margin-top:8px;color:#9bdcff;font:700 13px/1.45 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}
    .shared-ai-close{
      min-width:38px;height:38px;border-radius:12px;border:1px solid rgba(255,255,255,.08);
      background:rgba(255,255,255,.03);color:#eef6ff;cursor:pointer;font:800 18px/1 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif
    }
    .shared-ai-body{padding:16px 18px 18px;display:grid;gap:14px}
    .shared-ai-copy{
      color:#dce8f4;font:700 14px/1.55 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;
      background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:14px 14px
    }
    .shared-ai-prompts{display:flex;flex-wrap:wrap;gap:8px}
    .shared-ai-prompt{
      min-height:34px;padding:0 12px;border-radius:999px;border:1px solid rgba(127,212,255,.22);
      background:rgba(127,212,255,.08);color:#bdeaff;cursor:pointer;
      font:800 11px/1 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase
    }
    .shared-ai-form{display:grid;gap:10px}
    .shared-ai-input{
      width:100%;min-height:46px;border-radius:14px;border:1px solid rgba(255,255,255,.08);
      background:rgba(255,255,255,.03);color:#eef6ff;padding:0 14px;
      font:700 14px/1 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif
    }
    .shared-ai-submit{
      min-height:42px;padding:0 14px;border:none;border-radius:14px;
      background:linear-gradient(135deg, #ff8a3d, #ffb36b);color:#fff;cursor:pointer;
      font:900 11px/1 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;letter-spacing:.10em;text-transform:uppercase
    }
    .shared-ai-note{color:#8d9db1;font:700 12px/1.45 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}
    @media (max-width:760px){
      .shared-ai-launcher{right:14px;bottom:14px}
      .shared-ai-panel{right:12px;bottom:80px;width:calc(100vw - 24px)}
    }
  `;
  document.head.appendChild(style);

  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "shared-ai-launcher";
  launcher.innerHTML = `<span class="shared-ai-orb">AI</span><span>Ask AI Assistant</span>`;

  const panel = document.createElement("aside");
  panel.className = "shared-ai-panel";
  panel.innerHTML = `
    <div class="shared-ai-head">
      <div>
        <strong>Ask AI Assistant</strong>
        <span>${meta.label}</span>
      </div>
      <button class="shared-ai-close" type="button" aria-label="Close assistant">×</button>
    </div>
    <div class="shared-ai-body">
      <div class="shared-ai-copy" id="sharedAiCopy">${meta.intro}</div>
      <div class="shared-ai-prompts"></div>
      <form class="shared-ai-form">
        <input class="shared-ai-input" type="text" placeholder="Ask a question about this page or the system" />
        <button class="shared-ai-submit" type="submit">Ask Assistant</button>
      </form>
      <div class="shared-ai-note">This prototype assistant explains the system flow, pricing, roles, and page logic in-context.</div>
    </div>
  `;

  const copy = panel.querySelector("#sharedAiCopy");
  const promptsWrap = panel.querySelector(".shared-ai-prompts");
  const input = panel.querySelector(".shared-ai-input");

  meta.prompts.forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "shared-ai-prompt";
    button.textContent = prompt;
    button.addEventListener("click", () => {
      copy.textContent = buildResponse(prompt);
    });
    promptsWrap.appendChild(button);
  });

  panel.querySelector(".shared-ai-close").addEventListener("click", () => {
    panel.classList.remove("open");
  });

  launcher.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  panel.querySelector(".shared-ai-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    copy.textContent = buildResponse(question);
    input.value = "";
  });

  document.body.appendChild(launcher);
  document.body.appendChild(panel);
})();
