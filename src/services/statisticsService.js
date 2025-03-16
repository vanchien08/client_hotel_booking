import axios from "../axios";

const handleStatisticApi = () => {
  return axios.get("/getStatitistic");
};

export { handleStatisticApi };
