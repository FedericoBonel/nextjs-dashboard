import { CreateUserSchema } from "@/apis/dtos/users/create-user";
import { UserDetailsSchema } from "@/apis/dtos/users/user-details";

import { createValidationResult } from "../create-validation-result";

/** Validates and returns a create user DTO as received from the web */
export const validateCreateUserDTO = (receivedData: unknown) => {
  const validatedData = CreateUserSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

/** Validates and returns a user details DTO to be exposed to the web */
export const validateUserDetailsDTO = (receivedData: unknown) => {
  const validatedData = UserDetailsSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};
