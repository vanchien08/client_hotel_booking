import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import {
  handleGetUserApi,
  handleGetHotelApi,
} from "../../../services/userService";
import { push } from "connected-react-router";
import "./Hotel.scss";
import { Button, Modal } from "antd";
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
        <img
          src={image}
          alt="Hotel"
          style={{ width: "50px", height: "50px" }}
        />
      ), // Hiển thị hình ảnh
    },
    {
      title: "Created At",
      dataIndex: "created_At",
      key: "created_At",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"), // Xử lý trường hợp null
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

  handleonChangeInput = (id, event) => {
    console.log("id >>", id);
    console.log("event >>", event.target.value);
    this.setState({
      selectedReview: {
        ...this.state.selectedReview,
        user: {
          [id]: event.target.value,
        },
      },
    });
  };
  render() {
    const { isLoggedIn } = this.props;
    let isModalOpen = this.state.isModalOpen;
    const { data, selectedReview } = this.state; // lấy dữ liệu từ state
    console.log("state login >>", isLoggedIn);
    console.log("selected Review  >>", selectedReview);

    // Kiểm tra xem dữ liệu đã được tải chưa
    return (
      <div className="text-center">
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
                        value={selectedReview.id}
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
                        value={selectedReview.name}
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
                      <label for="input7" className="form-label">
                        Ảnh
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={this.state.selectedReview.image}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
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
        {data == null ? (
          <p>Loading data, please wait...</p> // Hiển thị thông báo hoặc loader khi dữ liệu chưa có
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
