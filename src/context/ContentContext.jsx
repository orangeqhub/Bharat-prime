import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { contentService } from '../services/contentService';
import { keys } from '../services/storage';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => contentService.getContent());
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setContent(contentService.getContent());
    setVersion((v) => v + 1);
  }, []);

  const update = useCallback((overrides) => {
    const ok = contentService.saveOverrides(overrides);
    if (ok) refresh();
    return ok;
  }, [refresh]);

  /* Public site observes CMS changes made in the admin panel.
   * Admin edits inside the SPA update state immediately; edits made in another
   * tab are picked up on focus and via the storage event. */
  useEffect(() => {
    const onFocus = () => refresh();
    const onStorage = (e) => {
      if (e.key === keys.content) refresh();
    };
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
    };
  }, [refresh]);

  const value = useMemo(
    () => ({ content, version, update, refresh }),
    [content, version, update, refresh]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}