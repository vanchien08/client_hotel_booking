import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { handelGetReviewsApi } from "../../../services/userService";
import { push } from "connected-react-router";
import "./Reviews.scss";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
    };
  }

  // Lấy dữ liệu khi component mount
  async componentDidMount() {
    let reviews = await handelGetReviewsApi();
    console.log("reviews", reviews);
    this.setState({
      data: reviews,
    });
    console.log("is login ?", this.props.isLoggedIn);
  }

  // Chuyển hướng tới trang khác
  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    navigate(`${url}`);
  };

  // Xử lý xóa review
  handleDelete = async (id) => {
    window.confirm("Are you sure you want to delete this review?");
    console.log("action delteee");
  };

  // Cấu hình các cột trong bảng
  getColumns = () => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => (user && user.name ? user.name : "N/A"), // Hiển thị tên người dùng
    },
    {
      title: "User Email",
      dataIndex: "user",
      key: "user_email",
      render: (user) => (user && user.email ? user.email : "N/A"), // Hiển thị email người dùng
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (rating !== undefined ? rating : "N/A"), // Hiển thị rating hoặc N/A
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => (comment ? comment : "N/A"), // Hiển thị comment hoặc N/A
    },
    {
      title: "Hotel Name",
      dataIndex: "hotel",
      key: "hotel_name",
      render: (hotel) => (hotel && hotel.name ? hotel.name : "N/A"), // Hiển thị tên khách sạn
    },
    {
      title: "Hotel Address",
      dataIndex: "hotel",
      key: "hotel_address",
      render: (hotel) => (hotel && hotel.address ? hotel.address : "N/A"), // Hiển thị địa chỉ khách sạn
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleString() : "N/A"), // Xử lý ngày tạo
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <button
            onClick={() => this.handleUpdate(record)}
            style={{ marginRight: "10px" }}
          >
            Update
          </button>
          <button
            onClick={() => this.handleDelete(record.id)}
            style={{ color: "red" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  render() {
    const { data } = this.state;
    return (
      <div className="text-center">
        <h1>Reviews MANAGER</h1>
        {data == null ? (
          <p>Loading data, please wait...</p> // Hiển thị thông báo khi dữ liệu chưa có
        ) : (
          <Table columns={this.getColumns()} dataSource={data} rowKey="id" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
