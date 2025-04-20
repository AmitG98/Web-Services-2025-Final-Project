import axios from "./axiosClient";

export const addReview = (data) => {
  return axios.post("/reviews", data);
};
export const getMyReviews = () => axios.get("/reviews/my-reviews");
export const getMostReviewed = () => axios.get("/reviews/most-reviewed");
