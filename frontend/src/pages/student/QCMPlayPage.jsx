import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Timer, ChevronRight, CheckCircle2, Loader2, Code, AlertCircle
} from 'lucide-react';
import Sidebar from "../../components/layout/SidebarStudent";
import API from "../../services/api"; // Votre instance Axios

const QCMPlayPage = () => {
  const { languageId } = useParams(); // Récupère "html", "css", etc.
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({}); // Stocke les réponses : {questionId: optionLabel}

  useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const response = await API.get(`/student/qcm/${languageId}`);

      console.log("RAW QUIZ:", response.data);

      setQuizData(response.data);

    } catch (err) {
      console.error("Erreur chargement quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchQuiz();
}, [languageId]);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
      <Loader2 className="text-[#F97316] animate-spin" size={40} />
    </div>
  );

  if (!quizData || quizData.questions.length ===0) return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-slate-400">
      <AlertCircle size={40} className="mb-4" />
      <p>Aucun quiz disponible pour {languageId?.toUpperCase()}.</p>
    </div>
  );

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleValidation = () => {
    if (!selectedOption) return alert("Veuillez sélectionner une réponse.");

    // Enregistrer la réponse
    setAnswers({ ...answers, [currentQuestion.id]: selectedOption });

    // Passer à la suite ou soumettre
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset pour la prochaine question
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      setLoading(true);
      // Endpoint Laravel attendu : Route::post('/student/qcm/submit', ...)
      await API.post('/student/qcm/submit', {
        qcm_id: quizData.id,
        answers: answers
      });
      alert("Quiz terminé et soumis !");
      navigate('/student/qcm/results'); // Rediriger vers les résultats
    } catch (err) {
      alert("Erreur lors de la soumission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      <Sidebar brandName="CodeLink" onLogout={() => {}} />
      
      <main className="flex-1 flex flex-col">
        {/* Header Dynamique */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Quiz : {quizData.title}</h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">Question {currentQuestionIndex + 1} sur {totalQuestions}</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full text-orange-600 font-bold border border-orange-100">
            <Timer size={18} />
            <span>{quizData.time_limit || "15:00"}</span>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="px-10 mt-6">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="flex-1 p-10 flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 relative overflow-hidden">
              <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                {currentQuestion.level || "Concept"}
              </span>

              <h3 className="text-2xl font-extrabold text-slate-800 mb-8 leading-snug">
                {currentQuestion.question_text}
              </h3>

              {/* Code Snippet Optionnel */}
              {currentQuestion.code_snippet && (
                <div className="bg-[#111827] rounded-2xl p-6 font-mono text-sm mb-10 relative group">
                  <div className="absolute top-4 right-4 text-gray-600">
                    <Code size={16} />
                  </div>
                  <pre className="text-orange-400 tracking-tight whitespace-pre-wrap">
                    {currentQuestion.code_snippet}
                  </pre>
                </div>
              )}

              {/* Options List Dynamique */}
              <div className="space-y-4 mb-10">
                {currentQuestion?.options?.map((option, index) => (
                  <QuizOption 
                    key={index}
                    // Génère l'ID A, B, C, D
                    id={String.fromCharCode(65 + index)} 
                    label={option} 
                    isSelected={selectedOption === option} 
                    onClick={() => setSelectedOption(option)}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
                <button 
                  onClick={handleValidation}
                  disabled={!selectedOption}
                  className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestionIndex < totalQuestions - 1 ? "Valider et continuer" : "Terminer le Quiz"}
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Sub-Components (Inchangés, style préservé) --- */
const QuizOption = ({ id, label, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
      isSelected ? 'border-orange-500 bg-orange-50/20' : 'border-gray-100 bg-white hover:border-blue-100'
    }`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
      isSelected ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-50 text-slate-400'
    }`}>
      {id}
    </div>
    <span className={`text-lg font-bold flex-1 ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
      {label}
    </span>
    {isSelected && <CheckCircle2 size={24} className="text-orange-500" />}
  </div>
);

export default QCMPlayPage;