import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  FileText,
  Eye,
  Trash2,
  Menu,
  Loader2,
  Filter,
} from 'lucide-react';

import SidebarAdmin from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api';

const PDFManager = () => {
  const navigate = useNavigate();

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Tous');

  useEffect(() => {
    fetchPDFs();
  }, []);

  /* =========================
     FETCH PDFs
  ========================= */
  const fetchPDFs = async () => {
    try {
      setLoading(true);

      const response = await API.get('/admin/courses');

console.log(response);
console.log(response.data);

setPdfs(response.data);

      // Laravel returns array directly
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setPdfs(data);

    } catch (error) {
      console.error('Erreur fetch PDFs:', error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE PDF
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Voulez-vous vraiment supprimer ce document ?'
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/courses/${id}`);

      setPdfs((prev) => prev.filter((item) => item.id !== id));

    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression.');
    }
  };

  /* =========================
     FILTERS
  ========================= */
  const dynamicCategories = [
    'Tous',
    ...new Set(
      pdfs
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  const filteredData = pdfs.filter((item) => {
    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === 'Tous' || item.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      <SidebarAdmin />

      <main className="flex-1 ml-72 p-10">

        {/* ================= HEADER ================= */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Menu className="text-slate-400" size={20} />

            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
              Espace Administration
            </h2>
          </div>
        </header>

        {/* ================= TOP ================= */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#002366] mb-2 tracking-tight">
              Gestionnaire PDF
            </h1>

            <p className="text-slate-400 font-medium">
              Gestion en direct de la table{' '}
              <code className="bg-slate-100 px-1 rounded text-orange-600">
                courses
              </code>
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/pdf/add')}
            className="bg-[#F48120] text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-lg hover:bg-orange-600 transition-all"
          >
            <Plus size={20} />
            Nouveau PDF
          </button>
        </div>

        {/* ================= STATS + FILTER ================= */}
        <div className="grid grid-cols-12 gap-6 mb-8">

          {/* COUNT */}
          <div className="col-span-3 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
              Documents en ligne
            </p>

            <h3 className="text-5xl font-black text-[#002366]">
              {pdfs.length}
            </h3>
          </div>

          {/* SEARCH */}
          <div className="col-span-9 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">

            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={20}
              />

              <input
                type="text"
                placeholder="Rechercher par titre..."
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* FILTER BUTTONS */}
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

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">

          {loading ? (
            <div className="py-32 flex flex-col items-center">
              <Loader2
                className="animate-spin text-orange-500 mb-4"
                size={40}
              />

              <p className="text-slate-400 font-bold">
                Synchronisation...
              </p>
            </div>
          ) : filteredData.length === 0 ? (

            /* EMPTY STATE */
            <div className="py-32 flex flex-col items-center">
              <FileText size={60} className="text-slate-200 mb-4" />

              <h3 className="text-xl font-bold text-slate-500 mb-2">
                Aucun PDF trouvé
              </h3>

              <p className="text-slate-400">
                Ajoutez votre premier document PDF.
              </p>
            </div>

          ) : (
            <table className="w-full text-left">

              {/* TABLE HEAD */}
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Titre du cours
                  </th>

                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Catégorie
                  </th>

                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Niveau
                  </th>

                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredData.map((item) => (
                    <motion.tr
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      {/* TITLE */}
                      <td className="p-6">
                        <div className="flex items-center gap-4">

                          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                            <FileText size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-[#002366]">
                              {item.title}
                            </p>

                            <p className="text-[10px] text-slate-400 font-medium">
                              {item.description || 'Document PDF'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-md text-[10px] font-black uppercase border ${getCatStyle(
                            item.category
                          )}`}
                        >
                          {item.category || 'N/A'}
                        </span>
                      </td>

                      {/* LEVEL */}
                      <td className="p-6">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {item.level}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">

                          {/* VIEW PDF */}
                          <button
                            onClick={() =>
                              window.open(
                                `http://localhost:8000/storage/${item.file_path}`,
                                '_blank'
                              )
                            }
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            title="Visualiser"
                          >
                            <Eye size={18} />
                          </button>

                          {/* DELETE */}
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

/* =========================
   CATEGORY COLORS
========================= */
const getCatStyle = (cat) => {
  const c = cat?.toUpperCase();

  if (c === 'HTML')
    return 'bg-orange-50 text-orange-600 border-orange-100';

  if (c === 'CSS')
    return 'bg-blue-50 text-blue-600 border-blue-100';

  if (c === 'JS' || c === 'JAVASCRIPT')
    return 'bg-yellow-50 text-yellow-600 border-yellow-100';

  return 'bg-slate-50 text-slate-600 border-slate-100';
};

export default PDFManager;