import React, { useState, useEffect } from 'react';
import { 
  Code2, Cpu, Database, ChevronRight, Layers, Loader2 
} from 'lucide-react';
import Sidebar from "../../components/layout/SidebarStudent";
import { tpService } from "../../services/api"; // Import our new service
import { useNavigate } from 'react-router-dom';
const TPPage = () => {
  const [tps, setTps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Tous les TP");
  const navigate= useNavigate();
  const categories = [
  "Tous les TP",
  "HTML",
  "CSS",
  "JavaScript",

];

  // Mapping icons to string types coming from Backend
  const iconMap = {
    javascript: <Code2 size={18} className="text-orange-500" />,
    react: <Layers size={18} className="text-purple-500" />,
    python: <Cpu size={18} className="text-blue-500" />,
    database: <Database size={18} className="text-orange-500" />
  };

  useEffect(() => {
    fetchTPs();
  }, [activeFilter]);

  const fetchTPs = async () => {
    try {
      setLoading(true);
      const categoryParam = activeFilter === "Tous les TP" ? "" : activeFilter;
      const response = await tpService.getAllTPs(categoryParam);

console.log("TP RESPONSE:", response);

setTps(response.tps || []);
    } catch (error) {
      console.error("Erreur lors du chargement des TP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTP = async (id) => {
    try {
      await tpService.startTP(id);
      navigate(`/student/tps/${id}`);// Redirect to workspace
    } catch (error) {
      alert("Impossible de démarrer ce TP pour le moment.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      <Sidebar 
        brandName="CodeLink"
        onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />
      
      <main className="flex-1 p-12">
        <header className="mb-12">
          <p className="text-[10px] font-black text-[#F97316] uppercase tracking-[0.2em] mb-2">Parcours d'apprentissage</p>
          <h2 className="text-4xl font-black text-slate-800 mb-4">Exercices Pratiques (TP)</h2>
          <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
            Relevez des défis techniques pour valider vos compétences et gagner de l'expérience concrète.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          {categories.map(cat => (
            <FilterButton 
              key={cat}
              label={cat} 
              active={activeFilter === cat} 
              onClick={() => setActiveFilter(cat)}
            />
          ))}
        </div>

        {/* Loading State or Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-medium">Chargement de vos défis...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tps.map((tp) => (
              <TPCard 
                key={tp.id}
                id={tp.id || "00"}
                title={tp.title}
                difficulty={tp.difficulty}
                diffColor={tp.difficultyColor} // Expecting "text-blue-500 bg-blue-50" from DB
                desc={tp.description}
                stats={`${tp.completedCount} complétés`}
                icon={
  iconMap[tp.category?.toLowerCase()] || <Code2 size={18} />
}
                isNew={tp.isNewTP}
                onStart={() => handleStartTP(tp.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

/* --- Updated Sub-components --- */

const FilterButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
      active 
        ? 'bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-200' 
        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
    }`}
  >
    {label}
  </button>
);

const TPCard = ({ id, title, difficulty, desc, stats, icon, diffColor, isNew, onStart }) => (
  <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col group h-full">
    <div className="flex justify-between items-start mb-6">
      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${diffColor || "text-orange-500 bg-orange-50"}`}>
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
      <button 
        onClick={onStart}
        className="bg-[#F97316] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center gap-2"
      >
        Commencer <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

export default TPPage;