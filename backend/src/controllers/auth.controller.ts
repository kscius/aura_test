import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validation/auth.validation";

/**
 * Controlador para registro de usuario
 * POST /api/auth/register
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validar datos de entrada
    const validatedData = registerSchema.parse(req.body);

    // Registrar usuario
    const result = await registerUser(validatedData);

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador para login de usuario
 * POST /api/auth/login
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validar datos de entrada
    const validatedData = loginSchema.parse(req.body);

    // Autenticar usuario
    const result = await loginUser(validatedData);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

