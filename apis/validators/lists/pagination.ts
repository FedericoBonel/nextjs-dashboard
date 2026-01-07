import { LimitSchema, PageSchema } from "@/apis/dtos/shared/pagination";

import { createValidationResult } from "../create-validation-result";

/** Validates and returns a page number as received from the web */
export const validatePageDTO = (receivedData: unknown) => {
  const validatedData = PageSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

/** Validates and returns a limit of items per page number as received from the web */
export const validateLimitDTO = (receivedData: unknown) => {
  const validatedData = LimitSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};
