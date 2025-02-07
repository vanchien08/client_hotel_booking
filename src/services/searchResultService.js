import axios from "../axios";

const handelGetAllHotelApi = () => {
  return axios.get("/getAllHotels");
};

export { handelGetAllHotelApi };
