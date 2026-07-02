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

  var finalBrandPolish = document.createElement('link');
  finalBrandPolish.rel = 'stylesheet';
  finalBrandPolish.href = 'css/pages/final-brand-polish.css';
  document.head.appendChild(finalBrandPolish);

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

  function applyHomepageCopy() {
    if (!document.body.classList.contains('premium-homepage')) return;

    var heroTitle = document.getElementById('hero-title');
    var heroLede = document.querySelector('.hero-lede');
    var secondaryButton = document.querySelector('.hero-actions .button-secondary');
    var description = document.querySelector('meta[name="description"]');
    var ogDescription = document.querySelector('meta[property="og:description"]');
    var serviceIntro = document.querySelector('.services-intro > p:last-child');
    var serviceCards = document.querySelectorAll('.service-card');
    var services = [
      {
        title: 'Social Media Management',
        body: 'Plan and manage consistent social posts, captions, basic reporting, and daily presence without random posting.'
      },
      {
        title: 'Paid Advertising',
        body: 'Clear campaign setup for Meta or Google with practical offers, audiences, creative direction, inquiry tracking, and readable reporting.'
      },
      {
        title: 'Content Creation & Reels',
        body: 'Scripts, short-form edits, graphics, carousels, stories, and content ideas shaped around what people need to understand.'
      },
      {
        title: 'Website Design & Development',
        body: 'Static websites and landing pages that explain the business clearly and guide people toward the next step.'
      },
      {
        title: 'Google Profile, SEO & Local Visibility',
        body: 'Google Business Profile basics, metadata, local search signals, and cleaner visibility for people searching nearby.'
      },
      {
        title: 'Automation & Lead Systems',
        body: 'Forms, WhatsApp paths, follow-ups, reminders, and simple sheets that help inquiries keep moving.'
      }
    ];

    if (heroTitle) {
      heroTitle.innerHTML = 'Digital marketing, websites, and systems for businesses ready to <em>look clearer and grow smarter.</em>';
    }
    if (heroLede) {
      heroLede.textContent = 'Nexus Wave helps businesses improve how they appear online through content, campaigns, websites, Google visibility, and simple systems that keep inquiries moving.';
    }
    if (secondaryButton) {
      secondaryButton.innerHTML = 'See Our Work <span aria-hidden="true">↗</span>';
    }
    if (description) {
      description.setAttribute('content', 'Nexus Wave Media Agency helps businesses improve how they appear online through content, campaigns, websites, Google visibility, and simple systems that keep inquiries moving.');
    }
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Digital marketing, websites, and systems for businesses ready to look clearer and grow smarter.');
    }
    if (serviceIntro) {
      serviceIntro.textContent = 'Clear digital services for the places people meet your business: social media, ads, content, websites, Google visibility, and inquiry systems.';
    }

    serviceCards.forEach(function (card, index) {
      var item = services[index];
      if (!item) return;
      var heading = card.querySelector('h3');
      var copy = card.querySelector('p');
      if (heading) heading.textContent = item.title;
      if (copy) copy.textContent = item.body;
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
    applyHomepageCopy();

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
