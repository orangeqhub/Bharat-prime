import { useEffect } from 'react';

export default function useParallax(ref, factor = -0.08) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    let raf = 0;
    let last = null;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const value = `${(center * factor).toFixed(1)}px`;
        if (value !== last) {
          last = value;
          el.style.setProperty('--parallax', value);
        }
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref, factor]);
}