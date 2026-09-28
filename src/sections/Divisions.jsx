import { ArrowUpRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import { uiIcon } from '../utils/icons';
import { resolveImage } from '../services/contentService';

export default function Divisions() {
  const { content } = useContent();
  const { divisions } = content;

  return (
    <section className="section divisions" id="divisions">
      <div className="container">
        <SectionHeader
          eyebrow={divisions.eyebrow}
          title={divisions.heading}
          subheading={divisions.subheading}
          center
        />

        <div className="divisions__grid">
          {(divisions.items || []).map((item, i) => {
            const Icon = uiIcon(item.icon);
            return (
              <Reveal key={item.id} delay={i * 120} className="divisions__cell">
                <article className="card divisions__card hover-lift">
                  <div className="divisions__media">
                    {item.image ? (
                      <img
                        src={resolveImage(item.image)}
                        alt={item.imageAlt || ''}
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <span className="divisions__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className="divisions__icon">
                    {Icon ? <Icon aria-hidden="true" /> : null}
                  </div>
                  <h3 className="divisions__title">{item.title}</h3>
                  <p className="divisions__desc">{item.description}</p>
                  <a className="link-wash divisions__link" href={item.route}>
                    {item.exploreLabel}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}