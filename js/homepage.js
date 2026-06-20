/* Premium homepage interactions: loader, navigation, reveal motion, and soft pointer effects. */
(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const year = document.getElementById('currentYear');
  const loader = document.getElementById('introLoader');
  const loaderCount = document.getElementById('loaderCount');
  const loaderBar = document.getElementById('loaderBar');
  const cursorGlow = document.getElementById('cursorGlow');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (year) year.textContent = String(new Date().getFullYear());

  function completeLoader() {
    if (!loader) return;
    if (loaderCount) loaderCount.textContent = '100';
    if (loaderBar) loaderBar.style.width = '100%';
    loader.classList.add('is-complete');
    window.setTimeout(function () { loader.remove(); }, 520);
  }

  if (loader) {
    if (reducedMotion) {
      window.setTimeout(completeLoader, 60);
    } else {
      const startedAt = performance.now();
      const duration = 1300;

      function updateLoader(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.min(100, Math.floor(eased * 100));

        if (loaderCount) loaderCount.textContent = String(value);
        if (loaderBar) loaderBar.style.width = value + '%';

        if (progress < 1) {
          window.requestAnimationFrame(updateLoader);
        } else {
          completeLoader();
        }
      }

      window.requestAnimationFrame(updateLoader);
    }
  }

  function updateHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      setMenu(!mobileMenu.classList.contains('is-open'));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) setMenu(false);
    });
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index % 4, 3) * 70 + 'ms';
      observer.observe(item);
    });
  }

  if (cursorGlow && finePointer && !reducedMotion) {
    document.addEventListener('pointermove', function (event) {
      cursorGlow.style.left = event.clientX + 'px';
      cursorGlow.style.top = event.clientY + 'px';
      cursorGlow.classList.add('is-visible');
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () {
      cursorGlow.classList.remove('is-visible');
    });

    window.addEventListener('blur', function () {
      cursorGlow.classList.remove('is-visible');
    });
  }

  if (finePointer && !reducedMotion) {
    document.querySelectorAll('.button, .nav-cta').forEach(function (button) {
      button.addEventListener('pointermove', function (event) {
        const bounds = button.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7;
        button.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      });

      button.addEventListener('pointerleave', function () {
        button.style.removeProperty('transform');
      });
    });
  }

  const panel = document.querySelector('.system-panel');
  if (panel && finePointer && !reducedMotion) {
    panel.addEventListener('pointermove', function (event) {
      const bounds = panel.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      panel.style.setProperty('--pointer-x', x + '%');
      panel.style.setProperty('--pointer-y', y + '%');
    });
  }
})();