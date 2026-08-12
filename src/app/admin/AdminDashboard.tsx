'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Package, Newspaper, FileText, MapPin, Image as ImageIcon, Type,
  Plus, Trash2, Save, LogOut, Check, Loader2, Search, Eye, EyeOff,
  RotateCcw, History, ChevronRight, Users, Monitor, ScrollText, Cpu,
  Menu, X, Upload, KeyRound, AlertTriangle, Globe,
} from 'lucide-react';
import { locales, type Locale } from '@/i18n/config';
import type { SiteContent, DocLink, RefEntry, AdminProduct, AdminPost, ProductSpecItem } from '@/lib/content';
import { TEXT_FIELDS, TEXT_GROUPS } from '@/lib/siteTexts';
import { ROLE_LABELS, type AdminRole, type AdminSection } from '@/lib/adminAcl';
import { UsersPanel, SessionsPanel, LogPanel, SystemPanel, VersionsPanel } from './AdminSystemPanels';

type Tab = AdminSection;
type StaticRef = { title: string; il: string; ilce?: string; collectors: number };

/* Oturum sahibinin panel için gereken bilgileri (sunucudan gelir). */
export interface PanelSession {
  username: string;
  fullName: string;
  role: AdminRole;
  sections: AdminSection[];
  canWrite: boolean;
}

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
  // Yönetim bölümleri (yalnızca yönetici rolü görür)
  { key: 'users', icon: Users, label: 'Kullanıcılar', desc: 'Panel hesapları ve bölüm yetkileri' },
  { key: 'sessions', icon: Monitor, label: 'Oturumlar', desc: 'Açık oturumlar, uzaktan kapatma' },
  { key: 'log', icon: ScrollText, label: 'İşlem Kaydı', desc: 'Kim neyi ne zaman değiştirdi' },
  { key: 'system', icon: Cpu, label: 'Sistem Bilgisi', desc: 'Sunucu ve depo durumu' },
];
const LIST_SECTIONS = new Set<Tab>(['products', 'posts']);
/* İçerik kaydetme akışının dışında kalan, kendi verisini API'den çeken bölümler. */
const SYSTEM_SECTIONS = new Set<Tab>(['users', 'sessions', 'log', 'system']);

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (<label className="block"><span className={lbl}>{label}</span>{children}</label>);
}

const LOCALE_LABELS: Record<string, string> = { tr: 'Türkçe', en: 'English', ar: 'العربية', el: 'Ελληνικά' };

/* Blog gövdesini önizleme için bölümlere ayırır.
   Kural sitedeki `parseBody` ile aynıdır: "## " başlık, boş satır yeni paragraf. */
function previewSections(body: string): { heading: string; paragraphs: string[] }[] {
  const out: { heading: string; paragraphs: string[] }[] = [];
  let cur = { heading: '', paragraphs: [] as string[] };
  let buf: string[] = [];
  const flushPara = () => { const t = buf.join(' ').trim(); if (t) cur.paragraphs.push(t); buf = []; };
  const flushSection = () => { flushPara(); if (cur.heading || cur.paragraphs.length) out.push(cur); cur = { heading: '', paragraphs: [] }; };
  for (const line of (body ?? '').split(/\r?\n/)) {
    if (line.startsWith('## ')) { flushSection(); cur.heading = line.slice(3).trim(); }
    else if (line.trim() === '') flushPara();
    else buf.push(line.trim());
  }
  flushSection();
  return out;
}

/* Görsel alanı: yol elle yazılabilir ya da dosya yüklenebilir.
   Yükleme başarılıysa dönen yol alana yazılır ve küçük önizleme gösterilir. */
function ImageField({
  label, value, onChange, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function upload(file: File) {
    setBusy(true); setErr('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.ok) onChange(data.path);
      else setErr(data.error ?? 'Yüklenemedi.');
    } catch {
      setErr('Yükleme sırasında bağlantı hatası.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="block">
      <span className={lbl}>{label}</span>
      <div className="flex gap-2">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inp} />
        <label className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-mist-900/15 px-3 text-xs font-semibold text-graphite-700 hover:border-graphite-950">
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          <span className="hidden sm:inline">Yükle</span>
          <input type="file" accept="image/*" className="hidden" disabled={busy}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.target.value = ''; }} />
        </label>
      </div>
      {err && <p className="mt-1.5 text-[11px] leading-relaxed text-red-600">{err}</p>}
      {value && !err && (
        // Panel içi küçük önizleme; next/image gerekmez (yerel yol, sabit boyut).
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-2 h-16 w-16 rounded-lg border border-mist-900/10 object-cover" />
      )}
    </div>
  );
}

