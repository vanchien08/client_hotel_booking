import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./HomePage1.scss";
import userimg from "../../../assets/images/user.png";
import BodyHomePage from "./BodyHomePage";
import * as actions from "../../../store/actions";

class HomePage1 extends Component {
  handleClickSeacrch = () => {};
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    console.log("state login >>", isLoggedIn);
    return (
      <div>
        <div id="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3 text-center">
                <p className="fh5co-social-icons">
                  <a href="#">
                    <i className="icon-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="icon-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="icon-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="icon-dribbble"></i>
                  </a>
                  <a href="#">
                    <i className="icon-youtube"></i>
                  </a>
                </p>
                <p>
                  Copyright 2016 Free Html5 <a href="#">Listing</a>. All Rights
                  Reserved. Made with <i className="icon-heart"></i> by{" "}
                  <a
                    href="http://freehtml5.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Freehtml5.co
                  </a>{" "}
                  / Demo Images:{" "}
                  <a
                    href="https://unsplash.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unsplash
                  </a>
                </p>
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
