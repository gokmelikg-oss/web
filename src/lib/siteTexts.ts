import { FOUNDED_YEAR } from './companyFacts';

/* Site genelinde admin panelinden düzenlenebilir metinler.
   Her alanın bir anahtarı (key), grubu, etiketi ve VARSAYILAN metni vardır.
   Sayfalar `txt(texts, key)` ile önce override'a, yoksa varsayılana bakar. */

export interface TextField {
  key: string;
  group: string;
  label: string;
  default: string;
  multiline?: boolean;
}

export const TEXT_FIELDS: TextField[] = [
  // Ana sayfa hero
  { key: 'hero.eyebrow', group: 'Ana Sayfa — Hero', label: 'Üst etiket', default: `${FOUNDED_YEAR}'den beri — Mersin'den dünyaya` },
  { key: 'hero.titleLine1', group: 'Ana Sayfa — Hero', label: 'Başlık — 1. satır', default: 'Enerjiyi doğadan alır,' },
  { key: 'hero.titleLine2', group: 'Ana Sayfa — Hero', label: 'Başlık — 2. satır (vurgulu)', default: 'geleceğe taşırız.' },
  {
    key: 'hero.subtitle',
    group: 'Ana Sayfa — Hero',
    label: 'Alt metin',
    multiline: true,
    default:
      // ⚠ "35 yılı aşkın" MARKA SLOGANIDIR — kuruluş yılından hesaplanmaz.
      // Kullanıcı kararı (12.08.2026): bilinçli korunur, "düzeltilmez".
      "Şimşek Solar; 35 yılı aşkın üretim birikimiyle güneş enerjisi sistemlerini Mersin'deki entegre tesislerinde tasarlar, üretir ve dünyanın dört bir yanına ulaştırır. Ar-Ge'den üretime, proje mühendisliğinden satış sonrası hizmetlere uzanan tüm değer zinciri tek çatı altında yönetilir.",
  },

  // Misyon & Vizyon
  {
    key: 'about.mission.quote',
    group: 'Misyon & Vizyon',
    label: 'Misyon — alıntı',
    multiline: true,
    default: 'Enerjiyi sadece bir ihtiyaç değil, yaşamı sürdüren görünmez bir güç olarak görüyoruz.',
  },
  {
    key: 'about.mission.body',
    group: 'Misyon & Vizyon',
    label: 'Misyon — açıklama',
    multiline: true,
    default:
      'Yenilenebilir enerjiyi herkes için erişilebilir, güvenilir ve dayanıklı hâle getiren çözümler geliştiriyoruz. Her proje; bir haneye konfor, bir işletmeye istikrar ve çocukların geleceğine fırsat sunmak demek.',
  },
  {
    key: 'about.vision.quote',
    group: 'Misyon & Vizyon',
    label: 'Vizyon — alıntı',
    multiline: true,
    default: 'Geleceğin daha temiz, daha özgür ve daha nefes alınabilir bir dünya olduğuna inanıyoruz.',
  },
  {
    key: 'about.vision.body',
    group: 'Misyon & Vizyon',
    label: 'Vizyon — açıklama',
    multiline: true,
    default:
      "Evlerin, şehirlerin ve hayatların enerjisini doğanın gücüyle birleştirerek Türkiye'nin enerji dönüşümüne katkı sağlıyor; geliştirdiğimiz teknolojilerle düşük karbonlu bir gelecek inşa ediyoruz.",
  },

  // Hakkımızda — hikaye
  { key: 'about.story.title', group: 'Hakkımızda', label: 'Hikaye — başlık', default: 'Hikayemiz' },
  {
    key: 'about.story.body1',
    group: 'Hakkımızda',
    label: 'Hikaye — paragraf 1',
    multiline: true,
    default:
      "Mersin'in güneş potansiyelini değerlendirmek amacıyla kurulan Şimşek, bugün dört şirketli bir grup yapısına ve yılda binlerce üniteyi bulan üretim kapasitesine ulaştı. Kuruluşumuzdan bu yana amacımız değişmedi: dayanıklı, verimli ve bakım maliyeti düşük sistemler üretmek.",
  },
  {
    key: 'about.story.body2',
    group: 'Hakkımızda',
    label: 'Hikaye — paragraf 2',
    multiline: true,
    default:
      'Bugün ürünlerimiz askeri tesisler, oteller, hastaneler ve toplu konut projelerinin yanı sıra ihracat pazarlarında da yer alıyor. Ar-Ge ekibimiz; ürün dayanıklılığı, montaj kolaylığı ve sistem verimliliği başlıklarında geliştirme çalışmalarını sürdürüyor.',
  },

  // İletişim
  {
    key: 'contact.address',
    group: 'İletişim',
    label: 'Adres',
    multiline: true,
    default: '2. Organize Sanayi Bölgesi Rasim Dokur Bulvarı No:32, Akdeniz, Mersin, Türkiye',
  },
  { key: 'contact.phone', group: 'İletişim', label: 'Telefon', default: '+90 324 324 12 35' },
  { key: 'contact.email', group: 'İletişim', label: 'E-posta', default: 'info@simseksolar.com.tr' },
  { key: 'contact.hours', group: 'İletişim', label: 'Çalışma saatleri', default: 'Pazartesi – Cuma, 08:00 – 18:00' },
];

const DEFAULTS = new Map(TEXT_FIELDS.map((f) => [f.key, f.default]));

/* Override varsa onu, yoksa fallback'i, o da yoksa registry varsayılanını döndürür. */
export function txt(texts: Record<string, string> | undefined, key: string, fallback?: string): string {
  const v = texts?.[key];
  if (v && v.trim()) return v;
  if (fallback !== undefined) return fallback;
  return DEFAULTS.get(key) ?? '';
}

/* Grup sırası (admin panelinde düzenli göstermek için). */
export const TEXT_GROUPS = Array.from(new Set(TEXT_FIELDS.map((f) => f.group)));
