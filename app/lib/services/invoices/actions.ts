// ! EVERY FUNCTION EXPORTED FROM HERE 'use server' WILL BE AN EXPOSED POST HTTP ENDPOINT FROM THE SERVER
// ! THIS MEANS YOU SHOULD EXERCISE SAME LEVEL OF SECURITY AND CHECKS AS ANY HTTP API, DON'T THINK THIS IS ONLY REACHABLE FROM WHEREVER YOU CALL IT
"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dateToUTCDateString from "@/app/lib/utils/formatters/date-to-utc-date-string";
import currencyToDiscrete from "@/app/lib/utils/formatters/currency-to-discrete";
import {
  createBadRequestError,
  createInternalServerError,
} from "./action-state";
import { ActionState } from "./types";
import db from "@/app/lib/db/connection";

const InvoiceSchema = z
  .object({
    id: z.string().uuid(),
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
    date: z.string().date(),
  })
  .strict();

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true }).strict();

export async function createInvoice(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Validate and format the data
  const rawData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  const validationRes = CreateInvoice.safeParse(rawData);

  if (!validationRes.success) {
    return createBadRequestError(validationRes.error);
  }

  const validData = validationRes.data;

  // Convert dollars to cents to eliminate floating point numbers
  // Using a map to convert it so we can support multiple currencies
  validData.amount = currencyToDiscrete["usd"](validData.amount);
  // Get the created at date in international timezone, for some weird reason vercel team thought using "YYYY-MM-DD" is a good format... stupid
  const createdAt = dateToUTCDateString(new Date());

  try {
    await db`
      INSERT INTO invoices (customer_id, amount, status, date) 
      VALUES (${validData.customerId}, ${validData.amount}, ${validData.status}, ${createdAt})
    `;
  } catch (e) {
    console.error("Database error:", e);
    return createInternalServerError();
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

const UpdateInvoice = InvoiceSchema.omit({ date: true }).strict();

export async function updateInvoiceById(
  id: string,
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Validate and format the data
  const rawData = {
    id,
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  const validationRes = UpdateInvoice.safeParse(rawData);

  if (!validationRes.success) {
    return createBadRequestError(validationRes.error);
  }

  const validData = validationRes.data;
  validData.amount = currencyToDiscrete["usd"](validData.amount);

  try {
    // Update the invoice
    await db`
    UPDATE invoices 
    SET customer_id = ${validData.customerId}, amount = ${validData.amount}, status = ${validData.status} 
    WHERE id = ${validData.id}`;
  } catch (e) {
    console.error("Database error:", e);
    return createInternalServerError();
  }

  // Revalidate the invoices path to show latest data, and redirect to it
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

const DeleteId = z.string().uuid();

export async function deleteInvoiceById(id: string) {
  try {
    // validate the id
    const validId = DeleteId.parse(id);

    // delete the invoice
    await db`
      DELETE FROM invoices where id = ${validId}
    `;
  } catch (e) {
    console.error("Database error:", e);
    return createInternalServerError();
  }

  // revalidate the path
  revalidatePath("/dashboard/invoices");
}
