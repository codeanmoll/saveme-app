import axios from "axios";

const api = axios.create({
  baseURL: "http://10.65.137.209/api", // change this
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // IMPORTANT for PHP sessions
});

export default api;
