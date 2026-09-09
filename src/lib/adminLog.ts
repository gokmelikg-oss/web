import { randomBytes } from 'crypto';
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
    /* ⚠ Math.random() KULLANILMAZ: kriptografik değildir ve iç durumu birkaç
       çıktıdan geri hesaplanabilir. Kimlik üreten her yerde randomBytes
       tercih edilir — böylece bu alışkanlık ileride oturum veya sıfırlama
       işareti üreten bir yere sızmaz. Zaman öneki sıralamayı okunur tutar. */
    id: `${Date.now().toString(36)}-${randomBytes(6).toString('hex')}`,
    at: new Date().toISOString(),
  };
  // En yeni başta; kayıt sayısı sınırlanır.
  await writeStore(STORE, [next, ...entries].slice(0, MAX_ENTRIES));
}
