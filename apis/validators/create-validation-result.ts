import { z } from "zod";

export interface ValidationResult<T> {
  success: boolean;
}

export interface ValidResult<T> extends ValidationResult<T> {
  success: true;
  data: T;
}

export interface InvalidResult<T> extends ValidationResult<T> {
  success: false;
  errors: Record<keyof T, string[] | undefined>;
}

/** Checks the used library validation returned value and formats it for internal use */
export const createValidationResult = <T>(
  zodValidation: z.SafeParseReturnType<T, T>
): ValidResult<T> | InvalidResult<T> => {
  if (!zodValidation.success) {
    return {
      success: false,
      errors: zodValidation.error.flatten().fieldErrors as InvalidResult<T>["errors"],
    };
  }

  return {
    success: true,
    data: zodValidation.data,
  };
};
