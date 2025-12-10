import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { UpdateProfileInput } from "../validation/auth.validation";

const userRepository = AppDataSource.getRepository(User);

/**
 * Obtiene el perfil de un usuario por ID
 */
export const getUserProfile = async (userId: number) => {
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    const error: any = new Error("User not found");
    error.status = 404;
    error.name = "NotFoundError";
    throw error;
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * Actualiza el perfil de un usuario
 */
export const updateUserProfile = async (
  userId: number,
  data: UpdateProfileInput
) => {
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    const error: any = new Error("User not found");
    error.status = 404;
    error.name = "NotFoundError";
    throw error;
  }

  // Verificar si el nuevo email ya existe (si se está actualizando)
  if (data.email && data.email !== user.email) {
    const existingUser = await userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      const error: any = new Error("Email already in use");
      error.status = 400;
      error.name = "BadRequestError";
      throw error;
    }
  }

  // Actualizar campos
  if (data.email) user.email = data.email;
  if (data.firstName) user.firstName = data.firstName;
  if (data.lastName) user.lastName = data.lastName;

  await userRepository.save(user);

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * Obtiene la lista de todos los usuarios
 */
export const getAllUsers = async () => {
  const users = await userRepository.find({
    select: ["id", "email", "firstName", "lastName", "createdAt"],
    order: { createdAt: "DESC" },
  });

  return users;
};

