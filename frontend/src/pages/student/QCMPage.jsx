import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Terminal, 
  Code, 
  User, 
  Timer,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const QCMPage = () => {
  const [selectedOption, setSelectedOption] = useState('B');

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Sidebar (CodeBook Academy Style) --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 shrink-0">
        <div className="px-4 mb-10">
          <h1 className="text-[#F97316] text-2xl font-black leading-tight">
            CodeBook<br />Academy
          </h1>
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Tableau de bord" />
          <SidebarItem icon={<BookOpen size={20} />} label="Cours" />
          <SidebarItem icon={<HelpCircle size={20} />} label="Quiz (QCM)" active />
          <SidebarItem icon={<Terminal size={20} />} label="Travaux Pratiques" />
          <SidebarItem icon={<Code size={20} />} label="CodeLab" />
          <SidebarItem icon={<User size={20} />} label="Profil" />
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col">
        
        {/* Header with Title and Timer */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Quiz : Algorithmes de Tri</h2>
            <p className="text-sm text-gray-400 font-medium">Question 4 sur 10</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full text-orange-600 font-bold border border-orange-100">
            <Timer size={18} />
            <span>12:45</span>
          </div>
        </header>

        {/* Progress Bar Container */}
        <div className="px-10 mt-6">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-[40%] h-full bg-orange-500 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Main Quiz Area */}
        <div className="flex-1 p-10 flex justify-center">
          <div className="w-full max-w-4xl">
            
            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 relative overflow-hidden">
              
              {/* Badge */}
              <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                Concept Avancé
              </span>

              <h3 className="text-2xl font-extrabold text-slate-800 mb-8 leading-snug">
                Quel est le cas de complexité temporelle au pire pour l'algorithme "QuickSort" ?
              </h3>

              {/* Code Snippet Box */}
              <div className="bg-[#111827] rounded-2xl p-6 font-mono text-sm mb-10 relative group">
                <div className="absolute top-4 right-4 text-gray-600 group-hover:text-gray-400 transition-colors">
                  <Code size={16} />
                </div>
                <p className="text-orange-400 tracking-tight">
                  <span className="text-purple-400">function</span> <span className="text-blue-400">quickSort</span>(arr) {'{'}
                </p>
                <p className="text-gray-500 ml-4 italic mt-1">
                  // Pivot selection strategy...
                </p>
                <p className="text-white ml-4 mt-1">
                  <span className="text-purple-400">return</span> result;
                </p>
                <p className="text-orange-400">{'}'}</p>
              </div>

              {/* Options List */}
              <div className="space-y-4 mb-10">
                <QuizOption 
                  id="A" 
                  label="O(n log n)" 
                  isSelected={selectedOption === 'A'} 
                  onClick={() => setSelectedOption('A')}
                />
                <QuizOption 
                  id="B" 
                  label="O(n²)" 
                  isSelected={selectedOption === 'B'} 
                  onClick={() => setSelectedOption('B')}
                />
                <QuizOption 
                  id="C" 
                  label="O(n)" 
                  isSelected={selectedOption === 'C'} 
                  onClick={() => setSelectedOption('C')}
                />
                <QuizOption 
                  id="D" 
                  label="O(log n)" 
                  isSelected={selectedOption === 'D'} 
                  onClick={() => setSelectedOption('D')}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
                <button className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group">
                  Valider la réponse
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 text-gray-400 font-bold hover:text-slate-600 transition-colors">
                  Passer la question
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Components --- */

const SidebarItem = ({ icon, label, active = false }) => (
  <div className="relative group">
    {active && (
      <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-r-full" />
    )}
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-400 hover:bg-gray-50 hover:text-slate-600'
    }`}>
      <span className={active ? 'text-orange-600' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

const QuizOption = ({ id, label, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
      isSelected 
        ? 'border-orange-500 bg-orange-50/20' 
        : 'border-gray-100 bg-white hover:border-blue-100'
    }`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
      isSelected ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-50 text-slate-400'
    }`}>
      {id}
    </div>
    <span className={`text-lg font-bold flex-1 ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
      {label}
    </span>
    {isSelected && (
      <CheckCircle2 size={24} className="text-orange-500" />
    )}
  </div>
);

export default QCMPage;