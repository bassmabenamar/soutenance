
import React, { useState, useEffect } from 'react';
import { 
  Globe, Layout, Zap, Box, 
  Sparkles, ArrowRight, Loader2 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api"; // Utilisation de votre instance API

// Mapping pour transformer les chaînes de caractères du backend en composants Lucide
const ICON_MAP = {
  Globe: Globe,
  Layout: Layout,
  Zap: Zap,
  Box: Box,
};

const CoursesPage = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await API.get('/languages'); // Remplacez par votre route réelle
        setLanguages(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des langages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      <Sidebar brandName="CodeLink" onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
      }} />

      <main className="flex-1 overflow-y-auto">
        <header className="px-12 pt-16 pb-8">
          <span className="bg-orange-100 text-[#F97316] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
            Catalogue de formation
          </span>
          <h2 className="text-5xl font-black text-slate-800 mt-6 mb-4 flex items-center gap-4">
            Que voulez-vous apprendre ? <Sparkles className="text-[#F97316]" fill="currentColor" />
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-2xl">
            Choisissez un langage pour explorer les modules, les projets pratiques et obtenir votre certification CodeLink.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="text-[#F97316] animate-spin" size={48} />
            <p className="text-slate-400 font-bold animate-pulse">Chargement du catalogue...</p>
          </div>
        ) : (
          <div className="px-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
            {languages.map((lang) => (
              <LanguageCard 
                key={lang.id}
                {...lang}
                iconName={lang.icon_name} // On passe le nom de l'icône reçu
                onClick={() => navigate(`/student/language/${lang.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

/* --- Component: LanguageCard --- */
const LanguageCard = ({ title, subtitle, description, iconName, color, stats, level, onClick }) => {
  // Sélection de l'icône dynamique ou Globe par défaut
  const IconComponent = ICON_MAP[iconName] || Globe;

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white p-2 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-10">
          <div className="p-5 bg-slate-50 rounded-[24px] shadow-inner group-hover:bg-white transition-colors duration-500">
            <IconComponent size={28} className="text-[#F97316]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 px-4 py-2 rounded-full group-hover:border-slate-200">
            {level}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl font-black text-slate-800 group-hover:text-[#F97316] transition-colors">
            {title}
          </h3>
          <p className="text-[#F97316] font-bold text-xs uppercase tracking-widest">
            {subtitle}
          </p>
          <p className="text-slate-400 font-medium leading-relaxed text-sm pt-2">
            {description}
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="text-[11px] font-black text-slate-300 uppercase tracking-tighter">
            {stats}
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-black text-sm group-hover:translate-x-2 transition-transform">
            Explorer <ArrowRight size={18} className="text-[#F97316]" />
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
};

export default CoursesPage;