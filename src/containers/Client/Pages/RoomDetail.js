import React, { Component } from "react";
import "./RoomDetail.scss";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import { Search, Star, MapPin } from "lucide-react";
import { handleGetAllHotelApi } from "../../../services/searchResultService";
import {
  handleGetAmenitiesHotelApi,
  handleGetAmenitiesHotel,
} from "../../../services/hotelService";
import UserReview from "../../../components/UserReview";
import { Table, Modal, Button } from "antd";
import { handleBooking } from "../../../services/userService";
import HeaderPage from "./HeaderPage";
import Footer from "./Footer";
import FooterV2 from "../../Footer/FooterV2";
import { toast } from "react-toastify";

class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      isModalOpen: false,
      listHotel: this.props.location?.state?.hotel || {},
      amenities: null,
      optionSelect: -1,
      totalPrice: 0,
      selectedRooms: {},
      isConfirmModalVisible: false,
    };
  }

  async componentDidMount() {
    const { room } = this.props.location.state || {};
    let amenities = await handleGetAmenitiesHotel(this.state.listHotel.id);
    this.setState({
      amenities: amenities.dataAmenities,
    });
  }

  getColumns = () => [
    {
      title: "ID",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Loại phòng",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá phòng",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        price !== undefined ? `$${price.toLocaleString()}` : "N/A",
    },
    {
      title: "Chọn số lượng",
      key: "selectQuantity",
      render: (_, record) => (
        <select
          onChange={(event) => this.handleSelectQuantity(event, record.id)}
        >
          <option value="">Select</option>
          {[...Array(record.quantity - record.reservedRooms)].map(
            (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            )
          )}
        </select>
      ),
    },
  ];

  handleNavigate = (path) => {
    this.props.navigate(path);
  };

  handleLogOut = (path) => {
    localStorage.removeItem("persist:admin");
    localStorage.removeItem("persist:user");
    this.props.navigate(path);
  };

  handleSelectQuantity = (event, roomId) => {
    const quantity = parseInt(event.target.value);
    this.setState(
      (prevState) => ({
        selectedRooms: { ...prevState.selectedRooms, [roomId]: quantity },
      }),
      () => {
        this.setState({
          totalPrice: this.handleTotalPrice(this.state.selectedRooms),
        });
      }
    );
  };

  handleTotalPrice = (selectRooms) => {
    const { checkIn, checkOut } = this.props.location.state || {};
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    let rooms = this.state.listHotel?.rooms || [];
    let totalPrice = 0;

    Object.entries(selectRooms).forEach(([key, value]) => {
      let selectedRoom = rooms.find((room) => room.id == key);
      if (selectedRoom) {
        totalPrice += selectedRoom.price * value;
      }
    });

    return (
      totalPrice * Math.max(1, checkOutDate.getDate() - checkInDate.getDate())
    );
  };

  showConfirmModal = () => {
    const { selectedRooms } = this.state;
    if (Object.keys(selectedRooms).length === 0) {
      toast.error("Vui lòng chọn ít nhất một phòng!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    this.setState({ isConfirmModalVisible: true });
  };

  handleConfirmBooking = async () => {
    const { checkIn, checkOut, hotel } = this.props.location.state || {};
    if (!hotel || !hotel.rooms) {
      console.error("Hotel or rooms data is missing!");
      toast.error("Dữ liệu khách sạn không hợp lệ!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      this.setState({ isConfirmModalVisible: false });
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const night = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    if (night <= 0) {
      toast.error("Ngày check-out phải sau ngày check-in!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      this.setState({ isConfirmModalVisible: false });
      return;
    }

    let selectRooms = this.state.selectedRooms;
    let userInfo = this.props.userInfo || {};
    let role = userInfo.roles?.[0]?.role || -1;

    if (role === -1) {
      this.handleLogOut("/login");
      this.setState({ isConfirmModalVisible: false });
      return;
    }

    try {
      const bookingPromises = Object.entries(selectRooms).map(
        async ([roomId, quantity]) => {
          let selectedRoom = hotel.rooms.find((room) => room.id == roomId);
          if (!selectedRoom) {
            throw new Error(`Room ID ${roomId} not found`);
          }

          let totalPrice = night * quantity * selectedRoom.price;

          let respon = await handleBooking(
            userInfo.id,
            quantity,
            checkIn,
            checkOut,
            roomId,
            totalPrice
          );

          if (respon.errCode !== 1) {
            throw new Error(`Booking failed for room ID ${roomId}`);
          }
          return respon;
        }
      );

      const responses = await Promise.all(bookingPromises);
      console.log("All bookings completed:", responses);
      toast.success("Đặt phòng thành công!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      this.setState({ isConfirmModalVisible: false });
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error);
      toast.error(`Đặt phòng thất bại: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      this.setState({ isConfirmModalVisible: false });
    }
  };

  handleCancelBooking = () => {
    this.setState({ isConfirmModalVisible: false });
  };

  renderConfirmModalContent = () => {
    const { selectedRooms, listHotel, totalPrice } = this.state;
    const { checkIn, checkOut } = this.props.location.state || {};
    const checkInDate = checkIn ? new Date(checkIn) : null;
    const checkOutDate = checkOut ? new Date(checkOut) : null;

    return (
      <div>
        <p>
          <strong>Khách sạn:</strong> {listHotel.name}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {listHotel.address}
        </p>
        {checkInDate && checkOutDate && (
          <>
            <p>
              <strong>Check-in:</strong> {checkInDate.toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong> {checkOutDate.toLocaleDateString()}
            </p>
            <p>
              <strong>Số đêm:</strong>{" "}
              {Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))}
            </p>
          </>
        )}
        <h4>Phòng đã chọn:</h4>
        <ul>
          {Object.entries(selectedRooms).map(([roomId, quantity]) => {
            const room = listHotel.rooms?.find((r) => r.id == roomId);
            return room ? (
              <li key={roomId}>
                {room.roomType} - Số lượng: {quantity} - Giá: $
                {room.price.toLocaleString()} / phòng
              </li>
            ) : null;
          })}
        </ul>
        <p>
          <strong>Tổng giá:</strong> ${totalPrice.toLocaleString()}
        </p>
      </div>
    );
  };

  render() {
    const { room, hotel, checkIn, checkOut } = this.props.location.state || {};
    const amenitiesHotel = this.state.amenities;
    let { totalPrice, isConfirmModalVisible } = this.state;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    return (
      <div>
        <HeaderPage />
        <div className="room-detail-container">
          <div className="room-header">
            <h1>{hotel.name}</h1>
            <p>
              <MapPin size={16} /> {hotel.address}
            </p>
            <div className="rating">
              <span>4.8</span>
              <Star size={16} fill="#FFD700" />
              <span> (135 reviews)</span>
            </div>
          </div>
          <div className="room-content">
            <div className="room-image">
              <img src={hotel.image} alt="room" />
            </div>
            <div className="room-map">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?..."
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="room-facilities">
            <ul>
              {amenitiesHotel &&
                Array.isArray(amenitiesHotel) &&
                amenitiesHotel.map((amenity, index) => (
                  <li key={index} className="amenity-item">
                    <div className="icon-amenities-hotel">
                      <i className={`fa-solid ${amenity.icon}`}></i>
                    </div>
                    <span className="amenity-name">{amenity.name}</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="reserve-room-description">
            <div className="room-description">
              <p>{room.description}</p>
            </div>
            <div className="property-highlights">
              <h3>Điểm nổi bật của chỗ nghỉ</h3>
              <p>Hoàn hảo cho kỳ nghỉ một đêm</p>
              <p>
                Địa điểm hàng đầu: Được khách gần đây đánh giá cao (9,0 điểm)
              </p>
              <ul>
                <li>Có bãi đậu xe riêng miễn phí ở khách sạn này</li>
              </ul>
            </div>
            <Table
              className="table-room"
              columns={this.getColumns()}
              dataSource={hotel.rooms}
              rowKey="id"
            />
            <div className="property-highlights price-reserve">
              <h3>Giá {checkOutDate.getDate() - checkInDate.getDate()} đêm</h3>
              <h2>${totalPrice.toLocaleString()}</h2>
              <p>Bao gồm thuế và phí</p>
              <p>
                Địa điểm hàng đầu: Được khách gần đây đánh giá cao (9,0 điểm)
              </p>
              <ul>
                <li>Có bãi đậu xe riêng miễn phí ở khách sạn này</li>
              </ul>
              <button
                className="reserve-button"
                onClick={this.showConfirmModal}
              >
                Đặt ngay
              </button>
            </div>
            <div className="most-popular-facilities">
              <h3>Most popular facilities</h3>
              <ul>
                <li>🚐 Airport shuttle</li>
                <li>🚭 Non-smoking rooms</li>
                <li>🅿 Free parking</li>
                <li>📶 Free WiFi</li>
                <li>👨‍👩‍👧 Family rooms</li>
                <li>🛎 24-hour front desk</li>
                <li>❄ Air conditioning</li>
                <li>🧺 Laundry</li>
                <li>🛗 Lift</li>
                <li>🧹 Daily housekeeping</li>
              </ul>
            </div>
          </div>
          <UserReview hotelId={hotel.id} />
        </div>
        <Modal
          title={<h1>Xác nhận đặt phòng</h1>}
          visible={isConfirmModalVisible}
          onOk={this.handleConfirmBooking}
          onCancel={this.handleCancelBooking}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          {this.renderConfirmModalContent()}
        </Modal>
        <FooterV2 />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    errCode: state.user.errCode,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    fetchLoginSuccess: (userInfo) =>
      dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetail);
