import { useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { BrandMark } from '../components/ui/Logo';
import { resolveImage } from '../services/contentService';

export default function Hero() {
  const { content } = useContent();
  const { hero, cta, site } = content;
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = !window.matchMedia('(pointer: fine)').matches;
    if (reduce || coarse) return undefined;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          el.style.setProperty('--parallax', String(-y * 0.22));
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home" aria-label="Bharat Prime Enterprises intro">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-image-wrap">
          <img
            className="hero__bg-image"
            src={resolveImage(hero.image)}
            alt=""
            aria-hidden="true"
            loading="eager"
          />
        </div>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__glow hero__glow--a" aria-hidden="true" />
        <div className="hero__glow hero__glow--b" aria-hidden="true" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal variant="left" className="hero__eyebrow">
            <span className="eyebrow">
              <MapPin aria-hidden="true" /> {hero.eyebrow || site.location}
            </span>
          </Reveal>

          <h1 className="hero__title">
            {(hero.headingLines || []).map((line, i) => (
              <span key={i} className="hero__line" style={{ '--i': i }}>
                <span className="hero__line-inner" style={{ transitionDelay: `${350 + i * 190}ms` }}>
                  {i === 1 ? <span className="hero__line-gold">{line}</span> : line}
                </span>
              </span>
            ))}
          </h1>

          <Reveal delay={220} variant="left" className="hero__sub">
            <p>{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={340} variant="zoom" className="hero__actions">
            <Button to="/contact" variant="gold" size="lg">
              {cta.sellScrap}
            </Button>
            <Button href="#divisions" variant="outline" size="lg">
              {cta.services}
            </Button>
          </Reveal>

          <Reveal delay={440} variant="left" className="hero__phones">
            <span className="hero__phones-label">Call us today</span>
            {site.phoneNumbers.map((phone) => (
              <a key={phone} href={`tel:${phone}`} className="hero__phone">
                <Phone aria-hidden="true" /> {phone}
              </a>
            ))}
          </Reveal>
        </div>

        <div className="hero__visual">
          <Reveal variant="zoom" delay={260} className="hero__card">
            <div className="hero__card-noise" aria-hidden="true" />
            <img
              className="hero__img"
              src={resolveImage(hero.image)}
              alt={hero.imageAlt}
              loading="eager"
            />
            <div className="hero__card-cap">
              <span>Scrap • Steel • Fabrication</span>
            </div>
          </Reveal>

          {hero.badgeImage ? (
            <Reveal variant="zoom" delay={460} className="hero__badge-frame">
              <img
                className="hero__badge"
                src={resolveImage(hero.badgeImage)}
                alt={hero.badgeAlt || 'Bharat Prime Enterprises brand card'}
                loading="lazy"
              />
            </Reveal>
          ) : (
            <Reveal variant="zoom" delay={460} className="hero__badge-frame hero__badge-frame--mark">
              <BrandMark size={84} id="hero-mark" />
            </Reveal>
          )}

          <Reveal variant="zoom" delay={560} className="hero__tag">
            <span className="hero__tag-line">We Buy Scrap • We Sell Steel • We Fabricate Metal</span>
            <span className="hero__tag-loc">{site.location}</span>
          </Reveal>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => {
          const next = document.getElementById('divisions');
          if (next) next.scrollIntoView({ behavior: 'smooth' });
        }}
        aria-label="Scroll to next section"
      >
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-icon">
          <ChevronDown aria-hidden="true" />
        </span>
      </button>
    </section>
  );
}