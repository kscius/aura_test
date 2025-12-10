import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Middleware de autenticación
 * Verifica el JWT token en el header Authorization
 * y adjunta la información del usuario al request
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "UnauthorizedError",
        message: "No token provided",
      });
      return;
    }

    const token = authHeader.substring(7); // Remover "Bearer "
    const decoded = verifyToken(token);

    // Adjuntar información del usuario al request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    res.status(401).json({
      error: "UnauthorizedError",
      message: "Invalid or expired token",
    });
  }
};

