import React, { useState, useEffect } from 'react';
import { 
  Users, BarChart3, TrendingUp, AlertTriangle, 
  CheckCircle2, Clock, Search, Filter, ChevronRight,
  GraduationCap, ClipboardList, Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const AcademyAnalytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/academy-analytics');
      setData(res.data.data);
    } catch (err) {
      console.error('Failed to fetch academy analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Analyzing Cohort Performance...</p>
      </div>
    );
  }

  const filteredStudents = data.students.filter((s: any) => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Academy Analytics</h2>
          <p className="text-slate-500 font-medium tracking-tight">
            Comprehensive tracking of student clinical competency and progress.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-4 rounded-2xl">
           <div className="flex flex-col items-end">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Cohort Avg Accuracy</p>
              <p className="text-lg font-black text-emerald-600">{data.cohort_average_accuracy.toFixed(1)}%</p>
           </div>
           <div className="w-px h-8 bg-[var(--border-main)]" />
           <div className="flex flex-col items-end">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Simulations Completed</p>
              <p className="text-lg font-black text-blue-600">{data.total_simulations_completed}</p>
           </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex justify-between items-start">
               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Target size={24} />
               </div>
               <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Performers</p>
               <p className="text-2xl font-black">{data.students.filter((s:any) => s.accuracy > 90).length} Students</p>
            </div>
         </div>

         <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex justify-between items-start">
               <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                  <AlertTriangle size={24} />
               </div>
               <div className="text-[10px] font-bold text-rose-500">Critical Flags</div>
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Struggling Students</p>
               <p className="text-2xl font-black">{data.students.filter((s:any) => s.struggling).length} Students</p>
            </div>
         </div>

         <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5">
               <GraduationCap size={120} />
            </div>
            <div className="relative z-10">
               <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-4">Cohort Progress</p>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                     <span>Course Completion</span>
                     <span>{((data.total_simulations_completed / (data.students.length * 5)) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-emerald-500" 
                        style={{ width: `${(data.total_simulations_completed / (data.students.length * 5)) * 100}%` }} 
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Student Directory */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] shadow-sm overflow-hidden">
         <div className="p-8 border-b border-[var(--border-main)] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h3 className="text-xl font-bold tracking-tight">Student Performance Directory</h3>
               <p className="text-sm text-slate-500 font-medium">Real-time tracking of individual clinical milestones.</p>
            </div>
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                  type="text" 
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[var(--bg-main)] border border-[var(--border-main)] pl-12 pr-6 py-3 rounded-2xl text-sm font-medium outline-none focus:border-emerald-500 transition-all w-full md:w-80"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-[var(--bg-main)]/50">
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quiz Streak</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Accuracy</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Simulations</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[var(--border-main)]">
                  {filteredStudents.map((student: any) => (
                     <tr key={student.id} className="hover:bg-[var(--bg-main)]/30 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-500">
                                 {student.name.split(' ').map((n:any)=>n[0]).join('')}
                              </div>
                              <div>
                                 <p className="text-sm font-bold">{student.name}</p>
                                 <p className="text-[10px] text-slate-400 font-medium">{student.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <span className="text-sm font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{student.streak} Days</span>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <div className="inline-flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${student.accuracy > 85 ? 'bg-emerald-500' : student.accuracy > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                              <span className="text-sm font-bold">{student.accuracy.toFixed(1)}%</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col items-center">
                              <span className="text-xs font-bold mb-1">{student.cases_completed} / 5</span>
                              <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500" style={{ width: `${student.progress}%` }} />
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           {student.struggling ? (
                              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[9px] font-black uppercase tracking-widest border border-rose-100">
                                 <AlertTriangle size={10} />
                                 <span>Needs Review</span>
                              </div>
                           ) : (
                              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                 <CheckCircle2 size={10} />
                                 <span>On Track</span>
                              </div>
                           )}
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-2 text-slate-400 hover:text-emerald-600 transition-all hover:bg-emerald-50 rounded-xl">
                              <ChevronRight size={18} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Handover Reviewer Section */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] shadow-sm overflow-hidden">
         <div className="p-8 border-b border-[var(--border-main)] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h3 className="text-xl font-bold tracking-tight text-emerald-600">Clinical Handover Reviewer</h3>
               <p className="text-sm text-slate-500 font-medium">Review and evaluate student SBAR transition reports.</p>
            </div>
            <Link to="/handovers" className="px-6 py-3 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center space-x-2">
               <ClipboardList size={14} />
               <span>Manage All Handovers</span>
            </Link>
         </div>
         <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl mx-auto flex items-center justify-center text-emerald-600">
               <CheckCircle2 size={32} />
            </div>
            <div className="space-y-1">
               <p className="text-base font-bold">Review Pipeline Operational</p>
               <p className="text-sm text-slate-400 max-w-sm mx-auto">Instructors can evaluate student SBAR reports directly within the Handovers module. Evaluation marks are synchronized with the performance directory.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AcademyAnalytics;
