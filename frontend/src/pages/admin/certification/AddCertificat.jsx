import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, HelpCircle, Terminal, Users, 
  Menu, Info, Download, Save, Upload, CheckCircle2, 
  Settings, Award, Image as ImageIcon, MousePointer2 
} from 'lucide-react';

const AddCertificat = () => {
  const [attribution, setAttribution] = useState('auto');

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Sidebar (Standardized) --- */}
      <aside className="w-60 bg-white border-r border-blue-100 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-600 tracking-tight">EduSaaS</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-4">
          <SidebarItem icon={<LayoutDashboard size={18}/>} label="Tableau de bord" />
          <SidebarItem icon={<FileText size={18}/>} label="Gestion des PDF" active />
          <SidebarItem icon={<HelpCircle size={18}/>} label="Gestion des QCM" />
          <SidebarItem icon={<Terminal size={18}/>} label="Gestion des TP" />
          <SidebarItem icon={<Users size={18}/>} label="Utilisateurs" />
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <Menu className="text-gray-400 cursor-pointer" />
            <span className="font-semibold text-gray-700">Plateforme Admin</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-orange-600 font-bold text-sm">Nouveau Certificat</span>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-gray-300 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Page Container */}
        <div className="py-8 px-8 w-full">
          <nav className="text-l text-gray-400 mb-2 flex gap-2">
            <span>Modèles</span> / <span className="font-medium text-gray-600">Création de certificat</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8">Concevoir un nouveau modèle</h2>

          <div className="flex gap-8">
            
            {/* LEFT COLUMN: FORM SECTIONS */}
            <div className="flex-[1.8] space-y-6">
              
              {/* Section: Informations Générales */}
              <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Settings size={20}/></div>
                  <h3 className="text-xl font-bold text-slate-800">Informations Générales</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Nom du certificat</label>
                    <input type="text" placeholder="ex: Expert en Architecture Cloud" className="w-full p-4 bg-blue-50/30 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Description courte</label>
                    <textarea rows="3" placeholder="Sera affichée sur le profil de l'apprenant..." className="w-full p-4 bg-blue-50/30 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>
              </section>

              {/* Section: Critères d'attribution */}
              <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Award size={20}/></div>
                  <h3 className="text-xl font-bold text-slate-800">Critères d'attribution</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div 
                    onClick={() => setAttribution('auto')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${attribution === 'auto' ? 'border-orange-500 bg-orange-50/20' : 'border-gray-100'}`}
                  >
                    <MousePointer2 className={attribution === 'auto' ? 'text-orange-600' : 'text-gray-300'} />
                    <span className="font-bold mt-2">Automatique</span>
                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">Délivré après réussite d'un examen</p>
                  </div>
                  <div 
                    onClick={() => setAttribution('manual')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${attribution === 'manual' ? 'border-orange-500 bg-orange-50/20' : 'border-gray-100'}`}
                  >
                    <Users className={attribution === 'manual' ? 'text-orange-600' : 'text-gray-300'} />
                    <span className="font-bold mt-2">Manuelle</span>
                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">Délivré par un administrateur</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-blue-50/30 border border-blue-50 rounded-xl">
                    <span className="text-sm font-bold text-slate-600">Score minimum requis</span>
                    <div className="flex items-center gap-2">
                       <input type="text" defaultValue="80" className="w-12 text-center font-bold text-orange-600 bg-white border border-gray-200 rounded p-1" />
                       <span className="text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-blue-50/30 border border-blue-50 rounded-xl">
                    <span className="text-sm font-bold text-slate-600">Modules requis</span>
                    <button className="text-xs font-bold text-orange-600">Sélectionner (3)</button>
                  </div>
                </div>
              </section>

              {/* Section: Design du template */}
              <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                 <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><ImageIcon size={20}/></div>
                  <h3 className="text-xl font-bold text-slate-800">Design du template</h3>
                </div>
                <div className="border-2 border-dashed border-blue-100 rounded-2xl p-10 flex flex-col items-center bg-blue-50/10 mb-6">
                  <Upload className="text-blue-200 mb-2" size={32} />
                  <p className="text-sm font-bold text-slate-700">Glissez l'image de fond ici</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">PNG ou SVG haute résolution (Min 2000px de large)</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 h-16 rounded-lg bg-slate-900 border-2 border-orange-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                  </div>
                  <div className="w-24 h-16 rounded-lg bg-gray-100 border border-gray-200"></div>
                  <div className="w-24 h-16 rounded-lg bg-gray-200 border border-gray-200"></div>
                  <div className="w-24 h-16 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                    <ImageIcon size={18}/>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: PREVIEW CARD */}
            <div className="flex-1">
              <div className="sticky top-8 space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <Award className="text-orange-500" size={18}/> Prévisualisation
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-md font-bold uppercase">Mode Template</span>
                  </div>

                  {/* Certificate Graphic Mockup */}
                  <div className="aspect-[4/3] bg-slate-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 border-[10px] border-double border-gray-200/50 m-2"></div>
                    <h4 className="text-orange-600 font-black text-xl mb-1">EduSaaS</h4>
                    <p className="text-[8px] tracking-[0.2em] text-slate-400 font-bold uppercase mb-4">Certificat d'excellence</p>
                    <p className="italic text-[10px] text-slate-500 text-center px-4">Ce certificat est fièrement décerné à</p>
                    <div className="h-px w-24 bg-gray-300 my-4"></div>
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
                    <Info className="text-orange-600 shrink-0 mt-1" size={16} />
                    <p className="text-[10px] text-slate-600 leading-relaxed">
                      Les variables <span className="font-bold text-orange-700">{"{nom_apprenant}"}</span> et <span className="font-bold text-orange-700">{"{date_obtention}"}</span> seront injectées automatiquement au moment de la génération.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button className="w-full bg-[#92400e] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-100 hover:brightness-110">
                      <Save size={18}/> Enregistrer le modèle
                    </button>
                    <button className="w-full border border-orange-500 text-orange-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-50">
                      <Download size={18}/> Télécharger un spécimen
                    </button>
                  </div>
                </div>

                <div className="bg-[#1e3a8a] text-white p-4 rounded-xl flex justify-between items-center shadow-lg">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                     <span className="text-xs font-medium">Modèle en cours d'édition</span>
                   </div>
                   <span className="text-[10px] opacity-60 font-mono">ID: CERT-2024-001</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FAB (Floating Action Button) */}
      <div className="fixed bottom-6 right-8 bg-[#1e3a8a] p-4 rounded-2xl text-white shadow-2xl cursor-pointer hover:scale-105 transition-transform">
        <HelpCircle size={24} />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-orange-50 text-orange-600 font-bold shadow-sm' : 'text-gray-400 hover:bg-gray-50'
  }`}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

export default AddCertificat;