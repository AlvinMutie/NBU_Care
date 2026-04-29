import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Clock, CheckCircle2, 
  AlertCircle, ChevronRight, User, 
  Search, Filter, Plus, FileText, 
  Activity, Thermometer, Droplets,
  Stethoscope, ShieldCheck, X, Check,
  Loader2, ArrowRightLeft, Heart, Zap, Calendar
} from 'lucide-react';
import { api } from '../services/api';

export default function Handovers({ user, neonateId }) {
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
      // Fetch current shift rota
      const rotaRes = await api.getCurrentRota();
      if (rotaRes.success) setCurrentRota(rotaRes.rota);

      // Fetch neonate details if ID provided
      if (neonateId) {
        const neonateRes = await api.get('/neonates/' + neonateId);
        if (neonateRes.success) {
          setSelectedNeonate(neonateRes.neonate);
          setFormData(prev => ({ ...prev, neonate: neonateId }));
        }
        
        const handoverRes = await api.getHandovers(neonateId);
        if (handoverRes.success) setHandovers(handoverRes.handovers);
      } else {
        // Fetch all recent handovers for the unit
        const res = await api.get('/handovers/recent');
        if (res.success) setHandovers(res.handovers);
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
    <div className="p-4 lg:p-10 bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ArrowRightLeft className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {selectedNeonate ? `Handovers: ${selectedNeonate.name}` : 'Unit Shift Handovers'}
                </h1>
             </div>
             <p className="text-slate-500 font-medium">Coordinate clinical transitions and vital status tracking.</p>
          </div>
          {neonateId && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-5 h-5" /> Start Handover
            </button>
          )}
        </div>

        {/* Current Shift Status Bar */}
        <div className="mb-10 p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-5">
              <div className={`w-14 h-14 bg-${getShiftColor(currentRota?.shift || 'Morning')}-50 rounded-2xl flex items-center justify-center text-${getShiftColor(currentRota?.shift || 'Morning')}-500`}>
                 <Clock className="w-7 h-7" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active Unit Shift</p>
                 <h2 className="text-xl font-black text-slate-900 tracking-tight">{currentRota?.shift || 'Shift Not Defined'}</h2>
              </div>
           </div>

           <div className="flex flex-wrap gap-4">
              <div className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinical Lead</p>
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-bold text-slate-700">{currentRota?.consultant?.name || 'Unassigned'}</span>
                 </div>
              </div>
              <div className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">On-Duty Manager</p>
                 <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-teal-500" />
                    <span className="text-sm font-bold text-slate-700">{currentRota?.manager?.name || 'Unassigned'}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Handover Timeline */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center">
             <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Compiling Shift Reports...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {handovers.length === 0 ? (
               <div className="py-32 flex flex-col items-center justify-center text-center bg-white rounded-[40px] border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
                     <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">No Handovers Recorded</h3>
                  <p className="text-sm text-slate-500 max-w-xs mt-2">Start a new handover to record shift commentary and vitals.</p>
               </div>
            ) : (
              handovers.map((h, i) => (
                <div key={i} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-tiny relative overflow-hidden group">
                   {/* Shift Badge */}
                   <div className={`absolute top-0 right-0 px-8 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest bg-${getShiftColor(h.shift)}-100 text-${getShiftColor(h.shift)}-700 shadow-sm`}>
                      {h.shift} Shift
                   </div>

                   <div className="flex flex-col lg:flex-row gap-10">
                      {/* Patient & Staff Info */}
                      <div className="lg:w-1/3">
                         {!neonateId && (
                           <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Patient</p>
                              <h3 className="text-lg font-black text-slate-900 tracking-tight">{h.neonate?.name}</h3>
                              <span className="text-[10px] font-bold text-slate-400">{h.neonate?.hospitalNumber}</span>
                           </div>
                         )}
                         
                         <div className="space-y-4">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                  <User className="w-6 h-6" />
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Handed Over By</p>
                                  <p className="text-sm font-bold text-slate-700">{h.nurseOnDuty?.name}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                  <Calendar className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Date & Time</p>
                                  <p className="text-sm font-bold text-slate-700">{new Date(h.createdAt).toLocaleString()}</p>
                               </div>
                            </div>
                         </div>

                         {/* Vitals Quick View */}
                         <div className="mt-10 grid grid-cols-2 gap-3">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                               <Thermometer className="w-4 h-4 text-amber-500 mb-2" />
                               <p className="text-sm font-black text-slate-900">{h.vitals?.temperature}°C</p>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Temperature</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                               <Droplets className="w-4 h-4 text-primary mb-2" />
                               <p className="text-sm font-black text-slate-900">{h.vitals?.oxygenSaturation}%</p>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SPO2</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                               <Zap className="w-4 h-4 text-emerald-500 mb-2" />
                               <p className="text-sm font-black text-slate-900">{h.vitals?.sugarLevel} mmol/L</p>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sugar</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                               <Heart className="w-4 h-4 text-rose-500 mb-2" />
                               <p className="text-sm font-black text-slate-900">{h.vitals?.heartRate} bpm</p>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Heart Rate</span>
                            </div>
                         </div>
                      </div>

                      {/* Commentary & Investigations */}
                      <div className="flex-1 lg:pl-10 lg:border-l border-slate-50">
                         <div className="mb-8">
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                               <FileText className="w-4 h-4 text-primary" /> Shift Commentary
                            </h4>
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic">
                               <p className="text-sm text-slate-600 font-medium leading-relaxed leading-none">
                                  "{h.commentary || 'No commentary recorded for this shift.'}"
                                </p>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">Liver Function</p>
                               <p className="text-xs font-bold text-slate-700">{h.investigations?.liver || 'Not tested'}</p>
                            </div>
                            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">Kidney Function</p>
                               <p className="text-xs font-bold text-slate-700">{h.investigations?.kidney || 'Not tested'}</p>
                            </div>
                            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">Full Blood Count</p>
                               <p className="text-xs font-bold text-slate-700">{h.investigations?.fbc || 'Not tested'}</p>
                            </div>
                         </div>

                         <div>
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                               <Zap className="w-4 h-4 text-amber-500" /> Clinical Plan
                            </h4>
                            <p className="text-sm text-slate-600 font-bold bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
                               {h.plan || 'Maintain current protocols.'}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Shift Handover</h3>
                    <p className="text-sm text-slate-500 font-medium">Recording report for {selectedNeonate?.name}</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <form onSubmit={handleSaveHandover} className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Temperature (°C)</label>
                       <input type="number" step="0.1" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:border-primary text-sm font-bold" 
                         value={formData.vitals.temperature} onChange={e => setFormData({...formData, vitals: {...formData.vitals, temperature: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Oxygen Saturation (%)</label>
                       <input type="number" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:border-primary text-sm font-bold" 
                         value={formData.vitals.oxygenSaturation} onChange={e => setFormData({...formData, vitals: {...formData.vitals, oxygenSaturation: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sugar Level (mmol/L)</label>
                       <input type="number" step="0.1" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:border-primary text-sm font-bold" 
                         value={formData.vitals.sugarLevel} onChange={e => setFormData({...formData, vitals: {...formData.vitals, sugarLevel: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Heart Rate (bpm)</label>
                       <input type="number" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:border-primary text-sm font-bold" 
                         value={formData.vitals.heartRate} onChange={e => setFormData({...formData, vitals: {...formData.vitals, heartRate: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Resp Rate (cpm)</label>
                       <input type="number" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:border-primary text-sm font-bold" 
                         value={formData.vitals.respiratoryRate} onChange={e => setFormData({...formData, vitals: {...formData.vitals, respiratoryRate: e.target.value}})} />
                    </div>
                 </div>

                 <div className="space-y-2 mb-8">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Clinical Commentary</label>
                    <textarea required className="w-full p-6 bg-slate-50 rounded-3xl border border-slate-100 outline-none focus:border-primary text-sm font-bold h-32 resize-none" 
                      placeholder="Detailed shift observations..."
                      value={formData.commentary} onChange={e => setFormData({...formData, commentary: e.target.value})} />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Liver Findings</label>
                       <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none text-sm font-bold" 
                         value={formData.investigations.liver} onChange={e => setFormData({...formData, investigations: {...formData.investigations, liver: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Kidney Findings</label>
                       <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none text-sm font-bold" 
                         value={formData.investigations.kidney} onChange={e => setFormData({...formData, investigations: {...formData.investigations, kidney: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">FBC Results</label>
                       <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none text-sm font-bold" 
                         value={formData.investigations.fbc} onChange={e => setFormData({...formData, investigations: {...formData.investigations, fbc: e.target.value}})} />
                    </div>
                 </div>

                 <div className="space-y-2 mb-8">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Next Shift Plan</label>
                    <textarea required className="w-full p-6 bg-amber-50/50 rounded-3xl border border-amber-100 outline-none focus:border-amber-500 text-sm font-bold h-24 resize-none" 
                      placeholder="Primary clinical goals for the incoming team..."
                      value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value})} />
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <Check className="w-5 h-5" /> Submit Official Handover
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
