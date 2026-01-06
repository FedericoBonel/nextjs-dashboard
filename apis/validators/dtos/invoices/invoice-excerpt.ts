import { z } from "zod";
import InvoiceSchema from "./base-schema";
import { createValidationResult } from "../../create-validation-result";
import { CustomerDetailsSchema } from "../customers/customer-details";

const InvoiceExcerpt = InvoiceSchema.omit({ customerId: true, date: true })
  .extend({ date: z.instanceof(Date), customer: CustomerDetailsSchema })
  .strict();

export type InvoiceExcerptDTO = z.infer<typeof InvoiceExcerpt>;

/** Creates and validates an invoice excerpt DTO to be exposed to the web */
const validateInvoiceExcerptDTO = (receivedData: unknown) => {
  const validatedData = InvoiceExcerpt.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export default validateInvoiceExcerptDTO;
