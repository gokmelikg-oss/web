/* Herkese açık form uçları için giriş koruması.
   ================================================
   Kapsadığı riskler:
   - Eksik girdi doğrulama → alan uzunlukları sınırlanır, kontrol karakterleri
     temizlenir (e-posta başlığı kırma ve log kirletme girişimlerine karşı).
   - Form kötüye kullanımı / spam → IP başına hız sınırı.

   ⚠ Hız sınırı BELLEKTE tutulur. Tek sunucuda (VPS, kendi Node süreci) doğru
   çalışır. Vercel gibi çok örnekli sunucusuz ortamda her örnek kendi sayacını
   tutar; kalıcı koruma için sayaç KV'ye taşınmalıdır. Yine de bot selini tek
   örnek üzerinde durdurduğu için savunma katmanı olarak değerlidir. */

/* Kontrol karakteri mi? Satır sonu (10, 13) ve sekme (9) korunur; geri kalan
   C0/C1 karakterleri atılır. Regex yerine kod noktası kontrolü kullanıldı ki
   kaynak dosyada gerçek kontrol karakteri bulunmasın. */
function isControlChar(code: number): boolean {
  if (code === 9 || code === 10 || code === 13) return false;
  return code < 32 || code === 127;
}

/* Bir metin alanını güvenli hâle getirir: tip kontrolü, kontrol karakteri
   temizliği, boşluk kırpma ve uzunluk sınırı. */
export function field(value: unknown, max = 500): string {
  if (typeof value !== 'string') return '';
  let out = '';
  for (const ch of value) {
    if (!isControlChar(ch.charCodeAt(0))) out += ch;
  }
  return out.trim().slice(0, max);
}

/* Alan uzunluk sınırları — e-posta gövdesine giren her alan için. */
export const LIMITS = {
  name: 120,
  company: 160,
  country: 80,
  email: 160,
  phone: 40,
  subject: 200,
  product: 200,
  quantity: 120,
  projectLocation: 160,
  projectType: 80,
  serviceType: 80,
  volume: 120,
  message: 4000,
} as const;

/* Basit e-posta biçim kontrolü. Amaç RFC uyumu değil, saçma girdiyi elemek. */
export function isEmail(value: string): boolean {
  return value.length <= LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/* ---- IP başına hız sınırı ---- */

interface Hit {
  count: number;
  resetAt: number;
}
const hits = new Map<string, Hit>();

/* Bellek sızıntısını önlemek için süresi dolmuş kayıtları ara sıra temizle. */
function sweep(now: number) {
  if (hits.size < 500) return;
  for (const [k, v] of Array.from(hits.entries())) {
    if (v.resetAt <= now) hits.delete(k);
  }
}

/* `key` (genelde IP + form adı) için pencere içinde `limit` isteğe izin verir.
   İzin verilirse true, sınır aşıldıysa false döner. */
export function allowRequest(key: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  sweep(now);
  const cur = hits.get(key);
  if (!cur || cur.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  cur.count += 1;
  return cur.count <= limit;
}

/* İstek sahibinin IP'si — proxy başlıkları önce denenir. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'bilinmiyor';
}
