import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Search, MoreHorizontal, 
  TrendingUp, Zap, GraduationCap, Ban, 
  Loader2, CheckCircle, XCircle, ShieldCheck
} from 'lucide-react';

import Sidebar from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api'; // Votre instance Axios

const UsersManager = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({ total: 0, active: 0, completion: 0, blocked: 0 });

  // --- CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get('/admin/users');
      setStudents(response.data.users);
      setStats(response.data.summary);
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS (BLOQUER / ACTIVER) ---
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Actif' ? 'Bloqué' : 'Actif';
      await API.patch(`/admin/users/${userId}/status`, { status: newStatus });
      
      // Mise à jour optimiste de l'UI
      setStudents(prev => prev.map(s => 
        s.id === userId ? { ...s, status: newStatus } : s
      ));
    } catch (error) {
      alert("Erreur lors du changement de statut");
    }
  };

  // --- FILTRE DYNAMIQUE ---
 const filteredStudents = students.filter(s =>
  s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  s.access_code.toLowerCase().includes(searchTerm.toLowerCase())
);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <motion.main 
        initial="hidden" animate="visible" variants={containerVariants}
        className="flex-1 ml-72 p-10"
      >
        {/* --- Header --- */}
        <div className="flex justify-between items-start mb-10">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-[1000] text-[#002366] mb-2 tracking-tighter">
              Utilisateurs
            </h1>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest text-[10px]">
              Contrôle des accès & monitoring
            </p>
          </motion.div>
          <div className="flex gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
               <input 
                type="text"
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-orange-500/5 transition-all w-64 focus:w-80"
               />
            </div>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-[#F48120] text-white px-8 py-3.5 rounded-2xl font-[1000] text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-orange-200"
            >
              <UserPlus size={18} strokeWidth={3} /> Nouveau
            </motion.button>
          </div>
        </div>

        {/* --- Stats Summary --- */}
        <div className="grid grid-cols-4 gap-8 mb-10">
          <StatCard icon={<TrendingUp size={18}/>} label="Total" value={stats.total} trend="+5%" />
          <StatCard icon={<Zap size={18}/>} label="Actifs" value={stats.active} iconColor="text-blue-500" />
          <StatCard icon={<GraduationCap size={18}/>} label="Score" value={`${stats.completion}%`} iconColor="text-purple-500" />
          <StatCard icon={<Ban size={18}/>} label="Bloqués" value={stats.blocked} iconColor="text-red-500" />
        </div>

        {/* --- Table Section --- */}
        <motion.section variants={itemVariants} className="bg-white rounded-[40px] border border-slate-50 shadow-sm overflow-hidden mb-10">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Profil Étudiant</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Progression</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">État</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-right">Gestion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 relative">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2 className="animate-spin text-orange-500 mx-auto" size={32} />
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {filteredStudents.map((student) => (
                    <motion.tr 
                      layout
                      key={student.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors`}>
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-[#002366] tracking-tight">{student.name}</p>
                            <p className="text-[11px] text-slate-400 font-bold">{student.access_code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-[100px] overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${student.progress}%` }}
                              className="h-full bg-orange-500 rounded-full" 
                            />
                          </div>
                          <span className="text-[10px] font-black text-slate-700">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-[1000] uppercase tracking-wider ${
                          student.status === 'Actif' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'Actif' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                          {student.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ActionButton 
                            onClick={() => toggleUserStatus(student.id, student.status)}
                            icon={student.status === 'Actif' ? <XCircle size={16}/> : <CheckCircle size={16}/>} 
                            color={student.status === 'Actif' ? 'hover:text-red-500' : 'hover:text-green-500'}
                          />
                          <ActionButton icon={<MoreHorizontal size={16}/>} />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </motion.section>
      </motion.main>
    </div>
  );
};

// --- Composants Helpers ---
const StatCard = ({ icon, label, value, trend, iconColor = "text-orange-500" }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={`${iconColor} bg-slate-50 p-2.5 rounded-[14px]`}>{icon}</div>
      {trend && <span className="text-green-500 font-black text-[9px] bg-green-50 px-2 py-0.5 rounded-full">{trend}</span>}
    </div>
    <p className="text-3xl font-[1000] text-[#002366] tracking-tighter mb-1">{value}</p>
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
  </motion.div>
);

const ActionButton = ({ icon, color = "text-slate-300 hover:text-orange-500", onClick }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    className={`p-2 ${color} transition-all hover:bg-white rounded-lg shadow-none hover:shadow-sm`}
  >
    {icon}
  </button>
);

export default UsersManager;