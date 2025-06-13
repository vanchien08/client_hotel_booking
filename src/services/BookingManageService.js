import axios from "../axios";

const handleGetAllBookingApi = () => {
  return axios.get("/get-all-booking");
};

const handleFilterBookingApi = (filterData) => {
  return axios.get("/filter-bookings", {
    params: {
      id: filterData.id,
      username: filterData.username,
      roomType: filterData.roomType,
      hotelName: filterData.hotelName,
      status: filterData.status,
      checkInFrom: filterData.checkInFrom,
      checkInTo: filterData.checkInTo,
      checkOutFrom: filterData.checkOutFrom,
      checkOutTo: filterData.checkOutTo,
      minTotalPrice: filterData.minTotalPrice,
      maxTotalPrice: filterData.maxTotalPrice,
      createdAtFrom: filterData.createdAtFrom,
      createdAtTo: filterData.createdAtTo,
    },
  });
};

const handleSetStatusBooking = (id, status) => {
  return axios.put("/set-status-booking", null, {
    params: { id, status },
  });
};
const handleAddBookingApi = (bookingData) => {
  return axios.post("/create-booking", bookingData);
};
export {
  handleGetAllBookingApi,
  handleFilterBookingApi,
  handleSetStatusBooking,
  handleAddBookingApi,
};
