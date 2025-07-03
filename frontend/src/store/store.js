import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import commentsReducer from "../features/commentsSlice";
import authReducer from "../features/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
