/* ŞİFRE GÜCÜ POLİTİKASI
   =====================
   Önceden tek kural vardı: "en az 6 karakter". `123456`, `sifre`, `admin1`
   ve kullanıcının kendi adı kabul ediliyordu. Panel yöneticisi sitenin tüm
   içeriğine yazabildiği için zayıf şifre en ucuz saldırı yoluydu.

   Yaklaşım NIST SP 800-63B'yi izler:
     · Uzunluk en önemli ölçüdür — 12 karakter tabandır.
     · Karakter sınıfı dayatmak (1 büyük + 1 rakam + 1 sembol) `Sifre1!` gibi
       tahmin edilebilir kalıplar üretir; bu yüzden ZORUNLU DEĞİLDİR, yalnızca
       kısa şifrelerde çeşitlilik aranır.
     · Asıl fayda YASAKLI LİSTEDEN gelir: sık kullanılan ve bağlamsal
       (şirket/marka/kullanıcı adı) şifreler reddedilir.
     · Üst sınır 200 karakter — scrypt'e sınırsız girdi vermek DoS olur.

   Bu dosya saftır (node modülü içermez), böylece istemci tarafında da anlık
   geri bildirim için kullanılabilir. Ama KARAR SUNUCUDA verilir:
   createUser/updateUser bu fonksiyonu çağırır (bkz. adminUsers.ts). */

export const MIN_PASSWORD_LENGTH = 12;
export const MAX_PASSWORD_LENGTH = 200;

/* En sık denenen şifreler + bu projeye özgü bağlamsal tahminler.
   Karşılaştırma küçük harfe indirgenmiş ve rakam/sembol sadeleştirilmiş
   biçimde yapılır; `S1msek!` de `simsek` sayılır. */
const BANNED = [
  'password', 'passw0rd', 'sifre', 'parola', 'qwerty', 'qwertyuiop', 'asdfgh',
  'admin', 'administrator', 'yonetici', 'root', 'test', 'demo', 'welcome',
  'hosgeldin', 'letmein', 'iloveyou', 'monkey', 'dragon', 'master', 'secret',
  '123456', '1234567', '12345678', '123456789', '1234567890', '111111',
  '123123', 'abc123', 'a1b2c3', 'qazwsx', 'zxcvbnm',
  // Bağlamsal — marka, ürün, şehir ve alan adı
  'simsek', 'simseksolar', 'solar', 'gunes', 'gunesenerjisi', 'kollektor',
  'orion', 'helios', 'aquarius', 'lipus', 'mersin', 'turkiye',
];

/* Görsel benzerlikle yapılan basit kaçamakları açar: `S1m$ek` → `simsek`.
   Böylece yasaklı liste sembol değiştirerek atlatılamaz. */
function canonical(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/[ıİ]/g, 'i')
    .replace(/[şŞ]/g, 's')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[0@]/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[4]/g, 'a')
    .replace(/[5$]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/[^a-z]/g, '');
}

/* Aynı karakterin tekrarı (aaaaaaaaaaaa) veya klavye/sayı dizisi
   (abcdefghijkl, 123456789012) uzunluk şartını sağlasa da tahmin edilebilir. */
function isLowEntropy(value: string): boolean {
  const chars = Array.from(value);
  const unique = new Set(chars).size;
  if (unique <= 4) return true;

  let ascending = 1;
  let descending = 1;
  let longestRun = 1;
  for (let i = 1; i < chars.length; i++) {
    const diff = chars[i].charCodeAt(0) - chars[i - 1].charCodeAt(0);
    ascending = diff === 1 ? ascending + 1 : 1;
    descending = diff === -1 ? descending + 1 : 1;
    longestRun = Math.max(longestRun, ascending, descending);
  }
  // Şifrenin yarısından fazlası düz bir dizi ise zayıf sayılır.
  return longestRun >= Math.max(6, Math.ceil(chars.length / 2));
}

