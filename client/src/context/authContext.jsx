import { createContext, useContext, useState, useEffect } from "react";
import Spinner from "../components/ui/spinner"
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedSession =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
  
    if (storedSession?.user) {
      setUser(storedSession.user);
    }
  
    setIsLoading(false);
  }, []);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };
  

  if (isLoading) {
    return <Spinner/>; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
