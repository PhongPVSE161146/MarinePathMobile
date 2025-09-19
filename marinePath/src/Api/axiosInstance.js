import axios from "axios";
import { MARINE_PATH } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../Api/Auth/AuthService";

const axiosInstance = axios.create({
  baseURL: MARINE_PATH || "http://34.31.110.97:5190",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 15000,
});

// Interceptor để thêm Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request:", { url: config.url, data: config.data });
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi 401 và làm mới token
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu để tránh vòng lặp vô hạn
      try {
        const refreshResult = await AuthService.refreshToken();
        if (refreshResult.success) {
          // Cập nhật header với token mới và thử lại yêu cầu gốc
          originalRequest.headers.Authorization = `Bearer ${await AsyncStorage.getItem("userToken")}`;
          return axiosInstance(originalRequest);
        } else {
          // Chuyển hướng về LoginScreen nếu refresh thất bại
          // Lưu ý: Navigation không thể gọi trực tiếp ở đây, cần xử lý trong component
          console.error("Refresh token failed:", refreshResult.message);
          await AsyncStorage.multiRemove(["userToken", "refreshToken"]);
          return Promise.reject(new Error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."));
        }
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError.message);
        await AsyncStorage.multiRemove(["userToken", "refreshToken"]);
        return Promise.reject(new Error("Lỗi làm mới token. Vui lòng đăng nhập lại."));
      }
    }

    let errorMessage = "Lỗi không xác định";
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        (error.response.data?.errors ? error.response.data.errors.join(", ") : `Lỗi server (mã: ${error.response.status})`);
    } else if (error.request) {
      errorMessage = "Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối.";
    } else {
      errorMessage = error.message || "Lỗi khi gửi yêu cầu";
    }
    console.error("Axios error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;