/* Kullanıcının kendi şifresini değiştirmesi. Mevcut şifre sunucuda doğrulanır;
   başarılı olursa diğer cihazlardaki oturumlar düşer, bu cihaz açık kalır. */
function PasswordDialog({ onClose }: { onClose: () => void }) {
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [again, setAgain] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit() {
    if (next !== again) { setMsg({ ok: false, text: 'Yeni şifreler birbiriyle uyuşmuyor.' }); return; }
    setBusy(true); setMsg(null);
    try {
      const res = await fetch('/api/admin/account', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: cur, newPassword: next }),
      });
      const data = await res.json();
      if (data.ok) {
        setMsg({ ok: true, text: 'Şifreniz değiştirildi. Diğer cihazlardaki oturumlarınız kapatıldı.' });
        setCur(''); setNext(''); setAgain('');
      } else {
        setMsg({ ok: false, text: data.error ?? 'Değiştirilemedi.' });
      }
    } catch {
      setMsg({ ok: false, text: 'Bağlantı hatası.' });
    } finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-950/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-base font-bold text-graphite-950">Şifremi değiştir</p>
          <button onClick={onClose} className="rounded-lg p-1.5 text-mist-400 hover:bg-mist-100"><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <Field label="Mevcut şifre"><input type="password" value={cur} onChange={(e) => setCur(e.target.value)} className={inp} autoComplete="current-password" /></Field>
          <Field label="Yeni şifre (en az 6 karakter)"><input type="password" value={next} onChange={(e) => setNext(e.target.value)} className={inp} autoComplete="new-password" /></Field>
          <Field label="Yeni şifre (tekrar)"><input type="password" value={again} onChange={(e) => setAgain(e.target.value)} className={inp} autoComplete="new-password" /></Field>
        </div>
        {msg && <p className={`mt-3 rounded-xl px-3.5 py-2.5 text-sm ${msg.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>{msg.text}</p>}
        <button onClick={submit} disabled={busy || !cur || !next} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />} Değiştir
        </button>
      </div>
    </div>
  );
}

/* Yayın durumu anahtarı — taslak içerik sitede görünmez. */
function PublishToggle({ published, onChange }: { published: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(!published)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
          published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
        }`}
        title={published ? 'Sitede yayında — tıklayın taslağa alın' : 'Taslak — sitede görünmez'}
      >
        {published ? <Eye size={13} /> : <EyeOff size={13} />}
        {published ? 'Yayında' : 'Taslak'}
      </button>
    </div>
  );
}

