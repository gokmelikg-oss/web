import type { Metadata } from 'next';
import { BadgeCheck, Download, CalendarClock, Hash, Building2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { PageBreadcrumb } from '@/components/JsonLd';
import { ContentPending } from '@/components/ContentPending';
import { Reveal } from '@/components/Reveal';
import { pageMetadata } from '@/lib/seo';
import { certificates } from '@/data/certificates';
import type { Locale } from '@/i18n/config';

/* Sertifikalar — belge numarası, tarih, kapsam ve PDF birlikte.
   PDF'in yanında HTML açıklama bulunması şarttır: arama motorunun ve AI
   sistemlerinin tek bilgi kaynağı PDF olmamalıdır (SEO raporu md. 19/27). */

interface CertText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  meta: { title: string; description: string };
  labels: { issuer: string; number: string; issued: string; validUntil: string; scope: string; download: string; products: string };
  pending: { title: string; body: string; cta: string };
}

const CONTENT: Record<Locale, CertText> = {
  tr: {
    crumb: 'Sertifikalar',
    hero: {
      eyebrow: 'Sertifikalar',
      title: 'Belgelerimiz ve kalite onaylarımız',
      subtitle: 'Ürünlerimizin tabi olduğu testler, belge numaraları ve geçerlilik bilgileri.',
    },
    meta: {
      title: 'Sertifikalar | Şimşek Solar',
      description: 'Şimşek Solar ürünlerinin sertifikaları: belge numarası, kapsam, geçerlilik tarihi ve belge dosyaları.',
    },
    labels: { issuer: 'Veren kurum', number: 'Belge no', issued: 'Veriliş', validUntil: 'Geçerlilik', scope: 'Kapsam', download: 'Belgeyi indir', products: 'Kapsanan ürünler' },
    pending: {
      title: 'Sertifika bilgileri hazırlanıyor',
      body: 'Belge numaraları ve geçerlilik tarihleri doğrulandıktan sonra bu sayfada yayımlanacaktır. Belge talebiniz için bizimle iletişime geçebilirsiniz.',
      cta: 'İletişime geç',
    },
  },
  en: {
    crumb: 'Certificates',
    hero: {
      eyebrow: 'Certificates',
      title: 'Our certificates and quality approvals',
      subtitle: 'Tests our products are subject to, certificate numbers and validity information.',
    },
    meta: {
      title: 'Certificates | Şimşek Solar',
      description: 'Certificates of Şimşek Solar products: certificate number, scope, validity date and document files.',
    },
    labels: { issuer: 'Issued by', number: 'Certificate no', issued: 'Issued', validUntil: 'Valid until', scope: 'Scope', download: 'Download certificate', products: 'Covered products' },
    pending: {
      title: 'Certificate details are being prepared',
      body: 'Certificate numbers and validity dates will be published here once verified. Please contact us to request a document.',
      cta: 'Contact us',
    },
  },
  ar: {
    crumb: 'الشهادات',
    hero: {
      eyebrow: 'الشهادات',
      title: 'شهاداتنا واعتمادات الجودة',
      subtitle: 'الاختبارات التي تخضع لها منتجاتنا وأرقام الشهادات ومعلومات الصلاحية.',
    },
    meta: {
      title: 'الشهادات | Şimşek Solar',
      description: 'شهادات منتجات Şimşek Solar: رقم الشهادة والنطاق وتاريخ الصلاحية وملفات الوثائق.',
    },
    labels: { issuer: 'الجهة المانحة', number: 'رقم الشهادة', issued: 'تاريخ الإصدار', validUntil: 'صالحة حتى', scope: 'النطاق', download: 'تحميل الشهادة', products: 'المنتجات المشمولة' },
    pending: {
      title: 'يجري إعداد بيانات الشهادات',
      body: 'سيتم نشر أرقام الشهادات وتواريخ الصلاحية هنا بعد التحقق منها. يرجى التواصل معنا لطلب أي وثيقة.',
      cta: 'تواصل معنا',
    },
  },
  el: {
    crumb: 'Πιστοποιητικά',
    hero: {
      eyebrow: 'Πιστοποιητικά',
      title: 'Τα πιστοποιητικά και οι εγκρίσεις ποιότητας',
      subtitle: 'Οι δοκιμές στις οποίες υπόκεινται τα προϊόντα μας, αριθμοί πιστοποιητικών και ισχύς.',
    },
    meta: {
      title: 'Πιστοποιητικά | Şimşek Solar',
      description: 'Πιστοποιητικά προϊόντων Şimşek Solar: αριθμός, πεδίο εφαρμογής, ημερομηνία ισχύος και αρχεία.',
    },
    labels: { issuer: 'Εκδότης', number: 'Αριθμός', issued: 'Έκδοση', validUntil: 'Ισχύει έως', scope: 'Πεδίο εφαρμογής', download: 'Λήψη πιστοποιητικού', products: 'Καλυπτόμενα προϊόντα' },
    pending: {
      title: 'Τα στοιχεία πιστοποιητικών ετοιμάζονται',
      body: 'Οι αριθμοί και οι ημερομηνίες ισχύος θα δημοσιευτούν εδώ μετά την επαλήθευση. Επικοινωνήστε μαζί μας για οποιοδήποτε έγγραφο.',
      cta: 'Επικοινωνία',
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  const base = pageMetadata({ locale, path: '/sertifikalar', title: c.meta.title, description: c.meta.description });
  // Veri girilene kadar indekslenmesin — boş sayfa "ince içerik" sayılır.
  return certificates.length ? base : { ...base, robots: { index: false, follow: true } };
}

function fmtDate(iso: string | undefined, locale: Locale): string | undefined {
  if (!iso) return undefined;
  return new Date(iso).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale, {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export default async function CertificatesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale];

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/sertifikalar' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />

      <section className="container-page py-20">
        {certificates.length === 0 ? (
          <ContentPending title={c.pending.title} body={c.pending.body} ctaLabel={c.pending.cta} />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {certificates.map((cert) => {
              const rows: [typeof Hash, string, string | undefined][] = [
                [Building2, c.labels.issuer, cert.issuer],
                [Hash, c.labels.number, cert.number],
                [CalendarClock, c.labels.issued, fmtDate(cert.issuedAt, locale)],
                [CalendarClock, c.labels.validUntil, fmtDate(cert.validUntil, locale)],
              ];
              return (
                <Reveal key={cert.id}>
                  <article className="h-full rounded-2xl border border-mist-900/10 bg-white p-7">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                        <BadgeCheck size={22} />
                      </span>
                      <h2 className="font-display text-lg font-bold text-graphite-950">{cert.name[locale]}</h2>
                    </div>

                    {/* Belge künyesi — yalnızca dolu alanlar basılır */}
                    <dl className="mt-5 space-y-2">
                      {rows.filter(([, , v]) => v).map(([Icon, k, v]) => (
                        <div key={k} className="flex items-center gap-2 text-sm">
                          <Icon size={14} className="shrink-0 text-mist-400" />
                          <dt className="text-mist-500">{k}:</dt>
                          <dd className="font-semibold text-graphite-900">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    {cert.scope?.[locale] && (
                      <p className="mt-4 text-sm leading-relaxed text-graphite-700">
                        <span className="font-semibold">{c.labels.scope}: </span>
                        {cert.scope[locale]}
                      </p>
                    )}
                    {/* PDF'in yanındaki HTML açıklama — SEO/AI için asıl değerli kısım */}
                    {cert.description?.[locale] && (
                      <p className="mt-3 text-sm leading-relaxed text-mist-600">{cert.description[locale]}</p>
                    )}

                    {cert.file && (
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-mist-900/15 px-4 py-2.5 text-sm font-semibold text-graphite-800 transition-colors hover:border-graphite-950"
                      >
                        <Download size={15} /> {c.labels.download}
                      </a>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
