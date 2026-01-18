import z from "zod";

/** Base user schema */
export const userSchema = z.object({
  id: z
    .string({ message: "Please provide a valid id" })
    .uuid({ message: "Please provide a valid id" }),
  name: z
    .string({ message: "Please provide a name" })
    .min(1, "Please provide a name")
    .max(64, "Please provide a name that is at most 64 characters long"),
  email: z
    .string({ message: "Please provide a valid email" })
    .email({ message: "Please provide a valid email" }),
  password: z
    .string({ message: "Please provide a password" })
    .min(4, "Please provide a password that is at least 4 characters long")
    .max(
      32,
      "Message please provide a password that is at most 32 characters long"
    ),
});

export default userSchema;
