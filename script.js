/* global confetti */

// ======================================================
// DATA (you can expand lists anytime)
// ======================================================
const AGENTS = [
  { id:"receptionist", name:"AI Receptionist", desc:"Greets callers, captures intent, routes calls, and collects structured details for follow-up." },
  { id:"booking", name:"AI Booking Agent", desc:"Books appointments, confirms availability, reschedules, and sends reminders to reduce no-shows." },
  { id:"sales", name:"AI Sales Agent", desc:"Qualifies leads, answers objections, and routes hot prospects to the right sales path." },
  { id:"customer_service", name:"AI Customer Service", desc:"Handles FAQs, order/service status, and resolves common issues quickly and consistently." },
  { id:"after_hours", name:"AI After-Hours Agent", desc:"Captures urgent requests after-hours, provides next steps, and escalates when needed." },
  { id:"dispatch", name:"AI Dispatch Agent", desc:"Collects critical job details, dispatches crews, and keeps calls structured under pressure." },
  { id:"lead_capture", name:"AI Lead Capture Agent", desc:"Never misses a lead: captures contact info, need, location, urgency, and preferred follow-up." },
  { id:"intake", name:"AI Intake Agent", desc:"Runs structured intake: gathers requirements, documents context, and routes to the correct workflow." },
  { id:"triage", name:"AI Support Triage", desc:"Identifies issue type, urgency, and next action; routes to the right support lane." },
  { id:"overflow", name:"AI Overflow Agent", desc:"Acts as overflow during peaks: answers instantly, collects info, and reduces missed calls." },
  { id:"multilingual", name:"AI Multilingual Agent", desc:"Serves callers in multiple languages with consistent, structured intake and routing." },
  { id:"custom", name:"Custom AI Agents", desc:"We build custom agents for your exact process, scripts, intake fields, and escalation rules." }
];

// If you want to fetch countries dynamically later, swap this list for /api/markets.
const COUNTRIES = ["United States","Canada","United Kingdom","Australia","UAE","Germany","France","Spain","Italy"];
const INDUSTRIES = ["Security","Roofing","Windows & Doors","Medical Clinic","Dental","Legal","Home Services","Real Estate"];

// Step 03: role + templates + voice + script
const ROLES = [
  { id:"receptionist", label:"Receptionist", help:"Handles inbound calls, captures caller info, books appointments, and routes urgent cases." },
  { id:"sales", label:"Sales Agent", help:"Qualifies leads fast, captures contact details, and books consultations." },
  { id:"support", label:"Support Agent", help:"Collects issue details, prioritizes urgency, and escalates when needed." }
];

const VOICES = [
  "Calm Professional","Confident Sales","Warm Reception","Crisp Dispatch","Minimal Neutral"
];

const TEMPLATES = [
  { id:"standard_intake", label:"Standard Intake", script:"You are the AI agent for {{COMPANY}} in {{COUNTRY}}. Collect: name, phone, reason for calling, urgency. Confirm details and summarize before ending." },
  { id:"sales_high_convert", label:"High-Converting Sales", script:"You are the AI sales agent for {{COMPANY}}. Qualify leads fast: service needed, location, timeline, budget (optional). Book a consultation if qualified." },
  { id:"service_triage", label:"Service Triage", script:"You are the AI support triage agent for {{COMPANY}}. Identify issue, urgency, and next action. Escalate emergencies immediately." },
  { id:"after_hours", label:"After-Hours Emergency", script:"You are the after-hours agent for {{COMPANY}}. If urgent, collect emergency details and advise safety steps. Otherwise take message and confirm callback." },
  { id:"booking", label:"Booking Focused", script:"You are the booking agent for {{COMPANY}}. Ask preferred day/time, service type, and contact info. Confirm appointment details clearly." }
];

// Plans: beta + reg + included minutes + overage
const PLANS = {
  "299": { usd: 299, regUsd: 499, minutes: 1000, overageUsd: 0.30 },
  "599": { usd: 599, regUsd: 999, minutes: 2200, overageUsd: 0.30 },
  "899": { usd: 899, regUsd: 1499, minutes: 3500, overageUsd: 0.30 }
};

