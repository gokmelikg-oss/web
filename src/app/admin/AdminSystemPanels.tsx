'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Loader2, Plus, Trash2, Save, ShieldCheck, Monitor, Cpu, HardDrive,
  AlertTriangle, RefreshCw, LogOut, Search, X, Copy, Lock, Unlock,
  Download, Upload, Check, Network,
} from 'lucide-react';
import {
  ADMIN_ONLY_SECTIONS, CONTENT_SECTIONS, ROLE_DESCRIPTIONS, ROLE_LABELS,
  SECTION_LABELS, defaultSections,
  type AdminRole, type AdminSection,
} from '@/lib/adminAcl';
import { ACTION_LABELS, type LogEntry } from '@/lib/adminLogShared';

/* Webmin'in Webmin Users / Login Sessions / Actions Log / System Information
   modüllerinden uyarlanmış yönetim panelleri. Veriler /api/admin/* üzerinden gelir. */

const inp = 'w-full rounded-lg border border-mist-900/15 bg-white px-3 py-2.5 text-sm text-graphite-900 outline-none transition-shadow placeholder:text-mist-400 focus:border-volt-500 focus:ring-2 focus:ring-volt-500/20';
const lbl = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-mist-500';
const card = 'rounded-2xl border border-mist-900/10 bg-white p-5';

export interface PanelUser {
  username: string;
  fullName: string;
  email?: string;
  role: AdminRole;
  sections: AdminSection[];
  active: boolean;
  allowedIps?: string[];
  createdAt: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
}

interface SessionRow {
  sid: string;
  username: string;
  ip: string;
  userAgent: string;
  createdAt: string;
  lastSeenAt: string;
}

interface BlockRow {
  key: string;
  username: string;
  ip: string;
  count: number;
  firstAt: string;
  blockedUntil?: string;
  minutesLeft: number;
}

interface EnvCheck { name: string; set: boolean; note: string; critical: boolean }

interface SystemInfo {
  hostname: string;
  platform: string;
  nodeVersion: string;
  cpu: { model: string; cores: number; loadPercent: number | null };
  disk: { freeBytes: number; totalBytes: number; percent: number } | null;
  processUptimeSec: number;
  systemUptimeSec: number;
  memory: { usedBytes: number; totalBytes: number; percent: number };
  storage: { mode: string; sizeBytes: number; location: string };
  counts: { users: number; sessions: number; logEntries: number; products: number; posts: number; references: number };
  lastContentUpdate: string;
  env: EnvCheck[];
  warnings: string[];
}

const dt = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

function duration(sec: number): string {
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (d) return `${d} gün ${h} sa`;
  if (h) return `${h} sa ${m} dk`;
  return `${m} dk`;
}

function bytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(1)} GB`;
}

function RoleBadge({ role }: { role: AdminRole }) {
  const tint =
    role === 'owner' ? 'bg-volt-100 text-volt-700'
      : role === 'editor' ? 'bg-sky-100 text-sky-700'
        : 'bg-mist-200 text-graphite-700';
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tint}`}>{ROLE_LABELS[role]}</span>;
}

function PanelHeader({ title, desc, onRefresh, busy }: { title: string; desc: string; onRefresh?: () => void; busy?: boolean }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <p className="font-display text-base font-bold text-graphite-950">{title}</p>
        <p className="text-xs text-mist-500">{desc}</p>
      </div>
      {onRefresh && (
        <button onClick={onRefresh} disabled={busy} className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/15 px-3.5 py-2 text-xs font-semibold text-graphite-700 hover:border-graphite-950 disabled:opacity-50">
          {busy ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Yenile
        </button>
      )}
    </div>
  );
}

/* ---------------- Kullanıcılar ---------------- */

type UserDraft = PanelUser & { password: string; ipText: string };

const emptyDraft = (): UserDraft => ({
  username: '', fullName: '', email: '', role: 'editor',
  sections: defaultSections('editor'), active: true, createdAt: '', password: '', ipText: '',
});

const toDraft = (u: PanelUser): UserDraft => ({
  ...u, email: u.email ?? '', password: '', ipText: (u.allowedIps ?? []).join(', '),
});

/* "192.168.1.5, 10.0." → ["192.168.1.5", "10.0."] */
const parseIps = (text: string) => text.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);

