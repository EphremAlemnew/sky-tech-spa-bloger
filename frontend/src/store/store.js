import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import commentsReducer from "../features/commentsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
