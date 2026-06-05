import { api } from '../lib/api.js';
import { ui } from '../lib/ui.js';

export async function adminUsersScreen({ routeRoot, me }) {
  if (me.role !== 'ADMIN') {
    routeRoot.innerHTML = ui.panel('Forbidden', 'Admin access only.', '');
    return;
  }

  routeRoot.innerHTML = ui.panel(
    'User management',
    'Create nurse/admin accounts for multi-user access.',
    `
    <div class="formGrid" style="max-width:760px">
      <div>
        <label>Username</label>
        <input id="uUsername" class="input" placeholder="e.g. nurse01" />
      </div>
      <div>
        <label>Full name</label>
        <input id="uFullName" class="input" placeholder="e.g. Nurse A" />
      </div>
      <div>
        <label>Role</label>
        <select id="uRole" class="select">
          <option value="NURSE">NURSE</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <div>
        <label>Temporary password</label>
        <input id="uPassword" class="input" type="password" placeholder="Min 10 chars" />
      </div>
      <div class="full btnRow">
        <button id="createUserBtn" class="btn btnPrimary" type="button">Create user</button>
      </div>
      <div class="full">
        <div class="warnBox">
          <b>Safety:</b> Enforce password changes via your local policy. For LAN deployments, restrict admin access.
        </div>
      </div>
    </div>
    `,
  );

  document.getElementById('createUserBtn').addEventListener('click', async () => {
    const payload = {
      username: document.getElementById('uUsername').value.trim(),
      fullName: document.getElementById('uFullName').value.trim(),
      role: document.getElementById('uRole').value,
      password: document.getElementById('uPassword').value,
    };
    try {
      await api.createUser(payload);
      ui.toast('User created', 'ok');
      document.getElementById('uUsername').value = '';
      document.getElementById('uFullName').value = '';
      document.getElementById('uPassword').value = '';
    } catch (e) {
      ui.toast(e.message || 'Create user failed', 'danger');
    }
  });
}

