import { z } from "zod";
import CustomerSchema from "./base-schema";

export const CustomerDetailsSchema = CustomerSchema;

export type CustomerDetailsDTO = z.infer<typeof CustomerDetailsSchema>;
