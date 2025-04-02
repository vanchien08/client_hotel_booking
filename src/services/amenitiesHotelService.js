import axios from "../axios";

const handleGetHotelAmenities = () => {
  return axios.get("/get-hotel-amenities");
};

const handleGetAmenitiesOfHotel = () => {
  return axios.get("/get-amenities-of-hotel");
};
const handleDeleteHAmenities = (amenityId, hotelId) => {
  return axios.delete("/delete-hotel-amenity", {
    params: { amenityId, hotelId },
  });
};

const handleAddHotelAmenities = (idhotel, listID) => {
  return axios.post("/add-hotel-amenities", {
    idhotel,
    listID,
  });
};
export {
  handleGetHotelAmenities,
  handleDeleteHAmenities,
  handleGetAmenitiesOfHotel,
  handleAddHotelAmenities,
};
