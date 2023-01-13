import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: "http://3.0.99.90:8085/api/v1/",
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: "Bearer " + store.state.adminGlobal.token,
  };
  return config;
});

api.interceptors.response.use((result) => {
  return result;
});

export default api;
