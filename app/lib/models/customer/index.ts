import { z } from "zod";

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image_url: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;

export const createCustomer = (row: unknown): Customer => {
  const isCustomer = customerSchema.safeParse(row);

  if (!isCustomer.success) {
    throw new Error("Invalid customer data");
  }

  return isCustomer.data;
};
