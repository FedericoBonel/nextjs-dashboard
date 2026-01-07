import { z } from "zod";
import InvoiceSchema from "./base-schema";

export const UpdateInvoiceSchema = InvoiceSchema.omit({ date: true }).strict();

export type UpdateInvoiceDTO = z.infer<typeof UpdateInvoiceSchema>;
