import axios from "./axiosClient";

export const getMyList = () =>
  axios.get("/myList").then((res) => res.data.items);

export const addToMyList = (data) => {
  return axios.post("/myList", data).catch((err) => {
    throw err;
  });
};