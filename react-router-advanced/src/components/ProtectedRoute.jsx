import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const isAuthenticated = false; // Simulate authentication status
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
}

export default ProtectedRoute;
