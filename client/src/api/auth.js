import axios from './axiosInstance';

export const register = (data) => axios.post('/api/auth/register', data);
export const login = (data) => axios.post('/api/auth/login', data);
export const getCurrentUser = () => axios.get('/api/auth/profile');
