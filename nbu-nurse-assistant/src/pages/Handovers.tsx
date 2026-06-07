import React, { useState } from 'react';
import { Clock, ArrowRight, Plus, Activity, Heart, Thermometer, Droplets, User, Baby, ShieldCheck } from 'lucide-react';

const Handovers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = [
    { id: 1, time: '07:30 AM', date: '2026-06-07', outgoing: 'Patrick Kamau', incoming: 'Teresa Njoroge', status: 'Completed' },
    { id: 2, time: '07:30 PM', date: '2026-06-06', outgoing: 'Cynthia Wekesa', incoming: 'Patrick Kamau', status: 'Completed' },
  ];

  const patients = [
    { name: 'Baby Mary Jane', weight: '1.250kg', diagnosis: 'RDS', status: 'Critical', vitals: 'Temp 36.8, BSL 3.2, SpO2 92%' },
    { name: 'Baby John Doe', weight: '2.100kg', diagnosis: 'Sepsis', status: 'Stable', vitals: 'Temp 36.5, BSL 4.5, SpO2 98%' },
  ];

  const [shiftData] = useState({
    type: 'Afternoon',
    staff: ['Patrick Kamau', 'John Doe'],
    consultant: 'Angela Omwansa',
    manager: 'Teresa Njoroge',
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Shift Handovers</h2>
          <p className="text-slate-400">Ensure zero clinical gaps during nursing and clinician shift changes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="glass-button flex items-center space-x-2 w-full lg:w-auto justify-center py-3 px-6"
        >
          <Plus size={20} />
          <span className="font-bold">Create Handover Report</span>
        </button>
      </div>

      {/* Current Shift Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-l-4 border-emerald-500">
            <div className="space-y-4">
               <div className="flex items-center space-x-2 text-emerald-400">
                  <Clock size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Active Shift: Day</span>
               </div>
               <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-brand-slate flex items-center justify-center text-[10px] font-bold text-slate-400">
                      SN
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-brand-slate flex items-center justify-center text-[10px] font-bold text-emerald-400">
                    +4
                  </div>
               </div>
            </div>
            <div className="text-right space-y-1">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shift Lead</p>
               <p className="text-lg font-bold text-slate-100">Teresa Njoroge</p>
               <p className="text-xs text-emerald-500 font-medium">Nursing In-Charge</p>
            </div>
         </div>

         <div className="glass-card p-6 flex flex-col justify-center space-y-2 bg-emerald-500/5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Ward Safety Score</p>
            <p className="text-4xl font-bold text-emerald-400 text-center">98%</p>
            <p className="text-[10px] text-emerald-500/70 text-center font-medium">Updated 12m ago</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Handover History */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-slate-100 px-1">Transition History</h3>
          <div className="space-y-3">
             {history.map(item => (
               <div key={item.id} className="glass-card p-5 flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                       <span className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-500">{item.time.split(' ')[1]}</span>
                       <span className="text-sm font-bold text-slate-300 group-hover:text-emerald-400">{item.time.split(' ')[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm font-bold text-slate-100">
                        <span>{item.outgoing}</span>
                        <ArrowRight size={14} className="text-slate-600" />
                        <span>{item.incoming}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase">
                      {item.status}
                    </span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Clinical Summary Sidebar */}
        <div className="space-y-6">
           <div className="glass-card p-6">
              <h4 className="text-sm font-bold text-slate-100 mb-6 flex items-center space-x-2">
                <Activity size={18} className="text-emerald-400" />
                <span>Critical Vital Trends</span>
              </h4>
              <div className="space-y-5">
                 {[
                   { label: 'Ward SpO2 Avg', value: '96%', icon: Droplets, color: 'blue' },
                   { label: 'Avg Heart Rate', value: '142 bpm', icon: Heart, color: 'red' },
                   { label: 'Thermal Stability', value: '36.8°C', icon: Thermometer, color: 'amber' },
                 ].map(metric => (
                   <div key={metric.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-${metric.color}-500/10 text-${metric.color}-400`}>
                           <metric.icon size={16} />
                        </div>
                        <span className="text-xs font-medium text-slate-400">{metric.label}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-100">{metric.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-6 bg-blue-500/5 border-blue-500/20">
              <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">Shift Lead Commentary</h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Ward is currently at 85% occupancy. 2 neonates on CPAP are stable. Ensure strict adherence to the thermal care protocol during the night shift."
              </p>
           </div>
        </div>
      </div>

      {/* Handover Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-brand-slate/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
           <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative z-10 animate-in zoom-in-95 duration-300 custom-scrollbar">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                <div>
                   <h3 className="text-2xl font-bold text-slate-100">Structured Handover Report</h3>
                   <div className="flex items-center space-x-3 mt-1">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest">{shiftData.type} Shift</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">7th June 2026</span>
                   </div>
                </div>
                <div className="text-right hidden sm:block">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto-Filled Context</p>
                   <p className="text-xs text-emerald-500 font-bold">Linked to Duty Rota Entry #882</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-1 space-y-6">
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                          <User size={14} className="text-emerald-400" />
                          <span>Shift Personnel</span>
                       </h4>
                       <div className="space-y-3 bg-black/20 p-4 rounded-2xl border border-white/5">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] text-slate-500 font-bold uppercase">Staff on Duty</span>
                             <div className="flex -space-x-2">
                                {shiftData.staff.map(s => <div key={s} className="w-6 h-6 rounded-full bg-slate-800 border border-brand-slate flex items-center justify-center text-[8px] font-bold text-slate-400">{s[0]}</div>)}
                             </div>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] text-slate-500 font-bold uppercase">Consultant</span>
                             <span className="text-[10px] text-slate-300 font-bold">{shiftData.consultant}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] text-slate-500 font-bold uppercase">Manager</span>
                             <span className="text-[10px] text-slate-300 font-bold">{shiftData.manager}</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Global commentary</label>
                       <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none placeholder:text-slate-600" placeholder="Enter ward-level updates, safety flags, and equipment status..."></textarea>
                    </div>
                 </div>

                 <div className="md:col-span-2 space-y-6">
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                       <Baby size={14} className="text-emerald-400" />
                       <span>Patient Progress Timeline</span>
                    </h4>
                    <div className="space-y-4">
                       {patients.map((p, i) => (
                         <div key={i} className={`p-5 rounded-2xl border transition-all ${p.status === 'Critical' ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
                            <div className="flex justify-between items-start mb-4">
                               <div>
                                  <p className="font-bold text-slate-100">{p.name}</p>
                                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{p.diagnosis} • {p.weight}</p>
                               </div>
                               <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${p.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{p.status}</span>
                            </div>
                            <div className="space-y-2 mb-4">
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Vitals</p>
                               <p className="text-xs text-slate-300 font-mono bg-black/20 p-2 rounded-lg">{p.vitals}</p>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Shift Note Log</p>
                               <div className="relative pl-4 space-y-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
                                  <div className="relative">
                                     <div className="absolute -left-[18.5px] top-1 w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                                     <p className="text-[10px] text-slate-400 leading-relaxed">
                                        <span className="font-bold text-slate-300 mr-2">10:00 AM:</span>
                                        "Feeding tolerated well. Minimal gastric residuals noted."
                                     </p>
                                  </div>
                                  <div className="relative">
                                     <div className="absolute -left-[18.5px] top-1 w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                                     <p className="text-[10px] text-slate-400 leading-relaxed">
                                        <span className="font-bold text-slate-300 mr-2">12:00 PM:</span>
                                        "SpO₂ dropped to 86%. Repositioned neonate, recovered to 94%."
                                     </p>
                                  </div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="flex justify-between items-center pt-8 mt-8 border-t border-white/5">
                 <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold text-slate-500 hover:text-white transition-colors uppercase text-[10px] tracking-widest">Discard Draft</button>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                       <ShieldCheck size={14} className="text-emerald-500" />
                       <span className="text-[10px] font-bold text-emerald-500/70 uppercase">Ready for Validation</span>
                    </div>
                    <button className="glass-button px-10 py-3 shadow-lg shadow-emerald-500/20">Finalize & Sign Shift</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Handovers;
