'use client';

import { useReducedMotion } from 'framer-motion';

/* Bölüm giriş animasyonları için ortak yardımcı.
   ==============================================
   Sitede aynı desen çok yerde tekrar ediyordu:
     initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
   Bu desen framer-motion'ın satır içi transform'unu kullandığı için
   globals.css'teki prefers-reduced-motion kurallarından etkilenmiyordu.

   Hareket azaltma tercihi açıkken kayma ve gecikme kaldırılır; yalnızca çok
   kısa bir opaklık geçişi kalır (WCAG 2.3.3 — Animation from Interactions).

   Kullanım:
     const entrance = useEntrance();
     <motion.div {...entrance(24, 0.6, 0.2)}>…</motion.div> */
export function useEntrance() {
  const reduce = useReducedMotion();

  return function entrance(y = 24, duration = 0.6, delay = 0) {
    if (reduce) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.2 },
      } as const;
    }
    return {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-80px' },
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    } as const;
  };
}

/* Kaydırmaya bağlı (scroll-driven) hareketlerde kullanılır: tercih açıksa
   hareket dondurulur ve sabit bir değer döner. */
export function useMotionEnabled(): boolean {
  return !useReducedMotion();
}
