import axios from "../axios";

const handelDeleteReviewsApi = (id) => {
  return axios.delete(`/deleteReview/${id}`);
};
export { handelDeleteReviewsApi };
