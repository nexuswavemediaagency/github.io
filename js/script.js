/* =============================================
   NEXUS WAVE — script.js
   Contact form + shared utilities
   ============================================= */

// ── Contact Form (Formspree) ──────────────────────
(function initContactForm() {
  const form = document.getElementById('cForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = document.getElementById('cBtn');
    const msg = document.getElementById('cMsg');

    btn.disabled     = true;
    btn.textContent  = 'Sending...';
    msg.style.display = 'none';

    try {
      const res = await fetch('https://formspree.io/f/nexuswave', {
        method:  'POST',
        body:    new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        msg.textContent  = 'Message sent. We will be in touch within 24 hours.';
        msg.className    = 'cmsg ok';
        form.reset();
        btn.textContent  = 'Sent';
      } else {
        throw new Error('Failed');
      }
    } catch {
      msg.textContent  = 'Something went wrong. WhatsApp us at +92 304 7355553';
      msg.className    = 'cmsg err';
      btn.disabled     = false;
      btn.textContent  = 'Send Message →';
    }

    msg.style.display = 'block';
  });
})();
