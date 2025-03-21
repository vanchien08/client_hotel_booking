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

const handleUpdateProfile = (id, name, address, email, phone, avatar) => {
  return axios.post("/update-user-info", {
    id,
    name,
    address,
    email,
    phone,
    avatar,
  });
};
const handleGetBookingApi = (id) => {
  return axios.get(`/get-booking-by-userid/${id}`);
};
const handleChangePassApi = (id, password, newpassword) => {
  return axios.post("/change-password", { id, password, newpassword });
};

const handleGetPrice = () => {
  return axios.get("/get-price-minmax");
};
export {
  handleLoginApi,
  handleGetUserApi,
  handleGetHotelApi,
  handleGetReviewsApi,
  handleLoginUserApi,
  handleBooking,
  handleUpdateProfile,
  handleGetBookingApi,
  handleChangePassApi,
  handleGetPrice,
};
