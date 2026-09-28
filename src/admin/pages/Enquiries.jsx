import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Building2, Package, Inbox, CheckCircle2 } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { useToast } from '../components/Toast';

export default function Enquiries() {
  const { push } = useToast();
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    setEnquiries(enquiryService.list());
  }, []);

  const refresh = (data) => {
    setEnquiries(data);
  };

  const handleRead = (id) => {
    enquiryService.markRead(id);
    refresh(enquiryService.list());
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    enquiryService.remove(id);
    refresh(enquiryService.list());
    push('Enquiry deleted');
  };

  const formatDate = (ts) =>
    new Date(ts).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const organized = [...enquiries].sort((a, b) => {
    const ar = a.status === 'read';
    const br = b.status === 'read';
    return ar === br ? (b.createdAt || 0) - (a.createdAt || 0) : ar ? 1 : -1;
  });
  const unread = enquiries.filter((e) => e.status !== 'read').length;

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">
            Enquiries {unread > 0 && <span className="a-badge">{unread} new</span>}
          </h2>
          <p className="admin-section__hint">Enquiries submitted through the website’s contact form.</p>
        </div>
      </div>

      {organized.length === 0 ? (
        <div className="admin-card a-empty">
          <Inbox style={{ width: 40, height: 40, marginBottom: 8, opacity: 0.6 }} aria-hidden="true" />
          <p>No enquiries yet. Submissions from the contact form will appear here.</p>
        </div>
      ) : (
        organized.map((q) => (
          <div
            className={`admin-card a-enquiry ${q.read ? 'is-read' : 'is-unread'}`}
            key={q.id}
            onClick={() => q.status !== 'read' && handleRead(q.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && q.status !== 'read') handleRead(q.id);
            }}
          >
            <div className="a-row" style={{ marginBottom: 8 }}>
              <div className="a-row" style={{ gap: 8 }}>
                {q.status === 'read' ? (
                  <CheckCircle2 style={{ width: 18, height: 18, color: '#6b8f5e' }} aria-hidden="true" />
                ) : (
                  <span className="a-dot" aria-label="Unread" />
                )}
                <strong>{q.name}</strong>
              </div>
              <span className="a-enquiry__date">{formatDate(q.createdAt)}</span>
            </div>

            <div className="a-enquiry__meta">
              <span>
                <Phone style={{ width: 14, height: 14 }} aria-hidden="true" />
                <a href={`tel:${q.phone}`}>{q.phone}</a>
              </span>
              {q.email && (
                <span>
                  <Mail style={{ width: 14, height: 14 }} aria-hidden="true" />
                  <a href={`mailto:${q.email}`}>{q.email}</a>
                </span>
              )}
              {q.company && (
                <span>
                  <Building2 style={{ width: 14, height: 14 }} aria-hidden="true" />
                  {q.company}
                </span>
              )}
              {q.requirementType && (
                <span>
                  <Package style={{ width: 14, height: 14 }} aria-hidden="true" />
                  {q.requirementType}
                </span>
              )}
              {q.material && <span className="a-enquiry__material">{q.material}</span>}
            </div>

            {q.message && <p className="a-enquiry__message">{q.message}</p>}

            <div className="a-row" style={{ marginTop: 8, justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="a-btn a-btn--danger a-btn--sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(q.id);
                }}
              >
                <Trash2 aria-hidden="true" /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}