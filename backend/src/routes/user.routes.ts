import { Router } from "express";
import { getProfile, updateProfile, listUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * GET /api/users/profile
 * Gets the authenticated user's profile
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * PUT /api/users/profile
 * Updates the authenticated user's profile
 */
router.put("/profile", authMiddleware, updateProfile);

/**
 * GET /api/users
 * Lists all users (requires authentication)
 */
router.get("/", authMiddleware, listUsers);

export default router;

