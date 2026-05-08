import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Search, MoreHorizontal, 
  TrendingUp, Zap, GraduationCap, Ban, 
  Loader2, CheckCircle, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api';

const UsersManager = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigete=useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completion: 0,
    blocked: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  setLoading(true);
  try {
    const response = await API.get('/admin/users');

    console.log("API RESPONSE:", response.data); // IMPORTANT DEBUG

    const users = response.data?.users || response.data?.data?.users || [];
    const summary = response.data?.summary || response.data?.data?.summary || {
      total: 0,
      active: 0,
      completion: 0,
      blocked: 0
    };

    setStudents(users);
    setStats(summary);

  } catch (error) {
    console.error("Erreur API:", error);
    setStudents([]); // avoid crash
  } finally {
    setLoading(false);
  }
};
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Actif' ? 'Bloqué' : 'Actif';

      await API.patch(`/admin/users/${userId}/status`, {
        status: newStatus
      });

      setStudents(prev =>
        prev.map(s =>
          s.id === userId ? { ...s, status: newStatus } : s
        )
      );

    } catch (error) {
      alert("Erreur lors du changement de statut");
    }
  };

  const filteredStudents = students.filter(s =>
    (s?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s?.access_code || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 ml-72 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-[1000] text-[#002366] mb-2 tracking-tighter">
              Utilisateurs
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              Contrôle des accès & monitoring
            </p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold outline-none w-64"
              />
            </div>

            
  <button onClick={()=>navigete('/add/user')} className="bg-[#F48120] text-white px-8 py-3.5 rounded-2xl font-[1000] text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-orange-200">
    <UserPlus size={16} />
    Nouveau
  </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <StatCard icon={<TrendingUp size={18}/>} label="Total" value={stats.total} />
          <StatCard icon={<Zap size={18}/>} label="Actifs" value={stats.active} />
          <StatCard icon={<GraduationCap size={18}/>} label="Score" value={`${stats.completion}%`} />
          <StatCard icon={<Ban size={18}/>} label="Bloqués" value={stats.blocked} />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[30px] border border-slate-100 overflow-hidden">

          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase text-slate-300 border-b">
                <th className="p-6 text-left">Utilisateur</th>
                <th className="p-6 text-left">Progression</th>
                <th className="p-6 text-left">Statut</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2 className="animate-spin text-orange-500 mx-auto" />
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {filteredStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b hover:bg-slate-50"
                    >

                      {/* USER */}
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-500">
                            {(student?.name || "?").charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-[#002366]">
                              {student?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-slate-400">
                              {student?.access_code || "---"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* PROGRESS */}
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-slate-100 rounded-full">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${student?.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-xs font-black">
                            {student?.progress || 0}%
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="p-6">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${
                          student?.status === 'Actif'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {student?.status || 'Inconnu'}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-6 text-right">
                        <button
                          onClick={() =>
                            toggleUserStatus(student.id, student.status)
                          }
                          className="text-slate-400 hover:text-orange-500"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>

                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>

          </table>
        </div>

      </main>
    </div>
  );
};

/* ================= STATS CARD ================= */
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100">
    <div className="flex justify-between mb-3 text-orange-500">{icon}</div>
    <p className="text-2xl font-black text-[#002366]">{value}</p>
    <p className="text-[10px] uppercase text-slate-300 font-bold">{label}</p>
  </div>
);

export default UsersManager;