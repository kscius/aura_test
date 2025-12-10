import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../validation/auth.validation";

const userRepository = AppDataSource.getRepository(User);

/**
 * Registers a new user
 * 
 * Design decision: We check for email uniqueness before creating the user
 * to provide a clear error message. The database also has a unique constraint
 * as a safety net, but checking first gives better UX.
 * 
 * TODO: Send welcome email after successful registration
 * TODO: Add email verification flow (send confirmation link, verify token)
 */
export const registerUser = async (data: RegisterInput) => {
  // Check if email already exists to provide clear error before DB constraint violation
  const existingUser = await userRepository.findOne({
    where: { email: data.email },
  });

  if (existingUser) {
    const error: any = new Error("Email already in use");
    error.status = 400;
    error.name = "BadRequestError";
    throw error;
  }

  // Hash password with bcrypt (10 rounds) before storing
  // We never store plain text passwords for security
  const passwordHash = await hashPassword(data.password);
  const user = userRepository.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    passwordHash,
  });

  await userRepository.save(user);

  // Generate JWT token immediately so user is logged in after registration
  const token = generateToken({ id: user.id, email: user.email });

  // Return user data without password hash
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
 * 
 * Security note: We use the same error message for "user not found" and
 * "wrong password" to prevent email enumeration attacks.
 * 
 * TODO: Implement rate limiting to prevent brute force attacks
 * TODO: Add account lockout after N failed login attempts
 * TODO: Log failed login attempts for security monitoring
 */
export const loginUser = async (data: LoginInput) => {
  const user = await userRepository.findOne({
    where: { email: data.email },
  });

  if (!user) {
    // Use generic error message to prevent email enumeration
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    error.name = "UnauthorizedError";
    throw error;
  }

  // Compare provided password with stored hash using bcrypt
  const isPasswordValid = await comparePassword(data.password, user.passwordHash);

  if (!isPasswordValid) {
    // Use same error message as above for security
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    error.name = "UnauthorizedError";
    throw error;
  }

  // Generate fresh JWT token for this session
  const token = generateToken({ id: user.id, email: user.email });

  // Return user data without password hash
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

