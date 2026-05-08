import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, BarChart2, Edit3, Trash2,
  ChevronLeft, ChevronRight,
  FileText, Database, Code2, Sparkles, Loader2, AlertCircle
} from 'lucide-react';

import API from '../../../services/api';
import SidebarAdmin from '../../../components/layout/SidebarAdmin';

const QCMManager = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.get('/admin/qcm');

      // safer backend handling
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setQuizzes(data);

    } catch (err) {
      console.error(err);
      setError("Erreur de chargement des QCM");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce QCM ?")) return;

    try {
      await API.delete(`/admin/qcm/${id}`);
      setQuizzes(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      alert("Erreur suppression");
    }
  };

  /* =========================
     FILTER (SAFE)
  ========================= */
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(q => {
      const title = q.title?.toLowerCase() || "";
      const category = q.category?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return title.includes(search) || category.includes(search);
    });
  }, [quizzes, searchTerm]);

  /* =========================
     REAL STATS
  ========================= */
  const stats = useMemo(() => {
    const total = quizzes.length;

    const totalQuestions = quizzes.reduce(
      (acc, q) => acc + (q.questions_count || q.qs || 0),
      0
    );

    const active = quizzes.filter(q =>
      q.status === "ACTIVE" || q.status === "PUBLISHED"
    ).length;

    return [
      { label: "Total QCM", value: total },
      { label: "Questions", value: totalQuestions },
      { label: "Actifs", value: active },
      { label: "Brouillons", value: total - active }
    ];
  }, [quizzes]);

  /* =========================
     UI STATES
  ========================= */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col text-red-500">
        <AlertCircle size={40} />
        <p className="mt-2 font-bold">{error}</p>
        <button
          onClick={loadQuizzes}
          className="mt-4 px-4 py-2 bg-black text-white rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  /* =========================
     MAIN UI
  ========================= */
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarAdmin />

      <main className="flex-1 ml-72 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#002366]">
              Gestion QCM
            </h1>
            <p className="text-slate-400">
              Gestion réelle des évaluations
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/qcm/add')}
            className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
          >
            <Plus size={18} />
            Nouveau QCM
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold">{s.label}</p>
              <h2 className="text-2xl font-black text-[#002366]">
                {s.value}
              </h2>
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div className="mb-6 flex items-center gap-3">
          <Search className="text-slate-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher QCM..."
            className="w-full p-3 rounded-xl border"
          />
        </div>

        {/* LIST */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            Aucun QCM trouvé
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuizzes.map((q) => (
              <QuizRow key={q.id} quiz={q} onDelete={handleDelete} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

/* =========================
   QUIZ ROW (REAL CLEAN)
========================= */
const QuizRow = ({ quiz, onDelete }) => {
  return (
    <div className="bg-white p-5 rounded-2xl flex justify-between items-center">

      <div>
        <h3 className="font-bold text-[#002366]">
          {quiz.title}
        </h3>
        <p className="text-sm text-slate-400">
          {quiz.category}
        </p>
      </div>

      <div className="flex gap-3">

        <button className="p-2 hover:text-blue-500">
          <BarChart2 size={18} />
        </button>

        <button className="p-2 hover:text-orange-500">
          <Edit3 size={18} />
        </button>

        <button
          onClick={() => onDelete(quiz.id)}
          className="p-2 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
};

export default QCMManager;