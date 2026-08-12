import type { SiteContent } from './content';

/* İki içerik sürümü arasındaki farkın insan-okunur özeti.
   İşlem kaydında "12 ürün kaydedildi" yerine "2 ürün eklendi, 1 yazı düzenlendi"
   yazabilmek için. Saf fonksiyon — veritabanı/dosya erişimi yok. */

type Keyed = { id: string };

function diffList<T extends Keyed>(
  before: T[] | undefined,
  after: T[] | undefined,
  label: string,
  title: (item: T) => string
): string[] {
  const a = new Map((before ?? []).map((x) => [x.id, x]));
  const b = new Map((after ?? []).map((x) => [x.id, x]));
  const out: string[] = [];

  const added = Array.from(b.keys()).filter((k) => !a.has(k));
  const removed = Array.from(a.keys()).filter((k) => !b.has(k));
  const changed = Array.from(b.keys()).filter(
    (k) => a.has(k) && JSON.stringify(a.get(k)) !== JSON.stringify(b.get(k))
  );

  const names = (keys: string[], src: Map<string, T>) =>
    keys.slice(0, 3).map((k) => title(src.get(k)!) || 'adsız').join(', ') +
    (keys.length > 3 ? ` ve ${keys.length - 3} tane daha` : '');

  if (added.length) out.push(`${label} eklendi (${added.length}): ${names(added, b)}`);
  if (removed.length) out.push(`${label} silindi (${removed.length}): ${names(removed, a)}`);
  if (changed.length) out.push(`${label} düzenlendi (${changed.length}): ${names(changed, b)}`);
  return out;
}

/* Metin alanlarında hangi anahtarların değiştiği. */
function diffTexts(before: Record<string, string> = {}, after: Record<string, string> = {}): string[] {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  const changed = Array.from(keys).filter((k) => (before[k] ?? '') !== (after[k] ?? ''));
  if (!changed.length) return [];
  const shown = changed.slice(0, 3).join(', ');
  return [`metin değişti (${changed.length}): ${shown}${changed.length > 3 ? '…' : ''}`];
}

export function describeContentChange(before: SiteContent | undefined, after: SiteContent): string {
  if (!before) return 'ilk kayıt';

  const parts = [
    ...diffList(before.products, after.products, 'ürün', (p) => p.name),
    ...diffList(before.posts, after.posts, 'yazı', (p) => p.title),
    ...diffList(before.references, after.references, 'referans', (r) => r.title),
    ...diffList(before.documents, after.documents, 'döküman', (d) => d.name),
    ...diffTexts(before.texts, after.texts),
  ];

  const beforeHidden = new Set(before.hiddenRefs ?? []);
  const afterHidden = new Set(after.hiddenRefs ?? []);
  const hiddenAdded = Array.from(afterHidden).filter((t) => !beforeHidden.has(t)).length;
  const hiddenRemoved = Array.from(beforeHidden).filter((t) => !afterHidden.has(t)).length;
  if (hiddenAdded) parts.push(`${hiddenAdded} referans gizlendi`);
  if (hiddenRemoved) parts.push(`${hiddenRemoved} referans yeniden gösterildi`);

  if (JSON.stringify(before.groupImages ?? {}) !== JSON.stringify(after.groupImages ?? {})) {
    parts.push('grup görselleri değişti');
  }

  return parts.length ? parts.join(' · ') : 'değişiklik yok';
}
