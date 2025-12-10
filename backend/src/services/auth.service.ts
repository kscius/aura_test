import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../validation/auth.validation";

const userRepository = AppDataSource.getRepository(User);

/**
 * Registra un nuevo usuario
 */
export const registerUser = async (data: RegisterInput) => {
  // Verificar si el email ya existe
  const existingUser = await userRepository.findOne({
    where: { email: data.email },
  });

  if (existingUser) {
    const error: any = new Error("Email already in use");
    error.status = 400;
    error.name = "BadRequestError";
    throw error;
  }

  // Crear nuevo usuario
  const passwordHash = await hashPassword(data.password);
  const user = userRepository.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    passwordHash,
  });

  await userRepository.save(user);

  // Generar token
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
 * Autentica un usuario
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

  // Generar token
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

