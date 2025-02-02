import axios from "axios";
import { APP_CONFIG } from "@utils/config";

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
  withCredentials: false,
});

export { axiosInstance };
