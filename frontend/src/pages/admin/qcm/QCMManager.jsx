import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, BarChart2, Edit3, Trash2, ChevronLeft, ChevronRight, 
  FileText, Database, Code2, Sparkles, Loader2
} from 'lucide-react';

// Import de votre Sidebar existante

// Import de votre instance Axios configurée
import API from '../../../services/api'; 
import SidebarAdmin from '../../../components/layout/SidebarAdmin';

const QCMManager = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Chargement des données depuis Laravel ---
  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/qcm');
      setQuizzes(response.data);
    } catch (error) {
      console.error("Erreur Backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce QCM ?")) {
      try {
        await API.delete(`/admin/qcm/${id}`);
        setQuizzes(quizzes.filter(q => q.id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  // Filtrage local pour la recherche
  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats dynamiques basées sur les données réelles
  const stats = [
    { label: "Total Quiz", value: quizzes.length },
    { label: "Questions Actives", value: quizzes.reduce((acc, q) => acc + (q.qs || 0), 0) },
    { label: "Taux de Réussite", value: "72%", isPercent: true },
    { label: "Drafts", value: "0" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarAdmin />

      <main className="flex-1 ml-72 p-10">
        
        {/* --- Header & Action --- */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#002366] mb-2">Gestionnaire de QCM</h1>
            <p className="text-slate-400 font-medium">Créez, modifiez et analysez vos évaluations interactives.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/qcm/add')}
            className="bg-[#F48120] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg shadow-orange-100 flex items-center gap-2"
          >
            <Plus size={18} strokeWidth={3} />
            Nouveau Quiz
          </motion.button>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm"
            >
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">{s.label}</p>
              <h3 className={`text-3xl font-black ${s.isPercent ? 'text-blue-500' : 'text-[#002366]'}`}>{s.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* --- Liste des Quiz --- */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 w-5 h-5 rounded-md flex items-center justify-center">
                 <CheckIcon className="text-white w-3 h-3" />
              </div>
              <h2 className="text-lg font-black text-[#002366]">Quiz Publiés</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher un quiz..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-orange-100 w-64 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Loader2 className="animate-spin mb-2" size={32} />
                  <p className="font-bold">Synchronisation avec le serveur...</p>
                </div>
              ) : filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((q) => (
                  <QuizRow key={q.id} quiz={q} onDelete={() => handleDelete(q.id)} />
                ))
              ) : (
                <div className="bg-white p-10 rounded-[24px] border-2 border-dashed border-slate-100 text-center text-slate-400">
                   Aucun quiz trouvé.
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* --- Pagination --- */}
        <div className="flex justify-center items-center gap-3 mb-12">
           <ChevronLeft className="text-slate-300 cursor-pointer hover:text-orange-500 transition-colors" size={20} />
           <PageNum num={1} active />
           <PageNum num={2} />
           <ChevronRight className="text-slate-300 cursor-pointer hover:text-orange-500 transition-colors" size={20} />
        </div>

        {/* --- AI Promo Card --- */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative rounded-[40px] overflow-hidden bg-[#002366] p-12 text-white flex items-center justify-between"
        >
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-black mb-4 leading-tight">Besoin d'aide pour générer vos questions ?</h3>
            <p className="text-slate-300 mb-8 text-sm leading-relaxed">Gagnez du temps en utilisant notre IA pour générer des questions pertinentes basées sur vos cours en un clic.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-white text-[#002366] px-8 py-4 rounded-2xl font-black text-sm"
            >
              Essayer l'IA Générative
            </motion.button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/20 to-transparent"></div>
          <Sparkles className="absolute right-20 top-1/2 -translate-y-1/2 text-orange-500 opacity-20" size={180} />
        </motion.div>
      </main>
    </div>
  );
};

// --- Composant Ligne de Quiz ---
const QuizRow = ({ quiz, onDelete }) => {
  // Déterminer l'icône selon la catégorie
  const isDev = quiz.category?.toLowerCase().includes('web') || quiz.category?.toLowerCase().includes('js');
  const isData = quiz.category?.toLowerCase().includes('sql') || quiz.category?.toLowerCase().includes('data');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-50 flex items-center justify-between"
    >
      <div className="flex items-center gap-5 flex-1">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isDev ? 'text-orange-500 bg-orange-50' : isData ? 'text-blue-500 bg-blue-50' : 'text-purple-500 bg-purple-50'
        }`}>
          {isDev ? <Code2 size={20}/> : isData ? <Database size={20}/> : <FileText size={20}/>}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-black text-[#002366]">{quiz.title}</h4>
            <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
              quiz.status === 'PUBLISHED' || quiz.status === 'ACTIF' ? 'bg-green-50 text-green-500' : 'bg-slate-100 text-slate-400'
            }`}>
              {quiz.status}
            </span>
          </div>
          <p className="text-xs text-slate-400">{quiz.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-12 text-center">
        <StatMini label="Questions" value={quiz.qs || 0} />
        <StatMini label="Réponses" value={quiz.resp || 0} />
        <StatMini label="Succès" value={quiz.success || "0%"} color="text-green-500" />
        
        <div className="flex items-center gap-3 ml-4">
          <ActionButton icon={<BarChart2 size={16}/>} color="text-slate-400 hover:text-[#002366]" />
          <ActionButton icon={<Edit3 size={16}/>} color="text-slate-400 hover:text-orange-500" />
          <ActionButton 
            icon={<Trash2 size={16}/>} 
            color="text-slate-400 hover:text-red-500" 
            onClick={onDelete}
          />
        </div>
      </div>
    </motion.div>
  );
};

// --- Helpers de style ---
const ActionButton = ({ icon, color, onClick }) => (
  <motion.button 
    whileHover={{ scale: 1.1 }} 
    whileTap={{ scale: 0.9 }} 
    onClick={onClick}
    className={`p-2 rounded-lg transition-colors ${color}`}
  >
    {icon}
  </motion.button>
);

const StatMini = ({ label, value, color = "text-[#002366]" }) => (
  <div className="w-16">
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mb-1">{label}</p>
    <p className={`text-sm font-black ${color}`}>{value}</p>
  </div>
);

const PageNum = ({ num, active = false }) => (
  <button className={`w-9 h-9 rounded-xl font-black text-sm transition-all ${
    active ? 'bg-[#F48120] text-white shadow-lg shadow-orange-100' : 'text-slate-400 hover:bg-white'
  }`}>
    {num}
  </button>
);

const CheckIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
  </svg>
);

export default QCMManager;