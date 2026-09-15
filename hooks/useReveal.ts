'use client';

import { useEffect } from 'react';

export function useReveal(deps: unknown[]) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!els.length) return;

    const showAll = () => els.forEach((e) => e.classList.add('is-in'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { showAll(); return; }

    const inView = () => {
      const h = window.innerHeight || 0;
      els.forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.top < h * 0.96 && r.bottom > 0) e.classList.add('is-in');
      });
    };
    requestAnimationFrame(inView);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );
    els.forEach((e) => io.observe(e));

    const onScroll = () => inView();
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(showAll, 1400);

    return () => {
      io.disconnect();
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
