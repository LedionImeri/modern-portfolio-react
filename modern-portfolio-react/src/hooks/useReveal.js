import { useEffect } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

/**
 * One shared IntersectionObserver for every [data-reveal] element.
 * Elements get `.is-visible` once they enter the viewport (animations live in CSS).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible', 'reveal-done'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            el.classList.add('is-visible');
            io.unobserve(el);
            // Drop the stagger delay after the entrance so hover feels instant.
            setTimeout(() => el.classList.add('reveal-done'), 1400);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
