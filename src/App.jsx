import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ScrapPage from './pages/ScrapPage';
import SteelPage from './pages/SteelPage';
import FabricationPage from './pages/FabricationPage';
import WhyRecyclingPage from './pages/WhyRecyclingPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import AdminApp from './admin/AdminApp';

export default function App() {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minDelay = reduce ? 0 : 650;
    const t1 = setTimeout(() => setPhase('fading'), minDelay);
    const t2 = setTimeout(() => setPhase('done'), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const onExited = useCallback(() => setPhase('done'), []);

  return (
    <>
      {phase !== 'done' && <Preloader phase={phase} onExited={onExited} />}
      <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="scrap" element={<ScrapPage />} />
        <Route path="steel-trading" element={<SteelPage />} />
        <Route path="fabrication" element={<FabricationPage />} />
        <Route path="why-recycling" element={<WhyRecyclingPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="admin/*" element={<AdminApp />} />
      </Routes>
    </>
  );
}