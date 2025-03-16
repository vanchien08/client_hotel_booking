import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./UserInfo.scss";
import HeaderPage from "./HeaderPage";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import * as actions from "../../../store/actions";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      name: this.props.userInfo,
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

  handleChange = ({ fileList }) => {
    // Chỉ giữ lại 1 ảnh mới nhất
    this.setState({ fileList: fileList.slice(-1) });
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

  render() {
    let userInfo = this.props.userInfo || {};
    let role = userInfo.roles?.[0]?.role || -1;

    console.log("infouser", userInfo);
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
              <div className="col-md-3 bg-light p-3 rounded">
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
                  <li className="list-group-item text-primary">
                    Thông tin tài khoản
                  </li>
                  <li className="list-group-item text-primary">
                    Địa chỉ hiện tại
                  </li>
                  <li className="list-group-item text-primary">Đổi mật khẩu</li>
                  <li className="list-group-item text-primary log-out-text">
                    Đơn hàng
                  </li>
                  <li className="list-group-item text-danger">Đăng Xuất</li>
                </ul>
              </div>

              {/* Profile Form */}
              <div className="col-md-5 ms-4 bg-white p-4 rounded">
                <h2 className="mb-4">HỒ SƠ CỦA TÔI</h2>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Tên:</label>
                    <input
                      type="text"
                      value={this.state.name}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ:</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại:</label>
                    <input type="text" className="form-control" />
                  </div>

                  <button
                    type="button"
                    className="btn btn-success btn-submit-info"
                  >
                    Cập nhật
                  </button>
                </form>
              </div>

              {/* Avatar Upload */}
              <div className="col-md-3 bg-light p-3 rounded d-flex flex-column align-items-center">
                <Upload
                  className="avatar-upload"
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-circle"
                  fileList={this.state.fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  maxCount={1}
                >
                  {this.state.fileList.length === 0 ? uploadButton : null}
                </Upload>

                {this.state.previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: this.state.previewOpen,
                      onVisibleChange: (visible) =>
                        this.setState({ previewOpen: visible }),
                      afterOpenChange: (visible) => {
                        if (!visible) this.setState({ previewImage: "" });
                      },
                    }}
                    src={this.state.previewImage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
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
