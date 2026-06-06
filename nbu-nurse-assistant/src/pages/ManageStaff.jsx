import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Search, 
  UserPlus, 
  MoreVertical, 
  Trash2,
  AlertCircle,
  X,
  User,
  Mail,
  Lock,
  ChevronDown,
  ShieldCheck,
  Activity,
  Phone,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';

const AddStaffModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.createUser(formData);
      if (res.success) {
        onAdd(res.data);
        onClose();
        setFormData({ name: '', email: '', role: 'Student', password: '' });
      } else {
        setError(res.message || 'Failed to create user');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] shadow-2xl relative z-10 overflow-hidden border border-white/10 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        <div className="px-8 pt-8 flex justify-between items-center mb-6">
          <div className="text-left">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Add Member</h3>
            <p className="text-xs font-black text-primary uppercase tracking-widest mt-1">Access Provisioning</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-all active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5 text-left">
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold border border-rose-100 dark:border-rose-800 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-slate-900 dark:text-white" 
                placeholder="Dr. Sarah Johnson" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-slate-900 dark:text-white" 
                placeholder="sarah.j@hospital.org" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Role Designation</label>
            <div className="relative">
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full appearance-none pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-slate-900 dark:text-white cursor-pointer"
              >
                <option>Staff Nurse</option>
                <option>Nursing In-Charge</option>
                <option>Consultant Pediatrician</option>
                <option>CO Pediatrics / MO</option>
                <option>Student</option>
                <option>ICT / IT Support</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5 pb-2">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Initial Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-slate-900 dark:text-white" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Grant Access</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function ManageStaff({ user, onNavigate }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.getUsers();
      if (res.success) {
        setStaff(res.data);
      } else {
        setError('Failed to get the team list');
      }
    } catch (err) {
      setError('Network error. We couldn\'t connect to the unit database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleUserAdded = (newUser) => {
    setStaff([newUser, ...staff]);
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'Active' ? 'No Access' : 'Active';
    try {
      const res = await api.updateUserStatus(user._id, newStatus);
      if (res.success) {
        setStaff(staff.map(s => s._id === user._id ? { ...s, status: newStatus } : s));
      }
    } catch (err) {
      alert('Failed to update user status');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure? This will permanently remove this clinician from NeoDesk.')) return;
    try {
      const res = await api.deleteUser(id);
      if (res.success) {
        setStaff(staff.filter(s => s._id !== id));
      }
    } catch (err) {
      alert('Failed to remove member');
    }
  };

  const filteredStaff = staff.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'Consultant Pediatrician': return 'bg-indigo-600';
      case 'Nursing In-Charge': return 'bg-primary';
      case 'Staff Nurse': case 'Nurse': return 'bg-teal-600';
      case 'CO Pediatrics / MO': case 'Medical Officer': return 'bg-cyan-600';
      case 'ICT / IT Support': return 'bg-slate-600';
      default: return 'bg-slate-500';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Accessing Team Records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full p-4 lg:p-10 pb-32 text-left">
      <AddStaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleUserAdded} 
      />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
             </div>
             <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">The Team</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">Manage access and permissions for unit clinicians.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
           <div className="relative flex-1 sm:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-900 dark:text-white outline-none shadow-sm" 
              />
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95"
           >
             <UserPlus className="w-5 h-5" /> Add Member
           </button>
        </div>
      </div>

      {error ? (
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 p-12 rounded-[40px] text-center max-w-xl mx-auto mt-10">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-black text-rose-900 dark:text-rose-200 mb-2">Sync Error</h3>
          <p className="text-sm text-rose-600 dark:text-rose-400 mb-8 font-medium">{error}</p>
          <button onClick={fetchStaff} className="px-10 py-4 bg-rose-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-lg">Retry Connection</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredStaff.map((person) => (
            <div key={person._id} className={`bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between group transition-all hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/30 relative overflow-hidden ${person.status === 'No Access' ? 'opacity-75 bg-slate-50 dark:bg-slate-900/50' : ''}`}>
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${getRoleColor(person.role)} transition-transform group-hover:scale-105`}>
                      {person.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight truncate max-w-[140px] leading-tight mb-1">{person.name}</h3>
                      <div className="flex items-center gap-1.5">
                         <ShieldCheck className="w-3 h-3 text-primary" />
                         <span className="text-[10px] font-black text-primary uppercase tracking-widest">{person.role}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-3 mb-10">
                   <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="truncate">{person.email}</span>
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${person.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${person.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {person.status}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleToggleStatus(person)}
                    title={person.status === 'Active' ? 'Suspend Access' : 'Restore Access'}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-90 ${person.status === 'Active' ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20' : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100'}`}
                  >
                    <Shield className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(person._id)}
                    className="w-11 h-11 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all active:scale-90 flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredStaff.length === 0 && (
            <div className="col-span-full py-32 text-center bg-slate-50 dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-center mx-auto mb-6 text-slate-200 dark:text-slate-700">
                <Users className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">No one found</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Try searching for a different name or email.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
