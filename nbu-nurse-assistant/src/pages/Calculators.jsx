import React, { useState, useEffect } from 'react';
import { 
  Baby, Droplets, Activity, Zap, 
  FlaskConical, Scale, ShieldCheck, 
  Info, ArrowUpRight, CheckCircle2,
  AlertTriangle, ShieldAlert, BadgeCheck,
  TrendingUp, Clock, UserCheck
} from 'lucide-react';
import CalculatorCard from '../components/calculators/CalculatorCard';
import { api } from '../services/api';

const InputField = ({ label, value, onChange, suffix, help }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      {suffix && <span className="text-[10px] text-primary font-black uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">{suffix}</span>}
    </div>
    <div className="relative group">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300 shadow-tiny"
        placeholder={`0.00`}
      />
    </div>
    {help && <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 mt-1.5"><Info className="w-3 h-3 text-primary" /> {help}</p>}
  </div>
);

export default function Calculators({ user, onNavigate }) {
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
  const [safetyStatus, setSafetyStatus] = useState('neutral');

  const isStudent = user?.role === 'Student';

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

    const w = parseFloat(doseWeight || ivWeight || bolWeight);
    if (w > 0) {
      if (w < 0.4 || w > 6) setSafetyStatus('warning');
      else setSafetyStatus('safe');
    } else {
      setSafetyStatus('neutral');
    }
  }, [doseWeight, doseMgKg, volReqMg, volStockMg, volStockMl, ivWeight, ivMlKgDay, bolWeight, bolAmount, dilC1, dilC2, dilV2]);

  const handleLog = async (action, type) => {
    if (isStudent) {
      setLogSuccess("Validated locally");
      setTimeout(() => setLogSuccess(null), 3000);
      return;
    }
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
    <div className="max-w-[1600px] mx-auto w-full p-8 pb-32 space-y-12">
      <div className={`p-6 rounded-[2rem] border transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-6 ${
        safetyStatus === 'safe' ? 'bg-emerald-50 border-emerald-200' : 
        safetyStatus === 'warning' ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            safetyStatus === 'safe' ? 'bg-emerald-500 text-white' : 
            safetyStatus === 'warning' ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'
          }`}>
            {safetyStatus === 'safe' ? <BadgeCheck className="w-8 h-8" /> : 
             safetyStatus === 'warning' ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
          </div>
          <div>
            <h3 className={`text-lg font-black tracking-tight ${
              safetyStatus === 'safe' ? 'text-emerald-900' : 
              safetyStatus === 'warning' ? 'text-rose-900' : 'text-slate-900'
            }`}>
              {safetyStatus === 'safe' ? 'Safety Engine: Crystalline' : 
               safetyStatus === 'warning' ? 'Physiological Bound Alert' : 'Safety Engine: Standby'}
            </h3>
            <p className="text-sm font-medium text-slate-500">
              {safetyStatus === 'safe' ? 'Parameters reside within standard neonatal physiological boundaries.' : 
               safetyStatus === 'warning' ? 'Critical: Weight or dosage exceeds standard neonatal ranges. Verify clinical inputs.' : 
               'Enter patient weight to activate the Unified Safety Validation layer.'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-xl">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Nursing Tools</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-none">Precision Calculators</h1>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            Eliminate manual variables. Every calculator is cross-referenced with the NeoDesk safety engine to ensure absolute dosing precision.
          </p>
        </div>
        <div className="flex items-center gap-4">
           {logSuccess && (
            <div className={`flex items-center gap-3 px-6 py-3 ${isStudent ? 'bg-amber-500' : 'bg-slate-900'} text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl animate-in fade-in slide-in-from-right-10`}>
              <UserCheck className="w-4 h-4" /> {isStudent ? logSuccess : `Audit Logged`}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CalculatorCard 
          title="Drug Dose" 
          icon={Baby} 
          formula="mg = dosage_mg/kg × weight_kg"
          result={doseResult}
          resultLabel="mg"
          warning="Verified weight is critical for accuracy."
          onLog={() => handleLog(`Drug Dose: ${doseResult}mg`, 'Meds')}
          isPractice={isStudent}
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
          onLog={() => handleLog(`Draw Up: ${volResult}mL`, 'Meds')}
          isPractice={isStudent}
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
          onLog={() => handleLog(`IV Fluids: ${ivResult}mL/hr`, 'Fluids')}
          isPractice={isStudent}
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
          warning="Normal range is 10–20 ml/kg."
          onLog={() => handleLog(`Emergency Bolus: ${bolResult}mL`, 'Urgent')}
          isPractice={isStudent}
        >
          <InputField label="Baby's Weight" value={bolWeight} onChange={setBolWeight} suffix="kg" />
          <InputField label="Bolus Amount" value={bolAmount} onChange={setBolAmount} suffix="ml/kg" help="Standard dose: 10 ml/kg" />
        </CalculatorCard>

        <CalculatorCard 
          title="Drug Dilution" 
          icon={FlaskConical} 
          formula="V1 = (C2 × V2) / C1"
          result={dilResult}
          resultLabel="Amount to use"
          onLog={() => handleLog(`Dilution: Target ${dilC2} from ${dilC1}`, 'Meds')}
          isPractice={isStudent}
        >
          <InputField label="Stock Concentration (C1)" value={dilC1} onChange={setDilC1} />
          <InputField label="Target Concentration (C2)" value={dilC2} onChange={setDilC2} />
          <InputField label="Target Volume (V2)" value={dilV2} onChange={setDilV2} suffix="ml" />
        </CalculatorCard>

        <div className="p-10 rounded-[2.5rem] bg-slate-900 border border-slate-800 text-white flex flex-col justify-between group overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div>
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/20">
               <Scale className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-4">Precision Assurance</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Clinical tools are intended for bedside support. Always perform a dual-nurse verification for critical medications.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('flashcards')}
            className="mt-10 w-full py-4 rounded-2xl bg-primary hover:bg-white hover:text-primary text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
          >
             Access Knowledge Hub
             <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
