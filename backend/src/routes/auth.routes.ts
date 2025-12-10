import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

/**
 * POST /api/auth/register
 * Registra un nuevo usuario
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * Autentica un usuario y devuelve un JWT
 */
router.post("/login", login);

export default router;

