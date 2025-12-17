// Accordion
document.querySelectorAll("[data-acc]").forEach(btn => {
btn.addEventListener("click", () => {
const id = btn.getAttribute("data-acc");
const body = document.getElementById(id);
body.classList.toggle("open");
});
});

// Industry chips
let selectedIndustry = "";
document.querySelectorAll(".chip").forEach(chip => {
chip.addEventListener("click", () => {
document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
chip.classList.add("active");
selectedIndustry = chip.getAttribute("data-chip");
updateActivate();
});
});

const country = document.getElementById("country");
const service = document.getElementById("service");
const bizName = document.getElementById("bizName");
const bizPhone = document.getElementById("bizPhone");
const noContract = document.getElementById("noContract");
const activateBtn = document.getElementById("activateBtn");
const activateMsg = document.getElementById("activateMsg");

[country, service, bizName, bizPhone, noContract].forEach(el => {
el.addEventListener("input", updateActivate);
el.addEventListener("change", updateActivate);
});

function updateActivate(){
const ok =
country.value &&
selectedIndustry &&
service.value &&
bizName.value.trim().length >= 2 &&
bizPhone.value.trim().length >= 7 &&
noContract.checked;

activateBtn.disabled = !ok;
activateMsg.textContent = ok
? "Ready to activate."
: "Complete steps 1–4 and confirm “No contract” to enable activation.";
}

document.getElementById("demoBtn").addEventListener("click", () => {
const el = document.getElementById("demoStatus");
el.textContent = "Demo started (placeholder). We’ll connect this to a real number next.";
});

activateBtn.addEventListener("click", () => {
// This is the “real working” hook point.
// Next step: connect this button to your backend/payment/agent provisioning.
alert("Activation request received (demo). Next: connect to billing + provisioning.");
});
