import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Phone, X, ArrowUpRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

export default function Navbar() {
  const { content } = useContent();
  const { site, cta } = content;
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prevPath = useRef(location.pathname);
  const mainToggleRef = useRef(null);

  const closeMenu = () => {
    setOpen(false);
    requestAnimationFrame(() => mainToggleRef.current?.focus());
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setOpen(false);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goToSection = (id) => {
    if (open) closeMenu();
    else setOpen(false);
    if (location.pathname === '/') {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        navigate(`/#${id}`, { replace: true });
      }
      return;
    }
    if (id === 'home') {
      navigate('/');
      return;
    }
    navigate(`/#${id}`);
  };

  const links = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about', route: '/about' },
    { label: 'Scrap', target: 'scrap' },
    { label: 'Steel Trading', target: 'steel' },
    { label: 'Fabrication', target: 'fabrication' },
    { label: 'Why Recycling', target: 'why-recycling' },
    { label: 'Contact', target: 'contact', route: '/contact' },
  ];

  const isActive = (section) => {
    const urlTarget = location.hash.replace('#', '');
    if (section === 'home') return location.pathname === '/' && !location.hash;
    return urlTarget === section;
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" aria-label="Bharat Prime Enterprises — Home">
          <Logo logo={site.logo} tone="light" size={42} />
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {links.map((link) =>
            link.route ? (
              <NavLink
                key={link.target}
                to={link.route}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <button
                key={link.target}
                type="button"
                onClick={() => goToSection(link.target)}
                className={`navbar__link ${isActive(link.target) ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        <div className="navbar__cta">
          <a className="navbar__phone" href={`tel:${site.phoneNumbers[0]}`}>
            <Phone aria-hidden="true" />
            <span>{site.phoneNumbers[0]}</span>
          </a>
          <Button variant="gold" size="sm" iconEnd={ArrowUpRight} onClick={() => navigate('/contact')}>
            {cta.sellScrap}
          </Button>
        </div>

        <button
          type="button"
          ref={mainToggleRef}
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!open}
        {...(!open ? { inert: '' } : {})}
      >
        <div className="navbar__mobile-head">
          <Logo logo={site.logo} tone="light" size={40} />
          <button
            type="button"
            className="navbar__toggle"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav className="navbar__mobile-links" aria-label="Mobile">
          {links.map((link, i) =>
            link.route ? (
              <NavLink
                key={link.target}
                to={link.route}
                className={({ isActive }) =>
                  `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                }
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span>{link.label}</span>
                <ArrowUpRight aria-hidden="true" />
              </NavLink>
            ) : (
              <button
                key={link.target}
                type="button"
                onClick={() => goToSection(link.target)}
                className={`navbar__mobile-link ${isActive(link.target) ? 'navbar__mobile-link--active' : ''}`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span>{link.label}</span>
                <ArrowUpRight aria-hidden="true" />
              </button>
            )
          )}
        </nav>
        <div className="navbar__mobile-foot">
          <Button variant="gold" block onClick={() => navigate('/contact')}>
            {cta.sellScrap}
          </Button>
          <a className="navbar__mobile-phone" href={`tel:${site.phoneNumbers[0]}`}>
            <Phone aria-hidden="true" /> {site.phoneNumbers[0]}
          </a>
          <p className="navbar__mobile-loc">{site.location}</p>
        </div>
      </div>
      <div
        className={`navbar__backdrop ${open ? 'navbar__backdrop--show' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  );
}