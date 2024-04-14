import axios from "axios"

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_SERVER_URL+"/api";

axiosInstance.defaults.withCredentials=true;



export default axiosInstance;