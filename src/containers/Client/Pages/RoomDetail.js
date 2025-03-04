import React, { Component } from "react";
import "./RoomDetail.scss";
import { Search, Star, MapPin } from "lucide-react";
import { handleGetAllHotelApi } from "../../../services/searchResultService";
import {
  handleGetAmenitiesHotelApi,
  handleGetAmenitiesHotel,
} from "../../../services/hotelService";
import HeaderPage from "./HeaderPage";
import Footer from "./Footer";
class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      isModalOpen: false,
      listHotel: null,
      amenities: null,
    };
  }

  async componentDidMount() {
    const { room } = this.props.location.state || {};
    //    let listhotel = await handleGetAmenitiesHotel();
    let amenities = await handleGetAmenitiesHotel(room.hotel.id);
    this.setState({
      //   listHotel: listhotel,
      amenities: amenities.dataAmenities,
    });
    console.log("list >> hotel id :", amenities);
  }

  render() {
    const { room } = this.props.location.state || {};
    const amenitiesHotel = this.state.amenities;
    console.log("room >>", room);
    return (
      <div>
        <HeaderPage />
        <div className="room-detail-container">
          <div className="room-header">
            <h1>{room.roomType}</h1>
            <p>
              <MapPin size={16} /> {room.hotel.address}
            </p>
            <div className="rating">
              <span>4.8</span>
              <Star size={16} fill="#FFD700" />
              <span> (135 reviews)</span>
            </div>
          </div>
          <div className="room-content">
            <div className="room-image">
              <img src={room.image} alt="room" />
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
              {/* <div className="select-container">
              <select class="form-select" aria-label="Default select example">
                <option disabled selected>
                  Chọn số lượng
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div> */}

              <button className="reserve-button">Đặt ngay</button>
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default RoomDetail;