export function UsersPanel({ currentUser }: { currentUser: string }) {
  const [users, setUsers] = useState<PanelUser[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<UserDraft | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.ok) setUsers(data.users);
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function submit() {
    if (!draft) return;
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/admin/users', {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...draft, allowedIps: parseIps(draft.ipText) }),
      });
      const data = await res.json();
      if (!data.ok) { setError(data.error ?? 'Kaydedilemedi.'); return; }
      setUsers(data.users); setDraft(null);
    } finally {
      setBusy(false);
    }
  }

  async function remove(username: string) {
    if (!window.confirm(`"${username}" kullanıcısı silinsin mi? Açık oturumları da kapanır.`)) return;
    setBusy(true); setError('');
    try {
      const res = await fetch(`/api/admin/users?username=${encodeURIComponent(username)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.ok) { setError(data.error ?? 'Silinemedi.'); return; }
      setUsers(data.users);
    } finally {
      setBusy(false);
    }
  }

  const toggleSection = (s: AdminSection) =>
    setDraft((d) => d && ({
      ...d,
      sections: d.sections.includes(s) ? d.sections.filter((x) => x !== s) : [...d.sections, s],
    }));

  return (
    <div className="space-y-4">
      <PanelHeader title="Kullanıcılar" desc="Panele giriş yapabilen hesaplar ve bölüm yetkileri" onRefresh={load} busy={busy} />

      {error && (
        <p className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" /> {error}
        </p>
      )}

      <button
        onClick={() => { setDraft(emptyDraft()); setIsNew(true); setError(''); }}
        className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-4 py-2.5 text-sm font-semibold text-white"
      >
        <Plus size={15} /> Yeni kullanıcı
      </button>

      <div className={`${card} p-0 overflow-hidden`}>
        <table className="w-full text-sm">
          <thead className="bg-mist-100 text-[11px] uppercase tracking-wide text-mist-500">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">Kullanıcı</th>
              <th className="px-4 py-3 text-start font-semibold">Rol</th>
              <th className="hidden px-4 py-3 text-start font-semibold md:table-cell">Son giriş</th>
              <th className="px-4 py-3 text-end font-semibold">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-mist-400">Kayıt yok.</td></tr>
            )}
            {users.map((u) => (
              <tr key={u.username} className="border-t border-mist-900/10">
                <td className="px-4 py-3">
                  <p className="font-semibold text-graphite-950">
                    {u.fullName}
                    {u.username === currentUser && <span className="ms-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">siz</span>}
                    {!u.active && <span className="ms-2 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">kapalı</span>}
                  </p>
                  <p className="font-mono text-[11px] text-mist-500">{u.username}{u.email ? ` · ${u.email}` : ''}</p>
                </td>
                <td className="px-4 py-3">
                  <RoleBadge role={u.role} />
                  {(u.allowedIps?.length ?? 0) > 0 && (
                    <span
                      className="ms-1.5 inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700"
                      title={`Yalnızca şu adreslerden: ${u.allowedIps!.join(', ')}`}
                    >
                      <Network size={11} /> IP
                    </span>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-xs text-mist-600 md:table-cell">
                  {dt(u.lastLoginAt)}
                  {u.lastLoginIp && <span className="block font-mono text-[10px] text-mist-400">{u.lastLoginIp}</span>}
                </td>
                <td className="px-4 py-3 text-end">
                  <button
                    onClick={() => { setDraft(toDraft(u)); setIsNew(false); setError(''); }}
                    className="rounded-lg border border-mist-900/15 px-3 py-1.5 text-xs font-semibold hover:border-graphite-950"
                  >
                    Düzenle
                  </button>
                  {/* Klonla — Webmin'in "Clone" düğmesi: yetkileri hazır yeni hesap */}
                  <button
                    onClick={() => {
                      setDraft({ ...toDraft(u), username: '', fullName: `${u.fullName} (kopya)`, email: '', createdAt: '', lastLoginAt: undefined, lastLoginIp: undefined });
                      setIsNew(true); setError('');
                    }}
                    className="ms-2 rounded-lg p-1.5 text-mist-400 hover:bg-mist-100 hover:text-graphite-900"
                    title="Bu kullanıcının yetkileriyle yeni hesap aç"
                  >
                    <Copy size={15} />
                  </button>
                  {u.username !== currentUser && (
                    <button onClick={() => remove(u.username)} className="ms-2 rounded-lg p-1.5 text-mist-400 hover:bg-red-50 hover:text-red-600" title="Sil">
                      <Trash2 size={15} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {draft && (
        <div className={card}>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-sm font-bold">{isNew ? 'Yeni kullanıcı' : `Düzenle: ${draft.username}`}</p>
            <button onClick={() => setDraft(null)} className="rounded-lg p-1.5 text-mist-400 hover:bg-mist-100"><X size={16} /></button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={lbl}>Kullanıcı adı</span>
              <input
                value={draft.username}
                disabled={!isNew}
                onChange={(e) => setDraft({ ...draft, username: e.target.value })}
                className={`${inp} disabled:bg-mist-100 disabled:text-mist-500`}
                placeholder="ornek.kullanici"
              />
            </label>
            <label className="block">
              <span className={lbl}>Ad soyad</span>
              <input value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} className={inp} />
            </label>
            <label className="block">
              <span className={lbl}>E-posta</span>
              <input value={draft.email ?? ''} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className={inp} />
            </label>
            <label className="block">
              <span className={lbl}>{isNew ? 'Şifre' : 'Yeni şifre (boş = değişmez)'}</span>
              <input type="password" value={draft.password} onChange={(e) => setDraft({ ...draft, password: e.target.value })} className={inp} autoComplete="new-password" />
            </label>
          </div>

          <div className="mt-4">
            <span className={lbl}>Rol</span>
            <div className="grid gap-2 sm:grid-cols-3">
              {(['owner', 'editor', 'viewer'] as AdminRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setDraft({ ...draft, role: r, sections: r === 'owner' ? defaultSections('owner') : draft.sections })}
                  className={`rounded-xl border p-3 text-start transition-colors ${draft.role === r ? 'border-volt-500 bg-volt-50' : 'border-mist-900/15 hover:border-graphite-400'}`}
                >
                  <p className="text-sm font-bold text-graphite-950">{ROLE_LABELS[r]}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-mist-500">{ROLE_DESCRIPTIONS[r]}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <span className={lbl}>Bölüm yetkileri</span>
            {draft.role === 'owner' ? (
              <p className="flex items-center gap-2 rounded-xl bg-volt-50 px-4 py-3 text-xs text-graphite-700">
                <ShieldCheck size={15} className="text-volt-600" />
                Yönetici tüm bölümlere erişir; yetkileri kısıtlanamaz ({ADMIN_ONLY_SECTIONS.map((s) => SECTION_LABELS[s]).join(', ')} dahil).
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CONTENT_SECTIONS.map((s) => (
                  <label key={s} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${draft.sections.includes(s) ? 'border-volt-500 bg-volt-50' : 'border-mist-900/15'}`}>
                    <input type="checkbox" checked={draft.sections.includes(s)} onChange={() => toggleSection(s)} className="accent-volt-500" />
                    {SECTION_LABELS[s]}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* IP kısıtlaması — Webmin'in kullanıcı bazlı "IP access control" ayarı */}
          <label className="mt-4 block">
            <span className={lbl}>IP kısıtlaması (isteğe bağlı)</span>
            <input
              value={draft.ipText}
              onChange={(e) => setDraft({ ...draft, ipText: e.target.value })}
              className={inp}
              placeholder="örn. 88.230.14.7, 192.168.1."
            />
            <span className="mt-1.5 block text-[11px] leading-relaxed text-mist-500">
              Boş bırakılırsa her yerden giriş yapabilir. Virgülle ayırın; nokta ile biten değer
              ön ek sayılır (<span className="font-mono">192.168.1.</span> → tüm ofis ağı).
            </span>
          </label>

          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={draft.active} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} className="accent-volt-500" />
            Hesap aktif (kapatılırsa giriş yapamaz, açık oturumları düşer)
          </label>

          <button onClick={submit} disabled={busy} className="mt-5 inline-flex items-center gap-2 rounded-full bg-volt-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 disabled:opacity-60">
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Kaydet
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Oturumlar ---------------- */

export function SessionsPanel() {
  const [rows, setRows] = useState<SessionRow[]>([]);
  const [blocks, setBlocks] = useState<BlockRow[]>([]);
  const [current, setCurrent] = useState('');
  const [busy, setBusy] = useState(true);

  const apply = useCallback((data: { sessions?: SessionRow[]; blocks?: BlockRow[]; current?: string }) => {
    setRows(data.sessions ?? []);
    setBlocks(data.blocks ?? []);
    if (data.current) setCurrent(data.current);
  }, []);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/sessions');
      const data = await res.json();
      if (data.ok) apply(data);
    } finally { setBusy(false); }
  }, [apply]);
  useEffect(() => { void load(); }, [load]);

  async function call(query: string, isSelf = false) {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/sessions?${query}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.ok) apply(data);
      if (isSelf) window.location.href = '/admin/login';
    } finally { setBusy(false); }
  }

  async function end(sid: string) {
    const self = sid === current;
    if (self && !window.confirm('Bu sizin oturumunuz. Kapatılırsa çıkış yapmış olursunuz. Devam edilsin mi?')) return;
    await call(`sid=${encodeURIComponent(sid)}`, self);
  }

  async function endOthers() {
    if (!window.confirm('Bu cihaz dışındaki tüm oturumlar kapatılsın mı?')) return;
    await call('others=1');
  }

  const others = rows.filter((s) => s.sid !== current).length;

  return (
    <div className="space-y-4">
      <PanelHeader title="Açık Oturumlar" desc="Şu anda panele giriş yapmış cihazlar. İstediğinizi uzaktan kapatabilirsiniz." onRefresh={load} busy={busy} />

      {others > 0 && (
        <button onClick={endOthers} disabled={busy} className="inline-flex items-center gap-2 rounded-full border border-mist-900/15 px-4 py-2.5 text-sm font-semibold text-graphite-700 hover:border-red-500 hover:text-red-600 disabled:opacity-60">
          <LogOut size={15} /> Bu cihaz dışındaki tüm oturumları kapat ({others})
        </button>
      )}
      <div className={`${card} p-0 overflow-hidden`}>
        <table className="w-full text-sm">
          <thead className="bg-mist-100 text-[11px] uppercase tracking-wide text-mist-500">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">Kullanıcı</th>
              <th className="px-4 py-3 text-start font-semibold">IP</th>
              <th className="hidden px-4 py-3 text-start font-semibold lg:table-cell">Tarayıcı</th>
              <th className="hidden px-4 py-3 text-start font-semibold md:table-cell">Son etkinlik</th>
              <th className="px-4 py-3 text-end font-semibold">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-mist-400">Açık oturum yok.</td></tr>}
            {rows.map((s) => (
              <tr key={s.sid} className="border-t border-mist-900/10">
                <td className="px-4 py-3 font-semibold text-graphite-950">
                  {s.username}
                  {s.sid === current && <span className="ms-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">bu cihaz</span>}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-mist-600">{s.ip}</td>
                <td className="hidden max-w-[22rem] truncate px-4 py-3 text-xs text-mist-500 lg:table-cell" title={s.userAgent}>{s.userAgent}</td>
                <td className="hidden px-4 py-3 text-xs text-mist-600 md:table-cell">{dt(s.lastSeenAt)}</td>
                <td className="px-4 py-3 text-end">
                  <button onClick={() => end(s.sid)} className="inline-flex items-center gap-1.5 rounded-lg border border-mist-900/15 px-3 py-1.5 text-xs font-semibold hover:border-red-500 hover:text-red-600">
                    <LogOut size={13} /> Kapat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hatalı giriş kilitleri — Webmin blockhost listesi */}
      <div className="pt-2">
        <PanelHeader title="Hatalı Giriş Denemeleri" desc="5 hatalı denemede hesap 15 dakika kilitlenir. Kilidi elle kaldırabilirsiniz." />
        <div className={`${card} p-0 overflow-hidden`}>
          <table className="w-full text-sm">
            <thead className="bg-mist-100 text-[11px] uppercase tracking-wide text-mist-500">
              <tr>
                <th className="px-4 py-3 text-start font-semibold">Kullanıcı</th>
                <th className="px-4 py-3 text-start font-semibold">IP</th>
                <th className="px-4 py-3 text-start font-semibold">Deneme</th>
                <th className="px-4 py-3 text-start font-semibold">Durum</th>
                <th className="px-4 py-3 text-end font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {blocks.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-mist-400">Hatalı deneme yok.</td></tr>
              )}
              {blocks.map((b) => (
                <tr key={b.key} className="border-t border-mist-900/10">
                  <td className="px-4 py-3 font-semibold text-graphite-950">{b.username}</td>
                  <td className="px-4 py-3 font-mono text-xs text-mist-600">{b.ip}</td>
                  <td className="px-4 py-3 font-tabular text-xs text-mist-600">{b.count}</td>
                  <td className="px-4 py-3">
                    {b.minutesLeft > 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-bold text-red-700">
                        <Lock size={11} /> {b.minutesLeft} dk kilitli
                      </span>
                    ) : (
                      <span className="text-xs text-mist-500">İzleniyor</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button onClick={() => call(`unblock=${encodeURIComponent(b.key)}`)} className="inline-flex items-center gap-1.5 rounded-lg border border-mist-900/15 px-3 py-1.5 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-700">
                      <Unlock size={13} /> Kilidi kaldır
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- İşlem kaydı ---------------- */

export function LogPanel() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [busy, setBusy] = useState(true);
  const [q, setQ] = useState('');
  const [action, setAction] = useState('');
  const [who, setWho] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/log');
      const data = await res.json();
      if (data.ok) setEntries(data.entries);
    } finally { setBusy(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const people = useMemo(
    () => Array.from(new Set(entries.map((e) => e.username))).sort(),
    [entries]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase('tr-TR');
    // Tarih alanları gün bazlıdır; bitiş günü de dahil olsun diye gün sonuna taşınır.
    const fromMs = from ? new Date(`${from}T00:00:00`).getTime() : -Infinity;
    const toMs = to ? new Date(`${to}T23:59:59`).getTime() : Infinity;
    return entries.filter((e) => {
      if (action && e.action !== action) return false;
      if (who && e.username !== who) return false;
      const at = new Date(e.at).getTime();
      if (at < fromMs || at > toMs) return false;
      if (!needle) return true;
      return `${e.username} ${e.detail} ${e.ip}`.toLocaleLowerCase('tr-TR').includes(needle);
    });
  }, [entries, q, action, who, from, to]);

  /* Filtrelenmiş kaydı CSV indir. Başa BOM konur ki Excel Türkçe harfleri doğru açsın. */
  function exportCsv() {
    const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [
      ['Zaman', 'Kullanıcı', 'İşlem', 'Ayrıntı', 'IP'].map(esc).join(';'),
      ...filtered.map((e) =>
        [dt(e.at), e.username, ACTION_LABELS[e.action] ?? e.action, e.detail, e.ip].map(esc).join(';')
      ),
    ];
    const blob = new Blob([`﻿${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `islem-kaydi-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <PanelHeader title="İşlem Kaydı" desc="Kim, ne zaman, nereden ne yaptı — son 500 kayıt" onRefresh={load} busy={busy} />

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[12rem] flex-1">
          <Search size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-mist-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kullanıcı, ayrıntı veya IP ara…" className={`${inp} ps-9`} />
        </div>
        <select value={action} onChange={(e) => setAction(e.target.value)} className={`${inp} max-w-[13rem]`}>
          <option value="">Tüm işlemler</option>
          {Object.entries(ACTION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={who} onChange={(e) => setWho(e.target.value)} className={`${inp} max-w-[11rem]`}>
          <option value="">Tüm kullanıcılar</option>
          {people.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <label className="block">
          <span className={lbl}>Başlangıç</span>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={`${inp} w-auto`} />
        </label>
        <label className="block">
          <span className={lbl}>Bitiş</span>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={`${inp} w-auto`} />
        </label>
        {(from || to || action || who || q) && (
          <button
            onClick={() => { setFrom(''); setTo(''); setAction(''); setWho(''); setQ(''); }}
            className="rounded-full border border-mist-900/15 px-3.5 py-2.5 text-xs font-semibold text-graphite-700 hover:border-graphite-950"
          >
            Filtreleri temizle
          </button>
        )}
        <button
          onClick={exportCsv}
          disabled={!filtered.length}
          className="ms-auto inline-flex items-center gap-1.5 rounded-full bg-graphite-950 px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          <Download size={14} /> CSV indir ({filtered.length})
        </button>
      </div>
      <div className={`${card} p-0 overflow-hidden`}>
        <table className="w-full text-sm">
          <thead className="bg-mist-100 text-[11px] uppercase tracking-wide text-mist-500">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">Zaman</th>
              <th className="px-4 py-3 text-start font-semibold">Kullanıcı</th>
              <th className="px-4 py-3 text-start font-semibold">İşlem</th>
              <th className="hidden px-4 py-3 text-start font-semibold md:table-cell">Ayrıntı</th>
              <th className="hidden px-4 py-3 text-start font-semibold lg:table-cell">IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-mist-400">Kayıt yok.</td></tr>}
            {filtered.map((e) => (
              <tr key={e.id} className="border-t border-mist-900/10">
                <td className="whitespace-nowrap px-4 py-2.5 text-xs text-mist-600">{dt(e.at)}</td>
                <td className="px-4 py-2.5 font-semibold text-graphite-950">{e.username}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${e.action === 'login_failed' ? 'bg-red-100 text-red-700' : e.action === 'login' ? 'bg-emerald-100 text-emerald-700' : 'bg-mist-200 text-graphite-700'}`}>
                    {ACTION_LABELS[e.action] ?? e.action}
                  </span>
                </td>
                <td className="hidden px-4 py-2.5 text-xs text-mist-600 md:table-cell">{e.detail}</td>
                <td className="hidden px-4 py-2.5 font-mono text-[11px] text-mist-500 lg:table-cell">{e.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Sistem bilgisi ---------------- */

function Gauge({ label, percent, detail }: { label: string; percent: number; detail: string }) {
  const tone = percent > 85 ? 'bg-red-500' : percent > 65 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold text-graphite-800">{label}</span>
        <span className="font-tabular text-xs text-mist-500">{detail}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-mist-200">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.min(100, percent)}%` }} />
      </div>
    </div>
  );
}

export function SystemPanel() {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [busy, setBusy] = useState(true);
  const [restoreMsg, setRestoreMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/system');
      const data = await res.json();
      if (data.ok) setInfo(data.info);
    } finally { setBusy(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  /* Yedekten geri yükleme — mevcut içeriğin üzerine yazar. */
  async function restore(file: File) {
    if (!window.confirm(`"${file.name}" dosyasındaki içerik yüklensin mi? Paneldeki mevcut içeriğin üzerine yazılır.`)) return;
    setBusy(true); setRestoreMsg(null);
    try {
      const text = await file.text();
      const res = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: text,
      });
      const data = await res.json();
      setRestoreMsg(data.ok
        ? { ok: true, text: 'Yedek geri yüklendi. Sayfayı yenileyin.' }
        : { ok: false, text: data.error ?? 'Geri yüklenemedi.' });
      if (data.ok) await load();
    } catch {
      setRestoreMsg({ ok: false, text: 'Dosya okunamadı.' });
    } finally {
      setBusy(false);
    }
  }

  if (!info) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-mist-500">
        <Loader2 size={16} className="animate-spin" /> Sistem bilgisi alınıyor…
      </div>
    );
  }

  const rows: [string, string][] = [
    ['Sunucu adı', info.hostname],
    ['İşletim sistemi', info.platform],
    ['İşlemci', `${info.cpu.model} · ${info.cpu.cores} çekirdek`],
    ['Node.js sürümü', info.nodeVersion],
    ['Uygulama çalışma süresi', duration(info.processUptimeSec)],
    ['Sunucu çalışma süresi', duration(info.systemUptimeSec)],
    ['İçerik deposu', `${info.storage.mode} · ${info.storage.location}`],
    ['Son içerik güncellemesi', dt(info.lastContentUpdate)],
  ];

  return (
    <div className="space-y-4">
      <PanelHeader title="Sistem Bilgisi" desc="Sunucu ve içerik deposunun durumu" onRefresh={load} busy={busy} />

      {info.warnings.map((w) => (
        <p key={w} className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" /> {w}
        </p>
      ))}

      <div className="grid gap-4 md:grid-cols-2">
        <div className={card}>
          <p className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-graphite-950"><Cpu size={16} className="text-volt-600" /> Kaynak kullanımı</p>
          <div className="space-y-4">
            {info.cpu.loadPercent !== null && (
              <Gauge label="İşlemci" percent={info.cpu.loadPercent} detail={`%${info.cpu.loadPercent}`} />
            )}
            <Gauge label="Bellek" percent={info.memory.percent} detail={`${bytes(info.memory.usedBytes)} / ${bytes(info.memory.totalBytes)}`} />
            {info.disk && (
              <Gauge label="Disk" percent={info.disk.percent} detail={`${bytes(info.disk.freeBytes)} boş / ${bytes(info.disk.totalBytes)}`} />
            )}
            {info.storage.mode === 'Yerel dosya' && (
              <Gauge label="İçerik dosyaları" percent={Math.min(100, (info.storage.sizeBytes / (5 * 1024 * 1024)) * 100)} detail={bytes(info.storage.sizeBytes)} />
            )}
          </div>
        </div>

        <div className={card}>
          <p className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-graphite-950"><Monitor size={16} className="text-volt-600" /> İçerik özeti</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {([['Ürün', info.counts.products], ['Yazı', info.counts.posts], ['Referans', info.counts.references],
               ['Kullanıcı', info.counts.users], ['Oturum', info.counts.sessions], ['Kayıt', info.counts.logEntries]] as [string, number][]
            ).map(([k, v]) => (
              <div key={k} className="rounded-xl bg-mist-100 p-3">
                <p className="font-tabular font-display text-xl font-bold text-graphite-950">{v}</p>
                <p className="text-[11px] text-mist-500">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ortam değişkeni denetimi */}
      <div className={`${card} p-0 overflow-hidden`}>
        <p className="flex items-center gap-2 border-b border-mist-900/10 px-5 py-4 font-display text-sm font-bold text-graphite-950">
          <ShieldCheck size={16} className="text-volt-600" /> Ortam değişkenleri
        </p>
        <table className="w-full text-sm">
          <tbody>
            {info.env.map((e) => (
              <tr key={e.name} className="border-t border-mist-900/10 first:border-t-0">
                <td className="px-5 py-2.5 font-mono text-xs text-graphite-900">{e.name}</td>
                <td className="px-5 py-2.5 text-xs text-mist-600">{e.note}</td>
                <td className="px-5 py-2.5 text-end">
                  {e.set ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700"><Check size={11} /> Tanımlı</span>
                  ) : (
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${e.critical ? 'bg-red-100 text-red-700' : 'bg-mist-200 text-graphite-600'}`}>
                      <X size={11} /> Yok
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* İçerik yedeği — Webmin "Backup Configuration Files" karşılığı */}
      <div className={card}>
        <p className="flex items-center gap-2 font-display text-sm font-bold text-graphite-950">
          <HardDrive size={16} className="text-volt-600" /> İçerik yedeği
        </p>
        <p className="mt-1 text-xs leading-relaxed text-mist-500">
          Panelden yönetilen tüm içeriği (ürünler, blog, referans, döküman, metinler) tek JSON
          dosyasına indirir. Kullanıcı hesapları ve şifreler yedeğe <strong>dahil değildir</strong>.
        </p>
        {restoreMsg && (
          <p className={`mt-3 rounded-xl px-4 py-3 text-sm ${restoreMsg.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
            {restoreMsg.text}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="/api/admin/backup" className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-4 py-2.5 text-sm font-semibold text-white">
            <Download size={15} /> Yedeği indir
          </a>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-mist-900/15 px-4 py-2.5 text-sm font-semibold text-graphite-700 hover:border-graphite-950">
            <Upload size={15} /> Yedekten geri yükle
            <input
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) void restore(f); e.target.value = ''; }}
            />
          </label>
        </div>
      </div>

      <div className={`${card} p-0 overflow-hidden`}>
        <p className="flex items-center gap-2 border-b border-mist-900/10 px-5 py-4 font-display text-sm font-bold text-graphite-950"><Cpu size={16} className="text-volt-600" /> Ayrıntılar</p>
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-t border-mist-900/10 first:border-t-0">
                <td className="w-1/2 px-5 py-2.5 text-mist-600">{k}</td>
                <td className="px-5 py-2.5 font-medium text-graphite-950">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
