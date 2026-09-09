'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/* HAREKET AZALTMA — KÜTÜPHANE DÜZEYİNDE
   =====================================
   Bileşenlerde tek tek `useReducedMotion()` ile dallanma yapıyorduk. Gerçek
   tarayıcı ölçümü bunun YETMEDİĞİNİ gösterdi:

   `prefers-reduced-motion: reduce` açık bir tarayıcıda /tr/bayi sayfasında
   2 saniye sonra hâlâ 6 öge kaymış konumdaydı (translateY = 24px).

   Sebep: `useReducedMotion()` SUNUCU render'ında ve ilk istemci render'ında
   `false` döner — medya sorgusu ancak hidrasyondan sonra çözülür. framer-motion
   ise `initial` değerini yalnızca BAĞLANMA anında okur. Yani ilk render'da
   `initial={{ opacity: 0, y: 24 }}` uygulanıyor, kanca sonradan `true` dönse
   bile öge o transform'la kalıyordu. Ekranın altındaki ögeler hiç görünür
   alana girmediği için `whileInView` de tetiklenmiyor ve kayma kalıcı oluyordu.

   `MotionConfig reducedMotion="user"` bu işi kütüphanenin kendisine bırakır:
   framer-motion, animasyonu ÇALIŞTIRACAĞI anda medya sorgusunu okur ve
   transform ile layout animasyonlarını atlar; opaklık gibi güvenli
   özellikleri çalıştırmayı sürdürür. Render zamanlamasına bağlı değildir.

   ⚠ Bileşenlerdeki `useReducedMotion()` dallanmaları KALDIRILMADI. İkisi
   birlikte çalışır: bu sarmalayıcı doğruluğu garanti eder, bileşenlerdeki
   dallanma ise gecikmeleri (delay) de sıfırlayarak içeriği anında getirir. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
