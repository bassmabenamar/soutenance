import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  HelpCircle, 
  Terminal, 
  Users, 
  Menu, 
  Upload, 
  Lock, 
  Eye, 
  Database 
} from 'lucide-react';

const AddPDF = () => {
  const [level, setLevel] = useState('Débutant');

  return (
    <div className="flex min-h-screen bg-blue-50/30 font-sans text-slate-700">
      
      {/* --- Sidebar (Width reduced slightly to 60) --- */}
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
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Menu className="text-gray-400 cursor-pointer" />
            <span className="font-semibold text-gray-700">Plateforme Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Administrateur</span>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-gray-300 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Content Area - Optimized for Size and Low Distance */}
        <div className="py-8 px-6 w-full"> 
          {/* Breadcrumbs */}
          <nav className="text-l text-gray-400 mb-2 flex gap-2">
            <span>Gestion des PDF</span> 
            <span>&gt;</span>
            <span className="font-medium text-gray-600 underline">Ajouter un nouveau document</span>
          </nav>

          <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Nouveau Support de Cours</h2>
          <p className="text-gray-500 mb-8 text-lg">Remplissez les informations ci-dessous pour publier un nouveau support pédagogique en format PDF.</p>

          {/* Form Card - Made wider and larger padding inside */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 mb-8 w-full">
            <div className="grid grid-cols-2 gap-8 mb-8">
              
              {/* Title */}
              <div className="col-span-2">
                <label className="block text-base font-bold text-slate-700 mb-3">Titre du document</label>
                <input 
                  type="text" 
                  placeholder="Ex: Introduction au Cloud Computing"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all placeholder:text-gray-300 text-lg"
                />
              </div>

              {/* Tech Category */}
              <div>
                <label className="block text-base font-bold text-slate-700 mb-3">Catégorie Technologique</label>
                <div className="relative">
                  <select className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white appearance-none text-gray-500 text-lg">
                    <option>Sélectionner une techno</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Level Selector */}
              <div>
                <label className="block text-base font-bold text-slate-700 mb-3">Niveau</label>
                <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100 h-[62px]">
                  {['Débutant', 'Intermédiaire', 'Avancé'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={`flex-1 text-sm font-bold rounded-full transition-all ${
                        level === l ? 'bg-white text-blue-600 shadow-md border border-blue-100' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-base font-bold text-slate-700 mb-3">Description du contenu</label>
                <textarea 
                  rows="5"
                  placeholder="Décrivez brièvement les objectifs pédagogiques et les prérequis..."
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder:text-gray-300 text-lg"
                ></textarea>
              </div>

              {/* Dropzone - Taller and bigger font */}
              <div className="col-span-2">
                <label className="block text-base font-bold text-slate-700 mb-3">Fichier PDF</label>
                <div className="border-2 border-dashed border-blue-200 rounded-2xl p-16 flex flex-col items-center justify-center bg-blue-50/20 cursor-pointer hover:bg-blue-50/40 transition-colors">
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-blue-50">
                    <FileText className="text-blue-600" size={40} />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-800">Glissez-déposez votre PDF ici</p>
                  <p className="text-lg text-gray-400 mt-2">
                    ou <span className="text-blue-600 font-semibold underline">parcourez vos fichiers</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-6 uppercase tracking-[0.2em] font-bold">Taille Max : 50 Mo</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-12 border-t border-gray-50 pt-8">
              <button className="px-10 py-3.5 rounded-xl border border-gray-200 text-slate-600 font-bold hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button className="flex items-center gap-3 bg-orange-600 text-white px-14 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all transform hover:-translate-y-0.5">
                <FileText size={20} />
                Enregistrer
              </button>
            </div>
          </div>

          {/* Bottom Stats Row - Spread out to fill width */}
          <div className="grid grid-cols-3 gap-8">
            <StatCard icon={<Database className="text-blue-600" size={24} />} label="ESPACE UTILISÉ" value="4.2 GB / 10 GB" />
            <StatCard icon={<Lock className="text-green-500" size={24} />} label="SÉCURITÉ" value="Chiffrement SSL" />
            <StatCard icon={<Eye className="text-orange-500" size={24} />} label="VISIBILITÉ" value="Publique" />
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Sub-Components --- */

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-orange-50 text-orange-600 font-bold shadow-sm border border-orange-100/50' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
  }`}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-8 rounded-2xl flex items-center gap-6 shadow-sm border border-gray-100 flex-1">
    <div className="p-4 bg-blue-50/50 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 tracking-widest mb-1">{label}</p>
      <p className="text-xl font-extrabold text-slate-700">{value}</p>
    </div>
  </div>
);

export default AddPDF;