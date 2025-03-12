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

const handleLoginUserApi = (username, password) => {
  return axios.post("/login", { username, password });
};

const handleBooking = (
  user,
  quantityRoom,
  checkIn,
  checkOut,
  roomdata,
  totalPrice
) => {
  return axios.post("/BookingHotel", {
    user,
    quantityRoom,
    checkIn,
    checkOut,
    roomdata,
    totalPrice,
  });
};
export {
  handleLoginApi,
  handleGetUserApi,
  handleGetHotelApi,
  handleGetReviewsApi,
  handleLoginUserApi,
  handleBooking,
};
