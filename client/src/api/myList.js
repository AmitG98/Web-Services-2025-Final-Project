import axios from "./axiosClient";

// Fetch all items from the user's list
export const getMyList = () =>
  axios.get("/myList").then((res) => res.data.items);

// Add a program to the user's list
export const addToMyList = (data) => {
  return axios.post("/myList", data).catch((err) => {
    console.error("❌ axios.post failed:", err?.response?.data);
    throw err;
  });
};