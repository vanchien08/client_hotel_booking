import axios from "../axios";

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
export {
  handleUpdateHotelApi,
  handleFilterHotelApi,
  handleGetAmenitiesHotelApi,
  handleGetAmenitiesHotel,
  handleAddHotelApi,
};
