import axios from "../axios";

const handleGetHotelApi = () => {
  return axios.get("/getAllHotel");
};

const handleUpdateHotelApi = (body) => {
  return axios.post("/updateHotel", body);
};

const handleFilterHotelApi = (body) => {
  return axios.post("/filterHotels", body);
};

const handleGetAmenitiesHotelApi = () => {
  return axios.get("/getAmenitiesHotel");
};
const handleGetAmenitiesHotel = (id) => {
  return axios.get(`/getAmenitiesHotelById/${id}`);
};

const handleDeleteHotelApi = (id) => {
  return axios.delete(`/delete-hotel/${id}`);
};

const handleAddHotelApi = (
  name,
  description,
  address,
  city,
  country,
  image
) => {
  return axios.post("/add-hotel", {
    name,
    description,
    address,
    city,
    country,
    image,
  });
};

const handleReviewHotel = (userid, hotelid, rating, comment) => {
  return axios.post("/user-reviews", {
    userid,
    hotelid,
    rating,
    comment,
  });
};

const handleGetReviewByHotel = (id) => {
  return axios.get(`/get-review-hotel`, {
    params: { id },
  });
};

export {
  handleGetHotelApi,
  handleUpdateHotelApi,
  handleFilterHotelApi,
  handleGetAmenitiesHotelApi,
  handleGetAmenitiesHotel,
  handleAddHotelApi,
  handleDeleteHotelApi,
  handleReviewHotel,
  handleGetReviewByHotel,
};
