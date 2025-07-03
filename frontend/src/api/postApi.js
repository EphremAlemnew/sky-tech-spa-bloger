import axios from "axios";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const getAuthHeaders = (isFormData = false) => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };
};

export const createPostWithImages = async ({ title, content, images = [] }) => {
  const token = Cookies.get("token");
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);

  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const res = await axios.post(`${API_URL}/posts`, formData, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("Post creation error:", err);
    throw err.response?.data || { message: "Upload failed" };
  }
};

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

export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deletePost = async (id) => {
  try {
    const token = Cookies.get("token");

    const response = await axios({
      method: "delete",
      url: `${API_URL}/posts/${id}/`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    return response.status;
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
    throw error;
  }
};
