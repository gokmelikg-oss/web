import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/adminAuth';
import { LoginForm } from './LoginForm';

export default async function AdminLoginPage() {
  if (await isAuthed()) redirect('/admin');

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-graphite-950">
            <span className="font-display text-2xl font-bold text-volt-500">Ş</span>
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold">Yönetim Paneli</h1>
          <p className="mt-1.5 text-sm text-mist-600">Devam etmek için giriş yapın</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
