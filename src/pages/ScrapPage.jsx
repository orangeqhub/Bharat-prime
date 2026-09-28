import { useContent } from '../context/ContentContext';
import Seo from '../components/layout/Seo';
import PageHeader from './PageHeader';
import ScrapSection from '../sections/Scrap';
import BuyScrapCompanies from '../sections/BuyScrapCompanies';
import ContactSection from '../sections/Contact';

export default function ScrapPage() {
  const { content } = useContent();
  const { scrap, site } = content;

  return (
    <>
      <Seo
        title={`Scrap Trading in ${site.location} | ${site.companyName}`}
        description={`${scrap.heading} — ${scrap.subheading}. We buy ferrous, non-ferrous and other recyclable scrap materials in ${site.location}.`}
      />
      <PageHeader
        crumb="Scrap Trading"
        eyebrow={scrap.eyebrow}
        title={scrap.heading}
        subtitle={scrap.subheading}
        image={scrap.divisions[0]?.image}
      />
      <ScrapSection />
      <BuyScrapCompanies />
      <ContactSection />
    </>
  );
}