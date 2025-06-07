import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Popover, Empty, Select } from "antd";
import { FilterOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import {
  handleGetAllBookingApi,
  handleFilterBookingApi,
  handleSetStatusBooking,
} from "../../../services/BookingManageService";
import FilterButton from "../../../components/FilterButtonBooking";
import "./BookingManage.scss";

const { Option } = Select;

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      openFormFilter: false,
    };
  }

  async componentDidMount() {
    await this.fetchBookings();
    console.log("is login ?", this.props.isLoggedIn);
  }

  fetchBookings = async () => {
    try {
      const response = await handleGetAllBookingApi();
      console.log("API Response:", response);
      if (response && response.errCode === 1) {
        const bookings = response.dataBookings.map((booking) => ({
          ...booking,
          status: booking.status === "success" ? "Thành công" : booking.status,
        }));
        this.setState({ data: bookings });
      } else {
        toast.error(response?.errMessage || "Lỗi khi lấy danh sách đặt phòng!");
      }
    } catch (error) {
      const message =
        error.response?.data?.errMessage ||
        error.message ||
        "Lỗi kết nối đến server!";
      toast.error(message);
      console.error("Error fetching bookings:", error.response || error);
    }
  };

  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    navigate(url);
  };

  handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await handleSetStatusBooking(bookingId, newStatus);
      if (response && response.errCode === 1) {
        toast.success(`Cập nhật trạng thái thành công!`, {
          position: "bottom-right",
          autoClose: 2000,
        });

        // Cập nhật lại danh sách hoặc chỉ update tạm trong state
        const updatedData = this.state.data.map((item) =>
          item.id === bookingId ? { ...item, status: newStatus } : item
        );
        this.setState({ data: updatedData });
      } else {
        toast.error(response?.errMessage || "Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái!");
      console.error("Error setting booking status:", error);
    }
  };

  getColumns = () => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.name || "N/A",
    },
    {
      title: "Tên khách sạn",
      dataIndex: ["room", "hotel", "name"],
      key: "hotelName",
      render: (hotelName) => hotelName || "N/A",
    },
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
      render: (room) => room?.roomType || "N/A",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Check-in",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (checkIn) =>
        checkIn ? new Date(checkIn).toLocaleDateString() : "N/A",
    },
    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (checkOut) =>
        checkOut ? new Date(checkOut).toLocaleDateString() : "N/A",
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => totalPrice?.toLocaleString() || "N/A",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusMap = {
          conplete: "Đã thanh toán",
          success: "Thành công",
          cancelled: "Đã hủy",
          failed: "Thất bại",
        };
        return statusMap[status.toLowerCase()] || status || "N/A";
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <div>
          <Select
            value={record.status}
            style={{ width: 150, marginRight: 8 }}
            onChange={(value) => this.handleStatusChange(record.id, value)}
          >
            <Option value="complete">Đã thanh toán</Option>
            <Option value="success">Thành công</Option>
            <Option value="cancelled">Đã hủy</Option>
            <Option value="failed">Thất bại</Option>
          </Select>
        </div>
      ),
    },
  ];

  setOpenFormFilter = (open) => {
    this.setState({
      openFormFilter: open,
    });
  };

  onSubmitPopover = async (filterData) => {
    try {
      const response = await handleFilterBookingApi(filterData);
      if (response && response.errCode) {
        const bookings = response.dataBookings.map((booking) => ({
          ...booking,
          status: booking.status === "success" ? "confirmed" : booking.status,
        }));
        this.setState({ data: bookings });
        toast.success("Lọc dữ liệu thành công!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error(response?.errMessage || "Lỗi khi lọc dữ liệu!");
      }
      this.setOpenFormFilter(false);
    } catch (error) {
      toast.error("Lỗi kết nối đến server!");
      console.error("Error filtering bookings:", error);
    }
  };

  handleAddBooking = () => {
    toast.info("Chức năng thêm đặt phòng chưa được triển khai!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  render() {
    const { data, openFormFilter } = this.state;

    return (
      <div className="text-center">
        <h1>QUẢN LÝ ĐẶT PHÒNG</h1>
        <PlusSquareOutlined
          className="button-add-booking"
          onClick={this.handleAddBooking}
        />
        <Popover
          placement="bottomRight"
          content={
            <div style={{ width: 400 }}>
              <FilterButton
                onClose={() => this.setOpenFormFilter(false)}
                onSubmit={this.onSubmitPopover}
              />
            </div>
          }
          title="Lọc Đặt Phòng"
          trigger="click"
          open={openFormFilter}
          onOpenChange={(open) => this.setOpenFormFilter(open)}
          destroyTooltipOnHide={false}
        >
          <Button className="filter-button">
            Lọc <FilterOutlined />
          </Button>
        </Popover>
        {data == null ? (
          <Empty description="Không có dữ liệu đặt phòng" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
