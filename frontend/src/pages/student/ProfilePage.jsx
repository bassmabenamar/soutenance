import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit2, LogOut, Award, Shield, 
  Zap, Bug, Rocket, Code, Loader2,
  Cpu, Activity
} from 'lucide-react';

// Import de votre instance API et de la Sidebar
import API from "../../services/api";
import Sidebar from '../../components/layout/SidebarStudent';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- APPEL BACKEND ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Utilisation de votre service API personnalisé
        const res = await API.get('/student/profile');
        setUser(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil", error);
        // Fallback data si l'API ne répond pas encore
        setUser(mockUser);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
      <Loader2 className="animate-spin text-orange-500" size={40} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      {/* 1. Sidebar Fixe */}
      <Sidebar />

      {/* 2. Contenu Principal - ml-64 pour laisser la place à la Sidebar */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 ml-6 py-12 px-10 space-y-8"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Profil */}
          <section className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden bg-slate-200 rotate-3 transition-transform hover:rotate-0 duration-500">
                 <img 
                  src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                  alt={user?.name} 
                  className="w-full h-full object-cover -rotate-3 hover:rotate-0 duration-500"
                 />
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-[#F97316] text-white rounded-2xl border-4 border-[#f8fafc] shadow-lg hover:scale-110 transition-all">
                <Edit2 size={18} />
              </button>
            </div>
            <h2 className="text-4xl font-[1000] text-slate-800 mb-1 tracking-tighter">{user?.name}</h2>
            <p className="text-slate-400 font-bold italic">{user?.email}</p>
          </section>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Infos Techniques */}
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-50 rounded-xl text-[#F97316]">
                  <Shield size={20} />
                </div>
                <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight">Sécurité & Accès</h3>
              </div>
              <InfoRow label="Access Key" value={user?.access_code} isCode icon={<Shield size={14}/>} />
              <InfoRow label="Machine ID" value={user?.device_id} icon={<Cpu size={14}/>} />
              <InfoRow label="Statut" value={user?.is_active ? "En ligne" : "Hors ligne"} isStatus icon={<Activity size={14}/>} />
            </div>

            {/* Badges */}
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-50 rounded-xl text-yellow-600">
                    <Award size={20} />
                  </div>
                  <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight">Succès Obtenus</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {user?.badges?.slice(0, 3).map((badge, i) => (
                  <Badge key={i} icon={getBadgeIcon(badge.type)} label={badge.name} color={badge.color} />
                ))}
              </div>
            </div>
          </div>

          {/* Progression Card */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                <Zap size={20} />
              </div>
              <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight">Analytiques de Progression</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                {user?.skills?.map((skill, i) => (
                  <ProgressBar key={i} label={skill.name} progress={skill.level} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatBox value={user?.stats?.completed_courses} label="Cours Finis" />
                <StatBox value={user?.stats?.xp} label="XP Accumulés" />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            className="w-full bg-white border border-red-100 text-red-500 p-6 rounded-[32px] font-black flex items-center justify-center gap-3 hover:bg-red-50 transition-all group shadow-sm"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Mettre fin à la session sécurisée
          </button>
        </div>
      </motion.main>
    </div>
  );
};

/* --- LOGIQUE D'ICÔNES --- */
const getBadgeIcon = (type) => {
  switch(type) {
    case 'code': return <Code size={18} />;
    case 'speed': return <Zap size={18} />;
    case 'bug': return <Bug size={18} />;
    default: return <Rocket size={18} />;
  }
};

/* --- Sous-composants Helper --- */

const InfoRow = ({ label, value, isCode, isStatus, icon }) => (
  <div className="flex items-center justify-between group py-1">
    <div className="flex items-center gap-2 text-slate-300 group-hover:text-slate-500 transition-colors">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    {isStatus ? (
      <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-[10px] font-black text-green-700 uppercase">{value}</span>
      </div>
    ) : (
      <span className={`text-xs font-bold ${isCode ? 'font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg' : 'text-slate-600'}`}>
        {value}
      </span>
    )}
  </div>
);

const ProgressBar = ({ label, progress }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{label}</span>
      <span className="text-xs font-black text-orange-500">{progress}%</span>
    </div>
    <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" 
      />
    </div>
  </div>
);

const StatBox = ({ value, label }) => (
  <div className="bg-slate-50/50 rounded-[28px] p-6 text-center border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
    <p className="text-3xl font-[1000] text-slate-800 mb-1 tracking-tighter">{value}</p>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);

const Badge = ({ icon, label, color }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shadow-sm border-2 border-white group-hover:scale-110 transition-transform duration-300 ${color}`}>
      {icon}
    </div>
    <span className="text-[9px] font-black text-slate-400 text-center uppercase tracking-tighter leading-none">{label}</span>
  </div>
);

const mockUser = {
  name: "Alex Rivera",
  email: "alex.rivera@codebook.edu",
  access_code: "CB-992-KLR",
  device_id: "MAC: 00-1A-2B",
  is_active: true,
  stats: { completed_courses: 12, xp: 482 },
  skills: [
    { name: "JavaScript", level: 78 },
    { name: "Architecture Backend", level: 45 }
  ],
  badges: [
    { name: "Génie", type: "code", color: "bg-orange-50 text-orange-500" },
    { name: "Rapide", type: "speed", color: "bg-blue-50 text-blue-500" },
    { name: "Chasseur", type: "bug", color: "bg-green-50 text-green-500" }
  ]
};

export default ProfilePage;