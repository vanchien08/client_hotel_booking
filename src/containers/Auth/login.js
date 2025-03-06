import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./login.scss";
import * as actions from "../../store/actions";
import { handleLoginUserApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errCode: 0,
      username: "",
      password: "",
      notify: "",
    };
  }

  handlerKeyDown = (event) => {};

  async componentDidMount() {
    // let res = await handleLoginApi("vanchien", "12345");
    //  console.log("resss data >>", res);
    //  this.props.fetchLoginStart("vanchien", "12345");
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.errCode !== this.props.errCode) {
      this.setState({
        errCode: this.props.errCode,
      });
    }
  }

  handleNavigate = (path) => {
    this.props.navigate(path);
  };
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePw = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = async () => {
    // localStorage.clear();
    let { username, password } = this.state;
    let respon = await handleLoginUserApi(username, password);
    // let getlocal = localStorage.getItem("userInfor");
    let roleinf = -1;
    let isLogin = -1;
    if (respon.errCode === 1) {
      let role = respon.user.roles[0].role;
      isLogin = 1;

      if (role == 1) {
        localStorage.setItem("adminInfor", JSON.stringify(respon.user));
        roleinf = 1;
      } else {
        localStorage.setItem("userInfor", JSON.stringify(respon.user));
        roleinf = 0;
      }

      this.handleNavigate("/");
    } else {
      this.setState({
        notify: "Tài khoản hoặc mật khẩu không chính xác!",
      });
    }
    localStorage.setItem("isLogin", isLogin);
    localStorage.setItem("role", roleinf);
    // console.log("infor", respon);
  };

  render() {
    let { notify } = this.state;
    return (
      <div className="background-login">
        <div className="content-login">
          <div className="container-login">
            <div className="tittle-form-login col-12 text-center">LOGIN</div>

            <div className="account-form-login">
              <div class="form-group">
                <label for="exampleInputEmail1">Username </label>
                <input
                  type="text"
                  class="form-control input-login"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={(event) => this.handleOnChangeUsername(event)}
                />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control input-login"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePw(event)}
                />
              </div>
              <div className="notify-login-user">{notify}</div>
              <div className="row social-login">
                <div className="col-6 facebook text-center icon-login">
                  <i className="fab fa-facebook icon-fb-gg"></i>
                </div>

                <div className="col-6 google text-center icon-login">
                  <i className="fab fa-google icon-fb-gg"></i>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary login-button"
                onClick={(event) => this.handleSubmit(event)}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
    fetchLoginStart: (username, password) =>
      dispatch(actions.fetchLoginStart(username, password)),
    fetchLoginSuccess: (userInfo) =>
      dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
