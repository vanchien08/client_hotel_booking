import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import UserManage from "./userManage";
import Hotel from "./Hotel";
import Statistics from "./Statistics";
import Reviews from "./Reviews";
import AmenitiesHotel from "./AmenitiesHotel";
import StatisticsV2 from "./StatisticsV2";
import "./Dashboard.scss";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "Quản lý người dùng",
    children: [
      { key: "1", label: "Quản lý khách sạn" },
      { key: "2", label: "Tiện ích khách sạn" },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "Quản lý đánh giá",
    children: [
      { key: "3", label: "Quản lý đánh giá" },
      { key: "4", label: "Thêm Laptop" },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "Thống kê",
    children: [
      { key: "5", label: "Thống kê" },
      { key: "6", label: "Thêm thông báo" },
    ],
  },
];

const Dashboard = ({ isLoggedIn, navigate }) => {
  const [selectedContent, setSelectedContent] = useState("HotelManage");
  const [openKeys, setOpenKeys] = useState(["sub1"]); // Default open submenu

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle submenu opening/closing
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (latestOpenKey) {
      // Replace all open keys with just the latest one
      setOpenKeys([latestOpenKey]);
    } else {
      // If collapsing, allow all submenus to be closed
      setOpenKeys([]);
    }
  };

  // Handle menu item click
  const handleMenuClick = (e) => {
    const { key } = e;
    let selectedContent = null;

    if (key === "1") selectedContent = "HotelManage";
    else if (key === "2") selectedContent = "AmenitiesHotel";
    else if (key === "3") selectedContent = "LaptopList";
    else if (key === "4") selectedContent = "AddLaptop";
    else if (key === "5") selectedContent = "NotificationList";
    else if (key === "6") selectedContent = "AddNotification";

    setSelectedContent(selectedContent);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
      </Header>

      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
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
              items={items2}
              onClick={handleMenuClick}
            />
          </Sider>

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {selectedContent === "HotelManage" && <Hotel />}
            {selectedContent === "AmenitiesHotel" && <AmenitiesHotel />}
            {selectedContent === "LaptopList" && <Reviews />}
            {selectedContent === "AddLaptop" && <div>Thêm Laptop</div>}
            {selectedContent === "NotificationList" && (
              <div>
                <Statistics />
              </div>
            )}
            {selectedContent === "AddNotification" && <StatisticsV2 />}
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Chien Design {new Date().getFullYear()} Created by DevChien
      </Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    errCode: state.user.errCode,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
