import { ZodError } from "zod";
import { ActionState } from "./types";

export const initialState: ActionState = {
  message: "",
  errors: {},
};

const errorMessageByCode: Record<number, string> = {
  500: "An unexpected error happened. Please try again.",
  400: "The provided values are invalid. Please fix them and try again.",
};

export const createErrorState = (
  code = 500,
  message?: string,
  errors?: Record<string, string[] | undefined>
): ActionState => {
  const msgForCode = errorMessageByCode[code];

  return {
    message: message ?? msgForCode ?? errorMessageByCode[500],
    errors: errors || {},
  };
};

export const createBadRequestError = <T>(
  errors?: ZodError<T>,
  message = errorMessageByCode[400]
) => {
  const parsedErrors = errors?.flatten().fieldErrors;

  return createErrorState(400, message, parsedErrors);
};

export const createInternalServerError = (
  message = errorMessageByCode[500]
) => {
  return createErrorState(500, message);
};
