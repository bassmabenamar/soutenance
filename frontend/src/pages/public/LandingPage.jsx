import React from 'react';
import { 
  ArrowRight, PlayCircle, Layers, MousePointer2, 
  Terminal, Globe, CheckCircle, Quote 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* --- Navigation --- */}
      <nav className="h-20 flex items-center justify-between px-12 border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-[#F97316] text-xl font-black uppercase tracking-tighter">
            CodeBook Academy
          </h1>
          <div className="hidden md:flex items-center gap-8 border-l pl-8 border-slate-100">
            <a href="#" className="text-sm font-bold text-[#F97316]">Accueil</a>
            <a href="#" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Catalogue</a>
            <a href="#" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Tarifs</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="text-sm font-black text-slate-400 px-4">Connexion</button>
           <button className="bg-[#F97316] text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-orange-100">S'inscrire</button>
        </div>
      </nav>

      {/* --- Section Hero --- */}
      <section className="px-12 py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
            <span className="text-[10px] font-black text-[#F97316] uppercase tracking-widest">Nouveau : Masterclass Next.js 14</span>
          </div>
          <h2 className="text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Apprenez le <br />
            Front-End <span className="text-[#F97316]">Plus Vite</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-lg">
            Maîtrisez l'art des applications web modernes. Notre plateforme immersive vous propulse du niveau débutant à expert avec des projets réels.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-[#F97316] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:scale-105 transition-all">
              Essai Gratuit
            </button>
            <button className="text-slate-700 px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 border-2 border-slate-50 hover:bg-slate-50 transition-all">
              <PlayCircle size={22} className="text-blue-500" /> Voir la Démo
            </button>
          </div>
        </div>
        
        {/* Composant Mockup Flottant */}
        <div className="relative">
          <div className="absolute -inset-10 bg-orange-100/50 rounded-full blur-3xl opacity-60"></div>
          <div className="relative bg-[#1E293B] rounded-[40px] p-2 shadow-2xl overflow-hidden border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
              className="rounded-[32px] opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
              alt="Aperçu de l'IDE"
            />
          </div>
        </div>
      </section>

      {/* --- Section Expérience --- */}
      <section className="px-12 py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl font-black text-slate-900">Une Expérience d'Apprentissage Unique</h3>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">Une méthodologie intégrée aux outils professionnels pour transformer votre curiosité en expertise d'ingénieur.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
              <FeatureBlock className="col-span-8 bg-white" icon={<Layers className="text-orange-500" />} title="Accès Illimité" desc="Débloquez tous les cours, du Frontend au DevOps. De nouveaux contenus ajoutés chaque mois pour rester à la pointe." />
              <FeatureBlock className="col-span-4 bg-[#5063B0] text-white" icon={<Globe className="text-white opacity-80" />} title="Support 24/7" desc="Ne restez jamais bloqué. Notre communauté et nos assistants IA sont en ligne 24h/24 pour vous aider." />
              <FeatureBlock className="col-span-4 bg-white" icon={<MousePointer2 className="text-orange-500" />} title="Apprentissage Interactif" desc="Votre navigateur devient votre éditeur. Pratiquez directement avec notre playground intégré." />
              <FeatureBlock className="col-span-8 bg-blue-50/50 border-blue-100" icon={<Terminal className="text-blue-600" />} title="LMS + QCM + TP" desc="Une triade complète : cours structurés, quiz de validation et travaux pratiques en conditions réelles." />
          </div>
        </div>
      </section>

      {/* --- Chemin vers la Maîtrise (Timeline) --- */}
      <section className="px-12 py-32 max-w-7xl mx-auto">
        <div className="mb-20">
          <h3 className="text-4xl font-black text-slate-900 mb-4">Votre Parcours de Réussite</h3>
          <p className="text-slate-400 font-medium">Nous avons simplifié la route. Suivez ces 4 étapes pour décrocher votre job de rêve.</p>
          <div className="w-24 h-1.5 bg-orange-100 rounded-full mt-6 overflow-hidden">
             <div className="w-1/2 h-full bg-[#F97316]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
           <Step number="1" title="Choisir" desc="Sélectionnez le plan qui correspond à vos objectifs de carrière." />
           <Step number="2" title="Apprendre" desc="Suivez les leçons et complétez les modules interactifs." />
           <Step number="3" title="Pratiquer" desc="Travaillez sur des projets réels simulant un environnement d'entreprise." />
           <Step number="4" title="Décoller" desc="Recevez votre certification et postulez dans les meilleures entreprises tech." />
        </div>
      </section>

      {/* --- Programme de Base (Technologies) --- */}
      <section className="px-12 py-24 bg-blue-50/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-4xl font-black text-slate-900">Technologies au Programme</h3>
          <p className="text-slate-400 font-medium mt-4">Maîtrisez les frameworks et outils les plus demandés du marché.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <TechCard label="Maîtrise HTML5" color="bg-orange-50 text-orange-600" />
          <TechCard label="CSS3 & Layouts" color="bg-blue-50 text-blue-600" />
          <TechCard label="Bootstrap 5" color="bg-purple-50 text-purple-600" />
          <TechCard label="JavaScript ES6+" color="bg-yellow-50 text-yellow-700" />
        </div>
      </section>

      {/* --- Section Témoignage --- */}
      <section className="px-12 py-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div>
           <h3 className="text-4xl font-black text-slate-900 mb-12">Approuvé par la nouvelle génération d'ingénieurs.</h3>
           <div className="bg-slate-50 p-12 rounded-[40px] space-y-6 relative">
              <Quote className="absolute top-8 right-8 text-slate-200" size={60} />
              <p className="text-xl text-slate-600 leading-relaxed italic font-medium relative z-10">
                "Le parcours structuré de CodeBook Academy a changé ma vie. Je suis passé de zéro connaissance à un poste de développeur junior en seulement 6 mois."
              </p>
              <div className="flex items-center gap-4 pt-4">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Sarah Jenkins" />
                 <div>
                    <p className="font-black text-slate-800">Sarah Jenkins</p>
                    <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest">Développeuse Junior</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-6 h-fit pt-10">
           <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-xl h-64 w-full object-cover mt-12" alt="Équipe 1" />
           <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-xl h-64 w-full object-cover" alt="Équipe 2" />
        </div>
      </section>

      {/* --- Footer Simple --- */}
      <footer className="bg-[#1E293B] text-white px-12 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-6">
            <h4 className="text-[#F97316] text-xl font-black">CodeBook Academy</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Former la prochaine génération d'ingénieurs logiciels via un apprentissage immersif et pratique.
            </p>
          </div>
          <FooterLinks title="Support" links={['Facturation', 'Centre d\'aide', 'Sécurité', 'Notre Histoire']} />
          <FooterLinks title="Légal" links={['Mentions Légales', 'Confidentialité', 'Cookies', 'Licences']} />
        </div>
        <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <span>© 2026 CodeBook Academy. Tous droits réservés.</span>
           <div className="flex gap-4">
              <span>Aide Étudiants</span>
              <span>Suggestions</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

