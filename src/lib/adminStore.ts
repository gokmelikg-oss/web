import fs from 'fs';
import path from 'path';

/* Yönetim paneli verileri için basit JSON deposu.
   content.ts ile aynı stratejiyi izler: Vercel KV varsa KV, yoksa content/ altında dosya.
   Kullanıcılar, oturumlar ve işlem kaydı bu depoyu paylaşır. */

const DIR = path.join(process.cwd(), 'content');

/* ⚠ DEPO ADI SERBEST METİN DEĞİLDİR.
   `name` hem bir dosya yoluna hem bir KV anahtarına giriyor. Bugün her çağrı
   sabit bir değer veriyor; ama ileride biri kullanıcı girdisini buraya
   bağlarsa `../../.env.local` gibi bir ad dizinin dışına çıkardı.

   Bu, SQL enjeksiyonunun bu mimarideki karşılığıdır: projede SQL yoktur
   (depo Vercel KV ya da JSON dosyasıdır), enjekte edilebilecek yüzey yol ve
   anahtardır. Kaçış yerine tamamen ALLOWLIST ile kapatılır — listede
   olmayan hiçbir ad kabul edilmez. */
/* Bu depoyu yalnızca üç veri kümesi kullanır. Site içeriği ve sürümleri
   content.ts içinde kendi yollarıyla yönetilir, buraya uğramaz. */
const STORES = ['users', 'sessions', 'log'] as const;
export type StoreName = (typeof STORES)[number];

function assertStore(name: string): void {
  if (!(STORES as readonly string[]).includes(name)) {
    throw new Error(`Bilinmeyen depo adı: ${name}`);
  }
}

function kvEnabled(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvClient() {
  const { kv } = await import('@vercel/kv');
  return kv;
}

export async function readStore<T>(name: string, fallback: T): Promise<T> {
  assertStore(name);
  if (kvEnabled()) {
    try {
      const data = await (await kvClient()).get<T>(`site:${name}`);
      return data ?? fallback;
    } catch (err) {
      console.error(`KV readStore(${name}) hatası`, err);
      return fallback;
    }
  }
  try {
    return JSON.parse(fs.readFileSync(path.join(DIR, `${name}.json`), 'utf8')) as T;
  } catch {
    return fallback;
  }
}

export async function writeStore<T>(name: string, value: T): Promise<void> {
  assertStore(name);
  if (kvEnabled()) {
    await (await kvClient()).set(`site:${name}`, value);
    return;
  }
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, `${name}.json`), JSON.stringify(value, null, 2), 'utf8');
}
