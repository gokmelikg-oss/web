'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/* Kaydırınca beliren bölüm sarmalayıcısı.
   Sitedeki en yaygın hareket bileşenidir — neredeyse her sayfa bölümü bununla
   sarılıdır.

   ⚠ Hareket azaltma tercihi (prefers-reduced-motion) BURADA da uygulanır.
   globals.css'teki kurallar yalnızca CSS animasyonlarını (.aurora,
   .animate-marquee, .mesh-*) kapsıyor; framer-motion satır içi transform
   ürettiği için o kurallardan etkilenmiyordu. Tercihi açan kullanıcı yine de
   her bölümde kayma animasyonu görüyordu (WCAG 2.3.3). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  /* Hareket azaltılmışsa: kayma ve gecikme yok. İçerik neredeyse anında ve
     tam görünür gelir; yalnızca çok kısa bir opaklık geçişi kalır ki bölüm
     sınırları yine de algılansın. */
  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