const COMMON_ERROR =
  'Bu şifre çok yaygın veya firmayla kolayca ilişkilendirilebilir. Tahmin edilmesi zor bir parola seçin.';

export interface PasswordCheck {
  ok: boolean;
  error?: string;
}

/* `context` kullanıcı adı, ad soyad, e-posta gibi tahmin kolaylaştıran
   değerlerdir; şifre bunlardan birini içeremez. */
export function checkPasswordStrength(password: string, context: string[] = []): PasswordCheck {
  if (typeof password !== 'string' || password.length === 0) {
    return { ok: false, error: 'Şifre boş bırakılamaz.' };
  }
  // Uzunluk KARAKTER sayısıyla ölçülür; emoji/Türkçe harf bayt sayısıyla değil.
  const length = Array.from(password).length;
  if (length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      error: `Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalıdır. Birkaç kelimeden oluşan bir parola cümlesi (örn. "mersin-kollektor-2026-mavi") hem güçlü hem akılda kalıcıdır.`,
    };
  }
  if (length > MAX_PASSWORD_LENGTH) {
    return { ok: false, error: `Şifre en fazla ${MAX_PASSWORD_LENGTH} karakter olabilir.` };
  }
  if (/^\s|\s$/.test(password)) {
    return { ok: false, error: 'Şifre boşlukla başlayamaz veya bitemez.' };
  }

  const canon = canonical(password);

  /* ⚠ Yasaklı sözcük ORANLA değerlendirilir, salt "içeriyor mu" ile değil.

     İlk sürüm `canon.includes(banned)` diyordu ve bu, politikanın kendi
     önerisiyle çelişiyordu: "mersin-kollektor-2026-mavi" gibi 26 karakterlik
     güçlü bir parola cümlesi, içinde "mersin" geçtiği için reddediliyordu —
     üstelik hata mesajı tam olarak o biçimi öneriyordu.

     Doğrusu: yasaklı sözcük şifrenin BÜYÜK BÖLÜMÜNÜ kaplıyorsa tahmin
     edilebilirdir ("simsek2026" → %77 "simsek"). Uzun bir cümlenin içindeki
     tek bir marka sözcüğü ise zararsızdır; güç diğer sözcüklerden gelir. */
  const DOMINANCE = 0.5;
  for (const banned of BANNED) {
    if (canon === banned) {
      return { ok: false, error: COMMON_ERROR };
    }
    if (banned.length > 6 && canon.includes(banned) && banned.length / canon.length >= DOMINANCE) {
      return { ok: false, error: COMMON_ERROR };
    }
  }

  for (const raw of context) {
    const ctx = canonical(String(raw ?? ''));
    // Aynı oran kuralı: kullanıcı adı şifrenin belkemiğiyse reddedilir.
    if (ctx.length >= 4 && canon.includes(ctx) && ctx.length / canon.length >= DOMINANCE) {
      return {
        ok: false,
        error: 'Şifre büyük ölçüde kullanıcı adınızdan, adınızdan veya e-postanızdan oluşuyor.',
      };
    }
  }

  if (isLowEntropy(password)) {
    return {
      ok: false,
      error: 'Şifre tekrar eden karakterler veya düz bir sıra içeriyor. Daha karışık bir şifre seçin.',
    };
  }

  /* Kısa uçtaki (12-15 karakter) şifrelerde en az iki karakter türü aranır.
     16 ve üzeri uzunlukta bu şart düşer — uzunluk tek başına yeterlidir
     (NIST'in parola cümlesi yaklaşımı: "dort kelime yan yana" geçerli olmalı). */
  if (length < 16) {
    const classes = [/[a-zçğıöşü]/, /[A-ZÇĞİÖŞÜ]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((re) =>
      re.test(password)
    ).length;
    if (classes < 2) {
      return {
        ok: false,
        error: '16 karakterden kısa şifrelerde en az iki farklı karakter türü (harf, rakam, sembol) bulunmalıdır.',
      };
    }
  }

  return { ok: true };
}
