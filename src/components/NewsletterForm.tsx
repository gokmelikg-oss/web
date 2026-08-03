'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

/* Bülten aboneliği — e-posta yakalama. /api/contact'a formType 'newsletter' ile gönderir. */
export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'newsletter', email: fd.get('email') }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-volt-300">
        <CheckCircle2 size={18} />
        Aboneliğiniz alındı. Teşekkürler!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
      <input
        name="email"
        type="email"
        required
        placeholder="E-posta adresiniz"
        aria-label="E-posta adresiniz"
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-white placeholder:text-graphite-400 outline-none focus:border-volt-500"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03] disabled:opacity-60"
      >
        {status === 'submitting' ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
        Abone ol
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-300 sm:hidden">Gönderilemedi, tekrar deneyin.</p>
      )}
    </form>
  );
}
