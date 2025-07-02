import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Get token from cookies
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Create a new post
export const createPost = async ({ title, content }) => {
  try {
    const response = await axios.post(
      `${API_URL}/posts`,
      { title, content },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error creating post:", err);
    throw err.response?.data || { message: "Failed to create post" };
  }
};

// Get all posts (optional helper)
export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
