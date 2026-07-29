import fs from 'fs';
import path from 'path';

/* Admin panelinden yönetilen içerik. JSON dosyasında saklanır (content/site.json).
   Not: Bu dosya-tabanlı depolama; kendi sunucunuzda (VPS/Node) veya yerelde kalıcıdır.
   Vercel gibi salt-okunur/serverless ortamlarda kalıcılık için Vercel KV veya bir
   veritabanına geçilmelidir (getContent/saveContent gövdesini değiştirmek yeterli). */

export interface DocLink {
  id: string;
  name: string;
  url: string;
  type?: string;
}

export interface RefEntry {
  id: string;
  title: string;
  il: string;
  ilce?: string;
  homes?: number;
  collectors?: number;
}

export interface SiteContent {
  documents: DocLink[];
  references: RefEntry[];
  groupImages: Record<string, string>; // familyId -> görsel yolu
  updatedAt: string;
}

const FILE = path.join(process.cwd(), 'content', 'site.json');

const DEFAULT: SiteContent = {
  documents: [],
  references: [],
  groupImages: {},
  updatedAt: '',
};

export function getContent(): SiteContent {
  try {
    const raw = fs.readFileSync(FILE, 'utf8');
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveContent(next: SiteContent): void {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify({ ...next, updatedAt: new Date().toISOString() }, null, 2), 'utf8');
}
