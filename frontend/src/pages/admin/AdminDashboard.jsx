import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, BookOpen, Users, Bell, Search, 
  Zap, ShoppingBag, TrendingUp, MoreHorizontal
} from 'lucide-react';

import SidebarAdmin from '../../components/layout/SidebarAdmin';
import API from '../../services/api';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStatsData(res.data);
      } catch (err) {
        console.error("Stats error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Configuration des cartes de statistiques
  const cards = useMemo(() => {
    if (!statsData) return [];
    return [
      { label: "Étudiants", value: statsData.students_total, icon: <Users size={22} />, color: "text-blue-600", bg: "bg-blue-50" },
      { label: "Cours PDF", value: statsData.pdf_courses, icon: <FileText size={22} />, color: "text-orange-600", bg: "bg-orange-50" },
      { label: "Quiz QCM", value: statsData.qcm_total, icon: <BookOpen size={22} />, color: "text-purple-600", bg: "bg-purple-50" },
      { label: "Commandes", value: statsData.orders, icon: <ShoppingBag size={22} />, color: "text-emerald-600", bg: "bg-emerald-50" },
      { label: "Actifs", value: statsData.active_sessions, icon: <Zap size={22} />, color: "text-amber-600", bg: "bg-amber-50" },
    ];
  }, [statsData]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-700">
      <SidebarAdmin />

      <main className="flex-1 ml-72 p-10">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-[1000] text-slate-900 tracking-tight">Vue d'ensemble</h1>
            <p className="text-slate-400 font-medium mt-1">Bon retour, Administrateur.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input
                className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl w-80 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
              <Bell size={20} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* STATS GRID - 5 Columns */}
        <div className="grid grid-cols-5 gap-6 mb-10">
          {loading ? (
             [...Array(5)].map((_, i) => <div key={i} className="h-32 bg-white animate-pulse rounded-[32px] border border-slate-50" />)
          ) : (
            cards.map((s, i) => (
              <StatCard key={i} stat={s} index={i} />
            ))
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* CHART AREA */}
          <div className="col-span-8 bg-white p-10 rounded-[48px] border border-slate-50 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900">Activité de la plateforme</h3>
              <div className="flex gap-2">
                <span className="px-4 py-1.5 bg-slate-50 text-slate-400 text-xs font-bold rounded-full">Hebdomadaire</span>
              </div>
            </div>

            <div className="flex items-end gap-4 h-64 px-4">
              {[30, 45, 35, 70, 50, 85, 100, 75, 90, 65].map((h, i) => (
                <Bar key={i} height={h} index={i} isPeak={i === 6} />
              ))}
            </div>
          </div>

          {/* RECENT ORDERS / SIDEBAR */}
          <div className="col-span-4 space-y-6">
            <div className="bg-[#1E293B] p-8 rounded-[40px] text-white shadow-xl shadow-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg">Dernières Ventes</h3>
                <ShoppingBag size={20} className="text-orange-500" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div>
                      <p className="text-sm font-bold">Commande #84{i}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">CodeBook Premium</p>
                    </div>
                    <span className="text-orange-500 font-black text-sm">99 DH</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-xs font-black uppercase tracking-widest">
                Voir toutes les commandes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ===== SUB-COMPONENTS ===== */

const StatCard = ({ stat, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
      {stat.icon}
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
      <h2 className="text-2xl font-[1000] text-slate-900 tracking-tighter">{stat.value}</h2>
    </div>
  </motion.div>
);

const Bar = ({ height, isPeak }) => (
  <div className="flex-1 group relative">
    <motion.div 
      initial={{ height: 0 }}
      animate={{ height: `${height}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`w-full rounded-2xl cursor-pointer transition-all duration-300 ${
        isPeak ? 'bg-orange-500 shadow-lg shadow-orange-100' : 'bg-slate-100 group-hover:bg-slate-200'
      }`}
    />
  </div>
);

export default AdminDashboard;