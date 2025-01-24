import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Profile.scss";
import "../../../assets/images/avatar.png";
// import * as actions from "../../store/actions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handelLogin = () => {
    console.log("login");
    this.redirectToSystemPage();
  };
  handlerKeyDown = (event) => {};

  async componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.errCode !== this.props.errCode) {
    //   this.setState({
    //     errCode: this.props.errCode,
    //   });
    // }
  }

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/login";
    navigate(`${redirectPath}`);
  };

  render() {
    return (
      <div className="Profile_container">
        <div className="profile-header">
          <div className="cover-photo"></div>

          <div className="avatar"></div>

          <div className="name">Nguyễn Văn Chiến</div>
        </div>
        <div className="profile-body">
          <div className="scrollable-section">
            {/* Content that will be scrollable */}
            <p>This is a long list of content that will be scrollable.</p>
            {/* You can add more content here */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // lang: state.app.language,
    // isLoggedIn: state.user.isLoggedIn,
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
    // fetchLoginSuccess: (userInfo) =>
    //   dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
