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
  userid,
  quantityRoom,
  checkIn,
  checkOut,
  roomid,
  totalPrice
) => {
  return axios.post("/BookingHotel", {
    userid,
    quantityRoom,
    checkIn,
    checkOut,
    roomid,
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
