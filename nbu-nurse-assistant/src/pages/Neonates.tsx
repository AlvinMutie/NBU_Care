import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Filter, MoreVertical, Calendar, Weight } from 'lucide-react';

const Neonates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const neonates = [
    { id: 1, name: 'Baby Mary Jane', hospital_number: 'NBU-001', dob: '2026-06-01', weight: 1.250, status: 'Critical', gender: 'Female' },
    { id: 2, name: 'Baby John Doe', hospital_number: 'NBU-002', dob: '2026-05-28', weight: 2.100, status: 'Stable', gender: 'Male' },
    { id: 3, name: 'Baby Sarah Connor', hospital_number: 'NBU-003', dob: '2026-06-03', weight: 0.950, status: 'Serious', gender: 'Female' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Patient Registry</h2>
          <p className="text-slate-400 text-sm sm:text-base">Manage admissions and monitor clinical status.</p>
        </div>
        <button className="glass-button flex items-center space-x-2 w-full lg:w-auto justify-center py-3 sm:py-2 px-6">
          <UserPlus size={20} />
          <span className="font-bold">New Admission</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or hospital ID..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="glass-card px-6 py-3 flex items-center justify-center space-x-2 text-slate-300 hover:text-slate-100 transition-colors border-white/10 hover:border-white/20">
          <Filter size={20} />
          <span className="font-medium">Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {neonates.map((neonate) => (
          <div key={neonate.id} className="glass-card p-5 sm:p-6 group hover:border-emerald-500/30 transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <button className="text-slate-500 hover:text-slate-100 transition-colors p-1 rounded-lg hover:bg-white/5">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg
                ${neonate.gender === 'Female' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}
              `}>
                {neonate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-tight">{neonate.name}</h3>
                <p className="text-xs font-bold text-emerald-500 font-mono tracking-wider">{neonate.hospital_number}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 bg-black/20 p-3 rounded-xl border border-white/5">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Birth Date</span>
                <div className="flex items-center space-x-1.5 text-slate-300">
                  <Calendar size={14} className="text-emerald-500/70" />
                  <span className="text-xs font-medium">{neonate.dob}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Weight</span>
                <div className="flex items-center space-x-1.5 text-slate-300">
                  <Weight size={14} className="text-emerald-500/70" />
                  <span className="text-xs font-mono font-medium">{neonate.weight.toFixed(3)} kg</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className={`
                px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter
                ${neonate.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                  neonate.status === 'Serious' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}
              `}>
                {neonate.status}
              </span>
              <Link 
                to={`/neonates/${neonate.hospital_number}`}
                className="text-[10px] font-bold text-slate-400 hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center space-x-1"
              >
                <span>View Profile</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Neonates;
