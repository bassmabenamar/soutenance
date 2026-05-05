import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, HelpCircle, Terminal, Users, 
  Menu, Eye, Bold, Italic, Link2, Code, Upload, Save, ChevronRight
} from 'lucide-react';

const AddTP = () => {
  const [autoCorrection, setAutoCorrection] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Sidebar --- */}
      <aside className="w-60 bg-white border-r border-blue-100 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-600 tracking-tight">EduSaaS</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-4">
          <SidebarItem icon={<LayoutDashboard size={18}/>} label="Tableau de bord" />
          <SidebarItem icon={<FileText size={18}/>} label="Gestion des PDF" />
          <SidebarItem icon={<HelpCircle size={18}/>} label="Gestion des QCM" />
          <SidebarItem icon={<Terminal size={18}/>} label="Gestion des TP" active />
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
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-xs font-bold text-orange-600">Admin Principal</p>
              <p className="text-[10px] text-gray-400">Dernière connexion: 10:42</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="py-8 px-8 w-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <nav className="text-xs text-gray-400 mb-2">Gestion des TP &gt; <span className="text-gray-600 font-medium">Nouveau TP</span></nav>
              <h2 className="text-3xl font-extrabold text-slate-800">Créer un nouveau TP</h2>
              <p className="text-gray-500">Définissez les objectifs pédagogiques et les contraintes techniques du nouvel exercice.</p>
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-slate-600 shadow-sm hover:bg-gray-50 transition-all">
              <Eye size={18} /> Aperçu
            </button>
          </div>

          <div className="flex gap-8">
            
            {/* LEFT COLUMN: Main Form */}
            <div className="flex-[2] space-y-6">
              
              {/* General Info Card */}
              <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><FileText size={20}/></div>
                  <h3 className="text-xl font-bold text-slate-800">Informations générales</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Titre du TP</label>
                    <input type="text" placeholder="Ex: Intégration d'une Landing Page Responsive" className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
                      <select className="w-full p-4 bg-white border border-gray-200 rounded-xl appearance-none">
                        <option>HTML</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Difficulté</label>
                      <select className="w-full p-4 bg-white border border-gray-200 rounded-xl appearance-none">
                        <option>Débutant</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description courte</label>
                    <textarea rows="4" placeholder="Décrivez l'objectif principal du TP en quelques phrases..." className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                </div>
              </section>

              {/* Instructions / Editor Card */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Terminal size={20}/></div>
                    <h3 className="text-lg font-bold text-slate-800">Instructions détaillées</h3>
                  </div>
                  <div className="flex gap-4 text-gray-400">
                    <Bold size={18} className="cursor-pointer hover:text-slate-600" />
                    <Italic size={18} className="cursor-pointer hover:text-slate-600" />
                    <Link2 size={18} className="cursor-pointer hover:text-slate-600" />
                    <Code size={18} className="cursor-pointer hover:text-slate-600" />
                  </div>
                </div>
                <div className="bg-[#1e3a8a] p-8 min-h-[300px] font-mono text-sm leading-relaxed">
                  <p className="text-orange-400 mb-2"># Objectifs du TP</p>
                  <p className="text-white mb-1">1. Créer une structure HTML5 sémantique.</p>
                  <p className="text-white mb-1">2. Utiliser CSS Flexbox pour l'alignement des éléments.</p>
                  <p className="text-white mb-4">3. Mettre en place un menu "Burger" fonctionnel en JavaScript.</p>
                  
                  <p className="text-orange-400 mb-2"># Ressources</p>
                  <p className="text-white mb-1">- Maquette Figma fournie dans les fichiers joints.</p>
                  <p className="text-white">- Palette de couleurs : #F97316 (Orange), #1E3A8A (Bleu Nuit).</p>
                  <div className="w-1 h-5 bg-orange-500 animate-pulse inline-block align-middle ml-1"></div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Sidebar Widgets */}
            <div className="flex-1 space-y-6">
              
              {/* Media Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 text-lg">Médias</h4>
                <div className="border-2 border-dashed border-blue-100 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50/20 text-center">
                  <Upload className="text-blue-300 mb-3" size={32} />
                  <p className="text-xs font-bold text-slate-600 leading-tight">
                    Glissez-déposez la miniature ou <span className="text-orange-600 cursor-pointer">parcourez</span>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2">PNG, JPG ou WEBP (max. 5Mo)</p>
                </div>
              </div>

              {/* Parameters Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-6 text-lg">Paramètres</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-700">Auto-correction</p>
                      <p className="text-[10px] text-gray-400">Valider par tests unitaires</p>
                    </div>
                    <div onClick={() => setAutoCorrection(!autoCorrection)} className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${autoCorrection ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${autoCorrection ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-700">Publication immédiate</p>
                      <p className="text-[10px] text-gray-400">Visible par tous les élèves</p>
                    </div>
                    <div className="w-10 h-5 bg-gray-100 rounded-full relative"><div className="absolute top-1 left-1 w-3 h-3 bg-white border border-gray-200 rounded-full"></div></div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Temps estimé (minutes)</label>
                    <input type="number" defaultValue="120" className="w-full p-3 bg-white border border-gray-100 rounded-xl font-bold text-slate-600" />
                  </div>
                </div>
              </div>

              {/* Card Preview Mockup */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400" alt="Code Preview" className="h-32 w-full object-cover" />
                <div className="p-4">
                  <span className="text-[9px] bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded uppercase tracking-wider">Aperçu carte élève</span>
                  <h5 className="font-bold text-slate-800 mt-2">Titre du TP</h5>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">Complétion moyenne</span>
                    <span className="text-[10px] text-gray-400 font-bold">0%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
                    <div className="w-1/4 h-full bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end items-center gap-6">
            <button className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Annuler les modifications</button>
            <button className="bg-orange-600 text-white px-10 py-3.5 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">
              <Save size={20}/> Enregistrer le TP
            </button>
          </div>
        </div>
      </main>
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

export default AddTP;