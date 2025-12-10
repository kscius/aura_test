import { Request, Response, NextFunction } from "express";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../services/user.service";
import { updateProfileSchema } from "../validation/auth.validation";

/**
 * Controller to get the authenticated user's profile
 * GET /api/users/profile
 */
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const profile = await getUserProfile(req.user.id);

    res.status(200).json({
      message: "Profile retrieved successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update the authenticated user's profile
 * PUT /api/users/profile
 */
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Validate input data
    const validatedData = updateProfileSchema.parse(req.body);

    // Update profile
    const updatedProfile = await updateUserProfile(req.user.id, validatedData);

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get the list of all users
 * GET /api/users
 */
export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

