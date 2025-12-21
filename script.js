// Smooth scrolling for same-page anchors
document.addEventListener("click", (e) => {
const a = e.target.closest("a[href^='#']");
if (!a) return;

const id = a.getAttribute("href");
const el = document.querySelector(id);
if (!el) return;

e.preventDefault();
el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
