import axios from "axios";
import { toast } from "sonner";

export interface ApiResponse<T> {
  data: {
    data: T;
    message: string;
    total?: number;
    pagination?: {
      page: number;
      total: number;
      total_pages: number;
    };
  };
  message?: string;
  status?: number;
}

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // atau sessionStorage / cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      // Token expired atau tidak valid
      console.warn("Token expired. Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect ke login
    }
    return toast.error("API Error 400");
  }
);

export default apiRequest;
