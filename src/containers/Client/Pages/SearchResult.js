import React, { Component } from "react";
import "./SearchResult.scss";
import { Search, Star } from "lucide-react";
import { handleGetAllHotelApi } from "../../../services/searchResultService";
import HomePages from "./HomePages";
import HeaderPage from "./HeaderPage";
import SearchButton from "../../../components/SearchButton";
import { handleSearchRoom } from "../../../services/searchResultService";
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
      listRoom: null,
    };
  }

  async componentDidMount() {
    let listhotel = await handleGetAllHotelApi();
    this.setState({
      listHotel: listhotel,
    });
  }
  handleClickSearch = async (address, checkIn, checkOut) => {
    if (checkIn > checkOut) {
      this.setState({ isModalOpen: true });
    } else {
      let searchRoom = await handleSearchRoom(address, checkIn, checkOut);
      this.setState({ listRoom: searchRoom.dataroom });
      //  console.log("check list room", searchRoom);
    }
  };
  handleNavigate = (room) => {
    this.props.history.push({
      pathname: "/roomdetail",
      state: { room },
    });
  };
  render() {
    let listHotel = this.state.listHotel;
    let { address, checkIn, checkOut } = this.props.location.state || {};
    let listRoom =
      this.state.listRoom ||
      (this.props.location.state && this.props.location.state.listRoom);
    //   console.log("list room props", listRoom);
    console.log("list room props", this.state.listRoom);
    return (
      <div className="search-result-container">
        <HeaderPage />
        <SearchButton
          className="search-button-component"
          onSearch={this.handleClickSearch}
        />
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
            {listRoom &&
              Array.isArray(listRoom) &&
              listRoom.map((room, index) => (
                <div key={index} className="hotel-card">
                  <div className="hotel-image-container">
                    <img
                      src={room.image}
                      alt={room.hotel.name}
                      className="hotel-image"
                    />
                  </div>

                  <div className="hotel-details">
                    <h3 className="hotel-name">{room.hotel.name}</h3>
                    <p className="hotel-location">{room.hotel.address}</p>
                    <p className="hotel-description">
                      {room.hotel.description}
                    </p>
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
                      <strong>Superb</strong> rating ⭐
                    </p>
                    <p className="hotel-reviews">5 real reviews</p>
                    <p className="hotel-price">
                      <span className="hotel-old-price">VND 686,250</span>
                      {room.price}{" "}
                      <span className="hotel-tax">
                        Includes taxes and charges
                      </span>
                    </p>
                    <button
                      className="see-availability-button"
                      onClick={() => this.handleNavigate(room)}
                    >
                      See availability
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
