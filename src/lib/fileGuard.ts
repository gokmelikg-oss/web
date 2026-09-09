/* DOSYA YÜKLEME DOĞRULAMASI
   =========================
   Önceki hâlde tek kontrol `file.type` idi. O değer multipart gövdesindeki
   Content-Type başlığından gelir; yani TAMAMEN İSTEMCİNİN BEYANIDIR.
   `curl -F "file=@kotu.html;type=image/png"` demek yeterliydi: dosya
   public/uploads altına .png adıyla yazılıyordu.

   Buradaki iki katmanlı savunma:

   1. SİHİRLİ BAYT (magic bytes) — dosyanın ilk baytları gerçekten beyan
      edilen biçime mi ait? Beyan ile içerik uyuşmazsa reddedilir.

   2. SVG YASAK — SVG bir belge biçimidir, görsel değil. İçine <script>
      koyulabilir ve kendi alan adımızdan servis edildiği için o script
      sitemizin kaynağında çalışır (depolanmış XSS): panel cookie'si
      HttpOnly olsa bile saldırgan ziyaretçi adına işlem yapabilir.
      Güvenli SVG temizliği ayrı bir kütüphane işidir; kurumsal sitede
      PNG/WebP yettiği için biçim tümden kapatıldı.
      ⚠ Bu, projenin İÇİNDE duran (public/ altına elle eklenen) SVG'leri
      etkilemez — onlar bizim ürettiğimiz, denetlenmiş dosyalardır.

   Not: yol geçişi (path traversal) riski yoktur; dosya adı slugify'dan
   geçtiği için yalnızca [a-z0-9-] içerir (bkz. api/admin/upload). */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export interface AllowedType {
  mime: string;
  ext: string;
  /* Baytların dosyanın başında birebir eşleşmesi gereken imza.
     `null` = o bayt serbest (biçimin değişken alanı). */
  signature: (number | null)[];
  /* Bazı biçimlerde imza tek başına yetmez (RIFF hem WebP hem WAV'dır). */
  verify?: (bytes: Uint8Array) => boolean;
}

const ASCII = (s: string) => Array.from(s).map((c) => c.charCodeAt(0));

export const ALLOWED_TYPES: AllowedType[] = [
  // JPEG: FF D8 FF
  { mime: 'image/jpeg', ext: '.jpg', signature: [0xff, 0xd8, 0xff] },
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  { mime: 'image/png', ext: '.png', signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  // GIF: "GIF87a" veya "GIF89a"
  { mime: 'image/gif', ext: '.gif', signature: [...ASCII('GIF8'), null, ASCII('a')[0]] },
  {
    // WebP: "RIFF" + 4 bayt uzunluk + "WEBP"
    mime: 'image/webp',
    ext: '.webp',
    signature: [...ASCII('RIFF'), null, null, null, null, ...ASCII('WEBP')],
  },
  {
    // AVIF: 4 bayt kutu uzunluğu + "ftyp" + marka
    mime: 'image/avif',
    ext: '.avif',
    signature: [null, null, null, null, ...ASCII('ftyp')],
    verify: (b) => {
      const brand = String.fromCharCode(...Array.from(b.slice(8, 12)));
      return ['avif', 'avis', 'mif1', 'msf1'].includes(brand);
    },
  },
  { mime: 'application/pdf', ext: '.pdf', signature: ASCII('%PDF-') },
];

function matches(bytes: Uint8Array, type: AllowedType): boolean {
  if (bytes.length < type.signature.length) return false;
  for (let i = 0; i < type.signature.length; i++) {
    const expected = type.signature[i];
    if (expected !== null && bytes[i] !== expected) return false;
  }
  return type.verify ? type.verify(bytes) : true;
}

export interface FileCheck {
  ok: boolean;
  ext?: string;
  mime?: string;
  error?: string;
}

/* İçeriğe bakarak biçimi belirler. `declaredType` yalnızca ERKEN RET için
   kullanılır; kabul kararı her zaman baytlara dayanır. */
export function inspectUpload(
  bytes: Uint8Array,
  declaredType: string,
  allowPdf = false
): FileCheck {
  if (bytes.length === 0) return { ok: false, error: 'Dosya boş.' };
  if (bytes.length > MAX_UPLOAD_BYTES) {
    return { ok: false, error: 'Dosya 5 MB sınırını aşıyor.' };
  }

  // SVG bilinçli olarak yasaktır — gerekçe dosya başındaki nota bakınız.
  if (/svg/i.test(declaredType)) {
    return {
      ok: false,
      error:
        'SVG yüklenemez: içine çalıştırılabilir kod gömülebildiği için güvenlik gereği kapalıdır. ' +
        'Lütfen PNG veya WebP olarak yükleyin.',
    };
  }

  const candidates = ALLOWED_TYPES.filter((t) => allowPdf || t.mime !== 'application/pdf');
  const detected = candidates.find((t) => matches(bytes, t));

  if (!detected) {
    return {
      ok: false,
      error: allowPdf
        ? 'Dosya tanınmadı. Yalnızca JPG, PNG, GIF, WebP, AVIF ve PDF kabul edilir.'
        : 'Dosya tanınmadı. Yalnızca JPG, PNG, GIF, WebP ve AVIF görselleri kabul edilir.',
    };
  }

  /* Beyan ile içerik çelişiyorsa reddet. Uyuşmazlık ya bir saldırı denemesidir
     ya da dosyanın uzantısı yanlıştır; ikisinde de kaydetmemek doğrudur. */
  if (declaredType && declaredType !== detected.mime) {
    return {
      ok: false,
      error: `Dosyanın içeriği belirtilen türle uyuşmuyor (belirtilen: ${declaredType}, gerçek: ${detected.mime}).`,
    };
  }

  return { ok: true, ext: detected.ext, mime: detected.mime };
}
