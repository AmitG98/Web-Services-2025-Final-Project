import axios from './axiosClient';

export const getHomepageContent = () => axios.get('/api/programs/home');
export const getProgramDetails = (id) => axios.get(`/api/programs/${id}`);
export const searchPrograms = (params) => axios.get('/api/programs', { params });
export const getProgramsByType = (type) => axios.get(`/api/programs/type/${type}`);
export const getSeriesEpisodes = (seriesId, seasonNumber) => axios.get(`/api/programs/episodes/${seriesId}/${seasonNumber}`);
export const getExtraInfo = (type, id) => axios.get(`/api/programs/extras/${type}/${id}`);
export const createProgram = (data) => axios.post('/api/programs/admin/create', data);
export const checkProgram = (tmdbId) => axios.get(`/api/programs/admin/check/${tmdbId}`);
export const searchTmdb = (params) => axios.get('/api/programs/admin/search', { params });
export const getTmdbPreview = (type, tmdbId) => axios.get(`/api/programs/admin/tmdb/${type}/${tmdbId}`);
