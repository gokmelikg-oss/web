/* İllere göre güneş enerjisi potansiyeli.
   Değerler, Türkiye Güneş Enerjisi Potansiyel Atlası'nın (GEPA) bölgesel
   ortalamalarına dayalı YAKLAŞIK değerlerdir; kesin proje verisi için saha
   etüdü/keşif gereklidir. radiation: yıllık toplam ışınım (kWh/m²·yıl),
   sunshine: yıllık güneşlenme süresi (saat/yıl). */

export interface Region {
  name: string;
  radiation: number;
  sunshine: number;
}

export const REGIONS: Record<string, Region> = {
  guneydogu: { name: 'Güneydoğu Anadolu', radiation: 1460, sunshine: 2993 },
  akdeniz: { name: 'Akdeniz', radiation: 1390, sunshine: 2923 },
  dogu: { name: 'Doğu Anadolu', radiation: 1365, sunshine: 2664 },
  icAnadolu: { name: 'İç Anadolu', radiation: 1314, sunshine: 2628 },
  ege: { name: 'Ege', radiation: 1304, sunshine: 2726 },
  marmara: { name: 'Marmara', radiation: 1168, sunshine: 2528 },
  karadeniz: { name: 'Karadeniz', radiation: 1120, sunshine: 1971 },
};

export interface Province {
  slug: string;
  name: string;
  region: keyof typeof REGIONS;
}

/* 81 il — bölge eşlemesiyle. */
export const PROVINCES: Province[] = [
  { slug: 'adana', name: 'Adana', region: 'akdeniz' },
  { slug: 'adiyaman', name: 'Adıyaman', region: 'guneydogu' },
  { slug: 'afyonkarahisar', name: 'Afyonkarahisar', region: 'ege' },
  { slug: 'agri', name: 'Ağrı', region: 'dogu' },
  { slug: 'aksaray', name: 'Aksaray', region: 'icAnadolu' },
  { slug: 'amasya', name: 'Amasya', region: 'karadeniz' },
  { slug: 'ankara', name: 'Ankara', region: 'icAnadolu' },
  { slug: 'antalya', name: 'Antalya', region: 'akdeniz' },
  { slug: 'ardahan', name: 'Ardahan', region: 'dogu' },
  { slug: 'artvin', name: 'Artvin', region: 'karadeniz' },
  { slug: 'aydin', name: 'Aydın', region: 'ege' },
  { slug: 'balikesir', name: 'Balıkesir', region: 'marmara' },
  { slug: 'bartin', name: 'Bartın', region: 'karadeniz' },
  { slug: 'batman', name: 'Batman', region: 'guneydogu' },
  { slug: 'bayburt', name: 'Bayburt', region: 'karadeniz' },
  { slug: 'bilecik', name: 'Bilecik', region: 'marmara' },
  { slug: 'bingol', name: 'Bingöl', region: 'dogu' },
  { slug: 'bitlis', name: 'Bitlis', region: 'dogu' },
  { slug: 'bolu', name: 'Bolu', region: 'karadeniz' },
  { slug: 'burdur', name: 'Burdur', region: 'akdeniz' },
  { slug: 'bursa', name: 'Bursa', region: 'marmara' },
  { slug: 'canakkale', name: 'Çanakkale', region: 'marmara' },
  { slug: 'cankiri', name: 'Çankırı', region: 'icAnadolu' },
  { slug: 'corum', name: 'Çorum', region: 'karadeniz' },
  { slug: 'denizli', name: 'Denizli', region: 'ege' },
  { slug: 'diyarbakir', name: 'Diyarbakır', region: 'guneydogu' },
  { slug: 'duzce', name: 'Düzce', region: 'karadeniz' },
  { slug: 'edirne', name: 'Edirne', region: 'marmara' },
  { slug: 'elazig', name: 'Elazığ', region: 'dogu' },
  { slug: 'erzincan', name: 'Erzincan', region: 'dogu' },
  { slug: 'erzurum', name: 'Erzurum', region: 'dogu' },
  { slug: 'eskisehir', name: 'Eskişehir', region: 'icAnadolu' },
  { slug: 'gaziantep', name: 'Gaziantep', region: 'guneydogu' },
  { slug: 'giresun', name: 'Giresun', region: 'karadeniz' },
  { slug: 'gumushane', name: 'Gümüşhane', region: 'karadeniz' },
  { slug: 'hakkari', name: 'Hakkari', region: 'dogu' },
  { slug: 'hatay', name: 'Hatay', region: 'akdeniz' },
  { slug: 'igdir', name: 'Iğdır', region: 'dogu' },
  { slug: 'isparta', name: 'Isparta', region: 'akdeniz' },
  { slug: 'istanbul', name: 'İstanbul', region: 'marmara' },
  { slug: 'izmir', name: 'İzmir', region: 'ege' },
  { slug: 'kahramanmaras', name: 'Kahramanmaraş', region: 'akdeniz' },
  { slug: 'karabuk', name: 'Karabük', region: 'karadeniz' },
  { slug: 'karaman', name: 'Karaman', region: 'icAnadolu' },
  { slug: 'kars', name: 'Kars', region: 'dogu' },
  { slug: 'kastamonu', name: 'Kastamonu', region: 'karadeniz' },
  { slug: 'kayseri', name: 'Kayseri', region: 'icAnadolu' },
  { slug: 'kilis', name: 'Kilis', region: 'guneydogu' },
  { slug: 'kirikkale', name: 'Kırıkkale', region: 'icAnadolu' },
  { slug: 'kirklareli', name: 'Kırklareli', region: 'marmara' },
  { slug: 'kirsehir', name: 'Kırşehir', region: 'icAnadolu' },
  { slug: 'kocaeli', name: 'Kocaeli', region: 'marmara' },
  { slug: 'konya', name: 'Konya', region: 'icAnadolu' },
  { slug: 'kutahya', name: 'Kütahya', region: 'ege' },
  { slug: 'malatya', name: 'Malatya', region: 'dogu' },
  { slug: 'manisa', name: 'Manisa', region: 'ege' },
  { slug: 'mardin', name: 'Mardin', region: 'guneydogu' },
  { slug: 'mersin', name: 'Mersin', region: 'akdeniz' },
  { slug: 'mugla', name: 'Muğla', region: 'ege' },
  { slug: 'mus', name: 'Muş', region: 'dogu' },
  { slug: 'nevsehir', name: 'Nevşehir', region: 'icAnadolu' },
  { slug: 'nigde', name: 'Niğde', region: 'icAnadolu' },
  { slug: 'ordu', name: 'Ordu', region: 'karadeniz' },
  { slug: 'osmaniye', name: 'Osmaniye', region: 'akdeniz' },
  { slug: 'rize', name: 'Rize', region: 'karadeniz' },
  { slug: 'sakarya', name: 'Sakarya', region: 'marmara' },
  { slug: 'samsun', name: 'Samsun', region: 'karadeniz' },
  { slug: 'siirt', name: 'Siirt', region: 'guneydogu' },
  { slug: 'sinop', name: 'Sinop', region: 'karadeniz' },
  { slug: 'sivas', name: 'Sivas', region: 'icAnadolu' },
  { slug: 'sanliurfa', name: 'Şanlıurfa', region: 'guneydogu' },
  { slug: 'sirnak', name: 'Şırnak', region: 'guneydogu' },
  { slug: 'tekirdag', name: 'Tekirdağ', region: 'marmara' },
  { slug: 'tokat', name: 'Tokat', region: 'karadeniz' },
  { slug: 'trabzon', name: 'Trabzon', region: 'karadeniz' },
  { slug: 'tunceli', name: 'Tunceli', region: 'dogu' },
  { slug: 'usak', name: 'Uşak', region: 'ege' },
  { slug: 'van', name: 'Van', region: 'dogu' },
  { slug: 'yalova', name: 'Yalova', region: 'marmara' },
  { slug: 'yozgat', name: 'Yozgat', region: 'icAnadolu' },
  { slug: 'zonguldak', name: 'Zonguldak', region: 'karadeniz' },
];

