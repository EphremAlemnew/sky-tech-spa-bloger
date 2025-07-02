import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toaster } from "../ui/toaster";

const LogoutPage = () => {
  useEffect(() => {
    // Clear auth token
    localStorage.removeItem("token");

    // Show logout toaster once
    toaster.create({
      title: `You have successfully logged out!`,
      type: "warning",
    });
  }, []);

  // Redirect to login page
  return <Navigate to="/login" />;
};

export default LogoutPage;
