import axios from 'axios';
import { Platform } from 'react-native';

const commonConfigs = {
  baseURL: 'https://67bbf797ed4861e07b38b3c1.mockapi.io/',
  timeout: 10000,
  headers: {
    buildversion: '1.0.0',
    buildnumber: 1,
    platform: Platform.OS,
  },
};

const instance = axios.create(commonConfigs);

// Xử lý lỗi API
const responseError = (error) => {
  if (!error.response) {
    return { isError: true, message: "No response from server" };
  }
  return {
    isError: true,
    status: error.response.status,
    message: error.response.data || "Unknown error",
  };
};

// Cấu hình gọi API với xử lý lỗi
export const api = {
  get: (url, config) =>
    instance.get(url, config).then((res) => res.data).catch(responseError),
  post: (url, data, config) =>
    instance.post(url, data, config).then((res) => res.data).catch(responseError),
  put: (url, data, config) =>
    instance.put(url, data, config).then((res) => res.data).catch(responseError),
  delete: (url, config) =>
    instance.delete(url, config).then((res) => res.data).catch(responseError),
};
