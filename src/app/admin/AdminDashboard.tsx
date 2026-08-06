'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Package, Newspaper, FileText, MapPin, Image as ImageIcon, Type,
  Plus, Trash2, Save, LogOut, Check, Loader2, Search, Eye, EyeOff,
  RotateCcw, History, ChevronRight,
} from 'lucide-react';
import type { SiteContent, DocLink, RefEntry, AdminProduct, AdminPost, ProductSpecItem } from '@/lib/content';
import { TEXT_FIELDS, TEXT_GROUPS } from '@/lib/siteTexts';

type Tab = 'overview' | 'texts' | 'products' | 'posts' | 'references' | 'documents' | 'images';
type StaticRef = { title: string; il: string; ilce?: string; collectors: number };

const rid = () => `id${Math.floor(performance.now() * 1000)}${Math.floor(1 + Math.random() * 998)}`;
const slugify = (s: string) =>
  s.toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const PRODUCT_CATEGORIES = ['Kolektör', 'Boyler Serisi', 'Sehpa', 'Bağlantı Ekipmanı', 'Otomasyon', 'Paket Sistem', 'Diğer'];
const POST_CATEGORIES = ['Rehber', 'Teknik', 'Kalite', 'Bakım', 'Haber', 'Duyuru'];

const inp = 'w-full rounded-lg border border-mist-900/15 bg-white px-3 py-2.5 text-sm text-graphite-900 outline-none transition-shadow placeholder:text-mist-400 focus:border-volt-500 focus:ring-2 focus:ring-volt-500/20';
const lbl = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-mist-500';

const SECTIONS: { key: Tab; icon: typeof Package; label: string; desc: string }[] = [
  { key: 'overview', icon: LayoutDashboard, label: 'Genel Bakış', desc: 'İçeriğe bakış ve kısayollar' },
  { key: 'texts', icon: Type, label: 'Sayfa Metinleri', desc: 'Hero, misyon-vizyon, iletişim metinleri' },
  { key: 'products', icon: Package, label: 'Ürünler', desc: 'Ürünler ve teknik özellikler' },
  { key: 'posts', icon: Newspaper, label: 'Blog', desc: 'Blog yazıları' },
  { key: 'references', icon: MapPin, label: 'Referanslar', desc: 'Göster/gizle ve yeni ekle' },
  { key: 'documents', icon: FileText, label: 'Dökümanlar', desc: 'Katalog ve föy bağlantıları' },
  { key: 'images', icon: ImageIcon, label: 'Grup Görselleri', desc: 'Ürün grubu görselleri' },
];
const LIST_SECTIONS = new Set<Tab>(['products', 'posts']);

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (<label className="block"><span className={lbl}>{label}</span>{children}</label>);
}

