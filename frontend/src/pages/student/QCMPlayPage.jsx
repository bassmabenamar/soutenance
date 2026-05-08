import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Timer,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Code,
  AlertCircle
} from 'lucide-react';

import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api";

const QCMPlayPage = () => {

  const { languageId } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);

  // answers => {0: "answer", 1: "answer"}
  const [answers, setAnswers] = useState({});

  useEffect(() => {

    const fetchQuiz = async () => {

      try {

        const response = await API.get(`/student/qcm/${languageId}`);

        console.log("QUIZ DATA:", response.data);

        setQuizData(response.data);

      } catch (err) {

        console.error("Erreur chargement quiz :", err);

      } finally {

        setLoading(false);

      }
    };

    fetchQuiz();

  }, [languageId]);

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <Loader2 className="text-[#F97316] animate-spin" size={40} />
      </div>
    );
  }

  // NO QUIZ
  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-slate-400 flex-col">
        <AlertCircle size={40} className="mb-4" />
        <p>Aucun quiz disponible.</p>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const totalQuestions = quizData.questions.length;

  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // =========================
  // NEXT QUESTION
  // =========================
  const handleValidation = () => {

    if (!selectedOption) {
      alert("Veuillez sélectionner une réponse.");
      return;
    }

    // SAVE ANSWER USING QUESTION INDEX
    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedOption
    };

    setAnswers(updatedAnswers);

    // NEXT QUESTION
    if (currentQuestionIndex < totalQuestions - 1) {

      setCurrentQuestionIndex(prev => prev + 1);

      setSelectedOption(null);

    } else {

      submitQuiz(updatedAnswers);

    }
  };

  // =========================
  // SUBMIT QUIZ
  // =========================
  const submitQuiz = async (finalAnswers) => {

    try {

      setLoading(true);

      console.log("ANSWERS SENT:", finalAnswers);

      const response = await API.post(
        '/student/qcm/submit',
        {
          qcm_id: quizData.id,
          answers: finalAnswers
        }
      );

      console.log("RESULT:", response.data);

      navigate('/student/qcm/results', {
        state: {
          results: response.data
        }
      });

    } catch (err) {

      console.error(err);

      alert("Erreur lors de la soumission.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">

      <Sidebar />

      <main className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Quiz : {quizData.title}
            </h2>

            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Question {currentQuestionIndex + 1} sur {totalQuestions}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full text-orange-600 font-bold border border-orange-100">
            <Timer size={18} />
            <span>{quizData.time_limit || 15} min</span>
          </div>

        </header>

        {/* PROGRESS */}
        <div className="px-10 mt-6">

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1 p-10 flex justify-center">

          <div className="w-full max-w-4xl">

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">

              {/* LEVEL */}
              <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">

                {currentQuestion.level || "Concept"}

              </span>

              {/* QUESTION */}
              <h3 className="text-2xl font-extrabold text-slate-800 mb-8 leading-snug">

                {currentQuestion.question_text}

              </h3>

              {/* CODE */}
              {currentQuestion.code_snippet && (

                <div className="bg-[#111827] rounded-2xl p-6 font-mono text-sm mb-10 relative">

                  <Code
                    size={16}
                    className="absolute top-4 right-4 text-gray-500"
                  />

                  <pre className="text-orange-400 whitespace-pre-wrap">
                    {currentQuestion.code_snippet}
                  </pre>

                </div>

              )}

              {/* OPTIONS */}
              <div className="space-y-4 mb-10">

                {currentQuestion.options.map((option, index) => (

                  <QuizOption
                    key={index}
                    id={String.fromCharCode(65 + index)}
                    label={option}
                    isSelected={selectedOption === option}
                    onClick={() => setSelectedOption(option)}
                  />

                ))}

              </div>

              {/* BUTTON */}
              <div className="flex items-center gap-6 pt-6 border-t border-gray-50">

                <button
                  onClick={handleValidation}
                  disabled={!selectedOption}
                  className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >

                  {currentQuestionIndex < totalQuestions - 1
                    ? "Valider et continuer"
                    : "Terminer le Quiz"}

                  <ChevronRight size={20} />

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

// =========================
// OPTION COMPONENT
// =========================
const QuizOption = ({
  id,
  label,
  isSelected,
  onClick
}) => (

  <div
    onClick={onClick}
    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
      isSelected
        ? 'border-orange-500 bg-orange-50/20'
        : 'border-gray-100 bg-white hover:border-blue-100'
    }`}
  >

    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
      isSelected
        ? 'bg-orange-500 text-white'
        : 'bg-gray-50 text-slate-400'
    }`}>

      {id}

    </div>

    <span className={`text-lg font-bold flex-1 ${
      isSelected
        ? 'text-slate-800'
        : 'text-slate-500'
    }`}>

      {label}

    </span>

    {isSelected && (
      <CheckCircle2
        size={24}
        className="text-orange-500"
      />
    )}

  </div>
);

export default QCMPlayPage;