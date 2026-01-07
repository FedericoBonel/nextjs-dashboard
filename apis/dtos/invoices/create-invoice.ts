import { z } from "zod";
import InvoiceSchema from "./base-schema";

export const CreateInvoiceSchema = InvoiceSchema.omit({
  id: true,
  date: true,
}).strict();

export type CreateInvoiceDTO = z.infer<typeof CreateInvoiceSchema>;
