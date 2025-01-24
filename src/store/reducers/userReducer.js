import actionTypes from "../actions/actionTypes";
let Istate = {
  errCode: 0,
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
      let cpstate = { ...state };
      cpstate.errCode = action.data.errCode;
      cpstate.errMessage = action.data.errMessage;
      cpstate.userInfo = action.data;
      cpstate.isLoggedIn = true;
      console.log("fire action success");
      console.log("cpstate>>", action);
      return {
        ...cpstate,
        isLoggedIn: true,
        // adminInfo: action.adminInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        errCode: action.data.errCode,
        errMessage: action.data.errMessage,
      };

    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        //  errCode: action.data.errCode,
        //   errMessage: action.data.errMessage,
      };

    default:
      return state;
  }
};

export default userReducer;
