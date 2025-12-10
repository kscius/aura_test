import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

/**
 * POST /api/auth/register
 * Registers a new user
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * Authenticates a user and returns a JWT
 */
router.post("/login", login);

export default router;

