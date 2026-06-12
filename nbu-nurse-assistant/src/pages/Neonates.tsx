import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, UserPlus, Filter, MoreVertical, 
  Calendar, Weight, Activity, ArrowRight, Heart, Droplets, X, Save, Scale, Baby, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Neonates: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [neonates, setNeonates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem('user_data') || '{}');
    } catch {
      return {};
    }
  };

  const user = getUserData();
  const isStudent = user?.role === 'Student';

  const [formData, setFormData] = useState({
    name: '',
    hospital_number: '',
    dob: new Date().toISOString().split('T')[0],
    gender: 'Male',
    birth_weight: '',
    current_weight: '',
    gestational_age: '',
    status: 'Stable'
  });

  const fetchNeonates = async () => {
    setLoading(true);
    try {
      const response = await api.get('/neonates');
      setNeonates(response.data.data);
    } catch (err) {
      setError('Failed to synchronize ward registry.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeonates();
  }, []);

  const handleAdmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/neonates', {
        ...formData,
        birth_weight: parseFloat(formData.birth_weight),
        current_weight: parseFloat(formData.current_weight),
        gestational_age: parseInt(formData.gestational_age)
      });
      setShowAddModal(false);
      fetchNeonates();
      setFormData({
        name: '',
        hospital_number: '',
        dob: new Date().toISOString().split('T')[0],
        gender: 'Male',
        birth_weight: '',
        current_weight: '',
        gestational_age: '',
        status: 'Stable'
      });
    } catch (err) {
      console.error('Admission failed:', err);
      alert('Failed to admit neonate. Check if Hospital ID is unique.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredNeonates = (neonates || []).filter(n => {
    const matchesSearch = (n.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (n.hospital_number || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (isStudent) return matchesSearch && n.is_simulated;
    return matchesSearch;
  });

  if (loading && neonates.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Accessing Ward Census...</p>
      </div>
    );
  }

  const handleViewProfile = (id: any) => {
    if (!id) {
       console.error('Invalid Neonate ID localized.');
       alert('Access failed: Clinical record identifier missing.');
       return;
    }
    navigate(`/neonates/${id}`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">{isStudent ? 'Virtual Ward' : 'Ward Patient Registry'}</h2>
          <p className="text-slate-500 font-medium">{isStudent ? 'Your simulated patient environment for clinical training.' : 'Digital census of all active neonatal admissions and clinical status.'}</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-slate-900 dark:bg-emerald-600 text-white flex items-center space-x-2 px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-black dark:hover:bg-emerald-700 transition-all active:scale-95"
        >
          <UserPlus size={18} strokeWidth={3} />
          <span>{isStudent ? 'Create Simulated Case' : 'New Clinical Admission'}</span>
        </button>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-3xl sm:rounded-[3rem] w-full max-w-2xl p-6 sm:p-10 shadow-2xl space-y-6 sm:space-y-8 overflow-y-auto max-h-[90vh] custom-scrollbar"
             >
                <div className="flex justify-between items-center">
                   <h3 className="text-xl sm:text-2xl font-bold tracking-tight">New Clinical Admission</h3>
                   <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                </div>

                <form onSubmit={handleAdmission} className="space-y-4 sm:space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Patient Full Name</label>
                      <input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                        placeholder="e.g. Baby Liam"
                        required
                      />
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Hospital Number</label>
                         <input 
                           value={formData.hospital_number}
                           onChange={(e) => setFormData({...formData, hospital_number: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none"
                           placeholder="HOSP-NBU-XXX"
                           required
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Date of Birth</label>
                         <input 
                           type="date"
                           value={formData.dob}
                           onChange={(e) => setFormData({...formData, dob: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none"
                           required
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Gender</label>
                         <select 
                           value={formData.gender}
                           onChange={(e) => setFormData({...formData, gender: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none"
                         >
                            <option>Male</option>
                            <option>Female</option>
                         </select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Gestational Age (Weeks)</label>
                         <input 
                           type="number"
                           value={formData.gestational_age}
                           onChange={(e) => setFormData({...formData, gestational_age: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none"
                           placeholder="e.g. 32"
                           required
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Birth Weight (kg)</label>
                         <input 
                           type="number" step="0.001"
                           value={formData.birth_weight}
                           onChange={(e) => setFormData({...formData, birth_weight: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none"
                           placeholder="e.g. 1.250"
                           required
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Weight (kg)</label>
                         <input 
                           type="number" step="0.001"
                           value={formData.current_weight}
                           onChange={(e) => setFormData({...formData, current_weight: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none"
                           placeholder="e.g. 1.250"
                           required
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Initial Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-3 sm:p-4 rounded-2xl text-sm font-bold outline-none"
                      >
                         <option>Stable</option>
                         <option>Serious</option>
                         <option>Critical</option>
                      </select>
                   </div>

                   <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-4 sm:py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 hover:bg-black dark:hover:bg-emerald-700 transition-all disabled:opacity-50"
                   >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save size={18} />
                          <span>Finalize Admission</span>
                        </>
                      )}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Filter & Search */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, hospital ID or bed number..."
            className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-bold text-[var(--text-main)] outline-none placeholder:text-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 px-6 py-3.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <Filter size={14} />
          <span>Status Filter</span>
        </button>
      </div>

      {/* Professional Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNeonates.map((neonate) => (
          <motion.div 
            key={neonate.id}
            whileHover={{ y: -5 }}
            className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-6">
               <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border-2 ${neonate.gender === 'Female' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800 text-rose-600' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-600'}`}>
                    {neonate.name.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    neonate.status === 'Critical' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100 border-rose-600' :
                    neonate.status === 'Serious' ? 'bg-amber-400 text-white shadow-lg shadow-amber-100 border-amber-500' :
                    'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800'
                  }`}>
                    {neonate.status || 'Stable'}
                  </span>
               </div>

               <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight group-hover:text-emerald-700 transition-colors">{neonate.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: <span className="font-mono text-slate-600 dark:text-slate-300">{neonate.hospital_number}</span></p>
               </div>

               <div className="grid grid-cols-2 gap-4 py-6 border-y border-[var(--border-main)]">
                  <div className="space-y-1">
                     <div className="flex items-center space-x-1.5 text-slate-400">
                        <Calendar size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Birth Date</span>
                     </div>
                     <p className="text-xs font-bold text-[var(--text-main)]">{neonate.dob}</p>
                  </div>
                  <div className="space-y-1">
                     <div className="flex items-center space-x-1.5 text-slate-400">
                        <Weight size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Adm Weight</span>
                     </div>
                     <p className="text-xs font-bold text-[var(--text-main)] font-mono">{(neonate.birth_weight || neonate.weight || 0).toFixed(3)} kg</p>
                  </div>
               </div>

               <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-1 text-slate-300 dark:text-slate-600">
                     <Heart size={14} />
                     <div className="w-10 h-1.5 bg-[var(--bg-main)] rounded-full overflow-hidden">
                        <div className="h-full bg-rose-400 w-[70%]" />
                     </div>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-300 dark:text-slate-600">
                     <Droplets size={14} />
                     <div className="w-10 h-1.5 bg-[var(--bg-main)] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-[85%]" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-8 flex items-center justify-between">
               <button 
                  onClick={() => handleViewProfile(neonate.id)}
                  className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-emerald-600 transition-all"
               >
                  <span>View Full Profile</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
               </button>
               <button className="p-2 text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <MoreVertical size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Structural Stats Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 text-white flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl dark:shadow-none overflow-hidden relative group">
         <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
         
         <div className="flex items-center space-x-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
               <Activity size={28} />
            </div>
            <div>
               <p className="text-2xl font-bold tracking-tight leading-none mb-2">Ward Census Matrix</p>
               <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">{neonates.length} Admissions • {30 - neonates.length} Beds Remaining</p>
            </div>
         </div>

         {/* Cinema-style Bed Matrix */}
         <div className="flex flex-col items-center lg:items-end space-y-4 relative z-10">
            <div className="grid grid-cols-10 gap-2 sm:gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
               {Array.from({ length: 30 }).map((_, i) => {
                  const isOccupied = i < (neonates?.length || 0);
                  const neonate = isOccupied ? neonates[i] : null;
                  const isCritical = neonate?.status === 'Critical';
                  
                  return (
                     <div 
                        key={i} 
                        title={isOccupied ? `Bed ${i+1}: ${neonate.name}` : `Bed ${i+1}: Available`}
                        className={`
                           w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-all duration-500
                           ${isOccupied 
                              ? (isCritical ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]') 
                              : 'bg-white/10 hover:bg-white/20 border border-white/5'}
                        `} 
                     />
                  );
               })}
            </div>
            <div className="flex items-center space-x-6 text-[9px] font-black uppercase tracking-widest text-slate-400">
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-sm bg-emerald-500" />
                  <span>Stable</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-sm bg-rose-500" />
                  <span>Critical</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-sm bg-white/10 border border-white/5" />
                  <span>Available</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Neonates;
