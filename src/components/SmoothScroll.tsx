'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/* Lenis yumuşak scroll — sayfaya premium, akışkan kaydırma hissi katar.
   Hareket azaltma tercihi açıksa (prefers-reduced-motion) devre dışı kalır ve
   tarayıcının doğal kaydırması kullanılır. Sayfa içi çapa (#) bağlantıları da
   yumuşak biçimde hedefe kaydırılır. */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Sayfa içi çapa bağlantılarını yumuşak kaydır
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!el) return;
      const id = el.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
