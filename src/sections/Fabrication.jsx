import { ArrowRight, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { uiIcon } from '../utils/icons';
import { resolveImage } from '../services/contentService';

export default function Fabrication() {
  const { content } = useContent();
  const { fabrication, cta } = content;

  return (
    <section className="section fabrication" id="fabrication">
      <div className="container">
        <SectionHeader
          eyebrow={fabrication.eyebrow}
          title={fabrication.heading}
          subheading={fabrication.subheading}
          center
        />
        <Reveal className="fabrication__intro">
          <p className="muted">{fabrication.intro}</p>
        </Reveal>

        <div className="fabrication__grid">
          <div className="fabrication__products">
            {(fabrication.products || []).map((product, i) => {
              const Icon = uiIcon(product.icon);
              const src = resolveImage(product.image);
              return (
                <Reveal key={product.title} delay={(i % 2) * 100} className="fabrication__cell">
                  <article className="card fabrication__card hover-lift">
                    {src ? (
                      <div className="fabrication__card-media">
                        <img src={src} alt={product.imageAlt || ''} loading="lazy" />
                      </div>
                    ) : null}
                    <span className="fabrication__card-icon">
                      {Icon ? <Icon aria-hidden="true" /> : null}
                    </span>
                    <span className="fabrication__card-title">{product.title}</span>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="fabrication__side">
            <Reveal variant="img" className="fabrication__frame">
              <img
                className="fabrication__img"
                src={resolveImage(fabrication.image)}
                alt={fabrication.imageAlt}
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>

        <Reveal className="fabrication__workflow">
          <span className="eyebrow">Simple Workflow</span>
          <WorkflowSteps steps={fabrication.workflow} />
          <div className="fabrication__actions">
            <Button to="/contact" variant="gold">
              {cta.requestFabrication}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WorkflowSteps({ steps }) {
  return (
    <ol className="workflow">
      {(steps || []).map((step, i) => (
        <li key={step} className="workflow__step">
          <span className="workflow__num">{String(i + 1).padStart(2, '0')}</span>
          <span className="workflow__dot" aria-hidden="true" />
          <span className="workflow__name">
            <Check aria-hidden="true" />
            {step}
          </span>
          {i < steps.length - 1 ? <ArrowRight className="workflow__arrow" aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}