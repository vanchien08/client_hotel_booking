import axios from "../axios";

const handleGetAllRoomAmenitiesApi = () => {
  return axios.get("/room-amenities");
};

const handleGetAvailableRoomAmenitiesApi = () => {
  return axios.get("/room-amenities/available");
};

const handleAddRoomAmenitiesApi = (roomId, amenityIds) => {
  return axios.post("/room-amenities/add", { roomId, amenityIds });
};

const handleDeleteRoomAmenityApi = (roomId, amenityId) => {
  return axios.delete(`/room-amenities/delete/${roomId}/${amenityId}`);
};

export {
  handleGetAllRoomAmenitiesApi,
  handleGetAvailableRoomAmenitiesApi,
  handleAddRoomAmenitiesApi,
  handleDeleteRoomAmenityApi,
};
