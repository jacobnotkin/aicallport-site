// Smooth scrolling for in-page anchors (works well on Cloudflare Pages)
document.addEventListener("click", (e) => {
const a = e.target.closest('a[href^="#"]');
if (!a) return;

const id = a.getAttribute("href");
if (!id || id === "#") return;

const el = document.querySelector(id);
if (!el) return;

e.preventDefault();
el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Placeholder: later you can point this to a real activation form/app route
const goBtn = document.getElementById("goActivationBtn");
if (goBtn) {
goBtn.addEventListener("click", (e) => {
// currently scrolls to top because it's href="#top"
// if you later create a real form page, change link to: href="activate.html" (optional)
});
}
