import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/Auth/login", {
        email: email.trim(),
        password,
      });

      console.log("API login response:", response);

      if (response && (response.succeeded || response.data?.accessToken)) {
        const { accessToken } = response.data || {};
        if (accessToken) {
          await AsyncStorage.setItem("userToken", accessToken);
        }
        return {
          success: true,
          data: response.data || response,
          message: response.message || "Đăng nhập thành công",
        };
      } else {
        return {
          success: false,
          message: response.message || "Đăng nhập thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi kết nối. Vui lòng thử lại.",
      };
    }
  },

  register: async ({ email, password, confirmPassword, firstName, lastName, gender, phone }) => {
    try {
      const response = await axiosInstance.post("/api/Auth/register", {
        email: email.trim(),
        password,
        confirmPassword,
        firstName,
        lastName,
        gender,
        phone,
      });

      console.log("API register response:", response);

      if (response && response.succeeded) {
        return {
          success: true,
          data: response.data || response,
          message: response.message || "Đăng ký thành công. Vui lòng xác minh OTP.",
        };
      } else {
        return {
          success: false,
          message: response.message || "Đăng ký thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Register error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi kết nối. Vui lòng thử lại.",
      };
    }
  },

  verifyOtp: async (email, otp) => {
    try {
      const response = await axiosInstance.post("/api/Auth/verify-otp", {
        email: email.trim(),
        otp,
      });

      console.log("API verify OTP response:", response);

      if (response && (response.succeeded || response.data?.accessToken)) {
        const { accessToken } = response.data || {};
        if (accessToken) {
          await AsyncStorage.setItem("userToken", accessToken);
        }
        return {
          success: true,
          data: response.data || response,
          message: response.message || "Xác minh OTP thành công",
        };
      } else {
        return {
          success: false,
          message: response.message || "Xác minh OTP thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Verify OTP error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi kết nối. Vui lòng thử lại.",
      };
    }
  },

  resendOtp: async (email) => {
    try {
      const response = await axiosInstance.post("/api/Auth/resend-otp", {
        email: email.trim(),
      });

      console.log("API resend OTP response:", response);

      if (response && response.succeeded) {
        return {
          success: true,
          data: response.data || response,
          message: response.message || "Mã OTP đã được gửi lại",
        };
      } else {
        return {
          success: false,
          message: response.message || "Gửi lại OTP thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Resend OTP error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi kết nối. Vui lòng thử lại.",
      };
    }
  },
  refreshToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        return {
          success: false,
          message: "Không tìm thấy refresh token.",
        };
      }

      const response = await axiosInstance.post("/api/Auth/refresh", {
        refreshToken,
      });

      console.log("API refresh token response:", response);

      if (response && response.succeeded && response.data?.accessToken) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        if (accessToken) {
          await AsyncStorage.setItem("userToken", accessToken);
        }
        if (newRefreshToken) {
          await AsyncStorage.setItem("refreshToken", newRefreshToken);
        }
        return {
          success: true,
          data: response.data,
          message: response.message || "Làm mới token thành công",
        };
      } else {
        // Clear tokens if refresh fails
        await AsyncStorage.multiRemove(["userToken", "refreshToken"]);
        return {
          success: false,
          message: response.message || "Làm mới token thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Refresh token error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      // Clear tokens on refresh failure
      await AsyncStorage.multiRemove(["userToken", "refreshToken"]);
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi làm mới token. Vui lòng đăng nhập lại.",
      };
    }
  },
 googleLogin: async (idToken) => {
    try {
      const response = await axiosInstance.post("/api/Auth/google-login", {
        idToken,
      });

      console.log("API Google login response:", response);

      if (response && (response.succeeded || response.data?.accessToken)) {
        const { accessToken, refreshToken } = response.data || {};
        if (accessToken) {
          await AsyncStorage.setItem("userToken", accessToken);
        }
        if (refreshToken) {
          await AsyncStorage.setItem("refreshToken", refreshToken);
        }
        return {
          success: true,
          data: response.data || response,
          message: response.message || "Đăng nhập Google thành công",
        };
      } else {
        return {
          success: false,
          message: response.message || "Đăng nhập Google thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Google login error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi đăng nhập Google. Vui lòng thử lại.",
      };
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post("/api/Auth/forgot-password", {
        email: email.trim(),
      });

      console.log("API forgot password response:", response);

      if (response && response.succeeded) {
        return {
          success: true,
          data: response.data || response,
          message: response.message || "Mã OTP đã được gửi để đặt lại mật khẩu",
        };
      } else {
        return {
          success: false,
          message: response.message || "Gửi yêu cầu đặt lại mật khẩu thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Forgot password error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi kết nối. Vui lòng thử lại.",
      };
    }
  },
   verifyForgotPasswordOtp: async ({ email, otp, newPassword, confirmPassword }) => {
    try {
      const response = await axiosInstance.post("/api/Auth/verify-forgot-password-otp", {
        email: email.trim(),
        otp,
        newPassword,
        confirmPassword,
      });

      console.log("API verify forgot password OTP response:", response);

      if (response && response.succeeded) {
        return {
          success: true,
          data: response.data || response,
          message: response.message || "Đặt lại mật khẩu thành công",
        };
      } else {
        return {
          success: false,
          message: response.message || "Xác minh OTP để đặt lại mật khẩu thất bại",
        };
      }
    } catch (error) {
      console.error(
        "Verify forgot password OTP error:",
        error.message,
        error.response ? error.response.data : "No response data"
      );
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Lỗi kết nối. Vui lòng thử lại.",
      };
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.multiRemove(["userToken", "refreshToken"]);
      return { success: true, message: "Đăng xuất thành công" };
    } catch (error) {
      console.error("Logout error:", error.message);
      return { success: false, message: "Lỗi đăng xuất. Vui lòng thử lại." };
    }
  },
};

export default AuthService;