import axiosClient from "./axiosClient";

export const submitLogin = async (credentials) => {
  const { data } = await axiosClient.post("api/auth/login", credentials);
  return data;
};

export const submitRegister = async (userData) => {
  const { data } = await axiosClient.post("api/auth/register", userData);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await axiosClient.get("api/auth/profile");
  return data;
};
