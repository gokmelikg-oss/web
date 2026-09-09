/* Hareket azaltma tercihi GERCEKTEN uygulaniyor mu?
   Chrome'u prefers-reduced-motion: reduce ile acar, sayfayi gezer ve
   ekranda kalan transform'lari olcer. Kaynak okumakla degil, render ile. */
const puppeteer = require('c:/Users/Melik/OneDrive/Masaüstü/repo/node_modules/puppeteer');

const BASE = process.argv[2];
const ROUTES = process.argv.slice(3);

async function measure(browser, route, reduced) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  if (reduced) {
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  }
  await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 300));

  /* ⚠ Sayfayi KADEMELI kaydir, tek hamlede zıplama.
     Ilk surumde dogrudan scrollHeight/2'ye ziplaniyordu; atlanan bolumler
     hic gorunur alana girmedigi icin `whileInView` tetiklenmiyor ve ogeler
     baslangic konumunda (y=24) kaliyordu. Bu bir erisilebilirlik kusuru
     degil, olcum kusuruydu: gercek kullanici sayfayi kaydirarak gecer.
     Simdi ekran ekran inilip her adimda gozlemcilere firsat veriliyor. */
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await new Promise((r) => setTimeout(r, 900));

  /* Animasyonlar bittikten SONRA olcum: yerine oturmus bir sayfada kaymis
     oge kalmamalidir. Tercih aciksa hic kayma yasanmamis olmalidir. */
  const moving = await page.evaluate(() => {
    let n = 0;
    const samples = [];
    /* ⚠ YALNIZCA kendi giris sarmalayicilarimiz sayilir.
       Ilk surum tum ogeleri tariyordu ve Tailwind'in STATIK ortalama
       siniflarini (-translate-y-1/2, -translate-x-1/2) hareket sanip
       yanlis alarm veriyordu. Bunlar yerlesimdir, animasyon degil —
       normal modda da ayni degeri gosterirler. */
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      const t = getComputedStyle(el).transform;
      if (!t || t === 'none') return;
      const m = t.match(/matrix\(([^)]+)\)/);
      if (!m) return;
      const parts = m[1].split(',').map(Number);
      const ty = parts[5];
      if (Math.abs(ty) > 1.5) {
        n++;
        if (samples.length < 3) {
          samples.push(el.tagName.toLowerCase() + ' ty=' + ty.toFixed(1));
        }
      }
    });
    return { n, samples };
  });
  await page.close();
  return moving;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox'],
  });
  console.log('\nHAREKET AZALTMA DOGRULAMASI');
  console.log('(kayan oge sayisi — normal vs tercih acik)');
  console.log('='.repeat(60));
  let fail = 0;
  for (const route of ROUTES) {
    const normal = await measure(browser, route, false);
    const reduced = await measure(browser, route, true);
    const ok = reduced.n === 0;
    if (!ok) fail++;
    console.log(
      `${ok ? 'GECTI ' : 'KALDI '} ${route.padEnd(26)} normal ${String(normal.n).padStart(3)} → azaltilmis ${String(reduced.n).padStart(3)}` +
        (ok ? '' : '\n         ' + reduced.samples.join(' · '))
    );
  }
  console.log('='.repeat(60));
  console.log(fail ? `${fail} sayfa kaldi` : 'Tum sayfalar temiz');
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
