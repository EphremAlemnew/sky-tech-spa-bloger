import axios from "axios";
const API_AUTH_URL = import.meta.env.VITE_AUTH_API_URL; // Load from .env file

export const login = async (userName, password) => {
  try {
    const response = await axios.post(
      `${API_AUTH_URL}/login`,
      {
        username: userName,
        password: password, // Include password in the request body
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error to login:", error);
    throw new Error("Failed to login");
  }
};
