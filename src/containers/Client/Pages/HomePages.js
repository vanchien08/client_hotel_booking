import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./HomePages.scss";
import userimg from "../../../assets/images/user.png";
import BodyHomePage from "./BodyHomePage";
import * as actions from "../../../store/actions";

// antd

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

const items = [
  {
    label: "Profile",
    key: "1",
  },
  {
    label: "Setting",
    key: "2",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const App = () => (
  <Dropdown
    menu={{
      items,
      onClick: this.onClick,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <img src={userimg} alt="" width="45" height="45" />
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

class HomePages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  handelLogin = () => {
    //console.log("login");
    this.redirectToSystemPage("/login");
  };
  handelToURLShopCart = () => {
    this.redirectToSystemPage("/shopviet/shopcart");
  };
  handlerKeyDown = (event) => {};

  async componentDidMount() {
    console.log("is login ?", this.props.isLoggedIn);
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      console.log("Prev props:", prevProps.isLoggedIn);
      console.log("Current props:", this.props.isLoggedIn);
      this.setState({
        isLoggedIn: this.props.isLoggedIn,
      });
    }
  }

  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = url;
    navigate(`${redirectPath}`);
  };
  onClick = ({ key }) => {
    this.redirectToSystemPage("/shopviet/shopcart");
    //message.info(`Click on item ${key}`);
  };
  renderDropdown() {
    return (
      <Dropdown
        menu={{
          items,
          onClick: this.onClick,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <img src={userimg} alt="" width="45" height="45" />
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    );
  }
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    console.log("state login >>", isLoggedIn);
    return (
      <div className="text-center">
        <div className="headerPage">
          <div className="logoShopViet">
            <img
              src={require("../../../assets/images/logoshopviet.png").default}
              alt="Logo của Shop Việt"
              width="120"
              height="120"
            />
          </div>
          <div className="search-container">
            <input className="search-bar" placeholder="Enter"></input>
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="cart-shop" onClick={() => this.handelToURLShopCart()}>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          {isLoggedIn ? (
            <div className="infor-user">{this.renderDropdown()}</div>
          ) : (
            <div className="isLogin" onClick={() => this.handelLogin()}>
              Đăng nhập
            </div>
          )}
        </div>
        <BodyHomePage />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePages);
//export default HomePages;
