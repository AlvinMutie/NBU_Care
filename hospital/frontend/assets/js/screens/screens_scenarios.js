import { api } from '../lib/api.js';
import { ui } from '../lib/ui.js';

function categoryFromState() {
  return window.__nbuCategory || '';
}
function favoritesOnlyFromState() {
  return Boolean(window.__nbuFavoritesOnly);
}
function queryFromState() {
  return (window.__nbuQuery || '').toString();
}
function setStateFromSidebar() {
  window.__nbuQuery = document.getElementById('searchInput').value.trim();
  window.__nbuFavoritesOnly = document.getElementById('favoritesOnly').checked;
}

function renderScenario(s, { me }) {
  return `
  <div class="card" data-id="${s.id}">
    <div class="cardHead">
      <div>
        <div class="cardTitle">${ui.esc(s.title)}</div>
        <div class="cardMeta">${ui.badge(s.category)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn btnGhost" data-action="fav" title="Toggle favorite">${s.isFavorite ? '★' : '☆'}</button>
        ${me.role === 'ADMIN' ? `<button class="btn" data-action="edit">Edit</button>` : ''}
        ${me.role === 'ADMIN' ? `<button class="btn btnDanger" data-action="del">Delete</button>` : ''}
        <button class="btn" data-action="toggle">Open</button>
      </div>
    </div>
    <div class="cardBody">
      <div class="panelSub"><b>Problem</b><div style="margin-top:6px">${ui.esc(s.problemText)}</div></div>
      <ol class="stepList">
        ${s.solutionSteps.map((st) => `<li>${ui.esc(st)}</li>`).join('')}
      </ol>
      ${s.formulasText ? `<div class="tipsBox"><b>Formulas used</b><div style="margin-top:6px">${ui.esc(s.formulasText)}</div></div>` : ''}
      ${s.criticalWarnings ? `<div class="warnBox"><b>Critical warnings</b><div style="margin-top:6px">${ui.esc(s.criticalWarnings)}</div></div>` : ''}
    </div>
  </div>`;
}

function openScenarioModal({ mode, initial, onSave }) {
  const init = initial || {
    title: '',
    category: 'CALCULATIONS',
    problemText: '',
    solutionSteps: ['', '', '', ''],
    formulasText: '',
    criticalWarnings: '',
  };

  const body = `
    <div class="formGrid">
      <div class="full">
        <label>Title</label>
        <input id="scTitle" class="input" value="${ui.esc(init.title)}" />
      </div>
      <div>
        <label>Category</label>
        <select id="scCategory" class="select">
          ${['ROUTINE','CLINICAL','CRITICAL','CALCULATIONS'].map((c)=>`<option ${init.category===c?'selected':''} value="${c}">${c}</option>`).join('')}
        </select>
      </div>
      <div class="full">
        <label>Problem statement</label>
        <textarea id="scProblem" class="textarea">${ui.esc(init.problemText)}</textarea>
      </div>
      <div class="full">
        <label>Solution steps (max 12)</label>
        ${Array.from({length:8}).map((_,i)=>`
          <input class="input" style="margin-top:8px" id="scStep${i}" placeholder="Step ${i+1}" value="${ui.esc(init.solutionSteps?.[i] || '')}" />
        `).join('')}
      </div>
      <div class="full">
        <label>Formulas used</label>
        <textarea id="scFormula" class="textarea">${ui.esc(init.formulasText || '')}</textarea>
      </div>
      <div class="full">
        <label>Critical warnings</label>
        <textarea id="scWarn" class="textarea">${ui.esc(init.criticalWarnings || '')}</textarea>
      </div>
    </div>
  `;

  ui.openModal({
    title: mode === 'create' ? 'New scenario' : 'Edit scenario',
    bodyHtml: body,
    actions: [
      { label: 'Cancel', variant: 'btnGhost', onClick: ({ close }) => close() },
      {
        label: 'Save',
        variant: 'btnPrimary',
        onClick: async ({ close }) => {
          const payload = {
            title: document.getElementById('scTitle').value.trim(),
            category: document.getElementById('scCategory').value,
            problemText: document.getElementById('scProblem').value.trim(),
            solutionSteps: Array.from({ length: 8 })
              .map((_, i) => document.getElementById(`scStep${i}`).value.trim())
              .filter(Boolean),
            formulasText: document.getElementById('scFormula').value.trim() || null,
            criticalWarnings: document.getElementById('scWarn').value.trim() || null,
          };
          try {
            await onSave(payload);
            ui.toast('Saved', 'ok');
            close();
          } catch (e) {
            ui.toast(e.message || 'Save failed', 'danger');
          }
        },
      },
    ],
  });
}

