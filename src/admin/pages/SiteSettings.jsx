import { useEffect, useState } from 'react';
import useSectionForm from '../components/useSectionForm';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ImageUpload from '../components/ImageUpload';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../components/Toast';

export default function SiteSettings() {
  const { content, update } = useContent();
  const { push } = useToast();
  const { draft, set, isDirty, reset } = useSectionForm('site');
  const [cta, setCta] = useState(content.cta || {});
  const site = draft;

  useEffect(() => {
    setCta(content.cta || {});
  }, [content.cta]);

  const dirty = isDirty || JSON.stringify(cta) !== JSON.stringify(content.cta);

  const save = () => {
    const ok = update({ site: site, cta });
    if (ok) push('Site settings saved');
    else push('Could not save — storage may be full.', 'error');
  };

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Site Settings</h2>
          <p className="admin-section__hint">Company identity, contact details & CTA labels.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Company Identity</h3>
        <div className="a-grid">
          <Field label="Company name" value={site.companyName} onChange={(e) => set('companyName', e.target.value)} />
          <Field label="Short name" value={site.shortName} onChange={(e) => set('shortName', e.target.value)} />
          <Field
            label="Tagline"
            value={site.tagline}
            onChange={(e) => set('tagline', e.target.value)}
            className="a-grid--full"
          />
        </div>
        <ImageUpload
          label="Logo image"
          value={site.logo?.image}
          onChange={(v) => set('logo', { ...site.logo, image: v })}
          hint="Used in the navbar, footer and admin panel. The default vector logo is used if empty."
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Contact Information</h3>
        <div className="a-grid">
          <Field
            label="Phone 1"
            value={site.phoneNumbers[0]}
            onChange={(e) => set('phoneNumbers', [e.target.value, site.phoneNumbers[1]])}
          />
          <Field
            label="Phone 2"
            value={site.phoneNumbers[1]}
            onChange={(e) => set('phoneNumbers', [site.phoneNumbers[0], e.target.value])}
          />
          <Field label="Email" type="email" value={site.email} onChange={(e) => set('email', e.target.value)} />
          <Field
            label="WhatsApp number (with country code)"
            value={site.whatsappNumber}
            onChange={(e) => set('whatsappNumber', e.target.value)}
          />
          <Field label="Location text" value={site.location} onChange={(e) => set('location', e.target.value)} className="a-grid--full" />
          <Field label="Google Maps link" value={site.mapsUrl} onChange={(e) => set('mapsUrl', e.target.value)} className="a-grid--full" />
          <Field
            label="Google Maps embed URL"
            value={site.mapsEmbedUrl}
            onChange={(e) => set('mapsEmbedUrl', e.target.value)}
            className="a-grid--full"
            hint="Used for the embedded map in the contact section."
          />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Footer</h3>
        <Field
          label="Footer statement"
          value={site.footerText}
          onChange={(e) => set('footerText', e.target.value)}
          as="textarea"
          rows={2}
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Social Links</h3>
        <div className="a-grid">
          <Field label="Facebook" value={site.social.facebook} onChange={(e) => set('social', { ...site.social, facebook: e.target.value })} />
          <Field label="Instagram" value={site.social.instagram} onChange={(e) => set('social', { ...site.social, instagram: e.target.value })} />
          <Field label="LinkedIn" value={site.social.linkedin} onChange={(e) => set('social', { ...site.social, linkedin: e.target.value })} />
          <Field label="WhatsApp" value={site.social.whatsapp} onChange={(e) => set('social', { ...site.social, whatsapp: e.target.value })} />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">CTA Labels & Admin Login</h3>
        <div className="a-grid a-grid--3">
          <Field label="Sell Your Scrap" value={cta.sellScrap} onChange={(e) => setCta({ ...cta, sellScrap: e.target.value })} />
          <Field label="Explore Services" value={cta.services} onChange={(e) => setCta({ ...cta, services: e.target.value })} />
          <Field label="Call Us" value={cta.callUs} onChange={(e) => setCta({ ...cta, callUs: e.target.value })} />
          <Field label="Enquire About Steel" value={cta.enquireSteel} onChange={(e) => setCta({ ...cta, enquireSteel: e.target.value })} />
          <Field label="Request Fabrication" value={cta.requestFabrication} onChange={(e) => setCta({ ...cta, requestFabrication: e.target.value })} />
        </div>
        <div className="a-grid" style={{ marginTop: 8 }}>
          <Field
            label="Admin username"
            value={site.adminUser?.username}
            onChange={(e) => set('adminUser', { ...site.adminUser, username: e.target.value })}
          />
          <Field
            label="Admin password"
            type="text"
            value={site.adminUser?.password}
            onChange={(e) => set('adminUser', { ...site.adminUser, password: e.target.value })}
            hint="Used for /admin login. Change it from the default."
          />
        </div>
      </div>

      <SaveBar isDirty={dirty} onSave={save} onReset={reset} />
    </div>
  );
}