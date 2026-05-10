import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Terminal, Eye, Upload, Save, Loader2
} from 'lucide-react';

import SidebarAdmin from '../../../components/layout/SidebarAdmin';
import API from '../../../services/api';

const AddTP = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // ================= STATES =================
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'HTML',
    difficulty: 'Débutant',
    description: '',
    instructions: '# Objectifs du TP\n1. ...',
    estimated_time: 120,
    is_published: 1,
    auto_correction: true
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [tpFile, setTpFile] = useState(null);
  const [tpFileName, setTpFileName] = useState('');

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // IMAGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // PDF TP FILE
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTpFile(file);
      setTpFileName(file.name);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
  if (!formData.title || !formData.description) {
    return alert("Titre et description requis");
  }

  try {
    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      let value = formData[key];

      // boolean → 0/1
      if (typeof value === "boolean") {
        value = value ? 1 : 0;
      }

      data.append(key, value);
    });

    // files
    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    if (tpFile) {
      data.append("tp_file", tpFile);
    }

    // ✅ SEND REQUEST
    const response = await API.post(
      "/admin/tp/store",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("TP ajouté avec succès");

    navigate("/admin/tp");

  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Erreur lors de l'ajout du TP"
    );

  } finally {
    setLoading(false);
  }
};
  // ================= UI =================
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SidebarAdmin />

      <main className="flex-1 ml-72 p-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#002366]">
            Création TP
          </h1>
          <p className="text-slate-400">
            Ajouter un nouveau travail pratique
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="col-span-2 space-y-6">

            {/* INFO */}
            <div className="bg-white p-6 rounded-2xl">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titre TP"
                className="w-full p-3 border rounded-xl mb-4"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl mb-4"
              >
                <option>HTML</option>
                <option>CSS</option>
                <option>JavaScript</option>
                <option>React</option>
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border rounded-xl"
              />
            </div>

            {/* INSTRUCTIONS */}
            <div className="bg-white p-6 rounded-2xl">
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="w-full h-64 p-4 bg-slate-900 text-white rounded-xl font-mono"
              />
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* THUMBNAIL */}
            <div className="bg-white p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Thumbnail</h3>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed p-6 text-center cursor-pointer rounded-xl"
              >
                {previewUrl ? (
                  <img src={previewUrl} className="rounded-xl" />
                ) : (
                  <Upload className="mx-auto text-orange-500" />
                )}
              </div>
            </div>

            {/* PDF TP FILE */}
            <div className="bg-white p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Fichier TP (PDF)</h3>

              <input
                type="file"
                accept="application/pdf"
                ref={pdfInputRef}
                onChange={handlePdfChange}
                className="hidden"
              />

              <div
                onClick={() => pdfInputRef.current.click()}
                className="border-2 border-dashed p-6 text-center cursor-pointer rounded-xl"
              >
                <Upload className="mx-auto text-orange-500" />

                {tpFileName ? (
                  <p className="text-sm mt-2 font-bold">
                    {tpFileName}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-2">
                    Upload PDF TP
                  </p>
                )}
              </div>
            </div>

            {/* TIME */}
            <div className="bg-white p-6 rounded-2xl">
              <label className="text-xs font-bold">Temps (min)</label>
              <input
                type="number"
                name="estimated_time"
                value={formData.estimated_time}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl mt-2"
              />
            </div>

          </div>
        </div>

        {/* SUBMIT */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {loading ? "Enregistrement..." : "Créer TP"}
          </button>
        </div>

      </main>
    </div>
  );
};

export default AddTP;