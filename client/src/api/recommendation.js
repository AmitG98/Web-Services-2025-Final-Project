import axios from "./axiosInstance";

export const getTopRecommendations = async (userId) => {
  const res = await axios.get("/api/recommendations", {
    params: { userId, limit: 10 },
  });
  return res.data;
};

export const getTmdbDetails = async (type, tmdbId) => {
  const res = await axios.get(`/api/programs/admin/tmdb/${type}/${tmdbId}`);
  return res.data;
};
