import { User } from "@/apis/models/user";
import { CreateUserDTO } from "@/apis/dtos/users/create-user";
import { UserDetailsDTO } from "@/apis/dtos/users/user-details";
import { validateUserDetailsDTO } from "@/apis/validators/users";

import InternalServerError from "@/apis/utils/errors/InternalServerError";

/** Converts a user as received from the web to be created to a user model */
export const createUserDTOToUser = (
  createUser: CreateUserDTO
): Omit<User, "id"> => {
  return {
    name: createUser.name,
    email: createUser.email,
    password: createUser.password,
  };
};

/** Converts a user model to a user details DTO to be used in the web */
export const userToUserDetailsDTO = (savedUser: User): UserDetailsDTO => {
  const res = validateUserDetailsDTO(savedUser);

  if (!res.success) {
    throw new InternalServerError("The saved user has an unexpected schema");
  } else {
    return res.data;
  }
};
