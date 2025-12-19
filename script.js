(function () {
  const burger = document.querySelector("[data-burger]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  // Modal open/close
  document.querySelectorAll("[data-open]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const key = el.getAttribute("data-open");
      const modal = document.querySelector(`[data-modal="${key}"]`);
      if (!modal) return;
      e.preventDefault();
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => {
      const key = el.getAttribute("data-close");
      const modal = document.querySelector(`[data-modal="${key}"]`);
      if (!modal) return;
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  });

  // Back to top
  document.querySelectorAll("[data-top]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // ESC closes modal
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const openModal = document.querySelector('.modal[aria-hidden="false"]');
    if (!openModal) return;
    openModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
})();
