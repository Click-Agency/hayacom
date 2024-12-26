import axiosInstance from "..";
import { apiRoutes } from "../../config";
import { Package } from "../../types/packages";

const getPackages = ({ page = 1, limit = 20 } = {}) =>
  axiosInstance.get(`${apiRoutes.packages}?page=${page}&limit=${limit}`);

const getPackageById = (_id: Package["_id"]) =>
  axiosInstance.get(`${apiRoutes.packages}/${_id}`);

const createPackage = (packageData: FormData) =>
  axiosInstance.post(apiRoutes.packages, packageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const updatePackage = (_id: Package["_id"], packageData: FormData) =>
  axiosInstance.patch(`${apiRoutes.packages}/${_id}`, packageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deletePackage = (_id: Package["_id"]) =>
  axiosInstance.delete(`${apiRoutes.packages}/${_id}`);

export {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
