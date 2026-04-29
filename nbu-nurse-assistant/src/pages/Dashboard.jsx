import React, { useState, useEffect } from 'react';
import { 
  Activity, Calculator, Droplets, Zap, ArrowRight,
  Users, ShieldAlert, GraduationCap, Clock, FileText,
  Activity as ActivityIcon, HeartPulse, Stethoscope, ChevronRight,
  Database, ShieldCheck, AlertCircle, HelpCircle
} from 'lucide-react';
import { api } from '../services/api';

// --- SHARED COMPONENTS ---

// --- SHARED COMPONENTS ---

const BlueTick = ({ className = "w-4 h-4" }) => (
  <div className={`${className} bg-primary text-white rounded-full flex items-center justify-center p-0.5 shadow-sm border border-white/20`} title="Verified Staff">
    <ShieldCheck className="w-full h-full" />
  </div>
);

const StatCard = ({ title, value, icon: Icon, colorClass, highlight, trend }) => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
     <div className="hidden lg:block absolute -right-4 -top-4 w-20 h-20 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
     <div className="relative z-10">
       <div className="flex items-center justify-between mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} transition-transform group-hover:scale-110 shadow-inner`}>
             <Icon className="w-6 h-6" />
          </div>
          {highlight && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </div>
          )}
       </div>
       <div className="flex items-end justify-between">
          <div>
             <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tight">{value}</h3>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{title}</p>
          </div>
          {trend && (
             <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+{trend}%</span>
          )}
       </div>
     </div>
  </div>
);

// --- ROLE-SPECIFIC VIEWS ---

