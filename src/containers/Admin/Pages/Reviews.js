import React, { Component, useState } from "react";
import { connect } from "react-redux";

import { handleGetReviewsApi } from "../../../services/userService";
import {
  handleDeleteReviewsApi,
  handleUpdateReviewsApi,
} from "../../../services/ReviewService";
import { push } from "connected-react-router";
import "./Reviews.scss";

import { Button, Modal, Table } from "antd";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      isModalOpen: false,
      id: "",
      user: "",
      email: "",
      rating: "",
      comment: "",
      hotel: "",
      hoteladdress: "",
      createat: "",
      selectedReview: null,
    };
  }

  // Lấy dữ liệu khi component mount
  async componentDidMount() {
    let reviews = await handleGetReviewsApi();
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

  handleUpdate = (record) => {
    this.setState({
      isModalOpen: true,
      selectedReview: record, // Lưu thông tin review cần chỉnh sửa
    });
  };
  // Xử lý xóa review
  handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const res = await handleDeleteReviewsApi(id);
        if (res.errCode === 1) {
          alert("Review deleted successfully!");
          // Cập nhật lại dữ liệu sau khi xóa
          this.componentDidMount();
        } else {
          alert(
            res.errMessage || "Failed to delete the review. Please try again."
          );
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("An unexpected error occurred while deleting the review.");
      }
    }
  };
  handleOk = async () => {
    try {
      // Đóng modal trước khi gọi API
      await this.setState({ isModalOpen: false });

      // Kiểm tra state sau khi cập nhật
      console.log("check state", this.state.selectedReview);

      // Kiểm tra nếu selectedReview tồn tại
      if (!this.state.selectedReview) {
        throw new Error("selectedReview is undefined or null");
      }

      // Gọi API cập nhật
      let respon = await handleUpdateReviewsApi(
        this.state.selectedReview.id,
        this.state.selectedReview.rating,
        this.state.selectedReview.comment
      );
      this.componentDidMount();
      console.log("respon update", respon);
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  handleCancel = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  handleonChangeInput = (id, event) => {
    this.setState({
      selectedReview: {
        ...this.state.selectedReview, // Giữ lại các thuộc tính cũ của selectedReview
        [id]: event.target.value, // Chỉ cập nhật thuộc tính id
      },
    });
  };
  handleonChangeInputChildUser = (id, event) => {
    this.setState({
      selectedReview: {
        ...this.state.selectedReview, // Giữ lại các thuộc tính cũ của selectedReview
        user: {
          [id]: event.target.value,
        }, // Chỉ cập nhật thuộc tính id
      },
    });
  };

  handleonChangeInputChildHotel = (id, event) => {
    this.setState({
      selectedReview: {
        ...this.state.selectedReview, // Giữ lại các thuộc tính cũ của selectedReview
        hotel: {
          [id]: event.target.value,
        }, // Chỉ cập nhật thuộc tính id
      },
    });
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
    const { data, isModalOpen, selectedReview } = this.state;
    return (
      <div classNameName="text-center">
        <h1>Reviews MANAGER</h1>
        {data == null ? (
          <p>Loading data, please wait...</p> // Hiển thị thông báo khi dữ liệu chưa có
        ) : (
          <Table columns={this.getColumns()} dataSource={data} rowKey="id" />
        )}

        <Modal
          title="Update Review"
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
                        disabled
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.state.selectedReview.user.name}
                        onChange={(event) =>
                          this.handleonChangeInputChildUser(
                            event.target.id,
                            event
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input3" className="form-label">
                        Email
                      </label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="email"
                        value={this.state.selectedReview.user.email}
                        onChange={(event) =>
                          this.handleonChangeInputChildUser(
                            event.target.id,
                            event
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input4" className="form-label">
                        Đánh giá
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className="form-control"
                        id="rating"
                        value={this.state.selectedReview.rating}
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
                        Bình luận
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="comment"
                        value={this.state.selectedReview.comment}
                        onChange={(event) =>
                          this.handleonChangeInput(event.target.id, event)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input6" className="form-label">
                        Khách Sạn
                      </label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="hotel"
                        value={this.state.selectedReview.hotel.name}
                        onChange={(event) =>
                          this.handleonChangeInputChildHotel(
                            event.target.id,
                            event
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label for="input7" className="form-label">
                        Địa chỉ
                      </label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="address"
                        value={this.state.selectedReview.hotel.address}
                        onChange={(event) =>
                          this.handleonChangeInputChildHotel(
                            event.target.id,
                            event
                          )
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
                        disabled
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
