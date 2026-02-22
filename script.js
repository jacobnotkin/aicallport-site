/* global confetti */

// ============================
// ✅ Language Engine
// ============================
const LANG_STORAGE_KEY = "aicallport_lang";
const I18N_CACHE_KEY = "aicallport_i18n_cache_v1";
const SUPPORTED_LANGS = [
  "EN","ZH","HI","ES","FR","AR","BN","PT","RU","UR",
  "ID","DE","JA","PCM","MR","TE","TR","TA","YUE","VI",
  "TL","WU","KO","FA","HA","SW","JV","IT","PA","KN","HE"
];
const RTL_LANGS = new Set(["AR","HE"]);

function mapBrowserLangToCode(browserLang) {
  const b = (browserLang || "").toLowerCase();
  if (b.startsWith("en")) return "EN";
  if (b.startsWith("es")) return "ES";
  if (b.startsWith("fr")) return "FR";
  if (b.startsWith("de")) return "DE";
  if (b.startsWith("pt")) return "PT";
  if (b.startsWith("ru")) return "RU";
  if (b.startsWith("ar")) return "AR";
  if (b.startsWith("he") || b.startsWith("iw")) return "HE";
  if (b.startsWith("hi")) return "HI";
  if (b.startsWith("bn")) return "BN";
  if (b.startsWith("ur")) return "UR";
  if (b.startsWith("id")) return "ID";
  if (b.startsWith("tr")) return "TR";
  if (b.startsWith("it")) return "IT";
  if (b.startsWith("fa")) return "FA";
  if (b.startsWith("sw")) return "SW";
  if (b.startsWith("ha")) return "HA";
  if (b.startsWith("ja")) return "JA";
  if (b.startsWith("ko")) return "KO";
  if (b.startsWith("vi")) return "VI";
  if (b.startsWith("tl") || b.startsWith("fil")) return "TL";
  if (b.startsWith("zh")) return "ZH";
  return "EN";
}

window.APP_I18N = { current: "EN" };

const translations = {
  EN: {
    community: "Community",
    newsletter: "Newsletter",
    forum: "Forum",
    ai_qa: "AI Q&A",
    newsletter_no_deploy: "Join Newsletter (No Deploy)",
    activation_steps_info: "Activation Steps Info",
    close: "Close",
    next: "Next",
    go_back: "Go Back",
    start_activation: "Start Activation",
    activate_now: "Activate Now",
    save: "Save",
    confirm: "Confirm",

    search_languages: "SEARCH LANGUAGES...",
    search_countries: "SEARCH COUNTRIES...",
    search_industries: "SEARCH INDUSTRIES...",
    search_templates: "SEARCH TEMPLATES...",
    no_matching: "NO MATCHING RESULTS",

    setup: "Setup",
    dashboard: "Dashboard",
    post: "Post",
    reply: "Reply",
    title: "Title",
    email: "Email",
    name_optional: "Name (Optional)",
    tell_us_updates: "Tell us what you want updates about (optional)",
    write_question: "Write your question or feedback...",
    write_reply: "Write a reply...",
    ask_question: "Ask a question...",
    thinking: "Thinking...",
    needs_backend: "This feature needs a backend endpoint.",

    hero_h1: "GLOBAL ZERO-HUMAN<br>AI RECEPTIONIST",
    hero_p:
      "Instant <span class='text-orange-500'>SMALL BUSINESS</span> Activation. " +
      "<span class='text-orange-500'>Fully Automated Worldwide Deployment. Multilingual. No Humans.</span>",
    beta_access: "BETA ACCESS - SMALL BUSINESS",
    regular: "Regular",
    global_live: "Global Live",
    per_month: "/mo",
    per_month_usd: "/mo USD",
    approx: "Approx.",

    feat_1: "Unlimited Inbound Calling",
    feat_2: "Pay Monthly",
    feat_3: "No Contract",

    step_01: "01 Market",
    step_02: "02 Industry",
    step_03: "03 Business",
    step_04: "04 Agent Role",
    step_05: "05 Demo",
    step_06: "06 Deploy",

    select: "Select",
    sync: "Sync",
    choose: "Choose",
    sandbox: "Sandbox",
    instant: "Instant",

    role_templates_voice: "ROLE • TEMPLATES • VOICE",
    agent_role: "Agent Role",
    templates: "Templates",
    editable_script: "Editable Script",
    editable_script_btn: "Editable Script",
    script_editor_title: "Editable Script",
    script_editor_help: "Edit what your agent will say. This script becomes the system instructions for the AI.",
    reset_to_template: "Reset to Template",
    save_script: "Save Script",
    close_editor: "Close",
    reset_template: "Reset Template",
    preview_voice: "Preview Voice",
    voice: "Voice",
    voice_tuning: "Voice Tuning",
    stability: "Stability",
    similarity: "Similarity",
    style: "Style",
    speaker_boost: "Speaker Boost",
    on: "ON",
    off: "OFF",
    confirm_role_template_voice: "CONFIRM ROLE + TEMPLATE + VOICE",

    receptionist: "Receptionist",
    sales_agent: "Sales Agent",
    support_agent: "Support Agent",

    role_help_receptionist: "Handles inbound calls, captures caller info, books appointments, and routes urgent cases.",
    role_help_sales: "Qualifies leads fast, captures contact details, and books consultations.",
    role_help_support: "Collects issue details, prioritizes urgency, and escalates when needed.",

    demo_call: "START DEMO CALL",
    deploy_get_number: "GET MY NUMBER",

    community_portal: "Community Portal",
    join_list: "Join List",
    ask_ai: "Ask AI",

    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    active_agents: "ACTIVE AGENTS",

    business_name: "Business Name",

    open_ai_qa: "AI Q&A",
    open_forum: "Forum",
    open_newsletter: "Newsletter",
    subscribed: "Subscribed",
    no_signups: "No signups yet",
    no_posts: "No posts yet",
    forum_threads: "Forum Threads",
    deployed_yes: "Deployed: YES",
    deployed_no: "Deployed: NO",

    smb_benefits: "SMB Benefits",
    smb_benefits_title: "Small Business Benefits",
    hover_to_learn: "Click a benefit to see details",
    benefits_close: "Close"
  },

  ES: { community:"Comunidad", newsletter:"Boletín", forum:"Foro", ai_qa:"Preguntas IA", close:"Cerrar", start_activation:"Iniciar Activación", confirm:"Confirmar", smb_benefits:"Beneficios SMB" },
  FR: { community:"Communauté", newsletter:"Newsletter", forum:"Forum", ai_qa:"Q&R IA", close:"Fermer", start_activation:"Démarrer", confirm:"Confirmer", smb_benefits:"Avantages PME" },
  AR: { community:"المجتمع", newsletter:"النشرة", forum:"المنتدى", ai_qa:"سؤال وجواب", close:"إغلاق", start_activation:"بدء التفعيل", confirm:"تأكيد", smb_benefits:"مزايا الأعمال" },
  HE: { community:"קהילה", newsletter:"ניוזלטר", forum:"פורום", ai_qa:"שאלות ותשובות", close:"סגור", start_activation:"התחל הפעלה", confirm:"אישור", smb_benefits:"יתרונות לעסקים" }
};

SUPPORTED_LANGS.forEach(code => { if (!translations[code]) translations[code] = {}; });

function loadI18nCache(){ try { return JSON.parse(localStorage.getItem(I18N_CACHE_KEY) || "{}"); } catch { return {}; } }
function saveI18nCache(cache){ try { localStorage.setItem(I18N_CACHE_KEY, JSON.stringify(cache || {})); } catch {} }
const dynamicCache = loadI18nCache();

function dynGet(lang, namespace, key){ return dynamicCache?.[lang]?.[namespace]?.[key] || null; }
function dynSet(lang, namespace, map){
  dynamicCache[lang] ||= {};
  dynamicCache[lang][namespace] ||= {};
  Object.entries(map || {}).forEach(([k,v]) => {
    if (v != null && String(v).trim().length) dynamicCache[lang][namespace][k] = v;
  });
  saveI18nCache(dynamicCache);
}

async function ensureDynamicTranslations(lang, namespace, items){
  const code = (lang || "EN").toUpperCase();
  if (code === "EN") return;

  const missing = (items || []).filter(x => !dynGet(code, namespace, x));
  if (!missing.length) return;

  try{
    const res = await fetch("/api/i18n-batch", {
      method: "POST",
      headers: { "content-type":"application/json" },
      body: JSON.stringify({ lang: code, namespace, items: missing })
    });
    if (!res.ok) throw new Error("no backend");
    const data = await res.json();
    if (data && data.map) dynSet(code, namespace, data.map);
  } catch(e){
    // no backend: EN fallback
  }
}

function getDict(lang) { return translations[lang] || translations.EN; }
function t(key) {
  const lang = window.APP_I18N.current || "EN";
  const dict = getDict(lang);
  return (dict[key] != null ? dict[key] : (translations.EN[key] != null ? translations.EN[key] : key));
}

function applyTranslations(root = document) {
  const html = document.documentElement;
  html.lang = (window.APP_I18N.current || "EN").toLowerCase();
  html.dir = RTL_LANGS.has(window.APP_I18N.current) ? "rtl" : "ltr";

  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  root.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });
  root.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    el.setAttribute("title", t(key));
  });
  root.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    el.setAttribute("aria-label", t(key));
  });
}

