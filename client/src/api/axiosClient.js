import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
console.log("API base URL:", BASE_URL);

const axiosClient = axios.create({
  baseURL: BASE_URL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const session =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const token = session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

const tmdbRequest = async (endpoint) => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export default axiosClient;
export { tmdbRequest };
