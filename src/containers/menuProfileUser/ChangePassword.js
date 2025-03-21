import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./ChangePassword.scss";
// import * as actions from "../../store/actions";
import * as actions from "../../store/actions";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userInfo,
      oldpassword: "",
      newpassword: "",
      confirmPassword: "",
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
    this.setState({
      [id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit state", this.state);
  };

  render() {
    let { user, oldpassword, newpassword, confirmPassword } = this.state;

    return (
      <div className="col-md-8 ms-4 bg-white p-4 rounded container-changepassword">
        <h2 className="mb-4 title-menu-user">Đổi mật khẩu</h2>
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
              Mật khẩu cũ không chính xác !
            </small>
          </div>

          <button
            className="btn btn-primary button-change-password"
            onClick={(event) => this.handleSubmit(event)}
          >
            Xác nhận
          </button>
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
