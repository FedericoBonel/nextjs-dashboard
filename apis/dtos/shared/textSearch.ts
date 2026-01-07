import { z } from "zod";
import { LimitSchema, PageSchema } from "./pagination";

export const TextSearchSchema = z
  .string({ message: "Please provide a valid textSearch query" })
  .min(0, "Please provide a valid textSearch query with a minimum length of 0")
  .max(255, "Please provide a valid textSearch query");

export type TextSearchDTO = z.infer<typeof TextSearchSchema>;

export const PaginatedTextSearchSchema = z.object({
  textSearch: TextSearchSchema,
  page: PageSchema,
  limit: LimitSchema,
});

export type PaginatedTextSearchDTO = z.infer<typeof PaginatedTextSearchSchema>;
