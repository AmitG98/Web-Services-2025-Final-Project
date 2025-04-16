import axios from './axiosClient';

export const addReview = (data) => axios.post('/api/reviews', data);
export const getReviewsByProgram = (programId) => axios.get(`/api/reviews/program/${programId}`);
export const getMyReviews = () => axios.get('/api/reviews/my-reviews');
export const updateReview = (reviewId, data) => axios.put(`/api/reviews/${reviewId}`, data);
export const deleteReview = (reviewId) => axios.delete(`/api/reviews/${reviewId}`);
export const likeReview = (reviewId) => axios.post(`/api/reviews/${reviewId}/like`);
export const getTopRated = () => axios.get('/api/reviews/top-rated');
export const getMostReviewed = () => axios.get('/api/reviews/most-reviewed');
