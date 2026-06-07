import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'NeoDesk Institutional Assistant active. I can assist with clinical protocols (v16.42), medication math, or unit transitions. How can I help you today?' }
  ]);
  const [input, setMessagesInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setMessagesInput('');
    setIsTyping(true);
    
    // Professional Clinical Simulation
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Consulting NeoDesk v16.42 Core... For your query regarding "${userMessage.substring(0, 20)}...", the institutional protocol recommends cross-verifying with the secondary clinician lead. Would you like me to pull the specific CPAP titration chart or dosing range for this patient context?` 
      }]);
    }, 1500);
  };

  return (
    <div className="relative z-[100] font-sans">
      {/* Floating Action Button - High Fidelity */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 lg:bottom-10 right-6 w-16 h-16 bg-slate-900 dark:bg-emerald-600 rounded-[1.5rem] shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-50 group border border-white/10 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="absolute inset-0 bg-emerald-500 rounded-[1.5rem] animate-ping opacity-10 group-hover:hidden" />
        <MessageSquare size={28} className="text-emerald-400 dark:text-white" strokeWidth={2.5} />
      </button>

      {/* Chat Window - Mobbin Inspired Premium */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, x: 20 }}
            className="fixed bottom-6 lg:bottom-10 right-6 w-[95vw] sm:w-[420px] h-[700px] max-h-[85vh] bg-[var(--card-bg)] rounded-[2.5rem] z-[110] flex flex-col overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-[var(--border-main)] transition-colors duration-300"
          >
            {/* Header - Institutional Style */}
            <div className="p-6 bg-slate-900 dark:bg-slate-950 flex items-center justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                 <Bot size={120} />
              </div>
              <div className="flex items-center space-x-4 relative z-10">
                 <div className="p-2.5 bg-emerald-500/20 rounded-2xl border border-emerald-500/20 backdrop-blur-md">
                    <Bot size={22} className="text-emerald-400" />
                 </div>
                 <div>
                    <h3 className="text-base font-bold text-white leading-none tracking-tight">NeoDesk Assistant</h3>
                    <div className="flex items-center space-x-1.5 mt-2">
                       <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">v16.0 Knowledge Core</p>
                    </div>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors relative z-10">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[var(--bg-main)] transition-colors duration-300">
               {messages.map((m, i) => (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                    <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-[13px] font-medium leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-slate-900 dark:bg-emerald-600 text-white rounded-tr-none' : 'bg-[var(--card-bg)] border border-[var(--border-main)] text-[var(--text-main)] rounded-tl-none'}`}>
                       {m.text}
                       {m.role === 'bot' && (
                         <div className="mt-3 pt-3 border-t border-[var(--border-main)] flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 size={10} strokeWidth={3} />
                            <span>Protocol Validated</span>
                         </div>
                       )}
                    </div>
                 </motion.div>
               ))}
               
               {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-4 rounded-2xl rounded-tl-none shadow-sm">
                       <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                       </div>
                    </div>
                 </div>
               )}

               <div className="pt-2">
                  <div className="p-5 rounded-[1.5rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 flex items-start space-x-4 shadow-sm transition-colors duration-300">
                     <Sparkles size={18} className="text-blue-500 shrink-0 mt-0.5" />
                     <p className="text-[12px] text-blue-700 dark:text-blue-300 font-medium leading-relaxed italic">Expert on medication math, ventilation protocols, and institutional compliance standards.</p>
                  </div>
               </div>
            </div>

            {/* Emergency Hotline Bridge */}
            <div className="px-8 py-3 border-y border-[var(--border-main)] bg-[var(--bg-main)] transition-colors duration-300">
               <button className="w-full flex items-center justify-center space-x-3 py-2 text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] hover:text-rose-700 transition-colors group">
                  <PhoneCall size={14} className="group-hover:animate-shake" />
                  <span>Escalate to Institutional Lead</span>
               </button>
            </div>

            {/* Premium Input Area */}
            <div className="p-6 bg-[var(--card-bg)] border-t border-[var(--border-main)] transition-colors duration-300 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.05)]">
               <div className="relative group">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setMessagesInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe clinical situation..."
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-[1.2rem] py-4.5 pl-6 pr-14 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 dark:bg-emerald-600 text-white rounded-[0.9rem] flex items-center justify-center hover:bg-black dark:hover:bg-emerald-700 transition-all shadow-lg active:scale-95 disabled:opacity-20"
                  >
                    <Send size={18} strokeWidth={2.5} />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatbot;
