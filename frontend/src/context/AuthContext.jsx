import { createContext, useContext, useState } from "react";
import API from "../services/api";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // generate device_id (once)
  const getDeviceId = () => {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  };

  const login = async (access_code) => {
    try {
      const res = await API.post("/login", {
        access_code,
        device_id: getDeviceId(),
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Error",
      };
    }
  };

  const logout = async () => {
    await API.post("/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);