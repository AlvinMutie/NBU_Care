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
  Scale
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
    <div className={`bg-white rounded-2xl border transition-all duration-300 ${expanded ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
      <div className="p-8">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex gap-6 items-center">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${expanded ? 'bg-primary border-primary text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              {isCompleted ? <ShieldCheck className="w-7 h-7" /> : <HelpCircle className="w-7 h-7" />}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Practice Scenario</p>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                {title}
                {isCompleted && <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Mastered</span>}
              </h3>
            </div>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
              expanded ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-slate-200'
            }`}
          >
            {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
               <span className="text-primary font-bold uppercase text-[10px] tracking-wider">What's happening</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {problem}
            </p>
          </div>
        </div>

        <div className={`transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="pt-8 border-t border-slate-100 space-y-8">
            
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4" /> What to do — Step by step
              </p>
              <div className="grid gap-3 pl-2">
                {solution?.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">
                       {String(i + 1)}
                    </div>
                    <p className="text-sm text-slate-700 font-medium pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {formulas && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-slate-400" /> The maths involved
                  </p>
                  <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm text-center">
                     <code className="text-sm font-bold text-slate-800 font-mono">
                       {formulas}
                     </code>
                  </div>
                </div>
              )}

              {warning && (
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 flex gap-4 text-rose-800">
                  <div className="w-8 h-8 bg-white rounded-lg border border-rose-200 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-rose-600">⚠ Watch out for this</p>
                    <p className="text-xs font-semibold leading-relaxed">{warning}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-100">
               <button 
                onClick={handleComplete}
                disabled={isCompleted || loading}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white cursor-default' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
               >
                 {isCompleted ? 'Completed' : 'Mark as Completed'}
                 {isCompleted ? <ShieldCheck className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
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
    <div className="max-w-[1600px] mx-auto w-full p-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Practice & Learning</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Patient Scenarios</h1>
          <p className="text-sm text-slate-500">Work through real-world cases to build confidence and sharpen your skills.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 flex items-center px-4 py-2 rounded-lg gap-3">
           <Lightbulb className="w-5 h-5 text-emerald-600" />
           <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">5 Scenarios Available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {scenarios.map((s, i) => (
          <ScenarioCard key={i} {...s} />
        ))}
        
        {/* Placeholder for future expansion */}
        <div className="p-12 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-6">
              <Scale className="w-8 h-8 text-slate-400" />
           </div>
           <h4 className="text-lg font-bold text-slate-900 mb-2">More Coming Soon</h4>
           <p className="text-sm font-medium text-slate-500 max-w-sm">More scenarios are being reviewed by our clinical team and will be added here shortly.</p>
        </div>
      </div>
    </div>
  );
}
