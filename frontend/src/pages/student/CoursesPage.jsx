import React from 'react';
import { 
  LayoutDashboard, BookOpen, HelpCircle, Terminal, 
  Code, Award, Settings, PlayCircle, CheckCircle2, 
  Lock, Clock, BarChart, Download, ExternalLink, Bookmark
} from 'lucide-react';

const CoursesPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* --- Sidebar (CodeBook Academy Branding) --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 shrink-0">
        <div className="px-4 mb-10">
          <h1 className="text-[#F97316] text-2xl font-black leading-tight">
            CodeBook<br />Academy
          </h1>
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem icon={<BookOpen size={20} />} label="Course Modules" active />
          <SidebarItem icon={<HelpCircle size={20} />} label="Quizzes" />
          <SidebarItem icon={<Code size={20} />} label="CodeLab" />
          <SidebarItem icon={<Award size={20} />} label="Mes Certifications" />
          <SidebarItem icon={<Settings size={20} />} label="Profile Settings" />
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Breadcrumbs */}
        <nav className="px-12 pt-8 flex gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span>Cours</span>
          <span className="text-slate-300">/</span>
          <span>Développement Web</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#F97316]">HTML5 Fundamentals</span>
        </nav>

        <div className="p-12 flex gap-10">
          
          {/* LEFT COLUMN: Course Content */}
          <div className="flex-[2] space-y-8">
            
            {/* Hero Image Section */}
            <div className="relative h-80 rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/10">
              <img 
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200" 
                alt="Code background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-10">
                <span className="bg-[#F97316] text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                  Module 1
                </span>
                <h2 className="text-4xl font-black text-white leading-tight">
                  Introduction au HTML5
                </h2>
              </div>
            </div>

            {/* Meta Info Bar */}
            <div className="flex items-center justify-between py-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=JD" alt="Instructor" />
                </div>
                <p className="text-sm font-bold text-slate-600">Par Jean-Damien, Expert Web</p>
              </div>
              <div className="flex gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><Clock size={16}/> 4h 30min</div>
                <div className="flex items-center gap-2"><BarChart size={16}/> Débutant</div>
              </div>
            </div>

            {/* Description Section */}
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-500 leading-relaxed">
                Bienvenue dans ce module fondamental dédié au **HTML5**, le langage de structure du Web moderne. Dans cette section, nous allons explorer les bases essentielles qui permettent de construire n'importe quel site internet.
              </p>
              
              <div className="my-10 p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
                <h4 className="text-slate-800 font-black mb-4">Ce que vous allez apprendre :</h4>
                <ul className="space-y-3">
                  {[
                    "La structure sémantique d'un document HTML5 moderne.",
                    "L'utilisation correcte des balises de contenu (header, main, footer).",
                    "L'intégration multimédia (images, vidéos) et les formulaires."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <CheckCircle2 className="text-[#F97316] shrink-0 mt-0.5" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex gap-4 pb-12">
              <button className="bg-[#F97316] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all flex items-center gap-3">
                Commencer le cours <PlayCircle size={22} fill="currentColor" />
              </button>
              <button className="border-2 border-blue-100 text-blue-700 px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all flex items-center gap-3">
                <Bookmark size={22} /> Sauvegarder
              </button>
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-2 gap-6 pb-20">
              <ResourceCard 
                icon={<Download className="text-blue-600" />}
                title="Guide de Référence PDF"
                desc="Un aide-mémoire complet sur toutes les balises HTML5 essentielles."
                action="Télécharger"
              />
              <ResourceCard 
                icon={<Code className="text-purple-600" />}
                title="CodeLabs Interactifs"
                desc="Pratiquez directement dans votre navigateur avec nos exercices guidés."
                action="Ouvrir l'éditeur"
                isLink
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Widgets */}
          <div className="flex-1 space-y-8">
            
            {/* Progression Widget */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-black text-slate-800">Votre progression</h4>
                <span className="text-[#F97316] font-black text-lg">35%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div className="w-[35%] h-full bg-[#F97316] rounded-full"></div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">7 leçons sur 20 terminées</p>
            </div>

            {/* Program List */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                 <Settings className="text-[#F97316]" size={18} />
                 <h4 className="font-black text-slate-800 text-sm">Programme du module</h4>
              </div>
              <div className="p-4 space-y-2">
                <ProgramItem 
                  number="1" 
                  title="Pourquoi le HTML5 ?" 
                  time="12:00" 
                  type="Vidéo" 
                  status="active" 
                />
                <ProgramItem 
                  number="2" 
                  title="Configuration de l'environnement" 
                  time="08:45" 
                  type="Lecture" 
                  status="completed" 
                />
                <ProgramItem 
                  number="3" 
                  title="Les balises de structure" 
                  time="15:30" 
                  type="Vidéo" 
                  status="pending" 
                />
                <ProgramItem 
                  number="4" 
                  title="Texte et typographie" 
                  time="10:15" 
                  type="Quiz" 
                  status="locked" 
                />
                <ProgramItem 
                  number="5" 
                  title="Images et accessibilité" 
                  time="18:00" 
                  type="Vidéo" 
                  status="locked" 
                />
                <ProgramItem 
                  number="6" 
                  title="Listes et Liens" 
                  time="12:20" 
                  type="Lab" 
                  status="locked" 
                />
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
      active ? 'bg-orange-50/50 text-[#F97316] font-bold shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
    }`}>
      <span className={active ? 'text-[#F97316]' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

const ProgramItem = ({ number, title, time, type, status }) => {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer border ${
      isActive ? 'bg-white border-orange-100 shadow-sm' : 'border-transparent hover:bg-slate-50'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-colors ${
        isActive ? 'bg-[#F97316] text-white' : 
        isCompleted ? 'bg-green-100 text-green-600' : 
        'bg-slate-100 text-slate-400'
      }`}>
        {isCompleted ? <CheckCircle2 size={16} /> : number}
      </div>
      <div className="flex-1">
        <p className={`text-xs font-black mb-0.5 ${isLocked ? 'text-slate-300' : 'text-slate-800'}`}>
          {number}. {title}
        </p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          {time} • {type}
        </p>
      </div>
      {isLocked && <Lock size={14} className="text-slate-200" />}
      {isActive && <PlayCircle size={18} className="text-[#F97316]" />}
    </div>
  );
};

const ResourceCard = ({ icon, title, desc, action, isLink = false }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col items-start">
    <div className="p-3 bg-slate-50 rounded-2xl mb-6 shadow-inner">{icon}</div>
    <h5 className="font-black text-slate-800 mb-2">{title}</h5>
    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">{desc}</p>
    <button className={`text-xs font-black flex items-center gap-2 mt-auto transition-colors ${
      isLink ? 'text-purple-600 hover:text-purple-800' : 'text-[#F97316] hover:text-orange-800'
    }`}>
      {action} {isLink ? <ExternalLink size={14} /> : <Download size={14} />}
    </button>
  </div>
);

export default CoursesPage;