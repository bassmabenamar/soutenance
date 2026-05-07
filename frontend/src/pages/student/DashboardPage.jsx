import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Trophy, TrendingUp, Rocket, Loader2, 
  Target, ChevronRight, Zap
} from 'lucide-react';
import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api"; // Votre instance Axios configurée

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Appel à votre backend Laravel
        const response = await API.get('/student/dashboard'); 
        setData(response.data);
      } catch (err) {
        console.error("Erreur de chargement du dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-[#F97316] animate-spin" size={48} />
          <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Initialisation du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      <Sidebar 
        brandName="CodeLink"
        onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />

      <main className="flex-1 overflow-y-auto">
        {/* --- HEADER SECTION --- */}
        <header className="py-10 px-12 flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-black text-slate-800 flex items-center gap-3">
              Bienvenue 👋
            </h2>
            <p className="text-slate-400 mt-2 font-medium">Continuez votre parcours d'expert aujourd'hui.</p>
          </div>
          
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-8 w-85">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progression globale</span>
                <span className="text-[#F97316] font-black text-lg">{data?.stats?.globalProgress || 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#F97316] rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${data?.stats?.globalProgress || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC MODULES GRID --- */}
        <section className="px-12 mb-12">
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            Vos modules <Zap size={20} className="text-[#F97316]" fill="currentColor" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.courses?.map((course, i) => (
              <ModuleCard 
                key={course.id || i}
                title={course.title} 
                progress={course.progress || 0} 
                tag={course.tag || "Module"} 
                color={course.color || "bg-blue-500"} 
                onClick={() => window.location.href = `/student/course/${course.id}`}
              />
            ))}
          </div>
        </section>

        <div className="px-12 flex flex-col lg:flex-row gap-10 pb-12">
          {/* --- RECENT ACTIVITIES --- */}
          <div className="flex-[1.5]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-800">Activité récente</h3>
              <button className="text-[#F97316] font-bold text-sm hover:underline flex items-center gap-1">
                Historique <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {data?.activities?.length > 0 ? (
                data.activities.map((act, i) => (
                  <ActivityItem 
                    key={i}
                    icon={act.type === 'quiz' ? <Trophy className="text-orange-500" size={18} /> : <BookOpen className="text-blue-500" size={18} />} 
                    title={act.title} 
                    subtitle={`${act.subtitle} • ${act.time}`} 
                    xp={act.xp}
                  />
                ))
              ) : (
                <div className="p-10 border-2 border-dashed border-slate-200 rounded-[32px] text-center text-slate-400 font-bold">
                  Aucune activité récente. Commencez un cours !
                </div>
              )}
            </div>
          </div>

          {/* --- SIDEBAR STATS --- */}
          <div className="flex-1 space-y-8">
            <h3 className="text-2xl font-black text-slate-800">Statistiques</h3>
            
            {/* Learning Time Card */}
            <div className="bg-[#1e3a8a] rounded-[32px] p-8 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Temps d'apprentissage</p>
                <div className="text-4xl font-black mb-4 group-hover:scale-105 transition-transform origin-left duration-500">
                  {data?.stats?.learningTime || "0h"}
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold">
                  <TrendingUp size={12} className="text-green-400" /> 
                  <span className="text-green-400">{data?.stats?.weeklyTrend || "0%"}</span> cette semaine
                </div>
              </div>
              <Target className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors" size={140} />
            </div>

            {/* Certification Card */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Certification cible</p>
              <div className="flex items-center gap-4 p-5 rounded-[24px] bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Rocket className="text-[#F97316]" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">Frontend Expert</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Module {data?.stats?.currentModule || 0} sur 5
                  </p>
                </div>
              </div>
              <button className="w-full mt-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-300">
                Détails du parcours
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-12 w-16 h-16 bg-[#F97316] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/40 cursor-pointer hover:scale-110 hover:-rotate-6 transition-all duration-300 z-50">
        <Rocket size={28} />
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const ModuleCard = ({ title, progress, tag, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all group cursor-pointer relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-full group-hover:scale-150 transition-transform duration-700`} />
    
    <div className="flex justify-between items-start mb-10">
      <div className={`w-10 h-10 ${color} rounded-xl shadow-inner opacity-20 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${progress > 0 ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
        {tag}
      </span>
    </div>
    
    <h4 className="text-xl font-black text-slate-800 mb-6 leading-tight group-hover:text-[#F97316] transition-colors">{title}</h4>
    
    <div className="flex justify-between items-center mb-2">
       <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mr-3">
         <div 
          className={`h-full ${color.replace('bg-', 'bg-')} rounded-full transition-all duration-1000 ease-in-out`} 
          style={{ width: `${progress}%` }}
         ></div>
       </div>
       <span className="text-[11px] font-black text-slate-400">{progress}%</span>
    </div>
  </div>
);

const ActivityItem = ({ icon, title, subtitle, xp }) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-white transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-black text-slate-800 group-hover:text-[#F97316] transition-colors">{title}</p>
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">{subtitle}</p>
    </div>
    {xp && (
      <div className="flex flex-col items-end">
        <span className="text-xs font-black text-green-500">+{xp} XP</span>
        <div className="w-8 h-1 bg-green-100 rounded-full mt-1"></div>
      </div>
    )}
  </div>
);

export default DashboardPage;