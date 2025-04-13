import axios from './axiosInstance';

export const fetchProfiles = () => axios.get('/api/profiles');
export const addProfile = (data) => axios.post('/api/profiles', data);
export const updateProfile = (profileId, data) => axios.put(`/api/profiles/${profileId}`, data);
export const deleteProfile = (profileId) => axios.delete(`/api/profiles/${profileId}`);
