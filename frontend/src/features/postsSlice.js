import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { getAuthHeaders } from "@/api/postApi";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const token = Cookies.get("token");
  const response = await axios.get(`${API_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
