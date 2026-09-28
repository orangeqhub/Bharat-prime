import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { uiIcon } from '../utils/icons';
import { resolveImage } from '../services/contentService';

export default function SteelTrading() {
  const { content } = useContent();
  const { steel, cta } = content;

  return (
    <section className="section steel" id="steel">
      <div className="container steel__grid">
        <div className="steel__media">
          <Reveal variant="img" className="steel__frame">
            <img
              className="steel__img"
              src={resolveImage(steel.image)}
              alt={steel.imageAlt}
              loading="lazy"
            />
            <div className="steel__plate" aria-hidden="true">
              <span className="steel__plate-label">{steel.subheading}</span>
              <span className="steel__plate-line">Buy • Sell • Supply</span>
            </div>
          </Reveal>
        </div>

        <div className="steel__content">
          <SectionHeader eyebrow={steel.eyebrow} title={steel.heading} subheading={steel.subheading} />

          <Reveal className="steel__intro">
            <p className="muted">{steel.intro}</p>
          </Reveal>

          <ul className="steel__products">
            {(steel.products || []).map((product, i) => {
              const Icon = uiIcon(product.icon);
              const src = resolveImage(product.image);
              return (
                <Reveal as="li" key={product.title} delay={i * 80} variant="left">
                  <div className="steel__product">
                    {src ? (
                      <span className="steel__product-thumb">
                        <img src={src} alt={product.imageAlt || ''} loading="lazy" />
                        {Icon ? (
                          <span className="steel__product-icon">
                            <Icon aria-hidden="true" />
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      <span className="steel__product-icon">
                        {Icon ? <Icon aria-hidden="true" /> : null}
                      </span>
                    )}
                    <span className="steel__product-title">{product.title}</span>
                    <ArrowRight className="steel__product-arrow" aria-hidden="true" />
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="steel__strategy">
            <span className="steel__strategy-label">Business Strategy</span>
            <p>{steel.strategy}</p>
          </Reveal>

          <Reveal className="steel__actions">
            <Button to="/contact" variant="gold">
              {cta.enquireSteel}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}