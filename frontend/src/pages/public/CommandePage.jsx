import React, { useState } from 'react';
import { Truck, CreditCard, ShieldCheck, ArrowLeft, Package, User, MapPin, Phone, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api'; // Import de votre instance API

const CommandePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  // Gestion des changements d'input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoi vers le Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Endpoint imaginaire /orders ou /checkout
      const response = await API.post('/student/orders', {
        ...formData,
        product: "CodeBook Premium",
        amount: 99
      });

      if (response) {
        alert("Commande confirmée !");
        navigate('/'); // Redirection après succès
      }
    } catch (error) {
      console.error("Erreur commande:", error);
      alert("Une erreur est survenue lors de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <nav className="h-20 bg-white border-b border-slate-100 flex items-center px-6 lg:px-12">
        <Link to="/buy-notebook" className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[#F97316] transition-colors">
          <ArrowLeft size={16} /> Retour
        </Link>
      </nav>

      <main className="max-w-[1500px] mx-auto px-6 lg:px-12 py-12">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Formulaire de Livraison - Plus Large */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-orange-500 rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-orange-200">
                <Truck size={32} />
              </div>
              <div className="space-y-1">
                <h2 className="text-4xl font-[1000] tracking-tighter uppercase text-[#1E293B]">Finaliser l'achat</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Expédition express sécurisée au Maroc</p>
              </div>
            </div>

            <div className="bg-white rounded-[50px] p-10 lg:p-16 border border-slate-100 shadow-sm space-y-10">
              
              {/* Section Identité */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <User size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Destinataire</span>
                  <div className="flex-1 h-px bg-slate-50"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <InputGroup label="Prénom" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Amine" required />
                  <InputGroup label="Nom" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Bennani" required />
                </div>
              </div>

              {/* Section Localisation */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Adresse de livraison</span>
                  <div className="flex-1 h-px bg-slate-50"></div>
                </div>
                <InputGroup label="Adresse complète" name="address" value={formData.address} onChange={handleChange} placeholder="N° 45, Rue des Far, Quartier Gauthier" required />
                <div className="grid md:grid-cols-3 gap-8">
                  <InputGroup label="Ville" name="city" value={formData.city} onChange={handleChange} placeholder="Casablanca" required />
                  <InputGroup label="Code Postal" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="20000" required />
                  <InputGroup label="Téléphone" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 12 34 56 78" required icon={<Phone size={14}/>} />
                </div>
              </div>

              <div className="p-6 bg-orange-50/50 rounded-[30px] border border-orange-100 flex items-start gap-4">
                <ShieldCheck className="text-orange-500 mt-1" size={24} />
                <p className="text-[11px] text-orange-900 font-bold leading-relaxed">
                  Votre CodeBook sera expédié sous <span className="underline">24h ouvrées</span>. Vous recevrez un SMS de confirmation avec votre numéro de suivi dès la sortie de l'entrepôt.
                </p>
              </div>
            </div>
          </div>

          {/* Récapitulatif Commande */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-[#1E293B] rounded-[50px] p-10 text-white space-y-10 shadow-[0_30px_60px_-15px_rgba(30,41,59,0.3)] border border-slate-800">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                  <Package className="text-orange-500" /> Votre Panier
                </h3>
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black italic">x1</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="block font-[1000] text-lg uppercase tracking-tight">CodeBook</span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Learning Ecosystem Access</span>
                  </div>
                  <span className="font-black text-xl tracking-tighter text-orange-500">99 DH</span>
                </div>
                
                <div className="space-y-3 bg-white/5 p-6 rounded-3xl border border-white/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Sous-total</span>
                    <span className="font-black">99.00 DH</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Livraison</span>
                    <span className="font-black text-emerald-400 uppercase italic">Gratuit</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end pt-4">
                <div className="space-y-1">
                  <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Total à payer</span>
                  <span className="block text-5xl font-[1000] tracking-[ -0.05em] leading-none">99<span className="text-lg ml-1">DH</span></span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#F97316] text-white py-7 rounded-[28px] font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-orange-900/40 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
                {loading ? "Traitement..." : "Confirmer l'achat"}
              </button>

              <div className="flex flex-col items-center gap-4 opacity-40">
                <div className="flex gap-4">
                  <div className="h-6 w-10 bg-white/10 rounded-md"></div>
                  <div className="h-6 w-10 bg-white/10 rounded-md"></div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-center">SSL Secure Checkout</p>
              </div>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
};

/* Composant Input Amélioré */
const InputGroup = ({ label, name, value, onChange, placeholder, required, icon }) => (
  <div className="space-y-3 group">
    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 group-focus-within:text-orange-500 transition-colors">
      {icon} {label}
    </label>
    <input 
      type="text" 
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-[#F8FAFC] border-2 border-slate-50 rounded-[24px] p-6 text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 focus:bg-white transition-all placeholder:text-slate-300"
    />
  </div>
);

export default CommandePage;