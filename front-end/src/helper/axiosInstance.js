import axios from "axios"

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://localhost:3001/api";
axiosInstance.defaults.withCredentials=true;
axiosInstance.defaults.timeout=10000;


export default axiosInstance;