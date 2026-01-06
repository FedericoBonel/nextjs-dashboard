import { z } from "zod";
import { createValidationResult } from "../../create-validation-result";
import { limitSchema, pageSchema } from "./pagination";

const textSearchSchema = z
  .string({ message: "Please provide a valid textSearch query" })
  .min(0, "Please provide a valid textSearch query with a minimum length of 0")
  .max(255, "Please provide a valid textSearch query");

export type TextSearchDTO = z.infer<typeof textSearchSchema>;

/** Creates and validates a text search query as received from the web */
const validateTextSearchDTO = (receivedData: unknown) => {
  const validatedData = textSearchSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export default validateTextSearchDTO;

const paginatedTextSearchSchema = z.object({
  textSearch: textSearchSchema,
  page: pageSchema,
  limit: limitSchema,
});

export type PaginatedTextSearchDTO = z.infer<typeof paginatedTextSearchSchema>;

/** Creates and validates a paginated text search query as received from the web */
export const validatePaginatedTextSearchDTO = (
  receivedTextSearch: unknown,
  receivedPage: unknown,
  receivedLimit: unknown
) => {
  const validatedData = paginatedTextSearchSchema.safeParse({
    textSearch: receivedTextSearch,
    page: receivedPage,
    limit: receivedLimit,
  });

  return createValidationResult(validatedData);
};
