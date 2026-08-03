import { Hero } from '@/components/home/Hero';
import { GroupSection } from '@/components/home/GroupSection';
import { ProductionSection } from '@/components/home/ProductionSection';
import { ReferencesMapSection } from '@/components/home/ReferencesMapSection';
import { SystemWizard } from '@/components/home/SystemWizard';
import { ProductIndex } from '@/components/home/ProductIndex';
import { WhyUs } from '@/components/home/WhyUs';
import { Certs } from '@/components/home/Certs';
import { HomeContact } from '@/components/home/HomeContact';
import { SectionDots } from '@/components/home/SectionDots';
import { TrustStrip } from '@/components/home/TrustStrip';
import { Faq } from '@/components/home/Faq';
import { SocialFeed } from '@/components/home/SocialFeed';
import { FaqJsonLd } from '@/components/JsonLd';
import { faqItems } from '@/data/faq';

export default function HomePage() {
  return (
    <>
      <SectionDots />
      <Hero />
      <ProductIndex />
      <SystemWizard />
      <ReferencesMapSection />
      <TrustStrip />
      <Certs />
      <ProductionSection />
      <WhyUs />
      <GroupSection />
      <SocialFeed />
      <Faq />
      <FaqJsonLd items={faqItems} />
      <HomeContact />
    </>
  );
}
