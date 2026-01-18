import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const createUser = (row: unknown): User => {
  const isUser = userSchema.safeParse(row);

  if (!isUser.success) {
    throw new Error("Invalid customer data");
  }

  return isUser.data;
};
