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

export interface SiteContent {
  documents: DocLink[];
  references: RefEntry[];
  groupImages: Record<string, string>; // familyId -> görsel yolu
  updatedAt: string;
}

const FILE = path.join(process.cwd(), 'content', 'site.json');
const KV_KEY = 'site:content';

const DEFAULT: SiteContent = {
  documents: [],
  references: [],
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
    await (await kvClient()).set(KV_KEY, payload);
    return;
  }
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(payload, null, 2), 'utf8');
}
