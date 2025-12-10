import type {
  AuthResponse,
  UserResponse,
  UsersListResponse,
  RegisterData,
  LoginData,
  UpdateProfileData,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Clase para manejar errores de la API
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public error: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Obtiene el token JWT del localStorage
 */
const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

/**
 * Guarda el token JWT en localStorage
 */
export const saveToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

/**
 * Elimina el token JWT del localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem("auth_token");
};

/**
 * Función helper para hacer peticiones HTTP
 */
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Agregar token de autenticación si existe
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error || "Error",
      data.message || "An error occurred",
      data.details
    );
  }

  return data;
};

/**
 * Registra un nuevo usuario
 */
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Inicia sesión con email y contraseña
 */
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Obtiene el perfil del usuario autenticado
 */
export const getProfile = async (): Promise<UserResponse> => {
  return fetchApi<UserResponse>("/api/users/profile");
};

/**
 * Actualiza el perfil del usuario autenticado
 */
export const updateProfile = async (data: UpdateProfileData): Promise<UserResponse> => {
  return fetchApi<UserResponse>("/api/users/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * Obtiene la lista de todos los usuarios
 */
export const getUsers = async (): Promise<UsersListResponse> => {
  return fetchApi<UsersListResponse>("/api/users");
};

