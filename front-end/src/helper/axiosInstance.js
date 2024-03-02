import axios from "axios"

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = import.meta.env.VITE_BACK_END_URL+"/api";

axiosInstance.defaults.withCredentials=true;
axiosInstance.defaults.timeout=10000;


export default axiosInstance;