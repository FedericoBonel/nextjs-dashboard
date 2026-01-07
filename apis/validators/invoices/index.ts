import { CreateInvoiceSchema } from "@/apis/dtos/invoices/create-invoice";
import { InvoiceDetailsSchema } from "@/apis/dtos/invoices/invoice-details";
import { InvoiceExcerptSchema } from "@/apis/dtos/invoices/invoice-excerpt";
import { UpdateInvoiceSchema } from "@/apis/dtos/invoices/update-invoice";

import { createValidationResult } from "../create-validation-result";

/** Validates and returns a create invoice DTO as received from the web */
export const validateCreateInvoiceDTO = (receivedData: unknown) => {
  const validatedData = CreateInvoiceSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

/** Validates and returns an invoice details DTO to be exposed to the web */
export const validateInvoiceDetailsDTO = (receivedData: unknown) => {
  const validatedData = InvoiceDetailsSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

/** Validates and returns an invoice excerpt DTO to be exposed to the web */
export const validateInvoiceExcerptDTO = (receivedData: unknown) => {
  const validatedData = InvoiceExcerptSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

/** Validates and returns an update invoice DTO as received from the web */
export const validateUpdateInvoiceDTO = (receivedData: unknown) => {
  const validatedData = UpdateInvoiceSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};
