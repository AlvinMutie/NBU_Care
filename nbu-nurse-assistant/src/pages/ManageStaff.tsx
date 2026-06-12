import React, { useState, useEffect } from 'react';
import { 
  Users2, Search, Filter, Mail, Phone, 
  ShieldCheck, MoreVertical, ShieldAlert,
  ArrowRight, CheckCircle2, UserCheck, Key, X, Save, Trash2, Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const ManageStaff: React.FC = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [resetModal, setResetModal] = useState<any>(null);
  const [editModal, setEditModal] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      setStaff(response.data.data);
    } catch (err) {
      console.error('Failed to fetch staff directory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);
    try {
      await api.post(`/admin/users/${resetModal.id}/reset-password`, { password: newPassword });
      alert(`Access credentials updated for ${resetModal.name}`);
      setResetModal(null);
      setNewPassword('');
    } catch (err) {
      console.error('Reset failed:', err);
      alert('Failed to update credentials. Ensure policy alignment (min 8 chars).');
    } finally {
      setIsResetting(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await api.patch(`/admin/users/${editModal.id}`, editModal);
      alert(`Profile updated for ${editModal.name}`);
      setEditModal(null);
      fetchStaff();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (!window.confirm(`Are you absolutely sure you want to revoke all access for ${user.name}? This action is irreversible and will be logged in the system audit.`)) {
      return;
    }

    setDeletingId(user.id);
    try {
      await api.delete(`/admin/users/${user.id}`);
      setStaff(prev => prev.filter(s => s.id !== user.id));
    } catch (err: any) {
      console.error('Deletion failed:', err);
      alert(err.response?.data?.message || 'Failed to delete user. Ensure you have administrative clearance.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.staff_id && s.staff_id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && staff.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Accessing Institutional Directory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Institutional Directory</h2>
          <p className="text-slate-500 font-medium">Manage clinical access and personnel profiles for the neonatal unit.</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-5 rounded-2xl shadow-sm flex items-center space-x-3">
           <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shadow-sm">
              <UserCheck size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Personnel</p>
              <p className="text-sm font-bold text-[var(--text-main)]">{staff.length} Verified Clinicians</p>
           </div>
        </div>
      </div>

      {/* Control Surface */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-4 sm:p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-6">
         <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, role or institutional ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300" 
            />
         </div>
         <button className="flex items-center space-x-3 px-8 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all font-bold text-xs uppercase tracking-widest">
            <Filter size={18} />
            <span>Refine Criteria</span>
         </button>
      </div>

      {/* Staff Table */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] shadow-sm overflow-hidden">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-[var(--bg-main)]/50 border-b border-[var(--border-main)]">
                     <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinician</th>
                     <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional ID</th>
                     <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                     <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                     <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Management</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredStaff.map((person) => (
                     <tr key={person.id} className="border-b border-[var(--border-main)] last:border-0 hover:bg-[var(--bg-main)]/30 transition-colors group">
                        <td className="py-6 px-8">
                           <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                 {person.name.split(' ').map((n: any) => n[0]).join('')}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-[var(--text-main)]">{person.name}</p>
                                 <div className="flex items-center space-x-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>{person.status}</span>
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="py-6 px-8">
                           <span className="text-xs font-black font-mono text-slate-500 bg-[var(--bg-main)] px-2 py-1 rounded-md">
                              {person.staff_id || 'NEO-SYS-00'+person.id}
                           </span>
                        </td>
                        <td className="py-6 px-8 text-xs font-bold text-slate-500">
                           {person.role}
                        </td>
                        <td className="py-6 px-8">
                           <div className="flex items-center space-x-2 text-slate-400">
                              <Mail size={14} />
                              <span className="text-xs font-medium">{person.email}</span>
                           </div>
                        </td>
                        <td className="py-6 px-8">
                           <div className="flex items-center justify-end space-x-2">
                              <button 
                                onClick={() => setEditModal(person)}
                                className="p-2 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all"
                                title="Edit Profile"
                              >
                                 <Edit2 size={18} />
                              </button>
                              <button 
                                onClick={() => setResetModal(person)}
                                className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                title="Reset Password"
                              >
                                 <Key size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(person)}
                                disabled={deletingId === person.id}
                                className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all disabled:opacity-50"
                                title="Revoke Access"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
         {editModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] w-full max-w-lg p-10 shadow-2xl space-y-8"
              >
                 <div className="flex justify-between items-center">
                    <div className="space-y-1">
                       <h3 className="text-2xl font-bold tracking-tight">Modify Profile</h3>
                       <p className="text-sm text-slate-500 font-medium">Updating identity for {editModal.name}</p>
                    </div>
                    <button onClick={() => setEditModal(null)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                 </div>

                 <form onSubmit={handleUpdateUser} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                          <input 
                            type="text" 
                            value={editModal.name}
                            onChange={(e) => setEditModal({...editModal, name: e.target.value})}
                            className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                            required
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional ID</label>
                          <input 
                            type="text" 
                            value={editModal.staff_id || ''}
                            onChange={(e) => setEditModal({...editModal, staff_id: e.target.value})}
                            className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                            placeholder="e.g. NBU-1234"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Designated Role</label>
                       <select 
                         value={editModal.role}
                         onChange={(e) => setEditModal({...editModal, role: e.target.value})}
                         className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                         required
                       >
                          <option value="Staff Nurse">Staff Nurse</option>
                          <option value="Nursing In-Charge">Nursing In-Charge</option>
                          <option value="Student">Student Clinician</option>
                          <option value="Registrar">Registrar</option>
                          <option value="Consultant">Consultant</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Access Status</label>
                       <select 
                         value={editModal.status}
                         onChange={(e) => setEditModal({...editModal, status: e.target.value})}
                         className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                         required
                       >
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Suspended">Suspended</option>
                       </select>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isUpdating}
                      className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 hover:bg-black transition-all disabled:opacity-50"
                    >
                       {isUpdating ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <span>Commit Profile Changes</span>}
                    </button>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* Password Reset Modal */}
      <AnimatePresence>
         {resetModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] w-full max-w-md p-10 shadow-2xl space-y-8"
              >
                 <div className="flex justify-between items-center">
                    <div className="space-y-1">
                       <h3 className="text-2xl font-bold tracking-tight">Credential Reset</h3>
                       <p className="text-sm text-slate-500 font-medium">Re-issuing access for {resetModal.name}</p>
                    </div>
                    <button onClick={() => setResetModal(null)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                 </div>

                 <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Institutional Password</label>
                       <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 pl-12 rounded-2xl text-sm font-bold outline-none focus:border-rose-500 transition-all"
                            placeholder="Min 8 characters..."
                            required
                          />
                       </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isResetting || newPassword.length < 8}
                      className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 hover:bg-black transition-all disabled:opacity-50"
                    >
                       {isResetting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <span>Authorize New Credentials</span>}
                    </button>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      <div className="pt-8 border-t border-[var(--border-main)] flex items-center justify-between">
         <div className="flex items-center space-x-3 text-slate-400">
            <ShieldAlert size={14} />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Personnel access is forensically logged and audited</p>
         </div>
         <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-[var(--text-main)] transition-colors flex items-center space-x-2">
            <span>Security Compliance Center</span>
            <ArrowRight size={12} />
         </button>
      </div>
    </div>
  );
};

export default ManageStaff;