// ======================================================
// FX (country -> currency) + reference converter
// ======================================================
const marketCurrencyCode = {
  "United States":"USD",
  "Canada":"CAD",
  "United Kingdom":"GBP",
  "Germany":"EUR",
  "France":"EUR",
  "Spain":"EUR",
  "Italy":"EUR",
  "Australia":"AUD",
  "UAE":"AED"
};

const FX_CACHE_KEY = "aicallport_fx_cache_v2";
function getFxCache(){ try { return JSON.parse(localStorage.getItem(FX_CACHE_KEY)||"{}"); } catch { return {}; } }
function setFxCache(obj){ try { localStorage.setItem(FX_CACHE_KEY, JSON.stringify(obj||{})); } catch {} }

async function fetchFxRatesUSD(){
  const cache = getFxCache();
  const now = Date.now();
  if (cache && cache.rates && cache.ts && (now - cache.ts) < 12*60*60*1000) return cache;

  // Using your original free endpoint pattern; if it fails, we degrade gracefully.
  try{
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" });
    const data = await res.json();
    if(data && data.result === "success" && data.rates){
      const out = { rates: data.rates, ts: now, stamp: null };
      if(data.time_last_update_unix){
        const d = new Date(data.time_last_update_unix * 1000);
        out.stamp = d.toLocaleString(undefined, { year:"numeric", month:"short", day:"2-digit", hour:"2-digit", minute:"2-digit" });
      }
      setFxCache(out);
      return out;
    }
  } catch(e){}
  return { rates: null, ts: now, stamp: null };
}