function setLanguage(langCode) {
  const code = (langCode || "EN").toUpperCase();
  window.APP_I18N.current = SUPPORTED_LANGS.includes(code) ? code : "EN";
  localStorage.setItem(LANG_STORAGE_KEY, window.APP_I18N.current);
  applyTranslations(document);
  if (typeof window.onLanguageChanged === "function") window.onLanguageChanged(window.APP_I18N.current);
}

(function initLanguageEngine() {
  let stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (!stored) stored = mapBrowserLangToCode(navigator.language || navigator.userLanguage || "en");
  setLanguage(stored);
})();

window.i18n = { t, setLanguage, applyTranslations, translations, ensureDynamicTranslations, dynGet };

// ============================
// Helpers
// ============================
function escapeHtml(str){
  return String(str || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

function updateParallax(e){
  if(!e) return;
  document.documentElement.style.setProperty('--mx', (e.clientX / window.innerWidth * 100) + '%');
  document.documentElement.style.setProperty('--my', (e.clientY / window.innerHeight * 100) + '%');
}
window.updateParallax = updateParallax;

// ============================
// CONFIG (Vapi key)
// ============================
let vapiApiKey = null;
async function loadVapiKey() {
  if (vapiApiKey) return vapiApiKey;
  const res = await fetch("/api/config", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load /api/config");
  const data = await res.json();
  if (!data || !data.vapiPublicKey) throw new Error("Missing vapiPublicKey in /api/config response");
  vapiApiKey = data.vapiPublicKey;
  return vapiApiKey;
}

// ============================
// VAPI LOADER (browser-safe)
// ============================
let vapiFallbackInstance = null;

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = [...document.scripts].find(s => s.src === src);
    if (existing) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load: " + src));
    document.head.appendChild(s);
  });
}

async function vapiStartCall(assistantId, assistantOverrides) {
  const apiKey = await loadVapiKey();
  await loadScriptOnce("https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js");
  if (!window.vapiSDK || typeof window.vapiSDK.run !== "function") {
    throw new Error("Vapi SDK did not initialize");
  }

  if (vapiFallbackInstance && vapiFallbackInstance.stop) {
    try { vapiFallbackInstance.stop(); } catch {}
  }

  vapiFallbackInstance = window.vapiSDK.run({
    apiKey,
    assistant: assistantId,
    assistantOverrides: assistantOverrides || {}
  });

  return vapiFallbackInstance;
}

// ============================
// FX (USD + Local estimate)
// ============================
const BASE_USD_PRICE = 199;
const BASE_USD_REG = 399;

const marketCurrencyCode = {
  "United States":"USD",
  "Canada":"CAD",
  "United Kingdom":"GBP",
  "France":"EUR",
  "Germany":"EUR",
  "Spain":"EUR",
  "Italy":"EUR",
  "Azerbaijan":"AZN"
};
const currencySymbolMap = { USD:"$", EUR:"€", GBP:"£", CAD:"$", AZN:"₼" };
const FX_CACHE_KEY = "aicallport_fx_cache_v1";

function roundNice(amount, code){
  if (code === "JPY" || code === "KRW") return Math.round(amount);
  return Math.round(amount);
}
function getFxCache(){ try { return JSON.parse(localStorage.getItem(FX_CACHE_KEY)||"{}"); } catch { return {}; } }
function setFxCache(obj){ try { localStorage.setItem(FX_CACHE_KEY, JSON.stringify(obj||{})); } catch {} }

async function fetchFxRate(toCode){
  const cache = getFxCache();
  const key = `USD_${toCode}`;
  const now = Date.now();

  if (cache[key] && (now - cache[key].ts) < 24*60*60*1000) return cache[key].rate;

  try{
    const res = await fetch(`/api/fx?base=USD&to=${encodeURIComponent(toCode)}`, { cache: "no-store" });
    if (!res.ok) throw new Error("fx backend missing");
    const data = await res.json();
    const rate = Number(data?.rate);
    if (!rate || !isFinite(rate)) throw new Error("bad rate");
    cache[key] = { rate, ts: now };
    setFxCache(cache);
    return rate;
  } catch(e){
    return null;
  }
}

async function updatePricingUIForMarket(countryName){
  const code = marketCurrencyCode[countryName] || "USD";
  const sym = currencySymbolMap[code] || "$";

  document.getElementById("usd-symbol").textContent = "$";
  document.getElementById("usd-price").textContent = String(BASE_USD_PRICE);
  document.getElementById("reg-usd").textContent = `$${BASE_USD_REG}`;

  if (code === "USD"){
    document.getElementById("local-line").textContent = `$${BASE_USD_PRICE}`;
    document.getElementById("reg-local").textContent = `$${BASE_USD_REG}`;
    return;
  }

  const rate = await fetchFxRate(code);
  if (!rate){
    document.getElementById("local-line").textContent = `${sym}${BASE_USD_PRICE}`;
    document.getElementById("reg-local").textContent = `${sym}${BASE_USD_REG}`;
    return;
  }

  const local = roundNice(BASE_USD_PRICE * rate, code);
  const localReg = roundNice(BASE_USD_REG * rate, code);
  document.getElementById("local-line").textContent = `${sym}${local}`;
  document.getElementById("reg-local").textContent = `${sym}${localReg}`;
}

// ============================
// ASSISTANTS (fallback mapping)
// ============================
const assistants = {
  "Electrical": "7a2fbe45-b54b-4375-aa1f-111be3f1501a",
  "Plumbing": "e6dec738-840f-4932-85b4-421b2a7bdb0c",
  "Wellness": "e95dca20-93f2-46f0-b014-3a885586fa65",
  "Legal": "e4ef966a-b6de-4e4f-b586-3dda4480fd0f"
};

// ============================
// STATE
// ============================
let completedSteps = 0;
let selectedIndustryKey = "Electrical";
let selectedMarket = "United States";

let selectedRole = "Receptionist";
let selectedTemplateKey = null;
let agentScript = "";

let templateCategoryFilter = "ALL";
let templateSearchQuery = "";

const LS_DEPLOYED = "aicallport_deployed";
function setDeployed(v) { localStorage.setItem(LS_DEPLOYED, v ? "1" : "0"); }
function isDeployed() { return localStorage.getItem(LS_DEPLOYED) === "1"; }

const vapiVoices = [
  { id: "Mia", label: "Mia (Professional / Articulate)" },
  { id: "Leah", label: "Leah (Warm / Gentle)" },
  { id: "Dan", label: "Dan (Friendly / Casual)" },
  { id: "Zac", label: "Zac (Enthusiastic / Dynamic)" },
  { id: "Jess", label: "Jess (Energetic / Youthful)" },
  { id: "Zoe", label: "Zoe (Calm / Soothing)" },
  { id: "Leo", label: "Leo (Authoritative / Deep)" },
  { id: "Savannah", label: "Savannah (American / Southern)" },
  { id: "Rohan", label: "Rohan (Bright / Energetic)" },
  { id: "Elliot", label: "Elliot (Canadian / Soothing)" }
];
let selectedVoiceId = "Mia";
let selectedVoiceSettings = { stability: 0.5, similarityBoost: 0.8, style: 0.2, useSpeakerBoost: false };
function getSelectedVapiVoice() { return { provider: "vapi", voiceId: selectedVoiceId }; }

// ============================
// LANG MENU DATA
// ============================
const languageList = [
  { id:"EN", n:"English", f:"us" },
  { id:"ES", n:"Spanish", f:"mx" },
  { id:"FR", n:"French", f:"fr" },
  { id:"AR", n:"Arabic", f:"sa" },
  { id:"HE", n:"Hebrew", f:"il" },
  { id:"DE", n:"German", f:"de" },
  { id:"PT", n:"Portuguese", f:"pt" },
  { id:"RU", n:"Russian", f:"ru" }
];

window.onLanguageChanged = async () => {
  const curModalOpen = document.getElementById("setupModal").style.display === "flex";
  if (curModalOpen && lastModalStep != null) {
    await triggerModal(lastModalStep, { preserve: true });
  }
  i18n.applyTranslations(document);
};

// ============================
// Activation Info
// ============================
const activationInfoSlides = [
  { keyTitle:"STEP 1 — MARKET", keyText:"Choose the country/market. Pricing and deployment routing adjust automatically based on your selection." },
  { keyTitle:"STEP 2 — INDUSTRY", keyText:"Select your industry. Industry packs determine the scripts/templates you start with." },
  { keyTitle:"STEP 3 — BUSINESS", keyText:"Enter your business name. Used in greetings and scripts." },
  { keyTitle:"STEP 4 — ROLE + TEMPLATES + VOICE", keyText:"Pick the role. Choose an industry template pack, edit script, choose a voice, preview it." },
  { keyTitle:"STEP 5 — DEMO", keyText:"Run a test call using your selected role + script + voice." },
  { keyTitle:"STEP 6 — DEPLOY + DASHBOARD", keyText:"After payment, your agent deploys. Customer gets a dashboard to edit role, script, voice, routing, and business info anytime." }
];
let infoIdx = 0;

