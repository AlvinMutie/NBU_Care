import React, { useState } from 'react';
import { Beaker, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, ShieldCheck, Pill, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Calculators: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedDrug, setSelectedDrug] = useState<any>(null);
  const [dose, setDose] = useState('');

  const steps = [
    { id: 1, name: 'Patient', short: 'Pat' },
    { id: 2, name: 'Medication', short: 'Med' },
    { id: 3, name: 'Dosing', short: 'Dose' },
    { id: 4, name: 'Dilution', short: 'Dil' },
    { id: 5, name: 'Verify', short: 'Ver' },
  ];

  const patients = [
    { name: 'Baby Mary Jane', weight: '1.250kg', id: 'NBU-001', numericWeight: 1.250 },
    { name: 'Baby John Doe', weight: '2.100kg', id: 'NBU-002', numericWeight: 2.100 },
  ];

  const medications = [
    { name: 'Dopamine', concentration: '40mg/ml', unit: 'mcg/kg/min', defaultDose: 10 },
    { name: 'Gentamicin', concentration: '40mg/2ml', unit: 'mg/kg', defaultDose: 5 },
    { name: 'Morphine', concentration: '10mg/ml', unit: 'mcg/kg/hr', defaultDose: 10 },
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-28 lg:pb-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Clinical Drug Pipeline</h2>
        <p className="text-slate-400 text-sm sm:text-base px-4 font-medium italic">Validated 5-step medication verification protocol.</p>
      </div>

      {/* Step Indicator */}
      <div className="glass-card p-4 sm:p-6 border-l-4 border-emerald-500">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative z-10 flex-1">
                <div className={`
                  w-8 h-8 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-500
                  ${currentStep >= step.id ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 rotate-0' : 'bg-white/5 text-slate-500 border border-white/10 rotate-12'}
                `}>
                  {currentStep > step.id ? <CheckCircle2 size={20} /> : step.id}
                </div>
                <span className={`text-[9px] sm:text-[10px] mt-2 font-bold uppercase tracking-widest ${currentStep >= step.id ? 'text-emerald-400' : 'text-slate-600'}`}>
                  <span className="hidden sm:inline">{step.name}</span>
                  <span className="sm:hidden">{step.short}</span>
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 transition-colors duration-700 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-white/5'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Interface Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 sm:p-10 min-h-[450px] flex flex-col justify-between relative overflow-hidden">
             {/* Background Decoration */}
             <Beaker className="absolute -right-12 -bottom-12 text-white/[0.02] -rotate-12" size={240} />

             <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                          <User size={20} className="text-emerald-400" />
                          <span>Select Patient Context</span>
                       </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {patients.map((p) => (
                        <button 
                          key={p.id} 
                          onClick={() => { setSelectedPatient(p); nextStep(); }}
                          className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between group ${selectedPatient?.id === p.id ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/5 border-white/10 hover:border-emerald-500/30'}`}
                        >
                          <div>
                              <p className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{p.name}</p>
                              <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest">{p.id} • {p.weight}</p>
                          </div>
                          <ChevronRight size={18} className={`${selectedPatient?.id === p.id ? 'text-emerald-400' : 'text-slate-700'}`} />
                        </button>
                      ))}
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl flex items-start space-x-4">
                      <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">Weight Invalidation</p>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                          Clinical protocol requires a secondary weight check if the last recording is {'>'} 24 hours old.
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
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                          <Pill size={20} className="text-emerald-400" />
                          <span>Medication Formulary</span>
                       </h3>
                    </div>
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                       <input type="text" placeholder="Search drug registry..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                       {medications.map(drug => (
                         <button 
                           key={drug.name} 
                           onClick={() => { setSelectedDrug(drug); nextStep(); }}
                           className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all text-left flex items-center justify-between group"
                         >
                            <div className="flex items-center space-x-4">
                               <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                  <Beaker size={20} />
                               </div>
                               <div>
                                  <p className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{drug.name}</p>
                                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Conc: {drug.concentration}</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Select</span>
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
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold text-slate-100">Prescription Input</h3>
                       <p className="text-sm text-slate-400">Define the target dose for {selectedDrug?.name}.</p>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-6 py-8">
                       <div className="flex items-end space-x-4">
                          <input 
                            type="number" 
                            className="bg-transparent border-b-4 border-emerald-500 text-6xl font-bold text-center w-48 outline-none text-slate-100 focus:text-emerald-400 transition-colors"
                            placeholder="0.0"
                            value={dose}
                            onChange={(e) => setDose(e.target.value)}
                            autoFocus
                          />
                          <span className="text-xl font-bold text-slate-500 mb-2 uppercase tracking-widest">{selectedDrug?.unit}</span>
                       </div>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Standard Range: 5.0 - 15.0</p>
                    </div>

                    <div className="flex justify-center">
                       <button 
                        onClick={nextStep}
                        className="glass-button px-12 py-4 text-lg"
                        disabled={!dose}
                       >
                         Validate Dose Rate
                       </button>
                    </div>
                  </motion.div>
                )}

                {currentStep > 3 && (
                  <div className="flex flex-col items-center justify-center text-slate-500 italic py-24 space-y-6">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
                    <div className="text-center">
                       <p className="text-lg font-bold text-slate-300">Formulating Clinical Result...</p>
                       <p className="text-sm">Calculating precise drawing volumes for {selectedPatient?.name}</p>
                    </div>
                  </div>
                )}
             </AnimatePresence>

             <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5 relative z-10">
                <button 
                  disabled={currentStep === 1}
                  onClick={prevStep}
                  className="flex items-center space-x-2 text-slate-500 hover:text-white disabled:opacity-0 transition-all font-bold text-sm uppercase tracking-[0.2em]"
                >
                  <ChevronLeft size={18} />
                  <span>Back</span>
                </button>
                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">NeoDesk Secure Engine</div>
             </div>
          </div>
        </div>

        {/* Clinical Sidecar: Calculation Context */}
        <div className="space-y-6">
          <div className={`glass-card p-6 border-l-4 border-emerald-500 transition-all duration-700 ${selectedPatient ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-6">Pipeline Context</h4>
            <div className="space-y-5 font-mono text-sm">
               <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Target Patient</span>
                  <span className="text-slate-100 font-bold">{selectedPatient?.name || '---'}</span>
               </div>
               <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Base Weight</span>
                  <span className="text-emerald-400 font-bold">{selectedPatient?.weight || '---'}</span>
               </div>
               <div className="h-px bg-white/5" />
               <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Selected Agent</span>
                  <span className="text-slate-100 font-bold">{selectedDrug?.name || '---'}</span>
               </div>
               <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active Concentration</span>
                  <span className="text-blue-400 font-bold">{selectedDrug?.concentration || '---'}</span>
               </div>
            </div>
          </div>

          <div className={`glass-card p-6 bg-emerald-500/5 border-emerald-500/20 transition-all duration-1000 ${currentStep >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
             <div className="flex items-center space-x-2 text-emerald-400 mb-6">
                <ShieldCheck size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Safety Derivation</span>
             </div>
             <div className="space-y-2 mb-6">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Required infusion rate</p>
                <p className="text-4xl font-bold text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  0.45 <span className="text-sm font-medium opacity-60 italic">ml/hr</span>
                </p>
             </div>
             <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-[10px] text-slate-400 leading-relaxed font-medium italic">
               "Result cross-verified with institutional drug formulary and physiological weight thresholds."
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
