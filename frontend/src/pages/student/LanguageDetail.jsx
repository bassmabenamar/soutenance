import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Minus, Plus, Maximize2, 
  Download, Search, Loader2, AlertCircle, ArrowLeft
} from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api";

const LanguageDetail = () => {
  const { languageId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // On récupère les détails du cours spécifique
        const res = await API.get(`/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Erreur de chargement du PDF:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourseDetails();
  }, [courseId]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
      <Loader2 className="animate-spin text-[#F97316]" size={48} />
    </div>
  );

  if (!course) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#f8fafc] text-slate-400">
      <AlertCircle size={48} className="mb-4" />
      <p className="font-bold">Cours introuvable ou ID manquant.</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-[#F97316] font-black">Retour</button>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-700 overflow-hidden">
      <Sidebar brandName="CodeLink" onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
      }} />

      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* PDF Top Toolbar - Style CodeLink */}
        <header className="h-14 bg-[#F97316] flex items-center justify-between px-6 shrink-0 text-white shadow-lg z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex flex-col">
              <h3 className="text-xs font-black leading-tight truncate max-w-md uppercase tracking-tighter">
                {course.title}.pdf
              </h3>
              <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">
                {course.category} — Contenu Sécurisé
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 bg-black/10 px-3 py-1 rounded-lg border border-white/10">
               <button className="p-1 hover:text-orange-200"><ChevronLeft size={14} /></button>
               <span className="text-[11px] font-bold mx-2 tracking-widest uppercase">Page 1 / 1</span>
               <button className="p-1 hover:text-orange-200"><ChevronRight size={14} /></button>
            </div>

            <div className="flex items-center gap-4 border-l border-white/20 pl-8">
              <div className="flex items-center gap-3">
                <Minus size={16} className="cursor-pointer hover:text-orange-200" onClick={() => setZoom(z => Math.max(50, z-10))} />
                <span className="text-[11px] font-black w-8 text-center">{zoom}%</span>
                <Plus size={16} className="cursor-pointer hover:text-orange-200" onClick={() => setZoom(z => Math.min(200, z+10))} />
              </div>
              <button className="p-1.5 hover:bg-white/10 rounded-lg hidden sm:block"><Download size={18} /></button>
              <button className="p-1.5 hover:bg-white/10 rounded-lg"><Maximize2 size={18} /></button>
            </div>
          </div>
        </header>

        {/* --- PDF VIEWER --- */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-8 flex justify-center">
          <div 
            className="w-full max-w-5xl bg-white shadow-2xl min-h-screen relative transition-all duration-300 origin-top"
            style={{ transform: `scale(${zoom / 100})`, width: `${zoom}%` }}
          >
            {/* Si vous avez un fichier PDF réel, utilisez une iframe ou un viewer */}
            {course.pdf_url ? (
              <iframe 
                src={`${course.pdf_url}#toolbar=0`} 
                className="w-full h-full min-h-[1200px]"
                title={course.title}
              />
            ) : (
              /* Fallback style PDF si pas de fichier */
              <div className="p-16">
                 <span className="bg-[#F97316] text-white text-[10px] font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest inline-block">
                  Module {course.module_number || '01'}
                </span>
                <h2 className="text-5xl font-black text-slate-800 leading-tight mb-8">
                  {course.title}
                </h2>
                <div className="w-20 h-1.5 bg-[#F97316] rounded-full mb-12"></div>
                <p className="text-slate-500 leading-relaxed text-xl mb-8">
                  {course.description}
                </p>
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-center italic text-slate-400">
                  Le contenu détaillé de ce module est en cours de génération...
                </div>
              </div>
            )}

            {/* Floating Protection Tag */}
            <div className="absolute top-10 right-10 opacity-10 pointer-events-none select-none">
                <h1 className="text-6xl font-black rotate-45 text-slate-900 uppercase">CodeLink Secure</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LanguageDetail;