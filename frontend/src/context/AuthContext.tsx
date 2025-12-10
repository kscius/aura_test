import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, LoginData, RegisterData } from "../types";
import * as api from "../api/client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication context provider
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if there's a saved token when loading the app
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      
      if (token) {
        try {
          // Get user profile
          const response = await api.getProfile();
          setUser(response.data);
        } catch (error) {
          // If token is invalid, remove it
          api.removeToken();
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Logs in
   */
  const login = async (credentials: LoginData) => {
    const response = await api.loginUser(credentials);
    api.saveToken(response.data.token);
    setUser(response.data.user);
  };

  /**
   * Registers a new user
   */
  const register = async (data: RegisterData) => {
    const response = await api.registerUser(data);
    api.saveToken(response.data.token);
    setUser(response.data.user);
  };

  /**
   * Logs out
   */
  const logout = () => {
    api.removeToken();
    setUser(null);
  };

  /**
   * Updates user data in the context
   */
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

