import { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("auth-user");
    const savedProfile = sessionStorage.getItem("selected-profile");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedProfile) {
      setSelectedProfile(JSON.parse(savedProfile));
    }
    setLoadingState(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    sessionStorage.setItem("auth-user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setSelectedProfile(null);
    sessionStorage.removeItem("auth-user");
    sessionStorage.removeItem("selected-profile");
  };

  const chooseProfile = (profile) => {
    setSelectedProfile(profile);
    sessionStorage.setItem("selected-profile", JSON.stringify(profile));
  };

  if (loadingState) return <div>Loading...</div>;

  return (
    <SessionContext.Provider
      value={{ currentUser, login, logout, selectedProfile, chooseProfile }}
    >
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
