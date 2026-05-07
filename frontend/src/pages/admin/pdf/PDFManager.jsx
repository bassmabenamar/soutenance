import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, FileText, Eye, 
  Trash2, TrendingUp, Menu, Loader2, ChevronRight, Filter
} from 'lucide-react';

import SidebarAdmin from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api';

const PDFManager = () => {
  const navigate = useNavigate();
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/courses'); 
      const data = response.data.courses || response.data;
      setPdfs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- SUPPRESSION RÉELLE ---
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce document ?")) {
      try {
        await API.delete(`/admin/courses/${id}`);
        // Mise à jour immédiate de l'interface
        setPdfs(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression sur le serveur.");
      }
    }
  };

  // --- LOGIQUE DE FILTRES DYNAMIQUES ---
  // On extrait les catégories uniques présentes en BDD pour les afficher dans les boutons
  const dynamicCategories = ["Tous", ...new Set(pdfs.map(item => item.category))];

  const filteredData = pdfs.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "Tous" || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      <SidebarAdmin />

      <main className="flex-1 ml-72 p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Menu className="text-slate-400" size={20} />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Espace Administration</h2>
          </div>
        </header>

        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#002366] mb-2 tracking-tight">Gestionnaire PDF</h1>
            <p className="text-slate-400 font-medium">Gestion en direct de la table <code className="bg-slate-100 px-1 rounded text-orange-600">courses</code></p>
          </div>
          <button 
            onClick={() => navigate('/admin/pdf/add')}
            className="bg-[#F48120] text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-lg hover:bg-orange-600 transition-all"
          >
            <Plus size={20} /> Nouveau PDF
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-3 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Documents en ligne</p>
            <h3 className="text-5xl font-black text-[#002366]">{pdfs.length}</h3>
          </div>

          <div className="col-span-9 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher par titre..." 
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <Filter size={14} className="text-slate-300 mr-2" />
              {dynamicCategories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-black whitespace-nowrap transition-all ${
                    filter === cat 
                    ? 'bg-[#002366] text-white shadow-md' 
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {cat?.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-32 flex flex-col items-center">
              <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
              <p className="text-slate-400 font-bold">Synchronisation...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Titre du cours</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Catégorie</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Niveau</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredData.map((item) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      key={item.id} 
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#002366]">{item.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{item.file_size || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase border ${getCatStyle(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {item.level}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          {/* VOIR LE PDF */}
                          <button 
                            onClick={() => window.open(`http://localhost:8000/storage/${item.file_path}`, '_blank')}
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            title="Visualiser"
                          >
                            <Eye size={18} />
                          </button>
                          {/* SUPPRIMER */}
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

const getCatStyle = (cat) => {
  const c = cat?.toUpperCase();
  if (c === 'HTML') return 'bg-orange-50 text-orange-600 border-orange-100';
  if (c === 'CSS') return 'bg-blue-50 text-blue-600 border-blue-100';
  if (c === 'JS' || c === 'JAVASCRIPT') return 'bg-yellow-50 text-yellow-600 border-yellow-100';
  return 'bg-slate-50 text-slate-600 border-slate-100';
};

export default PDFManager;