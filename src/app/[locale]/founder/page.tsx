import type { Metadata } from 'next';
import { Quote, PenLine } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

interface FounderText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  quote: string;
  paragraphs: string[];
  closingTitle: string;
  closingLine1: string;
  closingLine2: string;
  role: string;
  meta: { title: string; description: string };
}

const CONTENT: Record<Locale, FounderText> = {
  tr: {
    crumb: 'Kurucumuzdan',
    hero: {
      eyebrow: 'Kurucumuzdan',
      title: 'Şimşek Grup Yolculuğu',
      subtitle:
        "Kurucumuz ve Yönetim Kurulu Başkanımız Sinan Şimşek'ten, 1992'de küçük bir atölyede başlayan hikâyemiz.",
    },
    quote:
      'Bizim için her şey 1992’de Mersin’deki küçük bir atölyede başladı. O atölyede sadece birkaç makine yoktu; bugün Şimşek Grup’un temellerini oluşturan cesaret, emek ve büyük bir vizyon vardı.',
    paragraphs: [
      'Her şey basit ama güçlü bir hedefle başladı: Doğru işi, en iyi şekilde yapmak.',
      "İlk günlerden itibaren odağımız kalite, güven ve sürdürülebilir üretim oldu. Kısa süre içinde yalnızca üretim yapan bir şirket olmaktan çıkıp, teknolojiyi anlayan, geliştiren ve sahada değer yaratan bir yapıya dönüştük. Solar termal sistemler ile attığımız ilk adım, markamızın Türkiye'de ve uluslararası pazarlarda nasıl bir yolculuğa çıkacağının da güçlü bir işaretiydi.",
      'Yıllar ilerledikçe sadece üretim kapasitemiz değil, etki alanımız da büyüdü. Türkiye genelinde kurduğumuz bayi ağımız, ardından gelişen ihracat faaliyetlerimiz, üretim süreçlerimizde gerçekleştirdiğimiz otomasyon yatırımları ve bugün gurur duyduğumuz modern üretim altyapımız bu yolculuğun kilometre taşları oldu. Attığımız her adım, bir öncekini daha ileri taşıyan uzun vadeli bir vizyonun parçasıydı.',
      'Büyümek beraberinde daha büyük sorumluluklar da getirir. Ülkemizin önemli projelerinde yer almak, ihtiyaç anlarında katkı sağlayabilmek ve toplumsal fayda üretmek bizim için her zaman ticari başarının ötesinde bir anlam taşıdı. Yaptığımız işin yalnızca bir sektör faaliyeti değil, aynı zamanda bir değer üretme süreci olduğuna inanıyoruz.',
      '2018 sonrasında ise daha güçlü, daha odaklı ve daha küresel bir dönüşüm sürecine girdik. Dijitalleşme yatırımlarımız, üretim teknolojilerimiz ve organizasyonel gelişimimiz ile şirketimizi uluslararası rekabete hazırladık. Bugün birçok ülkeye ulaşan ihracat ağımız, bu vizyonun doğru temeller üzerine kurulduğunu açıkça gösteriyor. Aynı zamanda grup şirketlerimizle üretimden sahaya kadar uzanan güçlü bir ekosistem oluşturduk.',
      '2026 yılı ise bizim için yeni bir dönemin başlangıcı. Grubumuzun geleceğini temsil eden yeni markamız ile enerji depolama, ısı pompası ve yenilenebilir enerji teknolojilerinde yeni bir sayfa açıyoruz. Artık hedefimiz yalnızca büyümek değil; sektörün gelişimine yön veren, standartları yükselten ve geleceğin enerji çözümlerine katkı sağlayan bir yapı olmak.',
      "Bugün geriye dönüp baktığımızda, 1992'de küçük bir atölyede başlayan yolculuğun aslında büyük bir vizyonun ilk adımı olduğunu çok daha net görüyoruz. Her yatırım, her karar ve her dönüm noktası bize aynı gerçeği hatırlatıyor:",
    ],
    closingTitle:
      'Doğru iş, emek ve vizyon bir araya geldiğinde ortaya yalnızca başarı değil, kalıcı bir değer çıkar.',
    closingLine1: 'Bu yolculuk devam ediyor.',
    closingLine2: 'Ve daha yazılacak çok hikâyemiz var.',
    role: 'Şimşek Grup Kurucu & Başkanı',
    meta: {
      title: 'Kurucumuzdan — Şimşek Grup Yolculuğu',
      description:
        "Şimşek Grup Kurucu & Başkanı Sinan Şimşek'ten: 1992'de Mersin'deki küçük bir atölyede başlayan yolculuğun hikâyesi.",
    },
  },
  en: {
    crumb: 'From Our Founder',
    hero: {
      eyebrow: 'From Our Founder',
      title: 'The Şimşek Group Journey',
      subtitle:
        'From our founder and Chairman Sinan Şimşek, our story that began in a small workshop in 1992.',
    },
    quote:
      'For us, everything began in a small workshop in Mersin in 1992. In that workshop there weren’t just a few machines; there were the courage, effort and great vision that form the foundations of the Şimşek Group today.',
    paragraphs: [
      'It all started with a simple but powerful goal: to do the right work, in the best possible way.',
      'From the very first days our focus was quality, trust and sustainable production. Before long we stopped being merely a manufacturing company and became a structure that understands and develops technology and creates value in the field. Our first step with solar thermal systems was a strong sign of the journey our brand would embark on in Türkiye and international markets.',
      'As the years went on, not only our production capacity but also our sphere of influence grew. The dealer network we built across Türkiye, the export activities that developed afterward, the automation investments in our production processes and the modern production infrastructure we are proud of today became the milestones of this journey. Every step we took was part of a long-term vision that carried the previous one further.',
      'Growth also brings greater responsibilities. Taking part in our country’s important projects, being able to contribute in times of need and producing social benefit have always meant more to us than commercial success. We believe that our work is not merely a sector activity but also a process of creating value.',
      'After 2018, we entered a stronger, more focused and more global transformation process. With our digitalization investments, production technologies and organizational development, we prepared our company for international competition. Today our export network reaching many countries clearly shows that this vision was built on the right foundations. At the same time, with our group companies we created a strong ecosystem stretching from production to the field.',
      '2026, on the other hand, is the beginning of a new era for us. With our new brand representing the future of our group, we are opening a new page in energy storage, heat pump and renewable energy technologies. Our goal is no longer just to grow; it is to become a structure that shapes the sector’s development, raises standards and contributes to the energy solutions of the future.',
      'Looking back today, we see much more clearly that the journey that began in a small workshop in 1992 was actually the first step of a great vision. Every investment, every decision and every turning point reminds us of the same truth:',
    ],
    closingTitle:
      'When the right work, effort and vision come together, the result is not just success but a lasting value.',
    closingLine1: 'This journey continues.',
    closingLine2: 'And we still have many stories left to write.',
    role: 'Şimşek Group Founder & Chairman',
    meta: {
      title: 'From Our Founder — The Şimşek Group Journey',
      description:
        'From Şimşek Group Founder & Chairman Sinan Şimşek: the story of a journey that began in a small workshop in Mersin in 1992.',
    },
  },
  ar: {
    crumb: 'من مؤسسنا',
    hero: {
      eyebrow: 'من مؤسسنا',
      title: 'رحلة مجموعة شمشك',
      subtitle: 'من مؤسسنا ورئيس مجلس الإدارة سنان شمشك، قصتنا التي بدأت في ورشة صغيرة عام 1992.',
    },
    quote:
      'بالنسبة لنا، بدأ كل شيء في ورشة صغيرة بمرسين عام 1992. لم يكن في تلك الورشة بضع آلات فحسب؛ بل كانت هناك الشجاعة والجهد والرؤية الكبيرة التي تشكّل أسس مجموعة شمشك اليوم.',
    paragraphs: [
      'بدأ كل شيء بهدف بسيط لكنه قوي: أن ننجز العمل الصحيح على أفضل وجه.',
      'منذ الأيام الأولى كان تركيزنا على الجودة والثقة والإنتاج المستدام. وسرعان ما لم نعد مجرد شركة تصنيع، بل تحوّلنا إلى كيان يفهم التقنية ويطوّرها ويخلق قيمة في الميدان. كانت خطوتنا الأولى مع الأنظمة الشمسية الحرارية إشارة قوية إلى الرحلة التي ستخوضها علامتنا في تركيا والأسواق الدولية.',
      'ومع مرور السنين، لم تنمُ قدرتنا الإنتاجية فحسب، بل نطاق تأثيرنا أيضاً. أصبحت شبكة الوكلاء التي أنشأناها في عموم تركيا، ثم أنشطة التصدير التي تطوّرت لاحقاً، واستثمارات الأتمتة في عملياتنا الإنتاجية، والبنية الإنتاجية الحديثة التي نفخر بها اليوم، معالمَ لهذه الرحلة. كانت كل خطوة خطوناها جزءاً من رؤية طويلة الأمد تحمل السابقة إلى الأمام.',
      'يجلب النمو معه مسؤوليات أكبر. لطالما كان المشاركة في مشاريع بلدنا المهمة، والقدرة على الإسهام في أوقات الحاجة، وإنتاج نفع اجتماعي، أموراً تعني لنا ما هو أبعد من النجاح التجاري. نؤمن بأن عملنا ليس مجرد نشاط قطاعي، بل أيضاً عملية خلق قيمة.',
      'بعد عام 2018 دخلنا عملية تحوّل أقوى وأكثر تركيزاً وأكثر عالمية. بفضل استثماراتنا في الرقمنة وتقنياتنا الإنتاجية وتطورنا التنظيمي، هيّأنا شركتنا للمنافسة الدولية. واليوم تُظهِر شبكة التصدير التي تصل إلى بلدان عديدة بوضوح أن هذه الرؤية بُنيت على أسس صحيحة. وفي الوقت نفسه أنشأنا مع شركات مجموعتنا منظومة قوية تمتد من الإنتاج إلى الميدان.',
      'أما عام 2026 فهو بداية حقبة جديدة بالنسبة لنا. بعلامتنا الجديدة التي تمثّل مستقبل مجموعتنا، نفتح صفحة جديدة في تقنيات تخزين الطاقة والمضخات الحرارية والطاقة المتجددة. لم يعد هدفنا النمو فحسب؛ بل أن نصبح كياناً يوجّه تطور القطاع ويرفع المعايير ويسهم في حلول الطاقة المستقبلية.',
      'حين ننظر اليوم إلى الوراء، نرى بوضوح أكبر أن الرحلة التي بدأت في ورشة صغيرة عام 1992 كانت في الواقع الخطوة الأولى لرؤية كبيرة. كل استثمار وكل قرار وكل نقطة تحوّل تذكّرنا بالحقيقة نفسها:',
    ],
    closingTitle: 'حين يجتمع العمل الصحيح والجهد والرؤية، تكون النتيجة ليست مجرد نجاح، بل قيمة دائمة.',
    closingLine1: 'هذه الرحلة مستمرة.',
    closingLine2: 'وما زال لدينا الكثير من القصص لنكتبها.',
    role: 'مؤسس ورئيس مجموعة شمشك',
    meta: {
      title: 'من مؤسسنا — رحلة مجموعة شمشك',
      description:
        'من مؤسس ورئيس مجموعة شمشك سنان شمشك: قصة رحلة بدأت في ورشة صغيرة بمرسين عام 1992.',
    },
  },
  el: {
    crumb: 'Από τον Ιδρυτή μας',
    hero: {
      eyebrow: 'Από τον Ιδρυτή μας',
      title: 'Το Ταξίδι του Ομίλου Şimşek',
      subtitle:
        'Από τον ιδρυτή και Πρόεδρό μας Sinan Şimşek, η ιστορία μας που ξεκίνησε σε ένα μικρό εργαστήριο το 1992.',
    },
    quote:
      'Για εμάς, όλα ξεκίνησαν σε ένα μικρό εργαστήριο στη Μερσίνα το 1992. Σε εκείνο το εργαστήριο δεν υπήρχαν μόνο λίγες μηχανές· υπήρχαν το θάρρος, ο μόχθος και το μεγάλο όραμα που αποτελούν σήμερα τα θεμέλια του Ομίλου Şimşek.',
    paragraphs: [
      'Όλα ξεκίνησαν με έναν απλό αλλά ισχυρό στόχο: να κάνουμε τη σωστή δουλειά, με τον καλύτερο δυνατό τρόπο.',
      'Από τις πρώτες κιόλας ημέρες, εστίασή μας ήταν η ποιότητα, η εμπιστοσύνη και η βιώσιμη παραγωγή. Σύντομα πάψαμε να είμαστε απλώς μια εταιρεία παραγωγής και γίναμε ένας οργανισμός που κατανοεί και αναπτύσσει την τεχνολογία και δημιουργεί αξία στο πεδίο. Το πρώτο μας βήμα με τα ηλιακά θερμικά συστήματα ήταν μια ισχυρή ένδειξη του ταξιδιού που θα ξεκινούσε η μάρκα μας στην Τουρκία και τις διεθνείς αγορές.',
      'Καθώς περνούσαν τα χρόνια, μεγάλωσε όχι μόνο η παραγωγική μας ικανότητα αλλά και η σφαίρα επιρροής μας. Το δίκτυο αντιπροσώπων που χτίσαμε σε όλη την Τουρκία, οι εξαγωγικές δραστηριότητες που αναπτύχθηκαν στη συνέχεια, οι επενδύσεις αυτοματισμού στις παραγωγικές μας διαδικασίες και η σύγχρονη παραγωγική υποδομή για την οποία είμαστε περήφανοι σήμερα, έγιναν τα ορόσημα αυτού του ταξιδιού. Κάθε βήμα που κάναμε ήταν μέρος ενός μακροπρόθεσμου οράματος που μετέφερε το προηγούμενο πιο μακριά.',
      'Η ανάπτυξη φέρνει μαζί της και μεγαλύτερες ευθύνες. Η συμμετοχή στα σημαντικά έργα της χώρας μας, η δυνατότητα να συνεισφέρουμε σε στιγμές ανάγκης και η παραγωγή κοινωνικού οφέλους πάντα σήμαιναν για εμάς κάτι πέρα από την εμπορική επιτυχία. Πιστεύουμε ότι η δουλειά μας δεν είναι απλώς μια δραστηριότητα του κλάδου, αλλά και μια διαδικασία δημιουργίας αξίας.',
      'Μετά το 2018, μπήκαμε σε μια ισχυρότερη, πιο εστιασμένη και πιο παγκόσμια διαδικασία μετασχηματισμού. Με τις επενδύσεις μας στην ψηφιοποίηση, τις παραγωγικές μας τεχνολογίες και την οργανωτική μας ανάπτυξη, προετοιμάσαμε την εταιρεία μας για τον διεθνή ανταγωνισμό. Σήμερα το εξαγωγικό μας δίκτυο που φτάνει σε πολλές χώρες δείχνει καθαρά ότι αυτό το όραμα χτίστηκε σε σωστά θεμέλια. Ταυτόχρονα, με τις εταιρείες του ομίλου μας δημιουργήσαμε ένα ισχυρό οικοσύστημα που εκτείνεται από την παραγωγή έως το πεδίο.',
      'Το 2026, από την άλλη, είναι η αρχή μιας νέας εποχής για εμάς. Με τη νέα μας μάρκα που εκπροσωπεί το μέλλον του ομίλου μας, ανοίγουμε μια νέα σελίδα στις τεχνολογίες αποθήκευσης ενέργειας, αντλιών θερμότητας και ανανεώσιμης ενέργειας. Στόχος μας δεν είναι πλέον απλώς να μεγαλώσουμε· είναι να γίνουμε ένας οργανισμός που δίνει κατεύθυνση στην ανάπτυξη του κλάδου, ανεβάζει τα πρότυπα και συνεισφέρει στις ενεργειακές λύσεις του μέλλοντος.',
      'Κοιτάζοντας πίσω σήμερα, βλέπουμε πολύ πιο καθαρά ότι το ταξίδι που ξεκίνησε σε ένα μικρό εργαστήριο το 1992 ήταν στην πραγματικότητα το πρώτο βήμα ενός μεγάλου οράματος. Κάθε επένδυση, κάθε απόφαση και κάθε σημείο καμπής μάς θυμίζει την ίδια αλήθεια:',
    ],
    closingTitle:
      'Όταν η σωστή δουλειά, ο μόχθος και το όραμα ενώνονται, το αποτέλεσμα δεν είναι μόνο επιτυχία, αλλά μια διαρκής αξία.',
    closingLine1: 'Αυτό το ταξίδι συνεχίζεται.',
    closingLine2: 'Και έχουμε ακόμη πολλές ιστορίες να γράψουμε.',
    role: 'Ιδρυτής & Πρόεδρος Ομίλου Şimşek',
    meta: {
      title: 'Από τον Ιδρυτή μας — Το Ταξίδι του Ομίλου Şimşek',
      description:
        'Από τον Ιδρυτή & Πρόεδρο του Ομίλου Şimşek, Sinan Şimşek: η ιστορία ενός ταξιδιού που ξεκίνησε σε ένα μικρό εργαστήριο στη Μερσίνα το 1992.',
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
  return pageMetadata({ locale, path: '/founder', title: c.meta.title, description: c.meta.description });
}

export default async function FounderPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/founder' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            {/* Açılış alıntısı */}
            <Reveal>
              <figure className="relative rounded-3xl bg-graphite-gradient p-9 text-white sm:p-12">
                <Quote size={40} className="absolute -top-5 start-8 rounded-2xl bg-volt-500 p-2 text-graphite-950" aria-hidden />
                <blockquote className="mt-2 font-display type-h3 font-semibold leading-relaxed">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
              </figure>
            </Reveal>

            {/* Mektup gövdesi */}
            <div className="mt-12 space-y-7">
              {c.paragraphs.map((p, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
                  <p className="text-pretty leading-[1.85] text-mist-800 first-letter:font-semibold">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Kapanış vurgusu */}
            <Reveal delay={0.1}>
              <div className="mt-12 border-s-2 border-volt-500 ps-6">
                <p className="font-display type-h3 font-bold leading-relaxed text-graphite-950">
                  {c.closingTitle}
                </p>
                <p className="mt-5 text-mist-700">{c.closingLine1}</p>
                <p className="mt-1 text-mist-700">{c.closingLine2}</p>
              </div>
            </Reveal>

            {/* İmza */}
            <Reveal delay={0.15}>
              <div className="mt-14 flex items-center gap-4 border-t border-mist-900/10 pt-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                  <PenLine size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-graphite-950">Sinan Şimşek</p>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-600">
                    {c.role}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
