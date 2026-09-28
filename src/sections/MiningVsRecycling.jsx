import { Check, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import { resolveImage } from '../services/contentService';

export default function MiningVsRecycling() {
  const { content } = useContent();
  const { miningVsRecycling } = content;

  return (
    <section className="section mvr" id="mining-vs-recycling">
      <div className="container">
        <SectionHeader
          eyebrow={miningVsRecycling.eyebrow}
          title={miningVsRecycling.heading}
          center
        />

        <Reveal className="mvr__statement">
          <p>“{miningVsRecycling.statement}”</p>
        </Reveal>

        <div className="mvr__grid">
          <Reveal className="mvr__col mvr__col--mining">
            <div className="mvr__col-head">
              <span className="mvr__col-icon">
                <X aria-hidden="true" />
              </span>
              <h3>{miningVsRecycling.mining.title}</h3>
            </div>
            <ul className="mvr__points">
              {(miningVsRecycling.mining.points || []).map((point) => (
                <li key={point}>
                  <span className="mvr__point-dot mvr__point-dot--x" aria-hidden="true">
                    <X />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mvr__middle">
            <Reveal variant="img" className="mvr__frame">
              <img
                className="mvr__img"
                src={resolveImage(miningVsRecycling.image)}
                alt={miningVsRecycling.imageAlt}
                loading="lazy"
              />
              <span className="mvr__vs">VS</span>
            </Reveal>
          </div>

          <Reveal delay={120} className="mvr__col mvr__col--recycling">
            <div className="mvr__col-head">
              <span className="mvr__col-icon">
                <Check aria-hidden="true" />
              </span>
              <h3>{miningVsRecycling.recycling.title}</h3>
            </div>
            <ul className="mvr__points">
              {(miningVsRecycling.recycling.points || []).map((point) => (
                <li key={point}>
                  <span className="mvr__point-dot mvr__point-dot--check" aria-hidden="true">
                    <Check />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mvr__stats">
          <Reveal className="mvr__stat-card mvr__stat-card--global">
            <span className="mvr__stat-kicker">{miningVsRecycling.global.title}</span>
            {(miningVsRecycling.global.rows || []).map((row) => (
              <div key={row.label} className="mvr__stat-row">
                <span className="mvr__stat-label">{row.label}</span>
                <strong className="mvr__stat-value">{row.value}</strong>
              </div>
            ))}
            {miningVsRecycling.global.caption ? (
              <p className="mvr__stat-caption">{miningVsRecycling.global.caption}</p>
            ) : null}
          </Reveal>

          <Reveal delay={120} className="mvr__stat-card mvr__stat-card--india">
            <span className="mvr__stat-kicker">{miningVsRecycling.india.title}</span>
            {(miningVsRecycling.india.rows || []).map((row) => (
              <div key={row.label} className="mvr__stat-row mvr__stat-row--stack">
                <span className="mvr__stat-label">{row.label}:</span>
                <strong className="mvr__stat-value">{row.value}</strong>
                {row.note ? <span className="mvr__stat-note">{row.note}</span> : null}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}