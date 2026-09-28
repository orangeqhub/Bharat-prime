import { useRef } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import useParallax from '../hooks/useParallax';
import { uiIcon } from '../utils/icons';
import { useContent } from '../context/ContentContext';
import { Recycle } from 'lucide-react';
import { resolveImage } from '../services/contentService';

export default function WhyRecycling() {
  const bgRef = useRef(null);
  useParallax(bgRef, -0.07);
  const { content } = useContent();
  const { whyRecycling } = content;

  return (
    <section className="section why" id="why-recycling">
      <div className="why__bg" ref={bgRef} aria-hidden="true">
        <div className="why__orb why__orb--a" aria-hidden="true" />
        <div className="why__orb why__orb--b" aria-hidden="true" />
      </div>

      <div className="container why__inner">
        <SectionHeader
          eyebrow={whyRecycling.eyebrow}
          title={whyRecycling.heading}
          subheading={whyRecycling.intro}
          center
        />

        <div className="why__grid">
          {(whyRecycling.pollution || []).map((item, i) => {
            const Icon = uiIcon(item.icon);
            const src = resolveImage(item.image);
            return (
              <Reveal key={item.title} delay={(i % 3) * 100} className="why__cell">
                <div className="why__card hover-lift">
                  {src ? (
                    <span className="why__card-thumb">
                      <img src={src} alt={item.imageAlt || ''} loading="lazy" />
                    </span>
                  ) : (
                    <span className="why__card-icon">
                      {Icon ? <Icon aria-hidden="true" /> : null}
                    </span>
                  )}
                  <h3 className="why__card-title">{item.title}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>

        {(whyRecycling.pollutionImages || []).length > 0 ? (
          <Reveal className="why__gallery">
            {(whyRecycling.pollutionImages || []).map((item, i) => (
              <div className="why__gallery-item" key={item.image || i}>
                <img
                  src={resolveImage(item.image)}
                  alt={item.imageAlt || ''}
                  loading="lazy"
                />
              </div>
            ))}
          </Reveal>
        ) : null}

        <Reveal variant="zoom" className="why__callout">
          <Reveal variant="img" className="why__callout-media">
            <img
              src={resolveImage(whyRecycling.image)}
              alt={whyRecycling.imageAlt || ''}
              loading="lazy"
            />
          </Reveal>
          <div className="why__callout-body">
            <div className="why__statement-ring" aria-hidden="true">
              <Recycle />
            </div>
            <p>{whyRecycling.statement}</p>
            <span className="accent-line" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}