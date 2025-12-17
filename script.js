(function () {
const stepsEl = document.getElementById("steps");
const steps = Array.from(document.querySelectorAll(".step"));

const country = document.getElementById("country");
const status1 = document.getElementById("status1");

const chips = Array.from(document.querySelectorAll(".chip"));
const status2 = document.getElementById("status2");

const serviceRadios = Array.from(document.querySelectorAll('input[name="service"]'));
const status3 = document.getElementById("status3");

const bizName = document.getElementById("bizName");
const bizPhone = document.getElementById("bizPhone");
const bizDesc = document.getElementById("bizDesc");
const status4 = document.getElementById("status4");

const markDemo = document.getElementById("markDemo");
const status5 = document.getElementById("status5");

const agree = document.getElementById("agree");
const activateBtn = document.getElementById("activateBtn");
const activateMsg = document.getElementById("activateMsg");

const state = {
country: "",
industry: "",
service: "",
bizName: "",
bizPhone: "",
bizDesc: "",
demoDone: false,
agree: false,
};

// Accordion behavior
function openStep(n) {
steps.forEach((s) => {
const isTarget = Number(s.dataset.step) === n;
s.classList.toggle("isOpen", isTarget);
const btn = s.querySelector(".stepHead");
if (btn) btn.setAttribute("aria-expanded", String(isTarget));
});
}

steps.forEach((s) => {
const btn = s.querySelector(".stepHead");
btn?.addEventListener("click", () => {
const alreadyOpen = s.classList.contains("isOpen");
steps.forEach(x => {
x.classList.remove("isOpen");
x.querySelector(".stepHead")?.setAttribute("aria-expanded", "false");
});
if (!alreadyOpen) {
s.classList.add("isOpen");
btn.setAttribute("aria-expanded", "true");
}
});
});

// Helpers
function setStatus(el, good, text) {
el.textContent = text;
el.classList.toggle("good", good);
el.classList.toggle("bad", !good);
}

function validateStep4() {
const ok =
state.bizName.trim().length >= 2 &&
state.bizPhone.trim().length >= 7 &&
state.bizDesc.trim().length >= 10;
setStatus(status4, ok, ok ? "Completed" : "Not completed");
return ok;
}

function validateAll() {
const ok1 = !!state.country;
const ok2 = !!state.industry;
const ok3 = !!state.service;
const ok4 = validateStep4();
const ok5 = !!state.demoDone;

setStatus(status1, ok1, ok1 ? "Selected" : "Not selected");
setStatus(status2, ok2, ok2 ? `Selected: ${state.industry}` : "Not selected");
setStatus(status3, ok3, ok3 ? `Selected` : "Not selected");
setStatus(status5, ok5, ok5 ? "Completed" : "Not completed");

const canActivate = ok1 && ok2 && ok3 && ok4 && ok5 && state.agree;
activateBtn.disabled = !canActivate;

if (!canActivate) {
activateMsg.textContent = "Complete steps 1–5 and check the box to activate.";
} else {
activateMsg.textContent = "Ready to activate.";
}

// Auto-advance to next incomplete step (nice UX)
if (!ok1) return 1;
if (!ok2) return 2;
if (!ok3) return 3;
if (!ok4) return 4;
if (!ok5) return 5;
return 6;
}

// Step 1
country.addEventListener("change", () => {
state.country = country.value;
openStep(validateAll());
});

// Step 2
chips.forEach((btn) => {
btn.addEventListener("click", () => {
chips.forEach((b) => b.classList.remove("isActive"));
btn.classList.add("isActive");
state.industry = btn.dataset.industry || "";
openStep(validateAll());
});
});

// Step 3
serviceRadios.forEach((r) => {
r.addEventListener("change", () => {
state.service = r.value;
openStep(validateAll());
});
});

// Step 4
function syncBiz() {
state.bizName = bizName.value;
state.bizPhone = bizPhone.value;
state.bizDesc = bizDesc.value;
validateAll();
}
bizName.addEventListener("input", syncBiz);
bizPhone.addEventListener("input", syncBiz);
bizDesc.addEventListener("input", syncBiz);

// Step 5
markDemo.addEventListener("click", () => {
state.demoDone = true;
markDemo.textContent = "Demo call completed ✅";
markDemo.disabled = true;
openStep(validateAll());
});

// Step 6
agree.addEventListener("change", () => {
state.agree = agree.checked;
validateAll();
});

activateBtn.addEventListener("click", async () => {
// This is where you connect Stripe / your backend later.
activateBtn.disabled = true;
activateMsg.textContent = "Activating… (demo)";

// Simulate request
await new Promise((r) => setTimeout(r, 800));

activateMsg.textContent =
"✅ Activation demo complete. Next step: connect billing + backend API.";
});

// Start with Step 1 open
steps[0].classList.add("isOpen");
steps[0].querySelector(".stepHead")?.setAttribute("aria-expanded", "true");
validateAll();
})();
