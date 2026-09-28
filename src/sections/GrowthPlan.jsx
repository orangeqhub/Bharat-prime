import { Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import { uiIcon } from '../utils/icons';
import { resolveImage } from '../services/contentService';

export default function GrowthPlan() {
  const { content } = useContent();
  const { growthPlan } = content;

  return (
    <section className="section growth" id="growth">
      <div className="growth__bg" aria-hidden="true">
        <img src={resolveImage(growthPlan.image)} alt="" loading="lazy" />
      </div>
      <div className="growth__tint" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          eyebrow={growthPlan.eyebrow}
          title={growthPlan.heading}
          subheading={growthPlan.intro}
          center
        />

        <div className="growth__timeline">
          <div className="growth__rail" aria-hidden="true" />
          {(growthPlan.phases || []).map((phase, i) => {
            const Icon = uiIcon(phase.icon);
            const last = i === growthPlan.phases.length - 1;
            return (
              <Reveal key={phase.id} className={`growth__phase ${last ? 'growth__phase--last' : ''}`}>
                <div className="growth__phase-marker">
                  <span className="growth__phase-dot" />
                </div>
                <div className="growth__phase-card">
                  <div className="growth__phase-head">
                    <span className="growth__phase-days">{phase.days}</span>
                    <span className="growth__phase-icon">
                      {Icon ? <Icon aria-hidden="true" /> : null}
                    </span>
                  </div>
                  <h3 className="growth__phase-title">{phase.title}</h3>
                  <ul className="growth__points">
                    {(phase.points || []).map((point) => (
                      <li key={point}>
                        <span className="growth__check">
                          <Check aria-hidden="true" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}