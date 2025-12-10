import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../validation/auth.validation";

const userRepository = AppDataSource.getRepository(User);

/**
 * Registers a new user
 */
export const registerUser = async (data: RegisterInput) => {
  // Check if email already exists
  const existingUser = await userRepository.findOne({
    where: { email: data.email },
  });

  if (existingUser) {
    const error: any = new Error("Email already in use");
    error.status = 400;
    error.name = "BadRequestError";
    throw error;
  }

  // Create new user
  const passwordHash = await hashPassword(data.password);
  const user = userRepository.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    passwordHash,
  });

  await userRepository.save(user);

  // Generate token
  const token = generateToken({ id: user.id, email: user.email });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};

/**
 * Authenticates a user
 */
export const loginUser = async (data: LoginInput) => {
  const user = await userRepository.findOne({
    where: { email: data.email },
  });

  if (!user) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    error.name = "UnauthorizedError";
    throw error;
  }

  const isPasswordValid = await comparePassword(data.password, user.passwordHash);

  if (!isPasswordValid) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    error.name = "UnauthorizedError";
    throw error;
  }

  // Generate token
  const token = generateToken({ id: user.id, email: user.email });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};

