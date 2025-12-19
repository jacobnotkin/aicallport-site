// Mobile nav toggle + small UX helpers
(function () {
  const navBtn = document.querySelector('.navbtn');
  const nav = document.querySelector('.nav');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  if (navBtn && nav) {
    navBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navBtn.setAttribute('aria-expanded', String(open));
    });

    // close menu on link click (mobile)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // close menu if click outside
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      const inside = nav.contains(e.target) || navBtn.contains(e.target);
      if (!inside) {
        nav.classList.remove('is-open');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });
})();
