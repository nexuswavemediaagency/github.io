/* Premium homepage interactions: loader, navigation, reveal motion, and soft pointer effects. */
(function () {
  'use strict';

  var responsivePolish = document.createElement('link');
  responsivePolish.rel = 'stylesheet';
  responsivePolish.href = 'css/pages/index-responsive-fixes.css';
  document.head.appendChild(responsivePolish);

  var headerStatsPolish = document.createElement('link');
  headerStatsPolish.rel = 'stylesheet';
  headerStatsPolish.href = 'css/pages/index-header-stats-fix.css';
  document.head.appendChild(headerStatsPolish);

  var brandMobilePolish = document.createElement('link');
  brandMobilePolish.rel = 'stylesheet';
  brandMobilePolish.href = 'css/pages/index-brand-mobile-polish.css';
  document.head.appendChild(brandMobilePolish);

  var finalBrandPolish = document.querySelector('link[href="css/pages/final-brand-polish.css"]');
  if (finalBrandPolish) {
    document.head.appendChild(finalBrandPolish);
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  function upsertLink(selector, attributes) {
    var link = document.querySelector(selector) || document.createElement('link');
    Object.keys(attributes).forEach(function (key) {
      link.setAttribute(key, attributes[key]);
    });
    if (!link.parentNode) document.head.appendChild(link);
  }

  function upsertMeta(selector, attributes) {
    var meta = document.querySelector(selector) || document.createElement('meta');
    Object.keys(attributes).forEach(function (key) {
      meta.setAttribute(key, attributes[key]);
    });
    if (!meta.parentNode) document.head.appendChild(meta);
  }

  function ensureBrandMetadata() {
    upsertLink('link[rel="icon"]', { rel: 'icon', href: 'favicon.ico', type: 'image/x-icon' });
    upsertLink('link[rel="icon"][sizes="32x32"]', { rel: 'icon', href: 'favicon-32x32.png', type: 'image/png', sizes: '32x32' });
    upsertLink('link[rel="icon"][sizes="16x16"]', { rel: 'icon', href: 'favicon-16x16.png', type: 'image/png', sizes: '16x16' });
    upsertLink('link[rel="apple-touch-icon"]', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', sizes: '180x180' });
    upsertLink('link[rel="manifest"]', { rel: 'manifest', href: 'site.webmanifest' });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: 'https://nexuswavemediaagency.com/assets/brand/nexus-wave-og.svg' });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Nexus Wave Media Agency logo mark' });
  }

  function normalizeBrandImages() {
    document.querySelectorAll('.brand-logo-image').forEach(function (logo) {
      logo.setAttribute('src', 'images/nexus-wave-horizontal.svg');
      logo.setAttribute('alt', 'NEXUS WAVE');
      logo.decoding = 'async';
    });
  }

  function normalizeServiceLinks() {
    document.querySelectorAll('a').forEach(function (link) {
      var label = (link.textContent || '').trim().toLowerCase();
      var href = link.getAttribute('href') || '';
      if (label === 'services' && (href === '#services' || href === 'index.html#services')) {
        link.setAttribute('href', 'services.html');
      }
    });
  }

  ensureBrandMetadata();

  onReady(function () {
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
    const desktopPointer = finePointer && window.matchMedia('(min-width: 1025px)').matches;
    const loaderDuration = reducedMotion ? 420 : 2100;
    const loaderFade = reducedMotion ? 220 : 560;

    ensureBrandMetadata();
    normalizeBrandImages();
    normalizeServiceLinks();

    if (year) year.textContent = String(new Date().getFullYear());

    const deliveryLabel = document.querySelector('.stats-glass .stat:last-child span');
    if (deliveryLabel) {
      deliveryLabel.textContent = 'Delivery';
      deliveryLabel.style.textTransform = 'none';
    }

    function restoreHashPosition() {
      if (!window.location.hash) return;
      const target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;
      window.setTimeout(function () {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
      }, 40);
    }

    function completeLoader() {
      if (!loader) {
        document.body.classList.remove('is-loading');
        return;
      }
      if (loader.classList.contains('is-complete')) return;
      if (loaderCount) loaderCount.textContent = '100';
      if (loaderBar) loaderBar.style.width = '100%';
      loader.classList.add('is-complete');
      window.setTimeout(function () {
        document.body.classList.remove('is-loading');
        loader.remove();
        restoreHashPosition();
      }, loaderFade);
    }

    if (loader) {
      const startedAt = performance.now();

      function updateLoader(now) {
        const progress = Math.min((now - startedAt) / loaderDuration, 1);
        const eased = progress;
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
    } else {
      document.body.classList.remove('is-loading');
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

    if (cursorGlow && desktopPointer && !reducedMotion) {
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
  });
})();
