import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Lock,
  Eye,
  Database,
  CheckCircle2,
  Loader2,
  ChevronRight,
  Save,
} from "lucide-react";

import API from "../../../services/api";
import SidebarAdmin from "../../../components/layout/SidebarAdmin";

const AddPDF = () => {
  const navigate = useNavigate();

  const [level, setLevel] = useState("Débutant");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState("");

  const fileInputRef = useRef(null);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     FILE HANDLER
  ========================= */
  const handleFile = (uploadedFile) => {
    if (uploadedFile?.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Veuillez sélectionner un fichier PDF valide.");
    }
  };

  /* =========================
     SAVE COURSE
  ========================= */
  const handleSave = async () => {
    if (!formData.title || !formData.category || !file || !selectedLanguageId) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);

    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("level", level);
    data.append("file", file);
    data.append("language_id", selectedLanguageId);

    try {
      await API.post("/admin/courses/upload", data);
      navigate("/admin/pdf");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Erreur lors de l'envoi du fichier."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SidebarAdmin />

      <main className="flex-1 ml-72 pl-20 pr-20 py-12">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-400 mb-3">
              <span>Gestion</span>
              <ChevronRight size={12} />
              <span className="text-orange-500">Nouveau PDF</span>
            </nav>

            <h2 className="text-4xl font-black text-slate-900">
              Ajouter un support
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/admin/pdf")}
              className="px-6 py-3 text-slate-500 font-bold"
            >
              Annuler
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {loading ? "Envoi..." : "Publier"}
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT FORM */}
          <div className="col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
              {/* TITLE */}
              <div>
                <label className="text-xs font-bold text-slate-400">
                  Titre
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 bg-slate-50 rounded-xl"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-xs font-bold text-slate-400">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 bg-slate-50 rounded-xl"
                >
                  <option value="">Choisir</option>
                  <option value="cloud">Cloud</option>
                  <option value="dev">Dev Web</option>
                  <option value="data">Data</option>
                </select>
              </div>

              {/* LANGUAGE */}
              <div>
                <label className="text-xs font-bold text-slate-400">
                  Langue (OBLIGATOIRE)
                </label>
                <select
                  value={selectedLanguageId}
                  onChange={(e) => setSelectedLanguageId(e.target.value)}
                  className="w-full mt-2 p-4 bg-slate-50 rounded-xl"
                >
                  <option value="">Sélectionner une langue</option>
                  <option value="1">HTML</option>
                  <option value="2">CSS</option>
                  <option value="3">JavaScript</option>
                </select>
              </div>

              {/* LEVEL */}
              <div>
                <label className="text-xs font-bold text-slate-400">
                  Niveau
                </label>
                <div className="flex gap-2 mt-2">
                  {["Débutant", "Intermédiaire", "Avancé"].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLevel(l)}
                      className={`flex-1 p-3 rounded-xl font-bold ${
                        level === l
                          ? "bg-orange-600 text-white"
                          : "bg-slate-100"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-xs font-bold text-slate-400">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 bg-slate-50 rounded-xl"
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* RIGHT UPLOAD */}
          <div className="col-span-4 space-y-6">
            <div
              onClick={() => fileInputRef.current.click()}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
              className="p-8 bg-white rounded-2xl border-dashed border-2 text-center cursor-pointer"
            >
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="application/pdf"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {file ? (
                <div>
                  <CheckCircle2 className="text-green-500 mx-auto" />
                  <p className="font-bold mt-2">{file.name}</p>
                </div>
              ) : (
                <div className="text-slate-400">
                  <FileText className="mx-auto" />
                  <p>Dépose ton PDF ici</p>
                </div>
              )}
            </div>

            {/* INFO BOX */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl">
              <div className="flex items-center gap-3">
                <Database />
                <div>
                  <p className="text-xs">Espace serveur</p>
                  <p className="font-bold">4.2 GB / 10 GB</p>
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white rounded-xl">
                <span>Sécurité</span>
                <span>SSL</span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-xl">
                <span>Visibilité</span>
                <span>Public</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddPDF;