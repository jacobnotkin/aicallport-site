// Mobile menu
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove("is-open");
  });
}

// Current year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    nav?.classList.remove("is-open");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
