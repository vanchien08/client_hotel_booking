import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./HomePage1.scss";
import userimg from "../../../assets/images/user.png";
import BodyHomePage from "./BodyHomePage";
import * as actions from "../../../store/actions";

class HomePage1 extends Component {
  handelClickSeacrch = () => {};
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    console.log("state login >>", isLoggedIn);
    return (
      <div>
        <div className="fh5co-hero">
          <div className="fh5co-overlay"></div>
          <div
            className="fh5co-cover text-center"
            style={{
              backgroundImage: "url('images/cover_bg_1.jpg')",
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
              <div className="button-search-container">
                <div className="search-container">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Bạn muốn đi đâu?"
                      id="location"
                    />
                    <input type="date" id="checkin" />
                    <input type="date" id="checkout" />
                    <button onclick={() => this.handelClickSeacrch()}>
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
                  <img
                    src="images/img-1.jpg"
                    alt="Paris"
                    className="img-fluid"
                  />
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
                  <img
                    src="images/img-2.jpg"
                    alt="New York"
                    className="img-fluid"
                  />
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
                  <img
                    src="images/img-3.jpg"
                    alt="London"
                    className="img-fluid"
                  />
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
                  <img
                    src="images/img-4.jpg"
                    alt="Amsterdam"
                    className="img-fluid"
                  />
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
                  <img
                    src="images/img-5.jpg"
                    alt="Australia"
                    className="img-fluid"
                  />
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
                  <img
                    src="images/img-6.jpg"
                    alt="Japan"
                    className="img-fluid"
                  />
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
                  src="images/cover_bg_1.jpg"
                  alt="News Image"
                  className="img-fluid mb-4"
                />
                <img
                  src="images/cover_bg_1.jpg"
                  alt="News Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
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
