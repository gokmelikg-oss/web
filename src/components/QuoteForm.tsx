'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, Send, Paperclip } from 'lucide-react';
import { trackEvent } from '@/lib/track';
import { Honeypot } from '@/components/Honeypot';

/* Teklif (RFQ) formu. İletişim formundan farkı: ticari alanlar + dosya eki.
   Metinler prop olarak gelir (sunucu bileşeni dile göre seçer). */

export interface QuoteFormLabels {
  title: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  productPlaceholder: string;
  quantity: string;
  quantityPlaceholder: string;
  projectLocation: string;
  projectType: string;
  projectTypeOptions: string[];
  message: string;
  file: string;
  fileHint: string;
  submit: string;
  success: string;
  error: string;
  notConfigured: string;
  fileTooBig: string;
  fileType: string;
  /* Sorgu parametresinden alan doldurulduğunda gösterilen bilgi notu. */
  prefilledNote: string;
}

const field =
  'w-full rounded-xl border border-mist-900/15 bg-white px-4 py-3 text-sm text-graphite-900 outline-none transition-shadow placeholder:text-mist-400 focus:border-volt-500 focus:ring-2 focus:ring-volt-500/15';
const label = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-mist-500';

export function QuoteForm({ labels }: { labels: QuoteFormLabels }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');

  /* Bağlam ön doldurma.
     Ürün sayfasından, hesaplama aracından veya il sayfasından gelen kullanıcı
     "ne için teklif istediğini" formda yeniden yazmak zorunda kalmasın diye
     ilgili alanlar sorgu parametresinden doldurulur:
       /teklif-al?urun=Orion 435&adet=120&konum=Mersin
     Sayfa statik kalsın diye sunucuda değil, istemcide okunur (Suspense içinde). */
  const params = useSearchParams();
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const u = params.get('urun') ?? '';
    const a = params.get('adet') ?? '';
    const k = params.get('konum') ?? '';
    setProduct(u);
    setQuantity(a);
    setProjectLocation(k);
    setPrefilled(Boolean(u || a || k));
  }, [params]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/teklif', { method: 'POST', body: fd });
      if (res.ok) {
        trackEvent('quote_submit', { country: (fd.get('country') ?? '').toString() });
        setStatus('done');
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus('error');
      setMessage(
        data.error === 'not_configured' ? labels.notConfigured
          : data.error === 'file_size' ? labels.fileTooBig
            : data.error === 'file_type' ? labels.fileType
              : labels.error
      );
    } catch {
      setStatus('error');
      setMessage(labels.error);
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-mist-900/8 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 size={44} className="text-volt-600" />
        <p className="mt-5 max-w-sm text-balance text-mist-800">{labels.success}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="grid grid-cols-1 gap-5 rounded-2xl border border-mist-900/8 bg-white p-8 shadow-sm sm:grid-cols-2 sm:p-10"
    >
      <Honeypot />
      <h2 className="font-display text-xl font-bold text-graphite-950 sm:col-span-2">{labels.title}</h2>

      {/* Geldiği sayfadan taşınan bilgiyi görünür kıl — kullanıcı doğru
          ürün/konum için form doldurduğunu görsün, gerekirse değiştirsin. */}
      {prefilled && (
        <p className="rounded-xl border border-volt-500/30 bg-volt-50 px-4 py-2.5 text-xs leading-relaxed text-graphite-700 sm:col-span-2">
          {labels.prefilledNote}
        </p>
      )}

      <label className="block">
        <span className={label}>{labels.name} *</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className={label}>{labels.company}</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>

      {/* Ülke alanı ihracat için kritik — talebin hangi pazardan geldiğini gösterir */}
      <label className="block">
        <span className={label}>{labels.country} *</span>
        <input name="country" required autoComplete="country-name" className={field} />
      </label>
      <label className="block">
        <span className={label}>{labels.email} *</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>

      <label className="block">
        <span className={label}>{labels.phone}</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="block">
        <span className={label}>{labels.product}</span>
        <input
          name="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder={labels.productPlaceholder}
          className={field}
        />
      </label>

      <label className="block">
        <span className={label}>{labels.quantity}</span>
        <input
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={labels.quantityPlaceholder}
          className={field}
        />
      </label>
      <label className="block">
        <span className={label}>{labels.projectLocation}</span>
        <input
          name="projectLocation"
          value={projectLocation}
          onChange={(e) => setProjectLocation(e.target.value)}
          className={field}
        />
      </label>

      <label className="block sm:col-span-2">
        <span className={label}>{labels.projectType}</span>
        <select name="projectType" className={field} defaultValue="">
          <option value="" />
          {labels.projectTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className={label}>{labels.message}</span>
        <textarea name="message" rows={5} className={field} />
      </label>

      <div className="sm:col-span-2">
        <span className={label}>{labels.file}</span>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-mist-900/25 px-4 py-3.5 text-sm text-graphite-700 hover:border-volt-500">
          <Paperclip size={16} className="shrink-0 text-mist-400" />
          <span className="min-w-0 flex-1 truncate">{fileName || labels.fileHint}</span>
          <input
            type="file"
            name="file"
            className="hidden"
            accept=".pdf,.dwg,.dxf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png,.zip"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
      </div>

      {status === 'error' && <p className="text-sm text-red-600 sm:col-span-2">{message}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-graphite-950 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 sm:col-span-2"
      >
        {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {labels.submit}
      </button>
    </form>
  );
}
