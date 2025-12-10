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
 * Provider del contexto de autenticación
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un token guardado al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      
      if (token) {
        try {
          // Obtener perfil del usuario
          const response = await api.getProfile();
          setUser(response.data);
        } catch (error) {
          // Si el token es inválido, eliminarlo
          api.removeToken();
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Inicia sesión
   */
  const login = async (credentials: LoginData) => {
    const response = await api.loginUser(credentials);
    api.saveToken(response.data.token);
    setUser(response.data.user);
  };

  /**
   * Registra un nuevo usuario
   */
  const register = async (data: RegisterData) => {
    const response = await api.registerUser(data);
    api.saveToken(response.data.token);
    setUser(response.data.user);
  };

  /**
   * Cierra sesión
   */
  const logout = () => {
    api.removeToken();
    setUser(null);
  };

  /**
   * Actualiza los datos del usuario en el contexto
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
 * Hook personalizado para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

