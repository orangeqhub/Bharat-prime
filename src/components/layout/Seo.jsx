import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULTS = {
  title: 'Bharat Prime Enterprises | Scrap, Steel & Metal Fabrication — Guntur',
  description:
    'We Buy Scrap • We Sell Steel • We Fabricate Metal — Scrap Trading, Steel Trading & Metal Fabrication in Guntur, Andhra Pradesh.',
};

const RULES = [
  ['description', 'description'],
  ['keywords', 'keywords'],
  ['og:title', 'title'],
  ['og:description', 'description'],
  ['og:url', 'url'],
  ['og:image', 'image'],
  ['twitter:title', 'title'],
  ['twitter:description', 'description'],
  ['twitter:image', 'image'],
];

function setMeta(attr, key, value) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.setAttribute('content', value);
}

export default function Seo({ title, description, image = '/assets/brand-card-front.jpg', url, keywords }) {
  const location = useLocation();

  useEffect(() => {
    const desc = description || DEFAULTS.description;
    const pageTitle = title || DEFAULTS.title;
    const pageUrl = url || `https://bharatprimeenterprises.in${location.pathname}`;

    document.title = pageTitle;

    const values = {
      title: pageTitle,
      description: desc,
      keywords:
        keywords ||
        'Scrap Trading, Steel Trading, Metal Fabrication, Guntur, Andhra Pradesh, Bharat Prime Enterprises',
      image,
      url: pageUrl,
    };

    for (const [key, field] of RULES) {
      const isProp = key.startsWith('og:');
      const rule = isProp ? ['property', key, field] : ['name', key, field];
      setMeta(rule[0], rule[1], values[rule[2]] || '');
    }
  }, [title, description, image, url, keywords, location.pathname]);

  return null;
}