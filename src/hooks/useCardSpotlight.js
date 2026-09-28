import { useEffect } from 'react';

const CARD_SELECTOR = '.hover-lift, .card, .mvr__stat-card, .growth__phase-card';

export default function useCardSpotlight(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(max-width: 1100px)').matches) return undefined;

    let active = null;
    let raf = 0;

    const reset = (el) => {
      el.classList.remove('is-tilting');
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    };

    const onMove = (e) => {
      const el = e.target.closest(CARD_SELECTOR);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (active !== el) {
          if (active) reset(active);
          active = el || null;
        }
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);

        el.classList.add('is-tilting');
        el.style.setProperty('--mx', px.toFixed(3));
        el.style.setProperty('--my', py.toFixed(3));
        el.style.setProperty('--tilt-y', `${(((px - 0.5) * 2) * 5).toFixed(2)}deg`);
        el.style.setProperty('--tilt-x', `${(((0.5 - py) * 2) * 6).toFixed(2)}deg`);
      });
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      if (active) reset(active);
      root.removeEventListener('pointermove', onMove);
    };
  }, [rootRef]);
}