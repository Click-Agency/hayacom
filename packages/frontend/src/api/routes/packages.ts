import axiosInstance from "..";
import { apiRoutes } from "../../config";
import { FormPackage, Package } from "../../types/packages";

const getPackages = (page = 0, limit = 0) =>
  axiosInstance.get(`${apiRoutes.packages}?page=${page}&limit=${limit}`);

const getPackageById = (_id: Package["_id"]) =>
  axiosInstance.get(`${apiRoutes.packages}/${_id}`);

const createPackage = (packageData: FormPackage) =>
  axiosInstance.post(apiRoutes.packages, packageData);

const updatePackage = (_id: Package["_id"], packageData: FormPackage) =>
  axiosInstance.patch(`${apiRoutes.packages}/${_id}`, packageData);

const deletePackage = (_id: Package["_id"]) =>
  axiosInstance.delete(`${apiRoutes.packages}/${_id}`);

export {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
