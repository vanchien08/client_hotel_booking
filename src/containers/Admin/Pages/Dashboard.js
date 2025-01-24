import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import UserManage from "./userManage";
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
      { key: "1", label: "Thêm người dùng" },
      { key: "2", label: "Xoá người dùng" },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "Quản trị Laptop",
    children: [
      { key: "3", label: "Danh sách Laptop" },
      { key: "4", label: "Thêm Laptop" },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "Quản trị Thông báo",
    children: [
      { key: "5", label: "Danh sách thông báo" },
      { key: "6", label: "Thêm thông báo" },
    ],
  },
];

const Dashboard = ({ isLoggedIn, navigate }) => {
  const [selectedContent, setSelectedContent] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken(); // Dùng hooks trong function component

  // Hàm xử lý khi người dùng click vào menu
  const handleMenuClick = (e) => {
    const { key } = e;
    let selectedContent = null;

    if (key === "1") selectedContent = "UserManage";
    else if (key === "2") selectedContent = "DeleteUser";
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
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
              onClick={handleMenuClick} // Gọi hàm xử lý khi click menu
            />
          </Sider>

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {selectedContent === "UserManage" && <UserManage />}
            {selectedContent === "DeleteUser" && <div>Xoá người dùng</div>}
            {selectedContent === "LaptopList" && <div>Danh sách Laptop</div>}
            {selectedContent === "AddLaptop" && <div>Thêm Laptop</div>}
            {selectedContent === "NotificationList" && (
              <div>Danh sách thông báo</div>
            )}
            {selectedContent === "AddNotification" && <div>Thêm thông báo</div>}
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
