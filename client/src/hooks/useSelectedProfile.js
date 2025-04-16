// hooks/useSelectedProfile.js
export const useSelectedProfile = () => {
    const stored = sessionStorage.getItem("selectedProfile");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };
  