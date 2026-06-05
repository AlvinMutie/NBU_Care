import React, { useState, useRef } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
  User,
  Fingerprint,
  ChevronRight,
  ChevronDown,
  Camera,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';

export default function Register({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    hospitalId: '',
    role: 'Staff Nurse',
    email: '',
    phone: '',
    password: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload a profile image for safety identification.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('role', formData.role);
      data.append('phone', formData.phone);
      data.append('idNumber', formData.hospitalId);
      data.append('profileImage', image);

      const res = await api.register(data);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setError(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 font-sans">
        <div className="max-w-md w-full bg-white p-12 rounded-3xl border border-slate-200 shadow-xl text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Request Submitted</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Your account is currently <span className="font-bold text-slate-900 uppercase text-xs px-2 py-1 bg-slate-100 rounded">Pending Verification</span>. 
            The Nursing In-Charge will review your profile image and details. You'll be notified once approved!
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100 flex items-start gap-4 text-left">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
             </div>
             <div>
                <p className="text-sm font-bold text-slate-900">Next Steps</p>
                <p className="text-xs text-slate-500 mt-1">Once verified, a blue tick badge will appear on your profile, and you'll have full access.</p>
             </div>
          </div>
          <button 
            onClick={onBack}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95"
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
      <div className="hidden xl:flex flex-[0.4] bg-slate-900 flex-col items-center justify-center p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />
         
         <div className="max-w-xs text-center relative z-10">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 backdrop-blur-xl">
              <Stethoscope className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Join Neo<span className="text-primary text-5xl">.</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium mb-12">
               Your companion for safer neonatal care.
            </p>
            
            <div className="space-y-4">
               {[
                 { icon: Camera, text: "Verify with profile photo" },
                 { icon: ShieldCheck, text: "Identity confirmation" },
                 { icon: CheckCircle2, text: "Clinical blue tick" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 text-left p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                       <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-slate-300 text-sm font-semibold">{item.text}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col p-6 lg:p-12 items-center justify-start overflow-y-auto relative bg-white lg:rounded-l-[40px] shadow-2xl z-20">
         <button 
           onClick={onBack}
           className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm transition-all group"
         >
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
         </button>

         <div className="max-w-2xl w-full mt-12 mb-20">
            <div className="text-left mb-12">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Staff Registration</h1>
              <p className="text-slate-500 font-medium">To maintain clinical safety, all accounts must be verified by the In-Charge.</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                 <AlertCircle className="w-5 h-5 flex-shrink-0" />
                 <p className="text-sm font-bold">{error}</p>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden group"
                   onClick={() => fileInputRef.current.click()}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl" />
                    <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                       <Camera className="w-5 h-5" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Camera className="w-10 h-10 text-slate-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">Upload Profile Photo</p>
                    <p className="text-xs text-slate-400 mt-1">Must be a clear face photo (Passport style)</p>
                  </>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Legal Name</label>
                   <div className="relative group">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                     <input
                       name="name"
                       required
                       value={formData.name}
                       onChange={handleChange}
                       className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-medium"
                       placeholder="As per Hospital ID"
                     />
                   </div>
                 </div>

                 <div className="space-y-3">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Staff ID Number</label>
                   <div className="relative group">
                     <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                     <input
                       name="hospitalId"
                       required
                       value={formData.hospitalId}
                       onChange={handleChange}
                       className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-medium"
                       placeholder="NBU-2024-XXXX"
                     />
                   </div>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Professional Role</label>
                  <div className="relative">
                    <select 
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm appearance-none bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-bold cursor-pointer"
                    >
                      <option>Nurse</option>
                      <option>Nursing In-Charge</option>
                      <option>CO Pediatrics / MO</option>
                      <option>Consultant Pediatrician</option>
                      <option>Student</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-medium"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Hospital Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-medium"
                    placeholder="name@hospital.org"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Security Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-14 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-medium"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white py-5 rounded-[24px] font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mt-12 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit for Verification</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-12 text-center">
               <p className="text-slate-400 text-sm font-medium">
                 Already verified?{' '}
                 <button onClick={onBack} className="text-primary font-black hover:underline transition-all">Sign in here</button>
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