function openActivationInfo(){ infoIdx = 0; triggerModal("info"); }
function renderInfoSlide(){
  const slide = activationInfoSlides[infoIdx];
  const c = document.getElementById('mContent');
  c.innerHTML = `
    <div class="pill mb-4">${escapeHtml(i18n.t("activation_steps_info"))}</div>
    <div class="card-theme text-left">
      <div class="mini text-orange-500 mb-2">${escapeHtml(slide.keyTitle)}</div>
      <div class="text-[12px] text-slate-300 font-semibold leading-relaxed">${escapeHtml(slide.keyText)}</div>
    </div>
    <div class="grid sm:grid-cols-3 gap-2 mt-4">
      <button class="modal-btn justify-center text-center" type="button" onclick="infoPrev()" ${infoIdx===0 ? 'style="opacity:.35;pointer-events:none"' : ''}>${escapeHtml(i18n.t("go_back"))}</button>
      <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic" type="button" onclick="infoNext()">
        ${escapeHtml(infoIdx === activationInfoSlides.length - 1 ? i18n.t("start_activation") : i18n.t("next"))}
      </button>
      <button class="modal-btn justify-center text-center" type="button" onclick="closeModal()">${escapeHtml(i18n.t("close"))}</button>
    </div>
    <div class="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-500">${infoIdx+1} / ${activationInfoSlides.length}</div>
  `;
  i18n.applyTranslations(document.getElementById("setupModal"));
}
window.infoPrev = function(){ if(infoIdx>0){ infoIdx--; renderInfoSlide(); } };
window.infoNext = function(){ if(infoIdx < activationInfoSlides.length-1){ infoIdx++; renderInfoSlide(); } else { closeModal(); handleStep(1); } };

// ============================
// SMB BENEFITS
// ============================
const smbBenefits = [
  { title: "High Quality AI Call Agents", desc: "Reliable inbound call handling built for real small businesses. No call-center scripts. Professional tone and fast capture of details." },
  { title: "Multiple Roles (Receptionist, Booking, Sales, Support, After-Hours)", desc: "Choose the agent role you need today — and switch anytime. Use different roles for business hours vs after-hours/weekends." },
  { title: "Full Control Before + After Deployment", desc: "Select role, template, and voice before deployment. After deployment, you keep control via your client dashboard (role/voice/script/hours)." },
  { title: "Deploy in Minutes (6-Step Protocol)", desc: "A simple activation protocol — Market → Industry → Business → Role/Template/Voice → Demo → Deploy. No meetings. No onboarding calls." },
  { title: "Worldwide + Multilingual", desc: "Global routing + multilingual experience for your customers. Your business can answer calls in the language your customer speaks." },
  { title: "Unlimited Inbound Calls", desc: "No per-minute surprises. Handle inbound calls at scale." },
  { title: "Pay Monthly • No Contract", desc: "Fair and transparent: monthly billing, cancel anytime." },
  { title: "Secure Payments via Stripe", desc: "Secure payment processing through Stripe." },
  { title: "No Salesman • No Human Layer", desc: "This is a self-serve operational console. No human gatekeepers. Turn ON your AI call agent when you are ready." },
  { title: "Referral Discount (Up to $0/mo)", desc: "After activation you get a referral link. Each referral reduces your monthly payment by $10. More referrals = lower monthly cost (down to $0/mo)." }
];

let activeBenefitIdx = 0;
const BENEFITS_SEL_KEY = "aicallport_benefits_selected_idx";
const BENEFITS_HASH_PREFIX = "benefits=";

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }
function getSavedBenefitIdx(){
  const v = Number(sessionStorage.getItem(BENEFITS_SEL_KEY));
  return Number.isFinite(v) ? clamp(v, 0, smbBenefits.length - 1) : null;
}
function saveBenefitIdx(idx){ try { sessionStorage.setItem(BENEFITS_SEL_KEY, String(idx)); } catch {} }
function readBenefitsIdxFromHash(){
  const h = (location.hash || "").replace("#", "").trim();
  if(!h.startsWith(BENEFITS_HASH_PREFIX)) return null;
  const raw = h.slice(BENEFITS_HASH_PREFIX.length);
  const n = Number(raw);
  return Number.isFinite(n) ? clamp(n, 0, smbBenefits.length - 1) : null;
}
function writeBenefitsIdxToHash(idx){
  try{
    const next = `#${BENEFITS_HASH_PREFIX}${idx}`;
    if(location.hash === next) return;
    history.replaceState(null, "", next);
  } catch {}
}

function openBenefits(){
  const fromHash = readBenefitsIdxFromHash();
  const fromSaved = getSavedBenefitIdx();
  if(fromHash != null) activeBenefitIdx = fromHash;
  else if(fromSaved != null) activeBenefitIdx = fromSaved;
  else activeBenefitIdx = 0;
  triggerModal("benefits");
}

function renderBenefits(){
  const c = document.getElementById("mContent");
  const current = smbBenefits[activeBenefitIdx] || smbBenefits[0];

  c.innerHTML = `
    <div class="pill mb-3">${escapeHtml(i18n.t("smb_benefits_title"))}</div>
    <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">${escapeHtml(i18n.t("hover_to_learn"))}</div>

    <div class="grid lg:grid-cols-2 gap-4 text-left">
      <div class="card-theme">
        <div class="mini text-orange-500 mb-2">Benefits</div>
        <div id="benefitsListWrap"
             role="listbox"
             aria-label="SMB Benefits"
             aria-activedescendant="benefit_opt_${activeBenefitIdx}"
             tabindex="0"
             class="grid gap-2"></div>
      </div>

      <div class="card-theme benefits-desktop-panel">
        <div class="mini text-orange-500 mb-2">Explanation</div>
        <div id="benefitExplain" class="text-[14px] text-slate-300 font-semibold leading-relaxed whitespace-pre-wrap"></div>
        <div class="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
          Tip: This content can also be reused later inside the client dashboard.
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <div class="grid sm:grid-cols-2 gap-2">
        <button class="modal-btn justify-center text-center" type="button" onclick="closeModal()">${escapeHtml(i18n.t("close"))}</button>
        <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic" type="button" onclick="handleStep(1)">
          ${escapeHtml(i18n.t("start_activation"))}
        </button>
      </div>
    </div>
  `;

  const listWrap = document.getElementById("benefitsListWrap");
  listWrap.innerHTML = smbBenefits.map((b, idx) => {
    const isActive = idx === activeBenefitIdx;
    const inlineOpen = isActive ? "open" : "";
    const inlineId = `benefit_inline_${idx}`;

    return `
      <div>
        <div id="benefit_opt_${idx}"
             class="benefit-row ${isActive ? "active" : ""}"
             role="option"
             aria-selected="${isActive ? "true" : "false"}"
             tabindex="-1"
             data-idx="${idx}"
             onclick="selectBenefit(${idx}, { scroll:true, focusList:false })">
          <div class="text-[10px] font-black uppercase tracking-widest text-white">
            ${escapeHtml(b.title)}
          </div>
          <span class="benefit-marker" aria-hidden="true">✓</span>
        </div>

        <div id="${inlineId}" class="benefit-inline benefits-mobile-inline ${inlineOpen}">
          <div class="text-[14px] text-slate-300 font-semibold leading-relaxed whitespace-pre-wrap">
            ${escapeHtml(b.desc)}
          </div>
        </div>
      </div>
    `;
  }).join("");

  const explain = document.getElementById("benefitExplain");
  if (explain) explain.textContent = current?.desc || "";

  bindBenefitsKeyboard();
  i18n.applyTranslations(document.getElementById("setupModal"));
}

