import { Router } from "express";
import { getProfile, updateProfile, listUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * GET /api/users/profile
 * Obtiene el perfil del usuario autenticado
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * PUT /api/users/profile
 * Actualiza el perfil del usuario autenticado
 */
router.put("/profile", authMiddleware, updateProfile);

/**
 * GET /api/users
 * Lista todos los usuarios (requiere autenticación)
 */
router.get("/", authMiddleware, listUsers);

export default router;

