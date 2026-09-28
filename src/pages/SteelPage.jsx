import { useContent } from '../context/ContentContext';
import Seo from '../components/layout/Seo';
import PageHeader from './PageHeader';
import SteelSection from '../sections/SteelTrading';
import ContactSection from '../sections/Contact';

export default function SteelPage() {
  const { content } = useContent();
  const { steel, site } = content;

  return (
    <>
      <Seo
        title={`Iron & Steel Trading in ${site.location} | ${site.companyName}`}
        description={`${steel.heading} — MS/TMT rods, square & rectangular pipes, angles, flats, channels and MS sheets in ${site.location}.`}
      />
      <PageHeader
        crumb="Iron & Steel Trading"
        eyebrow={steel.eyebrow}
        title={steel.heading}
        subtitle={steel.subheading}
        image={steel.image}
      />
      <SteelSection />
      <ContactSection />
    </>
  );
}