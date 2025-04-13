import axios from "./axiosInstance";

export const fetchLogs = async () => {
  const response = await axios.get("/api/logs");
  return response.data;
};
