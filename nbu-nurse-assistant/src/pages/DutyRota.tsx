import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, ShieldCheck } from 'lucide-react';

const DutyRota: React.FC = () => {
  const [currentMonth] = useState('June 2026');

  const shifts = [
    { day: 7, date: 'Sun', shifts: [
      { type: 'Morning', time: '07:30 - 14:30', staff: [
        { name: 'Teresa Njoroge', role: 'Nursing In-Charge', phone: '+254 712 345 678' },
        { name: 'Patrick Kamau', role: 'Staff Nurse', phone: '+254 722 987 654' },
        { name: 'Cynthia Wekesa', role: 'Medical Officer', phone: '+254 733 111 222' }
      ], lead: 'Teresa Njoroge' },
      { type: 'Afternoon', time: '14:30 - 20:30', staff: [
        { name: 'Angela Omwansa', role: 'Consultant Pediatrician', phone: '+254 744 555 666' },
        { name: 'John Doe', role: 'Staff Nurse', phone: '+254 755 000 111' }
      ], lead: 'Angela Omwansa' },
    ]},
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Duty Rota</h2>
          <p className="text-slate-400">Orchestrate clinician rotations and unit coverage.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button className="glass-card flex items-center space-x-2 py-2.5 px-6 text-slate-300 hover:text-white transition-all">
              <Plus size={18} />
              <span className="font-bold text-sm">Create Schedule</span>
           </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="glass-card p-4 flex items-center justify-between border-l-4 border-emerald-500">
         <div className="flex items-center space-x-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
               <CalendarIcon size={20} />
            </div>
            <div>
               <h3 className="text-lg font-bold text-slate-100">{currentMonth}</h3>
               <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Planning Period</p>
            </div>
         </div>
         <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"><ChevronLeft size={20} /></button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"><ChevronRight size={20} /></button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Calendar View (Simplified) */}
         <div className="lg:col-span-1 space-y-4">
            <div className="glass-card p-6">
               <div className="grid grid-cols-7 gap-1 text-center mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <span key={d} className="text-[10px] font-bold text-slate-500">{d}</span>
                  ))}
               </div>
               <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer transition-all ${i + 1 === 7 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
                      {i + 1}
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-card p-6 space-y-4 bg-emerald-500/5">
               <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Shift Distribution</h4>
               <div className="space-y-3">
                  {[
                    { label: 'Morning', val: 12, color: 'emerald' },
                    { label: 'Afternoon', val: 8, color: 'blue' },
                    { label: 'Night', val: 8, color: 'amber' },
                  ].map(s => (
                    <div key={s.label} className="space-y-1">
                       <div className="flex justify-between text-[10px] font-bold uppercase">
                          <span className="text-slate-500">{s.label}</span>
                          <span className="text-slate-300">{s.val} Slots</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full bg-${s.color}-500`} style={{ width: `${(s.val/28)*100}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Shift Details */}
         <div className="lg:col-span-3 space-y-6">
            {shifts.map(day => (
              <div key={day.day} className="space-y-4">
                 <div className="flex items-center space-x-3 px-2">
                    <span className="text-2xl font-bold text-slate-100">{day.day}</span>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{day.date}</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.shifts.map(shift => (
                      <div key={shift.type} className="glass-card p-5 space-y-4 group hover:border-emerald-500/20 transition-all cursor-pointer">
                         <div className="flex justify-between items-start">
                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight border ${shift.type === 'Morning' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : shift.type === 'Afternoon' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                               {shift.type}
                            </div>
                            <div className="flex items-center space-x-1 text-slate-500 font-mono text-[10px]">
                               <Clock size={12} />
                               <span>{shift.time}</span>
                            </div>
                         </div>
                         <div className="space-y-3">
                            <div className="flex flex-col">
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shift Lead</span>
                               <span className="text-sm font-bold text-slate-100 flex items-center space-x-1">
                                  <span>{shift.lead}</span>
                                  <ShieldCheck size={14} className="text-emerald-500/70" />
                               </span>
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Personnel & Contacts</span>
                               <div className="space-y-2 mt-2">
                                  {shift.staff.map((s, idx) => (
                                    <div key={idx} className="flex items-center justify-between group/staff">
                                       <div className="flex items-center space-x-2">
                                          <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-bold text-slate-400">
                                             {s.name.split(' ').map((n: string) => n[0]).join('')}
                                          </div>
                                          <div>
                                             <p className="text-[10px] font-bold text-slate-200">{s.name}</p>
                                             <p className="text-[8px] text-slate-500 uppercase font-bold">{s.role}</p>
                                          </div>
                                       </div>
                                       <span className="text-[8px] font-mono text-emerald-500/70 group-hover/staff:text-emerald-400 transition-colors">{s.phone}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DutyRota;
