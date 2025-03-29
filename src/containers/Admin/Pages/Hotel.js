import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import {
  handleGetUserApi,
  handleGetHotelApi,
} from "../../../services/userService";
import {
  handleUpdateHotelApi,
  handleFilterHotelApi,
  handleAddHotelApi,
} from "../../../services/hotelService";
import { push } from "connected-react-router";
import { FilterOutlined } from "@ant-design/icons";
import "./Hotel.scss";
import { Button, Modal, Popover, Image, Upload, Empty } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import FilterButton from "../../../components/FilterButton";
import { uploadImageToCloud } from "../../../config/UploadImageCloud";
import { toast } from "react-toastify";
// antd

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      selectedReview: null,
      isModalOpen: false,
      id: null,
      name: "",
      description: "",
      address: "",
      city: "",
      country: "",
      image: "",
      createAt: "",
      openFormFilter: false,
      fileList: [],
      uploading: false,
      imageUrl: "",
      isModalOpenAdd: false,
      dataAdd: {
        nameAdd: "",
        descriptionAdd: "",
        addressAdd: "",
        cityAdd: "",
        countryAdd: "",
      },
    };
  }

  async componentDidMount() {
    let user = await handleGetHotelApi();

    console.log("data get from api ", user);
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

  getColumns2 = () => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Quốc gia",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={image}
          alt="Hotel"
          style={{ width: "50px", height: "50px" }}
        />
      ), // Hiển thị hình ảnh
    },
    {
      title: "Lúc",
      dataIndex: "created_At",
      key: "created_At",
      render: (created_At) =>
        created_At ? new Date(created_At).toLocaleDateString() : "N/A", // Xử lý trường hợp null
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button
            type="primary"
            ghost
            onClick={() => this.handleUpdate(record)}
            style={{ marginRight: "10px" }}
          >
            Update
          </Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => this.handleDelete(record.id)}
            style={{ color: "red" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  handleUpdate = (record) => {
    this.setState({
      isModalOpen: true,
      selectedReview: record, // Lưu thông tin review cần chỉnh sửa
    });
  };
  // Xử lý xóa review
  handleDelete = async (id) => {
    // if (window.confirm("Are you sure you want to delete this review?")) {
    //   try {
    //     const res = await handleDeleteReviewsApi(id);
    //     if (res.errCode === 1) {
    //       alert("Review deleted successfully!");
    //       // Cập nhật lại dữ liệu sau khi xóa
    //       this.componentDidMount();
    //     } else {
    //       alert(
    //         res.errMessage || "Failed to delete the review. Please try again."
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Error deleting review:", error);
    //     alert("An unexpected error occurred while deleting the review.");
    //   }
    // }
  };

  handleCancel = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  handleCancelAdd = () => {
    this.setState({
      isModalOpenAdd: false,
    });
  };

  handleonChangeInput = (id, event) => {
    console.log("id >>", id);
    console.log("event >>", event.target.value);
    this.setState({
      selectedReview: {
        ...this.state.selectedReview,
        [id]: event.target.value,
      },
    });
  };

  handleOk = async () => {
    console.log("checkupdate", this.state.selectedReview);
    let responUpdate = await handleUpdateHotelApi(this.state.selectedReview);
    if (responUpdate.errCode === 1) {
      this.componentDidMount();
      this.setState({
        isModalOpen: false,
      });
      toast.success("Cập nhật thành công!", {
        position: "bottom-right",
        autoClose: 3000,
        toastId: "update-success", // Ẩn sau 3 giây
      });
    } else {
      toast.error("Cập nhật thất bại!", {
        position: "bottom-right",
        autoClose: 3000,
        toastId: "update-fail", // Ẩn sau 3 giây
      });
    }
    //  console.log("update state>>>", responUpdate);
  };
  setOpenFormFilter = (open) => {
    this.setState({
      openFormFilter: open,
    });
  };
  onSubmitPopover = async (data) => {
    let respon = await handleFilterHotelApi(data);
    this.setState({
      data: respon.datahotel,
    });
    //  this.componentDidMount();
    console.log("respon?>>", respon);
  };
  handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    console.log("image", newFileList);
    this.setState({
      fileList: newFileList,
    });
  };
  handleUpload = async (file) => {
    this.setState({ uploading: true });
    let data = await uploadImageToCloud(file);
    if (data.secure_url) {
      console.log("Upload thành công:", data);
      this.setState((prevState) => ({
        selectedReview: {
          ...prevState.selectedReview, // Giữ nguyên các thuộc tính cũ của selectedReview
          image: data.secure_url, // Cập nhật giá trị image
        },
        imageUrl: data.secure_url,
        uploading: false,
        fileList: [{ url: data.secure_url, name: file.name }],
      }));
    } else {
      this.setState({ uploading: false });
    }
  };
  handleUploadAdd = async (file) => {
    this.setState({ uploading: true });
    let data = await uploadImageToCloud(file);
    if (data.secure_url) {
      console.log("Upload thành công:", data);
      this.setState((prevState) => ({
        dataAdd: {
          ...prevState.dataAdd,
          imageAdd: data.secure_url, // Cập nhật ảnh cho Add Modal
        },
        uploading: false,
        fileList: [{ url: data.secure_url, name: file.name }],
      }));
    } else {
      this.setState({ uploading: false });
    }
  };

  handleOkAdd = async () => {
    let { nameAdd, descriptionAdd, addressAdd, cityAdd, countryAdd, imageAdd } =
      this.state.dataAdd;
    if (
      !nameAdd?.trim() ||
      !descriptionAdd?.trim() ||
      !addressAdd?.trim() ||
      !cityAdd?.trim() ||
      !countryAdd?.trim()
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    } else {
      let respon = await handleAddHotelApi(
        nameAdd,
        descriptionAdd,
        addressAdd,
        cityAdd,
        countryAdd,
        imageAdd
      );

      console.log("respon add`", respon);
      let updatedHotels = await handleGetHotelApi();

      this.setState({
        data: updatedHotels,
        isModalOpenAdd: false,
      });

      toast.success("Thêm khách sạn thành công!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  handleonChangeInputAdd = (id, event) => {
    this.setState({
      dataAdd: {
        ...this.state.dataAdd,
        [id]: event.target.value,
      },
    });
  };

  handleClickAdd = () => {
    this.setState({
      isModalOpenAdd: true,
    });
  };
  render() {
    const { isLoggedIn } = this.props;
    let isModalOpen = this.state.isModalOpen;
    const {
      data,
      selectedReview,
      previewOpen,
      previewImage,
      fileList,
      isModalOpenAdd,
    } = this.state; // lấy dữ liệu từ state
    console.log("state login >>", isLoggedIn);
    console.log("selected Review  >>", selectedReview);

    const AddModal = (
      <form>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label for="input2" className="form-label">
                  Tên
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="nameAdd"
                  value={this.state.dataAdd.nameAdd}
                  onChange={(event) =>
                    this.handleonChangeInputAdd(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label for="input3" className="form-label">
                  Mô tả
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descriptionAdd"
                  value={this.state.dataAdd.descriptionAdd}
                  onChange={(event) =>
                    this.handleonChangeInputAdd(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label for="input4" className="form-label">
                  Địa chỉ
                </label>
                <input
                  className="form-control"
                  id="addressAdd"
                  value={this.state.dataAdd.addressAdd}
                  onChange={(event) =>
                    this.handleonChangeInputAdd(event.target.id, event)
                  }
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label for="input5" className="form-label">
                  Thành Phố
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cityAdd"
                  value={this.state.dataAdd.cityAdd}
                  onChange={(event) =>
                    this.handleonChangeInputAdd(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label for="input6" className="form-label">
                  Quốc gia
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="countryAdd"
                  value={this.state.dataAdd.countryAdd}
                  onChange={(event) =>
                    this.handleonChangeInputAdd(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="input7" className="form-label">
                  Ảnh
                </label>
                <div className="upload-container">
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      this.handleUploadAdd(file);
                      return false; // Ngăn Upload mặc định của Ant Design
                    }}
                    maxCount={1}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      loading={this.state.uploading}
                    >
                      {this.state.uploading ? "Uploading..." : "Upload"}
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
      </form>
    );

    // Kiểm tra xem dữ liệu đã được tải chưa
    return (
      <div className="text-center">
        <Modal
          title="Thêm khách sạn"
          open={isModalOpenAdd}
          onOk={this.handleOkAdd}
          onCancel={this.handleCancelAdd}
          width={1000}
        >
          {AddModal}
        </Modal>
        <Modal
          title="Update Hotel"
          open={isModalOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
          {selectedReview ? (
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input1" className="form-label">
                        ID
                      </label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="id"
                        value={this.state.selectedReview.id}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input2" className="form-label">
                        Tên
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.state.selectedReview.name}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input3" className="form-label">
                        Mô tả
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={this.state.selectedReview.description}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input4" className="form-label">
                        Địa chỉ
                      </label>
                      <input
                        className="form-control"
                        id="address"
                        value={this.state.selectedReview.address}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input5" className="form-label">
                        Thành Phố
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={this.state.selectedReview.city}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input6" className="form-label">
                        Quốc gia
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        value={this.state.selectedReview.country}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="input7" className="form-label">
                        Ảnh
                      </label>
                      <div className="upload-container">
                        <Upload
                          showUploadList={false}
                          beforeUpload={(file) => {
                            this.handleUpload(file);
                            return false; // Ngăn Upload mặc định của Ant Design
                          }}
                          maxCount={1}
                        >
                          <Button
                            icon={<UploadOutlined />}
                            loading={this.state.uploading}
                          >
                            {this.state.uploading ? "Uploading..." : "Upload"}
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

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input8" className="form-label">
                        Lúc
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="createdAt"
                        value={this.state.selectedReview.createdAt}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </Modal>

        <h1>HOTEl MANAGER</h1>
        <PlusSquareOutlined
          className="button-add-review"
          onClick={() => this.handleClickAdd()}
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
          title="Title"
          trigger="click"
          open={this.state.openFormFilter} // Sử dụng state để quản lý open
          onOpenChange={(open) => this.setOpenFormFilter(open)} // Cập nhật state khi mở/đóng
          destroyTooltipOnHide={false}
        >
          <Button className="filter-button">
            Filter <FilterOutlined />
          </Button>
        </Popover>
        {data == null ? (
          <Empty />
        ) : (
          <Table columns={this.getColumns2()} dataSource={data} rowKey="id" />
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
