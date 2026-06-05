import { pages } from './screens/pages.js';

function parseParams(pattern, route) {
  const pParts = pattern.split('/').filter(Boolean);
  const rParts = route.split('/').filter(Boolean);
  if (pParts.length !== rParts.length) return null;
  const params = {};
  for (let i = 0; i < pParts.length; i++) {
    const p = pParts[i];
    const r = rParts[i];
    if (p.startsWith(':')) params[p.slice(1)] = r;
    else if (p !== r) return null;
  }
  return params;
}

const routeTable = [
  { pattern: 'login', navKey: '', render: pages.login },
  { pattern: 'flashcards', navKey: 'flashcards', render: pages.flashcards },
  { pattern: 'calculators', navKey: 'calculators', render: pages.calculators },
  { pattern: 'scenarios', navKey: 'scenarios', render: pages.scenarios },
  { pattern: 'admin/users', navKey: 'admin-users', render: pages.adminUsers },
  { pattern: 'display', navKey: 'display', render: pages.display },
];

export const routes = {
  match(route) {
    for (const r of routeTable) {
      const params = parseParams(r.pattern, route);
      if (params) return { ...r, params };
    }
    return null;
  },
};

