import axios from "../axios";

const handelDeleteReviewsApi = (id) => {
  return axios.delete(`/deleteReview/${id}`);
};

const handelUpdateReviewsApi = (id, rating, comment) => {
  return axios.put("/updateReview", { id, rating, comment });
};
export { handelDeleteReviewsApi, handelUpdateReviewsApi };
