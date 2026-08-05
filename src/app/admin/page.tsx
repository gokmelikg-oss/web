import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/adminAuth';
import { getContent } from '@/lib/content';
import { staticPostsAsAdmin } from '@/lib/blog';
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
  // Blog boşsa mevcut statik yazıları panele getir (düzenlenebilir başlangıç).
  const initial = {
    ...content,
    posts: content.posts.length ? content.posts : staticPostsAsAdmin(),
  };

  return <AdminDashboard initial={initial} families={FAMILIES} />;
}
