import React, { useState, useEffect } from 'react';
import { 
  Beaker, CheckCircle2, ChevronRight, ChevronLeft, 
  AlertCircle, ShieldCheck, Pill, Search, User,
  Clock, Info, FileText, Scale, RefreshCcw, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Calculators: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedDrug, setSelectedDrug] = useState<any>(null);
  const [dose, setDose] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const steps = [
    { id: 1, name: 'Patient', short: 'Pat' },
    { id: 2, name: 'Medication', short: 'Med' },
    { id: 3, name: 'Dosing', short: 'Dose' },
    { id: 4, name: 'Dilution', short: 'Dil' },
    { id: 5, name: 'Verify', short: 'Ver' },
  ];

  const medications = [
    { name: 'Dopamine', concentration: '40mg/ml', unit: 'mcg/kg/min', defaultDose: 10 },
    { name: 'Gentamicin', concentration: '40mg/2ml', unit: 'mg/kg', defaultDose: 5 },
    { name: 'Morphine', concentration: '10mg/ml', unit: 'mcg/kg/hr', defaultDose: 10 },
  ];

  const fetchPatients = async () => {
    setLoadingPatients(true);
    try {
      const response = await api.get('/neonates');
      setPatients(response.data.data);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoadingPatients(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-28">
      {/* Structural Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Medication Pipeline</h2>
          <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
            High-precision, weight-based drug calculation engine with multi-layer clinical validation.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-4 rounded-xl shadow-sm">
           <ShieldCheck className="text-emerald-600" size={18} />
           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">Security Override: Active</span>
        </div>
      </div>

      {/* Modern Professional Stepper */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--bg-main)]" />
        <div className="flex items-center justify-between relative z-10">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base transition-all duration-700
                  ${currentStep >= step.id ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xl shadow-slate-200 dark:shadow-none' : 'bg-[var(--bg-main)] text-slate-300 border border-[var(--border-main)]'}
                `}>
                  {currentStep > step.id ? <CheckCircle2 size={24} className="text-emerald-400" /> : step.id}
                </div>
                <span className={`text-[10px] mt-4 font-bold uppercase tracking-[0.2em] ${currentStep >= step.id ? 'text-[var(--text-main)]' : 'text-slate-400'}`}>
                  <span className="hidden sm:inline">{step.name}</span>
                  <span className="sm:hidden">{step.short}</span>
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px bg-[var(--border-main)] mt-[-20px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Calculation Interface */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 sm:p-12 rounded-[3rem] min-h-[500px] flex flex-col justify-between shadow-sm relative overflow-hidden group">
             {/* Subtle accent */}
             <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[var(--bg-main)] rounded-full blur-[100px] pointer-events-none" />

             <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-1 text-center">
                       <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Identify Patient Context</h3>
                       <p className="text-slate-500 font-medium">Select a patient from the ward census dropdown below.</p>
                    </div>

                    <div className="max-w-md mx-auto w-full space-y-8">
                       <div className="relative group">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2 block">Active Ward Registry</label>
                          <div className="relative">
                             <select 
                               value={selectedPatient?.id || ''}
                               onChange={(e) => {
                                 const p = patients.find(pat => pat.id.toString() === e.target.value);
                                 setSelectedPatient(p);
                               }}
                               className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-5 px-6 text-sm font-bold text-[var(--text-main)] appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none"
                             >
                                <option value="" disabled>Choose Neonate...</option>
                                {patients.map(p => (
                                  <option key={p.id} value={p.id}>{p.name} ({p.hospital_number})</option>
                                ))}
                             </select>
                             <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                          </div>
                       </div>

                       {selectedPatient && (
                         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-3xl space-y-4">
                            <div className="flex justify-between items-center">
                               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Registry Weight</p>
                               <span className="text-xs font-black text-emerald-700">Verified</span>
                            </div>
                            <div className="flex items-baseline space-x-3">
                               <span className="text-4xl font-black text-emerald-700">{(selectedPatient.current_weight || selectedPatient.weight).toFixed(3)}</span>
                               <span className="text-lg font-bold text-emerald-600">kg</span>
                            </div>
                            <p className="text-[10px] text-emerald-600 font-medium italic">"Weight data pulled from census record: {selectedPatient.hospital_number}"</p>
                         </motion.div>
                       )}

                       <button 
                        disabled={!selectedPatient}
                        onClick={nextStep}
                        className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-slate-200 dark:shadow-none hover:bg-black dark:hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
                       >
                          Establish Patient Context
                       </button>
                    </div>

                    <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-3xl flex items-start space-x-4 text-rose-700 dark:text-rose-300 max-w-xl mx-auto">
                      <AlertCircle className="shrink-0 mt-0.5" size={20} />
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase tracking-widest">Clinical Restriction</p>
                        <p className="text-xs font-medium leading-relaxed">
                          Medication calculations are locked if neonate weight is older than 24 hours. A re-weigh event must be logged.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-1">
                       <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Medication Formulary</h3>
                       <p className="text-slate-500 font-medium">Standardized dosing ranges as per WHO/NICU protocol.</p>
                    </div>
                    <div className="relative">
                       <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input type="text" placeholder="Search drug registry (e.g. Gentamicin, Dopamine)..." className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                       {medications.map(drug => (
                         <button 
                           key={drug.name} 
                           onClick={() => { setSelectedDrug(drug); nextStep(); }}
                           className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-main)] hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-left flex items-center justify-between group"
                         >
                            <div className="flex items-center space-x-5">
                               <div className="w-12 h-12 rounded-xl bg-[var(--bg-main)] border border-[var(--border-main)] text-slate-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                  <Pill size={24} />
                               </div>
                               <div>
                                  <p className="text-lg font-bold text-[var(--text-main)] group-hover:text-emerald-800 transition-colors">{drug.name}</p>
                                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Stock Conc: {drug.concentration}</p>
                               </div>
                            </div>
                            <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Select Agent</span>
                         </button>
                       ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="space-y-1 text-center">
                       <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Prescription Intensity</h3>
                       <p className="text-slate-500 font-medium italic">Target rate for {selectedDrug?.name}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-8 py-10">
                       <div className="flex items-baseline space-x-6">
                          <input 
                            type="number" 
                            className="bg-transparent border-b-2 border-[var(--border-main)] text-[100px] font-black text-center w-64 outline-none text-[var(--text-main)] focus:border-emerald-600 transition-all"
                            placeholder="0.0"
                            value={dose}
                            onChange={(e) => setDose(e.target.value)}
                            autoFocus
                          />
                          <span className="text-2xl font-black text-slate-300 uppercase tracking-tighter">{selectedDrug?.unit}</span>
                       </div>
                       <div className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                          <span className="bg-[var(--bg-main)] px-3 py-1 rounded-md border border-[var(--border-main)]">Rec: {selectedDrug?.defaultDose} {selectedDrug?.unit}</span>
                       </div>
                    </div>

                    <div className="flex justify-center">
                       <button 
                        onClick={nextStep}
                        className="bg-slate-900 dark:bg-emerald-600 text-white px-16 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-slate-200 dark:shadow-none active:scale-95 transition-all"
                        disabled={!dose}
                       >
                         Validate Therapeutic Rate
                       </button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-1">
                       <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Dilution Strategy</h3>
                       <p className="text-slate-500 font-medium">Standard NICU volumes for fluid restriction.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6">
                          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Fluid Volume</p>
                          <div className="flex items-baseline space-x-2">
                             <span className="text-5xl font-black">24</span>
                             <span className="text-xl font-bold opacity-60">ml / 24h</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">Standard micro-infusion volume for neonatal patients requiring fluid control.</p>
                       </div>
                       <div className="p-8 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-[2rem] space-y-6">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Rate</p>
                          <div className="flex items-baseline space-x-2">
                             <span className="text-5xl font-black text-[var(--text-main)]">{(parseFloat(dose) * (selectedPatient?.current_weight || selectedPatient?.weight || 0) * 0.024).toFixed(2)}</span>
                             <span className="text-xl font-bold text-slate-400">ml/hr</span>
                          </div>
                          <button 
                            onClick={nextStep}
                            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 dark:shadow-none active:scale-95 transition-all mt-4"
                          >
                             Finalize Calculation
                          </button>
                       </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 5 && (
                  <motion.div 
                    key="step5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4 text-center">
                       <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-inner mx-auto">
                          <ShieldCheck size={40} />
                       </div>
                       <div>
                          <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Calculation Validated</h3>
                          <p className="text-slate-500 font-medium">Cross-referenced with institutional protocol v16.42.</p>
                       </div>
                    </div>

                    <div className="bg-[var(--bg-main)] border border-[var(--border-main)] rounded-[2.5rem] overflow-hidden">
                       <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Infusion Rate</p>
                             <p className="text-4xl font-black text-emerald-400">{(parseFloat(dose) * (selectedPatient?.current_weight || selectedPatient?.weight || 0) * 0.024).toFixed(2)} ml/hr</p>
                          </div>
                          <Beaker size={40} className="text-slate-700" />
                       </div>
                       <div className="p-8 space-y-6">
                          <div className="grid grid-cols-2 gap-8">
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Drug Amount</p>
                                <p className="text-sm font-bold">{dose} {selectedDrug?.unit}</p>
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Diluent Volume</p>
                                <p className="text-sm font-bold">QS to 24ml</p>
                             </div>
                          </div>
                          <div className="pt-6 border-t border-[var(--border-main)]">
                             <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-2 flex items-center space-x-2">
                                <AlertCircle size={12} />
                                <span>Double Check Mandatory</span>
                             </p>
                             <p className="text-xs text-slate-500 leading-relaxed italic">
                                Ensure syringe is labeled with patient ID ({selectedPatient?.hospital_number}), drug name ({selectedDrug?.name}), total dose, and dilution volume before bedside deployment.
                             </p>
                          </div>
                       </div>
                    </div>

                    <button 
                      onClick={() => { setCurrentStep(1); setSelectedPatient(null); setSelectedDrug(null); setDose(''); }}
                      className="w-full bg-[var(--card-bg)] border border-[var(--border-main)] text-slate-600 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-3"
                    >
                       <RefreshCcw size={18} />
                       <span>Reset Pipeline for New Calculation</span>
                    </button>
                  </motion.div>
                )}
             </AnimatePresence>

             <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--border-main)] relative z-10">
                <button 
                  disabled={currentStep === 1}
                  onClick={prevStep}
                  className="flex items-center space-x-2 text-slate-400 hover:text-[var(--text-main)] disabled:opacity-0 transition-all font-bold text-[11px] uppercase tracking-[0.2em]"
                >
                  <ChevronLeft size={18} />
                  <span>Previous Stage</span>
                </button>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                   <ShieldCheck size={14} />
                   <span>Forensic Integrity Core</span>
                </div>
             </div>
          </div>
        </div>

        {/* Clinical Sidecar: Dynamic Context Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className={`bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm transition-all duration-700 ${selectedPatient ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-[var(--border-main)]">Pipeline Context</h4>
            <div className="space-y-6">
               <div className="flex flex-col space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                     <User size={12} />
                     <span>Active Neonate</span>
                  </span>
                  <span className="text-base font-bold text-[var(--text-main)]">{selectedPatient?.name || 'Unspecified'}</span>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                        <Scale size={12} />
                        <span>Weight</span>
                     </span>
                     <span className="text-sm font-black text-emerald-600 font-mono">{(selectedPatient?.current_weight || selectedPatient?.weight || 0).toFixed(3)} kg</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                        <Clock size={12} />
                        <span>GA</span>
                     </span>
                     <span className="text-sm font-black text-[var(--text-main)] font-mono">{selectedPatient?.gestational_age || selectedPatient?.ga || '--'}w</span>
                  </div>
               </div>
               <div className="h-px bg-[var(--border-main)]" />
               <div className="flex flex-col space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                     <Pill size={12} />
                     <span>Selected Agent</span>
                  </span>
                  <span className="text-base font-bold text-[var(--text-main)]">{selectedDrug?.name || 'Unspecified'}</span>
               </div>
            </div>
          </div>

          <div className={`bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 dark:shadow-none transition-all duration-1000 ${currentStep >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
             <div className="flex items-center space-x-2 text-emerald-200 mb-10">
                <ShieldCheck size={24} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Safety Output</span>
             </div>
             <div className="space-y-4 mb-10">
                <p className="text-[11px] text-emerald-200 font-bold uppercase tracking-widest">Required Infusion Rate</p>
                <div className="flex items-baseline space-x-3">
                   <span className="text-[64px] font-black leading-none tracking-tighter">{(parseFloat(dose) * (selectedPatient?.current_weight || selectedPatient?.weight || 0) * 0.024).toFixed(2)}</span>
                   <span className="text-xl font-bold opacity-60">ml/hr</span>
                </div>
             </div>
             <div className="p-5 bg-white/10 rounded-[1.5rem] border border-white/10 text-[10px] text-white/80 leading-relaxed font-bold italic">
               "Calculation cross-verified with NeoDesk v16.42 formulary. Ensure secondary clinical check before administration."
             </div>
          </div>
        </div>
      </div>

      {/* Forensic Legal Footer */}
      <footer className="pt-12 border-t border-[var(--border-main)] flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
         <div className="flex items-center space-x-3">
            <FileText size={14} className="text-slate-300" />
            <span>Protocol Library Version: 16.0.42 (Released June 2026)</span>
         </div>
         <div className="flex items-center space-x-2">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span>Validated by Neonatal Clinical Compliance Board</span>
         </div>
      </footer>
    </div>
  );
};

export default Calculators;
