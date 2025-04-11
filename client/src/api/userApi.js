import axiosClient from "./axiosClient";

export const submitLogin = async (credentials) => {
  const { data } = await axiosClient.post("/auth/login", credentials);
  return data;
};

export const submitRegister = async (userData) => {
  const { data } = await axiosClient.post("/auth/register", userData);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await axiosClient.get("/auth/me");
  return data;
};
