import { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const savedSession =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const now = Date.now();

    if (savedSession?.expiresAt && savedSession.expiresAt < now) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    } else if (savedSession?.user && savedSession?.accessToken) {
      setCurrentUser(savedSession.user);
      setAccessToken(savedSession.accessToken);
    }

    const savedProfile = sessionStorage.getItem("selected-profile");
    if (savedProfile) {
      setSelectedProfile(JSON.parse(savedProfile));
    }

    setLoadingState(false);
  }, []);

  const login = (user, accessToken, rememberMe) => {
    const expiresAt = Date.now() + 60 * 60 * 1000;  
    const session = { user, accessToken, expiresAt };
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(session));
    } else {
      sessionStorage.setItem("user", JSON.stringify(session));
    }

    setCurrentUser(user);
    setAccessToken(accessToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setAccessToken(null);
    setSelectedProfile(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("selected-profile");
  };

  const chooseProfile = (profile) => {
    setSelectedProfile(profile);
    sessionStorage.setItem("selected-profile", JSON.stringify(profile));
  };

  if (loadingState) return <div>Loading...</div>;

  return (
    <SessionContext.Provider
      value={{
        currentUser,
        accessToken,
        login,
        logout,
        selectedProfile,
        chooseProfile,
      }}
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
