import axios from './axiosInstance';

export const getMyList = () => axios.get('/api/my-list');
export const addToMyList = (programId, data) => axios.post(`/api/my-list/${programId}`, data);
export const removeFromMyList = (programId) => axios.delete(`/api/my-list/${programId}`);
export const getRecentMyList = () => axios.get('/api/my-list/recent');
