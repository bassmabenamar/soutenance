import React from 'react';
import { 
  LayoutDashboard, BookOpen, HelpCircle, Terminal, 
  Code, User, Code2, Cpu, Database, ChevronRight, Layers
} from 'lucide-react';
import Sidebar from "../../components/layout/SidebarStudent";

const TPPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Sidebar (Branding: CodeBook Academy) --- */}
      <Sidebar 
  brandName="CodeLink"
  onLogout={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
/>
      {/* --- Main Content Area --- */}
      <main className="flex-1 p-12">
        
        {/* Header Section */}
        <header className="mb-12">
          <p className="text-[10px] font-black text-[#F97316] uppercase tracking-[0.2em] mb-2">Parcours d'apprentissage</p>
          <h2 className="text-4xl font-black text-slate-800 mb-4">Exercices Pratiques (TP)</h2>
          <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
            Relevez des défis techniques pour valider vos compétences et gagner de l'expérience concrète sur des projets réels.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          <FilterButton label="Tous les TP" active />
          <FilterButton label="JavaScript" />
          <FilterButton label="React.js" />
          <FilterButton label="Python" />
          <FilterButton label="Base de données" />
        </div>

        {/* TP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <TPCard 
            id="01"
            title="JS Loops & Logic"
            difficulty="Débutant"
            desc="Maîtrisez les structures itératives et la logique conditionnelle fondamentale en JavaScript moderne (ES6+)."
            stats="+1.2k complétés"
            icon={<Code2 size={18} className="text-orange-500" />}
          />
          <TPCard 
            id="02"
            title="Fetch API & Async"
            difficulty="Intermédiaire"
            diffColor="text-blue-500 bg-blue-50"
            desc="Apprenez à consommer des API REST, gérer les promesses et le traitement asynchrone avec async/await."
            stats="+850 complétés"
            icon={<Cpu size={18} className="text-blue-500" />}
          />
          <TPCard 
            id="03"
            title="Architecture React"
            difficulty="Avancé"
            diffColor="text-purple-500 bg-purple-50"
            desc="Mise en place d'une architecture robuste avec Context API et Custom Hooks pour des apps scalables."
            stats="+420 complétés"
            icon={<Layers size={18} className="text-purple-500" />}
          />
          <TPCard 
            id="04"
            title="JSON & Objets"
            difficulty="Débutant"
            desc="Manipulation des structures de données complexes et conversion JSON pour le stockage local."
            isNew
            icon={<Database size={18} className="text-orange-500" />}
          />
        </div>
      </main>
    </div>
  );
};

/* --- UI Sub-components --- */

const SidebarItem = ({ icon, label, active = false }) => (
  <div className="relative group px-2">
    {active && (
      <div className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-l-full shadow-[0_0_10px_#F97316]" />
    )}
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-orange-50/70 text-[#F97316] font-bold' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
    }`}>
      <span className={active ? 'text-[#F97316]' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

const FilterButton = ({ label, active = false }) => (
  <button className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
    active 
      ? 'bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-200' 
      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
  }`}>
    {label}
  </button>
);

const TPCard = ({ id, title, difficulty, desc, stats, icon, diffColor = "text-orange-500 bg-orange-50", isNew = false }) => (
  <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col group h-full">
    <div className="flex justify-between items-start mb-6">
      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${diffColor}`}>
        {difficulty}
      </div>
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
        {icon}
      </div>
    </div>

    <div className="flex-1">
      <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-[#F97316] transition-colors">
        TP {id}: {title}
      </h3>
      <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
        {desc}
      </p>
    </div>

    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">
        {isNew ? "Nouveau TP disponible" : stats}
      </span>
      <button className="bg-[#F97316] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center gap-2">
        Commencer le TP <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

export default TPPage;