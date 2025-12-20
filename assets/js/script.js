// Mobile menu toggle (simple show/hide)
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
toggle.addEventListener("click", () => {
const isOpen = nav.style.display === "flex";
nav.style.display = isOpen ? "none" : "flex";
nav.style.flexDirection = "column";
nav.style.gap = "12px";
nav.style.position = "absolute";
nav.style.top = "64px";
nav.style.right = "20px";
nav.style.padding = "14px";
nav.style.borderRadius = "14px";
nav.style.background = "rgba(4,10,24,.92)";
nav.style.border = "1px solid rgba(255,255,255,.12)";
toggle.setAttribute("aria-expanded", String(!isOpen));
});
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
