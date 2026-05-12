/* =============================================
   NEXUS WAVE — portfolio.js
   Portfolio card filter by category
   ============================================= */

/**
 * filterCards(btn)
 * Called via onclick="filterCards(this)" on .filter-btn elements.
 * Reads data-filter attribute and shows/hides cards by data-cats.
 */
window.filterCards = function (btn) {
  const filter = btn.getAttribute('data-filter');

  /* Update active button state */
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  /* Show or hide each portfolio card */
  document.querySelectorAll('.pcard').forEach(function (card) {
    if (filter === 'all') {
      card.classList.remove('hidden');
    } else {
      const cats = card.getAttribute('data-cats') || '';
      if (cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    }
  });
};
