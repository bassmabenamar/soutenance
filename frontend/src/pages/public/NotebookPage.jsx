
import React from 'react';
import { 
  BookOpen, QrCode, Laptop, ShieldCheck, 
  ChevronDown, CheckCircle2, Truck 
} from 'lucide-react';

const NotebookPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- Navigation --- */}
      <nav className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <h1 className="text-[#F97316] text-xl font-black uppercase tracking-tighter">CodeBook Academy</h1>
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
            <a href="#" className="text-[#F97316]">Achat</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Tableau de bord</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Aide</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-full border-2 border-orange-100" alt="Profil" />
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="bg-orange-100 text-[#F97316] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            Premium Edition
          </span>
          <h2 className="text-5xl font-black leading-tight text-[#1E293B]">
            Achetez votre <br /> <span className="text-[#F97316]">CodeBook</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-medium">
            Accédez à une plateforme complète avec un simple scan. Transformez votre façon d'apprendre le code avec l'alliance parfaite du papier et du numérique.
          </p>
          <button className="bg-[#F97316] text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl shadow-orange-200 hover:scale-105 transition-all">
            Commander maintenant
          </button>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-orange-100/50 rounded-[40px] blur-2xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1000" 
            className="relative rounded-[32px] shadow-2xl border-8 border-white object-cover h-[400px] w-full"
            alt="Notebook"
          />
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-[40px] p-12 border border-slate-100 shadow-sm space-y-10">
          <h3 className="text-2xl font-black">Le Pack CodeBook</h3>
          
          <div className="space-y-8">
            <FeatureItem 
              icon={<BookOpen className="text-orange-500" />}
              title="Notebook physique"
              desc="Un carnet premium conçu pour les développeurs, avec des grilles de conception et du papier de haute qualité."
            />
            <FeatureItem 
              icon={<QrCode className="text-orange-500" />}
              title="Accès plateforme"
              desc="Le QR code unique intégré vous ouvre les portes de notre écosystème numérique exclusif."
            />
            <FeatureItem 
              icon={<Laptop className="text-orange-500" />}
              title="Cours + QCM + exercices"
              desc="Bibliothèque complète de ressources interactives, quiz de validation et exercices pratiques."
            />
          </div>
        </div>

        <div className="bg-[#0F172A] rounded-[40px] p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={120} />
          </div>
          <div className="space-y-6 relative z-10">
            <ShieldCheck className="text-orange-500" size={32} />
            <h4 className="text-xl font-bold">Sécurité & Partage</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Votre licence est protégée. Le contenu premium est accessible sur un maximum de 3 appareils simultanément pour votre confort.
            </p>
          </div>
          <div className="flex gap-3 pt-8">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">💻</div>
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">📱</div>
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">🖥️</div>
          </div>
        </div>
      </section>

      {/* --- Pricing Banner --- */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[32px] border-2 border-orange-500 p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-orange-500 text-white px-6 py-1 text-[10px] font-black uppercase rounded-br-2xl">
            Meilleure Offre
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black">Investissez dans votre futur</h3>
            <p className="text-slate-400 font-medium text-sm">Un paiement unique pour une année d'excellence technique.</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <span className="text-5xl font-black text-slate-900">99</span>
              <span className="text-xl font-black text-orange-500 ml-2">DH</span>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-1">Livraison incluse partout au Maroc</p>
            </div>
            <button className="bg-[#F97316] text-white px-8 py-4 rounded-xl font-black shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">
              Valider ma commande
            </button>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        <h3 className="text-4xl font-black text-center">Questions Fréquentes</h3>
        <div className="space-y-4">
          <FAQItem 
            question="Comment fonctionne le QR Code ?"
            answer="Chaque CodeBook contient un QR code unique imprimé sur la première page. Scannez-le avec votre smartphone pour activer instantanément votre accès à la plateforme CodeBook Academy."
          />
          <FAQItem 
            question="Puis-je l'utiliser sur plusieurs appareils ?"
            answer="Oui, vous pouvez connecter jusqu'à 3 appareils (ex: PC, Tablette, Smartphone). Votre progression est synchronisée en temps réel entre tous vos terminaux."
          />
          <FAQItem 
            question="Quels sont les délais de livraison ?"
            answer="La livraison standard prend entre 24h et 72h selon votre ville au Maroc. Vous recevrez un numéro de suivi dès l'expédition de votre commande."
          />
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-100 py-12 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <h4 className="text-[#F97316] font-black uppercase">CodeBook Academy</h4>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 CodeBook Academy. Propulsé par l'excellence technique.</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-orange-500">A propos</a>
            <a href="#" className="hover:text-orange-500">Support</a>
            <a href="#" className="hover:text-orange-500">Confidentialité</a>
            <a href="#" className="hover:text-orange-500">Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* --- Sub-components --- */

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex gap-6 items-start">
    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="space-y-1">
      <h4 className="font-black text-lg text-slate-800">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 group cursor-pointer hover:border-orange-200 transition-all">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-bold text-slate-800">{question}</h4>
      <ChevronDown className="text-orange-500 group-hover:translate-y-1 transition-transform" size={20} />
    </div>
    <p className="text-slate-400 text-sm leading-relaxed font-medium">
      {answer}
    </p>
  </div>
);

export default NotebookPage;