import React, { Component } from "react";
import "./SearchResult.scss";
import { Search, Star } from "lucide-react";
import { handelGetAllHotelApi } from "../../../services/searchResultService";
const filters = [
  { name: "Balcony", count: 1814 },
  { name: "Apartments", count: 1640 },
  { name: "No prepayment", count: 2482 },
  { name: "Hotels", count: 1418 },
  { name: "Superb: 9+", count: 658 },
  { name: "4 stars", count: 586 },
  { name: "Swimming Pool", count: 936 },
  { name: "Free WiFi", count: 2878 },
  { name: "Double bed", count: 3191 },
  { name: "Airport shuttle", count: 896 },
  { name: "Private bathroom", count: 2755 },
];

class SearchResult extends Component {
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
    let listhotel = await handelGetAllHotelApi();
    this.setState({
      listHotel: listhotel,
    });
  }

  handleNavigate = (hotel, room) => {
    this.props.history.push({
      pathname: "/roomdetail",
      state: { hotel, room },
    });
  };
  render() {
    let listHotel = this.state.listHotel;
    return (
      <div className="search-result-container">
        <div className="search-layout">
          {/* Filter Section */}
          <aside className="filter-section">
            <h3>Popular filters</h3>
            <ul>
              {filters.map((filter, index) => (
                <li key={index} className="filter-item">
                  <input type="checkbox" id={`filter-${index}`} />
                  <label htmlFor={`filter-${index}`}>
                    {filter.name} ({filter.count})
                  </label>
                </li>
              ))}
            </ul>
          </aside>

          {/* Hotel List Section */}
          <div className="hotel-list-section">
            {listHotel &&
              Array.isArray(listHotel) &&
              listHotel.map(
                (hotel, index) =>
                  hotel.rooms &&
                  Array.isArray(hotel.rooms) &&
                  hotel.rooms.map((room, index) => (
                    <div key={index} className="hotel-card">
                      <div className="hotel-image-container">
                        <img
                          src={room.image}
                          alt={hotel.name}
                          className="hotel-image"
                        />
                      </div>

                      <div className="hotel-details">
                        <h3 className="hotel-name">{hotel.name}</h3>
                        <p className="hotel-location">{hotel.address}</p>
                        <p className="hotel-description">{hotel.description}</p>
                        <p className="hotel-bed">{room.roomType}</p>

                        <p className="hotel-cancellation">
                          ✅ <span>cho phep huy</span>
                        </p>
                        <p className="hotel-prepayment">
                          ✅ <span>thanh toan</span>
                        </p>

                        <p className="hotel-limited">
                          🔥 Only 4 left at this price!
                        </p>
                      </div>

                      <div className="hotel-action">
                        <p className="hotel-score">
                          <strong>Superb</strong> {hotel.reviews.rating} ⭐
                        </p>
                        <p className="hotel-reviews">
                          {hotel.reviews.length} real reviews
                        </p>
                        <p className="hotel-price">
                          <span className="hotel-old-price">VND 686,250</span>
                          {room.price}{" "}
                          <span className="hotel-tax">
                            Includes taxes and charges
                          </span>
                        </p>
                        <button
                          className="see-availability-button"
                          onClick={() => this.handleNavigate(hotel, room)}
                        >
                          See availability
                        </button>
                      </div>
                    </div>
                  ))
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
