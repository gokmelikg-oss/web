export type ProductCategory = 'collector' | 'boiler' | 'package' | 'smart';

export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  slug: string;
  category: ProductCategory;
  model: string;
  gradient: string;
  specs: ProductSpec[];
}

/* Ürün görseli — mevcutsa gerçek fotoğraf, yoksa (undefined) zarif ikon fallback. */
export const productImages: Record<string, string | undefined> = {
  'orion-300': '/products/orion-300.jpg',
  'orion-500': '/products/orion-500.jpg',
  'aquarious-500': '/products/aquarious-500.jpg',
  'aquarious-600': '/products/aquarious-740.jpg',
  'helios-200l': '/products/helios-200l.jpg',
  'helios-300l': '/products/helios-300l.jpg',
  'simsek-track': undefined,
  'akilli-kontrolor': undefined,
};

export const products: Product[] = [
  {
    slug: 'orion-300',
    category: 'collector',
    model: 'ORION-300',
    gradient: 'from-volt-500 via-volt-600 to-graphite-900',
    specs: [
      { key: 'absorberArea', value: '2.30 m²' },
      { key: 'coating', value: 'Selektif (Ti-N) kaplama, α ≥ %95' },
      { key: 'glazing', value: '4 mm temperli düşük demirli cam' },
      { key: 'frame', value: 'Eloksallı alüminyum profil' },
      { key: 'insulation', value: '40 mm taş yünü' },
      { key: 'maxPressure', value: '10 bar' },
      { key: 'stagnationTemp', value: '195 °C' },
      { key: 'efficiency', value: 'η₀ = 0.77' },
      { key: 'weight', value: '36 kg' },
      { key: 'dimensions', value: '2000 × 1150 × 90 mm' },
    ],
  },
  {
    slug: 'orion-500',
    category: 'collector',
    model: 'ORION-500',
    gradient: 'from-graphite-600 via-graphite-800 to-graphite-950',
    specs: [
      { key: 'absorberArea', value: '2.51 m²' },
      { key: 'coating', value: 'Selektif (Ti-N) kaplama, α ≥ %95' },
      { key: 'glazing', value: '4 mm temperli düşük demirli cam' },
      { key: 'frame', value: 'Eloksallı alüminyum profil' },
      { key: 'insulation', value: '45 mm taş yünü' },
      { key: 'maxPressure', value: '10 bar' },
      { key: 'stagnationTemp', value: '202 °C' },
      { key: 'efficiency', value: 'η₀ = 0.79' },
      { key: 'weight', value: '40 kg' },
      { key: 'dimensions', value: '2100 × 1200 × 95 mm' },
    ],
  },
  {
    slug: 'aquarious-500',
    category: 'boiler',
    model: 'AQUARIOUS-500',
    gradient: 'from-mist-400 via-volt-700 to-graphite-950',
    specs: [
      { key: 'capacity', value: '500 L' },
      { key: 'tankMaterial', value: 'St 37-2, iç yüzey cam emaye (DIN 4753)' },
      { key: 'coil', value: 'Çift serpantin (güneş + destek ısıtma)' },
      { key: 'anode', value: 'Magnezyum koruyucu anot' },
      { key: 'insulation', value: '60 mm CFC\'siz PU köpük' },
      { key: 'standbyLoss', value: '≤ 2.2 kWh/24s' },
      { key: 'maxPressure', value: '8 bar' },
      { key: 'dimensions', value: 'Ø650 × 1750 mm' },
    ],
  },
  {
    slug: 'aquarious-600',
    category: 'boiler',
    model: 'AQUARIOUS-600',
    gradient: 'from-mist-400 via-volt-700 to-graphite-950',
    specs: [
      { key: 'capacity', value: '600 L' },
      { key: 'tankMaterial', value: 'St 37-2, iç yüzey cam emaye (DIN 4753)' },
      { key: 'coil', value: 'Çift serpantin (güneş + destek ısıtma)' },
      { key: 'anode', value: 'Magnezyum koruyucu anot' },
      { key: 'insulation', value: '60 mm CFC\'siz PU köpük' },
      { key: 'standbyLoss', value: '≤ 2.6 kWh/24s' },
      { key: 'maxPressure', value: '8 bar' },
      { key: 'dimensions', value: 'Ø650 × 2000 mm' },
    ],
  },
  {
    slug: 'helios-200l',
    category: 'package',
    model: 'HELIOS-200L',
    gradient: 'from-volt-400 via-volt-600 to-graphite-900',
    specs: [
      { key: 'boilerCapacity', value: '200 L emaye boyler' },
      { key: 'collectorArea', value: '2 × Orion 300 düz yüzey kolektör' },
      { key: 'householdSize', value: '4-5 kişilik hane için önerilir' },
      { key: 'mountingKit', value: 'Eğik/düz çatı montaj kiti dahil' },
      { key: 'circulation', value: 'Basınçlı zorlamalı sirkülasyon' },
      { key: 'warranty', value: '10 yıl boyler, 5 yıl kolektör garantisi' },
    ],
  },
  {
    slug: 'helios-300l',
    category: 'package',
    model: 'HELIOS-300L',
    gradient: 'from-volt-400 via-volt-600 to-graphite-900',
    specs: [
      { key: 'boilerCapacity', value: '300 L emaye boyler' },
      { key: 'collectorArea', value: '3 × Orion 300 düz yüzey kolektör' },
      { key: 'householdSize', value: '6-8 kişilik hane / küçük ticari tesis' },
      { key: 'mountingKit', value: 'Eğik/düz çatı montaj kiti dahil' },
      { key: 'circulation', value: 'Basınçlı zorlamalı sirkülasyon' },
      { key: 'warranty', value: '10 yıl boyler, 5 yıl kolektör garantisi' },
    ],
  },
  {
    slug: 'simsek-track',
    category: 'smart',
    model: 'ŞTRACK-01',
    gradient: 'from-graphite-600 via-graphite-800 to-graphite-950',
    specs: [
      { key: 'connectivity', value: 'Wi-Fi / GSM (4G) / Ethernet' },
      { key: 'sensors', value: '8 × PT1000 sıcaklık, 2 × debi, 1 × ışınım' },
      { key: 'protocol', value: 'Modbus RTU/TCP, MQTT, BACnet' },
      { key: 'power', value: '24V DC, 12W' },
      { key: 'display', value: 'Web ve mobil panel + 4.3" yerel ekran' },
      { key: 'warranty', value: '3 yıl cihaz garantisi' },
    ],
  },
  {
    slug: 'akilli-kontrolor',
    category: 'smart',
    model: 'ŞSC-100',
    gradient: 'from-graphite-700 via-graphite-900 to-graphite-950',
    specs: [
      { key: 'connectivity', value: 'Wi-Fi / RS-485' },
      { key: 'sensors', value: '4 × PT1000 sıcaklık girişi' },
      { key: 'protocol', value: 'Modbus RTU, OpenTherm (destek ısıtma)' },
      { key: 'power', value: '230V AC, 6W' },
      { key: 'mounting', value: 'DIN ray / duvar tipi' },
      { key: 'warranty', value: '3 yıl cihaz garantisi' },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/* Ürün bazlı belgeler yalnızca üç başlıkta toplanır: teknik föy,
   teknik çizim (PDF) ve kurulum kılavuzu. Sertifikalar ürün altında değil,
   Kaynaklar sayfasında ayrı bir bölümde listelenir. */
export const productDocTypes = ['datasheet', 'drawing', 'manual'] as const;

export interface ProductDocument {
  id: string;
  productSlug: string;
  type: 'datasheet' | 'drawing' | 'manual';
  format: string;
}

export function getProductDocuments(slug: string): ProductDocument[] {
  return productDocTypes.map((type) => ({
    id: `${slug}-${type}`,
    productSlug: slug,
    type,
    format: 'PDF',
  }));
}
