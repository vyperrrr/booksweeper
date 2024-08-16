import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

axiosInstance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);