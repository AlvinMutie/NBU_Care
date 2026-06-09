import React, { useState, useEffect } from 'react';
import { 
  Clock, ArrowRight, Plus, Activity, Heart, 
  Thermometer, Droplets, User, Baby, ShieldCheck, 
  ChevronRight, Beaker, Info, ClipboardList, X, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Handovers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailHandover, setDetailHandover] = useState<any>(null);
  const [activeShiftFilter, setActiveShiftFilter] = useState('All');
  const [handovers, setHandovers] = useState<any[]>([]);
  const [neonates, setNeonates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    neonate_id: '',
    clinical_status: '',
    vitals_snapshot: { hr: '', spo2: '', temp: '' },
    investigations: '',
    treatment_plan: '',
    shift_type: 'Morning'
  });

  const user = JSON.parse(localStorage.getItem('user_data') || '{}');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [handoversRes, neonatesRes] = await Promise.all([
        api.get('/handovers'),
        api.get('/neonates')
      ]);
      setHandovers(handoversRes.data.data);
      setNeonates(neonatesRes.data.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHandover = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/handovers', formData);
      setIsModalOpen(false);
      fetchData();
      setFormData({
        neonate_id: '',
        clinical_status: '',
        vitals_snapshot: { hr: '', spo2: '', temp: '' },
        investigations: '',
        treatment_plan: '',
        shift_type: 'Morning'
      });
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to record handover. Ensure all required fields are filled.');
    } finally {
      setIsSubmitting(false);
    }
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
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Active Transition Cycle: 24h Ledger</span>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="w-12 h-12 rounded-[1.2rem] bg-[var(--bg-main)] border-4 border-[var(--card-bg)] flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">SN</div>
                     ))}
                  </div>
                  <div className="h-8 w-px bg-[var(--border-main)]" />
                  <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Active Clinician</p>
                     <p className="text-sm font-bold">{user.name}</p>
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

         <div className="md:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-center text-center space-y-2">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Institutional Node</p>
            <p className="text-3xl font-black tracking-tight">ND-HQ-MAIN</p>
            <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-slate-500 uppercase">
               <ShieldCheck size={12} />
               <span>Protocol v16.0 Verified</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
        {/* Transition History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Handover Ledger</h3>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{handovers.length} Total Reports</div>
          </div>
          
          <div className="space-y-4">
             {handovers.length === 0 ? (
                <div className="p-20 text-center bg-[var(--card-bg)] border border-dashed border-[var(--border-main)] rounded-[3rem]">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Handover Reports Found</p>
                </div>
             ) : handovers.filter(i => activeShiftFilter === 'All' || i.shift_type === activeShiftFilter).map(item => (
               <div key={item.id} onClick={() => setDetailHandover(item)} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-[2rem] flex items-center justify-between group hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--bg-main)] border border-[var(--border-main)] flex flex-col items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:border-emerald-100 dark:group-hover:border-emerald-800 transition-all duration-500">
                       <span className="text-[9px] font-black text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest">{item.shift_type}</span>
                       <span className="text-lg font-black group-hover:text-emerald-700">{new Date(item.created_at).getHours()}:{new Date(item.created_at).getMinutes().toString().padStart(2, '0')}</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-[var(--text-main)]">
                        {item.nurse?.name || 'Unknown Clinician'}
                      </div>
                      <div className="flex items-center space-x-3 mt-1.5">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[var(--bg-main)] px-2 py-0.5 rounded-md">#{item.id}</span>
                         <div className="w-1 h-1 rounded-full bg-slate-200" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 text-slate-200 hover:text-emerald-600 transition-colors">
                     <ChevronRight size={20} />
                  </button>
               </div>
             ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm space-y-8">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-4">Standardized Protocol</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Identify Patient', desc: 'Verify Hospital ID' },
                   { label: 'Clinical Status', desc: 'Acuity and primary diagnosis' },
                   { label: 'Vital Snapshot', desc: 'HR, SpO2, and Thermal logs' },
                   { label: 'Plan of Care', desc: 'Meds, feeds, and nursing orders' },
                 ].map((step, i) => (
                   <div key={i} className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black">{i+1}</div>
                      <div>
                         <p className="text-xs font-bold text-[var(--text-main)]">{step.label}</p>
                         <p className="text-[10px] text-slate-400 font-medium">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Detail View Modal */}
      <AnimatePresence>
         {detailHandover && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[var(--card-bg)] rounded-[3rem] w-full max-w-3xl p-10 shadow-2xl space-y-8 border border-[var(--border-main)]">
                  <div className="flex justify-between items-center border-b border-[var(--border-main)] pb-6">
                     <div>
                        <h3 className="text-2xl font-bold tracking-tight">Handover Report Details</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ref ID: #{detailHandover.id} • {new Date(detailHandover.created_at).toLocaleString()}</p>
                     </div>
                     <button onClick={() => setDetailHandover(null)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                  </div>
                  
                  <div className="space-y-8">
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Clinician</p>
                           <p className="text-sm font-bold">{detailHandover.nurse?.name}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shift</p>
                           <p className="text-sm font-bold">{detailHandover.shift_type}</p>
                        </div>
                     </div>

                     <div className="p-6 bg-[var(--bg-main)] rounded-2xl space-y-4">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Clinical Status</p>
                        <p className="text-sm font-medium leading-relaxed italic">"{detailHandover.clinical_status}"</p>
                     </div>

                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Treatment Plan & Orders</p>
                        <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{detailHandover.treatment_plan}</p>
                     </div>

                     <div className="grid grid-cols-3 gap-4">
                        {[
                           { label: 'HR', val: detailHandover.vitals_snapshot?.hr, unit: 'bpm' },
                           { label: 'SpO2', val: detailHandover.vitals_snapshot?.spo2, unit: '%' },
                           { label: 'Temp', val: detailHandover.vitals_snapshot?.temp, unit: '°C' },
                        ].map(v => (
                           <div key={v.label} className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl text-center">
                              <p className="text-[9px] font-black text-slate-400 uppercase">{v.label}</p>
                              <p className="text-base font-black">{v.val}{v.unit}</p>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  <button onClick={() => setDetailHandover(null)} className="w-full py-4 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-black transition-all mt-4">Close Report</button>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Handover Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
             <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="bg-[var(--card-bg)] rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col border border-[var(--border-main)] text-[var(--text-main)]">
                <div className="p-8 sm:p-12 border-b border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[var(--bg-main)]/50">
                   <div className="space-y-1">
                      <h3 className="text-3xl font-bold tracking-tight">Structured Transition Report</h3>
                      <p className="text-sm text-slate-500 font-medium italic">Protocol-driven shift continuity and clinical sign-off.</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-[var(--bg-main)] rounded-2xl transition-all">
                      <X size={24} />
                   </button>
                </div>
                
                <form onSubmit={handleSaveHandover} className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Neonate</label>
                         <select 
                           value={formData.neonate_id}
                           onChange={(e) => setFormData({...formData, neonate_id: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none"
                           required
                         >
                            <option value="">Select Patient...</option>
                            {neonates.map(n => <option key={n.id} value={n.id}>{n.name} ({n.hospital_number})</option>)}
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shift Period</label>
                         <select 
                           value={formData.shift_type}
                           onChange={(e) => setFormData({...formData, shift_type: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none"
                         >
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Night</option>
                         </select>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Status Overview</label>
                      <textarea 
                        value={formData.clinical_status}
                        onChange={(e) => setFormData({...formData, clinical_status: e.target.value})}
                        rows={3} 
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl p-5 text-sm font-medium" 
                        placeholder="Current acuity, stability, and high-level assessment..."
                        required
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HR (bpm)</label>
                         <input type="text" value={formData.vitals_snapshot.hr} onChange={(e) => setFormData({...formData, vitals_snapshot: {...formData.vitals_snapshot, hr: e.target.value}})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold" required />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SpO2 (%)</label>
                         <input type="text" value={formData.vitals_snapshot.spo2} onChange={(e) => setFormData({...formData, vitals_snapshot: {...formData.vitals_snapshot, spo2: e.target.value}})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold" required />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temp (°C)</label>
                         <input type="text" value={formData.vitals_snapshot.temp} onChange={(e) => setFormData({...formData, vitals_snapshot: {...formData.vitals_snapshot, temp: e.target.value}})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold" required />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Treatment Plan & Instructions</label>
                      <textarea 
                        value={formData.treatment_plan}
                        onChange={(e) => setFormData({...formData, treatment_plan: e.target.value})}
                        rows={5} 
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl p-5 text-sm font-medium" 
                        placeholder="Meds, feeds, and specific nursing orders for the next shift..."
                        required
                      />
                   </div>

                   <div className="pt-8 border-t border-[var(--border-main)] flex items-center justify-between">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-rose-600 transition-colors">Discard Report</button>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-2"
                      >
                         {isSubmitting && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                         <span>Authenticate & Save Transition</span>
                      </button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Handovers;
