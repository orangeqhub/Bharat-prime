import { keys, loadJSON, saveJSON, uid } from './storage';

export const enquiryService = {
  list() {
    const items = loadJSON(keys.enquiries, []) || [];
    return items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  },

  create(input) {
    if (!input || !input.name || !input.phone) return null;
    const entry = {
      id: uid(),
      name: String(input.name || '').trim(),
      phone: String(input.phone || '').trim(),
      company: String(input.company || '').trim(),
      requirementType: String(input.requirementType || '').trim(),
      material: String(input.material || '').trim(),
      message: String(input.message || '').trim(),
      status: 'new',
      createdAt: Date.now(),
    };
    const items = loadJSON(keys.enquiries, []) || [];
    items.push(entry);
    saveJSON(keys.enquiries, items);
    return entry;
  },

  markRead(id, read = true) {
    const items = loadJSON(keys.enquiries, []) || [];
    const idx = items.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    items[idx].status = read ? 'read' : 'new';
    items[idx].readAt = read ? Date.now() : null;
    saveJSON(keys.enquiries, items);
    return true;
  },

  remove(id) {
    const items = loadJSON(keys.enquiries, []) || [];
    const next = items.filter((e) => e.id !== id);
    saveJSON(keys.enquiries, next);
    return true;
  },

  stats() {
    const items = loadJSON(keys.enquiries, []) || [];
    return {
      total: items.length,
      unread: items.filter((e) => e.status === 'new').length,
    };
  },
};