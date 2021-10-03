import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const access_token = localStorage.getItem('@Wallet:token');
    if (error.response.status === 401 && access_token) {
      // Talvez fazer um refresh token aqui
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const access_token = localStorage.getItem('@Wallet:token');

    if (access_token) {
      if (typeof config.headers !== 'undefined') {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default api;
