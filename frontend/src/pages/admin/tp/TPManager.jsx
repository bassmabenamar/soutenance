import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Filter, Edit2, 
  Trash2, ChevronLeft, ChevronRight, 
  Users, BarChart3, Terminal, Loader2,
  AlertCircle, CheckCircle2
} from 'lucide-react';

import SidebarAdmin from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api'; // Votre instance Axios

const TPManager = () => {
  const navigate = useNavigate();
  const [tps, setTps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ total: 0, averageDifficulty: '...', activeStudents: 0 });

  // --- CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    fetchTPs();
  }, []);

  const fetchTPs = async () => {
    setLoading(true);
    try {
      const response = await API.get('/admin/tp'); // Votre route GET
      setTps(response.data.tps);
      setStats(response.data.stats); // Supposons que le backend renvoie aussi les stats
    } catch (error) {
      console.error("Erreur lors du chargement des TP:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- SUPPRESSION ---
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce TP ?")) {
      try {
        await API.delete(`/admin/tp/${id}`);
        setTps(tps.filter(tp => tp.id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  // --- FILTRE DYNAMIQUE ---
  const filteredTPs = tps.filter(tp => 
    tp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarAdmin />

      <motion.main 
        initial="hidden" animate="visible" variants={containerVariants}
        className="flex-1 ml-72 p-10 space-y-8"
      >
        {/* --- Header --- */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-[1000] text-[#002366] flex items-center gap-3 tracking-tighter">
            <span className="w-1.5 h-6 bg-[#F48120] rounded-full"></span>
            Gestion des Travaux Pratiques
          </h1>
          <div className="flex items-center gap-4">
            <motion.button 
              onClick={() => navigate('/admin/tp/add')}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(244, 129, 32, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F48120] text-white px-8 py-4 rounded-[22px] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-orange-100 transition-all"
            >
              <Plus size={18} strokeWidth={3} /> Nouveau TP
            </motion.button>
          </div>
        </div>

        {/* --- Stats --- */}
        <div className="grid grid-cols-3 gap-8">
          <StatCard icon={<Terminal className="text-orange-500" />} label="Total TP" value={stats.total} bg="bg-orange-50" />
          <StatCard icon={<BarChart3 className="text-blue-500" />} label="Difficulté" value={stats.averageDifficulty} bg="bg-blue-50" />
          <StatCard icon={<Users className="text-green-500" />} label="Étudiants" value={stats.activeStudents} bg="bg-green-50" />
        </div>

        {/* --- Table Section --- */}
        <motion.div variants={itemVariants} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
            <div className="relative w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre ou ID..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent focus:border-orange-200 focus:bg-white rounded-[20px] text-sm font-bold outline-none transition-all"
              />
            </div>
            <div className="flex gap-4">
               <FilterButton label="Filtres avancés" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
                  <th className="px-10 py-6">Informations</th>
                  <th className="px-10 py-6">Catégorie</th>
                  <th className="px-10 py-6">Difficulté</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="relative">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-orange-500" size={32} />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Chargement des données...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredTPs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <p className="text-slate-400 font-bold">Aucun TP trouvé.</p>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredTPs.map((tp) => (
                      <motion.tr 
                        layout
                        key={tp.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer"
                      >
                        <td className="px-10 py-6">
                          <h4 className="text-sm font-black text-[#002366] group-hover:text-[#F48120] transition-colors">{tp.title}</h4>
                          <span className="text-[10px] font-bold text-slate-300 tracking-tighter uppercase">{tp.id}</span>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-[9px] font-black px-3 py-1.5 rounded-lg bg-white border border-slate-100 text-slate-400 uppercase">
                            {tp.category}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(tp.difficulty)}`} />
                            <span className="text-[11px] font-bold text-[#002366]">{tp.difficulty}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right space-x-2">
                          <button 
                            onClick={() => navigate(`/admin/tp/edit/${tp.id}`)}
                            className="p-2.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <Edit2 size={16}/>
                          </button>
                          <button 
                            onClick={() => handleDelete(tp.id)}
                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={16}/>
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

// --- Helpers ---
const getDifficultyColor = (diff) => {
  switch(diff?.toLowerCase()) {
    case 'débutant': return 'bg-green-500';
    case 'avancé': return 'bg-red-500';
    default: return 'bg-blue-500';
  }
};

const StatCard = ({ icon, label, value, bg }) => (
  <motion.div whileHover={{ y: -8 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm flex items-center gap-6">
    <div className={`${bg} p-4 rounded-2xl shadow-inner`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-[1000] text-[#002366] tracking-tighter">{value}</p>
    </div>
  </motion.div>
);

const FilterButton = ({ label }) => (
  <button className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-[18px] text-[11px] font-black text-slate-400 hover:text-orange-500 hover:border-orange-100 transition-all flex items-center gap-3">
    <Filter size={14} /> {label}
  </button>
);

export default TPManager;