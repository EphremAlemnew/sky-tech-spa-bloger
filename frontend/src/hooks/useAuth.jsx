import { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          // Token is expired
          setUser(null);
          Cookies.remove("token");
        } else {
          // Token is valid
          setUser({ id: decoded.userId, role: decoded.role });
        }
      } catch {
        // If decoding fails, remove token
        setUser(null);
        Cookies.remove("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 6 });
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
