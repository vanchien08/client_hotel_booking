import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import {
  handleGetUserApi,
  handleGetHotelApi,
} from "../../../services/userService";
import { push } from "connected-react-router";
import "./Hotel.scss";

const columns2 = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img src={image} alt="Hotel" style={{ width: "50px", height: "50px" }} />
    ), // Hiển thị hình ảnh
  },
  {
    title: "Created At",
    dataIndex: "created_At",
    key: "created_At",
    render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"), // Xử lý trường hợp null
  },
];

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
    };
  }

  async componentDidMount() {
    let user = await handleGetHotelApi();
    console.log("user", user);
    //  user = user.user.user;
    this.setState({
      data: user,
    });

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
        <h1>HOTEl MANAGER</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Hotel);
