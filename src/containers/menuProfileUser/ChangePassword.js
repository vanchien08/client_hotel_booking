import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./ChangePassword.scss";
// import * as actions from "../../store/actions";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { handleChangePassApi } from "../../services/userService";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userInfo,
      oldpassword: "",
      newpassword: "",
      confirmPassword: "",
      notify: "",
      errConfirm: 0,
      isOpenModal: false,
      textModal: "",
    };
  }
  handleLogin = () => {
    this.redirectToSystemPage();
  };
  handlerKeyDown = (event) => {};

  async componentDidMount() {
    console.log("check user", this.state.user);
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.errCode !== this.props.errCode) {
    //   this.setState({
    //     errCode: this.props.errCode,
    //   });
    // }
  }

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/login";
    navigate(`${redirectPath}`);
  };
  handleonChangePass = (event, id) => {
    if (id === "confirmPassword") {
      if (this.state.newpassword != event.target.value) {
        this.setState({
          notify: "Mật khẩu xác nhận không đúng !",
          errConfirm: 0,
        });
      } else {
        this.setState({
          notify: "",
          errConfirm: 1,
        });
      }
    }

    this.setState({
      [id]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    let { errConfirm, confirmPassword, oldpassword, newpassword } = this.state;
    let text = "";
    if (oldpassword === "" || newpassword === "" || confirmPassword === "") {
      this.setState({
        isModalOpen: true,
        textModal: "Vui lòng điền đầy đủ thông tin!",
      });

      return;
    }
    if (errConfirm == 1) {
      text = "Xác nhận đổi mật khẩu!";
    } else {
      text = "Xác nhận lại mật khẩu không đúng";
    }

    this.setState({
      isModalOpen: true,
      textModal: text,
    });
  };
  handleOkModal = async () => {
    let { errConfirm, user, oldpassword, newpassword } = this.state;
    let respon = null;
    if (errConfirm == 1) {
      respon = await handleChangePassApi(user.id, oldpassword, newpassword);
      if (respon.errCode == 0) {
        this.setState({
          notify: "Mật khẩu cũ không chính xác!",
        });
      } else {
        toast.success("Cập nhật thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          toastId: "delete-success",
        });
      }
    }

    console.log("respon update password", respon);
    this.setState({
      isModalOpen: false,
    });
  };
  handleCancelModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    let {
      user,
      oldpassword,
      newpassword,
      confirmPassword,
      notify,
      isModalOpen,
      textModal,
    } = this.state;

    return (
      <div className="col-md-8 ms-4 bg-white p-4 rounded container-changepassword">
        <h2 className="mb-4 title-menu-user">Đổi mật khẩu</h2>
        <Modal
          title="Thông báo"
          open={isModalOpen}
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          {textModal}
        </Modal>
        <form>
          {/* Email */}
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="oldpassword"
              placeholder="Enter email"
              value={oldpassword}
              onChange={(event) =>
                this.handleonChangePass(event, event.target.id)
              }
            />
            <label htmlFor="email">Mật khẩu cũ</label>
          </div>

          {/* Mật khẩu mới */}
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="newpassword"
              placeholder="New Password"
              value={newpassword}
              onChange={(event) =>
                this.handleonChangePass(event, event.target.id)
              }
            />
            <label htmlFor="new-password">Mật khẩu mới</label>
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) =>
                this.handleonChangePass(event, event.target.id)
              }
            />
            <label htmlFor="confirm-password">Nhập lại mật khẩu mới</label>
            <small className="form-text text-muted alert-notify">
              {this.state.notify}
            </small>
          </div>

          <Button
            type="primary"
            ghost
            onClick={(event) => this.handleSubmit(event)}
          >
            Xác nhận
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // lang: state.app.language,
    // isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    // fetchLoginStart: (username, password) =>
    //   dispatch(actions.fetchLoginStart(username, password)),
    fetchLoginSuccess: (userInfo) =>
      dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
//export default ChangePassword;
