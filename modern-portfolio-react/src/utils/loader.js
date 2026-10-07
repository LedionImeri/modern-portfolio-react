import { prefersReducedMotion } from './motion.js';

/** Fades out the inline loader from index.html after a short minimum time. */
export function hideLoader() {
  const el = document.getElementById('loader');
  if (!el) return;
  const skip = document.documentElement.classList.contains('no-loader');
  const min = skip || prefersReducedMotion() ? 0 : 900;
  const wait = Math.max(0, min - performance.now());
  setTimeout(() => {
    el.classList.add('is-done');
    document.documentElement.classList.add('is-loaded');
    try {
      sessionStorage.setItem('li-loaded', '1');
    } catch {
      /* storage unavailable — loader will simply show again next visit */
    }
    setTimeout(() => el.remove(), 600);
  }, wait);
}
