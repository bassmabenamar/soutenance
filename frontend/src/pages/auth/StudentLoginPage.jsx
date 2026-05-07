import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GraduationCap,
  Key,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import API from "../../services/api";

const StudentLoginPage = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!accessCode.trim()) {
      setError("Veuillez saisir votre code d'accès.");
      return;
    }

    setIsLoading(true);

    try {
      const device_id =
        localStorage.getItem("device_id") || crypto.randomUUID();

      localStorage.setItem("device_id", device_id);

      const res = await API.post("/login", {
        access_code: accessCode.trim(),
        device_id,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect by role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Code invalide");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans flex flex-col">

      {/* HEADER */}
      <header className="p-8">
        <Link to="/">
          <h1 className="text-[#F97316] text-xl font-black uppercase">
            CodeBook Academy
          </h1>
        </Link>
      </header>

      {/* LOGIN BOX */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white rounded-[24px] shadow-xl">

          {/* HEADER */}
          <div className="bg-[#1e3a8a] p-10 text-center">
            <GraduationCap className="text-white mx-auto mb-3" size={40} />
            <h2 className="text-white text-2xl font-extrabold">
              Connexion Étudiant
            </h2>
          </div>

          {/* FORM */}
          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">

              {/* INPUT */}
              <div>
                <label className="text-xs font-black text-slate-400 uppercase">
                  Code d'accès
                </label>

                <div className="relative mt-2">
                  <Key className="absolute left-3 top-3 text-slate-300" />

                  <input
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    disabled={isLoading}
                    placeholder="CB-XXXX-XXXX"
                    className="w-full pl-10 py-3 bg-slate-50 border rounded-xl"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {error}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                disabled={isLoading}
                className="w-full bg-[#f97316] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    Accéder
                    <ArrowRight />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;