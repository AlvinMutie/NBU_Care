import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Thermometer, Droplets, 
  Activity, Baby, History, Stethoscope, Microscope, Pill, FileText,
  TrendingUp, AlertCircle, Scale,
  Calendar, Clock, MapPin, Zap, Info, ShieldCheck, ArrowRight, CheckCircle2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const NeonateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('biodata');

  // Exhaustive Mock Data based on REQUEST.md
  const neonate = {
    bio: {
      hospitalNumber: id || 'NBU-001',
      name: 'Baby Mary Jane',
      gender: 'Female',
      dob: '2026-06-05',
      tob: '08:45 AM',
      age: '48 Hours',
      birthWeight: 1.250,
      currentWeight: 1.310,
      weightChange: '+60g',
      gestationalAge: '32 weeks',
      deliveryMethod: 'C-Section',
      apgar: { 1: 7, 5: 8, 10: 9 },
      placeOfBirth: 'Nairobi Hospital',
      dateAdmitted: '2026-06-05',
      timeAdmitted: '09:30 AM',
      location: { unit: 'NICU', room: '04', bed: '02' },
      assignedNurse: 'Patrick Kamau',
      consultant: 'Dr. Angela Omwansa',
      manager: 'Teresa Njoroge',
      status: 'Serious'
    },
    maternal: {
      name: 'Jane Mary Smith',
      hospitalNumber: 'M-992-X',
      age: 28,
      contact: '+254 700 000 000',
      obstetric: { gravidity: 'G2', parity: 'P1', deaths: 0, preterm: 1, stillbirths: 0 },
      medical: { bloodGroup: 'O+', hiv: 'Negative', diabetes: 'No', hypertension: 'Controlled', epilepsy: 'No', sickleCell: 'No' },
      antenatal: { ancAttendance: '4 Visits', steroids: 'Given', infections: 'None', prom: 'None', fever: 'No', complications: 'Pre-eclampsia' },
      delivery: { place: 'Nairobi Hospital', mode: 'Emergency C-Section', resuscitation: 'Stimulation + O2', meconium: 'No', complications: 'None' }
    },
    presenting: {
      primaryDiagnosis: 'Respiratory Distress Syndrome (RDS)',
      symptoms: ['Respiratory Distress', 'Poor Feeding', 'Lethargy'],
      workingDiagnosis: 'Early Onset Sepsis',
      differential: 'Transient Tachypnea of the Newborn'
    },
    assessment: {
      general: 'Irritable',
      neurological: { tone: 'Normal', reflexes: 'Intact', seizures: 'None' },
      respiratory: { rate: 64, grunting: 'Mild', retractions: 'Intercostal', flaring: 'Yes', apnea: 'None' },
      cardiovascular: { hr: 142, crt: '< 2s', perfusion: 'Good' },
      gastrointestinal: { tolerance: 'Fair', vomiting: 'None', distension: 'None' },
      skin: { jaundice: 'Mild', pallor: 'No', cyanosis: 'No', rashes: 'None' }
    },
    investigations: {
      labs: {
        fbc: { hb: 14.2, wbc: 12.5, platelets: 250 },
        infection: { crp: 4.2, culture: 'Pending' },
        sugar: 3.8,
        bilirubin: 180,
        lft: { alt: 22, ast: 30, albumin: 34 },
        kft: { urea: 4.5, creatinine: 55, electrolytes: 'Normal' },
        bloodGroup: 'O+',
        hivExposure: 'Negative'
      },
      imaging: { cxr: 'Reticulogranular pattern', echo: 'PDA small', ultrasound: 'Normal' }
    }
  };

  const vitalsHistory = [
    { time: '08:00', hr: 142, spo2: 96, temp: 36.8, rr: 62 },
    { time: '10:00', hr: 145, spo2: 94, temp: 36.7, rr: 64 },
    { time: '12:00', hr: 138, spo2: 97, temp: 36.9, rr: 58 },
    { time: '14:00', hr: 140, spo2: 95, temp: 36.8, rr: 60 },
    { time: '16:00', hr: 148, spo2: 92, temp: 36.6, rr: 68 },
  ];

  const tabs = [
    { id: 'biodata', name: 'BioData', icon: Baby },
    { id: 'maternal', name: 'Maternal', icon: History },
    { id: 'assessment', name: 'Assessment', icon: Stethoscope },
    { id: 'investigations', name: 'Investigations', icon: Microscope },
    { id: 'monitoring', name: 'Monitoring', icon: TrendingUp },
    { id: 'treatment', name: 'Treatment', icon: Pill },
    { id: 'discharge', name: 'Discharge', icon: FileText },
    { id: 'notes', name: 'Clinical Notes', icon: FileText },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-28">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <Link to="/neonates" className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border-2 ${neonate.bio.gender === 'Female' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
              {neonate.bio.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{neonate.bio.name}</h2>
              <p className="text-sm text-slate-500 font-medium">Hospital ID: <span className="font-mono text-emerald-600 font-bold">{neonate.bio.hospitalNumber}</span></p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-100 flex items-center space-x-2">
            <AlertCircle size={16} className="text-rose-600" />
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest">{neonate.bio.status} STATUS</span>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all">
            Update Admission
          </button>
        </div>
      </div>

      {/* Modern Professional Tab Bar */}
      <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex items-center overflow-x-auto no-scrollbar shadow-sm sticky top-0 z-30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center space-x-2.5 px-6 py-2.5 rounded-xl transition-all whitespace-nowrap text-sm font-bold tracking-tight
              ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
            `}
          >
            <tab.icon size={18} />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Exhaustive Content Sections */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'biodata' && (
            <motion.div 
              key="biodata"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
                  <div className="flex items-center space-x-3 text-emerald-600 border-b border-slate-50 pb-6">
                     <Baby size={20} />
                     <h3 className="text-lg font-bold tracking-tight text-slate-900 uppercase tracking-widest text-[11px]">Core Identification</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: 'Date of Birth', val: neonate.bio.dob, icon: Calendar },
                      { label: 'Time of Birth', val: neonate.bio.tob, icon: Clock },
                      { label: 'Age', val: neonate.bio.age, icon: TrendingUp },
                      { label: 'Gestational Age', val: neonate.bio.gestationalAge, icon: Info },
                      { label: 'Birth Weight', val: `${neonate.bio.birthWeight} kg`, icon: Scale },
                      { label: 'Current Weight', val: `${neonate.bio.currentWeight} kg`, icon: TrendingUp },
                      { label: 'Weight Change', val: neonate.bio.weightChange, icon: Activity },
                      { label: 'Delivery Mode', val: neonate.bio.deliveryMethod, icon: MapPin },
                    ].map(item => (
                      <div key={item.label} className="space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm font-bold text-slate-900">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Admission & Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Unit</span>
                         <span className="text-sm font-bold text-slate-900">{neonate.bio.location.unit}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bed / Room</span>
                         <span className="text-sm font-bold text-slate-900">{neonate.bio.location.room} - {neonate.bio.location.bed}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                       {[
                         { label: 'Consultant', val: neonate.bio.consultant },
                         { label: 'In-Charge', val: neonate.bio.manager },
                         { label: 'Nurse assigned', val: neonate.bio.assignedNurse },
                       ].map(i => (
                         <div key={i.label} className="flex justify-between items-center px-2">
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{i.label}</span>
                           <span className="text-sm font-bold text-slate-900">{i.val}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 space-y-6">
                   <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.3em]">APGAR Scores</p>
                   <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-3xl font-black">{neonate.bio.apgar[1]}</p>
                        <p className="text-[9px] font-bold text-emerald-200 uppercase">1 Min</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-3xl font-black">{neonate.bio.apgar[5]}</p>
                        <p className="text-[9px] font-bold text-emerald-200 uppercase">5 Min</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-3xl font-black">{neonate.bio.apgar[10]}</p>
                        <p className="text-[9px] font-bold text-emerald-200 uppercase">10 Min</p>
                      </div>
                   </div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                   <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Safety Alerts</h3>
                   <div className="space-y-3">
                      <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-3 text-rose-700">
                         <AlertCircle size={16} className="shrink-0 mt-0.5" />
                         <p className="text-xs font-bold leading-relaxed uppercase tracking-wider">Hypoglycemia Alert</p>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start space-x-3 text-amber-700">
                         <Zap size={16} className="shrink-0 mt-0.5" />
                         <p className="text-xs font-bold leading-relaxed uppercase tracking-wider">Oxygen Dependency</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'maternal' && (
            <motion.div 
              key="maternal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
                 <div className="flex items-center space-x-3 text-blue-600 border-b border-slate-50 pb-6">
                    <History size={20} />
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 uppercase tracking-widest text-[11px]">Mother Identification</h3>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { label: 'Name', val: neonate.maternal.name },
                      { label: 'Hospital Number', val: neonate.maternal.hospitalNumber },
                      { label: 'Maternal Age', val: neonate.maternal.age },
                      { label: 'Contact', val: neonate.maternal.contact },
                      { label: 'Blood Group', val: neonate.maternal.medical.bloodGroup },
                      { label: 'HIV Status', val: neonate.maternal.medical.hiv },
                    ].map(item => (
                      <div key={item.label} className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm font-bold text-slate-900">{item.val}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
                 <div className="flex items-center space-x-3 text-emerald-600 border-b border-slate-50 pb-6">
                    <History size={20} />
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 uppercase tracking-widest text-[11px]">Obstetric & Pregnancy History</h3>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { label: 'Gravidity', val: neonate.maternal.obstetric.gravidity },
                      { label: 'Parity', val: neonate.maternal.obstetric.parity },
                      { label: 'ANC Attendance', val: neonate.maternal.antenatal.ancAttendance },
                      { label: 'Complications', val: neonate.maternal.antenatal.complications },
                      { label: 'Preterm history', val: neonate.maternal.obstetric.preterm },
                      { label: 'Steroids given', val: neonate.maternal.antenatal.steroids },
                    ].map(item => (
                      <div key={item.label} className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm font-bold text-slate-900">{item.val}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'assessment' && (
            <motion.div 
              key="assessment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
               <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Multi-System Evaluation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Neurological</p>
                             <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-[9px] text-slate-400 uppercase">Tone</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.neurological.tone}</p></div>
                                <div><p className="text-[9px] text-slate-400 uppercase">Seizures</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.neurological.seizures}</p></div>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Respiratory</p>
                             <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-[9px] text-slate-400 uppercase">Rate</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.respiratory.rate} bpm</p></div>
                                <div><p className="text-[9px] text-slate-400 uppercase">Grunting</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.respiratory.grunting}</p></div>
                                <div><p className="text-[9px] text-slate-400 uppercase">Flaring</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.respiratory.flaring}</p></div>
                                <div><p className="text-[9px] text-slate-400 uppercase">Retractions</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.respiratory.retractions}</p></div>
                             </div>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Cardiovascular</p>
                             <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-[9px] text-slate-400 uppercase">Heart Rate</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.cardiovascular.hr} bpm</p></div>
                                <div><p className="text-[9px] text-slate-400 uppercase">Perfusion</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.cardiovascular.perfusion}</p></div>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Gastrointestinal</p>
                             <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-[9px] text-slate-400 uppercase">Tolerance</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.gastrointestinal.tolerance}</p></div>
                                <div><p className="text-[9px] text-slate-400 uppercase">Distension</p><p className="text-sm font-bold text-slate-900">{neonate.assessment.gastrointestinal.distension}</p></div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
               
               <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6 h-fit">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Skin & Perfusion</h3>
                  <div className="space-y-5 divide-y divide-slate-50">
                    {Object.entries(neonate.assessment.skin).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center pt-4 first:pt-0">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest capitalize">{key}</span>
                         <span className="text-sm font-bold text-slate-900">{val}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'investigations' && (
            <motion.div 
              key="investigations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
               <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                     <h3 className="text-lg font-bold tracking-tight text-slate-900">Laboratory Findings</h3>
                     <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 uppercase tracking-widest">Validated</span>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Blood Count (FBC)</p>
                           <div className="space-y-3">
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">Hemoglobin (Hb)</span>
                                 <span className="text-sm font-bold text-slate-900">{neonate.investigations.labs.fbc.hb} g/dL</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">WBC Count</span>
                                 <span className="text-sm font-bold text-slate-900">{neonate.investigations.labs.fbc.wbc} x10⁹/L</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">Platelets</span>
                                 <span className="text-sm font-bold text-slate-900">{neonate.investigations.labs.fbc.platelets} x10⁹/L</span>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4 pt-4">
                           <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Infection Markers</p>
                           <div className="space-y-3">
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">CRP</span>
                                 <span className="text-sm font-bold text-rose-600">{neonate.investigations.labs.infection.crp} mg/L</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">Blood Culture</span>
                                 <span className="text-sm font-bold text-amber-600 italic">Pending...</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metabolic & Organ Function</p>
                           <div className="space-y-3">
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">Blood Sugar (BSL)</span>
                                 <span className="text-sm font-bold text-slate-900">{neonate.investigations.labs.sugar} mmol/L</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">Bilirubin</span>
                                 <span className="text-sm font-bold text-slate-900">{neonate.investigations.labs.bilirubin} μmol/L</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">Creatinine</span>
                                 <span className="text-sm font-bold text-slate-900">{neonate.investigations.labs.kft.creatinine} μmol/L</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-50 pb-2">
                                 <span className="text-xs font-medium text-slate-500">Albumin</span>
                                 <span className="text-sm font-bold text-slate-900">{neonate.investigations.labs.lft.albumin} g/L</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Imaging Records</h3>
                     <div className="space-y-6">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Chest X-Ray</p>
                           <p className="text-xs font-bold text-slate-700 leading-relaxed">{neonate.investigations.imaging.cxr}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Echocardiography</p>
                           <p className="text-xs font-bold text-slate-700 leading-relaxed">{neonate.investigations.imaging.echo}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cranial Ultrasound</p>
                           <p className="text-xs font-bold text-slate-700 leading-relaxed">{neonate.investigations.imaging.ultrasound}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'monitoring' && (
            <motion.div 
              key="monitoring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'SpO2', value: '95%', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Heart Rate', value: '142 bpm', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Temp', value: '36.8°C', icon: Thermometer, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Resp Rate', value: '62 bpm', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                         <stat.icon size={20} />
                      </div>
                    </div>
                  ))}
               </div>

               <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                     <h3 className="text-lg font-bold tracking-tight text-slate-900 uppercase tracking-[0.2em] text-[11px]">Vital Trend Orchestration</h3>
                     <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Heart Rate (24h)</span>
                     </div>
                  </div>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={vitalsHistory}>
                        <defs>
                          <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="hr" stroke="#ef4444" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Intake Summary</h3>
                     <div className="space-y-4">
                        {[
                           { label: 'Expressed Breast Milk', val: '12 ml', time: '10:00 AM' },
                           { label: 'NG Tube Feed', val: '12 ml', time: '01:00 PM' },
                           { label: 'IV Fluids (D10%)', val: '6.5 ml/hr', time: 'Ongoing' },
                        ].map((i, idx) => (
                           <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-all">
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{i.label}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{i.time}</p>
                              </div>
                              <span className="text-sm font-bold text-emerald-600">{i.val}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Output & Balance</h3>
                     <div className="space-y-4">
                        {[
                           { label: 'Urine Output', val: '45 ml', status: 'Normal' },
                           { label: 'Stool Output', val: '1 Event', status: 'Meconium' },
                           { label: 'Vomiting', val: 'None', status: '-' },
                        ].map((i, idx) => (
                           <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{i.label}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{i.status}</p>
                              </div>
                              <span className="text-sm font-bold text-blue-600">{i.val}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'treatment' && (
             <motion.div 
              key="treatment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
               <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Clinical Interventions</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center space-x-2">
                              <Pill size={14} />
                              <span>Active Medications</span>
                           </p>
                           <div className="space-y-3">
                              {[
                                 { name: 'Gentamicin', dose: '5 mg/kg', vol: '0.45 ml', freq: 'Once Daily', route: 'IV' },
                                 { name: 'Dopamine', dose: '10 mcg/kg/min', vol: '0.45 ml/hr', freq: 'Continuous', route: 'IV Inf' },
                              ].map(med => (
                                 <div key={med.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                                    <div>
                                       <p className="text-sm font-bold text-slate-900">{med.name}</p>
                                       <p className="text-[10px] text-slate-500 font-bold uppercase">{med.dose} • {med.freq}</p>
                                    </div>
                                    <div className="text-right">
                                       <p className="text-sm font-bold text-emerald-600">{med.vol}</p>
                                       <p className="text-[9px] text-slate-400 font-bold uppercase">{med.route}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <p className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center space-x-2">
                              <Zap size={14} />
                              <span>Respiratory Support</span>
                           </p>
                           <div className="p-5 bg-blue-50 border border-blue-100 rounded-[1.5rem] space-y-4">
                              <div className="flex justify-between items-center">
                                 <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">CPAP Status</span>
                                 <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-full uppercase">Active</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <div><p className="text-[9px] text-blue-400 uppercase font-bold">PEEP</p><p className="text-sm font-black text-blue-800">6.0 cmH2O</p></div>
                                 <div><p className="text-[9px] text-blue-400 uppercase font-bold">FiO2</p><p className="text-sm font-black text-blue-800">24%</p></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Feeding Plan</h3>
                     <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Method</span>
                           <span className="text-sm font-bold text-slate-900">NG Tube Feeding</span>
                        </div>
                        <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-200">
                           <div><p className="text-[9px] text-slate-400 uppercase font-bold mb-1">Volume</p><p className="text-base font-bold text-slate-900">12 ml</p></div>
                           <div><p className="text-[9px] text-slate-400 uppercase font-bold mb-1">Frequency</p><p className="text-base font-bold text-slate-900">3 Hourly</p></div>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Procedures</h3>
                     <div className="space-y-3">
                        {['IV Cannulation', 'Blood Sugar Monitoring', 'Phototherapy (Single)'].map(p => (
                           <div key={p} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <CheckCircle2 size={16} className="text-emerald-500" />
                              <span className="text-sm font-bold text-slate-800">{p}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
             </motion.div>
          )}

          {activeTab === 'discharge' && (
             <motion.div 
              key="discharge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
               <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Institutional Discharge Summary</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <p className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center space-x-2">
                              <Calendar size={14} className="text-emerald-600" />
                              <span>Discharge Timeline</span>
                           </p>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Target Date</p>
                                 <p className="text-sm font-bold text-slate-900">2026-06-15</p>
                              </div>
                              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Estimated Time</p>
                                 <p className="text-sm font-bold text-slate-900">10:00 AM</p>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <p className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center space-x-2">
                              <Scale size={14} className="text-blue-600" />
                              <span>Anthropometric Data</span>
                           </p>
                           <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex justify-between items-center">
                              <div>
                                 <p className="text-[9px] font-bold text-blue-400 uppercase mb-1">Birth Weight</p>
                                 <p className="text-sm font-bold text-slate-900">1.250 kg</p>
                              </div>
                              <ArrowRight size={16} className="text-blue-200" />
                              <div className="text-right">
                                 <p className="text-[9px] font-bold text-blue-400 uppercase mb-1">Discharge Weight</p>
                                 <p className="text-lg font-black text-blue-700 font-mono">1.820 kg</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <p className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center space-x-2">
                              <Pill size={14} className="text-amber-600" />
                              <span>Follow-Up Care Plan</span>
                           </p>
                           <div className="space-y-3">
                              {[
                                 { label: 'Clinic', val: 'Pediatric Neurology' },
                                 { label: 'Date', val: '2026-06-22' },
                                 { label: 'Clinician', val: 'Dr. Angela Omwansa' },
                              ].map(i => (
                                 <div key={i.label} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{i.label}</span>
                                    <span className="text-sm font-bold text-slate-900">{i.val}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center space-x-5">
                     <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                        <ShieldCheck size={24} />
                     </div>
                     <div>
                        <p className="text-base font-bold text-emerald-900 tracking-tight">Final Institutional Validation</p>
                        <p className="text-xs text-emerald-700 font-medium leading-relaxed">Discharge summary requires authentication by the Consultant and Nurse In-Charge.</p>
                     </div>
                  </div>
                  <button className="bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 active:scale-95">
                     Authenticate Discharge
                  </button>
               </div>
             </motion.div>
          )}

          {activeTab === 'notes' && (
             <motion.div 
              key="notes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-6">
                     {[
                        { role: 'Nurse', name: 'Patrick Kamau', time: '10:15 AM', content: 'Feeding tolerated well. Minimal gastric residuals noted. Temperature stable at 36.8°C.', type: 'Clinical Note' },
                        { role: 'MO', name: 'Dr. Cynthia Wekesa', time: '09:30 AM', content: 'Neonate irritable. SpO2 dropped briefly to 88% on room air. Repositioned. CRP results pending.', type: 'Assessment' },
                        { role: 'Consultant', name: 'Dr. Angela Omwansa', time: '08:00 AM', content: 'Continue current CPAP settings. Review CRP at 12:00. Maintain IV fluids at 6.5 ml/hr.', type: 'Consultation Review' },
                     ].map((note, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-4 hover:border-emerald-200 transition-all group">
                           <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xs border border-slate-100">
                                    {note.name.split(' ').map(n => n[0]).join('')}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{note.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.role} • {note.type}</p>
                                 </div>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">{note.time}</span>
                           </div>
                           <p className="text-[15px] text-slate-600 leading-relaxed font-medium pl-14">
                              "{note.content}"
                           </p>
                        </div>
                     ))}
                  </div>
                  <div className="lg:col-span-4 space-y-6 h-fit">
                     <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Entry Command</h3>
                        <textarea 
                           className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none placeholder:text-slate-400" 
                           placeholder="Type clinical update or observation..."
                        />
                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-[0.98] transition-all">
                           Publish Note to Timeline
                        </button>
                     </div>
                  </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NeonateProfile;
