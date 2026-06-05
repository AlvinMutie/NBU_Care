import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  User as UserIcon, 
  Activity, 
  ChevronRight,
  Clock,
  Baby,
  Stethoscope,
  X,
  Check,
  Calendar,
  Weight,
  Loader2,
  Phone
} from 'lucide-react';
import { api } from '../services/api';

export default function Neonates({ user, onNavigate }) {
  const [neonates, setNeonates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    hospitalNumber: '',
    name: '',
    dob: '',
    gender: 'Male',
    birthWeight: '',
    currentWeight: '',
    gestationalAge: '',
    admissionDiagnosis: '',
    history: '',
    motherName: '',
    motherPhone: ''
  });

  useEffect(() => {
    fetchNeonates();
  }, []);

  const fetchNeonates = async () => {
    setLoading(true);
    try {
      const res = await api.getNeonates();
      if (res.success) setNeonates(res.neonates);
    } catch (err) {
      console.error('Failed to fetch neonates', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await api.saveNeonate(formData);
      if (res.success) {
        fetchNeonates();
        setIsModalOpen(false);
        setFormData({
          hospitalNumber: '', name: '', dob: '', gender: 'Male',
          birthWeight: '', currentWeight: '', gestationalAge: '',
          admissionDiagnosis: '', history: '', motherName: '', motherPhone: ''
        });
      }
    } catch (err) {
      alert('Failed to save neonate. Ensure Hospital Number is unique.');
    }
  };

  const filteredNeonates = neonates.filter(n => 
    n.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.hospitalNumber.includes(searchTerm)
  );

  return (
    <div className="p-4 lg:p-10 bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Baby className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Neonate Registry</h1>
             </div>
             <p className="text-slate-500 font-medium">Manage newborn patients and their clinical biodata.</p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Admit New Neonate
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center">
           <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or Hospital ID..." 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-primary outline-none text-sm font-bold transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{neonates.length} Active Patients</span>
           </div>
        </div>

        {/* Patients Grid */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center">
             <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Accessing Medical Records...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNeonates.map(n => (
              <div 
                key={n._id}
                onClick={() => onNavigate('handovers', { neonateId: n._id })}
                className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                         <UserIcon className="w-7 h-7" />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-slate-900 leading-none mb-1 group-hover:text-primary transition-colors">{n.name}</h3>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{n.hospitalNumber}</span>
                      </div>
                   </div>
                   <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                     n.status === 'Stable' ? 'bg-emerald-100 text-emerald-700' :
                     n.status === 'Critical' ? 'bg-red-100 text-red-700' :
                     'bg-amber-100 text-amber-700'
                   }`}>
                     {n.status}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2">
                      <Weight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{n.currentWeight} kg</span>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{n.gestationalAge} wks</span>
                   </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Admission Diagnosis</p>
                   <p className="text-xs font-bold text-slate-700 truncate">{n.admissionDiagnosis || 'N/A'}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-500">Adm: {new Date(n.createdAt).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center text-primary font-black text-[10px] uppercase tracking-widest gap-1 group-hover:gap-2 transition-all">
                      Open Clinical File <ChevronRight className="w-3 h-3" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNeonates.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 bg-slate-100 rounded-[40px] flex items-center justify-center text-slate-300 mb-6">
                <Search className="w-10 h-10" />
             </div>
             <h3 className="text-xl font-black text-slate-900 mb-2">No Patients Found</h3>
             <p className="text-slate-500 font-medium max-w-xs">Try adjusting your search or admit a new neonate to the unit.</p>
          </div>
        )}
      </div>

      {/* Admission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Patient Admission</h3>
                    <p className="text-sm text-slate-500 font-medium">Enter clinical biodata for the new neonate.</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <form onSubmit={handleSave} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Hospital Number</label>
                       <input 
                         required
                         type="text"
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         placeholder="e.g. NBU-2024-001"
                         value={formData.hospitalNumber}
                         onChange={e => setFormData({...formData, hospitalNumber: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                       <input 
                         required
                         type="text"
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         placeholder="e.g. Baby Jane Doe"
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Date of Birth</label>
                       <input 
                         required
                         type="date"
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         value={formData.dob}
                         onChange={e => setFormData({...formData, dob: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Gender</label>
                       <select 
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         value={formData.gender}
                         onChange={e => setFormData({...formData, gender: e.target.value})}
                       >
                         <option>Male</option>
                         <option>Female</option>
                         <option>Other</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Birth Weight (kg)</label>
                       <input 
                         required
                         type="number" step="0.01"
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         value={formData.birthWeight}
                         onChange={e => setFormData({...formData, birthWeight: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Weight (kg)</label>
                       <input 
                         required
                         type="number" step="0.01"
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         value={formData.currentWeight}
                         onChange={e => setFormData({...formData, currentWeight: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Gestational Age (weeks)</label>
                       <input 
                         required
                         type="number"
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         value={formData.gestationalAge}
                         onChange={e => setFormData({...formData, gestationalAge: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mother's Phone</label>
                       <input 
                         type="tel"
                         className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                         placeholder="+254..."
                         value={formData.motherPhone}
                         onChange={e => setFormData({...formData, motherPhone: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="space-y-2 mb-6">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Admission Diagnosis</label>
                    <textarea 
                       className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700 h-24 resize-none"
                       placeholder="Enter primary clinical diagnosis..."
                       value={formData.admissionDiagnosis}
                       onChange={e => setFormData({...formData, admissionDiagnosis: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2 mb-8">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Clinical History</label>
                    <textarea 
                       className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700 h-32 resize-none"
                       placeholder="Enter relevant maternal/birth history..."
                       value={formData.history}
                       onChange={e => setFormData({...formData, history: e.target.value})}
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <Check className="w-5 h-5" /> Confirm Admission
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
