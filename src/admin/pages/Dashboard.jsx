import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Boxes, CalendarClock, Inbox, Layers, Recycle, Shapes, Wrench, Tag } from 'lucide-react';
import { siteSections } from '../../data/defaultContent';
import { useContent } from '../../context/ContentContext';
import { enquiryService } from '../../services/enquiryService';

export default function Dashboard() {
  const { content } = useContent();
  const navigate = useNavigate();
  const enquiries = enquiryService.list();
  const latest = enquiries.slice(0, 5);

  const services = content.fabrication.products.length;
  const scrapCategories = content.scrap.divisions.length;
  const committees = [
    { label: 'Website sections', value: siteSections.length },
    { label: 'Services (fabrication)', value: services },
    { label: 'Scrap categories', value: scrapCategories },
    { label: 'Total enquiries', value: enquiries.length },
  ];

  const lastUpdated = useMemo(() => {
    const raw = contentServiceRaw();
    if (Object.keys(raw).length === 0) return 'Using default content — no custom edits yet.';
    return 'Custom content is active (edited via this CMS).';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Dashboard</h2>
          <p className="admin-section__hint">A quick overview of the website CMS.</p>
        </div>
      </div>

      <div className="a-dashboard">
        <Stat icon={Layers} label="Website Sections" value={committees[0].value} />
        <Stat icon={Wrench} label="Fabrication Services" value={committees[1].value} />
        <Stat icon={Recycle} label="Scrap Categories" value={committees[2].value} />
        <Stat icon={Inbox} label="Total Enquiries" value={committees[3].value} />
      </div>

      <div className="a-panel-list">
        <h3 className="a-panel-list__title">
          <CalendarClock aria-hidden="true" /> Last Updated Content
        </h3>
        <div className="a-list-row">
          <span className="a-list-row__label">{lastUpdated}</span>
          <button
            type="button"
            className="a-btn a-btn--ghost a-btn--sm"
            onClick={() => navigate('/admin/site')}
          >
            Review
          </button>
        </div>
      </div>

      <div className="a-panel-list" style={{ marginTop: 16 }}>
        <h3 className="a-panel-list__title">
          <Inbox aria-hidden="true" /> Recent Enquiries
        </h3>
        {latest.length === 0 ? (
          <div className="a-state-empty">
            <Boxes aria-hidden="true" />
            <p>No enquiries yet. They will appear here when customers submit the contact form.</p>
          </div>
        ) : (
          latest.map((e) => (
            <div className="a-list-row" key={e.id}>
              <span className="a-list-row__label">
                {e.name}
                {e.company ? ` • ${e.company}` : ''}
              </span>
              <span className="a-list-row__value">
                {e.requirementType || 'General'} — {e.phone}
              </span>
            </div>
          ))
        )}
        <button
          type="button"
          className="a-btn a-btn--secondary a-btn--sm"
          style={{ marginTop: 12 }}
          onClick={() => navigate('/admin/enquiries')}
        >
          View all enquiries
        </button>
      </div>
    </div>
  );
}

function contentServiceRaw() {
  try {
    return JSON.parse(localStorage.getItem('bharat_prime_content_v1')) || {};
  } catch {
    return {};
  }
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="a-stat">
      <div className="a-stat__head">
        <span className="a-stat__label">{label}</span>
        <span className="a-stat__icon">
          <Icon aria-hidden="true" />
        </span>
      </div>
      <div className="a-stat__value">{value}</div>
    </div>
  );
}