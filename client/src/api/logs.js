import axios from "./axiosClient";

export const fetchLogs = async () => {
  const response = await axios.get("/api/logs");
  return response.data;
};

export const addInteraction = async (profileId, programId, action) => {
  const response = await axios.post("/logs/interactions", {
    profileId,
    programId,
    action,
  });
  return response.data;
};