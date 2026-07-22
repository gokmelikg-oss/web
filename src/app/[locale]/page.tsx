import { Hero } from '@/components/home/Hero';
import { GroupSection } from '@/components/home/GroupSection';
import { ProductionSection } from '@/components/home/ProductionSection';
import { ReferencesMapSection } from '@/components/home/ReferencesMapSection';
import { SystemWizard } from '@/components/home/SystemWizard';
import { ProductsSection } from '@/components/home/ProductsSection';
import { WhyUs } from '@/components/home/WhyUs';
import { Certs } from '@/components/home/Certs';
import { HomeContact } from '@/components/home/HomeContact';
import { SectionDots } from '@/components/home/SectionDots';

export default function HomePage() {
  return (
    <>
      <SectionDots />
      <Hero />
      <ProductsSection />
      <SystemWizard />
      <ReferencesMapSection />
      <Certs />
      <ProductionSection />
      <WhyUs />
      <GroupSection />
      <HomeContact />
    </>
  );
}
