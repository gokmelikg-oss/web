'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { trackLead } from '@/lib/track';
import { Honeypot } from '@/components/Honeypot';

export interface ServiceFormLabels {
  title: string;
  success: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  serviceTypeLabel: string;
  selectPlaceholder: string;
  serviceTypes: string[];
  descriptionLabel: string;
  descriptionHint: string;
  submit: string;
  error: string;
}

const DEFAULT_LABELS: ServiceFormLabels = {
  title: 'Servis talebi oluşturun',
  success: 'Servis talebiniz alındı. Teknik ekibimiz en kısa sürede sizinle iletişime geçecek.',
  name: 'Ad Soyad',
  phone: 'Telefon',
  email: 'E-posta',
  city: 'Sistem konumu / Şehir',
  serviceTypeLabel: 'Servis türü',
  selectPlaceholder: 'Seçiniz…',
  serviceTypes: ['Periyodik Bakım', 'Arıza / Onarım', 'Yedek Parça Talebi', 'Garanti Kapsamı', 'Devreye Alma', 'Genel Soru'],
  descriptionLabel: 'Açıklama',
  descriptionHint: '(sistem tipi, arıza belirtisi, kurulum yılı…)',
  submit: 'Talebi gönder',
  error: 'Gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.',
};

/* Satış sonrası teknik servis talep formu. /api/contact'a formType 'service' ile gönderir. */
export function ServiceForm({ labels = DEFAULT_LABELS }: { labels?: ServiceFormLabels }) {
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
          hp: fd.get('website'),
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
            <p className="mt-5 max-w-sm text-balance text-mist-800">{labels.success}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <Honeypot />
            <h2 className="font-display text-xl font-bold text-graphite-950 sm:col-span-2">{labels.title}</h2>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{labels.name}</span>
              <input name="name" type="text" required className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{labels.phone}</span>
              <input name="phone" type="tel" required className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{labels.email}</span>
              <input name="email" type="email" required className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{labels.city}</span>
              <input name="city" type="text" className={field} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{labels.serviceTypeLabel}</span>
              <select name="serviceType" required defaultValue="" className={field}>
                <option value="" disabled>
                  {labels.selectPlaceholder}
                </option>
                {labels.serviceTypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">
                {labels.descriptionLabel} <span className="text-mist-500">{labels.descriptionHint}</span>
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
                {labels.submit}
              </button>
              {status === 'error' && <p className="mt-3 text-sm text-red-600">{labels.error}</p>}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
