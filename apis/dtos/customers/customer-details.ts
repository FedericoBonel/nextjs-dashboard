import { z } from "zod";
import CustomerSchema from "./base-schema";
import { createValidationResult } from "@/apis/validators/create-validation-result";

export const CustomerDetailsSchema = CustomerSchema.strict();

export type CustomerDetailsDTO = z.infer<typeof CustomerDetailsSchema>;

