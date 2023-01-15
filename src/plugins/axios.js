import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: "http://3.0.99.90:8085/api/v1/",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  store.dispatch("setLoading");
  config.headers = {
    Authorization: "Bearer " + store.state.adminGlobal.token,
  };
  return config;
});

api.interceptors.response.use((result) => {
  store.dispatch("setLoading");
  return result;
});
export default api;
