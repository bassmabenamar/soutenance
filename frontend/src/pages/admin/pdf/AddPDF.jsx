import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Lock, Eye, Database, X, CheckCircle2, Loader2, ChevronRight, Save
} from 'lucide-react';
import API from '../../../services/api';
import SidebarAdmin from '../../../components/layout/SidebarAdmin';

const AddPDF = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState('Débutant');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', description: '' });
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (uploadedFile) => {
    if (uploadedFile?.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Veuillez sélectionner un fichier PDF valide.");
    }
  };

  const handleSave = async () => {
    if (!formData.title || !file || !formData.category) {
      alert("Champs obligatoires manquants.");
      return;
    }
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('level', level);
    data.append('file', file);

    try {
      await API.post('/admin/courses/upload', data);
      navigate('/admin/pdf');
    } catch (error) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SidebarAdmin />

      {/* AJUSTEMENT ICI : 
          ml-72 (largeur sidebar) + pl-20 (distance entre sidebar et contenu) 
          pr-20 (distance équivalente à droite pour l'équilibre)
      */}
      <main className="flex-1 ml-72 pl-20 pr-20 py-12 transition-all">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
              <span>Gestion</span>
              <ChevronRight size={12} strokeWidth={3} />
              <span className="text-orange-500">Nouveau PDF</span>
            </nav>
            <h2 className="text-4xl font-[1000] text-slate-900 tracking-tighter">Ajouter un support</h2>
          </div>
          
          <div className="flex gap-4">
             <button 
              type="button"
              onClick={() => navigate('/admin/pdf')}
              className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-600 transition-all"
             >
               Annuler
             </button>
             <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-3 bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-200 hover:bg-orange-700 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {loading ? "Envoi..." : "Publier maintenant"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Formulaire - Partie Gauche */}
          <div className="col-span-8 space-y-8">
            <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm space-y-8">
              
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Titre du document</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange}
                  placeholder="ex: Architecture Micro-services avec Kubernetes"
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none font-bold text-slate-700 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Catégorie Technologique</label>
                  <div className="relative">
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700 appearance-none cursor-pointer focus:bg-white transition-all">
                      <option value="">Sélectionner...</option>
                      <option value="cloud">Cloud Computing</option>
                      <option value="dev">Développement Web</option>
                      <option value="data">Data Science</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">▼</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Niveau</label>
                  <div className="flex bg-slate-50 p-1.5 rounded-[20px] border border-slate-100 h-[64px]">
                    {['Débutant', 'Intermédiaire', 'Avancé'].map((l) => (
                      <button 
                        key={l} 
                        type="button" 
                        onClick={() => setLevel(l)} 
                        className={`flex-1 text-[11px] font-black rounded-xl transition-all ${level === l ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Description pédagogique</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleChange} rows="5"
                  placeholder="Quels sont les points clés abordés dans ce document ?"
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium text-slate-600 resize-none focus:bg-white transition-all"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Sidebar de droite - Upload & Stats */}
          <div className="col-span-4 space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 block">Fichier Source (PDF)</label>
              <input type="file" className="hidden" ref={fileInputRef} accept=".pdf" onChange={(e) => handleFile(e.target.files[0])}/>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => !loading && fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-[28px] p-10 flex flex-col items-center text-center transition-all cursor-pointer ${isDragging ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 bg-slate-50 hover:border-orange-200'}`}
              >
                {file ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 text-green-500 rounded-2xl w-fit mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 truncate max-w-[200px]">{file.name}</p>
                      <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-2 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:underline">Supprimer</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4">
                      <FileText className="text-orange-500" size={32} />
                    </div>
                    <p className="text-xs font-black text-slate-500 uppercase leading-relaxed tracking-tight">Glissez le PDF ici ou <br/><span className="text-orange-600">parcourez vos fichiers</span></p>
                  </>
                )}
              </div>
            </div>

            {/* Statistiques Serveur */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-200">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-slate-800 rounded-xl text-orange-400"><Database size={20}/></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Espace Serveur</p>
                      <p className="text-lg font-black text-white">4.2 GB / 10 GB</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[42%]"></div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
               <StatItem icon={<Lock className="text-green-500" size={18}/>} label="Sécurité" value="SSL 256-bit" />
               <StatItem icon={<Eye className="text-blue-500" size={18}/>} label="Visibilité" value="Tous les élèves" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    </div>
    <span className="text-xs font-black text-slate-700">{value}</span>
  </div>
);

export default AddPDF;