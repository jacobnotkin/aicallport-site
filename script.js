// Smooth scroll buttons
document.querySelectorAll("[data-scroll]").forEach((btn) => {
btn.addEventListener("click", () => {
const target = btn.getAttribute("data-scroll");
const el = document.querySelector(target);
if (!el) return;
el.scrollIntoView({ behavior: "smooth", block: "start" });
});
});

// Year in footer
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// (Optional) Chips active state only (visual)
document.querySelectorAll(".chip").forEach((chip) => {
chip.addEventListener("click", () => {
document.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
chip.classList.add("is-active");
});
});
