import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, ChevronLeft, Loader2, Save
} from 'lucide-react';
import API from '../../../services/api';
import SidebarAdmin from '../../../components/layout/SidebarAdmin';

const AddQCM = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Quiz info
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    category: 'Développement Web',
    language_id: '',
    time_limit: 15
  });

  // Questions
  const [questions, setQuestions] = useState([
    {
      question_text: '',
      options: ['', '', '', ''],
      correct_answer_index: 0
    }
  ]);

  // Languages STATIC (✔️ what you asked)
  const languages = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'Bootstrap' },
  ];

  /* =========================
     LOGIC
  ========================= */

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        options: ['', '', '', ''],
        correct_answer_index: 0
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index, text) => {
    const updated = [...questions];
    updated[index].question_text = text;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, text) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = text;
    setQuestions(updated);
  };

  const handleSelectCorrect = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correct_answer_index = oIndex;
    setQuestions(updated);
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async () => {
    if (!quizInfo.title) {
      return alert("Veuillez donner un titre au Quiz.");
    }

    if (!quizInfo.language_id) {
      return alert("Veuillez sélectionner une langue.");
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...quizInfo,
        questions
      };

      const response = await API.post('/admin/qcm/store', dataToSend);

      if (response.status === 200 || response.status === 201) {
        alert("QCM publié avec succès !");
        navigate('/admin/qcm');
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SidebarAdmin />

      <main className="flex-1 ml-72 px-12 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate("/admin/qcm")}
              className="text-sm font-bold text-slate-400 mb-2 flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Retour
            </button>

            <h1 className="text-3xl font-black text-[#002366]">
              Création de QCM
            </h1>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {loading ? "Publication..." : "Publier"}
          </button>
        </div>

        {/* QUIZ INFO */}
        <div className="bg-white p-8 rounded-2xl mb-8">
          <div className="grid grid-cols-3 gap-6">

            {/* TITLE */}
            <input
              type="text"
              placeholder="Titre du quiz"
              value={quizInfo.title}
              onChange={(e) =>
                setQuizInfo({ ...quizInfo, title: e.target.value })
              }
              className="p-3 border rounded-xl"
            />

            {/* CATEGORY */}
            <select
              value={quizInfo.category}
              onChange={(e) =>
                setQuizInfo({ ...quizInfo, category: e.target.value })
              }
              className="p-3 border rounded-xl"
            >
              <option>Développement Web</option>
              <option>Cloud Computing</option>
              <option>Data Science</option>
            </select>

            {/* LANGUAGE (HTML/CSS/JS/BOOTSTRAP) */}
            <select
              value={quizInfo.language_id}
              onChange={(e) =>
                setQuizInfo({ ...quizInfo, language_id: e.target.value })
              }
              className="p-3 border rounded-xl"
            >
              <option value="">Choisir une langue</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* QUESTIONS */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white p-6 rounded-2xl mb-6">

            <textarea
              placeholder="Question"
              value={q.question_text}
              onChange={(e) =>
                handleQuestionChange(qIndex, e.target.value)
              }
              className="w-full p-3 border rounded-xl mb-4"
            />

            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex gap-2">

                  <input
                    type="radio"
                    checked={q.correct_answer_index === oIndex}
                    onChange={() =>
                      handleSelectCorrect(qIndex, oIndex)
                    }
                  />

                  <input
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className="border p-2 rounded w-full"
                    placeholder={`Option ${oIndex + 1}`}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => removeQuestion(qIndex)}
              className="text-red-500 mt-4 flex items-center gap-2"
            >
              <Trash2 size={16} /> Supprimer
            </button>
          </div>
        ))}

        {/* ADD QUESTION */}
        <button
          onClick={addQuestion}
          className="bg-slate-100 px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus /> Ajouter question
        </button>

      </main>
    </div>
  );
};

export default AddQCM;