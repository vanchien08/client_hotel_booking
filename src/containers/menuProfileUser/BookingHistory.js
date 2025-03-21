import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./BookingHistory.scss";
// import * as actions from "../../store/actions";
import { Table } from "antd";
import { handleGetBookingApi } from "../../services/userService";
class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  handleLogin = () => {
    console.log("login");
    this.redirectToSystemPage();
  };
  handlerKeyDown = (event) => {};

  async componentDidMount() {
    let respon = await handleGetBookingApi(2);
    this.setState({
      data: respon.dataBookings,
    });
    console.log(respon);
  }

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
  handleNavigate = (path) => {
    this.props.navigate(path);
  };
  getColumns = () => [
    {
      title: "ID",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hotel Name",
      dataIndex: "room",
      key: "hotel_name",
      render: (room) => (room && room.hotel ? room.hotel.name : "N/A"),
    },
    {
      title: "Hotel Address",
      dataIndex: "room",
      key: "hotel_address",
      render: (room) => (room && room.hotel ? room.hotel.address : "N/A"),
    },
    {
      title: "Hotel Image",
      dataIndex: "room",
      key: "hotel_image",
      render: (room) =>
        room && room.hotel && room.hotel.image ? (
          <img
            src={room.hotel.image}
            alt="Hotel"
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (quantity !== undefined ? quantity : "N/A"),
    },
    {
      title: "Check-in Date",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (date) => (date ? new Date(date).toLocaleString() : "N/A"),
    },
    {
      title: "Check-out Date",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (date) => (date ? new Date(date).toLocaleString() : "N/A"),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => (price !== undefined ? `$${price.toFixed(2)}` : "N/A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleString() : "N/A"),
    },
  ];

  render() {
    let { data } = this.state;
    return (
      <div className="col-md-8 ms-4 bg-white p-4 rounded">
        LỊCH SỬ ĐẶT PHÒNG
        {data == null ? (
          <p>Loading data, please wait...</p> // Hiển thị thông báo hoặc loader khi dữ liệu chưa có
        ) : (
          <Table columns={this.getColumns()} dataSource={data} rowKey="id" />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingHistory);
//export default BookingHistory;
