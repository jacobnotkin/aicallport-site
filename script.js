(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.querySelector(".mobile-menu");
  if (!toggle || !mobile) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobile.hasAttribute("hidden") === false;
    if (isOpen) {
      mobile.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    } else {
      mobile.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
    }
  });

  // Close mobile menu when clicking a link
  mobile.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobile.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
