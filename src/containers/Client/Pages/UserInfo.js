import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./UserInfo.scss";
import HeaderPage from "./HeaderPage";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button } from "antd";
import * as actions from "../../../store/actions";
import { uploadImageToCloud } from "../../../config/UploadImageCloud";
import { handleUpdateProfile } from "../../../services/userService";
import BookingHistory from "../../../containers/menuProfileUser/BookingHistory";
import ChangePassWord from "../../../containers/menuProfileUser/ChangePassword";
import { toast } from "react-toastify";
import FooterV2 from "../../Footer/FooterV2";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userInfo || {},
      previewOpen: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: this.props.userInfo?.avatar || "",
        },
      ],
      name: this.props.userInfo?.name || "",
      menuSelect: 1,
    };
  }
  async componentDidMount() {
    let userInfo = this.props.userInfo || {};
    if (!userInfo) {
      this.setState({
        fileList: [
          {
            ...this.state.fileList[0], // Giữ nguyên các giá trị cũ
            url: userInfo.avatar, // Cập nhật URL từ `userInfo`
          },
        ],
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.userInfo !== prevProps.userInfo) {
      console.log("Cập nhật userInfo:", this.props.userInfo);
      this.setState({
        user: this.props.userInfo,
        fileList: [
          {
            ...this.state.fileList[0],
            url: this.props.userInfo.avatar, // Cập nhật ảnh khi userInfo thay đổi
          },
        ],
      });
    }
  }

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewOpen: true,
    });
  };

  handleChange = async ({ fileList }) => {
    // Chỉ giữ lại 1 ảnh mới nhất
    this.setState({ fileList: fileList.slice(-1) });
    if (fileList.length > 0 && fileList[fileList.length - 1].originFileObj) {
      let data = await uploadImageToCloud(
        fileList[fileList.length - 1].originFileObj
      );
      this.setState({
        user: {
          ...this.state.user,
          avatar: data.secure_url,
        },
      });
    }
  };

  handleNavigate = (path) => {
    this.props.navigate(path);
  };
  handleLogOut = (path) => {
    localStorage.removeItem("persist:admin");
    localStorage.removeItem("persist:user");
    this.props.navigate(path);
  };
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  handleLogin = () => {
    console.log("login");
    this.redirectToSystemPage();
  };

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    navigate("/login");
  };
  HandleOnChangeData = (event, id) => {
    this.setState({
      user: {
        ...this.state.user,
        [id]: event.target.value,
      },
    });
  };
  HandleSubmit = async (event) => {
    event.preventDefault();
    let { id, name, address, email, phone, avatar } = this.state.user;
    console.log("state submit", { id, name, address, email, phone, avatar });
    let respon = await handleUpdateProfile(
      id,
      name,
      address,
      email,
      phone,
      avatar
    );
    if (respon && respon.errCode === 1) {
      toast.success("Cập nhật thông tin thành công!", {
        position: "bottom-right",
        autoClose: 3000,
        toastId: "delete-success",
      });
      // Cập nhật Redux state
      this.props.fetchLoginSuccess({
        ...this.state.user, // Dữ liệu mới đã nhập
        avatar, // Đảm bảo avatar cũng được cập nhật
      });
    } else {
      toast.error("Cập nhật thông tin thất bại!", {
        position: "bottom-right",
        autoClose: 3000,
        toastId: "delete-success",
      });
    }
  };
  handleOnClickMenu = (id) => {
    switch (id) {
      case "item1":
        this.setState({
          menuSelect: 1,
        });
        break;
      case "item2":
        this.setState({
          menuSelect: 2,
        });
        break;
      case "item3":
        this.setState({
          menuSelect: 3,
        });
        break;
      case "item5":
        this.handleLogOut("/login");
      default:
        this.setState({
          menuSelect: 1,
        });
    }
  };
  render() {
    let userInfo = this.props.userInfo || {};
    let role = userInfo.roles?.[0]?.role || -1;
    let { user, menuSelect } = this.state;

    // Định nghĩa nút upload
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <div>
        <HeaderPage />
        <div className="UserInfo_container">
          <div className="container-fluid mt-5">
            <div className="row px-6">
              {/* Sidebar */}
              <div className="col-md-3 p-3 rounded">
                <div className="text-center avatar-user-info">
                  <div
                    className="bg-secondary rounded-circle avatar-user-setting"
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto",
                      backgroundImage: `url(${
                        this.props.userInfo?.avatar ||
                        "../../../assets/images/avatar.png"
                      })`,
                    }}
                  ></div>
                  <h4 className="mt-2">{userInfo.name}</h4>
                </div>
                <ul className="list-group mt-3">
                  <li
                    className={`list-group-item text-primary ${
                      menuSelect === 1 ? "active-menu-select" : ""
                    }`}
                    id="item1"
                    onClick={(event) => this.handleOnClickMenu(event.target.id)}
                  >
                    Thông tin tài khoản
                  </li>
                  <li
                    id="item2"
                    className={`list-group-item text-primary ${
                      menuSelect === 2 ? "active-menu-select" : ""
                    }`}
                    onClick={(event) => this.handleOnClickMenu(event.target.id)}
                  >
                    Lịch sử
                  </li>
                  <li
                    className={`list-group-item text-primary ${
                      menuSelect === 3 ? "active-menu-select" : ""
                    }`}
                    id="item3"
                    onClick={(event) => this.handleOnClickMenu(event.target.id)}
                  >
                    Đổi mật khẩu
                  </li>
                  <li className="list-group-item text-primary log-out-text">
                    Đơn hàng
                  </li>
                  <li
                    className="list-group-item text-danger "
                    id="item5"
                    onClick={(event) => this.handleOnClickMenu(event.target.id)}
                  >
                    Đăng Xuất
                  </li>
                </ul>
              </div>

              {(() => {
                switch (menuSelect) {
                  case 1:
                    return (
                      <div className="col-md-8 ms-4 bg-white p-4 rounded">
                        <h2 className="mb-4 title-menu-user">HỒ SƠ CỦA TÔI</h2>
                        <div className="d-flex">
                          {/* Profile Form */}
                          <div className="flex-grow-1">
                            <form>
                              <div className="mb-3">
                                <label className="form-label">Tên:</label>
                                <input
                                  id="name"
                                  type="text"
                                  value={user.name}
                                  className="form-control"
                                  onChange={(event) =>
                                    this.HandleOnChangeData(
                                      event,
                                      event.target.id
                                    )
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                  id="email"
                                  type="text"
                                  className="form-control"
                                  value={user.email}
                                  onChange={(event) =>
                                    this.HandleOnChangeData(
                                      event,
                                      event.target.id
                                    )
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Địa chỉ:</label>
                                <input
                                  id="address"
                                  type="text"
                                  className="form-control"
                                  value={user.address}
                                  onChange={(event) =>
                                    this.HandleOnChangeData(
                                      event,
                                      event.target.id
                                    )
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">
                                  Số điện thoại:
                                </label>
                                <input
                                  id="phone"
                                  type="text"
                                  className="form-control"
                                  value={user.phone}
                                  onChange={(event) =>
                                    this.HandleOnChangeData(
                                      event,
                                      event.target.id
                                    )
                                  }
                                />
                              </div>

                              <Button
                                type="primary"
                                ghost
                                onClick={(event) => this.HandleSubmit(event)}
                              >
                                Cập nhật
                              </Button>
                            </form>
                          </div>

                          {/* Avatar Upload */}
                          <div className="p-3 d-flex flex-column align-items-center">
                            <Upload
                              className="avatar-upload"
                              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                              listType="picture-circle"
                              fileList={this.state.fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              maxCount={1}
                            >
                              {this.state.fileList.length === 0
                                ? uploadButton
                                : null}
                            </Upload>

                            {this.state.previewImage && (
                              <Image
                                className="avatar-upload-display"
                                wrapperStyle={{ display: "none" }}
                                preview={{
                                  visible: this.state.previewOpen,
                                  onVisibleChange: (visible) =>
                                    this.setState({ previewOpen: visible }),
                                  afterOpenChange: (visible) => {
                                    if (!visible)
                                      this.setState({ previewImage: "" });
                                  },
                                }}
                                src={this.state.previewImage}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  case 2:
                    return <BookingHistory />;
                  case 3:
                    return <ChangePassWord userInfo={this.state.user} />;
                  case 4:
                    return null;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
        <FooterV2 />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userInfo: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    fetchLoginSuccess: (userInfo) =>
      dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
