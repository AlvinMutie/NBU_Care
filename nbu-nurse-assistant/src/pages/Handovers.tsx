import React, { useState, useEffect } from 'react';
import { 
  Clock, Plus, ShieldCheck, 
  ChevronRight, X, Download, FileText, Info, HelpCircle
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
    shift_type: 'Morning',
    situation: '',
    background: '',
    assessment: '',
    recommendation: '',
    is_guided: false,
    vitals_snapshot: { hr: '', spo2: '', temp: '' },
    treatment_plan: '', // Legacy support
    clinical_status: '' // Legacy support
  });

  const user = JSON.parse(localStorage.getItem('user_data') || '{}');
  const isStudent = user.role === 'Student';

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveHandover = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/handovers', {
        ...formData,
        is_guided: isStudent
      });
      setIsModalOpen(false);
      fetchData();
      resetForm();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to record handover.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      neonate_id: '',
      shift_type: 'Morning',
      situation: '',
      background: '',
      assessment: '',
      recommendation: '',
      is_guided: false,
      vitals_snapshot: { hr: '', spo2: '', temp: '' },
      treatment_plan: '',
      clinical_status: ''
    });
  };

  const downloadPDF = async (id: number) => {
    try {
      const response = await api.get(`/handovers/${id}/download`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `handover_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
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
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Clinical Handovers</h2>
          <p className="text-slate-500 font-medium max-w-lg">Professional transition of care using SBAR protocol.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-slate-900 dark:bg-emerald-600 text-white flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-black dark:hover:bg-emerald-700 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          <span>{isStudent ? 'Start Guided Handover' : 'New SBAR Report'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
         <div className="md:col-span-8 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-5">
               <div className="flex items-center space-x-3 text-emerald-600">
                  <ShieldCheck size={20} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Institutional Continuity Ledger</span>
               </div>
               <div className="flex items-center space-x-4">
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
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Protocol</p>
            <p className="text-3xl font-black tracking-tight">SBAR / I-PASS</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Handover History</h3>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{handovers.length} Total Reports</div>
          </div>
          
          <div className="space-y-4">
             {handovers.length === 0 ? (
                <div className="p-20 text-center bg-[var(--card-bg)] border border-dashed border-[var(--border-main)] rounded-[3rem]">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No reports archived</p>
                </div>
             ) : handovers.filter(i => activeShiftFilter === 'All' || i.shift_type === activeShiftFilter).map(item => (
               <div key={item.id} onClick={() => setDetailHandover(item)} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-[2rem] flex items-center justify-between group hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-main)] flex flex-col items-center justify-center">
                       <span className="text-[8px] font-black text-slate-400 uppercase">{item.shift_type}</span>
                       <FileText size={18} className="text-emerald-600 mt-1" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-[var(--text-main)]">
                        Handover for {item.neonate?.name || 'Patient'}
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By {item.nurse?.name}</span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">• {new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center space-x-3 text-emerald-600">
                 <Info size={20} />
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">What is SBAR?</h4>
              </div>
              <div className="space-y-4">
                 {[
                   { t: 'Situation', d: 'What is happening right now?' },
                   { t: 'Background', d: 'What is the clinical context?' },
                   { t: 'Assessment', d: 'What do I think the problem is?' },
                   { t: 'Recommendation', d: 'What should we do to correct it?' },
                 ].map((s, i) => (
                   <div key={i} className="space-y-1">
                      <p className="text-xs font-bold text-[var(--text-main)]">{s.t}</p>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{s.d}</p>
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
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[var(--card-bg)] rounded-[3rem] w-full max-w-2xl p-8 shadow-2xl space-y-6 border border-[var(--border-main)]">
                  <div className="flex justify-between items-center">
                     <h3 className="text-2xl font-bold tracking-tight">Handover Details</h3>
                     <button onClick={() => setDetailHandover(null)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                  </div>
                  
                  <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-[var(--bg-main)] rounded-2xl">
                           <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Patient</p>
                           <p className="text-sm font-bold">{detailHandover.neonate?.name}</p>
                        </div>
                        <div className="p-4 bg-[var(--bg-main)] rounded-2xl">
                           <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Nurse</p>
                           <p className="text-sm font-bold">{detailHandover.nurse?.name}</p>
                        </div>
                     </div>

                     {['situation', 'background', 'assessment', 'recommendation'].map(key => (
                       <div key={key} className="space-y-2">
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{key}</p>
                          <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl text-sm font-medium leading-relaxed">
                             {detailHandover[key] || 'Not specified'}
                          </div>
                       </div>
                     ))}
                  </div>
                  
                  <div className="flex space-x-3 pt-4 border-t border-[var(--border-main)]">
                    <button 
                      onClick={() => downloadPDF(detailHandover.id)}
                      className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-emerald-700 transition-all"
                    >
                       <Download size={18} />
                       <span>Export PDF</span>
                    </button>
                    <button 
                      onClick={() => setDetailHandover(null)} 
                      className="flex-1 py-4 border border-[var(--border-main)] rounded-2xl font-bold text-slate-500 hover:bg-[var(--bg-main)] transition-all"
                    >
                       Close
                    </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* New Handover Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
             <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-[var(--card-bg)] rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-[var(--border-main)]">
                <div className="p-8 border-b border-[var(--border-main)] flex items-center justify-between">
                   <div>
                      <h3 className="text-2xl font-bold tracking-tight">{isStudent ? 'Guided Clinical Handover' : 'Structured SBAR Handover'}</h3>
                      <p className="text-xs text-slate-500 font-medium">Follow the clinical transition protocol.</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-[var(--bg-main)] rounded-2xl"><X size={24} /></button>
                </div>
                
                <form onSubmit={handleSaveHandover} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Patient</label>
                         <select 
                           value={formData.neonate_id}
                           onChange={(e) => setFormData({...formData, neonate_id: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                           required
                         >
                            <option value="">Choose Patient...</option>
                            {neonates.map(n => <option key={n.id} value={n.id}>{n.name} ({n.hospital_number})</option>)}
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shift</label>
                         <select 
                           value={formData.shift_type}
                           onChange={(e) => setFormData({...formData, shift_type: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                         >
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Night</option>
                         </select>
                      </div>
                   </div>

                   <div className="space-y-6">
                      {[
                        { key: 'situation', label: 'S - Situation', guide: 'What is happening right now? State the patient and current acuity.' },
                        { key: 'background', label: 'B - Background', guide: 'Brief history, admission details, and clinical context.' },
                        { key: 'assessment', label: 'A - Assessment', guide: 'What are the current vitals and high-level findings? What do you think is going on?' },
                        { key: 'recommendation', label: 'R - Recommendation', guide: 'What are the immediate next steps? What do you need from the next shift?' },
                      ].map(section => (
                        <div key={section.key} className="space-y-3 p-6 bg-[var(--bg-main)] rounded-[2rem] border border-[var(--border-main)] relative">
                           <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-black text-emerald-600 uppercase tracking-widest">{section.label}</label>
                              {isStudent && (
                                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 italic">
                                   <HelpCircle size={12} />
                                   <span>Guided Hint</span>
                                </div>
                              )}
                           </div>
                           <textarea 
                             value={(formData as any)[section.key]}
                             onChange={(e) => setFormData({...formData, [section.key]: e.target.value})}
                             placeholder={isStudent ? section.guide : `Enter ${section.key}...`}
                             className="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 placeholder:text-slate-300 min-h-[80px] resize-none"
                             required
                           />
                           {isStudent && (formData as any)[section.key] === '' && (
                              <p className="text-[10px] text-emerald-600/60 font-medium mt-2 leading-relaxed">
                                 {section.guide}
                              </p>
                           )}
                        </div>
                      ))}
                   </div>

                   <div className="pt-8 border-t border-[var(--border-main)] flex items-center justify-between">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-600 transition-colors">Discard</button>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-2"
                      >
                         {isSubmitting && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                         <span>{isStudent ? 'Submit Training Report' : 'Save SBAR Handover'}</span>
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
