'use client';

import { useState } from 'react';
import {
  FileText,
  MapPin,
  Image as ImageIcon,
  Package,
  Newspaper,
  Plus,
  Trash2,
  Save,
  LogOut,
  Check,
  Loader2,
} from 'lucide-react';
import type { SiteContent, DocLink, RefEntry, AdminProduct, AdminPost } from '@/lib/content';

const rid = () => `id${Math.floor(performance.now() * 1000)}${Math.floor(1 + Math.random() * 998)}`;
const slugify = (s: string) =>
  s
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const PRODUCT_CATEGORIES = ['Kolektör', 'Boyler', 'Sehpa', 'Bağlantı Ekipmanı', 'Otomasyon', 'Diğer'];
const POST_CATEGORIES = ['Rehber', 'Teknik', 'Kalite', 'Bakım', 'Haber', 'Duyuru'];
const inputCls = 'rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500';

export function AdminDashboard({
  initial,
  families,
}: {
  initial: SiteContent;
  families: { id: string; label: string }[];
}) {
  const [tab, setTab] = useState<'products' | 'posts' | 'documents' | 'references' | 'images'>('products');
  const [docs, setDocs] = useState<DocLink[]>(initial.documents);
  const [refs, setRefs] = useState<RefEntry[]>(initial.references);
  const [products, setProducts] = useState<AdminProduct[]>(initial.products ?? []);
  const [posts, setPosts] = useState<AdminPost[]>(initial.posts ?? []);
  const [images, setImages] = useState<Record<string, string>>(initial.groupImages);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: docs, references: refs, products, posts, groupImages: images, updatedAt: '' }),
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

  const tabs = [
    { key: 'products' as const, label: 'Ürünler', icon: Package },
    { key: 'posts' as const, label: 'Blog', icon: Newspaper },
    { key: 'documents' as const, label: 'Dökümanlar', icon: FileText },
    { key: 'references' as const, label: 'Referanslar', icon: MapPin },
    { key: 'images' as const, label: 'Grup Görselleri', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen">
      {/* Üst çubuk */}
      <header className="sticky top-0 z-10 border-b border-mist-900/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-graphite-950 font-display text-lg font-bold text-volt-500">
              Ş
            </span>
            <h1 className="font-display text-lg font-bold">Yönetim Paneli</h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
              {saved ? 'Kaydedildi' : 'Kaydet'}
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 px-4 py-2.5 text-sm font-semibold text-graphite-700 hover:border-graphite-950"
            >
              <LogOut size={15} />
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Sekmeler */}
        <div className="flex gap-2">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === tb.key ? 'bg-graphite-950 text-white' : 'bg-white text-graphite-700 hover:bg-mist-100'
              }`}
            >
              <tb.icon size={15} />
              {tb.label}
            </button>
          ))}
        </div>

        <p className="mt-4 rounded-xl border border-volt-500/30 bg-volt-50 px-4 py-2.5 text-xs text-graphite-700">
          Değişiklikleri kaydetmek için sağ üstteki <strong>Kaydet</strong> düğmesini kullanın.
        </p>

        {/* Ürünler */}
        {tab === 'products' && (
          <section className="mt-6 space-y-3">
            <p className="text-sm text-mist-600">
              Statik kataloğa <strong>ek</strong> ürünler. Görseli önce <code>public/products/</code> klasörüne
              yükleyip yolunu girin (örn. <code>/products/yeni-urun.jpg</code>).
            </p>
            {products.map((p, i) => (
              <div key={p.id} className="space-y-3 rounded-2xl border border-mist-900/10 bg-white p-4">
                <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                  <input value={p.name} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} placeholder="Ürün adı" className={inputCls} />
                  <select value={p.category} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, category: e.target.value } : x)))} className={inputCls}>
                    {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input value={p.model ?? ''} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, model: e.target.value } : x)))} placeholder="Model (ops.)" className={inputCls} />
                </div>
                <textarea value={p.description ?? ''} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} placeholder="Kısa açıklama" rows={2} className={`${inputCls} w-full`} />
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input value={p.image ?? ''} onChange={(e) => setProducts(products.map((x, j) => (j === i ? { ...x, image: e.target.value } : x)))} placeholder="/products/... görsel yolu" className={inputCls} />
                  <button onClick={() => setProducts(products.filter((_, j) => j !== i))} className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2.5 text-red-600 hover:bg-red-50" aria-label="Sil"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <button onClick={() => setProducts([...products, { id: rid(), name: '', category: 'Kolektör', model: '', description: '', image: '' }])} className="inline-flex items-center gap-2 rounded-full border border-dashed border-mist-900/25 px-5 py-2.5 text-sm font-semibold text-graphite-700 hover:border-graphite-950">
              <Plus size={15} /> Ürün ekle
            </button>
          </section>
        )}

        {/* Blog */}
        {tab === 'posts' && (
          <section className="mt-6 space-y-3">
            <p className="text-sm text-mist-600">
              Blog yazıları. İçerikte boş satır yeni paragraf, <code>## </code> ile başlayan satır ara başlık olur.
            </p>
            {posts.map((p, i) => (
              <div key={p.id} className="space-y-3 rounded-2xl border border-mist-900/10 bg-white p-4">
                <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                  <input value={p.title} onChange={(e) => { const v = e.target.value; setPosts(posts.map((x, j) => (j === i ? { ...x, title: v, slug: x.slug ? x.slug : slugify(v) } : x))); }} placeholder="Başlık" className={inputCls} />
                  <input value={p.slug} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, slug: slugify(e.target.value) } : x)))} placeholder="url-adresi" className={inputCls} />
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr]">
                  <select value={p.category ?? 'Rehber'} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, category: e.target.value } : x)))} className={inputCls}>
                    {POST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="date" value={p.date ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, date: e.target.value } : x)))} className={inputCls} />
                  <input value={p.cover ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, cover: e.target.value } : x)))} placeholder="/products/... kapak" className={inputCls} />
                </div>
                <input value={p.excerpt ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, excerpt: e.target.value } : x)))} placeholder="Özet (liste ve önizleme)" className={`${inputCls} w-full`} />
                <textarea value={p.body ?? ''} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)))} placeholder="İçerik…" rows={7} className={`${inputCls} w-full`} />
                <button onClick={() => setPosts(posts.filter((_, j) => j !== i))} className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50" aria-label="Sil"><Trash2 size={15} /> Yazıyı sil</button>
              </div>
            ))}
            <button onClick={() => setPosts([...posts, { id: rid(), slug: '', title: '', category: 'Rehber', date: new Date().toISOString().slice(0, 10), cover: '', excerpt: '', body: '' }])} className="inline-flex items-center gap-2 rounded-full border border-dashed border-mist-900/25 px-5 py-2.5 text-sm font-semibold text-graphite-700 hover:border-graphite-950">
              <Plus size={15} /> Yazı ekle
            </button>
          </section>
        )}

        {/* Dökümanlar */}
        {tab === 'documents' && (
          <section className="mt-6 space-y-3">
            {docs.map((d, i) => (
              <div key={d.id} className="grid gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  value={d.name}
                  onChange={(e) => setDocs(docs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                  placeholder="Döküman adı"
                  className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                />
                <input
                  value={d.url}
                  onChange={(e) => setDocs(docs.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))}
                  placeholder="/docs/... veya https://..."
                  className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                />
                <button
                  onClick={() => setDocs(docs.filter((_, j) => j !== i))}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2.5 text-red-600 hover:bg-red-50"
                  aria-label="Sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setDocs([...docs, { id: rid(), name: '', url: '', type: 'catalog' }])}
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-mist-900/25 px-5 py-2.5 text-sm font-semibold text-graphite-700 hover:border-graphite-950"
            >
              <Plus size={15} />
              Döküman ekle
            </button>
          </section>
        )}

        {/* Referanslar */}
        {tab === 'references' && (
          <section className="mt-6 space-y-3">
            {refs.map((r, i) => (
              <div key={r.id} className="rounded-2xl border border-mist-900/10 bg-white p-4">
                <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                  <input
                    value={r.title}
                    onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
                    placeholder="İş adı"
                    className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                  />
                  <input
                    value={r.il}
                    onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, il: e.target.value } : x)))}
                    placeholder="İl"
                    className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                  />
                  <input
                    value={r.ilce ?? ''}
                    onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, ilce: e.target.value } : x)))}
                    placeholder="İlçe"
                    className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                  />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <input
                    type="number"
                    value={r.homes ?? ''}
                    onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, homes: Number(e.target.value) } : x)))}
                    placeholder="Konut sayısı"
                    className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                  />
                  <input
                    type="number"
                    value={r.collectors ?? ''}
                    onChange={(e) => setRefs(refs.map((x, j) => (j === i ? { ...x, collectors: Number(e.target.value) } : x)))}
                    placeholder="Kollektör sayısı"
                    className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                  />
                  <button
                    onClick={() => setRefs(refs.filter((_, j) => j !== i))}
                    className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2.5 text-red-600 hover:bg-red-50"
                    aria-label="Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                setRefs([...refs, { id: rid(), title: '', il: '', ilce: '', homes: undefined, collectors: undefined }])
              }
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-mist-900/25 px-5 py-2.5 text-sm font-semibold text-graphite-700 hover:border-graphite-950"
            >
              <Plus size={15} />
              Referans ekle
            </button>
          </section>
        )}

        {/* Grup görselleri */}
        {tab === 'images' && (
          <section className="mt-6 space-y-3">
            <p className="text-sm text-mist-600">
              Her ürün grubu için tek temsili görselin yolunu girin (örn. <code>/products/orion-500.jpg</code>).
              Görseli önce <code>public/products/</code> klasörüne yükleyin.
            </p>
            {families.map((f) => (
              <div key={f.id} className="grid items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 sm:grid-cols-[180px_1fr]">
                <span className="font-semibold text-graphite-950">{f.label}</span>
                <input
                  value={images[f.id] ?? ''}
                  onChange={(e) => setImages({ ...images, [f.id]: e.target.value })}
                  placeholder="/products/..."
                  className="rounded-xl border border-mist-900/15 bg-mist-50 px-3.5 py-2.5 text-sm outline-none focus:border-volt-500"
                />
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
