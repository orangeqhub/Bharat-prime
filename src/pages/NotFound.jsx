import { ArrowLeft } from 'lucide-react';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <section className="notfound">
      <Seo title="Page Not Found | Bharat Prime Enterprises" />
      <div className="container notfound__inner">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">This page doesn't exist</h1>
        <p className="notfound__text">
          The page you are looking for may have been moved. Head back to our homepage to explore
          scrap trading, steel trading and metal fabrication.
        </p>
        <Button to="/" variant="gold" icon={ArrowLeft}>
          Back to Home
        </Button>
      </div>
    </section>
  );
}