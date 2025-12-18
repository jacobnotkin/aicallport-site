// Small helpers: smooth scroll + footer year
(function () {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Smooth scroll for internal anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const el = document.querySelector(href);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  });
})();
