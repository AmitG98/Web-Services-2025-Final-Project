import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401  && window.location.pathname !== "/login") {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;