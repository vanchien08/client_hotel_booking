import axios from "../axios";

const handleGetAllHotelApi = () => {
  return axios.get("/getAllHotels");
};

const handleSearchRoom = (address, checkIn, checkOut) => {
  return axios.post("/SearchResult", { address, checkIn, checkOut });
};

export { handleGetAllHotelApi, handleSearchRoom };
