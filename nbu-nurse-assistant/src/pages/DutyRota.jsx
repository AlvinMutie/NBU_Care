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
  CalendarDays
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
      if (res.success) setAvailableUsers(res.users);
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
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
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
        alert('Shift updated successfully');
      }
    } catch (err) {
      alert('Failed to save shift. Please check if date/shift already exists.');
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const days = [];

    // Padding for first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-32 md:h-40 bg-slate-50/50 border border-slate-100/50"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dayRotas = getRotasForDay(d);
      const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
      
      days.push(
        <div 
          key={d} 
          onClick={() => openDayDetails(d)}
          className={`h-32 md:h-40 p-2 md:p-4 border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer relative group ${isToday ? 'bg-primary/5' : 'bg-white'}`}
        >
          <span className={`text-sm font-black ${isToday ? 'text-primary' : 'text-slate-400'}`}>{d}</span>
          <div className="mt-2 space-y-1">
            {dayRotas.map((r, i) => (
              <div 
                key={i} 
                className={`text-[9px] md:text-[10px] px-2 py-1 rounded-md font-bold truncate flex items-center gap-1.5 ${
                  r.shift === 'Morning' ? 'bg-amber-100 text-amber-700' : 
                  r.shift === 'Afternoon' ? 'bg-teal-100 text-teal-700' : 
                  'bg-indigo-100 text-indigo-700'
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
          </div>
          {isAdmin && (
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg">
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
    <div className="p-4 lg:p-10 bg-slate-50 min-h-screen font-sans pb-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Duty Rota</h1>
           </div>
           <p className="text-slate-500 font-medium ml-1">Coordinate nursing shifts and unit clinical leads.</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
           <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-400" />
           </button>
           <h2 className="text-sm font-black text-slate-700 uppercase tracking-widest min-w-[140px] text-center">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
           </h2>
           <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400" />
           </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {loading ? (
            <div className="col-span-7 py-40 flex flex-col items-center justify-center">
               <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
               <p className="text-sm font-bold text-slate-400">Syncing shift data...</p>
            </div>
          ) : renderCalendar()}
        </div>
      </div>

      {/* Side Legend & Quick Stats */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Morning Shift</p>
               <p className="text-sm font-black text-slate-700 tracking-tight">07:00 - 14:00</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-500">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Afternoon Shift</p>
               <p className="text-sm font-black text-slate-700 tracking-tight">13:00 - 19:00</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Night Shift</p>
               <p className="text-sm font-black text-slate-700 tracking-tight">18:00 - 08:00</p>
            </div>
         </div>
      </div>

      {/* Details / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {selectedDay.date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">Shift Management</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
               {/* Current Shifts Section */}
               <div className="mb-10">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Clock className="w-3.5 h-3.5" /> Scheduled Shifts
                  </h4>
                  {selectedDay.rotas.length === 0 ? (
                    <div className="p-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-center">
                       <p className="text-sm text-slate-400 font-medium">No shifts scheduled for this day yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedDay.rotas.map((r, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative group">
                           <div className="flex items-center justify-between mb-6">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                r.shift === 'Morning' ? 'bg-amber-100 text-amber-700' : 
                                r.shift === 'Afternoon' ? 'bg-teal-100 text-teal-700' : 
                                'bg-indigo-100 text-indigo-700'
                              }`}>{r.shift} Shift</span>
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black text-slate-400 uppercase">Verified Team</span>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                                 <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                                    <UserIcon className="w-5 h-5" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Consultant</p>
                                    <p className="text-sm font-bold text-slate-900 truncate">{r.consultant?.name || 'Not assigned'}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                                 <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-500">
                                    <UserIcon className="w-5 h-5" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Manager</p>
                                    <p className="text-sm font-bold text-slate-900 truncate">{r.manager?.name || 'Not assigned'}</p>
                                 </div>
                              </div>
                           </div>

                           <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-100">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">Nurses on Duty</p>
                              <div className="flex flex-wrap gap-2">
                                 {r.nurses.map((n, ni) => (
                                   <div key={ni} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary">
                                         {n.name.charAt(0)}
                                      </div>
                                      <span className="text-xs font-bold text-slate-700">{n.name}</span>
                                      <a href={`tel:${n.phone}`} className="p-1 hover:text-primary transition-colors">
                                         <Phone className="w-3 h-3" />
                                      </a>
                                   </div>
                                 ))}
                                 {r.nurses.length === 0 && <span className="text-xs text-slate-400 font-medium italic">No nurses assigned</span>}
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               {/* Admin Edit Form */}
               {isAdmin && (
                 <div className="mt-10 pt-10 border-t border-slate-100">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <Plus className="w-3.5 h-3.5" /> Assign New Shift
                    </h4>
                    <form className="space-y-6" onSubmit={handleSaveRota}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Select Shift</label>
                             <div className="flex gap-2">
                                {SHIFTS.map(s => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, shift: s })}
                                    className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest border transition-all ${
                                      formData.shift === s 
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                                    }`}
                                  >
                                    {s}
                                  </button>
                                ))}
                             </div>
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Consultant</label>
                             <select 
                               className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                               value={formData.consultant}
                               onChange={(e) => setFormData({ ...formData, consultant: e.target.value })}
                             >
                               <option value="">Select Consultant</option>
                               {availableUsers.filter(u => u.role === 'Consultant Pediatrician').map(u => (
                                 <option key={u._id} value={u._id}>{u.name}</option>
                               ))}
                             </select>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Manager of the Day</label>
                          <select 
                             className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-700"
                             value={formData.manager}
                             onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                          >
                             <option value="">Select Manager</option>
                             {availableUsers.filter(u => u.role === 'Nursing In-Charge' || u.role === 'Senior Staff Nurse').map(u => (
                               <option key={u._id} value={u._id}>{u.name}</option>
                             ))}
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Assign Nurses</label>
                          <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 max-h-48 overflow-y-auto custom-scrollbar">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {availableUsers.filter(u => u.role === 'Staff Nurse' || u.role === 'Medical Officer').map(u => (
                                  <label key={u._id} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:border-primary transition-all">
                                     <input 
                                       type="checkbox"
                                       checked={formData.nurses.includes(u._id)}
                                       onChange={(e) => {
                                         const newNurses = e.target.checked 
                                           ? [...formData.nurses, u._id]
                                           : formData.nurses.filter(id => id !== u._id);
                                         setFormData({ ...formData, nurses: newNurses });
                                       }}
                                       className="w-5 h-5 rounded-lg text-primary focus:ring-primary border-slate-200"
                                     />
                                     <span className="text-xs font-bold text-slate-700">{u.name}</span>
                                  </label>
                                ))}
                             </div>
                          </div>
                       </div>

                       <button 
                         type="submit"
                         className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                       >
                          <Check className="w-5 h-5" />
                          Publish to Unit Rota
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