window.selectBenefit = function(idx, opts){
  const options = opts || {};
  const clamped = Math.max(0, Math.min(smbBenefits.length - 1, Number(idx)));
  if (!Number.isFinite(clamped)) return;

  activeBenefitIdx = clamped;
  saveBenefitIdx(activeBenefitIdx);
  writeBenefitsIdxToHash(activeBenefitIdx);

  const wrap = document.getElementById("benefitsListWrap");
  if (wrap) wrap.setAttribute("aria-activedescendant", `benefit_opt_${activeBenefitIdx}`);

  document.querySelectorAll(".benefit-row").forEach((el) => {
    const i = Number(el.getAttribute("data-idx"));
    const isActive = i === activeBenefitIdx;
    el.classList.toggle("active", isActive);
    el.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  const explain = document.getElementById("benefitExplain");
  const current = smbBenefits[activeBenefitIdx];
  if (explain && current) explain.textContent = current.desc;

  for(let i=0;i<smbBenefits.length;i++){
    const inline = document.getElementById(`benefit_inline_${i}`);
    if (!inline) continue;
    inline.classList.toggle("open", i === activeBenefitIdx);
  }

  if (options.scroll){
    const activeEl = document.getElementById(`benefit_opt_${activeBenefitIdx}`);
    if (activeEl && typeof activeEl.scrollIntoView === "function"){
      activeEl.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }
  }

  if (options.focusList){
    document.getElementById("benefitsListWrap")?.focus();
  }
};

let __benefitsTypeahead = { buf: "", t: null };
function bindBenefitsKeyboard(){
  const wrap = document.getElementById("benefitsListWrap");
  if(!wrap) return;
  if (wrap.dataset.bound === "1") return;
  wrap.dataset.bound = "1";

  wrap.addEventListener("keydown", (e) => {
    const key = e.key;
    const handled =
      key === "ArrowDown" || key === "ArrowUp" ||
      key === "Home" || key === "End" ||
      key === "Enter" || key === " ";

    const isTypeKey = key.length === 1 && /[a-z0-9]/i.test(key);
    if (!handled && !isTypeKey) return;

    if (isTypeKey){
      e.preventDefault();
      e.stopPropagation();

      clearTimeout(__benefitsTypeahead.t);
      __benefitsTypeahead.buf += key.toLowerCase();
      __benefitsTypeahead.t = setTimeout(() => { __benefitsTypeahead.buf = ""; }, 700);

      const q = __benefitsTypeahead.buf;
      const found = smbBenefits.findIndex(b => (b.title || "").toLowerCase().startsWith(q));
      if(found >= 0) window.selectBenefit(found, { scroll:true, focusList:false });
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (key === "Home") { window.selectBenefit(0, { scroll:true, focusList:false }); return; }
    if (key === "End")  { window.selectBenefit(smbBenefits.length - 1, { scroll:true, focusList:false }); return; }

    if (key === "ArrowDown") {
      const next = (activeBenefitIdx + 1) % smbBenefits.length;
      window.selectBenefit(next, { scroll:true, focusList:false });
      return;
    }
    if (key === "ArrowUp") {
      const prev = (activeBenefitIdx - 1 + smbBenefits.length) % smbBenefits.length;
      window.selectBenefit(prev, { scroll:true, focusList:false });
      return;
    }

    if (key === "Enter" || key === " ") {
      window.selectBenefit(activeBenefitIdx, { scroll:true, focusList:false });
      return;
    }
  });
}

// ============================
// INDUSTRIES + TEMPLATES (kept from your build)
// ============================
const industryKeys = ["Plumbing","Electrical","HVAC","Roofing","Real Estate","After Hours"];
const industryCategories = { "Home Services":["Plumbing","Electrical","HVAC","Roofing"], "Business":["Real Estate","After Hours"] };
function buildCategorizedIndustryList(){
  const out = [];
  Object.keys(industryCategories).forEach(cat => out.push({cat, items: industryCategories[cat]}));
  return out;
}

function dt(namespace, key, fallback){
  const lang = (window.APP_I18N.current || "EN").toUpperCase();
  const v = i18n.dynGet(lang, namespace, key);
  return v != null ? v : (fallback != null ? fallback : key);
}

const templateCategories = ["ALL","Popular","Recommended","Appointments","After Hours","Sales","Support"];
const industryPacks = {
  GLOBAL: {
    Receptionist: [
      { key:"pop_rec_standard", title:"Popular: Standard Receptionist + Booking", category:"Popular",
        script:`You are the AI receptionist for {{BUSINESS_NAME}} in {{MARKET}}.
Primary goals:
- Answer calls politely
- Provide basic info
- Book appointments or take messages
Collect: name, phone, reason, preferred date/time, email (optional)
Always confirm details before ending the call.`}
    ],
    "Sales Agent": [
      { key:"pop_sales_qual", title:"Popular: Sales Lead Qualifier + Booking", category:"Popular",
        script:`You are the AI sales agent for {{BUSINESS_NAME}}.
Qualify leads quickly and book appointments.
Ask: service needed, location, timeline, budget range (optional), contact info.`}
    ],
    "Support Agent": [
      { key:"rec_support_helpdesk", title:"Recommended: Helpdesk + Escalation", category:"Recommended",
        script:`You are the AI support agent for {{BUSINESS_NAME}}.
Collect: name, phone, account/order (if applicable), issue description, urgency.
Provide a short helpful step, then create a ticket and confirm callback.`}
    ]
  },
  Electrical: {
    Receptionist: [
      { key:"el_rec_safety", title:"Recommended: Electrical Safety First", category:"Recommended",
        script:`You are the AI receptionist for {{BUSINESS_NAME}} (Electrical).
Ask: sparking/burning smell/smoke? If yes, advise to turn off breaker if safe and call emergency services if needed.
Collect: address, issue description, contact info, urgency.`}
    ]
  }
};

function getCurrentIndustryKey(){ return selectedIndustryKey || "GLOBAL"; }
function getPackFor(industryKey){ return industryPacks[industryKey] || industryPacks.GLOBAL; }
function getTemplatesFor(roleName){
  const industryKey = getCurrentIndustryKey();
  const pack = getPackFor(industryKey);
  const roleList = pack[roleName] || [];
  if(!roleList.length){
    const globalRoleList = industryPacks.GLOBAL[roleName] || [];
    return { templates: globalRoleList, packName: "GLOBAL" };
  }
  return { templates: roleList, packName: industryKey };
}

function applyVars(text){
  const businessName = (document.getElementById('v3')?.innerText && document.getElementById('v3').innerText !== i18n.t("sync"))
    ? document.getElementById('v3').innerText
    : "YOUR BUSINESS";
  return (text || "")
    .replaceAll("{{BUSINESS_NAME}}", businessName)
    .replaceAll("{{MARKET}}", selectedMarket || "YOUR MARKET");
}

function refreshTemplatesForCurrentSelection(forceResetScript){
  const { templates } = getTemplatesFor(selectedRole);
  if(!templates.length){
    selectedTemplateKey = null;
    if(forceResetScript) agentScript = "";
    return;
  }
  if(!selectedTemplateKey || !templates.find(t => t.key === selectedTemplateKey)){
    selectedTemplateKey = templates[0].key;
  }
  if(forceResetScript){
    const chosen = templates.find(t => t.key === selectedTemplateKey) || templates[0];
    agentScript = applyVars(chosen.script);
  } else {
    agentScript = applyVars(agentScript);
  }
}

function initTemplateCategoryDropdown(){
  const dd = document.getElementById('templateCategory');
  dd.innerHTML = "";
  templateCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat.toUpperCase();
    dd.appendChild(opt);
  });
  dd.value = templateCategoryFilter || "ALL";
  const search = document.getElementById('templateSearch');
  search.value = templateSearchQuery || "";
}

function getFilteredTemplates(){
  const { templates } = getTemplatesFor(selectedRole);
  const cat = templateCategoryFilter || "ALL";
  const q = (templateSearchQuery || "").trim().toUpperCase();
  return templates.filter(tpl => {
    const catOk = (cat === "ALL") ? true : (String(tpl.category || "").toUpperCase() === cat);
    const text = `${tpl.title} ${tpl.category}`.toUpperCase();
    const qOk = q ? text.includes(q) : true;
    return catOk && qOk;
  });
}

async function initTemplateDropdown(){
  const templateSelect = document.getElementById('templateSelect');
  templateSelect.innerHTML = "";

  const { packName } = getTemplatesFor(selectedRole);
  const filtered = getFilteredTemplates();

  const tplTitles = filtered.map(x => x.title);
  const tplScripts = filtered.map(x => x.script);
  await i18n.ensureDynamicTranslations(window.APP_I18N.current, "template_titles", tplTitles);
  await i18n.ensureDynamicTranslations(window.APP_I18N.current, "template_scripts", tplScripts);

  if(!filtered.length){
    const opt = document.createElement('option');
    opt.value = "";
    opt.textContent = i18n.t("no_matching");
    templateSelect.appendChild(opt);
    return;
  }

  if(!selectedTemplateKey || !filtered.find(x => x.key === selectedTemplateKey)){
    selectedTemplateKey = filtered[0].key;
    agentScript = applyVars(filtered[0].script);
  }

  filtered.forEach(tpl => {
    const opt = document.createElement('option');
    opt.value = tpl.key;
    const shownTitle = dt("template_titles", tpl.title, tpl.title);
    opt.textContent = `${shownTitle} — ${tpl.category} — ${packName}`.toUpperCase();
    templateSelect.appendChild(opt);
  });

  templateSelect.value = selectedTemplateKey;
}

window.onTemplateCategoryChange = function(cat){ templateCategoryFilter = cat; initTemplateDropdown(); };
window.onTemplateSearchChange = function(q){ templateSearchQuery = q || ""; initTemplateDropdown(); };
window.onTemplateChange = function(key){
  const filtered = getFilteredTemplates();
  const chosen = filtered.find(x => x.key === key);
  if(!chosen) return;
  selectedTemplateKey = key;
  const shownScript = dt("template_scripts", chosen.script, chosen.script);
  agentScript = applyVars(shownScript);
};

window.resetTemplate = function(){
  const filtered = getFilteredTemplates();
  const chosen = filtered.find(x => x.key === selectedTemplateKey) || filtered[0];
  if(!chosen) return;
  const shownScript = dt("template_scripts", chosen.script, chosen.script);
  agentScript = applyVars(shownScript);
};

function initVoiceDropdown(){
  const voiceSelect = document.getElementById('voiceSelect');
  if(!voiceSelect) return;
  voiceSelect.innerHTML = "";
  vapiVoices.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.id;
    opt.textContent = v.label.toUpperCase();
    voiceSelect.appendChild(opt);
  });
  voiceSelect.value = selectedVoiceId;
}
window.onVoiceChange = function(id){ selectedVoiceId = id; };

