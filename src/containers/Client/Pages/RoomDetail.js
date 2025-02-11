import React, { Component } from "react";
import "./RoomDetail.scss";
import { Search, Star, MapPin } from "lucide-react";
import { handleGetAllHotelApi } from "../../../services/searchResultService";

class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      isModalOpen: false,
      listHotel: null,
    };
  }

  async componentDidMount() {
    let listhotel = await handleGetAllHotelApi();
    this.setState({
      listHotel: listhotel,
    });
    console.log("list >> hotel :", listhotel);
  }

  render() {
    const { room } = this.props.location.state || {};
    console.log("room >>", room);
    return (
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
            <li>
              <i class="fas fa-check"></i>Free WiFi
            </li>
            <li>Air Conditioning</li>
            <li>Private Bathroom</li>
            <li>Airport Shuttle</li>
            <li>Family Rooms</li>
          </ul>
        </div>
        <div className="reserve-room-description">
          <div className="room-description">
            <p>{room.description}</p>
          </div>

          <div className="property-highlights">
            <h3>Perfect for a 1-night stay!</h3>
            <p>
              This property is situated in the real heart of Ho Chi Minh City
            </p>
            <p>Apartments with:</p>
            <ul>
              <li>Quiet street view</li>
              <li>FREE parking!</li>
            </ul>
            <div className="select-container">
              <select class="form-select" aria-label="Default select example">
                <option selected>Chọn số lượng</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <button className="reserve-button">Reserve Now</button>
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
    );
  }
}

export default RoomDetail;
