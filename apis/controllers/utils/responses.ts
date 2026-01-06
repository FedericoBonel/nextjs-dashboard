import { InvalidResult } from "@/apis/validators/create-validation-result";

/** Creates a generic API response object as it should be exposed */
export const createApiResponse = <Data>(data: Data, success: boolean) => {
  return {
    success,
    data,
  };
};

/** Creates a successful API response object as it should be exposed */
export const createSuccessResponse = <Data>(data: Data) => {
  return createApiResponse(data, true);
};

/** Creates a failed API response object as it should be exposed */
export const createFailedResponse = <Data>(data: Data) => {
  return createApiResponse(data, false);
};

/** Creates a bad request API response object as it should be exposed */
export const createBadRequestResponse = <T>(
  errors: InvalidResult<T>["errors"]
) => {
  return createApiResponse(errors, false);
};
