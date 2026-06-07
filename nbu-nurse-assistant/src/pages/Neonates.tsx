import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, UserPlus, Filter, MoreVertical, 
  Calendar, Weight, Activity, ArrowRight, Heart, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';

const Neonates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const neonates = [
    { id: 1, name: 'Baby Mary Jane', hospital_number: 'NBU-001', dob: '2026-06-05', weight: 1.250, status: 'Critical', gender: 'Female' },
    { id: 2, name: 'Baby John Doe', hospital_number: 'NBU-002', dob: '2026-06-04', weight: 2.100, status: 'Serious', gender: 'Male' },
    { id: 3, name: 'Baby Sarah Connor', hospital_number: 'NBU-003', dob: '2026-06-06', weight: 1.850, status: 'Stable', gender: 'Female' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Ward Patient Registry</h2>
          <p className="text-slate-500 font-medium">Digital census of all active neonatal admissions and clinical status.</p>
        </div>
        <button className="bg-slate-900 text-white flex items-center space-x-2 px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-95">
          <UserPlus size={18} strokeWidth={3} />
          <span>New Clinical Admission</span>
        </button>
      </div>

      {/* Modern Filter & Search (Mobbin Style) */}
      <div className="bg-white border border-slate-200 p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, hospital ID or bed number..."
            className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 px-6 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
          <Filter size={14} />
          <span>Status Filter</span>
        </button>
      </div>

      {/* Professional Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {neonates.map((neonate) => (
          <motion.div 
            key={neonate.id}
            whileHover={{ y: -5 }}
            className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-6">
               <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border-2 ${neonate.gender === 'Female' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                    {neonate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    neonate.status === 'Critical' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100 border-rose-600' :
                    neonate.status === 'Serious' ? 'bg-amber-400 text-white shadow-lg shadow-amber-100 border-amber-500' :
                    'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {neonate.status}
                  </span>
               </div>

               <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">{neonate.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: <span className="font-mono text-slate-600">{neonate.hospital_number}</span></p>
               </div>

               <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
                  <div className="space-y-1">
                     <div className="flex items-center space-x-1.5 text-slate-400">
                        <Calendar size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Birth Date</span>
                     </div>
                     <p className="text-xs font-bold text-slate-700">{neonate.dob}</p>
                  </div>
                  <div className="space-y-1">
                     <div className="flex items-center space-x-1.5 text-slate-400">
                        <Weight size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Adm Weight</span>
                     </div>
                     <p className="text-xs font-bold text-slate-700 font-mono">{neonate.weight.toFixed(3)} kg</p>
                  </div>
               </div>

               <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-1 text-slate-300">
                     <Heart size={14} />
                     <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-400 w-[70%]" />
                     </div>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-300">
                     <Droplets size={14} />
                     <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-[85%]" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-8 flex items-center justify-between">
               <Link 
                  to={`/neonates/${neonate.hospital_number}`}
                  className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-emerald-600 transition-all"
               >
                  <span>View Full Profile</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
               </Link>
               <button className="p-2 text-slate-200 hover:text-slate-900 transition-colors">
                  <MoreVertical size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Structural Stats Bar */}
      <div className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
         <div className="flex items-center space-x-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
               <Activity size={28} />
            </div>
            <div>
               <p className="text-2xl font-bold tracking-tight">Active Ward Census</p>
               <p className="text-sm text-slate-400 font-medium">85% Occupancy • 12 Beds Remaining</p>
            </div>
         </div>
         <div className="flex items-center space-x-3">
            <div className="flex -space-x-3">
               {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">RN</div>)}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-4">Staff on Duty</p>
         </div>
      </div>
    </div>
  );
};

export default Neonates;
