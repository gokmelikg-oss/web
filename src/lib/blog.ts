import { articles, getArticles } from '@/data/news';
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

/* Statik body'yi admin düz-metin formatına çevirir (panelde düzenlenebilsin). */
function serializeBody(sections: PostSection[]): string {
  return sections
    .map((s) => `${s.heading ? `## ${s.heading}\n\n` : ''}${s.paragraphs.join('\n\n')}`)
    .join('\n\n');
}

/* Statik yazıları admin formatında verir — panel ilk açıldığında formları
   mevcut içerikle doldurmak için. */
export function staticPostsAsAdmin(): AdminPost[] {
  return articles.map((a) => ({
    id: `seed-${a.slug}`,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    date: a.date,
    cover: a.cover,
    body: serializeBody(a.body),
  }));
}

/* Kaynak seçimi: admin panelinde yazı VARSA yalnızca admin kullanılır (silme/
   düzenleme kalıcı olur). Panel boşsa statik rehberler gösterilir. */
export async function getBlogList(locale = 'tr'): Promise<PostSummary[]> {
  const { posts } = await getContent();
  const source: PostSummary[] =
    posts.length > 0
      ? posts
          .filter((p) => p.slug && p.title)
          .map((p) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt ?? '',
            category: p.category ?? 'Rehber',
            date: p.date ?? '',
            readMin: readMinFromText(`${p.body ?? ''} ${p.excerpt ?? ''}`),
            cover: p.cover || undefined,
          }))
      : getArticles(locale).map((a) => ({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          category: a.category,
          date: a.date,
          readMin: a.readMin,
          cover: a.cover,
        }));
  return source.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string, locale = 'tr'): Promise<PostFull | undefined> {
  const { posts } = await getContent();
  if (posts.length > 0) {
    const m = posts.find((p) => p.slug === slug);
    return m ? adminToFull(m) : undefined;
  }
  const a = getArticles(locale).find((x) => x.slug === slug);
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
