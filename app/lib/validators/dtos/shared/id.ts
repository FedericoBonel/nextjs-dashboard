import { z } from "zod";
import { createValidationResult } from "../../create-validation-result";

const idSchema = z
  .string({ message: "Please provide a valid id" })
  .uuid({ message: "Please provide a valid id" });

export type IdDTO = z.infer<typeof idSchema>;

/** Creates and validates an ID as received from the web */
const validateIdDTO = (receivedData: unknown) => {
  const validatedData = idSchema.safeParse(receivedData);

  return createValidationResult(validatedData);
};

export default validateIdDTO;
