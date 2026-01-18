import { z } from "zod";
import InvoiceSchema from "./base-schema";
import { CustomerDetailsSchema } from "../customers/customer-details";

export const InvoiceExcerptSchema = InvoiceSchema.omit({
  customerId: true,
  date: true,
}).extend({ date: z.instanceof(Date), customer: CustomerDetailsSchema });

export type InvoiceExcerptDTO = z.infer<typeof InvoiceExcerptSchema>;
