import { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("auth-user");
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
    setLoadingState(false);
  }, []);

  const login = (data) => {
    setCurrentUser(data);
    sessionStorage.setItem("auth-user", JSON.stringify(data));
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("auth-user");
  };

  if (loadingState) return <div>Loading...</div>;

  return (
    <SessionContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within UserSessionProvider");
  }
  return context;
};
