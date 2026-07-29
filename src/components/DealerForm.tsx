'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

export function DealerForm() {
  const t = useTranslations('dealers.form');
  const tc = useTranslations('contact.form');
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
          formType: 'dealer',
          name: fd.get('name'),
          company: fd.get('company'),
          city: fd.get('city'),
          country: fd.get('country'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          volume: fd.get('volume'),
          message: fd.get('message'),
        }),
      });
      setStatus(res.ok ? 'done' : 'error');
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
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            <h2 className="font-display text-xl font-bold text-graphite-950 sm:col-span-2">{t('title')}</h2>

            <Field label={t('name')} name="name" required />
            <Field label={t('company')} name="company" required />
            <Field label={t('city')} name="city" required />
            <Field label={t('country')} name="country" required />
            <Field label={t('phone')} name="phone" type="tel" required />
            <Field label={t('email')} name="email" type="email" required />
            <Field label={t('volume')} name="volume" className="sm:col-span-2" />

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{t('message')}</span>
              <textarea
                name="message"
                rows={4}
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
              {status === 'error' && <p className="mt-3 text-sm text-red-600">{tc('error')}</p>}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className ?? ''}`}>
      <span className="font-medium text-graphite-950">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
      />
    </label>
  );
}
