import axios from "../axios";

const handleGetAllHotelApi = () => {
  return axios.get("/getAllHotels");
};

const handleSearchRoom = (address, checkIn, checkOut, checkBoxAmenities) => {
  return axios.post("/SearchResult", {
    address,
    checkIn,
    checkOut,
    checkBoxAmenities,
  });
};

export { handleGetAllHotelApi, handleSearchRoom };
