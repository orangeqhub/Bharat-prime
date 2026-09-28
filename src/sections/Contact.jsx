import { useState } from 'react';
import { Check, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { enquiryService } from '../services/enquiryService';
import { resolveImage } from '../services/contentService';

const REQUIREMENTS = [
  'Scrap Sale',
  'Steel Purchase',
  'Fabrication Work',
  'Grills & Gates',
  'B2B / Company Scrap',
  'General Enquiry',
];

export default function Contact() {
  const { content } = useContent();
  const { contact, site, cta } = content;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    company: '',
    requirementType: '',
    material: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setStatus('idle');
    setError('');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }
    const entry = enquiryService.create(form);
    if (!entry) {
      setError('Unable to save your enquiry. Please try again.');
      return;
    }
    setStatus('submitted');
    setForm({ name: '', phone: '', company: '', requirementType: '', material: '', message: '' });
  };

  const labels = contact.formLabels;

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <SectionHeader eyebrow={contact.eyebrow} title={contact.heading} subheading={contact.subheading} />

            <Reveal className="contact__details">
              <div className="contact__detail">
                <span className="contact__detail-icon">
                  <Phone aria-hidden="true" />
                </span>
                <div>
                  <span className="contact__detail-label">Phone</span>
                  {site.phoneNumbers.map((phone) => (
                    <a key={phone} className="contact__detail-value" href={`tel:${phone}`}>
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact__detail">
                <span className="contact__detail-icon">
                  <Mail aria-hidden="true" />
                </span>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a className="contact__detail-value" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="contact__detail">
                <span className="contact__detail-icon">
                  <MapPin aria-hidden="true" />
                </span>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">{site.location}</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="contact__channels">
              <Button href={site.mapsUrl} variant="outline">
                <MapPin aria-hidden="true" /> View on Google Maps
              </Button>
              {site.whatsappNumber ? (
                <Button
                  href={`https://wa.me/${site.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${site.companyName}, I would like to enquire about your services.`
                  )}`}
                  variant="ghost-gold"
                  icon={MessageCircle}
                >
                  WhatsApp Us
                </Button>
              ) : null}
            </Reveal>

            <Reveal variant="img" className="contact__photo">
              <img
                src={resolveImage(contact.image)}
                alt={contact.imageAlt || ''}
                loading="lazy"
              />
            </Reveal>

            <Reveal className="contact__map">
              <iframe
                title={`Map of ${site.companyName} — ${site.location}`}
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>

          <Reveal delay={120} className="contact__form-wrap">
            <div className="contact__form-card">
              {status === 'submitted' ? (
                <div className="contact__success" role="status">
                  <span className="contact__success-icon">
                    <CheckCircle2 aria-hidden="true" />
                  </span>
                  <h3>{labels.submitted}</h3>
                  <p>{labels.submittedNote}</p>
                  <Button variant="outline" onClick={() => setStatus('idle')}>
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={submit} noValidate>
                  <div className="contact__form-grid">
                    <div className="field">
                      <label className="field-label" htmlFor="enq-name">
                        {labels.name}
                      </label>
                      <input
                        id="enq-name"
                        className="input"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={update('name')}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="enq-phone">
                        {labels.phone}
                      </label>
                      <input
                        id="enq-phone"
                        className="input"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Your phone number"
                        value={form.phone}
                        onChange={update('phone')}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="enq-company">
                        {labels.company}
                      </label>
                      <input
                        id="enq-company"
                        className="input"
                        type="text"
                        autoComplete="organization"
                        placeholder="Company (optional)"
                        value={form.company}
                        onChange={update('company')}
                      />
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="enq-type">
                        {labels.requirementType}
                      </label>
                      <select
                        id="enq-type"
                        className="input"
                        value={form.requirementType}
                        onChange={update('requirementType')}
                      >
                        <option value="">Select requirement type…</option>
                        {REQUIREMENTS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="enq-material">
                        {labels.material}
                      </label>
                      <input
                        id="enq-material"
                        className="input"
                        type="text"
                        placeholder="e.g. Iron scrap, TMT rods, Grill work"
                        value={form.material}
                        onChange={update('material')}
                      />
                    </div>
                    <div className="field field--full">
                      <label className="field-label" htmlFor="enq-message">
                        {labels.message}
                      </label>
                      <textarea
                        id="enq-message"
                        className="input"
                        rows={4}
                        placeholder="Tell us what you need…"
                        value={form.message}
                        onChange={update('message')}
                      />
                    </div>
                  </div>

                  {error ? (
                    <p className="contact__error" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <Button type="submit" variant="gold" size="lg" block iconEnd={Send}>
                    {labels.submit}
                  </Button>

                  <p className="contact__privacy">
                    We respond to every enquiry. Your details are only used to contact you about
                    your requirement.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}