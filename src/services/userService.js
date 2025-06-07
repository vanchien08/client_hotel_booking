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

const handleRegisterApi = (
  username,
  name,
  password,
  phoneNumber,
  email,
  address
) => {
  return axios.post("/register", {
    username,
    name,
    password,
    phoneNumber,
    email,
    address,
  });
};

const handleGetPrice = () => {
  return axios.get("/get-price-minmax");
};

const handleGetAllUsers = () => {
  return axios.get("/get-all-user");
};

const handleFilterUsersApi = ({
  id,
  username,
  name,
  email,
  gender,
  status,
  birthdayFrom,
  birthdayTo,
  createdAtFrom,
  createdAtTo,
  updatedAtFrom,
  updatedAtTo,
}) => {
  return axios.get("/filter-users", {
    params: {
      id,
      username,
      name,
      email,
      gender,
      status,
      birthdayFrom,
      birthdayTo,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
    },
  });
};

const handleSetStatusUser = (id, check) => {
  return axios.put("/set-status-user", null, {
    params: { id, check },
  });
};
const handleUpdateUserApi = (
  id,
  name,
  username,
  email,
  address,
  phonenum,
  avatar
) => {
  return axios.put("/update-user", {
    id,
    name,
    username,
    email,
    address,
    phonenum,
    avatar,
  });
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
  handleRegisterApi,
  handleGetAllUsers,
  handleFilterUsersApi,
  handleSetStatusUser,
  handleUpdateUserApi,
};
