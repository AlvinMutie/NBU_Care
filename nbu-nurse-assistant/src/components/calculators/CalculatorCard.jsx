import React from 'react';
import { 
  Info, 
  AlertTriangle, 
  ShieldCheck
} from 'lucide-react';

const CalculatorCard = ({ title, icon: Icon, formula, result, resultLabel, error, warning, onLog, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
    <div className="p-6 border-b border-slate-100 bg-slate-50">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-primary shadow-sm">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
          <p className="text-xs font-mono text-slate-500 mt-1">{formula}</p>
        </div>
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <div className="grid grid-cols-1 gap-4 mb-8">
        {children}
      </div>
      
      <div className={`mt-auto p-4 rounded-xl border transition-all ${
        error ? 'bg-rose-50 border-rose-100 text-rose-600' : 
        warning && result ? 'bg-amber-50 border-amber-100 text-amber-700' :
        result ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
        'bg-slate-50 border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              error ? 'bg-rose-100 text-rose-600' : 
              warning && result ? 'bg-amber-100 text-amber-600' :
              result ? 'bg-emerald-100 text-emerald-600' : 
              'bg-slate-200 text-slate-400'
            }`}>
               {error ? <AlertTriangle className="w-5 h-5" /> : 
                result ? <ShieldCheck className="w-5 h-5" /> : 
                <Info className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-0.5">
                Here is the result
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight">{error || result || '—'}</span>
                {result && !error && <span className="text-xs font-bold opacity-70">{resultLabel}</span>}
              </div>
            </div>
          </div>

          {result && !error && onLog && (
            <button 
              onClick={onLog}
              className="px-3 py-1.5 bg-white/50 hover:bg-white text-[10px] font-bold uppercase tracking-widest text-slate-700 rounded-lg border border-slate-200/50 shadow-sm transition-all active:scale-95"
            >
              Record Result
            </button>
          )}
        </div>
        
        {warning && result && !error && (
          <div className="mt-4 pt-3 border-t border-amber-200/50">
            <p className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1 text-amber-800">
               <AlertTriangle className="w-3 h-3" /> Important note
            </p>
            <p className="text-xs font-medium text-amber-700">{warning}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CalculatorCard;
