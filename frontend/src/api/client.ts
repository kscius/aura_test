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
 * Class to handle API errors
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
 * Gets the JWT token from localStorage
 */
const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

/**
 * Saves the JWT token to localStorage
 */
export const saveToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

/**
 * Removes the JWT token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem("auth_token");
};

/**
 * Helper function to make HTTP requests
 * 
 * This function wraps the native fetch API with our base URL and auth token
 * so all API calls share the same behavior and error handling logic.
 * 
 * Design decision: Centralized API client allows us to:
 * - Automatically attach JWT to all requests
 * - Handle errors consistently across the app
 * - Easily add interceptors (logging, retry logic) in one place
 * 
 * TODO: Add request retry logic with exponential backoff for network failures
 * TODO: Implement request/response interceptors for logging in development mode
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

  // Automatically attach JWT token to requests if user is authenticated
  // This eliminates the need to manually add auth headers in every API call
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    // Convert all HTTP errors to our custom ApiError class
    // This provides consistent error handling across all components
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
 * Registers a new user
 */
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Logs in with email and password
 */
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Gets the authenticated user's profile
 */
export const getProfile = async (): Promise<UserResponse> => {
  return fetchApi<UserResponse>("/api/users/profile");
};

/**
 * Updates the authenticated user's profile
 */
export const updateProfile = async (data: UpdateProfileData): Promise<UserResponse> => {
  return fetchApi<UserResponse>("/api/users/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * Gets the list of all users
 */
export const getUsers = async (): Promise<UsersListResponse> => {
  return fetchApi<UsersListResponse>("/api/users");
};

