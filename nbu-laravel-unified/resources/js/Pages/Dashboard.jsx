import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { 
  Baby, Droplets, Activity, Zap, 
  ShieldCheck, Info, CheckCircle2,
  AlertTriangle, UserCheck, ChevronRight,
  ChevronLeft, Search, Loader2, Scale,
  Pill, ClipboardCheck, X, Check, Plus, Calendar, Phone,
  ArrowRightLeft, Thermometer, Heart, ShieldAlert, Users, Clock, User, BarChart, BarChart2, CheckSquare, TrendingUp,
  Calculator, BookOpen, BadgeCheck, LayoutDashboard, FileCode, ExternalLink, ArrowUpRight,
  Moon, Sun, Stethoscope, Printer, Download, FileText, MoreVertical, ChevronDown,
  GraduationCap, Flame
} from 'lucide-react';

export default function Dashboard({ auth, initialNeonates, initialAuditLogs, initialHandovers = [], initialRotas = [], allUsers = [], flashcards = [], scenarios = [] }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'registry', 'calculator', 'rota', 'academics', 'admin'
  const [registrySubTab, setRegistrySubTab] = useState('active-patients'); // 'overview', 'active-patients', 'handovers'
  const [calcSubTab, setCalcSubTab] = useState('calculator-workbench'); // 'overview', 'calculator-workbench'
  const [rotaSubTab, setRotaSubTab] = useState('overview'); // 'overview', 'rota-schedule'
  const [academySubTab, setAcademySubTab] = useState('overview'); // 'overview', 'flashcards', 'scenarios'
  const [adminSubTab, setAdminSubTab] = useState('overview'); // 'overview', 'vetting', 'directory', 'patients', 'settings'
  const [adminRoleFilter, setAdminRoleFilter] = useState('All'); // 'All', 'Doctor', 'Nurse'
  
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [flashcardCategory, setFlashcardCategory] = useState('All');
  const [isAdminLightMode, setIsAdminLightMode] = useState(false);
  const [adminSearchTerm, setAdminSearchTerm] = useState('');

  // Scenario States
  const [activeScenario, setActiveScenario] = useState(null);
  const [scenarioStepsCheck, setScenarioStepsCheck] = useState({});
  const [revealFormula, setRevealFormula] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  const [neonates, setNeonates] = useState(initialNeonates || []);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs || []);
  const [handovers, setHandovers] = useState(initialHandovers || []);
  const [rotas, setRotas] = useState(initialRotas || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false);
  const [isRotaModalOpen, setIsRotaModalOpen] = useState(false);

  // Sync props when Inertia updates database state in the background
  useEffect(() => {
    setNeonates(initialNeonates || []);
  }, [initialNeonates]);

  useEffect(() => {
    setAuditLogs(initialAuditLogs || []);
  }, [initialAuditLogs]);

  useEffect(() => {
    setHandovers(initialHandovers || []);
  }, [initialHandovers]);

  useEffect(() => {
    setRotas(initialRotas || []);
  }, [initialRotas]);

  const renderRoleSpecificDashboard = () => {
    const role = auth.user.role || 'Nurse';
    
    const heatmapValues = {
      'Nursing In-Charge': [
        { day: 'Mon', vals: [5, 3, 0, 9, 0, 2, 4, 1, 8, 4, 4, 8] },
        { day: 'Tue', vals: [0, 0, 0, 3, 2, 1, 8, 6, 0, 9, 0, 0] },
        { day: 'Wed', vals: [1, 2, 0, 7, 0, 0, 0, 9, 0, 4, 4, 0] },
        { day: 'Thu', vals: [7, 9, 0, 0, 2, 0, 0, 0, 1, 1, 0, 5] },
        { day: 'Fri', vals: [0, 0, 4, 4, 0, 0, 7, 1, 0, 1, 0, 1] },
        { day: 'Sat', vals: [0, 0, 0, 2, 1, 3, 8, 5, 0, 7, 0, 0] },
        { day: 'Sun', vals: [3, 2, 0, 7, 0, 0, 0, 8, 0, 4, 5, 0] }
      ],
      'Nurse': [
        { day: 'Mon', vals: [1, 2, 5, 0, 0, 4, 3, 0, 2, 2, 1, 4] },
        { day: 'Tue', vals: [0, 1, 4, 2, 1, 3, 0, 5, 2, 0, 0, 1] },
        { day: 'Wed', vals: [2, 0, 3, 4, 0, 0, 5, 2, 0, 3, 1, 2] },
        { day: 'Thu', vals: [1, 3, 0, 0, 4, 2, 1, 0, 3, 5, 2, 0] },
        { day: 'Fri', vals: [0, 2, 2, 3, 1, 0, 4, 4, 0, 1, 2, 3] },
        { day: 'Sat', vals: [3, 0, 1, 2, 0, 5, 2, 1, 4, 0, 0, 2] },
        { day: 'Sun', vals: [1, 4, 0, 3, 2, 1, 0, 2, 3, 4, 1, 1] }
      ],
      'Consultant Pediatrician': [
        { day: 'Mon', vals: [2, 1, 0, 4, 1, 0, 3, 2, 0, 1, 2, 3] },
        { day: 'Tue', vals: [0, 0, 2, 1, 0, 3, 4, 1, 0, 2, 0, 0] },
        { day: 'Wed', vals: [1, 1, 0, 3, 2, 0, 2, 4, 1, 0, 1, 1] },
        { day: 'Thu', vals: [3, 2, 1, 0, 0, 1, 0, 1, 2, 3, 0, 2] },
        { day: 'Fri', vals: [0, 0, 3, 2, 1, 0, 3, 1, 0, 1, 2, 0] },
        { day: 'Sat', vals: [1, 2, 0, 1, 0, 2, 4, 2, 1, 0, 0, 1] },
        { day: 'Sun', vals: [2, 0, 1, 3, 0, 1, 0, 2, 1, 3, 2, 0] }
      ]
    };
    
    const activeValues = heatmapValues[role] || heatmapValues['Nursing In-Charge'];
    
    const metricsData = {
      'Nursing In-Charge': [
        { title: 'Bed Occupancy', value: '18 / 20 Beds', desc: '90.0% census capacity', change: '+5.5%', up: true, color: 'text-indigo-650 dark:text-indigo-400', stroke: '#4f46e5', path: 'M10 80 Q 80 20 150 70 T 290 30' },
        { title: 'Nurse-Patient Ratio', value: '1:3 Ratio', desc: '6 clinical nurses active', change: 'Balanced', up: true, color: 'text-emerald-600 dark:text-emerald-400', stroke: '#10b981', path: 'M10 50 Q 80 80 150 40 T 290 60' },
        { title: 'Critical Care Babies', value: '4 Neonates', desc: 'Require high frequency observation', change: 'Stable', up: false, color: 'text-amber-600 dark:text-amber-400', stroke: '#f59e0b', path: 'M10 30 Q 80 60 150 20 T 290 80' }
      ],
      'Nurse': [
        { title: 'Vitals Checklist', value: '3 Due Now', desc: 'Requires hourly bed checks', change: 'Action Required', up: false, color: 'text-rose-600 dark:text-rose-450', stroke: '#ef4444', path: 'M10 80 L 100 40 L 200 60 L 290 20' },
        { title: 'Active Med Rounds', value: '12 Doses', desc: 'Next round scheduled in 25m', change: 'On Track', up: true, color: 'text-indigo-600 dark:text-indigo-400', stroke: '#4f46e5', path: 'M10 50 Q 100 20 200 80 T 290 40' },
        { title: 'Flashcards Studied', value: '14 / 20 Manuals', desc: '85.0% training completion', change: '+12.5%', up: true, color: 'text-emerald-600 dark:text-emerald-400', stroke: '#10b981', path: 'M10 60 Q 80 40 150 70 T 290 20' }
      ],
      'Consultant Pediatrician': [
        { title: 'ELBW Active Babies', value: '5 Infants', desc: 'Under 1.5kg neonatal weight', change: 'High Monitor', up: true, color: 'text-indigo-650 dark:text-indigo-400', stroke: '#4f46e5', path: 'M10 70 Q 80 30 150 60 T 290 30' },
        { title: 'Med Verification Latency', value: '12.5s Speed', desc: 'Ultra-fast WHO safety checklist', change: '-12.8% delay', up: true, color: 'text-emerald-600 dark:text-emerald-400', stroke: '#10b981', path: 'M10 40 Q 80 60 150 20 T 290 10' },
        { title: 'Critical Clinical Alarms', value: '2 Triggered', desc: 'All verified by attending MO', change: 'Addressed', up: false, color: 'text-amber-600 dark:text-amber-400', stroke: '#f59e0b', path: 'M10 20 Q 80 80 150 40 T 290 70' }
      ],
      'default': [
        { title: 'New conversations', value: '327', desc: 'Active clinical discussions', change: '10.6%', up: true, color: 'text-indigo-650 dark:text-indigo-400', stroke: '#3b82f6', path: 'M10 80 Q 80 20 150 70 T 290 30' },
        { title: 'Average reply time', value: '7m 4s', desc: 'Support response speed', change: '1.58%', up: false, color: 'text-amber-600 dark:text-amber-405', stroke: '#f59e0b', path: 'M10 50 Q 80 80 150 40 T 290 60' },
        { title: 'Average first reply time', value: '4m 8s', desc: 'Initial triage contact', change: '11.00%', up: true, color: 'text-emerald-650 dark:text-emerald-400', stroke: '#10b981', path: 'M10 70 Q 80 30 150 60 T 290 35' }
      ]
    };
    
    const activeMetrics = metricsData[role] || metricsData['default'];

    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeMetrics.map((m, idx) => (
            <div key={idx} className="bg-white dark:bg-[#0c1220] p-6 rounded-[28px] border border-slate-200/50 dark:border-slate-850/40 shadow-sm flex items-center justify-between group hover:shadow-md transition text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider block">{m.title}</span>
                <div className="flex items-baseline gap-2.5">
                  <h4 className="text-2xl font-black text-slate-850 dark:text-white tracking-tight">{m.value}</h4>
                  <span className={`text-[10px] font-black flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                    m.up 
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {m.up ? '↑' : '↓'} {m.change}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 leading-none">{m.desc}</p>
              </div>
              <div className="w-20 h-10 shrink-0">
                <svg className="w-full h-full" viewBox="0 0 300 100">
                  <path d={m.path} fill="none" stroke={m.stroke} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 bg-white dark:bg-[#0c1220] p-6 rounded-[32px] border border-slate-200/50 dark:border-slate-850/40 shadow-sm flex flex-col justify-between text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850/30">
              <div>
                <h4 className="text-sm font-black text-slate-850 dark:text-white">Workload over time</h4>
                <p className="text-[10px] text-slate-450 dark:text-slate-500">Live operational data updated in real-time.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-wider">
                  Default View
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-750 dark:text-indigo-400 border border-indigo-200/20 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer">
                  + Add Filter
                </span>
              </div>
            </div>
            
            <div className="py-6 shrink-0">
              <svg className="w-full h-48" viewBox="0 0 500 200">
                <line x1="30" y1="30" x2="480" y2="30" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-850/30" />
                <line x1="30" y1="75" x2="480" y2="75" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-850/30" />
                <line x1="30" y1="120" x2="480" y2="120" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-850/30" />
                <line x1="30" y1="165" x2="480" y2="165" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-850/30" />
                
                <text x="15" y="35" className="text-[8px] font-black fill-slate-350 dark:fill-slate-650">50</text>
                <text x="15" y="80" className="text-[8px] font-black fill-slate-350 dark:fill-slate-650">30</text>
                <text x="15" y="125" className="text-[8px] font-black fill-slate-350 dark:fill-slate-650">20</text>
                <text x="15" y="170" className="text-[8px] font-black fill-slate-350 dark:fill-slate-650">0</text>
                
                <path 
                  d="M 50 120 C 100 130, 120 70, 160 85 C 200 100, 240 50, 280 60 C 320 70, 360 110, 400 90 C 440 70, 460 30, 480 40" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                
                <path 
                  d="M 50 90 C 100 95, 120 110, 160 90 C 200 70, 240 90, 280 80 C 320 80, 360 85, 400 110 C 440 105, 460 70, 480 80" 
                  fill="none" 
                  stroke="#93c5fd" 
                  strokeWidth="2.5" 
                  strokeDasharray="2"
                  strokeLinecap="round"
                  className="dark:stroke-blue-400/40"
                />

                <circle cx="480" cy="40" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="280" cy="60" r="3.5" fill="#3b82f6" />
                <circle cx="160" cy="85" r="3.5" fill="#3b82f6" />
                
                <text x="45" y="195" className="text-[8px] font-black fill-slate-400 dark:fill-slate-500">Mon</text>
                <text x="110" y="195" className="text-[8px] font-black fill-slate-400 dark:fill-slate-500">Tue</text>
                <text x="175" y="195" className="text-[8px] font-black fill-slate-400 dark:fill-slate-500">Wed</text>
                <text x="240" y="195" className="text-[8px] font-black fill-slate-400 dark:fill-slate-500">Thu</text>
                <text x="305" y="195" className="text-[8px] font-black fill-slate-400 dark:fill-slate-500">Fri</text>
                <text x="370" y="195" className="text-[8px] font-black fill-slate-400 dark:fill-slate-500">Sat</text>
                <text x="435" y="195" className="text-[8px] font-black fill-slate-400 dark:fill-slate-500">Sun</text>
              </svg>
            </div>
            
            <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-850/30 text-[9px] font-black uppercase text-slate-400 tracking-wider">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> New conversations</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-350 rounded-full dark:bg-blue-400/40"></span> Active admins</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white dark:bg-[#0c1220] p-6 rounded-[32px] border border-slate-200/50 dark:border-slate-850/40 shadow-sm flex flex-col justify-between text-left">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-850/30">
              <h4 className="text-sm font-black text-slate-850 dark:text-white">Efficiency</h4>
              <p className="text-[10px] text-slate-450 dark:text-slate-500">Average response times across support channels.</p>
            </div>
            
            <div className="flex justify-center py-6">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" className="dark:stroke-slate-800" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="62.8" 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute text-center animate-pulse">
                  <h4 className="text-xl font-black text-slate-850 dark:text-white tracking-tight">7m 4s</h4>
                  <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block mt-0.5">Reply time (Avg)</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Less than 15m</span>
                <span className="font-black text-slate-800 dark:text-white">41%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-400 rounded-full"></span> 15 - 45m</span>
                <span className="font-black text-slate-800 dark:text-white">33%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-300 rounded-full"></span> 45m - 1h</span>
                <span className="font-black text-slate-800 dark:text-white">11%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 bg-white dark:bg-[#0c1220] p-6 rounded-[32px] border border-slate-200/50 dark:border-slate-850/40 shadow-sm text-left">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-slate-850 dark:text-white">Busiest time</h4>
              <p className="text-[10px] text-slate-450 dark:text-slate-500">Live operational density tracking patient admissions and events.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold text-slate-400">0</span>
              <div className="w-20 h-2 bg-gradient-to-r from-blue-100 to-blue-600 rounded-full"></div>
              <span className="text-[8px] font-bold text-slate-400">10</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="min-w-[640px] space-y-2.5">
              {activeValues.map((row, rIdx) => (
                <div key={rIdx} className="flex items-center gap-3">
                  <span className="w-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.day}</span>
                  <div className="flex-1 grid grid-cols-12 gap-2">
                    {row.vals.map((v, cIdx) => {
                      let cellClass = 'bg-slate-50 dark:bg-slate-900/50 text-slate-350';
                      if (v > 7) {
                        cellClass = 'bg-blue-600 text-white shadow-sm font-black scale-[1.03]';
                      } else if (v > 4) {
                        cellClass = 'bg-blue-400 text-white font-extrabold';
                      } else if (v > 1) {
                        cellClass = 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-350';
                      } else if (v > 0) {
                        cellClass = 'bg-blue-50/50 text-blue-400 dark:bg-blue-950/10 dark:text-blue-400/70';
                      }
                      
                      return (
                        <div 
                          key={cIdx} 
                          className={`h-9 rounded-xl flex items-center justify-center text-[10px] transition-all cursor-pointer hover:ring-2 hover:ring-blue-400/50 ${cellClass}`}
                          title={`Workload score: ${v}`}
                        >
                          {v}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <span className="w-10"></span>
                <div className="flex-1 grid grid-cols-12 gap-2 text-center text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <span>8 AM</span>
                  <span>9 AM</span>
                  <span>10 AM</span>
                  <span>11 AM</span>
                  <span>12 PM</span>
                  <span>1 PM</span>
                  <span>2 PM</span>
                  <span>3 PM</span>
                  <span>4 PM</span>
                  <span>5 PM</span>
                  <span>6 PM</span>
                  <span>7 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Neonate Admission Form Hook
  const { data: neonateData, setData: setNeonateData, post: postNeonate, processing: neonateProcessing, errors: neonateErrors, reset: resetNeonate } = useForm({
    hospitalNumber: '',
    name: '',
    dob: '',
    gender: 'Male',
    birthWeight: '',
    currentWeight: '',
    gestationalAge: '',
    admissionDiagnosis: '',
    history: '',
    motherPhone: '',
  });

  // Handovers Form Hook
  const { data: handoverData, setData: setHandoverData, post: postHandover, processing: handoverProcessing, errors: handoverErrors, reset: resetHandover } = useForm({
    neonateId: '',
    shift: 'Morning',
    temperature: '',
    sugarLevel: '',
    oxygenSaturation: '',
    heartRate: '',
    respiratoryRate: '',
    commentary: '',
    liver: '',
    kidney: '',
    fbc: '',
    plan: '',
    clinicalLeadId: '',
  });

  // Duty Rota Form Hook
  const { data: rotaData, setData: setRotaData, post: postRota, processing: rotaProcessing, errors: rotaErrors, reset: resetRota } = useForm({
    date: new Date().toISOString().split('T')[0],
    shift: 'Morning',
    consultantId: '',
    managerId: '',
    assignedNurses: [],
  });

  // Pipeline/Calculator State
  const [calcStep, setCalcStep] = useState(1);
  const [selectedNeonate, setSelectedNeonate] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [calcData, setCalcData] = useState({
    doseMgKg: '',
    stockMg: '',
    stockMl: ''
  });
  const [calcResult, setCalcResult] = useState(null);
  const [logStatus, setLogStatus] = useState(false);

  const drugs = [
    { name: 'Ampicillin', defaultDose: 50, unit: 'mg/kg', frequency: 'q12h' },
    { name: 'Gentamicin', defaultDose: 5, unit: 'mg/kg', frequency: 'q24h' },
    { name: 'Cefotaxime', defaultDose: 50, unit: 'mg/kg', frequency: 'q8h' },
    { name: 'Dopamine', defaultDose: 5, unit: 'mcg/kg/min', frequency: 'continuous' }
  ];

  // Auto-calculation loop
  useEffect(() => {
    if (calcData.doseMgKg && currentWeight && calcData.stockMg && calcData.stockMl) {
      const mgNeeded = parseFloat(calcData.doseMgKg) * parseFloat(currentWeight);
      const mlToDraw = (mgNeeded / parseFloat(calcData.stockMg)) * parseFloat(calcData.stockMl);
      setCalcResult({ mg: mgNeeded.toFixed(2), ml: mlToDraw.toFixed(2) });
    } else {
      setCalcResult(null);
    }
  }, [calcData, currentWeight]);

  const handleSaveNeonate = (e) => {
    e.preventDefault();
    postNeonate('/neonates', {
      onSuccess: () => {
        setIsModalOpen(false);
        resetNeonate();
      }
    });
  };

  const handleSaveHandover = (e) => {
    e.preventDefault();
    postHandover('/handovers', {
      onSuccess: () => {
        setIsHandoverModalOpen(false);
        resetHandover();
      }
    });
  };

  const handleSaveRota = (e) => {
    e.preventDefault();
    postRota('/rotas', {
      onSuccess: () => {
        setIsRotaModalOpen(false);
        resetRota();
      }
    });
  };

  const handleLogMedication = () => {
    router.post('/audit-logs', {
      action: `MEDICATION CALCULATED: ${selectedDrug.name} ${calcResult.mg}mg (${calcResult.ml}mL) for ${selectedNeonate.name}`,
      type: 'Medication',
      status: 'Calculated'
    }, {
      onSuccess: () => {
        setLogStatus(true);
        setTimeout(() => {
          setCalcStep(1);
          setSelectedNeonate(null);
          setSelectedDrug(null);
          setCalcData({ doseMgKg: '', stockMg: '', stockMl: '' });
          setLogStatus(false);
          setActiveTab('audit');
        }, 1500);
      }
    });
  };

  const filteredNeonates = neonates.filter(n => 
    n.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.hospitalNumber.includes(searchTerm)
  );

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <Head title="Clinical Dashboard" />
      
      <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* TAB 0: OVERVIEW (SYSTEM DASHBOARD) */}
            {activeTab === 'overview' && (
              <div className="space-y-8 text-left">
                <div>
                  <h3 className="text-xl font-black text-slate-850 dark:text-white tracking-tight">Ward Command Center Overview</h3>
                  <p className="text-xs text-gray-500">Live clinical ward census, nurse allocations, and patient workload analytics.</p>
                </div>
                {renderRoleSpecificDashboard()}
              </div>
            )}
            
            {/* TAB 1: REGISTRY (PATIENTS) */}
            {activeTab === 'registry' && (
              <div className="space-y-8 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-850 dark:text-white tracking-tight">Ward Registry</h3>
                    <p className="text-xs text-gray-500">Manage neonatal admissions and clinical records.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setRegistrySubTab('active-patients')}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        registrySubTab === 'active-patients'
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      Active Patients
                    </button>
                    <button
                      onClick={() => setRegistrySubTab('handovers')}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        registrySubTab === 'handovers'
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      Shift Handovers
                    </button>
                  </div>
                </div>

                {registrySubTab === 'active-patients' && (
                  <div className="space-y-6">
                    {/* Search Registry */}
              <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-sm">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name or Hospital ID..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 px-5 py-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30">
                  <Activity className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">{filteredNeonates.length} Patients Active</span>
                </div>
              </div>

              {/* Patient Cards Grid */}
              {filteredNeonates.length === 0 ? (
                <div className="py-24 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-4">
                  <Baby className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">No neonates found</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">Try search modifiers or admit a new patient baby to NBU registry.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNeonates.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        setSelectedNeonate(n);
                        setCurrentWeight(n.currentWeight);
                        setActiveTab('calculator');
                        setCalcStep(2);
                      }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-[28px] border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-xl transition-all cursor-pointer group space-y-4 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                            <Baby className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{n.name}</h4>
                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{n.hospitalNumber}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-100/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-wider">
                          Stable
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100/50 dark:border-gray-700/20 flex items-center gap-2">
                          <Scale className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-bold text-gray-700 dark:text-gray-300">{n.currentWeight} kg</span>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100/50 dark:border-gray-700/20 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-bold text-gray-700 dark:text-gray-300">{n.gestationalAge} wks</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100/50 dark:border-gray-700/20">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Admission Diagnosis</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block truncate">{n.admissionDiagnosis || 'Clinical Checkup'}</span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-3 border-t border-gray-100 dark:border-gray-700/50">
                        <span className="text-gray-400">Adm: {new Date(n.createdAt).toLocaleDateString()}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Calculate Dose <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
                  </div>
                )}
              </div>
            )}

          {/* TAB 2: CALCULATOR PIPELINE */}
          {activeTab === 'calculator' && calcSubTab === 'calculator-workbench' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Steps Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Medication Safety Pipeline</h3>
                  <p className="text-xs text-gray-500">Standard 5-step clinical drug verification protocol.</p>
                </div>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border transition-all ${
                        calcStep >= step
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400'
                      }`}>
                        {calcStep > step ? <Check className="w-4 h-4" /> : step}
                      </div>
                      {step < 5 && <div className="w-4 h-0.5 bg-gray-200 dark:bg-gray-700" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator workspace */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-[36px] border border-gray-100 dark:border-gray-700/60 shadow-lg min-h-[460px] flex flex-col justify-between">
                
                {/* Step 1: Patient Identity Selection */}
                {calcStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-indigo-500" />
                        Step 1: Patient Identity
                      </h4>
                      <p className="text-xs text-gray-500">Select the baby patient from the active ward registry.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                      {neonates.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => {
                            setSelectedNeonate(n);
                            setCurrentWeight(n.currentWeight);
                            setCalcStep(2);
                          }}
                          className="p-5 rounded-2xl border bg-gray-50 dark:bg-gray-900 hover:border-indigo-500/50 border-gray-100 dark:border-gray-800/80 transition-all text-left flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <Baby className="w-5 h-5 text-indigo-500" />
                            <div>
                              <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{n.name}</p>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{n.hospitalNumber}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Weight Verification */}
                {calcStep === 2 && (
                  <div className="max-w-md mx-auto py-6 space-y-6 text-center animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white">Step 2: Verify Patient Weight</h4>
                      <p className="text-xs text-gray-500">Volumetric calculations require precise active weight.</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center space-y-4">
                      <Scale className="w-10 h-10 text-indigo-500 mx-auto" />
                      <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Clinician Verified Weight (kg)</label>
                        <input
                          type="number"
                          step="0.001"
                          className="w-full text-center bg-transparent text-4xl font-black text-gray-900 dark:text-white outline-none border-b border-indigo-500/20 pb-2 max-w-[200px]"
                          value={currentWeight}
                          onChange={(e) => setCurrentWeight(e.target.value)}
                        />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-lg text-[10px] text-amber-700 dark:text-amber-400 font-bold mx-auto">
                        <Info className="w-3.5 h-3.5" /> Admitted record: {selectedNeonate?.currentWeight} kg
                      </span>
                    </div>

                    <button
                      onClick={() => setCalcStep(3)}
                      disabled={!currentWeight}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      Confirm Active Weight
                    </button>
                  </div>
                )}

                {/* Step 3: Choose Drug */}
                {calcStep === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white">Step 3: Select Medication</h4>
                      <p className="text-xs text-gray-500">Select the prescribed neonate formulary drug.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {drugs.map((d) => (
                        <button
                          key={d.name}
                          onClick={() => {
                            setSelectedDrug(d);
                            setCalcData({ ...calcData, doseMgKg: d.defaultDose });
                            setCalcStep(4);
                          }}
                          className="p-5 rounded-2xl border bg-gray-50 dark:bg-gray-900 hover:border-indigo-500/50 border-gray-100 dark:border-gray-800/80 transition-all text-left flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-indigo-500 shadow-sm">
                              <Pill className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{d.name}</p>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{d.frequency} • {d.defaultDose} {d.unit}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Dose Calculation Form */}
                {calcStep === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white">Step 4: Dose Calculations</h4>
                      <p className="text-xs text-gray-500">Provide prescribed doses and pharmacy stock concentrations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Prescribed Dosage ({selectedDrug?.unit})</label>
                          <input
                            type="number"
                            className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                            value={calcData.doseMgKg}
                            onChange={(e) => setCalcData({ ...calcData, doseMgKg: e.target.value })}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Stock Concentrations</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder="Stock mg"
                              className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                              value={calcData.stockMg}
                              onChange={(e) => setCalcData({ ...calcData, stockMg: e.target.value })}
                            />
                            <span className="text-xs text-gray-400 font-bold">in</span>
                            <input
                              type="number"
                              placeholder="Stock mL"
                              className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                              value={calcData.stockMl}
                              onChange={(e) => setCalcData({ ...calcData, stockMl: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-3xl text-center space-y-2 relative overflow-hidden">
                        <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.15em] block">Required Drawing Volume</span>
                        <div className="text-4xl font-black text-gray-950 dark:text-white tracking-tighter">
                          {calcResult?.ml || '0.00'} <span className="text-lg font-bold text-gray-400 dark:text-gray-500">mL</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">({calcResult?.mg || '0.00'} mg total required dose)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCalcStep(5)}
                      disabled={!calcResult}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      Proceed to Verification
                    </button>
                  </div>
                )}

                {/* Step 5: Verification & Save */}
                {calcStep === 5 && (
                  <div className="max-w-md mx-auto py-4 space-y-6 text-center animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Clinical Safety Verification</h4>
                      <p className="text-xs text-gray-500">Validate all parameters before committing to clinical charts.</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 text-left text-xs space-y-3.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Patient Identity</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{selectedNeonate?.name} ({selectedNeonate?.hospitalNumber})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Formulary Drug</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{selectedDrug?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Total Dose (mg)</span>
                        <span className="font-black text-indigo-600 dark:text-indigo-400">{calcResult?.mg} mg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Drawing Volume (mL)</span>
                        <span className="font-black text-indigo-600 dark:text-indigo-400">{calcResult?.ml} mL</span>
                      </div>
                      <div className="flex justify-between items-center pt-2.5 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 uppercase font-black">Certified Auditor</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{auth.user.name} ({auth.user.role})</span>
                      </div>
                    </div>

                    {logStatus ? (
                      <div className="py-4 bg-emerald-500 text-white rounded-2xl text-center text-xs font-black uppercase tracking-wider animate-in zoom-in-95 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 animate-bounce" /> Calculations Audited & Logged
                      </div>
                    ) : (
                      <button
                        onClick={handleLogMedication}
                        className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <ClipboardCheck className="w-4 h-4" /> Sign & Log Calculation
                      </button>
                    )}
                  </div>
                )}

                {/* Back / Navigation Controls */}
                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-800 mt-6 text-xs font-black uppercase tracking-widest text-gray-400">
                  <button
                    disabled={calcStep === 1}
                    onClick={() => setCalcStep((prev) => Math.max(prev - 1, 1))}
                    className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-0"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Safety Shield Active</span>
                    {calcStep > 1 && (
                      <button 
                        onClick={() => {
                          setCalcStep(1);
                          setSelectedNeonate(null);
                          setSelectedDrug(null);
                          setCalcData({ doseMgKg: '', stockMg: '', stockMl: '' });
                        }} 
                        className="p-1.5 ml-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-300 hover:text-red-500 rounded-lg transition-colors border border-gray-100 dark:border-gray-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* SUBTAB 2.2: DRUG FORMULARY QUICK-REFERENCE INDEX */}
          {activeTab === 'calculator' && calcSubTab === 'overview' && (
            <div className="space-y-6 text-left max-w-5xl mx-auto">
              <div>
                <h3 className="text-xl font-black text-slate-850 dark:text-white tracking-tight">NBU Neonatal Drug Formulary</h3>
                <p className="text-xs text-gray-500">Official medication protocols, dilution procedures, safety parameters, and warnings.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Ampicillin', dose: '50 mg/kg', freq: 'q12h (neonates < 7 days), q8h (neonates > 7 days)', route: 'IV / IM slow push', dilution: 'Reconstitute 250mg/500mg vial with sterile water to 100mg/mL concentration.', warning: 'Rapid injection may cause seizures. Administer slowly over 3-5 minutes.' },
                  { name: 'Gentamicin', dose: '5 mg/kg', freq: 'q24h (preterm < 32 wks q36h)', route: 'IV infusion over 30 mins', dilution: 'Dilute required dose in Normal Saline or D5W to max concentration of 2mg/mL.', warning: 'Nephrotoxic and ototoxic. Requires peak and trough blood level monitoring on Day 3.' },
                  { name: 'Cefotaxime', dose: '50 mg/kg', freq: 'q12h (birth < 7 days), q8h (birth > 7 days)', route: 'IV slow push or infusion', dilution: 'Reconstitute 500mg vial with sterile water to 100mg/mL concentration.', warning: 'Ensure proper renal adjustment if neonate has oliguria. Protect from light.' },
                  { name: 'Dopamine', dose: '5 - 20 mcg/kg/min', freq: 'Continuous IV Infusion', route: 'Central Venous Line / Large Vein', dilution: 'Dilute in D5W or NS. Must be administered via syringe pump to ensure constant rate.', warning: 'Extravasation causes tissue necrosis. Monitor infusion site hourly for blanching/swelling.' },
                  { name: 'Phenobarbitone', dose: '20 mg/kg loading, then 2.5-5 mg/kg maintenance', freq: 'q12h - q24h', route: 'Slow IV push', dilution: 'Administer loading dose over 20 minutes. Dilute with sterile water.', warning: 'Can cause respiratory depression and hypotension. Have bag-valve-mask ventilating set ready.' },
                  { name: 'Aminophylline', dose: '5 mg/kg loading, then 1.5-3 mg/kg maintenance', freq: 'q12h', route: 'Slow IV infusion over 30 mins', dilution: 'Dilute in D5W or Normal Saline. Never give as direct IV push.', warning: 'Narrow therapeutic window. Monitor heart rate continuously. Hold dose if HR > 180 bpm.' },
                ].map((d, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-[28px] border border-gray-150 dark:border-gray-700/60 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                        <h4 className="font-black text-sm text-indigo-650 dark:text-indigo-400 uppercase tracking-wider">{d.name}</h4>
                        <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-455 rounded-md text-[9px] font-black uppercase tracking-wider">{d.route}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Standard Dosage</span>
                          <span className="text-slate-850 dark:text-white font-extrabold">{d.dose}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Frequency Interval</span>
                          <span className="text-slate-850 dark:text-white font-extrabold">{d.freq}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100/50 dark:border-gray-800/40 space-y-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Reconstitution & Dilution</span>
                        <p className="text-xs text-gray-655 dark:text-gray-450 leading-relaxed">{d.dilution}</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-rose-50/50 dark:bg-rose-950/10 rounded-2xl border border-rose-100/60 dark:border-rose-900/20 flex gap-2.5 items-start">
                      <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="text-[8px] font-black text-rose-700 dark:text-rose-455 uppercase tracking-wider block">Clinical Safety Alert</span>
                        <p className="text-[10px] text-rose-600/90 dark:text-rose-400/90 leading-normal font-bold mt-0.5">{d.warning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Clinical Audit Logs</h3>
                <p className="text-xs text-gray-500">Historical records of drug calculations and clinical parameters checkups.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900 text-[10px] text-gray-400 font-black uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                        <th className="p-5">Timestamp</th>
                        <th className="p-5">Clinician</th>
                        <th className="p-5">Verified Action</th>
                        <th className="p-5">Type</th>
                        <th className="p-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-10 text-center text-gray-400">
                            No logs found. Perform a medication safety calculation to generate logs.
                          </td>
                        </tr>
                      ) : (
                        auditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                            <td className="p-5 text-[10px] font-bold text-gray-400">{new Date(log.created_at).toLocaleString()}</td>
                            <td className="p-5 text-gray-900 dark:text-white font-bold">
                              <div className="flex items-center gap-1">
                                {log.user_name}
                                {log.is_verified && <BadgeCheck className="w-3 h-3 text-blue-500" />}
                              </div>
                            </td>

                            <td className="p-5 max-w-sm truncate font-medium">{log.action}</td>
                            <td className="p-5">
                              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                                {log.type}
                              </span>
                            </td>
                            <td className="p-5">
                              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Calculated
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SHIFT HANDOVERS */}
          {activeTab === 'handovers' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Shift Handover Reports</h3>
                  <p className="text-xs text-gray-500">Record and review comprehensive newborn transition reports to ensure zero clinical gaps.</p>
                </div>
                <button
                  onClick={() => setIsHandoverModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Record Handover
                </button>
              </div>

              {/* Active Shift status bar */}
              {(() => {
                const todayStr = new Date().toISOString().split('T')[0];
                const activeShift = rotas.find(r => r.date === todayStr);
                return (
                  <div className="p-5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-gray-900 dark:to-gray-800/80 rounded-2xl border border-indigo-100/50 dark:border-gray-700/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shadow-sm">
                        <Clock className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Active Ward Roster</span>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white">
                          {activeShift ? `Today's ${activeShift.shift} Shift Schedule` : "No active shift roster for today"}
                        </h4>
                      </div>
                    </div>
                    {activeShift ? (
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          🩺 Consultant: <strong className="text-gray-900 dark:text-white">{activeShift.consultant_name || 'N/A'}</strong>
                        </span>
                        <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          👑 In-Charge: <strong className="text-gray-900 dark:text-white">{activeShift.manager_name || 'N/A'}</strong>
                        </span>
                        <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          👩‍⚕️ Nurses on Shift: <strong className="text-gray-900 dark:text-white">{activeShift.nurses && activeShift.nurses.length > 0 ? activeShift.nurses.map(n => n.name).join(', ') : 'None assigned'}</strong>
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-450 dark:text-gray-400 font-bold italic">Roster manager is currently off. Contact Chief Nurse In-Charge for assignments.</p>
                    )}
                  </div>
                );
              })()}

              {/* Handovers Timeline Cards */}
              <div className="grid grid-cols-1 gap-6">
                {handovers.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm text-center text-gray-400">
                    <ArrowRightLeft className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-bold">No shift handovers logged yet.</p>
                    <p className="text-xs text-gray-455">Create a comprehensive handover report above to secure newborn shift clinical safety.</p>
                  </div>
                ) : (
                  handovers.map((h) => {
                    // Check warnings for vitals
                    const isTempWarn = h.temperature < 36.5 || h.temperature > 37.5;
                    const isSugarWarn = h.sugar_level < 2.6 || h.sugar_level > 7.0;
                    const isSpo2Warn = h.oxygen_saturation < 95;
                    const isHrWarn = h.heart_rate < 120 || h.heart_rate > 160;
                    const isRrWarn = h.respiratory_rate < 30 || h.respiratory_rate > 60;

                    return (
                      <div key={h.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
                        {/* Patient info sidebar */}
                        <div className="p-6 md:w-64 bg-gray-50/50 dark:bg-gray-900/40 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between gap-4">
                          <div>
                            <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-[9px] font-black uppercase tracking-wider block w-fit mb-2">
                              {h.shift} Shift Handover
                            </span>
                            <h4 className="text-base font-black text-gray-900 dark:text-white leading-tight">{h.neonate_name}</h4>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-1">{h.neonate_hospital_number}</span>
                          </div>
                          
                          <div className="space-y-2 text-[10px] text-gray-500 font-semibold">
                            <div>
                              <span className="block text-[8px] font-black uppercase text-gray-400 tracking-widest">Nurse on Duty</span>
                              <div className="flex items-center gap-1">
                                <span className="text-gray-800 dark:text-gray-200 font-bold">{h.nurse_name || 'N/A'}</span>
                                {h.nurse_verified && <BadgeCheck className="w-3 h-3 text-blue-500" />}
                              </div>
                            </div>
                            <div>
                              <span className="block text-[8px] font-black uppercase text-gray-400 tracking-widest">Clinical Lead</span>
                              <div className="flex items-center gap-1">
                                <span className="text-gray-800 dark:text-gray-200 font-bold">{h.lead_name || 'N/A'}</span>
                                {h.lead_verified && <BadgeCheck className="w-3 h-3 text-blue-500" />}
                              </div>
                            </div>
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[9px]">
                              🗓️ {new Date(h.date).toLocaleDateString()} at {new Date(h.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>

                        {/* Vitals & details area */}
                        <div className="p-6 flex-1 space-y-5">
                          {/* 5-Vital safety indicators grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isTempWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Thermometer className={`w-4 h-4 mx-auto ${isTempWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">Temp</span>
                              <span className={`text-xs font-black block ${isTempWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.temperature ? `${h.temperature}°C` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isSugarWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Droplets className={`w-4 h-4 mx-auto ${isSugarWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">Sugar</span>
                              <span className={`text-xs font-black block ${isSugarWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.sugar_level ? `${h.sugar_level} mM` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isSpo2Warn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Activity className={`w-4 h-4 mx-auto ${isSpo2Warn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">SPO₂</span>
                              <span className={`text-xs font-black block ${isSpo2Warn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.oxygen_saturation ? `${h.oxygen_saturation}%` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isHrWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Heart className={`w-4 h-4 mx-auto ${isHrWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">HR (Pulse)</span>
                              <span className={`text-xs font-black block ${isHrWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.heart_rate ? `${h.heart_rate} bpm` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isRrWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Activity className={`w-4 h-4 mx-auto ${isRrWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">Resp Rate</span>
                              <span className={`text-xs font-black block ${isRrWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.respiratory_rate ? `${h.respiratory_rate} cpm` : 'N/A'}
                              </span>
                            </div>
                          </div>

                          {/* Commentary Text block */}
                          <div className="space-y-1">
                            <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest block">Clinical Commentary</span>
                            <p className="text-xs text-gray-705 dark:text-gray-300 leading-relaxed font-semibold italic bg-gray-50 dark:bg-gray-900/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800/60">
                              "{h.commentary}"
                            </p>
                          </div>

                          {/* Plan Text block */}
                          <div className="space-y-1">
                            <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest block">Clinical Intervention Plan</span>
                            <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-bold bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-xl border border-indigo-100/40 dark:border-indigo-900/20">
                              🎯 {h.plan}
                            </p>
                          </div>

                          {/* Lab Investigations panel */}
                          {h.investigations && (Object.values(h.investigations).some(v => v)) && (
                            <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80">
                              <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest block mb-2">Registered Lab Investigations</span>
                              <div className="flex flex-wrap gap-2.5">
                                {h.investigations.fbc && (
                                  <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 text-amber-800 dark:text-amber-400 text-[10px] font-bold rounded-lg">
                                    🩸 FBC: {h.investigations.fbc}
                                  </span>
                                )}
                                {h.investigations.kidney && (
                                  <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/20 border border-teal-100/50 dark:border-teal-900/30 text-teal-800 dark:text-teal-400 text-[10px] font-bold rounded-lg">
                                    💧 Kidneys: {h.investigations.kidney}
                                  </span>
                                )}
                                {h.investigations.liver && (
                                  <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/20 border border-purple-100/50 dark:border-purple-900/30 text-purple-800 dark:text-purple-400 text-[10px] font-bold rounded-lg">
                                    🧪 Liver: {h.investigations.liver}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DUTY ROTA */}
          {activeTab === 'rota' && rotaSubTab === 'rota-schedule' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Clinician Duty Rota</h3>
                  <p className="text-xs text-gray-500">Manage ward schedules, consultant coverage, shift managers, and active duty nurses.</p>
                </div>
                <button
                  onClick={() => setIsRotaModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Schedule Rota
                </button>
              </div>

              {/* Rota schedules grid */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900 text-[10px] text-gray-400 font-black uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                        <th className="p-5">Shift Date</th>
                        <th className="p-5">Shift Type</th>
                        <th className="p-5">Consultant Pediatrician</th>
                        <th className="p-5">Shift In-Charge</th>
                        <th className="p-5">Nurses on Duty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {rotas.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-10 text-center text-gray-400">
                            No shift schedules defined yet. Add the first duty rota above.
                          </td>
                        </tr>
                      ) : (
                        rotas.map((rota) => (
                          <tr key={rota.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                            <td className="p-5 text-gray-900 dark:text-white font-bold">
                              {new Date(rota.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </td>
                            <td className="p-5">
                              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                                {rota.shift} Shift
                              </span>
                            </td>
                            <td className="p-5 font-bold text-gray-850 dark:text-gray-100">
                              👨‍⚕️ {rota.consultant_name || 'None Assigned'}
                            </td>
                            <td className="p-5 font-bold text-gray-850 dark:text-gray-100">
                              Sister {rota.manager_name || 'None Assigned'}
                            </td>
                            <td className="p-5">
                              <div className="flex flex-wrap gap-1.5">
                                {rota.nurses && rota.nurses.length > 0 ? (
                                  rota.nurses.map(n => (
                                    <span key={n.id} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-[9px] font-black uppercase rounded-lg">
                                      {n.name}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-gray-450 italic">None assigned</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 4.2: ROSTER ANALYTICS & COVERAGE STATUS */}
          {activeTab === 'rota' && rotaSubTab === 'overview' && (
            <div className="space-y-6 text-left max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-850 dark:text-white tracking-tight">Clinician Shift & Coverage Analytics</h3>
                  <p className="text-xs text-gray-500">Real-time clinical ward census coverage, duty rosters, and nurse staffing charts.</p>
                </div>
                <button
                  onClick={() => setRotaSubTab('rota-schedule')}
                  className="flex items-center gap-2 bg-indigo-655 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm shadow-indigo-600/10"
                >
                  <Calendar className="w-4 h-4" /> View Full Schedule
                </button>
              </div>

              {/* Roster Coverage HUD Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[28px] border border-gray-150 dark:border-gray-700/60 shadow-sm space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono">Shift Coverage Index</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/10">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-emerald-600">96.4%</span>
                      <span className="text-[10px] block font-semibold text-gray-400">Target Coverage Met</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-[28px] border border-gray-150 dark:border-gray-700/60 shadow-sm space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono">Clinician Nurse Ratio</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/10">
                      <Baby className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-slate-805 dark:text-white">1:4</span>
                      <span className="text-[10px] block font-semibold text-gray-400">Optimal Safe Ratio</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0c1220] p-6 rounded-[28px] border border-slate-200 dark:border-slate-850/40 shadow-sm space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono">Active On Call Today</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/10">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-amber-600">8 Nurses</span>
                      <span className="text-[10px] block font-semibold text-gray-400">Across 3 Rotations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roster Coverage Details */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-white">
                  📅 Scheduled Shift Allocations Today
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Morning Shift */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-white">🌅 Morning Rotation</span>
                      <span className="text-[9px] font-black uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 px-2 py-0.5 rounded-md">08:00 - 14:00</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">Consultant:</strong> Dr. Alvin Mutie</p>
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">In-Charge:</strong> Sister Mercyline</p>
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">Nurses:</strong> 3 Ward Nurses</p>
                    </div>
                  </div>

                  {/* Afternoon Shift */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-white">☀️ Afternoon Rotation</span>
                      <span className="text-[9px] font-black uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 px-2 py-0.5 rounded-md">14:00 - 20:00</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">Consultant:</strong> Dr. Christine Ouma</p>
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">In-Charge:</strong> Sister Evelyn</p>
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">Nurses:</strong> 2 Ward Nurses</p>
                    </div>
                  </div>

                  {/* Night Shift */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-white">🌙 Night Rotation</span>
                      <span className="text-[9px] font-black uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 px-2 py-0.5 rounded-md">20:00 - 08:00</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">Consultant:</strong> Dr. Patrick Wamalwa</p>
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">In-Charge:</strong> Sister Mercyline</p>
                      <p className="font-bold text-gray-600 dark:text-gray-400"><strong className="text-slate-850 dark:text-white">Nurses:</strong> 3 Ward Nurses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TRAINING FLASHCARDS */}
          {activeTab === 'academics' && academySubTab === 'flashcards' && (
            <div className="space-y-6 animate-in fade-in duration-300 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Clinical Training Flashcards</h3>
                  <p className="text-xs text-gray-500">Interactive quick-reference manuals for standard, clinical, and emergency neonatal NBU protocols.</p>
                </div>

                {/* Category selectors */}
                <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200/50 dark:border-gray-700/50 max-w-full">
                  {['All', 'Routine', 'Clinical', 'Critical', 'Calculations'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFlashcardCategory(cat);
                        setFlippedCardId(null);
                      }}
                      className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                        flashcardCategory === cat
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-555 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashcards.length === 0 ? (
                  <div className="col-span-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 p-10 text-center text-gray-400">
                    No flashcards loaded in clinical database. Please seed the database first.
                  </div>
                ) : (
                  flashcards
                    .filter(card => flashcardCategory === 'All' || card.category === flashcardCategory)
                    .map(card => {
                      const isFlipped = flippedCardId === card.id;
                      const catColors = {
                        Routine: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
                        Clinical: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
                        Critical: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
                        Calculations: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }[card.category] || 'bg-gray-500/10 text-gray-600 border-gray-500/20';

                      return (
                        <div
                          key={card.id}
                          className={`relative rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 min-h-[300px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 ${
                            isFlipped 
                              ? 'bg-gradient-to-br from-slate-900 to-indigo-950/20 text-white border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                          }`}
                        >
                          {/* Header info */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                              <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${catColors}`}>
                                {card.category}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono font-bold">ID: #{card.id}</span>
                            </div>

                            {!isFlipped ? (
                              /* Front side */
                              <div className="space-y-4">
                                <h4 className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white leading-snug">
                                  {card.title}
                                </h4>
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">When To Perform</span>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
                                    {card.when_to_perform}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              /* Back side */
                              <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400">
                                  {card.title} &bull; Action Steps
                                </h4>
                                <div className="space-y-2">
                                  {Array.isArray(card.steps) && card.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-2 items-start text-xs">
                                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] font-black text-indigo-400 font-mono">
                                        {idx + 1}
                                      </span>
                                      <p className="text-gray-300 leading-relaxed font-semibold">{step}</p>
                                    </div>
                                  ))}
                                </div>

                                {card.warning && (
                                  <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-semibold leading-normal">
                                    ⚠️ <span className="font-extrabold uppercase tracking-wide">Warning:</span> {card.warning}
                                  </div>
                                )}

                                {card.tips && (
                                  <div className="mt-2 p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] font-semibold leading-normal">
                                    💡 <span className="font-extrabold uppercase tracking-wide">Pro Tip:</span> {card.tips}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Flip action button */}
                          <div className="mt-6 border-t border-gray-150/40 dark:border-gray-700/40 pt-4 flex justify-end">
                            <button
                              onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                                isFlipped
                                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                                  : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-250 dark:hover:bg-gray-750 text-gray-750 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800'
                              }`}
                            >
                              {isFlipped ? 'Flip Front' : 'Reveal Steps & Warnings'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          )}

          {/* TAB: INTERACTIVE SCENARIOS */}
          {activeTab === 'academics' && academySubTab === 'scenarios' && (
            <div className="space-y-6 animate-in fade-in duration-300 text-left">
              
              {!activeScenario ? (
                /* List of scenarios */
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">Newborn Care Practice Cases</h3>
                    <p className="text-xs text-gray-500">Practice your child treatment skills, calculate safe drug doses in seconds, and follow ward guidelines.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scenarios.length === 0 ? (
                      <div className="col-span-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 p-10 text-center text-gray-400">
                        No training scenarios loaded in database yet.
                      </div>
                    ) : (
                      scenarios.map(sc => (
                        <div key={sc.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center gap-2">
                              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-wider border border-indigo-500/20">
                                Simulation Case File
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono font-bold">Case #{sc.id}</span>
                            </div>

                            <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">
                              {sc.title}
                            </h4>

                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-semibold line-clamp-3">
                              {sc.problem_statement}
                            </p>
                          </div>

                          <div className="mt-6 border-t border-gray-100 dark:border-gray-700/40 pt-4 flex justify-end">
                            <button
                              onClick={() => {
                                setActiveScenario(sc);
                                setScenarioStepsCheck({});
                                setRevealFormula(false);
                                setCheckedAnswers(false);
                              }}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md shadow-indigo-600/10"
                            >
                              Start Case Simulation
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                /* Active Scenario Player Workspace */
                <div className="space-y-6">
                  
                  {/* Workspace Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                    <button
                      onClick={() => setActiveScenario(null)}
                      className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-gray-905 dark:hover:text-white uppercase tracking-wider transition"
                    >
                      &larr; Back to Case Files
                    </button>
                    <span className="px-2.5 py-1 bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 rounded-md text-[9px] font-black uppercase tracking-wider">
                      Simulation Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Problem Case File */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Case File Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                        <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">
                          📋 {activeScenario.title}
                        </h4>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Baby's History & Safe Treatment Guidelines</span>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                            {activeScenario.problem_statement}
                          </p>
                        </div>
                      </div>

                      {/* Diagnostic checklist */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                          🩺 Interactive Treatment Checklist
                        </h4>
                        <p className="text-[11px] text-gray-500 leading-normal">
                          Read the description above and check off your steps to finish treating the baby.
                        </p>

                        <div className="space-y-3 pt-2">
                          {Array.isArray(activeScenario.solution_steps) && activeScenario.solution_steps.map((step, idx) => (
                            <label
                              key={idx}
                              className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                                scenarioStepsCheck[idx]
                                  ? 'bg-indigo-50/50 dark:bg-indigo-950/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-400'
                                  : 'bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-750'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={!!scenarioStepsCheck[idx]}
                                onChange={(e) => {
                                  setScenarioStepsCheck(prev => ({
                                    ...prev,
                                    [idx]: e.target.checked
                                  }));
                                }}
                                className="mt-0.5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                              />
                              <div className="text-xs font-semibold leading-relaxed">
                                {checkedAnswers ? (
                                  <span className="text-slate-800 dark:text-slate-100 block mb-1">
                                    <span className="font-extrabold text-teal-500 uppercase tracking-wide">Official Guideline Step {idx + 1}:</span> {step}
                                  </span>
                                ) : (
                                  <span>Step Option #{idx + 1} &bull; Check off when successfully processed</span>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Calculations & Verification */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* Calculations Help / Formulas */}
                      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm text-slate-100 text-left">
                        <h4 className="text-xs font-black uppercase tracking-wider text-teal-400">
                          🧮 Pediatric Calculator Companion
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          Need mathematical calculations backing this case? Expand below for standard reference equations.
                        </p>

                        <button
                          onClick={() => setRevealFormula(!revealFormula)}
                          className="w-full bg-slate-950 hover:bg-slate-855 text-slate-300 border border-slate-800 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition"
                        >
                          {revealFormula ? 'Hide Reference Guidelines' : 'Reveal Reference Equations'}
                        </button>

                        {revealFormula && (
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/20 text-teal-400 font-mono text-[11px] leading-relaxed animate-in fade-in duration-200">
                            {activeScenario.formulas_used || 'Standard NBU care parameters apply.'}
                          </div>
                        )}

                        {activeScenario.warning && (
                          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-semibold leading-normal">
                            ⚠️ <span className="font-extrabold uppercase tracking-wide">Clinical Risk Warning:</span> {activeScenario.warning}
                          </div>
                        )}
                      </div>

                      {/* Verification Controls */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                          ✅ Safe Action Check
                        </h4>

                        {!checkedAnswers ? (
                          <button
                            onClick={() => setCheckedAnswers(true)}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/10 active:scale-95"
                          >
                            Check My Steps & Solutions
                          </button>
                        ) : (
                          <div className="space-y-4 animate-in fade-in duration-300 text-left">
                            <div className="flex gap-2 items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                              All Checked & Safe!
                            </div>
                            <p className="text-[11px] text-gray-500 leading-normal">
                              Compare your steps with the official WHO steps on the left side of the screen.
                            </p>
                            <button
                              onClick={() => {
                                setCheckedAnswers(false);
                                setScenarioStepsCheck({});
                              }}
                              className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-250 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition"
                            >
                              Restart Simulation Case
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* SUBTAB 5.2: CLINICAL ACADEMY STUDY OVERVIEW */}
          {activeTab === 'academics' && academySubTab === 'overview' && (
            <div className="space-y-6 text-left max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-850 dark:text-white tracking-tight">NBU Clinical Training Academy</h3>
                  <p className="text-xs text-gray-500">Interactive patient simulations, ward resuscitation drills, and baby thermal care protocols.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAcademySubTab('flashcards')}
                    className="flex items-center gap-2 bg-indigo-655 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm shadow-indigo-600/10"
                  >
                    <BookOpen className="w-4 h-4" /> Open Flashcards
                  </button>
                  <button
                    onClick={() => setAcademySubTab('scenarios')}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm shadow-teal-600/10"
                  >
                    <Activity className="w-4 h-4" /> Launch Scenarios
                  </button>
                </div>
              </div>

              {/* Academy HUD indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[28px] border border-gray-150 dark:border-gray-700/60 shadow-sm space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono">Course Completion Status</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/10">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-emerald-600">80%</span>
                      <span className="text-[10px] block font-semibold text-gray-400">4 / 5 Lessons Cleared</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-[28px] border border-gray-150 dark:border-gray-700/60 shadow-sm space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono">Resuscitation Drill Score</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/10">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-slate-805 dark:text-white">100%</span>
                      <span className="text-[10px] block font-semibold text-gray-400">Perfect APGAR Drill</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0c1220] p-6 rounded-[28px] border border-slate-200 dark:border-slate-850/40 shadow-sm space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono">Thermal Care Scenarios</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/10">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-amber-600">3 Drills</span>
                      <span className="text-[10px] block font-semibold text-gray-400">Warm Chain Mastered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Modules list */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-white">
                  🏆 NBU Core Ward Practice Simulators
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Module 1 */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-white">🚨 Resuscitation Pathway</span>
                      <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-455 text-[9px] font-black rounded uppercase">Critical</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-500 leading-normal">Interactive step-by-step guidance on initial newborn airway management, positive pressure ventilation, and cardiac compression protocols.</p>
                      <button
                      onClick={() => setAcademySubTab('scenarios')}
                      className="text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                      >
                      Launch Simulation <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                  </div>

                  {/* Module 2 */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-white">🌡️ The Baby Warm Chain</span>
                      <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-455 text-[9px] font-black rounded uppercase">Routine</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 leading-normal">Thermal protection index, skin-to-skin Kangaroo Mother Care (KMC) standards, incubator calibration settings, and monitoring charts.</p>
                    <button
                      onClick={() => setAcademySubTab('flashcards')}
                      className="text-[10px] font-black uppercase tracking-wider text-indigo-650 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      Launch Guide <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

                  {/* TAB 8: ADMIN PORTAL */}
            {activeTab === 'admin' && (() => {
              // Dynamic stats calculations
              const doctorsCount = allUsers.filter(u => u.role.includes('Pediatrician') || u.role.includes('CO') || u.role.toLowerCase().includes('doctor')).length;
              const nursesCount = allUsers.filter(u => u.role.includes('Nurse') || u.role.includes('In-Charge')).length;
              const patientsCount = neonates.length;
              const pharmacyCount = 2; // Unique inventory category code or reserve medicines index

              // Dynamic lists
              const recentNeonates = neonates.filter(n => 
                n.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || 
                n.hospitalNumber.toLowerCase().includes(adminSearchTerm.toLowerCase())
              ).slice(0, 5);

              const simulatedAlerts = [
                { title: "Surgeon required R-2", desc: "Just now by Daniel", type: "emergency" },
                { title: "Specialist required R-22", desc: "59 minutes ago by Dexter", type: "emergency" },
                { title: "Medical kit required Ward 2", desc: "12 hours ago by Flora", type: "info" },
                { title: "Critical heart beat R-7", desc: "Today, 11:59 AM by Tim", type: "critical" },
              ];

              const recentLogsAlerts = auditLogs.filter(log => log.action && (log.action.includes('CRITICAL') || log.action.includes('EMERGENCY') || log.action.includes('Dosage'))).map(log => ({
                title: log.action.slice(0, 32) + (log.action.length > 32 ? '...' : ''),
                desc: `${new Date(log.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} by ${log.user_name || 'System'}`,
                type: "critical"
              }));

              const displayAlerts = recentLogsAlerts.length > 0 
                ? [...recentLogsAlerts, ...simulatedAlerts].slice(0, 4) 
                : simulatedAlerts;

              const simulatedReports = [
                { title: "Dr John on leave today...", desc: "Just now by Daniel" },
                { title: "R-22 needs cleaning", desc: "59 minutes ago by Lucy" },
                { title: "Dr Daniel on leave till tomorrow", desc: "12 hours ago by Daniel" },
                { title: "R-12 AC not working", desc: "22 hours ago by Flora" },
                { title: "Hall way 2 cleaning request", desc: "Feb 2, 2023 by Stacy" }
              ];

              const handoverReports = handovers.map(h => ({
                title: `${h.neonate_name}: ${h.plan ? h.plan.slice(0, 26) + '...' : 'Handover registered'}`,
                desc: `${new Date(h.date).toLocaleDateString()} by ${h.nurse_name || 'Staff'}`
              })).concat(simulatedReports).slice(0, 5);

              // Today's active duty staff mapping
              const todayStr = new Date().toISOString().split('T')[0];
              const todayRota = rotas.find(r => r.date === todayStr);

              const activeDutyStaff = [];
              if (todayRota) {
                if (todayRota.consultant_name) {
                  activeDutyStaff.push({ name: `Dr. ${todayRota.consultant_name}`, role: "Consultant Pediatrician", status: "Active" });
                }
                if (todayRota.manager_name) {
                  activeDutyStaff.push({ name: `Sister ${todayRota.manager_name}`, role: "Nursing In-Charge", status: "Active" });
                }
                if (todayRota.nurses && todayRota.nurses.length > 0) {
                  todayRota.nurses.forEach(n => {
                    activeDutyStaff.push({ name: n.name, role: n.role || "Nurse", status: "Active" });
                  });
                }
              }

              const fallbackStaff = [
                { name: "Dr. David Craig", role: "Cardiology", status: "Active" },
                { name: "Dr. Natali Craig", role: "ENT Specialist", status: "Active" },
                { name: "Natalya Wong", role: "Nurse", status: "Active" },
                { name: "John Hammer", role: "Nurse", status: "Active" },
                { name: "Dr. Liza Gomez", role: "Cardiology", status: "Active" }
              ];

              const currentOnDuty = activeDutyStaff.length > 0 ? activeDutyStaff : fallbackStaff;

              return (
                <div className={`rounded-[36px] border transition-all duration-300 overflow-hidden text-left p-6 ${
                  isAdminLightMode 
                    ? 'bg-[#F4F6FC] border-slate-200 text-slate-800 shadow-xl shadow-slate-100/50' 
                    : 'bg-[#0b0f19] border-slate-800 text-slate-100 shadow-2xl'
                }`}>
                  
                  {/* Outer Grid Panel: Sidebar | Workspace | Widgets */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
                    
                    {/* COLUMN 1: LEFT SIDEBAR (xl:col-span-2) */}
                    <aside className={`xl:col-span-2 p-5 rounded-[28px] border flex flex-col justify-between transition-all duration-300 ${
                      isAdminLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#111827] border-slate-800 shadow-xl'
                    }`}>
                      <div className="space-y-6">
                        {/* Profile header */}
                        <div className="flex items-center gap-3 pb-4 border-b border-dashed border-slate-200 dark:border-slate-800">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-650 text-white font-extrabold flex items-center justify-center text-md shadow-md shrink-0">
                            {auth.user.name[0].toUpperCase()}
                          </div>
                          <div className="min-w-0 text-left">
                            <h4 className={`text-xs font-black truncate ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>
                              {auth.user.name}
                            </h4>
                            <p className="text-[9px] font-bold text-slate-450 uppercase tracking-wider truncate">
                              {auth.user.role}
                            </p>
                          </div>
                        </div>

                        {/* Favorites / Recently toggle buttons */}
                        <div className={`flex p-1 rounded-xl transition-all ${
                          isAdminLightMode ? 'bg-slate-100' : 'bg-slate-900'
                        }`}>
                          <button className="flex-1 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-sm transition-all">
                            Favorites
                          </button>
                          <button className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                            isAdminLightMode ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-slate-300'
                          }`}>
                            Recently
                          </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 block px-2 mb-2">
                            Dashboard
                          </span>
                          <nav className="space-y-1">
                            {[
                              { id: 'overview', name: 'Overview', icon: BarChart2 },
                              { id: 'vetting', name: 'Vetting Queue', icon: ShieldAlert, badge: allUsers.filter(u => u.status === 'Pending').length },
                              { id: 'doctors', name: 'Doctors', icon: Stethoscope },
                              { id: 'directory', name: 'Nurses & Staff', icon: Users },
                              { id: 'patients', name: 'Patients', icon: Baby },
                              { id: 'audit', name: 'Audit Logs', icon: FileCode },
                            ].map(item => {
                              const isActive = (item.id === 'doctors' || item.id === 'directory')
                                ? (adminSubTab === 'directory' && (item.id === 'doctors' ? adminRoleFilter === 'Doctor' : adminRoleFilter === 'Nurse'))
                                : (adminSubTab === item.id);

                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    if (item.id === 'doctors') {
                                      setAdminSubTab('directory');
                                      setAdminRoleFilter('Doctor');
                                    } else if (item.id === 'directory') {
                                      setAdminSubTab('directory');
                                      setAdminRoleFilter('Nurse');
                                    } else {
                                      setAdminSubTab(item.id);
                                      setAdminRoleFilter('All');
                                    }
                                  }}
                                  className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all group ${
                                    isActive
                                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                      : (isAdminLightMode 
                                          ? 'text-slate-500 hover:bg-slate-50 hover:text-slate-900' 
                                          : 'text-slate-400 hover:bg-slate-900/50 hover:text-white')
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <item.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                                    <span>{item.name}</span>
                                  </div>
                                  {item.badge > 0 && (
                                    <span className={`h-4 min-w-[16px] px-1 rounded flex items-center justify-center text-[9px] font-bold ${
                                      isActive ? 'bg-white text-blue-600' : 'bg-amber-500 text-white animate-pulse'
                                    }`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </nav>
                        </div>

                        {/* System Options */}
                        <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 block px-2 mb-2">
                            System
                          </span>
                          <button
                            onClick={() => setAdminSubTab('settings')}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                              adminSubTab === 'settings'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : (isAdminLightMode 
                                    ? 'text-slate-500 hover:bg-slate-50 hover:text-slate-900' 
                                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-white')
                            }`}
                          >
                            <Settings className="w-4 h-4 shrink-0" />
                            Settings
                          </button>
                          <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-rose-500 hover:bg-rose-500/10 transition-all text-left"
                          >
                            <LogOut className="w-4 h-4 shrink-0" />
                            Log Out
                          </Link>
                        </div>
                      </div>

                      {/* Theme toggle banner at footer */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button 
                          onClick={() => setIsAdminLightMode(!isAdminLightMode)}
                          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
                            isAdminLightMode 
                              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-sm' 
                              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                          }`}
                        >
                          {isAdminLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                          {isAdminLightMode ? 'Dark Theme' : 'Light Theme'}
                        </button>
                      </div>
                    </aside>

                    {/* COLUMN 2: WORKSPACE PANEL (xl:col-span-7) */}
                    <main className="xl:col-span-7 space-y-6">
                      
                      {/* Header block with search & clock */}
                      <div className={`p-5 rounded-[24px] border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${
                        isAdminLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#111827] border-slate-800 shadow-lg'
                      }`}>
                        <div>
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Dashboard</span>
                            <ChevronRight className="w-3 h-3 text-slate-350" />
                            <span className="text-blue-600 font-black">{adminSubTab}</span>
                          </div>
                          <h3 className={`text-md font-black tracking-tight mt-1 ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>
                            {adminSubTab === 'overview' && 'System Analytics Command'}
                            {adminSubTab === 'vetting' && 'Credential Vetting Queue'}
                            {adminSubTab === 'directory' && `${adminRoleFilter} Staff Directory`}
                            {adminSubTab === 'patients' && 'Neonatal Patients registry'}
                            {adminSubTab === 'audit' && 'Clinical Audit Trail Ledger'}
                            {adminSubTab === 'settings' && 'Institutional Settings & Security'}
                          </h3>
                        </div>

                        {/* Search, Notifications & clock */}
                        <div className="flex items-center gap-3 self-end md:self-auto">
                          <div className="relative group">
                            <Search className={`w-3.5 h-3.5 absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors ${
                              isAdminLightMode ? 'text-slate-400 group-focus-within:text-blue-500' : 'text-slate-500 group-focus-within:text-blue-405'
                            }`} />
                            <input
                              type="text"
                              placeholder="Search Files, Patients..."
                              value={adminSearchTerm}
                              onChange={(e) => setAdminSearchTerm(e.target.value)}
                              className={`pl-10 pr-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider outline-none border transition-all w-48 focus:w-60 ${
                                isAdminLightMode 
                                  ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-blue-400' 
                                  : 'bg-slate-900 border-slate-800 text-white focus:bg-slate-950 focus:border-blue-500'
                              }`}
                            />
                          </div>

                          <button className={`p-2.5 rounded-xl border transition-all ${
                            isAdminLightMode ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100' : 'bg-slate-900 border-slate-800 text-slate-450 hover:bg-slate-800'
                          }`}>
                            <Clock className="w-4 h-4" />
                          </button>
                          
                          <button className={`p-2.5 rounded-xl border transition-all relative ${
                            isAdminLightMode ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100' : 'bg-slate-900 border-slate-800 text-slate-450 hover:bg-slate-800'
                          }`}>
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                          </button>
                        </div>
                      </div>

                      {/* SUBTAB CONTENT: OVERVIEW DASHBOARD */}
                      {adminSubTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          {/* Year / Month / Week buttons row */}
                          <div className="flex justify-between items-center">
                            <div className={`flex p-1 rounded-xl shadow-sm ${isAdminLightMode ? 'bg-white' : 'bg-[#111827]'}`}>
                              {['Year', 'Month', 'Week'].map((t) => (
                                <button 
                                  key={t}
                                  className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                                    t === 'Month' 
                                      ? 'bg-blue-600 text-white shadow-sm' 
                                      : (isAdminLightMode ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-slate-350')
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>

                            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider border transition-all ${
                              isAdminLightMode ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-[#111827] border-slate-800 text-slate-350'
                            }`}>
                              Select Date
                              <ChevronDown className="w-3.5 h-3.5 text-blue-500" />
                            </button>
                          </div>

                          {/* Stat Cards & Total Patients Bar Chart */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                            
                            {/* Stats Cards Column */}
                            <div className="md:col-span-5 grid grid-cols-2 gap-4">
                              {/* Doctors Card */}
                              <div className="bg-[#FEF8CD] p-5 rounded-[24px] border border-yellow-200/50 shadow-sm flex flex-col justify-between text-left h-[130px]">
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-yellow-800">Doctors</span>
                                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 text-[8px] font-black tracking-wider flex items-center gap-0.5">
                                    +11.01%
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-3xl font-black text-yellow-950 tracking-tight">{doctorsCount}</h4>
                                  <p className="text-[9px] font-bold text-yellow-700 mt-0.5">5 Doctors on Vacation</p>
                                </div>
                              </div>

                              {/* Nurses & Staff Card */}
                              <div className={`p-5 rounded-[24px] border shadow-sm flex flex-col justify-between text-left h-[130px] transition-all duration-300 ${
                                isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-800/80'
                              }`}>
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Nurses & Staff</span>
                                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 text-[8px] font-black tracking-wider flex items-center gap-0.5">
                                    -0.01%
                                  </span>
                                </div>
                                <div>
                                  <h4 className={`text-3xl font-black tracking-tight ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{nursesCount}</h4>
                                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">5 Newly joined</p>
                                </div>
                              </div>

                              {/* Patients Card */}
                              <div className={`p-5 rounded-[24px] border shadow-sm flex flex-col justify-between text-left h-[130px] transition-all duration-300 ${
                                isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-800/80'
                              }`}>
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Patients</span>
                                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 text-[8px] font-black tracking-wider flex items-center gap-0.5">
                                    +15.03%
                                  </span>
                                </div>
                                <div>
                                  <h4 className={`text-3xl font-black tracking-tight ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{patientsCount}</h4>
                                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">22 New patients</p>
                                </div>
                              </div>

                              {/* Pharmacy Card */}
                              <div className="bg-[#FEF8CD] p-5 rounded-[24px] border border-yellow-200/50 shadow-sm flex flex-col justify-between text-left h-[130px]">
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-yellow-800">Pharmacy</span>
                                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 text-[8px] font-black tracking-wider flex items-center gap-0.5">
                                    +6.08%
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-3xl font-black text-yellow-950 tracking-tight">{pharmacyCount}</h4>
                                  <p className="text-[9px] font-bold text-yellow-700 mt-0.5">45k Medicine on reserve</p>
                                </div>
                              </div>
                            </div>

                            {/* Total Patients Stacked Bar Chart */}
                            <div className={`md:col-span-7 p-6 rounded-[28px] border shadow-sm flex flex-col justify-between text-left transition-all duration-300 ${
                              isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-800/80'
                            }`}>
                              <div className="flex items-center justify-between pb-3">
                                <div className="flex items-baseline gap-2">
                                  <h4 className={`text-xs font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Total Patients</h4>
                                  <span className="px-1.5 py-0.2 bg-emerald-150 dark:bg-emerald-950 text-emerald-600 text-[8px] font-black rounded-full">+6.08%</span>
                                </div>
                                <button className="text-[9px] font-black uppercase tracking-wider text-blue-600 hover:underline">
                                  View All &gt;
                                </button>
                              </div>

                              <div className="flex-1 flex items-center justify-center pt-2">
                                <svg className="w-full h-40" viewBox="0 0 360 180">
                                  {/* Y grids */}
                                  <line x1="30" y1="20" x2="350" y2="20" stroke="#f1f5f9" className="dark:stroke-slate-800/50" strokeWidth="1" />
                                  <line x1="30" y1="60" x2="350" y2="60" stroke="#f1f5f9" className="dark:stroke-slate-800/50" strokeWidth="1" />
                                  <line x1="30" y1="100" x2="350" y2="100" stroke="#f1f5f9" className="dark:stroke-slate-800/50" strokeWidth="1" />
                                  <line x1="30" y1="140" x2="350" y2="140" stroke="#f1f5f9" className="dark:stroke-slate-800/50" strokeWidth="1" />
                                  
                                  <text x="15" y="24" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-500">300</text>
                                  <text x="15" y="64" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-500">200</text>
                                  <text x="15" y="104" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-500">100</text>
                                  <text x="20" y="144" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-500">0</text>

                                  {/* Jan */}
                                  <g className="cursor-pointer hover:opacity-85 transition-opacity">
                                    <rect x="50" y="100" width="14" height="40" rx="2" fill="#2563eb" />
                                    <rect x="50" y="80" width="14" height="20" fill="#60a5fa" />
                                    <rect x="50" y="65" width="14" height="15" rx="2" fill="#facc15" />
                                  </g>
                                  <text x="57" y="160" textAnchor="middle" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-550">Jan</text>

                                  {/* Feb */}
                                  <g className="cursor-pointer hover:opacity-85 transition-opacity">
                                    <rect x="100" y="110" width="14" height="30" rx="2" fill="#2563eb" />
                                    <rect x="100" y="95" width="14" height="15" fill="#60a5fa" />
                                    <rect x="100" y="85" width="14" height="10" rx="2" fill="#facc15" />
                                  </g>
                                  <text x="107" y="160" textAnchor="middle" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-550">Feb</text>

                                  {/* Mar */}
                                  <g className="cursor-pointer hover:opacity-85 transition-opacity">
                                    <rect x="150" y="90" width="14" height="50" rx="2" fill="#2563eb" />
                                    <rect x="150" y="70" width="14" height="20" fill="#60a5fa" />
                                    <rect x="150" y="55" width="14" height="15" rx="2" fill="#facc15" />
                                  </g>
                                  <text x="157" y="160" textAnchor="middle" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-550">Mar</text>

                                  {/* Apr */}
                                  <g className="cursor-pointer hover:opacity-85 transition-opacity">
                                    <rect x="200" y="105" width="14" height="35" rx="2" fill="#2563eb" />
                                    <rect x="200" y="85" width="14" height="20" fill="#60a5fa" />
                                    <rect x="200" y="75" width="14" height="10" rx="2" fill="#facc15" />
                                  </g>
                                  <text x="207" y="160" textAnchor="middle" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-550">Apr</text>

                                  {/* May */}
                                  <g className="cursor-pointer hover:opacity-85 transition-opacity">
                                    <rect x="250" y="115" width="14" height="25" rx="2" fill="#2563eb" />
                                    <rect x="250" y="100" width="14" height="15" fill="#60a5fa" />
                                    <rect x="250" y="90" width="14" height="10" rx="2" fill="#facc15" />
                                  </g>
                                  <text x="257" y="160" textAnchor="middle" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-550">May</text>

                                  {/* Jun */}
                                  <g className="cursor-pointer hover:opacity-85 transition-opacity">
                                    <rect x="300" y="85" width="14" height="55" rx="2" fill="#2563eb" />
                                    <rect x="300" y="65" width="14" height="20" fill="#60a5fa" />
                                    <rect x="300" y="50" width="14" height="15" rx="2" fill="#facc15" />
                                  </g>
                                  <text x="307" y="160" textAnchor="middle" className="text-[8px] font-bold fill-slate-400 dark:fill-slate-550">Jun</text>
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Grid Row 2: Earnings double line graph & birth / death donut */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                            {/* Total Earnings line chart card */}
                            <div className={`md:col-span-8 p-6 rounded-[28px] border shadow-sm flex flex-col justify-between text-left transition-all duration-300 ${
                              isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-800/80'
                            }`}>
                              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div className="flex items-baseline gap-2">
                                  <h4 className={`text-xs font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Total Earnings</h4>
                                  <span className="px-1.5 py-0.2 bg-emerald-150 dark:bg-emerald-950 text-emerald-600 text-[8px] font-black rounded-full">+15.03%</span>
                                </div>

                                <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-550">
                                  <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 block" /> Current: $8,211
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 block" /> Previous: $6,768
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 flex items-center justify-center pt-2">
                                <svg className="w-full h-44" viewBox="0 0 450 180">
                                  <line x1="30" y1="20" x2="430" y2="20" stroke="#f1f5f9" className="dark:stroke-slate-800/55" strokeWidth="1" />
                                  <line x1="30" y1="60" x2="430" y2="60" stroke="#f1f5f9" className="dark:stroke-slate-800/55" strokeWidth="1" />
                                  <line x1="30" y1="100" x2="430" y2="100" stroke="#f1f5f9" className="dark:stroke-slate-800/55" strokeWidth="1" />
                                  <line x1="30" y1="140" x2="430" y2="140" stroke="#f1f5f9" className="dark:stroke-slate-800/55" strokeWidth="1" />

                                  <text x="10" y="24" className="text-[7px] font-black fill-slate-400 dark:fill-slate-500">$3000</text>
                                  <text x="10" y="64" className="text-[7px] font-black fill-slate-400 dark:fill-slate-500">$2000</text>
                                  <text x="10" y="104" className="text-[7px] font-black fill-slate-400 dark:fill-slate-500">$1000</text>
                                  <text x="15" y="144" className="text-[7px] font-black fill-slate-400 dark:fill-slate-500">$0</text>

                                  {/* Yellow Line */}
                                  <path 
                                    d="M 40 120 C 100 130, 160 145, 220 115 C 280 90, 340 130, 420 110" 
                                    fill="none" 
                                    stroke="#eab308" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                  />

                                  {/* Blue Line */}
                                  <path 
                                    d="M 40 100 C 100 90, 160 115, 220 85 C 280 65, 340 100, 420 75" 
                                    fill="none" 
                                    stroke="#2563eb" 
                                    strokeWidth="3.5" 
                                    strokeLinecap="round" 
                                  />

                                  {/* Target Line */}
                                  <line x1="220" y1="20" x2="220" y2="140" stroke="#cbd5e1" className="dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3" />
                                  <circle cx="220" cy="85" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />

                                  {/* Interactive Tooltip Callout */}
                                  <g transform="translate(180, 20)">
                                    <rect x="0" y="0" width="80" height="28" rx="6" fill="#1e293b" />
                                    <text x="40" y="11" textAnchor="middle" className="text-[8px] font-black fill-white">$2,300</text>
                                    <text x="40" y="21" textAnchor="middle" className="text-[7px] font-semibold fill-slate-400">Jan 10, 22:00</text>
                                  </g>

                                  {/* X Months */}
                                  <text x="40" y="160" textAnchor="middle" className="text-[7px] font-black fill-slate-400">Oct 2023</text>
                                  <text x="116" y="160" textAnchor="middle" className="text-[7px] font-black fill-slate-400">Nov 2023</text>
                                  <text x="192" y="160" textAnchor="middle" className="text-[7px] font-black fill-slate-400">Dec 2023</text>
                                  <text x="268" y="160" textAnchor="middle" className="text-[7px] font-black fill-slate-400">Jan 2024</text>
                                  <text x="344" y="160" textAnchor="middle" className="text-[7px] font-black fill-slate-400">Feb 2024</text>
                                  <text x="420" y="160" textAnchor="end" className="text-[7px] font-black fill-slate-400">Mar 2024</text>
                                </svg>
                              </div>
                            </div>

                            {/* Donut analytical chart */}
                            <div className={`md:col-span-4 p-6 rounded-[28px] border shadow-sm flex flex-col justify-between text-left transition-all duration-300 ${
                              isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-800/80'
                            }`}>
                              <div>
                                <h4 className={`text-xs font-black leading-tight ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>
                                  Hospital Birth & Death Analytics
                                </h4>
                              </div>

                              <div className="flex justify-center my-3 relative items-center">
                                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" className="dark:stroke-slate-800" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="8" strokeDasharray="251.3" strokeDashoffset="53" strokeLinecap="round" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#eab308" strokeWidth="8" strokeDasharray="251.3" strokeDashoffset="125" strokeLinecap="round" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="251.3" strokeDashoffset="200" strokeLinecap="round" />
                                </svg>
                                <div className="absolute text-center">
                                  <span className={`text-lg font-black block leading-none ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>27.99%</span>
                                </div>
                              </div>

                              <div className="space-y-1.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 block" /> Birth case
                                  </span>
                                  <span className={`font-black ${isAdminLightMode ? 'text-slate-800' : 'text-white'}`}>78.99%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 block" /> Accident case
                                  </span>
                                  <span className={`font-black ${isAdminLightMode ? 'text-slate-800' : 'text-white'}`}>56.99%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-500 block" /> Death case
                                  </span>
                                  <span className={`font-black ${isAdminLightMode ? 'text-slate-800' : 'text-white'}`}>27.99%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Patients Registration Table */}
                          <div className={`p-6 rounded-[28px] border shadow-sm text-left transition-all duration-300 ${
                            isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-800/80'
                          }`}>
                            <h4 className={`text-xs font-black mb-4 ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>
                              Patients Registration
                            </h4>
                            
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse min-w-[580px]">
                                <thead>
                                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[8px] text-slate-400 font-black uppercase tracking-wider">
                                    <th className="pb-3">Name</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3">Date & Time</th>
                                    <th className="pb-3">Age</th>
                                    <th className="pb-3">Appointed For</th>
                                    <th className="pb-3 text-center">Report</th>
                                    <th className="pb-3 text-right">Action</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-850/40 text-xs font-semibold text-slate-700 dark:text-slate-350">
                                  {recentNeonates.map((n) => (
                                    <tr key={n.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all duration-200">
                                      <td className={`py-4 font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{n.name}</td>
                                      <td className="py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                                          n.status === 'Critical' 
                                            ? 'bg-rose-500/10 text-rose-500' 
                                            : 'bg-blue-600/10 text-blue-600'
                                        }`}>
                                          {n.status === 'Critical' ? 'Critical' : 'Admitted'}
                                        </span>
                                      </td>
                                      <td className="py-4 font-mono text-[9.5px] text-slate-400">
                                        {new Date(n.created_at || n.createdAt).toLocaleString(undefined, {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})}
                                      </td>
                                      <td className="py-4">{n.gestational_age || n.gestationalAge || 38} wks</td>
                                      <td className="py-4 truncate max-w-[150px]">{n.admission_diagnosis || n.admissionDiagnosis || 'Observation'}</td>
                                      <td className="py-4">
                                        <div className="flex justify-center">
                                          <FileText className="w-4 h-4 text-rose-500 cursor-pointer hover:scale-110 transition-transform" />
                                        </div>
                                      </td>
                                      <td className="py-4">
                                        <div className="flex items-center justify-end gap-2.5 text-slate-400">
                                          <Printer className="w-3.5 h-3.5 cursor-pointer hover:text-blue-600 transition-colors" />
                                          <Download className="w-3.5 h-3.5 cursor-pointer hover:text-blue-600 transition-colors" />
                                          <Link href={route('neonates.profile', n.id)}>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 cursor-pointer hover:scale-110 transition-all" />
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {recentNeonates.length === 0 && (
                                    <tr>
                                      <td colSpan="7" className="py-8 text-center text-slate-400 uppercase tracking-widest text-[9px]">
                                        No recent patient admissions found.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUBTAB CONTENT: VETTING QUEUE */}
                      {adminSubTab === 'vetting' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Pending Registrations</h4>
                          </div>

                          {allUsers.filter(u => u.status === 'Pending').length === 0 ? (
                            <div className={`p-16 rounded-[28px] border text-center transition-all ${
                              isAdminLightMode ? 'bg-white border-slate-200/50 text-slate-450' : 'bg-[#111827] border-slate-805 text-slate-500'
                            }`}>
                              <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                              <h5 className={`font-black text-sm mb-1 ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Queue Fully Approved</h5>
                              <p className="text-xs">No pending credentials require review.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {allUsers.filter(u => u.status === 'Pending').map((user) => (
                                <div key={user.id} className={`p-6 rounded-[28px] border shadow-sm flex flex-col justify-between gap-6 transition-all group hover:-translate-y-0.5 ${
                                  isAdminLightMode 
                                    ? 'bg-white border-slate-200/50 hover:border-blue-200 hover:shadow-lg' 
                                    : 'bg-[#111827] border-slate-800 hover:border-blue-900'
                                }`}>
                                  <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-650 text-white font-extrabold flex items-center justify-center text-md shadow-inner shrink-0">
                                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <div className="min-w-0 text-left pt-0.5">
                                      <h5 className={`font-black text-sm truncate ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{user.name}</h5>
                                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${
                                          isAdminLightMode ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-450'
                                        }`}>
                                          {user.role}
                                        </span>
                                        <span className="text-[9px] font-semibold text-blue-500 truncate">{user.email}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className={`grid grid-cols-2 gap-3 p-4 rounded-2xl border ${
                                    isAdminLightMode ? 'bg-slate-50 border-slate-100' : 'bg-slate-950/60 border-slate-900/60'
                                  } text-xs text-left`}>
                                    <div>
                                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">ID Number</span>
                                      <span className={`font-bold ${isAdminLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{user.id_number || 'N/A'}</span>
                                    </div>
                                    <div>
                                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Contact Phone</span>
                                      <span className={`font-bold ${isAdminLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{user.phone || 'N/A'}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => router.post(`/admin/users/${user.id}/approve`)}
                                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => router.post(`/admin/users/${user.id}/reject`)}
                                      className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border active:scale-95 ${
                                        isAdminLightMode 
                                          ? 'bg-white hover:bg-rose-50 border-slate-200 text-slate-400 hover:text-rose-650' 
                                          : 'bg-slate-900 hover:bg-rose-950/20 border-slate-800 text-slate-500 hover:text-rose-400'
                                      }`}
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* SUBTAB CONTENT: STAFF DIRECTORY */}
                      {adminSubTab === 'directory' && (() => {
                        const filteredStaff = allUsers.filter(user => {
                          const matchesSearch = user.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || 
                                                user.email.toLowerCase().includes(adminSearchTerm.toLowerCase());
                          const matchesRole = adminRoleFilter === 'All' || 
                                              (adminRoleFilter === 'Doctor' ? (user.role.includes('Pediatrician') || user.role.includes('CO')) : user.role.includes('Nurse'));
                          return matchesSearch && matchesRole;
                        });

                        return (
                          <div className="space-y-6 animate-in fade-in duration-300 text-left">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>
                                {adminRoleFilter} Staff Directory ({filteredStaff.length})
                              </h4>
                            </div>

                            <div className={`rounded-[28px] border overflow-hidden transition-all duration-300 ${
                              isAdminLightMode ? 'bg-white border-slate-200/50 shadow-sm' : 'bg-[#111827] border-slate-800 shadow-lg'
                            }`}>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                  <thead>
                                    <tr className={`text-[8px] font-black uppercase tracking-widest border-b ${
                                      isAdminLightMode ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                                    }`}>
                                      <th className="px-6 py-4">Professional Details</th>
                                      <th className="px-6 py-4 text-center">Designated Role</th>
                                      <th className="px-6 py-4 text-center">Status</th>
                                      <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className={`divide-y ${isAdminLightMode ? 'divide-slate-100' : 'divide-slate-900'}`}>
                                    {filteredStaff.map((user) => (
                                      <tr key={user.id} className={`group transition-all ${
                                        isAdminLightMode ? 'hover:bg-slate-50/50' : 'hover:bg-slate-900/50'
                                      }`}>
                                        <td className="px-6 py-4">
                                          <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-655 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
                                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                            <div>
                                              <div className="flex items-center gap-1.5">
                                                <span className={`text-xs font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{user.name}</span>
                                                {user.status === 'Approved' && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />}
                                              </div>
                                              <span className="text-[9px] font-mono text-slate-450 block mt-0.5">{user.email}</span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                                            isAdminLightMode ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-905 border-slate-800 text-slate-400'
                                          }`}>
                                            {user.role}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                          <div className="flex justify-center">
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase flex items-center gap-1 ${
                                              user.status === 'Approved' 
                                                ? 'bg-emerald-500/10 text-emerald-500' 
                                                : (user.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500')
                                            }`}>
                                              <span className={`w-1 h-1 rounded-full ${user.status === 'Approved' ? 'bg-emerald-500' : (user.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500')}`} />
                                              {user.status || 'Offline'}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                          <select
                                            defaultValue={user.role}
                                            onChange={(e) => {
                                              router.post(`/admin/users/${user.id}/update-role`, {
                                                role: e.target.value
                                              });
                                            }}
                                            className={`px-3 py-1.5 rounded-xl outline-none text-[9px] font-black uppercase border transition-all cursor-pointer ${
                                              isAdminLightMode 
                                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white focus:border-blue-400' 
                                                : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-950 focus:border-blue-500'
                                            }`}
                                          >
                                            <option value="Nursing In-Charge">Nursing In-Charge</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Consultant Pediatrician">Consultant Pediatrician</option>
                                            <option value="CO Pediatrics / MO">CO Pediatrics / MO</option>
                                            <option value="Student">Student</option>
                                            <option value="ICT / IT Support">ICT / IT Support</option>
                                            <option value="Hospital Management">Hospital Management</option>
                                          </select>
                                        </td>
                                      </tr>
                                    ))}
                                    {filteredStaff.length === 0 && (
                                      <tr>
                                        <td colSpan="4" className="py-12 text-center text-slate-400 uppercase tracking-widest text-[9px]">
                                          No matching staff members found.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* SUBTAB CONTENT: AUDIT LOGS */}
                      {adminSubTab === 'audit' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Clinical Logs Ledger</h4>
                            <button className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider border transition-all ${
                              isAdminLightMode ? 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50' : 'bg-slate-900 border-slate-800 text-slate-450 hover:bg-slate-800'
                            }`}>
                              Export Ledger (.CSV)
                            </button>
                          </div>

                          <div className={`rounded-[28px] border overflow-hidden transition-all duration-300 ${
                            isAdminLightMode ? 'bg-white border-slate-200/50 shadow-sm' : 'bg-[#111827] border-slate-800 shadow-lg'
                          }`}>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse min-w-[650px]">
                                <thead>
                                  <tr className={`text-[8px] font-black uppercase tracking-widest border-b ${
                                    isAdminLightMode ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                                  }`}>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">Clinician Actor</th>
                                    <th className="px-6 py-4">Action Event Description</th>
                                    <th className="px-6 py-4 text-right">Origin IP</th>
                                  </tr>
                                </thead>
                                <tbody className={`divide-y text-xs font-semibold ${
                                  isAdminLightMode ? 'divide-slate-100 text-slate-700' : 'divide-slate-900 text-slate-350'
                                }`}>
                                  {auditLogs.map((log) => (
                                    <tr key={log.id} className={`transition-colors ${
                                      isAdminLightMode ? 'hover:bg-slate-50/50' : 'hover:bg-slate-900/50'
                                    }`}>
                                      <td className="px-6 py-4 font-mono text-[9px] text-slate-450 whitespace-nowrap">
                                        {new Date(log.created_at).toLocaleString()}
                                      </td>
                                      <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[9px] border ${
                                            isAdminLightMode ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-800 border-slate-700 text-slate-400'
                                          }`}>
                                            {log.user_name ? log.user_name[0] : 'S'}
                                          </div>
                                          <span className={`font-black tracking-tight ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>
                                            {log.user_name || 'System Auto'}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${
                                            log.action && (log.action.includes('error') || log.action.includes('failed') || log.action.includes('REJECTED'))
                                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                                              : (isAdminLightMode ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-blue-900/10 border-blue-900/20 text-blue-400')
                                          }`}>
                                            {log.type || 'Action'}
                                          </span>
                                          <span className="font-medium opacity-90 truncate max-w-[200px]" title={log.action}>{log.action}</span>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 text-right font-mono text-[9px] text-slate-400 opacity-60">
                                        {log.ip_address || '127.0.0.1'}
                                      </td>
                                    </tr>
                                  ))}
                                  {auditLogs.length === 0 && (
                                    <tr>
                                      <td colSpan="4" className="py-12 text-center text-slate-400 uppercase tracking-widest text-[9px]">
                                        No audit entries registered in database.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUBTAB CONTENT: PATIENTS DATABASE LEDGER */}
                      {adminSubTab === 'patients' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Active Patients registry ({neonates.length})</h4>
                          </div>

                          <div className={`rounded-[28px] border overflow-hidden transition-all duration-300 ${
                            isAdminLightMode ? 'bg-white border-slate-200/50 shadow-sm' : 'bg-[#111827] border-slate-800 shadow-lg'
                          }`}>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                  <tr className={`text-[8px] font-black uppercase tracking-widest border-b ${
                                    isAdminLightMode ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                                  }`}>
                                    <th className="px-6 py-4">Hospital ID</th>
                                    <th className="px-6 py-4">Newborn Baby Name</th>
                                    <th className="px-6 py-4 text-center">Admission Date</th>
                                    <th className="px-6 py-4 text-center">Gender</th>
                                    <th className="px-6 py-4 text-center">Birth Weight</th>
                                    <th className="px-6 py-4 text-right">Administrative Action</th>
                                  </tr>
                                </thead>
                                <tbody className={`divide-y ${isAdminLightMode ? 'divide-slate-100 text-slate-700' : 'divide-slate-900 text-slate-350'}`}>
                                  {neonates.filter(n => n.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || n.hospitalNumber.toLowerCase().includes(adminSearchTerm.toLowerCase())).map((n) => (
                                    <tr key={n.id} className={`transition-colors ${
                                      isAdminLightMode ? 'hover:bg-slate-50/50' : 'hover:bg-slate-900/50'
                                    }`}>
                                      <td className="px-6 py-4 font-mono text-xs font-black tracking-tight text-blue-600">{n.hospitalNumber || n.hospital_number}</td>
                                      <td className={`px-6 py-4 font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{n.name}</td>
                                      <td className="px-6 py-4 text-center font-mono text-[9.5px]">
                                        {new Date(n.created_at || n.createdAt).toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'})}
                                      </td>
                                      <td className="px-6 py-4 text-center">{n.gender}</td>
                                      <td className="px-6 py-4 text-center font-bold">{n.birthWeight || n.birth_weight} kg</td>
                                      <td className="px-6 py-4 text-right">
                                        <Link 
                                          href={route('neonates.profile', n.id)}
                                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-blue-500 shadow-sm transition-all"
                                        >
                                          View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUBTAB CONTENT: SETTINGS PANEL */}
                      {adminSubTab === 'settings' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          <h4 className={`text-sm font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Administrative Configuration</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                              { title: "Vetting Protocols", desc: "Configure medical credential requirements, ID vetting rules, and automatic approval criteria.", status: "Active (Strict)" },
                              { title: "Ledger Audit Schedules", desc: "Configure automatic clinical trail backups, ledger encryption keys, and security validation routines.", status: "Every 24h" },
                              { title: "Clinical Formularies", desc: "Update drug default safety thresholds, calculators equations, and emergency dosage rules.", status: "WHO 2026 Ready" },
                              { title: "Emergency Alerts Routing", desc: "Configure push notifications channels and critical alerts targets for ward staff on shifts.", status: "SMS & Socket" },
                            ].map((s, idx) => (
                              <div key={idx} className={`p-6 rounded-[24px] border flex flex-col justify-between gap-4 transition-all ${
                                isAdminLightMode ? 'bg-white border-slate-200/50 shadow-sm' : 'bg-[#111827] border-slate-805 shadow-md'
                              }`}>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <h5 className={`font-black text-xs ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{s.title}</h5>
                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[8px] font-black uppercase">{s.status}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-450 dark:text-slate-500 leading-relaxed">{s.desc}</p>
                                </div>
                                <button className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-wider border transition-all ${
                                  isAdminLightMode ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300' : 'bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-950'
                                }`}>
                                  Configure Parameters
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </main>

                    {/* COLUMN 3: RIGHT SIDEBAR WIDGETS (xl:col-span-3) */}
                    <aside className="xl:col-span-3 space-y-6">
                      
                      {/* Emergency Alerts Box */}
                      <div className={`p-5 rounded-[28px] border shadow-sm text-left flex flex-col transition-all duration-300 ${
                        isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-805'
                      }`}>
                        <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200 dark:border-slate-800">
                          <h4 className={`text-xs font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Emergency Alerts</h4>
                          <button className="text-[9px] font-black uppercase tracking-wider text-blue-600 hover:underline">
                            View All
                          </button>
                        </div>
                        <div className="space-y-3.5 mt-4">
                          {displayAlerts.map((alert, idx) => (
                            <div key={idx} className="flex gap-3 items-start group">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-extrabold ${
                                alert.type === 'emergency' 
                                  ? 'bg-gradient-to-tr from-rose-500 to-red-650 shadow-sm' 
                                  : (alert.type === 'critical' ? 'bg-gradient-to-tr from-amber-500 to-orange-600' : 'bg-gradient-to-tr from-blue-500 to-indigo-600')
                              }`}>
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                              </div>
                              <div className="min-w-0 text-left pt-0.5">
                                <h5 className={`text-[10px] font-black truncate leading-tight group-hover:text-blue-500 transition-colors ${isAdminLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                                  {alert.title}
                                </h5>
                                <span className="text-[8px] font-bold text-slate-400 block mt-0.5 uppercase tracking-wider">{alert.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hospital Report Box */}
                      <div className={`p-5 rounded-[28px] border shadow-sm text-left flex flex-col transition-all duration-300 ${
                        isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-805'
                      }`}>
                        <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200 dark:border-slate-800">
                          <h4 className={`text-xs font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Hospital Report</h4>
                          <button className="text-[9px] font-black uppercase tracking-wider text-blue-600 hover:underline">
                            View All
                          </button>
                        </div>
                        <div className="space-y-3.5 mt-4">
                          {handoverReports.map((report, idx) => (
                            <div key={idx} className="flex gap-3 items-center group">
                              <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-blue-500 outline outline-4 outline-blue-500/10 group-hover:scale-110 transition-transform" />
                              <div className="min-w-0 text-left">
                                <h5 className={`text-[10px] font-bold truncate leading-tight group-hover:text-blue-500 transition-colors ${isAdminLightMode ? 'text-slate-700' : 'text-slate-350'}`}>
                                  {report.title}
                                </h5>
                                <span className="text-[8px] font-medium text-slate-400 block mt-0.5 tracking-wider">{report.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* On Duty Staff Box */}
                      <div className={`p-5 rounded-[28px] border shadow-sm text-left flex flex-col transition-all duration-300 ${
                        isAdminLightMode ? 'bg-white border-slate-200/50' : 'bg-[#111827] border-slate-805'
                      }`}>
                        <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200 dark:border-slate-800">
                          <h4 className={`text-xs font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>On Duty Staff</h4>
                          <button className="text-[9px] font-black uppercase tracking-wider text-blue-600 hover:underline">
                            View All
                          </button>
                        </div>
                        <div className="space-y-4 mt-4">
                          {currentOnDuty.map((staff, idx) => (
                            <div key={idx} className="flex items-center justify-between group">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="relative shrink-0">
                                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white font-extrabold flex items-center justify-center text-[10px] shadow-sm">
                                    {staff.name.replace('Dr. ', '').replace('Sister ', '')[0]}
                                  </div>
                                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#111827]" />
                                </div>
                                <div className="text-left min-w-0">
                                  <h5 className={`text-[10px] font-black truncate leading-tight ${isAdminLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                                    {staff.name}
                                  </h5>
                                  <span className="text-[8px] font-bold text-slate-400 block tracking-wider uppercase mt-0.5">{staff.role}</span>
                                </div>
                              </div>
                              <button className={`p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 transition-all`}>
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </aside>

                  </div>
                </div>
              );
            })()}

      {/* Patient Admission Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Admit Neonate Patient</h3>
                <p className="text-xs text-gray-500">Record newborn clinical biodata and maternal context.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveNeonate} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Hospital Number</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. NBU-2026-901"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.hospitalNumber}
                    onChange={(e) => setNeonateData('hospitalNumber', e.target.value)}
                  />
                  {neonateErrors.hospitalNumber && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.hospitalNumber}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Baby Jane Doe"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.name}
                    onChange={(e) => setNeonateData('name', e.target.value)}
                  />
                  {neonateErrors.name && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.name}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Date of Birth</label>
                  <input
                    required
                    type="date"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                    value={neonateData.dob}
                    onChange={(e) => setNeonateData('dob', e.target.value)}
                  />
                  {neonateErrors.dob && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.dob}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Gender</label>
                  <select
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                    value={neonateData.gender}
                    onChange={(e) => setNeonateData('gender', e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  {neonateErrors.gender && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.gender}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Birth Weight (kg)</label>
                  <input
                    required
                    type="number"
                    step="0.001"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.birthWeight}
                    onChange={(e) => setNeonateData('birthWeight', e.target.value)}
                  />
                  {neonateErrors.birthWeight && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.birthWeight}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Current Weight (kg)</label>
                  <input
                    required
                    type="number"
                    step="0.001"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.currentWeight}
                    onChange={(e) => setNeonateData('currentWeight', e.target.value)}
                  />
                  {neonateErrors.currentWeight && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.currentWeight}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Gestational Age (weeks)</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g. 36"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.gestationalAge}
                    onChange={(e) => setNeonateData('gestationalAge', e.target.value)}
                  />
                  {neonateErrors.gestationalAge && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.gestationalAge}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Mother's Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +254..."
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.motherPhone}
                    onChange={(e) => setNeonateData('motherPhone', e.target.value)}
                  />
                  {neonateErrors.motherPhone && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.motherPhone}</span>}
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Admission Diagnosis</label>
                <textarea
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-20 resize-none"
                  placeholder="Primary clinical observation (e.g. Prematurity, RDS, Neonatal Jaundice...)"
                  value={neonateData.admissionDiagnosis}
                  onChange={(e) => setNeonateData('admissionDiagnosis', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical History</label>
                <textarea
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-24 resize-none"
                  placeholder="Maternal history, APGAR scores, birth delivery context..."
                  value={neonateData.history}
                  onChange={(e) => setNeonateData('history', e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={neonateProcessing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01]"
              >
                Confirm Clinical Admission
              </button>

            </form>
          </div>
        </div>
      )}
      {/* Shift Handover Modal Dialog */}
      {isHandoverModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Record Shift Handover</h3>
                <p className="text-xs text-gray-500">Log clinical handover parameters, current vitals, commentary and plans.</p>
              </div>
              <button 
                onClick={() => setIsHandoverModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveHandover} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Select Neonate Patient</label>
                  <select
                    required
                    value={handoverData.neonateId}
                    onChange={(e) => setHandoverData('neonateId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select Neonate...</option>
                    {neonates.map((n) => (
                      <option key={n.id} value={n.id}>{n.name} ({n.hospitalNumber || n.hospital_number})</option>
                    ))}
                  </select>
                  {handoverErrors.neonateId && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.neonateId}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift Type</label>
                  <select
                    value={handoverData.shift}
                    onChange={(e) => setHandoverData('shift', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Night</option>
                  </select>
                  {handoverErrors.shift && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.shift}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical Lead / Pediatrician</label>
                  <select
                    value={handoverData.clinicalLeadId}
                    onChange={(e) => setHandoverData('clinicalLeadId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select Clinical Lead...</option>
                    {allUsers.filter(u => u.role === 'Consultant Pediatrician').map((u) => (
                      <option key={u.id} value={u.id}>Dr. {u.name}</option>
                    ))}
                  </select>
                  {handoverErrors.clinicalLeadId && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.clinicalLeadId}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Temperature (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 36.8"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.temperature}
                    onChange={(e) => setHandoverData('temperature', e.target.value)}
                  />
                  {handoverErrors.temperature && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.temperature}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Blood Sugar (mmol/L)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.sugarLevel}
                    onChange={(e) => setHandoverData('sugarLevel', e.target.value)}
                  />
                  {handoverErrors.sugarLevel && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.sugarLevel}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Oxygen Saturation SPO₂ (%)</label>
                  <input
                    type="number"
                    placeholder="e.g. 98"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.oxygenSaturation}
                    onChange={(e) => setHandoverData('oxygenSaturation', e.target.value)}
                  />
                  {handoverErrors.oxygenSaturation && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.oxygenSaturation}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    placeholder="e.g. 140"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.heartRate}
                    onChange={(e) => setHandoverData('heartRate', e.target.value)}
                  />
                  {handoverErrors.heartRate && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.heartRate}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Respiratory Rate (cpm)</label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.respiratoryRate}
                    onChange={(e) => setHandoverData('respiratoryRate', e.target.value)}
                  />
                  {handoverErrors.respiratoryRate && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.respiratoryRate}</span>}
                </div>

              </div>

              {/* Lab tests fields */}
              <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Lab Investigations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-wider block">Full Blood Count</label>
                    <input
                      type="text"
                      placeholder="e.g. Hb 14.5 g/dL"
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-250/20 dark:border-gray-700 rounded-lg outline-none text-xs font-bold text-gray-700 dark:text-gray-100"
                      value={handoverData.fbc}
                      onChange={(e) => setHandoverData('fbc', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-wider block">Renal (Kidney)</label>
                    <input
                      type="text"
                      placeholder="e.g. Normal"
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-250/20 dark:border-gray-700 rounded-lg outline-none text-xs font-bold text-gray-700 dark:text-gray-100"
                      value={handoverData.kidney}
                      onChange={(e) => setHandoverData('kidney', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-wider block">Hepatic (Liver)</label>
                    <input
                      type="text"
                      placeholder="e.g. Bilirubin 180"
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-250/20 dark:border-gray-700 rounded-lg outline-none text-xs font-bold text-gray-700 dark:text-gray-100"
                      value={handoverData.liver}
                      onChange={(e) => setHandoverData('liver', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical Commentary</label>
                <textarea
                  required
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-20 resize-none"
                  placeholder="Record feeding tolerance, ventilation support context, active lines, and general notes..."
                  value={handoverData.commentary}
                  onChange={(e) => setHandoverData('commentary', e.target.value)}
                />
                {handoverErrors.commentary && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.commentary}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical Plan & Intervention</label>
                <textarea
                  required
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-20 resize-none"
                  placeholder="Record target feed volume, infusion rate adjustments, photo-therapy settings, or monitoring frequency..."
                  value={handoverData.plan}
                  onChange={(e) => setHandoverData('plan', e.target.value)}
                />
                {handoverErrors.plan && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.plan}</span>}
              </div>

              <button
                type="submit"
                disabled={handoverProcessing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01]"
              >
                Save Handover Report
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Duty Rota Modal Dialog */}
      {isRotaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Schedule Duty Rota</h3>
                <p className="text-xs text-gray-500">Configure clinician shift allocations and nurse schedules.</p>
              </div>
              <button 
                onClick={() => setIsRotaModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveRota} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift Date</label>
                  <input
                    required
                    type="date"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                    value={rotaData.date}
                    onChange={(e) => setRotaData('date', e.target.value)}
                  />
                  {rotaErrors.date && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.date}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift Type</label>
                  <select
                    value={rotaData.shift}
                    onChange={(e) => setRotaData('shift', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Night</option>
                  </select>
                  {rotaErrors.shift && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.shift}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Consultant Pediatrician</label>
                  <select
                    value={rotaData.consultantId}
                    onChange={(e) => setRotaData('consultantId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select Consultant...</option>
                    {allUsers.filter(u => u.role === 'Consultant Pediatrician').map((u) => (
                      <option key={u.id} value={u.id}>Dr. {u.name}</option>
                    ))}
                  </select>
                  {rotaErrors.consultantId && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.consultantId}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift In-Charge / Sister</label>
                  <select
                    value={rotaData.managerId}
                    onChange={(e) => setRotaData('managerId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select In-Charge...</option>
                    {allUsers.filter(u => u.role === 'Nursing In-Charge').map((u) => (
                      <option key={u.id} value={u.id}>Sister {u.name}</option>
                    ))}
                  </select>
                  {rotaErrors.managerId && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.managerId}</span>}
                </div>

              </div>

              {/* Nurses multi selection */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Assign Shift Ward Nurses</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                  {allUsers.filter(u => u.role === 'Nurse' || u.role === 'CO Pediatrics / MO' || u.role === 'Student').map((u) => {
                    const isChecked = rotaData.assignedNurses.includes(u.id);
                    return (
                      <label key={u.id} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-750/30 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/60 select-none">
                        <input
                          type="checkbox"
                          className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          checked={isChecked}
                          onChange={() => {
                            const current = [...rotaData.assignedNurses];
                            const idx = current.indexOf(u.id);
                            if (idx > -1) {
                              current.splice(idx, 1);
                            } else {
                              current.push(u.id);
                            }
                            setRotaData('assignedNurses', current);
                          }}
                        />
                        <div className="text-[11px] font-bold">
                          <span className="text-gray-900 dark:text-white block leading-tight">{u.name}</span>
                          <span className="text-gray-450 text-[8px] font-black uppercase tracking-wider block mt-0.5">{u.role}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {rotaErrors.assignedNurses && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.assignedNurses}</span>}
              </div>

              <button
                type="submit"
                disabled={rotaProcessing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01]"
              >
                Publish Shift Schedule
              </button>

            </form>
          </div>
        </div>
      )}
      </div>
    </AppLayout>
  );
}
