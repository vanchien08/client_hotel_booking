import actionTypes from "../actions/actionTypes";

let Istate = {
  errCode: 0,
  errMessage: "",
  userInfo: null,
  isLoggedIn: false,
};

const userReducer = (state = Istate, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_START:
      return {
        ...state,
      };

    case actionTypes.USER_LOGIN_SUCCESS:
      console.log(
        "fire succes ",
        action.data,
        action.data?.roles?.[0]?.role || 0
      );
      return {
        ...state,
        errCode: action.data?.errCode || 0,
        errMessage: action.data?.errMessage || "",
        userInfo: action.data || null,
        isLoggedIn: true,
        role: action.data?.roles?.[0]?.role || 0,
      };

    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        errCode: action.data?.errCode || -1,
        errMessage: action.data?.errMessage || "Đăng nhập thất bại",
      };

    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null, // Reset thông tin user khi logout
        errCode: 0,
        errMessage: "",
      };

    default:
      return state;
  }
};

export default userReducer;
