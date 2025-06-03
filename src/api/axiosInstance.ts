import axios from "axios";

const API_TOKEN = import.meta.env.VITE_INTERX_TOKEN;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_INTERX_API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});
