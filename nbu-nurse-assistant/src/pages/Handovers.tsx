import React, { useState, useEffect } from 'react';
import { 
  Clock, ArrowRight, Plus, Activity, Heart, 
  Thermometer, Droplets, User, Baby, ShieldCheck, 
  ChevronRight, Beaker, Info, ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Handovers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeShiftFilter, setActiveShiftFilter] = useState('All');
  const [handovers, setHandovers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHandovers();
  }, []);

  const fetchHandovers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/handovers');
      setHandovers(response.data.data);
    } catch (err) {
      console.error('Failed to fetch handovers:', err);
    } finally {
      setLoading(false);
    }
  };

  const history = handovers.length > 0 ? handovers : [
    { id: 1, time: '07:30 AM', date: '2026-06-08', type: 'Morning', outgoing: 'John Doe', incoming: 'Teresa Njoroge', alerts: 2 },
    { id: 2, time: '03:30 PM', date: '2026-06-07', type: 'Afternoon', outgoing: 'Teresa Njoroge', incoming: 'Patrick Kamau', alerts: 0 },
  ];

  const shiftData = {
    type: 'Afternoon',
    staff: ['Patrick Kamau', 'John Doe'],
    consultant: 'Dr. Angela Omwansa',
    manager: 'Teresa Njoroge',
  };

  if (loading && handovers.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing shift continuity...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Shift Handovers</h2>
          <p className="text-slate-500 font-medium max-w-lg">Managed clinical transitions ensuring zero data gaps between medical teams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 dark:bg-emerald-600 text-white flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-black dark:hover:bg-emerald-700 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Generate Handover Report</span>
        </button>
      </div>

      {/* Active Continuity Status */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
         <div className="md:col-span-8 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-5">
               <div className="flex items-center space-x-3 text-emerald-600">
                  <Clock size={20} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Active Transition Cycle: Day</span>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="w-12 h-12 rounded-[1.2rem] bg-[var(--bg-main)] border-4 border-[var(--card-bg)] flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">SN</div>
                     ))}
                     <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 dark:bg-emerald-900/20 border-4 border-[var(--card-bg)] flex items-center justify-center text-[10px] font-bold text-emerald-600 shadow-sm">+4</div>
                  </div>
                  <div className="h-8 w-px bg-[var(--border-main)]" />
                  <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 text-right">In-Charge</p>
                     <p className="text-sm font-bold">{shiftData.manager}</p>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
               {['Morning', 'Afternoon', 'Night', 'All'].map(shift => (
                 <button 
                    key={shift}
                    onClick={() => setActiveShiftFilter(shift)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeShiftFilter === shift ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'bg-[var(--bg-main)] text-slate-400 border border-[var(--border-main)] hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                 >
                    {shift}
                 </button>
               ))}
            </div>
         </div>

         <div className="md:col-span-4 bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 dark:shadow-none flex flex-col justify-center text-center space-y-2">
            <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.3em]">Institutional Safety Score</p>
            <p className="text-5xl font-black tracking-tighter">98%</p>
            <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-emerald-200/60 uppercase">
               <ShieldCheck size={12} />
               <span>Last validated 12m ago</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
        {/* Transition History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Ledger Timeline</h3>
            <div className="flex items-center space-x-2 text-slate-400 hover:text-[var(--text-main)] transition-colors cursor-pointer">
               <ClipboardList size={16} />
               <span className="text-xs font-bold uppercase tracking-widest">Full Export</span>
            </div>
          </div>
          
          <div className="space-y-4">
             {history.filter(i => activeShiftFilter === 'All' || i.type === activeShiftFilter).map(item => (
               <div key={item.id} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-[2rem] flex items-center justify-between group hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--bg-main)] border border-[var(--border-main)] flex flex-col items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:border-emerald-100 dark:group-hover:border-emerald-800 transition-all duration-500">
                       <span className="text-[9px] font-black text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest">{item.time?.split(' ')[1] || ''}</span>
                       <span className="text-lg font-black group-hover:text-emerald-700">{item.time?.split(' ')[0] || item.type}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 text-base font-bold">
                        <span>{item.outgoing || item.clinician_name}</span>
                        <ArrowRight size={14} className="text-slate-300" />
                        <span>{item.incoming || 'Next Team'}</span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1.5">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[var(--bg-main)] px-2 py-0.5 rounded-md">{item.type} Shift</span>
                         <div className="w-1 h-1 rounded-full bg-slate-200" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date || new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    {(item.alerts > 0) && (
                       <div className="flex items-center space-x-1.5 text-rose-500 px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800">
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

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm space-y-8">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-4">Critical Vital Aggregates</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Unit SpO2 Avg', value: '96.2%', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
                   { label: 'Avg Heart Rate', value: '142 bpm', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
                   { label: 'Thermal Stability', value: '36.8°C', icon: Thermometer, color: 'text-amber-600', bg: 'bg-amber-50' },
                 ].map(metric => (
                   <div key={metric.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-[0.9rem] ${metric.bg} dark:bg-slate-800 ${metric.color}`}>
                           <metric.icon size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{metric.label}</span>
                      </div>
                      <span className="text-sm font-black">{metric.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Handover Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
             <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="bg-[var(--card-bg)] rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col border border-[var(--border-main)] text-[var(--text-main)]">
                <div className="p-8 sm:p-12 border-b border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[var(--bg-main)]/50">
                   <div className="space-y-1">
                      <h3 className="text-3xl font-bold tracking-tight">Structured Transition Report</h3>
                      <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
                         <Clock size={14} />
                         <span>Linked to Shift Period: Afternoon</span>
                         <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                         <span className="text-slate-400">Institutional v16.0</span>
                      </div>
                   </div>
                   <div className="flex items-center space-x-2 bg-[var(--card-bg)] border border-[var(--border-main)] p-1.5 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg"><ShieldCheck size={16} /></div>
                      <div className="px-3 text-[var(--text-main)]">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Auth Required</p>
                         <p className="text-xs font-bold">Digital Signature Active</p>
                      </div>
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12 bg-[var(--bg-main)]/30">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="space-y-6">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center space-x-2">
                            <User size={14} className="text-emerald-600" />
                            <span>Shift Personnel</span>
                         </h4>
                         <div className="space-y-4 bg-[var(--card-bg)] p-6 rounded-[2rem] border border-[var(--border-main)] shadow-sm">
                            <div className="space-y-1">
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Consultant of Day</p>
                               <p className="text-sm font-bold">{shiftData.consultant}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Unit Manager</p>
                               <p className="text-sm font-bold">{shiftData.manager}</p>
                            </div>
                         </div>
                      </div>
                      <div className="md:col-span-2 space-y-6">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center space-x-2">
                            <Beaker size={14} className="text-blue-600" />
                            <span>Clinical Commentary</span>
                         </h4>
                         <textarea rows={8} className="w-full bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-6 text-sm font-medium text-[var(--text-main)] outline-none focus:border-emerald-600 transition-all shadow-sm resize-none placeholder:text-slate-300" placeholder="Enter ward-level updates, safety flags, and instructions..."/>
                      </div>
                   </div>
                </div>
                <div className="p-8 sm:p-12 border-t border-[var(--border-main)] flex items-center justify-between bg-[var(--card-bg)]">
                   <button onClick={() => setIsModalOpen(false)} className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-[var(--text-main)] transition-colors">Discard Draft</button>
                   <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95">Finalize & Authenticate Shift</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Handovers;
