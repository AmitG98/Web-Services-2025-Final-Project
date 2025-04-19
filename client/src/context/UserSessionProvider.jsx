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
    const savedProfile = sessionStorage.getItem("selected-profile");

    if (savedSession?.user) {
      setCurrentUser(savedSession.user);
      setAccessToken(savedSession.accessToken);
    }
    if (savedProfile) {
      setSelectedProfile(JSON.parse(savedProfile));
    }

    setLoadingState(false);
  }, []);

  const login = (user, accessToken, rememberMe) => {
    const session = { user, accessToken };
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
