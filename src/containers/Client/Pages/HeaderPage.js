import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import "./HeaderPage.scss";
import userimg from "../../../assets/images/user.png";
import BodyHomePage from "./BodyHomePage";

import HomePage1 from "./HomePage1.js";
import Footer from "./Footer.js";
import { Avatar, Space } from "antd";
import { UserOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import imguser from "../../../assets/images/user.png";
import { Dropdown, message } from "antd";

class HeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  async componentDidMount() {
    let userInfo = this.props.userInfo || {}; // Nếu null, gán giá trị mặc định {}
    let role = userInfo.roles?.[0]?.role || -1;

    console.log("check redux", userInfo);
    //   let useri4 = null;
    let useri4 = this.props.userInfo;
    // if (role == 1) {
    //   useri4 = localStorage.getItem("adminInfor");
    // } else {
    //   useri4 = localStorage.getItem("userInfor");
    // }

    if (useri4 & (role == 1 || role == 0)) {
      this.setState({
        user: JSON.parse(useri4),
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.userInfo !== prevProps.userInfo) {
      console.log("Cập nhật userInfo:", this.props.userInfo);
      this.setState({ user: this.props.userInfo });
    }
  }

  handleNavigate = (path) => {
    this.props.navigate(path);
  };
  handleNavigateProfile = () => {
    const { userInfo } = this.props;

    if (userInfo && userInfo.id) {
      this.handleNavigate("/user-info"); // Chuyển đến trang profile
    } else {
      this.handleNavigate("/login"); // Nếu chưa đăng nhập, chuyển đến login
    }
  };

  handleLogOut = (path) => {
    localStorage.removeItem("persist:admin");
    localStorage.removeItem("persist:user");
    this.props.navigate(path);
  };
  items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      extra: "⌘P",
      onClick: () => this.handleNavigateProfile(),
    },
    {
      key: "3",
      label: "Billing",
      extra: "⌘B",
    },
    {
      key: "4",
      label: (
        <span className="sign-out-container">
          <i className="fas fa-sign-out-alt"></i>
          Đăng xuất
        </span>
      ),

      extra: "⌘D",
      onClick: () => this.handleLogOut("/login"),
    },
  ];
  App = () => (
    <Dropdown
      menu={{
        items: this.items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <img
            className="image-user-infor"
            src={this.props.userInfo?.avatar || imguser}
            alt=""
            width="35"
            height="35"
          />
          <DownOutlined />
          {this.props.userInfo?.name}
        </Space>
      </a>
    </Dropdown>
  );
  render() {
    return (
      <div id="fh5co-header-section" className="bg-light shadow-sm">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a href="index.html" className="navbar-brand">
              Listing
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="index.html" className="nav-link active">
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="listingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Listing
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="listingDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://freehtml5.co/preview/?item=build-free-html5-bootstrap-template"
                        target="_blank"
                      >
                        Build
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://freehtml5.co/preview/?item=work-free-html5-template-bootstrap"
                        target="_blank"
                      >
                        Work
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://freehtml5.co/preview/?item=light-free-html5-template-bootstrap"
                        target="_blank"
                      >
                        Light
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://freehtml5.co/preview/?item=relic-free-html5-template-using-bootstrap"
                        target="_blank"
                      >
                        Relic
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://freehtml5.co/preview/?item=display-free-html5-template-using-bootstrap"
                        target="_blank"
                      >
                        Display
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://freehtml5.co/preview/?item=sprint-free-html5-template-bootstrap"
                        target="_blank"
                      >
                        Sprint
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="dropdownMenu"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                    <li>
                      <a className="dropdown-item" href="left-sidebar.html">
                        Web Development
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="right-sidebar.html">
                        Branding &amp; Identity
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a
                        href="#"
                        className="dropdown-item dropdown-toggle"
                        id="freeHtml5Dropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Free HTML5
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="freeHtml5Dropdown"
                      >
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://freehtml5.co/preview/?item=build-free-html5-bootstrap-template"
                            target="_blank"
                          >
                            Build
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://freehtml5.co/preview/?item=work-free-html5-template-bootstrap"
                            target="_blank"
                          >
                            Work
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://freehtml5.co/preview/?item=light-free-html5-template-bootstrap"
                            target="_blank"
                          >
                            Light
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://freehtml5.co/preview/?item=relic-free-html5-template-using-bootstrap"
                            target="_blank"
                          >
                            Relic
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://freehtml5.co/preview/?item=display-free-html5-template-using-bootstrap"
                            target="_blank"
                          >
                            Display
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://freehtml5.co/preview/?item=sprint-free-html5-template-bootstrap"
                            target="_blank"
                          >
                            Sprint
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        UI Animation
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Copywriting
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Photography
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="contact.html" className="nav-link">
                    Contact
                  </a>
                </li>
                <div className="avatar-user">{this.App()}</div>
              </ul>
            </div>
          </nav>
        </div>
        {/* <HomePage1 />
        <Footer /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage);
//export default HeaderPage;