export function AdminDashboard({
  initial, families, staticRefs, prev,
}: {
  initial: SiteContent;
  families: { id: string; label: string }[];
  staticRefs: StaticRef[];
  prev: SiteContent | null;
}) {
  const [section, setSection] = useState<Tab>('overview');
  const [sel, setSel] = useState<number | null>(null);
  const [docs, setDocs] = useState<DocLink[]>(initial.documents);
  const [refs, setRefs] = useState<RefEntry[]>(initial.references);
  const [products, setProducts] = useState<AdminProduct[]>(initial.products ?? []);
  const [posts, setPosts] = useState<AdminPost[]>(initial.posts ?? []);
  const [hiddenRefs, setHiddenRefs] = useState<string[]>(initial.hiddenRefs ?? []);
  const [texts, setTexts] = useState<Record<string, string>>(initial.texts ?? {});
  const [images, setImages] = useState<Record<string, string>>(initial.groupImages);
  const [refSearch, setRefSearch] = useState('');
  const [listSearch, setListSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const touch = () => setDirty(true);

  function go(next: Tab) {
    setSection(next);
    setListSearch('');
    setSel(next === 'products' && products.length ? 0 : next === 'posts' && posts.length ? 0 : null);
  }
  function loadFrom(src: SiteContent, markDirty: boolean) {
    setDocs(src.documents ?? []); setRefs(src.references ?? []); setProducts(src.products ?? []);
    setPosts(src.posts ?? []); setHiddenRefs(src.hiddenRefs ?? []);
    setTexts({ ...(initial.texts ?? {}), ...(src.texts ?? {}) }); setImages(src.groupImages ?? {});
    setDirty(markDirty); setSel(null);
  }
  function revertUnsaved() { if (dirty && !window.confirm('Kaydedilmemiş değişiklikler geri alınsın mı?')) return; loadFrom(initial, false); }
  function restorePrev() { if (!prev) return; if (!window.confirm('Bir önceki kaydedilmiş sürüme dönülsün mü?')) return; loadFrom(prev, true); }

  async function save() {
    setSaving(true); setSaved(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: docs, references: refs, products, posts, hiddenRefs, texts, groupImages: images, updatedAt: '' }),
      });
      if (res.ok) { setSaved(true); setDirty(false); setTimeout(() => setSaved(false), 2500); }
    } finally { setSaving(false); }
  }
  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/admin/login'; }

  const hiddenSet = useMemo(() => new Set(hiddenRefs), [hiddenRefs]);
  const refMatches = useMemo(() => {
    const q = refSearch.trim().toLocaleLowerCase('tr-TR');
    if (!q) return [] as StaticRef[];
    return staticRefs.filter((r) => r.title.toLocaleLowerCase('tr-TR').includes(q) || r.il.toLocaleLowerCase('tr-TR').includes(q)).slice(0, 40);
  }, [refSearch, staticRefs]);
  const toggleHidden = (title: string) => { touch(); setHiddenRefs((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title])); };

  // Update helpers
  const upProduct = (i: number, patch: Partial<AdminProduct>) => { touch(); setProducts((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x))); };
  const upPost = (i: number, patch: Partial<AdminPost>) => { touch(); setPosts((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x))); };
  const upRef = (i: number, patch: Partial<RefEntry>) => { touch(); setRefs((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x))); };
  const upDoc = (i: number, patch: Partial<DocLink>) => { touch(); setDocs((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x))); };

  const addProduct = () => { touch(); setProducts((l) => [{ id: rid(), name: '', category: 'Kolektör', model: '', description: '', image: '', specs: [] }, ...l]); setSel(0); };
  const addPost = () => { touch(); setPosts((l) => [{ id: rid(), slug: '', title: '', category: 'Rehber', date: new Date().toISOString().slice(0, 10), cover: '', excerpt: '', body: '' }, ...l]); setSel(0); };
  const addRef = () => { touch(); setRefs((l) => [{ id: rid(), title: '', il: '', ilce: '', homes: undefined, collectors: undefined }, ...l]); };
  const addDoc = () => { touch(); setDocs((l) => [{ id: rid(), name: '', url: '', type: 'catalog' }, ...l]); };

  const meta = SECTIONS.find((s) => s.key === section)!;
  const isList = LIST_SECTIONS.has(section);
  const listItems = section === 'products' ? products : section === 'posts' ? posts : [];
  const filteredList = useMemo(() => {
    const q = listSearch.trim().toLocaleLowerCase('tr-TR');
    return listItems
      .map((it, idx) => ({ it, idx }))
      .filter(({ it }) => {
        if (!q) return true;
        const name = section === 'products' ? (it as AdminProduct).name : (it as AdminPost).title;
        return (name ?? '').toLocaleLowerCase('tr-TR').includes(q);
      });
  }, [listItems, listSearch, section]);

  useEffect(() => { if (sel !== null && sel >= listItems.length) setSel(listItems.length ? 0 : null); }, [listItems.length, sel]);

  return (
    <div className="flex h-screen overflow-hidden bg-mist-50 text-graphite-900">
      {/* Rail */}
      <nav className="flex w-[76px] shrink-0 flex-col items-center border-r border-mist-900/10 bg-white py-4">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-graphite-950 font-display text-xl font-bold text-volt-500">Ş</span>
        <div className="flex flex-1 flex-col items-center gap-1.5">
          {SECTIONS.map((s) => {
            const active = section === s.key;
            return (
              <button key={s.key} onClick={() => go(s.key)} title={s.label}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${active ? 'bg-volt-500 text-graphite-950' : 'text-mist-500 hover:bg-mist-100 hover:text-graphite-900'}`}>
                <s.icon size={19} />
                <span className="pointer-events-none absolute start-full z-20 ms-2 hidden whitespace-nowrap rounded-lg bg-graphite-950 px-2.5 py-1 text-xs font-medium text-white shadow-lg group-hover:block">{s.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <a href="/" target="_blank" rel="noopener noreferrer" title="Siteyi önizle" className="flex h-11 w-11 items-center justify-center rounded-xl text-mist-500 hover:bg-mist-100 hover:text-graphite-900"><Eye size={19} /></a>
          <button onClick={logout} title="Çıkış" className="flex h-11 w-11 items-center justify-center rounded-xl text-mist-500 hover:bg-mist-100 hover:text-red-600"><LogOut size={19} /></button>
        </div>
      </nav>

      {/* Sağ kolon */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Üst çubuk */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-mist-900/10 bg-white px-5 lg:px-7">
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-bold text-graphite-950">{meta.label}</h1>
            <p className="hidden truncate text-xs text-mist-500 sm:block">{meta.desc}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`hidden items-center gap-1.5 text-xs md:inline-flex ${dirty ? 'text-amber-600' : 'text-mist-400'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${dirty ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              {dirty ? 'Kaydedilmemiş' : 'Kayıtlı'}
            </span>
            {dirty && (
              <button onClick={revertUnsaved} className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 px-3.5 py-2 text-sm font-semibold text-graphite-700 hover:border-graphite-950" title="Değişiklikleri geri al">
                <RotateCcw size={15} /> <span className="hidden sm:inline">Geri Al</span>
              </button>
            )}
            <button onClick={save} disabled={saving}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 ${dirty ? 'bg-volt-500 text-graphite-950 shadow-glow' : 'bg-graphite-950 text-white'}`}>
              {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
              {saved ? 'Kaydedildi' : 'Kaydet'}
            </button>
          </div>
        </header>

        {/* Gövde: liste + editör  ·  veya tek pano */}
        <div className="flex min-h-0 flex-1">
          {isList && (
            <div className="flex w-72 shrink-0 flex-col border-r border-mist-900/10 bg-white lg:w-80">
              <div className="flex items-center gap-2 border-b border-mist-900/10 p-3">
                <div className="relative flex-1">
                  <Search size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-mist-400" />
                  <input value={listSearch} onChange={(e) => setListSearch(e.target.value)} placeholder="Ara…" className={`${inp} ps-9 py-2`} />
                </div>
                <button onClick={section === 'products' ? addProduct : addPost} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-graphite-950 px-3 text-sm font-semibold text-white" title="Yeni ekle"><Plus size={15} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {filteredList.length === 0 && <p className="px-3 py-8 text-center text-sm text-mist-400">Kayıt yok.</p>}
                {filteredList.map(({ it, idx }) => {
                  const active = sel === idx;
                  const title = section === 'products' ? (it as AdminProduct).name : (it as AdminPost).title;
                  const sub = section === 'products' ? (it as AdminProduct).category : (it as AdminPost).date;
                  return (
                    <button key={(it as { id: string }).id} onClick={() => setSel(idx)}
                      className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start transition-colors ${active ? 'bg-volt-50 ring-1 ring-volt-500/30' : 'hover:bg-mist-100'}`}>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-graphite-950">{title || 'Adsız'}</p>
                        <p className="truncate text-[11px] text-mist-500">{sub}</p>
                      </div>
                      <ChevronRight size={15} className={active ? 'text-volt-600' : 'text-mist-300'} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Editör / içerik */}
          <div className="min-w-0 flex-1 overflow-y-auto p-5 lg:p-8">
            <div className="mx-auto max-w-3xl">
              {section === 'overview' && (
                <div>
                  <div className="rounded-3xl bg-graphite-gradient p-7 text-white sm:p-9">
                    <h2 className="font-display text-2xl font-bold">Hoş geldiniz 👋</h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite-200">Soldaki menüden bir bölüm seçin. Değişiklikten sonra sağ üstteki <strong className="text-volt-300">Kaydet</strong> yeterli.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {[
                      { label: 'Ürün', value: products.length, icon: Package, tint: 'bg-volt-100 text-volt-700' },
                      { label: 'Blog yazısı', value: posts.length, icon: Newspaper, tint: 'bg-sky-100 text-sky-700' },
                      { label: 'Ek referans', value: refs.length, icon: MapPin, tint: 'bg-emerald-100 text-emerald-700' },
                      { label: 'Gizli referans', value: hiddenRefs.length, icon: EyeOff, tint: 'bg-mist-200 text-graphite-700' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl border border-mist-900/10 bg-white p-5">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}><s.icon size={19} /></span>
                        <p className="mt-3 font-display text-2xl font-bold text-graphite-950">{s.value}</p>
                        <p className="mt-0.5 text-xs text-mist-600">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {SECTIONS.filter((s) => s.key !== 'overview').map((s) => (
                      <button key={s.key} onClick={() => go(s.key)} className="flex items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 text-start transition-all hover:-translate-y-0.5 hover:border-volt-500/40">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist-100 text-graphite-700"><s.icon size={18} /></span>
                        <div><p className="font-semibold text-graphite-950">{s.label}</p><p className="text-xs text-mist-500">{s.desc}</p></div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {initial.updatedAt && <p className="text-xs text-mist-500">Son kayıt: {new Date(initial.updatedAt).toLocaleString('tr-TR')}</p>}
                    {prev && <button onClick={restorePrev} className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 px-3.5 py-1.5 text-xs font-semibold text-graphite-700 hover:border-graphite-950"><History size={13} /> Bir önceki kayda dön</button>}
                  </div>
                </div>
              )}

              {section === 'texts' && (
                <div className="space-y-5">
                  <p className="rounded-xl border border-volt-500/30 bg-volt-50 px-4 py-2.5 text-xs text-graphite-700">Sitedeki gerçek metinler. Boş bırakılırsa varsayılan kullanılır.</p>
                  {TEXT_GROUPS.map((group) => (
                    <div key={group} className="rounded-2xl border border-mist-900/10 bg-white p-5">
                      <h3 className="font-display text-sm font-bold text-graphite-950">{group}</h3>
                      <div className="mt-4 space-y-4">
                        {TEXT_FIELDS.filter((f) => f.group === group).map((f) => (
                          <Field key={f.key} label={f.label}>
                            {f.multiline
                              ? <textarea value={texts[f.key] ?? f.default} onChange={(e) => { touch(); setTexts({ ...texts, [f.key]: e.target.value }); }} rows={3} className={inp} />
                              : <input value={texts[f.key] ?? f.default} onChange={(e) => { touch(); setTexts({ ...texts, [f.key]: e.target.value }); }} className={inp} />}
                          </Field>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section === 'products' && (sel === null || !products[sel]
                ? <Empty icon={Package} text="Soldan bir ürün seçin veya + ile yeni ekleyin." />
                : (() => { const i = sel; const p = products[i]; return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-graphite-950">{p.name || 'Yeni ürün'}</h2>
                      <button onClick={() => { touch(); setProducts(products.filter((_, j) => j !== i)); setSel(null); }} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Sil</button></div>
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                      <Field label="Ürün adı"><input value={p.name} onChange={(e) => upProduct(i, { name: e.target.value })} className={inp} /></Field>
                      <Field label="Kategori"><select value={p.category} onChange={(e) => upProduct(i, { category: e.target.value })} className={inp}>{PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
                      <Field label="Model"><input value={p.model ?? ''} onChange={(e) => upProduct(i, { model: e.target.value })} className={inp} /></Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Görsel yolu"><input value={p.image ?? ''} onChange={(e) => upProduct(i, { image: e.target.value })} placeholder="/products/orion-500.jpg" className={inp} /></Field>
                      <Field label="Kısa açıklama"><input value={p.description ?? ''} onChange={(e) => upProduct(i, { description: e.target.value })} className={inp} /></Field>
                    </div>
                    <div>
                      <p className={lbl}>Teknik özellikler</p>
                      <div className="space-y-2">
                        {(p.specs ?? []).map((sp, si) => (
                          <div key={si} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
                            <input value={sp.label} onChange={(e) => upProduct(i, { specs: (p.specs ?? []).map((s, k) => (k === si ? { ...s, label: e.target.value } : s)) })} placeholder="Özellik" className={inp} />
                            <input value={sp.value} onChange={(e) => upProduct(i, { specs: (p.specs ?? []).map((s, k) => (k === si ? { ...s, value: e.target.value } : s)) })} placeholder="Değer" className={inp} />
                            <button onClick={() => upProduct(i, { specs: (p.specs ?? []).filter((_, k) => k !== si) })} className="inline-flex items-center justify-center rounded-lg border border-mist-900/15 px-2.5 text-mist-500 hover:border-red-300 hover:text-red-600"><Trash2 size={15} /></button>
                          </div>
                        ))}
                        <button onClick={() => upProduct(i, { specs: [...(p.specs ?? []), { label: '', value: '' } as ProductSpecItem] })} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-mist-900/25 px-3 py-1.5 text-xs font-semibold text-graphite-600 hover:border-graphite-950"><Plus size={13} /> Özellik ekle</button>
                      </div>
                    </div>
                  </div>
                ); })()
              )}

              {section === 'posts' && (sel === null || !posts[sel]
                ? <Empty icon={Newspaper} text="Soldan bir yazı seçin veya + ile yeni ekleyin." />
                : (() => { const i = sel; const p = posts[i]; return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-graphite-950">{p.title || 'Yeni yazı'}</h2>
                      <button onClick={() => { touch(); setPosts(posts.filter((_, j) => j !== i)); setSel(null); }} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Sil</button></div>
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                      <Field label="Başlık"><input value={p.title} onChange={(e) => { const v = e.target.value; upPost(i, { title: v, slug: p.slug ? p.slug : slugify(v) }); }} className={inp} /></Field>
                      <Field label="URL adresi"><input value={p.slug} onChange={(e) => upPost(i, { slug: slugify(e.target.value) })} className={inp} /></Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field label="Kategori"><select value={p.category ?? 'Rehber'} onChange={(e) => upPost(i, { category: e.target.value })} className={inp}>{POST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
                      <Field label="Tarih"><input type="date" value={p.date ?? ''} onChange={(e) => upPost(i, { date: e.target.value })} className={inp} /></Field>
                      <Field label="Kapak"><input value={p.cover ?? ''} onChange={(e) => upPost(i, { cover: e.target.value })} placeholder="/products/..." className={inp} /></Field>
                    </div>
                    <Field label="Özet"><input value={p.excerpt ?? ''} onChange={(e) => upPost(i, { excerpt: e.target.value })} className={inp} /></Field>
                    <Field label="İçerik ( ## başlık · boş satır = paragraf )"><textarea value={p.body ?? ''} onChange={(e) => upPost(i, { body: e.target.value })} rows={12} className={inp} /></Field>
                  </div>
                ); })()
              )}

              {section === 'references' && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-mist-900/10 bg-white p-5">
                    <h3 className="font-display text-sm font-bold text-graphite-950">Mevcut referansları göster / gizle</h3>
                    <p className="mt-1 text-xs text-mist-500">Gizlenenler listede görünmez; toplam sayımlarda kalır.</p>
                    <div className="relative mt-3">
                      <Search size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-mist-400" />
                      <input value={refSearch} onChange={(e) => setRefSearch(e.target.value)} placeholder="İş adı veya il ara…" className={`${inp} ps-9`} />
                    </div>
                    {hiddenRefs.length > 0 && (
                      <div className="mt-4"><p className={lbl}>Gizlenenler ({hiddenRefs.length})</p>
                        <div className="flex flex-wrap gap-2">{hiddenRefs.map((t) => (<button key={t} onClick={() => toggleHidden(t)} className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 bg-mist-50 px-3 py-1 text-xs text-graphite-700 hover:border-graphite-950"><EyeOff size={12} /> {t.length > 34 ? t.slice(0, 34) + '…' : t}</button>))}</div>
                      </div>
                    )}
                    {refSearch && (
                      <div className="mt-4 space-y-1.5">
                        {refMatches.length === 0 && <p className="text-sm text-mist-500">Sonuç yok.</p>}
                        {refMatches.map((r) => { const hidden = hiddenSet.has(r.title); return (
                          <div key={r.title} className="flex items-center justify-between gap-3 rounded-lg border border-mist-900/10 px-3 py-2">
                            <div className="min-w-0"><p className="truncate text-sm font-medium text-graphite-950">{r.title}</p><p className="text-[11px] text-mist-500">{r.il}{r.ilce ? ` · ${r.ilce}` : ''} · {r.collectors} kollektör</p></div>
                            <button onClick={() => toggleHidden(r.title)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${hidden ? 'bg-mist-100 text-graphite-700' : 'bg-graphite-950 text-white'}`}>{hidden ? <><Eye size={12} /> Göster</> : <><EyeOff size={12} /> Gizle</>}</button>
                          </div>); })}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-3 flex items-center justify-between"><p className={lbl + ' mb-0'}>Yeni referanslar</p>
                      <button onClick={addRef} className="inline-flex items-center gap-1.5 rounded-full bg-graphite-950 px-3.5 py-2 text-sm font-semibold text-white"><Plus size={14} /> Ekle</button></div>
                    <div className="space-y-3">
                      {refs.length === 0 && <Empty icon={MapPin} text="Yeni referans eklemek için “Ekle” deyin." />}
                      {refs.map((r, i) => (
                        <div key={r.id} className="rounded-2xl border border-mist-900/10 bg-white p-4">
                          <div className="mb-3 flex justify-end"><button onClick={() => { touch(); setRefs(refs.filter((_, j) => j !== i)); }} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50"><Trash2 size={14} /> Sil</button></div>
                          <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                            <Field label="İş adı"><input value={r.title} onChange={(e) => upRef(i, { title: e.target.value })} className={inp} /></Field>
                            <Field label="İl"><input value={r.il} onChange={(e) => upRef(i, { il: e.target.value })} className={inp} /></Field>
                            <Field label="İlçe"><input value={r.ilce ?? ''} onChange={(e) => upRef(i, { ilce: e.target.value })} className={inp} /></Field>
                          </div>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <Field label="Konut"><input type="number" value={r.homes ?? ''} onChange={(e) => upRef(i, { homes: Number(e.target.value) })} className={inp} /></Field>
                            <Field label="Kollektör"><input type="number" value={r.collectors ?? ''} onChange={(e) => upRef(i, { collectors: Number(e.target.value) })} className={inp} /></Field>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section === 'documents' && (
                <div>
                  <div className="mb-4 flex items-center justify-between"><p className={lbl + ' mb-0'}>Döküman bağlantıları</p>
                    <button onClick={addDoc} className="inline-flex items-center gap-1.5 rounded-full bg-graphite-950 px-3.5 py-2 text-sm font-semibold text-white"><Plus size={14} /> Ekle</button></div>
                  <div className="space-y-3">
                    {docs.length === 0 && <Empty icon={FileText} text="Döküman eklemek için “Ekle” deyin." />}
                    {docs.map((d, i) => (
                      <div key={d.id} className="grid gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 sm:grid-cols-[1fr_1fr_auto]">
                        <input value={d.name} onChange={(e) => upDoc(i, { name: e.target.value })} placeholder="Döküman adı" className={inp} />
                        <input value={d.url} onChange={(e) => upDoc(i, { url: e.target.value })} placeholder="/docs/... veya https://..." className={inp} />
                        <button onClick={() => { touch(); setDocs(docs.filter((_, j) => j !== i)); }} className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section === 'images' && (
                <div className="space-y-3">
                  {families.map((f) => (
                    <div key={f.id} className="grid items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 sm:grid-cols-[180px_1fr]">
                      <span className="font-semibold text-graphite-950">{f.label}</span>
                      <input value={images[f.id] ?? ''} onChange={(e) => { touch(); setImages({ ...images, [f.id]: e.target.value }); }} placeholder="/products/..." className={inp} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Empty({ icon: Icon, text }: { icon: typeof Package; text: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-mist-900/20 bg-white py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist-100 text-mist-500"><Icon size={22} /></span>
      <p className="mt-3 text-sm text-mist-600">{text}</p>
    </div>
  );
}
