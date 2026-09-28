import { useContent } from '../context/ContentContext';
import Seo from '../components/layout/Seo';
import PageHeader from './PageHeader';
import WhySection from '../sections/WhyRecycling';
import MvrSection from '../sections/MiningVsRecycling';
import ContactSection from '../sections/Contact';

export default function WhyRecyclingPage() {
  const { content } = useContent();
  const { whyRecycling, miningVsRecycling, site } = content;

  return (
    <>
      <Seo
        title={`Why Recycling is Important | ${site.companyName}`}
        description={`${whyRecycling.heading} — ${miningVsRecycling.statement}. ${miningVsRecycling.global.title}: ${miningVsRecycling.global.rows[0].value} virgin materials vs ${miningVsRecycling.global.rows[1].value} recycled.`}
      />
      <PageHeader
        crumb="Why Recycling"
        eyebrow="Environment & Sustainability"
        title={whyRecycling.heading}
        subtitle={whyRecycling.intro}
        image={miningVsRecycling.image}
      />
      <WhySection />
      <MvrSection />
      <ContactSection />
    </>
  );
}