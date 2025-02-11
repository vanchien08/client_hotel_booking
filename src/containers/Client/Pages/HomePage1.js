import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./HomePage1.scss";
import * as actions from "../../../store/actions";
import { handleSearchRoom } from "../../../services/searchResultService";
import { Button, Modal } from "antd";
import HomePages from "./HomePages";
import HeaderPage from "./HeaderPage";
import Footer from "./Footer";
import bannerImage from "../../../assets/images/bannerHotel.jpg";
import imageroom1 from "../../../assets/images/imageroom1.jpg";
import imageroom2 from "../../../assets/images/imageroom2.jpg";
import imageroom3 from "../../../assets/images/imageroom3.jpg";
import imageroom4 from "../../../assets/images/imageroom4.jpg";
import imageroom5 from "../../../assets/images/imageroom5.jpg";
import imageroom6 from "../../../assets/images/imageroom6.jpg";
import travel1 from "../../../assets/images/travel1.jpg";
import travel2 from "../../../assets/images/travel2.jpg";
class HomePage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      checkOut: this.getCurrentDate(),
      checkIn: this.getCurrentDate(),
      address: "",
    };
  }
  getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  }
  // Lấy dữ liệu khi component mount
  async componentDidMount() {}
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
      this.handleNavigate(address, checkIn, checkOut, searchRoom.dataroom);
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

  handleNavigate = (address, checkIn, checkOut, listRoom) => {
    this.props.history.push({
      pathname: "/searchResult",
      state: { address, checkIn, checkOut, listRoom },
    });
  };
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let isModalOpen = this.state.isModalOpen;
    console.log("state login >>", isLoggedIn);
    return (
      <div>
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
          <div className="fh5co-overlay"></div>
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
                <a className="btn btn-primary btn-lg" href="#">
                  Get Started
                </a>
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

        <div className="fh5co-listing">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom1} alt="Paris" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Paris</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom2} alt="New York" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>New York</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom3} alt="London" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>London</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>

              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom4} alt="Amsterdam" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Amsterdam</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom5} alt="Australia" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Australia</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom6} alt="Japan" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Japan</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="fh5co-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h3>News</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a href="#">
                      <span className="text-muted">Sep. 10, 2016</span>
                      <h3 className="mb-1">Newly done Bridge of London</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus reprehenderit!
                      </p>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#">
                      <span className="text-muted">Sep. 10, 2016</span>
                      <h3 className="mb-1">Newly done Bridge of London</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus reprehenderit!
                      </p>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#">
                      <span className="text-muted">Sep. 10, 2016</span>
                      <h3 className="mb-1">Newly done Bridge of London</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus reprehenderit!
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <img
                  src={travel1}
                  alt="News Image"
                  className="img-fluid mb-4"
                />
                <img src={travel2} alt="News Image" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
