import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Baby, 
  Clock, 
  AlertTriangle, 
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Activity
} from 'lucide-react';
import { api } from '../services/api';

const Flashcard = ({ _id, title, category, when, steps, warning, tips }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleMarkAsRead = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await api.completeFlashcard(_id || title);
      if (res.success) {
        setIsRead(true);
      }
    } catch (err) {
      console.error("Failed to mark flashcard as read");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              isRead ? 'bg-emerald-500 text-white border-emerald-500' :
              category === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
            }`}>
               {isRead ? <CheckCircle2 className="w-6 h-6" /> : 
                category === 'Critical' ? <AlertTriangle className="w-6 h-6" /> : <Baby className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                   category === 'Critical' ? 'bg-rose-100 text-rose-700' : 
                   category === 'Clinical' ? 'bg-emerald-100 text-emerald-700' : 
                   'bg-indigo-100 text-indigo-700'
                 }`}>
                   {category}
                 </span>
                 {isRead && (
                   <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" /> Reviewed
                   </div>
                 )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
            </div>
          </div>
          <div className="flex gap-2">
            {!isRead && (
              <button 
                onClick={handleMarkAsRead}
                disabled={loading}
                className="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200 flex items-center justify-center transition-all"
                title="Mark as Read"
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={toggleExpand}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                isExpanded ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-slate-200'
              }`}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="flex gap-4">
            <div className="w-1 bg-primary/20 rounded-full shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Clock className="w-3 h-3 text-primary" /> When to use this
              </p>
              <p className="text-sm font-medium text-slate-700 italic border-l-2 border-slate-100 pl-3">"{when}"</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-3 h-3 text-primary" /> Step by step
            </p>
            <div className="grid gap-2">
              {steps?.map((step, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-slate-50 border border-slate-100 group hover:border-slate-200 transition-colors">
                  <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors shrink-0">
                    {String(i + 1)}
                  </div>
                  <p className="text-sm text-slate-700 font-medium pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {warning && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 text-rose-800">
                <div className="mt-0.5">
                   <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-rose-600">⚠ Watch out</p>
                  <p className="text-xs font-semibold">{warning}</p>
                </div>
              </div>
            )}

            {tips && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-800">
                <div className="mt-0.5">
                   <Lightbulb className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-amber-600">💡 Helpful Tip</p>
                  <p className="text-xs font-medium">{tips}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Verified Guideline V4.2
             </div>
             <button className="text-xs font-bold text-primary flex items-center gap-1.5 hover:gap-3 transition-all group/btn">
                View Records <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>

        {!isExpanded && (
           <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <ChevronDown className="w-3 h-3" />
              Tap to see steps
           </div>
        )}
      </div>
    </div>
  );
};

export default function Flashcards({ user }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get('/flashcards');
        if (res.success) {
          setCards(res.data);
        } else {
          setError('Failed to load clinical references.');
        }
      } catch (err) {
        setError('Hospital network secure synchronization failure.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const canAddCard = user?.role === 'Nursing In-Charge' || 
                    user?.role === 'Consultant Pediatrician';

  return (
    <div className="max-w-[1600px] mx-auto w-full p-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Procedure Library</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Step-by-Step Guides</h1>
          <p className="text-sm text-slate-500">Quick reference cards for common and critical neonatal procedures.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
              type="text" 
              placeholder="Search guides..." 
              className="pl-12 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 w-64 outline-none" 
             />
          </div>
          {canAddCard && (
            <button className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold transition-all shadow-sm">
              <Plus className="w-4 h-4" /> New Card
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Activity className="w-8 h-8 text-primary animate-pulse mb-4" />
          <p className="text-sm font-bold text-slate-400">Loading guides...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 rounded-2xl bg-rose-50 border border-rose-100">
           <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
           <h3 className="text-lg font-bold text-rose-900 mb-1">{error}</h3>
           <p className="text-xs font-medium text-rose-600">Please check your connection or contact the IT team.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <Flashcard key={card._id || i} {...card} />
          ))}
          {cards.length === 0 && (
            <div className="col-span-full p-20 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 text-center">
               <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <BookOpen className="w-8 h-8 text-slate-400" />
               </div>
               <h4 className="text-lg font-bold text-slate-900 mb-2">No guides yet</h4>
               <p className="text-sm font-medium text-slate-500 max-w-sm">Procedure guides will appear here once they've been added by the In-Charge.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
