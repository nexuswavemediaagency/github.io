/* =============================================
   NEXUS WAVE — navbar.js
   Navbar scroll state + mobile menu toggle
   ============================================= */

(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // ── Scroll state ──────────────────────────────────
  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load

  // ── Mobile menu ───────────────────────────────────
  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Expose to global for onclick
  window.toggleMenu = toggleMenu;
  window.closeMenu  = closeMenu;

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Mark active page link
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0] === current) {
      link.classList.add('active');
    }
  });
})();
