import { ArrowRight, Check, Focus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import { uiIcon } from '../utils/icons';
import { resolveImage } from '../services/contentService';

const SECONDARY_IMAGES = {
  ferrous: {
    image: '/assets/ferrous-2.jpg',
    imageAlt: 'Sorted ferrous scrap materials ready for trading and recycling',
  },
  'non-ferrous': {
    image: '/assets/non-ferrous-2.jpg',
    imageAlt: 'Separated non-ferrous metals ready for recycling',
  },
  others: {
    image: '/assets/about-1.jpg',
    imageAlt: 'Sorted recyclable materials collected at the Bharat Prime Enterprises yard',
  },
};

export default function Scrap() {
  const { content } = useContent();
  const { scrap, cta } = content;

  return (
    <section className="section scrap" id="scrap">
      <div className="container">
        <SectionHeader
          eyebrow={scrap.eyebrow}
          title={scrap.heading}
          subheading={scrap.subheading}
          center
        />
        <Reveal className="scrap__intro">
          <p className="muted">{scrap.intro}</p>
        </Reveal>

        <div className="scrap__list">
          {(scrap.divisions || []).map((division, i) => (
            <ScrapCard key={division.id} division={division} index={i} cta={cta} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrapCard({ division, index, cta }) {
  const Icon = uiIcon(division.icon);
  const alt = division.id === 'others';
  const secondaryImage = division.secondaryImage ?? SECONDARY_IMAGES[division.id]?.image;
  const secondaryImageSrc = resolveImage(secondaryImage);
  const secondaryImageAlt =
    division.secondaryImageAlt ?? SECONDARY_IMAGES[division.id]?.imageAlt;

  return (
    <Reveal className={`scrap__card ${alt ? 'scrap__card--alt' : ''}`}>
      <article className={`scrap__panel ${index % 2 === 1 ? 'scrap__panel--reverse' : ''}`}>
        <div className={`scrap__media ${secondaryImageSrc ? 'scrap__media--gallery' : ''}`}>
          <div className="scrap__media-grid">
            <img
              className="scrap__img"
              src={resolveImage(division.image)}
              alt={division.imageAlt}
              loading="lazy"
            />
            {secondaryImageSrc ? (
              <img
                className="scrap__img"
                src={secondaryImageSrc}
                alt={secondaryImageAlt || ''}
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="scrap__media-shade" aria-hidden="true" />
          <div className="scrap__media-icon">
            {Icon ? <Icon aria-hidden="true" /> : null}
          </div>
        </div>

        <div className="scrap__body">
          <span className="eyebrow">{division.title}</span>
          <p className="scrap__desc">{division.description}</p>

          <div className="scrap__materials">
            <span className="scrap__materials-label">Materials we handle</span>
            <ul className="scrap__chips">
              {(division.materials || []).map((m) => (
                <li key={m} className="chip">
                  <Check aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {division.process && (
            <ProcessLine steps={division.process} label="Our process" />
          )}

          {division.focus && (
            <div className="scrap__focus">
              <Focus aria-hidden="true" />
              <span>
                Our Focus: <em>“{division.focus}”</em>
              </span>
            </div>
          )}

          {division.highlights && (
            <ul className="scrap__highlights">
              {(division.highlights || []).map((h) => (
                <li key={h}>
                  <Sparkles aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <Link className="link-wash" to="/contact">
            {cta.sellScrap}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function ProcessLine({ steps, label }) {
  return (
    <div className="process-line">
      {label ? <span className="process-line__label">{label}</span> : null}
      <ol className="process-line__steps">
        {(steps || []).map((step, i) => (
          <li key={step} className="process-line__step">
            <span className="process-line__dot" aria-hidden="true" />
            <span className="process-line__name">{step}</span>
            {i < steps.length - 1 ? <ArrowRight className="process-line__arrow" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}