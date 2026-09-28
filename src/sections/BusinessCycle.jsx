import { ArrowDown, Recycle, Disc3, Wrench, RefreshCw } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import { resolveImage } from '../services/contentService';

const STEP_ICONS = {
  scrap: Recycle,
  steel: Disc3,
  fabrication: Wrench,
  again: RefreshCw,
};

export default function BusinessCycle() {
  const { content } = useContent();
  const { businessCycle } = content;
  const steps = businessCycle.steps || [];

  return (
    <section className="section cycle" id="business-cycle">
      <div className="cycle__bg" aria-hidden="true">
        <img src={resolveImage(businessCycle.image)} alt="" loading="lazy" />
      </div>
      <div className="container">
        <SectionHeader
          eyebrow={businessCycle.eyebrow}
          title={businessCycle.heading}
          subheading={businessCycle.intro}
          center
        />

        <Reveal variant="zoom" className="cycle__wrap">
          <div className="cycle__ring" aria-hidden="true" />
          <div className="cycle__ring2" aria-hidden="true" />
          <div className="cycle__rotor" aria-hidden="true">
            <span className="cycle__rotor-head">
              <Recycle />
            </span>
            <span className="cycle__rotor-label">Endless Value</span>
          </div>

          {steps.map((step, i) => {
            const Icon = STEP_ICONS[step.id] || RefreshCw;
            const last = i === steps.length - 1;
            return (
              <Reveal
                key={step.id}
                variant="zoom"
                delay={i * 140}
                className={`cycle__node cycle__node--${i + 1}`}
              >
                <div className="cycle__node-card">
                  <span className="cycle__node-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="cycle__node-label">{step.label}</span>
                </div>
                {!last && (
                  <span className="cycle__node-arrow" aria-hidden="true">
                    <ArrowDown />
                  </span>
                )}
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}