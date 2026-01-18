import z from "zod";
import UserSchema from "./base-schema";

export const CreateUserSchema = UserSchema.omit({ id: true }).strict();

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
