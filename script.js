const $ = (id) => document.getElementById(id);

const state = {
  country: "",
  industry: "",
  service: "",
  bizName: "",
  email: "",
  forward: "",
  demoNumber: ""
};

function setYear(){
  const y = new Date().getFullYear();
  const el = $("year");
  if(el) el.textContent = y;
}

function scrollToSteps(){
  const el = document.querySelector("#how");
  if(el) el.scrollIntoView({ behavior: "smooth" });
}

function pickDemoNumber(){
  // V1 placeholder logic: choose a demo number label per country/industry.
  // Replace later with real Twilio numbers.
  const c = state.country || "USA";
  const i = state.industry || "Plumbing";

  // Human-readable placeholder — you can replace with real numbers later.
  // Example formats:
  const map = {
    "USA": "+1 (555) 010-1000",
    "Canada": "+1 (555) 010-2000",
    "UK": "+44 20 7946 1000",
    "Spain": "+34 91 000 1000",
    "France": "+33 1 84 00 10 00",
    "Mexico": "+52 55 0000 1000",
    "Chile": "+56 2 2000 1000"
  };

  const base = map[c] || "+1 (555) 010-1000";
  return `${base}  (${c} • ${i})`;
}

function validateSelections(){
  state.country = $("country").value.trim();
  state.industry = $("industry").value.trim();
  state.service = $("service").value.trim();

  if(!state.country || !state.industry || !state.service){
    return { ok:false, msg:"Please choose country, industry, and AI call service first." };
  }
  return { ok:true, msg:"" };
}

function onFormSubmit(e){
  e.preventDefault();

  const sel = validateSelections();
  const msg = $("formMsg");

  if(!sel.ok){
    msg.textContent = sel.msg;
    msg.style.color = "#b00020";
    return;
  }

  state.bizName = $("bizName").value.trim();
  state.email = $("email").value.trim();
  state.forward = $("forward").value.trim();

  if(!state.bizName || !state.email){
    msg.textContent = "Please enter your business name and email.";
    msg.style.color = "#b00020";
    return;
  }

  msg.textContent = "Saved. Now generate a demo number and make your demo call.";
  msg.style.color = "#173a75";
}

function onGenerateDemo(){
  const sel = validateSelections();
  const msg = $("activateMsg");

  if(!sel.ok){
    alert(sel.msg);
    return;
  }
  state.demoNumber = pickDemoNumber();
  $("demoNumber").textContent = state.demoNumber;

  if(msg){
    msg.textContent = "";
  }
}

function onActivate(){
  // This is a UI placeholder.
  // Later this button will route to Stripe/PayPal checkout and provision the agent.
  const sel = validateSelections();
  const msg = $("activateMsg");

  if(!sel.ok){
    msg.textContent = sel.msg;
    msg.style.color = "#ffdddd";
    return;
  }

  if(!state.bizName || !state.email){
    msg.textContent = "Please complete Step 4 (request form) first.";
    msg.style.color = "#ffdede";
    return;
  }

  if(!state.demoNumber){
    msg.textContent = "Please complete Step 5 (generate demo number and call) first.";
    msg.style.color = "#ffdede";
    return;
  }

  msg.textContent =
    "Activation is ready. Next step: connect this button to Stripe/PayPal checkout and provisioning. (UI is working.)";
  msg.style.color = "#d9ffe5";
}

function init(){
  setYear();

  $("scrollToSteps")?.addEventListener("click", scrollToSteps);
  $("requestForm")?.addEventListener("submit", onFormSubmit);
  $("generateDemo")?.addEventListener("click", onGenerateDemo);
  $("activateBtn")?.addEventListener("click", onActivate);
}

document.addEventListener("DOMContentLoaded", init);
