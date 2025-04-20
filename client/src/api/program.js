import axios from "./axiosClient";

export const fetchHomepageContent = async ({ type, genre } = {}) => {
  const selectedProfile = JSON.parse(sessionStorage.getItem("selectedProfile"));
  const profileId = selectedProfile?._id;
  const params = {};

  if (type) params.type = type;
  if (genre) params.genre = genre;
  params.profileId = profileId;

  const response = await axios.get("/programs/home", {
    params,
    withCredentials: true,
  });

  return response.data;
};

export const getProgramDetails = async (tmdbId) => {
  const { data } = await axios.get(`/programs/tmdb/${tmdbId}`);
  return data;
};

export const fetchNewAndPopular = async ({ queryKey }) => {
  const [, limit = 90] = queryKey;

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

export const getExtraProgramInfo = async (type, id) => {
  const { data } = await axios.get(`/programs/extras/${type}/${id}`);
  return data;
};

export const createProgram = (data) => axios.post('/programs/admin/create', data);
export const getTmdbPreview = (type, tmdbId) => axios.get(`/programs/admin/tmdb/${type}/${tmdbId}`);
