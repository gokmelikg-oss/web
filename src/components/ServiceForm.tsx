'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { trackLead } from '@/lib/track';

const SERVICE_TYPES = [
  'Periyodik Bakım',
  'Arıza / Onarım',
  'Yedek Parça Talebi',
  'Garanti Kapsamı',
  'Devreye Alma',
  'Genel Soru',
];

/* Satış sonrası teknik servis talep formu. /api/contact'a formType 'service' ile gönderir. */
export function ServiceForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'service',
          name: fd.get('name'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          city: fd.get('city'),
          serviceType: fd.get('serviceType'),
          message: fd.get('message'),
        }),
      });
      if (res.ok) {
        trackLead('service');
        setStatus('done');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const field =
    'rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500';

  return (
    <div className="relative rounded-2xl border border-mist-900/8 bg-white p-8 shadow-sm sm:p-10">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <CheckCircle2 size={44} className="text-volt-600" />
            <p className="mt-5 max-w-sm text-balance text-mist-800">
              Servis talebiniz alındı. Teknik ekibimiz en kısa sürede sizinle iletişime geçecek.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <h2 className="font-display text-xl font-bold text-graphite-950 sm:col-span-2">
              Servis talebi oluşturun
            </h2>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">Ad Soyad</span>
              <input name="name" type="text" required className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">Telefon</span>
              <input name="phone" type="tel" required className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">E-posta</span>
              <input name="email" type="email" required className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">Sistem konumu / Şehir</span>
              <input name="city" type="text" className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">Servis türü</span>
              <select name="serviceType" required defaultValue="" className={field}>
                <option value="" disabled>
                  Seçiniz…
                </option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">
                Açıklama <span className="text-mist-500">(sistem tipi, arıza belirtisi, kurulum yılı…)</span>
              </span>
              <textarea name="message" rows={5} required className={field} />
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-graphite-950 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Talebi gönder
              </button>
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-600">
                  Gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
