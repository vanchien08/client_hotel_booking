import React, { Component } from "react";
import "./SearchResult.scss";
import { Search, Star } from "lucide-react";
import { handleGetAllHotelApi } from "../../../services/searchResultService";

import HeaderPage from "./HeaderPage";
import SearchButton from "../../../components/SearchButton";
import { handleSearchRoom } from "../../../services/searchResultService";
import { handleGetAmenitiesHotelApi } from "../../../services/hotelService";
import Footer from "./Footer";
import image from "../../../assets/images/banner_searchRS.png";
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      isModalOpen: false,
      listHotel: null,
      listRoom: null,
      listAmenitiesHotel: null,
      checkBoxAmenities: null,
      checkboxConvert: null,
    };
  }

  async componentDidMount() {
    let amenitiesHotel = await handleGetAmenitiesHotelApi();
    let listhotel = await handleGetAllHotelApi();
    let { address, checkIn, checkOut } = this.props.location.state || {};
    // if(!{ address, checkIn, checkOut } ){

    // }
    this.setState({
      listHotel: listhotel,
      listAmenitiesHotel: amenitiesHotel.dataAmenities,
    });

    console.log("amenities", amenitiesHotel);
  }
  handleClickSearch = async (address, checkIn, checkOut) => {
    if (checkIn > checkOut) {
      this.setState({ isModalOpen: true });
    } else {
      let checkBoxAmenities = this.state.checkboxConvert;
      console.log("checkboxconvert ", checkBoxAmenities);
      let searchRoom = await handleSearchRoom(
        address,
        checkIn,
        checkOut,
        checkBoxAmenities
      );
      this.setState({ listRoom: searchRoom.dataroom });
      //  console.log("check list room", searchRoom);
    }
  };
  handleNavigate = (room, checkIn, checkOut) => {
    this.props.history.push({
      pathname: "/roomdetail",
      state: { room, checkIn, checkOut },
    });
  };
  handleCheckBox = (event, amenity) => {
    this.setState(
      (prevState) => {
        const checkBoxAmenities = prevState.checkBoxAmenities || {}; // Nếu null thì tạo object mới
        const prevCheck = checkBoxAmenities[amenity.id] || false; // Nếu undefined thì mặc định là false

        return {
          checkBoxAmenities: {
            ...checkBoxAmenities, // Giữ lại dữ liệu cũ
            [amenity.id]: !prevCheck, // Đảo trạng thái checkbox
          },
        };
      },
      () => {
        let list = this.convertListCheckBox(this.state.checkBoxAmenities);
        this.setState({
          checkboxConvert: list,
        });
        //   console.log("Check box:", list);
      }
    );
  };
  convertListCheckBox = (listcheckbox) => {
    let listconvert = [];

    for (const [id, check] of Object.entries(listcheckbox)) {
      listconvert.push({ id, check });
    }

    return listconvert;
  };

  render() {
    let listHotel = this.state.listHotel;
    let { address, checkIn, checkOut } = this.props.location.state || {};
    let amenitiesHotel = this.state.listAmenitiesHotel;
    let listRoom =
      this.state.listRoom ||
      (this.props.location.state && this.props.location.state.listRoom);
    //   console.log("list room props", listRoom);
    console.log("list room props", this.state.listRoom);
    return (
      <div>
        <HeaderPage />
        <div className="search-result-container">
          <div className="search-result-banner">
            <SearchButton
              className="search-button-component"
              onSearch={this.handleClickSearch}
            />
          </div>

          <div className="body-search">
            <div className="search-layout">
              {/* Filter Section */}
              <aside className="filter-section">
                <h3>Các tiện ích</h3>
                <ul>
                  {amenitiesHotel &&
                    Array.isArray(amenitiesHotel) &&
                    amenitiesHotel.map((amenity, index) => (
                      <li key={index} className="filter-item">
                        <input
                          type="checkbox"
                          id={`filter-${index}`}
                          onChange={(event) =>
                            this.handleCheckBox(event, amenity)
                          }
                        />
                        <label htmlFor={`filter-${index}`}>
                          {amenity.name}{" "}
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
                          <i class="fa-solid fa-check"></i>{" "}
                          <span>Cho phép hủy</span>
                        </p>
                        <p className="hotel-prepayment">
                          <i class="fa-solid fa-check"></i>{" "}
                          <span>Thanh toán</span>
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
                          onClick={() =>
                            this.handleNavigate(room, checkIn, checkOut)
                          }
                        >
                          See availability
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SearchResult;
