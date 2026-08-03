import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/adminAuth';
import { getContent } from '@/lib/content';
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

  return <AdminDashboard initial={content} families={FAMILIES} />;
}
