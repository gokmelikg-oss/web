import { articles } from '@/data/news';
import { getContent, type AdminPost } from '@/lib/content';

export interface PostSection {
  heading: string;
  paragraphs: string[];
}
export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMin: number;
  cover?: string;
}
export interface PostFull extends PostSummary {
  body: PostSection[];
}

function readMinFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

/* Admin düz metnini bölümlere ayırır: "## " başlık, boş satır yeni paragraf. */
function parseBody(body: string): PostSection[] {
  const lines = (body ?? '').split(/\r?\n/);
  const sections: PostSection[] = [];
  let cur: PostSection = { heading: '', paragraphs: [] };
  let buf: string[] = [];
  const flushPara = () => {
    const t = buf.join(' ').trim();
    if (t) cur.paragraphs.push(t);
    buf = [];
  };
  const flushSection = () => {
    flushPara();
    if (cur.heading || cur.paragraphs.length) sections.push(cur);
    cur = { heading: '', paragraphs: [] };
  };
  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushSection();
      cur.heading = line.slice(3).trim();
    } else if (line.trim() === '') {
      flushPara();
    } else {
      buf.push(line.trim());
    }
  }
  flushSection();
  return sections.length ? sections : [{ heading: '', paragraphs: [(body ?? '').trim()].filter(Boolean) }];
}

function adminToFull(p: AdminPost): PostFull {
  const body = parseBody(p.body ?? '');
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    category: p.category ?? 'Rehber',
    date: p.date ?? '',
    readMin: readMinFromText(`${p.body ?? ''} ${p.excerpt ?? ''}`),
    cover: p.cover || undefined,
    body,
  };
}

/* Statik + admin yazıları birleşik, tarihe göre yeni→eski. */
export async function getBlogList(): Promise<PostSummary[]> {
  const { posts } = await getContent();
  const admin: PostSummary[] = posts
    .filter((p) => p.slug && p.title)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? '',
      category: p.category ?? 'Rehber',
      date: p.date ?? '',
      readMin: readMinFromText(`${p.body ?? ''} ${p.excerpt ?? ''}`),
      cover: p.cover || undefined,
    }));
  const staticList: PostSummary[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    date: a.date,
    readMin: a.readMin,
    cover: a.cover,
  }));
  // Admin, aynı slug'ı override edebilir.
  const bySlug = new Map<string, PostSummary>();
  for (const p of staticList) bySlug.set(p.slug, p);
  for (const p of admin) bySlug.set(p.slug, p);
  return Array.from(bySlug.values()).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<PostFull | undefined> {
  const { posts } = await getContent();
  const adminMatch = posts.find((p) => p.slug === slug);
  if (adminMatch) return adminToFull(adminMatch);
  const a = articles.find((x) => x.slug === slug);
  if (!a) return undefined;
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    date: a.date,
    readMin: a.readMin,
    cover: a.cover,
    body: a.body,
  };
}
