/* Reads the TOKİ reference workbook (2806.xlsx) and writes
   src/data/tokiProjects.json — the reference list shown on /projects.

   Kaynak sütunlar: NO | İŞ ADI | İL | İLÇE | KONUT | ... | BLOK | ... |
                    KOLLEKTÖR | ... | IŞINIM ALANI | ... | BRÜT ALAN
   Işınım alanı = kollektör × 2,33 m² · Brüt alan = kollektör × 2,55 m²

   Çalıştırma: node scripts/generate-references.mjs [xlsx-yolu] */
import { createRequire } from 'module';
import { writeFileSync } from 'fs';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const SRC =
  process.argv[2] ??
  'C:/Users/Melik/OneDrive/Masaüstü/Progs/web/web/DÖKÜMANLAR/2806.xlsx';

const APERTURE_PER_COLLECTOR = 2.33; // m² ışınım alanı
const GROSS_PER_COLLECTOR = 2.55; // m² brüt alan

/* Kısaltma ve birimler büyük harf kalsın. */
const KEEP_UPPER = new Set(['TOKİ', 'AFAD', 'KD', 'K.D.', 'OSB', 'TL', 'M²', 'PVC', 'A', 'B', 'C', 'D']);

function titleCaseTr(s) {
  return s
    .split(' ')
    .map((word) => {
      const bare = word.replace(/[(),.]/g, '');
      if (KEEP_UPPER.has(bare)) return word;
      if (/^\d/.test(word)) return word; // 3. etap, 154 gibi
      return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
    })
    .join(' ');
}

/* Uzun ihale başlıklarını okunur hâle getirir: fazla boşluk/satır sonu temizlenir,
   baştaki "X İLİ, Y İLÇESİ" tekrarı kaldırılır (il/ilçe zaten ayrı alanda). */
function cleanTitle(raw, il, ilce) {
  let s = String(raw).replace(/\s+/g, ' ').trim();
  const prefix = new RegExp(`^${il}\\s*İLİ[,]?\\s*(${ilce}\\s*İLÇESİ[,]?\\s*)?`, 'i');
  s = s.replace(prefix, '');
  s = s.replace(/\s*İŞİ\.?$/i, '');
  s = s.replace(/\s*İNŞAATI İLE ALTYAPI VE ÇEVRE DÜZENLEMESİ\s*$/i, ' İnşaatı');
  s = s.replace(/\s*İNŞAATLARI İLE ALTYAPI VE ÇEVRE DÜZENLEMESİ\s*$/i, ' İnşaatları');
  return titleCaseTr(s).trim();
}

const wb = XLSX.readFile(SRC);
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

const projects = [];
for (const r of rows.slice(1)) {
  const title = r[1];
  const collectors = Number(r[10]) || 0;
  if (!title || !collectors) continue;

  const il = String(r[2]).trim();
  const ilce = String(r[3]).trim();

  projects.push({
    title: cleanTitle(title, il, ilce),
    il,
    ilce,
    homes: Number(r[4]) || 0,
    blocks: Number(r[7]) || 0,
    collectors,
    aperture: Math.round(collectors * APERTURE_PER_COLLECTOR * 10) / 10,
    gross: Math.round(collectors * GROSS_PER_COLLECTOR * 10) / 10,
  });
}

projects.sort((a, b) => b.collectors - a.collectors);

const totals = projects.reduce(
  (acc, p) => ({
    projects: acc.projects + 1,
    homes: acc.homes + p.homes,
    blocks: acc.blocks + p.blocks,
    collectors: acc.collectors + p.collectors,
    aperture: acc.aperture + p.aperture,
    gross: acc.gross + p.gross,
  }),
  { projects: 0, homes: 0, blocks: 0, collectors: 0, aperture: 0, gross: 0 }
);
totals.aperture = Math.round(totals.aperture);
totals.gross = Math.round(totals.gross);
totals.provinces = new Set(projects.map((p) => p.il)).size;

writeFileSync(
  new URL('../src/data/tokiProjects.json', import.meta.url),
  `${JSON.stringify({ totals, projects }, null, 2)}\n`,
  'utf8'
);

console.log(
  `${projects.length} proje · ${totals.collectors.toLocaleString('tr-TR')} kollektör · ` +
    `${totals.aperture.toLocaleString('tr-TR')} m² ışınım · ${totals.provinces} il`
);