/* --- Composants UI --- */

const FeatureBlock = ({ className, icon, title, desc }) => (
  <div className={`p-10 rounded-[32px] border border-slate-50 shadow-sm space-y-6 ${className}`}>
    <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl shadow-inner">
      {icon}
    </div>
    <div className="space-y-2">
      <h4 className="text-xl font-black">{title}</h4>
      <p className="text-sm opacity-80 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="space-y-6 group">
    <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-black text-slate-300 group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-all duration-500">
      {number}
    </div>
    <div>
      <h4 className="font-black text-slate-800 mb-2">{title}</h4>
      <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const TechCard = ({ label, color }) => (
  <div className={`p-8 rounded-[24px] text-center border border-white shadow-sm flex flex-col items-center gap-4 transition-transform hover:-translate-y-2 cursor-default ${color}`}>
    <div className="w-2 h-2 rounded-full bg-current opacity-20" />
    <span className="text-sm font-black uppercase tracking-tight">{label}</span>
  </div>
);

const FooterLinks = ({ title, links }) => (
  <div className="space-y-6">
    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{title}</h5>
    <ul className="space-y-4">
      {links.map(link => (
        <li key={link} className="text-sm font-bold text-slate-400 hover:text-[#F97316] cursor-pointer transition-colors">{link}</li>
      ))}
    </ul>
  </div>
);

export default LandingPage;