import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import variables from "./variables";

const getHeaderAuthorization = (
  res: AxiosResponse | InternalAxiosRequestConfig
) => {
  const authorization =
    (res.headers[variables.authorization] as string) || null;

  if (!authorization) return null;

  const bearer = authorization.split(" ");

  if (bearer.length !== 2 || bearer[0]?.toLowerCase() !== variables.bearer)
    return null;

  return bearer[1];
};

const setHeaderAuthorization = (
  res: AxiosResponse | InternalAxiosRequestConfig,
  token: string
) => (res.headers[variables.authorization] = `${variables.bearer} ${token}`);

export { getHeaderAuthorization, setHeaderAuthorization };
