import { z } from "zod";

export const PageSchema = z.coerce
  .number({ message: "Please provide a valid page number" })
  .int({ message: "Please provide a valid page number" })
  .min(1, "Please provide a page number of at least 1")
  .max(1000, "Please provide a page number of at most 1000");

export type PageDTO = z.infer<typeof PageSchema>;

export const LimitSchema = z.coerce
  .number({ message: "Please provide a valid limit number" })
  .int({ message: "Please provide a valid limit number" })
  .min(1, "Please provide a limit number of at least 1")
  .max(1000, "Please provide a limit number of at most 1000");

export type LimitDTO = z.infer<typeof LimitSchema>;
