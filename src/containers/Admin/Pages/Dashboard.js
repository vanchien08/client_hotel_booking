import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import UserManage from "./userManage";
import Hotel from "./Hotel";
import Statistics from "./StatisticsV2";
import Reviews from "./Reviews";
import AmenitiesHotel from "./AmenitiesHotel";
import BookingManage from "./BookingManage";
import RoomManage from "./RoomManage";
import AmenitiesRoom from "./AmenitiesRoom";

import * as actions from "../../../store/actions";
import {
  userIsAuthenticated,
  userIsAuthenticatedAdmin,
  userIsAuthenticatedStaff,
} from "../../../hoc/authentication";
import "./Dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faHome,
  faHotel,
  faComment,
  faChartSimple,
  faCreditCard,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, Space } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const getMenuItems = (role) => {
  const allItems = [
    {
      key: "sub1",
      icon: <FontAwesomeIcon icon={faHotel} />,
      label: "Quản lý khách sạn",
      children: [
        { key: "1", label: "Khách sạn" },
        { key: "2", label: "Tiện ích khách sạn" },
      ],
    },
    {
      key: "sub2",
      icon: <FontAwesomeIcon icon={faHouseUser} />,
      label: "Quản lý phòng",
      children: [
        { key: "3", label: "Phòng" },
        { key: "4", label: "Tiện ích phòng" },
      ],
    },
    {
      key: "sub3",
      icon: <FontAwesomeIcon icon={faCreditCard} />,
      label: "Quản lý đặt phòng",
      children: [{ key: "5", label: "Đặt phòng" }],
    },
    {
      key: "sub4",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
      children: [{ key: "6", label: "Người dùng" }],
    },
    {
      key: "sub5",
      icon: <FontAwesomeIcon icon={faComment} />,
      label: "Quản lý đánh giá",
      children: [{ key: "7", label: "Đánh giá" }],
    },
    {
      key: "sub6",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      label: "Thống kê",
      children: [{ key: "8", label: "Thống kê" }],
    },
  ];

  if (role == 1) {
    return allItems.filter(
      (item) =>
        item.key === "sub1" ||
        item.key === "sub2" ||
        item.key === "sub3" ||
        item.key === "sub5"
    ); // Chỉ hiển thị sub1, sub2, sub3, sub5
  }
  return allItems;
};

const Dashboard = ({ navigate, userInfo, processLogout }) => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const role = userInfo.roles?.[0]?.role || -1; // Mặc định STAFF nếu không có role

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  const handleGoHome = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  const handleLogout = () => {
    navigate("/login");
    processLogout();
  };

  const handleMenuClick = (e) => {
    const { key } = e;
    if (key === "1") navigate("/system/dashboard/hotels");
    else if (key === "2") navigate("/system/dashboard/amenities-hotel");
    else if (key === "3") navigate("/system/dashboard/rooms");
    else if (key === "4") navigate("/system/dashboard/amenities-room");
    else if (key === "5") navigate("/system/dashboard/booking");
    else if (key === "6") navigate("/system/dashboard/users");
    else if (key === "7") navigate("/system/dashboard/reviews");
    else if (key === "8") navigate("/system/dashboard/statistics");
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <div className="demo-logo" />
        <div className="button-container">
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faHome} />}
            onClick={handleGoHome}
          >
            Trang chủ
          </Button>
          <Button
            type="default"
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </div>
      </Header>

      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ height: "100%" }}
              items={getMenuItems(role)}
              onClick={handleMenuClick}
            />
          </Sider>

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Switch>
              <Route
                path="/system/dashboard/hotels"
                component={userIsAuthenticated(Hotel)}
              />
              <Route
                path="/system/dashboard/amenities-hotel"
                component={userIsAuthenticated(AmenitiesHotel)}
              />
              <Route
                path="/system/dashboard/rooms"
                component={userIsAuthenticated(RoomManage)}
              />
              <Route
                path="/system/dashboard/amenities-room"
                component={userIsAuthenticated(AmenitiesRoom)}
              />
              <Route
                path="/system/dashboard/booking"
                component={userIsAuthenticated(BookingManage)}
              />
              <Route
                path="/system/dashboard/users"
                component={userIsAuthenticatedAdmin(UserManage)}
              />
              <Route
                path="/system/dashboard/reviews"
                component={userIsAuthenticated(Reviews)}
              />
              <Route
                path="/system/dashboard/statistics"
                component={userIsAuthenticatedAdmin(Statistics)}
              />
              <Redirect to="/system/dashboard/hotels" />
            </Switch>
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        {/* PTIT Design {new Date().getFullYear()} Created by @PTITB2025 */}
      </Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  errCode: state.user.errCode,
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (path) => dispatch(push(path)),
  fetchLoginSuccess: (userInfo) =>
    dispatch(actions.fetchLoginSuccess(userInfo)),
  processLogout: () => dispatch(actions.processLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
