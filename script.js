// ===== Helpers
const $ = (sel, root=document) => root.querySelector(sel);

function smoothScrollToHash(hash) {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== Make pricing banner identical everywhere (Hero + Pricing)
function mountPricingCards() {
  const tpl = $("#pricingCardTemplate");
  const heroMount = $("#pricingCardMountHero");
  const pricingMount = $("#pricingCardMountPricing");

  if (!tpl || !heroMount || !pricingMount) return;

  heroMount.innerHTML = "";
  pricingMount.innerHTML = "";

  const card1 = tpl.content.cloneNode(true);
  const card2 = tpl.content.cloneNode(true);

  heroMount.appendChild(card1);
  pricingMount.appendChild(card2);
}

// ===== Mobile menu toggle
function setupMobileMenu() {
  const toggle = $(".navToggle");
  const menu = $("#mobileMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.hidden = expanded;
  });

  // Close menu when clicking a link
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  });
}

// ===== Smooth anchor scroll
function setupAnchors() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;

    const hash = a.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    history.pushState(null, "", hash);
    smoothScrollToHash(hash);
  });

  // If loaded with hash
  window.addEventListener("load", () => {
    if (location.hash) smoothScrollToHash(location.hash);
  });
}

// ===== Footer year
function setYear() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

// Init
mountPricingCards();
setupMobileMenu();
setupAnchors();
setYear();
