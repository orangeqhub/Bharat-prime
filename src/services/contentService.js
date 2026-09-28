import { defaultContent } from '../data/defaultContent';
import { keys, loadJSON, saveJSON } from './storage';

/* Deep-merge overrides on top of the default content so a partially
 * edited CMS never loses the rest of the site data. */
function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const out = { ...base };
  for (const key of Object.keys(override)) {
    out[key] = deepMerge(out[key], override[key]);
  }
  return out;
}

export const contentService = {
  getContent() {
    const overrides = loadJSON(keys.content, null);
    return deepMerge(defaultContent, overrides || {});
  },

  saveOverrides(partial) {
    const current = loadJSON(keys.content, {}) || {};
    const next = deepMerge(current, partial);
    return saveJSON(keys.content, next);
  },

  resetSection(section) {
    const current = loadJSON(keys.content, {}) || {};
    delete current[section];
    saveJSON(keys.content, current);
  },

  /* Replaces a managed image field (asset path or uploaded data URL). */
  setImage(sectionPath, value) {
    return this.saveOverrides(sectionPath, value);
  },

  getRawOverrides() {
    return loadJSON(keys.content, {});
  },
};

export function resolveImage(value) {
  if (!value) return '';
  if (typeof value === 'string') {
    if (value.startsWith('data:') || value.startsWith('/') || value.startsWith('http')) {
      return value;
    }
    return `/assets/${value}`;
  }
  return '';
}