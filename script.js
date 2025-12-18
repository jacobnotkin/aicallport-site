// Simple accordion behavior + small interactivity
const stepButtons = Array.from(document.querySelectorAll(".step"));
const stepBodies  = Array.from(document.querySelectorAll(".stepBody"));

function closeAll() {
  stepBodies.forEach(b => b.classList.remove("open"));
}

stepButtons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const body = stepBodies[idx];
    const isOpen = body.classList.contains("open");
    closeAll();
    if (!isOpen) body.classList.add("open");
  });
});

// Default: open step 1
if (stepBodies[0]) stepBodies[0].classList.add("open");

// Industry pills
const industryWrap = document.getElementById("industry");
if (industryWrap) {
  industryWrap.addEventListener("click", (e) => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    industryWrap.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
  });
}

// Demo status button
const markDemo = document.getElementById("markDemo");
const demoStatus = document.getElementById("demoStatus");
if (markDemo && demoStatus) {
  markDemo.addEventListener("click", () => {
    demoStatus.textContent = "Status: Completed";
    demoStatus.style.fontWeight = "800";
  });
}

// Activation message (placeholder)
const activateBtn = document.getElementById("activateBtn");
const activateMsg = document.getElementById("activateMsg");
if (activateBtn && activateMsg) {
  activateBtn.addEventListener("click", (e) => {
    // Keep it a placeholder so the page doesn't break
    activateMsg.textContent = "Activation placeholder — backend connection comes next.";
  });
}
