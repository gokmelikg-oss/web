import type { Locale } from '@/i18n/config';

/* "Çatınız uygun mu?" öz-değerlendirme aracının metinleri, dört dilde.
   Puanlar bileşende (dilden bağımsız); burada yalnızca gösterilen metin. */
export interface RoofCheckUi {
  eyebrow: string;
  title: string;
  subtitle: string;
  questions: { q: string; options: string[] }[]; // 3 soru
  verdicts: {
    great: { title: string; desc: string };
    good: { title: string; desc: string };
    maybe: { title: string; desc: string };
    survey: { title: string; desc: string };
  };
  restart: string;
  ctaSurvey: string;
  stepOf: string; // "{a}/{b}"
  scoreLabel: string; // "Uygunluk skoru"
}

const DATA: Record<Locale, RoofCheckUi> = {
  tr: {
    eyebrow: 'Çatınız Uygun mu?',
    title: 'Üç soruda güneş enerjisine uygunluk',
    subtitle: 'Çatınızın güneş enerjili sıcak su sistemine uygunluğunu hızlıca değerlendirin. Sonuç yaklaşıktır; kesin karar için ücretsiz saha keşfi yaparız.',
    questions: [
      { q: 'Çatı tipiniz nedir?', options: ['Teras (düz) çatı', 'Kiremit çatı', 'Trapez / metal çatı', 'Zemin veya cephe'] },
      { q: 'Çatının baktığı yön?', options: ['Güney', 'Güneydoğu / Güneybatı', 'Doğu / Batı', 'Kuzey'] },
      { q: 'Gün içinde gölgelenme?', options: ['Yok', 'Az / kısmi', 'Belirgin gölge'] },
    ],
    verdicts: {
      great: { title: 'Çatınız güneş enerjisine çok uygun', desc: 'Yönlenim ve gölgelenme koşullarınız ideal. Paket veya merkezi sistemle yüksek verim alırsınız; doğru kapasiteyi birlikte belirleyelim.' },
      good: { title: 'Çatınız uygun', desc: 'Koşullarınız güneş enerjili sıcak su için elverişli. Sehpa açısı ve yönlendirmeyle verim optimize edilir.' },
      maybe: { title: 'Uygun olabilir — keşif öneririz', desc: 'Yön veya gölgelenme verimi etkileyebilir; sehpa çözümleri ve konumlandırmayla çoğu durumda uygun sonuç alınır. Saha keşfiyle netleştirelim.' },
      survey: { title: 'Saha keşfi gerekli', desc: 'Kuzey yönelim veya belirgin gölge verimi düşürebilir; yine de alternatif konumlandırma ve destek ısıtmayla çözüm üretilebilir. Ücretsiz keşif önerilir.' },
    },
    restart: 'Baştan başla',
    ctaSurvey: 'Ücretsiz keşif talebi',
    stepOf: '{a}/{b}',
    scoreLabel: 'Uygunluk skoru',
  },
  en: {
    eyebrow: 'Is Your Roof Suitable?',
    title: 'Solar suitability in three questions',
    subtitle: 'Quickly assess your roof’s suitability for a solar hot water system. The result is approximate; for a definitive decision we carry out a free site survey.',
    questions: [
      { q: 'What is your roof type?', options: ['Flat (terrace) roof', 'Tiled roof', 'Trapezoidal / metal roof', 'Ground or façade'] },
      { q: 'Which way does the roof face?', options: ['South', 'Southeast / Southwest', 'East / West', 'North'] },
      { q: 'Shading during the day?', options: ['None', 'Slight / partial', 'Significant shade'] },
    ],
    verdicts: {
      great: { title: 'Your roof is very suitable for solar', desc: 'Your orientation and shading conditions are ideal. You’ll get high efficiency with a package or central system; let’s determine the right capacity together.' },
      good: { title: 'Your roof is suitable', desc: 'Your conditions are favorable for solar hot water. Efficiency is optimized with frame angle and orientation.' },
      maybe: { title: 'It may be suitable — we recommend a survey', desc: 'Orientation or shading may affect efficiency; with frame solutions and positioning, a suitable result is achieved in most cases. Let’s clarify with a site survey.' },
      survey: { title: 'A site survey is needed', desc: 'North orientation or significant shade may reduce efficiency; still, a solution can be produced with alternative positioning and backup heating. A free survey is recommended.' },
    },
    restart: 'Start over',
    ctaSurvey: 'Request a free survey',
    stepOf: '{a}/{b}',
    scoreLabel: 'Suitability score',
  },
  ar: {
    eyebrow: 'هل سطحكم مناسب؟',
    title: 'الملاءمة للطاقة الشمسية في ثلاثة أسئلة',
    subtitle: 'قيّموا بسرعة ملاءمة سطحكم لنظام ماء ساخن شمسي. النتيجة تقريبية؛ ولاتخاذ قرار نهائي نُجري مسحاً ميدانياً مجانياً.',
    questions: [
      { q: 'ما نوع سطحكم؟', options: ['سطح مستوٍ (تراس)', 'سطح قرميدي', 'سطح شبه منحرف / معدني', 'أرض أو واجهة'] },
      { q: 'ما اتجاه السطح؟', options: ['الجنوب', 'الجنوب الشرقي / الجنوب الغربي', 'الشرق / الغرب', 'الشمال'] },
      { q: 'التظليل خلال النهار؟', options: ['لا يوجد', 'خفيف / جزئي', 'ظل واضح'] },
    ],
    verdicts: {
      great: { title: 'سطحكم مناسب جداً للطاقة الشمسية', desc: 'ظروف الاتجاه والتظليل لديكم مثالية. ستحصلون على كفاءة عالية بنظام جاهز أو مركزي؛ لنحدّد السعة المناسبة معاً.' },
      good: { title: 'سطحكم مناسب', desc: 'ظروفكم مواتية للماء الساخن الشمسي. تُحسَّن الكفاءة بزاوية القاعدة والاتجاه.' },
      maybe: { title: 'قد يكون مناسباً — نوصي بمسح', desc: 'قد يؤثر الاتجاه أو التظليل في الكفاءة؛ ومع حلول القواعد والتموضع يُحصَل على نتيجة مناسبة في معظم الحالات. لنوضّح بمسح ميداني.' },
      survey: { title: 'يلزم مسح ميداني', desc: 'قد يقلّل الاتجاه الشمالي أو الظل الواضح الكفاءة؛ ومع ذلك يمكن إيجاد حل بتموضع بديل وتدفئة احتياطية. يُوصى بمسح مجاني.' },
    },
    restart: 'ابدأوا من جديد',
    ctaSurvey: 'اطلبوا مسحاً مجانياً',
    stepOf: '{a}/{b}',
    scoreLabel: 'درجة الملاءمة',
  },
  el: {
    eyebrow: 'Είναι Κατάλληλη η Στέγη σας;',
    title: 'Καταλληλότητα για ηλιακή σε τρεις ερωτήσεις',
    subtitle: 'Αξιολογήστε γρήγορα την καταλληλότητα της στέγης σας για ηλιακό σύστημα ζεστού νερού. Το αποτέλεσμα είναι κατά προσέγγιση· για οριστική απόφαση πραγματοποιούμε δωρεάν επιτόπια μελέτη.',
    questions: [
      { q: 'Ποιος είναι ο τύπος της στέγης σας;', options: ['Επίπεδη (ταράτσα)', 'Κεραμοσκεπή', 'Τραπεζοειδής / μεταλλική', 'Έδαφος ή πρόσοψη'] },
      { q: 'Προς ποια κατεύθυνση βλέπει η στέγη;', options: ['Νότος', 'Νοτιοανατολικά / Νοτιοδυτικά', 'Ανατολικά / Δυτικά', 'Βορράς'] },
      { q: 'Σκίαση κατά τη διάρκεια της ημέρας;', options: ['Καμία', 'Ελαφριά / μερική', 'Σημαντική σκίαση'] },
    ],
    verdicts: {
      great: { title: 'Η στέγη σας είναι πολύ κατάλληλη για ηλιακή', desc: 'Οι συνθήκες προσανατολισμού και σκίασης είναι ιδανικές. Θα έχετε υψηλή απόδοση με ολοκληρωμένο ή κεντρικό σύστημα· ας καθορίσουμε τη σωστή χωρητικότητα μαζί.' },
      good: { title: 'Η στέγη σας είναι κατάλληλη', desc: 'Οι συνθήκες σας είναι ευνοϊκές για ηλιακό ζεστό νερό. Η απόδοση βελτιστοποιείται με τη γωνία της βάσης και τον προσανατολισμό.' },
      maybe: { title: 'Μπορεί να είναι κατάλληλη — συνιστούμε μελέτη', desc: 'Ο προσανατολισμός ή η σκίαση μπορεί να επηρεάσουν την απόδοση· με λύσεις βάσεων και τοποθέτηση επιτυγχάνεται κατάλληλο αποτέλεσμα στις περισσότερες περιπτώσεις. Ας το διευκρινίσουμε με επιτόπια μελέτη.' },
      survey: { title: 'Απαιτείται επιτόπια μελέτη', desc: 'Ο βόρειος προσανατολισμός ή η σημαντική σκίαση μπορεί να μειώσουν την απόδοση· παρ’ όλα αυτά, μπορεί να βρεθεί λύση με εναλλακτική τοποθέτηση και εφεδρική θέρμανση. Συνιστάται δωρεάν μελέτη.' },
    },
    restart: 'Ξεκινήστε ξανά',
    ctaSurvey: 'Αίτημα δωρεάν μελέτης',
    stepOf: '{a}/{b}',
    scoreLabel: 'Βαθμός καταλληλότητας',
  },
};

export function getRoofCheckUi(locale: string): RoofCheckUi {
  return DATA[locale as Locale] ?? DATA.tr;
}
