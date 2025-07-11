import axios from "axios";
import { toast } from "react-toastify";
import localStorageHelper from "../Storage";

const domainRL = import.meta.env.VITE_API_Domain;
const apiVersion = import.meta.env.VITE_API_Domain_VERSION;
const baseURL = domainRL + apiVersion;

// Create an Axios instance
const axiosPublic = axios.create({
  baseURL,
  // withCredentials: true,
});

// Add a request interceptor to dynamically set the Content-Type header
axiosPublic.interceptors.request.use(
  (config) => {
    if (localStorageHelper.getToken()) {
      config.headers.Authorization = `Bearer ${localStorageHelper.getToken()}`;
    }
    return config;
  },
  (error) => {
    console.log(Promise.reject(error));
  }
);

axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    console.log(error, "error from utils");

    if (error.message === "canceled") {
      return;
    }

    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error.message,
      {
        position: "bottom-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        className: "toast-message",
        progressClassName: "toast-message-progress",
      }
    );

    return Promise.reject(error);
  }
);

export { axiosPublic };
