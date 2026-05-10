import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Minus, Plus, Maximize2, 
  Download, Loader2, AlertCircle
} from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "../../components/layout/SidebarStudent";
import { tpService } from "../../services/api";

const TPDetail = () => {
  const { tpId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use tpId from URL params or navigation state
  const idToFetch =tpId;

  const [tp, setTp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
  const fetchTPDetails = async () => {
    try {
      setLoading(true);

      console.log("TP ID:", tpId);

      const res = await tpService.getOneTP(tpId);

      console.log("TP RESPONSE:", res);

      setTp(res);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  if (tpId) fetchTPDetails();
}, [tpId]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
      <Loader2 className="animate-spin text-[#F97316]" size={48} />
    </div>
  );

  if (!tp) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#f8fafc] text-slate-400">
      <AlertCircle size={48} className="mb-4" />
      <p className="font-bold">Travail Pratique introuvable.</p>
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
        
        {/* --- Toolbar Style CodeLink --- */}
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
                TP-{tp.id || '00'}: {tp.title}.pdf
              </h3>
              <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">
                {tp.category} — Énoncé Officiel
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
              
              <button className="p-1.5 hover:bg-white/10 rounded-lg"><Maximize2 size={18} /></button>
            </div>
          </div>
        </header>

        {/* --- CONTENT VIEWER --- */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-8 flex justify-center">
          <div 
            className="w-full max-w-5xl bg-white shadow-2xl min-h-screen relative transition-all duration-300 origin-top"
            style={{ transform: `scale(${zoom / 100})`, width: `${zoom}%` }}
          >
            {/* If TP has a PDF file from backend */}
            {tp.file_path ? (
              <iframe
                src={`http://localhost:8000/storage/${tp.file_path}#toolbar=0`}
                className="w-full h-full min-h-[1200px] border-none"
                title={tp.title}
              />
            ) : (
              /* Fallback: Manual Design for TP description if no PDF exists */
              <div className="p-16">
                 <span className="bg-[#F97316] text-white text-[10px] font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest inline-block">
                  Challenge {tp.difficulty || 'Niveau 1'}
                </span>
                <h2 className="text-5xl font-black text-slate-800 leading-tight mb-8">
                  Instructions: {tp.title}
                </h2>
                <div className="w-20 h-1.5 bg-[#F97316] rounded-full mb-12"></div>
                
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-500 leading-relaxed text-xl mb-8">
                    {tp.description}
                  </p>
                  
                  {/* Additional TP-specific details can go here */}
                  <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                    <h4 className="text-slate-800 font-black uppercase text-sm mb-4 tracking-wider">Objectifs du TP</h4>
                    <ul className="space-y-3 text-slate-500">
                       <li className="flex gap-3 items-start font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
                         Mise en pratique des concepts théoriques vus en cours.
                       </li>
                       <li className="flex gap-3 items-start font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
                         Validation des acquis techniques par la production de code.
                       </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Watermark */}
            <div className="absolute top-10 right-10 opacity-10 pointer-events-none select-none">
                <h1 className="text-6xl font-black rotate-45 text-slate-900 uppercase">CodeLink TP</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TPDetail;