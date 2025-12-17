const $ = (sel) => document.querySelector(sel);

const state = {
country: "",
industry: "",
service: "",
bizName: "",
bizPhone: "",
bizDesc: "",
demoDone: false
};

function load() {
try {
const saved = JSON.parse(localStorage.getItem("aicallport_state") || "{}");
Object.assign(state, saved);
} catch {}
}

function save() {
localStorage.setItem("aicallport_state", JSON.stringify(state));
}

function setStatus(id, ok, text) {
const el = $(id);
if (!el) return;
el.textContent = text;
el.classList.remove("good", "warn");
el.classList.add(ok ? "good" : "warn");
}

function updateStatuses() {
// Step 1
if (state.country) setStatus("#status1", true, "Status: Selected");
else setStatus("#status1", false, "Status: Not selected");

// Step 2
if (state.industry) setStatus("#status2", true, `Status: Selected (${state.industry})`);
else setStatus("#status2", false, "Status: Not selected");

// Step 3
if (state.service) setStatus("#status3", true, "Status: Selected");
else setStatus("#status3", false, "Status: Not selected");

// Step 4
const detailsOk = Boolean(state.bizName.trim() && state.bizPhone.trim() && state.bizDesc.trim());
if (detailsOk) setStatus("#status4", true, "Status: Completed");
else setStatus("#status4", false, "Status: Not completed");

// Step 5
if (state.demoDone) setStatus("#status5", true, "Status: Completed");
else setStatus("#status5", false, "Status: Not completed");

// Activation button
const allOk = Boolean(state.country && state.industry && state.service && detailsOk && state.demoDone);
const btn = $("#activateBtn");
const msg = $("#activateMsg");
btn.disabled = !allOk;
msg.textContent = allOk
? "Ready. Click Activate AI Agent."
: "Complete steps 1–5 to enable activation.";

// Visual selected states
// industry pills
document.querySelectorAll("[data-industry]").forEach((b) => {
b.classList.toggle("isOn", b.dataset.industry === state.industry);
});

// service card
$("#serviceBtn")?.classList.toggle("isOn", Boolean(state.service));
}

function goNextStep(currentStep) {
const current = document.querySelector(`details.step[data-step="${currentStep}"]`);
const next = document.querySelector(`details.step[data-step="${currentStep + 1}"]`);
if (current) current.open = false;
if (next) next.open = true;
next?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function wire() {
// Country
const country = $("#country");
if (country) {
country.value = state.country || "";
country.addEventListener("change", () => {
state.country = country.value;
save();
updateStatuses();
if (state.country) goNextStep(1);
});
}

// Industry
document.querySelectorAll("[data-industry]").forEach((btn) => {
btn.addEventListener("click", () => {
state.industry = btn.dataset.industry;
save();
updateStatuses();
goNextStep(2);
});
});

// Service
$("#serviceBtn")?.addEventListener("click", () => {
state.service = "AI Inbound Receptionist";
save();
updateStatuses();
goNextStep(3);
});

// Business details
const name = $("#bizName");
const phone = $("#bizPhone");
const desc = $("#bizDesc");

if (name) name.value = state.bizName || "";
if (phone) phone.value = state.bizPhone || "";
if (desc) desc.value = state.bizDesc || "";

[name, phone, desc].forEach((el) => {
if (!el) return;
el.addEventListener("input", () => {
state.bizName = name?.value || "";
state.bizPhone = phone?.value || "";
state.bizDesc = desc?.value || "";
save();
updateStatuses();
});
el.addEventListener("blur", () => {
const detailsOk = Boolean(state.bizName.trim() && state.bizPhone.trim() && state.bizDesc.trim());
if (detailsOk) goNextStep(4);
});
});

// Demo done
$("#demoDone")?.addEventListener("click", () => {
state.demoDone = true;
save();
updateStatuses();
goNextStep(5);
});

// Activate
$("#activateBtn")?.addEventListener("click", () => {
// This is where you will later connect Stripe / backend / provisioning.
alert("Activated! (Demo) Next step: connect billing + provision phone agent.");
});

// Footer links (placeholders)
["loginLink", "supportLink", "billingLink", "termsLink", "privacyLink"].forEach((id) => {
const a = document.getElementById(id);
if (a) a.addEventListener("click", (e) => {
e.preventDefault();
alert("Placeholder link. We can connect real pages next.");
});
});
}

load();
wire();
updateStatuses();
