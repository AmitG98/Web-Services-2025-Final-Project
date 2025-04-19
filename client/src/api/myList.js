import axios from './axiosClient';

export const getMyList = () =>
    axios.get('/myList').then(res => res.data.items);

export const addToMyList = (data) => {
    console.log("📦 addToMyList → שולח לשרת את:", data);
  
    return axios.post('/myList', data).catch((err) => {
      console.error("❌ axios.post נכשל:", err?.response?.data);
      throw err;
    });
  };
// export const addToMyList = (data) => axios.post('/myList', data);
export const removeFromMyList = (programId) => axios.delete(`/myList/${programId}`);
export const getRecentMyList = () => axios.get('/myList/recent');
