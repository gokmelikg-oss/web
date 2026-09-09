/* İÇERİK GÖVDESİ DOĞRULAMASI
   ==========================
   Panelden gelen kayıt isteği eskiden yalnızca ÜST DÜZEYDE kontrol ediliyordu:
   `Array.isArray(body.products) ? body.products : []`. Dizinin İÇİ hiç
   denetlenmiyordu; yani istemcinin gönderdiği nesneler olduğu gibi depoya
   yazılıyordu ("body'i direkt kaydetmek").

   Bunun üç somut sonucu vardı:

   1. SINIRSIZ BÜYÜME — 50 MB'lık tek bir istek content/site.json'a yazılır,
      her sayfa isteğinde okunur; site yavaşlar, KV kotası dolar.
   2. BEKLENMEYEN ALANLAR — nesneye eklenen her anahtar kalıcı olur. `__proto__`
      gibi anahtarlar JSON.parse'ta zararsızdır ama nesne birleştirme yapan
      herhangi bir kod prototip kirlenmesine açılır.
   3. KONTROL KARAKTERLERİ — görünmez karakterler metne girip çıktıyı bozar.

   Buradaki normalize fonksiyonları, gelen veriden YALNIZCA bilinen alanları
   kopyalar (allowlist), her metni kırpar ve dizi uzunluklarını sınırlar.
   Bilinmeyen alan sessizce düşer — reddetmek yerine düşürmek tercih edildi ki
   panelin eski sürümünden gelen bir istek kaydı tümden başarısız olmasın. */

/* Alan üst sınırları. Cömert ama sınırsız değil. */
export const LIMITS = {
  shortText: 300,
  mediumText: 2_000,
  longText: 60_000, // blog gövdesi
  url: 1_000,
  arrayItems: 500,
  textFields: 400,
  totalBytes: 2 * 1024 * 1024, // tüm gövde
} as const;

/* JSON'da prototip kirlenmesine yol açabilecek anahtarlar hiçbir zaman
   kopyalanmaz. */
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function isControlChar(code: number): boolean {
  if (code === 9 || code === 10 || code === 13) return false; // tab, LF, CR serbest
  return code < 32 || code === 127;
}

/* Metni güvenli hâle getirir: dizge değilse boşa düşer, kontrol karakterleri
   atılır, uçlardaki boşluk kırpılır ve uzunluk sınırlanır. */
export function text(value: unknown, max: number = LIMITS.shortText): string {
  if (typeof value !== 'string') return '';
  let out = '';
  for (const ch of value) {
    if (!isControlChar(ch.charCodeAt(0))) out += ch;
  }
  return out.trim().slice(0, max);
}

/* Site içi yol veya güvenli bir mutlak adres. `javascript:` ve `data:`
   şemaları reddedilir — bunlar bağlantıya tıklandığında kod çalıştırır. */
export function url(value: unknown, max: number = LIMITS.url): string {
  const raw = text(value, max);
  if (!raw) return '';
  const lowered = raw.trim().toLowerCase();
  if (lowered.startsWith('javascript:') || lowered.startsWith('data:') || lowered.startsWith('vbscript:')) {
    return '';
  }
  // Site içi yol, http(s), mailto ve tel serbest; gerisi düşer.
  if (/^(\/|https?:\/\/|mailto:|tel:|#)/i.test(raw)) return raw;
  return '';
}

export function bool(value: unknown): boolean {
  return value === true;
}

/* Diziyi sınırlar ve her ögeyi verilen normalize edicisinden geçirir.
   Normalize edici `null` dönerse öge düşer. */
export function list<T>(
  value: unknown,
  normalize: (item: Record<string, unknown>) => T | null,
  max: number = LIMITS.arrayItems
): T[] {
  if (!Array.isArray(value)) return [];
  const out: T[] = [];
  for (const item of value.slice(0, max)) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
    const normalized = normalize(item as Record<string, unknown>);
    if (normalized !== null) out.push(normalized);
  }
  return out;
}

/* Anahtar→metin sözlüğü (texts, groupImages). Anahtar sayısı ve her değerin
   uzunluğu sınırlanır; tehlikeli anahtarlar düşer. */
export function textMap(
  value: unknown,
  maxKeys: number = LIMITS.textFields,
  maxLen: number = LIMITS.mediumText
): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const out: Record<string, string> = {};
  let n = 0;
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (n >= maxKeys) break;
    if (FORBIDDEN_KEYS.has(key)) continue;
    // Anahtarlar kod tarafında tanımlı alan adlarıdır; biçimi dar tutulur.
    if (!/^[A-Za-z0-9._-]{1,120}$/.test(key)) continue;
    out[key] = text(raw, maxLen);
    n++;
  }
  return out;
}

/* İç içe sözlük (textsByLocale: { tr: { alan: değer } }). */
export function localeTextMap(value: unknown): Record<string, Record<string, string>> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const out: Record<string, Record<string, string>> = {};
  for (const [locale, inner] of Object.entries(value as Record<string, unknown>)) {
    if (FORBIDDEN_KEYS.has(locale)) continue;
    if (!/^[a-z]{2}(-[A-Za-z0-9]{2,8})?$/.test(locale)) continue;
    out[locale] = textMap(inner);
  }
  return out;
}

