import { useContent } from '../context/ContentContext';
import Seo from '../components/layout/Seo';
import PageHeader from './PageHeader';
import FabricationSection from '../sections/Fabrication';
import ContactSection from '../sections/Contact';

export default function FabricationPage() {
  const { content } = useContent();
  const { fabrication, site } = content;

  return (
    <>
      <Seo
        title={`Grills & Metal Fabrication in ${site.location} | ${site.companyName}`}
        description={`${fabrication.heading} — window & balcony grills, main & compound gates, staircase railings, sheds and small industrial works in ${site.location}.`}
      />
      <PageHeader
        crumb="Grills & Metal Fabrication"
        eyebrow={fabrication.eyebrow}
        title={fabrication.heading}
        subtitle={fabrication.subheading}
        image={fabrication.image}
      />
      <FabricationSection />
      <ContactSection />
    </>
  );
}