/* Hesap varsayımları — güneş termal sistem. */
export const CALC = {
  systemEfficiency: 0.5, // kollektör yıllık ortalama sistem verimi
  homeAperture: 2.5, // tipik tek hane paket sistem ışınım alanı (m²)
  co2PerKwh: 0.2, // doğal gaz ikamesi (kg CO₂/kWh)
};

export interface ProvinceData {
  slug: string;
  name: string;
  region: Region;
  radiation: number;
  sunshine: number;
  annualPerM2: number; // yıllık kullanılabilir ısı (kWh/m²)
  homeAnnual: number; // tek hane paket sistem yıllık üretim (kWh)
  homeCo2: number; // tek hane yıllık önlenen CO₂ (kg)
}

export function getProvinceData(slug: string): ProvinceData | undefined {
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) return undefined;
  const region = REGIONS[p.region];
  const annualPerM2 = Math.round(region.radiation * CALC.systemEfficiency);
  const homeAnnual = Math.round(region.radiation * CALC.homeAperture * CALC.systemEfficiency);
  const homeCo2 = Math.round(homeAnnual * CALC.co2PerKwh);
  return {
    slug: p.slug,
    name: p.name,
    region,
    radiation: region.radiation,
    sunshine: region.sunshine,
    annualPerM2,
    homeAnnual,
    homeCo2,
  };
}

/* Türkçe alfabetik sıralı iller (seçici için). */
export const PROVINCES_SORTED = [...PROVINCES].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
