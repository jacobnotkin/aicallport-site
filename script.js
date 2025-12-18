// Simple step accordion
const stepButtons = document.querySelectorAll('.step');
const panels = document.querySelectorAll('.step__panel');

function closeAll() {
  panels.forEach(p => p.classList.remove('is-open'));
}

stepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const n = btn.getAttribute('data-step');
    const panel = document.querySelector(`.step__panel[data-panel="${n}"]`);
    if (!panel) return;

    const isOpen = panel.classList.contains('is-open');
    closeAll();
    if (!isOpen) panel.classList.add('is-open');
  });
});

// CTA buttons (placeholder action for now)
function activate() {
  alert("Activation flow is not wired yet. Next step: connect this button to your signup / checkout.");
}

document.getElementById('ctaActivateTop')?.addEventListener('click', activate);
document.getElementById('ctaActivatePrice')?.addEventListener('click', activate);
document.getElementById('ctaActivateBottom')?.addEventListener('click', activate);
