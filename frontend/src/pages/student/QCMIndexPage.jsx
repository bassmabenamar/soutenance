import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Globe, Smartphone, Database, Palette, 
  ChevronRight, Sparkles, Loader2, HelpCircle 
} from 'lucide-react';
import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api"; // Votre instance Axios

// Mapping pour transformer les strings de la DB en icônes
const ICON_MAP = { Globe, Smartphone, Database, Palette };

const QCMIndexPage = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
useEffect(() => {
  const fetchQuizLanguages = async () => {
    try {
      const response = await API.get('/student/qcm/languages'); 

      console.log("QCM LANGUAGES RESPONSE:", response.data);

      setLanguages(response.data);
    } catch (err) {
      console.error("Erreur chargement QCM:", err);
      setLanguages([]); // IMPORTANT
    } finally {
      setLoading(false);
    }
  };

  fetchQuizLanguages();
}, []);
  const filteredLanguages = languages.filter(lang =>
  lang?.title?.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      <Sidebar brandName="CodeLink" onLogout={() => {}} />

      <main className="flex-1 overflow-y-auto">
        <header className="px-12 pt-12 pb-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-800 flex items-center gap-3">
                Centre de Quiz <HelpCircle className="text-[#F97316]" />
              </h2>
              <p className="text-slate-400 mt-2 font-medium">Sélectionnez un langage pour tester vos connaissances.</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F97316] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher un langage..."
                className="w-full bg-white border border-gray-100 py-4 pl-14 pr-6 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-200 transition-all font-medium text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="text-[#F97316] animate-spin" size={40} />
          </div>
        ) : (
          <div className="px-12 grid grid-cols-2 gap-8 pb-20">
            {filteredLanguages.map((lang) => (
              <QuizLanguageCard 
                key={lang.id}
                {...lang}
                // Redirige vers le quiz spécifique : /student/qcm/html
                onClick={() => navigate(`/student/qcm/${lang.id}`)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const QuizLanguageCard = ({
  title,
  count = 0,
  icon_name,
  color = "bg-orange-500", // default
  onClick
}) => {
  const IconComponent = ICON_MAP[icon_name] || Globe;

  return (
    <div 
      onClick={onClick}
      className="group bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer relative overflow-hidden"
    >
      <div className={`absolute -right-10 -top-10 w-40 h-40 ${color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`} />
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="p-4 bg-slate-50 rounded-2xl shadow-inner group-hover:bg-white transition-colors">
          <IconComponent size={24} className={color.replace('bg-', 'text-') || 'text-slate-500'} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
          {count} Questions
        </span>
      </div>

      <h3 className="text-2xl font-black text-slate-800 mb-8 group-hover:text-[#F97316] transition-colors">
        {title}
      </h3>

      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase text-slate-300 tracking-tighter">Dernier score</span>
          <span className="text-xs font-bold text-slate-600">N/A</span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center group-hover:bg-[#F97316] transition-all shadow-lg">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default QCMIndexPage;