import { contentService } from './contentService';
import { keys, loadJSON, removeKey, saveJSON } from './storage';

export const authService = {
  isAuthenticated() {
    const session = loadJSON(keys.session, null);
    return Boolean(session && session.user === 'admin' && session.expiresAt > Date.now());
  },

  login(username, password) {
    const content = contentService.getContent();
    const creds = content.site.adminUser || { username: 'admin', password: 'admin123' };
    if (
      username.trim().toLowerCase() === String(creds.username || 'admin').toLowerCase() &&
      password === creds.password
    ) {
      saveJSON(keys.session, {
        user: 'admin',
        issuedAt: Date.now(),
        expiresAt: Date.now() + 1000 * 60 * 60 * 12,
      });
      return true;
    }
    return false;
  },

  logout() {
    removeKey(keys.session);
  },
};