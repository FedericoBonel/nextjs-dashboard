import { UserCredentialsSchema } from "@/apis/dtos/auth/credentials";
import { createValidationResult } from "../create-validation-result";

/** Validates and returns credentials as received from the web */
export const validateUserCredentialsDTO = (receivedData: unknown) => {
  const validatedData = UserCredentialsSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};
