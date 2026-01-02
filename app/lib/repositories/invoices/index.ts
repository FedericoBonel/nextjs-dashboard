import db from "@/app/lib/db/connection";
import { createInvoice } from "@/app/lib/models/invoices";

/** Gets the invoices of the given page and limit for the given query */
export async function getInvoicesBy(
  limit: number,
  page: number,
  query: string
) {
  const offset = (page - 1) * limit;

  try {
    const invoices = await db`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.id as customer_id,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC, customers.name ASC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return invoices.map((inv) =>
      createInvoice({
        id: inv.id,
        amount: Number(inv.amount),
        date: inv.date,
        status: inv.status,
        customer: {
          id: inv.customer_id,
          name: inv.name,
          email: inv.email,
          image_url: inv.image_url,
        },
      })
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
