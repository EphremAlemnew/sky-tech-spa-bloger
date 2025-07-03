import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "@/api/AuthApi";

export const fetchMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const data = await getMe();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Unauthorized");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
