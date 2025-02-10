import actionTypes from "./actionTypes";
import { handleLoginApi } from "../../services/userService";

export const fetchLoginStart = (username, password) => {
  return async (dispatch, getState) => {
    try {
      // console.log("fire action success");
      let res = await handleLoginApi(username, password);
      console.log("resss data >>", res);
      dispatch(fetchLoginSuccess(res));
    } catch (error) {}
  };
};

export const fetchLoginSuccess = (data) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  data: data,
});

export const fetchLoginFail = (data) => ({
  type: actionTypes.USER_LOGIN_FAIL,
  data: data,
});
