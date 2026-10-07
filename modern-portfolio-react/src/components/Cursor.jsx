import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../utils/motion.js';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]';

/**
 * Desktop-only cursor follower + card spotlight.
 * Never rendered on touch devices or when reduced motion is requested.
 * The native cursor stays visible for accessibility; the ring is purely decorative.
 */
export default function Cursor() {
  const ringRef = useRef(null);
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());

  useEffect(() => {
    if (!enabled) return undefined;
    const ring = ringRef.current;
    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let raf = 0;
    let running = false;

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      ring.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      if (Math.abs(pos.x - cur.x) + Math.abs(pos.y - cur.y) > 0.1) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      ring.classList.add('is-visible');
      kick();
      // Spotlight for cards
      const card = e.target.closest?.('[data-spotlight]');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    const onOver = (e) => ring.classList.toggle('is-hover', !!e.target.closest?.(INTERACTIVE));
    const onLeave = () => ring.classList.remove('is-visible');
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    document.documentElement.classList.add('has-cursor');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
