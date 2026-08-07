import { getProvinceData, CALC } from '@/data/provinces';

/* Güneş termal sistem boyutlandırma + üretim/tasarruf tahmini.
   Tüm varsayımlar burada, tek yerde ve açıkça tanımlıdır; sonuç ekranında
   şeffaflık için kullanıcıya gösterilir. Değerler YAKLAŞIKTIR; kesin proje
   için saha etüdü gerekir. Para/geri ödeme, kullanıcının görebildiği
   düzenlenebilir enerji fiyatı varsayımına dayanır — abartılı iddia yok. */

export const CALC_ASSUMPTIONS = {
  litersPerPerson: { low: 40, normal: 50, high: 60 }, // L/kişi/gün
  deltaT: 30, // ısıtma sıcaklık farkı (°C) — ~15°C → ~45°C
  kwhPerLiterPerK: 0.001163, // 1,163 Wh/(L·K)
  daysPerYear: 365,
  aperturePerCollector: 2.33, // Orion ışınım alanı (m²/adet)
  boilerSizes: [150, 200, 300, 500], // standart emayeli boyler kapasiteleri (L)
  centralThreshold: 500, // bu litrenin üstünde merkezi sistem önerilir
  maxCoverage: 0.9, // güneşin karşılayabileceği pratik üst sınır (yıllık)
  defaultEnergyPrice: 2.5, // TL/kWh — kullanıcı değiştirebilir
  co2PerKwh: CALC.co2PerKwh, // 0,2 kg/kWh (doğal gaz ikamesi)
  treeCo2PerYear: 22, // kg/yıl
} as const;

export type Usage = 'low' | 'normal' | 'high';

export interface CalcInput {
  people: number;
  provinceSlug: string;
  usage: Usage;
  energyPrice?: number; // TL/kWh (opsiyonel; yoksa varsayılan)
}

export interface CalcResult {
  provinceName: string;
  dailyLiters: number;
  annualDemandKwh: number;
  central: boolean; // merkezi sistem önerisi (büyük talep)
  boilerLiters: number;
  collectorCount: number;
  apertureM2: number;
  annualSolarKwh: number; // yıllık faydalı güneş ısısı
  coveragePct: number; // sıcak su ihtiyacının güneşle karşılanan yüzdesi
  co2Kg: number;
  treeEq: number;
  annualSaving: number; // TL/yıl (enerji fiyatı varsayımıyla)
  energyPrice: number;
  paybackRange: [number, number]; // yıl aralığı (nitel, bölgeye göre)
  packageModel: string | null; // önerilen paket model (Helios) veya null (merkezi)
}

function pickBoiler(dailyLiters: number): { liters: number; central: boolean } {
  const { boilerSizes, centralThreshold } = CALC_ASSUMPTIONS;
  if (dailyLiters > centralThreshold) return { liters: centralThreshold, central: true };
  const fit = boilerSizes.find((s) => s >= dailyLiters);
  return { liters: fit ?? boilerSizes[boilerSizes.length - 1], central: false };
}

/* Bölge ışınımına göre nitel geri ödeme aralığı (yıl). */
function paybackFor(radiation: number): [number, number] {
  if (radiation >= 1380) return [2, 4];
  if (radiation >= 1280) return [3, 5];
  if (radiation >= 1150) return [4, 6];
  return [5, 7];
}

function packageFor(liters: number, central: boolean): string | null {
  if (central) return null;
  if (liters <= 200) return 'Helios 200L';
  if (liters <= 300) return 'Helios 300L';
  return null;
}

export function computeSystem(input: CalcInput): CalcResult | null {
  const data = getProvinceData(input.provinceSlug);
  if (!data) return null;
  const A = CALC_ASSUMPTIONS;
  const people = Math.max(1, Math.min(20, Math.round(input.people)));
  const perPerson = A.litersPerPerson[input.usage];

  const dailyLiters = people * perPerson;
  const annualDemandKwh = Math.round(dailyLiters * A.daysPerYear * A.deltaT * A.kwhPerLiterPerK);

  const { liters: boilerLiters, central } = pickBoiler(dailyLiters);

  // Yıllık faydalı üretim / m² (bölge ışınımı × sistem verimi) — il verisiyle aynı model.
  const annualPerM2 = data.annualPerM2;
  const targetSolarKwh = annualDemandKwh * A.maxCoverage;
  const apertureNeeded = targetSolarKwh / annualPerM2;
  const collectorCount = Math.max(1, Math.ceil(apertureNeeded / A.aperturePerCollector));
  const apertureM2 = Math.round(collectorCount * A.aperturePerCollector * 10) / 10;

  const rawProduction = apertureM2 * annualPerM2;
  const annualSolarKwh = Math.round(Math.min(rawProduction, annualDemandKwh * A.maxCoverage));
  const coveragePct = Math.min(Math.round(A.maxCoverage * 100), Math.round((annualSolarKwh / annualDemandKwh) * 100));

  const co2Kg = Math.round(annualSolarKwh * A.co2PerKwh);
  const treeEq = Math.round(co2Kg / A.treeCo2PerYear);

  const energyPrice = input.energyPrice && input.energyPrice > 0 ? input.energyPrice : A.defaultEnergyPrice;
  const annualSaving = Math.round(annualSolarKwh * energyPrice);

  return {
    provinceName: data.name,
    dailyLiters,
    annualDemandKwh,
    central,
    boilerLiters,
    collectorCount,
    apertureM2,
    annualSolarKwh,
    coveragePct,
    co2Kg,
    treeEq,
    annualSaving,
    energyPrice,
    paybackRange: paybackFor(data.radiation),
    packageModel: packageFor(boilerLiters, central),
  };
}
