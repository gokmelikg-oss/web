import type { Metadata } from 'next';
import { Wrench, Package, ShieldCheck, Headphones, Settings, MapPin, Phone, MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ServiceForm } from '@/components/ServiceForm';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata, ORG, WHATSAPP_NUMBER } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: '/service',
    title: 'Satış Sonrası Hizmet — Teknik Servis, Bakım ve Yedek Parça',
    description:
      'Şimşek Solar satış sonrası hizmetleri: periyodik bakım, garanti kapsamında onarım, orijinal yedek parça tedariki ve Türkiye geneli teknik servis desteği. Servis talebinizi çevrimiçi oluşturun.',
  });
}

const benefits = [
  { icon: Wrench, title: 'Periyodik bakım', desc: 'Sistem verimini korumak için düzenli bakım, kontrol ve performans takibi.' },
  { icon: ShieldCheck, title: 'Garanti & onarım', desc: 'Garanti kapsamında hızlı arıza teşhisi, onarım ve parça değişimi.' },
  { icon: Package, title: 'Orijinal yedek parça', desc: 'Kollektör, boyler, sehpa ve bağlantı ekipmanları için orijinal yedek parça tedariki.' },
  { icon: Headphones, title: 'Teknik destek', desc: 'Telefon ve uzaktan destekle hızlı çözüm; kurulum ve kullanım danışmanlığı.' },
  { icon: Settings, title: 'Devreye alma', desc: 'Kurulum sonrası devreye alma, ayar ve kullanıcı eğitimi.' },
  { icon: MapPin, title: 'Türkiye geneli servis ağı', desc: 'Bayi ve yetkili servis noktalarıyla ülke genelinde saha desteği.' },
];

export default function ServicePage() {
  return (
    <>
      <PageBreadcrumb items={[{ name: 'Satış Sonrası Hizmet', path: '/service' }]} />
      <PageHero
        eyebrow="Satış Sonrası Hizmet"
        title="Kurulumdan sonra da yanınızdayız"
        subtitle="35 yıllık üretim ve saha tecrübemizle; periyodik bakım, garanti kapsamında onarım, orijinal yedek parça ve teknik destekle sistemlerinizin ömrü boyunca yanınızdayız."
      />

      {/* Kapsam + form */}
      <section className="section-pad bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Hizmet Kapsamı
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-graphite-950 sm:text-3xl">
                Uçtan uca satış sonrası destek
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.06} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <b.icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-graphite-950">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist-700">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Hızlı iletişim */}
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 rounded-2xl border border-mist-900/10 bg-mist-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-sm font-bold text-graphite-950">Acil servis mi gerekiyor?</p>
                  <p className="mt-1 text-sm text-mist-700">Doğrudan arayın, hızlıca yönlendirelim.</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`tel:${ORG.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    <Phone size={15} />
                    Ara
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ServiceForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
