import fs from 'fs';
import path from 'path';

/* Admin panelinden yönetilen içerik.
   Depolama stratejisi (otomatik seçilir):
   - Vercel KV (Upstash Redis) ortam değişkenleri tanımlıysa → KV kullanılır (Vercel'de kalıcı).
     Gerekli env: KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV store bağlanınca otomatik gelir).
   - Aksi halde → yerel dosya (content/site.json). VPS/Node ve local geliştirmede kalıcıdır.
   Böylece kod değişmeden hem Vercel hem kendi sunucunuz desteklenir. */

export interface DocLink {
  id: string;
  name: string;
  url: string;
  type?: string;
}

export interface RefEntry {
  id: string;
  title: string;
  il: string;
  ilce?: string;
  homes?: number;
  collectors?: number;
}

/* Admin panelinden yönetilen ürün. */
export interface ProductSpecItem {
  label: string;
  value: string;
}
export interface AdminProduct {
  id: string;
  name: string;
  category: string; // Kolektör, Boyler, Sehpa, Bağlantı, Otomasyon vb.
  model?: string;
  description?: string;
  image?: string; // /products/... yolu
  specs?: ProductSpecItem[]; // teknik özellikler (etiket + değer)
  /* Yayın durumu. Tanımsız = yayında (eski kayıtlar bozulmasın diye). */
  published?: boolean;
}

/* Admin panelinden eklenen blog yazısı. body düz metin; boş satır = yeni paragraf,
   "## " ile başlayan satır = ara başlık. */
export interface AdminPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string; // YYYY-MM-DD
  cover?: string;
  body?: string;
  /* Yayın durumu. Tanımsız = yayında (eski kayıtlar bozulmasın diye). */
  published?: boolean;
}

/* Bir kayıt sitede görünmeli mi? published yoksa görünür sayılır. */
export function isPublished(item: { published?: boolean }): boolean {
  return item.published !== false;
}

export interface SiteContent {
  documents: DocLink[];
  references: RefEntry[];
  products: AdminProduct[];
  posts: AdminPost[];
  hiddenRefs: string[]; // gizlenecek statik referansların iş adları
  /* Varsayılan dilin (tr) metin geçersiz kılmaları — geriye dönük uyumluluk için korunur. */
  texts: Record<string, string>; // site metin geçersiz kılmaları (key -> metin)
  /* Diğer dillerin metin geçersiz kılmaları: locale -> (key -> metin).
     Bir dilde karşılığı yoksa o dilin kendi mesaj dosyasındaki varsayılan kullanılır. */
  textsByLocale?: Record<string, Record<string, string>>;
  groupImages: Record<string, string>; // familyId -> görsel yolu
  updatedAt: string;
}

/* Verilen dil için geçerli metin geçersiz kılmaları.
   tr → `texts` (eski alan), diğer diller → `textsByLocale[locale]`. */
export function textsFor(content: SiteContent, locale: string): Record<string, string> {
  if (locale === 'tr') return content.texts ?? {};
  return content.textsByLocale?.[locale] ?? {};
}

const FILE = path.join(process.cwd(), 'content', 'site.json');
const FILE_PREV = path.join(process.cwd(), 'content', 'site.prev.json');
const KV_KEY = 'site:content';
const KV_KEY_PREV = 'site:content:prev';

const DEFAULT: SiteContent = {
  documents: [],
  references: [],
  products: [],
  posts: [],
  hiddenRefs: [],
  texts: {},
  textsByLocale: {},
  groupImages: {},
  updatedAt: '',
};

function kvEnabled(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/* @vercel/kv yalnızca gerektiğinde yüklenir (env yoksa hiç import edilmez). */
async function kvClient() {
  const { kv } = await import('@vercel/kv');
  return kv;
}

export async function getContent(): Promise<SiteContent> {
  if (kvEnabled()) {
    try {
      const data = await (await kvClient()).get<SiteContent>(KV_KEY);
      return data ? { ...DEFAULT, ...data } : DEFAULT;
    } catch (err) {
      console.error('KV getContent hatası', err);
      return DEFAULT;
    }
  }
  try {
    const raw = fs.readFileSync(FILE, 'utf8');
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

/* Sürüm geçmişi: her kaydetmede bir öncekinin fotoğrafı saklanır.
   En yeni başta; MAX_VERSIONS'tan eskiler düşer. */
export interface ContentVersion {
  at: string;
  by: string;
  summary: string;
  content: SiteContent;
}
const VERSIONS_FILE = path.join(process.cwd(), 'content', 'versions.json');
const KV_KEY_VERSIONS = 'site:content:versions';
const MAX_VERSIONS = 10;

export async function listVersions(): Promise<ContentVersion[]> {
  if (kvEnabled()) {
    try {
      return (await (await kvClient()).get<ContentVersion[]>(KV_KEY_VERSIONS)) ?? [];
    } catch {
      return [];
    }
  }
  try {
    return JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8')) as ContentVersion[];
  } catch {
    return [];
  }
}

async function pushVersion(entry: ContentVersion): Promise<void> {
  const next = [entry, ...(await listVersions())].slice(0, MAX_VERSIONS);
  if (kvEnabled()) {
    await (await kvClient()).set(KV_KEY_VERSIONS, next);
    return;
  }
  const dir = path.dirname(VERSIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(VERSIONS_FILE, JSON.stringify(next, null, 2), 'utf8');
}

export async function saveContent(
  next: SiteContent,
  meta?: { by: string; summary: string }
): Promise<void> {
  const payload: SiteContent = { ...next, updatedAt: new Date().toISOString() };
  const current = await getContent();

  // Üzerine yazmadan önce mevcut sürümü geçmişe al (ilk kayıtta updatedAt boştur).
  if (current.updatedAt) {
    await pushVersion({
      at: current.updatedAt,
      by: meta?.by ?? '—',
      summary: meta?.summary ?? '',
      content: current,
    });
  }

  if (kvEnabled()) {
    const kv = await kvClient();
    // Geri alma için mevcut sürümü "önceki" olarak da sakla (eski davranış korunur).
    const cur = await kv.get<SiteContent>(KV_KEY);
    if (cur) await kv.set(KV_KEY_PREV, cur);
    await kv.set(KV_KEY, payload);
    return;
  }
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try {
    if (fs.existsSync(FILE)) fs.copyFileSync(FILE, FILE_PREV);
  } catch {
    /* önceki sürüm kopyalanamadıysa yoksay */
  }
  fs.writeFileSync(FILE, JSON.stringify(payload, null, 2), 'utf8');
}

/* Bir önceki kaydedilmiş sürüm (geri alma için). Yoksa undefined. */
export async function getPrevContent(): Promise<SiteContent | undefined> {
  if (kvEnabled()) {
    try {
      const data = await (await kvClient()).get<SiteContent>(KV_KEY_PREV);
      return data ? { ...DEFAULT, ...data } : undefined;
    } catch {
      return undefined;
    }
  }
  try {
    const raw = fs.readFileSync(FILE_PREV, 'utf8');
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return undefined;
  }
}
