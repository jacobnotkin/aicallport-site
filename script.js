(function () {
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const state = {
country: "",
industry: "",
service: "",
bizName: "",
bizPhone: "",
bizDesc: "",
demoDone: false,
agreed: false
};

// Accordion
const cards = $$(".stepCard");
cards.forEach((card) => {
const head = card.querySelector(".stepHead");
const body = card.querySelector(".stepBody");

// default open step 1 (already open in HTML)
if (body.classList.contains("open")) card.dataset.open = "true";
else card.dataset.open = "false";

head.addEventListener("click", () => {
const isOpen = card.dataset.open === "true";
cards.forEach((c) => {
c.dataset.open = "false";
c.querySelector(".stepHead").setAttribute("aria-expanded", "false");
c.querySelector(".stepBody").classList.remove("open");
});

if (!isOpen) {
card.dataset.open = "true";
head.setAttribute("aria-expanded", "true");
body.classList.add("open");
}
});
});

// Step 1: country
const countrySelect = $("#countrySelect");
const step1Status = $("#step1Status");
countrySelect.addEventListener("change", () => {
state.country = countrySelect.value;
step1Status.textContent = `Selected: ${countrySelect.options[countrySelect.selectedIndex].text}`;
refresh();
autoAdvance(2);
});

// Step 2: industry
const chips = $$(".chip");
const step2Status = $("#step2Status");
chips.forEach((btn) => {
btn.setAttribute("aria-pressed", "false");
btn.addEventListener("click", () => {
chips.forEach((b) => b.setAttribute("aria-pressed", "false"));
btn.setAttribute("aria-pressed", "true");
state.industry = btn.dataset.industry || "";
step2Status.textContent = `Selected: ${state.industry}`;
refresh();
autoAdvance(3);
});
});

// Step 3: service (single button for now)
const serviceBtn = $(".serviceBtn");
const step3Status = $("#step3Status");
serviceBtn.addEventListener("click", () => {
serviceBtn.classList.toggle("selected");
state.service = serviceBtn.classList.contains("selected")
? serviceBtn.dataset.service
: "";
step3Status.textContent = state.service ? `Selected: ${state.service}` : "Not selected";
refresh();
if (state.service) autoAdvance(4);
});

// Step 4: business details
const bizName = $("#bizName");
const bizPhone = $("#bizPhone");
const bizDesc = $("#bizDesc");
const step4Status = $("#step4Status");

function updateBiz() {
state.bizName = bizName.value.trim();
state.bizPhone = bizPhone.value.trim();
state.bizDesc = bizDesc.value.trim();

const ok = isStep4Complete();
step4Status.textContent = ok ? "Completed" : "Not completed";
refresh();
if (ok) autoAdvance(5);
}

[bizName, bizPhone, bizDesc].forEach((el) => {
el.addEventListener("input", updateBiz);
el.addEventListener("blur", updateBiz);
});

// Step 5: demo
const demoDone = $("#demoDone");
const step5Status = $("#step5Status");
demoDone.addEventListener("click", () => {
state.demoDone = !state.demoDone;
demoDone.classList.toggle("done", state.demoDone);
demoDone.textContent = state.demoDone ? "Demo call completed ✓" : "Mark demo call completed";
step5Status.textContent = state.demoDone ? "Completed" : "Not completed";
refresh();
if (state.demoDone) autoAdvance(6);
});

// Step 6: activation
const agree = $("#agree");
const activateBtn = $("#activateBtn");
const activateMsg = $("#activateMsg");

agree.addEventListener("change", () => {
state.agreed = agree.checked;
refresh();
});

activateBtn.addEventListener("click", () => {
// Final validation
const missing = missingSteps();
if (missing.length) {
activateMsg.textContent = `Please complete: ${missing.join(", ")}.`;
activateMsg.classList.remove("ok");
return;
}
activateMsg.textContent =
"Activation request prepared ✅ (Demo only). Connect this button to your backend/payment to go live.";
activateMsg.classList.add("ok");
});

function isStep4Complete() {
return state.bizName.length >= 2 && state.bizPhone.length >= 7 && state.bizDesc.length >= 5;
}

function missingSteps() {
const miss = [];
if (!state.country) miss.push("Step 1");
if (!state.industry) miss.push("Step 2");
if (!state.service) miss.push("Step 3");
if (!isStep4Complete()) miss.push("Step 4");
if (!state.demoDone) miss.push("Step 5");
if (!state.agreed) miss.push("checkbox");
return miss;
}

function refresh() {
const ready =
!!state.country &&
!!state.industry &&
!!state.service &&
isStep4Complete() &&
state.demoDone &&
state.agreed;

activateBtn.disabled = !ready;

if (!ready) {
const miss = missingSteps();
activateMsg.textContent = miss.length
? `To activate, complete: ${miss.join(", ")}.`
: "";
activateMsg.classList.remove("ok");
} else {
activateMsg.textContent = "Ready to activate.";
activateMsg.classList.add("ok");
}
}

function autoAdvance(stepNumber) {
const target = document.querySelector(`.stepCard[data-step="${stepNumber}"]`);
if (!target) return;
const head = target.querySelector(".stepHead");
head.click();
target.scrollIntoView({ behavior: "smooth", block: "center" });
}

refresh();
})();
