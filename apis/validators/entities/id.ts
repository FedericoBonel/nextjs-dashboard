import { IdSchema } from "@/apis/dtos/shared/id";

import { createValidationResult } from "../create-validation-result";

/** Validates and returns an ID as received from the web */
const validateIdDTO = (receivedData: unknown) => {
  const validatedData = IdSchema.safeParse(receivedData);
  return createValidationResult(validatedData);
};

export default validateIdDTO;
