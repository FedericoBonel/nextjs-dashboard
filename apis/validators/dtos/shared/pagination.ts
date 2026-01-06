import { z } from "zod";
import { createValidationResult } from "../../create-validation-result";

export const pageSchema = z.coerce
  .number({ message: "Please provide a valid page number" })
  .int({ message: "Please provide a valid page number" })
  .min(1, "Please provide a page number of at least 1")
  .max(1000, "Please provide a page number of at most 1000");

export type PageDTO = z.infer<typeof pageSchema>;

/** Creates and validates a page number as received from the web */
export const validatePageDTO = (receivedData: unknown) => {
  const validatedData = pageSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export const limitSchema = z.coerce
  .number({ message: "Please provide a valid limit number" })
  .int({ message: "Please provide a valid limit number" })
  .min(1, "Please provide a limit number of at least 1")
  .max(1000, "Please provide a limit number of at most 1000");

export type LimitDTO = z.infer<typeof limitSchema>;

/** Creates and validates a limit of items per page number as received from the web */
export const validateLimitDTO = (receivedData: unknown) => {
  const validatedData = limitSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};
