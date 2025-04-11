import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Register.scss";
import { handleRegisterApi } from "../../services/userService";
const Register = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    address: "",
    email: "",
    gender: "1",
    birthday: "",
    phone: "",
    errMessage: "",
    avatarPreview: null,
    avatarFile: null,
  });

  const handleOnChangeInput = (event, id) => {
    setFormData({
      ...formData,
      [id]: event.target.value,
    });
  };

  const handleOnChangeAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          avatarFile: file,
          avatarPreview: URL.createObjectURL(file),
        });
      }
    }
  };

  const checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "username",
      "password",
      "confirmPassword",
      "name",
      "email",
      "phone",
    ];
    let errMessage = "";

    for (let i = 0; i < arrInput.length; i++) {
      if (!formData[arrInput[i]]) {
        isValid = false;
        errMessage = `Vui lòng nhập đầy đủ thông tin ở trường ${arrInput[i]}`;
        break;
      }
    }

    if (isValid && formData.password !== formData.confirmPassword) {
      isValid = false;
      errMessage = "Mật khẩu không trùng khớp";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isValid && !emailRegex.test(formData.email)) {
      isValid = false;
      errMessage = "Email không hợp lệ";
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (isValid && !phoneRegex.test(formData.phone)) {
      isValid = false;
      errMessage = "Số điện thoại không hợp lệ";
    }

    setFormData({ ...formData, errMessage });
    return isValid;
  };

  const handleRegister = async () => {
    let { username, name, password, phone, email, address } = formData;
    let isValid = checkValidateInput();
    if (isValid) {
      let respon = await handleRegisterApi(
        username,
        name,
        password,
        phone,
        email,
        address
      );
      console.log("Register data respon :", respon);
      if (respon.errCode == 1) {
        handleNavigate("/login");
      } else {
        setFormData({ ...formData, errMessage: respon.errMessage });
      }
    }
  };

  const handleNavigate = (path) => {
    if (props.navigate) {
      props.navigate(path);
    }
  };

  return (
    <div className="background-register">
      <div className="content-register compact">
        <div className="container-register">
          <div className="title-form-register text-center">
            ĐĂNG KÝ TÀI KHOẢN
          </div>

          <div className="register-form">
            {formData.errMessage && (
              <div className="error-message">{formData.errMessage}</div>
            )}

            <div className="form-grid">
              {/* Column 1 */}
              <div className="form-column">
                <div className="form-group mini">
                  <label>Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control input-register"
                    placeholder="Nhập tên đăng nhập"
                    value={formData.username}
                    onChange={(event) => handleOnChangeInput(event, "username")}
                  />
                </div>

                <div className="form-group mini">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    className="form-control input-register"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={(event) => handleOnChangeInput(event, "name")}
                  />
                </div>

                <div className="form-group mini">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control input-register"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={(event) => handleOnChangeInput(event, "email")}
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="form-column">
                <div className="form-row">
                  <div className="form-group mini half">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control input-register"
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={(event) =>
                        handleOnChangeInput(event, "password")
                      }
                    />
                  </div>

                  <div className="form-group mini half">
                    <label>Xác nhận</label>
                    <input
                      type="password"
                      className="form-control input-register"
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={(event) =>
                        handleOnChangeInput(event, "confirmPassword")
                      }
                    />
                  </div>
                </div>

                <div className="form-group mini">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control input-register"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={(event) => handleOnChangeInput(event, "phone")}
                  />
                </div>

                <div className="form-group mini">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control input-register"
                    placeholder="Nhập địa chỉ"
                    value={formData.address}
                    onChange={(event) => handleOnChangeInput(event, "address")}
                  />
                </div>
              </div>
            </div>

            <div className="button-container">
              <button
                className="btn register-button"
                onClick={() => handleRegister()}
              >
                Đăng ký
              </button>

              <div className="login-link">
                Đã có tài khoản?
                <span onClick={() => handleNavigate("/login")}>Đăng nhập</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // registerNewUser: (userData) => dispatch(actions.registerNewUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
