import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock, Briefcase, ArrowUpRight, Handshake } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { DealerForm } from '@/components/DealerForm';
import { Faq } from '@/components/home/Faq';
import { FaqJsonLd } from '@/components/JsonLd';
import { FACTORY_MAP_EMBED } from '@/components/home/HomeContact';
import { faqItems } from '@/data/faq';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

const HR_EMAIL = 'info@simseksolar.com.tr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.hero' });
  return pageMetadata({ locale, path: '/contact', title: t('title'), description: t('subtitle') });
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  const infoItems = [
    { icon: MapPin, title: t('info.addressTitle'), value: t('info.address'), dir: undefined },
    { icon: Phone, title: t('info.phoneTitle'), value: t('info.phone'), dir: 'ltr' },
    { icon: Mail, title: t('info.emailTitle'), value: t('info.email'), dir: 'ltr' },
    { icon: Clock, title: t('info.hoursTitle'), value: t('info.hours'), dir: undefined },
  ] as const;

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-7">
            {infoItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-600">
                  <item.icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-graphite-950">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-700" dir={item.dir}>
                    {item.value}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              {/* Ana sayfadaki harita ile aynı dil: gri tonlu, üzerine gelince renklenir */}
              <div className="group relative overflow-hidden rounded-2xl border border-mist-900/10 bg-mist-100 shadow-card">
                <iframe
                  src={FACTORY_MAP_EMBED}
                  title={t('info.addressTitle')}
                  className="h-72 w-full border-0 grayscale-[0.85] contrast-[0.95] transition-all duration-500 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/80 to-transparent" aria-hidden />
                <div className="pointer-events-none absolute start-3 top-3 flex items-center gap-2 rounded-full border border-mist-900/10 bg-white/95 py-1.5 pe-4 ps-2 shadow-sm backdrop-blur-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-volt-500 text-graphite-950">
                    <MapPin size={13} strokeWidth={2} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-graphite-950">Şimşek Solar Üretim Tesisi</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-600">Mersin 2. OSB</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Sık sorulan sorular — ana sayfadan iletişim sayfasına taşındı */}
      <Faq />
      <FaqJsonLd items={faqItems} />

      {/* Kariyer — İnsan Kaynakları iletişim ile birleştirildi */}
      <section id="kariyer" className="scroll-mt-24 bg-mist-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 rounded-3xl bg-graphite-gradient p-9 text-white sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Kariyer
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Ekibimize dahil olun</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-graphite-200">
                Enerjiyi geleceğe bırakacağımız en önemli miraslardan biri olarak görüyoruz. Sorumluluk
                sahibi, öğrenmeye açık ve birlikte başarmaya inanan ekip arkadaşları arıyoruz.
                Özgeçmişinizi, çalışmak istediğiniz alanı belirterek iletin.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
                <Briefcase size={22} strokeWidth={1.75} />
              </span>
              <p className="text-sm leading-relaxed text-graphite-200">
                Başvurularınızı ve staj taleplerinizi doğrudan insan kaynakları ekibimize
                gönderebilirsiniz.
              </p>
              <a
                href={`mailto:${HR_EMAIL}?subject=Kariyer — İş Başvurusu`}
                className="inline-flex items-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Mail size={15} />
                Özgeçmişinizi gönderin
                <ArrowUpRight size={15} />
              </a>
              <p className="font-mono text-[11px] tracking-tight text-graphite-400">{HR_EMAIL}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bayilik — başvuru formu iletişim sayfasına gömüldü */}
      <BayilikSection />
    </>
  );
}

async function BayilikSection() {
  const t = await getTranslations('dealers');
  const benefits = t.raw('benefits.items') as { title: string; desc: string }[];

  return (
    <section id="bayilik" className="section-pad scroll-mt-24 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {t('hero.eyebrow')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              {t('hero.title')}
            </h2>
            <p className="mt-4 text-mist-700">{t('hero.subtitle')}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                  <Handshake size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-graphite-950">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-700">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <DealerForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
