/* Product photos for catalog items, keyed by `${familyId}-${groupIndex}`,
   arrays aligned with the item order in the locale message files. */
export const catalogImages: Record<string, (string | null)[]> = {
  'kolektorler-0': [
    '/products/orion-100.png',
    '/products/orion-200.jpg',
    '/products/orion-300.jpg',
    '/products/orion-400.jpg',
    '/products/orion-500.jpg',
    '/products/orion-600.jpg',
    null,
    null,
    null,
  ],
  'boylerler-0': [
    '/products/aquarious-500.jpg',
    '/products/aquarious-540.jpg',
    null,
    null,
    '/products/aquarious-740.jpg',
  ],
  'sehpalar-0': [
    '/products/sehpa-merkezi-2li.jpg',
    '/products/sehpa-merkezi-3lu.jpg',
    null,
    null,
    null,
    null,
  ],
  'sehpalar-1': [
    '/products/helios-120.jpg',
    '/products/helios-200s.jpg',
    '/products/helios-200l.jpg',
    '/products/helios-300s.jpg',
    '/products/helios-300l.jpg',
    null,
    null,
    '/products/sehpa-paket.jpg',
  ],
  'baglanti-0': [
    '/products/fleks-ara.jpg',
    '/products/fleks-kose.jpg',
    '/products/kor-tapa.jpg',
    '/products/solar-vana.jpg',
    '/products/hava-purjoru.jpg',
    null,
    null,
    null,
    null,
  ],
  // Otomasyon: markalı ürün illüstrasyonları (gerçek fotoğraf gelince değiştirilir).
  // Sıra: Kontaktörlü pano, Kartlı pano, AD598 kontrol, OEM pano.
  'otomasyon-0': [
    '/products/otomasyon-pano.svg',
    '/products/otomasyon-kontrol.svg',
    '/products/otomasyon-kontrol.svg',
    '/products/otomasyon-pano.svg',
  ],
};

/* One representative photo per family for overview cards. */
export const familyImages: Record<string, string> = {
  kolektorler: '/products/orion-500.jpg',
  boylerler: '/products/aquarious-740.jpg',
  sehpalar: '/products/sehpa-merkezi-3lu.jpg',
  baglanti: '/products/solar-vana.jpg',
  otomasyon: '/products/otomasyon-pano.svg',
};
