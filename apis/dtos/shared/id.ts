import { z } from "zod";

export const IdSchema = z
  .string({ message: "Please provide a valid id" })
  .uuid({ message: "Please provide a valid id" });

export type IdDTO = z.infer<typeof IdSchema>;
