import axios, { AxiosError } from "axios";
import { entries, has, isObject, isString } from "lodash";

export const myAxios = axios.create({
  baseURL: "http://localhost:3005/api/v1",
});

myAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    config.headers["mac-address"] = "mac_address";
    return config;
  },
  (error) => Promise.reject(error)
);

interface IErrorData {
  error: Record<string, string[]> | string;
  status: number;
  message: string;
}

myAxios.interceptors.response.use(
  (response) => response,
  (e: AxiosError) => {
    const error: Record<string, any> = {};

    if (e?.response) {
      const { status } = e.response;
      error["status"] = status;
      const errorData = e.response.data as IErrorData;
      if (isObject(errorData.error)) {
        error["message"] = entries(errorData.error)
          .map(([key, value]) => {
            return `${key}: ${value.join(", ")}`;
          })
          .join(", ");
      } else if (isString(errorData.error)) {
        error["message"] = errorData.error;
      } else if (has(errorData, "message")) {
        error["message"] = errorData.message;
      }
      error["error"] = e.message;
    }

    return Promise.reject(error);
  }
);
