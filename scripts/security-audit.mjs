/* GÜVENLİK DENETİMİ — regresyon koruması
   ======================================
   Bu betik, düzeltilen açıkların ZAMANLA GERİ GELMESİNİ engeller. Kod tabanını
   statik olarak tarar; bir koruma kaldırılırsa çıkış kodu 1 olur.

   Çalıştırma:   npm run audit:security
   Yayın öncesi: npm run verify   (tsc + lint + bu denetim)

   ⚠ Bu bir sızma testi değildir. Yalnızca "bilinen korumalar yerinde mi?"
   sorusunu yanıtlar. Bağımlılık açıkları için ayrıca `npm audit` çalıştırın. */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const failures = [];
const passes = [];

function read(rel) {
  try {
    return fs.readFileSync(path.join(ROOT, rel), 'utf8');
  } catch {
    return null;
  }
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, out);
    else if (/\.(ts|tsx|mjs|js)$/.test(entry.name)) out.push(rel);
  }
  return out;
}

function check(id, description, predicate) {
  let ok = false;
  let detail = '';
  try {
    const result = predicate();
    ok = result === true;
    if (typeof result === 'string') detail = result;
  } catch (err) {
    detail = String(err && err.message);
  }
  (ok ? passes : failures).push({ id, description, detail });
}

/* Açıklama satırlarını çıkarır. Bu dosyadaki kurallar kodu tarar; bir
   açıklamada geçen "Math.random" ya da "Access-Control-Allow-Origin: *"
   ifadesi bulgu sayılmamalıdır (aksi hâlde açığın NEDEN kapatıldığını
   anlatan yorum, denetimi düşürürdü). */
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

const sourceFiles = walk('src');
const allSource = sourceFiles.map((f) => ({ file: f, text: stripComments(read(f) ?? '') }));

/* --- 1. .env dosyaları sürüm kontrolünde olmamalı --- */
check('1', '.env dosyaları .gitignore ile kapalı', () => {
  const gi = read('.gitignore') ?? '';
  return gi.includes('.env') && gi.includes('!.env.example');
});

/* --- 2. Gizli anahtarlar istemciye sızmamalı --- */
check('2', 'İstemciye giden ortam değişkenleri yalnızca NEXT_PUBLIC_ ön ekli', () => {
  const bad = [];
  for (const { file, text } of allSource) {
    if (!text.includes("'use client'") && !text.includes('"use client"')) continue;
    const matches = text.match(/process\.env\.([A-Z0-9_]+)/g) ?? [];
    for (const m of matches) {
      if (!m.includes('NEXT_PUBLIC_') && !m.includes('NODE_ENV')) bad.push(`${file}: ${m}`);
    }
  }
  return bad.length === 0 || bad.join(', ');
});

check('2b', 'Gizli değişken adları NEXT_PUBLIC_ ile başlamıyor', () => {
  const example = read('.env.example') ?? '';
  const leaked = ['ADMIN_SECRET', 'ADMIN_PASSWORD', 'RESEND_API_KEY', 'KV_REST_API_TOKEN'].filter(
    (name) => example.includes(`NEXT_PUBLIC_${name}`)
  );
  return leaked.length === 0 || leaked.join(', ');
});

/* --- 4 / 11. Yetkilendirme sunucuda zorlanmalı --- */
check('4/11', 'Her admin API rotası oturum denetimi yapıyor', () => {
  const routes = sourceFiles.filter(
    (f) => f.includes(path.join('api', 'admin')) && f.endsWith('route.ts')
  );
  const exempt = ['login', 'logout'];
  const missing = routes.filter((f) => {
    if (exempt.some((e) => f.includes(path.sep + e + path.sep))) return false;
    return !(read(f) ?? '').includes('getSession');
  });
  return missing.length === 0 || missing.join(', ');
});

check('4b', 'Admin sayfaları oturumsuz erişimde giriş ekranına yönlendiriyor', () => {
  const page = read(path.join('src', 'app', 'admin', 'page.tsx')) ?? '';
  return page.includes('getSession') && page.includes('redirect');
});

/* --- 5. Hız sınırı --- */
check('5', 'Halka açık formlarda ve yazma uçlarında hız sınırı var', () => {
  const needed = [
    path.join('src', 'app', 'api', 'teklif', 'route.ts'),
    path.join('src', 'app', 'api', 'contact', 'route.ts'),
    path.join('src', 'app', 'api', 'admin', 'content', 'route.ts'),
    path.join('src', 'app', 'api', 'admin', 'upload', 'route.ts'),
  ];
  const missing = needed.filter((f) => !(read(f) ?? '').includes('allowRequest'));
  return missing.length === 0 || missing.join(', ');
});

check('5b', 'Giriş denemesi sınırlaması duruyor', () => {
  const login = read(path.join('src', 'app', 'api', 'admin', 'login', 'route.ts')) ?? '';
  return login.includes('isBlocked') && login.includes('noteFailedLogin');
});

/* --- 6. Yol / depo enjeksiyonu --- */
check('6', 'Depo adı allowlist ile kapatılmış', () => {
  const store = read(path.join('src', 'lib', 'adminStore.ts')) ?? '';
  return store.includes('assertStore') && store.includes('const STORES');
});

/* --- 7 / 15. Sunucu tarafı doğrulama --- */
check('7/15', 'İçerik gövdesi normalize ediliyor (doğrudan kaydedilmiyor)', () => {
  const route = read(path.join('src', 'app', 'api', 'admin', 'content', 'route.ts')) ?? '';
  return route.includes('normalizeSiteContent') && route.includes('withinSizeLimit');
});

