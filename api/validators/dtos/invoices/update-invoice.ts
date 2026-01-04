import { z } from "zod";
import InvoiceSchema from "./base-schema";
import { createValidationResult } from "../../create-validation-result";

const UpdateInvoice = InvoiceSchema.omit({ date: true }).strict();

export type UpdateInvoiceDTO = z.infer<typeof UpdateInvoice>;

/** Creates and validates an update invoice DTO as received from the web */
const validateUpdateInvoiceDTO = (receivedData: unknown) => {
  const validatedData = UpdateInvoice.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export default validateUpdateInvoiceDTO;
