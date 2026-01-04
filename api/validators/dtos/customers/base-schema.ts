import { z } from "zod";

/** Base customer DTO schema */
export const customerSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string({ message: "Please provide a name for the customer" })
    .min(1, "Please provide a name for the customer")
    .max(
      50,
      "Please provide a customer name that is less than 50 characters long"
    ),
  email: z
    .string({ message: "Please provide an email for the customer" })
    .email({ message: "Please provide an email for the customer" }),
  image_url: z.string({ message: "Please provide an image for the customer" }),
});

export default customerSchema;
