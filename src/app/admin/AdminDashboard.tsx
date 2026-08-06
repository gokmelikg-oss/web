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
  Menu,
  X,
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

const inp =
  'w-full rounded-lg border border-mist-900/15 bg-white px-3 py-2.5 text-sm text-graphite-900 outline-none transition-shadow placeholder:text-mist-400 focus:border-volt-500 focus:ring-2 focus:ring-volt-500/20';
const lbl = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-mist-500';

const META: Record<Tab, { title: string; desc: string }> = {
  overview: { title: 'Genel Bakış', desc: 'İçeriğinize hızlı bir bakış ve kısayollar.' },
  products: { title: 'Ürünler', desc: 'Ürünleri, görselleri ve teknik özellikleri yönetin.' },
  posts: { title: 'Blog', desc: 'Blog yazılarını ekleyin, düzenleyin ve yayınlayın.' },
  references: { title: 'Referanslar', desc: 'Mevcut referansları gösterin/gizleyin, yeni ekleyin.' },
  documents: { title: 'Dökümanlar', desc: 'Katalog, föy ve kılavuz bağlantıları.' },
  images: { title: 'Grup Görselleri', desc: 'Ana sayfadaki ürün gruplarının temsili görselleri.' },
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      {children}
    </label>
  );
}

function ItemCard({ title, onDelete, children }: { title: string; onDelete: () => void; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-mist-900/10 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="truncate font-display text-sm font-bold text-graphite-950">{title || 'Yeni kayıt'}</h3>
        <button onClick={onDelete} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50" aria-label="Sil">
          <Trash2 size={14} /> Sil
        </button>
      </div>
      {children}
    </div>
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
  const [dirty, setDirty] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  function mark<T>(setter: (v: T) => void) {
    return (v: T) => {
      setDirty(true);
      setter(v);
    };
  }
  const setDocsD = mark(setDocs);
  const setRefsD = mark(setRefs);
  const setProductsD = mark(setProducts);
  const setPostsD = mark(setPosts);
  const setImagesD = mark(setImages);
  const setHiddenD = (fn: (cur: string[]) => string[]) => {
    setDirty(true);
    setHiddenRefs(fn);
  };

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
        setDirty(false);
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
    setHiddenD((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));

  const nav: { key: Tab; icon: typeof Package; count?: number }[] = [
    { key: 'overview', icon: LayoutDashboard },
    { key: 'products', icon: Package, count: products.length },
    { key: 'posts', icon: Newspaper, count: posts.length },
    { key: 'references', icon: MapPin, count: refs.length + hiddenRefs.length },
    { key: 'documents', icon: FileText, count: docs.length },
    { key: 'images', icon: ImageIcon },
  ];

  const addForTab: Partial<Record<Tab, { label: string; run: () => void }>> = {
    products: { label: 'Ürün ekle', run: () => setProductsD([{ id: rid(), name: '', category: 'Kolektör', model: '', description: '', image: '', specs: [] }, ...products]) },
    posts: { label: 'Yazı ekle', run: () => setPostsD([{ id: rid(), slug: '', title: '', category: 'Rehber', date: new Date().toISOString().slice(0, 10), cover: '', excerpt: '', body: '' }, ...posts]) },
    references: { label: 'Referans ekle', run: () => setRefsD([{ id: rid(), title: '', il: '', ilce: '', homes: undefined, collectors: undefined }, ...refs]) },
    documents: { label: 'Döküman ekle', run: () => setDocsD([{ id: rid(), name: '', url: '', type: 'catalog' }, ...docs]) },
  };
  const add = addForTab[tab];

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-volt-500 font-display text-xl font-bold text-graphite-950">Ş</span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-white">Şimşek Solar</p>
          <p className="text-[11px] text-graphite-400">Yönetim Paneli</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite-500">İçerik</p>
        {nav.map((n) => {
          const active = tab === n.key;
          return (
            <button
              key={n.key}
              onClick={() => { setTab(n.key); setNavOpen(false); }}
              className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? 'bg-white/10 text-white' : 'text-graphite-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {active && <span className="absolute inset-y-1.5 start-0 w-1 rounded-full bg-volt-500" aria-hidden />}
              <n.icon size={17} className={active ? 'text-volt-400' : ''} />
              <span className="flex-1 text-start">{META[n.key].title}</span>
              {typeof n.count === 'number' && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-volt-500 text-graphite-950' : 'bg-white/10 text-graphite-300'}`}>{n.count}</span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-graphite-400 hover:bg-white/5 hover:text-white">
          <ExternalLink size={17} /> Siteyi görüntüle
        </a>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-graphite-400 hover:bg-white/5 hover:text-white">
          <LogOut size={17} /> Çıkış yap
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-mist-100">
      {/* Sabit sol menü (masaüstü) */}
      <aside className="hidden w-64 shrink-0 bg-graphite-950 lg:block">{SidebarInner}</aside>

      {/* Mobil menü (overlay) */}
      {navOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-graphite-950/50" onClick={() => setNavOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 start-0 w-64 bg-graphite-950">{SidebarInner}</aside>
        </div>
      )}

      {/* Ana bölge */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Üst çubuk */}
        <header className="flex items-center justify-between gap-3 border-b border-mist-900/10 bg-white px-5 py-3.5 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setNavOpen(true)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-mist-900/15 text-graphite-700 lg:hidden" aria-label="Menü">
              <Menu size={18} />
            </button>
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg font-bold text-graphite-950">{META[tab].title}</h1>
              <p className="hidden truncate text-xs text-mist-500 sm:block">{META[tab].desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-mist-500 md:inline">
              {dirty ? 'Kaydedilmemiş değişiklik' : 'Tüm değişiklikler kayıtlı'}
            </span>
            <button
              onClick={save}
              disabled={saving}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 ${
                dirty ? 'bg-volt-500 text-graphite-950 shadow-glow' : 'bg-graphite-950 text-white'
              }`}
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
              {saved ? 'Kaydedildi' : 'Kaydet'}
            </button>
          </div>
        </header>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-8">
          <div className="mx-auto max-w-4xl">
            {/* Bölüm başlığı + ekle */}
            {tab !== 'overview' && tab !== 'images' && (
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-graphite-950">{META[tab].title}</h2>
                  <p className="mt-0.5 text-sm text-mist-600">{META[tab].desc}</p>
                </div>
                {add && (
                  <button onClick={add.run} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-graphite-950 px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
                    <Plus size={15} /> <span className="hidden sm:inline">{add.label}</span>
                  </button>
                )}
              </div>
            )}

            {/* Genel Bakış */}
            {tab === 'overview' && (
              <div>
                <div className="rounded-3xl bg-graphite-gradient p-7 text-white sm:p-9">
                  <h2 className="font-display text-2xl font-bold">Hoş geldiniz 👋</h2>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite-200">
                    Buradan sitenin ürünlerini, blog yazılarını, referanslarını ve dökümanlarını yönetebilirsiniz.
                    Değişiklikten sonra sağ üstteki <strong className="text-volt-300">Kaydet</strong> düğmesine basmanız yeterli;
                    site birkaç saniyede güncellenir.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {[
                    { label: 'Ürün', value: products.length, icon: Package, tint: 'bg-volt-100 text-volt-700' },
                    { label: 'Blog yazısı', value: posts.length, icon: Newspaper, tint: 'bg-sky-100 text-sky-700' },
                    { label: 'Ek referans', value: refs.length, icon: MapPin, tint: 'bg-emerald-100 text-emerald-700' },
                    { label: 'Gizli referans', value: hiddenRefs.length, icon: EyeOff, tint: 'bg-mist-200 text-graphite-700' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl border border-mist-900/10 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}><s.icon size={19} /></span>
                      <p className="mt-3 font-display text-2xl font-bold text-graphite-950">{s.value}</p>
                      <p className="mt-0.5 text-xs text-mist-600">{s.label}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 mb-3 text-[11px] font-semibold uppercase tracking-wide text-mist-500">Kısayollar</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {nav.filter((n) => n.key !== 'overview').map((n) => (
                    <button key={n.key} onClick={() => setTab(n.key)} className="flex items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 text-start shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all hover:-translate-y-0.5 hover:border-volt-500/40">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist-100 text-graphite-700"><n.icon size={18} /></span>
                      <div>
                        <p className="font-semibold text-graphite-950">{META[n.key].title}</p>
                        <p className="text-xs text-mist-500">{META[n.key].desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {initial.updatedAt && (
                  <p className="mt-6 text-xs text-mist-500">Son kayıt: {new Date(initial.updatedAt).toLocaleString('tr-TR')}</p>
                )}
              </div>
            )}

            {/* Ürünler */}
            {tab === 'products' && (
              <div className="space-y-4">
                {products.length === 0 && <Empty icon={Package} text="Henüz ürün yok. Sağ üstten “Ürün ekle” deyin." />}
                {products.map((p, i) => (
                  <ItemCard key={p.id} title={p.name} onDelete={() => setProductsD(products.filter((_, j) => j !== i))}>
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                      <Field label="Ürün adı"><input value={p.name} onChange={(e) => setProductsD(products.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} className={inp} /></Field>
                      <Field label="Kategori">
                        <select value={p.category} onChange={(e) => setProductsD(products.map((x, j) => (j === i ? { ...x, category: e.target.value } : x)))} className={inp}>
                          {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Model"><input value={p.model ?? ''} onChange={(e) => setProductsD(products.map((x, j) => (j === i ? { ...x, model: e.target.value } : x)))} className={inp} /></Field>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field label="Görsel yolu"><input value={p.image ?? ''} onChange={(e) => setProductsD(products.map((x, j) => (j === i ? { ...x, image: e.target.value } : x)))} placeholder="/products/orion-500.jpg" className={inp} /></Field>
                      <Field label="Kısa açıklama"><input value={p.description ?? ''} onChange={(e) => setProductsD(products.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} className={inp} /></Field>
                    </div>
                    <p className={`${lbl} mt-4`}>Teknik özellikler</p>
                    <div className="space-y-2">
                      {(p.specs ?? []).map((sp, si) => (
                        <div key={si} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
                          <input value={sp.label} onChange={(e) => setProductsD(updateSpec(products, i, si, { label: e.target.value }))} placeholder="Özellik" className={inp} />
                          <input value={sp.value} onChange={(e) => setProductsD(updateSpec(products, i, si, { value: e.target.value }))} placeholder="Değer" className={inp} />
                          <button onClick={() => setProductsD(products.map((x, j) => (j === i ? { ...x, specs: (x.specs ?? []).filter((_, k) => k !== si) } : x)))} className="inline-flex items-center justify-center rounded-lg border border-mist-900/15 px-2.5 text-mist-500 hover:border-red-300 hover:text-red-600" aria-label="Özelliği sil"><X size={15} /></button>
                        </div>
                      ))}
                      <button onClick={() => setProductsD(products.map((x, j) => (j === i ? { ...x, specs: [...(x.specs ?? []), { label: '', value: '' }] } : x)))} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-mist-900/25 px-3 py-1.5 text-xs font-semibold text-graphite-600 hover:border-graphite-950">
                        <Plus size={13} /> Özellik ekle
                      </button>
                    </div>
                  </ItemCard>
                ))}
              </div>
            )}

            {/* Blog */}
            {tab === 'posts' && (
              <div className="space-y-4">
                {posts.length === 0 && <Empty icon={Newspaper} text="Henüz yazı yok. Sağ üstten “Yazı ekle” deyin." />}
                {posts.map((p, i) => (
                  <ItemCard key={p.id} title={p.title} onDelete={() => setPostsD(posts.filter((_, j) => j !== i))}>
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                      <Field label="Başlık"><input value={p.title} onChange={(e) => { const v = e.target.value; setPostsD(posts.map((x, j) => (j === i ? { ...x, title: v, slug: x.slug ? x.slug : slugify(v) } : x))); }} className={inp} /></Field>
                      <Field label="URL adresi"><input value={p.slug} onChange={(e) => setPostsD(posts.map((x, j) => (j === i ? { ...x, slug: slugify(e.target.value) } : x)))} className={inp} /></Field>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <Field label="Kategori">
                        <select value={p.category ?? 'Rehber'} onChange={(e) => setPostsD(posts.map((x, j) => (j === i ? { ...x, category: e.target.value } : x)))} className={inp}>
                          {POST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Tarih"><input type="date" value={p.date ?? ''} onChange={(e) => setPostsD(posts.map((x, j) => (j === i ? { ...x, date: e.target.value } : x)))} className={inp} /></Field>
                      <Field label="Kapak görseli"><input value={p.cover ?? ''} onChange={(e) => setPostsD(posts.map((x, j) => (j === i ? { ...x, cover: e.target.value } : x)))} placeholder="/products/..." className={inp} /></Field>
                    </div>
                    <div className="mt-3"><Field label="Özet"><input value={p.excerpt ?? ''} onChange={(e) => setPostsD(posts.map((x, j) => (j === i ? { ...x, excerpt: e.target.value } : x)))} className={inp} /></Field></div>
                    <div className="mt-3"><Field label="İçerik ( ## başlık · boş satır = paragraf )"><textarea value={p.body ?? ''} onChange={(e) => setPostsD(posts.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)))} rows={8} className={inp} /></Field></div>
                  </ItemCard>
                ))}
              </div>
            )}

            {/* Referanslar */}
            {tab === 'references' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-mist-900/10 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                  <h3 className="font-display text-sm font-bold text-graphite-950">Mevcut referansları göster / gizle</h3>
                  <p className="mt-1 text-xs text-mist-500">Gizlenenler listede görünmez ama toplam sayımlarda (proje, kollektör, m²) kalır.</p>
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
                            <EyeOff size={12} /> {t.length > 36 ? t.slice(0, 36) + '…' : t}
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

                <div className="space-y-4">
                  <p className={lbl}>Yeni referans ekle</p>
                  {refs.map((r, i) => (
                    <ItemCard key={r.id} title={r.title} onDelete={() => setRefsD(refs.filter((_, j) => j !== i))}>
                      <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                        <Field label="İş adı"><input value={r.title} onChange={(e) => setRefsD(refs.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} className={inp} /></Field>
                        <Field label="İl"><input value={r.il} onChange={(e) => setRefsD(refs.map((x, j) => (j === i ? { ...x, il: e.target.value } : x)))} className={inp} /></Field>
                        <Field label="İlçe"><input value={r.ilce ?? ''} onChange={(e) => setRefsD(refs.map((x, j) => (j === i ? { ...x, ilce: e.target.value } : x)))} className={inp} /></Field>
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Field label="Konut sayısı"><input type="number" value={r.homes ?? ''} onChange={(e) => setRefsD(refs.map((x, j) => (j === i ? { ...x, homes: Number(e.target.value) } : x)))} className={inp} /></Field>
                        <Field label="Kollektör sayısı"><input type="number" value={r.collectors ?? ''} onChange={(e) => setRefsD(refs.map((x, j) => (j === i ? { ...x, collectors: Number(e.target.value) } : x)))} className={inp} /></Field>
                      </div>
                    </ItemCard>
                  ))}
                </div>
              </div>
            )}

            {/* Dökümanlar */}
            {tab === 'documents' && (
              <div className="space-y-3">
                {docs.length === 0 && <Empty icon={FileText} text="Henüz döküman yok. Sağ üstten “Döküman ekle” deyin." />}
                {docs.map((d, i) => (
                  <div key={d.id} className="grid gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:grid-cols-[1fr_1fr_auto]">
                    <input value={d.name} onChange={(e) => setDocsD(docs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} placeholder="Döküman adı" className={inp} />
                    <input value={d.url} onChange={(e) => setDocsD(docs.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} placeholder="/docs/... veya https://..." className={inp} />
                    <button onClick={() => setDocsD(docs.filter((_, j) => j !== i))} className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50" aria-label="Sil"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            )}

            {/* Grup görselleri */}
            {tab === 'images' && (
              <div>
                <h2 className="font-display text-xl font-bold text-graphite-950">{META.images.title}</h2>
                <p className="mt-0.5 text-sm text-mist-600">{META.images.desc}</p>
                <div className="mt-5 space-y-3">
                  {families.map((f) => (
                    <div key={f.id} className="grid items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:grid-cols-[180px_1fr]">
                      <span className="font-semibold text-graphite-950">{f.label}</span>
                      <input value={images[f.id] ?? ''} onChange={(e) => setImagesD({ ...images, [f.id]: e.target.value })} placeholder="/products/..." className={inp} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function updateSpec(list: AdminProduct[], i: number, si: number, patch: Partial<ProductSpecItem>): AdminProduct[] {
    return list.map((x, j) => (j === i ? { ...x, specs: (x.specs ?? []).map((s, k) => (k === si ? { ...s, ...patch } : s)) } : x));
  }
}

function Empty({ icon: Icon, text }: { icon: typeof Package; text: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-mist-900/20 bg-white py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist-100 text-mist-500"><Icon size={22} /></span>
      <p className="mt-3 text-sm text-mist-600">{text}</p>
    </div>
  );
}
