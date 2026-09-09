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
        'data-reveal': '',
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.2 },
      } as const;
    }
    return {
      /* ⚠ `data-reveal` GEREKLİ — süsleme değil.
         Gerekçesi globals.css'teki `[data-reveal]` kuralında yazılı:
         useReducedMotion() sunucu render'ında false döndüğü için `initial`
         içindeki y=24 ögeye yazılıyor ve JS'le geri alınamıyor. CSS medya
         sorgusu ilk boyamada doğru olduğu için kaymayı o sıfırlar. */
      'data-reveal': '',
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

/* ETKİLEŞİM SONRASI BELİRME — useEntrance'tan FARKLIDIR.

   useEntrance kaydırınca görünür olan bölümler içindir (whileInView).
   Bu ise kullanıcının bir eylemi sonrasında beliren içerik içindir:
   form gönderildikten sonraki başarı mesajı, sihirbazda adım değişimi.
   Orada `whileInView` değil `animate` kullanılır, çünkü öge zaten
   ekrandadır — beklenen şey görünürlük değil, geçiştir.

   Hareket azaltma açıkken kayma tamamen kaldırılır; yalnızca çok kısa bir
   opaklık geçişi kalır. Geçişi büsbütün kaldırmıyoruz: kullanıcının bir
   şeyin DEĞİŞTİĞİNİ fark etmesi gerekir (özellikle form başarı mesajında),
   ama bu 0,15 saniyelik bir solmayla yeterince anlatılır.

   Kullanım:
     const appear = useAppear();
     <motion.div {...appear(16)}>…</motion.div> */
export function useAppear() {
  const reduce = useReducedMotion();

  return function appear(y = 8, duration = 0.35) {
    if (reduce) {
      return {
        'data-reveal': '',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      } as const;
    }
    return {
      'data-reveal': '',
      initial: { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -y },
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    } as const;
  };
}
