import type { Locale } from '@/i18n/config';

/* PROJE BAŞARI HİKÂYELERİ — /projeler/[slug] detay sayfalarının kaynağı
   ====================================================================
   ⚠ BİLİNÇLİ OLARAK BOŞ.

   `tokiProjects.json` içinde 526 proje kaydı var ama bunlar yalnızca sayısal
   künye (il, konut, kollektör, alan). Bir "case study" bundan fazlasını
   ister: problem, çözüm, sonuç ve gerçek saha fotoğrafı. Bu bilgi sizde.

   Öneri: hepsini değil, en güçlü 5-10 projeyi yazın. Az sayıda DOLU sayfa,
   çok sayıda boş sayfadan hem SEO hem satış açısından daha iyidir. */

export interface CaseStudy {
  /* URL parçası: 'mus-alparslan-universitesi' */
  slug: string;
  /* Proje adı, dile göre */
  title: Record<Locale, string>;
  location: string;          // 'Muş, Türkiye'
  year?: number;             // 2024
  projectType?: string;      // 'Üniversite yurdu' · 'Toplu konut' · 'Otel'
  /* Teknik künye — bilinen alanları doldurun */
  collectors?: number;       // kollektör adedi
  apertureM2?: number;       // ışınım (net) alan
  storageLiters?: number;    // toplam boyler kapasitesi
  systemType?: string;       // 'Merkezi solar termal' · 'Drain-back' · 'Termosifonik'
  productsUsed?: string[];   // products.ts slug'ları — iç link kurar
  /* Anlatı — case study'yi değerli kılan kısım */
  challenge?: Record<Locale, string>;  // Problem neydi?
  solution?: Record<Locale, string>;   // Nasıl çözdük?
  result?: Record<Locale, string>;     // Sonuç ne oldu?
  /* Saha fotoğrafları: ['/projects/mus-1.jpg', ...] */
  images?: string[];
  imageAlt?: Record<Locale, string>;
}

/* ─────────────────────────────────────────────────────────────────────
   ÖRNEK:

   {
     slug: 'jakarta-merkezi-sistem',
     title: { tr: 'Jakarta Merkezi Solar Termal Sistem', en: 'Jakarta Central Solar Thermal System', ar: '...', el: '...' },
     location: 'Jakarta, Endonezya',
     year: 2023,
     projectType: 'Otel',
     collectors: 350,
     apertureM2: 815.5,
     storageLiters: 15000,
     systemType: 'Merkezi solar termal',
     productsUsed: ['orion-435'],
     challenge: { tr: 'Tropik iklimde yıl boyu yüksek sıcak su ihtiyacı ve sınırlı çatı alanı.', en: '...', ar: '...', el: '...' },
     solution: { tr: '350 adet Orion 435 kollektör, 5 × 3.000 litre depolama ile merkezi sistem kuruldu.', en: '...', ar: '...', el: '...' },
     result: { tr: '...', en: '...', ar: '...', el: '...' },
     images: ['/projects/jakarta-1.jpg'],
   }
   ───────────────────────────────────────────────────────────────────── */

export const caseStudies: CaseStudy[] = [];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
