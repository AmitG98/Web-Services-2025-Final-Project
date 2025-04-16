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

// export const getProgramDetails = async (id) => {
//   const response = await axios.get(`/programs/${id}`);
//   return response.data;
// };

// export const getProgramDetails = async (id, type = "movie") => {
//   console.log("program id in programAPI is:", id)
//   const { data } = await axios.get(`/programs/${id}`, {
//     params: { type },
//   });
//   return data;
// };

export const getProgramDetails = async (tmdbId) => {
  console.log("📥 program id in programAPI is:", tmdbId);
  const { data } = await axios.get(`/programs/tmdb/${tmdbId}`);
  return data;
};

export const getProgramsByType = (type) => axios.get(`/programs/type/${type}`);

// export const searchPrograms = (params) => axios.get('/api/programs', { params });
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
