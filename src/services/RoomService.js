import axios from "../axios";

const handleGetRoomsApi = () => {
  return axios.get("/get-all-room");
};

const handleFilterRoomApi = ({
  id,
  hotelName,
  roomType,
  isAvailable,
  minPrice,
  maxPrice,
  minCapacity,
  maxCapacity,
  amenityName,
}) => {
  return axios.get("/filter-rooms", {
    params: {
      id,
      hotelName,
      roomType,
      isAvailable,
      minPrice,
      maxPrice,
      minCapacity,
      maxCapacity,
      amenityName,
    },
  });
};

const updateRoomApi = (roomData) => {
  return axios.put("/update-room", roomData);
};

const handleSetStatusRoom = (id, check) => {
  return axios.put("/set-status-room", null, {
    params: { id, check },
  });
};

const handleAddRoomApi = (
  hotelId,
  roomType,
  price,
  capacity,
  description,
  image,
  quantity,
  reseved = 0,
  isAvailable = "true"
) => {
  return axios.post("/create-new-room", {
    hotelId,
    roomType,
    price,
    capacity,
    description,
    image,
    quantity,
    reseved, // Khớp với typo trong RoomDTO
    isAvailable,
  });
};

const handleGetAvailableRooms = (hotelId) => {
  return axios.get(`/get-room-by-hotelid/${hotelId}`);
};
export {
  handleGetRoomsApi,
  handleFilterRoomApi,
  updateRoomApi,
  handleSetStatusRoom,
  handleAddRoomApi,
  handleGetAvailableRooms,
};
