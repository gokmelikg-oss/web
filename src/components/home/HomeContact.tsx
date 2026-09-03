import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { txt } from '@/lib/siteTexts';

export const FACTORY_MAP_EMBED =
  'https://www.google.com/maps?q=%C5%9Eim%C5%9Fek+G%C3%BCne%C5%9F+Kollekt%C3%B6rleri+San.+Tic.+Ltd.+%C5%9Eti.+Mersin&hl=tr&z=15&output=embed';

export function HomeContact({ texts }: { texts?: Record<string, string> }) {
  const t = useTranslations('contact');

  const infoItems = [
    { icon: MapPin, title: t('info.addressTitle'), value: txt(texts, 'contact.address', t('info.address')), dir: undefined },
    { icon: Phone, title: t('info.phoneTitle'), value: txt(texts, 'contact.phone', t('info.phone')), dir: 'ltr' as const },
    { icon: Mail, title: t('info.emailTitle'), value: txt(texts, 'contact.email', t('info.email')), dir: 'ltr' as const },
    { icon: Clock, title: t('info.hoursTitle'), value: txt(texts, 'contact.hours', t('info.hours')), dir: undefined },
  ];

  return (
    <section id="iletisim" className="scroll-mt-20 bg-mist-50 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
            {t('hero.eyebrow')}
          </p>
          <h2 className="mt-3 max-w-xl text-balance font-display type-h2 font-bold tracking-tight text-graphite-700">
            {t('hero.title')}
          </h2>
          <p className="mt-4 max-w-lg text-mist-600">{t('hero.subtitle')}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-7">
            {infoItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                  <item.icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-graphite-700">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-600" dir={item.dir}>
                    {item.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
