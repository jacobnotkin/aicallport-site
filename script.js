// Small helpers only (kept minimal on purpose)
document.getElementById("year").textContent = new Date().getFullYear();

// Optional mobile menu toggle placeholder (since your screenshot shows a menu icon)
const menuBtn = document.getElementById("menuBtn");
if (menuBtn) {
menuBtn.addEventListener("click", () => {
alert("Menu (mobile) — tell me what links you want here and I’ll wire it up.");
});
}
