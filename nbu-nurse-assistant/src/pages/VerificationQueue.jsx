import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  User, 
  Phone, 
  Mail, 
  Fingerprint,
  Search,
  Clock,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { api } from '../services/api';

export default function VerificationQueue() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    setIsLoading(true);
    try {
      const res = await api.getPendingUsers();
      if (res.success) {
        setPendingUsers(res.users);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Failed to load pending users.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    setProcessingId(id);
    try {
      const res = await api.verifyUser(id, status);
      if (res.success) {
        setPendingUsers(pendingUsers.filter(user => user._id !== id));
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert('Action failed. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredUsers = pendingUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.idNumber && user.idNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 lg:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen font-sans pb-32 text-left">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Verification Queue</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">Screen and approve clinical staff for unit access.</p>
          </div>
          
          <div className="relative group min-w-full md:min-w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-black bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Encrypting user data...</p>
          </div>
        ) : error ? (
          <div className="p-12 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-[40px] text-center max-w-xl mx-auto">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h2 className="text-xl font-black text-rose-900 dark:text-rose-200 mb-2">Sync Interrupted</h2>
            <p className="text-sm text-rose-600 dark:text-rose-400 font-medium mb-8">{error}</p>
            <button onClick={fetchPendingUsers} className="px-10 py-4 bg-rose-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-rose-700 transition-all">Retry Link</button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm text-center px-6">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700 text-slate-200 dark:text-slate-700">
               <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Queue is Clear!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm">No new staff members are waiting for verification.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col relative group animate-in fade-in slide-in-from-bottom-6 duration-700"
              >
                {/* Role Badge */}
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-full text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                  {user.role}
                </div>

                <div className="flex items-start gap-6 mb-8">
                  {/* Profile Photo */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={`${import.meta.env.VITE_API_BASE_URL || ''}${user.profileImage}`} 
                      alt={user.name} 
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl object-cover border-4 border-slate-50 dark:border-slate-800 shadow-inner"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                       <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                    </div>
                  </div>

                  <div className="pt-2 min-w-0">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 leading-tight truncate">{user.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">
                       <Fingerprint className="w-3.5 h-3.5 text-primary" /> {user.idNumber || 'STAFF-ID'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-10 flex-grow">
                   <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-tight">{user.phone || 'No phone'}</span>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 overflow-hidden">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-tight truncate">{user.email}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    disabled={processingId === user._id}
                    onClick={() => handleVerify(user._id, 'Rejected')}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all border border-slate-100 dark:border-slate-700 hover:border-rose-100 dark:hover:border-rose-900 active:scale-95 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button 
                    disabled={processingId === user._id}
                    onClick={() => handleVerify(user._id, 'Approved')}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {processingId === user._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center px-1">
                   <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
                     <Database className="w-3 h-3" /> Submitted {new Date(user.createdAt).toLocaleDateString()}
                   </div>
                   <button className="text-primary hover:underline text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1 group">
                     Full File <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
