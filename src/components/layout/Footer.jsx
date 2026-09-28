import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import Logo from '../ui/Logo';
import Reveal from '../ui/Reveal';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
};

export default function Footer() {
  const { content } = useContent();
  const { site } = content;
  const navigate = useNavigate();

  const goToSection = (id) => {
    if (id === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(`/#${id}`);
  };

  const links = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about', route: '/about' },
    { label: 'Scrap Trading', target: 'scrap' },
    { label: 'Steel Trading', target: 'steel' },
    { label: 'Fabrication', target: 'fabrication' },
    { label: 'Why Recycling', target: 'why-recycling' },
    { label: 'Contact', target: 'contact', route: '/contact' },
  ];

  const categories = [
    { label: 'Scrap Trading', target: '/scrap' },
    { label: 'Steel Trading', target: '/steel-trading' },
    { label: 'Metal Fabrication', target: '/fabrication' },
  ];

  const socials = Object.entries(site.social || {}).filter(([, v]) => v);

  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="footer__reveal">
          <div className="footer__grid">
          <div className="footer__brand">
            <Logo logo={site.logo} tone="light" size={56} />
            <p className="footer__tag">{site.tagline}</p>
            <div className="footer__socials">
              {socials.map(([key, value]) => {
                const Icon = SOCIAL_ICONS[key] || null;
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="footer__social"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Explore</h4>
            <ul className="footer__links">
              {links.map((l) =>
                l.route ? (
                  <li key={l.target}>
                    <Link to={l.route} className="footer__link">
                      <ArrowUpRight aria-hidden="true" />
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li key={l.target}>
                    <button type="button" onClick={() => goToSection(l.target)} className="footer__link">
                      <ArrowUpRight aria-hidden="true" />
                      {l.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Business Categories</h4>
            <ul className="footer__links">
              {categories.map((c) => (
                <li key={c.target}>
                  <Link to={c.target} className="footer__link">
                    <ArrowUpRight aria-hidden="true" />
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__contact">
              <li>
                <a href={`tel:${site.phoneNumbers[0]}`} className="footer__contact-link">
                  <Phone aria-hidden="true" /> {site.phoneNumbers[0]}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneNumbers[1]}`} className="footer__contact-link">
                  <Phone aria-hidden="true" /> {site.phoneNumbers[1]}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="footer__contact-link">
                  <Mail aria-hidden="true" /> {site.email}
                </a>
              </li>
              <li className="footer__contact-link footer__contact-loc">
                <MapPin aria-hidden="true" /> {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__statement">
          <span className="accent-line" />
          <p>“{site.footerText}”</p>
          <span className="accent-line" />
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.companyName}. All rights reserved.
          </p>
          <p className="footer__bottom-tag">{site.tagline}</p>
          <button
            type="button"
            className="footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUp aria-hidden="true" />
          </button>
        </div>
        </Reveal>
      </div>
    </footer>
  );
}