export async function scenariosScreen({ routeRoot, me }) {
  routeRoot.innerHTML = `
    <div class="panel">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <div>
          <div class="panelTitle">Scenarios</div>
          <div class="panelSub">Case-based learning with step-by-step solutions and warnings.</div>
        </div>
        <div class="btnRow">
          ${me.role === 'ADMIN' ? `<button id="newScenarioBtn" class="btn btnPrimary" type="button">Add scenario</button>` : ''}
          <button id="refreshScenariosBtn" class="btn" type="button">Refresh</button>
        </div>
      </div>
      <div id="scenariosGrid" class="cardGrid" style="margin-top:14px"></div>
    </div>
  `;

  const searchInput = document.getElementById('searchInput');
  const favoritesOnly = document.getElementById('favoritesOnly');

  document.querySelectorAll('.chipRow .chip').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.category === categoryFromState());
    btn.addEventListener('click', () => {
      window.__nbuCategory = btn.dataset.category;
      document.querySelectorAll('.chipRow .chip').forEach((b) => b.classList.toggle('active', b === btn));
      load();
    });
  });

  searchInput.value = queryFromState();
  favoritesOnly.checked = favoritesOnlyFromState();
  searchInput.addEventListener('input', () => {
    setStateFromSidebar();
    load();
  });
  favoritesOnly.addEventListener('change', () => {
    setStateFromSidebar();
    load();
  });

  const grid = document.getElementById('scenariosGrid');
  let lastData = [];

  async function load() {
    setStateFromSidebar();
    const data = await api.listScenarios({
      query: queryFromState(),
      category: categoryFromState(),
      favoritesOnly: favoritesOnlyFromState(),
    });
    lastData = data.scenarios || [];
    grid.innerHTML = lastData.map((s) => renderScenario(s, { me })).join('');
  }

  async function refresh() {
    try {
      await load();
    } catch (e) {
      ui.toast(e.message || 'Failed to load scenarios', 'danger');
    }
  }

  document.getElementById('refreshScenariosBtn').addEventListener('click', refresh);
  if (me.role === 'ADMIN') {
    document.getElementById('newScenarioBtn').addEventListener('click', () => {
      openScenarioModal({
        mode: 'create',
        onSave: async (payload) => {
          await api.createScenario(payload);
          await refresh();
        },
      });
    });
  }

  grid.addEventListener('click', async (e) => {
    const cardEl = e.target.closest('.card');
    if (!cardEl) return;
    const id = Number(cardEl.dataset.id);
    const action = e.target?.dataset?.action;
    const sc = lastData.find((s) => s.id === id);
    if (!sc) return;

    if (action === 'toggle') {
      cardEl.classList.toggle('expanded');
      const btn = cardEl.querySelector('[data-action="toggle"]');
      if (btn) btn.textContent = cardEl.classList.contains('expanded') ? 'Close' : 'Open';
      return;
    }
    if (action === 'fav') {
      try {
        if (sc.isFavorite) await api.unfavorite('SCENARIO', id);
        else await api.favorite('SCENARIO', id);
        ui.toast('Updated favorites', 'ok');
        await refresh();
      } catch (err) {
        ui.toast(err.message || 'Favorite failed', 'danger');
      }
      return;
    }
    if (action === 'edit' && me.role === 'ADMIN') {
      openScenarioModal({
        mode: 'edit',
        initial: sc,
        onSave: async (payload) => {
          await api.updateScenario(id, payload);
          await refresh();
        },
      });
      return;
    }
    if (action === 'del' && me.role === 'ADMIN') {
      ui.openModal({
        title: 'Delete scenario',
        bodyHtml: `<div class="panelSub">This will permanently delete <b>${ui.esc(sc.title)}</b>.</div>`,
        actions: [
          { label: 'Cancel', variant: 'btnGhost', onClick: ({ close }) => close() },
          {
            label: 'Delete',
            variant: 'btnDanger',
            onClick: async ({ close }) => {
              try {
                await api.deleteScenario(id);
                ui.toast('Deleted', 'ok');
                close();
                await refresh();
              } catch (err) {
                ui.toast(err.message || 'Delete failed', 'danger');
              }
            },
          },
        ],
      });
    }
  });

  await refresh();
}

