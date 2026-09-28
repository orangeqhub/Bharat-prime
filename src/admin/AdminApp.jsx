import { Navigate, Route, Routes } from 'react-router-dom';
import { authService } from '../services/authService';
import AdminLayout from './AdminLayout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import SiteSettings from './pages/SiteSettings';
import HeroSettings from './pages/HeroSettings';
import AboutSettings from './pages/AboutSettings';
import ScrapSettings from './pages/ScrapSettings';
import SteelSettings from './pages/SteelSettings';
import FabricationSettings from './pages/FabricationSettings';
import RecyclingSettings from './pages/RecyclingSettings';
import GrowthSettings from './pages/GrowthSettings';
import ContactSettings from './pages/ContactSettings';
import Enquiries from './pages/Enquiries';

function RequireAuth({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="site" element={<SiteSettings />} />
        <Route path="hero" element={<HeroSettings />} />
        <Route path="about" element={<AboutSettings />} />
        <Route path="scrap" element={<ScrapSettings />} />
        <Route path="steel" element={<SteelSettings />} />
        <Route path="fabrication" element={<FabricationSettings />} />
        <Route path="recycling" element={<RecyclingSettings />} />
        <Route path="growth" element={<GrowthSettings />} />
        <Route path="contact" element={<ContactSettings />} />
        <Route path="enquiries" element={<Enquiries />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}