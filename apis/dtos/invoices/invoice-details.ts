import { z } from "zod";
import InvoiceSchema from "./base-schema";
import { CustomerDetailsSchema } from "../customers/customer-details";

export const InvoiceDetailsSchema = InvoiceSchema.omit({ customerId: true })
  .omit({ date: true })
  .extend({ date: z.instanceof(Date), customer: CustomerDetailsSchema })
  .strict();

export type InvoiceDetailsDTO = z.infer<typeof InvoiceDetailsSchema>;
