import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Loader2,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Layout,
  Sparkles
} from "lucide-react";

import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api";

const LanguagePage = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get(`/courses/category/${languageId}`);

        console.log("API RESPONSE:", res.data);

        // ✅ SAFE NORMALIZATION (prevents .map crash)
        const data = res.data;

        const safeCourses = Array.isArray(data?.courses)
          ? data.courses
          : Array.isArray(data)
          ? data
          : [];

        setCourses(safeCourses);
      } catch (err) {
        console.error("Erreur lors du chargement des cours:", err);
        setCourses([]); // never undefined
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [languageId]);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      
      {/* Sidebar */}
      <Sidebar
        brandName="CodeLink"
        onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <header className="px-12 pt-16 pb-8">

          <button
            onClick={() => navigate("/student/courses")}
            className="flex items-center gap-2 text-[#F97316] font-bold text-sm mb-6 hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft size={18} />
            Retour au catalogue
          </button>

          <span className="bg-orange-100 text-[#F97316] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
            Parcours {languageId}
          </span>

          <h2 className="text-5xl font-black text-slate-800 mt-6 mb-4 flex items-center gap-4">
            Modules {languageId?.toUpperCase()}
            <Sparkles className="text-[#F97316]" fill="currentColor" />
          </h2>

          <p className="text-slate-400 text-lg font-medium max-w-2xl">
            Progressez étape par étape à travers les modules de {languageId}.
          </p>
        </header>

        {/* CONTENT */}
        <div className="px-12 pb-20">

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Loader2 className="text-[#F97316] animate-spin" size={48} />
              <p className="text-slate-400 font-bold">
                Chargement des cours...
              </p>
            </div>
          ) : courses.length > 0 ? (
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* SAFE MAP */}
              {(courses || []).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() =>
                    navigate(
                      `/student/language/${languageId}/details`,
                      { state: { courseId: course.id } }
                    )
                  }
                />
              ))}

            </div>

          ) : (
            <div className="bg-white p-12 rounded-[40px] text-center border border-dashed border-slate-200">
              <Layout size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">
                Aucun cours disponible pour cette catégorie.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

/* =========================
   COURSE CARD
========================= */
const CourseCard = ({ course, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer"
    >
      <div className="flex justify-between items-center mb-6">

        <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-[#F97316] transition-colors">
          <BookOpen className="text-[#F97316] group-hover:text-white" size={20} />
        </div>

        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-50 rounded-full">
          {course.level || "Tous niveaux"}
        </span>

      </div>

      <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-[#F97316] transition-colors">
        {course.title}
      </h3>

      <p className="text-slate-400 text-sm line-clamp-3">
        {course.description}
      </p>

      <div className="mt-8 pt-6 border-t flex items-center justify-between">
        <span className="text-[11px] font-black text-slate-300">
          {course.file_size || "N/A"}
        </span>

        <div className="flex items-center gap-2 font-black text-sm group-hover:translate-x-2 transition-transform">
          Commencer <ChevronRight size={18} className="text-[#F97316]" />
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;