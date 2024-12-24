import { useEffect } from "react";
import axiosInstance from "../api";
import { getAccessToken } from "../api/routes/auth";
import { Session } from "../types/user";
import { getHeaderAuthorization, setHeaderAuthorization } from "../api/utils";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useCookies } from "react-cookie";
import Cookies from "../enum/Cookies";

const useSession = () => {
  const [cookies, , , updateCookies] = useCookies([Cookies.SESSION]);

  const session = cookies["hayakom-session"] as Session | undefined;

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<unknown>) => {
        if (!getHeaderAuthorization(config) && session?.accessToken)
          setHeaderAuthorization(config, session.accessToken);

        return config;
      },
      (error: unknown) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => res,
      async (error: {
        response: { status: number };
        config: InternalAxiosRequestConfig<unknown> & { _retry?: boolean };
      }) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!session) return Promise.reject(error);

          const res = await getAccessToken();

          session.accessToken = getHeaderAuthorization(res)!;
          updateCookies();
          setHeaderAuthorization(originalRequest, session.accessToken);

          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return session;
};

export default useSession;
