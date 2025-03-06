import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./ProfileUser.scss";
import userimg from "../../../assets/images/user.png";
import BodyHomePage from "./BodyHomePage";
import * as actions from "../../../store/actions";

class ProfileUser extends Component {
  handleClickSeacrch = () => {};
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    console.log("state login >>", isLoggedIn);
    return <div>chien profile</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
//export default ProfileUser;
