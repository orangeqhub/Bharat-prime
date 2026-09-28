import { Building2, Phone } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { ProcessLine } from './Scrap';
import { resolveImage } from '../services/contentService';

export default function BuyScrapCompanies() {
  const { content } = useContent();
  const { companies, cta, site } = content;

  return (
    <section className="section csc" id="companies">
      <div className="csc__bg" aria-hidden="true">
        <img src={resolveImage(companies.image)} alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="csc__tint" aria-hidden="true" />

      <div className="container csc__inner">
        <div className="csc__head">
          <SectionHeader
            eyebrow={companies.eyebrow}
            title={companies.heading}
            subheading={companies.subheading}
          />
          <Reveal className="csc__intro">
            <p>{companies.intro}</p>
          </Reveal>
        </div>

        <div className="csc__grid">
          <Reveal className="csc__sources">
            <h4 className="csc__subtitle">
              <Building2 aria-hidden="true" />
              We purchase scrap from
            </h4>
            <ul className="csc__sources-list">
              {(companies.sources || []).map((source, i) => (
                <li key={source}>
                  <span className="csc__source-num">{String(i + 1).padStart(2, '0')}</span>
                  {source}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="csc__middle">
            <div className="csc__materials">
              <span className="csc__subtitle">Materials we buy</span>
              <p className="csc__materials-text">{companies.materials}</p>
            </div>
            <ProcessLine steps={companies.process} label="Our process" />
          </Reveal>

          <Reveal delay={180} className="csc__cta">
            <div className="csc__cta-panel">
              <span className="csc__cta-mark" aria-hidden="true" />
              <p className="csc__cta-title">{companies.mainStatement}</p>
              <div className="csc__cta-actions">
                <Button to="/contact" variant="gold" block>
                  {cta.sellScrap}
                </Button>
                <Button href={`tel:${site.phoneNumbers[0]}`} variant="ghost-gold" block icon={Phone}>
                  {cta.callUs}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}