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
  ChevronRight
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
    user.idNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-10 bg-slate-50 min-h-screen font-sans pb-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Verification Queue</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">Screen and approve clinical staff for unit access.</p>
          </div>
          
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-medium bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-slate-100 shadow-sm">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-slate-500 font-bold">Loading pending requests...</p>
          </div>
        ) : error ? (
          <div className="p-10 bg-rose-50 border border-rose-100 rounded-[40px] text-center">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-rose-900 mb-2">Something went wrong</h2>
            <p className="text-rose-600 font-medium">{error}</p>
            <button onClick={fetchPendingUsers} className="mt-6 px-8 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all">Try Again</button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-slate-100 shadow-sm text-center px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
               <CheckCircle2 className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Queue is Clear!</h2>
            <p className="text-slate-500 font-medium max-w-sm">No new staff members are waiting for verification at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className="bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {/* Role Badge */}
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {user.role}
                </div>

                <div className="flex items-start gap-6 mb-8">
                  {/* Profile Photo */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={`${import.meta.env.VITE_API_BASE_URL || ''}${user.profileImage}`} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-50 shadow-inner"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center">
                       <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{user.name}</h3>
                    <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
                      <Fingerprint className="w-4 h-4" /> {user.idNumber}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">{user.phone}</span>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 overflow-hidden">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-sm font-bold text-slate-700 truncate">{user.email}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    disabled={processingId === user._id}
                    onClick={() => handleVerify(user._id, 'Rejected')}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 hover:border-rose-100 active:scale-95 disabled:opacity-50"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                  <button 
                    disabled={processingId === user._id}
                    onClick={() => handleVerify(user._id, 'Approved')}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {processingId === user._id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    Approve
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center px-1">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Clock className="w-3 h-3" /> Submitted {new Date(user.createdAt).toLocaleDateString()}
                   </span>
                   <button className="text-primary hover:underline text-[10px] font-black uppercase tracking-widest flex items-center gap-1 group">
                     Full Profile <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
