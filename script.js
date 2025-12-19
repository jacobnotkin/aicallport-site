// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const mobileNav = document.getElementById("mobileNav");

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = mobileNav.style.display === "block";
    mobileNav.style.display = open ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!open));
  });
}

// Steps accordion
document.querySelectorAll(".step").forEach((btn) => {
  btn.addEventListener("click", () => {
    const allSteps = [...document.querySelectorAll(".step")];
    const allBodies = [...document.querySelectorAll(".step-body")];
    const idx = allSteps.indexOf(btn);

    allSteps.forEach((s) => s.classList.remove("open"));
    allBodies.forEach((b) => b.classList.remove("open"));

    btn.classList.add("open");
    if (allBodies[idx]) allBodies[idx].classList.add("open");
  });
});

// Year in footer
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
