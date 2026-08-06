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
import { getContent } from '@/lib/content';

// Admin metin düzenlemeleri için ISR.
export const revalidate = 3600;

export default async function HomePage() {
  const { texts } = await getContent();
  return (
    <>
      <SectionDots />
      <Hero texts={texts} />
      <ProductIndex />
      <SystemWizard />
      <TrustStrip />
      <Certs />
      <ProductionSection />
      <WhyUs />
      <GroupSection />
      <SocialFeed />
      <HomeContact texts={texts} />
    </>
  );
}
