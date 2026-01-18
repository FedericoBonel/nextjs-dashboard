import bcrypt from "bcryptjs";

import { getUserByEmail, saveUser } from "@/apis/repositories/users";
import { CreateUserDTO } from "@/apis/dtos/users/create-user";
import { UserCredentialsDTO } from "@/apis/dtos/auth/credentials";

import BadRequestError from "@/apis/utils/errors/BadRequestError";
import UnauthorizedError from "@/apis/utils/errors/UnauthorizedError";

import {
  createUserDTOToUser,
  userToUserDetailsDTO,
} from "../utils/transformers/users";

const SALT = Number(process.env.REGISTRATION_SALT) ?? 12;

/** Registers a new user in the system */
export const registerUser = async (newUser: CreateUserDTO) => {
  // Check if the user exists already
  const foundUser = await getUserByEmail(newUser.email);
  if (foundUser) {
    throw new BadRequestError(
      "That email is already being used. Please provide another email."
    );
  }

  // Encrypt their password
  const salt = await bcrypt.genSalt(SALT);
  const userToSave = {
    ...newUser,
    password: await bcrypt.hash(newUser.password, salt),
  };

  // Save the user
  const savedUser = await saveUser(createUserDTOToUser(userToSave));

  // Return the new user
  return userToUserDetailsDTO(savedUser);
};

/** Authenticates a user to the system and returns it */
export const authenticateUser = async (credentials: UserCredentialsDTO) => {
  // Check the user with that email exists
  const foundUser = await getUserByEmail(credentials.email);

  if (!foundUser) {
    throw new UnauthorizedError(
      "The password or email are not correct or do not belong to any user"
    );
  }

  // Check the password matches
  const passwordMatches = await bcrypt.compare(
    credentials.password,
    foundUser.password
  );
  if (!passwordMatches) {
    throw new UnauthorizedError(
      "The password or email are not correct or do not belong to any user"
    );
  }

  // Return the user
  return userToUserDetailsDTO(foundUser);
};
