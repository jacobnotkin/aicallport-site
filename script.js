// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('[data-nav-links]');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close menu when clicking a link (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
