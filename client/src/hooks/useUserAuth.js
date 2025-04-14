import { createContext, useContext, useEffect, useState } from "react";

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("activeUser");
    if (stored) setActiveUser(JSON.parse(stored));
  }, []);

  const login = (user) => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    setActiveUser(user);
  };

  const logout = () => {
    localStorage.removeItem("activeUser");
    setActiveUser(null);
  };

  return (
    <AuthUserContext.Provider value={{ activeUser, login, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthUserContext);
};