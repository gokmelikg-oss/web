'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { trackLead } from '@/lib/track';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          name: fd.get('name'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          subject: fd.get('subject'),
          message: fd.get('message'),
        }),
      });
      if (res.ok) {
        trackLead('contact');
        setStatus('done');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

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
            <p className="mt-5 max-w-sm text-balance text-mist-800">{t('success')}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <h2 className="font-display text-xl font-bold text-graphite-950 sm:col-span-2">{t('title')}</h2>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{t('name')}</span>
              <input
                name="name"
                type="text"
                required
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{t('phone')}</span>
              <input
                name="phone"
                type="tel"
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{t('email')}</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{t('subject')}</span>
              <input
                name="subject"
                type="text"
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{t('message')}</span>
              <textarea
                name="message"
                rows={5}
                required
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-graphite-950 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {t('submit')}
              </button>
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-600">{t('error')}</p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
