import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

console.log("🔧 Auth routes file loaded");

/**
 * POST /api/auth/register
 * Registers a new user
 */
router.post("/register", (req, res, next) => {
  console.log("✅ /register route hit!");
  register(req, res, next);
});

/**
 * POST /api/auth/login
 * Authenticates a user and returns a JWT
 */
router.post("/login", (req, res, next) => {
  console.log("✅ /login route hit!");
  login(req, res, next);
});

console.log("✅ Auth router configured with /register and /login");

export default router;

