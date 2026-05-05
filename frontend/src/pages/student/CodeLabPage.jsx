import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, HelpCircle, Terminal, 
  Code, User, RotateCcw, Play, Save, ChevronRight, 
  FileJson, FileCode, Hash, Globe
} from 'lucide-react';

const CodeLabPage = () => {
  const [activeTab, setActiveTab] = useState('index.html');

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700 overflow-hidden">
      
      {/* --- Sidebar (CodeBook Academy Branding) --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 shrink-0">
        <div className="px-4 mb-10">
          <h1 className="text-[#F97316] text-2xl font-black leading-tight">
            CodeBook<br />Academy
          </h1>
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Tableau de bord" />
          <SidebarItem icon={<BookOpen size={20} />} label="Cours" />
          <SidebarItem icon={<HelpCircle size={20} />} label="Quiz (QCM)" />
          <SidebarItem icon={<Terminal size={20} />} label="Travaux Pratiques" />
          <SidebarItem icon={<Code size={20} />} label="CodeLab" active />
          <SidebarItem icon={<User size={20} />} label="Profil" />
        </nav>
        
        {/* User Profile Card at Bottom */}
        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            UD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">Jean Dupont</p>
            <p className="text-[10px] text-slate-400 font-medium">Apprenti Développeur</p>
          </div>
        </div>
      </aside>

      {/* --- Main IDE Area --- */}
      <main className="flex-1 flex flex-col h-screen">
        
        {/* IDE Top Bar: Tabs and Actions */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <EditorTab 
              name="Projet_Alpha.html" 
              active={activeTab === 'index.html'} 
              onClick={() => setActiveTab('index.html')} 
            />
            <EditorTab 
              name="style.css" 
              active={activeTab === 'style.css'} 
              onClick={() => setActiveTab('style.css')} 
            />
            <EditorTab 
              name="script.js" 
              active={activeTab === 'script.js'} 
              onClick={() => setActiveTab('script.js')} 
            />
            <div className="flex items-center gap-1.5 ml-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
               <Save size={12} /> Sauvegardé
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
              <RotateCcw size={16} /> Réinitialiser
            </button>
            <button className="flex items-center gap-2 bg-[#F97316] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">
              <Play size={16} fill="currentColor" /> Exécuter
            </button>
          </div>
        </header>

        {/* Split Editor and Preview Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* 1. Code Editor (Dark Mode) */}
          <div className="flex-1 bg-[#111827] flex flex-col border-r border-slate-800">
            <div className="h-8 bg-[#1f2937] flex items-center px-4 justify-between">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Éditeur de code</span>
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
               </div>
            </div>
            
            <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-y-auto">
              <CodeLine number={1} content="<!DOCTYPE html>" color="text-slate-500" />
              <CodeLine number={2} content="<html>" color="text-blue-400" />
              <CodeLine number={3} content="<head>" color="text-blue-400" indent={1} />
              <CodeLine number={4} content="<style>" color="text-blue-400" indent={2} />
              <CodeLine number={5} content="body { background: #f8fafc }" color="text-slate-300" indent={3} />
              <CodeLine number={6} content="h1 { color: #ff6b6b }" color="text-slate-300" indent={3} />
              <CodeLine number={7} content="</style>" color="text-blue-400" indent={2} />
              <CodeLine number={8} content="</head>" color="text-blue-400" indent={1} />
              <CodeLine number={9} content="<body>" color="text-blue-400" indent={1} />
              <CodeLine number={10} content="<h1>Bienvenue sur CodeLab !</h1>" color="text-white" indent={2} />
              <CodeLine number={11} content="<p>Commencez à coder ici...</p>" color="text-slate-400" indent={2} />
              <CodeLine number={12} content="</body>" color="text-blue-400" indent={1} />
              <CodeLine number={13} content="</html>" color="text-blue-400" />
              <div className="ml-4 mt-2 w-2 h-5 bg-orange-500/50 animate-pulse"></div>
            </div>
          </div>

          {/* 2. Live Preview Area */}
          <div className="flex-1 bg-slate-100 p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
               <Globe size={14} /> Prévisualisation en direct
            </div>
            
            <div className="flex-1 bg-white rounded-3xl shadow-2xl shadow-slate-300/50 border border-white flex flex-col items-center justify-center text-center p-12">
              <h1 className="text-[#F97316] text-4xl font-black mb-6">
                Bienvenue sur CodeLab !
              </h1>
              <p className="text-slate-500 max-w-sm mb-10 leading-relaxed font-medium">
                Ceci est le rendu en temps réel de votre code. Modifiez l'éditeur à gauche pour voir les changements s'appliquer instantanément.
              </p>
              
              {/* Preview Graphics */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-orange-50 overflow-hidden shadow-xl">
                   <img 
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=300" 
                    alt="Code preview" 
                    className="w-full h-full object-cover"
                   />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white border-4 border-white">
                  <Play size={12} fill="currentColor" />
                </div>
              </div>
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
      <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-r-full shadow-[0_0_8px_#F97316]" />
    )}
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-orange-50 text-[#F97316] font-bold shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
    }`}>
      <span className={active ? 'text-[#F97316]' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

const EditorTab = ({ name, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`px-4 py-2 rounded-lg cursor-pointer transition-all text-xs font-bold border ${
      active 
        ? 'bg-white border-slate-200 text-[#F97316] shadow-sm' 
        : 'border-transparent text-slate-400 hover:text-slate-600'
    }`}
  >
    {name}
  </div>
);

const CodeLine = ({ number, content, color, indent = 0 }) => (
  <div className="flex gap-6 mb-1">
    <span className="w-6 text-slate-700 text-right select-none">{number}</span>
    <span className={`${color} ${indent ? `ml-${indent * 4}` : ''} whitespace-pre`}>
      {content}
    </span>
  </div>
);

export default CodeLabPage;