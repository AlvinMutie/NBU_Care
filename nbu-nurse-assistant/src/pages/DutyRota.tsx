import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, 
  Plus, Clock, 
  Phone, ArrowRight, CheckCircle2,
  CalendarDays, Download, X, User as UserIcon, AlertCircle
} from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const DutyRota: React.FC = () => {
  const [shifts, setShifts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllocModal, setShowAllocModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const [newShift, setNewShift] = useState({
    user_id: '',
    shift: 'Morning',
    date: new Date().toISOString().split('T')[0],
    role_assigned: 'Clinician',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [shiftsRes, usersRes] = await Promise.all([
        api.get('/shifts'),
        api.get('/admin/users')
      ]);
      setShifts(shiftsRes.data.data);
      setUsers(usersRes.data.data);
    } catch (err) {
      console.error('Failed to fetch rota data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignShift = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.post('/shifts/assign', {
        ...newShift,
        user_id: parseInt(newShift.user_id)
      });
      setMessage({ type: 'success', text: 'Shift allocated and synchronized.' });
      setTimeout(() => {
        setShowAllocModal(false);
        setMessage(null);
        fetchData();
      }, 1500);
    } catch (err: any) {
      console.error('Shift assignment failed:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Protocol conflict. Allocation failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && shifts.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Syncing Duty Rota...</p>
      </div>
    );
  }

  const groupedShifts = shifts.reduce((acc: any, shift: any) => {
    const dateStr = new Date(shift.date).toLocaleDateString('en-US', { day: 'numeric', weekday: 'short', month: 'short' });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(shift);
    return acc;
  }, {});

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Workforce Orchestration</h2>
          <p className="text-slate-500 font-medium">Manage clinical rotations, lead assignments, and unit coverage.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
            onClick={() => setShowAllocModal(true)}
            className="bg-slate-900 dark:bg-emerald-600 text-white flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-black dark:hover:bg-emerald-700 transition-all active:scale-95"
           >
              <Plus size={18} strokeWidth={3} />
              <span>Allocate New Shift</span>
           </button>
        </div>
      </div>

      <AnimatePresence>
        {showAllocModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl space-y-8"
             >
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-bold tracking-tight">Shift Allocation</h3>
                   <button onClick={() => setShowAllocModal(false)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                </div>

                {message && (
                  <div className={`p-4 rounded-2xl flex items-center space-x-3 border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <p className="text-xs font-bold">{message.text}</p>
                  </div>
                )}

                <form onSubmit={handleAssignShift} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select Personnel</label>
                      <select 
                        value={newShift.user_id}
                        onChange={(e) => setNewShift({...newShift, user_id: e.target.value})}
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                        required
                      >
                         <option value="">Choose Staff Member</option>
                         {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                      </select>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Shift Type</label>
                         <select 
                           value={newShift.shift}
                           onChange={(e) => setNewShift({...newShift, shift: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-xl text-sm font-bold outline-none"
                         >
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Night">Night</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Date</label>
                         <input 
                           type="date"
                           value={newShift.date}
                           onChange={(e) => setNewShift({...newShift, date: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-xl text-sm font-bold outline-none"
                           required
                         />
                      </div>
                   </div>
                   <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 hover:bg-black transition-all">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <span>Authenticate Allocation</span>}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         {/* Calendar Navigator */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm">
               <div className="grid grid-cols-7 gap-1 text-center mb-6">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <span key={d} className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{d}</span>
                  ))}
               </div>
               <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <button key={i} className={`aspect-square flex items-center justify-center text-xs font-bold rounded-2xl transition-all duration-300 ${i + 1 === new Date().getDate() ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xl' : 'text-slate-400 hover:bg-[var(--bg-main)]'}`}>{i + 1}</button>
                  ))}
               </div>
            </div>
         </div>

         {/* Personnel Allocated Timeline */}
         <div className="lg:col-span-8 space-y-10">
            {Object.keys(groupedShifts).length === 0 ? (
               <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-20 rounded-[3rem] text-center space-y-6">
                  <div className="w-16 h-16 bg-[var(--bg-main)] rounded-2xl flex items-center justify-center mx-auto text-slate-300"><Clock size={32} /></div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No Active Allocations Found</p>
               </div>
            ) : Object.entries(groupedShifts).map(([date, dayShifts]: any) => (
              <div key={date} className="space-y-6">
                 <div className="flex items-center space-x-4 px-4">
                    <span className="text-2xl font-black text-[var(--text-main)] tracking-tighter">{date}</span>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    {dayShifts.map((shift: any) => (
                      <div key={shift.id} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-[2rem] shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                         <div className="flex items-center space-x-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[10px] ${shift.shift_type === 'Morning' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                               {shift.user.name.split(' ').map((n: any) => n[0]).join('')}
                            </div>
                            <div>
                               <p className="text-base font-bold text-[var(--text-main)]">{shift.user.name}</p>
                               <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{shift.shift_type}</span>
                                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{shift.user.role}</span>
                               </div>
                            </div>
                         </div>
                         <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ID: #{shift.id}</p>
                            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">{shift.status}</p>
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
