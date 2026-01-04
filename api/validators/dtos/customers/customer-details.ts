import { z } from "zod";
import CustomerSchema from "./base-schema";
import { createValidationResult } from "../../create-validation-result";

export const CustomerDetailsSchema = CustomerSchema.strict();

export type CustomerDetailsDTO = z.infer<typeof CustomerDetailsSchema>;

/** Creates and validates a details customer DTO to expose it to the web */
const validateCustomerDetailsDTO = (receivedData: unknown) => {
  const validatedData = CustomerDetailsSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export default validateCustomerDetailsDTO;
