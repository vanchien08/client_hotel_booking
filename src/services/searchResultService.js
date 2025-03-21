import axios from "../axios";

const handleGetAllHotelApi = () => {
  return axios.get("/getAllHotels");
};

const handleSearchRoom = (
  address,
  checkIn,
  checkOut,
  checkBoxAmenities,
  priceFrom,
  priceTo
) => {
  return axios.post("/SearchResult", {
    address,
    checkIn,
    checkOut,
    checkBoxAmenities,
    priceFrom,
    priceTo,
  });
};

export { handleGetAllHotelApi, handleSearchRoom };
