import { CustomerDetailsSchema } from "@/apis/dtos/customers/customer-details";
import { createValidationResult } from "../create-validation-result";

/** Validates and returns a details customer DTO to expose it to the web */
export const validateCustomerDetailsDTO = (receivedData: unknown) => {
  const validatedData = CustomerDetailsSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};
