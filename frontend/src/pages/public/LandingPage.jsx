import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, PlayCircle, Layers, MousePointer2, 
  Terminal, Globe, CheckCircle, Quote 
} from 'lucide-react';

const CONTENT = {
  hero: {
    badge: "Nouveau : Masterclass Next.js 14",
    title: { main: "Apprenez le Front-End", highlight: "Plus Vite" },
    desc: "Maîtrisez l'art des applications web modernes. Notre plateforme immersive vous propulse du niveau débutant à expert avec des projets réels.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
  },
  features: [
    { 
      title: "Accès Illimité", 
      desc: "Débloquez tous les cours, du Frontend au DevOps. De nouveaux contenus ajoutés chaque mois.", 
      icon: <Layers className="text-orange-500" />,
      colSpan: "md:col-span-8 bg-white" 
    },
    { 
      title: "Support 24/7", 
      desc: "Ne restez jamais bloqué. Notre communauté et nos assistants IA sont là.", 
      icon: <Globe className="text-white opacity-80" />,
      colSpan: "md:col-span-4 bg-[#5063B0] text-white" 
    },
    { 
      title: "Apprentissage Interactif", 
      desc: "Votre navigateur devient votre éditeur. Pratiquez directement avec notre playground.", 
      icon: <MousePointer2 className="text-orange-500" />,
      colSpan: "md:col-span-4 bg-white" 
    },
    { 
      title: "LMS + QCM + TP", 
      desc: "Une triade complète : cours structurés, quiz de validation et travaux pratiques.", 
      icon: <Terminal className="text-blue-600" />,
      colSpan: "md:col-span-8 bg-blue-50/50 border-blue-100" 
    }
  ],
  steps: [
    { title: "Choisir", desc: "Sélectionnez le plan qui correspond à vos objectifs." },
    { title: "Apprendre", desc: "Suivez les leçons et complétez les modules interactifs." },
    { title: "Pratiquer", desc: "Travaillez sur des projets réels en conditions réelles." },
    { title: "Décoller", desc: "Recevez votre certification et postulez aux meilleurs jobs." }
  ],
  techStack: [
    { label: "HTML5 Mastery", color: "bg-orange-50 text-orange-600" },
    { label: "CSS3 & Layouts", color: "bg-blue-50 text-blue-600" },
    { label: "Bootstrap 5", color: "bg-purple-50 text-purple-600" },
    { label: "JavaScript ES6+", color: "bg-yellow-50 text-yellow-700" }
  ]
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* --- Navigation --- */}
      <nav className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-[#F97316] text-[30px] font-black uppercase tracking-tighter">
            CodeLink Academy
          </Link>
        </div>
        <div className="flex items-center gap-4">
           <Link to="/login" className="bg-[#F97316] text-white px-8 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-orange-100 transition-transform hover:scale-105">Connexion</Link>
        </div>
      </nav>

      {/* --- Section Hero --- */}
      <section className="px-6 lg:px-8 py-20 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
            <span className="text-[10px] font-black text-[#F97316] uppercase tracking-widest">{CONTENT.hero.badge}</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            {CONTENT.hero.title.main} <br />
            <span className="text-[#F97316]">{CONTENT.hero.title.highlight}</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-lg">
            {CONTENT.hero.desc}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-[#F97316] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:scale-105 transition-all">
              Essai Gratuit
            </button>
            <Link to="/buy-notebook" className="text-slate-700 px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 border-2 border-slate-100 hover:bg-slate-50 transition-all">
              <PlayCircle size={22} className="text-blue-500" /> Acheter Nodebook
            </Link>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-10 bg-orange-100/50 rounded-full blur-3xl opacity-60"></div>
          <div className="relative bg-[#1E293B] rounded-[40px] p-2 shadow-2xl overflow-hidden border-8 border-white">
            <img 
              src={CONTENT.hero.image} 
              className="rounded-[32px] opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-700 w-full object-cover" 
              alt="Aperçu de l'IDE"
            />
          </div>
        </div>
      </section>

      {/* --- Section Experience --- */}
      <section className="px-6 lg:px-8 py-24 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl font-black text-slate-900">Une Expérience d'Apprentissage Unique</h3>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">Une méthodologie intégrée aux outils professionnels.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {CONTENT.features.map((feat, idx) => (
              <FeatureBlock 
                key={idx}
                className={feat.colSpan}
                icon={feat.icon}
                title={feat.title}
                desc={feat.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Timeline Steps --- */}
      <section className="px-6 lg:px-8 py-32 max-w-[1400px] mx-auto">
        <div className="mb-20 text-center lg:text-left">
          <h3 className="text-4xl font-black text-slate-900 mb-4">Votre Parcours de Réussite</h3>
          <div className="w-24 h-1.5 bg-orange-100 rounded-full mt-6 overflow-hidden mx-auto lg:mx-0">
             <div className="w-1/2 h-full bg-[#F97316]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative">
           {CONTENT.steps.map((step, idx) => (
             <Step key={idx} number={idx + 1} title={step.title} desc={step.desc} />
           ))}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#1E293B] text-white px-6 lg:px-8 py-20">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-6">
            <h4 className="text-[#F97316] text-xl font-black uppercase">CodeLink Academy</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Former la prochaine génération d'ingénieurs logiciels avec passion.
            </p>
          </div>
          <FooterLinks title="Support" links={['Facturation', 'Centre d\'aide', 'Sécurité']} />
          <FooterLinks title="Légal" links={['Mentions Légales', 'Confidentialité', 'Cookies']} />
        </div>
      </footer>
    </div>
  );
};

// Sous-composants réutilisables
const FeatureBlock = ({ className, icon, title, desc }) => (
  <div className={`p-8 lg:p-10 rounded-[32px] border border-slate-50 shadow-sm space-y-6 transition-all hover:shadow-md ${className}`}>
    <div className="w-12 h-12 flex items-center justify-center bg-slate-50/10 rounded-2xl shadow-inner">{icon}</div>
    <div className="space-y-2">
      <h4 className="text-xl font-black">{title}</h4>
      <p className="text-sm opacity-80 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="space-y-6 group text-center lg:text-left">
    <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-black text-slate-300 group-hover:bg-[#F97316] group-hover:text-white transition-all duration-500 mx-auto lg:mx-0">
      {number}
    </div>
    <div>
      <h4 className="font-black text-slate-800 mb-2 uppercase text-sm tracking-widest">{title}</h4>
      <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
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