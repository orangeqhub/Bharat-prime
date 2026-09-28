import { useContent } from '../context/ContentContext';
import Seo from '../components/layout/Seo';
import PageHeader from './PageHeader';
import AboutSection from '../sections/About';

export default function AboutPage() {
  const { content } = useContent();
  const { about, site } = content;

  return (
    <>
      <Seo
        title={`About | ${site.companyName}`}
        description={`${about.heading} — ${about.story}`}
      />
      <PageHeader
        crumb="About"
        eyebrow={about.eyebrow}
        title={about.heading}
        subtitle={about.story}
        image={about.heroImage}
        imageAlt={about.heroImageAlt}
      />
      <AboutSection />
    </>
  );
}