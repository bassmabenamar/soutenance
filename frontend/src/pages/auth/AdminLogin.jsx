import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        access_code: code,
        device_id: "admin-device",
      });

      if (res.data.user.role !== "admin") {
        setError("Not authorized");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid admin code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Enter admin code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}