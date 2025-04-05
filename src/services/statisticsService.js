import axios from "../axios";

const handleStatisticApi = () => {
  return axios.get("/getStatitistic");
};

const handleStatOvTimeApi = (key) => {
  return axios.post("/get-statistic-over-time", { key });
};
export { handleStatisticApi, handleStatOvTimeApi };
