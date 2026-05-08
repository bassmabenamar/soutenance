import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, ArrowLeft, Mail, User, Shield, 
  Lock, CheckCircle2, Loader2, KeyRound 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api';

const AddUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    access_code:"",// Sera utilisé comme code d'accès dans votre logique
    password: '',
    role: 'student',
    status: 'Actif'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ajustez l'URL selon votre route Laravel (ex: /admin/users/store)
      await API.post('/admin/qcm/store', formData); 
      setSuccess(true);
      setTimeout(() => navigate('/admin/users'), 2000);
    } catch (error) {
      console.error("Erreur creation:", error);
      alert("Erreur lors de la création de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <motion.main 
        initial="hidden" animate="visible" variants={containerVariants}
        className="flex-1 ml-72 p-10"
      >
        {/* --- Header --- */}
        <div className="flex items-center gap-6 mb-12">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/admin/users')}
            className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-orange-500 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </motion.button>
          <div>
            <h1 className="text-4xl font-[1000] text-[#002366] mb-1 tracking-tighter">
              Nouvel Étudiant
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
              Création d'accès plateforme
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* --- Formulaire --- */}
          <div className="col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-[40px] p-12 border border-slate-50 shadow-sm relative overflow-hidden">
              
              {success && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mb-4">
                    <CheckCircle2 size={40} strokeWidth={3} />
                  </div>
                  <h2 className="text-2xl font-[1000] text-[#002366] mb-2">Utilisateur créé !</h2>
                  <p className="text-slate-400 font-bold">Redirection vers la liste...</p>
                </motion.div>
              )}

              <div className="space-y-8">
                {/* Section Informations */}
                <div>
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1 mb-4 block">
                    Identité de l'élève
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup 
                      label="Nom Complet" 
                      icon={<User size={18}/>} 
                      placeholder="ex: Marc Lefebvre"
                      value={formData.name}
                      onChange={(val) => setFormData({...formData, name: val})}
                    />
                    <InputGroup 
                      label="Code d'accès " 
                      icon={<Mail size={18}/>} 
                      placeholder="CB-001"
                      value={formData.access_code}
                      onChange={(val) => setFormData({...formData, access_code: val})}
                    />
                  </div>
                </div>

                {/* Section Sécurité */}
                <div className="pt-4">
                   <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1 mb-4 block">
                    Sécurité & Rôle
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup 
                      label="Mot de passe" 
                      type="password"
                      icon={<Lock size={18}/>} 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(val) => setFormData({...formData, password: val})}
                    />
                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-black text-[#002366] ml-1">Rôle Système</p>
                      <select 
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      >
                        <option value="student">Étudiant</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#F48120] text-white py-5 rounded-2xl font-[1000] text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-xl shadow-orange-100 mt-6 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><UserPlus size={20} strokeWidth={3} /> Valider l'inscription</>}
                </motion.button>
              </div>
            </form>
          </div>

          {/* --- Sidebar Info --- */}
          <div className="col-span-5 space-y-8">
            <div className="bg-[#002366] rounded-[40px] p-10 text-white shadow-2xl shadow-blue-100 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors" />
              <Shield className="text-orange-500 mb-6" size={40} strokeWidth={2.5} />
              <h3 className="text-2xl font-[1000] mb-4 tracking-tight leading-tight">Sécurité des accès</h3>
              <p className="text-blue-200/70 text-sm font-bold leading-relaxed mb-6">
                Chaque nouvel étudiant reçoit un code d'accès unique. Assurez-vous que le rôle correspond aux permissions souhaitées.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-100">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" /> Statut actif par défaut
                </li>
                <li className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-100">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" /> Monitoring de progression
                </li>
              </ul>
            </div>

           
          </div>
        </div>
      </motion.main>
    </div>
  );
};

// --- Sous-composant Input ---
const InputGroup = ({ label, icon, placeholder, type = "text", value, onChange }) => (
  <div className="flex flex-col gap-3">
    <p className="text-xs font-black text-[#002366] ml-1">{label}</p>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors">
        {icon}
      </div>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-orange-500/5 transition-all"
        required
      />
    </div>
  </div>
);

export default AddUser;