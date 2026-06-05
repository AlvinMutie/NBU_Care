import { api } from '../lib/api.js';
import { auth } from '../lib/auth.js';
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

function badgeClass(cat) {
  return cat === 'ROUTINE'
    ? 'badgeRoutine'
    : cat === 'CLINICAL'
      ? 'badgeClinical'
      : cat === 'CRITICAL'
        ? 'badgeCritical'
        : 'badgeCalc';
}

function renderCard(card, { me, uploadsBase }) {
  const imgUrl = card.image?.url ? `${uploadsBase}${card.image.url}` : '';
  return `
  <div class="card" data-id="${card.id}">
    <div class="cardHead">
      <div style="display:flex;gap:10px;align-items:flex-start">
        ${imgUrl ? `<img class="imgThumb" src="${ui.esc(imgUrl)}" alt="card image" />` : `<div class="imgThumb"></div>`}
        <div>
          <div class="cardTitle">${ui.esc(card.title)}</div>
          <div class="cardMeta">
            <span class="badge ${badgeClass(card.category)}">${ui.esc(card.category)}</span>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn btnGhost" data-action="fav" title="Toggle favorite">${card.isFavorite ? '★' : '☆'}</button>
        ${me.role === 'ADMIN' ? `<button class="btn" data-action="edit">Edit</button>` : ''}
        ${me.role === 'ADMIN' ? `<button class="btn btnDanger" data-action="del">Delete</button>` : ''}
        <button class="btn" data-action="toggle">Open</button>
      </div>
    </div>
    <div class="cardBody">
      <div class="panelSub">${ui.esc(card.whenToPerform)}</div>
      <ol class="stepList">
        ${card.steps.map((s) => `<li>${ui.esc(s)}</li>`).join('')}
      </ol>
      ${card.criticalWarnings ? `<div class="warnBox"><b>Critical warnings</b><div style="margin-top:6px">${ui.esc(card.criticalWarnings)}</div></div>` : ''}
      ${card.tips ? `<div class="tipsBox"><b>Tips</b><div style="margin-top:6px">${ui.esc(card.tips)}</div></div>` : ''}
    </div>
  </div>
  `;
}

function openFlashcardModal({ mode, initial, onSave, onUploadImage }) {
  const title = mode === 'create' ? 'New flashcard' : 'Edit flashcard';
  const init = initial || {
    title: '',
    category: 'ROUTINE',
    icon: '',
    whenToPerform: '',
    steps: ['', '', '', '', ''],
    criticalWarnings: '',
    tips: '',
  };

  const body = `
    <div class="formGrid">
      <div class="full">
        <label>Title / Task</label>
        <input id="fcTitle" class="input" value="${ui.esc(init.title)}" />
      </div>
      <div>
        <label>Category</label>
        <select id="fcCategory" class="select">
          ${['ROUTINE','CLINICAL','CRITICAL','CALCULATIONS'].map((c)=>`<option ${init.category===c?'selected':''} value="${c}">${c}</option>`).join('')}
        </select>
      </div>
      <div>
        <label>Icon (optional)</label>
        <input id="fcIcon" class="input" value="${ui.esc(init.icon || '')}" />
        <div class="help">Free text, e.g. clipboard-heart, droplet, alert-triangle.</div>
      </div>
      <div class="full">
        <label>When to perform</label>
        <textarea id="fcWhen" class="textarea">${ui.esc(init.whenToPerform)}</textarea>
      </div>
      <div class="full">
        <label>Steps (max 5)</label>
        ${[0,1,2,3,4].map((i)=>`
          <input class="input" style="margin-top:8px" id="fcStep${i}" placeholder="Step ${i+1}" value="${ui.esc(init.steps?.[i] || '')}" />
        `).join('')}
      </div>
      <div class="full">
        <label>Critical warnings</label>
        <textarea id="fcWarn" class="textarea">${ui.esc(init.criticalWarnings || '')}</textarea>
      </div>
      <div class="full">
        <label>Tips</label>
        <textarea id="fcTips" class="textarea">${ui.esc(init.tips || '')}</textarea>
      </div>
      ${mode === 'edit' ? `
      <div class="full">
        <label>Image</label>
        <input id="fcImage" class="input" type="file" accept="image/*" />
        <div class="help">Upload a new image for this flashcard.</div>
      </div>` : ''}
    </div>
  `;

  const modal = ui.openModal({
    title,
    bodyHtml: body,
    actions: [
      { label: 'Cancel', variant: 'btnGhost', onClick: ({ close }) => close() },
      {
        label: 'Save',
        variant: 'btnPrimary',
        onClick: async ({ close }) => {
          const payload = {
            title: document.getElementById('fcTitle').value.trim(),
            category: document.getElementById('fcCategory').value,
            icon: document.getElementById('fcIcon').value.trim() || null,
            whenToPerform: document.getElementById('fcWhen').value.trim(),
            steps: [0,1,2,3,4].map((i)=>document.getElementById(`fcStep${i}`).value.trim()).filter(Boolean),
            criticalWarnings: document.getElementById('fcWarn').value.trim() || null,
            tips: document.getElementById('fcTips').value.trim() || null,
          };
          try {
            await onSave(payload);
            if (mode === 'edit') {
              const fileInput = document.getElementById('fcImage');
              if (fileInput?.files?.length) {
                await onUploadImage(fileInput.files[0]);
              }
            }
            ui.toast('Saved', 'ok');
            close();
          } catch (e) {
            ui.toast(e.message || 'Save failed', 'danger');
          }
        },
      },
    ],
  });

  return modal;
}

