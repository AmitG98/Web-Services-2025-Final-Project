import axios from "./axiosClient";

// export const addReview = (data) => axios.post('/api/reviews', data);
// export const getReviewsByProgram = (programId) => axios.get(`/api/reviews/program/${programId}`);
// export const getMyReviews = () => axios.get('/api/reviews/my-reviews');
// export const updateReview = (reviewId, data) => axios.put(`/api/reviews/${reviewId}`, data);
// export const deleteReview = (reviewId) => axios.delete(`/api/reviews/${reviewId}`);
// export const likeReview = (reviewId) => axios.post(`/api/reviews/${reviewId}/like`);
// export const getTopRated = () => axios.get('/api/reviews/top-rated');
// export const getMostReviewed = () => axios.get('/api/reviews/most-reviewed');

export const addReview = (data) => {
  console.log("🌍 API CALL: POST /reviews", data);
  return axios.post("/reviews", data);
};
export const getReviewsByProgram = (programId) =>
  axios.get(`/reviews/program/${programId}`);
export const getMyReviews = () => axios.get("/reviews/my-reviews");
export const updateReview = (reviewId, data) =>
  axios.put(`/reviews/${reviewId}`, data);
export const deleteReview = (reviewId) => axios.delete(`/reviews/${reviewId}`);
export const likeReview = (reviewId) => axios.post(`/reviews/${reviewId}/like`);
export const getTopRated = () => axios.get("/reviews/top-rated");
export const getMostReviewed = () => axios.get("/reviews/most-reviewed");
