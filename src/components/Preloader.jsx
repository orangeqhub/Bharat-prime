import { useEffect } from 'react';

export default function Preloader({ phase, onExited }) {
  useEffect(() => {
    if (phase === 'fading') {
      const t = setTimeout(onExited, 700);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, onExited]);

  return (
    <div
      className={`preloader${phase === 'fading' ? ' preloader--done' : ''}`}
      role="status"
      aria-label="Loading Bharat Prime Enterprises"
    >
      <div className="preloader__box">
        <div className="preloader__ring" aria-hidden="true" />
        <img
          className="preloader__logo"
          src="/assets/logo.png.png"
          alt=""
          aria-hidden="true"
          width="104"
          height="104"
        />
      </div>
      <span className="preloader__name">BHARAT PRIME</span>
      <span className="preloader__sub">ENTERPRISES</span>
    </div>
  );
}