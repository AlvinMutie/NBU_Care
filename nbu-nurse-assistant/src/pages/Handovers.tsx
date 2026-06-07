import React, { useState } from 'react';
import { 
  Clock, ArrowRight, Plus, Activity, Heart, 
  Thermometer, Droplets, User, Baby, ShieldCheck, 
  ChevronRight, Beaker, Info, ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Handovers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeShiftFilter, setActiveShiftFilter] = useState('All');

  const history = [
    { id: 1, time: '07:30 AM', date: '2026-06-07', type: 'Morning', outgoing: 'Patrick Kamau', incoming: 'Teresa Njoroge', status: 'Completed', alerts: 2 },
    { id: 2, time: '07:30 PM', date: '2026-06-06', type: 'Night', outgoing: 'Cynthia Wekesa', incoming: 'Patrick Kamau', status: 'Completed', alerts: 0 },
  ];

  const shiftData = {
    type: 'Afternoon',
    staff: ['Patrick Kamau', 'John Doe'],
    consultant: 'Dr. Angela Omwansa',
    manager: 'Teresa Njoroge',
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Shift Handovers</h2>
          <p className="text-slate-500 font-medium max-w-lg">Managed clinical transitions ensuring zero data gaps between medical teams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Generate Handover Report</span>
        </button>
      </div>

      {/* Active Continuity Status */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
         <div className="md:col-span-8 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-5">
               <div className="flex items-center space-x-3 text-emerald-600">
                  <Clock size={20} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Active Transition Cycle: Day</span>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="w-12 h-12 rounded-[1.2rem] bg-slate-50 border-4 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">SN</div>
                     ))}
                     <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 border-4 border-white flex items-center justify-center text-[10px] font-bold text-emerald-600 shadow-sm">+4</div>
                  </div>
                  <div className="h-8 w-px bg-slate-100" />
                  <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 text-right">In-Charge</p>
                     <p className="text-sm font-bold text-slate-900">Teresa Njoroge</p>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
               {['Morning', 'Afternoon', 'Night'].map(shift => (
                 <button 
                    key={shift}
                    onClick={() => setActiveShiftFilter(shift)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeShiftFilter === shift ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                 >
                    {shift}
                 </button>
               ))}
            </div>
         </div>

         <div className="md:col-span-4 bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 flex flex-col justify-center text-center space-y-2">
            <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.3em]">Institutional Safety Score</p>
            <p className="text-5xl font-black tracking-tighter">98%</p>
            <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-emerald-200/60 uppercase">
               <ShieldCheck size={12} />
               <span>Last validated 12m ago</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
        {/* Transition Timeline History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Ledger Timeline</h3>
            <div className="flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer">
               <ClipboardList size={16} />
               <span className="text-xs font-bold uppercase tracking-widest">Full Export</span>
            </div>
          </div>
          
          <div className="space-y-4">
             {history.map(item => (
               <div key={item.id} className="bg-white border border-slate-200 p-6 rounded-[2rem] flex items-center justify-between group hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-500">
                       <span className="text-[9px] font-black text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest">{item.time.split(' ')[1]}</span>
                       <span className="text-lg font-black text-slate-800 group-hover:text-emerald-700">{item.time.split(' ')[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 text-base font-bold text-slate-900">
                        <span>{item.outgoing}</span>
                        <ArrowRight size={14} className="text-slate-300" />
                        <span>{item.incoming}</span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1.5">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">{item.type} Shift</span>
                         <div className="w-1 h-1 rounded-full bg-slate-200" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    {item.alerts > 0 && (
                       <div className="flex items-center space-x-1.5 text-rose-500 px-3 py-1.5 bg-rose-50 rounded-xl border border-rose-100">
                          <Activity size={14} strokeWidth={3} />
                          <span className="text-xs font-black">{item.alerts} Alerts</span>
                       </div>
                    )}
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Sidebar: High-Alert Indicators */}
        <div className="space-y-8">
           <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm space-y-8">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-4">Critical Vital Aggregates</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Unit SpO2 Avg', value: '96.2%', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
                   { label: 'Avg Heart Rate', value: '142 bpm', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
                   { label: 'Thermal Stability', value: '36.8°C', icon: Thermometer, color: 'text-amber-600', bg: 'bg-amber-50' },
                 ].map(metric => (
                   <div key={metric.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-[0.9rem] ${metric.bg} ${metric.color}`}>
                           <metric.icon size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{metric.label}</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{metric.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-blue-600 rounded-[2rem] p-8 text-white space-y-6 shadow-lg shadow-blue-100">
              <div className="flex items-center space-x-2 text-blue-200">
                 <Info size={16} />
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">Lead Commentary</h4>
              </div>
              <p className="text-[15px] font-medium leading-relaxed italic text-blue-50">
                "Ward is at 85% capacity. Strict adherence to thermal chain protocol is required for the upcoming night shift."
              </p>
           </div>
        </div>
      </div>

      {/* Global Handover Modal - High Fidelity Mobbin Style */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
                onClick={() => setIsModalOpen(false)} 
             />
             <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="bg-white rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
             >
                {/* Modal Header */}
                <div className="p-8 sm:p-12 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/50">
                   <div className="space-y-1">
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Structured Transition Report</h3>
                      <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
                         <Clock size={14} />
                         <span>Linked to Shift Period: Afternoon</span>
                         <div className="w-1 h-1 rounded-full bg-slate-200" />
                         <span className="text-slate-400">Entry #882-V16</span>
                      </div>
                   </div>
                   <div className="flex items-center space-x-2 bg-white border border-slate-200 p-1.5 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg"><ShieldCheck size={16} /></div>
                      <div className="px-3">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Auth Required</p>
                         <p className="text-xs font-bold text-slate-900">Digital Signature Active</p>
                      </div>
                   </div>
                </div>

                {/* Modal Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar space-y-12">
                   {/* Contextual Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="space-y-6">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center space-x-2">
                            <User size={14} className="text-emerald-600" />
                            <span>Shift Personnel</span>
                         </h4>
                         <div className="space-y-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <div className="space-y-1">
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Consultant of Day</p>
                               <p className="text-sm font-bold text-slate-900">{shiftData.consultant}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Unit Manager</p>
                               <p className="text-sm font-bold text-slate-900">{shiftData.manager}</p>
                            </div>
                            <div className="pt-2">
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nursing Team</p>
                               <div className="flex -space-x-2">
                                  {shiftData.staff.map(s => <div key={s} title={s} className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">{s[0]}</div>)}
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="md:col-span-2 space-y-6">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center space-x-2">
                            <Beaker size={14} className="text-blue-600" />
                            <span>Clinical Commentary</span>
                         </h4>
                         <textarea 
                            rows={8}
                            className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all resize-none placeholder:text-slate-300"
                            placeholder="Enter ward-level updates, safety flags, equipment status, and urgent instructions for the incoming team..."
                         />
                      </div>
                   </div>

                   {/* Neonate Grid - Exhaustive Implementation */}
                   <div className="space-y-8">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center space-x-2">
                            <Baby size={16} className="text-emerald-600" />
                            <span>Patient Progress Inventory</span>
                         </h4>
                         <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Total Active: 08</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {[
                           { name: 'Baby Mary Jane', id: 'NBU-001', diag: 'RDS', weight: '1.250kg', vitals: { hr: 142, spo2: 95, temp: 36.8, sugar: 3.8 }, status: 'Serious' },
                           { name: 'Baby John Doe', id: 'NBU-002', diag: 'Sepsis', weight: '2.100kg', vitals: { hr: 138, spo2: 98, temp: 36.5, sugar: 4.2 }, status: 'Stable' },
                         ].map(p => (
                            <div key={p.id} className={`p-8 rounded-[2.5rem] border group transition-all ${p.status === 'Serious' ? 'bg-rose-50/30 border-rose-100' : 'bg-slate-50 border-slate-100 hover:border-emerald-200'}`}>
                               <div className="flex justify-between items-start mb-6">
                                  <div className="space-y-1">
                                     <h5 className="text-lg font-bold text-slate-900 tracking-tight">{p.name}</h5>
                                     <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{p.id} • {p.diag}</p>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${p.status === 'Serious' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 border-rose-600' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>{p.status}</span>
                               </div>
                               
                               <div className="grid grid-cols-2 gap-4 mb-8">
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Vital Signs (Shift End)</p>
                                     <div className="flex flex-wrap gap-2 pt-1">
                                        <div className="px-2 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-slate-900 font-mono">HR:{p.vitals.hr}</div>
                                        <div className="px-2 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-blue-600 font-mono">SpO2:{p.vitals.spo2}%</div>
                                        <div className="px-2 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-amber-600 font-mono">T:{p.vitals.temp}°C</div>
                                     </div>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Investigations</p>
                                     <p className="text-[10px] font-bold text-slate-900 text-right pt-1 uppercase tracking-widest">Sugar: {p.vitals.sugar} mmol/L</p>
                                  </div>
                               </div>

                               <div className="space-y-3">
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Patient shift plan</p>
                                  <textarea className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-xs font-medium outline-none focus:border-emerald-600 transition-all resize-none h-24" placeholder="Specific notes for next shift..."></textarea>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 sm:p-12 border-t border-slate-100 flex items-center justify-between bg-white">
                   <button onClick={() => setIsModalOpen(false)} className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">Discard Draft</button>
                   <div className="flex items-center space-x-6">
                      <div className="hidden sm:flex items-center space-x-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                         <ShieldCheck size={14} className="text-emerald-500" />
                         <span>Ready for Institutional Archival</span>
                      </div>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-100 transition-all active:scale-95">
                         Finalize & Authenticate Shift
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Handovers;
