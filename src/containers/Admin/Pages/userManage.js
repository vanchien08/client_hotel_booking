import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { handelGetUserApi } from "../../../services/userService";
import { push } from "connected-react-router";
import "./userManage.scss";

const columns2 = [
  {
    title: "ID", // Tiêu đề cột
    dataIndex: "id", // Trường dữ liệu
    key: "id", // Khóa duy nhất
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (gender) => (gender === 0 ? "Male" : "Female"), // Hiển thị giới tính theo giá trị
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "birthday",
    render: (date) => new Date(date).toLocaleDateString(), // Định dạng ngày sinh
  },
  {
    title: "Created At",
    dataIndex: "create_At",
    key: "create_At",
    render: (date) => new Date(date).toLocaleDateString(), // Định dạng ngày tạo
  },
  {
    title: "Updated At",
    dataIndex: "update_At",
    key: "update_At",
    render: (date) => new Date(date).toLocaleDateString(), // Định dạng ngày cập nhật
  },
];

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
    };
  }

  async componentDidMount() {
    let user = await handelGetUserApi();
    user = user.user.user;
    this.setState({
      data: user,
    });
    console.log("user", user);
    console.log("is login ?", this.props.isLoggedIn);
  }

  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = url;
    navigate(`${redirectPath}`);
  };

  render() {
    const { isLoggedIn } = this.props;
    const { data } = this.state; // lấy dữ liệu từ state
    console.log("state login >>", isLoggedIn);
    console.log("data >>", data);

    // Kiểm tra xem dữ liệu đã được tải chưa
    return (
      <div className="text-center">
        <h1>User Management</h1>
        {data == null ? (
          <p>Loading data, please wait...</p> // Hiển thị thông báo hoặc loader khi dữ liệu chưa có
        ) : (
          <Table columns={columns2} dataSource={data} rowKey="id" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
