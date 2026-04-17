import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
  User,
  Fingerprint,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export default function Register({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    hospitalId: '',
    role: 'Staff Nurse',
    email: '',
    password: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 font-sans">
        <div className="max-w-md w-full bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Got it! Request Sent</h1>
          <p className="text-slate-500 mb-10 leading-relaxed text-sm">
            We've sent your request to the Nursing In-Charge. They'll check your details and let you know when you can sign in!
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-3.5 font-bold text-sm transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col xl:flex-row bg-slate-50 font-sans">
      
      {/* Left Design Panel */}
      <div className="hidden xl:flex flex-1 bg-slate-900 flex-col items-center justify-center p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[80px]" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[60px]" />
         
         <div className="max-w-md text-center relative z-10">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
              <Stethoscope className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Join the Team</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
               Request an account to start using our nursing tools and guidelines.
            </p>
            
            <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-6 text-left">
               <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-white font-semibold">We check every request</span>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  To keep our babies safe, we check every account request. The Nursing In-Charge will review your details and approve your access soon.
               </p>
            </div>
         </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col p-6 lg:p-12 items-center justify-center overflow-y-auto relative py-20">
         <button 
           onClick={onBack}
           className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
         >
           <ArrowLeft className="w-4 h-4" /> Back to Login
         </button>

         <div className="max-w-xl w-full">
            <div className="text-left mb-10">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Sign Up</h1>
              <p className="text-slate-500">Tell us a bit about yourself so we can get your account ready.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Your Name</label>
                   <div className="relative group">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                     <input
                       name="name"
                       required
                       value={formData.name}
                       onChange={handleChange}
                       className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 outline-none transition-all text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                       placeholder="Full Name"
                     />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Your ID Number</label>
                   <div className="relative group">
                     <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                     <input
                       name="hospitalId"
                       required
                       value={formData.hospitalId}
                       onChange={handleChange}
                       className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 outline-none transition-all text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                       placeholder="HR-XXXX"
                     />
                   </div>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Your Role</label>
                <div className="relative">
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-200 outline-none transition-all text-sm appearance-none bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 cursor-pointer"
                  >
                    <option>Staff Nurse</option>
                    <option>Nursing In-Charge</option>
                    <option>Medical Officer</option>
                    <option>Consultant Pediatrician</option>
                    <option>Clinical Student</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Your Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 outline-none transition-all text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                    placeholder="name@hospital.cloud"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Choose a Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 outline-none transition-all text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 mt-8"
              >
                <span>Send Request</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
            
            <div className="mt-10 pt-10 border-t border-slate-200 text-center">
               <p className="text-slate-500 text-sm">
                 Already have an account?{' '}
                 <button onClick={onBack} className="text-primary font-bold hover:underline transition-all">Sign in</button>
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
