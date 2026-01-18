import { InvalidResult } from "@/apis/validators/create-validation-result";
import { ActionState } from "./types";

export const initialState: ActionState = {
  message: "",
  errors: {},
};

const errorMessageByCode: Record<number, string> = {
  500: "An unexpected error happened. Please try again.",
  400: "The provided values are invalid. Please fix them and try again.",
  404: "The requested resource couldn't be found",
  401: "The credentials you provided are invalid",
};

export const createErrorState = (
  code = 500,
  message?: string,
  errors?: Record<string, string[] | undefined>,
): ActionState => {
  const msgForCode = errorMessageByCode[code];

  return {
    message: message ?? msgForCode ?? errorMessageByCode[500],
    errors: errors || {},
  };
};

export const createBadRequestError = <T>(
  errors?: InvalidResult<T>["errors"],
  message = errorMessageByCode[400],
): ActionState => {
  return createErrorState(400, message, errors);
};

export const createUnauthorizedError = (
  message = errorMessageByCode[401],
): ActionState => {
  return createErrorState(401, message);
};

export const createNotFoundError = (
  message = errorMessageByCode[404],
): ActionState => {
  return createErrorState(404, message);
};

export const createInternalServerError = (
  message = errorMessageByCode[500],
): ActionState => {
  return createErrorState(500, message);
};
