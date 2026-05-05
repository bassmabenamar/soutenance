import React from 'react';
import { 
  LayoutDashboard, BookOpen, HelpCircle, Terminal, 
  Code, User, Trophy, Clock, TrendingUp, ChevronRight,
  Target, Zap, Rocket
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Sidebar (CodeBook Academy Branding) --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 shrink-0">
        <div className="px-4 mb-10">
          <h1 className="text-[#F97316] text-2xl font-black leading-tight">
            CodeBook<br />Academy
          </h1>
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Tableau de bord" active />
          <SidebarItem icon={<BookOpen size={20} />} label="Cours" />
          <SidebarItem icon={<HelpCircle size={20} />} label="Quiz (QCM)" />
          <SidebarItem icon={<Terminal size={20} />} label="Travaux Pratiques" />
          <SidebarItem icon={<Code size={20} />} label="CodeLab" />
          <SidebarItem icon={<User size={20} />} label="Profil" />
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Top Header Section */}
        <header className="py-10 px-12 flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-black text-slate-800 flex items-center gap-3">
              Bienvenue étudiant 👋
            </h2>
            <p className="text-slate-400 mt-2 font-medium">Prêt à continuer votre apprentissage aujourd'hui ?</p>
          </div>
          
          {/* Global Progress Widget */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-8 w-80">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progression globale</span>
                <span className="text-[#F97316] font-black text-lg">38%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[38%] h-full bg-[#F97316] rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* --- Course Modules Grid --- */}
        <section className="px-12 mb-12">
          <div className="grid grid-cols-4 gap-6">
            <ModuleCard title="HTML5" progress={95} tag="Presque fini" color="bg-orange-500" />
            <ModuleCard title="CSS Modern" progress={45} tag="En cours" color="bg-blue-500" />
            <ModuleCard title="JavaScript ES6" progress={12} tag="Débutant" color="bg-yellow-500" />
            <ModuleCard title="Bootstrap 5" progress={0} tag="Pas commencé" color="bg-slate-200" />
          </div>
        </section>

        <div className="px-12 flex gap-10 pb-12">
          
          {/* --- Activity Feed (Left Column) --- */}
          <div className="flex-[1.5]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-800">Activité récente</h3>
              <button className="text-[#F97316] font-bold text-sm hover:underline">Voir tout</button>
            </div>
            
            <div className="space-y-4">
              <ActivityItem 
                icon={<Trophy className="text-orange-500" size={18} />} 
                title="Quiz réussi : Flexbox Mastery" 
                subtitle="Score : 18/20 • Il y a 2 heures" 
                points="+50 XP"
                pointsColor="text-green-500"
              />
              <ActivityItem 
                icon={<BookOpen className="text-blue-500" size={18} />} 
                title="Cours terminé : Sélecteurs CSS" 
                subtitle="Module : CSS Modern • Hier" 
                points="+120 XP"
                pointsColor="text-green-500"
              />
              <ActivityItem 
                icon={<Zap className="text-purple-500" size={18} />} 
                title="Nouveau défi CodeLab débloqué" 
                subtitle="Algorithmes de base • Il y a 2 jours" 
                action="Démarrer"
              />
            </div>
          </div>

          {/* --- Statistics & Certs (Right Column) --- */}
          <div className="flex-1 space-y-8">
            <h3 className="text-2xl font-black text-slate-800">Statistiques</h3>
            
            {/* Learning Time Card */}
            <div className="bg-[#1e3a8a] rounded-[32px] p-8 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Temps d'apprentissage</p>
                <div className="text-4xl font-black mb-4">24h 45m</div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold">
                  <TrendingUp size={12} /> +12% cette semaine
                </div>
              </div>
              <Target className="absolute -right-4 -bottom-4 text-white/5" size={140} />
            </div>

            {/* In-Progress Certifications */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Certifications en cours</p>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Rocket className="text-orange-500" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">Frontend Developer</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Module 3 sur 5 complété</p>
                </div>
              </div>
              <button className="w-full mt-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                Voir le parcours
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-12 w-14 h-14 bg-[#F97316] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/40 cursor-pointer hover:scale-110 transition-transform">
        <Rocket size={24} />
      </div>
    </div>
  );
};

/* --- UI Components --- */

const SidebarItem = ({ icon, label, active = false }) => (
  <div className="relative group px-2">
    {active && (
      <div className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-l-full shadow-[0_0_10px_#F97316]" />
    )}
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-orange-50/70 text-[#F97316] font-bold shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
    }`}>
      <span className={active ? 'text-[#F97316]' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

const ModuleCard = ({ title, progress, tag, color }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-8">
      <div className={`w-10 h-10 ${color} rounded-xl shadow-inner opacity-20 group-hover:opacity-100 transition-opacity`}></div>
      <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${progress > 0 ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
        {tag}
      </span>
    </div>
    <h4 className="text-xl font-black text-slate-800 mb-6">{title}</h4>
    <div className="flex justify-between items-center mb-2">
       <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mr-3">
         <div className={`h-full ${color} rounded-full`} style={{ width: `${progress}%` }}></div>
       </div>
       <span className="text-[11px] font-black text-slate-400">{progress}%</span>
    </div>
  </div>
);

const ActivityItem = ({ icon, title, subtitle, points, pointsColor, action }) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5 hover:bg-slate-50/50 transition-all cursor-pointer">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-black text-slate-800">{title}</p>
      <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
    </div>
    {points && <span className={`text-sm font-black ${pointsColor}`}>{points}</span>}
    {action && (
      <button className="bg-[#F97316] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">
        {action}
      </button>
    )}
  </div>
);

export default DashboardPage;