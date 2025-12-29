// ! EVERY FUNCTION EXPORTED FROM HERE 'use server' WILL BE AN EXPOSED POST HTTP ENDPOINT FROM THE SERVER
// ! THIS MEANS YOU SHOULD EXERCISE SAME LEVEL OF SECURITY AND CHECKS AS ANY HTTP API, DON'T THINK THIS IS ONLY REACHABLE FROM WHEREVER YOU CALL IT
"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { redirect } from "next/navigation";
import dateToUTCDateString from "@/app/lib/formatters/date-to-utc-date-string";
import currencyToDiscrete from "@/app/lib/formatters/currency-to-discrete";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const InvoiceSchema = z
  .object({
    id: z.string(),
    customerId: z.string().uuid(),
    amount: z.coerce
      .number()
      .max(Number.MAX_SAFE_INTEGER)
      .min(Number.MIN_SAFE_INTEGER),
    status: z.enum(["paid", "pending"]),
    date: z.string().date(),
  })
  .strict();

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true }).strict();

export async function createInvoice(formData: FormData) {
  try {
    const rawData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };
    const validData = CreateInvoice.parse(rawData);

    // Convert dollars to cents to eliminate floating point numbers
    // Using a map to convert it so we can support multiple currencies
    validData.amount = currencyToDiscrete["usd"](validData.amount);

    // Get the created at date in international timezone, for some weird reason vercel team thought using "YYYY-MM-DD" is a good format... stupid
    const createdAt = dateToUTCDateString(new Date());

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date) 
      VALUES (${validData.customerId}, ${validData.amount}, ${validData.status}, ${createdAt})
    `;

    revalidatePath("/dashboard/invoices");
  } catch (e) {
    console.log(e);
    return;
  }
  redirect("/dashboard/invoices");
}

const UpdateInvoice = InvoiceSchema.omit({ date: true }).strict();

export async function updateInvoiceById(id: string, formData: FormData) {
  try {
    // Validate and format the data
    const rawData = {
      id: id,
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    const validData = UpdateInvoice.parse(rawData);

    validData.amount = currencyToDiscrete["usd"](validData.amount);

    // Update the invoice

    await sql`
    UPDATE invoices 
    SET customer_id = ${validData.customerId}, amount = ${validData.amount}, status = ${validData.status} 
    WHERE id = ${validData.id}`;

    // Revalidate the invoices path to show latest data, and redirect to it
    revalidatePath("/dashboard/invoices");
  } catch (e) {
    console.error(e);
    return;
  }
  redirect("/dashboard/invoices");
}

const DeleteId = z.string().uuid();

export async function deleteInvoiceById(id: string) {
  try {
    // validate the id
    const validId = DeleteId.parse(id);

    // delete the invoice
    await sql`
      DELETE FROM invoices where id = ${validId}
    `;

    // revalidate the path
    revalidatePath("/dashboard/invoices");
  } catch (e) {
    console.error(e);
    return;
  }
}
