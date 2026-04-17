import React from 'react';
import { 
  ArrowLeft, 
  Stethoscope, 
  ShieldCheck, 
  Zap, 
  Database,
  Heart,
  ChevronRight,
  Activity,
  Lock
} from 'lucide-react';

export default function About({ onBack }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Stethoscope className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">Neo<span className="text-primary">Desk</span></span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto p-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Activity className="w-4 h-4" /> Better care for babies
           </div>
           <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-6">
             Your Clinical Assistant
           </h1>
           <p className="text-lg text-slate-600">
             NeoDesk is a friendly clinical tool built to help nursing teams work more accurately, confidently, and safely every single shift.
           </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
             <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Zap className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-3">Safety first</h3>
             <p className="text-sm text-slate-600 leading-relaxed">
               Our smart tools help prevent medication mistakes before they happen.
             </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
             <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-3">Trusted guidelines</h3>
             <p className="text-sm text-slate-600 leading-relaxed">
               We follow the latest WHO and Ministry of Health guidelines for newborn care.
             </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
             <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Heart className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-3">Designed for you</h3>
             <p className="text-sm text-slate-600 leading-relaxed">
               We made NeoDesk easy to use, so you can focus more on your patients and less on the screen.
             </p>
          </div>
        </div>

        {/* Architecture Section */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col md:flex-row mb-16">
           <div className="p-12 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200">
             <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-6">
                 <Database className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Always ready</h3>
             <p className="text-slate-600 mb-8 leading-relaxed">
               NeoDesk works even when the internet is slow or down, so you never lose access to your tools.
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <span className="block text-2xl font-black text-primary mb-1">99.9%</span>
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Always Online</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <Lock className="w-6 h-6 text-primary mb-2" />
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secure Storage</span>
                </div>
             </div>
           </div>
           
           <div className="p-12 md:w-1/2 bg-slate-50 flex flex-col justify-center text-center items-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">How it started</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-sm">
                NeoDesk was created at the bedside to help with the tricky math of newborn care. It's been tested by nurses to make sure it keeps babies safe.
              </p>
              <button onClick={onBack} className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-sm">
                 Go back to work
                 <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
           <p className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Made with love for the Neonatal Unit
           </p>
        </div>

      </div>
    </div>
  );
}
