(function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const open = mobileMenu.hasAttribute("hidden") ? false : true;
      if (open) {
        mobileMenu.setAttribute("hidden", "");
        hamburger.setAttribute("aria-expanded", "false");
      } else {
        mobileMenu.removeAttribute("hidden");
        hamburger.setAttribute("aria-expanded", "true");
      }
    });
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
