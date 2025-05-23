import axios from './axiosClient';

export const fetchProfiles = async () => {
  const { data } = await axios.get("/profiles");
  return data;
};
export const addProfile = (data) => axios.post('/profiles', data);
export const updateProfile = (profileId, data) => axios.put(`/profiles/${profileId}`, data);
export const deleteProfile = (profileId) => axios.delete(`/profiles/${profileId}`);
export const addInteraction = async (profileId, programId, action) => {
    const res = await axios.post(`/profiles/${profileId}/interactions`, {
      programId,
      action
    });
    return res.data;
};
