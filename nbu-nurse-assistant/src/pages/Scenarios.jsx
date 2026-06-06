import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  BrainCircuit,
  Scale,
  Zap,
  Activity,
  ArrowRight,
  Database,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';

const ScenarioCard = ({ _id, title, problem, solution, formulas, warning }) => {
  const [expanded, setExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const res = await api.completeScenario(_id || title);
      if (res.success) {
        setIsCompleted(true);
      }
    } catch (err) {
      console.error("Failed to complete scenario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-[32px] border transition-all duration-500 overflow-hidden ${expanded ? 'border-primary/50 shadow-2xl ring-4 ring-primary/5 dark:ring-0' : 'border-slate-100 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/30 hover:shadow-md'}`}>
      <div className="p-6 lg:p-10">
        <div className="flex items-start justify-between gap-6 mb-10">
          <div className="flex gap-6 items-center">
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border transition-all duration-500 shadow-inner ${expanded ? 'bg-primary border-primary text-white shadow-primary/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400'}`}>
              {isCompleted ? <ShieldCheck className="w-8 h-8" /> : <BrainCircuit className="w-8 h-8" />}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">Practice Module</span>
                 {isCompleted && (
                   <span className="text-[9px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 animate-in zoom-in-50">Mastered</span>
                 )}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{title}</h3>
            </div>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0 active:scale-90 ${
              expanded ? 'bg-slate-900 dark:bg-primary text-white rotate-90 shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 relative overflow-hidden text-left">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-primary font-black uppercase text-[10px] tracking-[0.2em]">Clinical Presentation</span>
            </div>
            <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-bold italic">
              "{problem}"
            </p>
          </div>
          <HelpCircle className="absolute -bottom-2 -right-2 w-24 h-24 text-slate-100 dark:text-slate-800/50 -rotate-12 pointer-events-none" />
        </div>

        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${expanded ? 'max-h-[2000px] opacity-100 mt-10' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="pt-10 border-t border-slate-50 dark:border-slate-800 space-y-10 text-left">
            
            <div>
              <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-4 h-4" /> Protocol Execution Steps
              </p>
              <div className="grid gap-4 pl-2">
                {solution?.map((step, i) => (
                  <div key={i} className="flex gap-5 items-start p-5 rounded-[24px] bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-100/30 dark:border-emerald-800/30">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 text-xs font-black flex items-center justify-center shrink-0 shadow-sm border border-emerald-100 dark:border-emerald-800">
                       {String(i + 1)}
                    </div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 pt-1.5 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {formulas && (
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[32px] p-8">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                    <BrainCircuit className="w-4 h-4 text-primary" /> Algorithmic Math
                  </p>
                  <div className="bg-white dark:bg-slate-900 px-6 py-5 rounded-[20px] border border-slate-100 dark:border-slate-700 shadow-inner text-center">
                     <code className="text-sm font-black text-slate-800 dark:text-slate-200 font-mono tracking-tight">
                       {formulas}
                     </code>
                  </div>
                </div>
              )}

              {warning && (
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-[32px] p-8 flex gap-5">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-rose-800 flex items-center justify-center shrink-0 shadow-sm">
                    <AlertCircle className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 text-rose-600 dark:text-rose-400">Critical Insight</p>
                    <p className="text-xs font-black text-rose-900 dark:text-rose-200 leading-relaxed">{warning}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-50 dark:border-slate-800">
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  Accredited Simulation Hub
               </div>
               <button 
                onClick={handleComplete}
                disabled={isCompleted || loading}
                className={`w-full sm:w-auto px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white cursor-default shadow-emerald-500/20' 
                    : 'bg-slate-900 dark:bg-primary text-white hover:bg-black dark:hover:bg-primary-dark shadow-slate-900/20 dark:shadow-primary/20'
                }`}
               >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isCompleted ? 'Simulation Mastered' : 'Complete Practice'}
                 {isCompleted ? <ShieldCheck className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Scenarios({ user, onNavigate }) {
  const scenarios = [
    {
      _id: 'hypoglycemia_01',
      title: 'Low Blood Sugar in a Newborn',
      problem: 'A 2.5kg newborn is 3 hours old and has a blood glucose of 2.1 mmol/L. The baby seems fine but has a risk factor — the mother has gestational diabetes.',
      solution: [
        'Double-check the reading with a lab glucose test right away.',
        'Start with feeding — breast milk is the first choice.',
        'Re-check blood glucose in 30–60 minutes.',
        'If glucose is still below 2.6 mmol/L after feeding, give IV fluids (10% Dextrose, 2ml/kg bolus).',
        'Start maintenance IV fluids at 60–80 ml/kg/day.'
      ],
      formulas: 'Bolus = 2ml/kg × Weight; Maintenance = (ml/kg/day × Weight) / 24',
      warning: 'Low blood sugar that is not treated can cause permanent brain damage or seizures. Act quickly and accurately.'
    },
    {
      _id: 'resuscitation_01',
      title: 'Baby Not Breathing After Birth',
      problem: 'A baby is born by emergency C-section and is gasping with a heart rate of 80 bpm. The team has already dried and warmed the baby.',
      solution: [
        'Start bag-and-mask breathing (PPV) within the first minute.',
        'Make sure the mask covers the nose and mouth properly — a good seal is everything.',
        'Breathe at a rate of 40–60 breaths per minute ("Breathe-two-three").',
        'Watch the chest. If it is not rising, follow the MR. SOPA steps to fix the airway.',
        'Check the heart rate again after 15 seconds of good breathing support.'
      ],
      formulas: 'Breathing rate: 40–60 per minute (the Golden Minute Protocol)',
      warning: 'If the heart rate is still below 60 bpm after 30 seconds of good breathing support, start chest compressions immediately.'
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto w-full p-4 lg:p-10 pb-32 text-left">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200 dark:border-slate-800 pb-10 mb-12">
        <div className="max-w-xl text-left">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Practice & Learning</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-none">Clinical Scenarios</h1>
          <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Work through real-world clinical cases to build confidence and sharpen your bedside skills in a safe, simulated environment.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 flex items-center px-6 py-3 rounded-2xl gap-4 shadow-inner">
           <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-800">
              <Zap className="w-5 h-5" />
           </div>
           <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">{scenarios.length} Simulation Modules Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {scenarios.map((s, i) => (
          <ScenarioCard key={i} {...s} />
        ))}
        
        {/* Placeholder for future expansion */}
        <div className="p-12 rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center group hover:border-primary/20 transition-all duration-500">
           <div className="w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
              <Database className="w-10 h-10 text-slate-200 dark:text-slate-700" />
           </div>
           <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">More Modules Coming</h4>
           <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">Clinical leads are currently reviewing new simulation protocols for deployment.</p>
        </div>
      </div>
    </div>
  );
}
