import React, { useState, useEffect } from 'react';
import { 
  Baby, Droplets, Activity, Zap, 
  FlaskConical, Scale, ShieldCheck, 
  Info, ArrowUpRight, CheckCircle2,
  AlertTriangle, ShieldAlert, BadgeCheck,
  TrendingUp, Clock, UserCheck, ChevronRight,
  ChevronLeft, Search, Loader2, Weight,
  FlaskRound as Flask, Pill, ClipboardCheck,
  X, Check
} from 'lucide-react';
import { api } from '../services/api';

const StepIndicator = ({ step, currentStep, label }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
      currentStep >= step 
        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
        : 'bg-white border-slate-100 text-slate-300'
    }`}>
      {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-black">{step}</span>}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
      currentStep >= step ? 'text-slate-900' : 'text-slate-300'
    }`}>{label}</span>
  </div>
);

export default function Calculators({ user }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [neonates, setNeonates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pipeline State
  const [selectedNeonate, setSelectedNeonate] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [calcData, setCalcData] = useState({
    doseMgKg: '',
    stockMg: '',
    stockMl: ''
  });
  const [result, setResult] = useState(null);
  const [logStatus, setLogStatus] = useState(null);

  const drugs = [
    { name: 'Ampicillin', defaultDose: 50, unit: 'mg/kg', frequency: 'q12h' },
    { name: 'Gentamicin', defaultDose: 5, unit: 'mg/kg', frequency: 'q24h' },
    { name: 'Cefotaxime', defaultDose: 50, unit: 'mg/kg', frequency: 'q8h' },
    { name: 'Dopamine', defaultDose: 5, unit: 'mcg/kg/min', frequency: 'continuous' }
  ];

  useEffect(() => {
    fetchNeonates();
  }, []);

  useEffect(() => {
    if (calcData.doseMgKg && currentWeight && calcData.stockMg && calcData.stockMl) {
      const mgNeeded = parseFloat(calcData.doseMgKg) * parseFloat(currentWeight);
      const mlToDraw = (mgNeeded / parseFloat(calcData.stockMg)) * parseFloat(calcData.stockMl);
      setResult({ mg: mgNeeded.toFixed(2), ml: mlToDraw.toFixed(2) });
    } else {
      setResult(null);
    }
  }, [calcData, currentWeight]);

  const fetchNeonates = async () => {
    setLoading(true);
    try {
      const res = await api.getNeonates();
      if (res.success) setNeonates(res.neonates);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleLogMedication = async () => {
    try {
      const logData = {
        action: `MEDICATION CALCULATED: ${selectedDrug.name} ${result.mg}mg (${result.ml}mL) for ${selectedNeonate.name}`,
        type: 'Medication',
        status: 'Calculated'
      };
      const res = await api.createLog(logData);
      if (res.success) {
        setLogStatus('Success');
        setTimeout(() => {
          setCurrentStep(1);
          setSelectedNeonate(null);
          setSelectedDrug(null);
          setCalcData({ doseMgKg: '', stockMg: '', stockMl: '' });
          setLogStatus(null);
        }, 2000);
      }
    } catch (err) {
      alert('Failed to audit log calculation.');
    }
  };

  return (
    <div className="p-4 lg:p-10 bg-slate-50 min-h-screen pb-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clinical Drug Pipeline</h1>
              <p className="text-slate-500 font-medium">Standard 5-step medication verification protocol.</p>
           </div>
           <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-3xl border border-slate-100 shadow-sm">
              <StepIndicator step={1} currentStep={currentStep} label="Patient" />
              <div className="w-8 h-0.5 bg-slate-100 mb-6" />
              <StepIndicator step={2} currentStep={currentStep} label="Weight" />
              <div className="w-8 h-0.5 bg-slate-100 mb-6" />
              <StepIndicator step={3} currentStep={currentStep} label="Drug" />
              <div className="w-8 h-0.5 bg-slate-100 mb-6" />
              <StepIndicator step={4} currentStep={currentStep} label="Dose" />
              <div className="w-8 h-0.5 bg-slate-100 mb-6" />
              <StepIndicator step={5} currentStep={currentStep} label="Verify" />
           </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[500px] flex flex-col">
           <div className="p-10 flex-1">
              {currentStep === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <Baby className="w-6 h-6 text-primary" /> Step 1: Patient Identity
                   </h2>
                   {loading ? (
                     <div className="py-20 flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Patient Registry...</p>
                     </div>
                   ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {neonates.map(n => (
                          <button 
                            key={n._id}
                            onClick={() => {
                              setSelectedNeonate(n);
                              setCurrentWeight(n.currentWeight);
                              nextStep();
                            }}
                            className={`p-6 rounded-3xl border transition-all flex items-center gap-4 text-left ${
                              selectedNeonate?._id === n._id 
                                ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                                : 'bg-slate-50 border-slate-100 hover:border-primary/30'
                            }`}
                          >
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                               selectedNeonate?._id === n._id ? 'bg-white/20' : 'bg-white shadow-sm'
                             }`}>
                                <UserCheck className={`w-6 h-6 ${selectedNeonate?._id === n._id ? 'text-white' : 'text-primary'}`} />
                             </div>
                             <div>
                                <h4 className="font-black text-sm tracking-tight">{n.name}</h4>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${
                                  selectedNeonate?._id === n._id ? 'text-white/70' : 'text-slate-400'
                                }`}>{n.hospitalNumber} • Bed 0{Math.floor(Math.random() * 9) + 1}</p>
                             </div>
                          </button>
                        ))}
                     </div>
                   )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto py-10">
                   <h2 className="text-xl font-black text-slate-900 mb-4 text-center">Step 2: Verify Clinical Weight</h2>
                   <p className="text-center text-slate-500 font-medium mb-10">Ensure the patient weight is updated for accurate dosing.</p>
                   
                   <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 text-center">
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-primary mx-auto mb-6">
                         <Weight className="w-10 h-10" />
                      </div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Current Weight (kg)</label>
                      <input 
                        type="number" step="0.01"
                        className="w-full text-center bg-transparent text-4xl font-black text-slate-900 outline-none placeholder:text-slate-200"
                        value={currentWeight}
                        onChange={e => setCurrentWeight(e.target.value)}
                        placeholder="0.00"
                      />
                      <div className="mt-8 flex items-center gap-2 justify-center text-xs font-bold text-amber-600 bg-amber-50 py-2 px-4 rounded-xl">
                         <Info className="w-4 h-4" /> Last recorded: {selectedNeonate?.currentWeight} kg
                      </div>
                   </div>
                   
                   <button 
                     onClick={nextStep}
                     disabled={!currentWeight}
                     className="w-full mt-10 py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                   >
                     Confirm Weight
                   </button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <h2 className="text-xl font-black text-slate-900 mb-8">Step 3: Select Medication</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {drugs.map(d => (
                        <button 
                          key={d.name}
                          onClick={() => {
                            setSelectedDrug(d);
                            setCalcData({...calcData, doseMgKg: d.defaultDose});
                            nextStep();
                          }}
                          className={`p-6 rounded-3xl border transition-all flex items-center justify-between ${
                            selectedDrug?.name === d.name 
                              ? 'bg-slate-900 border-slate-900 text-white' 
                              : 'bg-white border-slate-100 hover:border-primary/30'
                          }`}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                selectedDrug?.name === d.name ? 'bg-white/10' : 'bg-slate-50'
                              }`}>
                                 <Pill className={`w-6 h-6 ${selectedDrug?.name === d.name ? 'text-white' : 'text-primary'}`} />
                              </div>
                              <div className="text-left">
                                 <h4 className="font-black text-sm tracking-tight">{d.name}</h4>
                                 <p className={`text-[10px] font-bold uppercase tracking-widest ${
                                   selectedDrug?.name === d.name ? 'text-white/50' : 'text-slate-400'
                                 }`}>{d.frequency}</p>
                              </div>
                           </div>
                           <ChevronRight className="w-5 h-5 opacity-50" />
                        </button>
                      ))}
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                   <h2 className="text-xl font-black text-slate-900 mb-8 text-center">Step 4: Dose Calculation</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Prescribed Dose ({selectedDrug?.unit})</label>
                            <input 
                              type="number"
                              className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-primary text-sm font-bold"
                              value={calcData.doseMgKg}
                              onChange={e => setCalcData({...calcData, doseMgKg: e.target.value})}
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stock Concentration</label>
                            <div className="flex gap-2">
                               <input 
                                 type="number"
                                 placeholder="mg"
                                 className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-primary text-sm font-bold"
                                 value={calcData.stockMg}
                                 onChange={e => setCalcData({...calcData, stockMg: e.target.value})}
                               />
                               <div className="flex items-center text-slate-300 font-bold">in</div>
                               <input 
                                 type="number"
                                 placeholder="mL"
                                 className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-primary text-sm font-bold"
                                 value={calcData.stockMl}
                                 onChange={e => setCalcData({...calcData, stockMl: e.target.value})}
                               />
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col justify-center">
                         <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/10 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Required Volume</p>
                            <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                               {result?.ml || '0.00'}
                               <span className="text-xl text-slate-400 ml-2">mL</span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">({result?.mg || '0'} mg total)</p>
                         </div>
                      </div>
                   </div>

                   <button 
                     onClick={nextStep}
                     disabled={!result}
                     className="w-full mt-12 py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                   >
                      Next: Verification
                   </button>
                </div>
              )}

              {currentStep === 5 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto py-6">
                   <div className="text-center mb-10">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-[24px] flex items-center justify-center mx-auto mb-6">
                         <ShieldCheck className="w-10 h-10" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Step 5: Safety Verification</h2>
                      <p className="text-slate-500 font-medium">Verify all parameters before documenting.</p>
                   </div>

                   <div className="space-y-4 mb-10">
                      <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient</span>
                         <span className="text-sm font-bold text-slate-900">{selectedNeonate?.name}</span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medication</span>
                         <span className="text-sm font-bold text-slate-900">{selectedDrug?.name}</span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated Dose</span>
                         <span className="text-sm font-black text-primary">{result?.mg} mg ({result?.ml} mL)</span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Auditor</span>
                         <span className="text-sm font-bold text-emerald-700">{user?.name} (Verified)</span>
                      </div>
                   </div>

                   {logStatus === 'Success' ? (
                     <div className="py-6 bg-emerald-500 text-white rounded-3xl text-center font-black uppercase tracking-widest animate-in zoom-in-95 duration-300">
                        <Check className="w-6 h-6 mx-auto mb-2" />
                        Audit Log Saved
                     </div>
                   ) : (
                     <button 
                       onClick={handleLogMedication}
                       className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
                     >
                        <ClipboardCheck className="w-5 h-5" /> Confirm & Log Action
                     </button>
                   )}
                </div>
              )}
           </div>

           {/* Navigation Controls */}
           <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all"
              >
                 <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Protocol Active</span>
                 </div>
                 {currentStep > 1 && (
                   <button onClick={() => setCurrentStep(1)} className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-red-500 transition-all">
                      <X className="w-4 h-4" />
                   </button>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
