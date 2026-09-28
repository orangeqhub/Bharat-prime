import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollManager from './ScrollManager';
import useCardSpotlight from '../../hooks/useCardSpotlight';

export default function Layout() {
  const { pathname } = useLocation();
  const siteRef = useRef(null);

  useCardSpotlight(siteRef);

  return (
    <div className="site" ref={siteRef}>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" key={pathname} className="page-fade">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}