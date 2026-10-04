const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  }));
}

const revealElements = document.querySelectorAll('.reveal');
if (motionQuery.matches || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
