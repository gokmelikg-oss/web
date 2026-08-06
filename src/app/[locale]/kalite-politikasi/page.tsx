import type { Metadata } from 'next';
import { ShieldCheck, Target, Recycle, Users, TrendingUp, BadgeCheck, type LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

const PRINCIPLE_ICONS: LucideIcon[] = [Target, BadgeCheck, TrendingUp, Recycle, Users, ShieldCheck];

interface CardText { title: string; desc: string }
interface QualityText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  intro: string;
  principles: CardText[];
  cta: { title: string; body: string; button: string };
  meta: { title: string; description: string };
}

const CONTENT: Record<Locale, QualityText> = {
  tr: {
    crumb: 'Kalite Politikamız',
    hero: {
      eyebrow: 'Kalite Politikamız',
      title: 'Kalite, üretimimizin her aşamasında',
      subtitle:
        '1992’den bu yana; Ar-Ge’den üretime, projelendirmeden satış sonrası hizmete kadar tüm süreçlerimizi kalite ve sürekli iyileştirme ilkeleriyle yürütüyoruz.',
    },
    intro:
      'Şimşek Solar olarak temel hedefimiz; güneş enerjisi sistemlerinde uzun ömürlü, yüksek verimli ve güvenilir ürünler sunarak müşterilerimizin güvenini kazanmaktır. Bu doğrultuda aşağıdaki ilkeleri taahhüt ederiz.',
    principles: [
      { title: 'Müşteri memnuniyeti', desc: 'Ürün ve hizmetlerimizi müşteri ihtiyaç ve beklentilerini karşılayacak, hatta aşacak şekilde tasarlar ve sunarız.' },
      { title: 'Standartlara uygunluk', desc: 'Üretimimizi CE, TSE ve Solar Keymark başta olmak üzere ulusal ve uluslararası standartlara uygun yürütürüz.' },
      { title: 'Sürekli iyileştirme', desc: 'Süreçlerimizi düzenli olarak gözden geçirir; teknoloji, verim ve kaliteyi sürekli geliştiririz.' },
      { title: 'Çevreye duyarlı üretim', desc: 'Yenilenebilir enerji üreticisi kimliğimize uygun olarak kaynakları verimli kullanır, çevresel etkiyi en aza indiririz.' },
      { title: 'Nitelikli insan kaynağı', desc: 'Çalışanlarımızın gelişimine yatırım yapar, kalite bilincini kurum kültürünün parçası hâline getiririz.' },
      { title: 'Güvenilir tedarik ve satış sonrası', desc: 'Hammadde tedarikinden satış sonrası hizmete kadar tüm zincirde güvenilirlik ve izlenebilirlik sağlarız.' },
    ],
    cta: {
      title: 'Sertifikalarımızı inceleyin',
      body: 'Ürünlerimizin sahip olduğu ulusal ve uluslararası kalite belgelerine kaynaklar bölümünden ulaşabilirsiniz.',
      button: 'Belgeler & Kaynaklar',
    },
    meta: {
      title: 'Kalite Politikamız',
      description:
        'Şimşek Solar kalite politikası: müşteri memnuniyeti, sürekli iyileştirme, standartlara uygunluk ve çevreye duyarlı üretim ilkeleri. CE, TSE ve Solar Keymark sertifikalı üretim.',
    },
  },
  en: {
    crumb: 'Our Quality Policy',
    hero: {
      eyebrow: 'Our Quality Policy',
      title: 'Quality at every stage of our production',
      subtitle:
        'Since 1992, we have run all our processes — from R&D to production, from design to after-sales service — on the principles of quality and continuous improvement.',
    },
    intro:
      'At Şimşek Solar, our core goal is to earn our customers’ trust by offering durable, high-efficiency and reliable products in solar energy systems. To this end, we commit to the following principles.',
    principles: [
      { title: 'Customer satisfaction', desc: 'We design and deliver our products and services to meet — and even exceed — customer needs and expectations.' },
      { title: 'Compliance with standards', desc: 'We run our production in compliance with national and international standards, led by CE, TSE and Solar Keymark.' },
      { title: 'Continuous improvement', desc: 'We regularly review our processes and continuously improve technology, efficiency and quality.' },
      { title: 'Environmentally responsible production', desc: 'In line with our identity as a renewable energy producer, we use resources efficiently and minimize environmental impact.' },
      { title: 'Qualified human resources', desc: 'We invest in the development of our employees and make quality awareness part of our corporate culture.' },
      { title: 'Reliable supply and after-sales', desc: 'We ensure reliability and traceability across the whole chain, from raw material supply to after-sales service.' },
    ],
    cta: {
      title: 'Review our certificates',
      body: 'You can access the national and international quality certificates our products hold from the resources section.',
      button: 'Documents & Resources',
    },
    meta: {
      title: 'Our Quality Policy',
      description:
        'Şimşek Solar quality policy: customer satisfaction, continuous improvement, compliance with standards and environmentally responsible production. CE, TSE and Solar Keymark certified production.',
    },
  },
  ar: {
    crumb: 'سياسة الجودة لدينا',
    hero: {
      eyebrow: 'سياسة الجودة لدينا',
      title: 'الجودة في كل مرحلة من مراحل إنتاجنا',
      subtitle:
        'منذ عام 1992، نُدير جميع عملياتنا — من البحث والتطوير إلى الإنتاج، ومن التصميم إلى خدمة ما بعد البيع — وفق مبادئ الجودة والتحسين المستمر.',
    },
    intro:
      'هدفنا الأساسي في شمشك سولار هو كسب ثقة عملائنا عبر تقديم منتجات طويلة العمر وعالية الكفاءة وموثوقة في أنظمة الطاقة الشمسية. ولهذه الغاية، نلتزم بالمبادئ التالية.',
    principles: [
      { title: 'رضا العملاء', desc: 'نصمّم منتجاتنا وخدماتنا ونقدّمها بما يلبّي احتياجات العملاء وتوقعاتهم، بل ويتجاوزها.' },
      { title: 'الالتزام بالمعايير', desc: 'نُدير إنتاجنا وفق المعايير الوطنية والدولية، في مقدمتها CE وTSE وSolar Keymark.' },
      { title: 'التحسين المستمر', desc: 'نراجع عملياتنا بانتظام ونطوّر باستمرار التقنية والكفاءة والجودة.' },
      { title: 'إنتاج مسؤول بيئياً', desc: 'انسجاماً مع هويتنا كمنتج للطاقة المتجددة، نستخدم الموارد بكفاءة ونقلّل الأثر البيئي إلى أدنى حد.' },
      { title: 'موارد بشرية مؤهلة', desc: 'نستثمر في تطوير موظفينا ونجعل وعي الجودة جزءاً من ثقافة الشركة.' },
      { title: 'إمداد موثوق وما بعد البيع', desc: 'نضمن الموثوقية والتتبّع في السلسلة كاملة، من توريد المواد الخام إلى خدمة ما بعد البيع.' },
    ],
    cta: {
      title: 'اطّلعوا على شهاداتنا',
      body: 'يمكنكم الوصول إلى شهادات الجودة الوطنية والدولية التي تحملها منتجاتنا من قسم الموارد.',
      button: 'المستندات والموارد',
    },
    meta: {
      title: 'سياسة الجودة لدينا',
      description:
        'سياسة الجودة في شمشك سولار: رضا العملاء، والتحسين المستمر، والالتزام بالمعايير، والإنتاج المسؤول بيئياً. إنتاج معتمد بشهادات CE وTSE وSolar Keymark.',
    },
  },
  el: {
    crumb: 'Η Πολιτική Ποιότητάς μας',
    hero: {
      eyebrow: 'Η Πολιτική Ποιότητάς μας',
      title: 'Ποιότητα σε κάθε στάδιο της παραγωγής μας',
      subtitle:
        'Από το 1992, εκτελούμε όλες τις διαδικασίες μας — από την Ε&Α έως την παραγωγή, από τον σχεδιασμό έως την υποστήριξη μετά την πώληση — με τις αρχές της ποιότητας και της συνεχούς βελτίωσης.',
    },
    intro:
      'Στη Şimşek Solar, βασικός μας στόχος είναι να κερδίσουμε την εμπιστοσύνη των πελατών μας προσφέροντας ανθεκτικά, υψηλής απόδοσης και αξιόπιστα προϊόντα στα ηλιακά ενεργειακά συστήματα. Για τον σκοπό αυτό, δεσμευόμαστε στις ακόλουθες αρχές.',
    principles: [
      { title: 'Ικανοποίηση πελατών', desc: 'Σχεδιάζουμε και παρέχουμε τα προϊόντα και τις υπηρεσίες μας ώστε να καλύπτουν — και να υπερβαίνουν — τις ανάγκες και τις προσδοκίες των πελατών.' },
      { title: 'Συμμόρφωση με τα πρότυπα', desc: 'Εκτελούμε την παραγωγή μας σύμφωνα με εθνικά και διεθνή πρότυπα, με πρώτα τα CE, TSE και Solar Keymark.' },
      { title: 'Συνεχής βελτίωση', desc: 'Επανεξετάζουμε τακτικά τις διαδικασίες μας και βελτιώνουμε συνεχώς την τεχνολογία, την απόδοση και την ποιότητα.' },
      { title: 'Περιβαλλοντικά υπεύθυνη παραγωγή', desc: 'Σύμφωνα με την ταυτότητά μας ως παραγωγού ανανεώσιμης ενέργειας, χρησιμοποιούμε τους πόρους αποδοτικά και ελαχιστοποιούμε το περιβαλλοντικό αποτύπωμα.' },
      { title: 'Εξειδικευμένο ανθρώπινο δυναμικό', desc: 'Επενδύουμε στην ανάπτυξη των εργαζομένων μας και κάνουμε τη συνείδηση ποιότητας μέρος της εταιρικής μας κουλτούρας.' },
      { title: 'Αξιόπιστος εφοδιασμός και υποστήριξη', desc: 'Διασφαλίζουμε αξιοπιστία και ιχνηλασιμότητα σε όλη την αλυσίδα, από την προμήθεια πρώτων υλών έως την υποστήριξη μετά την πώληση.' },
    ],
    cta: {
      title: 'Δείτε τα πιστοποιητικά μας',
      body: 'Μπορείτε να αποκτήσετε πρόσβαση στα εθνικά και διεθνή πιστοποιητικά ποιότητας των προϊόντων μας από την ενότητα πόρων.',
      button: 'Έγγραφα & Πόροι',
    },
    meta: {
      title: 'Η Πολιτική Ποιότητάς μας',
      description:
        'Πολιτική ποιότητας Şimşek Solar: ικανοποίηση πελατών, συνεχής βελτίωση, συμμόρφωση με πρότυπα και περιβαλλοντικά υπεύθυνη παραγωγή. Παραγωγή πιστοποιημένη κατά CE, TSE και Solar Keymark.',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;
  return pageMetadata({ locale, path: '/kalite-politikasi', title: c.meta.title, description: c.meta.description });
}

export default async function QualityPolicyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/kalite-politikasi' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="leading-relaxed text-mist-700">{c.intro}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i];
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-mist-900/10 bg-mist-50 p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                      <Icon size={24} strokeWidth={1.7} />
                    </span>
                    <h2 className="mt-5 font-display text-lg font-bold text-graphite-950">{p.title}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist-700">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-graphite-gradient p-9 text-center text-white sm:p-12">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{c.cta.title}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-graphite-200">{c.cta.body}</p>
              <Link
                href="/resources"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                {c.cta.button}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
