import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { Sun, BatteryCharging, Wind, Layers, Mail, Globe, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/config";

/* Grup şirketleri bölümü.
   Önceden /grup-sirketleri kendi sayfasıydı; kullanıcı kararıyla (13.08.2026)
   Tarihçe sayfasıyla birleştirildi ve tek başlık altında gösteriliyor. */

interface GroupUi {
  crumb: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  band: string;
  meta: { title: string; description: string };
}

const GROUP_UI: Record<Locale, GroupUi> = {
  tr: {
    crumb: 'Grup Şirketleri',
    eyebrow: 'Grup Şirketleri',
    title: 'Tek vizyon, dört kuvvet',
    subtitle:
      'Şimşek Grup çatısı altında; üretimden saha uygulamasına, satıştan uzun dönemli bakıma kadar birbirini tamamlayan dört şirket.',
    band: "1992'den bu yana yenilenebilir enerji ve iklimlendirme teknolojilerinde faaliyet gösteren; dört şirketiyle üretimden saha uygulamasına bütünleşik çözümler sunan sanayi grubu.",
    meta: {
      title: 'Grup Şirketleri — Şimşek Grup',
      description:
        'Şimşek Grup çatısı altındaki şirketler: Şimşek Solar, Lipus, Şimşek Yenilenebilir Enerji Sistemleri ve SMK Alüminyum. Şirket açıklamaları ve iletişim bilgileri.',
    },
  },
  en: {
    crumb: 'Group Companies',
    eyebrow: 'Group Companies',
    title: 'One vision, four forces',
    subtitle:
      'Under the Şimşek Group, four companies that complete one another — from production to field application, from sales to long-term maintenance.',
    band: 'An industrial group active in renewable energy and HVAC technologies since 1992, offering integrated solutions from production to field application with its four companies.',
    meta: {
      title: 'Group Companies — Şimşek Group',
      description:
        'The companies under the Şimşek Group: Şimşek Solar, Lipus, Şimşek Renewable Energy Systems and SMK Aluminum. Company descriptions and contact details.',
    },
  },
  ar: {
    crumb: 'شركات المجموعة',
    eyebrow: 'شركات المجموعة',
    title: 'رؤية واحدة، أربع قوى',
    subtitle:
      'تحت مظلة مجموعة شمشك؛ أربع شركات يكمّل بعضها بعضاً — من الإنتاج إلى التطبيق الميداني، ومن البيع إلى الصيانة طويلة الأمد.',
    band: 'مجموعة صناعية تعمل في تقنيات الطاقة المتجددة والتكييف منذ عام 1992، تقدّم حلولاً متكاملة من الإنتاج إلى التطبيق الميداني بشركاتها الأربع.',
    meta: {
      title: 'شركات المجموعة — مجموعة شمشك',
      description:
        'الشركات تحت مظلة مجموعة شمشك: شمشك سولار وLipus وشمشك لأنظمة الطاقة المتجددة وSMK للألمنيوم. أوصاف الشركات وبيانات الاتصال.',
    },
  },
  el: {
    crumb: 'Εταιρείες Ομίλου',
    eyebrow: 'Εταιρείες Ομίλου',
    title: 'Ένα όραμα, τέσσερις δυνάμεις',
    subtitle:
      'Υπό τον Όμιλο Şimşek· τέσσερις εταιρείες που συμπληρώνουν η μία την άλλη — από την παραγωγή έως την εφαρμογή στο πεδίο, από τις πωλήσεις έως τη μακροχρόνια συντήρηση.',
    band: 'Ένας βιομηχανικός όμιλος που δραστηριοποιείται στις τεχνολογίες ανανεώσιμης ενέργειας και κλιματισμού από το 1992, προσφέροντας ολοκληρωμένες λύσεις από την παραγωγή έως την εφαρμογή στο πεδίο με τις τέσσερις εταιρείες του.',
    meta: {
      title: 'Εταιρείες Ομίλου — Όμιλος Şimşek',
      description:
        'Οι εταιρείες υπό τον Όμιλο Şimşek: Şimşek Solar, Lipus, Şimşek Renewable Energy Systems και SMK Aluminum. Περιγραφές εταιρειών και στοιχεία επικοινωνίας.',
    },
  },
};

interface Company {
  id: string;
  name: string;
  tag: string;
  desc: string;
}

const visual: Record<string, { logo?: string; icon: typeof Sun; accent: string }> = {
  solar: { logo: '/brand/simsek-solar.png', icon: Sun, accent: 'bg-volt-100 text-volt-700' },
  lipus: { logo: '/brand/lipus.png', icon: BatteryCharging, accent: 'bg-emerald-50 text-emerald-600' },
  yenilenebilir: { icon: Wind, accent: 'bg-sky-50 text-sky-600' },
  smk: { icon: Layers, accent: 'bg-mist-100 text-mist-600' },
};

/* Gerçek iletişim bilgileri (grup siteleri). */
const contact: Record<string, { email: string; web: string; webHref: string; phone?: string; city: string }> = {
  solar: { email: 'info@simseksolar.com.tr', web: 'simseksolar.com.tr', webHref: 'https://www.simseksolar.com.tr', phone: '+90 324 324 12 35', city: 'Mersin' },
  lipus: { email: 'info@lipus.com.tr', web: 'lipus.com.tr', webHref: 'https://www.lipus.com.tr', phone: '+90 324 324 12 35', city: 'Mersin' },
  yenilenebilir: { email: 'info@simsekyes.com.tr', web: 'simsekyes.com.tr', webHref: 'https://www.simsekyes.com.tr', city: 'Ankara / Mersin' },
  smk: { email: 'info@smkaluminyum.com', web: 'smkaluminyum.com', webHref: 'https://smkaluminyum.com', phone: '+90 324 324 12 35', city: 'Mersin' },
};

export async function GroupCompanies() {
  const tGroup = await getTranslations("group");
  const locale = (await getLocale()) as Locale;
  const ui = GROUP_UI[locale] ?? GROUP_UI.tr;
  const companies = tGroup.raw("companies") as Company[];

  return (
    <>
      {/* Bölüm başlığı — sayfa başlığı yerine bölüm başlığı olarak. */}
      <section className="section-pad bg-mist-50 pb-0">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                {ui.eyebrow}
              </p>
              <h2 className="mt-3 font-display type-h2 font-bold tracking-tight text-graphite-950">
                {ui.title}
              </h2>
              <p className="mt-4 text-balance leading-relaxed text-mist-700">{ui.subtitle}</p>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Ana şirket bandı */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-graphite-700/10 bg-graphite-gradient px-8 py-8 text-white sm:px-12">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-white px-8 py-5">
                  <Image src="/brand/simsek-grup.png" alt="Şimşek Grup" width={1000} height={1000} className="h-20 w-auto object-contain" />
                </div>
                <div className="text-center sm:text-start">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-volt-400">
                    {tGroup('parentLabel')}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-200">{ui.band}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Şirket kartları */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-6">
            {companies.map((c, i) => {
              const v = visual[c.id] ?? visual.smk;
              const Icon = v.icon;
              const ci = contact[c.id];
              return (
                <Reveal key={c.id} delay={i * 0.06}>
                  <div className="grid grid-cols-1 gap-6 rounded-3xl border border-graphite-700/10 bg-mist-50 p-8 transition-colors hover:border-volt-500/40 hover:bg-white sm:grid-cols-[200px_minmax(0,1fr)] sm:p-9">
                    <div className="flex h-16 items-center">
                      {v.logo ? (
                        <Image src={v.logo} alt={c.name} width={400} height={120} className="h-11 w-auto object-contain object-left rtl:object-right" />
                      ) : (
                        <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${v.accent}`}>
                          <Icon size={26} strokeWidth={1.75} />
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-graphite-950">{c.name}</h2>
                      <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                        {c.tag}
                      </p>
                      <p className="mt-3 leading-relaxed text-mist-700">{c.desc}</p>

                      {ci && (
                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-mist-900/10 pt-4 text-sm">
                          <a href={`mailto:${ci.email}`} className="inline-flex items-center gap-1.5 text-graphite-800 transition-colors hover:text-volt-700">
                            <Mail size={14} className="text-volt-600" />
                            {ci.email}
                          </a>
                          <a href={ci.webHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-graphite-800 transition-colors hover:text-volt-700">
                            <Globe size={14} className="text-volt-600" />
                            {ci.web}
                          </a>
                          {ci.phone && (
                            <a href={`tel:${ci.phone.replace(/\s/g, '')}`} dir="ltr" className="inline-flex items-center gap-1.5 text-graphite-800 transition-colors hover:text-volt-700">
                              <Phone size={14} className="text-volt-600" />
                              {ci.phone}
                            </a>
                          )}
                          <span className="inline-flex items-center gap-1.5 text-mist-600">
                            <MapPin size={14} className="text-volt-600" />
                            {ci.city}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
