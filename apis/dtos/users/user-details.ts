import z from "zod";
import UserSchema from "./base-schema";

export const UserDetailsSchema = UserSchema.omit({ password: true });

export type UserDetailsDTO = z.infer<typeof UserDetailsSchema>;
