import { useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // A mock of predefined credentials
  const validUsername = "admin";
  const validPassword = "password123";

  // Login function
  const login = (username, password) => {
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      setUser(username); // Store user information (optional)
      return true; // Return true if login is successful
    }
    return false; // Return false if login fails
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
}
