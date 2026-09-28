import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Disc3,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  Phone,
  Recycle,
  Factory,
  Newspaper,
  Settings,
  Star,
  X,
} from 'lucide-react';
import { authService } from '../services/authService';
import { enquiryService } from '../services/enquiryService';
import { useContent } from '../context/ContentContext';
import Logo from '../components/ui/Logo';

const NAV = [
  { to: '/admin', key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/site', key: 'site', label: 'Site Settings', icon: Settings },
  { to: '/admin/hero', key: 'hero', label: 'Hero', icon: Star },
  { to: '/admin/about', key: 'about', label: 'About', icon: Palette },
  { to: '/admin/scrap', key: 'scrap', label: 'Scrap', icon: Recycle },
  { to: '/admin/steel', key: 'steel', label: 'Steel Trading', icon: Disc3 },
  { to: '/admin/fabrication', key: 'fabrication', label: 'Fabrication', icon: Factory },
  { to: '/admin/recycling', key: 'recycling', label: 'Why Recycling', icon: Newspaper },
  { to: '/admin/growth', key: 'growth', label: 'Growth Plan', icon: LayoutDashboard },
  { to: '/admin/contact', key: 'contact', label: 'Contact', icon: Phone },
  { to: '/admin/enquiries', key: 'enquiries', label: 'Enquiries', icon: Inbox },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { content } = useContent();
  const [open, setOpen] = useState(false);
  const enquiryStats = enquiryService.stats();

  const logout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const sidebar = (
    <>
      <div className="admin-sidebar__brand">
        <Logo logo={content.site.logo} tone="light" size={38} />
        <span className="admin-sidebar__brand-text">
          <span className="admin-sidebar__brand-name">Bharat Prime</span>
          <span className="admin-sidebar__brand-sub">Content Manager</span>
        </span>
      </div>
      <nav className="admin-sidebar__nav" aria-label="Admin">
        <span className="admin-sidebar__label">Content</span>
        {NAV.slice(0, 9).map((item) => (
          <SideLink key={item.key} item={item} onClick={() => setOpen(false)} />
        ))}
        <span className="admin-sidebar__label">Inbox</span>
        {NAV.slice(9).map((item) => {
          const count = item.key === 'enquiries' ? enquiryStats.unread : 0;
          return (
            <SideLink key={item.key} item={item} onClick={() => setOpen(false)} badge={count} />
          );
        })}
      </nav>
      <div className="admin-sidebar__foot">
        <a className="admin-sidebar__view" href="/" target="_blank" rel="noopener noreferrer">
          <ExternalLink aria-hidden="true" /> View website
        </a>
        <button type="button" className="admin-sidebar__view" onClick={logout}>
          <LogOut aria-hidden="true" /> Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="admin admin-shell">
      <aside className={`admin-sidebar ${open ? 'admin-sidebar--open' : ''}`}>{sidebar}</aside>
      {open ? (
        <div className="admin-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
      ) : null}

      <div className="admin-main">
        <header className="admin-header">
          <div className="a-row">
            <button
              type="button"
              className="a-btn a-btn--secondary a-btn--sm admin-header__menu"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu aria-hidden="true" />
            </button>
            <h1 className="admin-header__title">Content Management</h1>
          </div>
          <div className="admin-header__right">
            <span className="admin-header__user">
              <span className="admin-header__avatar" aria-hidden="true">
                A
              </span>
              Administrator
            </span>
            <button
              type="button"
              className="a-btn a-btn--ghost a-btn--sm"
              onClick={() => setOpen(false)}
              style={{ display: 'none' }}
              aria-hidden="true"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SideLink({ item, onClick, badge = 0 }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
      }
      onClick={onClick}
    >
      <Icon aria-hidden="true" />
      {item.label}
      {badge > 0 ? <span className="admin-sidebar__badge">{badge}</span> : null}
    </NavLink>
  );
}