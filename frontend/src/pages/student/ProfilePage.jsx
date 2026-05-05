import React from 'react';
import { 
  LayoutDashboard, BookOpen, HelpCircle, Terminal, 
  Code, User, Edit2, LogOut, Award, Shield, 
  Zap, Bug, Rocket, ChevronRight 
} from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Global Header (Consistent across Student Portal) --- */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <h1 className="text-[#F97316] text-xl font-black uppercase tracking-tighter">
            CodeBook Academy
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User Profile" />
        </div>
      </header>

      {/* --- Profile Content --- */}
      <main className="max-w-2xl mx-auto py-12 px-6 space-y-8">
        
        {/* Profile Header Card */}
        <section className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200">
               <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Alex Rivera" 
                className="w-full h-full object-cover"
               />
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-[#F97316] text-white rounded-full border-4 border-[#f8fafc] shadow-lg hover:scale-110 transition-transform">
              <Edit2 size={16} />
            </button>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-1">Alex Rivera</h2>
          <p className="text-slate-400 font-medium italic">alex.rivera@codebook.edu</p>
        </section>

        {/* Informations du Profil Card */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-orange-50 rounded-xl text-[#F97316]">
              <Shield size={20} />
            </div>
            <h3 className="font-black text-slate-800">Informations du Profil</h3>
          </div>
          
          <div className="space-y-6">
            <InfoRow label="Code d'accès" value="CB-992-KLR" isCode />
            <InfoRow label="ID Appareil" value="MAC: 00-1A-2B-3C-4D-5E" />
            <InfoRow label="Statut" value="Session Active" isStatus />
          </div>
        </div>

        {/* Progression Card */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Zap size={20} />
            </div>
            <h3 className="font-black text-slate-800">Progression</h3>
          </div>
          
          <div className="space-y-8 mb-10">
            <ProgressBar label="Maîtrise de JavaScript" progress={78} />
            <ProgressBar label="Architecture Backend" progress={45} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-3xl p-6 text-center border border-slate-100">
               <p className="text-3xl font-black text-blue-900 mb-1">12</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cours Complétés</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 text-center border border-slate-100">
               <p className="text-3xl font-black text-blue-900 mb-1">482</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">XP Accumulés</p>
            </div>
          </div>
        </div>

        {/* Badges Obtenus Card */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-xl text-yellow-600">
                <Award size={20} />
              </div>
              <h3 className="font-black text-slate-800">Badges Obtenus</h3>
            </div>
            <button className="text-[11px] font-black text-[#F97316] uppercase hover:underline">Voir tout</button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Badge icon={<Code size={20} />} label="Génie du Code" color="bg-orange-50 text-orange-500" />
            <Badge icon={<Zap size={20} />} label="Apprenti Rapide" color="bg-blue-50 text-blue-500" />
            <Badge icon={<Bug size={20} />} label="Chasseur de Bugs" color="bg-green-50 text-green-500" />
            <Badge icon={<Rocket size={20} />} label="Visionnaire" color="bg-purple-50 text-purple-500" />
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-white border border-slate-100 p-5 rounded-[24px] text-red-500 font-black flex items-center justify-center gap-3 hover:bg-red-50 transition-colors shadow-sm">
          <LogOut size={20} />
          Déconnexion de la session
        </button>

      </main>
    </div>
  );
};

/* --- Helper Components --- */

const InfoRow = ({ label, value, isCode = false, isStatus = false }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{label}</span>
    {isStatus ? (
      <span className="bg-orange-50 text-[#F97316] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
        {value}
      </span>
    ) : (
      <span className={`text-sm font-bold ${isCode ? 'text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded' : 'text-slate-600'}`}>
        {value}
      </span>
    )}
  </div>
);

const ProgressBar = ({ label, progress }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <span className="text-sm font-black text-[#F97316]">{progress}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-[#F97316] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.3)] transition-all duration-1000" 
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const Badge = ({ icon, label, color }) => (
  <div className="flex flex-col items-center gap-3 group cursor-pointer">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-white group-hover:scale-110 transition-transform ${color}`}>
      {icon}
    </div>
    <span className="text-[9px] font-black text-slate-400 text-center leading-tight uppercase">
      {label}
    </span>
  </div>
);

export default ProfilePage;