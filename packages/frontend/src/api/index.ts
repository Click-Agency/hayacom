import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  headers: config.headers,
  withCredentials: true,
});

export default axiosInstance;
