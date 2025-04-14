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
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;



// const API_ENDPOINT = import.meta.env.VITE_APP_API_URL;
// const defaultHeaders = {
//   "Content-Type": "application/json",
// };
// const axiosClient = (() => {
//   const instance = axios.create({
//     baseURL: API_ENDPOINT,
//     withCredentials: true,
//     headers: defaultHeaders,
//   });
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error?.response?.status === 401) {
//         sessionStorage.removeItem("auth-user");
//         window.location.replace("/signin");
//       }
//       return Promise.reject(error);
//     }
//   );
//   return instance;
// })();

// export default axiosClient;
