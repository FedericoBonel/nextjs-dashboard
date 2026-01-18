import z from "zod";
import UserSchema from "../users/base-schema";

export const UserCredentialsSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export type UserCredentialsDTO = z.infer<typeof UserCredentialsSchema>;
