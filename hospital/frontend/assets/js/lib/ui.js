function esc(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function panel(title, sub, innerHtml) {
  return `
    <div class="panel">
      <div class="panelTitle">${esc(title)}</div>
      ${sub ? `<div class="panelSub">${esc(sub)}</div>` : ''}
      ${innerHtml || ''}
    </div>
  `;
}

function badge(category) {
  const cls =
    category === 'ROUTINE'
      ? 'badgeRoutine'
      : category === 'CLINICAL'
        ? 'badgeClinical'
        : category === 'CRITICAL'
          ? 'badgeCritical'
          : 'badgeCalc';
  const label =
    category === 'ROUTINE'
      ? 'Routine'
      : category === 'CLINICAL'
        ? 'Clinical'
        : category === 'CRITICAL'
          ? 'Critical'
          : 'Calculations';
  return `<span class="badge ${cls}">${esc(label)}</span>`;
}

function toast(message, type = 'info') {
  const root = document.getElementById('modalRoot');
  const id = `toast-${Date.now()}`;
  const bg =
    type === 'danger'
      ? 'rgba(239,68,68,.18)'
      : type === 'warn'
        ? 'rgba(249,168,38,.18)'
        : type === 'ok'
          ? 'rgba(34,197,94,.14)'
          : 'rgba(255,255,255,.06)';
  const el = document.createElement('div');
  el.id = id;
  el.style.position = 'fixed';
  el.style.bottom = '16px';
  el.style.right = '16px';
  el.style.zIndex = '999';
  el.style.maxWidth = '420px';
  el.style.padding = '10px 12px';
  el.style.borderRadius = '12px';
  el.style.border = '1px solid rgba(255,255,255,.14)';
  el.style.background = bg;
  el.style.backdropFilter = 'blur(8px)';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function openModal({ title, bodyHtml, actions = [] }) {
  const root = document.getElementById('modalRoot');
  root.classList.remove('hidden');
  root.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modalHead">
        <div class="modalTitle">${esc(title)}</div>
        <button class="btn btnGhost" type="button" data-close="1">Close</button>
      </div>
      <div class="modalBody">
        ${bodyHtml}
        <div class="btnRow" style="margin-top:14px;justify-content:flex-end">
          ${actions
            .map(
              (a, idx) =>
                `<button class="btn ${a.variant || ''}" type="button" data-action="${idx}">${esc(a.label)}</button>`,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;

  function close() {
    root.classList.add('hidden');
    root.innerHTML = '';
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  root.addEventListener(
    'click',
    (e) => {
      if (e.target === root) close();
      if (e.target?.dataset?.close) close();
      if (e.target?.dataset?.action) {
        const idx = Number(e.target.dataset.action);
        actions[idx]?.onClick?.({ close });
      }
    },
    { once: false },
  );
  document.addEventListener('keydown', onKey);
  return { close };
}

export const ui = { esc, panel, badge, toast, openModal };

