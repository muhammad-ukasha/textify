import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e02b-223-123-109-85.ngrok-free.app/api/v1", // Replace with your backend base URL
  //   timeout: 10000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
