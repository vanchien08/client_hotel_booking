import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Tag, Modal } from "antd";
import {
  handleGetHotelAmenities,
  handleDeleteHAmenities,
  handleGetAmenitiesOfHotel,
  handleAddHotelAmenities,
} from "../../../services/amenitiesHotelService";
import { push } from "connected-react-router";
import "./AmenitiesHotel.scss";
import { handleGetHotelApi } from "../../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
class AmenitiesHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      searchTerm: "",
      selectedIcon: null,
      AmenitiesHotel: null,
      dataHotel: null,
      modals: {
        add: false,
      },
      isClickTag: false,
      selectTags: [],
      selectHotel: null,
    };
  }

  async componentDidMount() {
    let respon = await handleGetAmenitiesOfHotel();
    let hotel = await handleGetHotelApi();
    console.log("respon", hotel, respon.dataAmenities);
    this.setState({
      AmenitiesHotel: respon.dataAmenities,
      dataHotel: hotel,
    });
  }
  fetchHotelAmenities = async () => {
    let hotel = await handleGetHotelApi();
    this.setState({ dataHotel: hotel });
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

  handleDeleteItem = async (amenityId, hotelId) => {
    let respon = await handleDeleteHAmenities(amenityId, hotelId);
    console.log("id amenity & hotel", amenityId, hotelId, respon);
  };
  handleAdd = (record) => {
    this.setState({
      selectHotel: record,
    });
    console.log("show hotel select", record);
    this.toggleModal("add", true);
  };

  toggleModal = (type, value) => {
    this.setState((prevState) => ({
      modals: {
        ...prevState.Modal,
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
          selectTags: prevState.selectTags.filter((tagid) => tagid !== id),
        };
      } else {
        return { selectTags: [...prevState.selectTags, id] };
      }
    });
  };
  handleOkAddAmenities = async () => {
    let { selectHotel, selectTags } = this.state;
    let resAddAmenitiesH = await handleAddHotelAmenities(
      selectHotel.id,
      selectTags
    );
    if (resAddAmenitiesH.errCode == 1) {
      await this.fetchHotelAmenities();
      this.Toast("Thêm tiện ích thành công!", "success");
      this.toggleModal("add", false);
      this.setState({
        selectTags: [],
      });
    } else {
      this.Toast("Thêm tiện ích thất bại!", "error");
      this.toggleModal("add", false);
    }
    console.log("check res", resAddAmenitiesH);
  };
  columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1, // Tự động đánh số thứ tự
    },
    {
      title: "Tên khách sạn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tiện ích",
      dataIndex: "amenitiesHotels",
      key: "amenitiesHotels",
      render: (amenitiesHotels, record) => (
        <>
          {amenitiesHotels && amenitiesHotels.length > 0 ? (
            amenitiesHotels.map((item) => (
              <span
                key={item.id}
                style={{
                  marginRight: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={solidIcons[item.amenity.icon]} />{" "}
                <Tag
                  color="orange"
                  closable
                  onClose={(e) => {
                    //  e.preventDefault();
                    this.handleDeleteItem(item.amenity.id, record.id);
                  }}
                >
                  {item.amenity.name}
                </Tag>
              </span>
            ))
          ) : (
            <span></span>
          )}

          {/* Nút "New Tag" luôn hiển thị */}
          <Tag
            color="blue"
            onClick={() => this.handleAdd(record)}
            style={{ marginLeft: "8px" }}
          >
            <PlusOutlined /> New Tag
          </Tag>
        </>
      ),
    },
  ];
  render() {
    const {
      searchTerm,
      selectedIcon,
      dataHotel,
      modals,
      AmenitiesHotel,
      isClickTag,
      selectTags,
    } = this.state;

    const iconList = Object.keys(solidIcons)
      .filter((name) => name.startsWith("fa")) // Chỉ lấy icon (bỏ metadata)
      .filter((name) => name.toLowerCase().includes(searchTerm)) // Lọc theo tìm kiếm
      .map((name) => ({ name, icon: solidIcons[name] })); // Tạo mảng icon

    const FindIcon = () => {
      <div style={{ padding: "20px" }}>
        <h2>Chọn Icon</h2>

        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm kiếm icon..."
          value={searchTerm}
          onChange={this.handleSearch}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />

        {/* Hiển thị danh sách icon */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
            gap: "10px",
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {iconList.map(({ name, icon }) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border:
                  selectedIcon === name ? "2px solid blue" : "1px solid gray",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => this.handleIconClick(name)}
            >
              <FontAwesomeIcon icon={icon} size="2x" />
            </div>
          ))}
        </div>

        {/* Hiển thị icon đã chọn */}
        {selectedIcon && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h3>Icon đã chọn:</h3>
            <FontAwesomeIcon icon={solidIcons[selectedIcon]} size="4x" />
            <p>{selectedIcon}</p>
          </div>
        )}
      </div>;
    };
    return (
      <div className="text-center">
        <Modal
          title="Thêm tiện ích"
          open={modals.add}
          onOk={this.handleOkAddAmenities}
          onCancel={() => this.toggleModal("add", false)}
          width={800}
        >
          {AmenitiesHotel && AmenitiesHotel.length > 0 ? (
            AmenitiesHotel.map((item) => (
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
                  // onClose={(e) => {
                  //   //  e.preventDefault();
                  //   this.handleDeleteItem(item.amenity.id, record.id);
                  // }}
                >
                  {item.name}
                </Tag>
              </span>
            ))
          ) : (
            <span>Không có tiện ích nào</span>
          )}
        </Modal>
        <h1>Quản lý tiện ích khách sạn</h1>
        {dataHotel == null ? (
          <p>Loading data, please wait...</p> // Hiển thị thông báo hoặc loader khi dữ liệu chưa có
        ) : (
          <Table columns={this.columns} dataSource={dataHotel} rowKey="id" />
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

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesHotel);
