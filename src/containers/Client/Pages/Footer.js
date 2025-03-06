import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Footer.scss";
import userimg from "../../../assets/images/user.png";
import BodyHomePage from "./BodyHomePage";
import * as actions from "../../../store/actions";

class Footer extends Component {
  handleClickSeacrch = () => {};
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    console.log("state login >>", isLoggedIn);
    return (
      <div>
        <footer className="bg-dark text-center text-white">
          {/* Grid container */}
          <div className="container p-4 pb-0">
            {/* Section: Social media */}
            <section className="mb-4">
              {/* Facebook */}
              <a
                data-mdb-ripple-init
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              {/* Twitter */}
              <a
                data-mdb-ripple-init
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>

              {/* Google */}
              <a
                data-mdb-ripple-init
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>

              {/* Instagram */}
              <a
                data-mdb-ripple-init
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>

              {/* Linkedin */}
              <a
                data-mdb-ripple-init
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              {/* Github */}
              <a
                data-mdb-ripple-init
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-github"></i>
              </a>
            </section>
            {/* Section: Social media */}
          </div>
          {/* Grid container */}

          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2025 Copyright:{" "}
            <a className="text-white" href="">
              ptithotelbooking.com
            </a>
          </div>
          {/* Copyright */}
        </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
//export default Footer;
