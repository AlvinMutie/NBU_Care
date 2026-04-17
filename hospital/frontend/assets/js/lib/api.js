import { auth } from './auth.js';

const cfg = window.NBU_CONFIG || {};
const API_BASE = cfg.API_BASE || '';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const token = auth.getToken();
  const h = { ...headers };
  if (token) h.Authorization = `Bearer ${token}`;
  if (body !== undefined) h['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: h,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    const msg = data?.error?.message || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  health() {
    return request('/health');
  },
  login(username, password) {
    return request('/auth/login', { method: 'POST', body: { username, password } });
  },
  me() {
    return request('/auth/me');
  },
  listFlashcards({ query, category, favoritesOnly } = {}) {
    const sp = new URLSearchParams();
    if (query) sp.set('query', query);
    if (category) sp.set('category', category);
    if (favoritesOnly) sp.set('favoritesOnly', 'true');
    const qs = sp.toString() ? `?${sp.toString()}` : '';
    return request(`/flashcards${qs}`);
  },
  createFlashcard(payload) {
    return request('/flashcards', { method: 'POST', body: payload });
  },
  updateFlashcard(id, payload) {
    return request(`/flashcards/${id}`, { method: 'PUT', body: payload });
  },
  deleteFlashcard(id) {
    return request(`/flashcards/${id}`, { method: 'DELETE' });
  },
  favorite(entityType, entityId) {
    return request('/favorites', { method: 'POST', body: { entityType, entityId } });
  },
  unfavorite(entityType, entityId) {
    return request('/favorites', { method: 'DELETE', body: { entityType, entityId } });
  },
  listScenarios({ query, category, favoritesOnly } = {}) {
    const sp = new URLSearchParams();
    if (query) sp.set('query', query);
    if (category) sp.set('category', category);
    if (favoritesOnly) sp.set('favoritesOnly', 'true');
    const qs = sp.toString() ? `?${sp.toString()}` : '';
    return request(`/scenarios${qs}`);
  },
  createScenario(payload) {
    return request('/scenarios', { method: 'POST', body: payload });
  },
  updateScenario(id, payload) {
    return request(`/scenarios/${id}`, { method: 'PUT', body: payload });
  },
  deleteScenario(id) {
    return request(`/scenarios/${id}`, { method: 'DELETE' });
  },
  createUser(payload) {
    return request('/users', { method: 'POST', body: payload });
  },
};