export function AdminDashboard({
  initial, families, staticRefs, prev, session,
}: {
  initial: SiteContent;
  families: { id: string; label: string }[];
  staticRefs: StaticRef[];
  prev: SiteContent | null;
  session: PanelSession;
}) {
  // Yetkili olmayan bölümler menüde hiç görünmez.
  const visibleSections = useMemo(
    () => SECTIONS.filter((s) => session.sections.includes(s.key)),
    [session.sections]
  );
  const [section, setSection] = useState<Tab>(
    () => (session.sections.includes('overview') ? 'overview' : session.sections[0] ?? 'overview')
  );
  const [sel, setSel] = useState<number | null>(null);
  const [docs, setDocs] = useState<DocLink[]>(initial.documents);
  const [refs, setRefs] = useState<RefEntry[]>(initial.references);
  const [products, setProducts] = useState<AdminProduct[]>(initial.products ?? []);
  const [posts, setPosts] = useState<AdminPost[]>(initial.posts ?? []);
  const [hiddenRefs, setHiddenRefs] = useState<string[]>(initial.hiddenRefs ?? []);
  const [texts, setTexts] = useState<Record<string, string>>(initial.texts ?? {});
  const [images, setImages] = useState<Record<string, string>>(initial.groupImages);
  const [textsByLocale, setTextsByLocale] = useState<Record<string, Record<string, string>>>(initial.textsByLocale ?? {});
  const [textLocale, setTextLocale] = useState<Locale>('tr');
  const [refSearch, setRefSearch] = useState('');
  const [listSearch, setListSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  /* Düzenlemeye başladığımız sürümün damgası — çakışma tespiti için sunucuya geri gider. */
  const [baseUpdatedAt, setBaseUpdatedAt] = useState(initial.updatedAt ?? '');

  /* Seçili dilin metin haritası. tr eski `texts` alanını kullanır. */
  const activeTexts = textLocale === 'tr' ? texts : (textsByLocale[textLocale] ?? {});
  const setActiveText = (key: string, value: string) => {
    touch();
    if (textLocale === 'tr') setTexts({ ...texts, [key]: value });
    else setTextsByLocale({ ...textsByLocale, [textLocale]: { ...(textsByLocale[textLocale] ?? {}), [key]: value } });
  };

  const touch = () => setDirty(true);

  function go(next: Tab) {
    setSection(next);
    setMobileNav(false);
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

  async function save(force = false) {
    setSaving(true); setSaved(false); setSaveError('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documents: docs, references: refs, products, posts, hiddenRefs,
          texts, textsByLocale, groupImages: images, updatedAt: '',
          // force=true iken damga gönderilmez → sunucu çakışma kontrolü yapmaz.
          ...(force ? {} : { baseUpdatedAt }),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setSaveError(
          'Siz düzenlerken başka biri kaydetti. Değişikliklerinizi kaybetmemek için ' +
          'ya sayfayı yenileyip yeniden uygulayın ya da "Yine de kaydet" ile üzerine yazın.'
        );
        return;
      }
      if (res.ok && data.ok) {
        setSaved(true); setDirty(false);
        setBaseUpdatedAt(data.content?.updatedAt ?? '');
        setTimeout(() => setSaved(false), 2500);
      } else {
        setSaveError(data.error === 'forbidden' ? 'Kaydetme yetkiniz yok.' : 'Kaydedilemedi.');
      }
    } catch {
      setSaveError('Bağlantı hatası — kaydedilemedi.');
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
  const isSystem = SYSTEM_SECTIONS.has(section);
  const initials = useMemo(
    () =>
      session.fullName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toLocaleUpperCase('tr-TR'))
        .join('') || session.username.slice(0, 2).toLocaleUpperCase('tr-TR'),
    [session.fullName, session.username]
  );
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

  /* Kaydedilmemiş değişiklik varken sekmeyi kapatmayı/yenilemeyi tarayıcı sorsun.
     Tarayıcılar kendi standart metnini gösterir; preventDefault yeterlidir. */
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  /* Ctrl/Cmd + S ile kaydet. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (dirty && !saving && session.canWrite) void save();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // save/dirty dışındaki bağımlılıklar sabittir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, saving, session.canWrite]);

  return (
    <div className="flex h-screen overflow-hidden bg-mist-50 text-graphite-900">
      {/* Mobilde menü açıkken arka planı karart */}
      {mobileNav && (
        <button
          aria-label="Menüyü kapat"
          onClick={() => setMobileNav(false)}
          className="fixed inset-0 z-30 bg-graphite-950/50 md:hidden"
        />
      )}

      {pwOpen && <PasswordDialog onClose={() => setPwOpen(false)} />}

      {/* Sidebar — mobilde kayan panel, md üstünde sabit kolon */}
      <aside
        className={`fixed inset-y-0 start-0 z-40 flex w-60 shrink-0 flex-col bg-graphite-950 text-graphite-200 transition-transform md:static md:translate-x-0 ${
          mobileNav ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-[18px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-volt-500 font-display text-lg font-bold text-graphite-950">Ş</span>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold text-white">Şimşek Solar</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-volt-400">Yönetim</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {visibleSections.map((s) => {
            const active = section === s.key;
            const badge = s.key === 'products' ? products.length : s.key === 'posts' ? posts.length : s.key === 'references' ? refs.length : 0;
            return (
              <div key={s.key}>
              {s.key === 'users' && (
                <p className="mb-1 mt-4 px-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite-500">Yönetim</p>
              )}
              <button onClick={() => go(s.key)}
                className={`mb-0.5 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-volt-500 text-graphite-950' : 'text-graphite-300 hover:bg-white/5 hover:text-white'}`}>
                <s.icon size={18} className="shrink-0" />
                <span className="flex-1 truncate text-start">{s.label}</span>
                {badge > 0 && (
                  <span className={`rounded-full px-2 py-0.5 font-tabular text-[10px] font-bold ${active ? 'bg-graphite-950/20 text-graphite-950' : 'bg-white/10 text-graphite-200'}`}>{badge}</span>
                )}
              </button>
              </div>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          {/* Oturum sahibi */}
          <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-volt-500 font-tabular text-[11px] font-bold text-graphite-950">{initials}</span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-semibold text-white">{session.fullName}</p>
              <p className="truncate font-mono text-[10px] text-volt-400">{ROLE_LABELS[session.role]}</p>
            </div>
          </div>
          <button onClick={() => { setPwOpen(true); setMobileNav(false); }} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-graphite-300 transition-colors hover:bg-white/5 hover:text-white"><KeyRound size={17} className="shrink-0" /> Şifremi değiştir</button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-graphite-300 transition-colors hover:bg-white/5 hover:text-white"><Eye size={17} className="shrink-0" /> Siteyi görüntüle</a>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-graphite-300 transition-colors hover:bg-white/5 hover:text-red-400"><LogOut size={17} className="shrink-0" /> Çıkış yap</button>
        </div>
      </aside>

      {/* Sağ kolon */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Üst çubuk */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-mist-900/10 bg-white px-4 lg:px-7">
          <div className="flex min-w-0 items-center gap-2">
            <button
              onClick={() => setMobileNav(true)}
              className="-ms-1 shrink-0 rounded-lg p-2 text-graphite-700 hover:bg-mist-100 md:hidden"
              aria-label="Menüyü aç"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-400">Yönetim Paneli</p>
              <h1 className="truncate font-display text-base font-bold text-graphite-950 lg:text-lg">{meta.label}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Kaydetme yalnızca içerik bölümlerinde ve yazma yetkisi olan rollerde görünür. */}
            {!isSystem && session.canWrite && (
              <>
                <span className={`hidden items-center gap-1.5 text-xs md:inline-flex ${dirty ? 'text-amber-600' : 'text-mist-400'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${dirty ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  {dirty ? 'Kaydedilmemiş' : 'Kayıtlı'}
                </span>
                {dirty && (
                  <button onClick={revertUnsaved} className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 px-3.5 py-2 text-sm font-semibold text-graphite-700 hover:border-graphite-950" title="Değişiklikleri geri al">
                    <RotateCcw size={15} /> <span className="hidden sm:inline">Geri Al</span>
                  </button>
                )}
                <button onClick={() => save()} disabled={saving}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 ${dirty ? 'bg-volt-500 text-graphite-950 shadow-glow' : 'bg-graphite-950 text-white'}`}>
                  {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
                  {saved ? 'Kaydedildi' : 'Kaydet'}
                </button>
              </>
            )}
            {!session.canWrite && (
              <span className="hidden rounded-full bg-mist-200 px-3 py-1.5 text-xs font-semibold text-graphite-700 sm:inline">Salt okunur</span>
            )}
            <span
              className="ms-1 hidden h-9 w-9 items-center justify-center rounded-full bg-graphite-950 font-tabular text-xs font-bold text-white sm:flex"
              title={`${session.fullName} · ${ROLE_LABELS[session.role]}`}
            >
              {initials}
            </span>
          </div>
        </header>

        {/* Kaydetme hatası / eşzamanlı düzenleme çakışması */}
        {saveError && (
          <div className="flex flex-wrap items-center gap-3 border-b border-amber-200 bg-amber-50 px-4 py-3 lg:px-7">
            <AlertTriangle size={16} className="shrink-0 text-amber-700" />
            <p className="min-w-0 flex-1 text-sm text-amber-900">{saveError}</p>
            {saveError.includes('başka biri kaydetti') && (
              <>
                <button onClick={() => window.location.reload()} className="rounded-full border border-amber-300 px-3.5 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100">
                  Sayfayı yenile
                </button>
                <button onClick={() => save(true)} className="rounded-full bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-700">
                  Yine de kaydet
                </button>
              </>
            )}
            <button onClick={() => setSaveError('')} className="rounded-lg p-1 text-amber-700 hover:bg-amber-100" aria-label="Kapat"><X size={15} /></button>
          </div>
        )}

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
                        <p className="truncate text-sm font-semibold text-graphite-950">
                          {title || 'Adsız'}
                          {(it as { published?: boolean }).published === false && (
                            <span className="ms-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">TASLAK</span>
                          )}
                        </p>
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
            <div className={`mx-auto ${isSystem ? 'max-w-5xl' : 'max-w-3xl'}`}>
              {/* Yönetim bölümleri — kendi verisini API'den çeker */}
              {section === 'users' && <UsersPanel currentUser={session.username} />}
              {section === 'sessions' && <SessionsPanel />}
              {section === 'log' && <LogPanel />}
              {section === 'system' && <><VersionsPanel /><div className="mt-8"><SystemPanel /></div></>}

              {section === 'overview' && (() => {
                const stats = [
                  { label: 'Ürünler', value: products.length, sub: `${products.length} kayıt`, icon: Package, tint: 'bg-volt-100 text-volt-700', to: 'products' as Tab },
                  { label: 'Blog yazısı', value: posts.length, sub: `${posts.length} kayıt`, icon: Newspaper, tint: 'bg-sky-100 text-sky-700', to: 'posts' as Tab },
                  { label: 'Ek referans', value: refs.length, sub: 'panelden eklenen', icon: MapPin, tint: 'bg-emerald-100 text-emerald-700', to: 'references' as Tab },
                  { label: 'Gizli referans', value: hiddenRefs.length, sub: 'listede gizli', icon: EyeOff, tint: 'bg-mist-200 text-graphite-700', to: 'references' as Tab },
                ];
                const recent = [
                  ...posts.filter((p) => p.title).map((p) => ({ id: p.id, title: p.title, kind: 'Blog yazısı', date: p.date ?? '', icon: Newspaper })),
                  ...products.filter((p) => p.name).map((p) => ({ id: p.id, title: p.name, kind: 'Ürün', date: '', icon: Package })),
                ].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
                const quick = [
                  { label: 'Yeni ürün', desc: 'Ürün ekle', icon: Package, run: () => { setSection('products'); addProduct(); } },
                  { label: 'Yeni yazı', desc: 'Blog içeriği oluştur', icon: Newspaper, run: () => { setSection('posts'); addPost(); } },
                  { label: 'Sayfa metinleri', desc: 'Hero, iletişim, misyon', icon: Type, run: () => go('texts') },
                ];
                return (
                  <div className="space-y-6">
                    {/* Hoş geldin hero */}
                    <div className="relative overflow-hidden rounded-3xl bg-graphite-gradient p-7 text-white sm:p-9">
                      <div className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-volt-500/15 blur-3xl" aria-hidden />
                      <div className="relative flex flex-wrap items-start justify-between gap-5">
                        <div>
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-400">Hoş geldiniz</p>
                          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">İçerikleriniz kontrol altında.</h2>
                          <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite-200">Yayın durumunu takip edin, içeriklerinizi hızlıca güncelleyin.</p>
                        </div>
                        <div className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 backdrop-blur-sm">
                          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                          <div className="leading-tight">
                            <p className="text-sm font-semibold text-white">Site yayında</p>
                            {initial.updatedAt && <p className="font-mono text-[10px] text-graphite-300">Son güncelleme {new Date(initial.updatedAt).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* İstatistik kartları — tıklayınca ilgili bölüme gider */}
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                      {stats.map((s) => (
                        <button key={s.label} onClick={() => go(s.to)} className="group rounded-2xl border border-mist-900/10 bg-white p-5 text-start transition-all hover:-translate-y-0.5 hover:border-volt-500/40 hover:shadow-card">
                          <div className="flex items-start justify-between">
                            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}><s.icon size={19} /></span>
                            <ChevronRight size={16} className="text-mist-300 transition-all group-hover:translate-x-0.5 group-hover:text-volt-600" />
                          </div>
                          <p className="mt-3 font-tabular font-display text-3xl font-bold leading-none text-graphite-950">{s.value}</p>
                          <p className="mt-1.5 text-sm font-semibold text-graphite-800">{s.label}</p>
                          <p className="mt-0.5 text-[11px] text-mist-500">{s.sub}</p>
                        </button>
                      ))}
                    </div>

                    {/* Son güncellenenler + Hızlı işlemler */}
                    <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
                      <div className="rounded-2xl border border-mist-900/10 bg-white p-5">
                        <p className="font-display text-sm font-bold text-graphite-950">Son güncellenenler</p>
                        <p className="text-xs text-mist-500">İçerik hareketleri</p>
                        <div className="mt-4 divide-y divide-mist-900/8">
                          {recent.length === 0 && <p className="py-6 text-center text-sm text-mist-400">Henüz içerik yok.</p>}
                          {recent.map((r) => (
                            <div key={r.id} className="flex items-center gap-3 py-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist-100 text-graphite-600"><r.icon size={16} /></span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-graphite-950">{r.title}</p>
                                <p className="text-[11px] text-mist-500">{r.kind}</p>
                              </div>
                              {r.date && <span className="shrink-0 font-mono text-[11px] text-mist-400">{new Date(r.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-mist-900/10 bg-white p-5">
                        <p className="font-display text-sm font-bold text-graphite-950">Hızlı işlemler</p>
                        <p className="text-xs text-mist-500">Sık kullanılan araçlar</p>
                        <div className="mt-4 space-y-2.5">
                          {quick.map((q) => (
                            <button key={q.label} onClick={q.run} className="group flex w-full items-center gap-3 rounded-xl border border-mist-900/10 bg-mist-50 p-3.5 text-start transition-all hover:border-volt-500/40 hover:bg-white">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-volt-100 text-volt-700 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950"><q.icon size={16} /></span>
                              <div className="min-w-0"><p className="text-sm font-semibold text-graphite-950">{q.label}</p><p className="text-[11px] text-mist-500">{q.desc}</p></div>
                            </button>
                          ))}
                          {prev && <button onClick={restorePrev} className="inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-graphite-600 hover:text-graphite-950"><History size={13} /> Bir önceki kayda dön</button>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {section === 'texts' && (
                <div className="space-y-5">
                  {/* Dil sekmeleri — her dilin metni ayrı saklanır */}
                  <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-mist-900/10 bg-white p-1.5">
                    <Globe size={15} className="ms-1.5 shrink-0 text-mist-400" />
                    {locales.map((loc) => {
                      const filled = loc === 'tr'
                        ? Object.keys(texts).length
                        : Object.keys(textsByLocale[loc] ?? {}).length;
                      return (
                        <button key={loc} onClick={() => setTextLocale(loc)}
                          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${textLocale === loc ? 'bg-graphite-950 text-white' : 'text-graphite-600 hover:bg-mist-100'}`}>
                          {LOCALE_LABELS[loc] ?? loc}
                          {loc !== 'tr' && (
                            <span className={`ms-1.5 font-tabular text-[10px] ${textLocale === loc ? 'text-graphite-300' : 'text-mist-400'}`}>{filled}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <p className="rounded-xl border border-volt-500/30 bg-volt-50 px-4 py-2.5 text-xs leading-relaxed text-graphite-700">
                    {textLocale === 'tr'
                      ? 'Sitedeki gerçek metinler. Boş bırakılırsa varsayılan kullanılır.'
                      : `${LOCALE_LABELS[textLocale]} için girilen metin yalnızca o dilde görünür. Boş bırakılırsa o dilin kendi varsayılan çevirisi kullanılır — aşağıdaki gri metinler Türkçe varsayılanlardır, referans içindir.`}
                  </p>

                  {TEXT_GROUPS.map((group) => (
                    <div key={group} className="rounded-2xl border border-mist-900/10 bg-white p-5">
                      <h3 className="font-display text-sm font-bold text-graphite-950">{group}</h3>
                      <div className="mt-4 space-y-4">
                        {TEXT_FIELDS.filter((f) => f.group === group).map((f) => {
                          // tr'de varsayılan doğrudan alana yazılır; diğer dillerde alan boş
                          // kalır (boş = o dilin kendi çevirisi kullanılsın demektir).
                          const value = textLocale === 'tr' ? (activeTexts[f.key] ?? f.default) : (activeTexts[f.key] ?? '');
                          const common = {
                            value,
                            onChange: (e: { target: { value: string } }) => setActiveText(f.key, e.target.value),
                            className: inp,
                            ...(textLocale === 'tr' ? {} : { placeholder: f.default }),
                          };
                          return (
                            <Field key={f.key} label={f.label}>
                              {f.multiline ? <textarea {...common} rows={3} /> : <input {...common} />}
                            </Field>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section === 'products' && (sel === null || !products[sel]
                ? <Empty icon={Package} text="Soldan bir ürün seçin veya + ile yeni ekleyin." />
                : (() => { const i = sel; const p = products[i]; return (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-display text-lg font-bold text-graphite-950">{p.name || 'Yeni ürün'}</h2>
                      <div className="flex items-center gap-2">
                        <PublishToggle published={p.published !== false} onChange={(v) => upProduct(i, { published: v })} />
                        <button onClick={() => { touch(); setProducts(products.filter((_, j) => j !== i)); setSel(null); }} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Sil</button>
                      </div></div>
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                      <Field label="Ürün adı"><input value={p.name} onChange={(e) => upProduct(i, { name: e.target.value })} className={inp} /></Field>
                      <Field label="Kategori"><select value={p.category} onChange={(e) => upProduct(i, { category: e.target.value })} className={inp}>{PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
                      <Field label="Model"><input value={p.model ?? ''} onChange={(e) => upProduct(i, { model: e.target.value })} className={inp} /></Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ImageField label="Görsel" value={p.image ?? ''} onChange={(v) => upProduct(i, { image: v })} placeholder="/products/orion-500.jpg" />
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
                    <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-display text-lg font-bold text-graphite-950">{p.title || 'Yeni yazı'}</h2>
                      <div className="flex items-center gap-2">
                        <PublishToggle published={p.published !== false} onChange={(v) => upPost(i, { published: v })} />
                        <button onClick={() => { touch(); setPosts(posts.filter((_, j) => j !== i)); setSel(null); }} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Sil</button>
                      </div></div>
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                      <Field label="Başlık"><input value={p.title} onChange={(e) => { const v = e.target.value; upPost(i, { title: v, slug: p.slug ? p.slug : slugify(v) }); }} className={inp} /></Field>
                      <Field label="URL adresi"><input value={p.slug} onChange={(e) => upPost(i, { slug: slugify(e.target.value) })} className={inp} /></Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field label="Kategori"><select value={p.category ?? 'Rehber'} onChange={(e) => upPost(i, { category: e.target.value })} className={inp}>{POST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
                      <Field label="Tarih"><input type="date" value={p.date ?? ''} onChange={(e) => upPost(i, { date: e.target.value })} className={inp} /></Field>
                      <div className="sm:col-span-1"><ImageField label="Kapak" value={p.cover ?? ''} onChange={(v) => upPost(i, { cover: v })} placeholder="/products/..." /></div>
                    </div>
                    <Field label="Özet"><input value={p.excerpt ?? ''} onChange={(e) => upPost(i, { excerpt: e.target.value })} className={inp} /></Field>
                    <div className="grid gap-3 lg:grid-cols-2">
                      <Field label="İçerik ( ## başlık · boş satır = paragraf )">
                        <textarea value={p.body ?? ''} onChange={(e) => upPost(i, { body: e.target.value })} rows={16} className={inp} />
                      </Field>
                      {/* Canlı önizleme — sitedeki ayrıştırma kurallarının aynısı */}
                      <div>
                        <span className={lbl}>Önizleme</span>
                        <div className="max-h-[26rem] overflow-y-auto rounded-lg border border-mist-900/15 bg-white p-4">
                          {p.title && <h1 className="font-display text-xl font-bold text-graphite-950">{p.title}</h1>}
                          {p.excerpt && <p className="mt-2 text-sm leading-relaxed text-mist-600">{p.excerpt}</p>}
                          {previewSections(p.body ?? '').map((sec, si) => (
                            <div key={si} className="mt-4">
                              {sec.heading && <h2 className="font-display text-base font-bold text-graphite-950">{sec.heading}</h2>}
                              {sec.paragraphs.map((para, pi) => (
                                <p key={pi} className="mt-2 text-sm leading-relaxed text-graphite-700">{para}</p>
                              ))}
                            </div>
                          ))}
                          {!p.title && !p.body && <p className="py-8 text-center text-sm text-mist-400">Yazmaya başlayın; önizleme burada görünecek.</p>}
                        </div>
                      </div>
                    </div>
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
