import _ from "lodash";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { InstanceAxios } from "../axios";

class HttpRestService {
  constructor(private axiosInstance: AxiosInstance) {}

  async get<T>(
    route: string,
    configs?: AxiosRequestConfig,
    errorHandlers?: () => void
  ): Promise<T> {
    return this.axiosInstance
      .get(route, configs)
      .then((data) => _.get(data, "data"))
      .catch(errorHandlers ? errorHandlers : () => null);
  }

  async post<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
    errorHandlers?: () => void
  ): Promise<R> {
    return this.axiosInstance
      .post(route, payload, configs)
      .then((data) => _.get(data, "data"))
      .catch(errorHandlers ? errorHandlers : () => null);
  }

  async patch<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
    errorHandlers?: () => void
  ): Promise<R> {
    return this.axiosInstance
      .patch(route, payload, configs)
      .then((data) => _.get(data, "data"))
      .catch(errorHandlers ? errorHandlers : () => null);
  }

  async delete<R>(
    route: string,
    configs?: AxiosRequestConfig,
    errorHandlers?: () => void
  ): Promise<R> {
    return this.axiosInstance
      .delete(route, configs)
      .then((data) => _.get(data, "data"))
      .catch(errorHandlers ? errorHandlers : () => null);
  }
}

export const HttpService = new HttpRestService(InstanceAxios);
