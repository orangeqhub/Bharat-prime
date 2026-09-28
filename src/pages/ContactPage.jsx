import { useContent } from '../context/ContentContext';
import Seo from '../components/layout/Seo';
import PageHeader from './PageHeader';
import ContactSection from '../sections/Contact';

export default function ContactPage() {
  const { content } = useContent();
  const { contact, site } = content;

  return (
    <>
      <Seo
        title={`Contact ${site.companyName} — ${site.location} | Phones & Email`}
        description={`Get in touch with ${site.companyName} — ${site.phoneNumbers[0]}, ${site.phoneNumbers[1]}, ${site.email}. Scrap trading, steel trading and metal fabrication in ${site.location}.`}
      />
      <PageHeader
        crumb="Contact"
        eyebrow={contact.eyebrow}
        title={contact.heading}
        subtitle={contact.subheading}
        image="/assets/contact-2.jpg"
      />
      <ContactSection />
    </>
  );
}