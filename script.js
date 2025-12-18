// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after clicking a link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