// ============================
// Community (local storage)
// ============================
let communityTab = "NEWSLETTER";
const LS_FORUM = "aicallport_forum_posts";
const LS_NEWSLETTER = "aicallport_newsletter_signups";

function loadForumPosts(){ try { return JSON.parse(localStorage.getItem(LS_FORUM) || "[]"); } catch { return []; } }
function saveForumPosts(posts){ localStorage.setItem(LS_FORUM, JSON.stringify(posts || [])); }
function loadNewsletter(){ try { return JSON.parse(localStorage.getItem(LS_NEWSLETTER) || "[]"); } catch { return []; } }
function saveNewsletter(list){ localStorage.setItem(LS_NEWSLETTER, JSON.stringify(list || [])); }

function cryptoRandomId(){
  try {
    const a = crypto.getRandomValues(new Uint8Array(10));
    return Array.from(a).map(x => x.toString(16).padStart(2,"0")).join("");
  } catch {
    return String(Date.now()) + "_" + Math.random().toString(16).slice(2);
  }
}

function maskEmail(email){
  return String(email || "").replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => a + "*".repeat(Math.min(8, b.length)) + c);
}

window.submitNewsletter = async function(){
  const email = document.getElementById("nlEmail")?.value || "";
  const name = document.getElementById("nlName")?.value || "";
  const note = document.getElementById("nlNote")?.value || "";
  if(!email.includes("@")){
    document.getElementById("nlEmail").style.borderColor = "red";
    return;
  }
  const payload = { email, name, note, market: selectedMarket, industryKey: selectedIndustryKey, deployed: isDeployed() };

  const list = loadNewsletter();
  list.unshift({ ...payload, email: maskEmail(email), ts: Date.now() });
  saveNewsletter(list);

  try {
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (e) {}

  const msg = document.getElementById("nlMsg");
  if(msg) msg.innerHTML = `<div class="text-orange-500 font-black uppercase text-[10px] tracking-widest">${escapeHtml(i18n.t("subscribed"))}</div>`;
  setTimeout(() => { renderCommunity(); }, 700);
};

window.addForumPost = function(){
  const title = (document.getElementById("fpTitle")?.value || "").trim();
  const body = (document.getElementById("fpBody")?.value || "").trim();
  if(title.length < 3 || body.length < 10) return;

  const posts = loadForumPosts();
  posts.unshift({ id: cryptoRandomId(), title, body, replies: [], ts: Date.now() });
  saveForumPosts(posts);
  renderCommunity();
};

window.addForumReply = function(postId){
  const input = document.getElementById("reply_" + postId);
  const text = (input?.value || "").trim();
  if(text.length < 3) return;

  const posts = loadForumPosts();
  const p = posts.find(x => x.id === postId);
  if(!p) return;
  p.replies.push({ text, ts: Date.now() });
  saveForumPosts(posts);
  renderCommunity();
};

window.askAiQuestion = async function(){
  const q = (document.getElementById("qaQuestion")?.value || "").trim();
  if(q.length < 5) return;

  const out = document.getElementById("qaAnswer");
  out.innerHTML = `<div class="text-slate-500 font-black uppercase text-[10px] tracking-widest">${escapeHtml(i18n.t("thinking"))}</div>`;

  try{
    const res = await fetch("/api/ai-qa", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        question: q,
        context: { market: selectedMarket, industryKey: selectedIndustryKey, role: selectedRole, deployed: isDeployed() }
      })
    });
    if(!res.ok) throw new Error("Bad response");
    const data = await res.json();
    const answer = data?.answer || data?.text || "No answer returned.";
    out.innerHTML = `<div class="mini text-orange-500 mb-2">${escapeHtml(i18n.t("ai_qa"))}</div>
      <div class="text-[12px] text-slate-300 font-semibold leading-relaxed whitespace-pre-wrap">${escapeHtml(answer)}</div>`;
  } catch(e){
    out.innerHTML = `
      <div class="mini text-orange-500 mb-2">${escapeHtml(i18n.t("ai_qa"))}</div>
      <div class="text-[12px] text-slate-300 font-semibold leading-relaxed">
        ${escapeHtml(i18n.t("needs_backend"))}
        <div class="mt-2 bg-white/5 border border-white/10 rounded-2xl p-3 text-[11px] text-slate-300 font-semibold">
          POST <span class="text-orange-500">/api/ai-qa</span> → { answer: "..." }
        </div>
      </div>`;
  }
};

function renderNewsletterListHtml(){
  const list = loadNewsletter().slice(0, 8);
  if(!list.length) return `<div class="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center py-6">${escapeHtml(i18n.t("no_signups"))}</div>`;
  return list.map(x => `
    <div class="flex items-start justify-between gap-3 py-2 border-b border-white/5">
      <div>
        <div class="text-[10px] font-black uppercase tracking-wider text-white">${escapeHtml(x.email)}</div>
        <div class="text-[9px] font-black uppercase tracking-widest text-slate-500">${escapeHtml(x.name || "—")} • ${escapeHtml(x.market || "—")} • ${escapeHtml(x.industryKey || "—")}</div>
      </div>
      <div class="text-[9px] font-black uppercase tracking-widest ${x.deployed ? "text-green-400" : "text-slate-400"}">
        ${x.deployed ? "DEPLOYED" : "NO DEPLOY"}
      </div>
    </div>
  `).join("");
}

function renderForumHtml(){
  const posts = loadForumPosts().slice(0, 20);
  if(!posts.length) return `<div class="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center py-10">${escapeHtml(i18n.t("no_posts"))}</div>`;
  return posts.map(p => `
    <div class="bg-white/5 border border-white/10 rounded-2xl p-3 mb-3">
      <div class="text-[10px] font-black uppercase tracking-wider text-orange-500">${escapeHtml(p.title)}</div>
      <div class="text-[11px] text-slate-300 font-semibold leading-relaxed mt-1 whitespace-pre-wrap">${escapeHtml(p.body)}</div>
      <div class="divider mt-3">Replies</div>
      <div class="space-y-2">
        ${(p.replies||[]).slice(-3).map(r => `
          <div class="text-[11px] text-slate-300 font-semibold leading-relaxed bg-black/20 border border-white/5 rounded-xl p-2 whitespace-pre-wrap">${escapeHtml(r.text)}</div>
        `).join("") || `<div class="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center py-2">No replies yet</div>`}
      </div>
      <div class="grid grid-cols-4 gap-2 mt-3">
        <input id="reply_${p.id}" class="select-theme col-span-3" style="text-transform:none;letter-spacing:.06em" data-i18n-placeholder="write_reply" />
        <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic" type="button" onclick="addForumReply('${p.id}')">${escapeHtml(i18n.t("reply"))}</button>
      </div>
    </div>
  `).join("");
}

function setCommunityTab(tab){ communityTab = tab; renderCommunity(); }
window.setCommunityTab = setCommunityTab;

function renderCommunity(){
  const c = document.getElementById("mContent");
  const deployedBadge = isDeployed()
    ? `<span class="text-[9px] font-black uppercase tracking-widest text-green-400">${escapeHtml(i18n.t("deployed_yes"))}</span>`
    : `<span class="text-[9px] font-black uppercase tracking-widest text-slate-400">${escapeHtml(i18n.t("deployed_no"))}</span>`;

  c.innerHTML = `
    <div class="pill mb-3">${escapeHtml(i18n.t("community_portal"))}</div>
    <div class="flex items-center justify-between mb-2">
      <div class="text-[10px] font-black uppercase tracking-widest text-slate-400">${escapeHtml(i18n.t("newsletter"))} • ${escapeHtml(i18n.t("forum"))} • ${escapeHtml(i18n.t("ai_qa"))}</div>
      ${deployedBadge}
    </div>

    <div class="tabbar">
      <div class="tab ${communityTab==="NEWSLETTER"?"active":""}" onclick="setCommunityTab('NEWSLETTER')">${escapeHtml(i18n.t("newsletter"))}</div>
      <div class="tab ${communityTab==="FORUM"?"active":""}" onclick="setCommunityTab('FORUM')">${escapeHtml(i18n.t("forum"))}</div>
      <div class="tab ${communityTab==="QA"?"active":""}" onclick="setCommunityTab('QA')">${escapeHtml(i18n.t("ai_qa"))}</div>
    </div>

    <div id="communityBody"></div>
  `;

  const body = document.getElementById("communityBody");

  if(communityTab === "NEWSLETTER"){
    body.innerHTML = `
      <div class="card-theme text-left">
        <div class="mini text-orange-500 mb-2">${escapeHtml(i18n.t("newsletter"))}</div>
        <div class="grid sm:grid-cols-2 gap-2 mt-3">
          <input id="nlName" class="select-theme" style="text-transform:none;letter-spacing:.06em" data-i18n-placeholder="name_optional" />
          <input id="nlEmail" class="select-theme" style="text-transform:none;letter-spacing:.06em" data-i18n-placeholder="email" />
        </div>
        <textarea id="nlNote" class="textarea-theme mt-2" style="min-height:110px" data-i18n-placeholder="tell_us_updates"></textarea>
        <div id="nlMsg" class="mt-2"></div>
        <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic mt-3" type="button" onclick="submitNewsletter()">
          ${escapeHtml(i18n.t("join_list"))}
        </button>

        <div class="divider mt-4">Recent Signups (Local)</div>
        <div class="mt-2 bg-white/5 border border-white/10 rounded-2xl p-3 max-h-[160px] overflow-auto">
          ${renderNewsletterListHtml()}
        </div>
      </div>
    `;
  }

  if(communityTab === "FORUM"){
    body.innerHTML = `
      <div class="grid lg:grid-cols-2 gap-4 text-left">
        <div class="card-theme">
          <div class="mini text-orange-500 mb-2">${escapeHtml(i18n.t("forum"))}</div>
          <input id="fpTitle" class="select-theme" style="text-transform:none;letter-spacing:.06em" data-i18n-placeholder="title" />
          <textarea id="fpBody" class="textarea-theme mt-2" data-i18n-placeholder="write_question"></textarea>
          <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic mt-3" type="button" onclick="addForumPost()">
            ${escapeHtml(i18n.t("post"))}
          </button>
        </div>

        <div class="card-theme">
          <div class="mini text-orange-500 mb-2">${escapeHtml(i18n.t("forum_threads"))}</div>
          <div class="max-h-[420px] overflow-auto pr-1">
            ${renderForumHtml()}
          </div>
        </div>
      </div>
    `;
  }

  if(communityTab === "QA"){
    body.innerHTML = `
      <div class="card-theme text-left">
        <div class="mini text-orange-500 mb-2">${escapeHtml(i18n.t("ai_qa"))}</div>
        <textarea id="qaQuestion" class="textarea-theme mt-2" style="min-height:110px" data-i18n-placeholder="ask_question"></textarea>
        <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic mt-3" type="button" onclick="askAiQuestion()">
          ${escapeHtml(i18n.t("ask_ai"))}
        </button>
        <div id="qaAnswer" class="mt-4"></div>
      </div>
    `;
  }

  i18n.applyTranslations(document.getElementById("setupModal"));
}

