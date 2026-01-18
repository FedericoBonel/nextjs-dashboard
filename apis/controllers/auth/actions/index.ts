"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn, signOut } from "@/lib/auth";

import { ActionState } from "../../types";
import {
  createInternalServerError,
  createUnauthorizedError,
} from "../../action-state";

/** Signs a user on */
export const authenticateUser = async (
  previousState: ActionState,
  credentials: FormData,
): Promise<ActionState> => {
  try {
    await signIn("credentials", credentials);
  } catch (error) {
    // If NextAuth went well this is going to be returned by redirect()
    if (isRedirectError(error)) throw error;

    // This will be thrown if the credentials are invalid
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return createUnauthorizedError(
          "The credentials provided don't match any user",
        );
      }
    }

    // This is an unexpected error
    return createInternalServerError();
  }

  // In principle we shouldn't hit this, but in case we do, just returning previous state
  return previousState;
};

/** Signs the logged in user off */
export const unauthenticateUser = async (previousState: ActionState) => {
  try {
    await signOut({ redirectTo: "/sign-in" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return createInternalServerError();
  }

  return previousState;
};
