import React, { useState } from 'react';
import { 
  BookOpen, QrCode, Laptop, ShieldCheck, 
  ChevronDown, CheckCircle2, Truck, ArrowRight, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_DATA = {
  product: {
    name: "CodeBook",
    subtitle: "Premium Edition",
    price: "99",
    currency: "DH",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1000",
    description: "Accédez à une plateforme complète avec un simple scan. Transformez votre façon d'apprendre le code avec l'alliance parfaite du papier et du numérique."
  },
  features: [
    { 
      icon: <BookOpen className="text-orange-500" />, 
      title: "Notebook physique", 
      desc: "Un carnet premium conçu pour les développeurs, avec des grilles de conception." 
    },
    { 
      icon: <QrCode className="text-orange-500" />, 
      title: "Accès plateforme", 
      desc: "Le QR code unique intégré vous ouvre les portes de notre écosystème numérique." 
    },
    { 
      icon: <Laptop className="text-orange-500" />, 
      title: "Cours + QCM + exercices", 
      desc: "Bibliothèque complète de ressources interactives et quiz de validation." 
    }
  ],
  faqs: [
    { q: "Comment fonctionne le QR Code ?", a: "Scannez le code unique sur la première page pour activer votre accès." },
    { q: "Puis-je l'utiliser sur plusieurs appareils ?", a: "Oui, jusqu'à 3 appareils simultanément avec synchronisation." },
    { q: "Quels sont les délais de livraison ?", a: "Entre 24h et 72h partout au Maroc." }
  ]
};

const NotebookPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <nav className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-50">
        <Link to="/" className="text-[#F97316] text-xl font-black uppercase tracking-tighter">CodeLink Academy</Link>
        <Link to="/login" className="text-xs font-black uppercase text-slate-400 hover:text-[#F97316]">Connexion</Link>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 space-y-20">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#F97316] text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest">
              <Star size={12} fill="currentColor" /> {PAGE_DATA.product.subtitle}
            </div>
            <h2 className="text-5xl lg:text-7xl font-[1000] leading-[1.1] text-[#1E293B] tracking-tighter">
              Achetez votre <br /> <span className="text-[#F97316]">{PAGE_DATA.product.name}</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg font-medium">
              {PAGE_DATA.product.description}
            </p>
            <Link to="/commande" className="inline-flex items-center gap-4 bg-[#F97316] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-orange-200 hover:scale-105 transition-all group">
              Commander maintenant <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-200/30 rounded-[48px] blur-3xl group-hover:bg-orange-300/40 transition-colors"></div>
            <img 
              src={PAGE_DATA.product.image} 
              className="relative rounded-[40px] shadow-2xl border-[12px] border-white object-cover h-[500px] w-full transition-transform duration-700 group-hover:scale-[1.02]"
              alt="Notebook"
            />
          </div>
        </section>

        {/* Features & Security */}
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[48px] p-10 lg:p-16 border border-slate-100 shadow-sm space-y-12">
            <h3 className="text-3xl font-black tracking-tight">Le Pack Complet</h3>
            <div className="grid gap-10">
              {PAGE_DATA.features.map((f, i) => (
                <FeatureItem key={i} icon={f.icon} title={f.title} desc={f.desc} />
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-[48px] p-10 text-white flex flex-col justify-between overflow-hidden relative group">
            <ShieldCheck className="absolute -right-8 -top-8 text-white/5 group-hover:scale-110 transition-transform" size={240} />
            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight">Multi-Appareils</h4>
              <p className="text-slate-400 font-medium leading-relaxed">
                Connectez-vous sur PC, Tablette et Mobile. Votre progression est sauvegardée dans le cloud CodeLink.
              </p>
            </div>
            <div className="flex gap-4 relative z-10 pt-10">
               {['💻', '📱', '🖥️'].map((emoji, i) => (
                 <div key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 transition-colors">{emoji}</div>
               ))}
            </div>
          </div>
        </section>

        {/* Pricing Banner */}
        <section>
          <div className="bg-[#F97316] rounded-[40px] p-10 lg:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-200">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-4xl font-[1000] tracking-tighter uppercase">Offre de lancement</h3>
              <p className="text-orange-100 font-bold opacity-80 uppercase tracking-widest text-xs">Paiement unique • Accès à vie • Livraison 48h</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex items-start gap-1">
                <span className="text-7xl font-[1000] tracking-tighter">{PAGE_DATA.product.price}</span>
                <span className="text-2xl font-black mt-2">{PAGE_DATA.product.currency}</span>
              </div>
              <Link to="/commande" className="bg-[#1E293B] px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-black transition-all shadow-xl">
                Valider ma commande
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-12 pb-20">
          <h3 className="text-4xl font-black text-center tracking-tighter">Questions Fréquentes</h3>
          <div className="grid gap-4">
            {PAGE_DATA.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

/* Sub-components */
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex gap-6 items-start group">
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
      {icon}
    </div>
    <div className="space-y-1">
      <h4 className="font-black text-xl text-slate-800">{title}</h4>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={`bg-white p-8 rounded-[32px] border transition-all cursor-pointer ${isOpen ? 'border-orange-500 ring-4 ring-orange-50' : 'border-slate-100'}`}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-black text-slate-800 tracking-tight">{question}</h4>
        <ChevronDown className={`text-orange-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && <p className="mt-4 text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2">{answer}</p>}
    </div>
  );
};

export default NotebookPage;