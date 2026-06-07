import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, 
  Plus, Clock, 
  Phone, ArrowRight, CheckCircle2,
  CalendarDays, Download
} from 'lucide-react';

const DutyRota: React.FC = () => {
  const [currentMonth] = useState('June 2026');

  const shifts = [
    { day: 7, date: 'Sun', shifts: [
      { type: 'Morning', time: '07:30 - 14:30', staff: [
        { name: 'Teresa Njoroge', role: 'In-Charge', phone: '+254 712 345 678' },
        { name: 'Patrick Kamau', role: 'Staff Nurse', phone: '+254 722 987 654' },
        { name: 'Dr. Cynthia Wekesa', role: 'Medical Officer', phone: '+254 733 111 222' }
      ], lead: 'Teresa Njoroge' },
      { type: 'Afternoon', time: '14:30 - 20:30', staff: [
        { name: 'Dr. Angela Omwansa', role: 'Consultant', phone: '+254 744 555 666' },
        { name: 'John Doe', role: 'Staff Nurse', phone: '+254 755 000 111' }
      ], lead: 'Angela Omwansa' },
    ]},
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Workforce Orchestration</h2>
          <p className="text-slate-500 font-medium">Manage clinical rotations, lead assignments, and unit coverage.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-[var(--bg-main)] border border-[var(--border-main)] text-slate-600 dark:text-slate-400 flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm">
              <Download size={14} />
              <span>Export Schedule</span>
           </button>
           <button className="bg-slate-900 dark:bg-emerald-600 text-white flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-black dark:hover:bg-emerald-700 transition-all active:scale-95">
              <Plus size={18} strokeWidth={3} />
              <span>Allocate New Shift</span>
           </button>
        </div>
      </div>

      {/* Month Transition Controller */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-6 rounded-[2rem] shadow-sm flex items-center justify-between">
         <div className="flex items-center space-x-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center border border-emerald-100 dark:border-emerald-800 shadow-sm">
               <CalendarDays size={24} />
            </div>
            <div>
               <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight">{currentMonth}</h3>
               <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Planning Cycle Active</span>
               </div>
            </div>
         </div>
         <div className="flex items-center bg-[var(--bg-main)] p-1 rounded-xl border border-[var(--border-main)]">
            <button className="p-2.5 hover:bg-[var(--card-bg)] hover:shadow-sm rounded-lg text-slate-400 hover:text-[var(--text-main)] transition-all"><ChevronLeft size={20} /></button>
            <div className="w-px h-6 bg-[var(--border-main)] mx-2" />
            <button className="p-2.5 hover:bg-[var(--card-bg)] hover:shadow-sm rounded-lg text-slate-400 hover:text-[var(--text-main)] transition-all"><ChevronRight size={20} /></button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         {/* Minimalist Calendar Navigator */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm">
               <div className="grid grid-cols-7 gap-1 text-center mb-6">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <span key={d} className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{d}</span>
                  ))}
               </div>
               <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <button 
                      key={i} 
                      className={`aspect-square flex items-center justify-center text-xs font-bold rounded-2xl transition-all duration-300 ${i + 1 === 7 ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xl shadow-slate-200 dark:shadow-none scale-105' : 'text-slate-400 hover:bg-[var(--bg-main)] hover:text-[var(--text-main)]'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm space-y-8">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-4">Shift Distribution</h4>
               <div className="space-y-6">
                  {[
                    { label: 'Morning Period', val: 12, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Afternoon Period', val: 8, color: 'bg-blue-500', bg: 'bg-blue-50' },
                    { label: 'Night Period', val: 8, color: 'bg-indigo-500', bg: 'bg-indigo-50' },
                  ].map(s => (
                    <div key={s.label} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">{s.label}</span>
                          <span className="text-[var(--text-main)]">{s.val} Assigned</span>
                       </div>
                       <div className={`h-1.5 w-full ${s.bg} dark:bg-slate-800 rounded-full overflow-hidden`}>
                          <div className={`h-full ${s.color}`} style={{ width: `${(s.val/28)*100}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Refined Shift Details Timeline */}
         <div className="lg:col-span-8 space-y-10">
            {shifts.map(day => (
              <div key={day.day} className="space-y-8">
                 <div className="flex items-center space-x-4 px-4">
                    <span className="text-4xl font-black text-[var(--text-main)] tracking-tighter">{day.day}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--border-main)]" />
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{day.date}</span>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-6">
                    {day.shifts.map(shift => (
                      <div key={shift.type} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[3rem] shadow-sm group hover:border-emerald-200 transition-all flex flex-col md:flex-row gap-10">
                         <div className="md:w-1/3 space-y-6">
                            <div className="space-y-2">
                               <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${shift.type === 'Morning' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800'}`}>
                                  {shift.type} Shift
                               </div>
                               <div className="flex items-center space-x-2 text-slate-400 font-mono text-[11px] font-bold">
                                  <Clock size={14} />
                                  <span>{shift.time}</span>
                               </div>
                            </div>
                            
                            <div className="space-y-1">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shift Leadership</p>
                               <div className="flex items-center space-x-2 text-sm font-bold text-[var(--text-main)] group-hover:text-emerald-700 transition-colors">
                                  <span>{shift.lead}</span>
                                  <CheckCircle2 size={14} className="text-emerald-500" />
                               </div>
                            </div>

                            <button className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-slate-300 hover:text-[var(--text-main)] transition-colors">
                               <span>Modify Allocation</span>
                               <ArrowRight size={14} />
                            </button>
                         </div>

                         <div className="md:w-2/3 space-y-6 border-t md:border-t-0 md:border-l border-[var(--border-main)] pt-6 md:pt-0 md:pl-10">
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel & Direct Contacts</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               {shift.staff.map((s, idx) => (
                                 <div key={idx} className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl flex items-center justify-between group/card hover:bg-[var(--card-bg)] hover:border-emerald-200 transition-all shadow-sm">
                                    <div className="flex items-center space-x-3">
                                       <div className="w-10 h-10 rounded-[0.9rem] bg-[var(--card-bg)] border border-[var(--border-main)] flex items-center justify-center text-[10px] font-black text-slate-400 shadow-inner group-hover/card:bg-emerald-600 group-hover/card:text-white transition-all duration-500">
                                          {s.name.split(' ').map((n: any) => n[0]).join('')}
                                       </div>
                                       <div>
                                          <p className="text-xs font-bold text-[var(--text-main)]">{s.name}</p>
                                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{s.role}</p>
                                       </div>
                                    </div>
                                    <a href={`tel:${s.phone}`} className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                                       <Phone size={14} />
                                    </a>
                                 </div>
                               ))}
                               <button className="p-4 border-2 border-dashed border-[var(--border-main)] rounded-2xl flex items-center justify-center text-slate-300 hover:border-emerald-200 hover:text-emerald-500 transition-all group/add">
                                  <Plus size={20} className="group-hover/add:scale-110 transition-all" />
                               </button>
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
