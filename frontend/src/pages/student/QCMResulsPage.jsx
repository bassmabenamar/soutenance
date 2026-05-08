import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Trophy,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  Target,
  Zap,
  Clock,
  Loader2,
  Home
} from 'lucide-react';

import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api";

const QCMResultsPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // récupérer les résultats envoyés depuis QCMPlayPage
  const [results, setResults] = useState(
    location?.state?.results || null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Si les résultats existent déjà
    if (location?.state?.results) {
      setResults(location.state.results);
      setLoading(false);
      return;
    }

    // Sinon charger depuis backend
    const fetchResults = async () => {
      try {

        const response = await API.get('/student/results');

        // dernier résultat
        const latestResult = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        setResults(latestResult);

      } catch (err) {
        console.error("Erreur chargement résultats :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

  }, [location]);

  // Loader
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <Loader2 className="text-[#F97316] animate-spin" size={40} />
      </div>
    );
  }

  // Aucun résultat
  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <p className="text-slate-400 font-bold">
          Aucun résultat trouvé.
        </p>
      </div>
    );
  }

  const totalQuestions = results.total_questions || 1;

  const scorePercentage = Math.round(
    (results.score / totalQuestions) * 100
  );

  const isPassed = scorePercentage >= 70;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">

      <Sidebar />

      <main className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="max-w-5xl mx-auto flex items-center justify-between mb-10">

          <button
            onClick={() => navigate('/student/qcm')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-bold transition-colors"
          >
            <ChevronLeft size={20} />
            Retour aux Quiz
          </button>

          

        </div>

        <div className="max-w-5xl mx-auto space-y-8">

          {/* SCORE CARD */}
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">

            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50"></div>

            {/* cercle */}
            <div className="relative w-48 h-48 flex items-center justify-center">

              <svg className="w-full h-full transform -rotate-90">

                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-100"
                />

                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={552.92}
                  strokeDashoffset={
                    552.92 - (552.92 * scorePercentage) / 100
                  }
                  strokeLinecap="round"
                  className={
                    isPassed
                      ? "text-green-500"
                      : "text-orange-500"
                  }
                />

              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-[1000] text-slate-800">
                  {scorePercentage}%
                </span>

                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Score Final
                </span>
              </div>

            </div>

            {/* texte */}
            <div className="flex-1 text-center md:text-left z-10">

              <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${
                isPassed
                  ? "bg-green-50 text-green-600"
                  : "bg-orange-50 text-orange-600"
              }`}>

                {isPassed
                  ? <Trophy size={14} />
                  : <Zap size={14} />
                }

                {isPassed
                  ? "Certification Débloquée"
                  : "Encore un effort !"
                }

              </div>

              <h1 className="text-4xl font-[1000] text-slate-800 mb-4 leading-tight">

                {isPassed
                  ? "Excellent travail !"
                  : "Continuez d'apprendre !"
                }

              </h1>

              <p className="text-slate-500 font-medium max-w-md leading-relaxed">

                Vous avez répondu correctement à

                <span className="font-bold text-slate-800">
                  {" "} {results.score} questions
                </span>

                {" "}sur un total de {totalQuestions}.

              </p>

            </div>

            {/* boutons */}
            <div className="flex flex-col gap-3 w-full md:w-auto">

              <button
                onClick={() =>
                  navigate(`/student/qcm/${results.category || results.language_id}`)
                }
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#002366] text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-105 transition-all"
              >
                <RotateCcw size={18} />
                Rejouer
              </button>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <StatSmallCard
              icon={<Target className="text-blue-500" />}
              label="Précision"
              value={`${scorePercentage}%`}
              desc="Exactitude des réponses"
            />

            <StatSmallCard
              icon={<CheckCircle2 className="text-green-500" />}
              label="Correctes"
              value={results.score}
              desc="Bonnes réponses"
            />

            <StatSmallCard
              icon={<Clock className="text-purple-500" />}
              label="Temps"
              value={results.duration || "00:00"}
              desc="Durée de la session"
            />

          </div>

        </div>

      </main>

    </div>
  );
};

const StatSmallCard = ({ icon, label, value, desc }) => (
  <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm flex items-start gap-4">

    <div className="p-3 bg-gray-50 rounded-2xl">
      {icon}
    </div>

    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>

      <p className="text-xl font-black text-slate-800 leading-none mb-1">
        {value}
      </p>

      <p className="text-[10px] font-medium text-slate-400 italic">
        {desc}
      </p>
    </div>

  </div>
);

export default QCMResultsPage;