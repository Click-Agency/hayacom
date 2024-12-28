import axiosInstance from "..";
import { apiRoutes } from "../../config";
import { FormUser } from "../../types/user";

const getMe = () => axiosInstance.get(apiRoutes.users.me);

const updateMe = (userData: FormUser) =>
  axiosInstance.patch(apiRoutes.users.me, userData);

const deleteMe = () => axiosInstance.delete(apiRoutes.users.me);

export { getMe, updateMe, deleteMe };
