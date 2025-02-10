import axios from "../axios";

const handleLoginApi = (username, password) => {
  return axios.post("/login", { username, password });
};

const handleGetUserApi = () => {
  return axios.post("/getAllUser");
};

const handleGetHotelApi = () => {
  return axios.get("/getAllHotel");
};

const handleGetReviewsApi = () => {
  return axios.get("/getAllReviews");
};
export {
  handleLoginApi,
  handleGetUserApi,
  handleGetHotelApi,
  handleGetReviewsApi,
};
