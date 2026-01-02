import { z } from "zod";
import { customerSchema } from "../customer";

export const invoiceSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  date: z.instanceof(Date),
  status: z.enum(["pending", "paid"]),
  customer: customerSchema,
});

export type Invoice = z.infer<typeof invoiceSchema>;

export const createInvoice = (row: unknown): Invoice => {
  const isInvoice = invoiceSchema.safeParse(row);

  if (!isInvoice.success) {
    throw new Error(
      `Invalid invoice data: ${JSON.stringify(isInvoice.error, undefined, 2)}`
    );
  }

  return isInvoice.data;
};
