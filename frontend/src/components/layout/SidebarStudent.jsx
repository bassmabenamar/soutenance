import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Terminal, 
  Award, 
  Settings 
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col py-8 px-4">
      
      {/* Brand */}
      <div className="px-4 mb-10">
        <h1 className="text-[#F97316] text-2xl font-black leading-tight">
          CodeBook<br />Academy
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/courses" icon={BookOpen} label="Course Modules" />
        <SidebarItem to="/qcm" icon={HelpCircle} label="Quizzes" />
        <SidebarItem to="/codelab" icon={Terminal} label="CodeLab" />
        <SidebarItem to="/certifications" icon={Award} label="Mes Certifications" />
        <SidebarItem to="/profile" icon={Settings} label="Profile Settings" />

      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? "bg-orange-50 text-[#F97316]"
            : "text-slate-400 hover:bg-gray-50 hover:text-slate-600"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-r-full" />
          )}

          <Icon size={20} className={isActive ? "text-[#F97316]" : ""} />

          <span className={`text-sm font-bold ${isActive ? "text-[#F97316]" : ""}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;