import raw from './tokiProjects.json';
import { HIDDEN_REFERENCE_TITLES } from './hiddenReferences';

export interface ReferenceProject {
  title: string;
  il: string;
  ilce: string;
  homes: number;
  blocks: number;
  collectors: number;
  aperture: number; // m² ışınım alanı (kollektör × 2,33)
  gross: number; // m² brüt alan (kollektör × 2,55)
  category?: string; // proje tipi anahtarı: konut|adalet|savunma|afad|emniyet|kamu|ozel
}

export interface ReferenceTotals {
  projects: number;
  homes: number;
  blocks: number;
  collectors: number;
  aperture: number;
  gross: number;
  provinces: number;
}

export const referenceProjects = raw.projects as ReferenceProject[];
export const referenceTotals = raw.totals as ReferenceTotals;

/* Listede gösterilecek projeler — gizlenenler çıkarılır. Toplam ölçek
   (referenceTotals) ve çevresel etki hâlâ TÜM projeleri sayar; yalnızca
   liste süzülür. Gizlemek için: src/data/hiddenReferences.ts */
const hiddenSet = new Set(HIDDEN_REFERENCE_TITLES.map((t) => t.trim()));
export const visibleReferenceProjects = referenceProjects.filter(
  (p) => !hiddenSet.has(p.title.trim())
);

/*
 * Çevresel etki varsayımları — muhafazakâr seçildi ve sayfada açıkça belirtilir.
 *
 * YIELD: Türkiye ortalamasında düz yüzeyli kolektörün ışınım alanı başına
 *   yıllık faydalı ısı üretimi (kWh/m²·yıl). ~1.100 kWh/m² güneşlenme ve
 *   ~%50 sistem verimi kabulüyle 500 alındı.
 * CO2_PER_KWH: Doğal gazlı ısıtmanın yerini alması hâlinde önlenen emisyon
 *   (kg CO₂/kWh). Elektrikli ısıtmada bu değer ~2 kat yükselir; düşük olan
 *   senaryo tercih edildi.
 * TREE_CO2: Olgun bir ağacın yıllık ortalama CO₂ tutumu (kg/yıl).
 * HOME_KWH: Ortalama bir hanenin yıllık sıcak su enerjisi tüketimi (kWh/yıl).
 */
export const IMPACT_ASSUMPTIONS = {
  yieldPerM2: 500,
  co2PerKwh: 0.202,
  treeCo2PerYear: 22,
  homeKwhPerYear: 3000,
} as const;

export interface EnvironmentalImpact {
  annualKwh: number;
  annualMwh: number;
  annualGwh: number;
  co2TonsPerYear: number;
  treeEquivalent: number;
  homeEquivalent: number;
}

export function computeImpact(apertureM2: number): EnvironmentalImpact {
  const annualKwh = apertureM2 * IMPACT_ASSUMPTIONS.yieldPerM2;
  const co2Kg = annualKwh * IMPACT_ASSUMPTIONS.co2PerKwh;
  return {
    annualKwh,
    annualMwh: annualKwh / 1000,
    annualGwh: annualKwh / 1_000_000,
    co2TonsPerYear: co2Kg / 1000,
    treeEquivalent: co2Kg / IMPACT_ASSUMPTIONS.treeCo2PerYear,
    homeEquivalent: annualKwh / IMPACT_ASSUMPTIONS.homeKwhPerYear,
  };
}

export const totalImpact = computeImpact(referenceTotals.aperture);

/* İl bazında özet — filtre listesi ve il kartları için. */
export interface ProvinceSummary {
  il: string;
  projects: number;
  homes: number;
  collectors: number;
  aperture: number;
}

export const provinceSummaries: ProvinceSummary[] = Object.values(
  visibleReferenceProjects.reduce<Record<string, ProvinceSummary>>((acc, p) => {
    acc[p.il] ??= { il: p.il, projects: 0, homes: 0, collectors: 0, aperture: 0 };
    acc[p.il].projects += 1;
    acc[p.il].homes += p.homes;
    acc[p.il].collectors += p.collectors;
    acc[p.il].aperture += p.aperture;
    return acc;
  }, {})
).sort((a, b) => b.collectors - a.collectors);
