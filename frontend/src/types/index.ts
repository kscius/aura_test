// Data types for the application

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface UserResponse {
  message: string;
  data: User;
}

export interface UsersListResponse {
  message: string;
  data: User[];
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  email?: string;
  firstName?: string;
  lastName?: string;
}

