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
  Activity
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
    const res = await api.createUser(formData);
    if (res.success) {
      onAdd(res.data);
      onClose();
      setFormData({ name: '', email: '', role: 'Student', password: '' });
    } else {
      setError(res.message || 'Failed to create user');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative z-10 overflow-hidden">
        <div className="px-8 pt-8 flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Member</h3>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">Give them access to NeoDesk</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium border border-rose-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900" 
                placeholder="Dr. Sarah Johnson" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900" 
                placeholder="sarah.j@nbu.hospital" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Their Role</label>
            <div className="relative">
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900"
              >
                <option>Staff Nurse</option>
                <option>Nursing In-Charge</option>
                <option>Consultant Pediatrician</option>
                <option>CO Pediatrics / MO</option>
                <option>Student</option>
                <option>ICT / IT Support</option>
                <option>Hospital Management</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5 pb-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Setup Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? <Activity className="w-5 h-5 animate-pulse" /> : <><ShieldCheck className="w-4 h-4" /> Save and Grant Access</>}
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
      setError('Network error. We couldn\'t connect to the hospital list.');
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
    if (!window.confirm('Are you sure? This will permanently remove this team member from NeoDesk.')) return;
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
      <div className="flex flex-col items-center justify-center py-32">
        <Activity className="w-8 h-8 text-primary animate-pulse mb-4" />
        <p className="text-sm font-bold text-slate-400">Getting the team list...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full p-8 pb-32">
      <AddStaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleUserAdded} 
      />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Team Management</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">The Team</h1>
          <p className="text-sm text-slate-500">Manage access and permissions for everyone on the NeoDesk platform.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 w-72 outline-none shadow-sm" 
              />
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold transition-all shadow-sm"
           >
             <UserPlus className="w-4 h-4" /> Add New Member
           </button>
        </div>
      </div>

      {error ? (
        <div className="bg-rose-50 border border-rose-100 p-12 rounded-2xl text-center max-w-xl mx-auto mt-10">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-rose-900 mb-2">We couldn't reach the list</h3>
          <p className="text-sm text-rose-600 mb-6">{error}</p>
          <button onClick={fetchStaff} className="px-6 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-colors">Retry Connection</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStaff.map((person) => (
            <div key={person._id} className={`bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between group transition-all hover:shadow-md hover:border-slate-300 ${person.status === 'No Access' ? 'opacity-70 bg-slate-50' : ''}`}>
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm ${getRoleColor(person.role)}`}>
                      {person.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 truncate max-w-[150px]">{person.name}</h3>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">{person.role}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="bg-slate-50 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-600 truncate border border-slate-100 mb-6">
                  {person.email}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${person.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${person.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  {person.status}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleToggleStatus(person)}
                    title={person.status === 'Active' ? 'Stop Access' : 'Give Access'}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${person.status === 'Active' ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' : 'text-rose-600 bg-rose-50 hover:bg-rose-100'}`}
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(person._id)}
                    className="w-9 h-9 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredStaff.length === 0 && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">No one found</h4>
              <p className="text-sm text-slate-500">Try searching for a different name or email.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
