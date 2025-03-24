import axios from "../axios";

const handleDeleteReviewsApi = (id) => {
  return axios.delete(`/deleteReview/${id}`);
};

const handleUpdateReviewsApi = (id, rating, comment) => {
  return axios.put("/updateReview", { id, rating, comment });
};

const handleFilterReviewApi = (
  id,
  username,
  rating,
  comment,
  hotelname,
  dateFrom,
  dateTo
) => {
  return axios.post("/filterReview", {
    id,
    username,
    rating,
    comment,
    hotelname,
    dateFrom,
    dateTo,
  });
};
export {
  handleDeleteReviewsApi,
  handleUpdateReviewsApi,
  handleFilterReviewApi,
};
