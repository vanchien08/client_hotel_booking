import axios from "../axios";

const handelLoginApi = (username, password) => {
  return axios.post("/login", { username, password });
};

const handelGetUserApi = () => {
  return axios.post("/getAllUser");
};

const handelGetHotelApi = () => {
  return axios.get("/getAllHotel");
};

const handelGetReviewsApi = () => {
  return axios.get("/getAllReviews");
};
export {
  handelLoginApi,
  handelGetUserApi,
  handelGetHotelApi,
  handelGetReviewsApi,
};
