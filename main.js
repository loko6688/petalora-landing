/**
 * Petalora landing — checkout wiring
 * CHECKOUT_URL is imported from config.js (set your Stripe / Gumroad / Whop link there).
 * If empty: buy buttons enter a polite disabled "Checkout wird verbunden…" state.
 */
import { CHECKOUT_URL } from './config.js';

const toast = document.getElementById('checkout-toast');
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const buyButtons = document.querySelectorAll('a.buy-btn, a#buy');

// Keep one hero variant per browsing session for a lightweight A/B test.
const heroVariants = [...document.querySelectorAll('[data-ab]')];
if (heroVariants.length) {
  const key = 'petalora-hero-ab';
  let chosen = sessionStorage.getItem(key);
  if (!heroVariants.some((el) => el.dataset.ab === chosen)) {
    chosen = Math.random() < 0.5 ? 'a' : 'b';
    sessionStorage.setItem(key, chosen);
  }
  heroVariants.forEach((el) => {
    const active = el.dataset.ab === chosen;
    el.classList.toggle('is-active', active);
    if (active) el.setAttribute('aria-label', `Hero-Variante ${chosen.toUpperCase()}`);
  });
}

function showToast(message, ms = 2800) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), ms);
}

function wireCheckout() {
  const url = (CHECKOUT_URL || '').trim();

  buyButtons.forEach((btn) => {
    if (url) {
      btn.href = url;
      btn.classList.remove('is-disabled');
      btn.setAttribute('aria-disabled', 'false');
      btn.removeAttribute('title');
      // External checkout opens in same tab by default; uncomment for new tab:
      // btn.setAttribute('target', '_blank');
      // btn.setAttribute('rel', 'noopener noreferrer');
    } else {
      btn.href = '#';
      btn.classList.add('is-disabled');
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('title', 'Checkout wird verbunden…');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Checkout wird verbunden…');
      });
    }
  });
}

wireCheckout();
