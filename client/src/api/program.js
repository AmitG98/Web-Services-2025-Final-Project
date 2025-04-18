import axios from "./axiosClient";

export const fetchHomepageContent = async ({ type, genre } = {}) => {
  const params = {};

  if (type) params.type = type;
  if (genre) params.genre = genre;
  // console.log("📡 fetchHomepageContent → sending request with:", params);

  const response = await axios.get("/programs/home", {
    params,
    withCredentials: true,
  });

  // console.log("✅ fetchHomepageContent → response:", response.data);
  return response.data;
};

export const getProgramDetails = async (tmdbId) => {
  const { data } = await axios.get(`/programs/tmdb/${tmdbId}`);
  return data;
};

export const fetchNewAndPopular = async (limit = 90) => {
  const res = await axios.get("/programs/new-and-popular", {
    params: { limit }
  });

  const data = res.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  return [];
};

export const getProgramsByType = (type) => axios.get(`/programs/type/${type}`);

export const searchPrograms = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`/programs/search?${params}`);
  return response.data.items || [];
};

// export const getSeriesEpisodes = (seriesId, seasonNumber) => axios.get(`/api/programs/episodes/${seriesId}/${seasonNumber}`);
// export const getExtraInfo = (type, id) => axios.get(`/api/programs/extras/${type}/${id}`);

export const getExtraProgramInfo = async (type, id) => {
  const { data } = await axios.get(`/programs/extras/${type}/${id}`);
  return data;
};

// export const createProgram = (data) => axios.post('/api/programs/admin/create', data);
// export const checkProgram = (tmdbId) => axios.get(`/api/programs/admin/check/${tmdbId}`);
// export const searchTmdb = (params) => axios.get('/api/programs/admin/search', { params });
// export const getTmdbPreview = (type, tmdbId) => axios.get(`/api/programs/admin/tmdb/${type}/${tmdbId}`);
