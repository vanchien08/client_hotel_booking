import React, { Component } from "react";
import "./SearchResult.scss";
import { Search, Star } from "lucide-react";
import { handleGetAllHotelApi } from "../../../services/searchResultService";

import HeaderPage from "./HeaderPage";
import SearchButton from "../../../components/SearchButton";
import { handleSearchRoom } from "../../../services/searchResultService";
import { handleGetAmenitiesHotelApi } from "../../../services/hotelService";
import { handleGetPrice } from "../../../services/userService";
import Footer from "./Footer";
import image from "../../../assets/images/banner_searchRS.png";
import { Slider, Switch } from "antd";
import FooterV2 from "../../Footer/FooterV2";
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.location.state.address,
      checkIn: this.props.location.state.checkIn,
      checkOut: this.props.location.state.checkOut,
      isLoggedIn: false,
      data: null,
      isModalOpen: false,
      listHotel: null,
      listRoom: null,
      listAmenitiesHotel: null,
      checkBoxAmenities: null,
      checkboxConvert: null,
      disabled: false,
      priceRange: [100, 1000],
      listHotel: this.props.location?.state?.listHotel || {},
    };
  }

  async componentDidMount() {
    let amenitiesHotel = await handleGetAmenitiesHotelApi();
    let responPrice = await handleGetPrice();
    //  let listhotel = await handleGetAllHotelApi();
    let { address, checkIn, checkOut } = this.props.location.state || {};
    let priceminmax = responPrice.priceminmax;

    // if(!{ address, checkIn, checkOut } ){
    let priceRange = [priceminmax.priceMin, priceminmax.priceMax];
    // }
    this.setState({
      //  listHotel: listhotel,
      listAmenitiesHotel: amenitiesHotel.dataAmenities,
      priceRange: priceRange,
    });

    console.log("responPrice", this.state.listHotel);
  }
  handleClickSearch = async (address, checkIn, checkOut) => {
    let priceArr = this.state.priceRange;
    if (checkIn > checkOut) {
      this.setState({ isModalOpen: true });
    } else {
      let checkBoxAmenities = this.state.checkboxConvert;

      let searchRoom = await handleSearchRoom(
        address,
        checkIn,
        checkOut,
        checkBoxAmenities,
        priceArr[0],
        priceArr[1]
      );
      console.log("respon search room", searchRoom);
      this.setState({
        listRoom: searchRoom.dataroom,
        listHotel: searchRoom.datahotel,
        address: address,
        checkIn: checkIn,
        checkOut: checkOut,
      });
    }
  };
  handleNavigate = (room, checkIn, checkOut, hotel) => {
    this.props.history.push({
      pathname: "/roomdetail",
      state: { room, checkIn, checkOut, hotel },
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

  getMinPrice = (listroom) => {
    //   let listprice=[]
    //   for(let i=0;i<listroom.length;i++){
    //     listprice.push(listroom[i].price);
    //   }
    //  let min = min(listprice)
    let listprice = listroom.map((room) => room.price);
    return Math.min(...listprice);
  };
  handlePriceChange = (value) => {
    this.setState({ priceRange: value });
  };
  handleToggleSlider = (checked) => {
    this.setState({ disabled: checked });
  };

  priceSlider() {
    return (
      <>
        <Slider
          range
          min={0}
          max={110000}
          step={100}
          value={this.state.priceRange}
          onChange={this.handlePriceChange}
          disabled={this.state.disabled}
        />

        <p>
          Khoảng giá: {this.state.priceRange[0]} - {this.state.priceRange[1]}
        </p>
      </>
    );
  }

  render() {
    let listHotel = this.state.listHotel;
    let { address, checkIn, checkOut } = this.state || {};
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
              checkIn={checkIn}
              checkOut={checkOut}
            />
          </div>

          <div className="body-search">
            <div className="search-layout">
              {/* Filter Section */}
              <aside className="filter-section">
                <h3>Lọc theo giá (VND)</h3>
                {this.priceSlider()}
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
                {listHotel &&
                  Array.isArray(listHotel) &&
                  listHotel.map((hotel, index) => (
                    <div key={index} className="hotel-card">
                      <div className="hotel-image-container">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="hotel-image"
                        />
                        {hotel.limited && (
                          <div className="hotel-badge">
                            <span>🔥 Only 4 left!</span>
                          </div>
                        )}
                      </div>

                      <div className="hotel-content">
                        <div className="hotel-details">
                          <div className="hotel-header">
                            <h3 className="hotel-name">{hotel.name}</h3>
                            <div className="hotel-rating">
                              <span className="rating-score">9.2</span>
                              <div className="rating-info">
                                <strong>Superb</strong>
                                <span className="hotel-reviews">5 reviews</span>
                              </div>
                            </div>
                          </div>

                          <p className="hotel-location">
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {hotel.address}
                          </p>

                          <p className="hotel-description">
                            {hotel.description}
                          </p>

                          <div className="hotel-room-type">
                            <i className="fas fa-bed"></i>{" "}
                            {hotel.bedType || "Standard Room"}
                          </div>

                          <div className="hotel-features">
                            <div className="feature">
                              <i className="fas fa-check-circle"></i> Free
                              cancellation
                            </div>
                            <div className="feature">
                              <i className="fas fa-credit-card"></i> Pay at the
                              property
                            </div>
                          </div>
                        </div>

                        <div className="hotel-action">
                          <div className="price-container">
                            <div className="price-details">
                              <span className="hotel-old-price">
                                VND 686,250
                              </span>
                              {this.getMinPrice(hotel.rooms)}
                              <span className="hotel-tax">
                                Includes taxes and fees
                              </span>
                            </div>
                          </div>
                          <button
                            className="see-availability-button"
                            onClick={() =>
                              this.handleNavigate(
                                hotel.rooms[0],
                                checkIn,
                                checkOut,
                                hotel
                              )
                            }
                          >
                            See availability
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <FooterV2 />
      </div>
    );
  }
}

export default SearchResult;
