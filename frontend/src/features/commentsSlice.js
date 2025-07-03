import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchByPostId",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/comments/post/${postId}`, {
        headers: getAuthHeaders(),
      });
      return { postId, comments: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to load comments"
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, content }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/comments`,
        { postId: String(postId), content },
        { headers: getAuthHeaders() }
      );
      return { postId, comment: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add comment"
      );
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byPostId: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.byPostId[postId] = comments;
        state.status = "succeeded";
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch comments";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (!state.byPostId[postId]) {
          state.byPostId[postId] = [];
        }
        state.byPostId[postId].push(comment);
      });
  },
});

export default commentsSlice.reducer;