function openCommunity(tab){
  communityTab = tab || "NEWSLETTER";
  triggerModal("community");
}

// ============================
// Modal + Flow + Steps (market/industry/business/role/demo/deploy)
// ============================
let lastModalStep = null;
let lastFocusedEl = null;
let __scrollY = 0;
let __bodyLocked = false;

function lockBodyScroll(){
  if (__bodyLocked) return;
  __bodyLocked = true;
  __scrollY = window.scrollY || 0;
  document.body.style.position = "fixed";
  document.body.style.top = `-${__scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}
function unlockBodyScroll(){
  if (!__bodyLocked) return;
  __bodyLocked = false;
  const top = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  const y = top ? Math.abs(parseInt(top, 10)) : __scrollY;
  window.scrollTo(0, y || 0);
}

function createBtn(txt, fn){
  const b = document.createElement('button');
  b.type = "button";
  b.className = "modal-btn";
  b.innerText = txt;
  b.onclick = fn;
  return b;
}

function trapFocusInModal(){
  const modal = document.getElementById("setupModal");
  const shell = document.getElementById("modalShell");
  if(!modal || !shell) return;

  const selectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const focusables = () => Array.from(shell.querySelectorAll(selectors))
    .filter(el => el.offsetParent !== null);

  function onKeydown(e){
    if(modal.style.display !== "flex") return;
    if(e.key !== "Tab") return;

    const items = focusables();
    if(!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if(e.shiftKey && document.activeElement === first){
      e.preventDefault(); last.focus(); return;
    }
    if(!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus(); return;
    }
  }

  if(!window.__aicallport_modalTrapBound){
    window.__aicallport_modalTrapBound = true;
    document.addEventListener("keydown", onKeydown, true);
  }
}

function closeModal(){
  const modal = document.getElementById('setupModal');
  if (modal.style.display !== "flex") {
    unlockBodyScroll();
    return;
  }
  modal.style.display = 'none';
  unlockBodyScroll();
  try { lastFocusedEl?.focus?.(); } catch(e){}
  lastFocusedEl = null;
}
window.closeModal = closeModal;

async function triggerModal(step){
  lastModalStep = step;
  lastFocusedEl = document.activeElement;

  const m = document.getElementById('setupModal');
  const c = document.getElementById('mContent');
  const s = document.getElementById('modalSearchContainer');
  const tEl = document.getElementById('mTitle');
  const shell = document.getElementById('modalShell');

  shell.classList.remove('role-wide','info-wide','community-wide','script-wide','benefits-wide');
  m.style.display = 'flex';
  lockBodyScroll();

  c.innerHTML = "";
  s.innerHTML = "";

  trapFocusInModal();

  if(step === "info"){
    shell.classList.add('info-wide');
    tEl.innerText = i18n.t("activation_steps_info");
    renderInfoSlide();
    return;
  }

  if(step === "community"){
    shell.classList.add('community-wide');
    tEl.innerText = i18n.t("community");
    renderCommunity();
    return;
  }

  if(step === "benefits"){
    shell.classList.add('benefits-wide');
    tEl.innerText = i18n.t("smb_benefits");
    renderBenefits();
    setTimeout(() => document.getElementById("benefitsListWrap")?.focus(), 30);
    return;
  }

  if(step === 1){
    tEl.innerText = i18n.t("step_01");
    s.innerHTML = `<input type="text" class="search-box" data-i18n-placeholder="search_countries" onkeyup="filterMarket(this.value)">`;
    renderMarketByContinent("");
    i18n.applyTranslations(document.getElementById("setupModal"));
    return;
  }

  if(step === 2){
    tEl.innerText = i18n.t("step_02");
    s.innerHTML = `<input type="text" class="search-box" data-i18n-placeholder="search_industries" onkeyup="filterIndustryCategories(this.value)">`;
    await i18n.ensureDynamicTranslations(window.APP_I18N.current, "industries", industryKeys);
    renderIndustryCategoryList("");
    i18n.applyTranslations(document.getElementById("setupModal"));
    return;
  }

  if(step === 3){
    tEl.innerText = i18n.t("step_03");
    c.innerHTML = `
      <input id="bn" data-i18n-placeholder="business_name" class="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white mb-2 text-center text-xs uppercase font-black outline-none">
      <button type="button" onclick="saveB()" class="orange-btn w-full py-3 rounded-xl font-black text-[10px]">${escapeHtml(i18n.t("save"))}</button>
    `;
    i18n.applyTranslations(document.getElementById("setupModal"));
    return;
  }

  if(step === 4){
    shell.classList.add('role-wide');
    tEl.innerText = i18n.t("step_04");

    c.innerHTML = `
      <div class="pill mb-4">${escapeHtml(i18n.t("role_templates_voice"))}</div>

      <div class="grid lg:grid-cols-3 gap-4 text-left">
        <div class="card-theme">
          <div class="muted-hint mb-3">${escapeHtml(i18n.t("agent_role"))}</div>
          <div id="roleList" class="grid gap-2"></div>

          <div class="divider mt-4">Role Description</div>
          <div id="roleDesc" class="text-[12px] text-slate-300 font-semibold leading-relaxed"></div>

          <div class="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
            Current Industry: <span class="text-orange-500">${escapeHtml(getCurrentIndustryKey())}</span>
          </div>
        </div>

        <div class="card-theme">
          <div class="muted-hint mb-3">${escapeHtml(i18n.t("templates"))}</div>

          <div class="grid grid-cols-2 gap-2 mb-2">
            <select id="templateCategory" class="select-theme" onchange="onTemplateCategoryChange(this.value)"></select>
            <input id="templateSearch" class="search-box" style="margin:0" data-i18n-placeholder="search_templates" oninput="onTemplateSearchChange(this.value)" />
          </div>

          <select id="templateSelect" class="select-theme" onchange="onTemplateChange(this.value)"></select>

          <div class="mt-3 muted-hint" data-i18n="editable_script">${escapeHtml(i18n.t("editable_script"))}</div>
          <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic mt-2"
            type="button" onclick="openScriptEditor()" data-i18n="editable_script_btn">
            ${escapeHtml(i18n.t("editable_script_btn"))}
          </button>

          <div class="grid grid-cols-2 gap-2 mt-3">
            <button class="modal-btn justify-center text-center" type="button" onclick="resetTemplate()">${escapeHtml(i18n.t("reset_template"))}</button>
            <button class="modal-btn justify-center text-center" type="button" onclick="closeModal()">${escapeHtml(i18n.t("save"))}</button>
          </div>
        </div>

        <div class="card-theme">
          <div class="muted-hint mb-3" data-i18n="voice">${escapeHtml(i18n.t("voice"))}</div>
          <select id="voiceSelect" class="select-theme" onchange="onVoiceChange(this.value)"></select>
          <div class="grid grid-cols-2 gap-2 mt-3">
            <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic" type="button" onclick="previewVoice()">${escapeHtml(i18n.t("preview_voice"))}</button>
            <button class="modal-btn justify-center text-center" type="button" onclick="closeModal()">${escapeHtml(i18n.t("save"))}</button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="grid sm:grid-cols-2 gap-2">
          <button class="modal-btn justify-center text-center" type="button" onclick="closeModal()">${escapeHtml(i18n.t("close"))}</button>
          <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic" type="button" onclick="finish(4, selectedRole)">
            ${escapeHtml(i18n.t("confirm_role_template_voice"))}
          </button>
        </div>
      </div>
    `;

    const roleList = document.getElementById('roleList');
    roleList.innerHTML = "";
    const roles = [
      { key:"receptionist", value:"Receptionist" },
      { key:"sales_agent", value:"Sales Agent" },
      { key:"support_agent", value:"Support Agent" }
    ];

    roles.forEach(r => {
      const label = i18n.t(r.key);
      const b = createBtn(label, () => {
        selectedRole = r.value;
        templateCategoryFilter = "ALL";
        templateSearchQuery = "";
        refreshTemplatesForCurrentSelection(true);
        triggerModal(4);
      });
      b.style.fontSize = "10px";
      b.style.padding = "14px";
      b.innerHTML = `${escapeHtml(label)}${selectedRole === r.value ? " ✓" : ""}`;
      roleList.appendChild(b);
    });

    const roleDesc = document.getElementById("roleDesc");
    roleDesc.textContent = i18n.t(getRoleHelpKey(selectedRole));

    initTemplateCategoryDropdown();
    await initTemplateDropdown();
    initVoiceDropdown();
    i18n.applyTranslations(document.getElementById("setupModal"));
    return;
  }

  if(step === 5){
    tEl.innerText = i18n.t("step_05");
    c.innerHTML = "";
    c.appendChild(createBtn(i18n.t("demo_call"), runVoice));
    return;
  }

  if(step === 6){
    tEl.innerText = i18n.t("step_06");
    c.innerHTML = "";
    c.appendChild(createBtn(i18n.t("deploy_get_number"), () => {
      confetti();
      setDeployed(true);
      finish(6, "READY");
      setTimeout(() => {
        window.location.href = "https://buy.stripe.com/8x24gA9TB9Vab160h43ks01";
      }, 900);
    }));
    return;
  }
}

function getRoleHelpKey(roleValue){
  if(roleValue === "Receptionist") return "role_help_receptionist";
  if(roleValue === "Sales Agent") return "role_help_sales";
  if(roleValue === "Support Agent") return "role_help_support";
  return "role_help_receptionist";
}

// ============================
// Script Editor (kept)
// ============================
let scriptEditorDraft = null;

window.openScriptEditor = function(){
  if(!agentScript || agentScript.trim().length < 10){
    try { window.resetTemplate(); } catch(e) {}
  }
  scriptEditorDraft = agentScript || "";

  const m = document.getElementById("setupModal");
  const c = document.getElementById("mContent");
  const s = document.getElementById("modalSearchContainer");
  const tEl = document.getElementById("mTitle");
  const shell = document.getElementById("modalShell");

  shell.classList.remove("role-wide","info-wide","community-wide","benefits-wide");
  shell.classList.add("script-wide");

  m.style.display = "flex";
  lockBodyScroll();

  s.innerHTML = "";
  tEl.innerText = i18n.t("script_editor_title");

  const businessName = (document.getElementById("v3")?.innerText || "").trim() || "YOUR BUSINESS";
  const industry = (selectedIndustryKey || "GLOBAL");
  const market = (selectedMarket || "YOUR MARKET");
  const roleHelp = i18n.t(getRoleHelpKey(selectedRole));

  c.innerHTML = `
    <div class="script-editor-wrap">
      <div class="script-editor-header">
        <div class="text-left">
          <div class="pill mb-2">${escapeHtml(i18n.t("script_editor_title"))}</div>
          <div class="muted-hint">${escapeHtml(i18n.t("script_editor_help"))}</div>
        </div>
        <div class="script-badges">
          <div class="badge">${escapeHtml(market)}</div>
          <div class="badge">${escapeHtml(industry)}</div>
          <div class="badge">${escapeHtml(businessName)}</div>
          <div class="badge">${escapeHtml(selectedRole)}</div>
        </div>
      </div>

      <div class="card-theme text-left">
        <div class="mini text-orange-500 mb-2">Role Behavior</div>
        <div class="text-[12px] text-slate-300 font-semibold leading-relaxed">${escapeHtml(roleHelp)}</div>
        <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">
          Variables: <span class="text-orange-500">{{BUSINESS_NAME}}</span>, <span class="text-orange-500">{{MARKET}}</span>
        </div>
      </div>

      <textarea id="scriptEditorBox" class="script-textarea" oninput="onScriptEditorInput()"></textarea>

      <div class="modal-footer">
        <div class="grid sm:grid-cols-3 gap-2">
          <button class="modal-btn justify-center text-center" type="button" onclick="scriptEditorResetToTemplate()">${escapeHtml(i18n.t("reset_to_template"))}</button>
          <button class="orange-btn w-full py-3 rounded-xl font-black text-[10px] uppercase italic" type="button" onclick="scriptEditorSave()">${escapeHtml(i18n.t("save_script"))}</button>
          <button class="modal-btn justify-center text-center" type="button" onclick="scriptEditorBackToRoleModal()">${escapeHtml(i18n.t("close_editor"))}</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("scriptEditorBox").value = scriptEditorDraft;
  i18n.applyTranslations(document.getElementById("setupModal"));
};

