import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Thermometer, Droplets, 
  Baby,
  History, Stethoscope, Microscope, Pill, FileText,
  TrendingUp
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const NeonateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('biodata');

  // Mock data for the demonstration
  const neonate = {
    id: id || 'NBU-001',
    name: 'Baby Mary Jane',
    gender: 'Female',
    dob: '2026-06-05',
    tob: '08:45 AM',
    ga: '32 weeks',
    birthWeight: 1.250,
    currentWeight: 1.310,
    status: 'Serious',
    unit: 'NICU',
    room: '04',
    bed: '02',
    mother: 'Jane Mary Smith',
    apgar: { 1: 7, 5: 8, 10: 9 }
  };

  const vitalsData = [
    { time: '08:00', hr: 142, spo2: 96, temp: 36.8 },
    { time: '10:00', hr: 145, spo2: 94, temp: 36.7 },
    { time: '12:00', hr: 138, spo2: 97, temp: 36.9 },
    { time: '14:00', hr: 140, spo2: 95, temp: 36.8 },
    { time: '16:00', hr: 148, spo2: 92, temp: 36.6 },
  ];

  const tabs = [
    { id: 'biodata', name: 'BioData', icon: Baby },
    { id: 'maternal', name: 'Maternal', icon: History },
    { id: 'assessment', name: 'Assessment', icon: Stethoscope },
    { id: 'investigations', name: 'Investigations', icon: Microscope },
    { id: 'monitoring', name: 'Monitoring', icon: TrendingUp },
    { id: 'treatment', name: 'Treatment', icon: Pill },
    { id: 'notes', name: 'Notes', icon: FileText },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      {/* Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/neonates" className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{neonate.name}</h2>
            <p className="text-xs text-emerald-500 font-mono font-bold tracking-widest">{neonate.id} • {neonate.unit} (Bed {neonate.bed})</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${neonate.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
            {neonate.status} Status
          </span>
          <button className="glass-button text-xs py-2 px-4">Emergency Action</button>
        </div>
      </div>

      {/* Tab Navigation (Mobile Optimized) */}
      <div className="glass-card p-1.5 flex items-center overflow-x-auto no-scrollbar space-x-1 sticky top-0 z-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap
              ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}
            `}
          >
            <tab.icon size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'biodata' && (
            <motion.div 
              key="biodata"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="glass-card p-6 space-y-6">
                <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Patient Identification</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Full Name</p>
                    <p className="text-slate-100 font-bold">{neonate.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Gender</p>
                    <p className="text-slate-100 font-bold">{neonate.gender}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Date of Birth</p>
                    <p className="text-slate-100 font-bold">{neonate.dob}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Time of Birth</p>
                    <p className="text-slate-100 font-bold">{neonate.tob}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 space-y-6">
                <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Clinical Baseline</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Gestational Age</p>
                    <p className="text-slate-100 font-bold">{neonate.ga}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Birth Weight</p>
                    <p className="text-emerald-400 font-bold font-mono">{neonate.birthWeight.toFixed(3)} kg</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">APGAR (1/5/10m)</p>
                    <p className="text-slate-100 font-bold">{neonate.apgar[1]} / {neonate.apgar[5]} / {neonate.apgar[10]}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Admission Unit</p>
                     <p className="text-slate-100 font-bold">{neonate.unit} - Bed {neonate.bed}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'monitoring' && (
            <motion.div 
              key="monitoring"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Current SpO2', value: '95%', icon: Droplets, color: 'blue' },
                    { label: 'Heart Rate', value: '142 bpm', icon: Heart, color: 'red' },
                    { label: 'Temperature', value: '36.8°C', icon: Thermometer, color: 'amber' },
                  ].map(stat => (
                    <div key={stat.label} className="glass-card p-5 flex items-center justify-between border-l-4 border-emerald-500">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                         <stat.icon size={24} />
                      </div>
                    </div>
                  ))}
               </div>

               <div className="glass-card p-6">
                  <h3 className="text-sm font-bold text-slate-100 mb-6 uppercase tracking-[0.2em]">Vital Trend Analysis (24h)</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={vitalsData}>
                        <defs>
                          <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f1f5f9' }} />
                        <Area type="monotone" dataKey="hr" stroke="#ef4444" fillOpacity={1} fill="url(#colorHr)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               <div className="glass-card p-6">
                  <h3 className="text-sm font-bold text-slate-100 mb-4 uppercase tracking-[0.2em]">Weight Monitoring</h3>
                  <div className="flex items-end space-x-6">
                     <div>
                        <p className="text-4xl font-bold text-emerald-400 font-mono">{neonate.currentWeight.toFixed(3)}<span className="text-sm ml-1 font-sans text-slate-500">kg</span></p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Current Weight</p>
                     </div>
                     <div className="pb-1 text-emerald-400 font-bold flex items-center space-x-1">
                        <TrendingUp size={16} />
                        <span>+60g Gain</span>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'treatment' && (
            <motion.div 
              key="treatment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="glass-card overflow-hidden">
                 <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-100 uppercase tracking-[0.2em]">Active Medications</h3>
                    <button className="text-xs font-bold text-emerald-400 hover:underline">Add Prescription</button>
                 </div>
                 <div className="divide-y divide-white/5">
                    {[
                      { name: 'Gentamicin', dose: '5 mg/kg', freq: 'Once Daily', route: 'IV', time: '10:00 AM' },
                      { name: 'Dopamine', dose: '10 mcg/kg/min', freq: 'Continuous', route: 'IV Infusion', time: 'Ongoing' },
                    ].map(med => (
                      <div key={med.name} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
                         <div className="flex items-center space-x-4">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                               <Pill size={20} />
                            </div>
                            <div>
                               <p className="font-bold text-slate-100">{med.name}</p>
                               <p className="text-xs text-slate-500">{med.dose} • {med.route}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xs font-bold text-slate-400">{med.freq}</p>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{med.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="glass-card p-6 border-l-4 border-blue-500">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Oxygen Therapy</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">Device</span>
                          <span className="text-sm font-bold text-slate-100">Nasal Cannula</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">Flow Rate</span>
                          <span className="text-sm font-bold text-slate-100">0.5 L/min</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">FiO2</span>
                          <span className="text-sm font-bold text-slate-100">24%</span>
                       </div>
                    </div>
                 </div>

                 <div className="glass-card p-6 border-l-4 border-amber-500">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">Fluid Management</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">Total Requirement</span>
                          <span className="text-sm font-bold text-slate-100">120 ml/kg/day</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">Hourly Rate</span>
                          <span className="text-sm font-bold text-emerald-400 font-mono">6.5 ml/hr</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">IV Fluid Type</span>
                          <span className="text-sm font-bold text-slate-100">D10% + Electrolytes</span>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* Other tabs placeholders for now */}
          {(['maternal', 'assessment', 'investigations', 'notes'].includes(activeTab)) && (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-20 flex flex-col items-center justify-center text-center space-y-4"
            >
               <div className="p-4 rounded-full bg-white/5 text-slate-500">
                  <Microscope size={48} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-100">Tab: {activeTab.toUpperCase()}</h3>
                  <p className="text-slate-500 max-w-xs">Detailed medical sub-module implementation in progress for v16.0 Unified Core.</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NeonateProfile;
