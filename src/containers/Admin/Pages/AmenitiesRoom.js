import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Tag, Modal, Card, Col, Row, Statistic } from "antd";
import {
  handleGetAllRoomAmenitiesApi,
  handleGetAvailableRoomAmenitiesApi,
  handleAddRoomAmenitiesApi,
  handleDeleteRoomAmenityApi,
} from "../../../services/amenityRoomsService";
import { push } from "connected-react-router";
import { handleGetRoomsApi } from "../../../services/RoomService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import {
  PlusOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

class AmenityRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      searchTerm: "",
      selectedIcon: null,
      AmenitiesRoom: [],
      dataRoom: [],
      modals: {
        add: false,
      },
      isClickTag: false,
      selectTags: [],
      selectRoom: null,
    };
  }

  async componentDidMount() {
    try {
      let respon = await handleGetAvailableRoomAmenitiesApi();
      let room = await handleGetRoomsApi();
      console.log("respon", room, "amenities", respon.data);
      this.setState({
        AmenitiesRoom: (respon.dataAmenities || []).filter(
          (amenity) => amenity.type === "AROOM"
        ),
        dataRoom: room.dataroom || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.Toast("Lỗi khi tải dữ liệu!", "error");
      this.setState({
        AmenitiesRoom: [],
        dataRoom: [],
      });
    }
  }

  fetchRoomAmenities = async () => {
    try {
      let room = await handleGetRoomsApi();
      this.setState({ dataRoom: room.dataroom || [] });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      this.setState({ dataRoom: [] });
      this.Toast("Lỗi khi tải danh sách phòng!", "error");
    }
  };

  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = url;
    navigate(`${redirectPath}`);
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value.toLowerCase() });
  };

  handleIconClick = (iconName) => {
    this.setState({ selectedIcon: iconName });
  };

  handleDeleteItem = async (amenityId, roomId) => {
    try {
      let respon = await handleDeleteRoomAmenityApi(roomId, amenityId);
      if (respon.errCode === 1) {
        await this.fetchRoomAmenities();
        this.Toast("Xóa tiện ích thành công!", "success");
      } else {
        this.Toast("Xóa tiện ích thất bại!", "error");
      }
      console.log("id amenity & room", amenityId, roomId, respon);
    } catch (error) {
      console.error("Error deleting amenity:", error);
      this.Toast("Lỗi khi xóa tiện ích!", "error");
    }
  };

  handleAdd = (record) => {
    this.setState({
      selectRoom: record,
    });
    console.log("show room select", record);
    this.toggleModal("add", true);
  };

  toggleModal = (type, value) => {
    this.setState((prevState) => ({
      modals: {
        ...prevState.modals,
        [type]: value,
      },
    }));
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

  handleClickTagAdd = (id) => {
    this.setState((prevState) => {
      if (prevState.selectTags.includes(id)) {
        return {
          selectTags: prevState.selectTags.filter((tagId) => tagId !== id),
        };
      } else {
        return { selectTags: [...prevState.selectTags, id] };
      }
    });
  };

  handleOkAddAmenities = async () => {
    try {
      let { selectRoom, selectTags } = this.state;
      let resAddAmenities = await handleAddRoomAmenitiesApi(
        selectRoom.id,
        selectTags
      );
      if (resAddAmenities.errCode === 1) {
        await this.fetchRoomAmenities();
        this.Toast("Thêm tiện ích thành công!", "success");
        this.toggleModal("add", false);
        this.setState({
          selectTags: [],
        });
      } else {
        this.Toast("Thêm tiện ích thất bại!", "error");
        this.toggleModal("add", false);
      }
      console.log("check res", resAddAmenities);
    } catch (error) {
      console.error("Error adding amenities:", error);
      this.Toast("Lỗi khi thêm tiện ích!", "error");
      this.toggleModal("add", false);
    }
  };

  columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Loại phòng",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Tiện ích",
      dataIndex: "amenityRooms",
      key: "amenityRooms",
      render: (amenityRooms, record) => (
        <>
          {amenityRooms && amenityRooms.length > 0 ? (
            amenityRooms
              .filter((item) => item.amenity.type === "AROOM")
              .map((item) => (
                <span
                  key={item.id}
                  style={{
                    marginRight: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {item.amenity.icon && (
                    <FontAwesomeIcon
                      icon={solidIcons[item.amenity.icon.replace("-", "")]}
                    />
                  )}{" "}
                  <Tag
                    color="orange"
                    closable
                    onClose={() =>
                      this.handleDeleteItem(item.amenity.id, record.id)
                    }
                  >
                    {item.amenity.name}
                  </Tag>
                </span>
              ))
          ) : (
            <span></span>
          )}
          <Tag
            color="blue"
            onClick={() => this.handleAdd(record)}
            style={{ marginLeft: "8px" }}
          >
            <PlusOutlined /> Thêm
          </Tag>
        </>
      ),
    },
  ];

  render() {
    const {
      searchTerm,
      selectedIcon,
      dataRoom,
      modals,
      AmenitiesRoom,
      isClickTag,
      selectTags,
    } = this.state;

    const iconList = Object.keys(solidIcons)
      .filter((name) => name.startsWith("fa"))
      .filter((name) => name.toLowerCase().includes(searchTerm))
      .map((name) => ({ name, icon: solidIcons[name] }));

    return (
      <div className="text-center">
        <Modal
          title="Thêm tiện ích phòng"
          open={modals.add}
          onOk={this.handleOkAddAmenities}
          onCancel={() => this.toggleModal("add", false)}
          width={800}
        >
          {AmenitiesRoom && AmenitiesRoom.length > 0 ? (
            AmenitiesRoom.map((item) => (
              <span
                className="tag-add-span"
                key={item.id}
                style={{
                  marginRight: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <Tag
                  className="tag-add-to-amenity"
                  onClick={() => this.handleClickTagAdd(item.id)}
                  color={selectTags.includes(item.id) ? "success" : "default"}
                >
                  {item.name}
                </Tag>
              </span>
            ))
          ) : (
            <span>Không có tiện ích nào</span>
          )}
        </Modal>
        <h1>Quản lý tiện ích phòng</h1>
        {!Array.isArray(dataRoom) || dataRoom.length === 0 ? (
          <p>Loading data, please wait...</p>
        ) : (
          <Table columns={this.columns} dataSource={dataRoom} rowKey="id" />
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

export default connect(mapStateToProps, mapDispatchToProps)(AmenityRoom);
