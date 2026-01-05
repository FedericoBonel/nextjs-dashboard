import { z } from "zod";
import InvoiceSchema from "./base-schema";
import { createValidationResult } from "../../create-validation-result";

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true }).strict();

export type CreateInvoiceDTO = z.infer<typeof CreateInvoice>;

/** Creates and validates a create invoice DTO as received from the web */
const validateCreateInvoiceDTO = (receivedData: unknown) => {
  const validatedData = CreateInvoice.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export default validateCreateInvoiceDTO;
