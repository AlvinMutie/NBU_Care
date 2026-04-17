import { ui } from '../lib/ui.js';

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function fmt(n, dp = 2) {
  if (!Number.isFinite(n)) return '';
  return n.toFixed(dp).replace(/\.00$/, '');
}

function validatePositive(n, label) {
  if (n === null || n <= 0) return `${label} must be > 0`;
  return null;
}

export async function calculatorsScreen({ routeRoot }) {
  routeRoot.innerHTML = `
    <div class="panel">
      <div class="panelTitle">Calculators</div>
      <div class="panelSub">
        These calculators validate inputs and show formulas. Always follow your facility protocol and double-check results.
      </div>

      <div class="cardGrid">
        <div class="card expanded">
          <div class="cardHead">
            <div>
              <div class="cardTitle">Dose Calculator (mg/kg)</div>
              <div class="cardMeta">dose_mg = mg_per_kg × weight_kg</div>
            </div>
            <div><button class="btn" data-action="toggle">Open</button></div>
          </div>
          <div class="cardBody">
            <div class="formGrid">
              <div>
                <label>Weight (kg)</label>
                <input id="doseWeight" class="input" type="number" step="0.001" min="0" />
              </div>
              <div>
                <label>Prescribed dose (mg/kg)</label>
                <input id="doseMgKg" class="input" type="number" step="0.01" min="0" />
              </div>
              <div class="full">
                <div id="doseOut" class="warnBox">Enter values to calculate.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card expanded">
          <div class="cardHead">
            <div>
              <div class="cardTitle">Volume Calculator</div>
              <div class="cardMeta">volume_ml = (required_dose_mg / stock_dose_mg) × stock_volume_ml</div>
            </div>
            <div><button class="btn" data-action="toggle">Open</button></div>
          </div>
          <div class="cardBody">
            <div class="formGrid">
              <div>
                <label>Required dose (mg)</label>
                <input id="volReqMg" class="input" type="number" step="0.01" min="0" />
              </div>
              <div>
                <label>Stock dose (mg)</label>
                <input id="volStockMg" class="input" type="number" step="0.01" min="0" />
              </div>
              <div>
                <label>Stock volume (mL)</label>
                <input id="volStockMl" class="input" type="number" step="0.01" min="0" />
              </div>
              <div class="full">
                <div id="volOut" class="warnBox">Enter values to calculate.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card expanded">
          <div class="cardHead">
            <div>
              <div class="cardTitle">IV Fluid Rate (ml/kg/day → ml/hr)</div>
              <div class="cardMeta">ml_hr = (ml_per_kg_day × weight_kg) / 24</div>
            </div>
            <div><button class="btn" data-action="toggle">Open</button></div>
          </div>
          <div class="cardBody">
            <div class="formGrid">
              <div>
                <label>Weight (kg)</label>
                <input id="ivWeight" class="input" type="number" step="0.001" min="0" />
              </div>
              <div>
                <label>Prescription (ml/kg/day)</label>
                <input id="ivMlKgDay" class="input" type="number" step="1" min="0" />
              </div>
              <div class="full">
                <div id="ivOut" class="warnBox">Enter values to calculate.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card expanded">
          <div class="cardHead">
            <div>
              <div class="cardTitle">Saline / Fluid Bolus (ml/kg)</div>
              <div class="cardMeta">bolus_ml = bolus_ml_per_kg × weight_kg</div>
            </div>
            <div><button class="btn" data-action="toggle">Open</button></div>
          </div>
          <div class="cardBody">
            <div class="formGrid">
              <div>
                <label>Weight (kg)</label>
                <input id="bolusWeight" class="input" type="number" step="0.001" min="0" />
              </div>
              <div>
                <label>Bolus (ml/kg)</label>
                <input id="bolusMlKg" class="input" type="number" step="1" min="0" value="10" />
                <div class="help">Typical range often used is 10–20 ml/kg (follow local protocol).</div>
              </div>
              <div class="full">
                <div id="bolusOut" class="warnBox">Enter values to calculate.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card expanded">
          <div class="cardHead">
            <div>
              <div class="cardTitle">Dehydration Deficit (helper)</div>
              <div class="cardMeta">deficit_ml = (%dehydration ÷ 100) × weight_kg × 1000</div>
            </div>
            <div><button class="btn" data-action="toggle">Open</button></div>
          </div>
          <div class="cardBody">
            <div class="formGrid">
              <div>
                <label>Weight (kg)</label>
                <input id="dehyWeight" class="input" type="number" step="0.001" min="0" />
              </div>
              <div>
                <label>Dehydration (%)</label>
                <input id="dehyPct" class="input" type="number" step="0.1" min="0" />
              </div>
              <div>
                <label>Correction period (hours)</label>
                <input id="dehyHours" class="input" type="number" step="1" min="1" value="24" />
              </div>
              <div class="full">
                <div id="dehyOut" class="warnBox">Enter values to calculate.</div>
              </div>
              <div class="full">
                <div class="warnBox">
                  <b>Warning:</b> Dehydration correction depends on electrolytes, shock status, and unit protocol. This helper only computes volumes; it does not prescribe therapy.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card expanded">
          <div class="cardHead">
            <div>
              <div class="cardTitle">Dilution (C1V1 = C2V2)</div>
              <div class="cardMeta">V1 = (C2 × V2) / C1</div>
            </div>
            <div><button class="btn" data-action="toggle">Open</button></div>
          </div>
          <div class="cardBody">
            <div class="formGrid">
              <div>
                <label>C1</label>
                <input id="dilC1" class="input" type="number" step="0.0001" min="0" />
              </div>
              <div>
                <label>C2</label>
                <input id="dilC2" class="input" type="number" step="0.0001" min="0" />
              </div>
              <div>
                <label>V2</label>
                <input id="dilV2" class="input" type="number" step="0.0001" min="0" />
              </div>
              <div class="full">
                <div id="dilOut" class="warnBox">Enter values to calculate.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  // Toggle sections
  routeRoot.querySelectorAll('[data-action="toggle"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      card.classList.toggle('expanded');
      btn.textContent = card.classList.contains('expanded') ? 'Close' : 'Open';
    });
  });

  function doseCalc() {
    const w = num(document.getElementById('doseWeight').value);
    const mgkg = num(document.getElementById('doseMgKg').value);
    const errs = [validatePositive(w, 'Weight'), validatePositive(mgkg, 'Dose (mg/kg)')].filter(Boolean);
    const out = document.getElementById('doseOut');
    if (errs.length) {
      out.textContent = errs[0];
      return;
    }
    const doseMg = mgkg * w;
    out.innerHTML = `<b>Result:</b> ${ui.esc(fmt(doseMg, 3))} mg`;
  }

  function volCalc() {
    const req = num(document.getElementById('volReqMg').value);
    const stockMg = num(document.getElementById('volStockMg').value);
    const stockMl = num(document.getElementById('volStockMl').value);
    const errs = [
      validatePositive(req, 'Required dose (mg)'),
      validatePositive(stockMg, 'Stock dose (mg)'),
      validatePositive(stockMl, 'Stock volume (mL)'),
    ].filter(Boolean);
    const out = document.getElementById('volOut');
    if (errs.length) {
      out.textContent = errs[0];
      return;
    }
    const vol = (req / stockMg) * stockMl;
    out.innerHTML = `<b>Result:</b> ${ui.esc(fmt(vol, 3))} mL`;
  }

  function ivCalc() {
    const w = num(document.getElementById('ivWeight').value);
    const mlkgd = num(document.getElementById('ivMlKgDay').value);
    const errs = [validatePositive(w, 'Weight'), validatePositive(mlkgd, 'ml/kg/day')].filter(Boolean);
    const out = document.getElementById('ivOut');
    if (errs.length) {
      out.textContent = errs[0];
      return;
    }
    const rate = (mlkgd * w) / 24;
    out.innerHTML = `<b>Result:</b> ${ui.esc(fmt(rate, 3))} mL/hr`;
  }

  function bolusCalc() {
    const w = num(document.getElementById('bolusWeight').value);
    const mlkg = num(document.getElementById('bolusMlKg').value);
    const errs = [validatePositive(w, 'Weight'), validatePositive(mlkg, 'Bolus (ml/kg)')].filter(Boolean);
    const out = document.getElementById('bolusOut');
    if (errs.length) {
      out.textContent = errs[0];
      return;
    }
    const total = mlkg * w;
    out.innerHTML = `<b>Result:</b> ${ui.esc(fmt(total, 1))} mL total bolus`;
  }

  function dehyCalc() {
    const w = num(document.getElementById('dehyWeight').value);
    const pct = num(document.getElementById('dehyPct').value);
    const hours = num(document.getElementById('dehyHours').value);
    const errs = [
      validatePositive(w, 'Weight'),
      pct === null || pct < 0 ? 'Dehydration (%) must be ≥ 0' : null,
      validatePositive(hours, 'Correction hours'),
    ].filter(Boolean);
    const out = document.getElementById('dehyOut');
    if (errs.length) {
      out.textContent = errs[0];
      return;
    }
    const deficitMl = (pct / 100) * w * 1000;
    const rateMlHr = deficitMl / hours;
    out.innerHTML = `<b>Deficit:</b> ${ui.esc(fmt(deficitMl, 1))} mL • <b>Deficit rate:</b> ${ui.esc(fmt(rateMlHr, 2))} mL/hr over ${ui.esc(fmt(hours, 0))} hr`;
  }

  function dilCalc() {
    const c1 = num(document.getElementById('dilC1').value);
    const c2 = num(document.getElementById('dilC2').value);
    const v2 = num(document.getElementById('dilV2').value);
    const errs = [validatePositive(c1, 'C1'), validatePositive(c2, 'C2'), validatePositive(v2, 'V2')].filter(Boolean);
    const out = document.getElementById('dilOut');
    if (errs.length) {
      out.textContent = errs[0];
      return;
    }
    const v1 = (c2 * v2) / c1;
    out.innerHTML = `<b>Result:</b> V1 = ${ui.esc(fmt(v1, 4))}`;
  }

  ['doseWeight', 'doseMgKg'].forEach((id) => document.getElementById(id).addEventListener('input', doseCalc));
  ['volReqMg', 'volStockMg', 'volStockMl'].forEach((id) => document.getElementById(id).addEventListener('input', volCalc));
  ['ivWeight', 'ivMlKgDay'].forEach((id) => document.getElementById(id).addEventListener('input', ivCalc));
  ['bolusWeight', 'bolusMlKg'].forEach((id) => document.getElementById(id).addEventListener('input', bolusCalc));
  ['dehyWeight', 'dehyPct', 'dehyHours'].forEach((id) => document.getElementById(id).addEventListener('input', dehyCalc));
  ['dilC1', 'dilC2', 'dilV2'].forEach((id) => document.getElementById(id).addEventListener('input', dilCalc));
}

