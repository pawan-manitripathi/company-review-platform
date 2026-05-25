import axios from "axios";

const api = axios.create({
  baseURL: "https://company-review-platform.onrender.com/api",
});

export default api;