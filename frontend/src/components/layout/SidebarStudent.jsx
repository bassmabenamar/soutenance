import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Terminal,
  Award,
  Settings,
  LogOut,
  FileCode,
} from "lucide-react";

import API from "../../services/api"; // ✅ use your axios instance

/* =========================
   NAVIGATION CONFIG
========================= */
const NAVIGATION_LINKS = [
  { to: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard", role: "user" },
  { to: "/student/courses", icon: BookOpen, label: "Courses", role: "user" },
  { to: "/student/qcm", icon: HelpCircle, label: "Quizzes", role: "user" },

  // ✅ ADD THIS
  { to: "/student/tps", icon: FileCode, label: "TP", role: "user" },

  { to: "/student/codelab", icon: Terminal, label: "CodeLab", role: "user" },
  { to: "/student/certifications", icon: Award, label: "Certifications", role: "user" },
  { to: "/student/profile", icon: Settings, label: "Profile", role: "user" },
];

/* =========================
   SIDEBAR COMPONENT
========================= */
const Sidebar = ({ userRole = "user", brandName = "CodeLink" }) => {
  const navigate = useNavigate();

  const links = NAVIGATION_LINKS.filter(
    (link) => link.role === "user" || link.role === userRole
  );

  /* =========================
     LOGOUT FUNCTION
  ========================= */
  const handleLogout = async () => {
    try {
      await API.post("/logout"); // Laravel logout

      // remove token
      localStorage.removeItem("token");

      // redirect
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col py-8 px-4">

      {/* =========================
          BRAND
      ========================= */}
      <div className="px-4 mb-10">
        <h1 className="text-[#F97316] text-2xl font-black">
          {brandName}
          <span className="text-slate-200">.</span>
        </h1>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="flex-1 space-y-2">
        {links.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      {/* =========================
          FOOTER + LOGOUT
      ========================= */}
      <div className="px-4 mt-auto pt-10 space-y-4">

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#F97316]-50 text-[#F97316]-500 font-bold hover:bg-orange-500 hover:text-white transition-all"
        >
          <LogOut size={18} />
          Déconnexion
        </button>

        {/* VERSION */}
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          CodeLink v1.0
        </p>
      </div>
    </aside>
  );
};

/* =========================
   SIDEBAR ITEM
========================= */
const SidebarItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
          isActive
            ? "bg-orange-50 text-[#F97316] shadow-sm"
            : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* ACTIVE BAR */}
          {isActive && (
            <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-r-full shadow" />
          )}

          {/* ICON */}
          <Icon
            size={20}
            className={isActive ? "text-[#F97316]" : "text-slate-400"}
          />

          {/* LABEL */}
          <span className={`text-sm font-bold ${isActive ? "text-[#F97316]" : ""}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;