import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Authentication middleware
 * 
 * This middleware centralizes JWT validation so we can protect any route
 * by simply attaching it in the route definition. It also normalizes auth errors
 * into a consistent 401 response format.
 * 
 * Design decision: We use JWT stored in Authorization header (not cookies) to:
 * - Make the API truly stateless (no server-side session storage needed)
 * - Avoid CSRF vulnerabilities (no automatic cookie sending)
 * - Enable easy horizontal scaling (any server can validate any token)
 * 
 * TODO: Add token refresh mechanism for better UX (users won't need to re-login every 7 days)
 * TODO: Implement token blacklist for logout functionality (currently tokens remain valid until expiration)
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

    // Extract token by removing "Bearer " prefix (7 characters)
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    // Attach user information to request object for use in subsequent handlers
    // This avoids needing to decode the token multiple times
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    // All JWT errors (expired, malformed, invalid signature) are caught here
    // and normalized to a consistent 401 response
    res.status(401).json({
      error: "UnauthorizedError",
      message: "Invalid or expired token",
    });
  }
};

