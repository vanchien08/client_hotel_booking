import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./HomePage1.scss";
import * as actions from "../../../store/actions";
import {
  handleGetAllHotelApi,
  handleSearchRoom,
} from "../../../services/searchResultService";
import { Button, Modal } from "antd";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";

import HeaderPage from "./HeaderPage";
import Footer from "./Footer";
import FooterV2 from "../../Footer/FooterV2";
import bannerImage from "../../../assets/images/bannerHotel2.png";
import BodyHomePage from "./BodyHomePage";
const destinations = [
  {
    name: "Hà Tiên",
    distance: "238km",
    image:
      "https://res.cloudinary.com/dwkvrufbf/image/upload/v1728194164/samples/landscapes/nature-mountains.jpg",
  },
  {
    name: "Phan Rang",
    distance: "271km",
    image:
      "https://res.cloudinary.com/dwkvrufbf/image/upload/v1728194164/samples/landscapes/nature-mountains.jpg",
  },
  {
    name: "Phú Quốc",
    distance: "298km",
    image:
      "https://res.cloudinary.com/dwkvrufbf/image/upload/v1728194164/samples/landscapes/nature-mountains.jpg",
  },
  {
    name: "Cam Ranh",
    distance: "301km",
    image:
      "https://res.cloudinary.com/dwkvrufbf/image/upload/v1728194164/samples/landscapes/nature-mountains.jpg",
  },
  {
    name: "Nha Trang",
    distance: "322km",
    image:
      "https://res.cloudinary.com/dwkvrufbf/image/upload/v1728194164/samples/landscapes/nature-mountains.jpg",
  },
  {
    name: "Vịnh Ninh Vân",
    distance: "340km",
    image:
      "https://res.cloudinary.com/dwkvrufbf/image/upload/v1728194164/samples/landscapes/nature-mountains.jpg",
  },
  {
    name: "Vịnh Ninh Vân",
    distance: "340km",
    image:
      "https://res.cloudinary.com/dwkvrufbf/image/upload/v1728194164/samples/landscapes/nature-mountains.jpg",
  },
];
class HomePage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      checkOut: this.getCurrentDatePlus(),
      checkIn: this.getCurrentDate(),
      address: "",
      listHotel: null,
      allHotel: null,
    };
  }
  getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  }
  getCurrentDatePlus() {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  }
  // Lấy dữ liệu khi component mount
  async componentDidMount() {
    let respon = await handleGetAllHotelApi();
    this.setState({
      allHotel: respon,
    });
    console.log("check list hotel", respon);
  }
  handleClickSeacrch = async () => {
    let { address, checkIn, checkOut } = this.state;
    console.log("event vbvb>>", this.state);
    if (checkIn > checkOut) {
      //   console.log("ngay checkin phai nho hon>>");
      this.setState({
        isModalOpen: true,
      });
    } else {
      let searchRoom = await handleSearchRoom(address, checkIn, checkOut);
      this.handleNavigate(
        address,
        checkIn,
        checkOut,
        searchRoom.dataroom,
        searchRoom.datahotel
      );
      console.log("data search room", searchRoom);
    }
  };
  handleGetAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  handleGetDate = (event) => {
    if (event.target.id == "checkin") {
      this.setState({
        checkIn: event.target.value,
      });
    } else {
      this.setState({
        checkOut: event.target.value,
      });
    }
  };
  handleOkModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  handleCancelModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleNavigate = (address, checkIn, checkOut, listRoom, listHotel) => {
    this.props.history.push({
      pathname: "/searchResult",
      state: { address, checkIn, checkOut, listRoom, listHotel },
    });
  };

  swiper = () =>
    new Swiper(".swiper", {
      // Optional parameters
      direction: "vertical",
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let isModalOpen = this.state.isModalOpen;
    let listhotel = this.state.allHotel;
    console.log("state login >>", isLoggedIn);
    return (
      <div className="Hompage-container">
        <Modal
          title="Thông báo"
          open={isModalOpen}
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          Ngày bắt đầu phải nhỏ hơn ngày kết thúc !
        </Modal>
        <HeaderPage />
        <div className="fh5co-hero">
          {/* <div className="fh5co-overlay"></div> */}
          <div
            className="fh5co-cover text-center"
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="desc animate-box">
              <h2>Travel Around The World.</h2>
              <span>
                {/* <a className="btn btn-primary btn-lg" href="#">
                  Get Started
                </a> */}
              </span>
              <div className="button-search-containerhp">
                <div className="search-containerhp">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Bạn muốn đi đâu?"
                      id="address"
                      value={this.state.address}
                      onChange={(event) => this.handleGetAddress(event)}
                    />
                    <input
                      type="date"
                      id="checkin"
                      value={this.state.checkIn}
                      onChange={(event) => this.handleGetDate(event)}
                    />
                    <input
                      type="date"
                      id="checkout"
                      value={this.state.checkOut}
                      onChange={(event) => this.handleGetDate(event)}
                    />
                    <button onClick={() => this.handleClickSeacrch()}>
                      Tìm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="trip-slider">
          <div className="title-slide">
            <h1 className="text-2xl font-bold mb-2">
              Bạn đang định thực hiện chuyến đi ra sao?
            </h1>
            <p className="text-gray-600 mb-4">
              Tìm điểm đến ở Việt Nam phù hợp với sở thích của bạn
            </p>{" "}
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {listhotel?.map((place, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="image-slider w-100 h-40 object-cover"
                    style={{
                      width: "100%",
                      height: "200px", // hoặc bất kỳ chiều cao cố định nào bạn muốn
                      objectFit: "cover", // giúp hình ảnh lấp đầy khung mà không méo
                    }}
                  />
                  <div className="description-address-slider">
                    <h3 className="province-address">{place.name}</h3>
                    <p className="distance-adress">Cách đây 100km</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <BodyHomePage />
        <FooterV2 />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    errCode: state.user.errCode,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    // fetchLoginStart: (username, password) =>
    //   dispatch(actions.fetchLoginStart(username, password)),
    fetchLoginSuccess: (userInfo) =>
      dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage1);
//export default HomePage1;
