// Simple accordion + form status logic

const steps = document.querySelectorAll(".step");
const panels = document.querySelectorAll(".stepPanel");

function closeAll() {
  panels.forEach(p => p.classList.remove("isOpen"));
}

steps.forEach(btn => {
  btn.addEventListener("click", () => {
    const n = btn.getAttribute("data-step");
    const panel = document.querySelector(`.stepPanel[data-panel="${n}"]`);
    const wasOpen = panel.classList.contains("isOpen");
    closeAll();
    if (!wasOpen) panel.classList.add("isOpen");
  });
});

// Open step 1 by default
document.querySelector('.stepPanel[data-panel="1"]').classList.add("isOpen");

// Scroll to how-it-works
document.getElementById("ctaSeeHow").addEventListener("click", () => {
  document.getElementById("howItWorks").scrollIntoView({ behavior: "smooth" });
});

// Country status
const country = document.getElementById("country");
const countryStatus = document.getElementById("countryStatus");
country.addEventListener("change", () => {
  countryStatus.textContent = country.value ? country.value : "Not selected";
});

// Industry status
const industryStatus = document.getElementById("industryStatus");
let selectedIndustry = "";
document.querySelectorAll(".pill").forEach(p => {
  p.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(x => x.classList.remove("isActive"));
    p.classList.add("isActive");
    selectedIndustry = p.dataset.industry || "";
    industryStatus.textContent = selectedIndustry || "Not selected";
  });
});

// Service status
const serviceStatus = document.getElementById("serviceStatus");
document.querySelectorAll('input[name="service"]').forEach(r => {
  r.addEventListener("change", () => {
    serviceStatus.textContent = r.value || "Not selected";
  });
});

// Business details status
const bizName = document.getElementById("bizName");
const bizPhone = document.getElementById("bizPhone");
const bizDesc = document.getElementById("bizDesc");
const detailsStatus = document.getElementById("detailsStatus");

function updateDetailsStatus() {
  const ok = bizName.value.trim() && bizPhone.value.trim() && bizDesc.value.trim();
  detailsStatus.textContent = ok ? "Completed" : "Not completed";
}
[bizName, bizPhone, bizDesc].forEach(el => el.addEventListener("input", updateDetailsStatus));

// Demo status
const demoStatus = document.getElementById("demoStatus");
document.getElementById("markDemo").addEventListener("click", () => {
  demoStatus.textContent = "Completed";
});

// Activate buttons
function activationMessage() {
  const msg = document.getElementById("activateMsg");
  msg.textContent = "Activation demo: Next step would be billing + provisioning.";
}

document.getElementById("ctaActivateTop").addEventListener("click", () => {
  // open step 6 and scroll
  panels.forEach(p => p.classList.remove("isOpen"));
  document.querySelector('.stepPanel[data-panel="6"]').classList.add("isOpen");
  document.querySelector('.stepPanel[data-panel="6"]').scrollIntoView({ behavior: "smooth", block: "center" });
  activationMessage();
});

document.getElementById("ctaActivateBottom").addEventListener("click", () => {
  activationMessage();
});
