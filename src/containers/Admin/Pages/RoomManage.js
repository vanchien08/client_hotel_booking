import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Image,
  Upload,
  Empty,
  Popover,
  Switch,
  Select,
} from "antd";
import {
  PlusSquareOutlined,
  UploadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  handleGetRoomsApi,
  handleFilterRoomApi,
  updateRoomApi,
  handleSetStatusRoom,
  handleAddRoomApi,
} from "../../../services/RoomService";
import { handleGetHotelApi } from "../../../services/userService";
import { uploadImageToCloud } from "../../../config/UploadImageCloud";
import { toast } from "react-toastify";
import { push } from "connected-react-router";
import FilterButtonRoom from "../../../components/FilterButtonRoom";
import * as actions from "../../../store/actions";
import "./RoomManage.scss";

class RoomManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userInfo || {},
      isLoggedIn: false,
      data: null,
      filteredData: null,
      selectedRoom: null,
      idDelete: null,
      openFormFilter: false,
      fileList: [],
      uploading: false,
      imageUrl: "",
      hotels: null,
      dataAdd: {
        hotelIdAdd: "",
        roomTypeAdd: "",
        quantityAdd: "",
        reservedRoomsAdd: "",
        priceAdd: "",
        capacityAdd: "",
        descriptionAdd: "",
        imageAdd: "",
        isAvailableAdd: true,
      },
      modals: {
        update: false,
        add: false,
        delete: false,
      },
    };
  }

  async componentDidMount() {
    try {
      let rooms = await handleGetRoomsApi();
      let hotel = await handleGetHotelApi();
      console.log("data get from api ", hotel);
      this.setState({
        data: rooms.dataroom,
        filteredData: rooms.dataroom,
        hotels: hotel,
      });
    } catch (error) {
      this.Toast("Lỗi khi tải dữ liệu phòng!", "error");
      console.error("Fetch error:", error);
    }
    console.log("is login ?", this.props.isLoggedIn);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userInfo !== prevProps.userInfo) {
      console.log("Cập nhật userInfo:", this.props.userInfo);
      this.setState({ user: this.props.userInfo });
    }
  }

  getColumns = () => {
    const { user } = this.state;
    const role = user.roles?.[0]?.role || -1;

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Khách sạn",
        dataIndex: ["hotel", "name"],
        key: "hotelName",
      },
      {
        title: "Loại phòng",
        dataIndex: "roomType",
        key: "roomType",
      },
      {
        title: "Số Phòng",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Phòng đã thuê",
        dataIndex: "reservedRooms",
        key: "reservedRooms",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (price) => `$${price.toFixed(2)}`,
      },
      {
        title: "Sức chứa",
        dataIndex: "capacity",
        key: "capacity",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Ảnh",
        dataIndex: "image",
        key: "image",
        render: (image) => (
          <Image
            src={image}
            alt="Phòng"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        title: "Trạng thái",
        key: "status",
        render: (_, record) => (
          <Switch
            checked={record.isAvailable}
            onChange={(checked) => this.handleToggleStatus(record.id, checked)}
            disabled={role === 1}
          />
        ),
      },
    ];

    if (role !== 1) {
      columns.push({
        title: "Hành động",
        key: "action",
        render: (record) => (
          <div>
            <Button
              type="primary"
              ghost
              onClick={() => this.handleUpdate(record)}
              style={{ marginRight: "10px" }}
            >
              Cập nhật
            </Button>
          </div>
        ),
      });
    }

    return columns;
  };

  handleToggleStatus = async (roomId, newStatus) => {
    this.setState({ loading: true, error: null });
    try {
      const response = await handleSetStatusRoom(roomId, newStatus);
      if (response.errCode === 1) {
        toast.success("Cập nhật trạng thái phòng thành công!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        let rooms = await handleGetRoomsApi();
        this.setState({
          data: rooms.dataroom,
          filteredData: rooms.dataroom,
        });
      } else {
        const errorMessage =
          response.errMessage || "Cập nhật trạng thái thất bại";
        this.setState({ error: errorMessage });
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.errMessage || "Lỗi khi cập nhật trạng thái";
      this.setState({ error: errorMessage });
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleUpdate = (record) => {
    this.toggleModal("update", true);
    this.setState({
      selectedRoom: { ...record, hotelId: record.hotel.id },
      fileList: record.image ? [{ url: record.image, name: "Room Image" }] : [],
      imageUrl: record.image || "",
    });
  };

  handleDelete = (id) => {
    this.toggleModal("delete", true);
    this.setState({
      idDelete: id,
    });
  };

  toggleModal = (type, value) => {
    this.setState((prevState) => ({
      modals: {
        ...prevState.modals,
        [type]: value,
      },
    }));
  };

  handleonChangeInput = (id, event) => {
    const value =
      id === "isAvailable" ? event.target.value === "true" : event.target.value;
    this.setState((prevState) => ({
      selectedRoom: {
        ...prevState.selectedRoom,
        [id]: id === "hotelId" ? value : value,
        ...(id === "hotelId" && {
          hotel: { ...prevState.selectedRoom.hotel, id: value },
        }),
      },
    }));
  };

  handleonChangeInputAdd = (id, event) => {
    const value = event.target.value;
    this.setState({
      dataAdd: {
        ...this.state.dataAdd,
        [id]: value,
      },
    });
  };

  handleSelectChange = (id, value) => {
    this.setState({
      dataAdd: {
        ...this.state.dataAdd,
        [id]: value,
      },
    });
  };

  handleSwitchChange = (id, checked) => {
    this.setState({
      dataAdd: {
        ...this.state.dataAdd,
        [id]: checked,
      },
    });
  };

  Toast = (text, type) => {
    if (type === "success") {
      toast.success(text, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      toast.error(text, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  setOpenFormFilter = (open) => {
    this.setState({
      openFormFilter: open,
    });
  };

  onSubmitPopover = async (filterData) => {
    try {
      let respon = await handleFilterRoomApi(filterData);
      this.setState({
        filteredData: respon.dataroom,
        openFormFilter: false,
      });
    } catch (error) {
      this.Toast("Lỗi khi lọc phòng!", "error");
      console.error("Filter error:", error);
    }
  };

  handleUpload = async (file) => {
    this.setState({ uploading: true });
    try {
      let data = await uploadImageToCloud(file);
      if (data.secure_url) {
        this.setState((prevState) => ({
          selectedRoom: {
            ...prevState.selectedRoom,
            image: data.secure_url,
          },
          imageUrl: data.secure_url,
          uploading: false,
          fileList: [{ url: data.secure_url, name: file.name }],
        }));
      } else {
        this.setState({ uploading: false });
        this.Toast("Tải ảnh thất bại!", "error");
      }
    } catch (error) {
      this.setState({ uploading: false });
      this.Toast("Lỗi khi tải ảnh!", "error");
      console.error("Upload error:", error);
    }
  };

  handleUploadAdd = async (file) => {
    this.setState({ uploading: true });
    try {
      let data = await uploadImageToCloud(file);
      if (data.secure_url) {
        this.setState((prevState) => ({
          dataAdd: {
            ...prevState.dataAdd,
            imageAdd: data.secure_url,
          },
          uploading: false,
          fileList: [{ url: data.secure_url, name: file.name }],
        }));
      } else {
        this.setState({ uploading: false });
        this.Toast("Tải ảnh thất bại!", "error");
      }
    } catch (error) {
      this.setState({ uploading: false });
      this.Toast("Lỗi khi tải ảnh!", "error");
      console.error("Upload error:", error);
    }
  };

  handleOkUpdate = async () => {
    const { selectedRoom } = this.state;
    const {
      hotelId,
      roomType,
      quantity,
      reservedRooms,
      price,
      capacity,
      description,
      image,
      isAvailable,
    } = selectedRoom;

    if (
      !roomType?.trim() ||
      !quantity ||
      !price ||
      !capacity ||
      !description?.trim()
    ) {
      this.Toast("Vui lòng nhập đầy đủ thông tin bắt buộc!", "error");
      return;
    }

    try {
      const updatedRoom = {
        id: selectedRoom.id,
        hotel: { id: hotelId },
        roomType,
        quantity: parseInt(quantity),
        reservedRooms: parseInt(reservedRooms || 0),
        price: parseFloat(price),
        capacity: parseInt(capacity),
        description,
        image: image || "",
        isAvailable,
      };

      const response = await updateRoomApi(updatedRoom);
      if (response.errCode === 1) {
        this.setState((prevState) => ({
          data: prevState.data.map((room) =>
            room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room
          ),
          filteredData: prevState.filteredData.map((room) =>
            room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room
          ),
          modals: { ...prevState.modals, update: false },
          selectedRoom: null,
          fileList: [],
          imageUrl: "",
        }));
        this.Toast("Cập nhật phòng thành công!", "success");
      } else {
        this.Toast("Cập nhật phòng thất bại!", "error");
      }
    } catch (error) {
      this.Toast("Lỗi khi cập nhật phòng!", "error");
      console.error("Update error:", error);
    }
  };

  handleOkAdd = async () => {
    const {
      hotelIdAdd,
      roomTypeAdd,
      quantityAdd,
      reservedRoomsAdd,
      priceAdd,
      capacityAdd,
      descriptionAdd,
      imageAdd,
      isAvailableAdd,
    } = this.state.dataAdd;

    // Kiểm tra các trường bắt buộc
    if (
      !hotelIdAdd ||
      !roomTypeAdd?.trim() ||
      !priceAdd ||
      !capacityAdd ||
      !descriptionAdd?.trim()
    ) {
      this.Toast("Vui lòng nhập đầy đủ thông tin bắt buộc!", "error");
      return;
    }

    // Kiểm tra reservedRoomsAdd không lớn hơn quantityAdd
    if (parseInt(reservedRoomsAdd || 0) > parseInt(quantityAdd || 1)) {
      this.Toast("Số phòng đã đặt không được lớn hơn số lượng phòng!", "error");
      return;
    }

    try {
      const response = await handleAddRoomApi(
        parseInt(hotelIdAdd),
        roomTypeAdd,
        parseFloat(priceAdd),
        parseInt(capacityAdd),
        descriptionAdd,
        imageAdd || "",
        parseInt(quantityAdd) || 1,
        parseInt(reservedRoomsAdd || 0),
        isAvailableAdd ? "true" : "false" // Chuyển Boolean thành String
      );

      if (response.errCode === 1) {
        const rooms = await handleGetRoomsApi();
        this.setState({
          data: rooms.dataroom,
          filteredData: rooms.dataroom,
          modals: { ...this.state.modals, add: false },
          dataAdd: {
            hotelIdAdd: "",
            roomTypeAdd: "",
            quantityAdd: "",
            reservedRoomsAdd: "",
            priceAdd: "",
            capacityAdd: "",
            descriptionAdd: "",
            imageAdd: "",
            isAvailableAdd: true,
          },
          fileList: [],
        });
        this.Toast("Thêm phòng thành công!", "success");
      } else {
        this.Toast(response.errMessage || "Thêm phòng thất bại!", "error");
      }
    } catch (error) {
      this.Toast(
        error.response?.data?.errMessage || "Lỗi khi thêm phòng!",
        "error"
      );
      console.error("Add room error:", error);
    }
  };

  handleOkDelete = () => {
    this.Toast("Chức năng xóa chưa được triển khai!", "error");
    this.toggleModal("delete", false);
  };

  render() {
    const { isLoggedIn } = this.props;
    const {
      filteredData,
      selectedRoom,
      fileList,
      modals,
      openFormFilter,
      uploading,
      hotels,
    } = this.state;
    console.log("sdfsdfsdf", selectedRoom);
    const AddModal = (
      <div className="container">
        {/* Row 1: Hotel Selection */}
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="hotelIdAdd" className="form-label">
                Chọn Khách Sạn <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                id="hotelIdAdd"
                className="w-100"
                placeholder="Chọn khách sạn"
                value={this.state.dataAdd.hotelIdAdd || undefined}
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
                {hotels && hotels.length > 0 ? (
                  hotels.map((hotel) => (
                    <Select.Option
                      key={hotel.id}
                      value={hotel.id}
                      label={`${hotel.name} - ${hotel.address}`}
                    >
                      {hotel.name} - {hotel.address}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled value="">
                    Không có khách sạn nào
                  </Select.Option>
                )}
              </Select>
            </div>
          </div>
        </div>

        {/* Row 2: Room Type and Capacity */}
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="roomTypeAdd" className="form-label">
                Loại Phòng <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                id="roomTypeAdd"
                min="1"
                placeholder="Loại phòng"
                value={this.state.dataAdd.roomTypeAdd}
                onChange={(event) =>
                  this.handleonChangeInputAdd(event.target.id, event)
                }
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="capacityAdd" className="form-label">
                Sức Chứa <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                id="capacityAdd"
                className="w-100"
                placeholder="Chọn sức chứa"
                value={this.state.dataAdd.capacityAdd || undefined}
                onChange={(value) =>
                  this.handleSelectChange("capacityAdd", value)
                }
              >
                <Select.Option value="1">1 người</Select.Option>
                <Select.Option value="2">2 người</Select.Option>
                <Select.Option value="3">3 người</Select.Option>
                <Select.Option value="4">4 người</Select.Option>
                <Select.Option value="6">6 người</Select.Option>
                <Select.Option value="8">8 người</Select.Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Row 3: Quantity and Price */}
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="quantityAdd" className="form-label">
                Số Lượng Phòng <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="quantityAdd"
                min="1"
                placeholder="Nhập số lượng phòng"
                value={this.state.dataAdd.quantityAdd}
                onChange={(event) =>
                  this.handleonChangeInputAdd(event.target.id, event)
                }
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="priceAdd" className="form-label">
                Giá Phòng ($) <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="priceAdd"
                min="0"
                step="0.01"
                placeholder="Nhập giá phòng"
                value={this.state.dataAdd.priceAdd}
                onChange={(event) =>
                  this.handleonChangeInputAdd(event.target.id, event)
                }
              />
            </div>
          </div>
        </div>

        {/* Row 4: Description and Image */}
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="descriptionAdd" className="form-label">
                Mô Tả <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                className="form-control"
                id="descriptionAdd"
                rows="4"
                placeholder="Nhập mô tả chi tiết về phòng..."
                value={this.state.dataAdd.descriptionAdd}
                onChange={(event) =>
                  this.handleonChangeInputAdd(event.target.id, event)
                }
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="imageAdd" className="form-label">
                Hình Ảnh Phòng
              </label>
              <div className="upload-container">
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    this.handleUploadAdd(file);
                    return false;
                  }}
                  maxCount={1}
                  accept="image/*"
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={this.state.uploading}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    {this.state.uploading ? "Đang tải lên..." : "Chọn hình ảnh"}
                  </Button>
                </Upload>

                {this.state.dataAdd.imageAdd && (
                  <div className="image-preview" style={{ marginTop: "10px" }}>
                    <img
                      src={this.state.dataAdd.imageAdd}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const UpdateModal = (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                ID
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="id"
                value={selectedRoom?.id || ""}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">
                Loại Phòng
              </label>
              <input
                type="text"
                className="form-control"
                id="roomType"
                value={selectedRoom?.roomType || ""}
                onChange={(event) =>
                  this.handleonChangeInput(event.target.id, event)
                }
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">
                Sức Chứa
              </label>
              <input
                type="number"
                className="form-control"
                id="capacity"
                value={selectedRoom?.capacity || ""}
                onChange={(event) =>
                  this.handleonChangeInput(event.target.id, event)
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Số Lượng
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={selectedRoom?.quantity || ""}
                onChange={(event) =>
                  this.handleonChangeInput(event.target.id, event)
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="reservedRooms" className="form-label">
                Phòng Đã Đặt
              </label>
              <input
                type="number"
                className="form-control"
                id="reservedRooms"
                value={selectedRoom?.reservedRooms ?? ""}
                onChange={(event) =>
                  this.handleonChangeInput(event.target.id, event)
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Giá
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={selectedRoom?.price || ""}
                onChange={(event) =>
                  this.handleonChangeInput(event.target.id, event)
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô Tả
              </label>
              <textarea
                className="form-control"
                id="description"
                value={selectedRoom?.description || ""}
                onChange={(event) =>
                  this.handleonChangeInput(event.target.id, event)
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Hình Ảnh
              </label>
              <div className="upload-container">
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    this.handleUpload(file);
                    return false;
                  }}
                  maxCount={1}
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={this.state.uploading}
                  >
                    {this.state.uploading ? "Đang tải lên..." : "Tải ảnh"}
                  </Button>
                  <div className="uploaded-images">
                    {this.state.fileList.length > 0 ? (
                      this.state.fileList.map((file, index) => (
                        <div key={index} className="image-preview">
                          <p>{file.name}</p>
                        </div>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="text-center">
        <Modal
          title="Thêm Phòng"
          open={modals.add}
          onOk={this.handleOkAdd}
          onCancel={() => this.toggleModal("add", false)}
          width={1000}
        >
          {AddModal}
        </Modal>

        <Modal
          title="Xác Nhận Xóa"
          open={modals.delete}
          onOk={this.handleOkDelete}
          onCancel={() => this.toggleModal("delete", false)}
        >
          Xác nhận xóa phòng?
        </Modal>

        <Modal
          title="Cập Nhật Phòng"
          open={modals.update}
          onOk={this.handleOkUpdate}
          onCancel={() => this.toggleModal("update", false)}
          width={1000}
        >
          {selectedRoom ? UpdateModal : <p>Đang tải...</p>}
        </Modal>

        <h1>QUẢN LÝ PHÒNG</h1>

        <div className="button-group">
          <Button
            className="button-add"
            size="large"
            onClick={() => this.toggleModal("add", true)}
          >
            <i className="fa-solid fa-plus"></i> Tạo mới
          </Button>
          <Popover
            placement="bottomRight"
            content={
              <div style={{ width: 400 }}>
                <FilterButtonRoom
                  onClose={() => this.setOpenFormFilter(false)}
                  onSubmit={this.onSubmitPopover}
                />
              </div>
            }
            title="Lọc Phòng"
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
        {filteredData == null ? (
          <Empty />
        ) : (
          <Table
            columns={this.getColumns()}
            dataSource={filteredData}
            rowKey="id"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    fetchLoginSuccess: (userInfo) =>
      dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomManage);
