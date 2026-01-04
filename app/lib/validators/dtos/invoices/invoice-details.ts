import { z } from "zod";
import InvoiceSchema from "./base-schema";
import { createValidationResult } from "../../create-validation-result";
import { CustomerDetailsSchema } from "../customers/customer-details";

const InvoiceDetails = InvoiceSchema.omit({ customerId: true })
  .omit({ date: true })
  .extend({ date: z.instanceof(Date), customer: CustomerDetailsSchema })
  .strict();

export type InvoiceDetailsDTO = z.infer<typeof InvoiceDetails>;

/** Creates and validates an invoice details DTO to be exposed to the web */
const validateInvoiceDetailsDTO = (receivedData: unknown) => {
  const validatedData = InvoiceDetails.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export default validateInvoiceDetailsDTO;