check('7b', 'Halka açık formlar alanları sunucuda temizliyor', () => {
  const missing = ['teklif', 'contact'].filter(
    (name) => !(read(path.join('src', 'app', 'api', name, 'route.ts')) ?? '').includes('field(')
  );
  return missing.length === 0 || missing.join(', ');
});

/* --- 8. Ham HTML render --- */
check('8', 'dangerouslySetInnerHTML yalnızca kaçışlı JSON-LD içinde', () => {
  const users = allSource.filter(({ text }) => text.includes('dangerouslySetInnerHTML'));
  const offenders = users.filter(({ file, text }) => {
    if (file.endsWith(path.join('components', 'JsonLd.tsx'))) {
      return !text.includes('safeJsonLd'); // kaçış fonksiyonu duruyor mu?
    }
    return true; // başka hiçbir yerde kullanılmamalı
  });
  return offenders.length === 0 || offenders.map((o) => o.file).join(', ');
});

/* --- 9 / 19. Şifreler --- */
check('9', 'Şifreler scrypt ile saklanıyor, düz metin yok', () => {
  const users = read(path.join('src', 'lib', 'adminUsers.ts')) ?? '';
  return users.includes('scryptSync') && users.includes('timingSafeEqual');
});

check('19', 'Şifre gücü politikası her şifre ucunda uygulanıyor', () => {
  const targets = [
    path.join('src', 'lib', 'adminUsers.ts'),
    path.join('src', 'app', 'api', 'admin', 'account', 'route.ts'),
  ];
  const missing = targets.filter((f) => !(read(f) ?? '').includes('checkPasswordStrength'));
  return missing.length === 0 || missing.join(', ');
});

/* --- 10. Oturum bilgisi --- */
check('10', 'Oturum çerezi httpOnly ve üretimde secure', () => {
  const auth = read(path.join('src', 'lib', 'adminAuth.ts')) ?? '';
  return auth.includes('httpOnly: true') && auth.includes('secure: process.env.NODE_ENV');
});

check('10b', 'Oturum belirteci localStorage/sessionStorage içinde tutulmuyor', () => {
  const bad = allSource.filter(
    ({ text }) => /(local|session)Storage/.test(text) && /token|session|admin|auth/i.test(text)
  );
  // Çerez onayı localStorage kullanır ama belirteç taşımaz — dosya adıyla ayıklanır.
  const real = bad.filter(
    ({ file }) => !/CookieBanner|Analytics/.test(file)
  );
  return real.length === 0 || real.map((r) => r.file).join(', ');
});

check('10c', 'Oturum imza anahtarı üretimde varsayılana düşmüyor', () => {
  const auth = read(path.join('src', 'lib', 'adminAuth.ts')) ?? '';
  return auth.includes("NODE_ENV === 'production'") && auth.includes('throw new Error');
});

/* --- 12. CORS / çerçeveleme --- */
check('12', 'Serbest CORS başlığı yok', () => {
  const bad = allSource.filter(({ text }) => /Access-Control-Allow-Origin['"\s:]+\*/.test(text));
  return bad.length === 0 || bad.map((b) => b.file).join(', ');
});

check('12b', 'CSP tanımlı ve kritik yönergeleri içeriyor', () => {
  const cfg = read('next.config.mjs') ?? '';
  const required = ["object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'self'"];
  const missing = required.filter((d) => !cfg.includes(d));
  return missing.length === 0 || missing.join(', ');
});

/* --- 14. Tahmin edilebilir kimlikler --- */
check('14', 'Kimlik üretiminde Math.random kullanılmıyor', () => {
  const bad = allSource.filter(
    ({ file, text }) =>
      /Math\.random/.test(text) && (/\bid\b|token|session|filename/i.test(text) || file.includes('lib'))
  );
  return bad.length === 0 || bad.map((b) => b.file).join(', ');
});

/* --- 17. Hata detayı sızıntısı --- */
check('17', 'API hataları istemciye yığın izi döndürmüyor', () => {
  const bad = [];
  for (const f of sourceFiles.filter((f) => f.endsWith('route.ts'))) {
    const text = read(f) ?? '';
    // NextResponse.json içinde err.message/err.stack doğrudan geçmemeli.
    if (/NextResponse\.json\([^)]*\berr(or)?\.(message|stack)\b/.test(text)) bad.push(f);
  }
  return bad.length === 0 || bad.join(', ');
});

/* --- 20. Dosya yükleme --- */
check('20', 'Yükleme içerik imzasıyla doğrulanıyor ve SVG kapalı', () => {
  const guard = read(path.join('src', 'lib', 'fileGuard.ts')) ?? '';
  const route = read(path.join('src', 'app', 'api', 'admin', 'upload', 'route.ts')) ?? '';
  return guard.includes('signature') && /svg/i.test(guard) && route.includes('inspectUpload');
});

/* --- Rapor --- */
const line = '-'.repeat(72);
console.log('\nGÜVENLİK DENETİMİ');
console.log(line);
for (const p of passes) console.log(`  GECTI   [${p.id}] ${p.description}`);
for (const f of failures) {
  console.log(`  KALDI   [${f.id}] ${f.description}`);
  if (f.detail) console.log(`          → ${f.detail}`);
}
console.log(line);
console.log(`${passes.length} gecti, ${failures.length} kaldi\n`);

process.exit(failures.length ? 1 : 0);
