'use client';

import { useMemo, useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Package,
  Newspaper,
  FileText,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  LogOut,
  Check,
  Loader2,
  Search,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';
import type { SiteContent, DocLink, RefEntry, AdminProduct, AdminPost, ProductSpecItem } from '@/lib/content';

type Tab = 'overview' | 'products' | 'posts' | 'references' | 'documents' | 'images';
type StaticRef = { title: string; il: string; ilce?: string; collectors: number };

const rid = () => `id${Math.floor(performance.now() * 1000)}${Math.floor(1 + Math.random() * 998)}`;
const slugify = (s: string) =>
  s
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const PRODUCT_CATEGORIES = ['Kolektör', 'Boyler Serisi', 'Sehpa', 'Bağlantı Ekipmanı', 'Otomasyon', 'Paket Sistem', 'Diğer'];
const POST_CATEGORIES = ['Rehber', 'Teknik', 'Kalite', 'Bakım', 'Haber', 'Duyuru'];

const inp = 'w-full rounded-lg border border-mist-900/15 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-volt-500';
const lbl = 'mb-1 block text-[11px] font-semibold uppercase tracking-wide text-mist-500';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      {children}
    </label>
  );
}

export function AdminDashboard({
  initial,
  families,
  staticRefs,
}: {
  initial: SiteContent;
  families: { id: string; label: string }[];
  staticRefs: StaticRef[];
}) {
  const [tab, setTab] = useState<Tab>('overview');
  const [docs, setDocs] = useState<DocLink[]>(initial.documents);
  const [refs, setRefs] = useState<RefEntry[]>(initial.references);
  const [products, setProducts] = useState<AdminProduct[]>(initial.products ?? []);
  const [posts, setPosts] = useState<AdminPost[]>(initial.posts ?? []);
  const [hiddenRefs, setHiddenRefs] = useState<string[]>(initial.hiddenRefs ?? []);
  const [images, setImages] = useState<Record<string, string>>(initial.groupImages);
  const [refSearch, setRefSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: docs, references: refs, products, posts, hiddenRefs, groupImages: images, updatedAt: '' }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  const hiddenSet = useMemo(() => new Set(hiddenRefs), [hiddenRefs]);
  const refMatches = useMemo(() => {
    const q = refSearch.trim().toLocaleLowerCase('tr-TR');
    if (!q) return [] as StaticRef[];
    return staticRefs
      .filter((r) => r.title.toLocaleLowerCase('tr-TR').includes(q) || r.il.toLocaleLowerCase('tr-TR').includes(q))
      .slice(0, 40);
  }, [refSearch, staticRefs]);

  const toggleHidden = (title: string) =>
    setHiddenRefs((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));

  const nav: { key: Tab; label: string; icon: typeof Package; count?: number }[] = [
    { key: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
    { key: 'products', label: 'Ürünler', icon: Package, count: products.length },
    { key: 'posts', label: 'Blog', icon: Newspaper, count: posts.length },
    { key: 'references', label: 'Referanslar', icon: MapPin, count: refs.length + hiddenRefs.length },
    { key: 'documents', label: 'Dökümanlar', icon: FileText, count: docs.length },
    { key: 'images', label: 'Grup Görselleri', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-mist-50">
      {/* Üst çubuk */}
      <header className="sticky top-0 z-20 border-b border-mist-900/10 bg-white/90 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-graphite-950 font-display text-lg font-bold text-volt-500">Ş</span>
            <div className="leading-tight">
              <h1 className="font-display text-base font-bold text-graphite-950">Şimşek Solar — Yönetim</h1>
              <p className="text-[11px] text-mist-500">İçerik yönetim paneli</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 rounded-full border border-mist-900/15 px-4 py-2 text-sm font-semibold text-graphite-700 hover:border-graphite-950 sm:inline-flex">
              <ExternalLink size={14} /> Siteyi aç
            </a>
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60">
              {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
              {saved ? 'Kaydedildi' : 'Kaydet'}
            </button>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 px-3.5 py-2 text-sm font-semibold text-graphite-700 hover:border-graphite-950" aria-label="Çıkış">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-6 lg:flex-row lg:px-8">
        {/* Sol menü */}
        <aside className="lg:w-56 lg:shrink-0">
          <nav className="flex gap-1.5 overflow-x-auto rounded-2xl border border-mist-900/10 bg-white p-2 lg:flex-col lg:overflow-visible">
            {nav.map((n) => (
              <button
                key={n.key}
                onClick={() => setTab(n.key)}
                className={`inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  tab === n.key ? 'bg-graphite-950 text-white' : 'text-graphite-700 hover:bg-mist-100'
                }`}
              >
                <n.icon size={16} />
                <span className="flex-1 text-start">{n.label}</span>
                {typeof n.count === 'number' && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${tab === n.key ? 'bg-white/20 text-white' : 'bg-mist-100 text-mist-600'}`}>{n.count}</span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* İçerik */}
        <main className="min-w-0 flex-1">
          {/* Genel Bakış */}
          {tab === 'overview' && (
            <div>
              <h2 className="font-display text-xl font-bold text-graphite-950">Genel Bakış</h2>
              <p className="mt-1 text-sm text-mist-600">İçeriği düzenleyin, sağ üstten <strong>Kaydet</strong> deyin; değişiklikler sitede birkaç saniyede yayınlanır.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Ürün', value: products.length, icon: Package },
                  { label: 'Blog yazısı', value: posts.length, icon: Newspaper },
                  { label: 'Ek referans', value: refs.length, icon: MapPin },
                  { label: 'Gizli referans', value: hiddenRefs.length, icon: EyeOff },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-mist-900/10 bg-white p-5">
                    <s.icon size={18} className="text-volt-600" />
                    <p className="mt-3 font-display text-2xl font-bold text-graphite-950">{s.value}</p>
                    <p className="mt-0.5 text-xs text-mist-600">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {nav.filter((n) => n.key !== 'overview').map((n) => (
                  <button key={n.key} onClick={() => setTab(n.key)} className="flex items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 text-start transition-colors hover:border-volt-500/40">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-volt-100 text-volt-700"><n.icon size={18} /></span>
                    <div>
                      <p className="font-semibold text-graphite-950">{n.label}</p>
                      <p className="text-xs text-mist-500">Düzenle & yönet</p>
                    </div>
                  </button>
                ))}
              </div>
              {initial.updatedAt && (
                <p className="mt-5 text-xs text-mist-500">Son kayıt: {new Date(initial.updatedAt).toLocaleString('tr-TR')}</p>
              )}
            </div>
          )}

          {/* Ürünler */}
          {tab === 'products' && (
            <Section title="Ürünler" desc="Ürünleri ekleyin, düzenleyin, teknik özellik girin. Görseli önce public/products/ klasörüne yükleyip yolunu yazın.">
              <div className="space-y-4">
                {products.map((p, i) => (
                  <div key={p.id} className="rounded-2xl border border-mist-900/10 bg-white p-5">
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                      <Field label="Ürün adı"><input value={p.name} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} className={inp} /></Field>
                      <Field label="Kategori">
                        <select value={p.category} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, category: e.target.value } : x)))} className={inp}>
                          {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Model"><input value={p.model ?? ''} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, model: e.target.value } : x)))} className={inp} /></Field>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field label="Görsel yolu"><input value={p.image ?? ''} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, image: e.target.value } : x)))} placeholder="/products/orion-500.jpg" className={inp} /></Field>
                      <Field label="Kısa açıklama"><input value={p.description ?? ''} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} className={inp} /></Field>
                    </div>

                    {/* Teknik özellikler */}
                    <p className={`${lbl} mt-4`}>Teknik özellikler</p>
                    <div className="space-y-2">
                      {(p.specs ?? []).map((sp, si) => (
                        <div key={si} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
                          <input value={sp.label} onChange={(e) => updateSpec(products, setProducts, i, si, { label: e.target.value })} placeholder="Özellik (örn. Işınım alanı)" className={inp} />
                          <input value={sp.value} onChange={(e) => updateSpec(products, setProducts, i, si, { value: e.target.value })} placeholder="Değer (örn. 2.30 m²)" className={inp} />
                          <button onClick={() => setProducts(products.map((x, j) => (j === i ? { ...x, specs: (x.specs ?? []).filter((_, k) => k !== si) } : x)))} className="inline-flex items-center justify-center rounded-lg border border-red-200 px-2.5 text-red-600 hover:bg-red-50" aria-label="Özelliği sil"><Trash2 size={15} /></button>
                        </div>
                      ))}
                      <button onClick={() => setProducts(products.map((x, j) => (j === i ? { ...x, specs: [...(x.specs ?? []), { label: '', value: '' }] } : x)))} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-mist-900/25 px-3 py-1.5 text-xs font-semibold text-graphite-600 hover:border-graphite-950">
                        <Plus size={13} /> Özellik satırı ekle
                      </button>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button onClick={() => setProducts(products.filter((_, j) => j !== i))} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Ürünü sil</button>
                    </div>
                  </div>
                ))}
                <AddButton label="Ürün ekle" onClick={() => setProducts([...products, { id: rid(), name: '', category: 'Kolektör', model: '', description: '', image: '', specs: [] }])} />
              </div>
            </Section>
          )}

          {/* Blog */}
          {tab === 'posts' && (
            <Section title="Blog" desc="Yazı ekleyin/düzenleyin. İçerikte boş satır yeni paragraf, '## ' ile başlayan satır ara başlık olur.">
              <div className="space-y-4">
                {posts.map((p, i) => (
                  <div key={p.id} className="rounded-2xl border border-mist-900/10 bg-white p-5">
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                      <Field label="Başlık"><input value={p.title} onChange={(e) => { const v = e.target.value; setPosts(posts.map((x, j) => (j === i ? { ...x, title: v, slug: x.slug ? x.slug : slugify(v) } : x))); }} className={inp} /></Field>
                      <Field label="URL adresi"><input value={p.slug} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, slug: slugify(e.target.value) } : x)))} className={inp} /></Field>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <Field label="Kategori">
                        <select value={p.category ?? 'Rehber'} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, category: e.target.value } : x)))} className={inp}>
                          {POST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Tarih"><input type="date" value={p.date ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, date: e.target.value } : x)))} className={inp} /></Field>
                      <Field label="Kapak görseli"><input value={p.cover ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, cover: e.target.value } : x)))} placeholder="/products/..." className={inp} /></Field>
                    </div>
                    <div className="mt-3">
                      <Field label="Özet"><input value={p.excerpt ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, excerpt: e.target.value } : x)))} className={inp} /></Field>
                    </div>
                    <div className="mt-3">
                      <Field label="İçerik"><textarea value={p.body ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)))} rows={8} className={inp} /></Field>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button onClick={() => setPosts(posts.filter((_, j) => j !== i))} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Yazıyı sil</button>
                    </div>
                  </div>
                ))}
                <AddButton label="Yazı ekle" onClick={() => setPosts([...posts, { id: rid(), slug: '', title: '', category: 'Rehber', date: new Date().toISOString().slice(0, 10), cover: '', excerpt: '', body: '' }])} />
              </div>
            </Section>
          )}

          {/* Referanslar */}
          {tab === 'references' && (
            <Section title="Referanslar" desc="Yeni referans ekleyin; ayrıca mevcut (350) referanstan istediğinizi listede gizleyin. Gizlenenler toplam sayımlarda kalır.">
              {/* Gizle / göster yöneticisi */}
              <div className="rounded-2xl border border-mist-900/10 bg-white p-5">
                <p className="font-semibold text-graphite-950">Mevcut referansları göster / gizle</p>
                <div className="relative mt-3">
                  <Search size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-mist-400" />
                  <input value={refSearch} onChange={(e) => setRefSearch(e.target.value)} placeholder="İş adı veya il ara…" className={`${inp} ps-9`} />
                </div>

                {hiddenRefs.length > 0 && (
                  <div className="mt-4">
                    <p className={lbl}>Gizlenenler ({hiddenRefs.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {hiddenRefs.map((t) => (
                        <button key={t} onClick={() => toggleHidden(t)} className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 bg-mist-50 px-3 py-1 text-xs text-graphite-700 hover:border-graphite-950" title="Tekrar göster">
                          <EyeOff size={12} /> {t.length > 40 ? t.slice(0, 40) + '…' : t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {refSearch && (
                  <div className="mt-4 space-y-1.5">
                    {refMatches.length === 0 && <p className="text-sm text-mist-500">Sonuç yok.</p>}
                    {refMatches.map((r) => {
                      const hidden = hiddenSet.has(r.title);
                      return (
                        <div key={r.title} className="flex items-center justify-between gap-3 rounded-lg border border-mist-900/10 px-3 py-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-graphite-950">{r.title}</p>
                            <p className="text-[11px] text-mist-500">{r.il}{r.ilce ? ` · ${r.ilce}` : ''} · {r.collectors} kollektör</p>
                          </div>
                          <button onClick={() => toggleHidden(r.title)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${hidden ? 'bg-mist-100 text-graphite-700' : 'bg-graphite-950 text-white'}`}>
                            {hidden ? <><Eye size={12} /> Göster</> : <><EyeOff size={12} /> Gizle</>}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Yeni referans ekle */}
              <p className={`${lbl} mt-6`}>Yeni referans ekle</p>
              <div className="space-y-3">
                {refs.map((r, i) => (
                  <div key={r.id} className="rounded-2xl border border-mist-900/10 bg-white p-4">
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                      <input value={r.title} onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} placeholder="İş adı" className={inp} />
                      <input value={r.il} onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, il: e.target.value } : x)))} placeholder="İl" className={inp} />
                      <input value={r.ilce ?? ''} onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, ilce: e.target.value } : x)))} placeholder="İlçe" className={inp} />
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                      <input type="number" value={r.homes ?? ''} onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, homes: Number(e.target.value) } : x)))} placeholder="Konut" className={inp} />
                      <input type="number" value={r.collectors ?? ''} onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, collectors: Number(e.target.value) } : x)))} placeholder="Kollektör" className={inp} />
                      <button onClick={() => setRefs(refs.filter((_, j) => j !== i))} className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50" aria-label="Sil"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                <AddButton label="Referans ekle" onClick={() => setRefs([...refs, { id: rid(), title: '', il: '', ilce: '', homes: undefined, collectors: undefined }])} />
              </div>
            </Section>
          )}

          {/* Dökümanlar */}
          {tab === 'documents' && (
            <Section title="Dökümanlar" desc="Teknik föy, katalog ve kılavuz bağlantıları. Dosyayı public/docs/ altına yükleyip yolunu girin.">
              <div className="space-y-3">
                {docs.map((d, i) => (
                  <div key={d.id} className="grid gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 sm:grid-cols-[1fr_1fr_auto]">
                    <input value={d.name} onChange={(e) => setDocs(docs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} placeholder="Döküman adı" className={inp} />
                    <input value={d.url} onChange={(e) => setDocs(docs.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} placeholder="/docs/... veya https://..." className={inp} />
                    <button onClick={() => setDocs(docs.filter((_, j) => j !== i))} className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50" aria-label="Sil"><Trash2 size={16} /></button>
                  </div>
                ))}
                <AddButton label="Döküman ekle" onClick={() => setDocs([...docs, { id: rid(), name: '', url: '', type: 'catalog' }])} />
              </div>
            </Section>
          )}

          {/* Grup görselleri */}
          {tab === 'images' && (
            <Section title="Grup Görselleri" desc="Her ürün grubu için ana sayfada görünen temsili görselin yolu.">
              <div className="space-y-3">
                {families.map((f) => (
                  <div key={f.id} className="grid items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 sm:grid-cols-[180px_1fr]">
                    <span className="font-semibold text-graphite-950">{f.label}</span>
                    <input value={images[f.id] ?? ''} onChange={(e) => setImages({ ...images, [f.id]: e.target.value })} placeholder="/products/..." className={inp} />
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-graphite-950">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm text-mist-600">{desc}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2 rounded-full border border-dashed border-mist-900/25 px-5 py-2.5 text-sm font-semibold text-graphite-700 hover:border-graphite-950">
      <Plus size={15} /> {label}
    </button>
  );
}

function updateSpec(
  products: AdminProduct[],
  setProducts: (p: AdminProduct[]) => void,
  i: number,
  si: number,
  patch: Partial<ProductSpecItem>,
) {
  setProducts(
    products.map((x, j) =>
      j === i ? { ...x, specs: (x.specs ?? []).map((s, k) => (k === si ? { ...s, ...patch } : s)) } : x,
    ),
  );
}
