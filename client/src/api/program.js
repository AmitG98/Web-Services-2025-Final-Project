import axios from './axiosClient';

export const fetchHomepageContent = async ({ type, genre } = {}) => {
    const params = {};
  
    if (type) params.type = type;
    if (genre) params.genre = genre;
  
    const response = await axios.get("/api/programs/home", {
      params,
      withCredentials: true,
    });
  
    return response.data;
};
export const getProgramDetails = (id) => axios.get(`/api/programs/${id}`);
export const searchPrograms = (params) => axios.get('/api/programs', { params });
export const getProgramsByType = (type) => axios.get(`/api/programs/type/${type}`);
export const getSeriesEpisodes = (seriesId, seasonNumber) => axios.get(`/api/programs/episodes/${seriesId}/${seasonNumber}`);
export const getExtraInfo = (type, id) => axios.get(`/api/programs/extras/${type}/${id}`);
export const createProgram = (data) => axios.post('/api/programs/admin/create', data);
export const checkProgram = (tmdbId) => axios.get(`/api/programs/admin/check/${tmdbId}`);
export const searchTmdb = (params) => axios.get('/api/programs/admin/search', { params });
export const getTmdbPreview = (type, tmdbId) => axios.get(`/api/programs/admin/tmdb/${type}/${tmdbId}`);
