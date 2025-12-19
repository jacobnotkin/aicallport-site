(() => {
  const burger = document.querySelector(".nav-burger");
  const menu = document.getElementById("mobileMenu");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after clicking a link
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
})();
