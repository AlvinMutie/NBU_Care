import { ui } from '../lib/ui.js';

export async function displayScreen({ routeRoot }) {
  routeRoot.innerHTML = ui.panel(
    'Display Mode',
    'Read-only rotating view for TVs / shared screens.',
    `
    <div class="panelSub">This mode does not require login but only shows non-editable content.</div>
    <div class="btnRow" style="margin-bottom:12px">
      <button id="dispStart" class="btn btnPrimary" type="button">Start rotation</button>
      <button id="dispStop" class="btn" type="button">Stop</button>
    </div>
    <div id="dispBox" class="card"></div>
    `,
  );

  const box = document.getElementById('dispBox');
  let timer = null;
  let items = [];
  let idx = 0;

  async function load() {
    try {
      const cfg = window.NBU_CONFIG || {};
      const base = cfg.API_BASE || '';
      const url = base.replace(/\/api\/?$/, '/api/public/flashcards');
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      items = data.flashcards || [];
    } catch {
      items = [];
    }
  }

  function show() {
    if (!items.length) {
      box.innerHTML = `
        <div class="cardHead"><div><div class="cardTitle">No data</div><div class="cardMeta">Sign in at least once to load content.</div></div></div>
      `;
      return;
    }
    const card = items[idx % items.length];
    idx++;
    box.innerHTML = `
      <div class="cardHead">
        <div>
          <div class="cardTitle">${ui.esc(card.title)}</div>
          <div class="cardMeta">${ui.badge(card.category)}</div>
        </div>
      </div>
      <div class="cardBody" style="max-height:1000px">
        <div class="panelSub">${ui.esc(card.whenToPerform)}</div>
        <ol class="stepList">${card.steps.map((s) => `<li>${ui.esc(s)}</li>`).join('')}</ol>
        ${card.criticalWarnings ? `<div class="warnBox"><b>Critical warnings</b><div style="margin-top:6px">${ui.esc(card.criticalWarnings)}</div></div>` : ''}
      </div>
    `;
  }

  async function start() {
    await load();
    show();
    if (timer) clearInterval(timer);
    timer = setInterval(show, 12000);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  document.getElementById('dispStart').addEventListener('click', start);
  document.getElementById('dispStop').addEventListener('click', stop);
}

