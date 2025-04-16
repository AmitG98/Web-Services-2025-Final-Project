import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

// 🔑 שליחת בקשה ל-TMDB API עם המפתח הסודי
const tmdbRequest = async (endpoint) => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY; // אם זה קוד רץ ב-client (React)
  const url = `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

// ייצוא
export default axiosClient;
export { tmdbRequest };
