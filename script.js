// Mobile nav toggle
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

function setMobile(open) {
  burger.setAttribute("aria-expanded", String(open));
  mobileNav.setAttribute("aria-hidden", String(!open));
  mobileNav.classList.toggle("show", open);
}

burger?.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  setMobile(!open);
});

mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => setMobile(false));
});

// Optional: subtle “focus” on pricing card when arriving at #pricing
function pulsePricing() {
  const el = document.querySelector("#pricing [data-price-card]");
  if (!el) return;
  el.animate(
    [
      { transform: "translateY(0)", boxShadow: "0 18px 45px rgba(12,20,36,.12)" },
      { transform: "translateY(-2px)", boxShadow: "0 22px 60px rgba(201,119,28,.20)" },
      { transform: "translateY(0)", boxShadow: "0 18px 45px rgba(12,20,36,.12)" }
    ],
    { duration: 520, iterations: 1, easing: "ease-out" }
  );
}

window.addEventListener("hashchange", () => {
  if (location.hash === "#pricing") pulsePricing();
});

if (location.hash === "#pricing") pulsePricing();
