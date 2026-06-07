import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'NeoDesk Clinical Assistant active. How can I assist you with unit protocols or dosing math today?' }
  ]);
  const [input, setMessagesInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setMessagesInput('');
    
    // Simulate bot response with a "typing" state placeholder
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: 'Understood. I am cross-referencing the NeoDesk v16.0 Knowledge Hub for that specific clinical query...' }]);
    }, 1000);
  };

  return (
    <div className="relative z-[100]">
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 lg:bottom-10 right-6 w-16 h-16 bg-emerald-500 rounded-2xl shadow-[0_10px_40px_-5px_rgba(16,185,129,0.5)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-50 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="absolute inset-0 bg-emerald-400 rounded-2xl animate-ping opacity-20 group-hover:hidden" />
        <MessageSquare size={30} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            className="fixed bottom-6 lg:bottom-10 right-6 w-[95vw] sm:w-[420px] h-[650px] max-h-[85vh] bg-[#0f172a]/90 backdrop-blur-2xl rounded-[2.5rem] z-[60] flex flex-col overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-between shadow-xl">
              <div className="flex items-center space-x-4">
                 <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md border border-white/10">
                    <Bot size={22} className="text-white" />
                 </div>
                 <div>
                    <h3 className="text-base font-bold text-white leading-none">Clinical AI Assistant</h3>
                    <div className="flex items-center space-x-1.5 mt-1.5">
                       <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                       <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest leading-none">v16.0 Live</p>
                    </div>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/10 rounded-xl text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-emerald-500 text-[#0f172a] rounded-tr-none shadow-lg shadow-emerald-500/20' : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'}`}>
                       {m.text}
                    </div>
                 </div>
               ))}
               <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start space-x-4">
                     <Sparkles size={18} className="text-blue-400 shrink-0 mt-0.5" />
                     <p className="text-xs text-slate-400 font-medium italic leading-relaxed">I can assist with medication math, unit protocols, and troubleshooting medical equipment.</p>
                  </div>
               </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-y border-white/5 bg-white/[0.02]">
               <button className="w-full flex items-center justify-center space-x-3 py-2 text-xs font-bold text-emerald-400 uppercase tracking-[0.1em] hover:text-emerald-300 transition-colors group">
                  <PhoneCall size={14} className="group-hover:animate-bounce" />
                  <span>Emergency Help Line</span>
               </button>
            </div>

            {/* Input */}
            <div className="p-6 bg-black/20 backdrop-blur-xl">
               <div className="relative group">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setMessagesInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe clinical situation..."
                    className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                  />
                  <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 text-[#0f172a] rounded-[0.8rem] flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 active:scale-95"
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
