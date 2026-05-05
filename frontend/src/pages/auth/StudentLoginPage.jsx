import React from 'react';
import { GraduationCap, Key, ArrowRight } from 'lucide-react';

const StudentLoginPage = () => {
  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans flex flex-col">
      {/* Header / Logo Area */}
      <header className="p-8">
        <h1 className="text-[#F97316] text-xl font-black tracking-tight uppercase">
          CodeBook Academy
        </h1>
      </header>

      {/* Login Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white rounded-[24px] shadow-xl shadow-blue-900/5 overflow-hidden">
          
          {/* Blue Header Section */}
          <div className="bg-[#1e3a8a] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/20">
                <GraduationCap className="text-white" size={36} />
              </div>
              <h2 className="text-white text-2xl font-extrabold tracking-tight">
                Connexion Étudiant
              </h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-10">
            <p className="text-slate-500 text-center text-sm leading-relaxed mb-8 px-4">
              Veuillez saisir votre code d'accès unique pour accéder à votre espace de formation.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-3">
                  Code d'accès unique
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Ex: CB-XXXX-XXXX"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none transition-all text-slate-700 placeholder:text-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-5 h-5 border-2 border-slate-200 rounded flex items-center justify-center group-hover:border-orange-500 transition-colors">
                    <input type="checkbox" className="hidden" />
                    {/* Checkmark icon would go here if checked */}
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                    Se souvenir de moi
                  </span>
                </label>
                <button type="button" className="text-xs font-bold text-orange-600 hover:underline">
                  Code oublié ?
                </button>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#f97316] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0 transition-all text-lg"
              >
                Se connecter
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-slate-400 font-medium">Difficultés de connexion ?</span>
                <button className="text-blue-600 hover:underline">Besoin d'aide ?</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <footer className="p-8 text-center">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          Accès réservé aux étudiants de CodeBook Academy.
        </p>
      </footer>
    </div>
  );
};

export default StudentLoginPage;