import { z } from "zod";

/** Base invoice DTO schema */
const InvoiceSchema = z
  .object({
    id: z
      .string({ message: "Please provide an id for the invoice" })
      .uuid({ message: "Please provide an id for the invoice" }),
    customerId: z
      .string({ message: "Please select a customer" })
      .uuid({ message: "Please select a customer" }),
    amount: z.coerce
      .number()
      .lt(Number.MAX_SAFE_INTEGER, {
        message: `Provide an amount less than $${Number.MAX_SAFE_INTEGER}`,
      })
      .gt(0, {
        message: `Provide a number greater than $0.00`,
      }),
    status: z.enum(["paid", "pending"], {
      invalid_type_error: "Please select an invoice status",
    }),
    date: z.string({ message: "Please provide a date for the invoice" }).date(),
  })
  .strict();

export default InvoiceSchema;
