import React, { useState, useEffect } from 'react';
import { 
  Baby, 
  Droplets, 
  Activity, 
  Zap, 
  FlaskConical, 
  Scale,
  ShieldCheck,
  Info,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import CalculatorCard from '../components/calculators/CalculatorCard';
import { api } from '../services/api';

const InputField = ({ label, value, onChange, suffix, help }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-xs font-semibold text-slate-700">{label}</label>
      {suffix && <span className="text-[10px] text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">{suffix}</span>}
    </div>
    <div className="relative group">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-900 outline-none placeholder:text-slate-300"
        placeholder={`0.00`}
      />
    </div>
    {help && <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5 mt-1"><Info className="w-3 h-3" /> {help}</p>}
  </div>
);

export default function Calculators() {
  const [doseWeight, setDoseWeight] = useState('');
  const [doseMgKg, setDoseMgKg] = useState('');
  const [doseResult, setDoseResult] = useState(null);

  const [volReqMg, setVolReqMg] = useState('');
  const [volStockMg, setVolStockMg] = useState('');
  const [volStockMl, setVolStockMl] = useState('');
  const [volResult, setVolResult] = useState(null);

  const [ivWeight, setIvWeight] = useState('');
  const [ivMlKgDay, setIvMlKgDay] = useState('');
  const [ivResult, setIvResult] = useState(null);

  const [bolWeight, setBolWeight] = useState('');
  const [bolAmount, setBolAmount] = useState('10');
  const [bolResult, setBolResult] = useState(null);

  const [dilC1, setDilC1] = useState('');
  const [dilC2, setDilC2] = useState('');
  const [dilV2, setDilV2] = useState('');
  const [dilResult, setDilResult] = useState(null);

  const [logSuccess, setLogSuccess] = useState(null);

  useEffect(() => {
    if (doseWeight && doseMgKg) setDoseResult((parseFloat(doseWeight) * parseFloat(doseMgKg)).toFixed(2));
    else setDoseResult(null);

    if (volReqMg && volStockMg && volStockMl) setVolResult(((parseFloat(volReqMg) / parseFloat(volStockMg)) * parseFloat(volStockMl)).toFixed(2));
    else setVolResult(null);

    if (ivWeight && ivMlKgDay) setIvResult(((parseFloat(ivWeight) * parseFloat(ivMlKgDay)) / 24).toFixed(2));
    else setIvResult(null);

    if (bolWeight && bolAmount) setBolResult((parseFloat(bolWeight) * parseFloat(bolAmount)).toFixed(1));
    else setBolResult(null);

    if (dilC1 && dilC2 && dilV2) setDilResult(((parseFloat(dilC2) * parseFloat(dilV2)) / parseFloat(dilC1)).toFixed(2));
    else setDilResult(null);
  }, [doseWeight, doseMgKg, volReqMg, volStockMg, volStockMl, ivWeight, ivMlKgDay, bolWeight, bolAmount, dilC1, dilC2, dilV2]);

  const handleLog = async (action, type) => {
    try {
      const res = await api.createLog({ action, type, status: 'Checked' });
      if (res.success) {
        setLogSuccess(action);
        setTimeout(() => setLogSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Logging failed', err);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full p-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-8 relative">
        <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Nursing Tools</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Treatment Calculators</h1>
          <p className="text-sm text-slate-500">Quick, verified calculations to help you care for your patients safely.</p>
        </div>
        <div className="flex items-center gap-4">
          {logSuccess && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 className="w-3.5 h-3.5" /> Logged: {logSuccess}
            </div>
          )}
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Verified & Up to Date</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CalculatorCard 
          title="Drug Dose" 
          icon={Baby} 
          formula="mg = dosage_mg/kg × weight_kg"
          result={doseResult}
          resultLabel="mg"
          warning="Always double-check this result with a colleague before giving the drug."
          onLog={() => handleLog(`Drug Dose: ${doseResult}mg for ${doseWeight}kg baby`, 'Meds')}
        >
          <InputField label="Baby's Weight" value={doseWeight} onChange={setDoseWeight} suffix="kg" />
          <InputField label="Prescribed Dose" value={doseMgKg} onChange={setDoseMgKg} suffix="mg/kg" />
        </CalculatorCard>

        <CalculatorCard 
          title="Volume to Draw Up" 
          icon={Droplets} 
          formula="ml = (required_mg / stock_mg) × stock_ml"
          result={volResult}
          resultLabel="mL"
          onLog={() => handleLog(`Draw Up: ${volResult}mL (${volReqMg}mg required)`, 'Meds')}
        >
          <InputField label="Dose Needed" value={volReqMg} onChange={setVolReqMg} suffix="mg" />
          <InputField label="Stock Strength" value={volStockMg} onChange={setVolStockMg} suffix="mg" />
          <InputField label="Stock Volume" value={volStockMl} onChange={setVolStockMl} suffix="ml" />
        </CalculatorCard>

        <CalculatorCard 
          title="IV Fluid Rate" 
          icon={Activity} 
          formula="ml/hr = (fluid_ml/kg/day × kg) / 24"
          result={ivResult}
          resultLabel="mL/hr"
          onLog={() => handleLog(`IV Fluids: ${ivResult}mL/hr for ${ivWeight}kg baby`, 'Fluids')}
        >
          <InputField label="Baby's Weight" value={ivWeight} onChange={setIvWeight} suffix="kg" />
          <InputField label="Prescribed Fluid" value={ivMlKgDay} onChange={setIvMlKgDay} suffix="ml/kg/day" />
        </CalculatorCard>

        <CalculatorCard 
          title="Emergency Bolus" 
          icon={Zap} 
          formula="bolus_ml = bolus_rate_ml/kg × kg"
          result={bolResult}
          resultLabel="mL total"
          warning="Normal range is 10–20 ml/kg. Always confirm with the doctor before giving."
          onLog={() => handleLog(`Emergency Bolus: ${bolResult}mL for ${bolWeight}kg baby`, 'Urgent')}
        >
          <InputField label="Baby's Weight" value={bolWeight} onChange={setBolWeight} suffix="kg" />
          <InputField label="Bolus Amount" value={bolAmount} onChange={setBolAmount} suffix="ml/kg" help="Standard starting dose: 10 ml/kg" />
        </CalculatorCard>

        <CalculatorCard 
          title="Drug Dilution" 
          icon={FlaskConical} 
          formula="V1 = (C2 × V2) / C1"
          result={dilResult}
          resultLabel="Amount to use"
          onLog={() => handleLog(`Dilution: Target ${dilC2} from ${dilC1} (Total ${dilV2}mL)`, 'Meds')}
        >
          <InputField label="Stock Concentration (C1)" value={dilC1} onChange={setDilC1} />
          <InputField label="Target Concentration (C2)" value={dilC2} onChange={setDilC2} />
          <InputField label="Target Volume (V2)" value={dilV2} onChange={setDilV2} suffix="ml" />
        </CalculatorCard>

        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
               <Scale className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-4">A friendly reminder</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              These calculators are helpful tools, but always verify the result with a colleague and follow your unit's official guidelines.
            </p>
          </div>
          <button className="mt-8 relative w-full py-3 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
             Open Procedure Library
             <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
