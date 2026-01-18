import db from "@/apis/db/connection";
import { createUser, User } from "@/apis/models/user";

/** Gets a user by email */
export const getUserByEmail = async (email: string) => {
  try {
    const res =
      await db`SELECT * FROM users WHERE users.email = ${email} LIMIT 1`;

    if (!res[0]) {
      return undefined;
    }

    return createUser(res[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user by email.");
  }
};

/** Saves a user and returns it */
export const saveUser = async (newUser: Omit<User, "id">) => {
  try {
    const res = await db`
      INSERT INTO users (name, email, password)
      VALUES (${newUser.name}, ${newUser.email}, ${newUser.password})
      RETURNING *
    `;

    return createUser(res[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to save user.");
  }
};
