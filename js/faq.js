/* =============================================
   NEXUS WAVE — faq.js
   FAQ accordion toggle — used on index + contact
   ============================================= */

/**
 * toggleFaq(el)
 * Called via onclick="toggleFaq(this)" on .faq-q divs.
 * Opens the clicked item, closes all others.
 */
window.toggleFaq = function (el) {
  const item   = el.parentElement;
  const isOpen = item.classList.contains('open');
  const icon   = el.querySelector('.faq-icon');

  /* Close all items first */
  document.querySelectorAll('.faq-item').forEach(function (i) {
    i.classList.remove('open');
    const ic = i.querySelector('.faq-icon');
    if (ic) ic.textContent = '+';
  });

  /* If it was closed, open it */
  if (!isOpen) {
    item.classList.add('open');
    if (icon) icon.textContent = '−';
  }
};
