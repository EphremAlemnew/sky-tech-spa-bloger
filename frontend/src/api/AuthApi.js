import axios from "axios";
import Cookies from "js-cookie";

const API_AUTH_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_AUTH_URL,
  withCredentials: true,
});

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
};

export const getMe = async () => {
  const token = Cookies.get("token");

  if (!token) throw new Error("No token found");

  try {
    const response = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (err) {
    console.error("Logout failed");
  }
};

export const register = async ({ email, name, password }) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/auth/register`, {
      email,
      name,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error.response?.data || new Error("Registration failed");
  }
};