const AdminDashboard = ({ stats, loading, onNavigate, user }) => {
  const [logs, setLogs] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [neonateCount, setNeonateCount] = useState(0);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [logsRes, pendingRes, neonateRes] = await Promise.all([
          api.getRecentLogs(),
          api.getPendingUsers(),
          api.getNeonates()
        ]);
        if (logsRes.success) setLogs(logsRes.data);
        if (pendingRes.success) setPendingCount(pendingRes.users.length);
        if (neonateRes.success) setNeonateCount(neonateRes.neonates.length);
      } catch (err) {
        console.error('Dashboard data fetch failed', err);
      } finally {
        setLogsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Verification Alert */}
      {pendingCount > 0 && (
        <div 
          onClick={() => onNavigate('verification-queue')}
          className="bg-amber-50 border border-amber-200 rounded-[32px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-amber-200/20 cursor-pointer hover:bg-amber-100 transition-all group animate-in slide-in-from-top-8 duration-700"
        >
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-amber-500 shadow-xl shadow-amber-200/50 group-hover:scale-110 transition-transform">
                 <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                 <h4 className="text-lg font-black text-amber-900 tracking-tight">Access Requests Pending</h4>
                 <p className="text-sm text-amber-700 font-bold opacity-80">{pendingCount} staff members are waiting for your verification.</p>
              </div>
           </div>
           <button className="px-8 py-3 bg-amber-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-600/20 group-hover:bg-amber-700 transition-all flex items-center gap-2">
              Review Queue <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2 px-2">
         <div>
            <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-3 ml-1">In-Charge Overview</h2>
            <div className="flex items-center gap-3">
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Unit Dashboard<span className="text-primary text-5xl">.</span></h1>
               <BlueTick className="w-7 h-7" />
            </div>
            <p className="text-sm text-slate-500 mt-2 font-medium">Monitoring clinical precision and team workflow.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-600 flex items-center gap-3 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Shift Morning
            </div>
            <button className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95">
               <Database className="w-5 h-5" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Staff" value={loading ? '...' : stats.users} icon={Users} colorClass="bg-indigo-50 text-indigo-600" trend="12" />
        <StatCard title="Live Cases" value="24" icon={ActivityIcon} colorClass="bg-teal-50 text-teal-600" highlight />
        <StatCard title="Doses Given" value="142" icon={Droplets} colorClass="bg-rose-50 text-rose-500" />
        <StatCard title="Safety Score" value="100%" icon={ShieldCheck} colorClass="bg-primary/10 text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                  <ActivityIcon className="w-5 h-5 text-primary" /> Live Shift Logs
               </h3>
               <button 
                 onClick={() => onNavigate('audit-logs')}
                 className="text-xs font-black text-primary hover:underline transition-all uppercase tracking-widest"
               >
                 History
               </button>
            </div>
            <div className="flex-1 overflow-x-auto">
              {logsLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Encrypting live data...</p>
                </div>
              ) : logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 px-10 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                    <Database className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">No activity recorded</h4>
                  <p className="text-sm text-slate-500 max-w-xs font-medium">Calculations and clinical actions from this shift will appear here in real-time.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
                      <th className="px-8 py-5">Action</th>
                      <th className="px-8 py-5">Verified Clinician</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {logs.map((log, i) => (
                      <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-800 tracking-tight">{log.action}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{log.type}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-700">{log.user?.name || 'Unknown'}</span>
                              <BlueTick className="w-3.5 h-3.5" />
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          {log.status === 'Checked' ? <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">Checked</span> : 
                           log.status === 'Review' ? <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-rose-100">Needs Review</span> :
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-100">Pending</span>}
                        </td>
                        <td className="px-8 py-6 text-xs font-black text-slate-400 text-right">
                          {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
              <div className="hidden lg:block absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/5 backdrop-blur-xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Clinical Gatekeeper</span>
                 </div>
                 <h4 className="text-white text-2xl font-black mb-2 tracking-tight">Security Protocol</h4>
                 <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">All clinical staff must be verified by the In-Charge before accessing drug calculators.</p>
                 <div className="space-y-3">
                   <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                     <span>Unit Verification</span>
                     <span className="text-primary font-black">Active</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="w-full h-full bg-primary shadow-[0_0_20px_rgba(13,148,136,0.6)]" />
                   </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Unit Tasks</h4>
              <div className="space-y-4">
                 {[
                   { t: 'Review Pending Staff', s: 'Priority', c: pendingCount > 0 ? 'amber' : 'emerald', path: 'verification-queue' },
                   { t: 'Audit Drug Register', s: 'Daily', c: 'primary', path: 'audit-logs' },
                   { t: 'Update Duty Rota', s: 'Required', c: 'rose', path: 'manage-staff' },
                 ].map((task, i) => (
                   <div 
                     key={i} 
                     onClick={() => onNavigate(task.path)}
                     className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl transition-all cursor-pointer group"
                   >
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-700 tracking-tight mb-0.5">{task.t}</span>
                        <span className={`text-[9px] font-black text-${task.c}-500 uppercase tracking-widest`}>{task.s}</span>
                     </div>
                     <div className={`w-8 h-8 rounded-xl bg-white flex items-center justify-center text-${task.c}-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all`}>
                        <ChevronRight className="w-4 h-4" />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};


const QuizWidget = () => {
  const [step, setStep] = useState('start'); // start, question, result
  const [selected, setSelected] = useState(null);
  
  const question = {
    q: "What is the standard bolus rate for a neonate in shock?",
    options: ["5 ml/kg", "10 ml/kg", "20 ml/kg", "50 ml/kg"],
    correct: 1
  };

  const handleAnswer = async (index) => {
    setSelected(index);
    setStep('result');
    if (index === question.correct) {
      try {
        await api.updateQuizScore(10);
      } catch (err) {
        console.error("Quiz score sync failed");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-widest">Daily Clinical Quiz</h4>
        <Zap className="w-4 h-4 text-amber-400" />
      </div>
      <div className="p-6">
        {step === 'start' ? (
          <div className="text-center py-4">
            <HelpCircle className="w-10 h-10 text-indigo-200 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800 mb-4">Ready for today's challenge?</p>
            <button 
              onClick={() => setStep('question')}
              className="w-full py-2.5 bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-widest rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all"
            >
              Start Quiz
            </button>
          </div>
        ) : step === 'question' ? (
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-900 leading-snug">{question.q}</p>
            <div className="grid grid-cols-1 gap-2">
              {question.options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-3 text-left text-xs font-bold text-slate-600 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-indigo-200 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${selected === question.correct ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
              {selected === question.correct ? <ShieldCheck className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              {selected === question.correct ? 'Correct! Well done.' : 'Not quite right.'}
            </h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">
              {selected === question.correct ? '+10 Learning XP' : 'Study the Bolus guideline'}
            </p>
            <button 
              onClick={() => setStep('start')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Try another topic
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StudentDashboard = ({ onNavigate, user }) => {
  const [stats, setStats] = useState({ 
    scenarios: user?.learningStats?.completedScenarios?.length || 0, 
    flashcards: user?.learningStats?.completedFlashcards?.length || 0, 
    xp: user?.learningStats?.quizScore || 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getLearningStats();
        if (res.success) {
          setStats({
            scenarios: res.learningStats.completedScenarios.length,
            flashcards: res.learningStats.completedFlashcards.length,
            xp: res.learningStats.quizScore
          });
        }
      } catch (err) {
        console.error("Failed to fetch learning stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
         <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Professional Development
            </h2>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-sm text-slate-500 mt-1">You're making great progress. Ready to master some new skills?</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-3">
               <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Learning Level</p>
                  <p className="text-sm font-black text-slate-900 leading-none">Novice II</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                  <Zap className="w-5 h-5 fill-current" />
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Flashcard Progress</h4>
                   <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">8 / 24 Done</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-teal-500 rounded-full transition-all duration-1000" style={{ width: '33%' }} />
                </div>
                <button 
                  onClick={() => onNavigate('flashcards')}
                  className="mt-4 w-full py-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  Continue Review <ChevronRight className="w-3 h-3" />
                </button>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scenario Mastery</h4>
                   <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">2 / 10 Mastered</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: '20%' }} />
                </div>
                <button 
                  onClick={() => onNavigate('scenarios')}
                  className="mt-4 w-full py-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  Start New Case <ChevronRight className="w-3 h-3" />
                </button>
             </div>
          </div>

          {/* Featured Scenario Card */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="hidden lg:block absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">Featured Scenario</div>
                  <div className="px-3 py-1 bg-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/5">15 Mins</div>
               </div>
               <h3 className="text-2xl font-bold mb-3 tracking-tight">Post-Term Neonate with Meconium Aspiration</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-lg">
                 Practice your resuscitation skills and immediate management of MAS in this high-fidelity simulation. Test your knowledge of suctioning protocols and oxygen therapy.
               </p>
               <div className="flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => onNavigate('scenarios')}
                    className="px-6 py-3 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center gap-2"
                  >
                    Start Simulation <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                      +12
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Practicing now</span>
               </div>
            </div>
          </div>

          {/* Practice Tool Entry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div 
               onClick={() => onNavigate('calculators')}
               className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
             >
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Practice Calculators</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">Master drug doses and fluid rates in our student-safe sandbox.</p>
                <div className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                   Open Sandbox <ChevronRight className="w-3 h-3" />
                </div>
             </div>
             <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                   <HeartPulse className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-amber-900 mb-1">Study Streak</h4>
                <p className="text-xs text-amber-700 font-medium">You've visited NeoDesk 3 days in a row! Keep it up!</p>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <QuizWidget />

           {/* Achievements Card */}
           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Recent Badges</h3>
              <div className="space-y-4">
                 {[
                   { t: "Fast Learner", d: "Completed 5 flashcards in one day", Icon: ShieldCheck, c: "teal" },
                   { t: "First Response", d: "Finished your first simulation", Icon: Zap, c: "amber" },
                   { t: "Guideline Pro", d: "Scored 100% on a clinical quiz", Icon: ActivityIcon, c: "indigo" }
                 ].map((badge, i) => (
                   <div key={i} className="flex items-center gap-4 group cursor-help">
                      <div className={`w-10 h-10 rounded-full bg-${badge.c}-50 text-${badge.c}-600 flex items-center justify-center border border-${badge.c}-100 shrink-0 group-hover:scale-110 transition-transform`}>
                         <badge.Icon className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-xs font-bold text-slate-900 tracking-tight">{badge.t}</h4>
                         <p className="text-[10px] text-slate-500 font-medium leading-tight">{badge.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="mt-8 w-full py-2.5 text-xs font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-all">
                View All Achievements
              </button>
           </div>

           {/* Quick Resource Link */}
           <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-4">Quick Resources</h4>
              <div className="space-y-2">
                 {['KMC Guidelines', 'IV Cannulation Protocol', 'Normal Vital Ranges'].map((res, i) => (
                   <div key={i} className="flex items-center justify-between py-2 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer transition-colors group">
                      <span>{res}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ClinicalDashboard = ({ onNavigate }) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
       <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">My Tools</h2>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to NeoDesk</h1>
          <p className="text-sm text-slate-500 mt-1">Use our friendly tools to help with doses and fluid rates.</p>
       </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { t: "Fluid Help", d: "Calculate IV fluid rates.", Icon: Droplets, c: "primary", h: "bg-primary/10", tCol: "text-primary", path: 'calculators' },
        { t: "Quick Doses", d: "For urgent medications.", Icon: Zap, c: "rose", h: "bg-rose-50", tCol: "text-rose-500", path: 'calculators' },
        { t: "Our Guidelines", d: "Neonatal care pathways.", Icon: Activity, c: "teal", h: "bg-teal-50", tCol: "text-teal-600", path: 'flashcards' },
        { t: "Learning Mode", d: "Practice with scenarios.", Icon: GraduationCap, c: "indigo", h: "bg-indigo-50", tCol: "text-indigo-600", path: 'scenarios' }
      ].map((module, i) => (
        <div 
          key={i} 
          onClick={() => onNavigate(module.path)}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group flex flex-col items-start min-h-[160px]"
        >
           <div className={`w-10 h-10 ${module.h} ${module.tCol} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <module.Icon className="w-5 h-5" />
           </div>
           <h3 className="text-sm font-bold text-slate-900 mb-1">{module.t}</h3>
           <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">{module.d}</p>
           <div className={`mt-auto flex items-center gap-1.5 ${module.tCol} text-[10px] font-bold uppercase tracking-widest group-hover:gap-2.5 transition-all`}>
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
           </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Important Notices</h3>
             <span className="text-[10px] font-bold text-slate-400">Ref: UN-24-99</span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-tiny overflow-hidden flex flex-col">
            {[
              { title: 'Helping Babies Breathe', type: 'Clinical Guideline', Icon: ShieldAlert, color: 'rose', status: 'Important' },
              { title: 'KMC Procedure Update', type: 'Daily Routine', Icon: HeartPulse, color: 'teal', status: 'Standard' },
              { title: 'Medication Handover Policy', type: 'Unit Update', Icon: Stethoscope, color: 'indigo', status: 'New' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer border-b last:border-0 border-slate-100 group">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-lg bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center border border-${item.color}-100`}>
                      <item.Icon className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs font-medium text-slate-500">{item.type} • V2.4</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`px-2 py-0.5 bg-${item.color}-50 text-${item.color}-600 text-[9px] font-bold rounded uppercase tracking-wider`}>{item.status}</span>
                   <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
       </div>

       <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Your Impact</h3>
          <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-md relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-1000" />
             <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest leading-none">Your Daily Help</span>
                   <h4 className="text-3xl font-black tracking-tight flex items-center gap-2">
                     12 <span className="text-sm font-bold opacity-60">Calculations</span>
                   </h4>
                </div>
                <div className="p-4 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm">
                   <p className="text-[10px] font-medium leading-relaxed text-indigo-50">
                     "Every precise calculation helps keep our newborns safe. Thank you for all you do."
                   </p>
                </div>
                <button className="bg-white text-indigo-600 font-bold text-[10px] uppercase tracking-widest py-2 px-4 rounded-lg transition-all hover:bg-slate-50 shadow-sm active:scale-95">
                   View History
                </button>
             </div>
          </div>
       </div>
    </div>
  </div>
);

// --- MAIN WRAPPER ---

export default function Dashboard({ user, onNavigate }) {
  const [stats, setStats] = useState({ users: 0, flashcards: 0, scenarios: 0 });
  const [loading, setLoading] = useState(true);

  const isAdminView = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';
  const isStudentView = user?.role === 'Student';

  useEffect(() => {
    if (isAdminView) {
      const fetchStats = async () => {
        try {
          const res = await api.getStats();
          if (res.success) {
             setStats(res.data);
          }
        } catch (err) {
          console.error('Stats fetch failed', err);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [isAdminView]);

  return (
    <div className="max-w-[1200px] mx-auto w-full p-8 pb-32">
      {user?.role === 'Student' && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-tiny">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white border border-amber-200 rounded-lg flex items-center justify-center text-amber-600 shadow-sm">
                 <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                 <h4 className="text-sm font-bold text-amber-900 tracking-tight">Practice Mode Active</h4>
                 <p className="text-xs text-amber-700 font-medium opacity-80">You can practice here safely. These won't be saved to the main shift records.</p>
              </div>
           </div>
           <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg uppercase tracking-widest">
              <AlertCircle className="w-3.5 h-3.5" /> No Logs
           </div>
        </div>
      )}

      {isAdminView ? (
        <AdminDashboard stats={stats} loading={loading} onNavigate={onNavigate} />
      ) : isStudentView ? (
        <StudentDashboard onNavigate={onNavigate} user={user} />
      ) : (
        <ClinicalDashboard onNavigate={onNavigate} />
      )}
    </div>
  );
}
