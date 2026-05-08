import React from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Layers,
  Users,
  LogOut,
} from "lucide-react";

import API from "../../services/api"; // ✅ axios instance

const SidebarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* =========================
     NAV ITEMS
  ========================= */
  const items = [
    { label: "Tableau de bord", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Gestion des PDF", path: "/admin/pdf", icon: FileText },
    { label: "Gestion des QCM", path: "/admin/qcm", icon: BookOpen },
    { label: "Gestion des TP", path: "/admin/tp", icon: Layers },
    { label: "Utilisateurs", path: "/admin/users", icon: Users },
  ];

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = async () => {
    try {
      await API.post("/logout"); // Laravel logout
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      
      {/* =========================
          LOGO
      ========================= */}
      <div className="p-8 border-b border-slate-100">
        <span className="text-[#F48120] font-black text-2xl tracking-tighter">
          CodeLink
        </span>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink key={i} to={item.path}>
              <motion.div
                whileHover={{ x: 6 }}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all ${
                  isActive
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-bold">{item.label}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* =========================
          FOOTER + LOGOUT
      ========================= */}
      <div className="p-6 border-t border-slate-100 space-y-4">

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#F48120]-50 text-[#F48120]-500 font-bold hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={18} />
          Déconnexion
        </button>

        {/* VERSION */}
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">
          Admin Panel v1.0
        </p>
      </div>
    </aside>
  );
};

export default SidebarAdmin;