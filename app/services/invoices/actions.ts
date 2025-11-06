// ! EVERY FUNCTION EXPORTED FROM HERE 'use server' WILL BE AN EXPOSED POST HTTP ENDPOINT FROM THE SERVER
// ! THIS MEANS YOU SHOULD EXERCISE SAME LEVEL OF SECURITY AND CHECKS AS ANY HTTP API, DON'T THINK THIS IS ONLY REACHABLE FROM WHEREVER YOU CALL IT
"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { redirect } from "next/navigation";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const currencyToDiscrete = {
  usd: (amount: number): number => Math.round(amount * 100),
};

const timestampToUTCDateString = (date: Date) => {
  if (!(date instanceof Date)) throw new Error("date is not a Date object");

  // Export the offset timestamp as YYYY-MM-DD
  return date.toISOString().split("T")[0];
};

const InvoiceSchema = z
  .object({
    id: z.string(),
    customerId: z.string().uuid(),
    amount: z.coerce.number(),
    status: z.enum(["paid", "pending"]),
    date: z.string().date(),
  })
  .strict();

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true }).strict();

export async function createInvoice(formData: FormData) {
  let validData;

  try {
    const rawData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };
    validData = CreateInvoice.parse(rawData);

    // Convert dollars to cents to eliminate floating point numbers
    // Using a map to convert it so we can support multiple currencies
    validData.amount = currencyToDiscrete["usd"](validData.amount);

    // Get the created at date in international timezone, for some weird reason vercel team thought using "YYYY-MM-DD" is a good format... stupid
    const createdAt = timestampToUTCDateString(new Date());

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
