import os from 'os';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/adminAuth';
import { listUsers } from '@/lib/adminUsers';
import { listSessions } from '@/lib/adminSessions';
import { listLog } from '@/lib/adminLog';
import { getContent } from '@/lib/content';

export const runtime = 'nodejs';

/* Sistem Bilgisi — Webmin ana sayfasındaki "System Information" panosundan uyarlandı.
   Sunucu durumu + içerik deposunun durumu tek bakışta. */

export interface EnvCheck {
  name: string;
  set: boolean;
  note: string;
  critical: boolean;
}

export interface SystemInfo {
  hostname: string;
  platform: string;
  nodeVersion: string;
  cpu: { model: string; cores: number; loadPercent: number | null };
  disk: { freeBytes: number; totalBytes: number; percent: number } | null;
  processUptimeSec: number;
  systemUptimeSec: number;
  memory: { usedBytes: number; totalBytes: number; percent: number };
  storage: { mode: 'Vercel KV' | 'Yerel dosya'; sizeBytes: number; location: string };
  counts: { users: number; sessions: number; logEntries: number; products: number; posts: number; references: number };
  lastContentUpdate: string;
  env: EnvCheck[];
  warnings: string[];
}

function dirSize(dir: string): number {
  try {
    return fs
      .readdirSync(dir)
      .reduce((sum, f) => sum + (fs.statSync(path.join(dir, f)).size || 0), 0);
  } catch {
    return 0;
  }
}

/* Anlık CPU meşguliyeti: iki örnek arasındaki boşta kalma oranından hesaplanır.
   os.loadavg() Windows'ta hep 0 döndüğü için kullanılmaz. */
function cpuSnapshot() {
  return os.cpus().reduce(
    (acc, c) => {
      const total = Object.values(c.times).reduce((a, b) => a + b, 0);
      return { idle: acc.idle + c.times.idle, total: acc.total + total };
    },
    { idle: 0, total: 0 }
  );
}

async function cpuLoadPercent(): Promise<number | null> {
  try {
    const a = cpuSnapshot();
    await new Promise((r) => setTimeout(r, 120));
    const b = cpuSnapshot();
    const dTotal = b.total - a.total;
    if (dTotal <= 0) return null;
    return Math.max(0, Math.min(100, Math.round((1 - (b.idle - a.idle) / dTotal) * 100)));
  } catch {
    return null;
  }
}

/* Disk doluluğu — Node 18.15+ fs.statfsSync. Desteklenmiyorsa null. */
function diskUsage(dir: string): SystemInfo['disk'] {
  try {
    const st = (fs as unknown as { statfsSync?: (p: string) => { bsize: number; blocks: number; bavail: number } })
      .statfsSync?.(dir);
    if (!st) return null;
    const total = st.bsize * st.blocks;
    const free = st.bsize * st.bavail;
    if (!total) return null;
    return { freeBytes: free, totalBytes: total, percent: Math.round(((total - free) / total) * 100) };
  } catch {
    return null;
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  if (session.role !== 'owner') {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  const kv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  const contentDir = path.join(process.cwd(), 'content');
  const [users, sessions, log, content] = await Promise.all([
    listUsers(), listSessions(), listLog(), getContent(),
  ]);

  const totalMem = os.totalmem();
  const usedMem = totalMem - os.freemem();

  const warnings: string[] = [];
  if (!process.env.ADMIN_SECRET) {
    warnings.push('ADMIN_SECRET tanımlı değil — oturum imzası ADMIN_PASSWORD üzerinden türetiliyor. Şifre değişince tüm oturumlar düşer.');
  }
  if (!kv) {
    warnings.push('Vercel KV bağlı değil. İçerik ve kullanıcılar content/ klasöründeki dosyalarda tutuluyor; sunucusuz dağıtımda kalıcı olmayabilir.');
  }
  if (users.filter((u) => u.role === 'owner' && u.active).length === 1) {
    warnings.push('Tek aktif yönetici hesabı var. Erişimi kaybetmemek için ikinci bir yönetici tanımlamanız önerilir.');
  }

  const env: EnvCheck[] = [
    { name: 'ADMIN_PASSWORD', set: Boolean(process.env.ADMIN_PASSWORD), critical: true, note: 'İlk yönetici hesabının kurulum şifresi' },
    { name: 'ADMIN_SECRET', set: Boolean(process.env.ADMIN_SECRET), critical: false, note: 'Oturum imzası anahtarı (önerilir)' },
    { name: 'KV_REST_API_URL', set: Boolean(process.env.KV_REST_API_URL), critical: false, note: 'Vercel KV bağlantısı' },
    { name: 'KV_REST_API_TOKEN', set: Boolean(process.env.KV_REST_API_TOKEN), critical: false, note: 'Vercel KV erişim anahtarı' },
  ];

  const info: SystemInfo = {
    hostname: os.hostname(),
    platform: `${os.type()} ${os.release()} (${os.arch()})`,
    nodeVersion: process.version,
    cpu: {
      model: os.cpus()[0]?.model?.trim() ?? 'bilinmiyor',
      cores: os.cpus().length,
      loadPercent: await cpuLoadPercent(),
    },
    disk: diskUsage(process.cwd()),
    env,
    processUptimeSec: Math.floor(process.uptime()),
    systemUptimeSec: Math.floor(os.uptime()),
    memory: { usedBytes: usedMem, totalBytes: totalMem, percent: Math.round((usedMem / totalMem) * 100) },
    storage: {
      mode: kv ? 'Vercel KV' : 'Yerel dosya',
      sizeBytes: kv ? 0 : dirSize(contentDir),
      location: kv ? 'site:* anahtarları' : 'content/',
    },
    counts: {
      users: users.length,
      sessions: sessions.length,
      logEntries: log.length,
      products: content.products?.length ?? 0,
      posts: content.posts?.length ?? 0,
      references: content.references?.length ?? 0,
    },
    lastContentUpdate: content.updatedAt ?? '',
    warnings,
  };

  return NextResponse.json({ ok: true, info });
}