export async function flashcardsScreen({ routeRoot, me }) {
  const cfg = window.NBU_CONFIG || {};
  const uploadsBase = cfg.UPLOADS_BASE || '';

  if (!window.__nbuCategory) window.__nbuCategory = '';
  if (window.__nbuFavoritesOnly === undefined) window.__nbuFavoritesOnly = false;
  if (!window.__nbuQuery) window.__nbuQuery = '';

  routeRoot.innerHTML = `
    <div class="panel">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <div>
          <div class="panelTitle">Flashcards</div>
          <div class="panelSub">Expand cards for step-by-step guidance. Critical warnings are highlighted.</div>
        </div>
        <div class="btnRow">
          ${me.role === 'ADMIN' ? `<button id="newFlashcardBtn" class="btn btnPrimary" type="button">Add flashcard</button>` : ''}
          <button id="refreshFlashcardsBtn" class="btn" type="button">Refresh</button>
        </div>
      </div>
      <div id="flashcardsGrid" class="cardGrid" style="margin-top:14px"></div>
    </div>
  `;

  const searchInput = document.getElementById('searchInput');
  const favoritesOnly = document.getElementById('favoritesOnly');

  // Chips
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

  const grid = document.getElementById('flashcardsGrid');
  let lastData = [];

  async function load() {
    setStateFromSidebar();
    const data = await api.listFlashcards({
      query: queryFromState(),
      category: categoryFromState(),
      favoritesOnly: favoritesOnlyFromState(),
    });
    lastData = data.flashcards || [];
    grid.innerHTML = lastData.map((c) => renderCard(c, { me, uploadsBase })).join('');
  }

  async function refresh() {
    try {
      await load();
    } catch (e) {
      ui.toast(e.message || 'Failed to load flashcards', 'danger');
    }
  }

  document.getElementById('refreshFlashcardsBtn').addEventListener('click', refresh);
  if (me.role === 'ADMIN') {
    document.getElementById('newFlashcardBtn').addEventListener('click', () => {
      openFlashcardModal({
        mode: 'create',
        onSave: async (payload) => {
          await api.createFlashcard(payload);
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
    const card = lastData.find((c) => c.id === id);
    if (!card) return;

    if (action === 'toggle') {
      cardEl.classList.toggle('expanded');
      const btn = cardEl.querySelector('[data-action="toggle"]');
      if (btn) btn.textContent = cardEl.classList.contains('expanded') ? 'Close' : 'Open';
      return;
    }

    if (action === 'fav') {
      try {
        if (card.isFavorite) await api.unfavorite('FLASHCARD', id);
        else await api.favorite('FLASHCARD', id);
        ui.toast('Updated favorites', 'ok');
        await refresh();
      } catch (err) {
        ui.toast(err.message || 'Favorite failed', 'danger');
      }
      return;
    }

    if (action === 'edit' && me.role === 'ADMIN') {
      openFlashcardModal({
        mode: 'edit',
        initial: card,
        onSave: async (payload) => api.updateFlashcard(id, payload),
        onUploadImage: async (file) => {
          const cfg = window.NBU_CONFIG || {};
          const API_BASE = cfg.API_BASE || '';
          const token = auth.getToken();
          const fd = new FormData();
          fd.append('image', file);
          const res = await fetch(`${API_BASE}/flashcards/${id}/image`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: fd,
          });
          if (!res.ok) throw new Error('Image upload failed');
        },
      });
      return;
    }

    if (action === 'del' && me.role === 'ADMIN') {
      ui.openModal({
        title: 'Delete flashcard',
        bodyHtml: `<div class="panelSub">This will permanently delete <b>${ui.esc(card.title)}</b>.</div>`,
        actions: [
          { label: 'Cancel', variant: 'btnGhost', onClick: ({ close }) => close() },
          {
            label: 'Delete',
            variant: 'btnDanger',
            onClick: async ({ close }) => {
              try {
                await api.deleteFlashcard(id);
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

  // Realtime (optional): load socket.io from backend
  (async () => {
    try {
      const cfg = window.NBU_CONFIG || {};
      const base = (cfg.UPLOADS_BASE || '').replace(/\/$/, '');
      const script = document.createElement('script');
      script.src = `${base}/socket.io/socket.io.js`;
      script.onload = () => {
        // eslint-disable-next-line no-undef
        const socket = io(base, { transports: ['websocket', 'polling'] });
        socket.on('flashcards:changed', () => refresh());
      };
      document.body.appendChild(script);
    } catch {
      // ignore
    }
  })();

  await refresh();
}

