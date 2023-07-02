import axios, { AxiosInstance } from "axios";

export const InstanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