export function stringList(value: unknown, max: number = LIMITS.arrayItems): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, max)
    .map((v) => text(v, LIMITS.shortText))
    .filter(Boolean);
}

/* Gövdenin toplam boyutu — çözümlemeden sonra ölçülür, çünkü asıl maliyet
   depoya yazılan JSON'un boyutudur. */
export function withinSizeLimit(value: unknown): boolean {
  try {
    return Buffer.byteLength(JSON.stringify(value) ?? '', 'utf8') <= LIMITS.totalBytes;
  } catch {
    return false; // döngüsel yapı vb.
  }
}

/* ---------------------------------------------------------------------------
   SiteContent normalizasyonu
   ---------------------------------------------------------------------------
   İçerik kaydetme ucunun (api/admin/content) tek giriş kapısı. Gelen gövdeden
   YALNIZCA aşağıda sayılan alanlar kopyalanır; şeması content.ts'teki
   arayüzlerle birebir eşleşir.
   --------------------------------------------------------------------------- */

import type { SiteContent, DocLink, RefEntry, AdminProduct, AdminPost, ProductSpecItem } from './content';

/* Kimlik alanları: panelin ürettiği kısa kimlikler. Biçimi dar tutulur ki
   dosya adı/anahtar olarak kullanılan yerlerde sürpriz çıkmasın. */
function id(value: unknown): string {
  const raw = text(value, 120);
  return /^[A-Za-z0-9._:-]{1,120}$/.test(raw) ? raw : '';
}

function slug(value: unknown): string {
  const raw = text(value, 160).toLowerCase();
  return /^[a-z0-9-]{1,160}$/.test(raw) ? raw : '';
}

/* YYYY-MM-DD dışındaki her şey düşer — tarih sıralamada kullanılıyor. */
function isoDate(value: unknown): string {
  const raw = text(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : '';
}

/* Sayı alanları (konut, kollektör adedi): negatif ve saçma büyüklükler düşer. */
function count(value: unknown): number | undefined {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return undefined;
  const i = Math.trunc(n);
  if (i < 0 || i > 1_000_000) return undefined;
  return i;
}

/* published alanı ÜÇ DURUMLUDUR: true / false / tanımsız.
   Tanımsız "yayında" demektir (eski kayıtlar bozulmasın diye), bu yüzden
   bool() ile true'ya indirgenemez — false açıkça korunmalıdır. */
function published(value: unknown): boolean | undefined {
  if (value === true) return true;
  if (value === false) return false;
  return undefined;
}

function doc(item: Record<string, unknown>): DocLink | null {
  const name = text(item.name, LIMITS.shortText);
  const href = url(item.url);
  if (!name || !href) return null;
  return { id: id(item.id) || name.slice(0, 60), name, url: href, type: text(item.type, 40) || undefined };
}

function reference(item: Record<string, unknown>): RefEntry | null {
  const title = text(item.title, LIMITS.shortText);
  if (!title) return null;
  return {
    id: id(item.id) || title.slice(0, 60),
    title,
    il: text(item.il, 80),
    ilce: text(item.ilce, 80) || undefined,
    homes: count(item.homes),
    collectors: count(item.collectors),
  };
}

function spec(item: Record<string, unknown>): ProductSpecItem | null {
  const label = text(item.label, 120);
  const value = text(item.value, 200);
  if (!label && !value) return null;
  return { label, value };
}

function product(item: Record<string, unknown>): AdminProduct | null {
  const name = text(item.name, LIMITS.shortText);
  if (!name) return null;
  return {
    id: id(item.id) || name.slice(0, 60),
    name,
    category: text(item.category, 120),
    model: text(item.model, 120) || undefined,
    description: text(item.description, LIMITS.mediumText) || undefined,
    image: url(item.image) || undefined,
    specs: list(item.specs, spec, 60),
    published: published(item.published),
  };
}

function post(item: Record<string, unknown>): AdminPost | null {
  const title = text(item.title, LIMITS.shortText);
  const s = slug(item.slug);
  if (!title || !s) return null;
  return {
    id: id(item.id) || s,
    slug: s,
    title,
    excerpt: text(item.excerpt, LIMITS.mediumText) || undefined,
    category: text(item.category, 120) || undefined,
    date: isoDate(item.date) || undefined,
    cover: url(item.cover) || undefined,
    // Blog gövdesi düz metindir; HTML olarak render EDİLMEZ (bkz. blog sayfası).
    body: text(item.body, LIMITS.longText) || undefined,
    published: published(item.published),
  };
}

export function normalizeSiteContent(body: unknown): SiteContent {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  return {
    documents: list(b.documents, doc),
    references: list(b.references, reference),
    products: list(b.products, product),
    posts: list(b.posts, post),
    hiddenRefs: stringList(b.hiddenRefs),
    texts: textMap(b.texts),
    groupImages: textMap(b.groupImages, 60, LIMITS.url),
    textsByLocale: localeTextMap(b.textsByLocale),
    updatedAt: '',
  };
}
