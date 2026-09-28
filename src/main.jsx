import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContentProvider } from './context/ContentContext';
import { ToastProvider } from './admin/components/Toast';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/pages.css';
import './admin/admin.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ContentProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ContentProvider>
    </BrowserRouter>
  </React.StrictMode>
);