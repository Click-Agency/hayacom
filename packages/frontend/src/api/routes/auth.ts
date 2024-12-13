import axiosInstance from "..";
import { apiRoutes } from "../../config";
import { Login, Register } from "../../types/auth";

const login = (credentials: Login) =>
  axiosInstance.post(apiRoutes.login, credentials);

const register = (userData: Register) =>
  axiosInstance.post(apiRoutes.register, userData);

const getAccessToken = () => axiosInstance.get(apiRoutes.refresh);

const revokeRefreshToken = () => axiosInstance.delete(apiRoutes.refresh);

export { login, register, getAccessToken, revokeRefreshToken };
