// Mobile menu + smooth scroll + footer year
(function () {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("show");
      mobileNav.setAttribute("aria-hidden", String(isOpen));
    });

    // close menu when clicking a link
    mobileNav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      hamburger.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("show");
      mobileNav.setAttribute("aria-hidden", "true");
    });
  }

  // smooth scroll for same-page hash links
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
