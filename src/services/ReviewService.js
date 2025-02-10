import axios from "../axios";

const handleDeleteReviewsApi = (id) => {
  return axios.delete(`/deleteReview/${id}`);
};

const handleUpdateReviewsApi = (id, rating, comment) => {
  return axios.put("/updateReview", { id, rating, comment });
};
export { handleDeleteReviewsApi, handleUpdateReviewsApi };
