import axios from "../axios";

const handelLoginApi = (username, password) => {
  return axios.post("/login", { username, password });
};

const handelGetUserApi = () => {
  return axios.post("/getAllUser");
};

export { handelLoginApi, handelGetUserApi };
