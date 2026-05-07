import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, HelpCircle, Terminal, Menu, Eye, Bold, Italic, 
  Link2, Code, Upload, Save, ChevronRight, Loader2, X, CheckCircle2 
} from 'lucide-react';
import SidebarAdmin from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api';

const AddTP = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // --- ÉTATS DU FORMULAIRE ---
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'HTML',
    difficulty: 'Débutant',
    description: '',
    instructions: '# Objectifs du TP\n1. Créer une structure HTML5...\n2. Utiliser CSS Flexbox...',
    estimated_time: 120,
    is_published: false,
    auto_correction: true
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // --- GESTION DES INPUTS ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- ENVOI AU BACKEND ---
  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      return alert("Veuillez remplir les informations générales.");
    }

    setLoading(true);
    const data = new FormData();
    
    // Append text data
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    // Append file
    if (thumbnail) data.append('thumbnail', thumbnail);

    try {
      const response = await API.post('/admin/tp/store', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200 || response.status === 201) {
        alert("TP créé avec succès !");
        navigate('/admin/tp');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erreur lors de la création du TP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-700">
      <SidebarAdmin />

      <main className="flex-1 ml-72 flex flex-col transition-all">
        

        <div className="py-8 px-10 w-full max-w-[1600px] mx-auto">
          <div className="flex justify-between items-start mb-10">
            <div>
              <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                Gestion des TP <span className="mx-2 text-gray-300">/</span> <span className="text-orange-500">Nouveau TP</span>
              </nav>
              <h2 className="text-4xl font-[1000] text-slate-900 tracking-tighter">Créer un TP</h2>
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 shadow-sm hover:shadow-md transition-all">
              <Eye size={16} /> Aperçu Live
            </button>
          </div>

          <div className="flex gap-10">
            {/* COLONNE GAUCHE */}
            <div className="flex-[2] space-y-8">
              <section className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-orange-50 rounded-2xl text-orange-600"><FileText size={24}/></div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Informations générales</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Titre du TP</label>
                    <input 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ex: Maîtriser CSS Grid en 1h" 
                      className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none font-bold text-slate-700 transition-all" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Catégorie</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl font-bold text-slate-700 outline-none appearance-none cursor-pointer"
                      >
                        <option value="HTML">HTML / CSS</option>
                        <option value="JS">JavaScript</option>
                        <option value="React">React.js</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Difficulté</label>
                      <select 
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl font-bold text-slate-700 outline-none appearance-none cursor-pointer"
                      >
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Description courte</label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3" 
                      placeholder="Résumez l'exercice..." 
                      className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl focus:bg-white outline-none font-medium text-slate-600 transition-all resize-none" 
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl text-slate-600"><Terminal size={20}/></div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Éditeur d'instructions</h3>
                  </div>
                  <div className="flex gap-4 text-slate-300">
                    <Bold size={18} className="cursor-pointer hover:text-orange-500 transition-colors" />
                    <Code size={18} className="cursor-pointer hover:text-orange-500 transition-colors" />
                  </div>
                </div>
                <textarea 
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] p-10 min-h-[350px] font-mono text-sm leading-relaxed text-blue-100 outline-none"
                />
              </section>
            </div>

            {/* COLONNE DROITE */}
            <div className="flex-1 space-y-8">
              {/* Media Card */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Média de couverture</h4>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className={`group border-2 border-dashed rounded-[24px] p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${previewUrl ? 'border-orange-500 bg-orange-50/20' : 'border-slate-100 bg-slate-50/50 hover:border-orange-200'}`}
                >
                  {previewUrl ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="text-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-white rounded-2xl shadow-sm mb-4"><Upload className="text-orange-500" size={28} /></div>
                      <p className="text-[11px] font-black text-slate-500 uppercase tracking-tighter text-center leading-tight">
                        Cliquez pour ajouter <br/><span className="text-orange-600">une miniature</span>
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Paramètres Card */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Paramètres</h4>
                
                <Toggle 
                  label="Auto-correction" 
                  sub="Tests unitaires" 
                  enabled={formData.auto_correction} 
                  onClick={() => setFormData(p => ({...p, auto_correction: !p.auto_correction}))}
                />

                <Toggle 
                  label="Publication" 
                  sub="Visible immédiatement" 
                  enabled={formData.is_published} 
                  onClick={() => setFormData(p => ({...p, is_published: !p.is_published}))}
                />

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Temps (min)</label>
                  <input 
                    type="number" 
                    name="estimated_time"
                    value={formData.estimated_time}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl font-black text-slate-700 outline-none" 
                  />
                </div>
              </div>

              {/* Preview Mockup */}
              <div className="bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200 transform hover:scale-[1.02] transition-transform">
                <div className="h-32 bg-slate-800 flex items-center justify-center">
                  {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover opacity-60" /> : <Terminal className="text-slate-600" size={40} />}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] bg-orange-500/20 text-orange-400 font-black px-2 py-1 rounded uppercase">Preview Élève</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    </div>
                  </div>
                  <h5 className="font-bold text-white truncate">{formData.title || 'Titre du TP'}</h5>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
                    <div className="w-1/3 h-full bg-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end items-center gap-8">
            <button 
              onClick={() => navigate(-1)}
              className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-all"
            >
              Annuler
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-orange-600 text-white px-12 py-4 rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-4 shadow-xl shadow-orange-100 hover:bg-orange-700 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
              {loading ? "Création en cours..." : "Enregistrer le TP"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Composant interne pour les Toggles (Style SaaS)
const Toggle = ({ label, sub, enabled, onClick }) => (
  <div className="flex justify-between items-center group cursor-pointer" onClick={onClick}>
    <div>
      <p className="text-[11px] font-black text-slate-700 uppercase tracking-tight group-hover:text-orange-600 transition-colors">{label}</p>
      <p className="text-[10px] text-gray-400 font-bold">{sub}</p>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${enabled ? 'bg-orange-500 shadow-inner' : 'bg-slate-100'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`}></div>
    </div>
  </div>
);

export default AddTP;