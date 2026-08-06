import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { isAuthed } from '@/lib/adminAuth';
import { getContent, type AdminProduct } from '@/lib/content';
import { staticPostsAsAdmin } from '@/lib/blog';
import { products as featuredProducts, productImages } from '@/data/products';
import { referenceProjects } from '@/data/references';
import { AdminDashboard } from './AdminDashboard';

export const dynamic = 'force-dynamic';

const FAMILIES = [
  { id: 'kolektorler', label: 'Kolektörler' },
  { id: 'boylerler', label: 'Boyler Serisi' },
  { id: 'sehpalar', label: 'Sehpalar' },
  { id: 'baglanti', label: 'Bağlantı Ekipmanları' },
  { id: 'otomasyon', label: 'Otomasyon Sistemleri' },
];

export default async function AdminHome() {
  if (!(await isAuthed())) redirect('/admin/login');
  const content = await getContent();
  // /admin [locale] dışında olduğu için locale'i açıkça veriyoruz.
  const tp = await getTranslations({ locale: 'tr', namespace: 'products' });

  // Ürün paneli boşsa mevcut ürünleri (teknik özellikleriyle) getir.
  const seedProducts: AdminProduct[] = featuredProducts.map((p) => ({
    id: `seed-${p.slug}`,
    name: tp(`items.${p.slug}.name`),
    category: tp(`categoryLabels.${p.category}`),
    model: p.model,
    description: tp(`items.${p.slug}.tagline`),
    image: productImages[p.slug],
    specs: p.specs.map((s) => ({ label: tp(`specsLabels.${s.key}`), value: s.value })),
  }));

  // Referans gizleme yöneticisi için statik projelerin hafif listesi.
  const staticRefs = referenceProjects.map((r) => ({
    title: r.title,
    il: r.il,
    ilce: r.ilce,
    collectors: r.collectors,
  }));

  const initial = {
    ...content,
    products: content.products.length ? content.products : seedProducts,
    posts: content.posts.length ? content.posts : staticPostsAsAdmin(),
    hiddenRefs: content.hiddenRefs ?? [],
  };

  return <AdminDashboard initial={initial} families={FAMILIES} staticRefs={staticRefs} />;
}
