'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, LogIn } from 'lucide-react';

export function LoginForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: fd.get('password') }),
      });
      if (res.ok) {
        window.location.href = '/admin';
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus('error');
      setMessage(
        data.error === 'not_configured'
          ? 'ADMIN_PASSWORD ortam değişkeni tanımlı değil. Sunucu ayarlarından ekleyin.'
          : 'Şifre hatalı.'
      );
    } catch {
      setStatus('error');
      setMessage('Bağlantı hatası.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-mist-900/10 bg-white p-6 shadow-sm">
      <label className="block text-sm font-medium">
        Şifre
        <input
          name="password"
          type="password"
          required
          autoFocus
          className="mt-1.5 w-full rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
        />
      </label>
      {status === 'error' && <p className="mt-3 text-sm text-red-600">{message}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
        Giriş Yap
      </button>
    </form>
  );
}
