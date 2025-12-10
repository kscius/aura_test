import { z } from "zod";

/**
 * Schema de validación para registro de usuario
 */
export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Schema de validación para login
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Schema de validación para actualización de perfil
 */
export const updateProfileSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