function formatMoney(amount, code){
  try{
    return new Intl.NumberFormat(undefined, {
      style:"currency",
      currency: code,
      maximumFractionDigits: code === "JPY" || code === "KRW" ? 0 : 2
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${code}`;
  }
}

// ======================================================
// DOM helpers
// ======================================================
const $ = (id)=>document.getElementById(id);

function addKeyActivate(el, fn){
  if(!el) return;
  el.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      fn();
    }
  });
}

function escapeHtml(str){
  return String(str || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

// ======================================================
// Modal (uses your existing #modal)
// ======================================================
let lastFocusEl = null;

function getFocusable(container){
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  ));
}

function openModal({title, pill="SETUP", narrow=false, html=""}){
  const modal = $("modal");
  const modalShell = $("modalShell");
  const modalTitle = $("modalTitle");
  const modalPill = $("modalPill");
  const modalBody = $("modalBody");
  const modalCloseX = $("modalCloseX");

  lastFocusEl = document.activeElement;

  modalTitle.textContent = title;
  modalPill.textContent = pill;
  modalBody.innerHTML = html;
  modalShell.classList.toggle("narrow", !!narrow);

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden","false");

  const focusables = getFocusable(modalShell);
  (focusables[0] || modalCloseX).focus();
}

function closeModal(){
  const modal = $("modal");
  const modalShell = $("modalShell");
  const modalBody = $("modalBody");

  modal.style.display = "none";
  modal.setAttribute("aria-hidden","true");
  modalBody.innerHTML = "";
  modalShell.classList.remove("narrow");

  if(lastFocusEl && typeof lastFocusEl.focus === "function"){
    lastFocusEl.focus();
  }
  lastFocusEl = null;
}

// Wire modal close / focus trap
function wireModalShell(){
  const modal = $("modal");
  const modalShell = $("modalShell");
  const modalClose = $("modalClose");
  const modalCloseX = $("modalCloseX");

  modalClose.addEventListener("click", closeModal);
  modalCloseX.addEventListener("click", closeModal);
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeModal();

    if(modal.getAttribute("aria-hidden") === "true") return;
    if(e.key !== "Tab") return;

    const focusables = getFocusable(modalShell);
    if(!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if(e.shiftKey && document.activeElement === first){
      e.preventDefault(); last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  });
}

// ======================================================
// STATE (single source of truth)
// ======================================================
const state = {
  country: null,
  industry: null,

  agentId: null,
  agentName: null,

  roleId: null,
  voice: null,
  templateId: null,
  script: null,

  company: null,

  demoDone: false,
  plan: null, // "299" | "599" | "899"
  activated: false,

  ecoOpenId: null
};

// ======================================================
// Rendering: ecosystem + plans + step labels + next blink
// ======================================================
function setStepLabels(){
  $("v1").textContent = state.country ? state.country : "Select";
  $("v2").textContent = state.industry ? state.industry : "Select";

  const step3 = (state.agentName && state.roleId && state.voice && state.templateId)
    ? `${state.agentName} • ${getRoleLabel(state.roleId)} • ${state.voice}`
    : "Choose";
  $("v3").textContent = step3;

  const demoLabel = state.company ? `${state.company} Demo Call` : "Start";
  $("v4").textContent = state.demoDone ? "Done" : demoLabel;

  $("v5").textContent = state.plan ? `$${state.plan}/mo` : "Choose";

  $("v6").textContent = state.activated ? "Active" : "Preview";
}

function markPlanSelected(){
  ["299","599","899"].forEach(p=>{
    const card = $(`planCard${p}`);
    if(card) card.classList.toggle("selected", state.plan === p);
  });
}

function setNextBlink(){
  // reset blink
  ["s1","s2","s3","s4","s5","s6"].forEach(k=>$(k).classList.remove("next"));

  // lock/unlock
  $("s2").classList.toggle("locked", !state.country);
  $("s3").classList.toggle("locked", !(state.country && state.industry));
  $("s4").classList.toggle("locked", !(state.country && state.industry && state.agentId && state.roleId && state.voice && state.templateId));
  $("s5").classList.toggle("locked", !(state.demoDone));
  $("s6").classList.toggle("locked", !(state.demoDone && state.plan));

  // done style
  $("s1").classList.toggle("done", !!state.country);
  $("s2").classList.toggle("done", !!state.industry);
  $("s3").classList.toggle("done", !!(state.agentId && state.roleId && state.voice && state.templateId));
  $("s4").classList.toggle("done", !!state.demoDone);
  $("s5").classList.toggle("done", !!state.plan);
  $("s6").classList.toggle("done", !!state.activated);

  // next blink logic
  if(!state.country) $("s1").classList.add("next");
  else if(!state.industry) $("s2").classList.add("next");
  else if(!(state.agentId && state.roleId && state.voice && state.templateId)) $("s3").classList.add("next");
  else if(!state.demoDone) $("s4").classList.add("next");
  else if(!state.plan) $("s5").classList.add("next");
  else if(!state.activated) $("s6").classList.add("next");
}

function autoOpenNext(){
  if(!state.country) { openCountry(); return; }
  if(!state.industry) { openIndustry(); return; }
  if(!(state.agentId && state.roleId && state.voice && state.templateId)) { openAgentRoleVoiceTemplate(); return; }
  if(!state.demoDone) { openDemo(); return; }
  if(!state.plan) { openPlanModal(); return; }
  if(!state.activated) { openActivatePreview(); return; }
}

function renderEcosystem(){
  const grid = $("ecosystemGrid");
  grid.innerHTML = "";

  AGENTS.forEach(a=>{
    const btn = document.createElement("div");
    btn.className = "eco-btn";
    btn.dataset.agentId = a.id;
    btn.setAttribute("role","button");
    btn.setAttribute("tabindex","0");
    btn.setAttribute("aria-label", `${a.name}. ${a.desc}`);

    const isSelected = state.agentId === a.id;
    const isOpen = state.ecoOpenId === a.id;

    if(isSelected) btn.classList.add("selected");
    if(isOpen) btn.classList.add("open");

    btn.innerHTML = `
      <div class="eco-top">
        <div class="eco-name">${escapeHtml(a.name)}</div>
        <div class="eco-tag">${isSelected ? "SELECTED" : (isOpen ? "CLOSE" : "VIEW")}</div>
      </div>
      <div class="eco-expand">
        <div class="eco-desc">${escapeHtml(a.desc)}</div>
        <div class="eco-select-row">
          <button class="eco-select" type="button">SELECT THIS AGENT</button>
        </div>
      </div>
    `;

    btn.addEventListener("click", (e)=>{
      const selectBtn = btn.querySelector(".eco-select");
      if(e.target === selectBtn) return;
      state.ecoOpenId = (state.ecoOpenId === a.id) ? null : a.id;
      renderEcosystem();
    });

    addKeyActivate(btn, ()=>{
      state.ecoOpenId = (state.ecoOpenId === a.id) ? null : a.id;
      renderEcosystem();
    });

    btn.querySelector(".eco-select").addEventListener("click", (e)=>{
      e.stopPropagation();
      state.agentId = a.id;
      state.agentName = a.name;
      state.ecoOpenId = null;

      // reset step-03 subchoices when changing agent
      state.roleId = null;
      state.voice = null;
      state.templateId = null;
      state.script = null;

      // reset downstream
      state.company = null;
      state.demoDone = false;
      state.plan = null;
      state.activated = false;

      setStepLabels();
      setNextBlink();
      renderEcosystem();
      openAgentRoleVoiceTemplate();
    });

    grid.appendChild(btn);
  });
}

// ======================================================
// Step modals
// ======================================================
function openCountry(){
  const items = COUNTRIES.map(x=>`
    <button class="modal-item" data-value="${escapeHtml(x)}">
      <span>${escapeHtml(x)}</span><span class="text-[10px] font-black opacity-60">Select</span>
    </button>
  `).join("");

  openModal({ title:"Select Country", pill:"01 COUNTRY", html: items });

  $("modalBody").querySelectorAll(".modal-item").forEach(b=>{
    b.addEventListener("click", async ()=>{
      state.country = b.dataset.value;

      // reset downstream
      state.industry = null;
      state.agentId = null; state.agentName = null;
      state.roleId = null; state.voice = null; state.templateId = null; state.script = null;
      state.company = null;
      state.demoDone = false;
      state.plan = null;
      state.activated = false;
      state.ecoOpenId = null;

      closeModal();
      renderEcosystem();
      setStepLabels();
      setNextBlink();

      await updateLocalPricingFromCountry();
      await updateFxConverterUI();

      setTimeout(autoOpenNext, 120);
    });
  });
}

function openIndustry(){
  const items = INDUSTRIES.map(x=>`
    <button class="modal-item" data-value="${escapeHtml(x)}">
      <span>${escapeHtml(x)}</span><span class="text-[10px] font-black opacity-60">Select</span>
    </button>
  `).join("");

  openModal({ title:"Select Industry", pill:"02 INDUSTRY", html: items });

  $("modalBody").querySelectorAll(".modal-item").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.industry = b.dataset.value;

      // reset downstream
      state.agentId = null; state.agentName = null;
      state.roleId = null; state.voice = null; state.templateId = null; state.script = null;
      state.company = null;
      state.demoDone = false;
      state.plan = null;
      state.activated = false;
      state.ecoOpenId = null;

      closeModal();
      renderEcosystem();
      setStepLabels();
      setNextBlink();
      setTimeout(autoOpenNext, 120);
    });
  });
}

function getRoleLabel(roleId){
  return (ROLES.find(r=>r.id===roleId)?.label) || roleId;
}

function applyVars(str){
  const company = state.company || "YOUR COMPANY";
  const country = state.country || "YOUR COUNTRY";
  return String(str || "")
    .replaceAll("{{COMPANY}}", company)
    .replaceAll("{{COUNTRY}}", country);
}

function openAgentRoleVoiceTemplate(){
  const agentPart = `
    <div class="small mb-3">
      Select an <b>AI agent</b> (from the grid), then choose <b>Role</b>, <b>Template</b>, <b>Voice</b>, and edit the <b>Script</b>.
    </div>
  `;

  const roleOptions = ROLES.map(r=>`
    <button class="modal-item" data-role="${r.id}">
      <span>${escapeHtml(r.label)}</span><span class="text-[10px] font-black opacity-60">${state.roleId===r.id ? "Selected" : "Pick"}</span>
    </button>
  `).join("");

  const templateOptions = TEMPLATES.map(t=>`
    <button class="modal-item" data-template="${t.id}">
      <span>${escapeHtml(t.label)}</span><span class="text-[10px] font-black opacity-60">${state.templateId===t.id ? "Selected" : "Pick"}</span>
    </button>
  `).join("");

  const voiceOptions = VOICES.map(v=>`
    <button class="modal-item" data-voice="${escapeHtml(v)}">
      <span>${escapeHtml(v)}</span><span class="text-[10px] font-black opacity-60">${state.voice===v ? "Selected" : "Pick"}</span>
    </button>
  `).join("");

  const currentScript = state.script || applyVars(TEMPLATES.find(x=>x.id===state.templateId)?.script || "");
  const scriptBox = `
    <div class="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 mt-4 mb-2 border-b border-white/5 pb-2">
      SCRIPT (EDITABLE)
    </div>
    <textarea id="scriptBox" class="w-full rounded-2xl p-3 text-[12px] font-semibold"
      style="min-height:170px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.10); color:white; outline:none; resize:vertical;">${escapeHtml(currentScript)}</textarea>
    <div class="grid md:grid-cols-2 gap-2 mt-3">
      <button id="btnSaveScript" class="btn-orange w-full py-4 rounded-xl text-[10px] font-black uppercase italic tracking-widest" type="button">
        SAVE SCRIPT
      </button>
      <button id="btnConfirmStep3" class="btn-outline w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest" type="button">
        CONFIRM STEP 03
      </button>
    </div>
  `;

  openModal({
    title: "AI Agent Setup",
    pill: "03 AI AGENT",
    html: `
      ${agentPart}
      <div class="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 mb-2 border-b border-white/5 pb-2">ROLE</div>
      <div class="grid md:grid-cols-2 gap-2 mb-5">${roleOptions}</div>

      <div class="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 mb-2 border-b border-white/5 pb-2">TEMPLATE</div>
      <div class="grid md:grid-cols-2 gap-2 mb-5">${templateOptions}</div>

      <div class="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 mb-2 border-b border-white/5 pb-2">VOICE</div>
      <div class="grid md:grid-cols-2 gap-2 mb-2">${voiceOptions}</div>

      <div class="mt-3 small">
        Current selection:
        <b>${escapeHtml(state.agentName || "—")}</b> •
        <b>${escapeHtml(getRoleLabel(state.roleId) || "—")}</b> •
        <b>${escapeHtml(state.voice || "—")}</b> •
        <b>${escapeHtml(TEMPLATES.find(x=>x.id===state.templateId)?.label || "—")}</b>
      </div>

      ${scriptBox}
    `
  });

  // role
  $("modalBody").querySelectorAll("[data-role]").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.roleId = b.dataset.role;
      // reset downstream demo/plan/activate (since agent config changed)
      state.company = null;
      state.demoDone = false;
      state.plan = null;
      state.activated = false;
      setStepLabels();
      setNextBlink();
      openAgentRoleVoiceTemplate();
    });
  });

  // template
  $("modalBody").querySelectorAll("[data-template]").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.templateId = b.dataset.template;
      const tpl = TEMPLATES.find(x=>x.id===state.templateId);
      state.script = applyVars(tpl?.script || "");
      state.company = null;
      state.demoDone = false;
      state.plan = null;
      state.activated = false;
      setStepLabels();
      setNextBlink();
      openAgentRoleVoiceTemplate();
    });
  });

  // voice
  $("modalBody").querySelectorAll("[data-voice]").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.voice = b.dataset.voice;
      state.company = null;
      state.demoDone = false;
      state.plan = null;
      state.activated = false;
      setStepLabels();
      setNextBlink();
      openAgentRoleVoiceTemplate();
    });
  });

  $("btnSaveScript").addEventListener("click", ()=>{
    const v = $("scriptBox").value || "";
    state.script = applyVars(v);
    setStepLabels();
    setNextBlink();
    // stay open
  });

  $("btnConfirmStep3").addEventListener("click", ()=>{
    const v = $("scriptBox").value || "";
    state.script = applyVars(v);

    // require selections
    
    if(!state.roleId || !state.voice || !state.templateId){
      alert("Please select Role, Template, and Voice.");
      return;
    }

    closeModal();
    setStepLabels();
    setNextBlink();
    setTimeout(autoOpenNext, 120);
  });
}

function openDemo(){
  openModal({
    title:"Demo Call",
    pill:"04 DEMO",
    narrow:true,
    html: `
      <div class="small mb-3">
        Enter your <b>company name</b>. Your demo button will show: <b>{Company} Demo Call</b>.
      </div>
      <input id="companyInput" class="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white mb-3 text-xs font-black uppercase outline-none"
        placeholder="Company Name" value="${escapeHtml(state.company || "")}">

      <button id="btnStartDemoCall" class="btn-orange w-full py-4 rounded-xl text-[10px] font-black uppercase italic tracking-widest" type="button">
        ${escapeHtml((state.company || "YOUR COMPANY") + " DEMO CALL")}
      </button>

      <div class="mt-3 small opacity-80">
        Prototype: this marks demo complete. (Wire to Vapi later.)
      </div>
    `
  });

  const input = $("companyInput");
  const btn = $("btnStartDemoCall");
  input.addEventListener("input", ()=>{
    const name = (input.value || "").trim().slice(0, 60);
    btn.textContent = `${(name || "YOUR COMPANY").toUpperCase()} DEMO CALL`;
  });

  btn.addEventListener("click", ()=>{
    const name = (input.value || "").trim().slice(0, 60);
    if(name.length < 2){
      alert("Please enter a company name.");
      return;
    }
    state.company = name;
    // re-apply variables to script
    state.script = applyVars(state.script || "");

    state.demoDone = true;
    closeModal();
    setStepLabels();
    setNextBlink();
    setTimeout(autoOpenNext, 120);
  });
}

function openPlanModal(){
  openModal({
    title:"Pick Plan",
    pill:"05 PLAN",
    narrow:true,
    html: `
      <div class="small mb-3">
        Choose your beta plan.
      </div>
      <button class="modal-item" data-plan="299">
        <span>$299/mo — up to 1,000 minutes</span><span class="text-[10px] font-black opacity-60">Select</span>
      </button>
      <div class="mt-2"></div>
      <button class="modal-item" data-plan="599">
        <span>$599/mo — up to 2,200 minutes</span><span class="text-[10px] font-black opacity-60">Select</span>
      </button>
      <div class="mt-2"></div>
      <button class="modal-item" data-plan="899">
        <span>$899/mo — up to 3,500 minutes</span><span class="text-[10px] font-black opacity-60">Select</span>
      </button>
      <div class="mt-3 small opacity-80">Overage: $0.30/min billed next invoice.</div>
    `
  });

  $("modalBody").querySelectorAll("[data-plan]").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.plan = b.dataset.plan;
      markPlanSelected();
      closeModal();
      setStepLabels();
      setNextBlink();
      setTimeout(autoOpenNext, 120);
    });
  });
}

function openActivatePreview(){
  const tplLabel = TEMPLATES.find(x=>x.id===state.templateId)?.label || "—";
  const roleLabel = getRoleLabel(state.roleId);

  openModal({
    title:"Activation Preview",
    pill:"06 ACTIVATE",
    narrow:false,
    html: `
      <div class="small mb-3">
        Preview everything you selected before checkout.
      </div>

      <div class="grid md:grid-cols-2 gap-3">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">MARKET</div>
          <div class="mt-2 text-white font-black text-lg">${escapeHtml(state.country || "—")}</div>
          <div class="mt-3 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">INDUSTRY</div>
          <div class="mt-2 text-white font-black text-lg">${escapeHtml(state.industry || "—")}</div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">COMPANY</div>
          <div class="mt-2 text-white font-black text-lg">${escapeHtml(state.company || "—")}</div>
          <div class="mt-3 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">PLAN</div>
          <div class="mt-2 text-white font-black text-lg">$${escapeHtml(state.plan || "—")}/mo</div>
          <div class="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Beta special • Regular shown • Prices may change anytime without notice
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
          <div class="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">AI AGENT CONFIG</div>
          <div class="mt-2 text-white font-black text-lg">
            ${escapeHtml(state.agentName || "—")} • ${escapeHtml(roleLabel || "—")} • ${escapeHtml(state.voice || "—")} • ${escapeHtml(tplLabel)}
          </div>

          <div class="mt-4 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">SCRIPT</div>
          <pre class="mt-2 rounded-2xl p-3 text-[12px] font-semibold whitespace-pre-wrap"
               style="background:rgba(0,0,0,.25); border:1px solid rgba(255,255,255,.10); color:rgba(226,232,240,.92);">${escapeHtml(state.script || "")}</pre>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-2 mt-4">
        <button id="btnEditActivate" class="btn-outline w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest" type="button">
          EDIT SELECTIONS
        </button>
        <button id="btnCheckout" class="btn-orange w-full py-4 rounded-xl text-[10px] font-black uppercase italic tracking-widest" type="button">
          PROCEED TO CHECKOUT
        </button>
      </div>
    `
  });

  $("btnEditActivate").addEventListener("click", ()=>{
    closeModal();
    // Send them back to Step 03 config
    openAgentRoleVoiceTemplate();
  });

  $("btnCheckout").addEventListener("click", async ()=>{
    if(!state.plan){
      alert("Please select a plan first.");
      return;
    }

    const email = prompt("Enter your email (must match your Supabase user):", "");
    if(!email) return;
const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;

if (!token) {
  alert("You must be signed in to continue.");
  return;
}
    openModal({
      title: "Redirecting to Stripe Checkout",
      pill: "ACTIVATE",
      narrow: true,
      html: `<div class="small">Opening secure Stripe checkout...</div>`
    });

    try{
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
},
        body: JSON.stringify({
          plan: state.plan,
          email: email,
          country: state.country,
          industry: state.industry,
          company: state.company,
          agentId: state.agentId,
          role: state.roleId,
          voice: state.voice,
          template: state.templateId,
          script: state.script
        })
      });

      const data = await response.json();

      if(!response.ok || !data.url){
        closeModal();
        alert("Checkout error: " + (data.error || "Unknown error"));
        return;
      }

      state.activated = true;
      setStepLabels();
      setNextBlink();

      window.location.href = data.url;
    } catch(err){
      closeModal();
      alert("Checkout error: " + (err.message || "Unknown error"));
    }
  });
}

// ======================================================
// Pricing local currency on country select + FX converter
// ======================================================
async function updateLocalPricingFromCountry(){
  const country = state.country;
  const code = marketCurrencyCode[country] || "USD";

  // Clear if USD
  const localEls = ["p299_local","p599_local","p899_local"].map(id => $(id)).filter(Boolean);
  localEls.forEach(el => el.textContent = "");

  const fx = await fetchFxRatesUSD();
  if(!fx.rates || !fx.rates[code]) return;
  if(code === "USD") return;

  const r = fx.rates[code];
  const l299 = formatMoney(PLANS["299"].usd * r, code);
  const l599 = formatMoney(PLANS["599"].usd * r, code);
  const l899 = formatMoney(PLANS["899"].usd * r, code);

  if($("p299_local")) $("p299_local").textContent = `≈ ${l299} (LOCAL)`;
  if($("p599_local")) $("p599_local").textContent = `≈ ${l599} (LOCAL)`;
  if($("p899_local")) $("p899_local").textContent = `≈ ${l899} (LOCAL)`;
}

// Converter dropdown data
const CURRENCY_LIST = [
  { code:"USD", name:"US Dollar" },
  { code:"CAD", name:"Canadian Dollar" },
  { code:"EUR", name:"Euro" },
  { code:"GBP", name:"British Pound" },
  { code:"AUD", name:"Australian Dollar" },
  { code:"AED", name:"UAE Dirham" },
  { code:"SAR", name:"Saudi Riyal" },
  { code:"TRY", name:"Turkish Lira" },
  { code:"BRL", name:"Brazilian Real" },
  { code:"MXN", name:"Mexican Peso" },
  { code:"INR", name:"Indian Rupee" },
  { code:"JPY", name:"Japanese Yen" },
  { code:"KRW", name:"Korean Won" },
  { code:"SGD", name:"Singapore Dollar" },
  { code:"ZAR", name:"South African Rand" }
];

function populateCurrencySelect(){
  const sel = $("fxCurrency");
  if(!sel) return;
  sel.innerHTML = "";
  CURRENCY_LIST.forEach(c=>{
    const opt = document.createElement("option");
    opt.value = c.code;
    opt.textContent = c.code;
    sel.appendChild(opt);
  });
  sel.value = "USD";
}

async function updateFxConverterUI(){
  const sel = $("fxCurrency");
  const fx299 = $("fx299");
  const fx599 = $("fx599");
  const fx899 = $("fx899");
  const fx299sub = $("fx299sub");
  const fx599sub = $("fx599sub");
  const fx899sub = $("fx899sub");
  const fxMeta = $("fxMeta");

  if(!sel || !fx299 || !fx599 || !fx899 || !fx299sub || !fx599sub || !fx899sub || !fxMeta) return;

  const fx = await fetchFxRatesUSD();
  const rates = fx.rates;

  const code = sel.value || "USD";
  if(!rates || !rates[code]){
    fx299.textContent = "—";
    fx599.textContent = "—";
    fx899.textContent = "—";
    fx299sub.textContent = "UP TO 1,000 MIN • OVERAGE — —/MIN";
    fx599sub.textContent = "UP TO 2,200 MIN • OVERAGE — —/MIN";
    fx899sub.textContent = "UP TO 3,500 MIN • OVERAGE — —/MIN";
    fxMeta.textContent = "Rates unavailable • Base: USD • Billed in USD via Stripe";
    return;
  }

  const r = rates[code];
  const over = PLANS["299"].overageUsd * r;

  fx299.textContent = `${formatMoney(PLANS["299"].usd * r, code)} / mo`;
  fx599.textContent = `${formatMoney(PLANS["599"].usd * r, code)} / mo`;
  fx899.textContent = `${formatMoney(PLANS["899"].usd * r, code)} / mo`;

  fx299sub.textContent = `UP TO 1,000 MIN • OVERAGE ${formatMoney(over, code)}/MIN`;
  fx599sub.textContent = `UP TO 2,200 MIN • OVERAGE ${formatMoney(over, code)}/MIN`;
  fx899sub.textContent = `UP TO 3,500 MIN • OVERAGE ${formatMoney(over, code)}/MIN`;

  const stamp = fx.stamp ? ` • LAST UPDATED: ${fx.stamp}` : "";
  fxMeta.textContent = `Rates shown for reference • Base: USD • Billed in USD via Stripe${stamp}`;
}

// ======================================================
// Wiring: steps + plan cards + top CTA
// ======================================================
function wireSteps(){
  const s1 = $("s1"), s2 = $("s2"), s3 = $("s3"), s4 = $("s4"), s5 = $("s5"), s6 = $("s6");

  s1.addEventListener("click", openCountry);
  s2.addEventListener("click", openIndustry);
  s3.addEventListener("click", openAgentRoleVoiceTemplate);
  s4.addEventListener("click", ()=>{ if(!s4.classList.contains("locked")) openDemo(); });
  s5.addEventListener("click", ()=>{ if(!s5.classList.contains("locked")) openPlanModal(); });
  s6.addEventListener("click", ()=>{ if(!s6.classList.contains("locked")) openActivatePreview(); });

  addKeyActivate(s1, openCountry);
  addKeyActivate(s2, openIndustry);
  addKeyActivate(s3, openAgentRoleVoiceTemplate);
  addKeyActivate(s4, ()=>{ if(!s4.classList.contains("locked")) openDemo(); });
  addKeyActivate(s5, ()=>{ if(!s5.classList.contains("locked")) openPlanModal(); });
  addKeyActivate(s6, ()=>{ if(!s6.classList.contains("locked")) openActivatePreview(); });

  $("btnStartActivation").addEventListener("click", autoOpenNext);
}

function wirePlanCards(){
  function selectPlan(p){
    state.plan = p;
    markPlanSelected();
    setStepLabels();
    setNextBlink();
  }

  ["299","599","899"].forEach(p=>{
    const card = $(`planCard${p}`);
    if(!card) return;
    card.addEventListener("click", ()=>{
      // only allow selecting plan after demo
      if(!$("s5").classList.contains("locked")) selectPlan(p);
    });
    addKeyActivate(card, ()=>{
      if(!$("s5").classList.contains("locked")) selectPlan(p);
    });
  });
}

function wireTopButtons(){
  // keep placeholders (same as your previous)
  $("btnDashboard").addEventListener("click", ()=>alert("Dashboard (placeholder)"));
  $("btnQA").addEventListener("click", ()=>alert("AI Q&A (placeholder)"));
  $("btnForum").addEventListener("click", ()=>alert("Forum (placeholder)"));
  $("btnNews").addEventListener("click", ()=>alert("Newsletter (placeholder)"));

  $("langSelect").addEventListener("change", ()=>{ /* UI only */ });
}

// ======================================================
// INIT
// ======================================================
document.addEventListener("DOMContentLoaded", async ()=>{
  wireModalShell();
  wireTopButtons();
  wireSteps();
  wirePlanCards();

  renderEcosystem();
  markPlanSelected();
  setStepLabels();
  setNextBlink();

  populateCurrencySelect();
  await updateFxConverterUI();

  $("fxCurrency")?.addEventListener("change", async ()=>{
    await updateFxConverterUI();
  });

  // Resize sync (optional if you still use it)
  window.addEventListener("resize", ()=>{});

  // Start with local pricing blank until they pick country
  await updateLocalPricingFromCountry();
});
