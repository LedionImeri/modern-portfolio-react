/**
 * Google Analytics 4 — loaded only when VITE_GA_ID is set (format G-XXXXXXXXXX).
 * Without an ID every function here is a silent no-op, so nothing breaks.
 */
const GA_ID = (import.meta.env.VITE_GA_ID || '').trim();
const VALID = /^G-[A-Z0-9]+$/i.test(GA_ID);
let ready = false;

export function initAnalytics() {
  if (!VALID || ready || typeof window === 'undefined') return;
  // Respect Do Not Track
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
  ready = true;
}

/** trackEvent('cv_download') — safe to call anywhere. */
export function trackEvent(name, params = {}) {
  if (ready && typeof window.gtag === 'function') window.gtag('event', name, params);
}
