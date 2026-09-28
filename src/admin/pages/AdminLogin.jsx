import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';
import { authService } from '../../services/authService';
import { useContent } from '../../context/ContentContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { content } = useContent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      const ok = authService.login(username, password);
      if (ok) {
        navigate('/admin', { replace: true });
      } else {
        setError('Invalid username or password.');
        setBusy(false);
      }
    }, 280);
  };

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={submit}>
        <div className="admin-login__brand">
          <span className="admin-login__mark">
            <ShieldCheck aria-hidden="true" />
          </span>
          <span className="admin-login__title">CMS Login</span>
          <span className="admin-login__note">
            {content.site.companyName} — Content Manager
          </span>
        </div>

        <div className="a-field">
          <label className="a-field__label" htmlFor="adm-user">
            Username
          </label>
          <input
            id="adm-user"
            className="a-input"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />
        </div>
        <div className="a-field">
          <label className="a-field__label" htmlFor="adm-pass">
            Password
          </label>
          <input
            id="adm-pass"
            className="a-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error ? (
          <div className="admin-login__error" role="alert">
            {error}
          </div>
        ) : null}

        <button type="submit" className="a-btn a-btn--primary" disabled={busy}>
          <Lock aria-hidden="true" /> {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="admin-login__hint">
          Default: <code>admin</code> / <code>admin123</code> — change it in Site&nbsp;Settings
          after logging in.
        </p>
      </form>
    </div>
  );
}