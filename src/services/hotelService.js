import axios from "../axios";

const handleUpdateHotelApi = (body) => {
  return axios.post("/updateHotel", body);
};

export { handleUpdateHotelApi };
