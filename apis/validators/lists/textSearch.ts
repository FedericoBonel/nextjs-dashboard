import {
  PaginatedTextSearchSchema,
  TextSearchSchema,
} from "@/apis/dtos/shared/textSearch";

import { createValidationResult } from "../create-validation-result";

/** Validates and returns a text search query as received from the web */
export const validateTextSearchDTO = (receivedData: unknown) => {
  const validatedData = TextSearchSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

/** Validates and returns a paginated text search query as received from the web */
export const validatePaginatedTextSearchDTO = (
  receivedTextSearch: unknown,
  receivedPage: unknown,
  receivedLimit: unknown
) => {
  const validatedData = PaginatedTextSearchSchema.safeParse({
    textSearch: receivedTextSearch,
    page: receivedPage,
    limit: receivedLimit,
  });

  return createValidationResult(validatedData);
};
