import React from 'react';
import { 
  LayoutDashboard, BookOpen, HelpCircle, Terminal, 
  Code, User, ChevronLeft, ChevronRight, Minus, 
  Plus, Maximize2, Download, Search
} from 'lucide-react';

const CourseDetail = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-700 overflow-hidden">
      
      {/* --- Sidebar (CodeBook Academy Branding) --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 shrink-0 shadow-sm z-20">
        <div className="px-4 mb-10">
          <h1 className="text-[#F97316] text-2xl font-black leading-tight">
            CodeBook<br />Academy
          </h1>
        </div>
        
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Tableau de bord" />
          <SidebarItem icon={<BookOpen size={20} />} label="Cours" active />
          <SidebarItem icon={<HelpCircle size={20} />} label="Quiz (QCM)" />
          <SidebarItem icon={<Terminal size={20} />} label="Travaux Pratiques" />
          <SidebarItem icon={<Code size={20} />} label="CodeLab" />
          <SidebarItem icon={<User size={20} />} label="Profil" />
        </nav>

        {/* Bottom Progression Widget */}
        <div className="mt-auto p-5 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Progression</p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="w-[65%] h-full bg-[#F97316] rounded-full shadow-[0_0_8px_#F97316]/30"></div>
          </div>
          <p className="text-[10px] font-bold text-slate-500">65% du module complété</p>
        </div>
      </aside>

      {/* --- Main PDF Viewer Area --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* PDF Top Toolbar */}
        <header className="h-14 bg-[#F97316] flex items-center justify-between px-6 shrink-0 text-white shadow-lg z-10">
          <div className="flex items-center gap-4">
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex flex-col">
              <h3 className="text-xs font-black leading-tight truncate max-w-md">
                Introduction à l'Architecture Microservices.pdf
              </h3>
              <p className="text-[9px] font-bold opacity-70 uppercase tracking-tighter">
                Contenu Sécurisé — Lecture Seule
              </p>
            </div>
          </div>

          {/* Controls: Page, Zoom, View */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 bg-black/10 px-3 py-1 rounded-lg border border-white/10">
               <button className="p-1 hover:text-orange-200"><ChevronLeft size={14} /></button>
               <span className="text-[11px] font-bold mx-2">Page 1/24</span>
               <button className="p-1 hover:text-orange-200"><ChevronRight size={14} /></button>
            </div>

            <div className="flex items-center gap-4 border-l border-white/20 pl-8">
              <div className="flex items-center gap-3">
                <Minus size={16} className="cursor-pointer hover:text-orange-200" />
                <span className="text-[11px] font-black w-8 text-center">100%</span>
                <Plus size={16} className="cursor-pointer hover:text-orange-200" />
              </div>
              <button className="p-1.5 hover:bg-white/10 rounded-lg"><Search size={18} /></button>
              <button className="p-1.5 hover:bg-white/10 rounded-lg"><Maximize2 size={18} /></button>
              <button className="p-1.5 hover:bg-white/10 rounded-lg"><Download size={18} /></button>
            </div>
          </div>
        </header>

        {/* Scrollable PDF Content */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-8 flex justify-center">
          <div className="w-full max-w-4xl bg-white shadow-2xl min-h-[1200px] p-16 relative">
            
            {/* PDF Header Mockup */}
            <div className="flex flex-col items-start mb-20">
              <span className="bg-[#F97316] text-white text-[10px] font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
                Module 04
              </span>
              <h2 className="text-5xl font-black text-slate-800 leading-tight mb-4">
                Architecture des Microservices :<br />
                Fondamentaux et Design Patterns
              </h2>
              <div className="w-20 h-1.5 bg-[#F97316] rounded-full"></div>
            </div>

            {/* Content Mockup */}
            <div className="space-y-12">
              <h3 className="text-2xl font-black text-slate-700">1. Pourquoi les Microservices ?</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                Contrairement à l'architecture monolithique traditionnelle, l'architecture en microservices décompose une application en composants autonomes, favorisant la scalabilité et l'agilité...
              </p>

              {/* Code Snippet in PDF */}
              <div className="bg-[#111827] rounded-xl p-8 font-mono text-sm shadow-xl border border-slate-800">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <p className="text-slate-500 italic mb-2">// Exemple de définition de service</p>
                <p className="text-purple-400">@SpringBootApplication</p>
                <p className="text-blue-400">public class <span className="text-white">OrderServiceApplication</span> {'{'}</p>
                <p className="text-blue-400 ml-6">public static void <span className="text-white">main</span>(String[] args) {'{'}</p>
                <p className="text-white ml-12">SpringApplication.run(OrderService.class, args);</p>
                <p className="text-blue-400 ml-6">{'}'}</p>
                <p className="text-blue-400">{'}'}</p>
              </div>
            </div>

            {/* PDF Footer Mockup */}
            <div className="absolute bottom-12 left-16 right-16 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <span>© 2026 CodeBook Academy</span>
              <span>Document ID: CBA-MS-004-SEC</span>
              <span>Page 1/24</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Helper Components --- */

const SidebarItem = ({ icon, label, active = false }) => (
  <div className="relative group">
    {active && (
      <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-r-full shadow-[0_0_10px_#F97316]" />
    )}
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-orange-50/70 text-[#F97316] font-bold' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
    }`}>
      <span className={active ? 'text-[#F97316]' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

export default CourseDetail;