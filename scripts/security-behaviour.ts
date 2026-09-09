/* Korumaların DAVRANIŞINI ölçer — kaynak kodda desen aramak yerine
   fonksiyonları gerçekten çağırır. */
import { checkPasswordStrength } from '@/lib/passwordPolicy';
import { hashPassword, verifyPassword, needsRehash } from '@/lib/adminUsers';
import { inspectUpload } from '@/lib/fileGuard';
import { normalizeSiteContent, withinSizeLimit } from '@/lib/contentGuard';

let pass = 0;
let fail = 0;
function t(name: string, ok: boolean, extra = '') {
  if (ok) { pass++; console.log('  GECTI  ' + name); }
  else { fail++; console.log('  KALDI  ' + name + (extra ? ' -> ' + extra : '')); }
}

console.log('\n1) SIFRE POLITIKASI');
for (const weak of ['123456', 'sifre', 'admin1', 'Simsek1!', 'simsek2026', 'aaaaaaaaaaaa', 'abcdefghijkl', 'Solar123']) {
  const r = checkPasswordStrength(weak, ['melik']);
  t(`zayif reddedildi: "${weak}"`, !r.ok, r.ok ? 'KABUL EDILDI' : '');
}
t('kullanici adini iceren reddedildi', !checkPasswordStrength('melik-kollektor-99', ['melik']).ok);
for (const strong of ['mersin-kollektor-2026-mavi', 'Xk7#pQ2mLv9w', 'dort kelime yan yana dizildi']) {
  const r = checkPasswordStrength(strong, ['melik']);
  t(`guclu kabul edildi: "${strong}"`, r.ok, r.error);
}

console.log('\n2) SIFRE OZETLEME');
const h = hashPassword('mersin-kollektor-2026-mavi');
t('yeni ozet surumlu bicimde', h.startsWith('scrypt2$131072$8$1$'));
t('dogru sifre dogrulaniyor', verifyPassword('mersin-kollektor-2026-mavi', h));
t('yanlis sifre reddediliyor', !verifyPassword('baska-bir-sifre-123', h));
t('duz metin ozette yok', !h.includes('mersin'));
// Eski bicim hala okunabiliyor mu? (kimse panelden kilitlenmemeli)
import { scryptSync, randomBytes } from 'crypto';
const oldSalt = randomBytes(16).toString('hex');
const oldHash = `scrypt$${oldSalt}$${scryptSync('eski-sifre', oldSalt, 64).toString('hex')}`;
t('eski ozet bicimi hala dogrulaniyor', verifyPassword('eski-sifre', oldHash));
t('eski bicim yukseltme icin isaretleniyor', needsRehash(oldHash) && !needsRehash(h));
t('bozuk ozet cokmeden reddediliyor', !verifyPassword('x', 'scrypt2$1$1$1$a$b'));

console.log('\n3) DOSYA YUKLEME');
const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
const html = new Uint8Array(Array.from('<html><script>alert(1)</script>').map((c) => c.charCodeAt(0)));
const svg = new Uint8Array(Array.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>').map((c) => c.charCodeAt(0)));
t('gercek PNG kabul', inspectUpload(png, 'image/png').ok);
t('PNG beyanli HTML reddedildi', !inspectUpload(html, 'image/png').ok);
t('SVG reddedildi', !inspectUpload(svg, 'image/svg+xml').ok);
t('bos dosya reddedildi', !inspectUpload(new Uint8Array(0), 'image/png').ok);
t('tur uyusmazligi reddedildi', !inspectUpload(png, 'image/jpeg').ok);

console.log('\n4) ICERIK GOVDESI');
const dirty = {
  products: [
    { id: 'ok-1', name: 'Orion 435', category: 'Kolektör', image: 'javascript:alert(1)', evilField: 'kalmamali', published: false },
    { name: '' },
  ],
  posts: [{ slug: 'gecerli-slug', title: 'Baslik', body: 'x'.repeat(200_000) }],
  texts: { '__proto__': 'kotu', 'gecerli.alan': 'deger', 'ge cersiz alan!': 'x' },
  hiddenRefs: ['a', 'b'],
  bilinmeyenUstAlan: { her: 'sey' },
};
const clean = normalizeSiteContent(dirty);
t('bilinmeyen alan dusuruldu', !('evilField' in (clean.products[0] as unknown as Record<string, unknown>)));
t('javascript: adresi temizlendi', clean.products[0].image === undefined);
t('adsiz kayit dusuruldu', clean.products.length === 1);
t('published:false korundu', clean.products[0].published === false);
t('uzun govde kirpildi', (clean.posts[0].body ?? '').length === 60_000);
t('__proto__ anahtari dusuruldu', !Object.prototype.hasOwnProperty.call(clean.texts, '__proto__'));
t('gecersiz anahtar dusuruldu', !('ge cersiz alan!' in clean.texts));
t('gecerli anahtar korundu', clean.texts['gecerli.alan'] === 'deger');
t('bilinmeyen ust alan tasinmadi', !('bilinmeyenUstAlan' in clean));
t('boyut siniri calisiyor', withinSizeLimit(clean) && !withinSizeLimit({ x: 'y'.repeat(3_000_000) }));

console.log('\n' + '-'.repeat(60));
console.log(`${pass} gecti, ${fail} kaldi\n`);
process.exit(fail ? 1 : 0);
