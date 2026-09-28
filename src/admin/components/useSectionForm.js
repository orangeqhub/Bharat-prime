import { useEffect, useMemo, useState } from 'react';
import { contentService } from '../../services/contentService';
import { useContent } from '../../context/ContentContext';
import { useToast } from './Toast';

/* Manage a single CMS section as editable form state.
 * - draft: working copy derived from current content
 * - set: update a (possibly nested) field
 * - isDirty: whether changes exist
 * - save: persist to the CMS storage and refresh content
 * - reset: revert to saved/default content
 */
export default function useSectionForm(sectionKey, normalize = (v) => v) {
  const { content, update } = useContent();
  const { push } = useToast();

  const base = useMemo(() => content[sectionKey] || {}, [content, sectionKey]);
  const initial = useMemo(
    () => JSON.parse(JSON.stringify(normalize ? normalize(base) : base)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sectionKey]
  );

  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(base || {})));

  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(initial || {})));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(initial);

  const set = (field, value) => {
    setDraft((d) => ({ ...d, [field]: value }));
  };

  const setNested = (path, value) => {
    setDraft((d) => {
      const copy = JSON.parse(JSON.stringify(d));
      const parts = String(path).split('.');
      let node = copy;
      for (let i = 0; i < parts.length - 1; i += 1) {
        node = node[parts[i]];
      }
      node[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const replace = (setter) => {
    setDraft((d) => setter(JSON.parse(JSON.stringify(d))));
  };

  const save = (message = 'Changes saved') => {
    const ok = update({ [sectionKey]: draft });
    if (ok) {
      setDraft(JSON.parse(JSON.stringify(draft)));
      push(message);
    } else {
      push('Could not save — storage may be full.', 'error');
    }
    return ok;
  };

  const reset = () => {
    contentService.resetSection(sectionKey);
    setDraft(JSON.parse(JSON.stringify(base)));
    push('Section reset to defaults');
  };

  return { draft, initial, isDirty, set, setNested, replace, save, reset };
}