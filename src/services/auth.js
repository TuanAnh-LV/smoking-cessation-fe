import apiClient from "./api";
import Cookies from "js-cookie";

const authService = {
  // Đăng nhập
  login: async (email, password) => {
    try {
      console.log("Attempting login with:", { email }); // Debug log
      const response = await apiClient.post("/api/Authen/Login", {
        email,
        password,
      });

      console.log("Full API Response:", response);

      if (response.data) {
        console.log("Response data structure:", response.data);

        const token = response.data.Token || response.data.token;
        console.log("Extracted token:", token);

        if (token) {
          console.log("Setting authToken cookie..."); // Debug log
          console.log("Token value before setting cookie:", token); // Debug log
          Cookies.set("authToken", token, {
            expires: 7,
            path: "/",
            sameSite: "Lax",
          });

          const savedToken = Cookies.get("authToken");
          console.log("Saved token in cookie:", savedToken);

          // Dispatch custom event for auth state change
          window.dispatchEvent(new Event("authStateChange"));
          console.log("Dispatched authStateChange event"); // Debug log

          if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }

          return response.data;
        } else {
          console.error("No token found in response");
          throw new Error("No token received from server");
        }
      }

      return response.data;
    } catch (error) {
      console.error("Login Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // Đăng xuất
  logout: () => {
    Cookies.remove("authToken"); // Xóa token khỏi cookies
    localStorage.removeItem("user"); // Xóa thông tin user khỏi localStorage (nếu có)
    // Chuyển hướng về trang login
    window.location.href = "/login";
  },

  // Kiểm tra trạng thái đăng nhập bằng cách kiểm tra token trong cookies
  isAuthenticated: () => {
    return !!Cookies.get("authToken");
  },

  // Lấy thông tin user hiện tại (nếu được lưu trong localStorage)
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
