import { api } from './lib/api.js';
import { auth } from './lib/auth.js';
import { ui } from './lib/ui.js';
import { routes } from './routes.js';

const routeRoot = document.getElementById('routeRoot');
const logoutBtn = document.getElementById('logoutBtn');
const netStatus = document.getElementById('netStatus');
const meBox = document.getElementById('meBox');
const sidebar = document.getElementById('sidebar');

let currentRoute = '';

function setNet(ok) {
  if (ok) {
    netStatus.textContent = 'Online';
    netStatus.classList.remove('pillWarn');
    netStatus.classList.add('pillOk');
  } else {
    netStatus.textContent = 'Offline';
    netStatus.classList.add('pillWarn');
    netStatus.classList.remove('pillOk');
  }
}

async function refreshMe() {
  const me = auth.getUser();
  if (!me) {
    meBox.textContent = 'Not signed in';
    logoutBtn.classList.add('hidden');
    document.querySelectorAll('.adminOnly').forEach((el) => el.classList.add('hidden'));
    return null;
  }

  meBox.textContent = `${me.fullName} (@${me.username}) • ${me.role}`;
  logoutBtn.classList.remove('hidden');
  if (me.role === 'ADMIN') {
    document.querySelectorAll('.adminOnly').forEach((el) => el.classList.remove('hidden'));
  } else {
    document.querySelectorAll('.adminOnly').forEach((el) => el.classList.add('hidden'));
  }
  return me;
}

function setActiveNav(routeKey) {
  document.querySelectorAll('.navLink').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === routeKey);
  });
}

async function render() {
  const hash = window.location.hash || '#/flashcards';
  const route = hash.replace(/^#\//, '');
  if (route === currentRoute) return;
  currentRoute = route;

  const me = await refreshMe();

  // Lock search/filter UI for non-list pages
  const searchInput = document.getElementById('searchInput');
  const favoritesOnly = document.getElementById('favoritesOnly');
  const chipRow = sidebar.querySelector('.chipRow');
  const showFilters = route.startsWith('flashcards') || route.startsWith('scenarios');
  searchInput.disabled = !showFilters;
  favoritesOnly.disabled = !showFilters;
  chipRow.querySelectorAll('button').forEach((b) => (b.disabled = !showFilters));

  if (!me && !route.startsWith('login') && !route.startsWith('display')) {
    window.location.hash = '#/login';
    return;
  }

  const match = routes.match(route);
  if (!match) {
    routeRoot.innerHTML = ui.panel('Not found', 'This page does not exist.', `<a class="btn" href="#/flashcards">Go home</a>`);
    return;
  }

  setActiveNav(match.navKey);
  await match.render({ routeRoot, params: match.params, me });
}

async function healthLoop() {
  while (true) {
    try {
      await api.health();
      setNet(true);
    } catch {
      setNet(false);
    }
    await new Promise((r) => setTimeout(r, 2500));
  }
}

logoutBtn.addEventListener('click', () => {
  auth.logout();
  window.location.hash = '#/login';
});

window.addEventListener('hashchange', render);

render();
healthLoop();

