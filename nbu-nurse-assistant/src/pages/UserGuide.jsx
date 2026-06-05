import React from 'react';
import { 
  ArrowLeft, 
  Book, 
  Calculator, 
  ShieldCheck, 
  MousePointer2,
  Zap,
  ChevronRight,
  Activity,
  ArrowRight,
  Search,
  Layout,
  Lock,
  Database,
  CheckCircle,
} from 'lucide-react';

const GuideSection = ({ icon: Icon, title, children, id }) => (
  <section id={id} className="pt-12 pb-12 border-b border-slate-200 last:border-0 relative">
    <div className="flex items-center gap-6 mb-8">
      <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-primary shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
      </div>
    </div>
    <div className="text-slate-600 leading-relaxed text-sm">
      {children}
    </div>
  </section>
);

export default function UserGuide({ onBack }) {
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
            Back to Portal
          </button>

          <div className="flex items-center gap-3">
             <div className="bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-2 text-primary">
                <Book className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider text-[10px]">Help & Guide</span>
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-[1000px] mx-auto p-8 py-16">
        <div className="text-center mb-16 max-w-3xl mx-auto border-b border-slate-200 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Activity className="w-4 h-4" /> How to use this app
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Your User Guide
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to know to get the most out of NeoDesk. Simple, step-by-step.
          </p>
        </div>

        {/* Guide Content */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <GuideSection id="getting-started" icon={MousePointer2} title="Getting Started">
            <p className="mb-8">Your account is set up by the <strong className="font-medium text-slate-900">Nursing In-Charge</strong>. Once approved, you can sign in and start using all the tools available for your role.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { l: "Your Dashboard", d: "The first thing you'll see when you sign in. It shows your tools, team notices, and recent activity.", icon: Layout },
                { l: "Quick Search", d: "Use the search bar at the top to find tools, guidelines, or help topics fast.", icon: Search }
              ].map(item => (
                <div key={item.l} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4 group hover:border-slate-300 transition-colors">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 truncate">{item.l}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </GuideSection>

          <GuideSection id="calculators" icon={Calculator} title="Using the Calculators">
            <p className="mb-8">All calculations are powered by our verified clinical tool. <strong className="font-medium text-slate-900">Never use manual math</strong> for medication doses — always use the calculator and double-check with a colleague.</p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm overflow-hidden text-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wide">
                 <Zap className="w-4 h-4 text-amber-500" /> Always follow these 3 steps:
              </h4>
              <div className="space-y-6">
                {[
                  { n: "01", t: "Check the baby's weight", d: "Always use today's weight. Baby weights change daily — even small changes matter." },
                  { n: "02", t: "Enter the right dose", d: "Find the correct dose from the drug chart and type it in carefully." },
                  { n: "03", t: "Double-check the result", d: "Before giving any medication, have a second nurse confirm the result with you." }
                ].map(step => (
                  <div key={step.n} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded shrink-0 bg-white border border-slate-200 text-slate-500 font-bold flex items-center justify-center text-xs">{step.n}</div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-1">{step.t}</h5>
                      <p className="text-slate-600">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GuideSection>

          <GuideSection id="safety" icon={ShieldCheck} title="Staying Safe">
            <p className="mb-8">The portal is designed to keep everyone safe. Every calculation is saved so the In-Charge can review it during handover.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <h5 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">Practice Safely as a Student</h5>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">Students work in a safe practice zone. Nothing you try here will be added to the real shift records — so explore freely!</p>
                </div>
                <button className="text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 self-start hover:gap-3 transition-all">Go to Scenarios <ArrowRight className="w-4 h-4" /></button>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <h5 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">Who has access to what?</h5>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">Each role (Nurse, Doctor, Student, In-Charge) sees only the tools they need. This keeps things tidy and secure.</p>
                </div>
                <button className="text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 self-start hover:gap-3 transition-all">Talk to IT <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </GuideSection>

          <section id="support" className="pt-12">
             <div className="p-8 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col md:flex-row gap-8 items-center text-amber-900">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                   <Database className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-xl font-bold tracking-tight mb-2">What happens if the internet goes down?</h3>
                   <p className="text-sm">
                     Don't worry — the portal is built to keep working even without internet. The calculators will stay available so you can always care for your patients.
                   </p>
                </div>
             </div>
          </section>
        </div>

        {/* Closing */}
        <div className="mt-16 text-center bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex flex-col items-center">
          <button 
            onClick={onBack}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Got it — take me back</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Need more help? Call the IT team: ext. 4400</p>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                NeoDesk User Guide
            </p>
        </footer>
      </div>
    </div>
  );
}
