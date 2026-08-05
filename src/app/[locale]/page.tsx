import { Hero } from '@/components/home/Hero';
import { GroupSection } from '@/components/home/GroupSection';
import { ProductionSection } from '@/components/home/ProductionSection';
import { SystemWizard } from '@/components/home/SystemWizard';
import { ProductIndex } from '@/components/home/ProductIndex';
import { WhyUs } from '@/components/home/WhyUs';
import { Certs } from '@/components/home/Certs';
import { HomeContact } from '@/components/home/HomeContact';
import { SectionDots } from '@/components/home/SectionDots';
import { TrustStrip } from '@/components/home/TrustStrip';
import { SocialFeed } from '@/components/home/SocialFeed';

export default function HomePage() {
  return (
    <>
      <SectionDots />
      <Hero />
      <ProductIndex />
      <SystemWizard />
      <TrustStrip />
      <Certs />
      <ProductionSection />
      <WhyUs />
      <GroupSection />
      <SocialFeed />
      <HomeContact />
    </>
  );
}
