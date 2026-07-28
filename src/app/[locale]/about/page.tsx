import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import {
  Factory,
  ShieldCheck,
  Globe2,
  Target,
  Eye,
  Sun,
  BatteryCharging,
  Wind,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  return pageMetadata({ locale, path: '/about', title: t('title'), description: t('subtitle') });
}

const valueIcons = [ShieldCheck, Factory, Globe2];

interface Company {
  id: string;
  name: string;
  tag: string;
  desc: string;
}

const companyVisual: Record<string, { logo?: string; icon: typeof Sun; accent: string }> = {
  solar: { logo: '/brand/simsek-solar.png', icon: Sun, accent: 'bg-volt-100 text-volt-700' },
  lipus: { logo: '/brand/lipus.png', icon: BatteryCharging, accent: 'bg-emerald-50 text-emerald-600' },
  yenilenebilir: { icon: Wind, accent: 'bg-sky-50 text-sky-600' },
  smk: { icon: Layers, accent: 'bg-mist-100 text-mist-600' },
};

export default async function AboutPage() {
  const t = await getTranslations('about');
  const tGroup = await getTranslations('group');
  const stats = t.raw('stats') as { value: string; label: string }[];
  const values = t.raw('values.items') as { title: string; desc: string }[];
  const companies = tGroup.raw('companies') as Company[];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-graphite-950">
              {t('story.title')}
            </h2>
            <p className="mt-6 text-balance leading-relaxed text-mist-700">{t('story.body1')}</p>
            <p className="mt-4 text-balance leading-relaxed text-mist-700">{t('story.body2')}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-mist-900/8 bg-mist-50 p-6">
                  <p className="font-display text-3xl font-bold text-graphite-950">{s.value}</p>
                  <p className="mt-2 text-sm text-mist-700">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl bg-graphite-gradient p-9 text-white sm:p-11">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
                  <Target size={26} strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold sm:text-3xl">Misyonumuz</h2>
                <p className="mt-4 font-display text-lg font-semibold leading-relaxed text-volt-400">
                  &ldquo;Enerjiyi sadece bir ihtiyaç değil, yaşamı sürdüren görünmez bir güç olarak
                  görüyoruz.&rdquo;
                </p>
                <p className="mt-4 leading-relaxed text-graphite-200">
                  Yenilenebilir enerjiyi herkes için erişilebilir, güvenilir ve dayanıklı hâle getiren
                  çözümler geliştiriyoruz. Her proje; bir haneye konfor, bir işletmeye istikrar ve
                  çocukların geleceğine fırsat sunmak demek.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-graphite-700/10 bg-white p-9 sm:p-11">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                  <Eye size={26} strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-graphite-950 sm:text-3xl">Vizyonumuz</h2>
                <p className="mt-4 font-display text-lg font-semibold leading-relaxed text-volt-700">
                  &ldquo;Geleceğin daha temiz, daha özgür ve daha nefes alınabilir bir dünya olduğuna
                  inanıyoruz.&rdquo;
                </p>
                <p className="mt-4 leading-relaxed text-mist-700">
                  Evlerin, şehirlerin ve hayatların enerjisini doğanın gücüyle birleştirerek
                  Türkiye&apos;nin enerji dönüşümüne katkı sağlıyor; geliştirdiğimiz teknolojilerle düşük
                  karbonlu bir gelecek inşa ediyoruz.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grup Şirketleri — Hakkımızda ile birleştirildi */}
      <section id="grup-sirketleri" className="section-pad scroll-mt-24 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {tGroup('eyebrow').replace(/^\d+\s*·\s*/, '')}
                <span className="h-px w-8 bg-volt-500" aria-hidden />
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {tGroup('title')}
              </h2>
              <p className="mt-4 text-balance leading-relaxed text-mist-700">{tGroup('body')}</p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-graphite-700/10 bg-graphite-gradient px-8 py-8 text-white sm:px-12">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-white px-8 py-5">
                  <Image
                    src="/brand/simsek-grup.png"
                    alt="Şimşek Grup"
                    width={1000}
                    height={1000}
                    className="h-20 w-auto object-contain"
                  />
                </div>
                <div className="text-center sm:text-start">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-volt-400">
                    {tGroup('parentLabel')}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-200">
                    1992&apos;den bu yana yenilenebilir enerji ve iklimlendirme teknolojilerinde faaliyet
                    gösteren; dört şirketiyle üretimden saha uygulamasına bütünleşik çözümler sunan
                    sanayi grubu.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mx-auto mt-8 grid max-w-5xl gap-6">
            {companies.map((c, i) => {
              const visual = companyVisual[c.id] ?? companyVisual.smk;
              const Icon = visual.icon;
              return (
                <Reveal key={c.id} delay={i * 0.06}>
                  <div className="grid gap-6 rounded-3xl border border-graphite-700/10 bg-mist-50 p-8 transition-colors hover:border-volt-500/40 hover:bg-white sm:grid-cols-[200px_1fr] sm:items-center sm:p-9">
                    <div className="flex h-16 items-center">
                      {visual.logo ? (
                        <Image
                          src={visual.logo}
                          alt={c.name}
                          width={400}
                          height={120}
                          className="h-11 w-auto object-contain object-left rtl:object-right"
                        />
                      ) : (
                        <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${visual.accent}`}>
                          <Icon size={26} strokeWidth={1.75} />
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-graphite-950">{c.name}</h3>
                      <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                        {c.tag}
                      </p>
                      <p className="mt-3 leading-relaxed text-mist-700">{c.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist-900 text-mist-50">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-lg text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t('values.title')}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {values.map((item, i) => {
              const Icon = valueIcons[i] ?? ShieldCheck;
              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-500/15 text-volt-400">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                Bizimle iletişime geçin
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
