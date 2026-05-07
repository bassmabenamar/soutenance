import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, Play, Save, Globe, Loader2, 
  FileCode, Hash, Braces 
} from 'lucide-react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css'; // Theme sombre pour l'éditeur

import Sidebar from "../../components/layout/SidebarStudent";

const CodeLabPage = () => {
  // --- ÉTAT DU CODE ---
  const [files, setFiles] = useState({
    'index.html': '<h1>Bienvenue sur CodeLink !</h1>\n<p>Modifiez le code pour voir le rendu.</p>',
    'style.css': 'body { \n  font-family: sans-serif; \n  display: flex; \n  flex-direction: column;\n  align-items: center; \n  justify-content: center;\n  height: 100vh;\n  background: #f8fafc; \n}\n\nh1 { color: #F97316; font-size: 3rem; }',
    'script.js': '// Votre JavaScript ici\nconsole.log("Hello CodeLink!");'
  });

  const [activeTab, setActiveTab] = useState('index.html');
  const [srcDoc, setSrcDoc] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // --- LOGIQUE DE COMPILATION ---
  // Combine HTML, CSS et JS dans un seul document pour l'iframe
  const updateOutput = () => {
    setIsRunning(true);
    const combined = `
      <html>
        <head>
          <style>${files['style.css']}</style>
        </head>
        <body>
          ${files['index.html']}
          <script>${files['script.js']}</script>
        </body>
      </html>
    `;
    
    // Un petit délai pour simuler une compilation et donner un feedback visuel
    setTimeout(() => {
      setSrcDoc(combined);
      setIsRunning(false);
    }, 500);
  };

  // Mettre à jour au démarrage
  useEffect(() => {
    updateOutput();
  }, []);

  const handleCodeChange = (newCode) => {
    setFiles(prev => ({ ...prev, [activeTab]: newCode }));
  };

  const getLanguage = (tab) => {
    if (tab.endsWith('.html')) return languages.markup;
    if (tab.endsWith('.css')) return languages.css;
    return languages.javascript;
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-700 overflow-hidden">
      <Sidebar brandName="CodeLink" onLogout={() => {}} />

      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* --- TOPBAR --- */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <EditorTab 
              name="index.html" 
              icon={<FileCode size={14} />}
              active={activeTab === 'index.html'} 
              onClick={() => setActiveTab('index.html')} 
            />
            <EditorTab 
              name="style.css" 
              icon={<Hash size={14} />}
              active={activeTab === 'style.css'} 
              onClick={() => setActiveTab('style.css')} 
            />
            <EditorTab 
              name="script.js" 
              icon={<Braces size={14} />}
              active={activeTab === 'script.js'} 
              onClick={() => setActiveTab('script.js')} 
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setFiles({ 'index.html': '', 'style.css': '', 'script.js': '' })}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 font-bold text-xs hover:text-red-500 transition-colors"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <button 
              onClick={updateOutput}
              disabled={isRunning}
              className="flex items-center gap-2 bg-[#F97316] text-white px-6 py-2 rounded-xl font-black text-xs shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />} 
              EXÉCUTER
            </button>
          </div>
        </header>

        {/* --- ZONE IDE --- */}
        <div className="flex-1 flex overflow-hidden bg-[#111827]">
          
          {/* ÉDITEUR (Gaucher) */}
          <div className="flex-1 flex flex-col border-r border-slate-800 relative">
            <div className="h-8 bg-[#1f2937]/50 flex items-center px-4 justify-between border-b border-white/5">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Source: {activeTab}</span>
               <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              <Editor
                value={files[activeTab]}
                onValueChange={handleCodeChange}
                highlight={code => highlight(code, getLanguage(activeTab))}
                padding={20}
                style={{
                  fontFamily: '"Fira Code", monospace',
                  fontSize: 14,
                  minHeight: '100%',
                  backgroundColor: 'transparent',
                  color: '#e2e8f0'
                }}
                className="focus:outline-none"
              />
            </div>
          </div>

          {/* PRÉVISUALISATION (Droite) */}
          <div className="flex-1 bg-slate-100 flex flex-col relative">
            <div className="h-8 bg-white border-b border-gray-200 flex items-center px-6">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Globe size={10} /> Live Preview Output
                </span>
            </div>
            
            <div className="flex-1 p-6 flex flex-col h-full">
              <div className="flex-1 bg-white rounded-[32px] shadow-2xl shadow-slate-300/50 border border-white overflow-hidden relative">
                {isRunning && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <Loader2 className="text-[#F97316] animate-spin" size={32} />
                  </div>
                )}
                <iframe
                  srcDoc={srcDoc}
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

/* --- COMPOSANTS INTERNES --- */

const EditorTab = ({ name, icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-black border ${
      active 
        ? 'bg-orange-50 border-orange-100 text-[#F97316] shadow-sm' 
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }`}
  >
    <span className={active ? 'text-orange-500' : 'text-slate-300'}>{icon}</span>
    {name}
  </button>
);

export default CodeLabPage;