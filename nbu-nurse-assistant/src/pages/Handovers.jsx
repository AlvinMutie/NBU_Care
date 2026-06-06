import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Clock, CheckCircle2, 
  AlertCircle, ChevronRight, User, 
  Search, Filter, Plus, FileText, 
  Activity, Thermometer, Droplets,
  Stethoscope, ShieldCheck, X, Check,
  Loader2, ArrowRightLeft, Heart, Zap, Calendar,
  Database
} from 'lucide-react';
import { api } from '../services/api';

export default function Handovers({ user, neonateId, onNavigate }) {
  const [handovers, setHandovers] = useState([]);
  const [currentRota, setCurrentRota] = useState(null);
  const [selectedNeonate, setSelectedNeonate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    neonate: '',
    shift: 'Morning',
    commentary: '',
    vitals: {
      temperature: '',
      sugarLevel: '',
      oxygenSaturation: '',
      heartRate: '',
      respiratoryRate: ''
    },
    investigations: {
      liver: '',
      kidney: '',
      fbc: '',
      other: ''
    },
    plan: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, [neonateId]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const rotaRes = await api.getCurrentRota();
      if (rotaRes.success) setCurrentRota(rotaRes.rota);

      if (neonateId) {
        const neonateRes = await api.getNeonates();
        if (neonateRes.success) {
          const neo = neonateRes.neonates.find(n => n._id === neonateId);
          if (neo) {
             setSelectedNeonate(neo);
             setFormData(prev => ({ ...prev, neonate: neonateId }));
          }
        }
        
        const handoverRes = await api.getHandovers(neonateId);
        if (handoverRes.success) setHandovers(handoverRes.handovers);
      } else {
        const res = await api.getRecentLogs();
        // Handovers are usually filtered by patient, if no ID, show recent for unit
        // For now, let's assume we fetch all handovers if no neonateId
        const resH = await api.getHandovers('all'); 
        if (resH.success) setHandovers(resH.handovers);
      }
    } catch (err) {
      console.error('Failed to fetch handover data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHandover = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        clinicalLead: currentRota?.consultant?._id,
        nurseOnDuty: user._id,
        shift: currentRota?.shift || formData.shift
      };
      const res = await api.saveHandover(data);
      if (res.success) {
        setIsModalOpen(false);
        fetchInitialData();
      }
    } catch (err) {
      alert('Failed to save handover.');
    }
  };

  const getShiftColor = (shift) => {
    if (shift === 'Morning') return 'amber';
    if (shift === 'Afternoon') return 'teal';
    return 'indigo';
  };

  return (
    <div className="p-4 lg:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen pb-32 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div className="text-left">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ArrowRightLeft className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedNeonate ? `Handovers: ${selectedNeonate.name}` : 'Shift Reports'}
                </h1>
             </div>
             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">Coordinate clinical transitions and vital status tracking.</p>
          </div>
          {neonateId && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 w-full md:w-auto"
            >
              <Plus className="w-5 h-5" /> Start Handover
            </button>
          )}
        </div>

        {/* Current Shift Status Bar */}
        <div className="mb-10 p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className={`w-16 h-16 bg-${getShiftColor(currentRota?.shift || 'Morning')}-50 dark:bg-${getShiftColor(currentRota?.shift || 'Morning')}-900/20 rounded-[24px] flex items-center justify-center text-${getShiftColor(currentRota?.shift || 'Morning')}-500 shadow-inner`}>
                 <Clock className="w-8 h-8" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">Active Unit Shift</p>
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{currentRota?.shift || 'Shift Not Defined'}</h2>
              </div>
           </div>

           <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                 <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Clinical Lead</p>
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-sm font-black text-slate-700 dark:text-slate-200">{currentRota?.consultant?.name || 'Unassigned'}</span>
                 </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                 <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">On-Duty Manager</p>
                 <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-500" />
                    <span className="text-sm font-black text-slate-700 dark:text-slate-200">{currentRota?.manager?.name || 'Unassigned'}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Handover Timeline */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center">
             <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
             <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Compiling Shift Reports...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {handovers.length === 0 ? (
               <div className="py-40 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-200 dark:text-slate-700 mb-6">
                     <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">No Handovers Recorded</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-2 font-medium">Start a new handover to record shift commentary and vitals.</p>
               </div>
            ) : (
              handovers.map((h, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[40px] p-6 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group animate-in fade-in slide-in-from-bottom-6 duration-700">
                   {/* Shift Badge */}
                   <div className={`absolute top-0 right-0 px-8 py-3 rounded-bl-[32px] text-[10px] font-black uppercase tracking-widest bg-${getShiftColor(h.shift)}-100 dark:bg-${getShiftColor(h.shift)}-900/30 text-${getShiftColor(h.shift)}-700 dark:text-${getShiftColor(h.shift)}-400 shadow-sm border-l border-b border-slate-100/50 dark:border-slate-800`}>
                      {h.shift} Shift
                   </div>

                   <div className="flex flex-col lg:flex-row gap-12">
                      {/* Patient & Staff Info */}
                      <div className="lg:w-1/3">
                         {!neonateId && (
                           <div className="mb-8 p-6 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/10 dark:border-primary/20">
                              <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1.5 leading-none">Patient Identity</p>
                              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{h.neonate?.name}</h3>
                              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{h.neonate?.hospitalNumber}</span>
                           </div>
                         )}
                         
                         <div className="space-y-5">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-700">
                                  <User className="w-6 h-6" />
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Nurse On Duty</p>
                                  <p className="text-sm font-black text-slate-700 dark:text-slate-200">{h.nurseOnDuty?.name}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-700">
                                  <Calendar className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Shift Timestamp</p>
                                  <p className="text-sm font-black text-slate-700 dark:text-slate-200">{new Date(h.createdAt).toLocaleString()}</p>
                               </div>
                            </div>
                         </div>

                         {/* Vitals Quick View */}
                         <div className="mt-12 grid grid-cols-2 gap-4">
                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 group-hover:border-primary/20 transition-all">
                               <Thermometer className="w-5 h-5 text-amber-500 mb-3" />
                               <p className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">{h.vitals?.temperature}°C</p>
                               <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Temperature</span>
                            </div>
                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 group-hover:border-primary/20 transition-all">
                               <Droplets className="w-5 h-5 text-primary mb-3" />
                               <p className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">{h.vitals?.oxygenSaturation}%</p>
                               <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">SPO2 Saturation</span>
                            </div>
                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 group-hover:border-primary/20 transition-all">
                               <Zap className="w-5 h-5 text-emerald-500 mb-3" />
                               <p className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">{h.vitals?.sugarLevel}</p>
                               <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Blood Sugar</span>
                            </div>
                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 group-hover:border-primary/20 transition-all">
                               <Heart className="w-5 h-5 text-rose-500 mb-3" />
                               <p className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">{h.vitals?.heartRate}</p>
                               <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Heart Rate</span>
                            </div>
                         </div>
                      </div>

                      {/* Commentary & Investigations */}
                      <div className="flex-1 lg:pl-12 lg:border-l border-slate-100 dark:border-slate-800">
                         <div className="mb-10">
                            <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                               <div className="w-1.5 h-4 bg-primary rounded-full" /> Shift Commentary
                            </h4>
                            <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 relative italic">
                               <p className="text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                                  "{h.commentary || 'No clinical commentary recorded for this shift.'}"
                                </p>
                                <FileText className="absolute bottom-4 right-6 w-8 h-8 text-slate-200 dark:text-slate-700 opacity-50" />
                            </div>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                               <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 leading-none">Liver Logic</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300">{h.investigations?.liver || 'Not tested'}</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                               <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 leading-none">Renal Output</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300">{h.investigations?.kidney || 'Not tested'}</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                               <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 leading-none">FBC Status</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300">{h.investigations?.fbc || 'Not tested'}</p>
                            </div>
                         </div>

                         <div>
                            <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                               <div className="w-1.5 h-4 bg-amber-500 rounded-full" /> Clinical Action Plan
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-black bg-amber-50/50 dark:bg-amber-900/10 p-8 rounded-[32px] border border-amber-100 dark:border-amber-900/30 shadow-inner">
                               {h.plan || 'Maintain current clinical protocols.'}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Handover Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 dark:border-slate-800">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                 <div className="text-left">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Shift Handover</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Recording for {selectedNeonate?.name || 'Unit'}</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-95">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <form onSubmit={handleSaveHandover} className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar text-left">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                      { label: 'Temperature (°C)', key: 'temperature' },
                      { label: 'Oxygen Saturation (%)', key: 'oxygenSaturation' },
                      { label: 'Sugar Level (mmol/L)', key: 'sugarLevel' },
                      { label: 'Heart Rate (bpm)', key: 'heartRate' },
                      { label: 'Resp Rate (cpm)', key: 'respiratoryRate' }
                    ].map((v) => (
                      <div key={v.key} className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{v.label}</label>
                        <input 
                          type="number" step="0.1" required 
                          className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700 dark:text-white" 
                          value={formData.vitals[v.key]} 
                          onChange={e => setFormData({...formData, vitals: {...formData.vitals, [v.key]: e.target.value}})} 
                        />
                      </div>
                    ))}
                 </div>

                 <div className="space-y-2 mb-10">
                    <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Shift Commentary & Findings</label>
                    <textarea 
                      required 
                      className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700 dark:text-white h-32 resize-none" 
                      placeholder="Detailed shift observations..."
                      value={formData.commentary} 
                      onChange={e => setFormData({...formData, commentary: e.target.value})} 
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                      { label: 'Liver Function', key: 'liver' },
                      { label: 'Kidney Profile', key: 'kidney' },
                      { label: 'FBC Summary', key: 'fbc' }
                    ].map((inv) => (
                      <div key={inv.key} className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{inv.label}</label>
                        <input 
                          type="text" 
                          className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 outline-none text-sm font-bold text-slate-700 dark:text-white" 
                          value={formData.investigations[inv.key]} 
                          onChange={e => setFormData({...formData, investigations: {...formData.investigations, [inv.key]: e.target.value}})} 
                        />
                      </div>
                    ))}
                 </div>

                 <div className="space-y-2 mb-12">
                    <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Next Shift Clinical Plan</label>
                    <textarea 
                      required 
                      className="w-full p-6 bg-amber-50/50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/30 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-sm font-bold text-slate-700 dark:text-white h-24 resize-none" 
                      placeholder="Clinical goals for the incoming team..."
                      value={formData.plan} 
                      onChange={e => setFormData({...formData, plan: e.target.value})} 
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <Database className="w-5 h-5" /> Submit Handover to Records
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
