import { useRef } from 'react';
import { ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal';
import useParallax from '../hooks/useParallax';
import { resolveImage } from '../services/contentService';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = '',
  crumb,
}) {
  const bgRef = useRef(null);
  useParallax(bgRef, -0.06);

  return (
    <section className="pagehead">
      <div className="pagehead__bg" ref={bgRef} aria-hidden="true">
        <img src={resolveImage(image)} alt="" aria-hidden="true" loading="eager" />
        <div className="pagehead__tint" aria-hidden="true" />
      </div>
      <div className="container pagehead__inner">
        <Reveal className="pagehead__crumbs">
          <Link className="pagehead__crumb" to="/">
            <Home aria-hidden="true" /> Home
          </Link>
          {crumb ? (
            <>
              <span className="pagehead__crumb-sep" aria-hidden="true">
                <ArrowRight />
              </span>
              <span className="pagehead__crumb pagehead__crumb--current">{crumb}</span>
            </>
          ) : null}
        </Reveal>
        {eyebrow ? (
          <Reveal delay={90} className="pagehead__eyebrow">
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
        ) : null}
        <Reveal delay={160} as="h1" variant="clip" className="pagehead__title">
          {title}
        </Reveal>
        {subtitle ? (
          <Reveal delay={240} className="pagehead__sub">
            <p>{subtitle}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}