'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, LogIn, User, KeyRound } from 'lucide-react';

const field =
  'mt-1.5 w-full rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 ps-11 text-sm outline-none focus:border-volt-500';

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
        body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }),
      });
      if (res.ok) {
        window.location.href = '/admin';
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus('error');
      if (data.error === 'blocked') {
        setMessage(`Çok fazla hatalı deneme. ${data.minutes} dakika sonra tekrar deneyin.`);
      } else if (data.error === 'ip_denied') {
        setMessage('Bu hesap yalnızca izin verilen ağ adreslerinden giriş yapabilir.');
      } else if (typeof data.remaining === 'number' && data.remaining > 0) {
        setMessage(`Kullanıcı adı veya şifre hatalı. Kalan deneme: ${data.remaining}`);
      } else {
        setMessage('Kullanıcı adı veya şifre hatalı.');
      }
    } catch {
      setStatus('error');
      setMessage('Bağlantı hatası.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-mist-900/10 bg-white p-6 shadow-sm">
      <label className="block text-sm font-medium">
        Kullanıcı adı
        <span className="relative block">
          <User size={16} className="pointer-events-none absolute start-4 top-1/2 mt-[3px] -translate-y-1/2 text-mist-400" />
          <input
            name="username"
            type="text"
            required
            autoFocus
            autoComplete="username"
            spellCheck={false}
            className={field}
          />
        </span>
      </label>
      <label className="mt-4 block text-sm font-medium">
        Şifre
        <span className="relative block">
          <KeyRound size={16} className="pointer-events-none absolute start-4 top-1/2 mt-[3px] -translate-y-1/2 text-mist-400" />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={field}
          />
        </span>
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
      <p className="mt-4 text-center text-[11px] leading-relaxed text-mist-500">
        5 hatalı denemeden sonra hesap 15 dakika kilitlenir.
      </p>
    </form>
  );
}
