import { BadgeCheck, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import Counter from '../components/ui/Counter';
import SectionHeader from '../components/ui/SectionHeader';
import { resolveImage } from '../services/contentService';

export default function About() {
  const { content } = useContent();
  const { about, site } = content;

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__text">
            <SectionHeader eyebrow={about.eyebrow} title={about.heading} />

            <Reveal className="about__story">
              <p>{about.story}</p>
              <p className="about__mission-intro">{about.missionIntro}</p>
            </Reveal>

            <ul className="about__list">
              {(about.list || []).map((item, i) => (
                <Reveal as="li" key={item} delay={i * 70} variant="left">
                  <span className="about__check">
                    <Check aria-hidden="true" />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>

            <Reveal className="about__highlight">
              <span className="about__highlight-mark" aria-hidden="true" />
              <p>“{about.highlight}”</p>
            </Reveal>
          </div>

          <div className="about__visual">
            <Reveal variant="img" className="about__frame">
              <div className="about__img-wrap">
                <img
                  className="about__img"
                  src={resolveImage(about.image)}
                  alt={about.imageAlt}
                  loading="lazy"
                />
              </div>
              <div className="about__frame-corner about__frame-corner--tl" aria-hidden="true" />
              <div className="about__frame-corner about__frame-corner--br" aria-hidden="true" />
            </Reveal>

            <Reveal variant="img" delay={120} className="about__img-card">
              <img
                src={resolveImage(about.imageCard)}
                alt={about.imageCardAlt}
                loading="lazy"
              />
            </Reveal>

            <Reveal variant="zoom" delay={180} className="about__card-mini">
              <div className="about__card-mini-head">
                <BrandBadge />
                <span>{site.companyName}</span>
              </div>
              <p>{site.tagline}</p>
            </Reveal>
          </div>
        </div>

        <div className="about__stats">
          {(about.stats || []).map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="about__stat">
              <span className="about__stat-value">
                <Counter end={stat.value} suffix={stat.suffix || ''} />
              </span>
              <span className="about__stat-label">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandBadge() {
  return (
    <span className="about__brand-badge">
      <BadgeCheck aria-hidden="true" />
    </span>
  );
}