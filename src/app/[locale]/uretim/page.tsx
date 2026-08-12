import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { PageBreadcrumb } from '@/components/JsonLd';
import { ContentPending } from '@/components/ContentPending';
import { Reveal } from '@/components/Reveal';
import { pageMetadata } from '@/lib/seo';
import { productionSteps } from '@/data/production';
import type { Locale } from '@/i18n/config';

/* Üretim tesisi — bu sayfanın işlevi SEO'dan çok GÜVEN'dir.
   Gerçek üretici olduğunuzu gösterir; bu yüzden stok görsel değil kendi
   tesis fotoğraflarınız kullanılmalıdır (SEO raporu md. 17-18). */

interface ProdText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  meta: { title: string; description: string };
  stepLabel: string;
  pending: { title: string; body: string; cta: string };
}

const CONTENT: Record<Locale, ProdText> = {
  tr: {
    crumb: 'Üretim',
    hero: {
      eyebrow: 'Üretim',
      title: 'Kendi tesisimizde üretiyoruz',
      subtitle: 'Hammaddeden sevkiyata kadar üretim adımlarımız ve kalite kontrol süreçlerimiz.',
    },
    meta: {
      title: 'Üretim Tesisi | Şimşek Solar',
      description: 'Şimşek Solar üretim süreçleri: absorber üretiminden kalite kontrole, Mersin 2. OSB tesisimizde yürüttüğümüz adımlar.',
    },
    stepLabel: 'Adım',
    pending: {
      title: 'Üretim içeriği hazırlanıyor',
      body: 'Tesisimizdeki üretim adımları ve saha fotoğrafları yayına hazırlanıyor. Tesis ziyareti veya detaylı bilgi için bizimle iletişime geçebilirsiniz.',
      cta: 'İletişime geç',
    },
  },
  en: {
    crumb: 'Production',
    hero: {
      eyebrow: 'Production',
      title: 'We manufacture in our own facility',
      subtitle: 'Our production steps and quality control processes, from raw material to shipment.',
    },
    meta: {
      title: 'Manufacturing Facility | Şimşek Solar',
      description: 'Şimşek Solar production processes: from absorber manufacturing to quality control at our facility in Mersin.',
    },
    stepLabel: 'Step',
    pending: {
      title: 'Production content is being prepared',
      body: 'Production steps and facility photographs are being prepared for publication. Contact us for a facility visit or detailed information.',
      cta: 'Contact us',
    },
  },
  ar: {
    crumb: 'الإنتاج',
    hero: {
      eyebrow: 'الإنتاج',
      title: 'نصنع في منشأتنا الخاصة',
      subtitle: 'خطوات الإنتاج وعمليات مراقبة الجودة من المواد الخام حتى الشحن.',
    },
    meta: {
      title: 'منشأة التصنيع | Şimşek Solar',
      description: 'عمليات الإنتاج في Şimşek Solar: من تصنيع الممتص إلى مراقبة الجودة في منشأتنا بمرسين.',
    },
    stepLabel: 'خطوة',
    pending: {
      title: 'يجري إعداد محتوى الإنتاج',
      body: 'يجري إعداد خطوات الإنتاج وصور المنشأة للنشر. تواصل معنا لزيارة المنشأة أو للحصول على معلومات مفصلة.',
      cta: 'تواصل معنا',
    },
  },
  el: {
    crumb: 'Παραγωγή',
    hero: {
      eyebrow: 'Παραγωγή',
      title: 'Κατασκευάζουμε στις δικές μας εγκαταστάσεις',
      subtitle: 'Τα στάδια παραγωγής και οι έλεγχοι ποιότητας, από την πρώτη ύλη έως την αποστολή.',
    },
    meta: {
      title: 'Μονάδα Παραγωγής | Şimşek Solar',
      description: 'Διαδικασίες παραγωγής Şimşek Solar: από την κατασκευή απορροφητή έως τον έλεγχο ποιότητας στη μονάδα μας στη Μερσίνη.',
    },
    stepLabel: 'Βήμα',
    pending: {
      title: 'Το περιεχόμενο παραγωγής ετοιμάζεται',
      body: 'Τα στάδια παραγωγής και οι φωτογραφίες της μονάδας ετοιμάζονται για δημοσίευση. Επικοινωνήστε μαζί μας για επίσκεψη ή αναλυτικές πληροφορίες.',
      cta: 'Επικοινωνία',
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  const base = pageMetadata({ locale, path: '/uretim', title: c.meta.title, description: c.meta.description });
  return productionSteps.length ? base : { ...base, robots: { index: false, follow: true } };
}

export default async function ProductionPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale];
  const steps = [...productionSteps].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/uretim' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />

      <section className="container-page py-20">
        {steps.length === 0 ? (
          <ContentPending title={c.pending.title} body={c.pending.body} ctaLabel={c.pending.cta} />
        ) : (
          <ol className="space-y-10">
            {steps.map((step, i) => (
              <Reveal key={step.order}>
                <li className="grid items-center gap-8 lg:grid-cols-2">
                  {step.image && (
                    <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist-100 ${i % 2 ? 'lg:order-2' : ''}`}>
                      <Image
                        src={step.image}
                        alt={step.imageAlt?.[locale] ?? step.title[locale]}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-600">
                      {c.stepLabel} {String(step.order).padStart(2, '0')}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-bold text-graphite-950">{step.title[locale]}</h2>
                    <p className="mt-3 leading-relaxed text-mist-700">{step.description[locale]}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
