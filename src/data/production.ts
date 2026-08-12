import type { Locale } from '@/i18n/config';

/* ÜRETİM SÜREÇLERİ — /uretim sayfasının veri kaynağı
   ==================================================
   ⚠ BİLİNÇLİ OLARAK BOŞ. "Lazer kaynak yapıyoruz" gibi bir cümle, gerçekte
   o hat yoksa doğrudan yanlış beyandır. Hangi süreçlerin tesiste fiilen
   yapıldığını yalnızca siz bilirsiniz.

   Bu sayfanın SEO'dan çok GÜVEN işlevi vardır: gerçek üretici olduğunuzu
   gösterir. Bu yüzden stok fotoğraf değil, kendi tesisinizin fotoğrafları
   kullanılmalıdır. */

export interface ProductionStep {
  /* Sıra numarası — sayfada bu sırayla gösterilir */
  order: number;
  /* Süreç adı, dile göre: 'Absorber üretimi' / 'Absorber production' */
  title: Record<Locale, string>;
  /* Ne yapıldığını anlatan 1-3 cümle, dile göre */
  description: Record<Locale, string>;
  /* Tesis fotoğrafı: '/production/absorber.jpg' (public/production/ altına konur).
     Yoksa undefined bırakın — kart görselsiz basılır. */
  image?: string;
  /* Görsel alt metni (erişilebilirlik + görsel SEO), dile göre */
  imageAlt?: Record<Locale, string>;
}

/* ─────────────────────────────────────────────────────────────────────
   ÖRNEK — tesiste GERÇEKTEN yapılan adımlar için doldurun:

   {
     order: 1,
     title: { tr: 'Alüminyum profil üretimi', en: 'Aluminium profile extrusion', ar: '...', el: '...' },
     description: {
       tr: 'Kollektör kasası, grup bünyesindeki SMK Alüminyum tesisinde üretilen profillerden hazırlanır.',
       en: '...', ar: '...', el: '...',
     },
     image: '/production/aluminyum-profil.jpg',
     imageAlt: { tr: 'Şimşek Solar tesisinde alüminyum profil üretim hattı', en: '...', ar: '...', el: '...' },
   }

   Aday adımlar (hangileri sizde VAR, teyit edin):
   alüminyum profil · absorber üretimi · cam işleme · ultrasonik kaynak ·
   lazer kaynak · selektif kaplama · silikon uygulama · izolasyon · montaj ·
   sızdırmazlık testi · basınç testi · performans testi · paketleme · sevkiyat
   ───────────────────────────────────────────────────────────────────── */

export const productionSteps: ProductionStep[] = [];
