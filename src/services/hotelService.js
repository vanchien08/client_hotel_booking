import axios from "../axios";

const handleUpdateHotelApi = (body) => {
  return axios.post("/updateHotel", body);
};

const handleFilterHotelApi = (body) => {
  return axios.post("/filterHotels", body);
};
export { handleUpdateHotelApi, handleFilterHotelApi };
