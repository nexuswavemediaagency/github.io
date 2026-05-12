/* =============================================
   NEXUS WAVE — animations.js
   Scroll reveal · Jitter headline · FAQ · Marquee
   ============================================= */

// ── Scroll Reveal ─────────────────────────────────
(function initReveal() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// ── Jitter / Text Rotate Animation ────────────────
/*
  Usage: add data-jitter to a <span> to cycle through
  words with a jitter effect.
  data-words="Brands,Startups,Products,Schools"
  data-interval="2800"  (optional, default 2800ms)
*/
(function initJitter() {
  const el = document.querySelector('[data-jitter]');
  if (!el) return;

  const rawWords = el.getAttribute('data-words') || 'Brands';
  const words    = rawWords.split(',').map(function (w) { return w.trim(); });
  const interval = parseInt(el.getAttribute('data-interval') || '2800', 10);

  let current = 0;

  // Characters for scramble
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$&';

  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function scrambleTo(target, duration, callback) {
    const steps = 14;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(function () {
      step++;
      // Each step reveals a bit more of the real word
      const revealedChars = Math.floor((step / steps) * target.length);
      let result = '';
      for (let i = 0; i < target.length; i++) {
        if (i < revealedChars) {
          result += target[i];
        } else {
          result += randomChar();
        }
      }
      el.textContent = result;

      if (step >= steps) {
        clearInterval(timer);
        el.textContent = target;
        if (callback) callback();
      }
    }, stepTime);
  }

  // Set initial word
  el.textContent = words[current];

  // Cycle every interval ms
  setInterval(function () {
    current = (current + 1) % words.length;
    scrambleTo(words[current], 360);
  }, interval);
})();

// ── FAQ Accordion ─────────────────────────────────
// Moved to js/faq.js — loaded separately on pages that need it.

// ── Service Row Hover Fill ─────────────────────────
(function initServiceRows() {
  document.querySelectorAll('.svc-row').forEach(function (row) {
    row.addEventListener('mouseenter', function () {
      row.classList.add('hovered');
    });
    row.addEventListener('mouseleave', function () {
      row.classList.remove('hovered');
    });
  });
})();

// ── Page Load Sequence ────────────────────────────
(function initPageLoad() {
  const eyebrow  = document.querySelector('.hero-eyebrow');
  const headline = document.querySelector('.hero-headline');
  const sub      = document.querySelector('.hero-sub');
  const btns     = document.querySelector('.hero-btns');

  function fadeIn(el, delay) {
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(function () {
      el.style.transition = 'opacity 0.7s var(--ease), transform 0.7s var(--ease)';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, delay);
  }

  if (eyebrow)  { eyebrow.style.transform  = 'translateY(12px)'; fadeIn(eyebrow, 0);   }
  if (headline) { headline.style.transform = 'translateY(12px)'; fadeIn(headline, 100); }
  if (sub)      { sub.style.transform      = 'translateY(12px)'; fadeIn(sub, 250);      }
  if (btns)     { btns.style.transform     = 'translateY(12px)'; fadeIn(btns, 300);     }
})();