window.onScriptEditorInput = function(){
  scriptEditorDraft = document.getElementById("scriptEditorBox").value;
};

window.scriptEditorResetToTemplate = function(){
  const filtered = getFilteredTemplates();
  const chosen = filtered.find(x => x.key === selectedTemplateKey) || filtered[0];
  if(!chosen) return;
  const shownScript = dt("template_scripts", chosen.script, chosen.script);
  scriptEditorDraft = applyVars(shownScript);
  document.getElementById("scriptEditorBox").value = scriptEditorDraft;
};

window.scriptEditorSave = function(){
  agentScript = applyVars(String(scriptEditorDraft || ""));
  window.scriptEditorBackToRoleModal();
};

window.scriptEditorBackToRoleModal = function(){
  document.getElementById("modalShell").classList.remove("script-wide");
  triggerModal(4);
};

// ============================
// Step 1: Markets via /api/markets
// ============================
let _marketsByContinentCache = null;

async function getMarketsGroupedByContinent() {
  if (_marketsByContinentCache) return _marketsByContinentCache;

  const res = await fetch("/api/markets", { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to load /api/markets:", res.status);
    _marketsByContinentCache = {};
    return _marketsByContinentCache;
  }

  const rows = await res.json();
  const grouped = {};

  (rows || []).forEach((row) => {
    const continent = row.region || "Other";
    const name = row.name || "";
    if (!name) return;
    if (!grouped[continent]) grouped[continent] = [];
    grouped[continent].push(name);
  });

  Object.keys(grouped).forEach((k) => {
    grouped[k].sort((a, b) => String(a).localeCompare(String(b)));
  });

  _marketsByContinentCache = grouped;
  return grouped;
}

async function renderMarketByContinent(searchQuery){
  const c = document.getElementById('mContent');
  c.innerHTML = "";
  const q = (searchQuery || "").trim().toUpperCase();

  const marketsByContinent = await getMarketsGroupedByContinent();

  Object.keys(marketsByContinent).forEach(continent => {
    const list = (marketsByContinent[continent] || []).slice().sort((a,b) => a.localeCompare(b));
    const filtered = list.filter(name => name.toUpperCase().includes(q));
    if(!filtered.length) return;

    const div = document.createElement('div');
    div.className = "divider";
    div.innerText = continent.toUpperCase();
    c.appendChild(div);

    filtered.forEach(name => {
      const btn = createBtn(name, async () => {
        selectedMarket = name;
        await updatePricingUIForMarket(name);
        finish(1, name);
      });
      btn.setAttribute('data-n', name);
      btn.innerHTML = `<div class="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div> ${escapeHtml(name)}`;
      c.appendChild(btn);
    });
  });

  if(!c.children.length){
    const hint = document.createElement('div');
    hint.className = "text-[10px] font-black uppercase tracking-widest text-slate-500 text-center py-10";
    hint.innerText = "No markets available yet. (Backend countries endpoint not connected)";
    c.appendChild(hint);
  }
}
window.filterMarket = function(query){ renderMarketByContinent(query); };

// Step 2: Industries
function renderIndustryCategoryList(searchQuery){
  const c = document.getElementById('mContent');
  c.innerHTML = "";
  const q = (searchQuery || "").trim().toUpperCase();

  const groups = buildCategorizedIndustryList();
  groups.forEach(g => {
    const filtered = g.items.filter(name => {
      const shown = dt("industries", name, name);
      return shown.toUpperCase().includes(q) || name.toUpperCase().includes(q);
    });
    if(!filtered.length) return;

    const div = document.createElement('div');
    div.className = "divider";
    div.innerText = g.cat.toUpperCase();
    c.appendChild(div);

    filtered.forEach(name => {
      const shown = dt("industries", name, name);
      const btn = createBtn(shown, () => {
        selectedIndustryKey = name;
        finish(2, shown);
        refreshTemplatesForCurrentSelection(true);
      });
      btn.setAttribute('data-n', shown);
      c.appendChild(btn);
    });
  });

  if(!c.children.length){
    const hint = document.createElement('div');
    hint.className = "text-[10px] font-black uppercase tracking-widest text-slate-500 text-center py-10";
    hint.innerText = i18n.t("no_matching");
    c.appendChild(hint);
  }
}
window.filterIndustryCategories = function(query){ renderIndustryCategoryList(query); };

// ============================
// Actions + Step locks
// ============================
function refreshStepLocks(){
  for(let i=1;i<=6;i++){
    const el = document.getElementById(`s${i}`);
    if(!el) continue;
    const unlocked = completedSteps >= i-1;
    el.classList.toggle("locked", !unlocked);
  }
}

function handleStep(s){
  if (s === 1 || completedSteps >= s - 1) triggerModal(s);
}
window.handleStep = handleStep;

function finish(s, v){
  completedSteps = Math.max(completedSteps, s);
  const valEl = document.getElementById(`v${s}`);
  if(valEl) valEl.innerText = v;

  document.getElementById(`s${s}`)?.classList.add('active');
  closeModal();

  for(let i=1;i<=6;i++){
    document.getElementById(`s${i}`)?.classList.remove("next-focus");
  }
  if(s < 6) document.getElementById(`s${s + 1}`)?.classList.add('next-focus');

  refreshStepLocks();

  // ✅ keep agents panel synced
  try { renderAgentsPanel(document.getElementById("agentsSearch")?.value || ""); } catch {}
}
window.finish = finish;

window.saveB = function(){
  const raw = (document.getElementById('bn').value || "");
  const v = raw.trim().slice(0, 60);
  if(v.length >= 2){
    finish(3, v);
    agentScript = applyVars(agentScript);
  }
};

// ============================
// Language menu UI
// ============================
function toggleLangMenu(force){
  const d = document.getElementById('langMenu');
  if(force === true) d.style.display = 'flex';
  else if(force === false) d.style.display = 'none';
  else d.style.display = (d.style.display === 'flex') ? 'none' : 'flex';
}
window.toggleLangMenu = toggleLangMenu;

function setLang(cc, langCode){
  document.getElementById('curFlag').src = `https://flagcdn.com/${cc}.svg`;
  document.getElementById('curLangText').innerText = `${cc.toUpperCase()} | ${langCode}`;
  i18n.setLanguage(langCode);
  toggleLangMenu(false);
}
window.setLang = setLang;

window.filterList = function(containerId, query){
  const q = (query || "").toUpperCase();
  document.querySelectorAll(`#${containerId} .modal-btn`).forEach(b => {
    const name = b.getAttribute('data-n') || b.innerText;
    b.style.display = name.toUpperCase().includes(q) ? 'flex' : 'none';
  });
};

function initLangList(){
  const list = document.getElementById('langList');
  list.innerHTML = "";
  languageList.forEach(l => {
    const b = createBtn(l.n, () => setLang(l.f, l.id));
    b.setAttribute('data-n', l.n);
    b.innerHTML = `<img src="https://flagcdn.com/${l.f}.svg" class="w-3" alt=""> <span>${escapeHtml(l.n)}</span>`;
    list.appendChild(b);
  });
  i18n.applyTranslations(document);
}

// ============================
// VAPI: Preview + Demo
// ============================
window.previewVoice = async function(){
  try{
    const industry = getCurrentIndustryKey();
    const assistantId = assistants[industry] || assistants["Electrical"] || Object.values(assistants)[0];

    await vapiStartCall(assistantId, {
      voice: getSelectedVapiVoice(),
      firstMessage: "Hi! This is a quick voice preview. How does this voice sound to you?"
    });

    closeModal();
  } catch(e){
    console.error(e);
    alert("Preview failed. Check console + /api/config.");
  }
};

async function runVoice(){
  try{
    const industry = getCurrentIndustryKey();
    const assistantId = assistants[industry] || assistants["Electrical"] || Object.values(assistants)[0];

    const businessName = document.getElementById('v3')?.innerText || "YOUR BUSINESS";
    const finalScript = applyVars(agentScript || "");

    await vapiStartCall(assistantId, {
      voice: getSelectedVapiVoice(),
      firstMessage: `Hi! Thank you for calling ${businessName}. How can I help you today?`,
      model: { provider: "openai", model: "gpt-4o-mini", messages: [{ role: "system", content: finalScript }] }
    });

    closeModal();
    finish(5, "ACTIVE");
  } catch(err){
    console.error(err);
    alert("Error starting demo call. Check console + /api/config.");
  }
}

// ============================
// ✅ Agents Right Panel
// ============================
const demoAgents = [
  { name: "Receptionist — Electrical", market: "United States", status: "ON" },
  { name: "Sales Agent — Plumbing", market: "Canada", status: "ON" },
  { name: "Support Agent — Legal", market: "United Kingdom", status: "OFF" },
  { name: "After Hours — HVAC", market: "Germany", status: "ON" }
];

function getAgentsData(){
  const current = {
    name: `${selectedRole || "Receptionist"} — ${selectedIndustryKey || "GLOBAL"}`,
    market: selectedMarket || "United States",
    status: isDeployed() ? "ON" : "OFF"
  };
  return [current, ...demoAgents];
}

function renderAgentsPanel(query){
  const q = (query || "").trim().toUpperCase();
  const listEl = document.getElementById("agentsList");
  const countEl = document.getElementById("agentsCountRight");
  if(!listEl || !countEl) return;

  const agents = getAgentsData().filter(a => {
    const hay = `${a.name} ${a.market} ${a.status}`.toUpperCase();
    return q ? hay.includes(q) : true;
  });

  countEl.textContent = String(agents.filter(a => a.status === "ON").length);

  listEl.innerHTML = agents.map(a => {
    const on = a.status === "ON";
    return `
      <div class="agent-row">
        <div style="min-width:0;">
          <div class="agent-name">${escapeHtml(a.name)}</div>
          <div class="agent-meta">${escapeHtml(a.market)}</div>
        </div>
        <div class="agent-pill ${on ? "" : "off"}">${on ? "ON" : "OFF"}</div>
      </div>
    `;
  }).join("");

  if(!agents.length){
    listEl.innerHTML = `<div class="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center py-8">NO MATCHING RESULTS</div>`;
  }
}

function wireAgentsPanel(){
  const search = document.getElementById("agentsSearch");
  if(search){
    search.addEventListener("input", () => renderAgentsPanel(search.value));
  }
  renderAgentsPanel("");
}

// ============================
// Timer + counter
// ============================
setInterval(() => {
  const now = new Date();
  const h = 23 - now.getHours(), m = 59 - now.getMinutes(), s = 59 - now.getSeconds();
  const t = document.getElementById('timer');
  if(t){
    t.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  if (Math.random() > 0.8) {
    const el = document.getElementById('agentCount');
    if(el){
      let count = parseInt(el.innerText.replace(',', ''), 10);
      el.innerText = (count + 1).toLocaleString();
    }
  }
}, 1000);

// ============================
// INIT
// ============================
function wireTopButtons(){
  document.getElementById("heroCta").addEventListener("click", () => handleStep(1));
  document.getElementById("sideCta").addEventListener("click", () => handleStep(1));
  document.getElementById("activationInfoBtn").addEventListener("click", openActivationInfo);
  document.getElementById("smbBenefitsBtn").addEventListener("click", openBenefits);

  document.getElementById("qaBtn").addEventListener("click", () => openCommunity("QA"));
  document.getElementById("forumBtn").addEventListener("click", () => openCommunity("FORUM"));
  document.getElementById("newsletterTopBtn").addEventListener("click", () => openCommunity("NEWSLETTER"));

  document.getElementById("s1").addEventListener("click", () => handleStep(1));
  document.getElementById("s2").addEventListener("click", () => handleStep(2));
  document.getElementById("s3").addEventListener("click", () => handleStep(3));
  document.getElementById("s4").addEventListener("click", () => handleStep(4));
  document.getElementById("s5").addEventListener("click", () => handleStep(5));
  document.getElementById("s6").addEventListener("click", () => handleStep(6));

  document.getElementById("mClose").addEventListener("click", closeModal);

  document.getElementById("setupModal").addEventListener("click", (e) => {
    if (e.target && e.target.id === "setupModal") closeModal();
  });

  document.getElementById("langTrigger").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLangMenu();
  });

  document.addEventListener("click", (e) => {
    const menu = document.getElementById("langMenu");
    const wrap = document.getElementById("langWrap");
    if(menu.style.display === "flex" && !wrap.contains(e.target)){
      toggleLangMenu(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      closeModal();
      toggleLangMenu(false);
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  initLangList();
  wireTopButtons();
  wireAgentsPanel();

  refreshTemplatesForCurrentSelection(true);
  const initTemplates = getTemplatesFor(selectedRole).templates;
  if(initTemplates[0]) selectedTemplateKey = initTemplates[0].key;

  await updatePricingUIForMarket("United States");

  if(isDeployed()){
    document.getElementById('v6').innerText = "READY";
    document.getElementById('s6').classList.add('active');
    completedSteps = Math.max(completedSteps, 6);
  }

  refreshStepLocks();
  i18n.applyTranslations(document);

  const initialBenefit = readBenefitsIdxFromHash();
  if (initialBenefit != null){
    activeBenefitIdx = initialBenefit;
    triggerModal("benefits");
  }
});
