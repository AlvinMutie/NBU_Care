import { auth } from '../lib/auth.js';
import { api } from '../lib/api.js';
import { ui } from '../lib/ui.js';
import { flashcardsScreen } from './screens_flashcards.js';
import { calculatorsScreen } from './screens_calculators.js';
import { scenariosScreen } from './screens_scenarios.js';
import { adminUsersScreen } from './screens_admin_users.js';
import { displayScreen } from './screens_display.js';

export const pages = {
  async login({ routeRoot }) {
    routeRoot.innerHTML = ui.panel(
      'Sign in',
      'Use your staff username and password.',
      `
      <div class="formGrid" style="max-width:520px">
        <div class="full">
          <label>Username</label>
          <input id="loginUsername" class="input" autocomplete="username" />
        </div>
        <div class="full">
          <label>Password</label>
          <input id="loginPassword" class="input" type="password" autocomplete="current-password" />
          <div class="help">Admins can create nurse accounts in the Users page.</div>
        </div>
        <div class="full btnRow">
          <button id="loginBtn" class="btn btnPrimary" type="button">Login</button>
        </div>
      </div>
      `,
    );

    document.getElementById('loginBtn').addEventListener('click', async () => {
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value;
      try {
        const res = await api.login(username, password);
        auth.setSession(res);
        ui.toast('Signed in', 'ok');
        window.location.hash = '#/flashcards';
      } catch (e) {
        ui.toast(e.message || 'Login failed', 'danger');
      }
    });
  },

  async flashcards(ctx) {
    return flashcardsScreen(ctx);
  },

  async calculators(ctx) {
    return calculatorsScreen(ctx);
  },

  async scenarios(ctx) {
    return scenariosScreen(ctx);
  },

  async adminUsers(ctx) {
    return adminUsersScreen(ctx);
  },

  async display(ctx) {
    return displayScreen(ctx);
  },
};

