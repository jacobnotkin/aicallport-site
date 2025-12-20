// year
document.getElementById("year").textContent = new Date().getFullYear();

// mobile menu
const burger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");

if (burger && mobileNav) {
burger.addEventListener("click", () => {
const open = mobileNav.classList.toggle("open");
burger.setAttribute("aria-expanded", open ? "true" : "false");
mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
});

// close menu when clicking a link
mobileNav.querySelectorAll("a").forEach((a) => {
a.addEventListener("click", () => {
mobileNav.classList.remove("open");
burger.setAttribute("aria-expanded", "false");
mobileNav.setAttribute("aria-hidden", "true");
});
});
}

// smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
a.addEventListener("click", (e) => {
const id = a.getAttribute("href");
if (!id || id === "#") return;
const el = document.querySelector(id);
if (!el) return;
e.preventDefault();
el.scrollIntoView({ behavior: "smooth", block: "start" });
});
});
