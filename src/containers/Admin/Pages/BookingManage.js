import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  Popover,
  Empty,
  Select,
  Modal,
  Form,
  InputNumber,
  Input,
  DatePicker,
} from "antd";
import { FilterOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import moment from "moment";
import {
  handleGetAllBookingApi,
  handleFilterBookingApi,
  handleSetStatusBooking,
  handleAddBookingApi,
} from "../../../services/BookingManageService";
import { handleGetAvailableRooms } from "../../../services/RoomService";
import { handleGetHotelApi } from "../../../services/hotelService";
import FilterButton from "../../../components/FilterButtonBooking";
import "./BookingManage.scss";

const { Option } = Select;
const { RangePicker } = DatePicker;

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      openFormFilter: false,
      datahotel: null,
      availableRooms: [],
      modals: {
        add: false,
      },
      dataAdd: {
        userName: "",
        hotelIdAdd: null,
        roomId: null,
        quantity: 1,
        checkIn: null, // Lưu dưới dạng moment hoặc null
        checkOut: null, // Lưu dưới dạng moment hoặc null
        phone: "",
        email: "",
        totalPrice: 0,
      },
    };
  }

  async componentDidMount() {
    let hotel = await handleGetHotelApi();
    console.log("Hotel API response:", hotel); // Debug dữ liệu khách sạn
    this.setState({ datahotel: hotel });
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

  fetchAvailableRooms = async (hotelId) => {
    try {
      const response = await handleGetAvailableRooms(hotelId);
      console.log("Available rooms API response:", response); // Debug dữ liệu phòng
      if (response && response.errCode === 1) {
        this.setState({ availableRooms: response.dataroom || [] });
      } else {
        toast.error(response?.errMessage || "Lỗi khi lấy danh sách phòng!");
        this.setState({ availableRooms: [] });
      }
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách phòng!");
      console.error("Error fetching rooms:", error);
      this.setState({ availableRooms: [] });
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
        checkIn ? moment(checkIn).format("DD/MM/YYYY") : "N/A",
    },
    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (checkOut) =>
        checkOut ? moment(checkOut).format("DD/MM/YYYY") : "N/A",
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
          complete: "Đã thanh toán",
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

  handleRangeChange = (dates) => {
    console.log(
      "RangePicker dates:",
      dates ? dates.map((d) => d && d.format("DD/MM/YYYY")) : []
    ); // Debug giá trị RangePicker
    this.setState(
      (prevState) => {
        const newDataAdd = {
          ...prevState.dataAdd,
          checkIn: dates && dates[0] ? dates[0] : null,
          checkOut: dates && dates[1] ? dates[1] : null,
        };
        const totalPrice = this.calculateTotalPrice(newDataAdd);
        return {
          dataAdd: {
            ...newDataAdd,
            totalPrice,
          },
        };
      },
      () => {
        console.log("Updated dataAdd:", {
          ...this.state.dataAdd,
          checkIn: this.state.dataAdd.checkIn
            ? this.state.dataAdd.checkIn.format("DD/MM/YYYY")
            : null,
          checkOut: this.state.dataAdd.checkOut
            ? this.state.dataAdd.checkOut.format("DD/MM/YYYY")
            : null,
        }); // Debug state
      }
    );
  };

  handleonChangeInputAdd = (id, value) => {
    console.log(`Changing ${id}:`, value); // Debug giá trị đầu vào
    this.setState(
      (prevState) => {
        const newDataAdd = {
          ...prevState.dataAdd,
          [id]: value && value.target ? value.target.value : value,
        };
        const totalPrice = this.calculateTotalPrice(newDataAdd);
        return {
          dataAdd: {
            ...newDataAdd,
            totalPrice,
          },
        };
      },
      () => {
        console.log("Updated dataAdd:", {
          ...this.state.dataAdd,
          checkIn: this.state.dataAdd.checkIn
            ? this.state.dataAdd.checkIn.format("DD/MM/YYYY")
            : null,
          checkOut: this.state.dataAdd.checkOut
            ? this.state.dataAdd.checkOut.format("DD/MM/YYYY")
            : null,
        }); // Debug state
      }
    );
  };

  toggleModal = (type, value) => {
    this.setState((prevState) => ({
      modals: {
        ...prevState.modals,
        [type]: value,
      },
    }));
  };

  handleAddBooking = async () => {
    const {
      userName,
      hotelIdAdd,
      roomId,
      quantity,
      checkIn,
      checkOut,
      phone,
      email,
      totalPrice,
    } = this.state.dataAdd;
    console.log("Add booking data:", {
      ...this.state.dataAdd,
      checkIn: checkIn ? checkIn.format("DD/MM/YYYY") : null,
      checkOut: checkOut ? checkOut.format("DD/MM/YYYY") : null,
    });

    if (
      !userName?.trim() ||
      !hotelIdAdd ||
      !roomId ||
      !quantity ||
      !checkIn ||
      !checkOut ||
      !phone?.trim() ||
      !email?.trim() ||
      typeof totalPrice !== "number" ||
      totalPrice <= 0
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin và kiểm tra tổng giá!");
      return;
    }

    // if (!checkIn.isValid() || !checkOut.isValid()) {
    //   toast.error("Ngày check-in hoặc check-out không hợp lệ!");
    //   return;
    // }

    // if (checkOut.isSameOrBefore(checkIn)) {
    //   toast.error("Ngày check-out phải sau ngày check-in!");
    //   return;
    // }

    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   toast.error("Email không hợp lệ!");
    //   return;
    // }

    // if (!/^\d{10}$/.test(phone)) {
    //   toast.error("Số điện thoại phải là 10 chữ số!");
    //   return;
    // }

    const selectedRoom = this.state.availableRooms.find(
      (room) => room.id === parseInt(roomId)
    );
    if (
      selectedRoom &&
      quantity > selectedRoom.quantity - selectedRoom.reservedRooms
    ) {
      toast.error(
        `Chỉ còn ${
          selectedRoom.quantity - selectedRoom.reservedRooms
        } phòng khả dụng!`
      );
      return;
    }

    try {
      const bookingData = {
        userName,
        hotelId: hotelIdAdd,
        roomId: parseInt(roomId),
        quantity,
        checkIn: checkIn.format("YYYY-MM-DD"),
        checkOut: checkOut.format("YYYY-MM-DD"),
        phone,
        email,
        totalPrice,
      };
      console.log("Sending to API:", bookingData);
      const response = await handleAddBookingApi(bookingData);
      console.log("API Response:", response);

      if (response && response.errCode === 1) {
        toast.success("Thêm đặt phòng thành công!");
        await this.fetchBookings();
        this.toggleModal("add", false);
        this.setState({
          dataAdd: {
            userName: "",
            hotelIdAdd: null,
            roomId: null,
            quantity: 1,
            checkIn: null,
            checkOut: null,
            phone: "",
            email: "",
            totalPrice: 0,
          },
          availableRooms: [],
        });
      } else {
        toast.error(response?.errMessage || "Thêm đặt phòng thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.errMessage ||
          error.message ||
          "Lỗi khi thêm đặt phòng!"
      );
      console.error("Error adding booking:", error.response || error);
    }
  };

  handleSelectChange = (id, value) => {
    console.log(`Select change: ${id} = ${value}`);
    this.setState(
      (prevState) => {
        const newDataAdd = {
          ...prevState.dataAdd,
          [id]: value,
          ...(id === "hotelIdAdd" && { roomId: null }), // Reset roomId khi đổi hotel
        };
        const totalPrice = this.calculateTotalPrice(newDataAdd);
        return {
          dataAdd: {
            ...newDataAdd,
            totalPrice,
          },
          availableRooms: id === "hotelIdAdd" ? [] : prevState.availableRooms,
        };
      },
      () => {
        if (id === "hotelIdAdd" && value) {
          this.fetchAvailableRooms(value);
        }
        console.log("Updated dataAdd after select:", {
          ...this.state.dataAdd,
          checkIn: this.state.dataAdd.checkIn
            ? this.state.dataAdd.checkIn.format("DD/MM/YYYY")
            : null,
          checkOut: this.state.dataAdd.checkOut
            ? this.state.dataAdd.checkOut.format("DD/MM/YYYY")
            : null,
        }); // Debug state
      }
    );
  };

  setOpenFormFilter = (open) => {
    this.setState({
      openFormFilter: open,
    });
  };

  calculateTotalPrice = (dataAdd = this.state.dataAdd) => {
    const { roomId, quantity, checkIn, checkOut } = dataAdd;
    const { availableRooms } = this.state;
    console.log("Calculating totalPrice:", {
      roomId,
      quantity,
      checkIn: checkIn ? checkIn.format("DD/MM/YYYY") : null,
      checkOut: checkOut ? checkOut.format("DD/MM/YYYY") : null,
      availableRoomsLength: availableRooms.length,
    }); // Debug đầu vào

    if (!roomId || !quantity) {
      console.log("Missing roomId or quantity, returning 0");
      return 0;
    }

    const selectedRoom = availableRooms.find(
      (room) => room.id === parseInt(roomId)
    );
    if (!selectedRoom) {
      console.log("No selectedRoom found, returning 0");
      return 0;
    }

    console.log("Selected room:", selectedRoom); // Debug phòng được chọn

    // Nếu chưa có checkIn/checkOut, giả định 1 ngày để hiển thị giá cơ bản
    let days = 1;
    if (checkIn && checkOut && checkIn.isValid() && checkOut.isValid()) {
      days = checkOut.diff(checkIn, "days") || 1;
      console.log("Calculated days:", days);
    } else {
      console.log("No valid checkIn/checkOut, using default 1 day");
    }

    const price = selectedRoom.price * quantity * days;
    console.log("Calculated price:", price);
    return price;
  };

  onSubmitPopover = async (filterData) => {
    try {
      const response = await handleFilterBookingApi(filterData);
      if (response && response.errCode === 1) {
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

  render() {
    const { data, openFormFilter, modals, dataAdd, datahotel, availableRooms } =
      this.state;
    const AddBookingModal = (
      <form>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Người dùng
                </label>
                <Input
                  id="userName"
                  value={dataAdd.userName}
                  onChange={(event) =>
                    this.handleonChangeInputAdd("userName", event)
                  }
                  placeholder="Nhập tên người dùng"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="hotelIdAdd" className="form-label">
                  Chọn Khách Sạn <span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  id="hotelIdAdd"
                  className="w-100"
                  placeholder="Chọn khách sạn"
                  value={dataAdd.hotelIdAdd}
                  onChange={(value) =>
                    this.handleSelectChange("hotelIdAdd", value)
                  }
                  showSearch
                  filterOption={(input, option) =>
                    (option.label || "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {datahotel && datahotel.length > 0 ? (
                    datahotel.map((hotel) => (
                      <Option
                        key={hotel.id}
                        value={hotel.id}
                        label={`${hotel.name} - ${hotel.address}`}
                      >
                        {hotel.name} - {hotel.address}
                      </Option>
                    ))
                  ) : (
                    <Option disabled value="">
                      Không có khách sạn nào
                    </Option>
                  )}
                </Select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="roomId" className="form-label">
                  Loại phòng <span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  id="roomId"
                  className="w-100"
                  placeholder="Chọn loại phòng"
                  value={dataAdd.roomId}
                  onChange={(value) => this.handleSelectChange("roomId", value)}
                  disabled={!dataAdd.hotelIdAdd}
                  showSearch
                  filterOption={(input, option) =>
                    (option.label || "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {availableRooms && availableRooms.length > 0 ? (
                    availableRooms.map((room) => (
                      <Option
                        key={room.id}
                        value={room.id}
                        label={room.roomType}
                      >
                        {`${room.roomType.replace(
                          "dường",
                          "giường"
                        )} - ${room.price.toLocaleString()} VND (${
                          room.quantity - room.reservedRooms
                        } phòng còn lại)`}
                      </Option>
                    ))
                  ) : (
                    <Option disabled value="">
                      Không có phòng nào
                    </Option>
                  )}
                </Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Số lượng
                </label>
                <InputNumber
                  id="quantity"
                  min={1} // Đặt min=1 để tránh quantity=0
                  value={dataAdd.quantity}
                  onChange={(value) =>
                    this.handleonChangeInputAdd("quantity", value)
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="dateRange" className="form-label">
                  Check-in - Check-out <span style={{ color: "red" }}>*</span>
                </label>
                <RangePicker
                  id="dateRange"
                  value={
                    dataAdd.checkIn && dataAdd.checkOut
                      ? [dataAdd.checkIn, dataAdd.checkOut]
                      : []
                  }
                  onChange={this.handleRangeChange}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <Input
                  id="phone"
                  value={dataAdd.phone}
                  onChange={(event) =>
                    this.handleonChangeInputAdd("phone", event)
                  }
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Input
                  id="email"
                  value={dataAdd.email}
                  onChange={(event) =>
                    this.handleonChangeInputAdd("email", event)
                  }
                  placeholder="Nhập email"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="totalPrice" className="form-label">
                  Tổng tiền
                </label>
                <Input
                  id="totalPrice"
                  value={
                    typeof dataAdd.totalPrice === "number" &&
                    dataAdd.totalPrice > 0
                      ? dataAdd.totalPrice.toLocaleString() + " VND"
                      : "Chọn phòng và ngày để tính giá"
                  }
                  readOnly
                  placeholder="Tổng tiền"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );

    return (
      <div className="text-center">
        <h1>QUẢN LÝ ĐẶT PHÒNG</h1>
        <Modal
          title="Thêm đặt phòng"
          open={modals?.add || false}
          onOk={this.handleAddBooking}
          onCancel={() => this.toggleModal("add", false)}
          width={1000}
        >
          {AddBookingModal}
        </Modal>
        <div className="button-group">
          <Button
            size="large"
            className="button-add-booking"
            onClick={() => this.toggleModal("add", true)}
          >
            <i className="fa-solid fa-plus"></i> Tạo mới
          </Button>
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
        </div>
        {data == null || data.length === 0 ? (
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
