// Small UI helpers (safe for static hosting)

document.getElementById("year").textContent = new Date().getFullYear();

// Simple "chip" active state (visual only)
document.querySelectorAll(".chip").forEach((btn) => {
btn.addEventListener("click", () => {
document.querySelectorAll(".chip").forEach((b) => b.classList.remove("is-active"));
btn.classList.add("is-active");
});
});
