import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  HelpCircle, 
  Terminal, 
  Users, 
  Menu, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  Circle
} from 'lucide-react';

const AddQCM = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(1);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Sidebar (Same as PDF Page) --- */}
      <aside className="w-60 bg-white border-r border-blue-100 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-600 tracking-tight">EduSaaS</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-4">
          <SidebarItem icon={<LayoutDashboard size={18}/>} label="Tableau de bord" />
          <SidebarItem icon={<FileText size={18}/>} label="Gestion des PDF" />
          <SidebarItem icon={<HelpCircle size={18}/>} label="Gestion des QCM" active />
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
             <h1 className="text-xl font-bold text-orange-600 mr-4">EduSaaS</h1>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-gray-300 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="py-8 px-8 w-full">
          
          {/* Back Link & Title */}
          <button className="flex items-center gap-1 text-orange-600 text-sm font-bold mb-4 hover:underline">
            <ChevronLeft size={16} /> Retour aux QCM
          </button>
          
          <h2 className="text-2xl font-bold text-slate-800">Création d'un Nouveau QCM</h2>
          <p className="text-gray-500 mb-10">Définissez la structure et les questions de votre évaluation interactive.</p>

          {/* --- Stepper --- */}
          <div className="flex items-center justify-center max-w-4xl mx-auto mb-12">
            <Step number="1" label="Paramètres" active />
            <div className="h-px bg-blue-100 w-32 mx-4" />
            <Step number="2" label="Questions" disabled />
            <div className="h-px bg-blue-100 w-32 mx-4" />
            <Step number="3" label="Publication" disabled />
          </div>

          {/* --- Details Card --- */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mb-8">
            <h3 className="font-bold text-slate-800 mb-6">Détails du Quiz</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Titre du Quiz</label>
                <input 
                  type="text" 
                  placeholder="ex: Introduction au JavaScript Moderne"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-orange-500 focus:outline-none">
                  <option>Développement Web</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- Questions Header --- */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Questions</h3>
            <button className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-100 transition-colors">
              <Plus size={18} /> Ajouter une question
            </button>
          </div>

          {/* --- Question Item --- */}
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-l-orange-600 border border-gray-100 p-8 mb-6 relative">
            <button className="absolute top-8 right-8 text-slate-300 hover:text-red-500">
              <Trash2 size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg font-bold text-slate-700 border border-gray-100">1</span>
              <h4 className="font-bold text-slate-800">Question Principale</h4>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-500 mb-3">Énoncé de la question</label>
              <textarea 
                rows="2"
                placeholder="Quelle est la valeur de 'this' dans une fonction fléchée ?"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/30 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Answer Grid */}
            <div className="grid grid-cols-2 gap-4">
              <AnswerOption 
                text="Le contexte global" 
                isSelected={selectedAnswer === 0} 
                onClick={() => setSelectedAnswer(0)} 
              />
              <AnswerOption 
                text="Le contexte parent lexique" 
                isSelected={selectedAnswer === 1} 
                onClick={() => setSelectedAnswer(1)} 
              />
              <AnswerOption 
                text="La fonction elle-même" 
                isSelected={selectedAnswer === 2} 
                onClick={() => setSelectedAnswer(2)} 
              />
              <AnswerOption 
                text="Undefined" 
                isSelected={selectedAnswer === 3} 
                onClick={() => setSelectedAnswer(3)} 
              />
            </div>
          </div>

          {/* --- Add New Question Dotted Zone --- */}
          <div className="border-2 border-dashed border-blue-100 rounded-2xl py-10 flex flex-col items-center justify-center bg-white/50 mb-10">
            <div className="w-10 h-10 rounded-full border-2 border-blue-200 flex items-center justify-center text-blue-300 mb-3">
              <Plus size={24} />
            </div>
            <p className="text-slate-400 font-bold text-sm">Ajouter une nouvelle question</p>
            <p className="text-slate-300 text-xs mt-1">Configurez les réponses et désignez la bonne solution.</p>
          </div>

          {/* --- Footer Actions --- */}
          <div className="flex justify-end items-center gap-4 border-t border-gray-100 pt-8">
            <button className="px-8 py-3 rounded-xl bg-blue-50/50 text-slate-500 font-bold hover:bg-blue-50 transition-colors">
              Enregistrer en brouillon
            </button>
            <button className="flex items-center gap-2 bg-[#92400e] text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-orange-100 hover:brightness-110 transition-all">
              Suivant: Publication
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Helper Components --- */

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-orange-50 text-orange-600 font-bold shadow-sm' : 'text-gray-400 hover:bg-gray-50'
  }`}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const Step = ({ number, label, active = false, disabled = false }) => (
  <div className={`flex items-center gap-3 ${disabled ? 'opacity-40' : 'opacity-100'}`}>
    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
      active ? 'border-orange-600 text-orange-600' : 'border-blue-200 text-blue-300'
    }`}>
      {number}
    </div>
    <span className={`font-bold text-sm ${active ? 'text-orange-600' : 'text-blue-300'}`}>{label}</span>
  </div>
);

const AnswerOption = ({ text, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
      isSelected 
        ? 'border-orange-200 bg-orange-50/30 ring-1 ring-orange-200' 
        : 'border-gray-100 bg-white hover:border-blue-100'
    }`}
  >
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
      isSelected ? 'border-orange-600' : 'border-gray-200'
    }`}>
      {isSelected && <div className="w-2.5 h-2.5 bg-orange-600 rounded-full" />}
    </div>
    <span className={`text-sm font-medium ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>{text}</span>
  </div>
);

export default AddQCM;