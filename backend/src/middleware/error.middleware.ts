import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

/**
 * Middleware central de manejo de errores
 */
export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error);

  // Error de validación Zod
  if (error instanceof ZodError) {
    res.status(400).json({
      error: "ValidationError",
      message: "Validation failed",
      details: error.errors,
    });
    return;
  }

  // Error personalizado con status
  if (error.status) {
    res.status(error.status).json({
      error: error.name || "Error",
      message: error.message,
      details: error.details || {},
    });
    return;
  }

  // Error genérico
  res.status(500).json({
    error: "InternalServerError",
    message: process.env.NODE_ENV === "development" 
      ? error.message 
      : "An unexpected error occurred",
    details: {},
  });
};

