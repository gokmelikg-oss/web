import { Sun, PanelTop, Repeat, Droplets, Flame, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import type { Locale } from '@/i18n/config';

/* "Nasıl çalışır?" — güneş termal sistemin çalışma akışı, dört adımlı görsel
   şema + güneşsiz gün notu. Sunucu bileşeni (locale alır), dört dilde. */

const STEP_ICONS = [Sun, PanelTop, Repeat, Droplets];

interface StepText { title: string; desc: string }
interface HowText {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: StepText[];
  backupTitle: string;
  backupDesc: string;
}

const CONTENT: Record<Locale, HowText> = {
  tr: {
    eyebrow: 'Nasıl Çalışır?',
    title: 'Güneşten musluğa, dört adımda',
    subtitle:
      'Termal güneş enerjisi sistemleri güneş ışınımını doğrudan ısıya çevirir; elektrik veya gaz kullanmadan sıcak su üretir.',
    steps: [
      { title: 'Güneş ışınımı', desc: 'Çatıdaki kolektörün koyu renkli selektif absorberi güneş enerjisini yüksek oranda emer.' },
      { title: 'Kolektör ısıtır', desc: 'Absorbere bağlı borularda dolaşan transfer sıvısı (kapalı devrede antifrizli) ısınır.' },
      { title: 'Serpantin aktarır', desc: 'Isınan sıvı boylerdeki serpantinden geçerek ısıyı kullanım suyuna aktarır; donmaya karşı korumalıdır.' },
      { title: 'Boyler depolar', desc: 'Yüksek yalıtımlı emayeli boyler sıcak suyu saklar; musluk ve duşta 24 saat sıcak su sağlar.' },
    ],
    backupTitle: 'Güneşsiz günlerde ne oluyor?',
    backupDesc:
      'Bulutlu günlerde veya kışın sistem mevcut kombi/kazan ile entegre çalışır. Güneşten gelen ön ısıtma sayesinde destek ısıtıcının tükettiği enerji ciddi biçimde azalır; sıcak su kesintisiz sürer.',
  },
  en: {
    eyebrow: 'How It Works',
    title: 'From the sun to the tap, in four steps',
    subtitle:
      'Solar thermal systems convert solar radiation directly into heat; they produce hot water without electricity or gas.',
    steps: [
      { title: 'Solar radiation', desc: 'The dark selective absorber of the roof collector captures solar energy at a high rate.' },
      { title: 'The collector heats', desc: 'The transfer fluid circulating in the tubes attached to the absorber (with antifreeze in a closed loop) heats up.' },
      { title: 'The coil transfers', desc: 'The heated fluid passes through the coil in the boiler, transferring heat to the domestic water; it is protected against freezing.' },
      { title: 'The boiler stores', desc: 'The highly insulated enameled boiler stores the hot water, providing hot water at the tap and shower 24 hours a day.' },
    ],
    backupTitle: 'What happens on sunless days?',
    backupDesc:
      'On cloudy days or in winter, the system works integrated with the existing combi/boiler. Thanks to the pre-heating from the sun, the energy consumed by the backup heater is significantly reduced; hot water continues uninterrupted.',
  },
  ar: {
    eyebrow: 'كيف يعمل؟',
    title: 'من الشمس إلى الصنبور، في أربع خطوات',
    subtitle:
      'تحوّل الأنظمة الشمسية الحرارية الإشعاع الشمسي إلى حرارة مباشرة؛ وتنتج ماءً ساخناً دون كهرباء أو غاز.',
    steps: [
      { title: 'الإشعاع الشمسي', desc: 'يمتص اللوح الماص الانتقائي الداكن في مجمّع السطح الطاقة الشمسية بنسبة عالية.' },
      { title: 'المجمّع يسخّن', desc: 'يسخن سائل النقل المتداول في الأنابيب المتصلة باللوح الماص (بمانع تجمّد في الدائرة المغلقة).' },
      { title: 'الملف الحلزوني ينقل', desc: 'يمر السائل الساخن عبر الملف الحلزوني في الخزان فينقل الحرارة إلى ماء الاستخدام؛ وهو محمي من التجمد.' },
      { title: 'الخزان يخزّن', desc: 'يخزّن الخزان المطلي بالمينا عالي العزل الماء الساخن، فيوفّر ماءً ساخناً في الصنبور والدش على مدار 24 ساعة.' },
    ],
    backupTitle: 'ماذا يحدث في الأيام دون شمس؟',
    backupDesc:
      'في الأيام الغائمة أو في الشتاء، يعمل النظام بالتكامل مع السخان المركزي/الغلاية الموجودة. وبفضل التسخين المسبق من الشمس، تقلّ الطاقة التي يستهلكها السخان الاحتياطي بشكل كبير؛ ويستمر الماء الساخن دون انقطاع.',
  },
  el: {
    eyebrow: 'Πώς Λειτουργεί;',
    title: 'Από τον ήλιο στη βρύση, σε τέσσερα βήματα',
    subtitle:
      'Τα ηλιακά θερμικά συστήματα μετατρέπουν την ηλιακή ακτινοβολία απευθείας σε θερμότητα· παράγουν ζεστό νερό χωρίς ηλεκτρικό ή αέριο.',
    steps: [
      { title: 'Ηλιακή ακτινοβολία', desc: 'Ο σκούρος επιλεκτικός απορροφητής του συλλέκτη στη στέγη συλλαμβάνει την ηλιακή ενέργεια σε υψηλό ποσοστό.' },
      { title: 'Ο συλλέκτης θερμαίνει', desc: 'Το υγρό μεταφοράς που κυκλοφορεί στους σωλήνες του απορροφητή (με αντιψυκτικό σε κλειστό κύκλωμα) θερμαίνεται.' },
      { title: 'Το σερπαντίνι μεταφέρει', desc: 'Το θερμό υγρό περνά από το σερπαντίνι στο μπόιλερ, μεταφέροντας θερμότητα στο νερό χρήσης· προστατεύεται από τον παγετό.' },
      { title: 'Το μπόιλερ αποθηκεύει', desc: 'Το άκρως μονωμένο εμαγιέ μπόιλερ αποθηκεύει το ζεστό νερό, παρέχοντας ζεστό νερό στη βρύση και το ντους 24 ώρες την ημέρα.' },
    ],
    backupTitle: 'Τι συμβαίνει τις ημέρες χωρίς ήλιο;',
    backupDesc:
      'Τις συννεφιασμένες ημέρες ή τον χειμώνα, το σύστημα λειτουργεί ενσωματωμένο με τον υπάρχοντα λέβητα/μπόιλερ. Χάρη στην προθέρμανση από τον ήλιο, η ενέργεια που καταναλώνει η εφεδρική θέρμανση μειώνεται σημαντικά· το ζεστό νερό συνεχίζεται αδιάλειπτα.',
  },
};

export function HowItWorks({ locale, className = 'bg-white' }: { locale: Locale; className?: string }) {
  const c = CONTENT[locale] ?? CONTENT.tr;

  return (
    <section className={`section-pad ${className}`}>
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
              {c.eyebrow}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              {c.title}
            </h2>
            <p className="mt-4 text-mist-700">{c.subtitle}</p>
          </div>
        </Reveal>

        {/* Akış — 4 adım */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {c.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-mist-900/10 bg-mist-50 p-6 transition-colors hover:border-volt-500/40 hover:bg-white">
                  {/* Bağlayıcı ok (masaüstü) */}
                  {i < c.steps.length - 1 && (
                    <span className="pointer-events-none absolute -end-3 top-1/2 z-10 hidden -translate-y-1/2 text-volt-500 lg:block" aria-hidden>
                      <ArrowRight size={18} className="rtl:rotate-180" />
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="font-tabular font-mono text-2xl font-bold text-graphite-950/10">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-graphite-950">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-700">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Güneşsiz gün notu */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-volt-500/25 bg-volt-50 p-6 sm:flex-row sm:items-center sm:gap-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-500 text-graphite-950">
              <Flame size={20} strokeWidth={1.9} />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-graphite-950">{c.backupTitle}</h3>
              <p className="mt-1 text-sm leading-relaxed text-mist-700">{c.backupDesc}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
