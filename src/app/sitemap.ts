import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { localizedUrls } from '@/lib/seo';
import { products } from '@/data/products';
import { articles } from '@/data/news';

/* Tüm sayfaların her dildeki sürümü + hreflang alternatifleri. */
const STATIC_PATHS = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/akademi', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/service', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/gunes-potansiyeli', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/resources', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/founder', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/history', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/kalite-politikasi', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
  { path: '/kvkk', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/gizlilik', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/cerez-politikasi', priority: 0.2, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const push = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly') => {
    const languages = localizedUrls(path);
    for (const loc of locales) {
      entries.push({
        url: languages[loc],
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  };

  for (const p of STATIC_PATHS) push(p.path, p.priority, p.changeFrequency);
  for (const product of products) push(`/products/${product.slug}`, 0.7, 'monthly');
  for (const article of articles) push(`/blog/${article.slug}`, 0.6, 'monthly');

  return entries;
}
