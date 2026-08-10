import { Users, Droplets, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import type { Locale } from '@/i18n/config';

/* Boyler kapasite hızlı rehberi — kişi sayısına göre önerilen kapasite/model.
   ~40-50 L/kişi·gün kabulüyle. Sunucu bileşeni, dört dilde. */

interface Row { people: string; liters: string; model: string }
interface GuideText {
  eyebrow: string;
  title: string;
  subtitle: string;
  colPeople: string;
  colLiters: string;
  colModel: string;
  rows: Row[];
  note: string;
}

/* Model/litre dilden bağımsız; kişi aralığı ve etiketler çevrilir. */
const MODELS = ['Helios 150 · 200L', 'Helios 200 · 300L', 'Aquarious 300L', 'Aquarious 500L / Merkezi'];
const LITERS = ['150–200 L', '200–300 L', '300 L', '500 L+'];

const CONTENT: Record<Locale, GuideText> = {
  tr: {
    eyebrow: 'Kapasite Rehberi',
    title: 'Kaç kişiye hangi boyler?',
    subtitle: 'Hane büyüklüğüne göre önerilen emayeli boyler kapasitesi. Kesin kapasite için hesaplama aracını kullanın veya keşif isteyin.',
    colPeople: 'Kişi',
    colLiters: 'Önerilen kapasite',
    colModel: 'Uygun seri',
    rows: [
      { people: '2–3 kişi', liters: LITERS[0], model: MODELS[0] },
      { people: '4–5 kişi', liters: LITERS[1], model: MODELS[1] },
      { people: '6–8 kişi', liters: LITERS[2], model: MODELS[2] },
      { people: '8+ kişi / tesis', liters: LITERS[3], model: MODELS[3] },
    ],
    note: 'Yaklaşık ~40–50 L/kişi·gün kabulüne dayanır; kullanım yoğunluğu ve iklime göre değişir.',
  },
  en: {
    eyebrow: 'Capacity Guide',
    title: 'Which boiler for how many people?',
    subtitle: 'Recommended enameled boiler capacity by household size. For an exact capacity, use the calculator or request a survey.',
    colPeople: 'People',
    colLiters: 'Recommended capacity',
    colModel: 'Suitable series',
    rows: [
      { people: '2–3 people', liters: LITERS[0], model: MODELS[0] },
      { people: '4–5 people', liters: LITERS[1], model: MODELS[1] },
      { people: '6–8 people', liters: LITERS[2], model: MODELS[2] },
      { people: '8+ people / facility', liters: LITERS[3], model: MODELS[3] },
    ],
    note: 'Based on an assumption of ~40–50 L/person·day; varies with usage intensity and climate.',
  },
  ar: {
    eyebrow: 'دليل السعة',
    title: 'أي خزان لكم من الأشخاص؟',
    subtitle: 'سعة الخزان المطلي بالمينا الموصى بها حسب حجم الأسرة. للسعة الدقيقة استخدموا أداة الحساب أو اطلبوا مسحاً.',
    colPeople: 'الأشخاص',
    colLiters: 'السعة الموصى بها',
    colModel: 'السلسلة المناسبة',
    rows: [
      { people: '2–3 أشخاص', liters: LITERS[0], model: MODELS[0] },
      { people: '4–5 أشخاص', liters: LITERS[1], model: MODELS[1] },
      { people: '6–8 أشخاص', liters: LITERS[2], model: MODELS[2] },
      { people: '8+ أشخاص / منشأة', liters: LITERS[3], model: MODELS[3] },
    ],
    note: 'يستند إلى افتراض ~40–50 ل/فرد·يوم؛ ويختلف حسب كثافة الاستخدام والمناخ.',
  },
  el: {
    eyebrow: 'Οδηγός Χωρητικότητας',
    title: 'Ποιο μπόιλερ για πόσα άτομα;',
    subtitle: 'Συνιστώμενη χωρητικότητα εμαγιέ μπόιλερ ανά μέγεθος νοικοκυριού. Για ακριβή χωρητικότητα, χρησιμοποιήστε τον υπολογιστή ή ζητήστε μελέτη.',
    colPeople: 'Άτομα',
    colLiters: 'Συνιστώμενη χωρητικότητα',
    colModel: 'Κατάλληλη σειρά',
    rows: [
      { people: '2–3 άτομα', liters: LITERS[0], model: MODELS[0] },
      { people: '4–5 άτομα', liters: LITERS[1], model: MODELS[1] },
      { people: '6–8 άτομα', liters: LITERS[2], model: MODELS[2] },
      { people: '8+ άτομα / εγκατάσταση', liters: LITERS[3], model: MODELS[3] },
    ],
    note: 'Βασίζεται σε υπόθεση ~40–50 L/άτομο·ημέρα· διαφέρει ανάλογα με την ένταση χρήσης και το κλίμα.',
  },
};

export function CapacityGuide({ locale, className = 'bg-white' }: { locale: Locale; className?: string }) {
  const c = CONTENT[locale] ?? CONTENT.tr;

  return (
    <section className={`section-pad ${className}`}>
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
              {c.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">{c.title}</h2>
            <p className="mt-4 text-mist-700">{c.subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-mist-900/10 bg-white">
            {/* Başlık satırı */}
            <div className="hidden grid-cols-[1fr_1fr_1.4fr] gap-4 border-b border-mist-900/10 bg-mist-50 px-6 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-600 sm:grid">
              <span>{c.colPeople}</span>
              <span>{c.colLiters}</span>
              <span>{c.colModel}</span>
            </div>
            <ul className="divide-y divide-mist-900/8">
              {c.rows.map((r) => (
                <li key={r.people} className="grid grid-cols-1 gap-2 px-6 py-4 sm:grid-cols-[1fr_1fr_1.4fr] sm:items-center sm:gap-4">
                  <span className="flex items-center gap-2 font-display text-base font-bold text-graphite-950">
                    <Users size={16} className="text-volt-600" />
                    {r.people}
                  </span>
                  <span className="flex items-center gap-2 font-tabular font-semibold text-graphite-900">
                    <Droplets size={15} className="text-volt-600 sm:hidden" />
                    {r.liters}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-mist-700">
                    <ArrowRight size={14} className="text-mist-400 rtl:rotate-180" />
                    {r.model}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-mist-500">{c.note}</p>
      </div>
    </section>
  );
}
