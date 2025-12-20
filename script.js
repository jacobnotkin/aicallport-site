// Basic helpers (no heavy logic to avoid breaking layout)

function $(id){ return document.getElementById(id); }

function syncBanner(){
// Ensures promo banner text stays consistent across pages
const promo = document.querySelector("[data-promo]");
if(!promo) return;

promo.innerHTML = `
<span class="pill"><span class="beta">BETA</span> First 25 clients: <strong>$199/mo</strong> locked for 2 years</span>
<span class="pill">Regular: <strong>$299/mo</strong></span>
<span class="pill">No contract • Cancel anytime • No hidden costs</span>
`;
}

function activatePrefill(){
// If user clicks Activate from homepage, we can prefill nothing for now.
// Future: read query params (country/industry/service) and select options.
}

document.addEventListener("DOMContentLoaded", () => {
syncBanner();
activatePrefill();
});
