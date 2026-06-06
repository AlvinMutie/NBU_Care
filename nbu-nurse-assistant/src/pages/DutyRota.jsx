import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Users, 
  Phone, 
  User as UserIcon,
  Clock,
  ShieldCheck,
  MoreVertical,
  X,
  Check,
  Search,
  Loader2,
  CalendarDays,
  Database
} from 'lucide-react';
import { api } from '../services/api';

const SHIFTS = ['Morning', 'Afternoon', 'Night'];

export default function DutyRota({ user }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rotas, setRotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    shift: 'Morning',
    nurses: [],
    consultant: '',
    manager: ''
  });

  const isAdmin = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';

  useEffect(() => {
    fetchRotas();
    if (isAdmin) fetchUsers();
  }, [currentDate]);

  const fetchRotas = async () => {
    setLoading(true);
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const res = await api.getRotas(month, year);
      if (res.success) setRotas(res.rotas);
    } catch (err) {
      console.error('Failed to fetch rotas', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.getUsers();
      if (res.success) setAvailableUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getRotasForDay = (day) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = d.toISOString().split('T')[0];
    return rotas.filter(r => new Date(r.date).toISOString().split('T')[0] === dateStr);
  };

  const openDayDetails = (day) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = dayDate.toISOString().split('T')[0];
    const dayRotas = getRotasForDay(day);
    
    setSelectedDay({ day, date: dayDate, rotas: dayRotas });
    setFormData({
      date: dateStr,
      shift: 'Morning',
      nurses: [],
      consultant: '',
      manager: ''
    });
    setIsModalOpen(true);
  };

  const handleSaveRota = async (e) => {
    e.preventDefault();
    try {
      const res = await api.saveRota({ ...formData, createdBy: user._id });
      if (res.success) {
        fetchRotas();
        setIsModalOpen(false);
      }
    } catch (err) {
      alert('Failed to save shift. Please check connection.');
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-24 md:h-40 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/50 dark:border-slate-800/50"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dayRotas = getRotasForDay(d);
      const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
      
      days.push(
        <div 
          key={d} 
          onClick={() => openDayDetails(d)}
          className={`h-24 md:h-40 p-2 md:p-4 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer relative group ${isToday ? 'bg-primary/5 dark:bg-primary/10' : 'bg-white dark:bg-slate-900'}`}
        >
          <span className={`text-xs md:text-sm font-black ${isToday ? 'text-primary' : 'text-slate-400 dark:text-slate-600'}`}>{d}</span>
          <div className="mt-1 md:mt-2 space-y-1 overflow-hidden">
            {dayRotas.slice(0, 2).map((r, i) => (
              <div 
                key={i} 
                className={`text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 rounded-md font-bold truncate flex items-center gap-1 md:gap-1.5 ${
                  r.shift === 'Morning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 
                  r.shift === 'Afternoon' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' : 
                  'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                }`}
              >
                <div className={`w-1 h-1 rounded-full ${
                  r.shift === 'Morning' ? 'bg-amber-500' : 
                  r.shift === 'Afternoon' ? 'bg-teal-500' : 
                  'bg-indigo-500'
                }`} />
                {r.shift}
              </div>
            ))}
            {dayRotas.length > 2 && (
              <div className="text-[8px] md:text-[9px] font-black text-slate-400 px-1">+ {dayRotas.length - 2} more</div>
            )}
          </div>
          {isAdmin && (
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <div className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg active:scale-95">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-4 lg:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen font-sans pb-32 text-left">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Duty Rota</h1>
           </div>
           <p className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">Coordinate nursing shifts and unit clinical leads.</p>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-full md:w-auto justify-between md:justify-start">
           <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-400 dark:text-slate-600" />
           </button>
           <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest min-w-[140px] text-center">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
           </h2>
           <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
           </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-4 text-center text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {loading ? (
            <div className="col-span-7 py-40 flex flex-col items-center justify-center">
               <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Syncing Shift Data...</p>
            </div>
          ) : renderCalendar()}
        </div>
      </div>

      {/* Side Legend & Quick Stats */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { l: 'Morning Shift', t: '07:00 - 14:00', c: 'amber', i: Clock },
           { l: 'Afternoon Shift', t: '13:00 - 19:00', c: 'teal', i: Clock },
           { l: 'Night Shift', t: '18:00 - 08:00', c: 'indigo', i: Clock }
         ].map((shift, idx) => (
           <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-all">
              <div className={`w-12 h-12 bg-${shift.c}-50 dark:bg-${shift.c}-900/20 rounded-2xl flex items-center justify-center text-${shift.c}-500 shadow-inner`}>
                 <shift.i className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">{shift.l}</p>
                 <p className="text-sm font-black text-slate-700 dark:text-slate-200 tracking-tight">{shift.t}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Details / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 dark:border-slate-800">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
               <div className="text-left">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {selectedDay.date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Shift Management</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-95">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar text-left">
               {/* Current Shifts Section */}
               <div className="mb-10">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                     <Clock className="w-4 h-4 text-primary" /> Scheduled Shifts
                  </h4>
                  {selectedDay.rotas.length === 0 ? (
                    <div className="p-12 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                       <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">No shifts scheduled for this day yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedDay.rotas.map((r, i) => (
                        <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 relative group">
                           <div className="flex items-center justify-between mb-6">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                r.shift === 'Morning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 
                                r.shift === 'Afternoon' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' : 
                                'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                              }`}>{r.shift} Shift</span>
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">Verified Team</span>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                 <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-500">
                                    <UserIcon className="w-5 h-5" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Consultant</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-slate-200 truncate">{r.consultant?.name || 'Not assigned'}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                 <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center text-teal-500">
                                    <UserIcon className="w-5 h-5" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Manager</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-slate-200 truncate">{r.manager?.name || 'Not assigned'}</p>
                                 </div>
                              </div>
                           </div>

                           <div className="mt-6 p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                              <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-4 ml-1">Nursing Team</p>
                              <div className="flex flex-wrap gap-2">
                                 {r.nurses.map((n, ni) => (
                                   <div key={ni} className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary">
                                         {n.name?.charAt(0)}
                                      </div>
                                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{n.name}</span>
                                      <a href={`tel:${n.phone}`} className="p-1 hover:text-primary transition-colors text-slate-400">
                                         <Phone className="w-3 h-3" />
                                      </a>
                                   </div>
                                 ))}
                                 {r.nurses.length === 0 && <span className="text-xs text-slate-400 dark:text-slate-600 font-medium italic ml-1">No staff assigned</span>}
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               {/* Admin Edit Form */}
               {isAdmin && (
                 <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                       <Plus className="w-4 h-4 text-primary" /> Assign New Shift
                    </h4>
                    <form className="space-y-8" onSubmit={handleSaveRota}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Select Shift Block</label>
                             <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                {SHIFTS.map(s => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, shift: s })}
                                    className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                      formData.shift === s 
                                        ? 'bg-slate-900 dark:bg-primary text-white shadow-lg' 
                                        : 'text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                  >
                                    {s}
                                  </button>
                                ))}
                             </div>
                          </div>
                          
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Consultant Lead</label>
                             <div className="relative group">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select 
                                  className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700 dark:text-white appearance-none cursor-pointer"
                                  value={formData.consultant}
                                  onChange={(e) => setFormData({ ...formData, consultant: e.target.value })}
                                >
                                  <option value="">Select Consultant</option>
                                  {availableUsers.filter(u => u.role === 'Consultant Pediatrician').map(u => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                  ))}
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
                             </div>
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Manager of the Day (In-Charge)</label>
                          <div className="relative group">
                             <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <select 
                                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700 dark:text-white appearance-none cursor-pointer"
                                value={formData.manager}
                                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                             >
                                <option value="">Select Manager</option>
                                {availableUsers.filter(u => u.role === 'Nursing In-Charge' || u.role === 'Staff Nurse').map(u => (
                                  <option key={u._id} value={u._id}>{u.name}</option>
                                ))}
                             </select>
                             <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Assign Staff Nurses</label>
                          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 max-h-56 overflow-y-auto custom-scrollbar shadow-inner">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {availableUsers.filter(u => u.role === 'Staff Nurse' || u.role === 'Medical Officer').map(u => (
                                  <label key={u._id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                                    formData.nurses.includes(u._id) 
                                      ? 'bg-white dark:bg-slate-900 border-primary shadow-sm' 
                                      : 'bg-white/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100'
                                  }`}>
                                     <input 
                                       type="checkbox"
                                       checked={formData.nurses.includes(u._id)}
                                       onChange={(e) => {
                                         const newNurses = e.target.checked 
                                           ? [...formData.nurses, u._id]
                                           : formData.nurses.filter(id => id !== u._id);
                                         setFormData({ ...formData, nurses: newNurses });
                                       }}
                                       className="w-5 h-5 rounded-lg text-primary focus:ring-primary border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                     />
                                     <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-slate-700 dark:text-slate-200 truncate">{u.name}</p>
                                        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{u.role}</p>
                                     </div>
                                  </label>
                                ))}
                             </div>
                          </div>
                       </div>

                       <button 
                         type="submit"
                         className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                       >
                          <Database className="w-5 h-5" />
                          Publish Official Rota
                       </button>
                    </form>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
