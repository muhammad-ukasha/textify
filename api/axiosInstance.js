import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.183:3000/api/v1/", // Replace with your backend base URL
    timeout: 20000, // Timeout after 20 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
