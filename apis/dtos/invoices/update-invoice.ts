import { z } from "zod";
import InvoiceSchema from "./base-schema";

export const UpdateInvoiceSchema = InvoiceSchema.omit({ date: true });

export type UpdateInvoiceDTO = z.infer<typeof UpdateInvoiceSchema>;
