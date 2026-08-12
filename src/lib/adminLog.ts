import { readStore, writeStore } from './adminStore';
import type { LogEntry } from './adminLogShared';

/* İşlem kaydı — Webmin'in "Webmin Actions Log" modülünden uyarlandı.
   Kim, ne zaman, nereden, neyi değiştirdi. Son MAX_ENTRIES kayıt tutulur.
   Tipler ve etiketler adminLogShared.ts içindedir (client de oradan okur). */

export type { LogAction, LogEntry } from './adminLogShared';
export { ACTION_LABELS } from './adminLogShared';

const STORE = 'log';
const MAX_ENTRIES = 500;

export async function listLog(): Promise<LogEntry[]> {
  return readStore<LogEntry[]>(STORE, []);
}

export async function writeLog(entry: Omit<LogEntry, 'id' | 'at'>): Promise<void> {
  const entries = await listLog();
  const next: LogEntry = {
    ...entry,
    id: `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`,
    at: new Date().toISOString(),
  };
  // En yeni başta; kayıt sayısı sınırlanır.
  await writeStore(STORE, [next, ...entries].slice(0, MAX_ENTRIES));
}
