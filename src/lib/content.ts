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
}

export interface SiteContent {
  documents: DocLink[];
  references: RefEntry[];
  products: AdminProduct[];
  posts: AdminPost[];
  hiddenRefs: string[]; // gizlenecek statik referansların iş adları
  texts: Record<string, string>; // site metin geçersiz kılmaları (key -> metin)
  groupImages: Record<string, string>; // familyId -> görsel yolu
  updatedAt: string;
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

export async function saveContent(next: SiteContent): Promise<void> {
  const payload: SiteContent = { ...next, updatedAt: new Date().toISOString() };
  if (kvEnabled()) {
    const kv = await kvClient();
    // Geri alma için mevcut sürümü "önceki" olarak sakla.
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
