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
  HelpCircle,
  Users,
  Clock,
  FlaskRound as Flask
} from 'lucide-react';

const GuideSection = ({ icon: Icon, title, children, id }) => (
  <section id={id} className="pt-16 pb-16 border-b border-slate-100 dark:border-slate-800 last:border-0 relative text-left">
    <div className="flex items-center gap-6 mb-10">
      <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{title}</h2>
        <div className="w-12 h-1 bg-primary rounded-full mt-3" />
      </div>
    </div>
    <div className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
      {children}
    </div>
  </section>
);

export default function UserGuide({ onBack }) {
  return (
    <div className="max-w-[1100px] mx-auto p-4 lg:p-10 pb-32">
      
      {/* Hero Content */}
      <div className="text-center mb-20 max-w-3xl mx-auto border-b border-slate-100 dark:border-slate-800 pb-20 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8 border border-primary/20">
            <HelpCircle className="w-4 h-4" /> Comprehensive Protocol Guide
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
          Operational <br />Manual & <span className="text-primary italic">Guide</span>.
        </h1>
        <p className="text-base lg:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Master the NeoDesk ecosystem. This guide provides the tactical knowledge required to operate all clinical and administrative modules with zero-error precision.
        </p>
      </div>

      {/* Guide Content */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 lg:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        
        <GuideSection id="getting-started" icon={MousePointer2} title="Module Initialization">
          <p className="mb-10 text-lg">Your access profile is provisioned by the <strong className="font-black text-slate-900 dark:text-white">Unit Clinical Lead</strong>. Role-specific toolsets are automatically loaded upon secure JWT validation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { l: "Shift Intelligence", d: "Real-time visibility into unit throughput, pending verifications, and global ward alerts.", icon: Layout },
              { l: "Surgical Search", d: "A high-latency-optimized indexing engine for finding protocols and drug formularies instantly.", icon: Search }
            ].map(item => (
              <div key={item.l} className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col gap-6 group hover:border-primary/20 transition-all">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-none tracking-tight">{item.l}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </GuideSection>

        <GuideSection id="calculators" icon={Calculator} title="The Drug Pipeline">
          <p className="mb-10 text-lg">All dosages are processed via our 5-step safety verification logic. <strong className="font-black text-rose-600 dark:text-rose-400">Manual calculation is prohibited</strong> within the Build Unit — use the pipeline for all patient interventions.</p>
          
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[32px] p-8 lg:p-12 shadow-inner overflow-hidden">
            <h4 className="text-xs font-black text-slate-900 dark:text-white mb-10 flex items-center gap-3 uppercase tracking-[0.2em]">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> The Precision Protocol:
            </h4>
            <div className="space-y-10">
              {[
                { n: "01", t: "Validate Weight", d: "Dosing is weight-contingent. Access the neonate registry to verify today's verified clinical weight." },
                { n: "02", t: "Specify stock", d: "Ensure stock concentrations (mg/mL) match the ward pharmacy supply precisely." },
                { n: "03", t: "Audit Signature", d: "Final verification creates an immutable entry in the Shift Records vault for Lead oversight." }
              ].map(step => (
                <div key={step.n} className="flex gap-6 items-start relative">
                  <div className="w-10 h-10 rounded-xl shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-primary font-black flex items-center justify-center text-sm shadow-sm">{step.n}</div>
                  <div>
                    <h5 className="text-lg font-black text-slate-900 dark:text-white mb-1.5 leading-none tracking-tight">{step.t}</h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GuideSection>

        <GuideSection id="safety" icon={ShieldCheck} title="Clinical Integrity">
          <p className="mb-10 text-lg">NeoDesk enforces Role-Based Access Control (RBAC) to maintain a secure operating environment for all staff levels.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-slate-950 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-100 dark:border-indigo-800/30">
                   <GraduationCap className="w-6 h-6" />
                </div>
                <h5 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">Academy Mode</h5>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-10 font-medium">Students operate in a practice-safe sandbox. Scenarios and calculations in this mode do not affect live patient records.</p>
              </div>
              <button className="text-primary text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 self-start hover:gap-4 transition-all">Launch Simulator <ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="p-8 bg-white dark:bg-slate-950 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-800/30">
                   <Users className="w-6 h-6" />
                </div>
                <h5 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">RBAC Dynamics</h5>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-10 font-medium">Tools are dynamically filtered based on clinical credentials. Consult the ICT team for permission upgrades.</p>
              </div>
              <button className="text-primary text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 self-start hover:gap-4 transition-all">System Architecture <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </GuideSection>

        <section id="resilience" className="pt-16">
           <div className="p-10 lg:p-12 rounded-[40px] bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 flex flex-col md:flex-row gap-10 items-center text-amber-900 dark:text-amber-200">
              <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-[24px] flex items-center justify-center text-amber-500 shadow-xl shadow-amber-200/50 dark:shadow-none shrink-0 border border-amber-100 dark:border-amber-800">
                 <Zap className="w-10 h-10 animate-pulse" />
              </div>
              <div className="text-left">
                 <h3 className="text-2xl font-black tracking-tight mb-3">Protocol: Network Failure</h3>
                 <p className="text-sm lg:text-base font-medium leading-relaxed opacity-90">
                   System v16.0 utilizes Local Storage Sync. In the event of a total network outage, clinical calculators and protocol viewing remain functional. Data will auto-sync to the central vault once connectivity is restored.
                 </p>
              </div>
           </div>
        </section>
      </div>

      {/* Closing Actions */}
      <div className="mt-16 text-center bg-white dark:bg-slate-900 p-10 lg:p-16 border border-slate-100 dark:border-slate-800 rounded-[50px] shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center">
        <button 
          onClick={onBack}
          className="bg-slate-900 dark:bg-primary hover:bg-black dark:hover:bg-primary-dark text-white px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-4 shadow-xl active:scale-95"
        >
          <span>Conclude Review</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="mt-12 flex flex-col items-center gap-3">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600 flex items-center gap-3">
              <Clock className="w-4 h-4" /> 24/7 Internal Support
           </p>
           <p className="text-sm font-black text-slate-400 dark:text-slate-500 tracking-tight">ICT Command Center: EXT 4400-OPS</p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700 flex items-center justify-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              NeoDesk Unit Operational Manual
          </p>
      </footer>
    </div>
  );
}
