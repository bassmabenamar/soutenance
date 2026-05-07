import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, BookOpen, Users, Bell, MoreHorizontal,
  Plus, UserPlus, ShieldAlert, CheckCircle2, Zap,
  TrendingUp, Star, Search
} from 'lucide-react';

import SidebarAdmin from '../../components/layout/SidebarAdmin';
import API from '../../services/api';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // ✅ REAL DATA FROM BACKEND
  const [stats, setStats] = useState([]);

  const [activities] = useState([
    { id: 1, icon: <UserPlus size={16} />, title: "Nouvel étudiant inscrit", desc: "Marc Lefebvre a rejoint le cours Python.", time: "IL Y A 2 MIN", color: "blue" },
    { id: 2, icon: <BookOpen size={16} />, title: "Nouveau quiz publié", desc: "Algorithmie Avancée est en ligne.", time: "IL Y A 15 MIN", color: "orange" },
    { id: 3, icon: <CheckCircle2 size={16} />, title: "Validation de session", desc: "Sophie Durand a complété le TP Docker.", time: "IL Y A 1H", color: "green" },
    { id: 4, icon: <ShieldAlert size={16} />, title: "Alerte système", desc: "Pic de charge détecté sur le serveur.", time: "IL Y A 2H", color: "purple" },
  ]);

  const [courses] = useState([
    { id: 1, name: "Fullstack Javascript", sub: "Expertise Web", students: 3120, rating: 4.9, progress: 82, logo: "JS", color: "bg-blue-600" },
    { id: 2, name: "Python pour Data Science", sub: "Analyse de données", students: 2845, rating: 4.7, progress: 65, logo: "Py", color: "bg-slate-900" },
    { id: 3, name: "UI/UX Design Master", sub: "Figma & Adobe", students: 1950, rating: 4.8, progress: 45, logo: "UI", color: "bg-pink-500" },
    { id: 4, name: "DevOps & Cloud", sub: "Docker & AWS", students: 1200, rating: 4.6, progress: 30, logo: "D", color: "bg-cyan-600" },
  ]);

  // ✅ FETCH BACKEND STATS
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");

        setStats([
          {
            label: "ÉTUDIANTS TOTAL",
            value: res.data.students_total,
            growth: "+12%",
            icon: <Users size={20} />,
            color: "blue",
          },
          {
            label: "COURS PDF",
            value: res.data.pdf_courses,
            growth: "+5",
            icon: <FileText size={20} />,
            color: "orange",
          },
          {
            label: "QUIZ QCM",
            value: res.data.qcm_total,
            growth: "+214",
            icon: <BookOpen size={20} />,
            color: "purple",
          },
          {
            label: "SESSIONS ACTIVES",
            value: res.data.active_sessions,
            growth: "Live",
            icon: <Zap size={20} />,
            color: "green",
          },
        ]);
      } catch (err) {
        console.log("Stats error:", err);
      }
    };

    fetchStats();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses
      .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => filterType === "top" ? b.rating - a.rating : 0);
  }, [searchTerm, filterType]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-700 overflow-x-hidden">

      
        <SidebarAdmin />
      

      <main className="flex-1 ml-72 p-10">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-slate-300" size={18} />
            <input
              className="pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl w-80"
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <Bell size={20} />
            <img src="https://i.pravatar.cc/100?u=admin" className="w-11 h-11 rounded-2xl" />
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} index={i} />
          ))}
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-8 bg-white p-8 rounded-[48px]">
            <h3 className="text-xl font-black mb-6">Analyse de Croissance</h3>

            <div className="flex items-end gap-3 h-64">
              {[40, 65, 45, 85, 55, 95, 100, 80].map((h, i) => (
                <Bar key={i} height={h} index={i} isPeak={i === 6} />
              ))}
            </div>
          </div>

          <div className="col-span-4 bg-white p-8 rounded-[48px]">
            <h3 className="text-xl font-black mb-6">Activités</h3>

            {activities.map(a => (
              <ActivityItem key={a.id} {...a} />
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-8 rounded-[48px] mt-10">
          <h3 className="text-xl font-black mb-6">Gestion des Formations</h3>

          <table className="w-full">
            <thead>
              <tr>
                <th>Formation</th>
                <th>Étudiants</th>
                <th>Note</th>
                <th>Progression</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map(c => (
                <CourseRow key={c.id} {...c} />
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

/* ===== COMPONENTS (UNCHANGED STYLE) ===== */

const StatCard = ({ stat }) => (
  <div className="bg-white p-7 rounded-[32px] border">
    <h2 className="text-3xl font-black">{stat.value}</h2>
    <p className="text-xs uppercase">{stat.label}</p>
  </div>
);

const Bar = ({ height }) => (
  <div className="flex-1 bg-slate-100 rounded-xl" style={{ height: `${height}%` }} />
);

const ActivityItem = ({ icon, title, desc }) => (
  <div className="flex gap-3 mb-4">
    <div>{icon}</div>
    <div>
      <p className="font-bold text-sm">{title}</p>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  </div>
);

const CourseRow = ({ name, students, rating, progress }) => (
  <tr className="border-t">
    <td className="py-4">{name}</td>
    <td>{students}</td>
    <td>{rating}</td>
    <td>{progress}%</td>
  </tr>
);

export default AdminDashboard;