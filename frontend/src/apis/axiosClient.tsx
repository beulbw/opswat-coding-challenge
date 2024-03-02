import axios from "axios";

const AXIOS_INSTANCE = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json",
  },
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const USER_DATA = localStorage.getItem("USER_DATA");
  if (USER_DATA) {
    const token = JSON.parse(USER_DATA).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    } else {
      if (!error.response) {
        return Promise.reject({
          message: "An error has occured. Please try again.",
        });
      }
    }
    return Promise.reject({
      message:
        error.response?.data?.message ??
        "An error has occured. Please try again.",
    });
  }
);

export default AXIOS_INSTANCE;
