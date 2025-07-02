import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import ErrorPage from "./components/common/ErrorPage";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* <Route path="/" element={<PostList />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <HomeLayout>
              <Home />
            </HomeLayout>
            // </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
