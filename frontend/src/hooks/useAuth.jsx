import { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // note: import default, no {}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW loading state

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.userId, role: decoded.role });
      } catch {
        setUser(null);
        Cookies.remove("token");
      }
    }
    setLoading(false); // loading finished
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 7 });
    const decoded = jwtDecode(token);
    setUser({ id: decoded.userId, role: decoded.role });
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
