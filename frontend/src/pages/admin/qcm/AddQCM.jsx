import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, ChevronRight, ChevronLeft, Loader2, Menu, Save, CheckCircle2, HelpCircle 
} from 'lucide-react';
import API from '../../../services/api'; 
import SidebarAdmin from '../../../components/layout/SidebarAdmin';

// ... reste du code
const AddQCM = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Global settings
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    category: 'Développement Web'
  });

  // Dynamic question list
  const [questions, setQuestions] = useState([
    {
      question_text: '',
      options: ['', '', '', ''],
      correct_answer_index: 0
    }
  ]);

  // --- LOGIC ---
  const addQuestion = () => {
    setQuestions([...questions, {
      question_text: '',
      options: ['', '', '', ''],
      correct_answer_index: 0
    }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].question_text = text;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = text;
    setQuestions(newQuestions);
  };

  const handleSelectCorrect = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correct_answer_index = oIndex;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (!quizInfo.title) return alert("Veuillez donner un titre au Quiz.");
    
    setLoading(true);
    try {
      const dataToSend = { ...quizInfo, questions };
      const response = await API.post('/admin/qcm/store', dataToSend);

      if (response.status === 200 || response.status === 201) {
        alert("QCM publié avec succès !");
        navigate('/admin/qcm');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SidebarAdmin />

      {/* Main Content Area: Added ml-72 to respect sidebar and px-12 for breathing room */}
      <main className="flex-1 ml-72 px-12 py-10 transition-all">
        
        {/* Breadcrumbs & Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button 
              onClick={() => navigate("/admin/qcm")} 
              className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-orange-500 transition-colors mb-2"
            >
              <ChevronLeft size={14} strokeWidth={3} /> Retour aux QCM
            </button>
            <h2 className="text-3xl font-[1000] text-slate-900 tracking-tighter">Création de QCM</h2>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-3 bg-orange-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-200 hover:bg-orange-700 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {loading ? "Publication..." : "Publier le QCM"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Quiz Info & Questions */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Quiz Info Card */}
            <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Paramètres du Quiz</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Titre</label>
                  <input 
                    type="text" 
                    value={quizInfo.title}
                    onChange={(e) => setQuizInfo({...quizInfo, title: e.target.value})}
                    placeholder="ex: Algorithmique Avancée"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none font-bold text-slate-700 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Catégorie</label>
                  <select 
                    value={quizInfo.category}
                    onChange={(e) => setQuizInfo({...quizInfo, category: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700 cursor-pointer focus:bg-white transition-all appearance-none"
                  >
                    <option>Développement Web</option>
                    <option>Cloud Computing</option>
                    <option>Data Science</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              <div className="flex justify-between items-end px-2">
                <h3 className="text-lg font-[1000] text-slate-900 tracking-tight">Questions ({questions.length})</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cochez le cercle pour définir la bonne réponse</p>
              </div>

              {questions.map((q, qIndex) => (
                <div key={qIndex} className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-orange-200 transition-all p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500" />
                  
                  <button 
                    onClick={() => removeQuestion(qIndex)}
                    className="absolute top-8 right-8 text-slate-300 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl font-black text-orange-600 border border-slate-100">
                      {qIndex + 1}
                    </span>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Énoncé de la question</label>
                  </div>

                  <textarea 
                    rows="2"
                    value={q.question_text}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    placeholder="Entrez votre question ici..."
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none font-bold text-slate-700 transition-all mb-8"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {q.options.map((opt, oIndex) => (
                      <AnswerOption 
                        key={oIndex}
                        text={opt} 
                        isSelected={q.correct_answer_index === oIndex} 
                        onClick={() => handleSelectCorrect(qIndex, oIndex)} 
                        onChange={(val) => handleOptionChange(qIndex, oIndex, val)}
                        placeholder={`Option ${oIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <button 
                onClick={addQuestion} 
                className="w-full border-2 border-dashed border-slate-200 rounded-[32px] py-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-white hover:border-orange-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-all mb-4">
                  <Plus size={24} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600">Ajouter une nouvelle question</p>
              </button>
            </div>
          </div>

          {/* Right Column: Tips/Stats */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-200">
              <div className="p-3 bg-slate-800 rounded-2xl w-fit mb-6 text-orange-400">
                <HelpCircle size={24} />
              </div>
              <h4 className="text-lg font-black mb-2">Conseils d'expert</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Un bon QCM comporte généralement 4 options équilibrées. Assurez-vous que l'énoncé est clair et sans ambiguïté.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-xs font-bold text-slate-300">
                  <CheckCircle2 size={16} className="text-orange-500" /> Mélangez les réponses
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-slate-300">
                  <CheckCircle2 size={16} className="text-orange-500" /> Évitez les "Toutes les réponses"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const AnswerOption = ({ text, isSelected, onClick, onChange, placeholder }) => (
  <div 
    className={`flex items-center gap-4 p-4 rounded-[20px] border transition-all ${
      isSelected 
        ? 'border-orange-500 bg-orange-50/50 shadow-sm' 
        : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'
    }`}
  >
    <div 
      onClick={onClick}
      className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
        isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-200'
      }`}
    >
      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
    </div>
    <input 
      type="text"
      value={text}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full placeholder:text-slate-300"
    />
  </div>
);

export default AddQCM;